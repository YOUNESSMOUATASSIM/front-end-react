import {
    CREATE_CUSTOMER_REQUEST,
    DELETE_CUSTOMER_REQUEST,
    FETCH_CUSTOMERS_ERROR,
    FETCH_CUSTOMERS_REQUEST,
    FETCH_CUSTOMERS_SUCCESS,
    // GET_SINGLE_CUSTOMER_ERROR,
    // GET_SINGLE_CUSTOMER_REQUEST,
    // GET_SINGLE_CUSTOMER_SUCCESS,
    // UPDATE_CUSTOMER_REQUEST
} from "./customerTypes";
import axios from "axios";
import {generateToken} from "../../helpers/GenerateToken";


export const fetchCustomersRequest = () => {
    return {
        type: FETCH_CUSTOMERS_REQUEST
    }
}
export const fetchCustomersSuccess = (customers) => {
    return {
        type: FETCH_CUSTOMERS_SUCCESS,
        payload: customers
    }
}
export const fetchCustomersError= (error) => {
    return {
        type: FETCH_CUSTOMERS_ERROR,
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

export const createCustomerRequest = (customer) => {
    return {
        type: CREATE_CUSTOMER_REQUEST,
        payload: customer
    }
}

// export const updateCustomerRequest = (customer) => {
//     return {
//         type: UPDATE_CUSTOMER_REQUEST,
//         payload: customer
//     }
// }

export const deleteCustomerRequest = (customer) => {
    return {
        type: DELETE_CUSTOMER_REQUEST,
        payload: customer
    }
}

export const fetchCustomers = () => {
    return async (dispatch) => {
        const token = await generateToken();
        dispatch(fetchCustomersRequest());
        axios.get("http://localhost:8888/CUSTOMER-SERVICE/customers", {headers: {"Authorization": `Bearer ${token}`}})
            .then(response => {
                const customers = response.data;
                dispatch(fetchCustomersSuccess(customers));
            })
            .catch(error => {
                const errorMsg = error.message;
                dispatch(fetchCustomersError(errorMsg));
            })
    }
}

export const createCustomer = (customer) => {
    return async (dispatch) => {
        const token = await generateToken();
        const updatedCustomer = {
            id: customer.id,
            name: customer.name,
            price: Number(customer.price),
            description: Number(customer.description),
            quantity: customer.quantity
        }
        console.log(updatedCustomer)
        axios.post("http://localhost:8888/CUSTOMER-SERVICE/customers", customer, {headers: {"Authorization": `Bearer ${token}`}})
            .then(res => {
                const newCustomer = res.data;
                dispatch(createCustomerRequest(newCustomer))
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

export const deleteCustomer = (customer) => {
    return async (dispatch) => {
        const token = await generateToken();
        axios.delete(`http://localhost:8888/CUSTOMER-SERVICE/customers/${customer.id}`, {headers: {"Authorization": `Bearer ${token}`}})
            .then(res => {
                dispatch(deleteCustomerRequest(customer))
                dispatch(fetchCustomers())
            })
            .catch(err => {
                console.log(err);
            })
    }
}


