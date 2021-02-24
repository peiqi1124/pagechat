<template>
	<div class="lives">
		<svg id="svgForStroke" width="400" height="200">
			<g>
				<path
					class="line-test1"
					fill="transparent"
					stroke="#F83910"
					stroke-width="1"
					d="m 38.503635,107.13756 20.178376,0.0686 0.06863,4.0494 -7.618368,-0.0686 0.06864,10.22645 h 7.275195 v 4.2553 l -7.343831,-0.2059 -0.06863,12.21684 7.275198,-1.92175 v 3.77487 l -19.903839,6.24569 -0.68634,-4.80438 8.991044,-2.12765 -0.274537,-13.38362 h -7.618365 v -4.0494 h 7.618365 l -0.06863,-10.36372 -7.961534,-0.0686 z"
				></path>

				<path
					class="line-test1"
					fill="transparent"
					stroke="#F83910"
					stroke-width="1"
					d="m 60.878296,105.07854 31.571607,0.0686 0.06863,4.2553 -14.893563,-0.27453 -3.774864,12.69727 3.088525,-0.0686 0.06864,35.14057 -4.598474,-0.0686 0.06864,-33.56199 c -3.899814,9.76764 -8.906263,17.00583 -14.069957,23.8846 l -3.568964,-2.74535 3.8435,-5.01028 C 66.459518,127.79482 71.108481,117.0308 72.88924,109.1966 H 60.741027 Z"
				></path>

				<path
					class="line-test1"
					fill="transparent"
					stroke="#F83910"
					stroke-width="1"
					d="m 78.242679,125.39419 3.431697,-2.40219 c 6.548917,9.22838 11.07277,15.57562 13.246349,18.8057 l -3.706232,3.08852 c -3.39622,-5.71986 -7.930162,-12.49239 -12.971814,-19.49203 z"
				></path>
			</g>
		</svg>
	</div>
</template>

<script>
// import SVG from '../../flv/svg.js'

export default {
	name: 'lives',
	mounted() {
		let line = document.querySelectorAll('.line-test1')
		SVG.setCSSAnimation(line[0], '5s ease 1 normal forwards', () => {
			console.log(1)
		})
	},
}
</script>

<style lang="scss">
.lives {
	width: 100%;
	height: 100%;
	background-color: white;
}
</style>
