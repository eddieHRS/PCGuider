// pages/select/select.js
Page({
  data: {
    showIndex: 0,
    items: [
      { value: 'office', name: '办公家用' },
      { value: 'design', name: '设计开发' },
      { value: 'entertain', name: '游戏娱乐' },
      { value: 'game', name: '专业游戏' },
    ],
    listData: [
      { "preference": "CPU", "lv1": "Intel(R) Core(TM) i5", "lv2": "Intel(R) Core(TM) i5", "lv3": "Intel(R) Core(TM) i7", "lv4":"Intel(R) Core(TM) i7"},
      { "preference": "显卡", "lv1": "GeForce GTX 950M", "lv2": "GeForce GTX 1050TI", "lv3": "GeForce GTX 1060", "lv4":"GeForce GTX 1070"},
      { "preference": "内存", "lv1":"4G","lv2":"8G","lv3":"8G","lv4":"16G"},
      { "preference": "系统", "lv1": "Win7/8/10 64bit", "lv2": "Win7/8/10 64bit", "lv3": "Win7/8/10 64bit", "lv4": "Win7/8/10 64bit"}
    ],
    radioFlag: ' '
  },
  panel: function (e) {
    if (e.currentTarget.dataset.index != this.data.showIndex) {
      this.setData({
        showIndex: e.currentTarget.dataset.index
      })
    } else {
      this.setData({
        showIndex: 0
      })
    }
  },
  radioChange: function(e) {
    var str = null;
    var tag = null;
    for (var name of this.data.items) {
      if (name.value === e.detail.value) {
        str = e.detail.value;
        tag = name.name;
        break;
      }
    }
    if (str == 'office') ;
    if (str == 'design') ;
    if (str == 'entertain');
    if (str == 'game') ;
    this.setData({ radioFlag: tag });
  },
  goToPage: function () {
    wx.setStorage({
      key: 'type',
      data: this.data.radioFlag,
      success: function (res) {
        console.log(res)
      }
    })
    wx.navigateTo({
      url: '../others/others?key=str'
    })
  }
 
})