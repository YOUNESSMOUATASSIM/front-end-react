import React, {useState} from 'react';
import {Button, Container, makeStyles, TextField, Typography} from "@material-ui/core";
import {useNavigate} from "react-router-dom";
import {createProduct, fetchProducts} from "../redux";
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


const AddProduct = ({createProduct, fetchProducts}) => {
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        quantity: ''
    });

    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.id]: e.target.value
        })

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newProduct = {
            name: product.name,
            description: product.description,
            price: Number(product.price),
            quantity: Number(product.price)
        }
        console.log("PRODUCT: ", newProduct)

        createProduct(product)
        fetchProducts()
        navigate("/products")

    }

    const classes = useStyles();
    return (
        <Container className={classes.addCustomerContainer}>
            <Typography variant="h6">Add Customer</Typography>
            <div className={classes.formContainer}>
                <form noValidate autoComplete="off" className={classes.form}>
                    <TextField id="name" label="Name" variant="outlined" className={classes.formItem} onChange={handleChange}/>
                    <TextField id="description" label="Description" variant="outlined" className={classes.formItem} onChange={handleChange}/>
                    <TextField id="price" label="Price" type="number" variant="outlined" className={classes.formItem} onChange={handleChange}/>
                    <TextField id="quantity" label="Quantity" type="number" variant="outlined" className={classes.formItem} onChange={handleChange}/>
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
        createProduct: (product) => dispatch(createProduct(product)),
        fetchProducts: () => dispatch(fetchProducts())
    }
}


export default connect(null, mapDispatchToProps)(AddProduct);
