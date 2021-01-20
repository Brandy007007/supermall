<template>
  <div class="back-top">
    <img src="~assets/img/common/top.png" alt="" />
  </div>
</template>

<script>
export default {
  name: "BackTop",
};
</script>

<style scoped>
.back-top {
  position: fixed;
  bottom: 49px;
  right: 10px;
}
.back-top img {
    width: 40px;
    height: 40px;
    opacity: 0.5;
}
</style>