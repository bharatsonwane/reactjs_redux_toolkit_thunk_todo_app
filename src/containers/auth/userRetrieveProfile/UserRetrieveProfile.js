import React, { Fragment, useState, useEffect } from 'react'
import { allClass } from 'src/helper/customHooks/customModuleClassMethod';
import mdl from "./userProfile.module.css"
import Cookies from 'js-cookie';
import { usePrevious } from 'src/helper/customHooks/customHooks';
import { useHistory, Link, NavLink } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { retrieveUserProfileActions } from 'src/redux/userRedux/userAction';



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


    const handleEditProfile = () => {

    }



    return (
        <Fragment>
            <h3>User Profile</h3>
            {retrieveUserProfileResponce &&
                <div>
                    <div>
                        <Link to={`/task/retrieve`} type="button" className={allClass("btn btn-outline-primary mr-2", "buttonStyl", mdl)}>Retrieve </Link>
                        <button className={allClass("btn btn-warning", "buttonStyl", mdl)} onClick={(e) => handleEditProfile(retrieveUserProfileResponce)} > Edit </button>
                    </div>
                    <div className={mdl.container}>
                        <table >
                            <tbody>
                                {retrieveUserProfileResponce.userRole &&
                                    <tr>
                                        <th>User Role</th>
                                        <td>{retrieveUserProfileResponce.userRole}</td>
                                    </tr>}
                                {retrieveUserProfileResponce.divisionName &&
                                    <tr>
                                        <th>divisionName</th>
                                        <td>{retrieveUserProfileResponce.divisionName}</td>
                                    </tr>}
                                {retrieveUserProfileResponce.forename &&
                                    <tr>
                                        <th>Forename</th>
                                        <td>{retrieveUserProfileResponce.forename}</td>
                                    </tr>}
                                {retrieveUserProfileResponce.surname &&
                                    <tr>
                                        <th>Surname</th>
                                        <td>{retrieveUserProfileResponce.surname}</td>
                                    </tr>}
                                {retrieveUserProfileResponce.dob &&
                                    <tr>
                                        <th>Date of Birth</th>
                                        <td>{retrieveUserProfileResponce.dob}</td>
                                    </tr>}
                                {retrieveUserProfileResponce.email &&
                                    <tr>
                                        <th>Email</th>
                                        <td>{retrieveUserProfileResponce.email}</td>
                                    </tr>}
                                {retrieveUserProfileResponce.programmingLanguageKnown &&
                                    <tr>
                                        <th>Programming Language Known</th>
                                        <td>
                                            {retrieveUserProfileResponce.programmingLanguageKnown.join(", ")}
                                        </td>
                                    </tr>}
                            </tbody>
                        </table>
                    </div>
                </div>
            }
        </Fragment>
    )
}

export default UserRetrieveProfile
