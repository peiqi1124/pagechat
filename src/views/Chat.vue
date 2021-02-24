<template>
	<div class="Chat">
		<ChatRoom class="ChatRoom"></ChatRoom>
		<canvas id="stockGraph"></canvas>
	</div>
</template>

<script>
import { ref, watch, defineAsyncComponent } from 'vue'
import Snow from '../flv/Snow.js'
import store from '../store/index.js'
export default {
	name: 'Chat',
	components: {
		ChatRoom: defineAsyncComponent(() => import('./Chat/ChatRoom.vue')),
	},
	mounted() {
		let width = document.body.clientWidth
		let height = document.body.clientHeight
		console.log(width, height)
		//1. 创建 Snow 对象：
		let snow = new Snow('stockGraph', width, height)
		//2. 启动雪花效果：
		snow.start()
	},
}
</script>

<style lang="scss">
@import '../styles/mixin.scss';
.Chat {
	@include set-width-height(100%, 100%);
	background-image: url('../imgs/bg4.jpg');
	background-repeat: no-repeat;
	background-size: 100% 100%;
	position: relative;
	overflow: hidden;

	#stockGraph {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
	}
	.ChatRoom {
		position: relative;
		z-index: 2;
	}
}
</style>
