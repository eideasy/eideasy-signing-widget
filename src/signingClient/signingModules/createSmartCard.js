import createResultStore, {actionTypes} from './createResultStore';

const MODULE_NAME = 'smartCard';
const createSmartCard = function createSmartCard({
  coreContext,
  apiClient,
}) {
  const {i18n, config: coreConfig} = coreContext;

  const step1 = function step1(settings = {}) {
    const iframe = document.createElement('iframe');
    iframe.setAttribute('src', `${settings.idHost}/signatures/integration/id-card?country=${settings.countryCode}`);
    iframe.style.width = '200px';
    iframe.style.height = '100px';
    settings.iframeHolder.innerHTML = '';
    settings.iframeHolder.appendChild(iframe);

    return new Promise((resolve, reject) => {
      window.addEventListener('message', (e) => {
        const {operation, error} = e.data;
        if (error) {
          reject(e.data);
        } else if (operation === 'ready') {
          resolve(iframe);
        } else {
          reject(e.data);
        }
      }, {once: true});
    });
  }

  const step2 = function step2(settings = {}) {
    return apiClient.post({
      url: settings.localApiEndpoints.identityFinish,
      data: {
        token: settings.data.token,
        country: settings.countryCode,
        lang: settings.language,
      },
      cancelToken: settings.cancelToken,
    });
  };

  const sign = function sign(settings = {}) {
    const config = {...coreConfig, ...settings};
    const {
      success = () => {
      },
      fail = () => {
      },
      finished = () => {
      },
    } = config;

    const language = settings.language || i18n.getCurrentLanguage();

    async function execute() {
      let iframe;
      const {getState, dispatch} = createResultStore();
      try {
        iframe = await step1({
          ...config,
        });
      } catch (error) {
        console.error(error);
        dispatch(actionTypes.addResult, {error});
      }

      let step2Result;
      if (!getState().error && iframe) {
        try {
          step2Result = await step2({
            ...config,
            language,
          });
        } catch (error) {
          dispatch(actionTypes.addResult, {error});
        }
      }

      if (step2Result) {
        dispatch(actionTypes.addResult, step2Result);
      }

      if (getState().error) {
        fail(getState());
      } else {
        success(getState());
      }
      finished(getState());
    }

    execute().catch(console.error);

    return Object.freeze({
      cancel: function cancel() {},
    });
  };

  return Object.freeze({
    MODULE_NAME,
    sign,
  });
};

export default createSmartCard;
