import React, { useEffect, createContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from "react-router-dom"
import TaskForm from '../taskForm/TaskForm'
import { retrieveTaskActions } from 'src/redux/task_redux/task_action'


export const taskUpdateContext = createContext()

function TaskUpdate(props) {
    let params = useParams()
    let id = params.id
    const isTaskUpdate = true


    // // ----------redux store useDispatch & useSelector --------------------
    const dispatch = useDispatch()
    // // 2nd way to get data ==> by using useSelector
    const reducerState = useSelector((state) => (state));
    let taskReducer = reducerState.taskReducer
    let retrieveTaskResponse = taskReducer.retrieveTaskResponse


    useEffect(() => {
        dispatch(retrieveTaskActions(id))
    }, [])

    return (
        <React.Fragment>
            <div>
                {/* // // 1st way ==> send data to another component ==> by using props  */}
                {retrieveTaskResponse && <TaskForm taskField={retrieveTaskResponse} isTaskUpdate={isTaskUpdate} />}
            </div>
        </React.Fragment>
    )
}

export default TaskUpdate
