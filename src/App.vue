<script>
import AppLayout from "./components/AppLayout";
import {actions, getters} from './store';

export default {
  name: 'App',
  components: {
    AppLayout,
  },
  props: {
    language: {
      type: String,
      default: 'en',
    },
    countryCode: {
      type: String,
      default: 'EE',
    },
    clientId: {
      type: String,
      required: true,
    },
    sandbox: Boolean,
    translations: {
      type: Object,
      default: () => ({}),
    },
    onSuccess: {
      type: Function,
      default: () => {},
    },
    localApiEndpoints: {
      type: Object,
      required: true,
    },
    idHost: {
      type: String,
      default: 'https://id.eideasy.com',
    },
  },
  computed: {
    countryCodeFromStore: getters.countryCode,
  },
  watch: {
    countryCodeFromStore: {
      handler(newVal) {
        this.$signingClient.setCountryCode(newVal);
      },
      immediate: true,
    },
    language: {
      handler(newVal) {
        this.$i18n.locale = newVal;
        this.$signingClient.setLanguage(newVal);
      },
      immediate: true,
    },
  },
  created: function () {
    const {translations, $i18n} = this;
    this.changeCountry(this.countryCode);

    if (translations) {
      Object.keys(translations)
          .forEach((locale) => {
            const currentMessages = $i18n.messages[locale] || {};
            $i18n.setLocaleMessage(locale, {...currentMessages, ...translations[locale]});
          });
    }
  },
  methods: {
    ...actions,
  },
}
</script>

<template>
  <div :class="$style.app">
    <AppLayout />
  </div>
</template>

<style lang="scss" module>
.app {
  font-family: $font-family;
  font-size: $font-size-base;
  font-weight: $font-weight-normal;
  line-height: $line-height;
}

.app * {
  box-sizing: border-box;
}
</style>
