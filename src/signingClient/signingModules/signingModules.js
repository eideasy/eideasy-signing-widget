import createApiClient from '../apiClient/createApiClient';
import createSmartCard from './createSmartCard';

const smartCard = function smartCard(coreContext) {
  return createSmartCard({
    apiClient: createApiClient(),
    coreContext,
  });
};

export {
  smartCard,
};
