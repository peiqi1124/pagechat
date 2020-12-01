<template>
  <div class="Login" @keyup.enter="login">
    <div class="Login-content">
      <div class="Login-UserData">
        <div class="title-img">
          <img src="../imgs/peiqi.png" alt="" />
        </div>
        <div class="Login-UserData-itme">
          <span>用户名:</span>
          <input type="text" id="LoginUserName" maxlength="16" v-model.trim="loginUserName" />
        </div>
        <div class="Login-UserData-itme">
          <span>密码:</span>
          <input type="password" id="LoginPassword" maxlength="25" v-model.trim="loginPassword" />
        </div>
        <div class="Login-UserData-itme">
          <span>验证码:</span>
          <input type="text" id="LoginCodes" maxlength="6" v-model.trim="loginCode" placeholder="区分大小写" />
          <div class="SVG" v-html="Svgdata" @click="retrunSvgCode"></div>
        </div>
        <div class="Login-UserData-itme Login-item">
          <button class="Click-loging" @click="login">登录</button>
          <router-link to="/Newpass" id="Newpass">找回密码</router-link>
        </div>
        <div class="Login-QQ">
          <span class="Login-QQ-title">第三方登录:</span>
          <span>
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#iconQQ"></use>
            </svg>
          </span>
          <span>
            <a id="githubLogin" @click="setGithubLogin">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#icongithub"></use>
              </svg>
            </a>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import socket from "./socket.js";
import instance from "../api/api.js";
import router from "../router/index.js";
import store from "../store/index.js";
import { onMounted, ref } from "vue";
export default {
  name: "Login",
  methods: {
    setGithubLogin() {
      const link = document.querySelector("#githubLogin");
      const client_id = "3de1ea24cfa1737fccae";
      const redirect_uri = "http://localhost:9000/v1/users/key";
      link.href = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}`;
    },
  },
  setup() {
    let Svgdata = ref("验证码加载失败");
    const { loginUserName, loginPassword, loginCode, login } = rertrunLogin(Svgdata);
    const { retrunSvgCode } = RetrunSvgCode(Svgdata);

    onMounted(() => {
      retrunSvgCode();
    });

    return { loginUserName, loginPassword, loginCode, login, retrunSvgCode, Svgdata };
  },
};

function RetrunSvgCode(Svgdata) {
  function retrunSvgCode() {
    instance.get("/v1/users/code").then(data => {
      Svgdata.value = data.data.data;
    });
  }
  return { retrunSvgCode };
}

function rertrunLogin(Svgdata) {
  let loginUserName = ref("");
  let loginPassword = ref("");
  let loginCode = ref("");
  function login() {
    // 输入框验证
    if (loginUserName.value == "" || loginPassword.value == "") {
      alert("用户名或密码不能为空");
      return;
    }
    if (loginCode.value == "") {
      alert("验证码不能为空");
      return;
    }

    //发送登录验证;
    const returnData = instance.post("/v1/users/login", {
      data: {
        userid: loginUserName.value,
        password: loginPassword.value,
        code: loginCode.value,
      },
    });
    //登录验证结果
    returnData.then(data => {
      if (data.data.code == 200) {
        localStorage.setItem("Token", data.data.Token); //保存Token
        localStorage.setItem("Id", loginUserName.value); //保存用户ID
        alert(data.data.meg);
        //保存登陆前的路径,登陆后自动跳转到相应路径提升用户体验感
        const paths = ["/", "/Movie", "/Chat", " /Live", "/Forum"];
        let indexs = sessionStorage.getItem("index");
        store.commit("setLoader", 1); //触发登录状态改变,其他组件监听改变
        router.push({ path: paths[indexs] }); //跳转路径
        socket.send(JSON.stringify({ code: 10, id: loginUserName.value })); //通知所有同浏览器账号上线
      } else {
        //如果验证码错误则重新获取
        if (data.data.meg == "验证码错误") {
          RetrunSvgCode(Svgdata).retrunSvgCode();
        }
        alert(data.data.meg);
      }
    });
  }
  return { loginUserName, loginPassword, loginCode, login };
}
</script>

<style lang="scss">
@import "../styles/mixin.scss";
.Login {
  @include set-width-height(100%, 100%);
  background: url("../imgs/bg.jpg");
  background-size: 100% 100%;
  @include Content-mid;
  .Login-content {
    @include set-width-height(100%, 100%);
    background-color: rgba(255, 254, 254, 0.4);
    @include Content-mid;
  }
  .icon {
    width: 30px;
    height: 25px;
    margin-left: 10px;
    cursor: pointer;
  }

  .Login-UserData {
    @include set-width-height(600px, 400px);
    @include Content-mid;
    flex-direction: column;
    background-color: rgba(255, 254, 254, 0.4);
    position: relative;
  }
  .Login-UserData-itme {
    @include set-width-height(100%, 55px);
    margin-top: 20px;
    position: relative;
  }
  .Login-QQ {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .Login-QQ-title {
    display: inline-block;
    font-size: 16px;
    color: $blue;
  }
  .Login-UserData-itme > span {
    display: inline-block;
    width: 20%;
    color: $blue;
    text-align: right;
    margin-right: 5px;
    font-size: 16px;
    margin-left: -60px;
  }
  #LoginPassword,
  #LoginUserName,
  #LoginCodes {
    @include set-width-height(70%, 100%);
    border: 1px solid rgb(167, 166, 166);
    outline: none;
    font-size: 0.8rem;
    padding: 0 0.8rem;
    color: black;
    opacity: 0.8;
    background-color: white;
  }
  #LoginCodes {
    width: 40%;
    margin-right: 30%;
  }
  .Login-item {
    @include Content-mid;
    justify-content: space-around;
    width: 50%;
  }
  .Click-loging {
    @include set-width-height(100px, 40px);
    cursor: pointer;
    border: 1px solid rgb(138, 136, 136);
    outline: none;
    border-radius: 9%/ 10px;
    color: $blue;
    background-color: white;
  }
  .Click-loging:active {
    color: red;
    border: 1px solid red;
  }
  .SVG {
    position: absolute;
    bottom: 0;
    right: 50px;
    font-size: 14px;
    @include set-width-height(160px, 50px);
    cursor: pointer;
  }
  .SVG > svg {
    @include set-width-height(100%, 100%);
  }
  .title-img {
    position: absolute;
    width: 90px;
    height: 90px;
    top: -60px;
  }
  .title-img > img {
    width: 100%;
    height: 100%;
  }
  #Newpass {
    font-size: 16px;
    color: #3563d5;
  }
}
</style>
