<template>
  <view class="remark-wrapper">
    <view class="remark">
      <textarea v-model="remark" class="textarea" placeholder="填写额外对工作人员备注的信息"/>
    </view>
    <view class="submit" @tap="submit">确定</view>
  </view>
</template>

<script>
  import { REFRESH_REMARK } from '../../../utils/constant.js'

  export default {
    data() {
      return {
        remark: ''
      }
    },
    onLoad(options) {
      if (options.remark) {
        this.remark = options.remark
      }
    },
    methods: {
      submit() {
        let pages = getCurrentPages()
        let prevPage = pages[pages.length - 2]
        prevPage.data.placeOrderInfo.remark = this.remark
        this.$eventBus.$emit(REFRESH_REMARK, this.remark)
        uni.navigateBack({})
      }
    }
  }
</script>

<style lang="scss" scoped>
  .remark-wrapper {
    padding: 36rpx 30rpx 0;
    .remark {
      box-sizing: border-box;
      height: 378rpx;
      padding: 36rpx;
      background-color: #fff;
      border-radius: 8rpx;
      margin-bottom: 54rpx;
      .textarea {
        color: #989898;
        font-size: 28rpx;
        line-height: 36rpx
      }
    }
  }
</style>