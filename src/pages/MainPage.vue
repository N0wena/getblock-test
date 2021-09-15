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
        class="main-page-value-first"
        :options="options"
      />
      <gb-icon
        class="main-page-swap"
        name="swap"
        color="gray"
      />
      <gb-input
        class="main-page-value-second"
        :options="options"
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
import { mapState } from 'vuex';
import store from '@/store';

export default {
  name: 'MainPage',

  store,

  data() {
    return {
      windowWidth: window.innerWidth,
      firstValue: 0,
      firstCurrency: 'BTC',
      secondValue: 0,
      secondCurrency: 'ETH',
      address: '',
    };
  },

  computed: {
    ...mapState({
      options: 'options',
    }),
  },

  created() {
    this.$store.dispatch('getAvailableCurrencies');
  },

  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    });
  },

  methods: {
    onResize() {
      this.windowHeight = window.innerHeight;
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
