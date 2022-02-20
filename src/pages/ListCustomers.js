import React from 'react';
import {Button, Container, makeStyles} from "@material-ui/core";
import CustomerTable from "../components/CustomerTable";
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    accountContainer: {
        display: "flex",
        flexDirection: "column",
        height: "100vh"
    },
    addSection: {
        marginTop: theme.spacing(4),
        height: "10%",
        display: "flex",
    },
    addTable: {
        height: "90%",
        marginTop: theme.spacing(2)
    },
    addBtn: {
        margin: theme.spacing(1),
        cursor: "pointer",
    },
    addLink:{
        textDecoration: "none"
    }
}));

const ListCustomers = () => {
    const classes = useStyles();
    return (
        <Container>
            <div className={classes.accountContainer}>
                <div className={classes.addSection}>
                    <Link to="/addcustomer" className={classes.addLink}>
                        <Button variant="contained" color="primary" size="medium" className={classes.addBtn}>
                            Add Customer
                        </Button>
                    </Link>
                </div>
                <div className={classes.addTable}>
                    <CustomerTable />
                </div>
            </div>
        </Container>
    );
};

export default ListCustomers;
