import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import vuetify from 'vuetify';
import './axios'
import './style.css'
import App from './App.vue'

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(vuetify);

app.mount('#app');
