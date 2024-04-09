import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import './axios'
import './style.css'
import App from './App.vue'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import * as styles from 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
    components,
    directives,
    styles
});

const pinia = createPinia();
const app = createApp(App);
// Enable routing inside pinia store
pinia.use(({store}) => {
    store.router = markRaw(router);
});
app.use(pinia);
app.use(router);
app.use(vuetify);

app.mount('#app');
