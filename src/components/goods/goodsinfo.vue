<template>
  <div class="goodsinfo">
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :bannerUrlList="imageList" :isfull="false"></swiper>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-header">{{goodsInfo.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <div class="row1">
            <span>市场价：</span>
            <del>￥{{goodsInfo.market_price}}</del>&nbsp;
            <span>销售价：</span>
            <i>￥{{goodsInfo.sell_price}}</i>
          </div>
          <div class="row2">
            购买数量：
            <addButton></addButton>
          </div>
          <div class="row3">
            <button type="button" class="mui-btn mui-btn-success">立即购买</button>
            <button type="button" class="mui-btn mui-btn-danger">加入购物车</button>
          </div>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号:{{goodsInfo.goods_no}}</p>
          <p>库存情况: {{goodsInfo.stock_quantity}}件</p>
          <p>上架时间: {{goodsInfo.add_time | dateFormat}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" plain size="large" @click="goGoodsInt(id)">图文介绍</mt-button>
        <mt-button type="danger" plain size="large">商品</mt-button>
      </div>
    </div>
    <comment :id="id"></comment>
  </div>
</template>

<script>
//api/getthumimages/:imgid 缩略图
//api/goods/getinfo/:id 商品详情
import swiper from "../childComponents/swiper.vue";
import addButton from "../childComponents/addbutton.vue";
import comment from '../childComponents/comment.vue'
export default {
  data() {
    return {
      id: this.$route.params.id,
      imageList: [],
      goodsInfo: {}
    };
  },
  methods: {
    getImages() {
      this.axios(`api/getthumimages/${this.id}`).then(res => {
        if (res.status == 200 && res.data.status == 0) {
          this.imageList = res.data.message;
        }
      });
    },
    getGoodsInfo() {
      this.axios(`api/goods/getinfo/${this.id}`).then(res => {
        if (res.status == 200 && res.data.status == 0) {
          this.goodsInfo = res.data.message[0];
        }
      });
    },
    goGoodsInt(id){
      this.$router.push({
        name: 'goodsInt',
        params: id
      })
    }
  },
  components: {
    swiper,
    addButton,
    comment
  },
  created() {
    this.getImages();
    this.getGoodsInfo();
  }
};
</script>

<style lang="scss" scoped>
.goodsinfo {
  background-color: rgb(238, 238, 238);
  overflow: hidden;
}
.lang {
  width: 100%;
}
.row2 {
  margin-bottom: 0.8rem;
}
i {
  font-style: normal;
  color: rgb(201, 57, 57);
}
.mui-card-footer,
.mui-card-header {
  display: block;
}
button {
  margin-bottom: 1rem;
}
</style>