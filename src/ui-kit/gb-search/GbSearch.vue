<template>
  <div
    class="custom-select"
    :tabindex="tabindex"
  >
    <input class="selected open">
    <div class="items">
      <div
        v-for="(option, i) of options"
        :key="i"
        @click="onClick(option)"
      >
        {{ option }}
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
      required: true,
      default: () => ([]),
    },

    value: {
      type: [Number, String],
      required: false,
      default: null,
    },

    tabindex: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      selected: '',
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
.custom-select {
  position: relative;
  width: 100%;
  text-align: left;
  outline: none;
  height: 47px;
  line-height: 47px;
}

.custom-select .selected {
  background-color: #0a0a0a;
  border-radius: 6px;
  border: 1px solid #666666;
  color: #fff;
  padding-left: 1em;
  cursor: pointer;
  user-select: none;
}

.custom-select .selected.open {
  border: 1px solid #ad8225;
  border-radius: 6px 6px 0px 0px;
}

.custom-select .selected:after {
  position: absolute;
  content: "";
  top: 22px;
  right: 1em;
  width: 0;
  height: 0;
  border: 5px solid transparent;
  border-color: #fff transparent transparent transparent;
}

.custom-select .items {
  color: #fff;
  border-radius: 0px 0px 6px 6px;
  overflow: hidden;
  border-right: 1px solid #ad8225;
  border-left: 1px solid #ad8225;
  border-bottom: 1px solid #ad8225;
  position: absolute;
  background-color: #0a0a0a;
  left: 0;
  right: 0;
  z-index: 1;
}

.custom-select .items div {
  color: #fff;
  padding-left: 1em;
  cursor: pointer;
  user-select: none;
}

.custom-select .items div:hover {
  background-color: #ad8225;
}
</style>
