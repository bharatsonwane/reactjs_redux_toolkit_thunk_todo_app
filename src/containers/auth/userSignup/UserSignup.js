import React, { Fragment, useState, useEffect } from 'react'
import mdl from "./userSignup.module.scss"
import { allClass } from 'src/helper/customHooks/customModuleClassMethod';
import { useTranslation } from 'react-i18next';
import { useHistory, Link, NavLink } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { registerUserActions } from "src/redux/userRedux/userAction"
import { useStateCallback, usePrevious } from 'src/helper/customHooks/customHooks' // custome useStateCallback hook
import { toast } from 'react-toastify';



function UserSignup(props) {

    // // ----------Localization hooks & Router Hooks-------------
    const { t, i18n } = useTranslation('common');
    let history = useHistory()


    // // ----------Props & context & ref ------------------------------
    let formFieldProps = props.formField
    let formField = JSON.parse(JSON.stringify({ ...formFieldProps })) //if orignal object is not muatable then first stringify it & then parse that object 
    const isFormUpdate = props.isFormUpdate

    // // ----------redux store useDispatch & useSelector --------------------
    const dispatch = useDispatch()
    const reducerState = useSelector((state) => (state));
    let userReducer = reducerState.userReducer

    // // ----------hooks useState--------------------------------------------------
    const [userFormState, setUserFormState] = useState({
        formData: {
            divisionName: "",
            email: "",
            forename: "",
            surname: "",
            dob: "",
            password: "",
            confirmPassword: "",
        },
        formError: {
            divisionName: "",
            email: "",
            forename: "",
            surname: "",
            dob: "",
            password: "",
            confirmPassword: "",
        }
    })

    const { formData, formError } = userFormState


    // // ----------hooks useEffect--------------------------------------------------
    // // ***To check responce/error after success/error action from reducer***
    const { registerUserResponce, registerUserError, } = userReducer
    const prevPropsState = usePrevious({ registerUserResponce, registerUserError, }) // custom hook to get previous props & state
    useEffect(() => {
        if (prevPropsState) {
            if (prevPropsState.registerUserResponce !== registerUserResponce && registerUserResponce) { // // registerUserResponce !== null && registerUserResponce !== undefined
                history.push('/')
                handleResetForm()
                setTimeout(() => { toast.success("Manager register successfully") }, 500);
            }
            else if (prevPropsState.registerUserError !== registerUserError && registerUserError) {
                setTimeout(() => { toast.error("Something wrong happened.. Not able to register Manager.") }, 500);
            }
        }
    }, [userReducer])



    // // HANDLE INPUT CHANGE
    const handleDivisionNameInputChange = (e) => {
        let newUserFormState = { ...userFormState }
        newUserFormState.formData.divisionName = e.target.value
        setUserFormState({ ...userFormState, newUserFormState })
        handleValidateDivisionName(e.target.value)
    }

    const handleEmailInputChange = (e) => {
        let newUserFormState = { ...userFormState }
        newUserFormState.formData.email = e.target.value
        setUserFormState({ ...userFormState, newUserFormState })
        handleValidateEmailId(e.target.value)
    }

    const handleForenameInputChange = (e) => {
        let newUserFormState = { ...userFormState }
        newUserFormState.formData.forename = e.target.value
        setUserFormState({ ...userFormState, newUserFormState })
        handleValidateForename(e.target.value)
    }

    const handleSurnameInputChange = (e) => {
        let newUserFormState = { ...userFormState }
        newUserFormState.formData.surname = e.target.value
        setUserFormState({ ...userFormState, newUserFormState })
        handleValidateSurname(e.target.value)
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
        let isVAlidDivisionName = handleValidateDivisionName(userFormState.formData.divisionName)
        let isValiduserEmailId = handleValidateEmailId(userFormState.formData.email)
        let isValidForename = handleValidateForename(userFormState.formData.forename)
        let isValidSurname = handleValidateSurname(userFormState.formData.surname)
        let isValidDOB = handleValidateDOB(userFormState.formData.dob)
        let isValidPassword = handleValidatePassword(userFormState.formData.password)
        let isValidconfirmPassword = handleValidateConfirmPassword(userFormState.formData.confirmPassword)
        return isVAlidDivisionName && isValiduserEmailId && isValidForename && isValidSurname && isValidDOB && isValidPassword && isValidconfirmPassword
    }


    // // HANDLE INDIVIDUAL VALIDATION
    const handleValidateDivisionName = (division) => {
        let divisonNameValue = division.trim()
        let error = ""
        let isValidReturn = false;
        const regExp = /^[a-zA-Z ]+$/
        if (divisonNameValue === "") {
            error = t("Division name must not be empty")
        }
        else if (divisonNameValue.match(regExp)) {
            if (divisonNameValue.length < 3) {
                error = t("Division name must contain at least 3 characters")
            }
            else if (divisonNameValue.length > 15) {
                error = t("Division name must not exceed 15 characters")
            }
            else {
                error = ""
                isValidReturn = true
            }
        }

        // // ###1st way to update state in loop (here forEach loop)###
        userFormState.formError.divisionName = error
        setUserFormState(prevState => ({ ...prevState, ...userFormState }))
        return isValidReturn

    }

    const handleValidateEmailId = (email) => {
        let emailValue = email.trim()
        let error = ""
        let isValidReturn = false;
        const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (emailValue === "") {
            error = t("email must not be empty")
        }
        else {
            if (emailValue.match(regExp)) {
                error = ""
                isValidReturn = true
            }
            else {
                error = t('Entered email should be valid.')
            }
        }

        // // ###1st way to update state in loop (here forEach loop)###
        userFormState.formError.email = error
        setUserFormState(prevState => ({ ...prevState, ...userFormState }))
        return isValidReturn
    }

    const handleValidateForename = (forename) => {
        let forenameValue = forename.trim()
        let error = ""
        let isValidReturn = false;
        const regExp = /^[a-zA-Z ]+$/
        if (forenameValue === "") {
            error = t("Forename must not be empty")
        }
        else {
            if (forenameValue.match(regExp)) {
                if (forenameValue.length < 2) {
                    error = t("Forename must contain at least 2 characters")
                }
                else if (forenameValue.length > 15) {
                    error = t("Forename must not exceed 15 characters")
                }
                else {
                    error = ""
                    isValidReturn = true
                }
            }
            else {
                error = t('Forename must contain only alphabet.')
            }
        }

        // // ###1st way to update state in loop (here forEach loop)###
        userFormState.formError.forename = error
        setUserFormState(prevState => ({ ...prevState, ...userFormState }))
        return isValidReturn
    }

    const handleValidateSurname = (surname) => {
        let surnameValue = surname.trim()
        let error = ""
        let isValidReturn = false;
        const regExp = /^[a-zA-Z ]+$/
        if (surnameValue === "") {
            error = t("Surname must not be empty")
        }
        else {
            if (surnameValue.match(regExp)) {
                if (surnameValue.length < 2) {
                    error = t("Surname must contain at least 2 characters")
                }
                else if (surnameValue.length > 15) {
                    error = t("Surname must not exceed 15 characters")
                }
                else {
                    error = ""
                    isValidReturn = true
                }
            }
            else {
                error = t('Surname must contain only alphabet.')
            }
        }

        // // ###1st way to update state in loop (here forEach loop)###
        userFormState.formError.surname = error
        setUserFormState(prevState => ({ ...prevState, ...userFormState }))
        return isValidReturn
    }

    const handleValidateDOB = (dob) => {
        let dobValue = dob
        let error = ""
        let isValidReturn = false

        if (dobValue === "") {
            error = "Date of Birth should not be empty."
        }
        else {
            error = ""
            isValidReturn = true
        }

        userFormState.formError.dob = error
        setUserFormState(prevState => ({ ...prevState, ...userFormState }))
        return isValidReturn
    }

    const handleValidatePassword = (password) => {
        let passwordValue = password
        let error = ""
        let isValidReturn = false

        let regExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,15}$/;
        if (passwordValue === "") {
            error = "Password Should not be empty."
        }
        else if (passwordValue.match(regExp)) {
            error = ""
            isValidReturn = true
        }
        else {
            if (passwordValue.length < 6) {
                error = "Password should be at least 6 charecter."
            }
            else {
                error = "Password should contain at least 1 uppercase, 1 lowercase & 1 special character."
            }
        }

        userFormState.formError.password = error
        setUserFormState(prevState => ({ ...prevState, ...userFormState }))
        return isValidReturn
    }


    const handleValidateConfirmPassword = (confirmPassword) => {
        let confirmPasswordValue = confirmPassword
        let error = ""
        let isValidReturn = false

        if (confirmPasswordValue === "") {
            error = "Second Password should not be empty."
        }
        else if (confirmPasswordValue !== userFormState.formData.password) {
            error = "Both Password should be match."
        }
        else {
            error = ""
            isValidReturn = true
        }

        userFormState.formError.confirmPassword = error
        setUserFormState(prevState => ({ ...prevState, ...userFormState }))
        return isValidReturn
    }


    const handleCreateNewUser = () => {
        if (handleValidateAll()) {
            let userFormStateData = {
                divisionName: userFormState.formData.divisionName,
                email: userFormState.formData.email,
                forename: userFormState.formData.forename,
                surname: userFormState.formData.surname,
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
                divisionName: "",
                email: "",
                forename: "",
                surname: "",
                dob: "",
                password: "",
                confirmPassword: "",
            },
            formError: {
                divisionName: "",
                email: "",
                forename: "",
                surname: "",
                dob: "",
                password: "",
                confirmPassword: "",
            }
        })
    }



    return (
        <Fragment>
            <div>
                <form name="myForm" className={allClass("", "formStyle", mdl)}>
                    <div>
                        <div className={allClass("", "formField col", mdl)}>
                            <label className={allClass("", "formLable", mdl)} >{t("Division Name")}:</label>
                            <input disabled={isFormUpdate} type="text" name="forename" value={formData.divisionName} onChange={e => handleDivisionNameInputChange(e)} className={allClass("text-field", "formInput", mdl)} placeholder={t("Enter Divison Name.")} /><br></br>
                        </div>
                        <small style={{ color: "red", position: "relative", }}>{formError.divisionName}</small>
                    </div>
                    <div>
                        <div className={allClass("", "formField col", mdl)}>
                            <label className={allClass("", "formLable", mdl)} >{t("E-mail")}:</label>
                            <input disabled={isFormUpdate} type="email" name="forename" value={formData.email} onChange={e => handleEmailInputChange(e)} className={allClass("text-field", "formInput", mdl)} placeholder={t("Enter E-mail.")} /><br></br>
                        </div>
                        <small style={{ color: "red", position: "relative", }}>{formError.email}</small>
                    </div>
                    <div>
                        <div className={allClass("", "formField col", mdl)}>
                            <label className={allClass("", "formLable", mdl)} >{t("Forename")}:</label>
                            <input type="text" name="forename" value={formData.forename} onChange={e => handleForenameInputChange(e)} className={allClass("text-field", "formInput", mdl)} placeholder={t("Enter User's Forename.")} /><br></br>
                        </div>
                        <small style={{ color: "red", position: "relative", }}>{formError.forename}</small>
                    </div>
                    <div>
                        <div className={allClass("", "formField col", mdl)}>
                            <label className={allClass("", "formLable", mdl)} >{t("Surname")}:</label>
                            <input type="text" name="surname" value={formData.surname} onChange={e => handleSurnameInputChange(e)} className={allClass("text-field", "formInput", mdl)} placeholder={t("Enter User's Surname.")} /><br></br>
                        </div>
                        <small style={{ color: "red", position: "relative", }}>{formError.surname}</small>
                    </div>
                    <div>
                        <div className={allClass("", "formField col", mdl)}>
                            <label className={allClass("", "formLable", mdl)} >{t("Date of Birth")}:</label>
                            <input type="date" name="dob" value={formData.dob} onChange={e => handleUserDOBInputChange(e)} className={allClass("text-field", "formInput", mdl)} />
                        </div>
                        <small style={{ color: "red", position: "relative", }}>{formError.dob}</small>
                    </div>

                    <div>
                        <div className={allClass("", "formField col", mdl)}>
                            <label className={allClass("", "formLable", mdl)}>{t("Enter Password")}:</label>
                            <input type="password" name="password" value={formData.password} onChange={e => handlePasswordInputChange(e)} className={allClass("text-field", "formInput", mdl)} placeholder={t("Enter Password.")} />
                        </div>
                        <small style={{ color: "red", position: "relative", }}>{formError.password}</small>
                    </div>

                    <div>
                        <div className={allClass("", "formField col", mdl)}>
                            <label className={allClass("", "formLable", mdl)}>{t("Conform Password")}:</label>
                            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={e => handleConfirmPasswordInputChange(e)} className={allClass("text-field", "formInput", mdl)} placeholder={t("Conform Password.")} />
                        </div>
                        <small style={{ color: "red", position: "relative", }}>{formError.confirmPassword}</small>
                    </div>

                    {isFormUpdate === true ?
                        <div className={allClass("field-btn", "formButton", mdl)}>
                            <button type='button' onClick={event => handleUpdateUserDetail(event)} className={allClass("btn btn-warning", "buttonStyl", mdl)}>{t("Update User")}</button>
                            <NavLink to='/'><button className={allClass("btn btn-outline-primary mr-2", "buttonStyl", mdl)}>Cancel</button></NavLink>
                        </div>
                        :
                        <div className={allClass("field-btn", "formButton", mdl)}>
                            <button type='button' onClick={event => handleCreateNewUser()} className={allClass("btn btn-success", "buttonStyl", mdl)}>{t("Register Manager")}</button>
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
