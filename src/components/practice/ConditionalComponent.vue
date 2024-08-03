<template>
    <h1>conditional component</h1>

    <button @click="login">{{value}}</button>
    <div v-if="isLogined">환영합니다 고객님</div>
    <div v-else>로그인해주세요</div>

    <h1>상품목록조회</h1>
    <ul>
        <!-- v-for에서는 반드시 key 값을 지정. key를 지정함으로써 각 요소마다의 고유식별 -->
        <li v-for="product in products" :key="product.id">{{ product.name }}</li>
    </ul>

</template>
<script>
    export default{
        data(){
            return{
                isLogined:false,
                value:"로그인",
                products:[
                    {id:1, name:"apple"},
                    {id:2, name:"banana"},
                    {id:3, name:"strawberry"}
                ],
            }
        },
        methods: {
            login(){
                
                if(this.isLogined){
                    this.isLogined=false;
                    this.value="로그인";
                }else{
                    this.isLogined=true;
                    this.value="로그아웃";
                }
            }
        }
    }
</script>