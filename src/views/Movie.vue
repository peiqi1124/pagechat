<template>
  <div class="Movie">
    <router-view name="Movie"></router-view>
  </div>
</template>

<script>
export default {
  name: "Movie",
};
</script>

<style lang="scss">
@import "../styles/mixin.scss";
.Movie {
  @include set-width-height(100%, 100%);
  background-image: url("../imgs/bg3.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;
}
</style>
