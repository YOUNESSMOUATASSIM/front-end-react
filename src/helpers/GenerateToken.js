import axios from "axios";

export const generateToken = () => {
    const params = new URLSearchParams()
    params.append('username', 'younes')
    params.append('password', 'younes')
    params.append('client_id', 'react_auth')
    params.append('grant_type', 'password')

    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
    return axios.post("http://localhost:8080/auth/realms/ecommerce-app-realm/protocol/openid-connect/token", params, config)
        .then(res => {
            const tokenStr = res.data.access_token;
            console.log("TOKEN: ", tokenStr)
            return tokenStr;
        })
        .catch(err => {
            console.log(err)
        })
}