<template>
  <div class="navbar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
    name:'NavBar'
}
</script>

<style>
    .navbar{
        display: flex;
        height: 44px;
        background-color: #fff;
        line-height: 44px;
        text-align: center;
        box-shadow: 0 2px 2px rgba(100, 100, 100, 0.4);
    }
    .left,.right{
        width: 60px;
        /* background-color:red; */
    }
    .center{
        flex: 1;
        /* background-color: blue; */
    }
</style>