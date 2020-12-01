<template>
  <div class="Sign">
    <div class="Sign-content">
      <div class="Sign-content-itme">
        <div class="Sign-UserData-itme">
          <span>昵称:</span>
          <input
            type="text"
            id="SinName"
            maxlength="20"
            v-model.trim="SinName"
            placeholder="1-20位中/英文/数字组合"
            autocomplete="off"
          />
          <p class="iconfonts" v-show="indexs[0] == 0"></p>
        </div>

        <div class="Sign-UserData-itme">
          <span>账户名:</span>
          <input type="text" id="SinId" maxlength="16" v-model.trim="SinId" placeholder="6-16位英/文数字组合" autocomplete="off" />
          <p class="iconfonts" v-show="indexs[1] == 1"></p>
        </div>

        <div class="Sign-UserData-itme">
          <span>密码:</span>
          <input type="password" id="SinPassword" maxlength="30" v-model.trim="SinPassword" placeholder="6-30位英文数字符号组合" />
          <p class="iconfonts" v-show="indexs[2] == 2"></p>
        </div>

        <div class="Sign-UserData-itme">
          <span>再次确认:</span>
          <input type="password" id="SinPassword1" maxlength="30" v-model.trim="SinPassword1" placeholder="保持和上述密码一致" />
          <p class="iconfonts" v-show="indexs[3] == 3"></p>
        </div>

        <div class="Sign-UserData-itme">
          <span>验证邮箱:</span>
          <input type="text" id="SignEmail" maxlength="40" v-model.trim="SignEmail" placeholder="支持 .com / .cn /.net" />
          <p class="iconfonts" v-show="indexs[4] == 4"></p>
        </div>

        <div class="Sign-UserData-itme">
          <span>验证码</span>
          <input type="text" id="SignCode" maxlength="6" v-model.trim="SignCode" />
          <button class="Click-code Sign-btstyle" @click="Off && getCode()">发送</button>
        </div>

        <div class="Sign-UserData-itme">
          <button class="Click-sign Sign-btstyle" @click="ifValue">注册</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import instance from "../api/api.js";
export default {
  name: "Sign",
  data() {
    return {
      SinName: null,
      SinId: null,
      SinPassword: null,
      SinPassword1: null,
      SignEmail: null,
      SignCode: null,
      Icons: null,
      indexs: [0, 0, 0, 0, 0],
      Keys: [0, 0, 0, 0, 0],
      ButTime: null,
      Off: true,
    };
  },
  mounted() {
    this.Icons = document.querySelectorAll(".iconfonts");
    if (sessionStorage.getItem("ButTime")) {
      this.setButTime();
    }
  },
  watch: {
    SinName() {
      this.verificationSinName();
    },
    SinId() {
      this.verificationSinId();
    },
    SinPassword() {
      this.verificationSinPassword();
    },
    SinPassword1() {
      this.verificationSinPassword1();
    },
    SignEmail() {
      this.verificationSignEmail();
    },
  },
  methods: {
    //注册验证
    retrunsvgok() {
      return `<svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#iconok"></use>
            </svg>`;
    },
    retrunsvgshibai() {
      return `<svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#iconshibai"></use>
              </svg>`;
    },
    verification(vlaueName, index, re) {
      this.Icons[index].innerHTML = this.retrunsvgshibai();
      console.log(vlaueName != "", re.exec(vlaueName));
      if (vlaueName != "" && re.test(vlaueName)) {
        this.Keys[index] = true;
        this.Icons[index].innerHTML = this.retrunsvgok();
      }
      this.indexs[index] = index;
    },
    verificationSinName() {
      //验证昵称
      const RE = /^[a-zA-Z\u4e00-\u9fa5]{1}[0-9a-zA-Z\u4e00-\u9fa5]*$/u;
      this.verification(this.SinName, 0, RE);
    },
    verificationSinId() {
      //验证ID
      const RE = /^[a-zA-Z]{1}[0-9a-zA-Z]{5,16}$/i;
      this.verification(this.SinId, 1, RE);
    },
    verificationSinPassword() {
      //验证密码
      const RE = /^[a-zA-Z0-9,.@#$%^&*_=!+]{6,30}$/;
      this.verification(this.SinPassword, 2, RE);
    },
    verificationSinPassword1() {
      //验证密码
      this.Icons[3].innerHTML = this.retrunsvgshibai();
      if (this.SinPassword === this.SinPassword1) {
        this.Icons[3].innerHTML = this.retrunsvgok();
        this.Keys[3] = true;
      }
      this.indexs[3] = 3;
    },
    verificationSignEmail() {
      //验证邮箱
      const RE = /^[a-zA-Z0-9]{5,}@[a-z]{1,}(\.com|\.cn|\.net)$/i;
      this.verification(this.SignEmail, 4, RE);
    },
    ifValue() {
      //登录验证
      console.log(this.Keys[0], this.Keys[1], this.Keys[2], this.Keys[3], this.Keys[4]);
      if (this.Keys[0] === true && this.Keys[1] === true && this.Keys[2] === true && this.Keys[3] === true && this.Keys[4] === true) {
        this.SignUp();
      } else {
        alert("请填写正确的信息");
      }
      this.Keys.forEach(value => {
        console.log(value);
      });
    },
    //获取验证码
    getCode() {
      if (!this.Keys[4]) {
        alert("邮箱无效");
        return;
      }

      instance
        .get("/v1/user/code", {
          params: {
            SignEmail: this.SignEmail,
          },
        })
        .then(req => {
          this.SignCode = req.data.meg;
        });

      if (this.ButTime == null) {
        //初始化
        sessionStorage.setItem("ButTime", 60);
        this.setButTime();
      } else {
      }
    },
    setButTime() {
      this.Off = false;
      let i = document.querySelector(".Click-code");
      i.innerHTML = sessionStorage.getItem("ButTime");
      //获取定时器ID
      let ID = setInterval(() => {
        this.ButTime = sessionStorage.getItem("ButTime");
        i.innerHTML = this.ButTime--;
        sessionStorage.setItem("ButTime", this.ButTime--);
        if (this.ButTime < 1) {
          i.innerHTML = "发送";
          this.ButTime == null;
          sessionStorage.removeItem("ButTime");
          clearInterval(ID);
        }
      }, 800);
    },
    //注册
    SignUp() {
      instance
        .post("/v1/user/sign", {
          data: {
            name: this.SinName,
            userid: this.SinId,
            password: this.SinPassword,
            email: this.SignEmail,
            code: this.SignCode,
          },
        })
        .then(data => {
          if ((data.data.code = 200)) {
            alert("注册成功");
            this.$router.push({ path: "/", replace: true });
          } else {
            alert(`注册失败:${data.data.meg}`);
          }
        });
    },
  },
};
</script>

<style lang="scss">
@import "../styles/mixin.scss";
.Sign {
  @include set-width-height(100%, 100%);
  background-color: white;
  background-image: url("../imgs/bg1.jpg");
  background-repeat: no-repeat;
  background-size: 100%;

  .icon {
    width: 30px;
    height: 25px;
    margin-left: 10px;
    cursor: pointer;
  }

  .Sign-content {
    @include set-width-height(100%, 100%);
    @include Content-mid;
    background-color: white;
    background: rgba(255, 254, 254, 0.4);
  }

  .Sign-content-itme {
    @include set-width-height(600px, 700px);
    @include Content-mid;
    justify-content: space-around;
    flex-direction: column;
    position: relative;
  }

  .Sign-UserData-itme {
    @include set-width-height(100%, 56px);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
  }

  .Sign-UserData-itme:last-child {
    width: 30%;
  }

  .Sign-UserData-itme > span {
    @include Content-mid;
    color: rgb(68, 41, 41);
    font-size: 16px;
    width: 80px;
  }

  .Sign-UserData-itme > input {
    @include set-width-height(65%, 100%);
    font-size: 16px;
    padding: 10px;
    opacity: 0.6;
    border: 1px solid rgb(158, 158, 158);
  }

  #SignCode {
    width: 40%;
    margin-right: 40px;
  }

  .Sign-btstyle {
    @include set-width-height(100px, 45px);
    cursor: pointer;
    border: 1px solid rgb(138, 136, 136);
    outline: none;
    border-radius: 9%/ 10px;
    color: $blue;
    background-color: white;
  }

  .Sign-btstyle:active {
    color: red;
    border: 1px solid red;
  }
}
</style>
