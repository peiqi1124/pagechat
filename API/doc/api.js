/**
 * @apiName 接口模板
 * @api {get} 请求路径 描述标题
 * @apiGroup 接口配置模板
 * @apiDescription API功能描述
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "请求头描述": "请求头参数描述"
 *     }
 * @apiParamExample {json} Request-Example:
 *     {
 *       "id": 请求头携带值详细配置
 *     }
 * @apiSuccessExample {objcet} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      code:200,
 *      data:vsg.data
 *     }
 * @apiErrorExample {objcet} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       error: "获取失败"
 *     }
 * @apiVersion 1.0.0
 */

/**
 * @apiName 获取SVG验证码
 * @api {get} /v1/users/code [获取验证码]
 * @apiGroup 用户模块
 * @apiDescription 返回一个SVG的二进制流,放在HTML标签中
 * @apiSuccessExample {objcet} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      code:200,
 *      data:vsg.data
 *     }
 * @apiErrorExample {objcet} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       error: "获取失败"
 *     }
 * @apiVersion 1.0.0
 */

/**
 * @apiName 用户登录
 * @api {post} /v1/users/login [用户登录]
 * @apiGroup 用户模块
 * @apiDescription 用户登录
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Authorization": "用户TOKEN"
 *     }
 * @apiParamExample {objcet} Request-Example:
 *        data: {
 *          userid: 用户唯一ID,
 *           password: 密码,
 *           code:SVG验证码,
 *         }
 * @apiSuccessExample {objcet} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      code:200,
 *      mesg:"登录成功"
 *      Token:JWT
 *     }
 * @apiErrorExample {objcet} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       code:404,
 *       error: "Not Found"
 *     }
 * @apiVersion 1.0.0
 */

/**
 * @apiName 获取注册验证码
 * @api {get} /v1/user/code [获取注册验证码]
 * @apiGroup 用户模块
 * @apiDescription  获取注册验证码用于验证码机器人注册
 * @apiParamExample {objcet} Request-Example:
 *        params: {
 *          email: 用户邮箱,
 *         }
 * @apiSuccessExample {objcet} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      code:200,
 *      mesg:"获取成功"
 *      data:唯一验证码
 *     }
 * @apiErrorExample {objcet} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       code:404,
 *       error: "Not Found"
 *     }
 * @apiVersion 1.0.0
 */

/**
 * @apiName 用户注册
 * @api {post} /v1/user/sign [用户注册]
 * @apiGroup 用户模块
 * @apiDescription 用户提交注册信息
 * @apiParamExample {objcet} Request-Example:
 *        data: {
 *          name:用户名,
 *          userid: 用户唯一ID,
 *          password: 密码,
 *          email: 邮箱,
 *          code: 邮箱验证码,
 *        },
 * @apiSuccessExample {objcet} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      code:200,
 *      mesg:"注册成功"
 *     }
 * @apiErrorExample {objcet} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       code:404,
 *       error: "Not Found"
 *     }
 * @apiVersion 1.0.0
 */
