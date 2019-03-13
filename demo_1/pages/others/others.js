const app = getApp()

Page({
  data: {
    slider2: 3500,
    slider3: 8000,
    slider4: 2.5,
    slider5: 50,
    slider6: 50,
    slider7: 50,
    screen: [
      { value: '13.4' },
      { value: '14.3' },
      { value: '15.6' },
      { value: '17.8' }
    ],
    check: [],
    type:'',
    department:0,
    pcrestult:''
  },
  onShow() {
    var that = this
    
    wx.getStorage({
      //获取数据的key
      key: 'department',
      success: function (res) {
        console.log(res)
        that.setData({
          //
          department: res.data
        })
      },
      /**
       * 失败会调用
       */
      fail: function (res) {
        console.log(res)
      }
    })

    wx.getStorage({
      //获取数据的key
      key: 'type',
      success: function (res) {
        console.log(res)
        that.setData({
          //
          type: res.data
        })
      },
      /**
       * 失败会调用
       */
      fail: function (res) {
        console.log(res)
      }
    })
    
  },
  checkboxChange: function (e) {
    this.setData({ check: e.detail.value })
  },
  changeSlider2(e) {
    this.setData({ slider2: e.detail.value })
  },
  changeSlider3(e) {
    this.setData({ slider3: e.detail.value })
  },
  changeSlider4(e) {
    this.setData({ slider4: e.detail.value })
  },
  changeSlider5(e) {
    this.setData({ slider5: e.detail.value })
  },
  changeSlider6(e) {
    this.setData({ slider6: e.detail.value })
  },
  changeSlider7(e) {
    this.setData({ slider7: e.detail.value })
  },
  formSubmit: function () {

    var that = this;

    //得到参数
    var _person = [
      this.data.check,
      this.data.slider2,
      this.data.slider3,
      this.data.slider4
    ]
    
    console.log(_person)
    //排序算法
    var _department = 0;
    if(that.data.department == 1)//大量游戏需求
      _department = 1;
    var _type = 0;
    if(that.data.type == '专业游戏')
        _type = 1;
 

    var list = app.globalData.pclist
    console.log(list)

    var search = {}
    var storeW = []
    var i = 1

    for (let e of list) {
      var tag = 0//标记MAC
      var x = e.xktype
      var c = e.cpu
      var d = e.disk
      var w = e.workingtime
      var m = e.mem
      var weight = 1
      var w_x
      var w_c
      var w_d
      var w_w
      var w_m
      if (_type == 1) {
        if ((c.search("MAC") != -1) || (c.search("低功耗") != -1))//为MAC或低功耗，去除
        {
          continue;
        }
      }
      if ((c.search("MAC") != -1))
        tag = 1;
      if (_department = 1) {
        w_x = 0.1
        w_c = 0.4
        w_d = 0.2
        w_w = 0.1
        w_m = 0.2
      } else {
        w_x = 0.3
        w_c = 0.2
        w_d = 0.2
        w_w = 0.2
        w_m = 0.1
      }
     
      switch (x) {
        case '显卡类别：高性能游戏独立显卡'
          : x = 10
          break;
        case '显卡类别：入门级游戏独立显卡'
          : x = 7
          break;
        case '显卡类别：集成显卡'
          : x = 5
          break;
      }
      //cpu
      switch (c) {
        case 'Intel i5低功耗版'
          :
          c = 5
          break;
        case 'Intel i7低功耗版'
          :
          c = 7
          break;
        case 'Intel i5标准电压版'
          :
          c = 8
          break;
        case 'Intel i7标准电压版'
          :
          c = 10
          break;
        case 'Intel 其他'
          :
          c = 6
          break;

        case '锐龙'
          :
          c = 7
          break;
        default: c = 5
      }
      //disk
      switch (d) {
        case '128G+1T'
          : d = 7
          break;
        case '512G固态'
          : d = 10
          break;
        case '128G固态'
          : d = 5
          break;
        case '256G固态'
          : d = 7
          break;
      }
      //mem
      switch (m) {
        case '8G'
          : m = 10
          break;
        case '4G'
          : m = 7
          break;
        default: m = 6;
      }
      //workingtime
      switch (w) {
        case '9小时以上'
          : w = 10
          break;
        case '7-9小时'
          : w = 8
          break;
        case '5-7小时'
          : w = 7
          break;
        case '小于5小时'
          : w = 5
          break;
        default: w = 7.5
      }

      weight = c * w_c + d * w_d + m * w_m + x * w_x + w * w_w
      if (tag == 1)
        weight = weight * 1.1
      // console.log(x, c, d, w, m)
      // console.log(weight)
      var temp = [
        e._id,
        weight,
        c,
        m,
        x,
        d,
        w
      ]

      if (e.price < _person[1] || e.price > _person[2])
        continue;
      //console.log(temp)
      storeW.push(temp)
      search[e._id] = e

    }

    console.log(storeW)

    var compare = function (x, y) {//比较函数
      if (x[1] > y[1])
        return -1;
      else if (x[2] > y[2])
        return -1;
      else if (x[3] > y[3])
        return -1;
      else if (x[4] > y[4])
        return -1;
      else return 1
    }

    storeW = storeW.sort(compare)
    var _pcresult = []
    for (var i = 0; i < 10; i++) {
      _pcresult.push(search[storeW[i][0]])
    }

    this.setData({
      pcrestult: _pcresult
    })

    wx.setStorage({
      key: 'pcresult',
      data: this.data.pcrestult,
      success: function (res) {
        console.log(res)
      }
    })
    wx.switchTab({
      url: '../favorites/favorites'
    })

  }
})