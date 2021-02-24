function runAnimation(element, ElmentLength, time) {
	let nub = ElmentLength / time
	nub = nub / 60
	window.requestAnimationFrame(step)
	function step(tiem) {
		ElmentLength -= nub
		if (ElmentLength >= 1) {
			element.setAttribute('stroke-dashoffset', ElmentLength)
			window.requestAnimationFrame(step)
		} else {
			element.setAttribute('stroke-dashoffset', 0)
		}
	}
}

//mian
function setAnimetion(el, time = 2) {
	if (typeof time != 'number') return 0
	if (time < 0.2) time = 0.1

	els = document.querySelectorAll(el)
	els = Array.from(els)
	els.forEach(element => {
		let ElmentLength = ~~element.getTotalLength() + 1
		element.setAttribute('stroke-dasharray', ElmentLength)
		element.setAttribute('stroke-dashoffset', ElmentLength)

		runAnimation(element, ElmentLength, time)
	})
}

//////////////////////////////////////////////////////////////////////mian
function Sync(el, time = 2) {
	//类型检查
	if (typeof time != 'number') return 0
	if (time < 0.2) time = 0.1
	//初始化
	els = document.querySelectorAll(el)
	let ElmentLength = null
	for (let i = 0; i < els.length; i++) {
		ElmentLength = ~~els[i].getTotalLength() + 1
		els[i].setAttribute('stroke-dasharray', ElmentLength)
		els[i].setAttribute('stroke-dashoffset', ElmentLength)
	}

	//并发
	a()
	async function a() {
		for (let item of els) {
			ElmentLength = ~~item.getTotalLength() + 1
			await new Promise(res => {
				runAnimationSync(item, ElmentLength, time, res)
			})
		}
	}
}

function runAnimationSync(element, ElmentLength, time, res) {
	let nub = ElmentLength / time
	nub = nub / 60
	ElmentLength -= nub
	console.log(ElmentLength, nub)
	window.requestAnimationFrame(step)
	function step() {
		ElmentLength -= nub
		if (ElmentLength >= 1) {
			element.setAttribute('stroke-dashoffset', ElmentLength)
			window.requestAnimationFrame(step)
		} else {
			element.setAttribute('stroke-dashoffset', 0)
			res()
		}
	}
}
