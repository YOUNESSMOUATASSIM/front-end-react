import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import keycloak from "./Keycloak";
import {ReactKeycloakProvider} from "@react-keycloak/web";
import PrivateRoute from "./helpers/PrivateRoute";
import Navbar from "./components/Navbar";
import ListCustomers from "./pages/ListCustomers";
import AddCustomer from "./pages/AddCustomer";
import {Provider} from "react-redux";
import store from "./redux/store";
import ListProducts from "./pages/ListProducts";
import AddProduct from "./pages/AddProduct";
import ListBillings from "./pages/ListBillings";
import GenerateBill from "./pages/GenerateBill";
import ViewBill from "./pages/ViewBill";

const App = () => {
    return (
        <div>
            <ReactKeycloakProvider authClient={keycloak}>
                <Provider store={store}>
                    <BrowserRouter>
                        <Navbar />
                        <Routes>
                            <Route exact path="/" element={<HomePage />} />
                            <Route path="/customers" element={
                                <PrivateRoute>
                                    <ListCustomers />
                                </PrivateRoute>
                            } />
                            <Route path="/addcustomer" element={
                                <PrivateRoute>
                                    <AddCustomer />
                                </PrivateRoute>
                            } />
                            <Route path="/products" element={
                                <PrivateRoute>
                                    <ListProducts />
                                </PrivateRoute>
                            } />
                            <Route path="/addproduct" element={
                                <PrivateRoute>
                                    <AddProduct />
                                </PrivateRoute>
                            } />
                            <Route path="/billings" element={
                                <PrivateRoute>
                                    <ListBillings />
                                </PrivateRoute>
                            } />
                            <Route path="/generatebill" element={
                                <PrivateRoute>
                                    <GenerateBill />
                                </PrivateRoute>
                            } />
                            <Route path="/viewbill" element={
                                <PrivateRoute>
                                    <ViewBill />
                                </PrivateRoute>
                            } />
                        </Routes>
                    </BrowserRouter>
                </Provider>
            </ReactKeycloakProvider>
        </div>
    );
};

export default App;
