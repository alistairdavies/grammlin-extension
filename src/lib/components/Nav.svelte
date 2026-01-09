<script lang="ts">
    import { Settings} from "@lucide/svelte";

    let { toggleSettings }: {
      toggleSettings: () => void;
    } = $props();
</script>

<nav class="p-4">
  <div class="flex justify-between items-center mb-2">
      <p class="text-lg">Grammlin</p>
    <button class="btn btn-xs" onclick={toggleSettings}>
        <Settings size={16} /> Settings
    </button>
  </div>
  <hr/>
</nav>
