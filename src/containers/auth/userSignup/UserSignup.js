import React, { Fragment, useState } from 'react'
import { NavLink } from "react-router-dom"
import mdl from "./userSignup.module.scss"
import { allClass } from 'src/helper/customHooks/customModuleClassMethod';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux'
import { registerUserActions } from "src/redux/user_redux/user_action"


function UserSignup(props) {

    // // ----------Localization hooks & Router Hooks-------------
    const { t, i18n } = useTranslation('common');


    // // ----------Props & context & ref ------------------------------
    let formFieldProps = props.formField
    let formField = JSON.parse(JSON.stringify({ ...formFieldProps })) //if orignal object is not muatable then first stringify it & then parse that object 
    const isFormUpdate = props.isFormUpdate

    // // ----------redux store useDispatch & useSelector --------------------
    const dispatch = useDispatch()
    const reducerState = useSelector((state) => (state));


    // // ----------hooks useState--------------------------------------------------
    const [userFormState, setUserFormState] = useState({
        formData: {
            email: "",
            fullName: "",
            dob: "",
            password: "",
            confirmPassword: "",
        },
        formError: {
            emailErr: "",
            fullNameErr: "",
            dobErr: "",
            passwordErr: "",
            confirmPasswordErr: "",
        }
    })



    // destructure state
    const { email, fullName, dob, password, confirmPassword } = userFormState.formData;
    const { emailErr, fullNameErr, dobErr, passwordErr, confirmPasswordErr, } = userFormState.formError

    // // ----------hooks useEffect--------------------------------------------------


    // // HANDLE INPUT CHANGE
    const handleEmailInputChange = (e) => {
        let newUserFormState = { ...userFormState }
        newUserFormState.formData.email = e.target.value
        setUserFormState({ ...userFormState, newUserFormState })
        handleValidateEmailId(e.target.value)
    }

    const handlefullNameInputChange = (e) => {
        let newUserFormState = { ...userFormState }
        newUserFormState.formData.fullName = e.target.value
        setUserFormState({ ...userFormState, newUserFormState })
        handleValidateFullName(e.target.value)
    }

    const handleUserDOBInputChange = (e) => {
        let newUserFormState = { ...userFormState }
        newUserFormState.formData.dob = e.target.value
        setUserFormState({ ...userFormState, newUserFormState })
        handleValidateDOB(e.target.value)
    }

    const handlePasswordInputChange = (e) => {
        let newUserFormState = { ...userFormState }
        newUserFormState.formData.password = e.target.value
        setUserFormState({ ...userFormState, newUserFormState })
        handleValidatePassword(e.target.value)
    }

    const handleConfirmPasswordInputChange = (e) => {
        let newUserFormState = { ...userFormState }
        newUserFormState.formData.confirmPassword = e.target.value
        setUserFormState({ ...userFormState, newUserFormState })
        handleValidateConfirmPassword(e.target.value)
    }


    // // HANDLE ALL VALIDATION
    const handleValidateAll = () => {
        let isValiduserEmailId = handleValidateEmailId(userFormState.formData.email)
        let isValidFullName = handleValidateFullName(userFormState.formData.fullName)
        let isValidDOB = handleValidateDOB(userFormState.formData.dob)
        let isValidPassword = handleValidatePassword(userFormState.formData.password)
        let isValidconfirmPassword = handleValidateConfirmPassword(userFormState.formData.confirmPassword)
        return isValiduserEmailId && isValidFullName && isValidDOB && isValidPassword && isValidconfirmPassword
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
        userFormState.formError.emailErr = emailErr
        setUserFormState(prevState => ({ ...prevState, ...userFormState }))
        return isValidReturn
    }

    const handleValidateFullName = (fullName) => {
        let fullNameValue = fullName.trim()
        let fullNameErr = ""
        let isValidReturn = false;
        const regExp = /^[a-zA-Z ]+$/
        if (fullNameValue === "") {
            fullNameErr = t("Full name must not be empty")
        }
        else {
            if (fullNameValue.match(regExp)) {
                if (fullNameValue.length < 5) {
                    fullNameErr = t("Full name must contain at least 5 characters")
                }
                else if (fullNameValue.length > 15) {
                    fullNameErr = t("Full name must not exceed 15 characters")
                }
                else {
                    fullNameErr = ""
                    isValidReturn = true
                }
            }
            else {
                fullNameErr = t('Full name must contain only alphabet.')
            }
        }

        // // ###1st way to update state in loop (here forEach loop)###
        userFormState.formError.fullNameErr = fullNameErr
        setUserFormState(prevState => ({ ...prevState, ...userFormState }))
        return isValidReturn
    }

    const handleValidateDOB = (dob) => {
        let dobValue = dob
        let dobErr = ""
        let isValidReturn = false

        if (dobValue === "") {
            dobErr = "Date of Birth should not be empty."
        }
        else {
            dobErr = ""
            isValidReturn = true
        }

        userFormState.formError.dobErr = dobErr
        setUserFormState(prevState => ({ ...prevState, ...userFormState }))
        return isValidReturn
    }

    const handleValidatePassword = (password) => {
        let passwordValue = password
        let passwordErr = ""
        let isValidReturn = false

        let regExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,15}$/;
        if (passwordValue === "") {
            passwordErr = "Password Should not be empty."
        }
        else if (passwordValue.match(regExp)) {
            passwordErr = ""
            isValidReturn = true
        }
        else {
            if (passwordValue.length < 6) {
                passwordErr = "Password should be at least 6 charecter."
            }
            else {
                passwordErr = "Password should contain at least 1 uppercase, 1 lowercase & 1 special character."
            }
        }

        userFormState.formError.passwordErr = passwordErr
        setUserFormState(prevState => ({ ...prevState, ...userFormState }))
        return isValidReturn
    }


    const handleValidateConfirmPassword = (confirmPassword) => {
        let confirmPasswordValue = confirmPassword
        let confirmPasswordErr = ""
        let isValidReturn = false

        if (confirmPasswordValue === "") {
            confirmPasswordErr = "Second Password should not be empty."
        }
        else if (confirmPasswordValue !== userFormState.formData.password) {
            confirmPasswordErr = "Both Password should be match."
        }
        else {
            confirmPasswordErr = ""
            isValidReturn = true
        }

        userFormState.formError.confirmPasswordErr = confirmPasswordErr
        setUserFormState(prevState => ({ ...prevState, ...userFormState }))
        return isValidReturn
    }


    const handleCreateNewUser = () => {
        if (handleValidateAll()) {
            let userFormStateData = {
                email: userFormState.formData.email,
                fullName: userFormState.formData.fullName,
                dob: userFormState.formData.dob,
                password: userFormState.formData.password
            }
            dispatch(registerUserActions(userFormStateData))
        }
    }

    const handleUpdateUserDetail = () => {

    }

    const handleResetForm = () => {
        setUserFormState({
            formData: {
                email: "",
                fullName: "",
                dob: "",
                password: "",
                confirmPassword: "",
            },
            formError: {
                emailErr: "",
                fullNameErr: "",
                dobErr: "",
                passwordErr: "",
                confirmPasswordErr: "",
            }
        })
    }



    return (
        <Fragment>
            <div>
                <form name="myForm" className={allClass("", "formStyle", mdl)}>
                    <div>
                        <div className={allClass("", "formField col", mdl)}>
                            <label className={allClass("", "formLable", mdl)} >{t("E-mail")}:</label>
                            <input disabled={isFormUpdate} type="email" name="fullName" value={email} onChange={e => handleEmailInputChange(e)} className={allClass("text-field", "formInput", mdl)} placeholder={t("Enter E-mail.")} /><br></br>
                        </div>
                        <small style={{ color: "red", position: "relative", }}>{emailErr}</small>
                    </div>
                    <div>
                        <div className={allClass("", "formField col", mdl)}>
                            <label className={allClass("", "formLable", mdl)} >{t("Full Name.")}:</label>
                            <input type="text" name="fullName" value={fullName} onChange={e => handlefullNameInputChange(e)} className={allClass("text-field", "formInput", mdl)} placeholder={t("Enter User's Full Name.")} /><br></br>
                        </div>
                        <small style={{ color: "red", position: "relative", }}>{fullNameErr}</small>
                    </div>

                    <div>
                        <div className={allClass("", "formField col", mdl)}>
                            <label className={allClass("", "formLable", mdl)} >{t("Date of Birth")}:</label>
                            <input type="date" name="dob" value={dob} onChange={e => handleUserDOBInputChange(e)} className={allClass("text-field", "formInput", mdl)} />
                        </div>
                        <small style={{ color: "red", position: "relative", }}>{dobErr}</small>
                    </div>

                    <div>
                        <div className={allClass("", "formField col", mdl)}>
                            <label className={allClass("", "formLable", mdl)}>{t("Enter Password")}:</label>
                            <input type="password" name="password" value={password} onChange={e => handlePasswordInputChange(e)} className={allClass("text-field", "formInput", mdl)} placeholder={t("Enter Password.")} />
                        </div>
                        <small style={{ color: "red", position: "relative", }}>{passwordErr}</small>
                    </div>

                    <div>
                        <div className={allClass("", "formField col", mdl)}>
                            <label className={allClass("", "formLable", mdl)}>{t("Conform Password")}:</label>
                            <input type="password" name="confirmPassword" value={confirmPassword} onChange={e => handleConfirmPasswordInputChange(e)} className={allClass("text-field", "formInput", mdl)} placeholder={t("Conform Password.")} />
                        </div>
                        <small style={{ color: "red", position: "relative", }}>{confirmPasswordErr}</small>
                    </div>

                    {isFormUpdate === true ?
                        <div className={allClass("field-btn", "formButton", mdl)}>
                            <button type='button' onClick={event => handleUpdateUserDetail(event)} className={allClass("btn btn-warning", "buttonStyl", mdl)}>{t("Update User")}</button>
                            <NavLink to='/'><button className={allClass("btn btn-outline-primary mr-2", "buttonStyl", mdl)}>Cancel</button></NavLink>
                        </div>
                        :
                        <div className={allClass("field-btn", "formButton", mdl)}>
                            <button type='button' onClick={event => handleCreateNewUser()} className={allClass("btn btn-success", "buttonStyl", mdl)}>{t("Creat New User")}</button>
                            <button type="reset" onClick={event => handleResetForm(event)} className={allClass("btn btn-secondary", "buttonStyl", mdl)} >{t("Reset")}</button>
                            <NavLink to='/'><button className={allClass("btn btn-outline-primary mr-2", "buttonStyl", mdl)}>Cancel</button></NavLink>
                        </div>
                    }
                </form>
            </div>
        </Fragment>
    )
}

export default UserSignup
