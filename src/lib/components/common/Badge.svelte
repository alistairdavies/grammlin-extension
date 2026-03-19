<script lang="ts">
  let {
    text,
    className = "",
    style = "",
  }: { text: string; className?: string; style?: string } = $props();
</script>

<div class={`badge badge-sm ${className}`} {style}>
  {text}
</div>
