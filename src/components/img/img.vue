<template>
  <div class="photo-box">
    <div class="person-wrap" ref="personWrap">
      <ul class="person-list clearfix" ref="personTab">
        <li class="person-item">分类</li>
        <li class="person-item">分类</li>
        <li class="person-item">分类</li>
        <li class="person-item">分类</li>
        <li class="person-item">分类</li>
        <li class="person-item">分类</li>
        <li class="person-item">分类</li>
        <li class="person-item">分类</li>
        <li class="person-item">分类</li>
        <li class="person-item">分类</li>
        <li class="person-item">分类</li>
        <li class="person-item">分类</li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "ReserveInfo",
  data() {
    return {};
  },
  mounted() {
    this.$nextTick(() => {
      this.personScroll();
    });
  },
  methods: {
    personScroll() {
      let liWidth = document.body.clientWidth / 5;
      for(let i = 0; i < this.$refs.personTab.children.length; i++) {
         this.$refs.personTab.children[i].style.width = liWidth + 'px'
      }
      console.log(this.$refs.personTab.children)
      let width = this.$refs.personTab.children.length * liWidth;
      console.log(width)
      console.log(document.body.clientWidth / 5);
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
    }
  }
};
</script>

<style scoped>
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
}
</style>>
