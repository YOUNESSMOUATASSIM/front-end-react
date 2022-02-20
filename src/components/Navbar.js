import React from 'react';
import {AppBar, Button, makeStyles, Toolbar, Typography,} from "@material-ui/core";
import {useKeycloak} from "@react-keycloak/web";
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    navbar: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        cursor: "pointer"
    },
    navbarLink: {
        textDecoration: "none",
        color: "white"
    }
}));

const Navbar = () => {
    const classes = useStyles();
    const { keycloak, initialized } = useKeycloak();

    return (
        <div className={classes.navbar}>
            <AppBar position="static" elevation={0}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Ecommerce App
                    </Typography>
                    {!keycloak.authenticated && (
                        <Button color="inherit" onClick={() => keycloak.login()}>Login</Button>
                    )}
                    {!!keycloak.authenticated && (
                        <>
                            <Link to="/" className={classes.navbarLink}>
                                <Button color="inherit">Home</Button>
                            </Link>
                            <Link to="/products"  className={classes.navbarLink}>
                                <Button color="inherit">Products</Button>
                            </Link>
                            <Link to="/customers" className={classes.navbarLink}>
                                <Button color="inherit">Customers</Button>
                            </Link>
                            <Link to="/billings" className={classes.navbarLink}>
                                <Button color="inherit">Billing</Button>
                            </Link>
                            <Button color="inherit" onClick={() => keycloak.logout()}>Logout ({keycloak.tokenParsed.preferred_username})</Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Navbar;
