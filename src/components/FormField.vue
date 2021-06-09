<script>
import AppInput from './AppInput';

export default {
  name: 'FormField',
  components: {
    AppInput,
  },
  props: {
    type: String,
    name: String,
    placeholder: String,
    id: String,
    label: String,
    errors: {
      type: Array,
      default: () => ([]),
    },
    value: [Number, String, Array, Object],
  },
  computed: {
    hasErrors() {
      return this.errors.length > 0;
    }
  },
  methods: {
    handleInput(value) {
      this.$emit('input', value)
    }
  }
}
</script>

<template>
  <div
    :class="$style.formField"
  >
    <label
      :for="id"
      :class="$style.label"
    >
      {{ label }}
    </label>
    <AppInput
      v-bind="{type, name, placeholder, id, value, hasErrors}"
      @input="handleInput"
    />
    <ul
      v-if="hasErrors"
      :class="$style.validationContainer"
    >
      <li
        v-for="error in errors"
        :key="error"
        :class="$style.validationMessage"
      >
        {{ error }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss" module>
.label {
  display: block;
  font-size: $font-size-md;
  color: $input-label-color;
  line-height: 1.1429;
  margin-bottom: $spacer-2;
  padding-left: $input-text-indent;
  letter-spacing: 0.028571em;
}

.validationContainer {
  @extend .reset-list;
  margin-top: $spacer-2;
}

.validationMessage {
  @extend .reset-list;
  font-size: $font-size-sm;
  padding-left: $input-text-indent;
  color: $danger;
}

.validationMessage + .validationMessage {
  margin-top: $spacer-1;
}
</style>
