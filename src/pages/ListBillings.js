import React from 'react';
import {Button, Container, makeStyles} from "@material-ui/core";
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    btns: {
        display: "flex",
        flexDirection: "row",
        marginTop: theme.spacing(2),
    },
    btn: {
        marginLeft: theme.spacing(2)
    }
}));

const ListBillings = () => {
    const classes = useStyles();
    return (
        <Container>
            <div className={classes.btns}>
                <Link to="/generatebill" style={{textDecoration: "none"}}>
                    <Button variant="contained" color="primary">Generate Bill</Button>
                </Link>
                <Link to="/viewbill" style={{textDecoration: "none"}}>
                    <Button variant="contained" color="primary" className={classes.btn}>View Bill</Button>
                </Link>

            </div>
        </Container>
    );
};

export default ListBillings;
