import {ADD_TO_CART, REMOVE_FROM_CART} from '../actions/cart'
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
            case REMOVE_FROM_CART: 
                const selectedCartItem = state.items[action.payload.value];
                const currentQuantity = selectedCartItem.quantity;
                let updatedCartItems;
                if (currentQuantity > 1){
                    // need to reduce quantity
                    const updatedCartItem = new CartItem(
                        selectedCartItem.quantity - 1, 
                        selectedCartItem.productPrice, 
                        selectedCartItem.productTitle,
                        selectedCartItem.sum - selectedCartItem.productPrice
                        )
                        updatedCartItems = {...state.items, [action.payload.value]: updatedCartItem}

                } else {
                    // need to erase item from cart
                    updatedCartItems = {...state.items}
                    delete updatedCartItems[action.payload.value]
                }
                return {
                    ...state,
                    items: updatedCartItems,
                    totalCost: state.totalCost - selectedCartItem.productPrice
                }
        default:
            return state;
    }
}