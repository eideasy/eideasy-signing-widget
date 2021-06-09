<script>
export default {
  name: 'BackButton',
  props: {
    onClick: Function,
    disabled: Boolean,
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
  <a
    :class="$style.button"
    href="#"
    @click.prevent="handleClick"
  >
    <div :class="$style.backIcon">
      <div :class="$style.backCaret" />
    </div>
    <div :class="$style.text">
      {{ $t('back') }}
    </div>
  </a>
</template>

<style lang="scss" module>
  .button {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: $gray-700;
    transition: $transition-duration-link-hover;

    &:hover,
    &:focus {
      text-decoration: none;
      color: $primary;
    }
  }

  .text {
    @extend .uppercase-sm;
  }

  .backIcon {
    position: relative;
    margin-right: $spacer-2;
    font-size: 16px;
    border: 1px solid currentColor;
    width: 1.5em;
    height: 1.5em;
    border-radius: 1.5em;
  }

  .backCaret {
    position: absolute;
    left: 0.5625em;
    top: 50%;
    margin-top: -0.1875em;
    display: block;
    width: 0.375em;
    height: 0.375em;
    border-left: 1px solid currentColor;
    border-bottom: 1px solid currentColor;
    transform: rotateZ(45deg);
  }
</style>
