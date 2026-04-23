<script lang="ts">
  import SettingsPanel from "@/lib/components/SettingsPanel.svelte";
  import type { Settings } from "@/lib/state/settings.svelte";
  import About from "@/lib/components/About.svelte";

  const { settings }: { settings: Settings } = $props();
</script>

<div class="mx-auto flex max-w-md flex-col">
  <SettingsPanel {settings} />
  <About />
</div>
