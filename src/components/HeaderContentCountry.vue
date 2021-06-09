<script>
import CountrySelect from './CountrySelect';
export default {
  name: 'HeaderContentCountry',
  components: {
    CountrySelect,
  }
}
</script>

<template>
  <div :class="$style.headerRow">
    <div :class="[$style.left, $style.regionTitle]">
      {{ $t('yourRegion') }}
    </div>
    <div :class="$style.right">
      <CountrySelect />
    </div>
  </div>
</template>

<style lang="scss" module>
.headerRow {
  display: flex;
  align-items: center;
  height: 100%;
  flex-wrap: wrap;
  justify-content: space-between;
}

.left {
  padding: $spacer-1 $spacer-2 $spacer-1 0;
  flex-shrink: 0;
}

.right {
  width: 100%;
  max-width: 263px;
  min-width: 0;
}

.regionTitle {
  color: $gray-700;
  @extend .uppercase-sm;
}
</style>
