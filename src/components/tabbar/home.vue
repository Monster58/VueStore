<template>
  <div>
    <mt-swipe>
      <mt-swipe-item v-for="item in bannerUrlList" :key="item.id">
        <img :src="item.img" alt />
      </mt-swipe-item>
    </mt-swipe>
    <router-view></router-view>
    <div class="mui-content">
      <ul class="mui-table-view mui-grid-view mui-grid-9">
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
          <router-link to="/home/news">
            <img src="../../images/menu/menu1.png" alt />
            <div class="mui-media-body">新闻资讯</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
          <a href="#">
            <img src="../../images/menu/menu2.png" alt />
            <div class="mui-media-body">图片分享</div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
          <a href="#">
            <img src="../../images/menu/menu3.png" alt />
            <div class="mui-media-body">商品购买</div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
          <a href="#">
            <img src="../../images/menu/menu4.png" alt />
            <div class="mui-media-body">留言反馈</div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
          <a href="#">
            <img src="../../images/menu/menu5.png" alt />
            <div class="mui-media-body">视频专区</div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
          <a href="#">
            <img src="../../images/menu/menu6.png" alt />
            <div class="mui-media-body">联系我们</div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bannerUrlList: []
    };
  },
  created() {
    this.getBannerUrl();
  },
  methods: {
    getBannerUrl() {
      this.axios
        .get("http://www.liulongbin.top:3005/api/getlunbo")
        .then(res => {
          this.bannerUrlList = res.data.message;
        });
    }
  }
};
</script>

<style scoped>
.mint-swipe {
  height: 129px;
}
.mint-swipe-item img {
  width: 100%;
  height: auto;
}
.mui-grid-view.mui-grid-9 {
  border: none;
  background-color: #fff;
}
.mui-grid-view.mui-grid-9 img {
  width: 3.75rem;
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell {
  border: none;
}
</style>