<template>
  <div
    class="gb-button"
    @click="onClick()"
  >
    {{ text }}
    <div :class="{ error: isError }"/>
  </div>
</template>

<script>
export default {
  name: 'GbButton',

  props: {
    text: {
      type: String,
      default: '',
    },

    isError: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    onClick() {
      if (!this.isError) {
        this.$emit('click');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.gb-button {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 205px;
  font-size: var(--font-size-normal);
  font-weight: var(--font-weight-bold);
  padding: 15px 0;
  line-height: 19px;
  color: var(--color-white);
  background-color: var(--color-blue-light);
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: background-color 0.3s;
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing);

  &:hover {
    background-color: var(--color-blue-dark);
  }

  @media (max-width: 576px) {
    width: 100%;
  }

  .error::after {
    position: absolute;
    top: 58px;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, 0);
    font-size: var(--font-size-normal);
    font-weight: var(--font-weight-normal);
    text-transform: none;
    letter-spacing: 0;
    color: var(--color-red);
    line-height: 23px;
    content: 'This pair is disabled now';
  }
}
</style>
