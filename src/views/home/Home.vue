<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <child-components class="swiper" :banners="banners"></child-components>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view />
      <tab-control
        class="tabcontrol"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
      ></tab-control>
      <goods-list :goods="showType" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import ChildComponents from "views/home/childcomponents/ChildComponents";
import RecommendView from "views/home/childcomponents/RecommendView";
import FeatureView from "views/home/childcomponents/FeatureView";
import TabControl from "components/content/tabcontrol/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backtop/BackTop";
import { getHomeMultidata, getHomeGoods } from "network/home";

export default {
  name: "Home",
  components: {
    NavBar,
    ChildComponents,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      currentType: "pop",
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      isShowBackTop: false,
    };
  },
  computed: {
    showType() {
      return this.goods[this.currentType].list;
    },
  },
  created() {
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    const refresh = this.debounce(this.$refs.scroll.refresh,50);
    this.$bus.$on("itemImageLoad", () => {
      // console.log('~~~~');
      // console.log(this.$refs.scroll.refresh());
      // this.$refs.scroll.refresh()
      refresh();
    });
  },
  methods: {
    debounce(func, delay) {
      let timer = null;
      return function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this, args);
        }, delay);
      };
    },
    tabClick(index) {
      console.log(index);
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },
    backClick() {
      // console.log("箭头点击了");
      // console.log(this.$refs.scroll.scroll);
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // console.log(res);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        this.$refs.scroll.finishPullUp();
        console.log("~~~~~~~~~");
        // console.log(this.$refs.scroll.scroll);
        // console.log(this.$refs.scroll.scroll.refresh());
        // this.$refs.scroll.scroll.refresh()
      });
    },
    contentScroll(position) {
      // console.log(position.y);
      this.isShowBackTop = -position.y > 1000;
    },
    loadMore() {
      // console.log('上拉加载');
      this.getHomeGoods(this.currentType);
    },
  },
};
</script>
  
<style >
#home {
  padding-top: 44px;
  height: 100vh;
  position: relative;
}
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
}
/* .content{
  height: calc(100%-93px);
  overflow: hidden;
  margin-top: 44px;
} */
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  font-weight: bold;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 5;
}
.tabcontrol {
  /* position: sticky;
  top: 0px; */
}
</style>