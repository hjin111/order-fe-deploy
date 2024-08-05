<template>
    <!-- HTML 요소의 동적 값 표시 -->
    <!-- html 요소 안에 중괄호 2번 사용함으로써 script에 정의된 변수 값을 화면에 표시한다.-->
    <h1>hello world {{ language }}</h1>

    <!-- :value 문법을 사용하면 단방향 데이터 바인딩 -->
    <input type="text" :value="value1">
    <!-- v-model 문법을 사용하면 양방향 데이터 바인딩 -->
    <input type="text" v-model="value2">

    <button @click="showValue">변수변경사항확인</button>

    <h1>{{ count }}</h1>
    <button @click="increament()">increment</button>

    <h1>{{ doubleCount }}</h1>

    <br>
    <input type="number" v-model="count2">
    <button @click="increament2()">increment2</button>

</template>
<script>
    export default{
        data(){
            return{
                language:"java",
                value1:"phython", // 여기에 데이터가 위에 있는 화면으로 데이터가 바인딩 됨
                value2:"java",
                count:0,
                count2:0,
                isLogin : false
            }
        },

        // computed는 종속된 반응형 데이터가 변경될때에 함수를 다시 실행하여 값을 계산하는 함수 
        computed: {
            doubleCount(){
                return this.count * 2;
            }
        },
        created(){
            alert("CREATED 함수 호출")
        },
        methods:{
            showValue(){
                alert(this.value2);

            },

            increament(){
                this.count++;
            },

            increament2(){
                this.count2 += 1;
            }
        }
    }
</script>