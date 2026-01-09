<script lang="ts">
  import About from '@/lib/components/About.svelte';

  let explanationLanguage = $state<'en' | 'sv'>('en');
  let showTranslations = $state(false);

  function toggleLanguage() {
    explanationLanguage = explanationLanguage === 'en' ? 'sv' : 'en';
  }

  function toggleTranslations() {
    showTranslations = !showTranslations;
  }
</script>

<div class="flex flex-col">
  <div class="px-6 py-4">
    <h3 class="text-base font-semibold mb-4">Settings</h3>

    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <div>
          <p class="font-medium text-sm">English Grammar Terms</p>
          <p class="text-xs text-base-content/60">Show grammatical information in English rather than Swedish</p>
        </div>
        <div class="flex items-center gap-2">
          <input
            type="checkbox"
            class="toggle toggle-sm toggle-primary"
            disabled
            checked={explanationLanguage === 'sv'}
            onchange={toggleLanguage}
          />
        </div>
      </div>

      <div class="flex items-center justify-between">
        <div>
          <p class="font-medium text-sm">English Translations</p>
          <p class="text-xs text-base-content/60">Show English translations</p>
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
