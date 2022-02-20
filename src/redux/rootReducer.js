import {combineReducers} from "redux";
import customerReducer from "./customer/customerReducer";
import productReducer from "./product/productReducer";
import billingReducer from "./billing/billingReducer";

const rootReducer = combineReducers({
    customers: customerReducer,
    products: productReducer,
    billings: billingReducer
})

export default rootReducer;
