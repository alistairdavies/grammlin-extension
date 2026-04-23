<script lang="ts">
  import type { Component } from "svelte";
  import { type IconProps } from "@lucide/svelte";

  let {
    icon: Icon,
    title,
    variant = "default",
  }: {
    icon: Component<IconProps>;
    title: string;
    variant?: "default" | "error";
  } = $props();

  // svelte-ignore state_referenced_locally
  const style =
    variant === "default"
      ? {
          bgClass: "bg-base-200",
          iconClass: "",
        }
      : {
          bgClass: "bg-error/10",
          iconClass: "text-error",
        };
</script>

<div
  class="mx-auto mb-2 h-12 w-12 rounded-full {style.bgClass} flex items-center justify-center"
>
  <Icon size={24} class={style.iconClass} />
</div>
<p class="text-base-content text-sm font-medium">{title}</p>
