import Keycloak from "keycloak-js";
const keycloak = new Keycloak({
    url: "http://localhost:8080/auth",
    realm: "ecommerce-app-realm",
    clientId: "react_auth",
});

export default keycloak;