<script>
import FormButton from './FormButton';
import FormField from './FormField';

const formComponentsByType = {
  submit: 'FormButton',
  text: 'FormField',
  number: 'FormField',
  tel: 'FormField',
};

export default {
  name: 'AppForm',
  components: {
    FormField,
    FormButton,
  },
  model: {
    prop: 'formValue',
    event: 'input'
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    schema: {
      required: true,
      type: Array,
    },
    formValue: {
      type: Object,
      default: () => ({}),
    },
    onSubmit: {
      type: Function,
      default: () => {},
    },
    errors: {
      type: Object,
      default: () => {},
    }
  },
  data() {
    return {
      formComponentsByType,
      validationErrors: {},
    }
  },
  computed: {
    hasFixableErrors() {
      return Object.keys(this.validationErrors).length > 0;
    },
  },
  watch: {
    formValue: {
      handler() {
        this.validate();
      },
      immediate: false,
    },
  },
  methods: {
    formComponentId(modifier) {
      if (modifier) {
        return this.id + '_' + modifier;
      }
      return undefined;
    },
    fieldErrors(name) {
      const fieldValidationErrors = this.validationErrors[name] || [];
      const fieldErrors = this.errors[name] || [];
      return [...fieldValidationErrors, ...fieldErrors];
    },
    handleInput(key, value) {
      this.formValue[key] = value;
      this.$emit('input', {
        ...this.formValue,
        [key]: value,
      })
    },
    handleSubmit() {
      this.validate({force: true});

      // fixable errors are errors that can be fixed on the client side and do not
      // need server side validation
      // for all the other errors, we want to allow the user to submit
      if (!this.hasFixableErrors) {
        this.onSubmit();
      }
    },
    validate(options = {}) {
      const validationErrors = {
        ...this.validationErrors,
      };
      this.schema.forEach(({name, validation}) => {
        const fieldValue = this.formValue[name];

        // do not validate fields that do not have validation rules
        if (!validation) {
          return;
        }

        // do not validate fields that the user has not yet touched
        // this avoids situations where user starts typing in one field, and all the other fields get
        // prematurely validated
        // we can use options.force to override this behaviour, e.g. when use clicks the submit button
        // we want to actually validate all the fields
        if (!options.force && fieldValue === undefined) {
          return;
        }
        const fieldErrors = this.validateField(fieldValue, validation);
        if (fieldErrors.length) {
          validationErrors[name] = fieldErrors;
        } else {
          delete validationErrors[name];
        }
      });
      this.validationErrors = validationErrors;
    },
    validateRule(value, rule) {
      if (rule === 'required') {
        if (!value) {
          return this.$t('thisFieldIsRequired');
        }
      }
    },
    validateField(value, rules) {
      return rules.reduce((acc, rule) => {
        const validationResult = this.validateRule(value, rule);
        if (validationResult) {
          acc.push(validationResult);
        }
        return acc;
      }, []);
    },
  }
}
</script>

<template>
  <form
    :id="id"
    @submit.prevent="handleSubmit"
  >
    <div
      v-for="item in schema"
      :key="item.name + item.label"
      :class="$style.formElement"
    >
      <Component
        :is="formComponentsByType[item.type]"
        v-bind="{
          ...item,
          id: formComponentId(item.name),
          value: formValue[item.name],
          errors: fieldErrors(item.name),
        }"
        @input="(value) => handleInput(item.name, value)"
      />
    </div>
  </form>
</template>

<style lang="scss" module>
.formElement {
  display: block;
}

.formElement + .formElement {
  margin-top: $spacer-6;
}
</style>
