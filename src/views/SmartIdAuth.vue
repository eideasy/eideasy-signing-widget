<script>
import AppForm from '../components/AppForm';
import {actions, getters} from '../store';
import getFieldErrors from '../getFieldErrors';
import AppButton from '../components/AppButton';
import ChallengeLoader from '../components/ChallengeLoader';

export default {
  name: 'SmartIdAuth',
  components: {
    AppForm,
    AppButton,
    ChallengeLoader,
  },
  data() {
    return {
      formValue: {},
      fieldErrors: {},
      challenge: undefined,
      authProcess: {},
    }
  },
  computed: {
    ...getters,
    schema() {
      return  [
        {
          type: 'text',
          name: 'idcode',
          label: this.$t('personalIdCode'),
          validation: ['required'],
        },
        {
          type: 'submit',
          label: this.$t('logIn')
        }
      ]
    },
  },
  beforeDestroy() {
    this.cancel();
  },
  methods: {
    ...actions,
    clearErrors() {
      this.fieldErrors = {};
    },
    cancel() {
      const {cancel} = this.authProcess;
      if (cancel) {
        cancel();
      }
    },
    authenticate() {
      this.loadingStart();
      this.clearFlashMessages();
      this.clearErrors();
      this.authProcess = this.$eidEasyClient.smartId.authenticate({
        ...this.formValue,
        started: (result) => {
          if (result.data && result.data.challenge) {
            this.challenge = result.data.challenge;
            this.loadingEnd();
          }
        },
        fail: (result) => {
          if (!result.cancelled) {
            this.addFlashMessage(result);
          }
          this.fieldErrors = getFieldErrors(result);
        },
        success: (result) => {
          this.$eidEasyOnSuccess(result);
        },
        finished: () => {
          this.challenge = undefined;
          this.loadingEnd();
        },
      });
    }
  },
}
</script>

<template>
  <div :class="$style.formContainer">
    <div
      v-if="challenge"
      :class="$style.challenge"
    >
      <ChallengeLoader :challenge="challenge" />
      <AppButton
        scheme="secondary"
        :on-click="() => cancel()"
      >
        {{ $t('cancel') }}
      </AppButton>
    </div>
    <div v-else>
      <AppForm
        id="smartIdForm"
        v-model="formValue"
        :schema="schema"
        :on-submit="authenticate"
        :errors="fieldErrors"
      />
    </div>
  </div>
</template>

<style lang="scss" module>
.formContainer {
  max-width: $form-container-width;
  margin: 0 auto;
}
</style>
