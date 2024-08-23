<template>
    <v-app-bar app dark><!-- heade 부에서 v-app바를 쓸것이다. -->
        <v-container>
            <v-row align="center">
                    <v-col class="d-flex justify-start">
                        <div v-if="userRole === 'ADMIN'" >
                        <v-btn :to="{path:'/member/list'}">회원관리</v-btn>
                        <v-btn :to="{path:'/product/manage'}">상품관리</v-btn>
                        <v-btn  href="/order/list">실시간 주문 {{liveQuantity}} </v-btn>
                        </div>
                    </v-col>   
                <v-col class="text-center">
                    <v-btn :to="{path:'/'}">hyejini shop</v-btn>
                </v-col>
                <v-col class="d-flex justify-end">
                    <v-btn v-if="isLogin" :to="{path:'/order/cart'}">장바구니({{ getTotalQuantity }})</v-btn>
                    <v-btn :to="{path:'/product/list'}">상품목록</v-btn>
                    <v-btn v-if="isLogin" :to="{path:'/mypage'}">MyPage</v-btn>
                    <v-btn v-if="!isLogin" :to="{path:'/member/create'}">회원가입</v-btn>
                    <v-btn v-if="!isLogin" :to="{path:'/login'}">로그인</v-btn>
                    <v-btn v-if="isLogin" @click="doLogout">로그아웃</v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-app-bar>
  </template>
  
  <script>
  import {mapGetters} from 'vuex';
  // 서버와 실시간 알림 서비스를 위한 의존성 추가 필요
  import {EventSourcePolyfill} from 'event-source-polyfill';

  // export default 를 통해 해당 화면을 다른 화면에서 사용가능한 컴포넌트로 만듬
  export default {
    data(){
        return {
            userRole: null,
            isLogin : false,
            liveQuantity : 0
        }
    },
    computed:{ // 참조하는 변수 값이 변했을때 실행되는 함수
        ...mapGetters(['getTotalQuantity']) // getCount 라는 값을 계속 바라보겠다.
    },
    created(){
        const token = localStorage.getItem("token");
        if(token){ // 만약 token이 있으면
            this.isLogin = true;
            this.userRole = localStorage.getItem("role");
        }
        if(this.userRole === 'ADMIN'){
            let sse = new EventSourcePolyfill(`${process.env.VUE_APP_API_BASE_URL}/subscribe`, { headers: {Authorization : `Bearer ${token}`}} );
            sse.addEventListener('connect', (event) => { 
                console.log(event) 
            });
            sse.addEventListener('ordered', (event) => { 
                console.log(event.data);
                this.liveQuantity++;
            });
            sse.onerror = (error) => {
                console.log(error);
                sse.close();
            }
        }
    },
    methods:{
        doLogout(){
            localStorage.clear();
            window.location.reload();
        }
    }
  };
  </script>
  