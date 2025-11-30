<script lang="ts">
  import { isNoun, isPronoun, isVerb, type Token } from "./api/service";

  let { token } = $props<{ token: Token }>();

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
</script>

<div class="word-item">
  <div class="word-header">
    <div class="word-left">
      <div class="word-name">{token.text}</div>
    </div>
  </div>
  {#if token.definition?.definition}
    <p class="definition">{token.definition.definition}</p>
  {/if}
  <div class="word-meta">
    {#if token.part_of_speech && posColor}
      <span
        class="type-badge"
        style:background-color={posColor.bg}
        style:color={posColor.text}
      >
        {token.part_of_speech.title}
      </span>
    {/if}
    {#each morphAttrs as attr}
      <span class="attr-tag">{attr}</span>
    {/each}
  </div>
</div>

<style>
  .word-item {
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 0.875rem;
    transition: all 0.2s;
    text-align: left;
  }

  .word-item:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    border-color: #d1d5db;
  }

  .word-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 0.5rem;
  }

  .word-left {
    flex: 1;
    min-width: 0;
    text-align: left;
  }

  .word-name {
    font-size: 1.125rem;
    font-weight: 600;
    color: #111827;
    margin-bottom: 0.5rem;
    text-align: left;
  }

  .definition {
    font-size: 0.875rem;
    color: #4b5563;
    line-height: 1.5;
    margin: 0 0 0.75rem 0;
    padding: 0.5rem;
    background: #f9fafb;
    border-left: 3px solid #3b82f6;
    border-radius: 4px;
    font-style: italic;
  }

  .word-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    align-items: center;
    text-align: left;
  }

  .type-badge {
    font-size: 0.75rem;
    font-weight: 500;
    padding: 0.25rem 0.625rem;
    border-radius: 12px;
    text-transform: capitalize;
  }

  .attr-tag {
    font-size: 0.75rem;
    color: #6b7280;
    background: #f9fafb;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
  }

  .actions {
    display: flex;
    gap: 0.375rem;
    flex-shrink: 0;
  }

  .action-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.375rem 0.5rem;
    background: white;
    color: #3b82f6;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    font-size: 0.75rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    white-space: nowrap;
    text-decoration: none;
  }

  .action-btn:hover {
    background: #eff6ff;
    border-color: #3b82f6;
  }
</style>
