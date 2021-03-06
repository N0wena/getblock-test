import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const key = 'c9155859d90d239f909d2906233816b26cd8cf5ede44702d422667672b58b0cd';
const env = 'https://api.changenow.io/v1';

export default new Vuex.Store({
  state: {
    options: [],
    apiError: false,
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
        .then((response) => {
          if (response.status !== 200) {
            console.log(response.status);
            return;
          }

          // eslint-disable-next-line
          return response.json();
        })
        .then((result) => commit('updateProperty', { name: 'options', value: result }))
        .catch((err) => {
          console.log('Fetch Error :-S', err);
        });
    },

    async getMinimalExchangeAmount({ commit }, params = {}) {
      const url = `${env}/min-amount/${params.fromTo}?api_key=${key}`;

      const res = await fetch(url)
        .then((response) => {
          if (response.status !== 200) {
            console.log(response.status);
            return;
          }

          // eslint-disable-next-line
          return response.json();
        })
        .then((result) => result.minAmount)
        .catch((err) => {
          console.log('Fetch Error :-S', err);
          commit('updateProperty', { name: 'apiError', value: true });
        });

      return res;
    },

    async getEstimatedExchangeAmount({ commit }, params = {}) {
      const url = `${env}/exchange-amount/${params.sendAmount}/${params.fromTo}?api_key=${key}`;

      const res = await fetch(url)
        .then((response) => {
          if (response.status !== 200) {
            console.log(response.status);
            return;
          }

          // eslint-disable-next-line
          return response.json();
        })
        .then((result) => result.estimatedAmount)
        .catch((err) => {
          console.log('Fetch Error :-S', err);
          commit('updateProperty', { name: 'apiError', value: true });
        });

      return res;
    },
  },
});
