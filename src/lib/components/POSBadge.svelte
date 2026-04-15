<script lang="ts">
  import type { PartOfSpeech } from "@/lib/api/types";
  import type { Settings } from "@/lib/settings";
  import { posLabel } from "@/lib/i18n/pos-labels";
  import { posColor } from "@/lib/components/pos-colours";
  import Badge from "@/lib/components/common/Badge.svelte";

  let { pos, settings }: { pos: PartOfSpeech; settings: Settings } = $props();
</script>

<Badge
  text={posLabel(pos, settings.getGrammarLanguage())}
  className="text-base-100"
  style="background-color: {posColor(pos)}"
/>
