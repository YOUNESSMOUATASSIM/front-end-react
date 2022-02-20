import {
    CREATE_PRODUCT_REQUEST,
    DELETE_PRODUCT_REQUEST,
    FETCH_PRODUCTS_ERROR,
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS
} from "./productTypes";

const initialState = {
    loading: false,
    products: [],
    product: {},
    error: '',
}

const productReducer = (state=initialState, action) => {
    switch(action.type) {
        // PRODUCTS
        case FETCH_PRODUCTS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_PRODUCTS_SUCCESS:
            return {
                loading: false,
                products: action.payload,
                product: {},
                error: '',
            }
        case FETCH_PRODUCTS_ERROR:
            return {
                loading: false,
                products: [],
                product: {},
                error: action.payload,
            }

        // // SINGLE CUSTOMER
        // case GET_SINGLE_CUSTOMER_REQUEST:
        //     return {
        //         ...state,
        //         loading: true
        //     }
        // case GET_SINGLE_CUSTOMER_SUCCESS:
        //     return {
        //         loading: false,
        //         customers: [],
        //         customer: action.payload,
        //         error: '',
        //     }
        // case GET_SINGLE_CUSTOMER_ERROR:
        //     return {
        //         loading: false,
        //         customer: {},
        //         customers: [],
        //         error: action.payload,
        //     }
        case CREATE_PRODUCT_REQUEST:
            return {
                loading: false,
                products: [],
                product: action.payload,
                error: '',
            }
        // case UPDATE_CUSTOMER_REQUEST:
        //     return {
        //         loading: false,
        //         customers: [],
        //         customer: action.payload,
        //         error: '',
        //     }
        case DELETE_PRODUCT_REQUEST:
            return {
                ...state,
                loading: false,
            }
        default:
            return state;
    }
}

export default productReducer;