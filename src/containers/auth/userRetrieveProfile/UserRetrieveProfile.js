import React, { Fragment, useState, useEffect } from 'react'
import { allClass } from 'src/helper/customHooks/customModuleClassMethod';
import Cookies from 'js-cookie';
import { usePrevious } from 'src/helper/customHooks/customHooks';
import { useHistory, Link, NavLink } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { retrieveUserProfileActions } from 'src/redux/user_redux/user_action';



function UserRetrieveProfile() {
    // // ----------Localization hooks & Router Hooks-------------
    const { t, i18n } = useTranslation('common');
    let history = useHistory()

    // // ----------Props & context & ref ------------------------------



    // // ----------redux store useDispatch & useSelector --------------------
    const dispatch = useDispatch()
    const reducerState = useSelector((state) => (state));
    let userReducer = reducerState.userReducer

    // // ----------hooks useState--------------------------------------------------
    const [state, setState] = useState({
    })


    // // ----------hooks useEffect--------------------------------------------------
    useEffect(() => {
        dispatch(retrieveUserProfileActions())
    }, [])


    // // ***To check responce/error after success/error action from reducer***
    const { isLoading, retrieveUserProfileResponce, retrieveUserProfileError } = userReducer
    const prevPropsState = usePrevious({ isLoading, retrieveUserProfileResponce, retrieveUserProfileError }) // custom hook to get previous props & state
    useEffect(() => {
        if (prevPropsState) {
            if (prevPropsState.retrieveUserProfileResponce !== retrieveUserProfileResponce && retrieveUserProfileResponce) { // // createTaskResponse !== null && createTaskResponse !== undefined
            }
            else if (prevPropsState.retrieveUserProfileError !== retrieveUserProfileError && retrieveUserProfileError) {
                setTimeout(() => {
                    toast.error(t("Not able to retrieve Profile."))
                }, 500);
            }
        }
    }, [userReducer])






    return (
        <Fragment>
            <h>Retrieve Profile</h>
        </Fragment>
    )
}

export default UserRetrieveProfile
