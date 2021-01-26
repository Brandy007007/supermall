<template>
  <div >
    <nav-bar class="childcomponents">
      <div slot="left" class="detailleft" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="" />
      </div>
      <div slot="center" class="title">
        <div
          v-for="(item, index) in titles"
          :key="index"
          @click="detailClick(index)"
          :class="{ active: index === currentIndex }"
        >
          {{ item }}
        </div>
      </div>
      <detail />
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
// import Detail from "./DetailSwiper";
export default {
  name: "ChildComponents",
  components: {
    NavBar, 
    // Detail
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  methods: {
    detailClick(index) {
      this.currentIndex = index;
      this.$emit('detailTopClick',index)
    },
    backClick() {
      this.$router.back();
    },
  },
};
</script>

<style>
.title {
  display: flex;
  font-size: 14px;
}
.title > div {
  flex: 1;
}
.active {
  color: var(--color-tint);
}
.detailleft img {
  margin-top: 13px;
}
</style>