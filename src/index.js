import FormDesign from './index.vue'

const install = (Vue) => {
    Vue.component('Lv' + FormDesign.name, FormDesign)
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    install,
    FormDesign
}