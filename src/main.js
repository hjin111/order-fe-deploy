// main.js 는 vue 애플리케이션의 시작점이다.

import { createApp } from 'vue'
import App from './App.vue'
// src/router/index.js 파일의 router를 사용하겠다는 선언
import router from '@/router/index.js'
import vuetify from '@/plugins/vuetify';
// createApp(App).mount('#app')
const app = createApp(App);

app.use(router);
app.use(vuetify);
app.mount('#app');
