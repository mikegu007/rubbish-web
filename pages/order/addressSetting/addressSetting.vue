<template>
  <view class="address-setting-wrapper">
    <view class="tabs">
      <view class="tab" v-for="tab in tabs" :key="tab.id" :class="{'active': tabType === tab.type }" @tap="checkTab(tab)">
        <text class="text">{{ tab.name }}</text>
      </view>
    </view>
    <view v-if="tabType !== 'getTransitRoute'" class="map-box">
      <map
        class="map"
        :latitude="startAddress.latitude"
        :longitude="startAddress.longtitude"
        :markers="markers"
        :polyline="polyline"
        :show-location="true"
        scale="16" >
      </map>
    </view>
    <view v-if="tabType !== 'getTransitRoute'" class="footer">
      <view class="left">
        <view class="text">{{ distance }}</view>
        <view class="text">{{ cost }}</view>
      </view>
      <view class="bottom-btn" @tap="goDetail">详情</view>
      <view class="bottom-btn" @tap="goNav">导航</view>
      <view class="bottom-btn" @tap="getDestination">{{ finish }}</view>
      <!-- <view class="right">
      </view> -->
    </view>
    <view v-if="tabType === 'getTransitRoute'" class="transits-box">
      <view class="transit" v-for="(transit, index) in transits" :key="index">
        <text v-for="(name, key) in transit.transport" :key="key">{{ name }}</text>
      </view>
    </view>
  </view>
</template>

<script>
  import amap from '../../../utils/amap'

  let $self;
  export default {
    data() {
			return {
        tabs: [ // 交通方式
          { name: '驾车', type: 'getDrivingRoute', id: 0 },
          { name: '公交', type: 'getTransitRoute', id: 1 },
          { name: '骑行', type: 'getRidingRoute', id: 2 },
          { name: '步行', type: 'getWalkingRoute', id: 3 }
        ],
        tabType: 'getDrivingRoute',
        startAddress: { longtitude: '',  latitude: '' },
        endAddress: { longtitude: '',  latitude: '', name: '' },
        markers: [ // 起始点
          { iconPath: '/static/images/mapicon_navi_s.png', id: 1, latitude: '', longitude: '', width: 20, height: 30 },
          { iconPath: '/static/images/mapicon_navi_e.png', id: 0, latitude: '', longitude: '', width: 20, height: 30 }
        ],
        polyline: [{ points: [], color: '#0091ff', width: 6 }], // 路线
        transits: [], // 公交车详情
        distance: '', // 距离
        cost: '', // 花费 | 时间
        finish: '到达目的地'
			}
    },
    onLoad(options) {
      $self = this
      // console.log(options)
      if (JSON.stringify(options) !== '{}') {
        this.startAddress = Object.assign({}, {
          longtitude: +options.longtitude1,
          latitude: +options.latitude1
        })
        this.endAddress = Object.assign({}, {
          longtitude: +options.longtitude2,
          latitude: +options.latitude2,
          name: options.name
        })
        this.markers[0] =  Object.assign(this.markers[0], {
          longitude: +options.longtitude1,
          latitude: +options.latitude1
        })
        this.markers[1] =  Object.assign(this.markers[1], {
          longitude: +options.longtitude2,
          latitude: +options.latitude2
        })
      }
    },
    onReady() {
      this.getRoute()
    },
    methods: {
      checkTab(tab) {
        this.tabType = tab.type
        this.getRoute(this.tabType)
      },
      goLocation() {
        uni.navigateTo({
          url: '../location/location'
        })
      },
      getRoute(type = 'getDrivingRoute') {
        let origin = `${$self.startAddress.longtitude},${$self.startAddress.latitude}`
        let destination = `113.900034,22.674162`
        let city = uni.getStorageSync('city')
        amap.getRoute(origin, destination, type, city)
          .then(info => {
            // console.log(info)
            $self.setRouteData(info, type)
          })
        .catch(e => {
            console.log(e)
          })
      },
      setRouteData(d, type) {
        if (type != "getTransitRoute") { // 非公交
          let points = [];
          if (d.paths && d.paths[0] && d.paths[0].steps) {
            let steps = d.paths[0].steps;
            uni.setStorageSync("steps", steps);
            steps.forEach(item1 => {
              let poLen = item1.polyline.split(';');
              poLen.forEach(item2 => {
                let obj = {
                  longitude: parseFloat(item2.split(',')[0]),
                  latitude: parseFloat(item2.split(',')[1])
                }
                points.push(obj);
              })
            })
          }
          $self.polyline[0].points = points
        } else { // 公交
          if (d && d.transits) {
            let transits = d.transits;
            transits.forEach(item1 => {
              let { segments } = item1;
              item1.transport = [];
              segments.forEach((item2, j) => {
                if (item2.bus && item2.bus.buslines && item2.bus.buslines[0] && item2.bus.buslines[0].name) {
                  let name = item2.bus.buslines[0].name;
                  if (j !== 0) {
                    name = '--' + name;
                  }
                  item1.transport.push(name);
                }
              })
            })
            this.transits = transits
          }
        }

        if (type == "getDrivingRoute") {
          if (d.paths[0] && d.paths[0].distance) {
            $self.distance = d.paths[0].distance + '米'
          }
          if (d.taxi_cost) {
            $self.cost = '打车约' + parseInt(d.taxi_cost) + '元'
          }
        } else if (type == "getWalkingRoute" || type == "getRidingRoute") {
          if (d.paths[0] && d.paths[0].distance) {
            $self.distance = d.paths[0].distance + '米'
          }
          if (d.paths[0] && d.paths[0].duration) {
            $self.cost = '约' + parseInt(d.paths[0].duration / 60) + '分钟'
          }
        }
      },
      goDetail() {
        let url = `../polyDetail/polyDetail`;
        uni.navigateTo({ url });
      },
      goNav() {
        wx.openLocation({
          latitude: +this.endAddress.latitude,
          longitude: +this.endAddress.longtitude,
          name: this.endAddress.name
        });
      },
      getDestination() {
        let orderNo = '', method = ''
        if (this.finish === '到达目的地') {
          method = 'updateDealWithStatus'
        } else {
          method = 'finishOrder'
        }
        uni.request({
          url: `https://messagecome.com/order/${method}?orderNo=${orderNo}`,
          methods: 'POST'
        })
          .then(infoRes => {
            let [err, res] = infoRes
            if (res.data && res.data.status === 1) {
              if ($self.finish === '到达目的地') {
                $self.finish = '完成订单'
              } else {
                uni.navigateBack({})
              }
            }
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
    .tabs {
      height: 80rpx;
      background-color: #fff;
      display: flex;
      align-items: center;
      .tab {
        flex: 1;
        text-align: center;
        padding-bottom: 4rpx;
        font-size: 32rpx;
        &.active {
					font-weight: 600;
				}
				&.active .text {
          color: #1DA06E;
					border-bottom: 6rpx solid #1DA06E;
				}
      }
    }
    .map-box {
      flex: 1;
		  width: 100%;
      .map {
        width: 100%;
        height: 100%;
      }
    }
    .footer {
      height: 120rpx;
      padding: 0 30rpx;
      align-items: center;
      background-color: #fff;
      display: flex;
      .left {
        flex: 1;
        .text:first-child {
          margin-bottom: 20rpx;
        }
      }
      .bottom-btn {
        padding: 6rpx 10rpx;
        text-align:center;
        border-radius: 8rpx;
        font-size: 28rpx;
        color: #fff;
        background: #0091ff;
        margin-right: 10rpx;
        &:last-child {
          margin-right: 0;
        }
      }
    }
    .transits-box {
      flex: 1;
      padding: 30rpx;
      background-color: #fff;
      overflow: auto;
      .transit {
        font-size: 28rpx;
        line-height: 48rpx;
        border-bottom: 2rpx solid #E0E0E0;
      }
    }
  }
  
</style>