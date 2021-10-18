import axios from "axios";
import Cookies from 'js-cookie';
import history from "src/helper/history/history"

import { apiBaseURL } from './baseURLconfig';


/**
 * Interceptors are a feature that allows an application to intercept requests or responses before they are handled by the .then() or the .catch().
 * There are 2 type of interceptor 1) interceptors.request   &&   2) interceptors.response
 * Both types of Axios interceptors accept two functions. 
 * The first function of the request interceptor modifies the request if it’s a valid, successful request, 
 * the second function handles when the request is invalid and throws an error.
 * 
 */


const axiosConfig = () => {
    const instance = axios.create();
    instance.defaults.baseURL = apiBaseURL;

    // interceptors Request------------------------------------
    instance.interceptors.request.use(
        async (config) => {
            let cookieToken = Cookies.get('reduxToolkitToken');
            let token = cookieToken ? cookieToken : '';

            if (!!token) {
                config.headers = {
                    ...config.headers,
                    Authorization: "bearer " + token
                };
            }
            return config;
        },
        (error) => {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
    );

    //validating the token expiration scenario --------------------------
    // interceptors Response------------------------------------
    instance.interceptors.response.use(
        (Response) => {
            return Response
        },
        (error) => {
            if (error.response.status === 401) {
                //dispatch action using store to show token expire popup-----
                // store.dispatch(tokenExpiryAction.start());
                // Cookies.remove('reduxToolkitToken')
                // window.location.pathname = "/"
                history.push("/")
                return new Promise((resolve, reject) => {
                    reject(error);
                });
            } else {
                return new Promise((resolve, reject) => {
                    reject(error);
                });
            }
        }
    );

    return instance;
}

export default axiosConfig;
