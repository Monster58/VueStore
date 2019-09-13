<template>
  <div class="photo-box">
    <div class="person-wrap" ref="personWrap">
      <!-- 分类列表 -->
      <ul class="person-list clearfix" ref="personTab">
        <li
          @click="addActiveClass(item.id);getImgList(item.id)"
          :class="['person-item', checkActiveClass == item.id? 'active' : '']"
          v-for="item in imgCategory"
          :key="item.id"
        >
          <a>{{item.title}}</a>
        </li>
      </ul>
    </div>
    <!-- 图片列表 -->
    <div class="img-list">
      <ul>
        <router-link :to="`/home/img/imginfo/${item.id}`" tag="li" v-for="item in imgList" :key="item.id">
          <img v-lazy="item.img_url" />
          <div class="img-info">
            <h1>{{item.title}}</h1>
            <p>{{item.zhaiyao}}</p>
          </div>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
//接口：/api/getimgcategory  分类列表
//   /api/getimages/:cateid 图片列表
//需要手动像message数组unshift添加{title: '全部分类', id: 0}
import BScroll from "better-scroll";
import { Toast } from "mint-ui";
export default {
  name: "ReserveInfo",
  data() {
    return {
      imgCategory: [],
      checkActiveClass: 0,
      imgList: []
    };
  },
  created() {
    this.getimgcategory();
    this.getImgList();
  },
  watch: {
    imgCategory: {
      handler: function(val, oldVal) {
        this.$nextTick(function() {
          //页面加载完成后执行
          this.$nextTick(() => {
            this.personScroll();
          });
        });
      }
      // 深度观察监听
      // deep: true
    }
  },
  methods: {
    addActiveClass(itemId) {
      this.checkActiveClass = itemId;
    },
    getimgcategory() {
      this.axios
        .get("api/getimgcategory")
        .then(res => {
          if (res.data.status == 0) {
            res.data.message.unshift({ title: "全部分类", id: 0 });
            this.imgCategory = res.data.message;
          } else {
            Toast("获取分类失败，请稍后重试");
          }
        })
        .catch(() => {
          Toast("服务器崩溃了。。。");
        });
    },
    personScroll() {
      let liWidth = document.body.clientWidth / 5;
      for (let i = 0; i < this.$refs.personTab.children.length; i++) {
        this.$refs.personTab.children[i].style.width = liWidth + "px";
      }
      let width = this.$refs.personTab.children.length * liWidth;
      this.$refs.personTab.style.width = width + "px";
      // this.$nextTick 是一个异步函数，为了确保 DOM 已经渲染
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.personWrap, {
            startX: 0,
            click: true,
            scrollX: true,
            // 忽略竖直方向的滚动
            scrollY: false,
            eventPassthrough: "vertical"
          });
        } else {
          this.scroll.refresh();
        }
      });
    },
    getImgList(id = 0) {
      this.axios(`api/getimages/${id}`)
        .then(res => {
          if (res.data.status == 0) {
            this.imgList = res.data.message;
            if(this.imgList.length == 0) Toast("暂时没有内容")
          } else {
            Toast("暂时没有内容");
          }
        })
        .catch(() => {
          Toast("服务器崩溃了");
        });
    }
  }
};
</script>

<style scoped>
a {
  color: rgb(58, 58, 58);
  font-size: 0.8rem;
}
.active a {
  color: rgb(41, 125, 223);
}
.photo-box {
  width: 100%;
  overflow: hidden;
}

* {
  touch-action: pan-y;
}
ul {
  padding-inline-start: 0;
}
li {
  display: block;
  float: left;
  list-style: none;
  text-align: center;
}
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
ul {
  margin-block-start: 0;
  margin-block-end: 0;
}
.person-wrap {
  height: 32px;
  line-height: 20px;
  font-size: 12px;
  padding: 6px 0;
  box-shadow: 0 0 4px #dedede;
}
.img-list li {
  float: none;
  background-color: #ccc;
  text-align: center;
  list-style: none;
  margin-bottom: 0.3em;
}
img[lazy="loading"] {
  width: 40px;
  height: 300px;
  margin: auto;
}
.img-list ul {
  margin-block-start: 0.5rem;
  padding-inline-start: 0;
  padding: 0 1.2rem;
}
.img-list li {
  background-color: #ccc;
  text-align: center;
  list-style: none;
  margin-bottom: 0.3em;
  position: relative;
}
img {
  width: 100%;
  height: auto;
  vertical-align: middle;
}
.img-info {
  position: absolute;
  bottom: 0;
  background: rgba(0, 0, 0, 0.445);
  text-align: left;
  color: #ffffff;
  padding: 0.6rem 0.6rem;
}
.img-info h1 {
  font-size: 0.9rem;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.img-info p {
  font-size: 0.75rem;
  color: #fff;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
</style>>
