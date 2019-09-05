<template>
  <div>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
        <a href="javascript:;">
          <img class="mui-media-object mui-pull-left" :src="item.img_url" />
          <div class="mui-media-body">
            {{item.title}}
            <p class="mui-ellipsis">{{item.zhaiyao}}</p>
            <div class="date-click">
              <span>时间：{{item.add_time}}</span>
              <span>点击次数：{{item.click}}</span>
            </div>
          </div>
        </a>
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
.mui-table-view .mui-media-object {
  max-width: 81px;
  height: 63px;
}
.date-click {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
}
.mui-media-body {
  text-overflow: ellipsis;
  /*禁止换行显示*/
  white-space: nowrap;
}
</style>