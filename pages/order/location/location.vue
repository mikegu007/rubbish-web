<template>
  <view class="location-wrapper">
    <view class="search">
      <view v-show="showSearch" class="placeholder">
        <image class="search-img" src="/static/images/search.png"></image>
        <text class="search-txt">搜索</text>
      </view>
      <input class="ipt" type="text" v-model="key" @focus="hiddenIcon" @blur="showIcon">
    </view>
    <view class="cur-location">
      <view class="title">当前定位</view>
      <view class="content">
        <text class="address">逸仙路2816号 华滋奔腾大厦B座</text>
        <text class="relocate" @tap="goBack">重新定位</text>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        showSearch: true
      }
    },
    methods: {
      goBack() {
        uni.navigateBack()
      },
      hiddenIcon() {
        this.showSearch = false
      },
      showIcon() {
        this.showSearch = true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .location-wrapper {
    .search {
      position: relative;
      box-sizing: border-box;
      padding: 0 36rpx;
      width: 100%;
      height: 72rpx;
      display: flex;
      align-items: center;
      background-color: #fff;
      .ipt {
        flex: 1;
        height: 72rpx;
        padding-left: 30rpx;
        border-radius: 36rpx;
        background-color: #F0F0F0;
        opacity:0.94;
        color: #8E8E93;
        font-size: 32rpx;
      }
      .placeholder {
        position: absolute;
        width: 120rpx;
        height: 72rpx;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        align-items: center;
        justify-content: center;
        .search-txt {
          font-size: 36rpx;
          color: #8E8E93;
        }
        .search-img {
          width: 28rpx;
          height: 28rpx;
          margin-right: 10rpx;
        }
      }
    }
    .cur-location {
      background-color: #fff;
      padding: 20rpx 30rpx;
      .title {
        color: #808080;
        font-size: 28rpx;
        line-height: 38rpx;
        margin-bottom: 12rpx;;
      }
      .content {
        display: flex;
        .address {
          flex: 1;
          font-size: 32rpx;
          line-height: 42rpx;
          color: #4D4D4D;
        }
        .relocate {
          color: #32A87B;
          font-size: 28rpx;
        }
      }
    }
  }
</style>