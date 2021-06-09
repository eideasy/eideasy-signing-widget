import createClientCore from './createClientCore';
import {
  smartCard,
} from './signingModules/signingModules';

const createClient = function createClient(settings = {}) {
  return createClientCore({
    settings,
    signingModules: [
      smartCard,
    ],
  });
};

// export the whole authenticator with all the modules included
// this will be used for the "script tag include" build
export default createClient;
