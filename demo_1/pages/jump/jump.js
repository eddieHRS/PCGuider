// pages/jump/jump.js
Page({
  goToPage1: function (){
    wx.switchTab({
      url: '../department/department'
    });
  },
  goToPage2: function () {
    wx.navigateTo({
      url: '../select/select'
    })
  },
  goToPage3: function () {
    wx.navigateTo({
      url: '../others/others'
    })
  }
})