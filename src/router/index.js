import { createRouter, createWebHashHistory } from "vue-router";
import store from "../store/index";
import Home from "../views/Home.vue";
import Chat from "../views/Chat.vue";
import Movie from "../views/Movie.vue";
import Live from "../views/Live.vue";
import Forum from "../views/Forum.vue";

const Homes = {
  path: "/",
  name: "Home",
  components: {
    App: Home,
  },
};

const Chats = {
  path: "/Chat",
  name: "Chat",
  components: {
    App: Chat,
  },
};

const Movies = {
  path: "/Movie",
  name: "Movie",
  components: {
    App: Movie,
  },
};

const Lives = {
  path: "/Live",
  name: "Live",
  components: {
    App: Live,
  },
};

const Forums = {
  path: "/Forum",
  name: "Forum",
  components: {
    App: Forum,
  },
};

const paths = [
  Homes,
  Chats,
  Movies,
  Lives,
  Forums,
  {
    path: "/Login",
    name: "Login",
    components: {
      App: () => import("../components/Login.vue"),
    },
  },
  {
    path: "/Sign",
    name: "Sign",
    components: {
      App: () => import("../components/Sign.vue"),
    },
  },
  {
    path: "/Userinfo",
    name: "Userinfo",
    components: {
      App: () => import("../components/Userinfo.vue"),
    },
  },
  {
    path: "/Newpass",
    name: "Newpass",
    components: {
      App: () => import("../components/Newpass.vue"),
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: paths,
});

export default router;

router.beforeEach((to, from, next) => {
  if (to.name == "Login") {
    //如果用户已经存在
    if (localStorage.getItem("Token")) {
      next("/");
    }
  }

  if (to.name == "Forum") {
    sessionStorage.setItem("index", 4);
    store.commit("setIndexs");
  }
  if (to.name == "Live") {
    sessionStorage.setItem("index", 3);
    store.commit("setIndexs");
  }
  if (to.name == "Chat") {
    sessionStorage.setItem("index", 2);
    store.commit("setIndexs");
  }
  if (to.name == "Movie") {
    sessionStorage.setItem("index", 1);
    store.commit("setIndexs");
  }
  if (to.name == "Home") {
    sessionStorage.setItem("index", 0);
    store.commit("setIndexs");
  }

  next();
});
