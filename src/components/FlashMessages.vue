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
        const newMessage = {...message};
        if (newMessage.translationKey) {
          newMessage.text = $t(newMessage.translationKey);
        }
        return newMessage;
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

