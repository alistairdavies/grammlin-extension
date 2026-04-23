<script lang="ts">
  import { MousePointer } from "@lucide/svelte";
</script>

<div
  class="mockup-browser border-base-300 bg-base-300 w-full max-w-xs overflow-hidden rounded-xl border shadow-xl"
>
  <div class="mockup-browser-toolbar"></div>
  <div class="bg-base-100 space-y-1 px-6 py-4 text-left">
    <p class="text-base-content text-sm leading-relaxed">
      Hej!
      <mark class="bg-primary/30 rounded px-1">Jag lär mig svenska.</mark
      ><MousePointer
        size={16}
        class="ml-1 inline-block translate-y-px"
        fill="currentColor"
        color="currentColor"
      />
    </p>
  </div>
</div>
