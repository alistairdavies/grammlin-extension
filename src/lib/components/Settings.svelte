<script lang="ts">
  import type { Settings } from "@/lib/settings";

  let { settings }: { settings: Settings } = $props();
</script>

  <div class="px-6">
    <h3 class="mb-2 text-base font-semibold">Settings</h3>

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
            checked={settings.getGrammarLanguage() === "en"}
            onchange={settings.toggleGrammarLanguage}
          />
        </div>
      </div>
    </div>
  </div>
