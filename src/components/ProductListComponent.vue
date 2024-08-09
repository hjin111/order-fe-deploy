<template>
    <v-container>
        <v-row class="d-flex justify-content-between mt-5">
            <v-col>
                <v-form @submit.prevent="searchProducts">
                    <v-row>
                        <v-col cols="auto">
                            <v-select
                            v-model="searchType"
                            :items="searchOptions"
                            item-title="text"
                            item-value="value"
                            >
                            </v-select>
                        </v-col>
                        <v-col>
                            <v-text-field
                            v-model="searchValue" label="Search"
                            >
                            </v-text-field>
                        </v-col>
                    <v-col cols="auto"><v-btn type="submit">검색</v-btn></v-col>
                </v-row>
                </v-form>
            </v-col>
            <v-col cols="auto" v-if="!isAdmin">
                <v-btn @click="addCart" color="secondary" class="mr-2">장바구니</v-btn>
                <v-btn @click="createOrder" color="success">주문하기</v-btn>
            </v-col>
            <v-col cols="auto" v-if="isAdmin">
                <v-btn href="/product/create" color="success">상품등록</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title class="text-h6 text-center">{{pageTitle}}</v-card-title>
                    <v-card-text>
                        <v-table>
                            <thead>
                                <tr>
                                    <th class="text-center">제품사진</th>
                                    <th>제품명</th>
                                    <th>가격</th>
                                    <th>재고수량</th>
                                    <th v-if="!isAdmin">주문수량</th>
                                    <th class="text-center"  v-if="!isAdmin">주문선택</th>
                                    <th v-if="isAdmin">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="p in productList" :key="p.id">
                                    <td>
                                        <v-img :src="p.imagePath" style="height:100px; width:auto;"></v-img>
                                    </td>
                                    <td>{{p.name}}</td>
                                    <td>{{p.price}}</td>
                                    <td>{{p.stockQuantity}}</td>
                                    <td>
                                        <v-text-field
                                        v-model.number="p.quantity"
                                        type="number"
                                        style="width: 70px;"
                                        >

                                        </v-text-field>
                                    </td>
                                    <td class="text-center" v-if="!isAdmin">
                                        <input type="checkbox" v-model="selected[p.id]">
                                    </td>
                                    <td v-if="isAdmin"><v-btn color="secondary" @click="deleteProduct(p.id)">삭제</v-btn></td>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>

import axios from 'axios';
import {mapGetters} from 'vuex';

export default{

    // isAdmin이 true인지 false인지 넘겨받는 곳
    props: ['isAdmin', 'pageTitle'],

    computed:{ // 참조하는 변수 값이 변했을때 실행되는 함수
        ...mapGetters(['getProductsInCart']) // getCount 라는 값을 계속 바라보겠다.
    },
    data(){
        return{


            searchType:'optional',
            searchOptions:[
                {text:"선택", value:'optional'},
                {text:"상품명", value:"name"},
                {text:"카테고리", value:"category"}

            ],

            searchValue:"",
            productList:[],

            pageSize: 5,
            currentPage:0,
            isLastPage : false,
            isLoading : false,

            // selected 예시 - 객체로 설계
            // 1:true // 1번 상품선택시
            // 2:false // 2번 상품선택X
            // 3:false // 3번 상품선택X
            // 4:true // 4번 상품선택시
            // {1:true, 2:false, 3:false, 4:true} 이런식으로 담기게 된다.
            selected:{}
            
        }
    },
    created(){
        this.loadProduct();
        window.addEventListener('scroll', this.scrollPagenation ) // 스크롤로 움직였을 때 scrollPagenation 이 함수 실행
    },
    beforeUnmount(){
        window.removeEventListener('scroll', this.scrollPagenation );
    },
    methods:{

        deleteProduct(productId){
            console.log(productId);
        },
        searchProducts(){
            console.log(this.searchType);
            console.log(this.searchValue);
            this.productList = [];
            this.currentPage = 0;
            this.isLastPage = false;
            this.isLoading = false;
            this.loadProduct();
        },
        async loadProduct(){

            try{

                // Pageable 객체에 맞게 파라미터 형식으로 데이터를 전송해줘야함
                // 방법1. {params:{page:10, size:2}}와 같은 형식으로 전송시 parameter 형식으로 변환 되어 서버로 전송 된다. ( url에다가 ? 달고 들어 가는 형식이다. )
                // 방법2. FormData 객체 생성 하여 서버로 데이터 전송
                if(this.isLoading || this.isLastPage ) return;
                this.isLoading = true;
                let params = {
                    size : this.pageSize,
                    page : this.currentPage
                }
                // params = {size:5, page:0, category:"fruits" } 또는 params = {size:5, page:0, name:"apple" }
                if(this.searchType === 'name'){
                    params.searchName = this.searchValue;
                }else if(this.searchType === 'category'){
                    params.category = this.searchValue;
                }

                // localhost:8080/product/list?category=fruites&size=5&page=0 또는 name=apple&size=5&page=0 
                const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/product/list`, {params}); //  {params} 중괄호 안에 params를 넣어서 {params:{page:10, size:2}} 이런 형태로 보낼 수 있음
                // this.productList = response.data.result.content;
                const additionalData = response.data.result.content.map( p =>  ({...p, quantity:0}));
                
                if(additionalData.length == 0){ // last 페이지 처리
                    this.isLastPage = true;
                    return;
                }

                this.productList = [...this.productList, ...additionalData]
                this.currentPage++;
                console.log(response.data);
                this.isLoading = false;

            }catch(e){
                console.log(e);
            }
           
        },
        scrollPagenation(){ // 스크롤이라는 동작이 화면상에서 인지되면 이 함수가 실행된다.

            // "현재화면 + 스크롤로 이동한 화면 > 전체화면 - n" 의 조건이 성립되면 추가 데이터 로드
            const isBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100; // 이 숫자가 작을수록 스크롤을 더 밑으로 내려야지만 경고창이 뜸 
            if(isBottom && !this.isLastPage && !this.isLoading){
                this.loadProduct();
            }

        },
        addCart(){
            const orderProducts = Object.keys(this.selected).filter(key=> this.selected[key])
                                    .map(key => {
                                        const product = this.productList.find(p=>p.id == key)
                                        return { id:product.id, name:product.name, quantity:product.quantity };
                                    });
            orderProducts.forEach( p => this.$store.dispatch('addCart', p ) );
            console.log(this.getProductsInCart);
            // window.location.reload();

        },
        async createOrder(){
            const orderProducts = Object.keys(this.selected).filter(key=> this.selected[key])
                                    .map(key => {
                                        const product = this.productList.find(p=>p.id == key)
                                        return {productId:product.id, productCount:product.quantity};
                                    });

            console.log(orderProducts);
            if(orderProducts.length < 1){
                alert("주문대상 물건이 없습니다.");
                return
            }
            const yesOrNo = confirm(`${orderProducts.length}개의 상품을 주문하시겠습니까?`);
            if(!yesOrNo){
                console.log("주문이 취소되었습니다.");
                return;
            }
            try{
                await axios.post(`${process.env.VUE_APP_API_BASE_URL}/order/create`, orderProducts);
                alert("주문완료되었습니다.")
                window.location.reload();
            }catch(e){
                console.log(e);
                alert("주문실패되었습니다.")
            }
           
        }
        
    }
}
</script>