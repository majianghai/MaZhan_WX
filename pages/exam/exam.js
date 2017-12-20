
const service = require("../service/service.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight: 0,  
    question_data: [],
    question_des: "",
    current_question: 1,
    count_question: 1,
    answer_percent: 0,
    array: [],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winHeight: res.screenHeight
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })

    var that = this;
    var url = "index.php/subject/exam";
    var parameters = "subjectid=1";
    service.request(url, parameters, function (res) {
      console.log("请求成功");
  
      var request_data= res.data.data;
    
      var question_array = new Array;
      for (var i = 0; i < request_data.length;i++){
        
        var answer_arary = [];
        for(var j = 0;j<request_data[i].answer.length;j++){
          var answer = new Object({
            answer_des: request_data[i].answer[j] ,
            image_path: "image_no_select.png",
          })
          answer_arary.push(answer);
        }
        var question = new Object({
          question_des:request_data[i].question,
          answer_data:answer_arary,
        })

        question_array.push(question)
      }
      that.setData({
        question_data: question_array,
      })

      var count = that.data.question_data[that.data.current_question - 1].answer_data.length;
      that.setData({
        question_des: that.data.question_data[that.data.current_question - 1].question_des,
        array: that.data.question_data[that.data.current_question - 1].answer_data,
        count_question: that.data.question_data[that.data.current_question - 1].answer_data.length,
        answer_percent: that.data.current_question / count * 100,
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

  /**
   * 获取答案改变选项
   */
  getAnswer: function (res) {
    console.log(res)
    var current_answer_id = res.currentTarget.id;

    for (var i = 0; i < this.data.array.length; i++) {
      this.data.array[i].image_path = "image_no_select.png";
      if (i == current_answer_id) {
        this.data.array[i].image_path = "image_select.png";
      }
    }
    this.setData({
      array: this.data.array,
    })

  },
  /**
  * 上一题
  */
  previousQuestion: function (res) {

    var current = this.data.current_question-1;
    if(current<=0){
      current = 1;
    }
    this.setData({
      current_question: current,
      question_des: this.data.question_data[current - 1].question_des,
      array: this.data.question_data[current - 1].answer_data,
      count_question: this.data.question_data[current - 1].answer_data.length,
      answer_percent: current / this.data.count_question * 100,
    })
  },

  /**
   * 下一题
   */
  nextQuestion: function (res) {
    var current = this.data.current_question + 1;
    if (current > this.data.count_question) {
      current = this.data.count_question;
      this.result();
    } else {
      this.setData({
        current_question: current,
        question_des: this.data.question_data[current - 1].question_des,
        array: this.data.question_data[current - 1].answer_data,
        count_question: this.data.question_data[current - 1].answer_data.length,
        answer_percent: current / this.data.count_question * 100,
      })
    }
  },

  // 跳转结果页
  result: function () {
    wx.navigateTo({
      url: '../result/result'
    })
  }
})