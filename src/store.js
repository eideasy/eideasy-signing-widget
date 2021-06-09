import Vue from "vue";
import {availableCountries, allMethods} from './config';
import viewNames from './views/viewNames';

export const store = Vue.observable({
  countryCode: 'EE',
  currentView: viewNames.MethodSelection,
  currentViewTitleTranslationKey: '',
  isLoading: false,
  flashMessages: [],
});

export const getters = {
  countryCode: () => store.countryCode,
  currentView: () => store.currentView,
  currentViewTitleKey: () => store.currentViewTitleKey,
  isLoading: () => store.isLoading,
  flashMessages: () => store.flashMessages,
}

export const mutations = {
  setCountryCode(countryCode) {
    store.countryCode = countryCode;
  },
  setCurrentView(template) {
    store.currentView = template;
  },
  setCurrentViewTitleKey(viewTitleKey) {
    store.currentViewTitleKey = viewTitleKey;
  },
  setIsLoading(value) {
    store.isLoading = value;
  },
  addFlashMessage(message) {
    store.flashMessages.push(message);
  },
  clearFlashMessages() {
    store.flashMessages = [];
  }
};

export const actions = {
  loadingStart() {
    mutations.setIsLoading(true);
  },
  loadingEnd() {
    mutations.setIsLoading(false);
  },
  changeCountry(countryCode) {
    if (availableCountries.indexOf(countryCode) !== -1) {
      mutations.setCountryCode(countryCode);
    } else {
      mutations.setCountryCode(availableCountries[0]);
    }
  },
  selectMethod(methodName) {
    const {titleTranslationKey, viewName} = allMethods[methodName];
    mutations.clearFlashMessages();
    mutations.setCurrentViewTitleKey(titleTranslationKey);
    mutations.setCurrentView(viewName);
  },
  changeView(viewName) {
    mutations.clearFlashMessages();
    mutations.setCurrentView(viewName);
  },
  addFlashMessage(data) {
    const message = {
      text: '',
      scheme: 'info',
    }

    if (data.error &&
      data.error.response &&
      data.error.response.data &&
      data.error.response.data.message
    ) {
      message.scheme = 'danger';
      message.text = data.error.response.data.message;
    } else {
      message.scheme = 'danger';
      message.translationKey = 'noResponseError';
    }

    if (data.message) {
      message.scheme = 'danger';
      message.text = data.message;
    }
    mutations.addFlashMessage(message);
  },
  clearFlashMessages() {
    mutations.clearFlashMessages();
  }
}
