<script>
import {actions, getters} from '../store';
import {enabledMethodsByCountry} from '../config';
import MethodButton from '../components/methodButtons/MethodButton';

export default {
  name: 'MethodSelection',
  components: {
    MethodButton,
  },
  data() {
    return {
      enabledMethodsByCountry,
    }
  },
  computed: {
    ...getters,
    authMethods() {
      return enabledMethodsByCountry[this.countryCode];
    },
  },
  methods: {
    ...actions,
    authenticateWithIdCard() {
      this.loadingStart();
      this.clearFlashMessages();
      this.$eidEasyClient.idCard.authenticate({
        fail: (result) => {
          this.addFlashMessage(result);
        },
        success: (result) => {
          this.$eidEasyOnSuccess(result);
        },
        finished: () => {
          this.loadingEnd();
        },
      });
    },
    handleMethodSelection(methodName) {
      // we do not need a separate view to handle id card authentication as
      // it doesn't involve any form filling or additional actions in the this widget
      // so we can just handle the ID auth here
      if (methodName === 'idCard') {
        this.authenticateWithIdCard();
      } else {
        this.selectMethod(methodName)
      }
    },
  }
}
</script>

<template>
  <div :class="$style.methodSelection">
    <div :class="$style.row">
      <div
        v-for="method in authMethods"
        :key="method.name"
        :class="$style.unit"
      >
        <MethodButton
          :button-name="method.buttonName"
          :disabled="isLoading"
          :on-click="() => handleMethodSelection(method.name)"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
.row {
  display: flex;
  justify-content: center;
  margin-left: -$spacer-3;
  margin-right: -$spacer-3;
  flex-wrap: wrap;
}

.unit {
  width: 100%;
  padding: $spacer-2 $spacer-6;
}
</style>
