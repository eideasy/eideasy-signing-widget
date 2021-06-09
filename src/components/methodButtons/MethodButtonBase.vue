<script>

export default {
  name: 'MethodButtonBase',
}
</script>

<template>
  <div :class="$style.row">
    <div :class="$style.unit">
      <slot name="slot1" />
    </div>
    <div :class="$style.unit">
      <slot name="slot2" />
    </div>
  </div>
</template>

<style lang="scss" module>
.row {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
