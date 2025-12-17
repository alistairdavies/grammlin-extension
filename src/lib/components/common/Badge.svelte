<script lang="ts">
  export type BadgeVariant = "blue" | "green" | "amber" | "purple" | "yellow" | "red" | "gray" | "navy" | "turqouise" | "lime";

  let { text, variant = "gray" } = $props<{
    text: string;
    variant?: BadgeVariant;
  }>();

  function getVariantClasses(variant: BadgeVariant): string {
    switch (variant) {
      case "blue":
        return "bg-sky-100 text-sky-800";
      case "green":
        return "bg-green-100 text-green-800";
      case "amber":
        return "bg-amber-100 text-amber-800";
      case "purple":
        return "bg-purple-100 text-purple-800";
      case "yellow":
        return "bg-yellow-100 text-yellow-800";
      case "red":
        return "bg-red-100 text-red-800";
      case "turqouise":
        return "bg-teal-100 text-teal-800";
      case "navy":
        return "bg-blue-100 text-blue-800";
      case "lime":
        return "bg-lime-100 text-lime-800";
      case "gray":
        return "bg-gray-100 text-gray-800";
    }
  }
</script>

<div class="badge badge-sm {getVariantClasses(variant)}">
  {text}
</div>
