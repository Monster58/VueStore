<template>
  <div class="mui-numbox" data-numbox-min="1" data-numbox-max="9">
    <button ref="b1" class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input v-model="num" ref="numbox" id="test" class="mui-input-numbox" type="number" />
    <button ref="b2" class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>

<script>
// import mui from "../../lib/mui/js/mui.min.js";
import { mapMutations } from "vuex";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      num: this.val
    };
  },
  props: ["id", "max", "val"],
  methods: {
    initAddButton() {
      this.$refs.b1.addEventListener("click", () => {
        if (this.num >= 2) {
          this.num--;
          this.reduceAmount(this.id)
        } else {
          Toast("商品滞销，帮帮我们。。");
        }
      });
      this.$refs.b2.addEventListener("click", () => {
        if (this.num < this.max) {
          this.num++;
          this.increaseAmount(this.id);
        } else {
          Toast("超出库存限制");
        }
      });
    },
    ...mapMutations([
      'increaseAmount',
      'reduceAmount'
    ])
  },
  // watch: {
  //   num: function(newval, oldval) {
  //     this.$emit("getNum", newval);
  //   }
  // },
  mounted() {
    this.initAddButton();
  }
};
</script>

<style>
</style>