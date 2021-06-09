<script>
import {actions, getters} from '../store';
import {enabledMethods} from '../config';
import MethodButton from '../components/methodButtons/MethodButton';

export default {
  name: 'MethodSelection',
  components: {
    MethodButton,
  },
  computed: {
    ...getters,
    authMethods() {
      return enabledMethods.filter(method => {
        const {countryCode} = this;
        const whitelist = method.whitelist || [];
        const blacklist = method.blacklist || [];
        let enabled = true;
        if (whitelist.length && !whitelist.includes(countryCode)) {
          enabled = false;
        }
        if (blacklist.length && blacklist.includes(countryCode)) {
          enabled = false;
        }
        return enabled;
      });
    },
  },
  methods: {
    ...actions,
    signWithSmartCard() {
      this.loadingStart();
      this.clearFlashMessages();
      this.$signingClient.signature.smartCard.sign({
        iframeHolder: this.$refs.iframeHolder,
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
    handleMethodSelection(method) {
      // we do not need a separate view to handle smart card signing as
      // it doesn't involve any form filling or additional actions in the this widget
      if (method === 'smartCard') {
        this.signWithSmartCard();
      } else {
        this.selectMethod(method)
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
        :class="[$style.unit, {[$style.unit6]: authMethods.length > 1}]"
      >
        <MethodButton
          :button-name="method.buttonName"
          :disabled="isLoading"
          :on-click="() => handleMethodSelection(method.method)"
        />
      </div>
    </div>
    <div ref="iframeHolder" />
  </div>
</template>

<style lang="scss" module>
.row {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.unit {
  padding: $spacer-2 $spacer-2;
  flex-grow: 1;
}

</style>
