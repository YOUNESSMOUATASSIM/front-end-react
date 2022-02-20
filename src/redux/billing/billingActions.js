import {GENERATE_BILL_REQUEST, VIEW_BILL_REQUEST} from "./billingTypes";
import {generateToken} from "../../helpers/GenerateToken";
import axios from "axios";

export const generateBillRequest = (bill) => {
    return {
        type: GENERATE_BILL_REQUEST,
        payload: bill
    }
}

export const viewBillRequest = (bill) => {
    return {
        type: VIEW_BILL_REQUEST,
        payload: bill
    }
}

export const generateBill = (bill) => {
    return async (dispatch) => {
        const token = await generateToken();
        console.log(bill)
        axios.post("http://localhost:8888/BILLING-SERVICE/generateBill", bill, {headers: {"Authorization": `Bearer ${token}`}})
            .then(res => {
                console.log("RES DATA: ", res.data)
                dispatch(generateBillRequest(bill))
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export const viewBill = (billId) => {
    return async (dispatch) => {
        const token = await generateToken();
        axios.get(`http://localhost:8888/BILLING-SERVICE/fullBill/${billId}`, {headers: {"Authorization": `Bearer ${token}`}})
            .then(res => {
                console.log("RES DATA: ", res.data)
                const billData = res.data;
                dispatch(viewBillRequest(billData))
            })
            .catch(err => {
                console.log(err);
            })
    }
}
