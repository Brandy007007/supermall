<template>
  <div class="cartlist">
    <cart-list-item v-for="(item,index) in cartList" :key="index" :itemInfo="item"></cart-list-item>
  </div>
</template>

<script>
import CartListItem from "./CartListItem"
import { mapGetters } from "vuex";
export default {
  name: "CartList",
  components: {
    CartListItem  
  },
  computed: {
    ...mapGetters(['cartList']),
  },
};
</script>

<style>
</style>