
const service = require("../service/service.js");

//课程ID
var couser_id;
// 答案数组
var answers;
var openid;
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
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        console.log(res.data)
        that.openid = res.data;
      },
    })

    //获取课程ID
    couser_id = options.exam_id
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

    

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (res) {
    answers = new Array; 
    this.getExamQuestion();
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
   * 获取测试题列表
   */
  getExamQuestion:function(){
    // 获取测试题
    var that = this;
    var url = "index.php/subject/exam";
    var parameters = "subjectid="+couser_id;
    service.request(url, parameters, function (res) {
      console.log("请求成功");

      var request_data = res.data.data;

      var question_array = new Array;
      for (var i = 0; i < request_data.length; i++) {
        //初始答案全默认为1
        answers.push(1)
        var answer_arary = [];
        for (var j = 0; j < request_data[i].answer.length; j++) {
          var answer = new Object({
            answer_des: request_data[i].answer[j],
            image_path: "image_no_select.png",
          })
          answer_arary.push(answer);
        }
        var question = new Object({
          question_des: request_data[i].question,
          answer_data: answer_arary,
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
   * 获取答案改变选项
   */
  getAnswer: function (res) {
    console.log(res)
    var current_answer_id = res.currentTarget.id;

    //收集答案，修改初始答案数组(+1是为了后端认为数组从1开始，不是0开始……－_－)
    answers[this.data.current_question-1] = parseInt(current_answer_id)+1; 
    
    for (var i = 0; i < this.data.array.length; i++) {
      this.data.array[i].image_path = "image_no_select.png";
      this.data.question_data[this.data.current_question - 1].answer_data[i].image_path = "image_no_select.png"
      if (i == current_answer_id) {
        this.data.array[i].image_path = "image_select.png";
        this.data.question_data[this.data.current_question - 1].answer_data[i].image_path = "image_select.png"
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
    var that = this;
    // 提交测试题答案
    var url = "index.php/subject/test";
    var parameters = "subjectid=" + couser_id + "&openid=" + that.openid+"&answer=["+answers+"]";

    console.log("parameters"+parameters)
    service.request(url, parameters, function (res) {
      console.log("请求成功");

      wx.showToast({
        title: "parameters" + parameters,
      })
      if(res.data.code == 100){
        wx.navigateTo({
          url: '../result/result?couser_id=' + couser_id
        })
      }
    })
  }
})