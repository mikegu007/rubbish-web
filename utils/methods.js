/**
 * 防抖
 * @param {*} fn 执行的方法
 * @param {*} wait 时间
 */
function debounce(fn, wait) {
  let timer = null;
  return function () {
    let context = this
    let args = arguments
    if (timer) {
        clearTimeout(timer);
        timer = null;
    }
    timer = setTimeout(function () {
        fn.apply(context, args)
    }, wait)
  }
}

/**
 * 用户地址授权
 * @param callback 调用getLocation
 */
function getLocationSetting(callback) {
  uni.getSetting({
    success(res) {
      console.log(JSON.stringify(res))
      // res.authSetting['scope.userLocation']  
      // undefined 表示初始化进入该页面  false 非初始化进入该页面,且未授权  true 表示地理位置授权
      if (res.authSetting['scope.userLocation'] === false) {
        uni.showModal({
          title: '请求授权当前位置',
          content: '需要获取您的地理位置，请确认授权',
          success (res) {
            if (res.cancel) {
              uni.showToast({
                title: '拒绝授权',
                icon: 'none',
                duration: 1000
              })
              suc = false
            } else if (res.confirm) {
              uni.openSetting({
                success(dataAu) {
                  if (dataAu.authSetting["scope.userLocation"] === true) {
                    uni.showToast({
                      title: '授权成功',
                      icon: 'success',
                      duration: 1000
                    })
                    //再次授权，调用uni.getLocation的API
                    callback()
                  } else {
                    uni.showToast({
                      title: '授权失败',
                      icon: 'none',
                      duration: 1000
                    })
                  }
                }
              })
            }
          }
        })
      } else {
        //调用uni.getLocation的API
        callback()
      }
    }
  })
}

export { debounce, getLocationSetting }