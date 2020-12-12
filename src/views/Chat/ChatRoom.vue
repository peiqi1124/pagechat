<template>
  <div class="ChatRoom">
    <!--  -->

    <div class="ChatRoom-content">
      <!--ChatRoom-content-left -->

      <div class="ChatRoom-content-left">
        <div class="content-left-title">
          <span class="title-item" @click="setIndex(0)">消息</span>
          <span class="title-item" @click="setIndex(1)">好友</span>
          <span class="title-item" @click="setIndex(2)">群组</span>
        </div>

        <!--content-left-items-->

        <div class="content-left-items animate__animated animate__zoomIn" v-show="indexs == 0">
          <div class="content-item addFriendMesag" v-for="(item, index) in 1" :key="index">
            <div class="addMesag">
              {{}}
              <br />
              请求添加好友
            </div>
            <div>
              <button class="ok">同意</button>
              <br />
              <button class="close">拒绝</button>
            </div>
          </div>
          <div class="content-item friendMesag">
            <p class="friendame">张三</p>
            <p class="friendame-message">伟大伟大伟大伟大的伟大伟大七点七五的</p>
          </div>
        </div>

        <div class="content-left-items animate__animated animate__zoomIn" v-show="indexs == 1">
          <div class="content-item" v-for="(item, index) in 10" :key="index">好友</div>
        </div>

        <div class="content-left-items animate__animated animate__zoomIn" v-show="indexs == 2">
          <div class="content-item" v-for="(item, index) in 10" :key="index">群组</div>
        </div>
        <!--  -->

        <div class="content-left-items animate__animated animate__zoomIn" v-show="indexs == 3">
          <div class="getFrendInfo">
            <input type="text" class="writeId" v-model="hisId" />
            <button class="sendButn" @click="getUserInfo">搜索</button>
          </div>

          <div class="addFrend" v-show="datas.id">
            <img :src="datas.headImg" alt="" class="addFrend-headImeg" />
            <p class="addFrend-name">昵称: {{ datas.name }}</p>
            <p class="addFrend-id">账号: {{ datas.id }}</p>
            <button class="addButn" @click="addFrends">添加</button>
          </div>
        </div>

        <div class="content-left-items animate__animated animate__zoomIn" v-show="indexs == 4">群组信息</div>
        <div class="content-left-items animate__animated animate__zoomIn" v-show="indexs == 5">黑名单</div>

        <!--content-left-bottom-->
        <div class="content-left-bottom">
          <p class="bottom-item" @click="setIndex(3)">添加好友</p>
          <p class="bottom-item" @click="setIndex(4)">添加群组</p>
          <p class="bottom-item" @click="setIndex(5)">黑名单</p>
        </div>
      </div>

      <!-- ChatRoom-content-right -->
      <div class="ChatRoom-content-right">2</div>
      <!--  -->

      <!--  -->
    </div>

    <!--  -->
  </div>
</template>

<script>
import socket from "../../components/socket.js";
import instance from "../../api/api.js";
import { ref, reactive } from "vue";
export default {
  name: "ChatRoom",
  data() {
    return {
      frendRequst: [],
    };
  },
  mounted() {
    //添加好友请求消息
    socket.addEventListener("message", event => {
      const datas = JSON.parse(event.data);
      if (datas.eventName == "frendRequst") {
        this.Messages.push(datas);
      }
    });
  },
  setup() {
    //状态管理
    let indexs = ref(0);
    function setIndex(index) {
      indexs.value = index;
    }

    //用户搜索
    let hisId = ref("");
    let datas = reactive({
      headImg: "",
      name: "",
      id: "",
    });
    function getUserInfo() {
      const Token = `Bearer ${localStorage.getItem("Token")}`;
      const RE = /^[a-zA-Z]{1}[0-9a-zA-Z]{5,16}$/i;
      if (!RE.test(hisId.value)) {
        alert("您输入的格式不正确");
        return;
      }
      instance
        .get("/v1/users/userinfo", {
          headers: { Authorization: Token },
          params: {
            id: hisId.value,
          },
        })
        .then(data => {
          datas.headImg = data.data.headImg;
          datas.name = data.data.name;
          datas.id = data.data.id;
        });
    }

    //添加好友
    function addFrends() {
      const eventNames = "addFrend";
      const myIds = localStorage.getItem("Id");
      const hisIds = hisId.value;
      socket.send(JSON.stringify({ eventName: eventNames, myId: myIds, hisId: hisIds }));
    }

    //抛出方法,变量
    return { setIndex, indexs, getUserInfo, hisId, datas, addFrends };
  },
};
</script>

<style lang="scss">
@import "../../styles/mixin.scss";
@import "animate.css";
.ChatRoom {
  width: 100%;
  height: 100%;
  background-image: url("../../imgs/c-bg1.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .ChatRoom-content {
    width: 800px;
    height: 550px;
    display: flex;
    background-color: rgba(112, 112, 112, 0.4);
  }
  .ChatRoom-content-left {
    width: 30%;
    height: 100%;
    border: 1px solid rgb(245, 218, 218);
  }

  //////left-title
  .content-left-title {
    width: 100%;
    height: 60px;
    display: flex;

    .title-item {
      flex: 1;
      font-size: 15px;
      @include Content-mid-space-around;
      color: rgb(243, 234, 180);
      border-bottom: 1px solid rgb(245, 218, 218);
      cursor: pointer;
    }
    .title-item:nth-child(2) {
      border-left: 1px solid rgb(245, 218, 218);
      border-right: 1px solid rgb(245, 218, 218);
    }
  }
  //////left-title

  //////content-left-items
  .content-left-items {
    width: 100%;
    height: 355px;
    overflow: auto;
  }
  .content-left-items::-webkit-scrollbar {
    display: none; //兼容google
  }
  .content-left-items {
    scrollbar-width: none; //兼容火狐
  }
  .content-item {
    width: 100%;
    height: 50px;
    margin: 5px 0;
    background-color: rgba(245, 218, 218, 0.3);
    @include Content-mid-space-around;
    color: rgb(243, 234, 180);
    font-size: 16px;
  }
  .addFriendMesag {
    width: 100%;
  }
  .addMesag {
    width: 70%;
    border: 1px solid red;
    height: 100%;
    @include set-text-none;
  }
  .close,
  .ok {
    width: 48px;
    height: 21px;
    border: none;
    border-radius: 5px / 18%;
    cursor: pointer;
  }
  .close:active,
  .ok:active {
    background-color: rgba(248, 40, 40, 0.6);
    color: rgb(255, 255, 255);
  }
  .close {
    margin-top: 5px;
  }

  .friendMesag {
    flex-direction: column;
  }
  .friendame {
    width: 100%;
    text-align: left;
    padding-left: 10px;
    @include set-text-none;
  }
  .friendame-message {
    width: 100%;
    font-size: 14px;
    padding-left: 10px;
    @include set-text-none;
    text-align: center;
    color: white;
  }
  //////content-left-items

  .content-left-bottom {
    width: 100%;
    height: 135px;
    font-size: 16px;
    display: flex;
    flex-direction: column;

    .bottom-item {
      color: rgb(243, 234, 180);
      border-top: 1px solid rgb(245, 218, 218);
      flex: 1;
      @include Content-mid-space-around;
      cursor: pointer;
    }
  }

  .getFrendInfo {
    width: 100%;
    height: 15%;
    @include Content-mid-space-around;
  }
  .writeId {
    width: 70%;
    height: 60%;
  }
  .sendButn {
    width: 20%;
    height: 60%;
    border: none;
    border-radius: 5px / 18%;
    cursor: pointer;
  }
  .sendButn:active {
    background-color: rgba(248, 40, 40, 0.6);
    color: rgb(255, 255, 255);
  }

  .addFrend {
    width: 100%;
    height: 85%;
    text-align: center;
  }
  .addFrend-headImeg {
    width: 60px;
    height: 60px;
  }
  .addFrend-name {
    margin-top: 10px;
  }
  .addFrend-name,
  .addFrend-id {
    width: 100%;
    height: 40px;
    font-size: 16px;
    color: white;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .addButn {
    width: 50px;
    height: 30px;
    border: none;
    border-radius: 5px / 18%;
    cursor: pointer;
  }
  .addButn:active {
    background-color: rgba(248, 40, 40, 0.6);
    color: rgb(255, 255, 255);
  }
  //////////////////////////////////////////////////////////
  .ChatRoom-content-right {
    width: 70%;
    height: 100%;
  }
}
</style>
