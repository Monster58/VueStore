<template>
  <div class="goods-box">
    <div class="goods-item" v-for="item in goodsList" :key="item.id">
      <div class="goods-img">
        <img :src="item.img_url" alt />
      </div>
      <div class="goods-info">
        <div class="title">
          <h3>{{item.title}}</h3>
        </div>
        <div class="price">
          <p>
            <span>￥{{item.sell_price}}</span>
            <del>￥{{item.market_price}}</del>
          </p>
          <p>
            <i>热卖中</i>
            <i>剩{{item.stock_quantity}}件</i>
          </p>
        </div>
      </div>
    </div>
    <mt-button type="danger" size="large" @click="getMore">获取更多</mt-button>
  </div>
</template>

<script>
//  /api/getgoods?pageindex=number
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      pageIndex: 1,
      goodsList: [],
      defaultImg: ''
    };
  },
  methods: {
    getGoodsList() {
      this.axios
        .get(`api/getgoods?pageindex=${this.pageIndex}`)
        .then(res => {
          if (res.status == 200 && res.data.status == 0) {
            if (res.data.message.length == 0) return Toast("没有更多了");
            this.goodsList = this.goodsList.concat(res.data.message);
          } else {
            // Toast('商品获取失败，请稍后重试')
          }
        })
        .catch(() => {
          Toast("服务器崩溃了。。。");
        });
    },
    getMore() {
      this.pageIndex++;
      this.getGoodsList();
    }
  },
  created() {
    this.getGoodsList();
  }
};
</script>

<style lang="less" scoped>
.goods-box {
  padding: 0.8rem 0.8rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .goods-item {
    box-shadow: 1px 1px 6px #ccc;
    margin-bottom: 0.8rem;
    width: 48%;
    min-height: 293px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .goods-img {
      // background-color: darkblue;
      img {
        width: 100%;
      }
    }
    .goods-info {
      .title {
        h3 {
          font-size: 0.8em;
        }
      }
      .price {
        background-color: rgb(224, 224, 224);
        span {
          color: red;
        }
        del {
          margin-left: 0.8rem;
        }
        i {
          font-style: normal;
        }
        p {
          padding: 0 0.2em;
          margin-bottom: 0;
        }
        p:nth-child(2) {
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }
}
</style>