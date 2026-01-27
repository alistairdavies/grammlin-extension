<script lang="ts">
  let { text, className = "" }: { text: string; className?: string } = $props();

</script>

<div class={`badge badge-sm ${className}`}>
  {text}
</div>
