import createResultStore, {actionTypes} from './createResultStore';

const MODULE_NAME = 'smartCard';
const createSmartCard = function createSmartCard({
  coreContext,
  apiClient,
}) {
  const {i18n, config: coreConfig} = coreContext;

  const step1 = function step1(settings = {}) {
    let url = `${settings.apiEndpoints.card(settings.countryCode)}/api/identity/${settings.clientId}/read-card`;
    if (settings.nonce) {
      url += `?nonce=${settings.nonce}`;
    }
    return apiClient.get({url, cancelToken: settings.cancelToken});
  };

  const step2 = function step2(settings = {}) {
    const method = {
      EE: 'ee-id-login',
      LV: 'lv-id-login',
      LT: 'lt-id-login',
    };

    return apiClient.post({
      url: settings.localApiEndpoints.identityFinish,
      data: {
        token: settings.data.token,
        country: settings.countryCode,
        method: method[settings.countryCode],
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

    const source = apiClient.CancelToken.source();
    const cancelToken = source.token;

    async function execute() {
      let step1Result;
      const {getState, dispatch} = createResultStore();
      try {
        step1Result = await step1({
          ...config,
          language,
          cancelToken,
        });
      } catch (error) {
        dispatch(actionTypes.addResult, {error});
        if (error.code === 'ECONNABORTED') {
          dispatch(actionTypes.addMessage, i18n.t('idCardReadTimeout'));
        }
      }

      let step2Result;
      if (!getState().error && step1Result && step1Result.status === 200) {
        try {
          step2Result = await step2({
            ...config,
            cancelToken,
            language,
            data: step1Result.data,
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
      cancel: function cancel() {
        source.cancel();
      },
    });
  };

  return Object.freeze({
    MODULE_NAME,
    sign,
  });
};

export default createSmartCard;
