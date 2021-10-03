import { Fragment, useState, useEffect, useMemo } from 'react';
import { allClass } from 'src/helper/customHooks/customModuleClassMethod'
import mdl from "./layoutWrapper.module.css"
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useLocation, useParams } from "react-router-dom";
import Cookies from 'js-cookie';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomLoader from './content/LoadingIndicator/CustomLoader';
// import Header from 'src/components/navbarMenu/header/Header';
// import SideNavbarMenue from 'src/components/navbarMenu/sideNavbarMenu/SideNavbarMenu';
// import BottomNavbarMenu from 'src/components/navbarMenu/bottomMenue/BottomNavbarMenu';
import NavBarHookBootstrap from 'src/components/navbarMenu/NavBarHookBootstrap';




function Layout(props) {
    // // ----------Localization hooks & Router Hooks-------------
    const [history, location, params] = [useHistory(), useLocation(), useParams()]

    // // ----------Props & context & ref ------------------------------



    // // ----------redux store useDispatch & useSelector --------------------
    // const dispatch = useDispatch()
    // // // 2nd way to get data ==> by using useSelector
    // const reducerState = useSelector((state) => (state));
    // let userReducer = reducerState.userReducer

    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [userRole, setUserRole] = useState("")

    useEffect(() => {
        const handleEvent = () => {
            let cookieToken = Cookies.get('reduxToolkitToken');
            let userRole = localStorage.getItem('userRole');
            setUserRole(userRole)
            if (!!cookieToken && isAuthenticated !== true) {
                setIsAuthenticated(true)
            } else if (!cookieToken && isAuthenticated === true) {
                setIsAuthenticated(false)
            }
        }
        window.addEventListener('click', handleEvent);
        handleEvent()
    }, [history, location, params])


    return (
        <Fragment >
            <ToastContainer />
            <CustomLoader />
            <NavBarHookBootstrap isAuthenticated={isAuthenticated} userRole={userRole} />
            {/* {isAuthLogin &&
                <Fragment>
                    <Header />
                    <SideNavbarMenue />
                    <BottomNavbarMenu />
                </Fragment>
            } */}
            <main className={allClass("", "layoutWrapper__mainContainer", mdl)}>
                {props.children}
            </main>
        </Fragment>
    );
}

export default Layout;

