import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import '@babel/polyfill';
import axios from 'axios';
import store from './store';
import VueFire from 'vuefire';

Vue.config.productionTip = false
axios.defaults.baseURL = 'http://localhost:3000/views';


/* Vue.use(VueFire); */

new Vue({
    router,
    store,
    VueFire,
    vuetify,
    render: h => h(App)
}).$mount('#app');