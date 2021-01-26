<template>
  <div class="bottom-bar">
    <div class="bottom-check">
      <check-button
        class="checkbtn"
        :is-checked="isSelectAll"
        @click.native="selectAll"
      ></check-button>
      <span>全选</span>
    </div>

    <div class="totalprice">合计：¥ {{ totalPrice }}</div>
    <div class="totalcount" @click="calClick">去计算：({{ totalCount }})</div>
  </div>
</template>

<script>
import CheckButton from "./CheckButton";
import Toast from "components/common/toast/Toast"

export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
  },
  computed: {
    totalPrice() {
      return this.$store.state.cartlist
        .filter((item) => {
          return item.checked;
        })
        .reduce((preValue, item) => {
          return item.price * item.count + preValue;
        }, 0)
        .toFixed(2);
    },
    totalCount() {
      return this.$store.state.cartlist
        .filter((item) => {
          return item.checked;
        })
        .reduce((preValue, item) => {
          return preValue + item.count;
        }, 0);
    },
    isSelectAll() {
      if (this.$store.state.cartlist.length === 0) return false;
      // return !this.$store.state.cartlist.filter((item) => !item.checked).length;
      return !this.$store.state.cartlist.find((item) => !item.checked);
    },
  },
  methods: {
    selectAll() {
      this.isSelectAll
        ? this.$store.state.cartlist.forEach((item) => (item.checked = false))
        : this.$store.state.cartlist.forEach((item) => (item.checked = true));
    },
    calClick(){
      if(!0){
        this.$toast.show("请选择购买的商品",1500)
      }
    }
  },
};
</script>

<style>
.bottom-bar {
  height: 40px;
  line-height: 40px;
  background-color: #eee;
  position: relative;
  bottom: 43px;
  display: flex;
}
.bottom-check {
  display: flex;
  align-items: center;
}
.checkbtn {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-left: 10px;
  margin-right: 5px;
}
.totalprice {
  margin-left: 10px;
}
.totalcount {
  width: 120px;
  height: 40px;
  background-color: #ee512f;
  color: white;
  position: absolute;
  right: 0px;
  text-align: center;
}
</style>