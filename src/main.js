import Vue from 'vue'
import App from './App'

import LvFormDesign from '../packages/';
import Element from 'element-ui'
// import AvueUeditor from 'avue-plugin-ueditor'

Vue.use(window.AVUE)
Vue.use(LvFormDesign)
Vue.use(Element)
// Vue.use(AvueUeditor)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
