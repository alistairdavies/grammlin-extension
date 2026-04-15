<script lang="ts">
  import Settings from "@/lib/components/Settings.svelte";
  import About from "@/lib/components/About.svelte";
  import { loadSettings } from "@/lib/settings";

  const settingsPromise = loadSettings();
</script>

{#await settingsPromise}
  <div></div>
{:then settings}
  <div class="mx-auto flex max-w-md flex-col">
    <Settings {settings} />
    <About />
  </div>
{/await}
