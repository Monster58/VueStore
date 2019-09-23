<template>
  <mt-swipe>
    <mt-swipe-item v-for="item in bannerUrlList" :key="item.id">
      <img :class="isfull? 'wfull': 'hfull'" :src="item.img || item.src" alt />
    </mt-swipe-item>
  </mt-swipe>
</template>

<script>
export default {
    props: ['bannerUrlList', 'isfull']
};
</script>

<style scoped>
.mint-swipe {
  height: 129px;
  text-align: center;
}
/* .mint-swipe-item img {
  width: 100%;
  height: auto;
} */
.wfull {
  width: 100%;
  height: auto;
}
.hfull {
    height: 100%;
}
</style>