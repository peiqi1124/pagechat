const Md5 = require("md5");
const setData = require("../modles/mongo.js"); //mongo模板
const Router = require("koa-router"); //处理路由
const router = new Router();

//邮箱验证码
let code = null; //保存邮箱验证码
router.get("/code", async ctx => {
  code = "peiqi";
  ctx.body = {
    code: 200,
    meg: code,
  };
});

//注册
router.post("/sign", async ctx => {
  const Data = ctx.request.body.data;
  if (!(Data.code === code)) {
    ctx.body = {
      code: 401, //判断邮箱验证码是否正确
      meg: "验证码错误",
    };
    return;
  }

  //判断数据库是否有了相同的数据
  let Emails = await setData.USERS.find({ email: Data.email });
  if (Emails.length > 0) {
    ctx.body = {
      code: 401,
      meg: "邮箱已经存在",
    };
    return;
  }

  let USER_INFO = await setData.USERS.find({ userid: Data.userid });
  if (USER_INFO.length > 0) {
    ctx.body = {
      code: 401,
      meg: "该账户已经存在",
    };
    return;
  }

  //保存注册信息
  const Info = new setData.USERS({
    name: Data.name,
    userid: Data.userid,
    password: Md5(Data.password),
    email: Data.email,
  });
  await Info.save();
  ctx.body = {
    code: 200,
    meg: "注册成功",
  };
});

module.exports = router.routes();
