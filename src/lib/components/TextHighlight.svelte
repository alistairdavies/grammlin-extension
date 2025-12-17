<script lang="ts">
  import { MousePointer } from '@lucide/svelte';
</script>

<div class="mockup-browser border border-base-300 bg-base-300 w-full max-w-xs shadow-xl rounded-xl overflow-hidden">
  <div class="mockup-browser-toolbar">
    <div class="input text-xs">example.se</div>
  </div>
  <div class="bg-white px-6 py-4 space-y-1 text-left">
    <p class="text-gray-700 text-sm leading-relaxed ">
      Hej!
      <mark class="bg-amber-200/70 rounded px-0.5">Jag heter Erik.</mark><MousePointer
        size={16}
        class="inline-block ml-0.5 translate-y-0.5"
        fill="black"
        color="black"
      />
    </p>
    <p class="text-gray-700 text-sm leading-relaxed">
      Jag kommer från Sverige.
    </p>
  </div>
</div>
