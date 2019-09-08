<template>
  <div class="newslist">
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
        <router-link :to="'/home/newsinfo/'+item.id">
          <img class="mui-media-object mui-pull-left" :src="item.img_url" />
          <div class="mui-media-body">
            {{item.title}}
            <p class="mui-ellipsis">{{item.zhaiyao}}</p>
            <div class="date-click">
              <span>时间：{{item.add_time | dateFormat}}</span>
              <span>点击次数：{{item.click}}</span>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      newsList: []
    };
  },
  created() {
    this.getNewsList();
  },
  methods: {
    getNewsList() {
      this.axios
        .get("api/getnewslist")
        .then(res => {
          if (res.data.status == 0) {
            this.newsList = res.data.message;
            Toast({
              message: "新闻加载成功",
              position: "middle",
              duration: 1000
            });
          } else {
            Toast({
              message: "新闻加载失败，请稍后再试...",
              position: "middle",
              duration: 1000
            });
          }
        })
        .catch(() => {
          Toast({
            message: "服务器崩溃了，请稍后再试...",
            position: "middle",
            duration: 1000
          });
        });
    }
  }
};
</script>

<style scoped>
.newslist {
  width: 100%;
  overflow: hidden;
}
.mui-table-view .mui-media-object {
  max-width: 81px;
  height: 63px;
}
.date-click {
  color: rgb(121, 121, 121);
  display: flex;
  justify-content: space-between;
  font-size: 12px;
}
.mui-media-body {
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>