<script>
import {getters} from '../store';
import AppAlert from './AppAlert';

export default {
  name: 'FlashMessages',
  components: {
    AppAlert,
  },
  computed: {
    ...getters,
    messages() {
      const $t = this.$t.bind(this);
      return this.flashMessages.map(function(message) {
        if (message.translationKey) {
          message.text = $t(message.translationKey);
        }
        return message;
      });
    },
  }
}
</script>

<template>
  <div>
    <AppAlert
      v-for="message in messages"
      :key="message.text"

      :scheme="message.scheme"
    >
      {{ message.text }}
    </AppAlert>
  </div>
</template>

