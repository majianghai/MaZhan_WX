
const service = require("../service/service.js");


Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: {},
    openid: "",
    exam_id:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.exam_id = options.exam_id;

    // 获取openid
    var that = this;
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        that.setData({
          openid: res.data,
        })
        that.requsetData(that.exam_id)
      },
    })

  },

  requsetData: function (exam_id) {

    var that = this;
    var url = "index.php/subject/examcount";

    var parameters = "subjectid=" + exam_id + "&openid=" + that.data.openid;
    service.request(url, parameters, function (res) {
      console.log("请求成功");
      that.setData({
        data: res.data.data
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

  // 点击开始测试
  startExam: function () {
    wx.navigateTo({
      url: '../exam/exam?exam_id=' + this.exam_id
    })
  }
})