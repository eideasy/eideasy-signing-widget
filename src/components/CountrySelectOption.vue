<script>
function importAll(r) {
  let images = {};
  r.keys().map((item) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const images = importAll(require.context('../assets/country-flag-icons/3x2', false, /\.(png|jpe?g|svg)$/));

export default {
  name: 'CountrySelectOption',
  props: {
    option: {
      type: Object,
      required: true,
    },
  },
  computed: {
    dynamicIcon() {
      return images[`${this.option.countryCode}.svg`]
    }
  },
}
</script>

<template>
  <div :class="$style.option">
    <component :is="dynamicIcon" />
    <div :class="$style.optionText">
      {{ option.label }}
    </div>
  </div>
</template>

<style lang="scss" module>
.option {
  display: flex;
  width: 100%;
}

.optionText {
  font-size: $font-size-base;
  color: $select-text;
  letter-spacing: 0.009375em;
  margin-left: $spacer-4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.option svg {
  display: block;
  width: 26px;
  height: auto;
}
</style>
