<script lang="ts">
  import type { Settings } from "@/lib/state/settings.svelte";

  const {
    settings,
    executeShortcut,
  }: { settings: Settings; executeShortcut?: string } = $props();
</script>

<div class="px-6">
  <h3 class="mb-2 text-base font-semibold">Options</h3>

  <div class="space-y-4">
    <div class="flex items-center justify-between gap-2">
      <div>
        <p class="text-sm font-medium">English Grammar Terms</p>
        <p class="text-base-content/60 text-xs">
          Show grammatical information in English rather than Swedish
        </p>
      </div>
      <div class="flex items-center gap-2">
        <input
          type="checkbox"
          class="toggle toggle-sm toggle-primary"
          checked={settings.grammarLanguage === "en"}
          onchange={settings.toggleGrammarLanguage}
        />
      </div>
    </div>
    <div class="flex items-center justify-between gap-2">
      <div>
        <p class="text-sm font-medium">Activation Shortcut</p>
        <p class="text-base-content/60 text-xs">
          Keyboard shortcut to activate Grammlin on the current page.
          Customisable from your browser settings.
        </p>
      </div>
      <input
        class="input max-w-32"
        type="text"
        value={executeShortcut ? executeShortcut : "Not Configured"}
        disabled
      />
    </div>
  </div>
</div>
