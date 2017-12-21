
const service = require("../service/service.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: {},
    openid: "",
    couser_id:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.couser_id = options.couser_id;

    // 获取openid
    var that = this;
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        that.setData({
          openid: res.data,
        })

        that.requsetData(that.couser_id);
      },
    })
  
  },

  requsetData: function (couser_id) {

    var that = this;
    var url = "index.php/subject/result";
    var parameters = "openid=" + that.data.openid + "&subjectid=" + couser_id;

    service.request(url, parameters, function(res){
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
      url: '../exam/exam'
    })
  },

  obtainBtnClick: function() {
    var that = this;
    var url = "index.php/subject/draw";
    var parameters = "openid=" + that.data.openid + "&subjectid=" + that.couser_id + "&bonus=" + that.data.data.bonus;

    console.log("-------parameters---" + parameters)

    service.request(url, parameters, function (res) {
      console.log("请求成功");
      

    })
  },

  doubleBtnClick: function () {
    var that = this;
    var url = "index.php/subject/draw";
    var parameters = "openid=" + that.data.openid + "&subjectid=" + that.couser_id + "&bonus=" + that.data.data.bonus*2;

    console.log("-------parameters---" + parameters)
    service.request(url, parameters, function (res) {
      
      console.log("请求成功");

    })

  },

  onShareAppMessage:function() {
    
  }
})