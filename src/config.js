import viewNames from './views/viewNames';
import methodButtonNames from './components/methodButtons/methodButtonNames';
import countries from './i18n/countries';

export const allMethods = Object.freeze({
  mobileId: {
    name: 'mobileId',
    viewName: viewNames.MobileIdAuth,
    buttonName: methodButtonNames.IdCardButton,
  },
  smartId: {
    name: 'smartId',
    viewName: viewNames.SmartIdAuth,
    buttonName: methodButtonNames.SmartIdButton,
  },
  idCard: {
    name: 'idCard',
    buttonName: methodButtonNames.IdCardButtonEE,
  },
  smartCard: {
    name: 'smartCard',
    buttonName: methodButtonNames.IdCardButton,
  }
})

export const enabledMethods = [
  {
    ...allMethods.smartCard,
    blacklist: ['EE'],
  },
  {
    ...allMethods.idCard,
    whitelist: ['EE'],
  },
  {
    ...allMethods.smartId,
    whitelist: ['EE'],
  }
]

export const availableCountries = Object.keys(countries.getNames("en", {select: "official"}));
