<template>
  <div>
    <div class="mui-card" v-for="item in goodsInfo" :key="item.id">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <div class="switch">
            <mt-switch v-model="getSelect[item.id]" @change="commitSelect(item.id)"></mt-switch>
          </div>
          <div class="img">
            <img :src="item.thumb_path" alt />
          </div>
          <div class="info">
            <div class="title">{{item.title}}</div>
            <div class="row">
              <div class="one-price">￥{{item.goodsPrice}}</div>
              <div class="nBox">
                <numBox :id="item.id" :val="item.amount" :max="item.stock_quantity"></numBox>
              </div>
              <div class="del">
                <a @click.prevent="delgoods(item.id)" href>删除</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="card2 mui-card-content-inner">
          <p>总计（不含运费）</p>
          <div class="settlement">
            <p class="left">
              已勾选商品
              <span>{{this.getSelectNum}}</span>件，总价:
              <span>￥{{this.getAllPrice}}</span>
            </p>
            <div class="right">
              <mt-button size="small" type="danger">去结算</mt-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    {{this.getSelect}}
  </div>
</template>

<script>
//api/goods/getshopcarlist/:ids    ids: 44,45,46
import numBox from "../childComponents/shopcarnumbox.vue";
import { Toast } from "mint-ui";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      // value: true,
      goodsInfo: []
    };
  },
  methods: {
    delgoods(id){
      console.log(id)
      this.$store.commit('delgoods', id)
    },
    commitSelect(id) {
      console.log(id)
      this.$store.commit('changeGoodsSelected', id)
    }
  },
  computed: {
    ...mapGetters(["getGoodsList","getSelectNum","getAllPrice","getSelect"])
  },
  created() {
    this.goodsInfo = this.getGoodsList
  },
  components: {
    numBox
  }
};
</script>


<style lang="scss" scoped>
.mui-card-content-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .img {
    width: 4rem;
    img {
      width: 100%;
      display: block;
    }
  }
  .info {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .one-price {
        color: red;
      }
      .mui-numbox {
        height: 26px;
      }
    }
  }
}
.card2 {
  display: block;
  padding: 2%;
  line-height: 2;
  span {
    color: red;
  }
  p {
    margin: 0;
  }
  .settlement {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>