import createResultStore, {actionTypes} from './createResultStore';

const MODULE_NAME = 'smartCard';
const createSmartCard = function createSmartCard({
  coreContext,
  apiClient,
}) {
  const {i18n, config: coreConfig} = coreContext;

  const createIframe = function createIframe(settings = {}) {
    const iframe = document.createElement('iframe');
    iframe.setAttribute('src', `${settings.idHost}/signatures/integration/id-card`);
    iframe.setAttribute('referrerpolicy', 'origin');
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.position = 'absolute';
    iframe.style.border = '0';
    settings.iframeHolder.innerHTML = '';
    const promise = new Promise((resolve, reject) => {
      window.addEventListener('message', (e) => {
        const {operation, error} = e.data;
        if (error) {
          reject(e.data);
        } else if (operation === 'ready' || operation === 'welcome') {
          resolve(iframe);
        } else {
          reject(e.data);
        }
      }, {once: true});
      window.setTimeout(() => reject({message: i18n.t('createIframeTimeout')}), 30*1000);
    });
    settings.iframeHolder.appendChild(iframe);
    return promise;
  };

  const createMessenger = function createMessenger(settings) {
    const {iframe, idHost} = settings;
    return {
      post(message) {
        iframe.contentWindow.postMessage(message, idHost);
      }
    }
  }

  const getCertificate = function getCertificate(settings = {}) {
    const {messenger} = settings;
    const promise = new Promise((resolve, reject) => {
      window.addEventListener('message', (e) => {
        const {result, cert} = e.data;
        if (result === 'ok' && cert) {
          resolve(e.data);
        } else {
          reject(e.data);
        }
      }, {once: true});
    });

    messenger.post({
      operation: 'getCertificate',
    });

    return promise;
  };

  const startSigning = function startSigning(settings = {}) {
    const {countryCode, idHost, cancelToken, certificate, clientId, docId} = settings;
    let url = idHost + '/api/signatures/start-signing';
    return apiClient.post({
      url,
      data: {
        client_id: clientId,
        doc_id: docId,
        sign_type: 'id-card',
        certificate,
      },
      cancelToken,
    });
  };

  const getSignature = function createSignature(settings = {}) {
    const {messenger, hexDigest} = settings;
    const promise = new Promise((resolve, reject) => {
      window.addEventListener('message', (e) => {
        const {result, signature} = e.data;
        if (result === 'ok' && signature) {
          resolve(e.data);
        } else {
          reject(e.data);
        }
      }, {once: true});
    });

    messenger.post({
      operation: 'getSignature',
      hexDigest,
    });

    return promise;
  };

  const completeSigning = function completeSigning(settings = {}) {
    const {signature, clientId, docId, cancelToken, idHost} = settings;
    let url = idHost + '/api/signatures/id-card/complete';
    return apiClient.post({
      url,
      data: {
        client_id: clientId,
        doc_id: docId,
        signature_value: signature,
      },
      cancelToken,
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
      let messenger;
      const {getState, dispatch} = createResultStore();
      try {
        iframe = await createIframe({
          ...config,
        });
      } catch (error) {
        console.error(error);
        dispatch(actionTypes.addResult, {error});
        if (error.message) {
          dispatch(actionTypes.addMessage, error.message);
        }
      }

      if (iframe) {
        messenger = createMessenger({
          idHost: config.idHost,
          iframe,
        });
      }

      let certificateResult;
      if (!getState().error && messenger) {
        try {
          certificateResult = await getCertificate({
            ...config,
            messenger,
          });
        } catch (error) {
          console.error(error);
          dispatch(actionTypes.addResult, {error});
          dispatch(actionTypes.addMessage, i18n.t('readCertificatesFail'));
        }
      }

      let startSigningResult;
      if (certificateResult && certificateResult.cert) {
        try {
          startSigningResult = await startSigning({
            ...config,
            certificate: certificateResult.cert,
          });
        } catch (error) {
          console.error(error);
          dispatch(actionTypes.addResult, {error});
        }
      }

      let getSignatureResult;
      if (startSigningResult && startSigningResult.data && startSigningResult.data.hexDigest) {
        try {
          getSignatureResult = await getSignature({
            ...config,
            hexDigest: startSigningResult.data.hexDigest,
            messenger,
          });
        } catch (error) {
          console.error(error);
          dispatch(actionTypes.addResult, {error});
        }
      }

      let completeSigningResult;
      if (getSignatureResult && getSignatureResult.signature) {
        try {
          completeSigningResult = await completeSigning({
            ...config,
            signature: getSignatureResult.signature,
          });
          dispatch(actionTypes.addResult, completeSigningResult);
        } catch (error) {
          console.error(error);
          dispatch(actionTypes.addResult, {error});
        }
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
