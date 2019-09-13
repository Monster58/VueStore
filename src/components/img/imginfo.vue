<template>
  <div class="imginfobox">
    <div class="titlebox">
      <h1>{{imgInfo.title}}</h1>
      <div class="info">
        <span>发表时间：{{imgInfo.add_time | dateFormat}}</span>
        <span>点击：{{imgInfo.click}}次</span>
      </div>
    </div>
    <div class="content">
      <div class="thumbnail-img">
        <vue-preview :slides="slide1" @close="handleClose"></vue-preview>
      </div>
      <div class="content-text">
        <p v-html="imgInfo.content"></p>
      </div>
    </div>
    <comment :id="id"></comment>
  </div>
</template>

<script>
//api/getimageinfo/:imgid  图片详情
//api/getthumimages/:imgid
import VuePreview from "vue-preview";
import comment from "../childComponents/comment.vue";
export default {
  data() {
    return {
      id: this.$route.params.id,
      imgInfo: {},
      slide1: [
        {
          src:
            "https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_b.jpg",
          msrc:
            "https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg",
          alt: "picture1",
          title: "Image Caption 1",
          w: 600,
          h: 400
        }
      ]
    };
  },
  components: {
    comment
  },
  created() {
    this.getImgInfo();
    this.getthumbnailImg();
  },
  methods: {
    getImgInfo() {
      this.axios(`api/getimageinfo/${this.id}`).then(res => {
        if (res.data.status == 0) {
          this.imgInfo = res.data.message[0];
        }
      });
    },
    getthumbnailImg() {
      this.axios(`api/getthumimages/${this.id}`).then(res => {
        if ((res.status == 200) & (res.data.status == 0)) {
          res.data.message.forEach(ele => {
            ele.msrc = ele.src;
            ele.w = 600;
            ele.h = 400;
            ele.title = "vue";
          });
          this.slide1 = res.data.message;
        }
      });
    },
    handleClose() {
      console.log("close event");
    }
  }
};
</script>
<style lang="scss">
.titlebox {
  padding: 1% 4%;
  border-bottom: 1px solid #ccc;
  h1 {
    text-align: center;
    color: rgb(72, 160, 243);
    font-size: 1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .info {
    display: flex;
    justify-content: space-between;
    font-size: 0.75rem;
  }
}
.content {
  width: 100%;
  padding: 1% 4%;
  overflow: hidden;
  text-indent: 1.7em;
}
.thumbs {
  /deep/ .my-gallery {
    display: flex;
    flex-wrap: wrap;
    figure {
      width: 30%;
      margin: 5px;
      img {
        width: 100%;
        float: left;
      }
    }
  }
}
.imginfobox img {
    float: left;
}

</style>