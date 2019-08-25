<template name="number">
	<view class="number">
		<view class="down extend-click" @tap="increase(-1)"></view>
		<input class="ipt" type="text" :value="val" @input="inputHandle"/>
		<view class="top extend-click" @tap="increase(1)"></view>
	</view>
</template>

<script>
	export default {
		name: 'number',
		data() {
			return {
				val: 0
			}
		},
		props: {
			value: {
				type: Number,
				default: 0
			},
			field: {
				type: String
			}
		},
		watch: {
			value(newVal) {
				this.val = newVal
			}
		},
		onReady() {
			this.val = this.value
		},
		methods: {
			increase(index) {
				if (this.val === 0 && index < 0) return
				this.value += index
				this.$emit('increase', { index: index, field: this.field })
			},
			inputHandle(e) {
				this.$emit('change', { val: e.detail.value, field: this.field })
			}
		}
	}
</script>

<style lang="scss" scoped>
	.number {
		display: flex;
		align-items: center;
		width: 115rpx;
		height: 30rpx;
		.down, .top {
			width: 30rpx;
			height: 30rpx;
			background: url('../static/images/arrow-down-full.png') no-repeat center;
			background-size: 100% 100%;
		}
		.top  {
			background: url('../static/images/arrow-top-full-active.png') no-repeat center;
			background-size: 100% 100%;
		}
		.ipt {
			flex: 1;
			margin: 0 10rpx;
		}
	}
</style>
