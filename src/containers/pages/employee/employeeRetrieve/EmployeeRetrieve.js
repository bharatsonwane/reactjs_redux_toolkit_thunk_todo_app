import React, { Fragment, useState, useEffect } from 'react'
import { useStateCallback, usePrevious } from 'src/helper/customHooks/customHooks' // custome useStateCallback hook
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom"
import mdl from './employeeRetrieve.module.css'
import { allClass } from 'src/helper/customHooks/customModuleClassMethod'
import { toast } from 'react-toastify';
import { retrieveEmployeeListActions, deleteEmployeeActions } from "src/redux/employeeRedux/employeeAction"
import { useTranslation } from "react-i18next";
import EmployeeActivationModal from './content/EmployeeActivationModal'

import detailInfoSvgIcon from "src/assets/svg/iconmonstr-info-6.svg"
import updateInfoSvgIcon from "src/assets/svg/iconmonstr-pencil-4.svg"
import deleteSvgIcon from "src/assets/svg/iconmonstr-trash-can-17.svg"

function EmployeeRetrieve(props) {
    // // ----------Localization hooks & Router Hooks-------------
    const { t, i18n } = useTranslation("common");
    let history = useHistory()


    // // ----------Props & context & ref ------------------------------



    // // ----------redux store useDispatch & useSelector --------------------
    const dispatch = useDispatch()
    // // 2nd way to get data ==> by using useSelector
    const reducerState = useSelector((state) => (state));
    let employeeReducer = reducerState.employeeReducer
    console.log("employeeReducer", employeeReducer)

    // // ----------hooks useState--------------------------------------------------
    const [state, setState] = useState({
        employeeList: [],
        isShowEmployeeActivationModal: false,
        employeeActivationModalData: null,
    })



    // // ----------hooks useEffect--------------------------------------------------
    // called only first time i.e. like componentDidMount()
    useEffect(() => {
        handleRetrieveEmployee()
    }, [])

    let isLoading = employeeReducer.isLoading
    // // ***To check responce/error after success/error action from reducer***
    const { retrieveEmployeeListResponse, retrieveEmployeeListError, deleteEmployeeResponse, deleteEmployeeError } = employeeReducer
    const prevPropsState = usePrevious({ retrieveEmployeeListResponse, retrieveEmployeeListError, deleteEmployeeResponse, deleteEmployeeError }) // custom hook to get previous props & state

    // called when its dependency changes i.e. like componentDidUpdate()
    useEffect(() => {
        if (prevPropsState) {
            if (retrieveEmployeeListResponse) {
                let newState = { ...state }
                newState.employeeList = retrieveEmployeeListResponse
                setState({ ...newState })
            }
            if (prevPropsState.retrieveEmployeeListError !== retrieveEmployeeListError && retrieveEmployeeListError) {
                setTimeout(() => { toast.error("Something went wrong.") }, 500);
            }
            else if (prevPropsState.deleteEmployeeResponse !== deleteEmployeeResponse && deleteEmployeeResponse) {
                setTimeout(() => { toast.success("Employee deleted successfully") }, 500);
            }
            else if (prevPropsState.deleteEmployeeError !== deleteEmployeeError && deleteEmployeeError) {
                setTimeout(() => { toast.error("Something went wrong. can not be delete Employee") }, 500);
            }
        }
    }, [employeeReducer])


    // // ----------handler functions--------------------------------------------------
    const handleRetrieveEmployee = () => {
        dispatch(retrieveEmployeeListActions())
    }

    const handleDeleteEmployee = (userId) => {
        dispatch(deleteEmployeeActions(userId))
    }

    const handleUpdateEmployee = (employee) => {
        history.push(`/employee/update/${employee.userId}`, {
            employee: employee
        })
    }

    const handleDetailEmployee = (employee) => {
        // // 1st way using props.history
        history.push(`/employee/detail/${employee.userId}`, {
            // employee: employee   // single employee
        })
    }

    const handleShowEmployeeActivationModal = (employee) => {
        setState({ ...state, isShowEmployeeActivationModal: true, employeeActivationModalData: employee })
    }

    const handleHideEmployeeActivationModal = () => {
        setState({ ...state, isShowEmployeeActivationModal: false, employeeActivationModalData: null })
    }

    return (
        <Fragment>
            {!isLoading &&
                <div className="container">
                    <div className="py-4">
                        <h1>Employee List</h1>
                        <table className={mdl.table_hooks, "table border shadow"}>
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">Sr.NO.</th>
                                    <th scope="col">Full Name</th>
                                    <th scope="col">E-mail</th>
                                    <th scope="col">User Role</th>
                                    <th scope="col">Activation Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {state.employeeList && state.employeeList.map((employee, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{employee.forename && employee.forename} {employee.surname && employee.surname}</td>
                                        <td>{employee.email}</td>
                                        <td>{employee.userRole}</td>
                                        <td className="text-center">
                                            <span title={(employee.userActivationStatus !== undefined && employee.userActivationStatus === "activate") ? t("Activate") : t("Deactivate")}>
                                                <div className="switch-primary" >
                                                    <input type="checkbox" id={JSON.stringify(employee)} onChange={(e) => handleShowEmployeeActivationModal(employee)} checked={employee.userActivationStatus === "activate" ? true : false} />
                                                    <label htmlFor={JSON.stringify(employee)}></label>
                                                </div>
                                            </span>
                                        </td>
                                        <td>
                                            <span className="svgStyle">
                                                <img
                                                    src={detailInfoSvgIcon}
                                                    alt="Detail"
                                                    className="svgStyle__filterBlue"
                                                    onClick={(e) => handleDetailEmployee(employee)}
                                                />
                                            </span>
                                            <span className="svgStyle">
                                                <img
                                                    src={updateInfoSvgIcon}
                                                    alt="Update"
                                                    className="svgStyle__filterBlue"
                                                    onClick={(e) => handleUpdateEmployee(employee)}
                                                />
                                            </span>
                                            <span className="svgStyle">
                                                <img
                                                    src={deleteSvgIcon}
                                                    alt="Delete"
                                                    className="svgStyle__filterBlue"
                                                    onClick={(e) => handleDeleteEmployee(employee.userId)}
                                                />
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {state.employeeList && state.employeeList.length === 0 && <h3>Employee List is not available.</h3>}
                    </div>
                </div>
            }

            {state.isShowEmployeeActivationModal &&
                <EmployeeActivationModal
                    updateActivationEmployeeData={state.employeeActivationModalData}
                    hideModal={() => handleHideEmployeeActivationModal(false)}
                />}
        </Fragment>
    )
}

export default EmployeeRetrieve
