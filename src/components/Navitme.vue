<template>
  <div class="NavItme">
    <div class="NavItme-content">
      <div class="logo">
        <img src="../imgs/logo.png" alt="" />
      </div>
      <ul class="nav-itmes">
        <li
          class="nav-itme"
          :class="{ Styles: indexs == index }"
          v-for="(item, index) in navlist"
          :key="item.id"
          @click="active(index)"
        >
          {{ item.title }}
        </li>
      </ul>
      <div class="online" v-if="loader">
        <div class="headeImg-content">
          <img :src="info.headimg" alt="" class="headeImg" />
        </div>
        <span class="username online-itme">{{ info.name }}</span>
        <span class="online-itme" @click="signOut">退出登录</span>
      </div>
      <div class="login-sign" v-else>
        <router-link to="/login" class="login">登录</router-link>
        <span>|</span>
        <router-link to="/sign" class="sign">注册</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import instance from "../api/api.js";
import socket from "./socket.js";
import { onMounted, reactive, ref, watch } from "vue";
import store from "../store/index.js";
import router from "../router/index.js";
export default {
  name: "NavItme",
  data() {
    return {
      navlist: [
        { id: 0, title: "首页" },
        { id: 0, title: "电影" },
        { id: 0, title: "聊天室" },
        { id: 0, title: "直播" },
        { id: 0, title: "论坛" },
      ],
      imgpath: "./peiqi.png",
    };
  },
  setup() {
    ////////////////////////////////////////////////////////////////////
    //监听同浏览器是否有多个同账号标签,有则,退出登录时,同时清除所有登录的同账号标签
    socket.addEventListener("message", function (data) {
      const values = JSON.parse(data.data);
      if (values.code == 20 && values.id == localStorage.getItem("Id")) {
        loader.value = false; //清除登录状态
        localStorage.removeItem("Token"); //清除token
        localStorage.removeItem("Id"); //清除账号
        window.location.reload(true); //页面刷新,不然下次登录将会BUG
      }
    });
    //监听同浏览器是否有多个标签,有则,登录时,同时登录所有标签!
    socket.addEventListener("message", function (data) {
      const values = JSON.parse(data.data);
      if (values.code == 10 && values.id == localStorage.getItem("Id")) {
        store.commit("setLoader", 2); //触发登录状态改变
        router.push("/");
      }
    });
    ////////////////////////////////////////////////////////////////////
    let loader = ref(false);
    let info = reactive({ headimg: "", id: "", name: "" });
    const { indexs, active } = Actives();
    const { signOut } = SignOut(loader, socket, info);

    onMounted(() => {
      if (localStorage.getItem("Token")) {
        store.commit("setLoader", 1); //触发登录状态改变
      }
    });

    //监听路由对应下标的变化来改变class样式
    watch(
      () => store.state.indexs,
      newIndex => {
        indexs.value = newIndex;
      }
    );
    //监听登录状态的改变
    watch(
      () => store.state.loader,
      newLoader => {
        loader.value = newLoader;
        if (loader.value) {
          const Token = `Bearer ${localStorage.getItem("Token")}`;
          const ID = localStorage.getItem("Id");
          instance
            .get("/v1/users/userinfo", {
              params: {
                id: ID,
              },
              headers: { Authorization: Token },
            })
            .then(data => {
              store.commit("setInfo", data.data);
              info.name = data.data.name;
              info.id = data.data.id;
              info.headimg = data.data.headimg;
            });
        }
      }
    );
    return { info, indexs, active, loader, signOut };
  },
};

function Actives() {
  //导航路径持久化
  const paths = ["/", "/Movie", "/Chat", " /Live", "/Forum"];
  let indexs = ref(sessionStorage.getItem("index"));
  if (indexs.value == null) {
    indexs.value = 0;
  }
  function active(index) {
    sessionStorage.setItem("index", index);
    indexs.value = sessionStorage.getItem("index");
    router.push({ path: paths[indexs.value] });
  }
  return { indexs, active };
}

function SignOut(loader, socket, info) {
  function signOut() {
    //手动退出登录
    const result = window.confirm("确定退出吗?");
    if (result) {
      const Token = `Bearer ${localStorage.getItem("Token")}`;
      localStorage.removeItem("Token"); //清除token
      loader.value = false; //设置登录状态
      socket.send(JSON.stringify({ code: 20, id: info.id })); //通知所有同账号下线
      window.location.reload(true); //页面刷新,不然下次登录将会BUG

      instance.get("/v1/users/outLogin", {
        params: {
          userid: info.id, //用户ID
          loader: loader.value,
        },
        headers: { Authorization: Token },
      });
    }
  }
  return { signOut };
}
</script>

<style lang="scss">
@import "../styles/mixin.scss";
.NavItme {
  @include set-width-height(100%, 85px);
  border-bottom: 1px solid rgb(207, 207, 207);

  .NavItme-content {
    @include set-width-height(1300px, 85px);
    @include Content-mid-space-around;
    margin: 0 auto;

    .logo {
      @include set-width-height(240px, 100%);
    }

    .nav-itmes {
      @include set-width-height(600px, 100%);
      @include Content-mid-space-around;
    }

    .login-sign {
      @include set-width-height(200px, 100%);
      @include Content-mid-space-around;
    }

    .login,
    .sign,
    .nav-itme {
      @include set-width-height(10%, 32px);
      @include Content-mid;
      color: rgb(29, 47, 94);
      font-size: 15px;
      cursor: pointer;
    }

    .nav-itme:hover {
      background-color: rgb(255, 94, 0);
      color: white;
    }

    .login,
    .sign {
      @include set-width-height(48px, 32px);
      transition: color 300ms;
      background: #e3f3fe;
      border-radius: 12px;
      color: #3563d5;
    }

    .login:hover,
    .sign:hover {
      color: rgb(214, 178, 16);
    }
  }
  .Styles {
    background-color: rgb(255, 94, 0) !important;
    color: white !important;
  }
  .bg {
    background-color: white !important;
  }
  .online {
    @include set-width-height(200px, 100%);
    @include Content-mid-space-around;
  }

  .headeImg-content {
    @include set-width-height(50px, 50px);
    border: 1px solid rgb(207, 207, 207);
    border-radius: 50%;
    @include Content-mid;
  }

  .headeImg {
    @include set-width-height(40px, 40px);
  }

  .online-itme {
    font-size: 14px;
    color: #3563d5;
    cursor: pointer;
  }

  .username {
    width: 80px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
