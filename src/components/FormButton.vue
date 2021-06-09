<script>
import AppButton from './AppButton';

export default {
  name: 'FormButton',
  components: {
    AppButton,
  },
  props: {
    label: String,
    type: String,
  }
}
</script>

<template>
  <AppButton :type="type">
    {{ label }}
  </AppButton>
</template>

<style lang="scss" module>

</style>
