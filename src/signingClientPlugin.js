import createSigningClient from './signingClient/createSigningClient';

// define a Vue plugin
// https://vuejs.org/v2/guide/plugins.html
const signingClientPlugin = {
  install(Vue, options) {
    Vue.prototype.$signingClient = createSigningClient(options);
    Vue.prototype.$eidEasyOnSuccess = (result) => {
      if (options.onSuccess && typeof options.onSuccess === 'function') {
        options.onSuccess(result);
      }
    };
  }
}

export default signingClientPlugin;
