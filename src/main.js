import {createApp} from 'vue';
import App from './App.vue'
import router from './router';
import {IonicVue} from '@ionic/vue';
import axios from 'axios';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';
import './master.css';

const app = createApp(App)
    .use(IonicVue)
    .use(router);

app.config.globalProperties.$http = axios.create({
    baseURL: 'http://localhost:3000',
});

app.config.globalProperties.$http.interceptors.request.use(
    config => {
        if (localStorage.getItem('token') !== '') {
            config.headers.common["X-JWT"] = `${localStorage.getItem('token')}`;
        }
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject(error);
    }
);


router.isReady().then(() => {
    app.mount('#app');
});