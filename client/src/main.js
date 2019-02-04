// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VeeValidate from 'vee-validate';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import _ from 'lodash';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import DateFilter from './filters/dateFilter'
import DateFilterWithoutDay from './filters/dateFilterWithoutDay'
import DateTimeFilter from './filters/dateTimeFilter'
import { Base64 } from 'js-base64';
import '@fortawesome/fontawesome-free/css/all.css'

import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css';
import VueI18n from 'vue-i18n'
import translations from './translations'

import {
  Vuetify,
  VApp,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VBtnToggle,
  VIcon,
  VGrid,
  VTextField,
  VTextarea,
  VToolbar,
  VCard,
  VExpansionPanel,
  VDataTable,
  VSelect,
  VSubheader,
  VCheckbox,
  VDialog,
  VChip,
  VMenu,
  VTabs,
  VTooltip,
  VDatePicker,
  VSnackbar,
  VDivider,
  VAutocomplete,
  VAvatar,
  VProgressCircular,
  VSwitch,
  VProgressLinear,
  transitions
} from 'vuetify'
import './stylus/main.styl'

import App from './App'
import router from './router'
import { store } from './store'
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

//library.add(faCoffee)

//Vue.component('font-awesome-icon', FontAwesomeIcon)



Vue.use(ElementUI, { locale } );

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VBtnToggle,
    VIcon,
    VGrid,
    VTextField,
    VTextarea,
    VToolbar,
    VCard,
    VExpansionPanel,
    VDataTable,
    VSelect,
    VSubheader,
    VCheckbox,
    VDialog,
    VChip,
    VMenu,
    VTabs,
    VTooltip,
    VDatePicker,
    VSnackbar,
    VDivider,
    VAutocomplete,
    VAvatar,
    VProgressCircular,
    transitions,
    VSwitch,
    VProgressLinear,
    iconfont: 'fa'
  }
})



Vue.use(VeeValidate);
Vue.use(VueI18n);
Vue.filter('dateFilter', DateFilter);
Vue.filter('dateFilterWithoutDay', DateFilterWithoutDay);
Vue.filter('dateTimeFilter', DateTimeFilter);
Vue.config.productionTip = false

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'ru', // set locale
  messages:translations, // set locale messages
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  template: '<App/>',
  components: { App },

})
