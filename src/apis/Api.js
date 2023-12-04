import axios from "axios";

const SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const DEFAULT_URL = `http://${SERVER_IP}:${SERVER_PORT}/hc-app/v1`;

export const request = async (method, url, headers, data) => {

    console.log('request 인자', method)
    console.log('request 인자', `${DEFAULT_URL}${url}`)
    console.log('request 인자', headers)
    console.log('request 인자', data)

    return await axios({
        method,
        url : `${DEFAULT_URL}${url}`,
        headers,
        data
    })
        .catch(error => console.log(error));
}