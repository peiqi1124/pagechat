var _createClass = (function () {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i]
			descriptor.enumerable = descriptor.enumerable || false
			descriptor.configurable = true
			if ('value' in descriptor) descriptor.writable = true
			Object.defineProperty(target, descriptor.key, descriptor)
		}
	}
	return function (Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps)
		if (staticProps) defineProperties(Constructor, staticProps)
		return Constructor
	}
})()

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError('Cannot call a class as a function')
	}
}

/* 
Snow 使用说明
1. 创建 Snow 对象：
   let snow = new Snow(canvasID, width, height);

2. 启动雪花效果：
   snow.start();

*/

var _requestAnimationFrame =
	window.requestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.msRequestAnimationFrame ||
	function (callback) {
		window.setTimeout(callback, 1000 / 60)
	}

/**
 * 类Snow的构造函数参数.
 * @param canvasID : string     canvas元素的id标识符
 * @param width : number  默认值：window.innerWidth       画面的宽度;
 * @param height : number    默认值: window.innerHeight      画面的高度
 * @param flakeCount : number  默认值是：500     雪花的数量
 * @param minFlakeRadius : number 默认值:1     雪花的最小半径
 * @param maxFlakeRadius : number 默认值:3       雪花的最大半径
 * @param minSpeed : number   默认值: 0.5    雪花下落的最小速度
 * @param maxSpeed : number   默认值: 2.5    雪花下落的最大速度
 * @param affect : bool   默认值: false        是否开启触摸影响雪花
 * @param affectRadius : number  默认值: 100     影响半径
 */

var Snow = (function () {
	function Snow(canvasID, width, height) {
		var flakeCount = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 500
		var minFlakeRadius = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1
		var maxFlakeRadius = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 3
		var minSpeed = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0.5
		var maxSpeed = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 2.5
		var affect = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : false
		var affectRadius = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : 100

		_classCallCheck(this, Snow)

		this._snow = this._snow.bind(this)

		this.canvasID = canvasID
		this.width = width || window.innerWidth
		this.height = height || window.innerHeight
		this.flakeCount = flakeCount
		this.mX = -100
		this.mY = -100
		this.affect = affect

		this.minFlakeRadius = minFlakeRadius
		this.maxFlakeRadius = maxFlakeRadius

		this.minSpeed = minSpeed
		this.maxSpeed = maxSpeed

		this.opacityBaseRadius = 0.3
		this.opacityExpandRange = 0.5

		this.flakes = []
		this.affectRadius = affectRadius
	}

	_createClass(Snow, [
		{
			key: 'start',
			value: function start() {
				var _this = this

				var canvas = this.canvas
				canvas.width = this.width
				canvas.height = this.height

				this.ctx = canvas.getContext('2d')

				if (this.affect) {
					canvas.addEventListener('mousemove', function (e) {
						_this.mX = e.clientX
						_this.mY = e.clientY
					})
				}

				this._init()
			},
		},
		{
			key: 'changeCanvasSize',
			value: function changeCanvasSize(width, height) {
				this.canvas.width = width
				this.canvas.height = height
			},
		},
		{
			key: '_snow',
			value: function _snow() {
				var canvas = this.canvas
				var flakes = this.flakes
				var ctx = this.ctx
				var flakeCount = this.flakeCount
				var mX = this.mX
				var mY = this.mY

				ctx.clearRect(0, 0, canvas.width, canvas.height)
				var affectRadius = this.affectRadius

				for (var i = 0; i < flakeCount; i++) {
					var flake = flakes[i],
						x = mX,
						y = mY,
						x2 = flake.x,
						y2 = flake.y

					var dx = x2 - x
					var dy = y2 - y
					var dist = Math.sqrt(dx * dx + dy * dy)

					if (this.affect && dist < affectRadius) {
						var force = affectRadius / (dist * dist)
						var xcomp = -dx / dist
						var ycomp = -dy / dist
						var deltaV = force / 2

						flake.velX -= deltaV * xcomp
						flake.velY -= deltaV * ycomp
					} else {
						flake.velX *= 0.98
						if (flake.velY <= flake.speed) {
							flake.velY = flake.speed
						}
						flake.velX += Math.cos((flake.step += 0.05)) * flake.stepSize
					}

					ctx.fillStyle = 'rgba(255,255,255,' + flake.opacity + ')'
					flake.y += flake.velY
					flake.x += flake.velX

					if (flake.y >= canvas.height || flake.y <= 0) {
						this._reset(flake)
					}

					if (flake.x >= canvas.width || flake.x <= 0) {
						this._reset(flake)
					}

					ctx.beginPath()
					ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2)
					ctx.fill()
				}

				this.flakes = flakes
				_requestAnimationFrame(this._snow)
			},
		},
		{
			key: '_reset',
			value: function _reset(flake) {
				var random = Math.random

				flake.x = Math.floor(random() * this.canvas.width)
				flake.y = 0
				flake.size = random() * this.flakeExpandRange + this.flakeBaseRadius
				flake.speed = random() * this.speedExpandRange + this.speedBaseRadius
				flake.velY = flake.speed
				flake.velX = 0
				flake.opacity = random() * this.opacityExpandRange + this.opacityBaseRadius
			},
		},
		{
			key: '_init',
			value: function _init() {
				var flakeCount = this.flakeCount
				var canvas = this.canvas
				var flakes = this.flakes

				var flakeBaseRadius = this.flakeBaseRadius
				var flakeExpandRange = this.flakeExpandRange
				var speedBaseRadius = this.speedBaseRadius
				var speedExpandRange = this.speedExpandRange

				var opacityBaseRadius = this.opacityBaseRadius
				var opacityExpandRange = this.opacityExpandRange

				var random = Math.random
				var floor = Math.floor

				for (var i = 0; i < flakeCount; i++) {
					var x = floor(random() * canvas.width),
						y = floor(random() * canvas.height),
						size = random() * flakeExpandRange + flakeBaseRadius,
						speed = random() * speedExpandRange + speedBaseRadius,
						opacity = random() * opacityExpandRange + opacityBaseRadius

					flakes.push({
						speed: speed,
						velY: speed,
						velX: 0,
						x: x,
						y: y,
						size: size,
						stepSize: random() / 20,
						step: random() * Math.PI,
						opacity: opacity,
					})
				}

				this.flakes = flakes

				this._snow()
			},
		},
		{
			key: 'speedBaseRadius',
			get: function get() {
				return this.minSpeed
			},
		},
		{
			key: 'speedExpandRange',
			get: function get() {
				var speedExpandRange = this.maxSpeed - this.minSpeed
				speedExpandRange = speedExpandRange > 0 ? speedExpandRange : 0
				return speedExpandRange
			},
		},
		{
			key: 'canvas',
			get: function get() {
				if (!this._canvas) {
					this._canvas = document.getElementById(this.canvasID)
				}
				return this._canvas
			},
		},
		{
			key: 'flakeBaseRadius',
			get: function get() {
				return this.minFlakeRadius
			},
		},
		{
			key: 'flakeExpandRange',
			get: function get() {
				var flakeExpandRange = this.maxFlakeRadius - this.minFlakeRadius
				flakeExpandRange = flakeExpandRange > 0 ? flakeExpandRange : 0
				return flakeExpandRange
			},
		},
	])

	return Snow
})()

export default Snow
