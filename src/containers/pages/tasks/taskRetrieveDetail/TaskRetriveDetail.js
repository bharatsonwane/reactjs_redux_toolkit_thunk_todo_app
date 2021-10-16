import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { usePrevious } from 'src/helper/customHooks/customHooks' // custome useStateCallback hook
import { useParams, Link } from "react-router-dom"
import mdl from "./TaskRetrieveDetail.module.css"
import { allClass } from 'src/helper/customHooks/customModuleClassMethod'
import { retrieveTaskActions, deleteTaskActions } from "src/redux/taskRedux/taskAction"
import { toast } from 'react-toastify';


function TaskRetriveDetail(props) {
    // // ----------Localization hooks & Router Hooks & Props-------------
    let params = useParams()
    let id = params.id


    // // ----------redux store useDispatch & useSelector --------------------
    const dispatch = useDispatch()
    // // 2nd way to get data ==> by using useSelector
    const reducerState = useSelector((state) => (state));
    let taskReducer = reducerState.taskReducer

    // // ----------hooks useState--------------------------------------------------



    // // ----------hooks useEffect--------------------------------------------------


    useEffect(() => {
        dispatch(retrieveTaskActions(id))
    }, [])


    // // ***To check responce/error after success/error action from reducer***
    const { retrieveTaskResponse, deleteTaskResponse, deleteTaskError } = taskReducer
    const prevPropsState = usePrevious({ deleteTaskResponse, deleteTaskError }) // custom hook to get previous props & state
    useEffect(() => {
        if (prevPropsState) {
            if (prevPropsState.deleteTaskResponse !== deleteTaskResponse && deleteTaskResponse) {
                setTimeout(() => { toast.success("Task deleted successfully") }, 500);
                props.history.push(`/task/retrieve`)
            } else if (prevPropsState.deleteTaskError !== deleteTaskError && deleteTaskError) {
                setTimeout(() => { toast.error("Error occure during deleting Task") }, 500);
            }
        }
    }, [taskReducer])


    // // ----------handler functions--------------------------------------------------
    const handleDeleteTask = (id) => {
        dispatch(deleteTaskActions(id))
    }

    const handleEditTask = (task) => {
        props.history.push(`/task/update/${task.id}`, {
            // task: task
        })
    }


    let libraryList = []
    if (retrieveTaskResponse) {
        let library = retrieveTaskResponse

        if (library.redux === true) {
            libraryList.push("redux")
        }
        if (library.saga === true) {
            libraryList.push("saga")
        }
        if (library.numpy === true) {
            libraryList.push("numpy")
        }
        if (library.pandas === true) {
            libraryList.push("pandas")
        }
    }

    return (
        <React.Fragment>
            <h3>Task Detail</h3>
            {retrieveTaskResponse &&
                <div>
                    <div>
                        <Link to={`/task/retrieve`} type="button" className={allClass("btn btn-outline-primary mr-2", "buttonStyl", mdl)}>Retrieve </Link>
                        <button className={allClass("btn btn-warning", "buttonStyl", mdl)} onClick={(e) => handleEditTask(retrieveTaskResponse)} > Edit </button>
                        <button className={allClass("btn btn-danger", "buttonStyl", mdl)} onClick={(e) => handleDeleteTask(retrieveTaskResponse.id)} > Delete </button>
                    </div>
                    <div className={mdl.container}>
                        <table >
                            <tbody>
                                <tr>
                                    <th>ID</th>
                                    <td>{retrieveTaskResponse.id}</td>
                                </tr>
                                <tr>
                                    <th>Date</th>
                                    <td>{retrieveTaskResponse.date}</td>
                                </tr>
                                <tr>
                                    <th>Title</th>
                                    <td>{retrieveTaskResponse.title}</td>
                                </tr>
                                <tr>
                                    <th>Description</th>
                                    <td>{retrieveTaskResponse.description}</td>
                                </tr>
                                <tr>
                                    <th>UI Technology</th>
                                    <td>{retrieveTaskResponse.technology.uiTech}</td>
                                </tr>
                                <tr>
                                    <th>Back End Technology</th>
                                    <td>{retrieveTaskResponse.technology.backEndTech}</td>
                                </tr>
                                <tr>
                                    <th>Library Used</th>
                                    <td>
                                        {libraryList.map(lib => {
                                            let para = <span>{lib}, </span>
                                            return para
                                        })}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            }
        </React.Fragment>
    )
}

export default TaskRetriveDetail
