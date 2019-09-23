<template>
  <div class="mui-numbox" data-numbox-min="1" data-numbox-max="9">
    <button ref="b1" class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input ref="numbox" id="test" class="mui-input-numbox" type="number" value="1" />
    <button ref="b2" class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>

<script>
// import mui from "../../lib/mui/js/mui.min.js";
export default {
  data() {
    return {};
  },
  methods: {
    initAddButton() {
      this.$refs.b1.addEventListener('click', () => {
          if(this.$refs.numbox.value>=2) {
              this.$refs.numbox.value--
          }
      })
      this.$refs.b2.addEventListener('click', () => {
          if(this.$refs.numbox.value<=9) {
              this.$refs.numbox.value++
          }
      })
    }
  },
  mounted() {
    this.initAddButton();
  }
};
</script>

<style>
</style>