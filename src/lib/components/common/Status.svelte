<script lang="ts">
  import type { Component } from "svelte";
  import type { IconProps } from "@lucide/svelte";
  import StatusHeader from "@/lib/components/common/StatusHeader.svelte";

  let {
    icon,
    title,
    description,
    variant = "default",
  }: {
    icon: Component<IconProps>;
    title: string;
    description: string;
    variant?: "default" | "error";
  } = $props();
</script>

<div class="px-6 py-10 text-center">
  <StatusHeader {icon} {title} {variant} />
  <p class="text-base-content/50 mt-1 text-xs">{description}</p>
</div>
