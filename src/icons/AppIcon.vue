<script>
import IconBase from './IconBase.vue';
import icons from './icons';

export default {
  name: 'AppIcon',
  components: {
    IconBase,
    ...icons,
  },
  props: {
    iconName: String,
  }
}
</script>

<template>
  <IconBase>
    <Component :is="iconName" />
  </IconBase>
</template>

