<script lang="ts">
  import type { PartOfSpeech } from '@/lib/api/types'
  import Badge from '@/lib/components/common/Badge.svelte'
  import { posColor } from '@/lib/components/pos-colours'
  import { posLabel } from '@/lib/i18n/pos-labels'
  import type { Settings } from '@/lib/state/settings.svelte'

  let { pos, settings }: { pos: PartOfSpeech; settings: Settings } = $props()
</script>

<Badge
  text={posLabel(pos, settings.grammarLanguage)}
  className="text-base-100"
  style="background-color: {posColor(pos)}"
/>
