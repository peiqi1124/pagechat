<template>
  <div class="Home">
    <H-view></H-view>
    <router-view name="Home"></router-view>
  </div>
</template>

<script>
import Hview from "./Home/Views.vue";
export default {
  name: "Home",
  components: {
    "H-view": Hview,
  },
};
</script>

<style lang="scss">
@import "../styles/mixin.scss";
.Home {
  @include set-width-height(100%, 100%);
  background-image: url("../imgs/bg3.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;
}
</style>
