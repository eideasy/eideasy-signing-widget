import createClient from '@eid-easy/eideasy-js-sdk';

// define a Vue plugin
// https://vuejs.org/v2/guide/plugins.html
const eidEasyClient = {
  install(Vue, options) {
    Vue.prototype.$eidEasyClient = createClient(options);
    Vue.prototype.$eidEasyOnSuccess = (result) => {
      if (options.onSuccess && typeof options.onSuccess === 'function') {
        options.onSuccess(result);
      }
    };
  }
}

export default eidEasyClient;
