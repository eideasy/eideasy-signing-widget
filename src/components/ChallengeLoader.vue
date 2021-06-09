<script>
import AppSpinner from './AppSpinner';
export default {
  name: 'ChallengeLoader',
  components: {
    AppSpinner,
  },
  props: {
    challenge: String,
  }
}
</script>

<template>
  <div
    :class="$style.challenge"
  >
    <div :class="$style.loader">
      <AppSpinner scheme="secondary" />
    </div>
    <div :class="$style.challengeTitle">
      {{ $t('yourVerificationCode') }}
    </div>
    <div :class="$style.challengeCode">
      {{ challenge }}
    </div>
  </div>
</template>

<style lang="scss" module>
.challenge {
  text-align: center;
  color: $primary;
}

.loader {
  font-size: 14px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: $spacer-6;
}

.challengeTitle {
  text-transform: uppercase;
  font-size: $font-size-sm;
  font-weight: $font-weight-bold;
  letter-spacing: 0.03667em;
}

.challengeCode {
  font-size: 28px;
  font-weight: $font-weight-bold;
  letter-spacing: 0.005357em;
  margin-bottom: $spacer-4;
}
</style>
