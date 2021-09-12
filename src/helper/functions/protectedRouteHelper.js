import { Fragment } from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import Cookies from 'js-cookie';

export const ProtectedRoute = (props) => {
    let cookieToken = Cookies.get('reduxToolkitToken');
    const location = useLocation();
    let isAuthLogin = cookieToken
    return (
        <Fragment>
            {isAuthLogin ?
                (
                    <Route {...props} />
                ) : (
                    <Redirect to={{ pathname: "/", state: { from: location } }} />
                )
            }
        </Fragment>
    )
};
