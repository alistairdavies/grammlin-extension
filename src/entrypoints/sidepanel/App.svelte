<script lang="ts">
    import type { Token } from '@/lib/api/types';
    import type { ExtensionEvent } from '@/lib/events';
    import Status from '@/lib/components/common/Status.svelte';
    import Nav from '@/lib/components/Nav.svelte';
    import TokenList from '@/lib/components/TokenList.svelte';
    import Settings from '@/lib/components/Settings.svelte';
    import { MessageCircleQuestionMark, TriangleAlert } from '@lucide/svelte';
    import TextHighlight from '@/lib/components/TextHighlight.svelte';

  type State =
    | { type: 'empty' }
    | { type: 'tokens'; tokens: Token[] }
    | { type: 'error'; errorType: 'invalid' | 'unexpected' };

  type SidePanelView = 'main' | 'settings';

  let state: State = { type: 'empty' };
  let currentView: SidePanelView = 'main';

  function toggleSettings() {
    currentView = currentView === 'main' ? 'settings' : 'main';
  }

  browser.runtime.onMessage.addListener((message: ExtensionEvent) => {
    if (message.action === "displayAnalysedSentence") {
      state = { type: 'tokens', tokens: message.tokens };
    } else if (message.action === "displayAnalyseError") {
      state = { type: 'error', errorType: message.errorType };
    }
    return true
  });
</script>

<main>
  <Nav {toggleSettings} />

  {#if currentView === 'settings'}
    <Settings />
  {:else if state.type === 'tokens'}
    <TokenList tokens={state.tokens} />
  {:else if state.type === 'error' && state.errorType === 'invalid'}
    <Status
      icon={MessageCircleQuestionMark}
      title="Unable to analyse"
      description="There is no information available for this text. Please try highlighting valid Swedish text."
    />
  {:else if state.type === 'error' && state.errorType === 'unexpected'}
    <Status
      icon={TriangleAlert}
      title="Something went wrong"
      description="Unable to analyse the text"
      variant="error"
    />
  {:else}
    <div class="flex flex-col items-center justify-center my-6 px-6 text-center">
      <img src="/icon.svg" alt="Grammlin Svenska" class="w-12 h-12" />
      <p class="text-sm text-base-content mt-2 leading-relaxed max-w-72">
        Grammar breakdowns, definitions, and translations as you learn Swedish.
      </p>

      <div class="my-8 px-6 ">
        <p class="text-sm text-base-content/60 mb-2">
          Highlight some Swedish to get started
        </p>
        <TextHighlight/>
      </div>
    </div>
  {/if}
</main>
