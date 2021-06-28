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
    buttonName: methodButtonNames.IdCardButtonEE,
  },
  smartCard: {
    name: 'smartCard',
    method: 'smartCard',
    buttonName: methodButtonNames.IdCardButton,
  }
})

export const enabledMethods = [
  {
    ...allMethods.smartCard,
    whitelist: ['LV', 'LT', 'FI', 'PT'],
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
]

export const availableCountries = Object.keys(countries.getNames("en", {select: "official"}))
  .filter(countryCode => ['EE', 'LV', 'LT', 'FI', 'PT'].includes(countryCode));
