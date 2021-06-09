<script>
import MethodButtonBase from './MethodButtonBase';
import AppIcon from '../../icons/AppIcon';
export default {
  name: 'IdCardButton',
  components: {
    MethodButtonBase,
    AppIcon,
  },
}
</script>

<template>
  <MethodButtonBase>
    <template v-slot:slot1>
      <AppIcon icon-name="IconIdCard" />
    </template>
    <template v-slot:slot2>
      {{ $t('idCard') }}
    </template>
  </MethodButtonBase>
</template>
