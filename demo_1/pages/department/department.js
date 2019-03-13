// pages/department/department.js
Page({
  data: {
    departmentList: ['计算机类', '设计类','工商管理类','电子信息类','心理学类','建筑类','数学类'],
    departmentIndex: 7
  },
  changeDepartment(e) {
    this.setData({ departmentIndex: e.detail.value });
     
  },
  goToPage: function() {
    wx.setStorage({
      key: 'department',
      data: this.data.departmentIndex,
      success: function (res) {
        console.log(res)
      }
    })
    wx.navigateTo({
      url: '../select/select?key=departmentIndex'
    })
  },
  formSubmit: function(e) {
    var that = this;
    var formData = e.detail.value;
    wx.request({
      url: 'http://test.com:8080/test/socket.php?msg=2',
      data: formData,
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.modalTap();
      }
    })
  }
})