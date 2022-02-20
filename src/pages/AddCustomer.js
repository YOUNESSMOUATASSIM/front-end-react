import React, {useState} from 'react';
import {Button, Container, makeStyles, TextField, Typography} from "@material-ui/core";
import {useNavigate} from "react-router-dom";
import {createCustomer, fetchCustomers} from "../redux";
import {connect} from "react-redux";
// import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    addCustomerContainer: {
        marginTop: theme.spacing(2)
    },
    formContainer: {
        background: "white",
        padding: theme.spacing(2),
        marginTop: theme.spacing(2),
        borderRadius: theme.spacing(1),
    },
    form: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        marginTop: theme.spacing(2),
    },
    formItem: {
        marginBottom: theme.spacing(2)
    },
    formBtn: {
        width: "100%",
    }
}));


const AddCustomer = ({createCustomer, fetchCustomers}) => {
    const navigate = useNavigate();
    const [customer, setCustomer] = useState({
        name: '',
        email: '',
    });

    const handleChange = (e) => {
        setCustomer({
            ...customer,
            [e.target.id]: e.target.value
        })

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(customer)
        createCustomer(customer)
        fetchCustomers()
        navigate("/customers")

    }

    const classes = useStyles();
    return (
        <Container className={classes.addCustomerContainer}>
            <Typography variant="h6">Add Customer</Typography>
            <div className={classes.formContainer}>
                <form noValidate autoComplete="off" className={classes.form}>
                    <TextField id="name" label="Name" variant="outlined" className={classes.formItem} onChange={handleChange}/>
                    <TextField id="email" label="Email" variant="outlined" className={classes.formItem} onChange={handleChange}/>
                    <div className={classes.formBtn} onClick={handleSubmit}>
                        <Button variant="contained" color="primary" size="large" component="button">Add</Button>
                    </div>
                </form>
            </div>
        </Container>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        createCustomer: (customer) => dispatch(createCustomer(customer)),
        fetchCustomers: () => dispatch(fetchCustomers())
    }
}


export default connect(null, mapDispatchToProps)(AddCustomer);
