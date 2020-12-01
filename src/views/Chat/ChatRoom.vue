<template>
  <div class="ChatRoom">ChatRoom</div>
</template>

<script>
export default {
  name: "ChatRoom",
};
</script>

<style lang="scss">
@import "../../styles/mixin.scss";
.ChatRoom {
  @include set-width-height(100%, 100%);
  border: 1px solid red;
}
</style>
