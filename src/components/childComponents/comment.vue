<template>
  <div class="comment-box">
    <h3 class="title">发表评论</h3>
    <textarea v-model="commentText" name="comment-text" id cols="30" rows="3" placeholder="请输入评论内容"></textarea>
    <mt-button @click="postComment" type="primary" size="large">发表评论</mt-button>
    <div class="comment-list">
      <div class="comment" v-for="(item, index) in commentData" :key="index">
        <div
          class="comment-title"
        >第{{index+1}}楼&nbsp;&nbsp;用户：{{ item.user_name }}&nbsp;&nbsp; 发表时间：{{item.add_time | dateFormat}}</div>
        <div class="comment-content">{{item.content}}</div>
      </div>
    </div>
    <mt-button @click="getMore" type="danger" size="large">加载评论</mt-button>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      pageIndex: 1,
      commentData: [],
      commentText: ""
    };
  },
  props: ["id"],
  created() {
    this.getComments();
  },
  methods: {
    getComments() {
      this.axios
        .get(`api/getcomments/${this.id}?pageindex=${this.pageIndex}`)
        .then(res => {
          if (res.data.status == 0) {
            if (res.data.message.length == 0) {
              Toast("没有更多的评论了");
            }
            this.commentData = this.commentData.concat(res.data.message);
          }

          // console.log(this.commentData)
        },rej => {
          console.log('err')
        })
        .catch(() => {
          Toast('评论获取失败')
        })
    },
    getMore() {
      this.pageIndex++;
      this.getComments();
    },
    postComment() {
      if (this.commentText.trim()) {
        this.axios
          .post(`api/postcomment/${this.id}`, {
            content: this.commentText.trim()
          })
          .then(res => {
            if (res.data.status == 0) {
              Toast("评论成功");
              this.commentText = ''
              this.getComments();
            }
          })
          .then(res => {
            this.axios
              .get(`api/getcomments/${this.id}?pageindex=1`)
              .then(res => {
                if (res.data.status == 0) {
                  if (res.data.message.length == 0) {
                    Toast("没有更多的评论了");
                  }
                  this.commentData = res.data.message;
                }

                // console.log(this.commentData)
              });
          });
      } else {
        Toast("请输入评论内容");
      }
    }
  }
};
</script>

<style scoped>
.comment-box {
  padding: 0 4%;
}
.title {
  font-size: 18px;
}
textarea {
  margin-bottom: 0;
}
.comment {
  margin: 10px 0;
}
.comment-title {
  font-size: 13px;
  background-color: #ccc;
}
.comment-content {
  font-size: 12px;
}
</style>