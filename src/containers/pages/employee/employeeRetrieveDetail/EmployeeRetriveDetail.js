import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { usePrevious } from 'src/helper/customHooks/customHooks' // custome useStateCallback hook
import { useParams, Link } from "react-router-dom"
import mdl from "./employeeRetrieveDetail.module.css"
import { allClass } from 'src/helper/customHooks/customModuleClassMethod'
import { retrieveEmployeeActions, deleteEmployeeActions } from "src/redux/employeeRedux/employeeAction"
import { toast } from 'react-toastify';




function EmployeeRetriveDetail(props) {
    // // ----------Localization hooks & Router Hooks & Props-------------
    let params = useParams()
    let id = params.id


    // // ----------redux store useDispatch & useSelector --------------------
    const dispatch = useDispatch()
    // // 2nd way to get data ==> by using useSelector
    const reducerState = useSelector((state) => (state));
    let employeeReducer = reducerState.employeeReducer

    // // ----------hooks useState--------------------------------------------------



    // // ----------hooks useEffect--------------------------------------------------


    useEffect(() => {
        dispatch(retrieveEmployeeActions(id))
    }, [])


    // // ***To check responce/error after success/error action from reducer***
    const { retrieveEmployeeResponse, retrieveEmployeeError, deleteEmployeeResponse, deleteEmployeeError } = employeeReducer
    const prevPropsState = usePrevious({ deleteEmployeeResponse, deleteEmployeeError }) // custom hook to get previous props & state
    useEffect(() => {
        if (prevPropsState) {
            if (prevPropsState.deleteEmployeeResponse !== deleteEmployeeResponse && deleteEmployeeResponse) {
                setTimeout(() => { toast.success("employee deleted successfully") }, 500);
                props.history.push(`/employee/retrieve`)
            } else if (prevPropsState.deleteEmployeeError !== deleteEmployeeError && deleteEmployeeError) {
                setTimeout(() => { toast.error("Error occure during deleting employee") }, 500);
            }
        }
    }, [employeeReducer])


    // // ----------handler functions--------------------------------------------------
    const handleDeleteEmployee = (id) => {
        dispatch(deleteEmployeeActions(id))
    }

    const handleEditEmployee = (employee) => {
        props.history.push(`/employee/update/${employee.id}`, {
        })
    }


    // let programmingLanguageKnownList = []
    // if (retrieveEmployeeResponse) {
    //     let programmingLanguageKnown = retrieveEmployeeResponse

    //     if (programmingLanguageKnown.redux === true) {
    //         programmingLanguageKnownList.push("redux")
    //     }
    //     if (programmingLanguageKnown.saga === true) {
    //         programmingLanguageKnownList.push("saga")
    //     }
    //     if (programmingLanguageKnown.numpy === true) {
    //         programmingLanguageKnownList.push("numpy")
    //     }
    //     if (programmingLanguageKnown.pandas === true) {
    //         programmingLanguageKnownList.push("pandas")
    //     }
    // }

    return (
        <React.Fragment>
            <h3>Employee Detail</h3>
            {retrieveEmployeeResponse &&
                <div>
                    <div>
                        <Link to={`/employee/retrieve`} type="button" className={allClass("btn btn-outline-primary mr-2", "buttonStyl", mdl)}>Retrieve </Link>
                        <button className={allClass("btn btn-warning", "buttonStyl", mdl)} onClick={(e) => handleEditEmployee(retrieveEmployeeResponse)} > Edit </button>
                        <button className={allClass("btn btn-danger", "buttonStyl", mdl)} onClick={(e) => handleDeleteEmployee(retrieveEmployeeResponse.id)} > Delete </button>
                    </div>
                    <div className={mdl.container}>
                        <table >
                            <tbody>
                                <tr>
                                    <th>ID</th>
                                    <td>{retrieveEmployeeResponse.userId}</td>
                                </tr>
                                <tr>
                                    <th>Forename</th>
                                    <td>{retrieveEmployeeResponse.forename}</td>
                                </tr>
                                <tr>
                                    <th>Surname</th>
                                    <td>{retrieveEmployeeResponse.surname}</td>
                                </tr>
                                <tr>
                                    <th>Date of Birth</th>
                                    <td>{retrieveEmployeeResponse.dob}</td>
                                </tr>
                                <tr>
                                    <th>email</th>
                                    <td>{retrieveEmployeeResponse.email}</td>
                                </tr>
                                <tr>
                                    <th>Phone Number</th>
                                    <td>{retrieveEmployeeResponse.phoneNumber}</td>
                                </tr>
                                <tr>
                                    <th>User Role</th>
                                    <td>{retrieveEmployeeResponse.userRole}</td>
                                </tr>
                                {/* <tr>
                                    <th>programmingLanguage Known</th>
                                    <td>
                                        {programmingLanguageKnownList.map(lib => {
                                            let para = <span>{lib}, </span>
                                            return para
                                        })}
                                    </td>
                                </tr> */}
                            </tbody>
                        </table>
                    </div>
                </div>
            }
        </React.Fragment>
    )
}

export default EmployeeRetriveDetail
