const service = require("../service/service.js");

var openid ;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_name: "肉多多",
    user_img: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJkOj8VUxLjDHEADYaFVlewvWIXiasNAqibSGXoC1RyR2M5FkfW4Cq4icnTV1PvOXQ6UWqSHU9zSXJMA/0",
    course_name: "清理资产，指定资产配置计划",
    coupon_num:"30",
    person_list: [],
    p_count:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    wx.getStorage({
      key: 'openid',
      success: function(res) {
        openid:res.data.data
      },
    })

    //获取所有课程列表
    var that = this;
    var url = "index.php/subject/pull";
    var parameters = "openid=aa&subjectid=1";
    service.request(url, parameters, function (res) {
      console.log("请求成功");
      that.setData({
        person_list: res.data.data.result, 
        coupon_num:res.data.data.bonus,
        course_name:res.data.data.names,
        p_count:res.data.data.num,
      })
      console.log(that.data.person_list)
    })
    console.log(options)
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

  // 课程详情
  courseDetail:function(){

  },

  // 我的课程
  myCourse:function(){

  },

  // 领取奖学金
  getCoupon:function(){

  }
})