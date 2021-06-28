<script>
import CountrySelectOption from './CountrySelectOption';
import {actions, getters} from '../store';
import {availableCountries} from '../config';
import countries from '../i18n/countries';

export default {
  name: 'CountrySelect',
  components: {
    CountrySelectOption,
  },
  data() {
    return {
      availableCountries,
    }
  },
  computed: {
    ...getters,
    value() {
      const {countryCode} = this;
      return {
        label: countries.getName(countryCode, this.$i18n.locale, {select: "official"}),
        countryCode,
      }
    },
    options() {
      return this.availableCountries.map((countryCode) => ({
        label: countries.getName(countryCode, this.$i18n.locale, {select: "official"}),
        countryCode,
      })).sort((a, b) => a.label.localeCompare(b.label));
    }
  },
  methods: {
    ...actions,
  }
}
</script>

<template>
  <v-select
    :value="value"
    :options="options"
    :class="$style.select"
    :clearable="false"
    @input="(value) => changeCountry(value.countryCode)"
  >
    <template
      slot="option"
      slot-scope="option"
    >
      <CountrySelectOption :option="option" />
    </template>

    <template
      slot="no-options"
    >
      <div :class="$style.noOptions">
        {{ $t('noMatchingCountries') }}
      </div>
    </template>

    <template #selected-option-container="{ option }">
      <div class="vs__selected">
        <CountrySelectOption :option="option" />
      </div>
    </template>

    <template #open-indicator="{ attributes }">
      <span
        v-bind="attributes"
        :class="$style.caretDown"
      />
    </template>
  </v-select>
</template>

<style lang="scss" module>
  .select {
    position: relative;
    font-family: inherit;
    width: 100%;
  }

  .caretDown {
    color: rgba($black, 0.6);
    width: 8px;
    height: 8px;
    border-left: 2px solid currentColor;
    border-bottom: 2px solid currentColor;
    transform: rotateZ(-45deg);
  }

  .noOptions {
    padding-left: 10px;
    padding-right: 10px;
  }

  .select :global {
    .vs--searchable .vs__dropdown-toggle {
      cursor: text;
    }

    .vs__dropdown-toggle {
      appearance: none;
      display: flex;
      padding: 12px 0;
      background: $select-bg;
      border: $input-border;
      border-radius: $border-radius-form-element;
      white-space: normal;
    }

    .vs__selected-options {
      display: flex;
      flex-basis: 100%;
      flex-grow: 1;
      flex-wrap: wrap;
      padding: 0 6px;
      position: relative;
      width: calc(100% - 31px);
    }

    .vs__dropdown-option {
      line-height: 1.42857143;
      display: block;
      padding: 6px $spacer-3;
      clear: both;
      color: $select-text;
    }

    .vs__dropdown-option--highlight {
      background: rgba($primary, 0.2);
      color: #fff;
    }

    .vs__dropdown-option:hover {
      cursor: pointer;
    }

    .vs__search,
    .vs__search:focus {
      appearance: none !important;
      line-height: 1.4;
      font-size: 1em;
      border: 1px solid transparent !important;
      outline: none !important;
      margin: 4px 0 0;
      padding: 0 7px;
      background: none;
      box-shadow: none;
      width: 0;
      max-width: 100%;
      flex-grow: 1;
      z-index: 1;
      position: absolute;
      height: auto !important;
      min-height: 0 !important;
    }

    .vs__search::-webkit-search-decoration,
    .vs__search::-webkit-search-cancel-button,
    .vs__search::-webkit-search-results-button,
    .vs__search::-webkit-search-results-decoration {
      -webkit-appearance: none !important;
    }

    .vs__actions {
      display: flex;
      align-items: center;
      padding: 0 19px 0 4px;
    }

    .vs__clear {
      fill: rgba(60,60,60,.5);
      padding: 0;
      border: 0;
      background-color: transparent;
      cursor: pointer;
      margin-right: 8px;
    }

    .vs__open-indicator {
      fill: rgba(60,60,60,.5);
      transform: scale(1);
      transition: transform .15s cubic-bezier(1,-.115,.975,.855);
      transition-timing-function: cubic-bezier(1,-.115,.975,.855);
    }

    .vs__dropdown-menu {
      display: block;
      position: absolute;
      top: calc(100% - 1px);
      left: 0;
      z-index: 1000;
      padding: 5px 0;
      margin: 0;
      width: 100%;
      max-height: 350px;
      min-width: 160px;
      overflow-y: auto;
      box-shadow: 0 3px 6px 0 rgb(0 0 0 / 15%);
      border: 1px solid rgba(60,60,60,.26);
      border-top-style: none;
      border-radius: 0 0 4px 4px;
      text-align: left;
      list-style: none;
      background: $select-bg;
    }

    .vs__selected {
      display: flex;
      align-items: center;
      background-color: rgba($primary, 0.2);
      border: 1px solid rgba(60,60,60,.26);
      border-radius: 4px;
      color: #333;
      line-height: 1.4;
      margin: 4px 2px 0;
      padding: 0 .25em;
      z-index: 0;
      width: 100%;
    }
  }

  //https://github.com/css-modules/css-modules/issues/295#issuecomment-404873976
  :global {
    :local(.select) {
      &.vs--single .vs__selected {
        background-color: transparent;
        border-color: transparent;
      }
      &.vs--single.vs--open .vs__selected {
        position: absolute;
        opacity: 0.4;
      }
      &.vs--single.vs--searching .vs__selected {
        display: none;
      }

      &.vs--single.vs--open .vs__search,
      &.vs--single.vs--searching .vs__search {
        position: static;
      }
    }
  }
</style>
