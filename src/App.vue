<template>
  <div class="App">
    <Navitem class="Navitem"></Navitem>
    <router-view name="App"></router-view>
  </div>
</template>

<script>
import instance from "./api/api.js";
import Navitem from "./components/Navitme.vue";
import store from "./store/index.js";
export default {
  name: "App",
  components: {
    Navitem,
  },
};
</script>

<style lang="scss">
.App {
  width: 100%;
  height: 100%;
  // background-image: url("./imgs/bg3.jpg");
  // background-repeat: no-repeat;
  // background-size: 100% 100%;
}
.Navitem {
  position: fixed;
  top: 0;
  background-color: rgb(255, 255, 255, 1);
  z-index: 9999;
}
</style>
