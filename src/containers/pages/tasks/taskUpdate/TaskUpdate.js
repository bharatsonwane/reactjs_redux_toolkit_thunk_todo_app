import React, { useState, useEffect, createContext } from 'react'
import { useStateCallback, usePrevious } from 'src/helper/customHooks/customHooks' // custome useStateCallback hook
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom"
import { useParams } from "react-router-dom"
import TaskForm from '../taskForm/TaskForm'
import { retrieveTaskActions } from 'src/redux/taskRedux/taskAction'
import { toast } from 'react-toastify';


export const taskUpdateContext = createContext()

function TaskUpdate(props) {
    // // ----------Localization hooks & Router Hooks-------------
    let history = useHistory()


    // // ----------Props & context & ref ------------------------------
    let params = useParams()
    let id = params.id
    const isTaskUpdate = true


    // // ----------redux store useDispatch & useSelector --------------------
    const dispatch = useDispatch()
    // // 2nd way to get data ==> by using useSelector
    const reducerState = useSelector((state) => (state));
    let taskReducer = reducerState.taskReducer



    const [state, setState] = useState({
        retrieveTaskResponse: null,
    })


    useEffect(() => {
        dispatch(retrieveTaskActions(id))
    }, [])


    const { retrieveTaskResponse, retrieveTaskError } = taskReducer
    const prevPropsState = usePrevious({ retrieveTaskResponse, retrieveTaskError }) // custom hook to get previous props & state

    // called when its dependency changes i.e. like componentDidUpdate()
    useEffect(() => {
        if (prevPropsState) {
            if (prevPropsState.retrieveTaskResponse !== retrieveTaskResponse && retrieveTaskResponse) {
                setState({ ...state, retrieveTaskResponse: retrieveTaskResponse })
            }
            else if (prevPropsState.retrieveTaskError !== retrieveTaskError && retrieveTaskError) {
                setTimeout(() => { toast.error("Something went wrong.") }, 500);
                history.push(`/task/retrieve`)
            }
        }
    }, [taskReducer])


    return (
        <React.Fragment>
            <div>
                {state.retrieveTaskResponse && <TaskForm taskField={state.retrieveTaskResponse} isTaskUpdate={isTaskUpdate} />}
            </div>
        </React.Fragment>
    )
}

export default TaskUpdate
