const SvgImg = require("../modles/svgCaptcha.js"); //SVG
const Md5 = require("md5");
const setData = require("../modles/mongo.js"); //mongo模板
const Token = require("jsonwebtoken"); //生成token
const Router = require("koa-router"); //处理路由
const router = new Router();
const jwt_secret = require("../modles/data.js");

//SVG验证码
let Code = null; //全局保存登录验证码
router.get("/code", async ctx => {
  const svg = SvgImg();
  Code = svg.text;
  ctx.body = {
    code: 200,
    data: svg.data,
  };
});

//登录功能
router.post("/login", async ctx => {
  const Datas = ctx.request.body.data;
  if (!(Datas.code.toLowerCase() == Code.toLowerCase())) {
    ctx.body = {
      code: 401, //验证svg
      meg: "验证码错误",
    };
    return;
  }

  //登录信息验证
  let USER_INFOS = await setData.USERS.find({ userid: Datas.userid }); //查询数据库
  if (!(USER_INFOS.length > 0)) {
    ctx.body = {
      code: 401,
      meg: "用户不存在",
    };
    return;
  }

  if (!(USER_INFOS[0].userid === Datas.userid)) {
    ctx.body = {
      code: 401,
      meg: "用户或密码错误",
    };
    return;
  }

  if (!(USER_INFOS[0].password === Md5(Datas.password))) {
    ctx.body = {
      code: 401,
      meg: "用户或密码错误",
    };
    return;
  }

  //设置登录状态
  await setData.USERS.update(
    { userid: Datas.userid },
    {
      loader: true,
    }
  );

  const token = Token.sign({ time: Math.floor(Date.now() / 1000), userid: Datas.userid, man: "peiqi" }, jwt_secret, {
    expiresIn: 160 * 60, //签署Token
  });

  console.log(token);
  ctx.body = {
    code: 200,
    meg: "登录成功",
    Token: token, //返回Token
  };
});

//用户信息
router.get("/userinfo", async ctx => {
  console.log("查询数据");
  let USER_INFOS = await setData.USERS.find({ userid: ctx.query.id }); //查询数据库
  ctx.body = {
    name: USER_INFOS[0].name,
    id: USER_INFOS[0].userid,
    headimg: USER_INFOS[0].headimg,
  };
});

//退出登录
router.get("/outLogin", async ctx => {
  await setData.USERS.update(
    { userid: ctx.query.userid },
    {
      loader: ctx.query.loader,
    }
  );
  ctx.body = {
    code: 200,
  };
});

module.exports = router.routes();
