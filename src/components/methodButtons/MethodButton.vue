<script>
import methodButtons from './methodButtons';

export default {
  name: 'MethodButton',
  components: {
    ...methodButtons,
  },
  props: {
    buttonName: String,
    onClick: Function,
    disabled: Boolean,
  },
  methods: {
    handleClick(e) {
      if (!this.disabled) {
        this.onClick(e);
      }
    }
  },
}
</script>

<template>
  <a
    href="#"
    role="button"
    :class="$style.methodButton"
    :disabled="disabled"
    @click.prevent="handleClick"
  >
    <Component :is="buttonName" />
  </a>
</template>

<style lang="scss" module>
.methodButton {
  display: block;
  font-size: 16px;
  width: 100%;
  color: $gray-700;
  text-decoration: none;
  outline: none;
  text-align: center;
  cursor: pointer;
  transform: translateY(0);
  transition: .1s;
  border: $border-default;
  border-radius: $border-radius;
  height: 43px;
  user-select: none;
  background-color: $white;
  min-width: 168px;

  &:hover,
  &:focus {
    text-decoration: none;
    outline: none;
    border-color: $brand-primary-200;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.1);
  }
  &:active {
    transform: translateY(1px);
  }
}

.row {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
