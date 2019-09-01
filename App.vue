<script>
	let $self
	export default {
		onLaunch() {
			$self = this
			let appInfo = uni.getStorageSync('appInfo')
			let uuid = uni.getStorageSync('uuid')
			if (appInfo && uuid) return;
			uni.login({
				provider: 'weixin',
				success: function (loginRes) {
					if (loginRes.code) {
						let appId = 'wx9116e56b5cd26982'
						let appSecret = '64e711db31d37ebb45acc7290a0eac33'
						uni.request({
							url: `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${appSecret}&js_code=${loginRes.code}&grant_type=authorization_code`,
							data: {
								userInfoDto: '021akbX714euWL1vnpW71vFrX71akbXr'
							}
						})
							.then(data => {
								let [err, res] = data
								if (res.data && res.data.openid && res.data.session_key) {
									uni.setStorageSync('appInfo', res.data)
									$self.checkUserInfo(res.data.openid)
								}
							})
					}
				}
			})
		},
		onShow() {
		},
		onHide() {
		},
		methods: {
			// 检查用户
			checkUserInfo(openid) {
				this.queryUserInfo(openid).then(infoRes => {
					let [err, res] = infoRes
					// 未找到当前用户，新增用户
					if (res.data && res.data.status === 0) {
						$self.addUserInfo(openid)
					} else {
						uni.setStorageSync('uuid', res.data.data.uuid)
					}
				}).catch(err => console.log(err))
			},
			// 新增用户信息
			addUserInfo(openid) {
				let params = {
					openId: openid
					// userImage: $self.userInfo.avatarUrl || '',
					// userMobile: '',
					// userName: $self.userInfo.nickName,
					// userSex: $self.userInfo.gender
				}
				uni.request({
					url: "https://messagecome.com/user/info/mainTain",
					method: 'POST',
					data: params
				}).then(infoRes => {
					let [err, res] = infoRes
					if (res.data && res.data.status === 1 && !res.data.errCode) {
						uni.setStorageSync('uuid', res.data.data)
					}
				})
			},
			// 查询用户信息
			queryUserInfo(openId) {
				return new Promise((resolve, reject) => {
					uni.request({
					url: 'https://messagecome.com/user/info/openId',
					data: {
						openId: openId
					}
					}).then(infoRes => {
						resolve(infoRes)
					}).catch(err => reject(err))
				})
			},
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
