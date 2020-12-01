const Mongoose = require("mongoose");
const DB_URL = "mongodb://localhost:27017/test";
//创建链接
Mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//链接成功
Mongoose.connection.on("connected", () => {
  console.log("Mongoose connection open to:" + DB_URL);
});

//链接失败
Mongoose.connection.on("error", err => {
  console.log("Mongoose connection error:" + err);
});

/////////////////数据模型////////////////////////

const user = Mongoose.Schema({
  name: String,
  userid: String,
  password: String,
  email: String,
  loader: {
    type: Boolean,
    default: false,
  },
  headimg: {
    type: String,
    default: "imgs/peiqi.png",
  },
  frends: Array,
  chatrooms: Array,
});

const USERS = Mongoose.model("Userdatas", user);
module.exports = {
  USERS,
};
