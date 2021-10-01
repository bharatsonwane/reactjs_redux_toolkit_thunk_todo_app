import React, { Fragment } from 'react'
import { Switch, Route } from "react-router-dom";
import { ProtectedRoute } from 'src/helper/functions/protectedRouteHelper'
import OwnerSignin from 'src/containers/auth/owner/OwnerSignin'

function EmployeeRoutes() {


    return (
        <Fragment>
            <Switch>
                <Route exact path="/owner/signin" render={(props) => <OwnerSignin {...props} />} />
            </Switch>
        </Fragment>
    )
}

export default EmployeeRoutes
