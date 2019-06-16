import axios from 'axios'
import qs from 'qs'
import Cookies from 'js-cookie'
export default {
  // 检查一个变量是否是数组
  inArray (arr, ele) {
    try {
      if (arr.indexOf(ele) !== -1) return true
      else return false
    } catch (err) {}
  },
  // 检查月份是否在两个月份之间
  betweenMonths (start, end) {
    if (end < start) return 0
    let yearDiff = end.getFullYear() - start.getFullYear()
    let monthDiff = end.getMonth() - start.getMonth()
    let dayDiff = end.getDate() - start.getDate()
    monthDiff += (yearDiff * 12)
    return dayDiff < 0 ? monthDiff - 1 : monthDiff
  },
  // 获取浏览器url的参数
  getQueryString (name) {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    let r = window.location.search.substr(1).match(reg)
    if (r != null) return decodeURIComponent(r[2])
    return null
  },
  restrictInputNumber (that, changed, val, oldVal, integer, decimal) {
    let reg = null
    if (decimal === 0) reg = new RegExp('^\\d{0,' + integer + '}$')
    else reg = new RegExp('^\\d{0,' + integer + '}(\\.\\d{0,' + decimal + '})?$')
    if (!reg.test(val)) {
      that.$nextTick(() => {
        /* eslint-disable no-eval */
        eval('this.' + changed + '=oldVal')
      })
    }
  },
  // 当前日期之前不能选择
  birthdayDateOption () {
    return {
      disabledDate (time) {
        return time.getTime() > Date.now()
      }
    }
  },
  // 几天之前
  startDateOption (endDate) {
    return {
      disabledDate (time) {
        return time.getTime() > new Date(endDate).getTime() - 24 * 60 * 60 * 1000
      }
    }
  },
  // 几天之后
  endDateOption (startDate) {
    return {
      disabledDate (time) {
        return time.getTime() < new Date(startDate).getTime() + 24 * 60 * 60 * 1000
      }
    }
  },
  // 获取浏览器信息
  getBrowserInfo () {
    var agent = navigator.userAgent.toLowerCase()
    var isIE = agent.indexOf('compatible') > -1 && agent.indexOf('msie' > -1)
    var isEdge = agent.indexOf('edge') > -1 && !isIE
    var isIE11 = agent.indexOf('trident') > -1 && agent.indexOf('rv:11.0') > -1
    if (isIE) {
      var reIE = new RegExp('msie (\\d+\\.\\d+);')
      reIE.test(agent)
      var fIEVersion = parseFloat(RegExp['$1'])
      if (fIEVersion === 7) {
        return {
          browser: 'ie',
          version: 7
        }
      } else if (fIEVersion === 8) {
        return {
          browser: 'ie',
          version: 8
        }
      } else if (fIEVersion === 9) {
        return {
          browser: 'ie',
          version: 9
        }
      } else if (fIEVersion === 10) {
        return {
          browser: 'ie',
          version: 10
        }
      }
    }
    if (isEdge) {
      return {
        browser: 'edge',
        version: (agent.match(/Edge\/[\d.]+/gi) + '').match(/[\d.]+/gi)[0]
      }
    }
    if (isIE11) {
      return {
        browser: 'ie',
        version: 11
      }
    }
    if (agent.indexOf('firefox') > 0) {
      return {
        browser: 'firefox',
        version: (agent.match(/firefox\/[\d.]+/gi) + '').match(/[\d.]+/gi)[0]
      }
    }
    if (agent.indexOf('safari') > 0 && agent.indexOf('chrome') < 0) {
      return {
        browser: 'safari',
        version: (agent.match(/version\/[\d.]+/gi) + '').match(/[\d.]+/gi)[0]
      }
    }
    if (agent.indexOf('chrome') > 0) {
      return {
        browser: 'chrome',
        version: (agent.match(/chrome\/[\d.]+/gi) + '').match(/[\d.]+/gi)[0]
      }
    }
  },
  // 检查浏览器是否支持
  checkBrowserSupport () {
    let browserInfo = this.getBrowserInfo()
    if (browserInfo.browser === 'ie' && parseInt(browserInfo.version) < 11) {
      return false
    } else {
      return true
    }
  },
  // 渲染浏览器不支持的情况
  renderBrowserNotSupport () {
    document.body.innerHTML = `<div style='display:table;width:100%;'>
      <h1 style='height: 100vh;vertical-align: middle;display: table-cell;width: 100%;text-align: center;'>
        浏览器版本过低，请升级到最新IE版本。推荐使用最新版360安全浏览器获取更好体验。
      </h1>
    </div>`
  },
  // 获取请求参数
  trimQueryData (data) {
    if (typeof data !== 'string') return data
    return data.split('&').map(item => {
      let qs = item.split('=')
      qs[1] = encodeURIComponent(decodeURIComponent(qs[1]).trim())
      return qs.join('=')
    }).join('&')
  },
  // 获取主机名
  getDomain () {
    let domain = ''
    if (isNaN(parseInt(location.hostname)) && location.hostname.indexOf('.') !== -1) {
      if (location.hostname.split('.').length > 2) {
        domain = location.hostname.substring(location.hostname.indexOf('.'))
      } else {
        domain = location.hostname
      }
    } else {
      domain = location.hostname
    }
    return domain
  },
  // 清除cookike
  removeCookieAllDomain (name) {
    let domain = this.getDomain()
    let ticketName = this.getEnvTicketName()
    if (domain[0] === '.') {
      // delete www.dev.local.com cookie
      Cookies.remove(ticketName)
      // delete .www.dev.local.com cookie
      Cookies.remove(ticketName, {path: '/', domain: location.hostname})
      // delete .dev.local.com, .local.com cookie and so much
      while (domain.split('.').length !== 2) {
        Cookies.remove(ticketName, {path: '/', domain: domain})
        domain = domain.substring(domain.indexOf('.', 1))
      }
    } else {
      Cookies.remove(ticketName, {path: '/', domain: domain})
    }
  }
}
