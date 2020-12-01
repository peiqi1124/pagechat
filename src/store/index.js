import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      loader: 0, //登录状态
      indexs: 0, //路由下标
      info: null, //保存用户基本信息
    };
  },
  mutations: {
    //设置登录状态
    setLoader(state, value) {
      state.loader = value;
    },

    //设置导航下标
    setIndexs(state) {
      state.indexs = sessionStorage.getItem("index");
    },

    //设置用户信息
    setInfo(state, value) {
      state.info = value;
    },
  },
});
export default store;
