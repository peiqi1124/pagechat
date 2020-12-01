const Koa = require("koa");
const app = new Koa();
const cors = require("koa2-cors");
const bodyParser = require("koa-bodyparser"); //处理post数据
const Jwt = require("koa-jwt2"); //校验token
const Router = require("koa-router"); //处理路由
const router = new Router(); //实例化路由
const Login = require("./router/login");
const Sgin = require("./router/sgin");
const JWT_SECRET = require("./modles/data");
const WebSocket = require("ws");

app.use(
  Jwt({
    secret: JWT_SECRET,
    credentialsRequired: true,
    getToken: function fromHeaderOrQuerystring(ctx) {
      if (ctx.headers.authorization && ctx.headers.authorization.split(" ")[0] === "Bearer") {
        console.log(ctx.headers.authorization);
        return ctx.headers.authorization.split(" ")[1];
      }
      return null;
    },
  }).unless({
    path: ["/v1/users/code", "/v1/users/login", "/v1/users/key", "/v1/users/online", "/v1/user/code", "/v1/user/sign"],
  })
);

app.use(bodyParser());
app.use(cors());
app.use(router.routes()).use(router.allowedMethods());
router.use("/v1/users", Login);
router.use("/v1/user", Sgin);
const server = app.listen(9000, () => {
  console.log("welcom poter");
});

/////////////////////////////////websockit///////////////////////////////////////
const wss = new WebSocket.Server({ server: server });

wss.on("connection", function connection(ws) {
  console.log("连接成功");

  ws.on("message", function incoming(data) {
    const values = JSON.parse(data);
    if (values.code == 10) {
      wss.clients.forEach(itm => {
        itm.send(data); //给同账户广播登录消息
      });
    }
  });

  ws.on("message", function incoming(data) {
    const values = JSON.parse(data);
    if (values.code == 20) {
      wss.clients.forEach(itm => {
        itm.send(data); //给同账户广播登录消息
      });
    }
  });

  ///
});
