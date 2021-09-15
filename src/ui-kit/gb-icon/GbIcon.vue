<template>
  <div
    class="gb-icon"
    v-html="icon"
    v-on="$listeners"
  />
</template>

<script>
import icons from './icons-kit';

export default {
  name: 'GbIcon',

  props: {
    name: {
      type: String,
      default: '',
    },

    color: {
      type: String,
      default: '',
    },
  },

  computed: {
    icon() {
      return icons[this.name];
    },

    classes() {
      return `gb-icon-color--${this.color}`;
    },
  },
};
</script>

<style lang="scss" scoped>
@mixin icon-color($name, $color) {
  .gb-icon-color--#{$name} {
    fill: $color;
    stroke: $color;
  }
}

@include icon-color('blue', var(--color-blue-light));
@include icon-color('gray', var(--color-blue-gray-main));

.gb-icon {
  display: block;
}
</style>
