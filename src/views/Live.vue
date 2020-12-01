<template>
  <div class="Live">
    <router-view name="Live"></router-view>
  </div>
</template>

<script>
import Navitem from "../components/Navitme.vue";
export default {
  name: "Live",
};
</script>

<style lang="scss">
@import "../styles/mixin.scss";
.Live {
  @include set-width-height(100%, 100%);
  background-image: url("../imgs/bg3.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;
}
</style>
