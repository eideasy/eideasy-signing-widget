<script>
import BackButton from './BackButton';
import {getters, actions} from '../store';
import viewNames from '../views/viewNames';
export default {
  name: 'HeaderContentSubView',
  components: {
    BackButton,
  },
  data() {
    return {
      viewNames,
    }
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
  <div :class="$style.headerRow">
    <div :class="$style.left">
      <BackButton :on-click="() => changeView(viewNames.MethodSelection)" />
    </div>

    <div :class="$style.right">
      <div :class="$style.viewTitle">
        {{ $t(currentViewTitleKey) }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
.headerRow {
  display: flex;
  align-items: center;
  height: 100%;
  min-height: 54px;
}

.right {
  margin-left: auto;
}

.viewTitle {
  @extend .uppercase-sm;
  text-align: right;
  letter-spacing: 0.03667em;
  color: $primary;
}
</style>
