<script lang="ts">
  import type { Component } from "svelte";
  import type { IconProps } from "@lucide/svelte";

  let {
    icon: Icon,
    title,
    variant = "default",
  }: {
    icon: Component<IconProps>;
    title: string;
    variant?: "default" | "error";
  } = $props();

  const variantStyles = {
    default: {
      bgClass: "bg-base-200",
      iconClass: "",
    },
    error: {
      bgClass: "bg-error/10",
      iconClass: "text-error",
    },
  };

  const styles = variantStyles[variant];
</script>

<div
  class="mx-auto mb-2 h-12 w-12 rounded-full {styles.bgClass} flex items-center justify-center"
>
  <Icon size={24} class={styles.iconClass} />
</div>
<p class="text-base-content text-sm font-medium">{title}</p>
