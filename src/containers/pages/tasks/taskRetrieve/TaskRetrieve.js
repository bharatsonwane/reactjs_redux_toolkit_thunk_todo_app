import React, { Fragment, useState, useEffect } from 'react'
import { useStateCallback, usePrevious } from 'src/helper/customHooks/customHooks' // custome useStateCallback hook
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom"
import mdl from './taskRetrieve.module.css'
import { allClass } from 'src/helper/customHooks/customModuleClassMethod'
import { toast } from 'react-toastify';
import { retrieveTaskListActions, deleteTaskActions, updateTaskCompleteStatusActions, updateTaskTestingReportActions } from "src/redux/taskRedux/taskAction"



import detailInfoSvgIcon from "src/assets/svg/iconmonstr-info-6.svg"
import updateInfoSvgIcon from "src/assets/svg/iconmonstr-pencil-4.svg"
import deleteSvgIcon from "src/assets/svg/iconmonstr-trash-can-17.svg"
import completeSvgIcon from "src/assets/svg/iconmonstr-check-mark-14.svg"
import testingFailed from "src/assets/svg/iconmonstr-x-mark-1.svg"


function TaskRetrieve(props) {
    // // ----------Localization hooks & Router Hooks-------------
    let history = useHistory()


    // // ----------Props & context & ref ------------------------------
    let userRole = localStorage.getItem("userRole")


    // // ----------redux store useDispatch & useSelector --------------------
    const dispatch = useDispatch()
    // // 2nd way to get data ==> by using useSelector
    const reducerState = useSelector((state) => (state));
    let taskReducer = reducerState.taskReducer


    // // ----------hooks useState--------------------------------------------------
    const [taskList, setTaskList] = useState(null)



    // // ----------hooks useEffect--------------------------------------------------
    // called only first time i.e. like componentDidMount()
    useEffect(() => {
        handleRetrieveTask()
    }, [])

    let isLoading = taskReducer.isLoading
    // let taskList = JSON.parse(taskReducer.retrieveTaskListResponse)
    // // ***To check responce/error after success/error action from reducer***
    const { retrieveTaskListResponse, retrieveTaskListError, deleteTaskResponse, deleteTaskError } = taskReducer
    const prevPropsState = usePrevious({ retrieveTaskListResponse, retrieveTaskListError, deleteTaskResponse, deleteTaskError }) // custom hook to get previous props & state

    // called when its dependency changes i.e. like componentDidUpdate()
    useEffect(() => {
        if (prevPropsState) {
            if (retrieveTaskListResponse) {
                // setTaskList(JSON.parse(retrieveTaskListResponse))
                setTaskList(retrieveTaskListResponse)
            }
            else if (prevPropsState.retrieveTaskListError !== retrieveTaskListError && retrieveTaskListError) {
                setTimeout(() => { toast.error("Something went wrong.") }, 500);
            }
            if (prevPropsState.deleteTaskResponse !== deleteTaskResponse && deleteTaskResponse) {
                setTimeout(() => { toast.success("Task deleted successfully") }, 500);
            }
            else if (prevPropsState.deleteTaskError !== deleteTaskError && deleteTaskError) {
                setTimeout(() => { toast.error("Something went wrong. can not be delete task") }, 500);
            }
        }
    }, [taskReducer])


    // // ----------handler functions--------------------------------------------------
    const handleRetrieveTask = () => {
        dispatch(retrieveTaskListActions())
    }

    const handleTaskDetail = (task) => {
        // // 1st way using props.history
        history.push(`/task/detail/${task.id}`, {
            task: task   // single task
        })
    }

    const handleEditTask = (task) => {
        history.push(`/task/update/${task.id}`, {
            task: task
        })
    }

    const handleDeleteTask = (id) => {
        dispatch(deleteTaskActions(id))
    }

    const handleTaskCompleteByDeveloper = (id) => {
        let modelObj = {
            id: id,
            completeStatus: "completed"
        }
        dispatch(updateTaskCompleteStatusActions(modelObj))
    }

    const handleUpdateTaskTestingReportByTester = (id, testingStatus) => {
        let modelObj = {
            id: id,
            testingStatus: testingStatus
        }
        dispatch(updateTaskTestingReportActions(modelObj))
    }


    return (
        <div>
            {!isLoading &&
                <div className="container">
                    <div className="py-4">
                        <h1>Task List</h1>
                        {taskList != null && taskList[0] ?
                            <table className={mdl.table_hooks, "table border shadow"}>
                                <thead className="thead-dark">
                                    <tr>
                                        <th scope="col" className="text-center">Sr.NO.</th>
                                        <th scope="col" className="text-center">Date</th>
                                        <th scope="col" className="text-center">Title</th>
                                        <th scope="col" className="text-center">Description</th>
                                        <th className="text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {taskList && taskList.map((task, index) => (
                                        <tr key={index}>
                                            <th scope="row" className="text-center">{index + 1}</th>
                                            <td className="text-center">{task.date}</td>
                                            <td className="text-center">{task.title}</td>
                                            <td className="text-center">{task.description}</td>
                                            <td className="text-center">
                                                <span className="svgStyle">
                                                    <img
                                                        src={detailInfoSvgIcon}
                                                        alt="Detail"
                                                        className="svgStyle__filterBlue"
                                                        onClick={(e) => handleTaskDetail(task)}
                                                    />
                                                </span>
                                                {userRole === "owner" || userRole === "manager" && (
                                                    <Fragment>
                                                        <span className="svgStyle">
                                                            <img
                                                                src={updateInfoSvgIcon}
                                                                alt="Update"
                                                                className="svgStyle__filterBlue"
                                                                onClick={() => handleEditTask(task)}
                                                            />
                                                        </span>
                                                        <span className="svgStyle">
                                                            <img
                                                                src={deleteSvgIcon}
                                                                alt="Delete"
                                                                className="svgStyle__filterBlue"
                                                                onClick={() => handleDeleteTask(task.id)}
                                                            />
                                                        </span>
                                                    </Fragment>
                                                )}
                                                {userRole === "developer" && (
                                                    <Fragment>
                                                        <span className="svgStyle">
                                                            <img
                                                                src={completeSvgIcon}
                                                                alt="task complete"
                                                                className="svgStyle__filterBlue"
                                                                onClick={() => handleTaskCompleteByDeveloper(task.id)}
                                                            />
                                                        </span>
                                                    </Fragment>
                                                )}
                                                {userRole === "tester" && (
                                                    <Fragment>
                                                        <span className="svgStyle">
                                                            <img
                                                                src={completeSvgIcon}
                                                                alt="task complete"
                                                                className="svgStyle__filterBlue"
                                                                onClick={() => handleUpdateTaskTestingReportByTester(task.id, "passed")}
                                                            />
                                                        </span>
                                                        <span className="svgStyle">
                                                            <img
                                                                src={testingFailed}
                                                                alt="task complete"
                                                                className="svgStyle__filterBlue"
                                                                onClick={() => handleUpdateTaskTestingReportByTester(task.id, "failed")}
                                                            />
                                                        </span>
                                                    </Fragment>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            : <h3>Task List is not available.</h3>}
                    </div>
                </div>
            }
        </div>
    )
}

export default TaskRetrieve
