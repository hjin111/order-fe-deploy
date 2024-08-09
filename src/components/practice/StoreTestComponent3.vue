<template>
    <h1>StoreTestComponent3</h1>
    <p>count : {{getCount}}</p>
    <p>message : {{getMessage}}</p>
</template>

<script>
import { mapGetters } from 'vuex'
export default{
   computed : {
    ...mapGetters(['getCount','getMessage'])
   }
}
</script>