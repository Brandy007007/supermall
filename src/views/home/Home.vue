<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control
      class="tab-control"
      v-show="isTabFixed"
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
    ></tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <child-components
        class="swiper"
        :banners="banners"
        @swiperImageLoad="swiperImageLoad"
      ></child-components>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view />
      <tab-control
        class="tabcontrol"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
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
import { debounce } from "common/utils";

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
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY:0,
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
    const refresh = debounce(this.$refs.scroll.refresh, 50);
    this.$bus.$on("itemImageLoad", () => {
      // console.log('~~~~');
      // console.log(this.$refs.scroll.refresh());
      // this.$refs.scroll.refresh()
      refresh();
    });
  },
  activated() {
    // console.log("actived");
    this.$refs.scroll.scrollTo(0, this.saveY,0);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    // console.log("deactived");
    // console.log(this.$refs.scroll.scroll.y);
    this.saveY = this.$refs.scroll.getcurrentY;

    this.$bus.$off
  },
  methods: {
    tabClick(index) {
      // console.log(index);
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
      this.$refs.tabControl1.currentindex = index;
      this.$refs.tabControl2.currentindex = index;
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
        // console.log("~~~~~~~~~");
        // console.log(this.$refs.scroll.scroll);
        // console.log(this.$refs.scroll.scroll.refresh());
        // this.$refs.scroll.scroll.refresh()
      });
    },
    contentScroll(position) {
      // console.log(position.y);
      this.isShowBackTop = -position.y > 1000;

      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    loadMore() {
      // console.log('上拉加载');
      this.getHomeGoods(this.currentType);
    },
    swiperImageLoad() {
      // console.log("~~~~~~~~2");
      // console.log(this.$refs.tabControl.$el.offsetTop);
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
  },
};
</script>
  
<style scoped>
#home {
  /* padding-top: 44px; */
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
  /* position: fixed;
  top: 0;
  left: 0;
  right: 0; */
  /* z-index: 5; */
}
.tab-control {
  position: relative;
  z-index: 9;
}

/* .fixed {
  position: fixed;
  top: 44px;
  left: 0;
  right: 0;
} */
</style>