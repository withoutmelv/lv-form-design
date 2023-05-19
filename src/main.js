import Vue from 'vue'
import App from './App'

import LvFormDesign from '../packages/';
import AvueUeditor from 'avue-plugin-ueditor'
import Element from 'element-ui'
import Avue from '@smallwei/avue';
import 'element-ui/lib/theme-chalk/index.css';
import '@smallwei/avue/lib/index.css';

Vue.use(Avue);
Vue.use(LvFormDesign)
Vue.use(Element)
Vue.use(AvueUeditor)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
