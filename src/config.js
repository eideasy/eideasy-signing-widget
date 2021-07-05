import viewNames from './views/viewNames';
import methodButtonNames from './components/methodButtons/methodButtonNames';
import countries from './i18n/countries';

export const allMethods = Object.freeze({
  mobileId: {
    name: 'mobileId',
    method: 'mobileId',
    viewName: viewNames.MobileIdAuth,
    buttonName: methodButtonNames.IdCardButton,
  },
  smartId: {
    name: 'smartId',
    method: 'smartId',
    viewName: viewNames.SmartIdAuth,
    buttonName: methodButtonNames.SmartIdButton,
  },
  idCardEE: {
    name: 'idCardEE',
    method: 'smartCard',
    apiParam: 'id-signature',
    buttonName: methodButtonNames.IdCardButtonEE,
  },
  idCardLV: {
    name: 'smartCard',
    method: 'smartCard',
    apiParam: 'lv-id-signature',
    buttonName: methodButtonNames.IdCardButton,
  },
  idCardLT: {
    name: 'smartCard',
    method: 'smartCard',
    apiParam: 'lt-id-signature',
    buttonName: methodButtonNames.IdCardButton,
  },
  idCardFI: {
    name: 'smartCard',
    method: 'smartCard',
    apiParam: 'fi-id-signature',
    buttonName: methodButtonNames.IdCardButton,
  },
  idCardPT: {
    name: 'smartCard',
    method: 'smartCard',
    apiParam: 'pt-id-signature',
    buttonName: methodButtonNames.IdCardButton,
  },
});

export const enabledMethods = [
  {
    ...allMethods.idCardLV,
    whitelist: ['LV'],
  },
  {
    ...allMethods.idCardLT,
    whitelist: ['LT'],
  },
  {
    ...allMethods.idCardFI,
    whitelist: ['FI'],
  },
  {
    ...allMethods.idCardPT,
    whitelist: ['PT'],
  },
  {
    ...allMethods.idCardEE,
    whitelist: ['EE'],
  },
  /*
  {
    ...allMethods.smartId,
    whitelist: ['EE'],
  }
   */
];

export const availableCountries = Object.keys(countries.getNames("en", {select: "official"}))
  .filter(countryCode => ['EE', 'LV', 'LT', 'FI', 'PT'].includes(countryCode));
