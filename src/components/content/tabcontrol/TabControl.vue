<template>
  <div class="tabc">
    <div
      class="tabcitem"
      v-for="(item, index) in titles"
      :key="item.index"
      :class="{ active: index === currentindex }"
      @click="itemclick(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  data() {
    return {
      currentindex: 0,
    };
  },
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    itemclick(index) {
      this.currentindex = index;
      this.$emit("tabClick", index);
    },
  },
};
</script>

<style>
.tabc {
  display: flex;
  text-align: center;
  font-size: 16px;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
  z-index: 3;
}
.tabcitem span {
  padding: 5px;
}
.tabcitem {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
.active span {
  border-bottom: 3px solid var(--color-high-text);
}
</style>