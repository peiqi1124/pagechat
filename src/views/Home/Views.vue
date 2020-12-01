<template>
  <div class="Views">
    <div class="content">
      <video class="video-content" controls autoplay>
        <!-- <source src="movie.mp4" type="video/mp4" />
      <source src="movie.ogg" type="video/ogg" /> -->
        您的浏览器不支持,请升级或更换浏览器
      </video>
      <ul class="video-items">
        <li class="item" :class="{ active: indexs == index }" v-for="(item, index) in 5" :key="index" @click="setActive(index)">
          <img src="" alt="" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import "../../flv/flv.js";
import { ref } from "vue";
export default {
  name: "Views",
  data() {
    return {
      indexs: 0,
    };
  },
  methods: {
    setActive(index) {
      this.indexs = index;
    },
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
  .content {
    margin: 0 auto;
    margin-top: 10px;
    @include set-width-height(1200px, 612px);
    padding: 0 5px;
    @include Content-mid;
    background: black;
  }
  .video-content {
    @include set-width-height(1000px, 600px);
  }
  .video-items {
    @include set-width-height(200px, 600px);
    @include align-center;
  }
  .item {
    @include set-width-height(190px, 110px);
  }
  .item:hover {
    border: 1px solid red;
  }
  .item > img {
    @include set-width-height(100%, 100%);
  }
  .active {
    border: 1px solid red;
  }
}
</style>
