import viewNames from './views/viewNames';
import methodButtonNames from './components/methodButtons/methodButtonNames';

export const allMethods = Object.freeze({
  mobileId: {
    name: 'mobileId',
    viewName: viewNames.MobileIdAuth,
    buttonName: methodButtonNames.IdCardButton,
  },
  smartId: {
    name: 'smartId',
    viewName: viewNames.SmartIdAuth,
    buttonName: methodButtonNames.IdCardButton,
  },
  idCard: {
    name: 'idCard',
    buttonName: methodButtonNames.IdCardButtonEE,
  },
})

export const enabledMethodsByCountry = {
  EE: [
    allMethods.mobileId,
    allMethods.smartId,
    allMethods.idCard,
  ],
  LV: [
    allMethods.mobileId,
    allMethods.smartId,
    allMethods.idCard,
  ],
  LT: [
    allMethods.mobileId,
    allMethods.smartId,
    allMethods.idCard,
  ]
}

export const availableCountries = Object.keys(enabledMethodsByCountry);
