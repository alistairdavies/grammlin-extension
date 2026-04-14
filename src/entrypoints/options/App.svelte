<script lang="ts">
  import Settings from "@/lib/components/Settings.svelte";
  import About from "@/lib/components/About.svelte";
  import { loadSettings} from "@/lib/settings";


  const settings = await loadSettings()
</script>

<div class="mx-auto max-w-md flex flex-col">
  <Settings {settings} />
  <About />
</div>
