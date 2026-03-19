<script lang="ts">
  import { MousePointer } from "@lucide/svelte";
</script>

<div
  class="mockup-browser border-base-300 bg-base-300 w-full max-w-xs overflow-hidden rounded-xl border shadow-xl"
>
  <div class="mockup-browser-toolbar">
    <div class="input text-xs">example.se</div>
  </div>
  <div class="bg-base-100 space-y-1 px-6 py-4 text-left">
    <p class="text-base-content text-sm leading-relaxed">
      Hej!
      <mark class="bg-warning/30 rounded px-1">Jag heter Erik.</mark
      ><MousePointer
        size={16}
        class="ml-1 inline-block translate-y-px"
        fill="currentColor"
        color="currentColor"
      />
    </p>
    <p class="text-base-content text-sm leading-relaxed">
      Jag kommer från Sverige.
    </p>
  </div>
</div>
