<script lang="ts">
  let {
    height,
    width,
  }: { width: number; height: number } = $props();
</script>

<div class="skeleton" style={`width: ${width}px; height: ${height}px`}></div>



