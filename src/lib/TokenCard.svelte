<script lang="ts">
  import { isNoun, isPronoun, isVerb, type Token } from "./api/service";
  import Badge from "./components/Badge.svelte";
  import Card from "./components/Card.svelte";
  import { BookA } from "@lucide/svelte";

  let { token } = $props<{ token: Token }>();

type BadgeVariant = "blue" | "green" | "amber" | "purple" | "yellow" | "red" | "gray";

function getPOSBadgeVariant(pos: Token["part_of_speech"]): BadgeVariant {
  switch (pos?.id) {
    case "verb":
      return "blue";
    case "noun":
      return "green";
    case "adjective":
      return "amber";
    case "pronoun":
      return "purple";
    case "determiner":
      return "yellow";
    case "auxiliary_verb":
      return "red";
    default:
      return "gray";
  }
}
</script>


<Card>
  <div class="space-y-3">
    <!-- Word and Part of Speech -->
    <div class="flex items-start justify-between gap-4">
      {#if token.lemma.url}
        <div class="tooltip tooltip-right tooltip-primary">
          <div class="tooltip-content">
            <div class="flex items-center gap-1.5">
              <BookA size={14} strokeWidth={2.5} />
              <span>Sök ord i ordböcker</span>
            </div>
          </div>
          <a
            href={token.lemma.url}
            target="_blank"
            rel="noopener noreferrer"
            class="text-xl font-bold m-0 no-underline hover:underline decoration-2 underline-offset-4"
          >
            {token.text}
          </a>
        </div>
      {:else}
        <h3 class="text-xl font-bold m-0">{token.text}</h3>
      {/if}
      {#if token.part_of_speech}
        <Badge
          text={token.part_of_speech.title}
          variant={getPOSBadgeVariant(token.part_of_speech)}
        />
      {/if}
    </div>

    <!-- Base Form -->
    <div class="text-sm min-h-[1.25rem]">
      {#if token.lemma.text.toLowerCase() !== token.text.toLowerCase() }
        <span class="font-semibold text-base-content/40">Grundform:</span>
        <span class="ml-1">{token.lemma.text}</span>
      {/if}
    </div>

    <!-- Morphology -->
    {#if isVerb(token) || isNoun(token) || isPronoun(token)}
      <div class="divider my-1"></div>
      <div class="flex flex-wrap gap-2">
        {#if isVerb(token)}
          {#if token.morphology.tense}
            <span class="badge badge-outline">{token.morphology.tense}</span>
          {/if}
          {#if token.morphology.form}
            <span class="badge badge-outline">{token.morphology.form}</span>
          {/if}
        {:else if isNoun(token)}
          {#if token.morphology.plurality}
            <span class="badge badge-outline">{token.morphology.plurality}</span>
          {/if}
          {#if token.morphology.definiteness}
            <span class="badge badge-outline">{token.morphology.definiteness}</span>
          {/if}
          {#if token.morphology.gender}
            <span class="badge badge-outline">{token.morphology.gender === "common" ? "en word" : "ett word"}</span>
          {/if}
        {:else if isPronoun(token)}
          {#if token.morphology.form}
            <span class="badge badge-outline">{token.morphology.form}</span>
          {/if}
        {/if}
      </div>
    {/if}
  </div>
</Card>
