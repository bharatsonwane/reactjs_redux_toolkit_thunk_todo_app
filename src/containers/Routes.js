import React, { Fragment } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom';

//  layout wrapper
import LayoutWrapper from "src/components/layout/LayoutWrapper"

import PageNotFound from 'src/containers/pages/pageNotFound/PageNotFound';
import OwnerRoutes from 'src/containers/OwnerRoutes'
import AuthRoutes from 'src/containers/auth/AuthRoutes';
import EmployeeRoutes from 'src/containers/EmployeeRoutes';
import TaskRoutes from 'src/containers/TaskRoutes';
import FeedbackRoutes from 'src/containers/FeedbackRoutes';
import SignalrRoutes from 'src/containers/SignalrRoutes';

import Home from "src/containers/pages/home/Home"
import About from "src/containers/pages/about/About"
import Contact from "src/containers/pages/contact/Contact"


function Routes() {



    return (
        <Fragment>
            <HashRouter>
                <LayoutWrapper>
                    <div className="App">
                        <Switch>
                            <Route path="/owner" render={(props) => <OwnerRoutes {...props} />} />
                            <Route path="/user" render={(props) => <AuthRoutes {...props} />} />
                            <Route path="/employee" render={(props) => <EmployeeRoutes {...props} />} />
                            <Route path="/task" render={(props) => <TaskRoutes {...props} />} />
                            <Route path="/feedback" render={(props) => <FeedbackRoutes {...props} />} />
                            <Route path="/signalr" render={(props) => <SignalrRoutes {...props} />} />
                            <Route exact path="/about" render={(props) => <About {...props} />} />
                            <Route exact path="/contact" render={(props) => <Contact {...props} />} />
                            <Route exact path="/" render={(props) => <Home {...props} />} />
                            <Route component={PageNotFound} />
                        </Switch>
                    </div>
                </LayoutWrapper>
            </HashRouter>
        </Fragment>
    )
}

export default Routes
