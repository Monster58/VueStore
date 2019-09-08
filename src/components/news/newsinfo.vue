<template>
  <div>
    <h4 class="title">{{newsInfo.title}}</h4>
    <p class="flex">
      <span>发表时间：{{newsInfo.add_time | dateFormat}}</span>
      <span>点击{{newsInfo.click}}次</span>
    </p>
    <hr />
    <div class="newsinfo" v-html="newsInfo.content"></div>
    <comment :id="id"></comment>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import comment from '../childComponents/comment.vue'
export default {
  data() {
    return {
      id: this.$route.params.id,
      newsInfo: []
    };
  },
  created() {
    this.getNewsInfo();
  },
  methods: {
    getNewsInfo() {
      this.axios
        .get("api/getnew/" + this.id)
        .then(res => {
          if (res.data.status == 0) {
            this.newsInfo = res.data.message[0];
            Toast("新闻加载成功");
          } else {
            Toast("暂时没有新闻...");
          }
        })
        .catch(() => {
          Toast("新闻加载失败，请稍后再试");
        });
      console.log(this.id);
    }
  },
  components: {
    'comment': comment
  }
};
</script>

<style lang="less" scoped>
.title {
  text-align: center;
  color: rgb(245, 132, 132);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 4%;
}
.flex {
  padding: 0 2%;
  display: flex;
  justify-content: space-between;
  color: rgb(56, 125, 216);
}
.newsinfo {
  padding: 0 4%;
}
</style>>
