import React, { Fragment, useState, useEffect } from 'react'
import { usePrevious } from 'src/helper/customHooks/customHooks'
import { allClass } from 'src/helper/customHooks/customModuleClassMethod'
import mdl from "./feedbackForm.module.css"
import { useHistory, Link } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from "react-i18next";
import { useFormik, Field } from "formik";
import * as yup from "yup";
import { createFeedbackActions } from 'src/redux/feedbackRedux/feedbackAction';



function FeedbackCreate() {
    // // ----------Localization hooks & Router Hooks-------------
    const { t, i18n } = useTranslation("common");
    let history = useHistory()


    // // ----------Props & context & ref ------------------------------



    // // ----------redux store useDispatch & useSelector --------------------
    const dispatch = useDispatch()
    const reducerState = useSelector((state) => (state));
    let feedbackReducer = reducerState.feedbackReducer

    // // ----------hooks useState--------------------------------------------------
    // const [state, setState] = useState({})


    // // usePrevious -----------------------------------------------------------
    // // ***To check responce/error after success/error action from reducer***
    const { createFeedbackResponse, createFeedbackError, } = feedbackReducer
    const prevPropsState = usePrevious({ createFeedbackResponse, createFeedbackError, }) // custom hook to get previous props & state

    // // hooks useEffect -----------------------------------------------------------
    useEffect(() => {
        if (prevPropsState) {
            if (prevPropsState.createFeedbackResponse !== createFeedbackResponse && createFeedbackResponse) {
                history.push("/")
            }
            else if (prevPropsState.createFeedbackError !== createFeedbackError && createFeedbackError) {
                console.log("somethink went wrong")
            }
        }
    }, [feedbackReducer])


    // // Formik Hooks----------------------------------------------------------
    const formik = useFormik({
        // initial value
        initialValues: {
            date: "",
            fullName: "",
            phoneNumber: "",
            email: "",
            uiTech: "",
            backEndTech: "",
            library: [],
            serviceSatisfaction: true,
            message: ""
        },

        // vlidation-----------------------------------------------------------
        validationSchema: yup.object({
            fullName: yup.string()
                .required(t("Required"))
                .max(30, t("Maximum 30 character")),

            phoneNumber: yup.string()
                .required(t("Required"))
                .min(7, t("Number must be between 7 and 12 digits"))
                .max(12, t("Number must be between 7 and 12 digits")),

            email: yup.string()
                .required(t("Required"))
                .email(t("Please enter a valid email")),


            message: yup.string()
                .required(t("Required")),
        }),
        // submit function
        onSubmit: (values) => {
            let creatFeedbackObject = {
                date: values.date,
                fullName: values.fullName,
                phoneNumber: values.phoneNumber.toString(),
                email: values.email,
                uiTech: values.uiTech,
                backEndTech: values.backEndTech,
                library: values.library,
                serviceSatisfaction: values.serviceSatisfaction,
                message: values.message,
            }
            dispatch(createFeedbackActions(creatFeedbackObject))
        },
    });
    // // destructuring variable & function from formik Object 
    const { values, errors, touched, isSubmitting, handleChange, handleSubmit, handleBlur, resetForm } = formik

    const handleLibraryCheckbox = (e) => {
        const { checked, name } = e.target;
        if (checked) {
            formik.setFieldValue("library", [...formik.values.library, name]);
        } else {
            formik.setFieldValue(
                "library",
                formik.values.library.filter((v) => v !== name)
            );
        }
    }

    return (
        <Fragment>
            <div>
                <h2>Feedback</h2>
                <form onSubmit={handleSubmit} name="myForm" className={mdl.formStyle}>
                    <div className={allClass("", "formField col", mdl)}>
                        <label className={mdl.formLable} >Date:</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={values.date}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={allClass("text-field", "formInput", mdl)} />
                        <small style={{ color: "red" }}>{errors.date}</small>
                    </div>
                    <div>
                        <div className={allClass("", "formField col", mdl)}>
                            <label className={mdl.formLable} >Full Name:</label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                placeholder={t("First Name")}
                                value={values.fullName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={allClass("text-field", "formInput", mdl)}
                            />
                        </div>
                        <small style={{ color: "red" }}>{touched.fullName ? errors.fullName : ""}</small>
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
                                onChange={handleChange}
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
                                onChange={handleChange}
                                className={allClass("text-field", "formInput", mdl)} />
                        </div>
                        <small style={{ color: "red" }}>{touched.email ? errors.email : ""}</small>
                    </div>
                    <div>
                        <div className={allClass("", "formField col", mdl)} >
                            <div className={mdl.formLable}  >UI Technology used:</div>
                            <select
                                id="uiTech"
                                name='uiTech'
                                value={values.uiTech}
                                onChange={handleChange}
                                className="form-dropdown text-field"
                            >
                                <option value="" > Select </option>
                                <option value="react" > React </option>
                                <option value="angular"> Angular </option>
                                <option value="flutter"> Flutter </option>
                                <option value="vue.js"> Vue.js </option>
                            </select>
                        </div>
                        <small style={{ color: "red" }}>{touched.uiTech ? errors.uiTech : ""}</small>
                    </div>
                    <div>
                        <div className={allClass("", "formField col", mdl)}>
                            <div className={mdl.formLable} >Back-End Technology :</div>
                            <label className={mdl.formBackEndLabel}>Python
                                <input type="radio" name="backEndTech" value="python" onChange={handleChange} checked={values.backEndTech === 'python'} />
                            </label>
                            <label className={mdl.formBackEndLabel}>.NET
                                <input type="radio" name="backEndTech" value=".net" onChange={handleChange} checked={values.backEndTech === '.net'} />
                            </label>
                            <label className={mdl.formBackEndLabel}>PHP
                                <input type="radio" name="backEndTech" value="php" onChange={handleChange} checked={values.backEndTech === 'php'} />
                            </label>
                        </div>
                        <small style={{ color: "red" }}>{touched.backEndTech ? errors.backEndTech : ""}</small>
                    </div>
                    <div className={allClass("", "formField col", mdl)}>
                        <div className={mdl.formLable} >Library Used:</div>
                        <label className={mdl.formLibraryLabel}>Redux
                            <input type="checkbox" name="redux" onChange={(e) => handleLibraryCheckbox(e)} checked={formik.values.library.includes("redux")} />
                        </label>
                        <label className={mdl.formLibraryLabel}>Saga
                            <input type="checkbox" name="saga" onChange={(e) => handleLibraryCheckbox(e)} checked={formik.values.library.includes("saga")} />
                        </label>
                        <label className={mdl.formLibraryLabel}>Numpy
                            <input type="checkbox" name="numpy" onChange={(e) => handleLibraryCheckbox(e)} checked={formik.values.library.includes("numpy")} />
                        </label>
                        <label className={mdl.formLibraryLabel}>Pandas
                            <input type="checkbox" name="pandas" onChange={(e) => handleLibraryCheckbox(e)} checked={formik.values.library.includes("pandas")} />
                        </label>
                    </div>

                    <div className={allClass("", "formField col", mdl)}>
                        <label className={mdl.formLable} >Message :</label>
                        <textarea rows="6" cols="30"
                            id="message"
                            name="message"
                            value={values.message}
                            onChange={handleChange}
                            className={allClass("text-field", "formInput", mdl)} />
                    </div>
                    <small style={{ color: "red" }}>{touched.message ? errors.message : ""}</small>


                    <div>
                        <div className={allClass("", "formField col", mdl)}>
                            <label className={mdl.formLable} > Are you satisfied with our service?:</label>
                            {console.log("serviceSatisfaction", values.serviceSatisfaction)}
                            <div className="switch__serviceSatisfaction">
                                <input
                                    type="checkbox"
                                    id="serviceSatisfaction"
                                    name="serviceSatisfaction"
                                    checked={values.serviceSatisfaction}
                                    onChange={handleChange}
                                />
                                <label htmlFor="serviceSatisfaction"></label>
                            </div>
                        </div>
                    </div>

                    <div className="field-btn">
                        <button type="submit" className={allClass("btn btn-success", "buttonStyl", mdl)}>Send Feedback</button>
                        <button type="reset" onClick={() => resetForm()} className={allClass("btn btn-secondary", "buttonStyl", mdl)} >Reset</button>
                        <Link to={`/task/retrieve`} type="button" className={allClass("btn btn-outline-primary mr-2", "buttonStyl", mdl)}>Cancel </Link>
                    </div>
                </form>
            </div>
        </Fragment>
    )
}

export default FeedbackCreate
