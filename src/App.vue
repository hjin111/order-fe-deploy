<template>
  <!-- <HelloWorld /> -->
  <!-- router-view를 통해 app.vue에서 화면 라우팅이 시작 된다.-->
  <v-app>
    <HeaderComponent />
    <v-main>
      <router-view />
    </v-main>
    <FooterComponent />
  </v-app>
 
</template>
<!-- template에는 html 코드(html body 부분이 들어감)가 들어가고, script에는 js 코드가 들어감, 디자인은 style 태그 안에 들어감 -->
<!-- vue 파일 안에는 head 태그가 없고, head의 공통 import 사항은 main.js에다가 구성 --> 
<script>
// App.vue는 Vue애플리케이션의 루트 컴포넌트(최상단 화면, 재활용이 가능한 화면)
// import HelloWorld from './components/HelloWorld.vue'
import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue';
export default {
  name: 'App',
  components: {
    // HelloWorld
    HeaderComponent
    , FooterComponent
  }
}
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
