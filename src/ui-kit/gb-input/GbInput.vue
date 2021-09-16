<template>
  <div
    class="gb-input"
    v-click-outside="onClose"
  >
    <input
      :placeholder="placeholder"
      :value="value"
      :type="type"
      :disabled="disabled"
      @input="$emit('input', $event.target.value)"
      @blur="$emit('blur')"
      class="gb-input-value gb-pr-16"
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
        v-model="search"
        :options="filteredOptions"
        placeholder="Search"
        @change="onChange($event)"
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
      search: '',
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

    placeholder: {
      type: [String, Number],
      default: '',
    },

    type: {
      type: String,
      default: '',
    },

    disabled: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    ticker() {
      return this.currency.ticker?.toUpperCase();
    },

    isCurrencyEmpty() {
      return (Object.keys(this.currency).length === 0) && (this.currency.constructor === Object);
    },

    filteredOptions() {
      return this.options.filter((e) => e.name.toLowerCase().includes(this.search.toLowerCase()));
    },
  },

  watch: {
    isOpen: {
      handler() {
        this.search = '';
      },
    },
  },

  methods: {
    toggleSearch() {
      this.isOpen = !this.isOpen;
    },

    onClose() {
      this.isOpen = false;
    },

    onChange(e) {
      this.currency = e;
      this.$emit('change', e);
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
    width: 100%;
    border: none;
    background-color: transparent;
  }

  input:focus, textarea:focus, select:focus{
    outline: none;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
      /* display: none; <- Crashes Chrome on hover */
      -webkit-appearance: none;
      margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
  }

  input[type=number] {
      -moz-appearance:textfield; /* Firefox */
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
