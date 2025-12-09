<script lang="ts">
  let {
    icon: Icon,
    title,
    variant = "default"
  }: {
    icon: any;
    title: string;
    variant?: "default" | "error";
  } = $props();

  const variantStyles = {
    default: {
      bgClass: "bg-neutral-100",
      iconClass: ""
    },
    error: {
      bgClass: "bg-error/10",
      iconClass: "text-error"
    }
  };

  const styles = variantStyles[variant];
</script>

<div class="w-12 h-12 mx-auto mb-2 rounded-full {styles.bgClass} flex items-center justify-center">
  <Icon size={24} class={styles.iconClass}/>
</div>
<p class="text-sm font-medium text-base-content">{title}</p>
