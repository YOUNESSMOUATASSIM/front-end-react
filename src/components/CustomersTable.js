import React, {useEffect, useState} from 'react';
import {
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow, Typography
} from "@material-ui/core";
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import {useHistory} from "react-router-dom";
import {deleteCustomer, fetchCustomers} from "../redux";
import {connect} from "react-redux";

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    icon: {
        cursor: "pointer"
    }
}));

const CustomerTable = ({ deleteCustomer, fetchCustomers, customerData}) => {
    const customers = customerData && customerData.customers;
    const classes = useStyles();
    const history = useHistory();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        console.log("FETCHING CUSTOMERS ON COMPONENT DID MOUNT")
        fetchCustomers();
    }, []);


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, customers.length - page * rowsPerPage);

    const handleUpdate = (customer) => {
        const customerId = customer.id;
        history.push(`/updatecustomer/${customerId}`);
    }

    const handleDelete = (customer) => {
        if(window.confirm("Confirmer la suppression ?!")) {
            deleteCustomer(customer);
        }
    }

    return (
        customers.length === 0 ? <Typography variant="h6">Aucune Données</Typography> :
            customerData.loading ? (
                <Typography variant="h6">Chargement des Données...</Typography>
            ) : customerData.error ? (
                <Typography variant="h6">ERREUR...</Typography>
            ) : (
                customerData.customers &&
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell align="right">Nom</TableCell>
                                <TableCell align="right">E-Mail</TableCell>
                                <TableCell align="right">Numéro de Téléphone</TableCell>
                                <TableCell align="right">Adresse</TableCell>
                                <TableCell align="right">Modifier</TableCell>
                                <TableCell align="right">Supprimer</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {customers
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((customer, index) => (
                                    <TableRow key={customer.id}>
                                        <TableCell component="th" scope="row">
                                            {customer.id}
                                        </TableCell>
                                        <TableCell align="right">{customer.name}</TableCell>
                                        <TableCell align="right">{customer.email}</TableCell>
                                        <TableCell align="right">{customer.phoneNumber}</TableCell>
                                        <TableCell align="right">{customer.address}</TableCell>
                                        <TableCell align="right" className={classes.icon} onClick={()=>handleUpdate(customer)}><CreateOutlinedIcon /></TableCell>
                                        <TableCell align="right" className={classes.icon} onClick={()=>handleDelete(customer)}><DeleteOutlineOutlinedIcon /></TableCell>
                                    </TableRow>
                                ))}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={customers.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </TableContainer>
            )
    );
};

const mapStateToProps = state => {
    return {
        customerData: state.customers
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteCustomer: (customer) => dispatch(deleteCustomer(customer)),
        fetchCustomers: () => dispatch(fetchCustomers())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerTable);
