<script lang="ts">
  import About from "@/lib/components/About.svelte";
  import {
    getGrammarLanguage,
    setGrammarLanguage,
  } from "@/lib/settings.svelte";

  function toggleLanguage() {
    setGrammarLanguage(getGrammarLanguage() === "en" ? "sv" : "en");
  }
</script>

<div class="flex flex-col">
  <div class="px-6 py-4">
    <h3 class="mb-4 text-base font-semibold">Settings</h3>

    <div class="space-y-4">
      <div class="flex items-center justify-between">
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
            checked={getGrammarLanguage() === "en"}
            onchange={toggleLanguage}
          />
        </div>
      </div>
    </div>
  </div>

  <About />
</div>
