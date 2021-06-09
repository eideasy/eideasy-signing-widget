<script>
import schemeMixin from '../schemeMixin';

export default {
  name: 'AppButton',
  mixins: [schemeMixin(['primary', 'secondary'])],
  props: {
    type: String,
    onClick: Function,
  },
  methods: {
    handleClick(e) {
      if (!this.disabled && this.onClick) {
        this.onClick(e);
      }
    }
  }
}
</script>

<template>
  <button
    :type="type"
    :class="[$style.button, schemeClassName]"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<style lang="scss" module>
.button {
  color: $brand-primary-50;
  background-color: $brand-primary-200;
  width: 100%;
  display: block;
  padding: $spacer-4 $spacer-4;
  cursor: pointer;
  text-transform: uppercase;
  transition: background-color $transition-duration;
  border-radius: $border-radius-form-element;
  border: 1px solid rgba(0, 49, 104, 0.3);
  outline: none;
  box-shadow: none;
  font-size: $font-size-md;
  letter-spacing: 0.01071em;
  line-height: 1.45;

  &:hover,
  &:focus {
    background-color: $brand-primary-300;
    outline: none;
  }

  &:active {
    transform: translateY(1px);
  }
}

.secondary {
  color: $white;
  background-color: $gray-650;
  border-color: $gray-650;

  &:hover,
  &:focus {
    background-color: $gray-680;
    border-color: $gray-680;
  }
}
</style>
