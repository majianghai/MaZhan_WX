// pages/food/food.js

Page({

  /**
   * 页面的初始数据
   */
  data: {

    winHeight: 0,
    data: [1, 2],
    show_whitch: 0,//0显示分数，1显示未测试
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
    console.log(this.data.winHeight)
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

  startExam : function () {
    wx.navigateTo({
      url: '../result/result'
    })
  },


   moreClass: function (event) {
    console.log(event.target.dataset.img)
    wx.navigateTo({
      url: '../moreClass/moreClass'
    })
  }  
})