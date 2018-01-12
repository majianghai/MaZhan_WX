const service = require("../service/service.js");

var openid ;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_name: "",
    user_img: "",
    course_name: "清理资产，指定资产配置计划",
    coupon_num:"30",
    person_list: [],
    p_count:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.getInfo();

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

  },

  getInfo:function(){
    var that = this;
    wx.getSetting({
      success: function (res) {
        console.log("授权" + JSON.stringify(res))
        if (!res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success: function (res) {
              console.log("授权chengggg" + JSON.stringify(res))
              that.userinfo();
            }
          })
        }else{
          that.userinfo();
        }
      }
    })
  },

  userinfo:function(){
    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        // 可以将 res 发送给后台解码出 unionId
        console.log(res.userInfo)
        that.setData({
          user_name: res.userInfo.nickName,
          user_img: res.userInfo.avatarUrl,
        })
        console.log("nickname" + that.data.user_name + ",url" + that.data.user_img)
      }
    })
  }
})