<template>
  <div class="mui-numbox" data-numbox-min="1" data-numbox-max="9">
    <button ref="b1" class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input
      v-model="num"
      ref="numbox"
      id="test"
      class="mui-input-numbox"
      type="number"
    />
    <button ref="b2" class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>

<script>
// import mui from "../../lib/mui/js/mui.min.js";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      num: 1
    };
  },
  props: ["maxQuantity"],
  methods: {
    initAddButton() {
      this.$refs.b1.addEventListener("click", () => {
        if (this.num >= 2) {
          this.num--;
        }else {
          Toast('商品滞销，帮帮我们。。')
        }
      });
      this.$refs.b2.addEventListener("click", () => {
        if (this.num < this.maxQuantity) {
          this.num++;
        }else {
          Toast('超出库存限制')
        }
      });
    },
  },
  watch: {
    num: function(newval, oldval) {
      this.$emit("getNum", newval);
    }
  },
  mounted() {
    this.initAddButton();
  }
};
</script>

<style>
</style>