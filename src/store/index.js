import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const key = 'c9155859d90d239f909d2906233816b26cd8cf5ede44702d422667672b58b0cd';
const env = 'https://api.changenow.io/v1';

export default new Vuex.Store({
  state: {
    options: [],
    minimalExchange: 0,
    estimatedValue: 0,
  },
  mutations: {
    updateProperty(state, { name, value }) {
      Vue.set(state, name, value);
    },
  },
  actions: {
    getAvailableCurrencies({ commit }) {
      const url = `${env}/currencies?active=true&fixedRate=true?`;

      fetch(url)
        .then((response) => response.json())
        .then((result) => commit('updateProperty', { name: 'options', value: result }));
    },

    getMinimalExchangeAmount({ commit }, params = {}) {
      const url = `${env}/min-amount/${params.fromTo}?api_key=${key}`;

      fetch(url)
        .then((response) => response.json())
        .then((result) => commit('updateProperty', { name: 'minimalExchange', value: result.minAmount }));
    },

    getEstimatedExchangeAmount({ commit }, params = {}) {
      const url = `${env}/exchange-amount/${params.sendAmount}/${params.fromTo}?api_key=${key}`;

      fetch(url)
        .then((response) => response.json())
        .then((result) => commit('updateProperty', { name: 'estimatedValue', value: result.estimatedAmount }));
    },
  },
});
