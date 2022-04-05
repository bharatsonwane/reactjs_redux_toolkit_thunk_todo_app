import React, { Fragment, useMemo } from 'react';
import { useSelector } from 'react-redux';
import "./customLoader.scss"



export default function CustomLoader(props) {


    // // *********loading functinality for api call depent on reducer*********
    const reducerState = useSelector((state) => (state));
    const getIsLoadingValue = useMemo(() => {
        // // check isLoading in every reducer if in any reducer it is true then returen true elese (after checking every reducer) return false
        for (const reducer in reducerState) {  //  for in loop to iterate object
            if (reducerState[reducer].isLoading === true) {
                // checking (isLoading === true) condition in very reducer & if satisfied in any reducer then return true 
                return true
            }
        }
        // after checking (isLoading === true) condition in very reducer & not satisfied then return false 
        return false
    }, [reducerState])


    return (
        (getIsLoadingValue) ?
            (
                <Fragment>
                    <div className="loadingOverlay">
                        <div className="loadingOverlay__background" />
                        <div className="text-center">
                            <div className="spinner-border text-primary" role="status" />
                            <p className="sr-only">Loading...</p>
                        </div>
                    </div>
                </Fragment>
            )
            : (
                null
            )
    )
}
