//app.js
var openid;
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
          //发起网络请求
          wx.request({
            url: "https://xcx.jiyoubang360.com/index.php/subject/openid",
            data: {
              code: res.code
            },
            success: function (res) {
              console.log(res)
              openid = res.data.data;

              // 获取用户信息
              wx.getSetting({
                success: res => {
                  if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                      success: res => {
                        // 可以将 res 发送给后台解码出 unionId
                        that.globalData.userInfo = res.userInfo
                        console.log(res.userInfo)
                        nickName = res.userInfo.nickName;
                        avatarUrl = res.userInfo.avatarUrl;
                        console.log("nickname" + nickName + ",url" + avatarUrl + ",openid" + openid)
                        //上传用户信息
                        wx.request({
                          url: "https://xcx.jiyoubang360.com/index.php/subject/upload",
                          data:{
                            openid:openid,
                            url:avatarUrl,
                            name:nickName,
                          },
                          success:function(res){
                            console.log("上传成功"+JSON.stringify(res))
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
                }
              })

              wx.setStorage({
                key: 'openid',
                data: res.data.data,
              })
            }
          })

        }
      }
    });
  },

  globalData: {
    userInfo: null
  },
})



