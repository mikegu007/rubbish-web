<template>
  <view class="address-setting-wrapper">
    <view class="search">
      <div class="placeholder">
        <image class="search-img" src="../../../static/images/search.png"></image>
        <text class="search-txt">搜索</text>
      </div>
      <input class="ipt" type="text" v-model="key" @focus="goLocation">
    </view>
    <map class="map" :markers="covers"></map>
		<cover-view class="controls">
      <cover-view class="address-info">
        <cover-view class="label">已选小区:</cover-view>
        <cover-view class="content">
          <cover-view class="address" v-for="address in addressList" :key="address.id">{{ address.text }}</cover-view>
        </cover-view>
        <cover-view class="btns">
          <cover-view class="btn confirm">确定</cover-view>
          <cover-view class="btn cancel">取消</cover-view>
        </cover-view>
      </cover-view>
      <cover-view class="tips">
        <cover-image class="tips-img" src="../../../static/images/tips.png"></cover-image>
        <cover-view class="tips-tx">您最多可以选择3个小区作为接单范围</cover-view>
      </cover-view>
    </cover-view>
  </view>
</template>

<script>
  export default {
    data() {
			return {
        key: '',
        addressList: [
          { text: '逸仙路2816号 华滋奔腾大厦B座', id: 0 },
          { text: '逸仙路2816号 华滋奔腾大厦B座', id: 1 },
          { text: '逸仙路2816号 华滋奔腾大厦B座', id: 2 }
        ]
			}
    },
    methods: {
      goLocation() {
        uni.navigateTo({
          url: '../location/location'
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .address-setting-wrapper {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    .search {
      position: relative;
      box-sizing: border-box;
      padding: 8rpx 36rpx;
      width: 100%;
      height: 90rpx;
      display: flex;
      align-items: center;
      background-color: #F8F8F8;
      .ipt {
        flex: 1;
        box-sizing: border-box;
        padding-left: 30rpx;
        // width: 92%;
        height: 72rpx;
        border-radius: 36rpx;
        background-color: #fff;
        color: #8E8E93;
        font-size: 32rpx;
      }
      .placeholder {
        position: absolute;
        width: 160rpx;
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
    .map {
      flex: 1;
		  width: 100%;
		}
		.controls {
      box-sizing: border-box;
			position: absolute;
			width: 92%;
			bottom: 90rpx;
			left: 4%;
      padding: 42rpx 36rpx 0;
      background: #fff;
      border-radius: 26rpx;
      .address-info {
        font-size: 28rpx;
        display: flex;
        .label {
          color: #808080;
          margin-right: 16rpx;
        }
        .content {
          flex: 1;
          color: #4A4A4A;
          .address {
            line-break: 44rpx
          }
        }
        .btns {
          width: 100rpx;
          .btn {
            box-sizing: border-box;
            width: 100rpx;
            height: 48rpx;
            line-height: 48rpx;
            text-align: center;
            border-radius: 10rpx;
            font-size: 28rpx;
            &.confirm {
              color: #fff;
              background: #1DA06E;
              margin-bottom: 10rpx;
            }
            &.cancel {
              color: #7F7C7F;
              border: 2rpx solid #DCDCDC;
            }
          }
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
  
</style>