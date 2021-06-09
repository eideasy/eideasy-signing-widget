<script>
export default {
  name: 'AppAlert',
  props: {
    scheme: {
      validator: function (value) {
        return ['success', 'danger', 'warning', 'info', 'primary'].indexOf(value) !== -1
      }
    }
  },
  computed: {
    schemeClassName() {
      return this.$style[this.scheme];
    }
  }
}
</script>

<template>
  <div :class="[$style.alert, schemeClassName]">
    <slot name="header" />
    <slot />
  </div>
</template>

<style lang="scss" module>
  .alert {
    font-size: $font-size-md;
    position: relative;
    padding: $spacer-2 $spacer-3;
    margin-bottom: $spacer-4;
    border: 1px solid transparent;
    border-radius: $border-radius;
    line-height: $line-height;
  }

  @mixin alert-variant($background, $border, $color) {
    color: $color;
    background-color: $background;
    border-color: $border;

    .alert-link {
      color: shade-color($color, 20%);
    }
  }

  @each $state, $value in $alert-colors {
    $alert-background: shift-color($value, $alert-bg-scale);
    $alert-border: shift-color($value, $alert-border-scale);
    $alert-color: shift-color($value, $alert-color-scale);
    @if (contrast-ratio($alert-background, $alert-color) < $min-contrast-ratio) {
      $alert-color: mix($value, color-contrast($alert-background), abs($alert-color-scale));
    }
    .#{$state} {
      @include alert-variant($alert-background, $alert-border, $alert-color);
    }
  }

  .alert + .alert {
    margin-top: $spacer-3;
  }
</style>
