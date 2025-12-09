<script lang="ts">
    import type { Token } from '@/lib/api/types';
    import type { ExtensionEvent } from '@/lib/events';
    import Status from '@/lib/components/common/Status.svelte';
    import Nav from '@/lib/components/Nav.svelte';
    import TokenList from '@/lib/components/TokenList.svelte';
    import { Highlighter, MessageCircleQuestionMark, TriangleAlert } from '@lucide/svelte';

  type State =
    | { type: 'empty' }
    | { type: 'tokens'; tokens: Token[] }
    | { type: 'error'; errorType: 'invalid' | 'unexpected' };

  let state: State = { type: 'empty' };

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
  <Nav />
  {#if state.type === 'tokens'}
    <TokenList tokens={state.tokens} />
  {:else if state.type === 'error' && state.errorType === 'invalid'}
    <Status
      icon={MessageCircleQuestionMark}
      title="Unable to analyse"
      description="This doesn't appear to be Swedish text"
    />
  {:else if state.type === 'error' && state.errorType === 'unexpected'}
    <Status
      icon={TriangleAlert}
      title="Something went wrong"
      description="Unable to analyse the text"
      variant="error"
    />
  {:else}
    <Status
      icon={Highlighter}
      title="Nothing selected"
      description="Highlight Swedish text on any page to get started"
    />
  {/if}
</main>
