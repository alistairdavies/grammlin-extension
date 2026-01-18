<script lang="ts">
  import { MousePointer } from "@lucide/svelte";
</script>

<div
  class="mockup-browser border-base-300 bg-base-300 w-full max-w-xs overflow-hidden rounded-xl border shadow-xl"
>
  <div class="mockup-browser-toolbar">
    <div class="input text-xs">example.se</div>
  </div>
  <div class="space-y-1 bg-white px-6 py-4 text-left">
    <p class="text-sm leading-relaxed text-gray-700">
      Hej!
      <mark class="rounded bg-amber-200/70 px-0.5">Jag heter Erik.</mark
      ><MousePointer
        size={16}
        class="ml-0.5 inline-block translate-y-0.5"
        fill="black"
        color="black"
      />
    </p>
    <p class="text-sm leading-relaxed text-gray-700">
      Jag kommer från Sverige.
    </p>
  </div>
</div>
