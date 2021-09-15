<template>
  <div
    class="gb-input"
    v-click-outside="onClose"
  >
    <input
      placeholder="Выберите валюту"
      :value="value"
      @input="$emit('input', value)"
      class="gb-input-value"
    >
    <template v-if="!isCurrencyEmpty">
      <div class="gb-input-separator" />
      <img
        class="gb-ml-34"
        :src="currency.image"
      />
      <div class="gb-input-currency gb-ml-12">
        {{ ticker }}
      </div>
    </template>
    <gb-icon
      :class="{ active: isOpen }"
      class="gb-input-icon gb-ml-30"
      name="arrow_down"
      color="gray"
      @click="toggleSearch()"
    />

    <div
      class="gb-input-search"
      :class="{ hide: !isOpen }"
    >
      <gb-search
        v-model="currency"
        :options="options"
        @close="onClose()"
      />
    </div>
  </div>
</template>

<script>
import ClickOutside from '@/directives/ClickOutside';

export default {
  name: 'GbInput',

  directives: {
    'click-outside': ClickOutside,
  },

  data() {
    return {
      currency: {},
      isOpen: false,
    };
  },

  props: {
    value: {
      type: [String, Number],
      default: '',
    },

    options: {
      type: Array,
      default: () => ([]),
    },
  },

  computed: {
    ticker() {
      return this.currency.ticker?.toUpperCase();
    },

    isCurrencyEmpty() {
      return (Object.keys(this.currency).length === 0) && (this.currency.constructor === Object);
    },
  },

  methods: {
    toggleSearch() {
      this.isOpen = !this.isOpen;
    },

    onClose() {
      this.isOpen = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.gb-input {
  position: relative;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  width: 440px;
  height: 50px;
  padding-left: 16px;
  padding-right: 8px;
  background: var(--color-gray-background);
  border: 1px solid var(--color-gray-border);
  border-radius: var(--border-radius);

  @media (max-width: 576px) {
    width: auto;
  }

  &-value {
    -webkit-appearance: none;
    flex-grow: 1;
    border: none;
    background-color: transparent;
  }

  input:focus, textarea:focus, select:focus{
    outline: none;
  }

  &-separator {
    width: 1px;
    height: 30px;
    background: var(--color-gray-separator);
  }

  &-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      opacity: 0.7;
    }
  }

  &-search {
    position: absolute;
    top: -1px;
    right: -1px;
    bottom: -1px;
    left: -1px;
  }

  .active {
    transform: rotate(180deg);
  }

  .hide {
    display: none;
  }
}
</style>
