

const vFilter = {
  hasWindow: function (val) {
    if (val >= 1 ) return '有窗'
    else return '没有'
  },
  formatDate: function (value) {
    var d = new Date(value)
    var year = d.getFullYear()
    var month = d.getMonth() + 1
    var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate()
    // var hour = d.getHours();
    // var minutes = d.getMinutes();
    // var seconds = d.getSeconds();
    // return  year+ '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
    return year + '-' + month + '-' + day
  },
  formatDay: function (value) {
    const wd = ['星期天','星期一','星期二','星期三','星期四','星期五','星期六']
    var d = new Date(value)
    var year = d.getFullYear()
    var month = d.getMonth() + 1
    var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate()
    var hour = d.getHours();
    var minutes = d.getMinutes();
    var seconds = d.getSeconds();
    var dow = d.getDay();
     //return  year+ '年' + month + '月' + day + '日 ' + hour + ':' + minutes + ':' + seconds;
    return year + '年' + month + '月' + day + '日 ' + wd[dow%7]
  },
  addDate: function(date, days) {
    if (days == undefined || days == '') {
      days = 1;
    }
    var d = new Date(date);
    d.setDate(d.getDate() + days);
    var year = d.getFullYear()
    var month = d.getMonth() + 1;
    var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate()
    return year + '-' + month + '-' + day
  },
  getOrderStatus: function (val) {
    var status = ''
    switch (val) {
      case -1:
        status = '已取消'
        break;
      case 0:
        status = '未付款'
        break;
      case 1:
        status = '已付款'
        break;
      case 2:
        status = '已入住'
        break;
      case -2:
        status = '订单超时'
        break;
      case -3:
        status = '被删除'
            break;
    }
    return status
  },
  getStatusColor(val){
    var status = ''
    switch (val) {
      case -2:
        status = 'info'
        break;
      case -1:
        status = ''
        break;
      case 0:
        status = 'error'
        break;
      case 1:
        status = 'success'
        break;
      case 2:
        status = 'primary'
        break;
      case -3:
        status = 'info'
        break;
    }
    return status
  }
}

export default vFilter
