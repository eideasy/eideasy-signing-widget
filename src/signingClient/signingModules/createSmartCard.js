import createResultStore, {actionTypes} from './createResultStore';

const MODULE_NAME = 'smartCard';
const createSmartCard = function createSmartCard({
  coreContext,
  apiClient,
}) {
  const {i18n, config: coreConfig} = coreContext;

  const createIframe = function createIframe(settings = {}) {
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
  };

  const getCertificate = function getCertificate(settings = {}) {
    const {iframe} = settings;
    const promise = new Promise((resolve, reject) => {
      window.addEventListener('message', (e) => {
        const {operation, error} = e.data;
        if (error) {
          reject(e.data);
        } else if (operation === 'getCertificate') {
          resolve(e.data);
        } else {
          reject(e.data);
        }
      }, {once: true});
    });

    iframe.contentWindow.postMessage({
      operation: 'getCertificate',
    }, settings.idHost);

    return promise;
  };

  const startSigning = function startSigning(settings = {}) {
    let url = settings.idHost + '/api/signatures/start-signing';
    return apiClient.post({
      url,
      data: {
        client_id: '',
        secret: '',
        doc_id: '',
        sign_type: '',
      },
      cancelToken: settings.cancelToken,
    });
  };


  const createSignature = function createSignature(settings = {}) {
    console.log(settings);
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
        iframe = await createIframe({
          ...config,
        });
      } catch (error) {
        console.error(error);
        dispatch(actionTypes.addResult, {error});
      }

      let getCertificateResult;
      if (!getState().error && iframe) {
        try {
          getCertificateResult = await getCertificate({
            ...config,
            iframe,
          });
        } catch (error) {
          console.error(error);
          dispatch(actionTypes.addResult, {error});
          dispatch(actionTypes.addMessage, i18n.t('readCertificatesFail'));
        }
      }

      if (getCertificateResult) {
        console.log(getCertificateResult);
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
