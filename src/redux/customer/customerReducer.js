import {
    CREATE_CUSTOMER_REQUEST,
    DELETE_CUSTOMER_REQUEST,
    FETCH_CUSTOMERS_ERROR,
    FETCH_CUSTOMERS_REQUEST,
    FETCH_CUSTOMERS_SUCCESS,
} from "./customerTypes";

const initialState = {
    loading: false,
    customers: [],
    customer: {},
    error: '',
}

const customerReducer = (state=initialState, action) => {
    switch(action.type) {
        // CUSTOMERS
        case FETCH_CUSTOMERS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_CUSTOMERS_SUCCESS:
            return {
                loading: false,
                customers: action.payload,
                customer: {},
                error: '',
            }
        case FETCH_CUSTOMERS_ERROR:
            return {
                loading: false,
                customers: [],
                customer: {},
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
        case CREATE_CUSTOMER_REQUEST:
            return {
                loading: false,
                customers: [],
                customer: action.payload,
                error: '',
            }
        // case UPDATE_CUSTOMER_REQUEST:
        //     return {
        //         loading: false,
        //         customers: [],
        //         customer: action.payload,
        //         error: '',
        //     }
        case DELETE_CUSTOMER_REQUEST:
            return {
                ...state,
                loading: false,
            }
        default:
            return state;
    }
}

export default customerReducer;