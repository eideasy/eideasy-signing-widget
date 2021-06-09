<script>
import schemeMixin from '../schemeMixin';
export default {
  name: 'AppSpinner',
  mixins: [schemeMixin(['primary', 'secondary'])],
}
</script>

<template>
  <div :class="[$style.spinner, schemeClassName]" />
</template>

<style lang="scss" module>
.spinner {
  color: $theme-color-primary-400;
  font-size: 1em;
  width: 4.375em;
  height: 4.375em;
  border: 0.3125em solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-left: auto;
  margin-right: auto;
}

.secondary {
  color: $secondary;
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>
