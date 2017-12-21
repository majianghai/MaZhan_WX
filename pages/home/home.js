
const service = require("../service/service.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {

    winHeight: 0,
    data: [],
    openid:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({

      complete: function (res) {
        //回调中不能直接用this.setData否则这个this就是这个 wx.getSystemInfo的了，应该是onLoad的（或者相应的），所以有上面的处理
        that.setData({
          winHeight: res.windowHeight,
        })
      }
    });
    // 获取openid
    wx.login({
      success: function (res) {
        console.log(res)
        if (res.code) {
          //发起网络请求
          var url = "index.php/subject/openid";
          var parameters = 'code='+res.code;
          service.request(url, parameters, function (res) {
            console.log("请求成功");
            that.setData({
              openid: res.data.data,
            })

            wx.setStorage({
              key: 'openid',
              data: that.data.openid,
            })
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });

    //获取所有课程列表
    var url = "index.php/subject/sublist";
    var parameters = "openid="+that.data.openid;
    service.request(url, parameters, function (res) {
      console.log("请求成功");
      that.setData({
        data: res.data.data,
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },

  // 开始测试
  startExam : function (res) {
    console.log(res)
    wx.navigateTo({
      url: '../startExam/startExam?exam_id=1'
    })
  },
  
  // 查看已领优惠券
  seeCoupon:function(){
    wx.navigateTo({
      url: '../result/result'
    })
  },


   moreClass: function (event) {
    console.log(event.target.dataset.img)
    wx.navigateTo({
      url: '../moreClass/moreClass'
    })
  }  ,
})