<script lang="ts">
  import About from "@/lib/components/About.svelte";

  let explanationLanguage = $state<"en" | "sv">("en");
  let showTranslations = $state(false);

  function toggleLanguage() {
    explanationLanguage = explanationLanguage === "en" ? "sv" : "en";
  }

  function toggleTranslations() {
    showTranslations = !showTranslations;
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
            disabled
            checked={explanationLanguage === "sv"}
            onchange={toggleLanguage}
          />
        </div>
      </div>

      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium">English Translations</p>
          <p class="text-base-content/60 text-xs">Show English translations</p>
        </div>
        <div class="flex items-center gap-2">
          <input
            type="checkbox"
            class="toggle toggle-sm toggle-primary"
            disabled
            checked={showTranslations}
            onchange={toggleTranslations}
          />
        </div>
      </div>
    </div>
  </div>

  <About />
</div>
