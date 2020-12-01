<template>
  <div class="ChatRoom">
    <div class="ChatRoom-content">
      <div class="content-left">
        <ul class="left-item1">
          <li>消息</li>
          <li>好友</li>
          <li>群组</li>
        </ul>

        <ul class="left-view">
          11
        </ul>

        <ul class="left-item2">
          <li>添加好友</li>
          <li>添加群组</li>
          <li>黑名单</li>
        </ul>
      </div>

      <div class="content-right">2</div>
    </div>
  </div>
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
  background-image: url("../../imgs/c-bg.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  @include Content-mid;

  .ChatRoom-content {
    @include set-width-height(900px, 600px);
    background: rgba(66, 91, 95, 0.5);
    display: flex;
    border: 1px solid rgb(131, 108, 108);
  }

  .content-left {
    @include set-width-height(30%, 100%);
    position: relative;
  }

  .left-item1 {
    display: flex;
    width: 100%;
    border-bottom: 1px solid rgb(131, 108, 108);
  }

  .left-item1 > li {
    flex: 1;
    border-left: 1px solid rgb(131, 108, 108);
    cursor: pointer;
    color: white;
  }
  .left-item1 > li:nth-child(1) {
    border-left: none;
  }

  .left-item2 {
    position: absolute;
    bottom: 0;
    width: 100%;
  }

  .left-item2 > li {
    width: 100%;
    border-top: 1px solid rgb(131, 108, 108);
    cursor: pointer;
    color: white;
  }

  .content-right {
    @include set-width-height(70%, 100%);
    border-left: 1px solid rgb(131, 108, 108);
  }
}
</style>
