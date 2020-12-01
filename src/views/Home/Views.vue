<template>
  <div class="Views">
    <video class="video-content" controls autoplay>
      <!-- <source src="movie.mp4" type="video/mp4" />
      <source src="movie.ogg" type="video/ogg" /> -->
      您的浏览器不支持,请升级或更换浏览器
    </video>
  </div>
</template>

<script>
import "../../flv/flv.js";
export default {
  name: "Views",
  mounted() {
    if (flvjs.isSupported()) {
      let videoElement = document.querySelector(".video-content");
      let flvPlayer = flvjs.createPlayer({
        type: "flv",
        url: "http://1011.hlsplay.aodianyun.com/demo/game.flv",
      });
      flvPlayer.attachMediaElement(videoElement);
      flvPlayer.load();
      // flvPlayer.play();
    }
  },
};
</script>

<style lang="scss">
@import "../../styles/mixin.scss";
.Views {
  @include set-width-height(100%, 612px);
  background-image: url("../../imgs/h-bg.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  margin-top: 85px;

  .video-content {
    @include set-width-height(1000px, 96%);
    margin-top: 10px;
  }
}
</style>
