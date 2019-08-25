<template>
  <view class="search-location">
    <view class="section">
      <input class="city-ipt" :class="{'city-width': city}" placeholder="城市中文或拼音" focus="true" v-model="city"/>
      <input class="ipt" placeholder="搜索" focus="true" v-model="addressName" @input="$inputHandle"/>
    </view>
    <view class="address-list">
      <view class="address-item" v-for="item in tips" :key="item.id" @tap="setAddress(item)">
        <view class="address-name">{{ item.name }}</view>
        <view class="address-detail">{{ `${item.district}${item.address}` }}</view>
      </view>
    </view>
  </view>
</template>

<script>
const amapFile = require('../../../lib/amap-wx.js')
import { debounce } from '../../../utils/methods.js'

let $self;
export default {
  data() {
    return {
      tips: [],
      showCity: false,
      city: '',
      addressName: '',
      addressLocation: '',
      $inputHandle: null
    }
  },
  onLoad(options) {
    $self = this;
    this.$inputHandle = debounce(this.bindInput, 300)
    let city = uni.getStorageSync('curCity')
    this.city = city ? city : ''
    if (JSON.stringify(options) !== '{}') {
      this.addressName = options.address
      this.$inputHandle()
    }
  },
  methods: {
    showCityIpt() {
      this.showCity = true
    },
    hiddenCityIpt() {
      this.showCity = false
    },
    bindInput: function() {
      let keywords = $self.addressName
      if (!keywords.trim()) return;
      let myAmapFun = new amapFile.AMapWX({key: '253f8eb5f9c6084e388cbd85ef0982ee'});
      myAmapFun.getInputtips({
        keywords,
        type: '分类代码',
        city: $self.city,
        location: '',
        success(data) {
          if(data && data.tips){
            $self.tips = data.tips
          }
        }
      })
    },
    setAddress(item) {
      uni.setStorageSync('curAddress', item)
      uni.navigateBack({})
    }
  }
}
</script>

<style lang="scss" scoped>
  .search-location {
    height: 100%;
    display: flex;
    flex-direction: column;
    .section{
      padding: 0 30rpx;
      height: 72rpx;
      display: flex;
      align-items: center;
      border-bottom: 2rpx solid #E0E0E0;
      background-color: #fff;
      font-size: 28rpx;
      .city-ipt {
        width: 200rpx;
        color: #8E8E93;
        &.city-width {
          width: 120rpx;
        }
      }
      .ipt{
        flex: 1;
        padding-left: 30rpx;
        opacity: 0.94;
        color: #8E8E93;
      }
    }
    .address-list {
      flex: 1;
      overflow: auto;
      margin-top: 20rpx;
      .address-item{
        margin: 20rpx 36px;
        border-bottom:1px solid #c3c3c3;
        padding-bottom:10px
      }
      .address-name {
        font-size: 28rpx;
        line-height: 36rpx;
      }
      .address-detail {
        font-size: 24rpx;
        line-height: 32rpx;
      }
    }
  }
</style>