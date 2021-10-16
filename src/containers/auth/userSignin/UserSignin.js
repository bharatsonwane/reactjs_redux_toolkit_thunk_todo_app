import React, { Fragment, useState, useEffect } from 'react'
import mdl from "./userSignin.module.scss"
import { allClass } from 'src/helper/customHooks/customModuleClassMethod';
import Cookies from 'js-cookie';
import { usePrevious } from 'src/helper/customHooks/customHooks';
import { useHistory, Link, NavLink } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { signInUserActions } from 'src/redux/userRedux/userAction';
// import { clientSideAuthGuardAction } from 'src/redux/globalClientState_redux/globalClientState_actions'



function UserSignin() {
    // // ----------Localization hooks & Router Hooks-------------
    const { t, i18n } = useTranslation('common');
    let history = useHistory()

    // // ----------Props & context & ref ------------------------------



    // // ----------redux store useDispatch & useSelector --------------------
    const dispatch = useDispatch()
    const reducerState = useSelector((state) => (state));
    let userReducer = reducerState.userReducer

    // // ----------hooks useState--------------------------------------------------
    const [userData, setUserData] = useState({
        email: "",
        password: ""
    })

    const [userErr, setUserErr] = useState({
        emailErr: "",
        passwordErr: "",
    })

    const { email, password } = userData;
    const { emailErr, passwordErr } = userErr

    // // ----------hooks useEffect--------------------------------------------------
    // // ***To check responce/error after success/error action from reducer***
    const { isLoading, signInUserResponce, signInUserError } = userReducer
    const prevPropsState = usePrevious({ isLoading, signInUserResponce, signInUserError }) // custom hook to get previous props & state
    useEffect(() => {
        if (prevPropsState) {
            if (prevPropsState.signInUserResponce !== signInUserResponce && signInUserResponce) { // // createTaskResponse !== null && createTaskResponse !== undefined
                // dispatch(clientSideAuthGuardAction(signInUserResponce.nextJWT))
                setTimeout(() => {
                    toast.success(t("Signin successfully"))
                }, 500);
                history.push("/task/retrieve")
            }
            else if (prevPropsState.signInUserError !== signInUserError && signInUserError) {
                setTimeout(() => {
                    toast.error(t("Not able to Sign In."))
                }, 500);
            }
        }
    }, [userReducer])





    // // HANDLE INPUT CHANGE
    const handleEmailInputChange = (e) => {
        setUserData({ ...userData, email: e.target.value })
        handleValidateEmailId(e.target.value)
    }


    const handlePasswordInputChange = (e) => {
        setUserData({ ...userData, password: e.target.value })
        handleValidatePassword(e.target.value)
    }

    // // HANDLE ALL VALIDATION
    const handleValidateAll = () => {
        let isValiduserEmailId = handleValidateEmailId(userData.email)
        let isValidPassword = handleValidatePassword(userData.password)
        return isValiduserEmailId && isValidPassword
    }


    // // HANDLE INDIVIDUAL VALIDATION
    const handleValidateEmailId = (email) => {
        let emailValue = email.trim()
        let emailErr = ""
        let isValidReturn = false;
        const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (emailValue === "") {
            emailErr = t("email must not be empty")
        }
        else {
            if (emailValue.match(regExp)) {
                emailErr = ""
                isValidReturn = true
            }
            else {
                emailErr = t('Entered email should be valid.')
            }
        }

        // // ###1st way to update state in loop (here forEach loop)###
        userErr.emailErr = emailErr
        setUserErr(prevState => ({ ...prevState, ...userErr }))
        return isValidReturn
    }

    const handleValidatePassword = (password) => {
        let passwordValue = password
        let passwordErr = ""
        let isValidReturn = false

        if (passwordValue === "") {
            passwordErr = "Password Should not be empty."
        }
        else {
            passwordErr = ""
            isValidReturn = true
        }

        userErr.passwordErr = passwordErr
        setUserErr(prevState => ({ ...prevState, ...userErr }))
        return isValidReturn
    }



    const handleSignInUser = async () => {
        if (handleValidateAll()) {
            dispatch(signInUserActions(userData))
        }
    }

    return (
        <Fragment>
            <div>
                <form name="myForm" className={allClass("", "formStyle", mdl)}>
                    <div>
                        <div className={allClass("", "formField col", mdl)}>
                            <label className={allClass("", "formLable", mdl)} >{t("E-mail")}:</label>
                            <input type="email" name="fullName" value={email} onChange={e => handleEmailInputChange(e)} className={allClass("text-field", "formInput", mdl)} placeholder={t("Enter E-mail.")} /><br></br>
                        </div>
                        <small style={{ color: "red", position: "relative", }}>{emailErr}</small>
                    </div>


                    <div>
                        <div className={allClass("", "formField col", mdl)}>
                            <label className={allClass("", "formLable", mdl)}>{t("Enter Password")}:</label>
                            <input type="password" name="password" value={password} onChange={e => handlePasswordInputChange(e)} className={allClass("text-field", "formInput", mdl)} placeholder={t("Enter Password.")} />
                        </div>
                        <small style={{ color: "red", position: "relative", }}>{passwordErr}</small>
                    </div>


                    <div className={allClass("field-btn", "formButton", mdl)}>
                        <button type='button' onClick={event => handleSignInUser(event)} className={allClass("btn btn-warning", "buttonStyl", mdl)}>{t("Sign In")}</button>
                        <NavLink to='/'><button className={allClass("btn btn-outline-primary mr-2", "buttonStyl", mdl)}>Cancel</button></NavLink>
                    </div>
                </form>
            </div>
        </Fragment>
    )
}

export default UserSignin
