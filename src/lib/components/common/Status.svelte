<script lang="ts">
  import StatusHeader from "@/lib/components/common/StatusHeader.svelte";

  let {
    icon,
    title,
    description,
    variant = "default"
  }: {
    icon: any;
    title: string;
    description: string;
    variant?: "default" | "error";
  } = $props();
</script>

<div class="py-10 px-6 text-center">
  <StatusHeader {icon} {title} {variant} />
  <p class="text-xs text-base-content/50 mt-1">{description}</p>
</div>
