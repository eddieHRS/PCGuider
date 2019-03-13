Page({
  data: {
    showIndex: 0,
    listData: [
      { "preference": "CPU", "lv1": "Intel(R) Core(TM) i5", "lv2": "Intel(R) Core(TM) i5", "lv3": "Intel(R) Core(TM) i7", "lv4": "Intel(R) Core(TM) i7" },
      { "preference": "显卡", "lv1": "GeForce GTX 950M", "lv2": "GeForce GTX 1050TI", "lv3": "GeForce GTX 1060", "lv4": "GeForce GTX 1070" },
      { "preference": "内存", "lv1": "4G", "lv2": "8G", "lv3": "8G", "lv4": "16G" },
      { "preference": "系统", "lv1": "Win7/8/10 64bit", "lv2": "Win7/8/10 64bit", "lv3": "Win7/8/10 64bit", "lv4": "Win7/8/10 64bit" }
    ],
    list:"",
    best:""
  },
  onShow() {
    var that = this
    wx.getStorage({
      //获取数据的key
      key: 'pcresult',
      success: function (res) {
        console.log(res)
        that.setData({
          //
          list: res.data
        })
        that.setData({
        best : that.data.list[0]
       
        })
        that.setData({
          list: that.data.list.slice(1)
        })
         console.log(that.data.best)
        console.log(that.data.list)
      },
      /**
 * 失败会调用
 */
      fail: function (res) {
        console.log(res)
      }
    })

   // this.setData({
   //   best : that.data.list[0]

  /*     best: [
        { id: 1, brand:'联想', type:'SBTGX-1125', price:'4999', cpu:'intel', visual:'gtx', save:'4g', system:'64bit'}
      ],
      list: [
        { id: 1, brand: '联想', type: 'SBTGX-1125', price: '4999', cpu: 'intel', visual: 'gtx', save: '4g', system: '64bit' },
        { id: 2, brand: '联想', type: 'SBTGX-1126', price: '4999', cpu: 'intel', visual: 'gtx', save: '4g', system: '64bit' },
        { id: 3, brand: '联想', type: 'SBTGX-1127', price: '4999', cpu: 'intel', visual: 'gtx', save: '4g', system: '64bit' }
      ]*/
 //   })
  }
})