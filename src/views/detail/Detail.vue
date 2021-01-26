<template>
  <div class="detail">
    <child-components
      class="detailtopbar"
      @detailTopClick="detailTopClick"
      ref="detailTopBar"
    ></child-components>

    <scroll
      class="content"
      ref="wrapper"
      :pullUpLoad="true"
      @scroll="contentScroll"
    >
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info
        :detail-info="detailInfo"
        @imageLoad="imageLoad"
      ></detail-goods-info>
      <detail-param-info
        :param-info="paramInfo"
        ref="param"
      ></detail-param-info>
      <detail-comment-info
        :comment-info="commentInfo"
        ref="comment"
      ></detail-comment-info>
      <goods-list :goods="recommends" ref="datailgoods"></goods-list>
    </scroll>
    <detail-bottom-bar
      class="detail-bottom"
      @addCart="addaddCart"
    ></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import ChildComponents from "views/detail/childcomponents/ChildComponents";
import DetailSwiper from "views/detail/childcomponents/DetailSwiper";
import DetailBaseInfo from "views/detail/childcomponents/DetailBaseInfo";
import DetailShopInfo from "views/detail/childcomponents/DetailShopInfo";
import DetailGoodsInfo from "views/detail/childcomponents/DetailGoodsInfo";
import DetailParamInfo from "views/detail/childcomponents/DetailParamInfo";
import DetailCommentInfo from "views/detail/childcomponents/DetailCommentInfo";
import DetailBottomBar from "views/detail/childcomponents/DetailBottomBar";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/content/backtop/BackTop";
import Scroll from "components/common/scroll/Scroll";
import Toast from "components/common/toast/Toast";
import { mapActions } from "vuex";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail.js";
export default {
  name: "Detail",
  components: {
    ChildComponents,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    GoodsList,
    BackTop,
    Scroll,
    Toast,
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopY: [],
      currentIndex: 0,
      isShowBackTop: false,
    };
  },
  created() {
    this.iid = this.$route.params.iid;

    getDetail(this.iid).then((res) => {
      // console.log(res);
      const data = res.result;
      //   res-result-iteminfo-topimage
      this.topImages = data.itemInfo.topImages;

      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      this.shop = new Shop(data.shopInfo);

      this.detailInfo = data.detailInfo;

      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      if (data.rate.list !== 0) {
        this.commentInfo = data.rate.list[0];
      }
      getRecommend().then((res) => {
        // console.log(res);
        this.recommends = res.data.list;
      });
    });
  },
  methods: {
    ...mapActions(["addCart"]),
    imageLoad() {
      this.$refs.wrapper.refresh();
      this.$nextTick(() => {
        this.themeTopY = [];
        // console.log(this.$refs.param);
        // console.log(this.$refs.comment);
        // console.log(this.$refs.datailgoods);
        this.themeTopY.push(0);
        this.themeTopY.push(this.$refs.param.$el.offsetTop - 44);
        this.themeTopY.push(this.$refs.comment.$el.offsetTop - 44);
        this.themeTopY.push(this.$refs.datailgoods.$el.offsetTop - 44);
        this.themeTopY.push(Number.MAX_VALUE);
        // console.log(this.themeTopY);
      });
    },
    detailTopClick(index) {
      // console.log(index);
      this.$refs.wrapper.scrollTo(0, -this.themeTopY[index], 200);
    },
    contentScroll(position) {
      // console.log(position);
      this.isShowBackTop = -position.y > 500;
      const positionY = -position.y;
      const length = this.themeTopY.length;
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          positionY >= this.themeTopY[i] &&
          positionY < this.themeTopY[i + 1]
        ) {
          // this.currentIndex = i;
          this.$refs.detailTopBar.currentIndex = i;
        }
      }
    },
    backClick() {
      // console.log("箭头点击了");
      // console.log(this.$refs.scroll.scroll);
      this.$refs.wrapper.scrollTo(0, 0, 500);
    },
    addaddCart() {
      // console.log("添加购物车");
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      // this.$store.commit('addCart', product);
      // console.log("~~~~~");
      this.addCart(product).then((res) => {
        console.log(product);
        console.log(res);
        // console.log(this.$toast);
        this.$toast.show(res, 2000);
      });
    },
  },
};
</script>

<style scoped>
.detail {
  position: relative;
  z-index: 10;
  background-color: white;
  height: 100vh;
}
.detailtopbar {
  position: relative;
  z-index: 11;
  background-color: white;
}
.content {
  height: calc(100% - 44px - 49px);
  position: relative;
  /* background-color: #fff; */
  overflow: hidden;
}
.detail-bottom {
  background-color: #fff;
}
</style>