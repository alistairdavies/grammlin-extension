<script lang="ts">
  import { fade } from "svelte/transition";
  import icon from "/public/icon/32.png";
  import TextHighlight from "./TextHighlight.svelte";

  let { onDismiss }: { onDismiss: () => void } = $props();
</script>

<div transition:fade class="toast toast-top toast-end z-9999">
  <div
    role="alert"
    class="alert border-primary flex flex-col gap-2 border text-left"
  >
    <div class="flex flex-row items-center gap-1">
      <img src={icon} alt="Grammlin Icon" />
    </div>
    <h2>Grammlin is now active on this page</h2>
    <p>Highlight some text to analyse it</p>
    <TextHighlight />
    <div class="mt-4 mb-2 flex w-full flex-row justify-end gap-2">
      <button class="btn btn-outline btn-sm">Options</button>
      <button class="btn btn-primary btn-sm" onclick={onDismiss}>Got it</button>
    </div>
  </div>
</div>
