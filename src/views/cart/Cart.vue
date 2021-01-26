<template>
  <div id="carttotal">
    <!-- 导航 -->
    <nav-bar class="cartnavbar">
      <div slot="center">购物车({{ cartLength }})</div>
    </nav-bar>
    <scroll class="cartscroll" :pullUpLoad="true" ref="scroll">
      <!-- 商品列表 -->
      <cart-list> </cart-list>
    </scroll>
    <!-- 底部汇总 -->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import NavBar from "components/common/navbar/NavBar";
import CartBottomBar from "./childComp/CartBottomBar";
import CartList from "./childComp/CartList";
import { mapGetters } from "vuex";
export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar,
    Scroll,
  },
  computed: {
    // cartLength(){
    //   return this.$store.getter.cartLength
    // }
    ...mapGetters(["cartLength"]),
  },
  activated() {
    // console.log("~~~~~~");
    this.$refs.scroll.refresh();
  },
};
</script>

<style scoped>
#carttotal {
  height: 100vh;
  position: relative;
}
.cartnavbar {
  background-color: var(--color-tint);
  color: #ffffff;
  font-size: 18px;
  font-weight: bold;
  position: relative;
}
.cartscroll {
  height: calc(100% - 44px - 49px);
  overflow: hidden;
  position: relative;
}
</style>