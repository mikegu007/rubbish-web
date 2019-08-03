<template name="order-item">
  <view class="order-item">
    <view class="info">
      <image class="location" src="../static/images/location.png"></image>
      <view class="order-info">
        <view class="build">{{ orderItem.location }}</view>
        <view class="date">订单日期：{{ orderItem.date }}</view>
        <view class="description">垃圾类别：厕所垃圾+厨房垃圾+客厅垃圾+其他</view>
      </view>
    </view>
    <view class="order-status">
      <view class="dot"></view>
      <view class="status-txt" :class="{'active': orderItem.type === 1 || orderItem.type === 3}">{{ statusTxt }}</view>
      <view class="order-amount">¥<text class="num">{{ orderItem.amount }}</text></view>
    </view>
    <image class="order-bg" :src="bgSrc"></image>
  </view>
</template>

<script>
  export default {
    name: 'order-item',
    props: {
      orderItem: {
        type: Object
      }
    },
    computed: {
      bgSrc() { // 0 1 2 3分别表示执行中、下单完成、抢单执行中、抢单完成
        if (this.orderItem.type === 0 || this.orderItem.type === 1) {
          return '../static/images/place.png'
        } else {
          return '../static/images/grab.png'
        }
      },
      statusTxt() {
        if (this.orderItem.type === 0 || this.orderItem.type === 2) {
          return '订单执行中'
        } else {
          return '订单已完成'
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .order-item {
    position: relative;
    // height: 254rpx;
    margin-bottom: 20rpx;
    padding: 36rpx 36rpx 0;
    background: #fff;
    box-shadow: 0rpx 2rpx 6rpx 2rpx rgba(0,0,0,0.06);
    border-radius: 8rpx;
    .info {
      display: flex;
      .location {
        width: 28rpx;
        height: 34rpx;
        margin: 6rpx 15rpx 0 0;
      }
      .order-info {
        flex: 1;
        .build {
          font-size: 32rpx;
          line-height: 45rpx;
          color: #4A4A4A;
        }
        .date {
          margin-top: 16rpx;
          color: #808080;
          font-size: 22rpx;
          line-height: 30rpx;
        }
        .description {
          color: #808080;
          font-size: 22rpx;
          line-height: 30rpx;
          margin: 4px 0 20rpx;
        }
      }
    }
    .order-status {
      height: 78rpx;
      display: flex;
      align-items: center;
      color: #989898;
      font-size: 24rpx;
      border-top: 2rpx solid #E0E0E0;
      .dot {
        width: 16rpx;
        height: 16rpx;
        margin: 0 15rpx;
        border-radius: 50%;
        background-color: #C0C0C0;
        &.active {
          background-color: #F7B500;
        }
      }
      .status-txt {
        flex: 1;
        &.active {
          color: #F7B500;
        }
      }
      .order-amount {
        color: #666666;
        font-size: 22rpx;
        .num {
          font-size: 36rpx;
        }
      }
    }
    .order-bg {
      position: absolute;
      width: 75rpx;
      height: 75rpx;
      right: 0;
      top: 0;
    }
  }
</style>