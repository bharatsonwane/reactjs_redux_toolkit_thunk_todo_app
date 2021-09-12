import React, { Fragment } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//  layout wrapper
import LayoutWrapper from "src/components/layout/LayoutWrapper"

import PageNotFound from 'src/containers/pages/pageNotFound/PageNotFound';
import TaskRoutes from './TaskRoutes';
import AuthRoutes from 'src/containers/auth/AuthRoutes';

import Home from "src/containers/pages/home/Home"
import About from "src/containers/pages/about/About"
import Contact from "src/containers/pages/contact/Contact"


function Routes() {



    return (
        <Fragment>
            <BrowserRouter>
                <LayoutWrapper>
                    <div className="App">
                        <Switch>
                            <Route path="/user" render={(props) => <AuthRoutes {...props} />} />
                            <Route path="/task" render={(props) => <TaskRoutes {...props} />} />
                            <Route exact path="/about" render={(props) => <About {...props} />} />
                            <Route exact path="/contact" render={(props) => <Contact {...props} />} />
                            <Route exact path="/" render={(props) => <Home {...props} />} />
                            <Route component={PageNotFound} />
                        </Switch>
                    </div>
                </LayoutWrapper>
            </BrowserRouter>
        </Fragment>
    )
}

export default Routes
