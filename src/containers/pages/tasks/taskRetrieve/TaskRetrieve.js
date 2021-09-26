import React, { useState, useEffect } from 'react'
import { useStateCallback, usePrevious } from 'src/helper/customHooks/customHooks' // custome useStateCallback hook
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom"
import mdl from './taskRetrieve.module.css'
import { allClass } from 'src/helper/customHooks/customModuleClassMethod'
import { toast } from 'react-toastify';
import { retrieveTaskListActions, deleteTaskActions } from "src/redux/task_redux/task_action"



import detailInfoSvgIcon from "src/assets/svg/iconmonstr-info-6.svg"
import updateInfoSvgIcon from "src/assets/svg/iconmonstr-pencil-4.svg"
import deleteSvgIcon from "src/assets/svg/iconmonstr-trash-can-17.svg"

function TaskRetrieve(props) {
    // // ----------Localization hooks & Router Hooks-------------
    let history = useHistory()


    // // ----------Props & context & ref ------------------------------



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
            if (prevPropsState.retrieveTaskListResponse !== retrieveTaskListResponse && retrieveTaskListResponse) {
                // setTaskList(JSON.parse(retrieveTaskListResponse))
                setTaskList(retrieveTaskListResponse)
            }
            if (prevPropsState.retrieveTaskListError !== retrieveTaskListError && retrieveTaskListError) {
                setTimeout(() => { toast.error("Something went wrong.") }, 500);
            }
            else if (prevPropsState.deleteTaskResponse !== deleteTaskResponse && deleteTaskResponse) {
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

    const handleDeleteTask = (id) => {
        dispatch(deleteTaskActions(id))
    }

    const handleEditTask = (task) => {
        history.push(`/task/update/${task.id}`, {
            task: task
        })
    }

    const handleTaskDetail = (task) => {
        // // 1st way using props.history
        history.push(`/task/detail/${task.id}`, {
            task: task   // single task
        })
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
                                        <th scope="col">Sr.NO.</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Title</th>
                                        <th scope="col">Description</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {taskList && taskList.map((task, index) => (
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{task.date}</td>
                                            <td>{task.title}</td>
                                            <td>{task.description}</td>
                                            <td>
                                                <span className="svgStyle">
                                                    <img
                                                        src={detailInfoSvgIcon}
                                                        alt="Detail"
                                                        className="svgStyle__filterBlue"
                                                        onClick={(e) => handleTaskDetail(task)}
                                                    />
                                                </span>
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
