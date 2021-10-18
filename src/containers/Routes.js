import React, { Fragment } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router'
import history from "src/helper/history/history"
//  layout wrapper
import LayoutWrapper from "src/components/layout/LayoutWrapper"

import PageNotFound from 'src/containers/pages/pageNotFound/PageNotFound';
import AuthRoutes from 'src/containers/auth/AuthRoutes';
import EmployeeRoutes from 'src/containers/EmployeeRoutes';
import TaskRoutes from 'src/containers/TaskRoutes';
import FeedbackRoutes from 'src/containers/FeedbackRoutes';
import SignalrRoutes from 'src/containers/SignalrRoutes';

import Home from "src/containers/pages/home/Home"
import About from "src/containers/pages/about/About"
import Images from "src/containers/pages/images/Images"
import Contact from "src/containers/pages/contact/Contact"


function Routes() {


    return (
        <Fragment>
            <BrowserRouter>
                <ConnectedRouter history={history}>
                    <LayoutWrapper>
                        <div className="App">
                            <Switch>
                                <Route path="/user" render={(props) => <AuthRoutes {...props} />} />
                                <Route path="/employee" render={(props) => <EmployeeRoutes {...props} />} />
                                <Route path="/task" render={(props) => <TaskRoutes {...props} />} />
                                <Route path="/feedback" render={(props) => <FeedbackRoutes {...props} />} />
                                <Route path="/signalr" render={(props) => <SignalrRoutes {...props} />} />
                                <Route exact path="/about" render={(props) => <About {...props} />} />
                                <Route exact path="/images" render={(props) => <Images {...props} />} />
                                <Route exact path="/contactus" render={(props) => <Contact {...props} />} />
                                <Route exact path="/" render={(props) => <Home {...props} />} />
                                <Route component={PageNotFound} />
                            </Switch>
                        </div>
                    </LayoutWrapper>
                </ConnectedRouter>
            </BrowserRouter>
        </Fragment>
    )
}

export default Routes
