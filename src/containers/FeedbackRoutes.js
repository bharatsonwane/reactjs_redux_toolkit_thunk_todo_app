import React, { Fragment } from 'react'
import { Switch, Route } from "react-router-dom";
import { ProtectedRoute } from 'src/helper/functions/protectedRouteHelper'
import FeedbackCreate from 'src/containers/pages/feedback/feedbackCreate/FeedbackCreate'
import FeedbackRetrieve from 'src/containers/pages/feedback/feedbackRetrieve/FeedbackRetrieve';

function FeedbackRoutes() {


    return (
        <Fragment>
            <Switch>
                <Route exact path="/feedback/create" render={(props) => <FeedbackCreate {...props} />} />
                <ProtectedRoute exact path="/feedback/retrieve" render={(props) => <FeedbackRetrieve {...props} />} />
            </Switch>
        </Fragment>
    )
}

export default FeedbackRoutes
