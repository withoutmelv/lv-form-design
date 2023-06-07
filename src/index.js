import Config from '../packages/config'
import FormDesign from '../packages/index.vue'
import Avue from '@smallwei/avue';

const install = (Vue) => {
    Vue.use(Config)
    Vue.use(Avue);
    Vue.component('Lv' + FormDesign.name, FormDesign)
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    install,
    FormDesign
}