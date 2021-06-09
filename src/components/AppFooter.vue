<script>
export default {
  name: 'AppFooter',
}
</script>

<template>
  <div :class="$style.footer">
    <div :class="$style.text">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" module>
.footer {
  border-top: $border-default;
  padding: $spacer-3 0;
  margin: 0 $widget-spacing-x;
  font-size: $font-size-xs;
}
.text {
  color: $gray-600;
  text-align: center;
  line-height: 1.4;
}
</style>
