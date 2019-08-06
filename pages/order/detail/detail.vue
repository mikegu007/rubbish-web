<template>
  <view class="order-detail-wrapper">
    <map class="map" :markers="covers"></map>
		<cover-view v-if="type === 'coming'" class="controls">
      <cover-view class="order-info">
        <cover-view class="wait-txt">工作人员正飞速向您赶来，请耐心等待！</cover-view>
        <cover-view class="wait-txt">预计等待时间：10:00分钟</cover-view>
        <cover-view class="wait-time">工作人员电话：18663470166</cover-view>
        <cover-view class="tips">
          <cover-image class="tips-img" src="/static/images/tips.png"></cover-image>
          您可以在3分钟之内免费取消订单
        </cover-view>
      </cover-view>
      <!-- <cover-view class="submit">取消订单</cover-view> -->
    </cover-view>
    <cover-view v-if="type === 'success'" class="success">
      <cover-view class="order-info suc-info">
        <cover-view class="wait-txt suc-label">工作人员正飞速向您赶来，请耐心等待！</cover-view>
        <cover-view class="wait-time suc-label">订单日期：2019-01-10 11:11</cover-view>
        <cover-view class="wait-time">垃圾类别：厕所垃圾+厨房垃圾+客厅垃圾+其他</cover-view>
        <cover-view class="suc-txt">
          <cover-image class="suc-img" src="/static/images/success-green.png"></cover-image>
          订单金额：¥30
        </cover-view>
      </cover-view>
    </cover-view>
  </view>
</template>

<script>
  export default {
    data() {
			return {
				covers: [{
					latitude: 39.909,
					longitude: 116.39742,
					iconPath: '../../../static/images/map-pin.png'
				}, {
					latitude: 39.90,
					longitude: 116.39,
					iconPath: '../../../static/images/map-pin.png'
        }],
        type: 'coming' // coming 抢单中 success 完成
			}
		}
  }
</script>

<style lang="scss" scoped>
  .order-detail-wrapper {
    width: 100%;
    height: 100%;
    position: relative;
    .map {
		 width: 100%;
     height: 100%;
		}
		.controls, .success {
			width: 92%;
			position: absolute;
			bottom: 90rpx;
			left: 4%;
      .order-info {
        box-sizing: border-box;
			  height: 235rpx;
        padding: 36rpx 36rpx 0;
        margin-bottom: 24rpx;
			  background-color: #fff;
        border-radius: 26rpx;
        &.suc-info {
          height: 298rpx;  
        }
        .wait-txt {
          font-size: 32rpx;
          line-height: 40rpx;
          color: #4A4A4A;
          &.suc-label {
            margin-top: 8px;
          }
        }
        .wait-time {
          margin: 8rpx 0 18rpx;
          font-size: 28rpx;
          line-height: 36rpx;
          color: #808080;
          &.suc-label {
            margin-top: 8px;
          }
          &.suc-amount {
            margin: 8px 0 30rpx;
          }
        }
        .tips {
          display: flex;
          align-items: center;
          height: 65rpx;
          font-size: 24rpx;
          color: #F7B500;
          .tips-img {
            width: 30rpx;
            height: 30rpx;
            margin-right: 10rpx;
          }
        }
      }
		}
    .success {
      width: 92%;
			position: absolute;
			bottom: 90rpx;
			left: 4%;
			border-radius: 26rpx;
      .order-info {
        .suc-txt {
          display: flex;
          align-items: center;
          height: 65rpx;
          font-size: 28rpx;
          color: #1DA06E;
          .suc-img {
            width: 30rpx;
            height: 30rpx;
            margin-right: 10rpx;
          }
        }
      }
    }
  }
  
</style>