<script lang="ts">
    import type { Token } from '@/lib/api/types';
    import Nav from '@/lib/components/Nav.svelte';
    import TokenList from '@/lib/TokenList.svelte';


  let tokens: Token[] = [];

  browser.runtime.onMessage.addListener((message) => {
    if (message.action === "displayParsedSentence") {
      tokens = message.parsed;
    }
    return true
  });
</script>

<main>
  <Nav />
  <TokenList tokens={tokens} />
</main>
