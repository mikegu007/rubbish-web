<template>
	<view class="red-packet">
		<red-item></red-item>
		<red-item :disabled="true"></red-item>
	</view>
</template>

<script>
	import RedItem from '../../../components/redPackage.vue'
	
	export default {
		components: {
			'red-item': RedItem
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	.red-packet {
		padding: 30rpx;
	}
</style>
