const redis = require("redis");

const options = {
  host: "127.0.0.1",
  port: 6379,
  // password:'123456',
  detect_buffers: true,
  retry_strategy: function(options) {
    if (options.error && options.error.code === "ECONNREFUSED") {
      // End reconnecting on a specific error and flush all commands with
      // a individual error
      return new Error("The server refused the connection");
    }
    if (options.total_retry_time > 1000 * 60 * 60) {
      // End reconnecting after a specific timeout and flush all commands
      // with a individual error
      return new Error("Retry time exhausted");
    }
    if (options.attempt > 10) {
      // End reconnecting with built in error
      return undefined;
    }
    // reconnect after
    return Math.min(options.attempt * 100, 3000);
  },
};

const client = redis.createClient(options);

const setValue = (key, value) => {
  if (typeof value === "undefined" || value == null || value === "") {
    return;
  }
  if (typeof value === "string") {
    console.log(typeof value);
    client.set(key, value);
  } else if (typeof value === "object") {
    Object.keys(value).forEach((itme) => {
      client.hset(key, itme, value[itme], redis.print);
    });
  }
};

const { promisify } = require("util");
const getAsync = promisify(client.get).bind(client);

const getValue = (key) => {
  return getAsync(key);
};

const getHValue = (key) => {
  return promisify(client.hgetall).bind(client)(key);
};

module.exports = {
  client,
  setValue,
  getValue,
  getHValue,
};
