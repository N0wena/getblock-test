<template>
  <div class="gb-textarea">
    <input
      type="text"
      :value="value"
      class="gb-textarea-input"
    >
  </div>
</template>

<script>
export default {
  name: 'GbTextarea',

  props: {
    value: {
      type: [String, Number],
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
.gb-textarea {
  flex-grow: 1;
  padding: 14px 16px 13px;
  height: 50px;
  background: var(--color-gray-background);
  border: 1px solid var(--color-gray-border);
  border-radius: var(--border-radius);

  &-input {
    -webkit-appearance: none;
    width: 100%;
    border: none;
    background-color: transparent;
  }
}
</style>
