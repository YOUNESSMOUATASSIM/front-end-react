import {GENERATE_BILL_REQUEST, VIEW_BILL_REQUEST} from "./billingTypes";


const initialState = {
    bill: {
        billingDate: '',
        productItems: [],
        customer: {}
    },
}

const billingReducer = (state=initialState, action) => {
    switch(action.type) {
        case GENERATE_BILL_REQUEST:
            return {
                bill: action.payload,
            }
        case VIEW_BILL_REQUEST:
            console.log(action.payload)
            const newProductItems = [];
            action.payload.productItems.forEach(product => newProductItems.push(product));
            return {
                bill: {
                    billingDate: action.payload.billingDate,
                    productItems: newProductItems,
                    customer: action.payload.customer
                }
            }
        default:
            return state;
    }
}

export default billingReducer;