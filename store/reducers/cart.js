import {ADD_TO_CART} from '../actions/cart'
import CartItem from '../../models/cart-item'

const initialState = {
    items: {},
    totalCost: 0
}

export default  (state = initialState, action) => {
    switch(action.type){
        case ADD_TO_CART: 
            const addedProduct = action.payload.value 
            const productPrice = addedProduct.price 
            const productTitle = addedProduct.title 

            let newOrUpdatedCartItem;

            if (state.items[addedProduct.id]){
                // already have item
                newOrUpdatedCartItem = new CartItem(
                    state.items[addedProduct.id].quantity + 1, 
                    productPrice,
                    productTitle,
                    state.items[addedProduct.id].sum + productPrice
                ) 
            } else {
                newOrUpdatedCartItem = new CartItem(1, productPrice, productTitle, productPrice)
            }
            return {
                ...state, 
                items: {
                    ...state.items, [addedProduct.id]: newOrUpdatedCartItem
                },
                totalCost: state.totalCost + productPrice
            }
            
        default:
            return state;
    }
}