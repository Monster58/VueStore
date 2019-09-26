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
            <addButton :maxQuantity="goodsInfo.stock_quantity" @getNum="getAddButtonVal"></addButton>
            <transition
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter">
              <div v-show="addCarBallFlag" ref="ball" class="ball"></div>
            </transition>
          </div>
          <div class="row3">
            <button type="button" class="mui-btn mui-btn-success">立即购买</button>
            <button @click="addShopCar" type="button" class="mui-btn mui-btn-danger">加入购物车</button>
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
      goodsInfo: {},
      addCarBallFlag: false,
      numBoxVal: 1
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
    },
    addShopCar(){
      this.addCarBallFlag = !this.addCarBallFlag
      let goodsObj = {
        id: this.goodsInfo.id,
        amount: parseInt(this.numBoxVal),
        goodsPrice: this.goodsInfo.sell_price,
        selected: true
      }
      this.$store.commit('addShopTro', goodsObj)
    },
    beforeEnter(el) {
      el.style.transform = 'translate(0,0)'
      // el.style.opacity  = '1'
    },
    enter(el,done){
      el.offsetWidth
      const ballPosition = this.$refs.ball.getBoundingClientRect()
      const badgePosition = document.querySelector('#badge').getBoundingClientRect()
      const xClient = badgePosition.left - ballPosition.left
      const yClient = badgePosition.top - ballPosition.top
      el.style.transform = `translate(${xClient}px,${yClient}px)`
      el.style.transition = 'all .5s cubic-bezier(.51,-0.06,1,.58)'
      // el.style.opacity  = '0'
      done()
    },
    afterEnter(el){
      this.addCarBallFlag = !this.addCarBallFlag
    },
    getAddButtonVal(num){
      this.numBoxVal = num
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
  },
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
.row2 {
  position: relative;
}
.ball {
  width: 14px;
  height: 14px;
  background-color: red;
  border-radius: 50%;
  position: absolute;
  left: 8rem;
  top: .6rem;
  z-index: 99;
}
.mui-card {
  overflow: visible;
}
</style>