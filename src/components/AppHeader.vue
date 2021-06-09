<script>
export default {
  name: 'AppHeader',
}
</script>

<template>
  <div :class="$style.header">
    <slot />
  </div>
</template>

<style lang="scss" module>
.header {
  border-bottom: $border-default;
  min-height: 71px;
  padding: $spacer-2 $spacer-6;
  background-color: $gray-400;
}
</style>
