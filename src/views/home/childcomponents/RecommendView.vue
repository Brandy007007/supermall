<template>
  <div class="recview">
    <div class="recitem" v-for="item in recommends" :key="item.index">
      <a :href="item.link">
        <img :src="item.image" alt="" />
        <div class="rectext">{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props: {
    recommends: {
      type: Array,
      dafault() {
        return [];
      },
    },
  },
};
</script>

<style>
.recview {
  display: flex;
  text-align: center;
  font-size: 12px;
  padding: 10px 0 15px 0;
  border-bottom: 8px solid #eee;
}
.recitem {
  flex: 1;
}
.recitem a{
    text-decoration: none;
}
.recitem img {
  width: 90%;
}
.rectext{
    margin-top: 5px;
    color: black;
}
</style>