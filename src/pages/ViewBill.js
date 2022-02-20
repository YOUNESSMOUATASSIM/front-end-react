import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {viewBill} from "../redux/billing/billingActions";
import {Button, Container, TextField, Typography} from "@material-ui/core";
import ProductCard from "../components/ProductCard";

const ViewBill = ({viewBill, billingData}) => {
    const [billId, setBillId] = useState(-1);
    const [billingDate, setBillingDate] = useState('');
    const [productItems, setProductItems] = useState([]);
    const [customer, setCustomer] = useState({});

    useEffect(() => {
        const newProductItems = [];
        billingData.bill.productItems.forEach(product => newProductItems.push(product));
        setProductItems(newProductItems);
        setBillingDate(billingData.bill.billingDate);
        setCustomer(billingData.bill.customer);
    }, [billingData.bill]);


    const handleChange = (e) => {
        setBillId(Number(e.target.value));
    }

    const handleSubmit = () => {
        // console.log(billId)
        viewBill(billId);
    }

    return (
        <Container>
            <form noValidate autoComplete="off" style={{display: "flex", marginTop: "50px"}}>
                <TextField id="billId" label="Bill ID" variant="outlined" type="number" onChange={handleChange} style={{marginRight: "20px"}}/>
                <Button variant="contained" color="primary" size="large" component="button" onClick={handleSubmit}>View</Button>
            </form>
            {billingDate && productItems && customer && <div style={{border: "1px solid grey", marginTop: "10px", padding: "10px"}}>
                <div style={{marginTop: "30px"}}>
                    <Typography variant="h6">Billing Date: {billingDate}</Typography>
                    <Typography variant="h6">Customer: {customer.name}</Typography>
                </div>
                <div style={{display: "flex"}}>
                    {productItems.map(product => {
                        return <div style={{marginRight: "40px", marginTop: "50px"}}>
                            <ProductCard product={product.product} showDeleteIcon={false}/>
                        </div>
                    })}
                </div>
            </div>}
        </Container>

    );
};

const mapStateToProps = state => {
    return {
        billingData: state.billings
    }
}

const mapDispatchToProps = dispatch => {
    return {
        viewBill: (billId) => dispatch(viewBill(billId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewBill);
