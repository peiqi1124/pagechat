<template>
  <div class="Chat">
    <ChatRoom></ChatRoom>
  </div>
</template>

<script>
import { ref, watch, defineAsyncComponent } from "vue";
import store from "../store/index.js";
export default {
  name: "Chat",
  components: {
    ChatRoom: defineAsyncComponent(() => import("./Chat/ChatRoom.vue")),
  },
};
</script>

<style lang="scss">
@import "../styles/mixin.scss";
.Chat {
  @include set-width-height(100%, 100%);
  background-image: url("../imgs/bg3.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;
}
</style>
