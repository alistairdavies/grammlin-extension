# Per-Tab Persistence & Icon Indicator

## Goal

When a user activates Grammlin on a tab, it stays active for the duration of that tab as long as they remain on the same origin. The toolbar icon reflects whether Grammlin is active on the current tab. No content scripts ever auto-inject without an explicit user action.

---

## When is the content script injected?

The content script is injected via `browser.scripting.executeScript` in exactly two situations:

1. **User clicks the icon or presses `Ctrl+Shift+G`** on a tab where Grammlin is not active. This is the only way to activate Grammlin on a new tab.

2. **Same-origin full page load in an already-activated tab.** When `tabs.onUpdated` fires with `status: "complete"`, the background checks if the tab is in the tracker and the origin matches. If both are true, the content script is re-injected. This covers:
   - Same-origin link clicks (full navigation)
   - Page refresh
   - Same-origin back/forward (bfcache or fresh load)

The content script is **never** injected in these situations:
- New tab on the same domain (each tab is independent)
- SPA navigations (`pushState`/`replaceState` don't fire `status: "complete"`)
- Cross-origin navigation (origin doesn't match, extension is disabled)
- Any tab the user hasn't explicitly activated

---

## Activation & Deactivation

| Trigger | Behaviour |
|---------|-----------|
| Icon click / `Ctrl+Shift+G` on **inactive** tab | Content script injected, tab added to tracker (tabId → origin), icon set to active |
| Icon click / `Ctrl+Shift+G` on **active** tab | `disableExtension` message sent to content script (full teardown), tab removed from tracker, icon set to inactive |

Both the icon click and keyboard shortcut fire the same `action.onClicked` handler. The `_execute_action` command in the manifest binds the shortcut to the action button.

---

## Navigation Flows

### Same-origin full page navigation

Page reloads, content script dies. `onUpdated` fires with `status: "complete"`. Tab is in the tracker and origin matches → `enableExtension` re-injects the content script. Icon stays active. `activeTab` permission persists across same-origin navigations.

### Same-origin SPA navigation

Content script stays alive — the page never unloads. `pushState`/`replaceState` does not fire `onUpdated` with `status: "complete"`, so no re-injection occurs. Everything continues working.

### Page refresh

Same as same-origin full page navigation.

### Cross-origin navigation

`onUpdated` fires. Tab is in the tracker but origin doesn't match → `disableExtension` is called. Tab removed from tracker, `disableExtension` message sent to content script, icon set to inactive. `activeTab` permission is revoked by the browser on cross-origin navigation.

### Subdomain change

Treated as cross-origin (e.g. `https://blog.example.com` ≠ `https://example.com`). Matches the browser's origin model and `activeTab` revocation behaviour.

### Back/forward button (cross-origin)

On forward navigation to a different origin, the extension was disabled and the tab removed from the tracker. When the user presses back, the tab is not in the tracker, so `onUpdated` early-returns. Nothing happens. The user must click the icon to re-activate.

If bfcache restores the original page, the content script may still be alive and functional, but the background doesn't know about it. The icon shows inactive. This is a known acceptable inconsistency — the user clicks the icon to re-sync. The `__grammlinCleanup` pattern handles the existing instance cleanly on re-activation.

---

## Tab Lifecycle

| Trigger | Behaviour |
|---------|-----------|
| Switch to a different tab | Icon set to active/inactive based on tracker |
| Tab closed | Tab removed from tracker |
| Service worker restarts (idle timeout) | Tracker is lost (in-memory only). Icon reverts to manifest default (inactive). Content scripts in existing tabs may still be alive but the background no longer knows about them. User clicks the icon to re-activate |

---

## Permissions

```ts
permissions: ["activeTab", "scripting"],
```

| Permission | Reason |
|---|---|
| `activeTab` | Temporary host permission on user gesture, persists for same-origin navigations in that tab |
| `scripting` | `executeScript` to inject the content script |

`activeTab` grants temporary host access on icon click or keyboard shortcut. This access persists across same-origin navigations within that tab ([Chrome docs](https://developer.chrome.com/docs/extensions/develop/concepts/activeTab)). Cross-origin navigation revokes it, which is exactly when we disable the extension.

No `storage`, `tabs`, or `host_permissions` needed. `tabs.sendMessage`, `tabs.onUpdated`, `tabs.onActivated`, and `tabs.onRemoved` are available to all extensions without the `tabs` permission. `activeTab` grants `tab.url` access for activated tabs.

---

## Architecture

### Background — `src/entrypoints/background/index.ts`

Registers four browser event listeners and exposes two core functions:

**Listeners:**
- `action.onClicked` — toggles extension on/off for the current tab
- `tabs.onUpdated` — re-injects on same-origin page load, disables on cross-origin
- `tabs.onActivated` — updates icon when switching tabs
- `tabs.onRemoved` — cleans up tracker on tab close
- `runtime.onMessage` — handles `analyseSentence` from content script

**Functions:**
- `enableExtension(context)` — injects content script, adds to tracker, sets icon active. On injection failure, falls through to `disableExtension`.
- `disableExtension(tabId)` — removes from tracker, sends `disableExtension` message to content script, sets icon inactive.

### Origin tracker — `src/lib/permission.ts`

In-memory `Map<number, string>` (tabId → origin). Exposes `add`, `removeTab`, `exists` (checks tabId + origin match), and `hasTab` (checks tabId only). `parseTabContext` extracts a `TabContext` from a `Browser.tabs.Tab`, returning `null` for tabs without a valid HTTPS origin.

### Content script — `src/entrypoints/content/index.ts`

Registered with `matches: []` and `registration: "runtime"` — never auto-injected by the manifest. Uses `createShadowRootUi` to mount a Svelte popup in a shadow DOM.

**Teardown:** `window.__grammlinCleanup` stores a teardown function. On re-injection (e.g. same-origin navigation), the old instance is torn down before the new one sets up. Teardown aborts all document listeners via `AbortController`, removes the shadow root UI, removes the `onMessage` listener, and deletes the global reference.

**Messages:** Listens for `disableExtension` which triggers full teardown.

### Supporting modules

- `src/lib/icon.ts` — `setIconActive` / `setIconInactive` per tab via `browser.action.setIcon`
- `src/lib/url.ts` — `extractOrigin(url)` returns `url.origin` for `https:` URLs, `null` otherwise
- `src/lib/events.ts` — `ExtensionEvent` union (`analyseSentence` | `disableExtension`) and `AnalyseResponse` type

---

## Known Limitations

1. **Bfcache + cross-origin back button:** Content script may survive in bfcache and be restored alive, but the background has no record of it. Icon shows inactive. User clicks icon to re-sync. Accepted trade-off for simplicity.

2. **Service worker restart:** Tracker is lost. All previously active tabs appear inactive. User clicks icon to re-enable per tab. Acceptable for the session-like model.

3. **Same-origin re-injection rebuilds UI:** On same-origin full page navigation, `enableExtension` injects the content script into the fresh page. If bfcache restores a page with a still-alive content script, `__grammlinCleanup` tears down the old instance and sets up a new one. The popup briefly resets. Accepted — not worth the complexity of ping-before-inject for this edge case.

4. **Non-HTTPS URLs:** `extractOrigin` only returns origins for `https:` URLs. `http:`, `chrome:`, `about:`, `file:` pages cannot be activated.

---

## Design Decisions

- **Tracker stores origin per tab** to distinguish same-origin from cross-origin navigation in `onUpdated`. Without it, the only way to detect cross-origin would be error-driven (attempt `executeScript`, use failure as signal).

- **No ping mechanism.** The tracker is the single source of truth. This means the background can be wrong after service worker restart or bfcache restore, but both cases self-correct when the user clicks the icon.

- **`disableExtension` on cross-origin** rather than keeping the tracker entry. `activeTab` permission is revoked on cross-origin navigation, so there's nothing useful the background can do even if the user navigates back. Clean removal is simpler.

- **`__grammlinCleanup` over DOM element guard.** A DOM query (`document.querySelector("grammlin-popup")`) can race with SPA frameworks that remove the shadow host after our guard check. The global teardown function is reliable regardless of DOM state.
