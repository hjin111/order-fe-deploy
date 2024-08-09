// main.js 는 vue 애플리케이션의 시작점이다.

import { createApp } from 'vue'
import App from './App.vue'
// src/router/index.js 파일의 router를 사용하겠다는 선언
import router from '@/router/index.js'
import vuetify from '@/plugins/vuetify';
import '@mdi/font/css/materialdesignicons.css'
import { Calendar, DatePicker } from 'v-calendar';
import axios from 'axios';
import store from './store/index.js';
// createApp(App).mount('#app')

const app = createApp(App);

// axios 요청 인터셉터를 설정하여 모든 요청에 엑세스 토큰을 포함
axios.interceptors.request.use(
    config => {

        const token = localStorage.getItem('token');

        if(token){
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    error => {

        // 에러가 나면 해당 인터셉터가 무시되고, 사용자의 본래 요청인 화면으로 라우팅 된다.  
        return Promise.reject(error);
    }
)

// 401 응답을 받을 경우에 interceptor를 통해 전역적으로 rt를 통한 at 재발급
// 만약 rt도 401 응답을 받을 경우에 token 제거 후 login 화면으로 리다이렉트
axios.interceptors.response.use(
    response => response,
    async error => {

        if(error.response && error.response.status == 401){
            
            const refreshToken = localStorage.getItem('refreshToken');

            try{

                localStorage.removeItem('token');
                const response = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/refresh-token`, {refreshToken});
                console.log(response.data.result);
                localStorage.setItem('token', response.data.result.token);
                window.location.reload(); // 사용자가 토큰 사라진거 눈치 못채야 해서 화면을 reload를 해야 한다.

            }catch(e){

                localStorage.clear();
                window.location.href = "/login";

            }

        }

    }
)

app.use(store);
app.use(router);
app.use(vuetify);

app.component('VCalendar', Calendar); // 변경된 이름
app.component('VDatePicker', DatePicker); // 변경된 이름
app.mount('#app');
