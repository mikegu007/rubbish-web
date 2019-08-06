<script>
	export default {
		onLaunch: function() {
			let appInfo = uni.getStorageSync('appInfo')
			if (!appInfo) {
				uni.login({
					provider: 'weixin',
					success: function (loginRes) {
						console.log(loginRes);
						if (loginRes.code) {
							let appId = 'wx0c05632ffc644b36'
							let appSecret = '8018b076c849cc483d07f6fe81a485f3'
							uni.request({
								url: `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${appSecret}&js_code=${loginRes.code}&grant_type=authorization_code`,
								data: {
									userInfoDto: '021akbX714euWL1vnpW71vFrX71akbXr'
								}
							})
								.then(data => {
									let [err, res] = data
									if (res.data && res.data.openid && res.data.session_key) {
										uni.setStorageSync('appInfo', JSON.stringify(res.data))
									}
								})
						}
					}
				})
			}
		},
		onShow: function() {
		},
		onHide: function() {
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	page {
		height: 100%;
		background-color: #F8F8F8;
		font-size: 28rpx;
		font-family: PingFangSC-Regular;
		color: rgba(74,74,74,1);
		line-height: 36rpx;
	}
	.extend-click {
		position: relative;
		&::after {
			content: '';
			position: absolute;
			top: -10px;
			right: -10px;
			bottom: -10px;
			left: -10px;
		}
	}
	.submit {
		height: 90rpx;
		border-radius: 45rpx;
		// margin: 0 30rpx;
		font-size: 36rpx;
		line-height: 90rpx;
		text-align: center;
		color: #fff;
		background-color: rgba(29,160,110,1);
	}
	.btn {
		height: 90rpx;
		line-height: 90rpx;
		font-size: 32rpx;
		background: #fff;
		border-radius: 4rpx;
		text-align: center;
	}
	
	.indictor {
		width: 16rpx;
		height: 26rpx;
	}
</style>
