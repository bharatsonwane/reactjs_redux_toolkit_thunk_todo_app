import React, { Fragment, useState, useEffect } from 'react'
import { usePrevious } from 'src/helper/customHooks/customHooks'
import { allClass } from 'src/helper/customHooks/customModuleClassMethod'
import mdl from "./employeeForm.module.css"
import { useHistory, Link } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from "react-i18next";
import { createEmployeeActions } from 'src/redux/employeeRedux/employeeAction'
import { toast } from 'react-toastify';

/**
 * Employee Form 
 * forename ==> text
 * surname ==> text
 * marriedStatus ==> toggle
 * phoneNumber ==> number
 * email ==> text
 * dob ==> date
 * gender ==> radio button
 * userRole ==> dropdown
 * programmingLanguageKnown ==> checkbox
 * address ==> text area
 * password ==>
 * confirmPassword
 * 
 * 
 */

function EmployeeForm() {
    // // ----------Localization hooks & Router Hooks-------------
    const { t, i18n } = useTranslation("common");
    let history = useHistory()


    // // ----------Props & context & ref ------------------------------



    // // ----------redux store useDispatch & useSelector --------------------
    const dispatch = useDispatch()
    const reducerState = useSelector((state) => (state));
    let employeeReducer = reducerState.employeeReducer

    let formDataObjectInitialValue = {
        values: {
            forename: "",
            surname: "",
            marriedStatus: "",
            phoneNumber: "",
            email: "",
            dob: "",
            gender: "",
            userRole: "",
            programmingLanguageKnown: [],
            address: "",
            password: "",
            confirmPassword: "",
        },
        touched: {
            forename: false,
            surname: false,
            marriedStatus: false,
            phoneNumber: false,
            email: false,
            dob: false,
            gender: false,
            userRole: false,
            programmingLanguageKnown: false,
            address: false,
            password: false,
            confirmPassword: false,
        },
        errors: {
            forename: "",
            surname: "",
            marriedStatus: "",
            phoneNumber: "",
            email: "",
            dob: "",
            gender: "",
            userRole: "",
            programmingLanguageKnown: "",
            address: "",
            password: "",
            confirmPassword: "",
        }
    }
    // // ----------hooks useState--------------------------------------------------
    const [formData, setFormData] = useState({ ...formDataObjectInitialValue })

    const { values, touched, errors } = formData



    // // useEffect
    // // ***To check responce/error after success/error action from reducer***
    const { createEmployeeResponse, createEmployeeError, updateEmployeeResponse, updateEmployeeError, isLoading } = employeeReducer
    const prevPropsState = usePrevious({ createEmployeeResponse, createEmployeeError, updateEmployeeResponse, updateEmployeeError }) // custom hook to get previous props & state
    useEffect(() => {
        if (prevPropsState) {
            if (prevPropsState.createEmployeeResponse !== createEmployeeResponse && createEmployeeResponse) { // // createEmployeeResponse !== null && createEmployeeResponse !== undefined
                history.push('/employee/retrieve')
                handleFormReset()
                setTimeout(() => { toast.success("Employee Added successfully") }, 500);
            }
            else if (prevPropsState.createEmployeeError !== createEmployeeError && createEmployeeError) {
                setTimeout(() => { toast.error("Something wrong happened.. Not able to create employee.") }, 500);
            }
            if (prevPropsState.updateEmployeeResponse !== updateEmployeeResponse && updateEmployeeResponse) {
                history.push('/employee/retrieve')
                handleFormReset()
                setTimeout(() => { toast.success("Employee Updated successfully!") }, 500);
            }
            else if (prevPropsState.updateEmployeeError !== updateEmployeeError && updateEmployeeError) {
                setTimeout(() => { toast.error("Something wrong happened.. Not able to edit employee.") }, 500);
            }
        }
    }, [employeeReducer])


    // // handler -----------------------------------------
    const handleFormInputChange = (e, isBlure = false, checkBoxName) => {
        let newFormData = { ...formData };
        if (e.target.type === "checkbox") {
            if (checkBoxName === "programmingLanguageKnown") {
                if (e.target.checked) {
                    newFormData.values[checkBoxName] = [...newFormData.values[checkBoxName], e.target.name]
                }
                else {
                    newFormData.values[checkBoxName] = newFormData.values[checkBoxName].filter((element) => element !== e.target.name)
                }
            }
            setFormData({ ...formData, newFormData });
            let fieldName = checkBoxName
            handleFormValidation(newFormData, fieldName, isBlure = true);
        }
        else {
            newFormData.values[e.target.name] = e.target.value;
            setFormData({ ...formData, newFormData });
            let fieldName = e.target.name
            handleFormValidation(newFormData, fieldName, isBlure);
        }
    }


    const handleFormValidation = (formData, fieldName, isBlure = false) => {
        let fieldError = ""
        let newFormData = { ...formData };
        if (isBlure) {
            newFormData.touched[fieldName] = true
        }
        switch (fieldName) {
            case "forename": {
                let regExp = /^[0-9a-zA-Z ]+$/
                let forename = formData.values.forename
                console.log("forename.match(regExp)", forename.match(regExp))
                if (forename === "" || null) {
                    fieldError = "Forename must not be empty"
                }
                else if (!forename.match(regExp)) {
                    fieldError = "Forename must contain only alphanumeric"
                }
                else if (forename && forename.trim().length < 3) {
                    fieldError = 'Forename must be at least 3 characters!'
                }
                else {
                    fieldError = ""
                }
                break;
            }

            case "surname": {
                let surname = formData.values.surname
                if (surname === "" || null) {
                    fieldError = "Surname must not be empty"
                }
                else if (surname && surname.trim().length < 3) {
                    fieldError = 'Surname must be at least 3 characters!'
                }
                else {
                    fieldError = ""
                }
                break;
            }

            case "phoneNumber": {
                let regExp = /^[0-9 ]+$/
                let phoneNumber = formData.values.phoneNumber
                if (phoneNumber === "" || null) {
                    fieldError = "phoneNumber must not be empty"
                }
                else if (!phoneNumber.match(regExp)) {
                    fieldError = "Phone Number Should be Number Only."
                }
                else if (phoneNumber && phoneNumber.trim().length < 10) {
                    fieldError = 'Phone Number must be at least 10 characters!'
                }
                else {
                    fieldError = ""
                }

                break;
            }

            default:
                break;
        }

        newFormData.errors[fieldName] = fieldError
        setFormData({ ...formData, newFormData })
    }

    const handleFormReset = () => {
        setFormData({ ...formDataObjectInitialValue })
    }

    const handleFormDataSubmit = () => {
        Object.entries(formData.values).map(([objectKey, objectValue]) => {
            handleFormValidation(formData, objectKey, true)
        })
        let formError = Object.entries(formData.errors).map(([objectKey, objectValue]) => {
            if (objectValue) { return objectKey }
        }).filter((element) => element !== undefined)
        if (!formError[0]) {
            dispatch(createEmployeeActions(formData.values))
        }
    }


    return (
        <Fragment>
            <div>
                <form name="myForm" className={mdl.formStyle}>
                    <div>
                        <div className={allClass("", "formField col", mdl)}>
                            <label className={mdl.formLable} >Forename:</label>
                            <input
                                type="text"
                                id="forename"
                                name="forename"
                                placeholder={t("Forename")}
                                value={values.forename}
                                onChange={handleFormInputChange}
                                className={allClass("text-field", "formInput", mdl)}
                                onBlur={(e) => handleFormInputChange(e, true)}
                            />
                        </div>
                        <small style={{ color: "red" }}>{touched.forename ? errors.forename : ""}</small>
                    </div>

                    <div>
                        <div className={allClass("", "formField col", mdl)}>
                            <label className={mdl.formLable} >Surname:</label>
                            <input
                                type="text"
                                id="surname"
                                name="surname"
                                placeholder={t("Surname")}
                                value={values.surname}
                                onChange={handleFormInputChange}
                                onBlur={(e) => handleFormInputChange(e, true)}
                                className={allClass("text-field", "formInput", mdl)}
                            />
                        </div>
                        <small style={{ color: "red" }}>{touched.surname ? errors.surname : ""}</small>
                    </div>

                    <div>
                        <div className={allClass("", "formField col", mdl)}>
                            <label className={mdl.formLable}>Phone Number:</label>
                            <input
                                type="number"
                                id="phoneNumber"
                                name="phoneNumber"
                                placeholder={t("Phone Number")}
                                value={values.phoneNumber}
                                onChange={handleFormInputChange}
                                onBlur={(e) => handleFormInputChange(e, true)}
                                className={allClass("text-field", "formInput", mdl)} />
                        </div>
                        <small style={{ color: "red" }}>{touched.phoneNumber ? errors.phoneNumber : ""}</small>
                    </div>
                    <div>
                        <div className={allClass("", "formField col", mdl)}>
                            <label className={mdl.formLable}>Email Id:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder={t("Email")}
                                value={values.email}
                                onChange={handleFormInputChange}
                                onBlur={(e) => handleFormInputChange(e, true)}
                                className={allClass("text-field", "formInput", mdl)} />
                        </div>
                        <small style={{ color: "red" }}>{touched.email ? errors.email : ""}</small>
                    </div>

                    <div>
                        <div className={allClass("", "formField col", mdl)}>
                            <label className={mdl.formLable} >Date of Birth:</label>
                            <input
                                type="date"
                                id="dob"
                                name="dob"
                                value={values.dob}
                                onChange={handleFormInputChange}
                                // onBlur={(e) => handleFormInputChange(e, true)}
                                className={allClass("text-field", "formInput", mdl)} />
                        </div>
                        <small style={{ color: "red" }}>{errors.dob}</small>
                    </div>
                    <div>
                        <div className={allClass("", "formField col", mdl)}>
                            <div className={mdl.formLable} >Gender :</div>
                            <label className={mdl.formBackEndLabel}>Male
                                <input type="radio" name="gender" value="male" onChange={handleFormInputChange} checked={values.gender === 'male'} />
                            </label>
                            <label className={mdl.formBackEndLabel}>Female
                                <input type="radio" name="gender" value="female" onChange={handleFormInputChange} checked={values.gender === 'female'} />
                            </label>
                            <label className={mdl.formBackEndLabel}>Other
                                <input type="radio" name="gender" value="other" onChange={handleFormInputChange} checked={values.gender === 'other'} />
                            </label>
                        </div>
                        <small style={{ color: "red" }}>{touched.gender ? errors.gender : ""}</small>
                    </div>

                    <div>
                        <div className={allClass("", "formField col", mdl)} >
                            <div className={mdl.formLable}  >Employee Role:</div>
                            <select
                                id="userRole"
                                name='userRole'
                                value={values.userRole}
                                onChange={handleFormInputChange}
                                onBlur={(e) => handleFormInputChange(e, true)}
                                className="form-dropdown text-field"
                            >
                                <option value="" > Select </option>
                                <option value="developer" > developer </option>
                                <option value="tester" > tester </option>
                            </select>
                        </div>
                        <small style={{ color: "red" }}>{touched.userRole ? errors.userRole : ""}</small>
                    </div>

                    <div className={allClass("", "formField col", mdl)}>
                        <div className={mdl.formLable} > Language Known:</div>
                        <label className={mdl.formProgrammingLanguageKnownLabel}>Javascript
                            <input type="checkbox" name="javascript" onChange={(e) => handleFormInputChange(e, null, "programmingLanguageKnown")} checked={values.programmingLanguageKnown.includes("javascript")} />
                        </label>
                        <label className={mdl.formProgrammingLanguageKnownLabel}>Python
                            <input type="checkbox" name="python" onChange={(e) => handleFormInputChange(e, null, "programmingLanguageKnown")} checked={values.programmingLanguageKnown.includes("python")} />
                        </label>
                        <label className={mdl.formProgrammingLanguageKnownLabel}>Java
                            <input type="checkbox" name="java" onChange={(e) => handleFormInputChange(e, null, "programmingLanguageKnown")} checked={values.programmingLanguageKnown.includes("java")} />
                        </label>
                        <label className={mdl.formProgrammingLanguageKnownLabel}>C#
                            <input type="checkbox" name="C#" onChange={(e) => handleFormInputChange(e, null, "programmingLanguageKnown")} checked={values.programmingLanguageKnown.includes("C#")} />
                        </label>
                    </div>

                    <div className={allClass("", "formField col", mdl)}>
                        <label className={mdl.formLable} >Address :</label>
                        <textarea rows="6" cols="30"
                            id="address"
                            name="address"
                            value={values.address}
                            onChange={handleFormInputChange}
                            onBlur={(e) => handleFormInputChange(e, true)}
                            className={allClass("text-field", "formInput", mdl)} />
                        <small style={{ color: "red" }}>{touched.address ? errors.address : ""}</small>
                    </div>
                    <div>
                        <div className={allClass("", "formField col", mdl)}>
                            <label className={mdl.formLable} >Password:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder={t("password")}
                                value={values.password}
                                onChange={handleFormInputChange}
                                className={allClass("text-field", "formInput", mdl)}
                                onBlur={(e) => handleFormInputChange(e, true)}
                            />
                        </div>
                        <small style={{ color: "red" }}>{touched.password ? errors.password : ""}</small>
                    </div>
                    <div>
                        <div className={allClass("", "formField col", mdl)}>
                            <label className={mdl.formLable} >confirm Password:</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder={t("confirmPassword")}
                                value={values.confirmPassword}
                                onChange={handleFormInputChange}
                                className={allClass("text-field", "formInput", mdl)}
                                onBlur={(e) => handleFormInputChange(e, true)}
                            />
                        </div>
                        <small style={{ color: "red" }}>{touched.confirmPassword ? errors.confirmPassword : ""}</small>
                    </div>

                    <div className="field-btn">
                        <button type="button" onClick={() => handleFormDataSubmit()} className={allClass("btn btn-success", "buttonStyl", mdl)}>Create Employee</button>
                        <button type="reset" onClick={() => handleFormReset()} className={allClass("btn btn-secondary", "buttonStyl", mdl)} >Reset</button>
                        <Link to={`/task/retrieve`} type="button" className={allClass("btn btn-outline-primary mr-2", "buttonStyl", mdl)}>Cancel </Link>
                    </div>
                </form>
            </div>
        </Fragment>
    )
}

export default EmployeeForm
