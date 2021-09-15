<template>
  <div
    class="gb-search"
    :tabindex="tabindex"
  >
    <div class="gb-search-content">
      <input
        class="gb-search-input"
        placeholder="Search"
      >
      <gb-icon
        class="gb-search-icon gb-ml-30"
        name="cross"
        @click="$emit('close')"
      />
    </div>
    <div class="gb-search-items">
      <div
        class="gb-search-item"
        v-for="(option, i) of options"
        :key="i"
        @click="onClick(option)"
      >
        <img :src="option.image" />
        <div class="gb-ml-12">
          {{ option.ticker }}
        </div>
        <div class="gb-ml-16 gb-text-color--gray">
          {{ option.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GbSearch',

  props: {
    options: {
      type: Array,
      default: () => ([]),
    },

    value: {
      type: [Number, String, Object],
      default: null,
    },

    tabindex: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      selected: {},
    };
  },

  mounted() {
    this.$emit('input', this.selected);
  },

  methods: {
    onClick(e) {
      this.selected = e;
      this.$emit('input', e);
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>
.gb-search {
  position: relative;
  width: 440px;
  height: 50px;
  flex-shrink: 0;
  background: var(--color-gray-background);
  border: 1px solid var(--color-gray-border);
  border-radius: var(--border-radius) var(--border-radius) 0 0;
  outline: none;

  @media (max-width: 576px) {
    width: auto;
  }

  &-content {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    flex-shrink: 0;
    padding-left: 16px;
    padding-right: 16px;
  }

  &-input {
    -webkit-appearance: none;
    flex-grow: 1;
    background-color: transparent;
    border: none;
  }

  input:focus, textarea:focus, select:focus{
    outline: none;
  }

  .gb-search-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      opacity: 0.7;
    }
  }

  .gb-search-items {
    position: absolute;
    left: -1px;
    right: -1px;
    z-index: 1;
    border-top: 1px solid var(--color-gray-separator);
    border-left: 1px solid var(--color-gray-border);
    border-right: 1px solid var(--color-gray-border);
    border-bottom: 1px solid var(--color-gray-border);
  }

  .gb-search-item {
    padding-left: 16px;
    width: 438px;
    height: 48px;
    display: flex;
    align-items: center;
    background: var(--color-gray-background);
    cursor: pointer;
    user-select: none;
    transition: background-color 0.3s;

    @media (max-width: 576px) {
      width: auto;
    }

    &:hover {
      background-color: var(--color-gray-select);
    }
  }
}
</style>
