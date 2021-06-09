<script>
import MethodButtonBase from './MethodButtonBase';
export default {
  name: 'SmartIdButton',
  components: {
    MethodButtonBase,
  },
}
</script>

<template>
  <MethodButtonBase>
    <template v-slot:slot1>
      <img
        src="../../assets/svg/smart-id.svg"
        alt="Smart-Id logo"
        :class="$style.image"
      >
    </template>
  </MethodButtonBase>
</template>


<style lang="scss" module>
.image {
  display: block;
  width: 110px;
  height: auto;
}
</style>
