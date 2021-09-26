import React, { Fragment } from 'react'
import { Switch, Route } from "react-router-dom";
import { ProtectedRoute } from 'src/helper/functions/protectedRouteHelper'
import EmployeeCreate from 'src/containers/pages/employee/employeeCreate/EmployeeCreate';
import EmployeeRetrieve from 'src/containers/pages/employee/employeeRetrieve/EmployeeRetrieve';
import EmployeeUpdate from 'src/containers/pages/employee/employeeUpdate/EmployeeUpdate';

function EmployeeRoutes() {


    return (
        <Fragment>
            <Switch>
                <ProtectedRoute exact path="/employee/create" render={(props) => <EmployeeCreate {...props} />} />
                <ProtectedRoute exact path="/employee/retrieve" render={(props) => <EmployeeRetrieve {...props} />} />
                <ProtectedRoute exact path="/employee/update" render={(props) => <EmployeeUpdate {...props} />} />
            </Switch>
        </Fragment>
    )
}

export default EmployeeRoutes
