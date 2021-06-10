<script>
import MethodButtonBase from './MethodButtonBase';
import IconIdCardEE from '../../assets/svg/id-kaart.svg';
export default {
  name: 'IdCardButtonEE',
  components: {
    MethodButtonBase,
    IconIdCardEE,
  },
}
</script>

<template>
  <MethodButtonBase>
    <template v-slot:slot1>
      <IconIdCardEE :class="$style.icon" />
    </template>
  </MethodButtonBase>
</template>


<style lang="scss" module>
.icon {
  display: block;
  width: 110px;
  height: auto;
}
</style>
