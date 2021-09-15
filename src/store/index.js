import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    options: [],
  },
  mutations: {
    setAvailableCurrencies(state, value) {
      state.options = value;
    },
  },
  actions: {
    getAvailableCurrencies(params = {}) {
      const url = `https://api.changenow.io/v1/currencies?active=true&fixedRate=true?${new URLSearchParams(params).toString()}`;

      fetch(url)
        .then((response) => response.json())
        .then((result) => this.commit('setAvailableCurrencies', result));
    },
  },
});
