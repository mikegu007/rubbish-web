<template name="order-item">
  <view class="order-item">
    <view class="info">
      <image class="location" src="../static/images/location.png"></image>
      <view class="order-info">
        <view class="build">{{ orderItem.addressName }}</view>
        <view class="date">订单日期：{{ date }}</view>
        <!-- <view class="description">垃圾类别：厕所垃圾+厨房垃圾+客厅垃圾+其他</view> -->
      </view>
    </view>
    <view class="order-status">
      <view class="dot"></view>
      <view class="status-txt" :class="{'resolved': orderItem.orderStatus === 4, 'pending': orderItem.orderStatus < 4 && orderItem.orderStatus > 0 }">{{ statusTxt }}</view>
      <view class="order-amount">¥<text class="num">{{ orderItem.total }}</text></view>
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
      // 下单
      bgSrc() { 
        if (this.orderItem.type === 0) {
          return '../static/images/place.png'
        } else if (this.orderItem.type === 1){
          return '../static/images/grab.png'
        }
      },
      // 日期
      date() {
        if (this.orderItem.finishTime) {
          return this.orderItem.finishTime
        } else if (this.orderItem.startTime) {
          return this.orderItem.startTime
        } else if (this.orderItem.payTime) {
          return this.orderItem.payTime
        } else {
          return ''
        }
      },
      // 0 1 2 3 4分别表示已取消、待付款、待抢单、待完成、已完成
      statusTxt() {
        if (this.orderItem.orderStatus === 0) {
          return '已取消'
        } else if (this.orderItem.orderStatus === 1) {
          return '待付款'
        } else if (this.orderItem.orderStatus === 2) {
          return '待抢单'
        } else if (this.orderItem.orderStatus === 3) {
          return '待完成'
        } else if (this.orderItem.orderStatus === 4) {
          return '已完成'
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
        color: #C0C0C0;
        &.pending {
          color: #F7B500;
        }
        &.resolved {
          color: #1DA06E;
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