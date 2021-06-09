<script>
import {getters, actions} from '../store';
import AppFooter from './AppFooter';
import AppHeader from './AppHeader';
import LoadingOverlay from './LoadingOverlay';
import AppAlert from './AppAlert';
import FlashMessages from './FlashMessages';
import BackButton from './BackButton';
import CountrySelect from './CountrySelect';
import HeaderContentCountry from './HeaderContentCountry';
import HeaderContentSubView from './HeaderContentSubView';
import views from '../views/views';

export default {
  name: 'AppLayout',
  components: {
    AppFooter,
    AppHeader,
    LoadingOverlay,
    AppAlert,
    FlashMessages,
    BackButton,
    CountrySelect,
    HeaderContentCountry,
    HeaderContentSubView,
    ...views,
  },
  computed: {
    ...getters,
  },
  methods: {
    ...actions,
  },
}
</script>

<template>
  <div :class="$style.layout">
    <AppHeader>
      <HeaderContentCountry v-if="currentView === 'MethodSelection'" />
      <HeaderContentSubView v-else />
    </AppHeader>
    <div :class="$style.main">
      <FlashMessages />
      <transition
        :name="$style.fade"
      >
        <LoadingOverlay v-show="isLoading" />
      </transition>
      <component :is="currentView" />
    </div>
    <AppFooter>
      <a
        href="https://eideasy.com"
        :class="$style.eidEasyLink"
        target="_blank"
      >
        {{ $t("poweredByEidEasy") }}
      </a>
    </AppFooter>
  </div>
</template>

<style lang="scss" module>
  .layout {
    background-color: $gray-100;
    border-radius: $border-radius;
    border: 1px solid $border-color;
    overflow: hidden;
  }

  .main {
    position: relative;
    padding: $spacer-6 $spacer-10;
  }

  .fade {
    &:global(-enter-active),
    &:global(-leave-active) {
      transition: opacity .2s;
    }
    &:global(-enter),
    &:global(-leave-to) {
      opacity: 0;
    }
  }

  .eidEasyLink {
    text-decoration: none;
    color: currentColor;
    transition: $transition-duration;

    &:hover,
    &:focus {
      text-decoration: none;
      color: $primary;
    }
  }
</style>
