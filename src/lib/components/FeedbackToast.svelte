<script lang="ts">
  import { fade } from 'svelte/transition'
  import icon from '/public/icon/32.png'

  const CHROME_STORE_REVIEW_URL =
    'https://chromewebstore.google.com/detail/grammlin/emipiahcdgnnlopmohkaedhbobgcaleo/reviews'

  let { onDismiss }: { onDismiss: () => void } = $props()
</script>

<div transition:fade class="toast toast-top toast-end z-9999">
  <div
    role="alert"
    class="alert border-primary bg-base-100 flex w-full max-w-xs flex-col gap-1 border text-left"
  >
    <img src={icon} alt="Grammlin Icon" />
    <h1 class="text-lg">Leave Grammlin a Review</h1>
    <p>Thanks for using the extension for some time, it would be great to hear your thoughts!</p>
    <div class="flex w-full flex-row justify-end gap-2">
      <button type="button" class="btn btn-ghost btn-sm" onclick={onDismiss}
        >Maybe later</button
      >
      <a
        class="btn btn-primary btn-sm"
        href={CHROME_STORE_REVIEW_URL}
        target="_blank"
        rel="noopener noreferrer"
        onclick={onDismiss}>Leave a review</a
      >
    </div>
  </div>
</div>
