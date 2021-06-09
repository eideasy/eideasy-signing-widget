import createResultStore, {actionTypes} from './createResultStore';

const MODULE_NAME = 'smartCard';
const createSmartCard = function createSmartCard({
  coreContext,
}) {
  const {i18n, config: coreConfig} = coreContext;

  const step1 = async function step1(settings = {}) {
    const iframe = document.createElement('iframe');
    iframe.setAttribute('src', 'https://id.eideasy.com/signatures/integration/id-card?country=' + settings.countryCode);
    iframe.style.width = '200px';
    iframe.style.height = '100px';
    settings.iframeHolder.innerHTML = '';
    settings.iframeHolder.appendChild(iframe);
    iframe.postMessage({
      operation: 'getSignature',
      hexDigest: 'hexDigest received from start-signing API call'
    }, 'https://id.eideasy.com');
    window.addEventListener('message', async (e) => {
      console.log(e);
      if (e.data.operation === "getSignature") {
        // use e.data.signature_value
        // Continue to the finalizing the document, adding timestamp and OCSP responses
        // {{url}}/api/signatures/{{method}}/complete
      }
    }, false);
  };

  const step2 = function step2() {

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
      let step1Result;
      const {getState, dispatch} = createResultStore();
      try {
        step1Result = await step1({
          ...config,
          language,
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
      cancel: function cancel() {},
    });
  };

  return Object.freeze({
    MODULE_NAME,
    sign,
  });
};

export default createSmartCard;
