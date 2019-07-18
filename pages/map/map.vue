<template>
	<view class="map-wrapper">
		<cover-view class="header">
			<text>下单</text>
			<text class="active">接单</text>
		</cover-view>
		<map v-if="" class="map" :markers="covers"></map>
		<cover-view class="controls"></cover-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				covers: [{
					latitude: 39.909,
					longitude: 116.39742,
					iconPath: '../../static/logo.png'
				}, {
					latitude: 39.90,
					longitude: 116.39,
					iconPath: '../../static/logo.png'
				}]
			}
		},
		onLoad() {
			
		},
		methods: {
			async getLoaction() {
				let param = {type: 'wgs84'}
				let [nul, res] = await uni.getLocation(param)
				console.log(res);
				// uni.openLocation({
				// 	latitude: res.latitude,
				// 	longitude: res.longitude,
				// 	// scale: res.scale,
				// 	address: res.address
				// })
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}
	.map-wrapper {
		height: 100%;
		display: flex;
		flex-direction: column;
		.header {
			width: 100%;
			height: 120rpx;
			background-color: rgba(29, 160, 110, 0.5);
			display: flex;
			text {
				flex: 1;
				height: 100%;
				line-height: 120rpx;
				text-align: center;
				color: #ccc;
				font-size: 32rpx;
				&.active {
					font-weight: 700;
					border-bottom: 4rpx solid #fff; 
				}
			}
		}
		.map {
		 width: 750rpx;
		 flex: 1;
		}
		.controls {
			position: absolute;
			width: 90%;
			height: 160rpx;
			bottom: 60rpx;
			left: 5%;
			border-radius: 4rpx;
			background-color: #fff;
		}
	}
</style>
