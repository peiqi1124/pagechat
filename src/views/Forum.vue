<template>
  <div class="Forum">
    <router-view name="Forum"></router-view>
  </div>
</template>

<script>
export default {
  name: "Forum",
};
</script>

<style lang="scss">
@import "../styles/mixin.scss";
.Forum {
  @include set-width-height(100%, 100%);
  background-image: url("../imgs/bg3.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;
}
</style>
