function initState(){
    return{
        // 카트에 담겨있는 상품이 먼지
        // 로컬 스토리지에서 역직렬화해서 데이터 추출
        productsInCart : JSON.parse(localStorage.getItem('productsInCart')) || [], // localStorage 에서 아이템이 있으면 꺼내오고 없으면 빈 배열
        // 총 개수
        totalQuantity : localStorage.getItem('totalQuantity') || 0
    }
}



const practice={
    // state : 상태를 의미하는 객체로써 initState를 통해 상태 초기화
    state: initState,
    // 상태를 변경하기 위한 함수들의 집합
    // mutation은 컴포넌트에서 직접 호출 되기 보다는, actions를 통해 mutation이 호출
    // 그 이유는 여러 mutation을 연속적으로 호출하는 등의 경우가 있을 수 있기 때문이다.
    mutations:{
        addCart( state, product ){
            
            const existProduct = state.productsInCart.find(p => p.id == product.id);
            if(existProduct){
                existProduct.quantity += product.quantity;
            }else {
                state.productsInCart.push(product);
            }

            state.totalQuantity = parseInt(state.totalQuantity) + product.quantity;
            // 로컬스토리지에 데이터 직렬화하여 삽입(보내기) / 로컬스토리지에 저장
            localStorage.setItem('productsInCart', JSON.stringify(state.productsInCart)); // 값을 넣을때는 직렬화 해서 집어넣고
            localStorage.setItem('totalQuantity', state.totalQuantity);
        },
        clearCart(state){
            state.productsInCart = [];
            state.totalQuantity = 0;
            localStorage.removeItem('productsInCart');
            localStorage.removeItem('totalQuantity');
        }
        
        
    },
    actions:{
        // 아래와 같이 actions의 함수를 통해 mutation의 함수를 호출
        // 그러면 결국, 컴포넌트에서는 actions의 함수를 호출한다.
        addCart(context, product){
            context.commit('addCart', product);
        },
        clearCart(context){
            context.commit('clearCart');
        }
        
    },
    // 상태(변수)를 get 하기 위한 함수들의 집합
    getters:{
        getTotalQuantity : state => state.totalQuantity,
        getProductsInCart : state => state.productsInCart
    }
}
export default practice;