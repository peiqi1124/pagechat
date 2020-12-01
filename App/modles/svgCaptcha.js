let svgCaptcha = require("svg-captcha");

module.exports = function () {
  return svgCaptcha.create({
    noise: 4,
    size: 4,
  });
};
