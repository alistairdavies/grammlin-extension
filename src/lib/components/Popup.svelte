<script lang="ts">
  import { MessageCircleQuestionMark, TriangleAlert } from '@lucide/svelte'
  import { fade } from 'svelte/transition'
  import type { VisiblePopupState } from '@/entrypoints/content/popup-state.svelte'
  import StatusHeader from '@/lib/components/common/StatusHeader.svelte'
  import { TokenCard, TokenList } from '@/lib/components/token-card'
  import type { Settings } from '@/lib/state/settings.svelte'

  const GAP = 8

  let {
    popupState,
    settings,
  }: { popupState: VisiblePopupState; settings: Settings } = $props()

  let positionStyle = $derived(
    popupState.position.direction === 'below'
      ? `top: ${popupState.position.top}px; left: ${popupState.position.left}px; max-height: calc(100vh - ${popupState.position.top}px - ${GAP}px);`
      : `bottom: ${popupState.position.bottom}px; left: ${popupState.position.left}px; max-height: calc(100vh - ${popupState.position.bottom}px - ${GAP}px);`,
  )
</script>

<div
  class="rounded-box border-primary bg-base-100 fixed z-9999 w-87.5 overflow-y-auto border shadow-xl"
  style={positionStyle}
>
  {#if popupState.state === "loading"}
    <div in:fade={{ duration: 100 }}>
      <TokenCard loading {settings} />
    </div>
  {:else if popupState.state === "loaded"}
    <div in:fade={{ duration: 100 }}>
      <TokenList tokens={popupState.tokens} {settings} />
    </div>
  {:else if popupState.state === "error" && popupState.errorType === "invalid"}
    <div class="px-4 py-6 text-center" in:fade={{ duration: 100 }}>
      <StatusHeader
        icon={MessageCircleQuestionMark}
        title="Unable to analyse"
      />
      <p class="text-base-content/50 mt-1 text-xs">
        No information available for this text.
      </p>
    </div>
  {:else if popupState.state === "error" && popupState.errorType === "unexpected"}
    <div class="px-4 py-6 text-center" in:fade={{ duration: 100 }}>
      <StatusHeader
        icon={TriangleAlert}
        title="Something went wrong"
        variant="error"
      />
      <p class="text-base-content/50 mt-1 text-xs">
        Unable to analyse the text.
      </p>
    </div>
  {/if}
</div>
