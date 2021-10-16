import React, { Fragment, useState, useEffect } from 'react'
import { useStateCallback, usePrevious } from 'src/helper/customHooks/customHooks' // custome useStateCallback hook
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom"
import mdl from './taskRetrieve.module.css'
import { allClass } from 'src/helper/customHooks/customModuleClassMethod'
import { toast } from 'react-toastify';
import { retrievefeedbackListActions, deleteTaskActions, updateTaskCompleteStatusActions, updateTaskTestingReportActions } from "src/redux/taskRedux/taskAction"
import { retrieveFeedbackActions } from "src/redux/feedbackRedux/feedbackAction"


import detailInfoSvgIcon from "src/assets/svg/iconmonstr-info-6.svg"
import updateInfoSvgIcon from "src/assets/svg/iconmonstr-pencil-4.svg"
import deleteSvgIcon from "src/assets/svg/iconmonstr-trash-can-17.svg"
import completeSvgIcon from "src/assets/svg/iconmonstr-check-mark-14.svg"
import testingFailed from "src/assets/svg/iconmonstr-x-mark-1.svg"


function FeedbackRetrieve(props) {
    // // ----------Localization hooks & Router Hooks-------------
    let history = useHistory()


    // // ----------Props & context & ref ------------------------------
    let userRole = localStorage.getItem("userRole")


    // // ----------redux store useDispatch & useSelector --------------------
    const dispatch = useDispatch()
    // // 2nd way to get data ==> by using useSelector
    const reducerState = useSelector((state) => (state));
    let feedbackReducer = reducerState.feedbackReducer

    // // ----------hooks useState--------------------------------------------------
    const [feedbackList, setFeedbackList] = useState(null)



    // // ----------hooks useEffect--------------------------------------------------
    // called only first time i.e. like componentDidMount()
    useEffect(() => {
        dispatch(retrieveFeedbackActions())
    }, [])

    let isLoading = feedbackReducer.isLoading
    // let feedbackList = JSON.parse(taskReducer.retrieveFeedbackResponse)
    // // ***To check responce/error after success/error action from reducer***
    const { retrieveFeedbackResponse, retrieveFeedbackError } = feedbackReducer
    const prevPropsState = usePrevious({ retrieveFeedbackResponse, retrieveFeedbackError }) // custom hook to get previous props & state

    // called when its dependency changes i.e. like componentDidUpdate()
    useEffect(() => {
        if (prevPropsState) {
            if (prevPropsState.retrieveFeedbackResponse !== retrieveFeedbackResponse && retrieveFeedbackResponse) {
                setFeedbackList(retrieveFeedbackResponse)
            }
            else if (prevPropsState.retrieveFeedbackError !== retrieveFeedbackError && retrieveFeedbackError) {
                setTimeout(() => { toast.error("Something went wrong.") }, 500);
            }

        }
    }, [feedbackReducer])


    // // ----------handler functions--------------------------------------------------


    return (
        <div>
            {!isLoading &&
                <div className="container">
                    <div className="py-4">
                        <h1>Feedback List</h1>
                        {feedbackList != null && feedbackList[0] ?
                            <table className={mdl.table_hooks, "table border shadow"}>
                                <thead className="thead-dark">
                                    <tr>
                                        <th scope="col" className="text-center">Sr.NO.</th>
                                        <th scope="col" className="text-center">User Name</th>
                                        <th scope="col" className="text-center">Service Satisfaction</th>
                                        <th scope="col" className="text-center">Message</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {feedbackList && feedbackList.map((feedback, index) => (
                                        <tr key={index}>
                                            <th scope="row" className="text-center">{index + 1}</th>
                                            <td className="text-center">{feedback.fullName}</td>
                                            <td className="text-center">
                                                <div className="switch__serviceSatisfaction">
                                                    <input type="checkbox" id={JSON.stringify(feedback.id)} checked={feedback.serviceSatisfaction} />
                                                    <label htmlFor={JSON.stringify(feedback.id)}></label>
                                                </div>
                                            </td>
                                            <td className="text-center">{feedback.message}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            : <h3>Feedback List is not available.</h3>}
                    </div>
                </div>
            }
        </div>
    )
}

export default FeedbackRetrieve


