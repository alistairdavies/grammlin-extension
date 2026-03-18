<script lang="ts">
  import type { Token } from "@/lib/api/types";
  import type { ExtensionEvent } from "@/lib/events";
  import Status from "@/lib/components/common/Status.svelte";
  import Nav from "@/lib/components/Nav.svelte";
  import TokenList from "@/lib/components/TokenList.svelte";
  import TokenisedSentence from "@/lib/components/TokenisedSentence.svelte";
  import Settings from "@/lib/components/Settings.svelte";
  import { MessageCircleQuestionMark, TriangleAlert } from "@lucide/svelte";
  import TextHighlight from "@/lib/components/TextHighlight.svelte";

  type State =
    | { type: "empty" }
    | { type: "tokens"; tokens: Token[] }
    | { type: "error"; errorType: "invalid" | "unexpected" };

  type SidePanelView = "main" | "settings";

  let panelState: State = $state({ type: "empty" });
  let currentView: SidePanelView = $state("main");
  function toggleSettings() {
    currentView = currentView === "main" ? "settings" : "main";
  }

  let selectedTokenIndex: number | null = $state(null);
  let highlightTimer: ReturnType<typeof setTimeout> | null = null;

  function handleTokenSelect(index: number) {
    if (highlightTimer) clearTimeout(highlightTimer);
    selectedTokenIndex = index;
    document
      .getElementById(`token-${index}`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
    highlightTimer = setTimeout(() => {
      selectedTokenIndex = null;
    }, 1500);
  }

  browser.runtime.connect({ name: "sidepanel" });

  browser.runtime.onMessage.addListener(
    (message: ExtensionEvent, _sender, sendResponse) => {
      if (message.action === "displayAnalysedSentence") {
        panelState = { type: "tokens", tokens: message.tokens };
        window.scrollTo({ top: 0 });
      } else if (message.action === "displayAnalyseError") {
        panelState = { type: "error", errorType: message.errorType };
      }

      sendResponse();
    },
  );
</script>

<main>
  <Nav {toggleSettings} />

  {#if currentView === "settings"}
    <Settings />
  {:else if panelState.type === "tokens"}
    <TokenisedSentence tokens={panelState.tokens} onSelect={handleTokenSelect} />
    <TokenList tokens={panelState.tokens} selectedIndex={selectedTokenIndex} />
  {:else if panelState.type === "error" && panelState.errorType === "invalid"}
    <Status
      icon={MessageCircleQuestionMark}
      title="Unable to analyse"
      description="There is no information available for this text. Please try highlighting valid Swedish text."
    />
  {:else if panelState.type === "error" && panelState.errorType === "unexpected"}
    <Status
      icon={TriangleAlert}
      title="Something went wrong"
      description="Unable to analyse the text"
      variant="error"
    />
  {:else}
    <div
      class="my-6 flex flex-col items-center justify-center px-6 text-center"
    >
      <img src="/icon.svg" alt="Grammlin Svenska" class="h-12 w-12" />
      <p class="text-base-content mt-2 max-w-72 text-sm leading-relaxed">
        Grammar breakdowns, definitions, and translations as you learn Swedish.
      </p>

      <div class="mt-6 px-6">
        <p class="text-base-content/60 mb-2 text-sm">
          Highlight some Swedish to get started
        </p>
        <TextHighlight />
      </div>
    </div>
  {/if}
</main>
