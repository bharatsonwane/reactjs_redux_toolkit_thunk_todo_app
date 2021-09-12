import React, { Fragment } from 'react'
import { Switch, Route } from "react-router-dom";
import { ProtectedRoute } from 'src/helper/functions/protectedRouteHelper'

import PageNotFound from 'src/containers/pages/pageNotFound/PageNotFound';
import TaskCreate from "src/containers/pages/tasks/taskCreate/TaskCreate"
import TaskRetrieve from "src/containers/pages/tasks/taskRetrieve/TaskRetrieve"
import TaskUpdate from "src/containers/pages/tasks/taskUpdate/TaskUpdate"
import TaskRetriveDetail from 'src/containers/pages/tasks/taskRetrieveDetail/TaskRetriveDetail';

function TaskRoutes() {



    return (
        <Fragment>
            <Switch>
                <ProtectedRoute exact path="/task/create" render={(props) => <TaskCreate {...props} />} />
                <ProtectedRoute exact path="/task/retrieve" render={(props) => <TaskRetrieve {...props} />} />
                <ProtectedRoute exact path='/task/update/:id' render={(props) => <TaskUpdate {...props} />} />
                <ProtectedRoute exact path="/task/detail/:id" render={(props) => <TaskRetriveDetail {...props} />} />
                <Route component={PageNotFound} />
            </Switch>
        </Fragment>
    )
}

export default TaskRoutes

