<template>
  <div class="gb-input">
    <input
      placeholder="Введите значение"
      :value="value"
      @input="$emit('input', value)"
      class="gb-input-value"
    >
    <div class="gb-input-separator" />
    <gb-icon
      class="gb-input-icon gb-ml-34"
      :name="icon"
      color="blue"
    />
    <div class="gb-input-currency gb-ml-12">
      {{ currency }}
    </div>
    <gb-icon
      :class="{ active: isActive }"
      class="gb-input-icon gb-ml-30"
      name="arrow_down"
      color="gray"
      @click="onClick()"
    />
  </div>
</template>

<script>
export default {
  name: 'GbInput',

  data() {
    return {
      isActive: false,
    };
  },

  props: {
    value: {
      type: [String, Number],
      default: '',
    },

    currency: {
      type: String,
      default: '',
    },
  },

  computed: {
    icon() {
      return this.currency.toLowerCase();
    },
  },

  methods: {
    onClick() {
      this.isActive = !this.isActive;
      this.$emit('click');
    },
  },
};
</script>

<style lang="scss" scoped>
.gb-input {
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

  .active {
    transform: rotate(180deg);
  }
}
</style>
