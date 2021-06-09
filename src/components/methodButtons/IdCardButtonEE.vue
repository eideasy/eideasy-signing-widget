<script>
import MethodButtonBase from './MethodButtonBase';
export default {
  name: 'IdCardButtonEE',
  components: {
    MethodButtonBase,
  },
}
</script>

<template>
  <MethodButtonBase>
    <template v-slot:slot1>
      <img
        src="../../assets/svg/id-kaart.svg"
        alt="Estonian ID card logo"
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
