<template>
    <h1>StoreTestComponent2</h1>
    <p>count : {{getCount}}</p>
    <v-btn color="red" @click="incrementCount">increment count</v-btn>

    <input type="text" v-model="message" >
    <v-btn color="red" @click="updateMessage">update message</v-btn>

</template>

<script>
import {mapGetters} from 'vuex';
export default{
    data(){
        return{
            count:0,
            message:""
        }
    },
    computed:{ // 참조하는 변수 값이 변했을때 실행되는 함수
        ...mapGetters(['getCount']) // getCount 라는 값을 계속 바라보겠다.
    },
    methods:{
        incrementCount(){
            // this.count++;
            this.$store.dispatch('incrementCount')
        },
        updateMessage(){
            this.$store.dispatch('updateMessage', this.message)
        }
    }
}
</script>