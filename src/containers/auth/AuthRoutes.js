import React, { Fragment } from 'react'
import { Switch, Route } from 'react-router'
import { ProtectedRoute } from 'src/helper/functions/protectedRouteHelper'

import PageNotFound from 'src/containers/pages/pageNotFound/PageNotFound';
import UserSignup from "src/containers/auth/userSignup/UserSignup"
import UserSignin from "src/containers/auth/userSignin/UserSignin"
import UserUpdate from "src/containers/auth/userUpdate/UserUpdate"
import UserRetrieveProfile from "src/containers/auth/userRetrieveProfile/UserRetrieveProfile"


function AuthRoutes() {


    return (
        <Fragment>
            <Switch>
                <Route exact path="/user/register" render={(props) => <UserSignup {...props} />} />
                <Route exact path="/user/login" render={(props) => <UserSignin {...props} />} />
                <ProtectedRoute exact path="/user/update" render={(props) => <UserUpdate {...props} />} />
                <ProtectedRoute exact path="/user/retrieveProfile" render={(props) => <UserRetrieveProfile {...props} />} />
                <Route component={PageNotFound} />
            </Switch>
        </Fragment>
    )
}

export default AuthRoutes
