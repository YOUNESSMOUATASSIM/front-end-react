import React, {useState} from 'react';
import {
    Button,
    Container,
    makeStyles,
    MenuItem,
    MenuList,
    Modal,
    Paper,
    TextField,
    Typography
} from "@material-ui/core";
import {useNavigate} from "react-router-dom";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import {fetchProducts} from "../redux";
import {generateBill} from "../redux/billing/billingActions";
import {connect} from "react-redux";

const useStyles = makeStyles((theme) => ({
    generateBillContainer: {
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
        marginBottom: theme.spacing(2)
    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    menuList: {
        marginRight: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
}));

const rand = () => {
    return Math.round(Math.random() * 20) - 10;
}

const getModalStyle = () => {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const GenerateBill = ({generateBill, billingData}) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [bill, setBill] = useState({
        customerName: '',
        products: [],
    });
    const [product, setProduct] = useState({
        productName: '',
        quantity: '',
    });
    const [open, setOpen] = useState(false);
    const [modalStyle] = useState(getModalStyle);

    const handleChange = (e) => {
        setBill({
            ...bill,
            [e.target.id]: e.target.value
        })

    }

    const handleAddProductChange = (e) => {
        setProduct({
            ...product,
            [e.target.id]: e.target.value
        })

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(bill)
        const formProducts = [];
        bill.products.forEach(product => {
            product.quantity = Number(product.quantity);
            formProducts.push(product);
        });
        const newBill = {
            customerName: bill.customerName,
            customerProducts: formProducts
        }
        generateBill(newBill)
        navigate("/billings")
    }
    const handleSubmitProduct = (e) => {
        console.log(product)
        e.preventDefault();
        let newProducts  = [];
        bill.products.forEach(oldPorduct => newProducts.push(oldPorduct));
        newProducts.push(product)
        setBill({
                ...bill,
                products: newProducts,
            })
        setOpen(false)
        // createCustomer(customer)
        // fetchCustomers()
        // navigate("/customers")
    }
    const handleModal = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    };

    // const handleMenuItemClick = (productName) => {
    //     console.log("CLICKED: ", productName)
    //     const newProducts = [];
    //     bill.products.forEach(product => newProducts.push(product));
    //     newProducts.filter(product => product.productName !== productName);
    //     newProducts.forEach(product => console.log(product));
    //     setBill({
    //         ...bill,
    //         products: newProducts
    //     })
    // }

    const modalBody = (
        <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">Add Product</h2>
            <div className={classes.formContainer}>
                <form noValidate autoComplete="off" className={classes.form}>
                    <TextField id="productName" label="Product Name" variant="outlined" className={classes.formItem} onChange={handleAddProductChange}/>
                    <TextField id="quantity" label="Product Quantity" variant="outlined" className={classes.formItem} onChange={handleAddProductChange}/>
                    <div className={classes.formBtn} onClick={handleSubmitProduct}>
                        <Button variant="contained" color="primary" size="large" component="button">Add</Button>
                    </div>
                </form>
            </div>
        </div>
    );

    return (
        <Container className={classes.generateBillContainer}>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {modalBody}
            </Modal>
            <Typography variant="h6">Generate Bill</Typography>
            <div className={classes.formContainer}>
                <form noValidate autoComplete="off" className={classes.form}>
                    <TextField id="customerName" label="Customer Name" variant="outlined" className={classes.formItem} onChange={handleChange}/>
                    <div className={classes.formBtn} onClick={handleModal}>
                        <Button variant="contained" color="primary">Add Product</Button>
                    </div>
                    <div>
                        <Paper className={classes.menuList}>
                            <MenuList>
                                {bill.products.map(product => {
                                    return (
                                        <div style={{display: "flex", marginBottom: "10px"}}>
                                            <MenuItem key={product.productName}>{product.productName}</MenuItem>
                                            {/*<DeleteOutlineIcon onClick={() => handleMenuItemClick(product.productName)} style={{marginLeft: "90%"}}/>*/}
                                        </div>
                                )
                                })}
                            </MenuList>
                        </Paper>
                    </div>
                    <div className={classes.formBtn} onClick={handleSubmit}>
                        <Button variant="contained" color="primary" size="large" component="button">Generate</Button>
                    </div>
                </form>
            </div>
        </Container>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        generateBill: (bill) => dispatch(generateBill(bill))
    }
}


export default connect(null, mapDispatchToProps)(GenerateBill);
