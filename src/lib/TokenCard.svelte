<script lang="ts">
  import { isNoun, isPronoun, isVerb, type Token } from "./api/service";
  let { token } = $props<{ token: Token }>();

  let expanded = $state(false);

  type POSColor = {
    bg: string;
    text: string;
  };
  function getPOSColor(pos: Token["part_of_speech"]): POSColor {
    switch (pos?.id) {
      case "verb":
        return { bg: "#dbeafe", text: "#2563eb" };
      case "noun":
        return { bg: "#d1fae5", text: "#059669" };
      case "adjective":
        return { bg: "#fef3c7", text: "#d97706" };
      case "pronoun":
        return { bg: "#ede9fe", text: "#7c3aed" };
      case "adverb":
        return { bg: "#fce7f3", text: "#db2777" };
      case "conjunction":
        return { bg: "#e5e7eb", text: "#4b5563" };
      default:
        return { bg: "#e5e7eb", text: "#4b5563" };
    }
  }
  function getMorphologyAttributes(token: Token): string[] {
    const attrs: string[] = [];
    if (isVerb(token)) {
      if (token.morphology.tense) attrs.push(token.morphology.tense);
      if (token.morphology.form) attrs.push(token.morphology.form);
    } else if (isNoun(token)) {
      if (token.morphology.plurality) attrs.push(token.morphology.plurality);
      if (token.morphology.definiteness) attrs.push(token.morphology.definiteness);
      if (token.morphology.gender) {
        attrs.push(token.morphology.gender === "common" ? "en word" : "ett word");
      }
    } else if (isPronoun(token)) {
      if (token.morphology.form) attrs.push(token.morphology.form);
    }
    return attrs;
  }
  const posColor = $derived(token.part_of_speech ? getPOSColor(token.part_of_speech) : null);
  const morphAttrs = $derived(getMorphologyAttributes(token));
  const validDefinitions = $derived(token.definitions ? token.definitions.filter(def => def.definition) : []);
  const hasDefinitions = $derived(validDefinitions.length > 0);
</script>

<div class="card bg-base-100 border border-base-300 hover:shadow-md transition-shadow">
  <div class="card-body p-3.5">
    <div class="flex items-start justify-between gap-2 mb-2">
      <h3 class="card-title text-lg mb-0">{token.text}</h3>
    </div>
    <div class="flex flex-wrap gap-2 mb-2">
      {#if token.part_of_speech && posColor}
        <span
          class="badge badge-sm font-medium"
          style:background-color={posColor.bg}
          style:color={posColor.text}
        >
          {token.part_of_speech.title}
        </span>
      {/if}
      {#each morphAttrs as attr}
        <span class="badge badge-sm badge-ghost">{attr}</span>
      {/each}
    </div>

    {#if hasDefinitions}
      <!-- Primary definition -->
      <p class="text-sm italic text-base-content/70 leading-relaxed text-left">
        {validDefinitions[0].definition}
      </p>

      <!-- Additional definitions toggle -->
      {#if validDefinitions.length > 1}
        <button
          onclick={() => expanded = !expanded}
          class="text-xs text-primary hover:text-primary-focus mt-2 flex items-center gap-1 text-left"
        >
          <span class="font-mono">{expanded ? '−' : '+'}</span>
          <span>{validDefinitions.length - 1} other {validDefinitions.length === 2 ? 'meaning' : 'meanings'}</span>
        </button>

        {#if expanded}
          <div class="border-t border-base-300 mt-2 pt-2 space-y-1.5">
            {#each validDefinitions.slice(1) as def}
              <p class="text-sm italic text-base-content/50 leading-relaxed text-left">{def.definition}</p>
            {/each}
          </div>
        {/if}
      {/if}
    {/if}
  </div>
</div>
