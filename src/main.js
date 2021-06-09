import Vue from 'vue'
import App from './App.vue'
import vueCustomElement from 'vue-custom-element'
import i18n from './i18n/i18n';
import eidEasyClient from './eidEasyClient';
import vSelect from 'vue-select';

Vue.use(vueCustomElement);

Vue.config.productionTip = false

Vue.customElement('eideasy-widget', App, {
  beforeCreateVueInstance: RootComponentDefinition => {
    Vue.use(eidEasyClient, RootComponentDefinition.propsData);
    Vue.component('v-select', vSelect);
    RootComponentDefinition.i18n = i18n;
    return RootComponentDefinition;
  },
  attributeChangedCallback(name, oldValue, value) {
    console.info('attributeChangedCallback', name, oldValue, value);
  },
});


