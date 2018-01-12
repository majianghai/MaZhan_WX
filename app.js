//app.js
var code;
var nickName;
var avatarUrl;
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    var that = this;
    // 获取openid
    wx.login({
      success: function (res) {
        console.log(res)
        if (res.code) {
          code=res.code;
          // 获取用户信息
          wx.getSetting({
            success: function (res) {
              console.log("授权" + JSON.stringify(res))
              if (!res.authSetting['scope.userInfo']) {
                wx.authorize({
                  scope: 'scope.userInfo',
                  success:function(res) {
                    console.log("授权成功"+JSON.stringify(res))
                    that.getInfo();
                  },
                  fail:function(){
                    wx.showToast({
                      title: '不允许授权会影响之后的操作',
                    })
                  }
                })
              }else{
                that.getInfo();
              }
            }
          })
        }
      }
    });
  },

  globalData: {
    userInfo: null
  },

  getInfo:function(){
    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    var that = this;
    wx.getUserInfo({
      success: res => {
        // 可以将 res 发送给后台解码出 unionId
        that.globalData.userInfo = res.userInfo
        console.log(res.userInfo)
        nickName = res.userInfo.nickName;
        avatarUrl = res.userInfo.avatarUrl;
        console.log("nickname" + nickName + ",url" + avatarUrl + ",code" + code)
        //上传用户信息
        wx.request({
          url: "https://xcx.jiyoubang360.com/index.php/subject/openid",
          data: {
            code: code,
            url: avatarUrl,
            name: nickName,
          },
          success: function (res) {
            console.log("上传成功" + JSON.stringify(res))
            wx.setStorage({
              key: 'openid',
              data: res.data.data,
            })
          }
        })
        /// 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回  
        // 所以此处加入 callback 以防止这种情况
        if (that.userInfoReadyCallback) {
          that.userInfoReadyCallback(res)
        }
      }
    })
  }
})



