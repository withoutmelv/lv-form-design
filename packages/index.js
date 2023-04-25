import Config from './config'
import FormDesign from './index.vue'

import { getAsVal, avueVersion } from './utils/index.js'

export default {
  install(Vue) {
    Vue.use(Config)
    Vue.component('Lv' + FormDesign.name, FormDesign);

    Vue.prototype.getAsVal = getAsVal
    Vue.prototype.avueVersion = avueVersion
  }
}
