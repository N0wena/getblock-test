<template>
  <div class="main-page">
    <h1 class="main-page-title gb-text-weight--normal">
      Crypto Exchange
    </h1>
    <h2 class="main-page-subtitle gb-mt-16 gb-text-weight--normal">
      Exchange fast and easy
    </h2>

    <div class="main-page-changer">
      <gb-input
        v-model="leftValue"
        class="main-page-value-left"
        :options="options"
        :placeholder="emptyLeftCurrency ? 'Выберите значение' : 'Введите значение...'"
        type="number"
        @blur="getEstimate()"
        @change="onLeftChange($event)"
      />
      <gb-icon
        class="main-page-swap"
        name="swap"
        color="gray"
      />
      <gb-input
        v-model="rightValue"
        class="main-page-value-right"
        :options="options"
        :placeholder="emptyRightCurrency ? 'Выберите значение' : 'Введите значение...'"
        type="number"
        disabled
        @blur="getEstimate()"
        @change="onRightChange($event)"
      />
    </div>

    <div class="main-page-address">
      <div class="main-page-label gb-text-weight--normal">
        Your Ethereum address
      </div>
      <div class="main-page-action gb-mt-8">
        <gb-textarea
          :class="windowWidth > 576 ? 'gb-mr-32' : ''"
          :value="address"
        />
        <gb-button
          :class="windowWidth > 576 ? '' : 'gb-mt-8'"
          text="exchange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import store from '@/store';

export default {
  name: 'MainPage',

  store,

  data() {
    return {
      windowWidth: window.innerWidth,
      leftValue: null,
      leftCurrency: {},
      rightValue: null,
      rightCurrency: {},
      address: '',
    };
  },

  computed: {
    ...mapState({
      options: 'options',
      minimalExchange: 'minimalExchange',
      estimatedValue: 'estimatedValue',
    }),

    pair() {
      let pair = '';

      if (this.leftCurrency.ticker && this.rightCurrency.ticker) {
        pair = `${this.leftCurrency.ticker}_${this.rightCurrency.ticker}`;
      }

      return pair;
    },

    emptyLeftCurrency() {
      return (
        Object.keys(this.leftCurrency).length === 0) && (this.leftCurrency.constructor === Object
      );
    },

    emptyRightCurrency() {
      return (
        Object.keys(this.rightCurrency).length === 0) && (this.rightCurrency.constructor === Object
      );
    },
  },

  created() {
    this.$store.dispatch('getAvailableCurrencies');
  },

  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    });
  },

  watch: {
    minimalExchange: {
      handler() {
        this.leftValue = this.minimalExchange;
      },
    },

    estimatedValue: {
      handler() {
        this.rightValue = this.estimatedValue;
      },
    },
  },

  methods: {
    ...mapActions([
      'getMinimalExchangeAmount',
      'getEstimatedExchangeAmount',
    ]),

    getEstimate() {
      if (this.pair) {
        this.getEstimatedExchangeAmount({ fromTo: this.pair, sendAmount: this.leftValue });
      }
    },

    onResize() {
      this.windowHeight = window.innerHeight;
    },

    onLeftChange(e) {
      this.leftCurrency = e;

      if (this.pair) {
        this.getMinimalExchangeAmount({ fromTo: this.pair });

        setTimeout(() => {
          this.getEstimatedExchangeAmount({ fromTo: this.pair, sendAmount: this.leftValue });
        }, 1000);
      }
    },

    async onRightChange(e) {
      this.rightCurrency = e;

      if (this.pair) {
        this.getMinimalExchangeAmount({ fromTo: this.pair });

        setTimeout(() => {
          this.getEstimatedExchangeAmount({ fromTo: this.pair, sendAmount: this.leftValue });
        }, 1000);
      }
    },
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },
};
</script>

<style lang="scss" scoped>
.main-page {
  width: 960px;

  @media (max-width: 576px) {
    width: auto;
  }

  &-title {
    font-size: var(--font-size-title-desktop);

    @media (max-width: 576px) {
      font-size: var(--font-size-title-mobile);
    }
  }

  &-subtitle {
    font-size: var(--font-size-subtitle);
  }

  &-changer {
    display: flex;
    align-items: center;
    margin-top: 60px;

    @media (max-width: 576px) {
      flex-direction: column;
      align-items: normal;
    }
  }

  &-address {
    margin-top: 32px;

    @media (max-width: 576px) {
      margin-top: 48px;
    }
  }

  &-value-first {
    margin-right: 29px;

    @media (max-width: 576px) {
      margin-right: 0;
    }
  }

  &-value-second {
    margin-left: 27px;

    @media (max-width: 576px) {
      margin-left: 0;
    }
  }

  &-swap {
    margin: 0;
    padding-bottom: 2px;
    cursor: pointer;
    transition: opacity 0.3s;

    &:hover {
      opacity: 0.7,
    }

    @media (max-width: 576px) {
      margin: 16px 0 16px auto;
      transform: rotate(90deg);
    }
  }

  &-label {
    line-height: 23px;
  }

  &-action {
    display: flex;

    @media (max-width: 576px) {
      flex-direction: column;
    }
  }
}
</style>
