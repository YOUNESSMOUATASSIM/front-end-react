import axios from "axios";
import {
    CREATE_PRODUCT_REQUEST,
    DELETE_PRODUCT_REQUEST,
    FETCH_PRODUCTS_ERROR,
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS
} from "./productTypes";
import {generateToken} from "../../helpers/GenerateToken";


export const fetchProductsRequest = () => {
    return {
        type: FETCH_PRODUCTS_REQUEST
    }
}
export const fetchProductsSuccess = (products) => {
    return {
        type: FETCH_PRODUCTS_SUCCESS,
        payload: products
    }
}
export const fetchProductsError= (error) => {
    return {
        type: FETCH_PRODUCTS_ERROR,
        payload: error
    }
}

// export const getSingleCustomerRequest = () => {
//     return {
//         type: GET_SINGLE_CUSTOMER_REQUEST,
//     }
// }
// export const getSingleCustomerSuccess = (customer) => {
//     return {
//         type: GET_SINGLE_CUSTOMER_SUCCESS,
//         payload: customer
//     }
// }
// export const getSingleCustomerError = (error) => {
//     return {
//         type: GET_SINGLE_CUSTOMER_ERROR,
//         payload: error
//     }
// }

export const createProductRequest = (product) => {
    return {
        type: CREATE_PRODUCT_REQUEST,
        payload: product
    }
}

// export const updateCustomerRequest = (customer) => {
//     return {
//         type: UPDATE_CUSTOMER_REQUEST,
//         payload: customer
//     }
// }

export const deleteProductRequest = (product) => {
    return {
        type: DELETE_PRODUCT_REQUEST,
        payload: product
    }
}


export const fetchProducts = () => {
    return async (dispatch) => {
        dispatch(fetchProductsRequest());
        const token = await generateToken()
        axios.get("http://localhost:8888/INVENTORY-SERVICE/products", {headers: {"Authorization": `Bearer ${token}`}})
            .then(response => {
                const products = response.data;
                dispatch(fetchProductsSuccess(products));
            })
            .catch(error => {
                const errorMsg = error.message;
                console.log(error)
                dispatch(fetchProductsError(errorMsg));
            })

    }
}

export const createProduct = (product) => {
    return async (dispatch) => {
        const token = await generateToken()
        axios.post("http://localhost:8888/INVENTORY-SERVICE/products", product, {headers: {"Authorization": `Bearer ${token}`}})
            .then(res => {
                const newProduct = res.data;
                dispatch(createProductRequest(newProduct))
            })
            .catch(err => {
                console.log(err);
            })
    }
}

// export const getCustomer = (customerId) => {
//     return (dispatch) => {
//         dispatch(getSingleCustomerRequest());
//         axios.get(`http://localhost:8000/customers?id=${customerId}`)
//             .then(response => {
//                 const customer = response.data;
//                 dispatch(getSingleCustomerSuccess(customer));
//             })
//             .catch(error => {
//                 const errorMsg = error.message;
//                 dispatch(getSingleCustomerError(errorMsg));
//             })
//     }
// }
//
// export const updateCustomer = (customerId, customer) => {
//     return (dispatch) => {
//         axios.put(`http://localhost:8000/customers/${customerId}`, customer)
//             .then(res => {
//                 const updatedCustomer = res.data;
//                 dispatch(updateCustomerRequest(updatedCustomer))
//             })
//             .catch(err => {
//                 console.log(err);
//             })
//     }
// }

export const deleteProduct = (product) => {
    return async (dispatch) => {
        const token = await generateToken()
        axios.delete(`http://localhost:8888/INVENTORY-SERVICE/products/${product.id}`, {headers: {"Authorization": `Bearer ${token}`}})
            .then(res => {
                console.log(res.data);
                dispatch(deleteProductRequest(product))
                dispatch(fetchProducts())
            })
            .catch(err => {
                console.log(err);
            })
    }
}


