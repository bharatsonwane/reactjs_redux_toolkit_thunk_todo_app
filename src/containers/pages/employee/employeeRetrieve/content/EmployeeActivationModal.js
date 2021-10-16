import React, { Fragment, useState, useEffect } from 'react'
import { usePrevious } from 'src/helper/customHooks/customHooks';
import { Modal, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { useTranslation } from "react-i18next";
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { updateEmployeeActivationStatusActions, retrieveEmployeeListActions } from 'src/redux/employeeRedux/employeeAction';



function EmployeeActivationModal(props) {
    // // ----------Localization hooks & Router Hooks-------------
    const { t, i18n } = useTranslation("common");


    // // ----------Props & context & ref ------------------------------
    const { updateActivationEmployeeData } = props
    const location = useLocation();



    // // ----------redux store useDispatch & useSelector --------------------
    const dispatch = useDispatch()
    const reducerState = useSelector((state) => (state));
    const employeeReducer = reducerState.employeeReducer

    // useState ---------------------------------------------------
    const [show, setShow] = useState(false);


    // usePrevious--------- ***To check responce/error after success/error action from reducer***
    const { updateEmployeeActivationResponse, updateEmployeeActivationError, } = employeeReducer
    const prevPropsState = usePrevious({ updateEmployeeActivationResponse, updateEmployeeActivationError, }) // custom hook to get previous props & state




    // useEffect ----------------------------------------------
    useEffect(() => {
        setShow(true)
    }, [])

    useEffect(() => {
        if (prevPropsState) {
            if (prevPropsState.updateEmployeeActivationResponse !== updateEmployeeActivationResponse && updateEmployeeActivationResponse) {
                props.hideModal();
            }
            else if (prevPropsState.updateEmployeeActivationError !== updateEmployeeActivationError && updateEmployeeActivationError) {

            }
        }
    }, [employeeReducer])


    // handler -----------------------------------------------------
    const handleHideModal = (val) => {
        props.hideModal();
    }

    const handleUpdateEmployeeActivationStatus = () => {
        let userActivationStatus = updateActivationEmployeeData.userActivationStatus === "pending" ? "activate"
            : updateActivationEmployeeData.userActivationStatus === "activate" ? "deactivate"
                : "activate"
        let activationModel = {
            userId: updateActivationEmployeeData.userId,
            userActivationStatus: userActivationStatus
        }
        dispatch(updateEmployeeActivationStatusActions(activationModel))
    }



    return (
        <Modal
            show={show}
            onHide={() => handleHideModal(false)}
            size="sm"
            className="employeeActivationModal"
        >
            <Modal.Body>
                <div >
                    {updateActivationEmployeeData.userActivationStatus === "activate" &&
                        <Fragment>
                            {t("Are you sure you want to deactivate this employee record")}?
                        </Fragment>
                    }
                    {updateActivationEmployeeData.userActivationStatus === "pending" || updateActivationEmployeeData.userActivationStatus === "deactivate" ?
                        <Fragment>
                            {t("Are you sure you want to activate this employee record")}?
                        </Fragment>
                        :
                        ""
                    }
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => handleHideModal(false)}>{t("Close")}</Button>
                <Button variant="primary" onClick={() => handleUpdateEmployeeActivationStatus()}>{t("Confirm")}</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default EmployeeActivationModal
