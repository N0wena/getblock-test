<template>
  <div class="gb-button">
    {{ text }}
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
  },
};
</script>

<style lang="scss" scoped>
.gb-button {
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
}
</style>
