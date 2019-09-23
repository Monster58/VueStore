<template>
  <div class>
    <div class="title">
      <h4>{{goodsInt.title}}</h4>
    </div>
    <hr />
    <div class="content" v-html="goodsInt.content"></div>
  </div>
</template>

<script>
//api/goods/getdesc/:id   //图文介绍
export default {
  data() {
    return {
      id: this.$route.params.id,
      goodsInt: {}
    };
  },
  methods: {
    getGoodsDesc() {
      this.axios(`api/goods/getdesc/89`).then(res => {
        if (res.status == 200 && res.data.status == 0) {
          this.goodsInt = res.data.message[0];
        }
      });
    }
  },
  created() {
    this.getGoodsDesc();
  }
};
</script>

<style lang="less" >
.title {
  text-align: center;
  color: rgb(83, 83, 209);
}
.content {
  padding: 1rem 1rem;
  img {
    width: 100%;
  }
}
</style>>
