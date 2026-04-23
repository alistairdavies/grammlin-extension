<script lang="ts">
  import SettingsPanel from "@/lib/components/SettingsPanel.svelte";
  import type { Settings } from "@/lib/state/settings.svelte";
  import About from "@/lib/components/About.svelte";

  const {
    settings,
    executeShortcut,
  }: { settings: Settings; executeShortcut?: string } = $props();
</script>

<div class="mx-auto flex max-w-md flex-col">
  <SettingsPanel {settings} {executeShortcut} />
  <About />
</div>
