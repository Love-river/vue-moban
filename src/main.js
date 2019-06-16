import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as utils from '@/utils'
import './assets/filter'
import com from './assets/common'
import constant from './assets/constant'
import rules from './assets/rules'
import moment from 'moment'
import _ from 'lodash'


Vue.prototype.$moment = moment
Vue.prototype.$_ = _
Vue.prototype.$com = com
Vue.prototype.$constant = constant
Vue.prototype.$rules = rules
// 引入svg-icon组件
import './components/SvgIcon'

// 引入css
import './assets/scss/index.scss'

Vue.config.productionTip = false

// 全局方法
window.common = {
  showLoading: utils.showLoading,
  hideLoading: utils.hideLoading,
  showToast: utils.showToast,
  hideToast: utils.hideToast
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
