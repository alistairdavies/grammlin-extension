<script lang="ts">
  import Skeleton from "@/lib/components/common/Skeleton.svelte";
</script>

<div class="flex flex-wrap items-center justify-between gap-2">
  <Skeleton width={80} height={20} />
  <Skeleton width={48} height={20} />
</div>
<div class="flex gap-1">
  <Skeleton width={56} height={16}></Skeleton>
  <Skeleton width={56} height={16}></Skeleton>
  <Skeleton width={56} height={16}></Skeleton>
</div>
