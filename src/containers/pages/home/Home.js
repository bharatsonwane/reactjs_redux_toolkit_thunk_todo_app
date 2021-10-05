import React, { Fragment } from 'react'

function Home() {
    return (
        <Fragment>
            <h1>Home Page of ToDo App</h1>

            <div className="switch-success">
                <input type="checkbox" id="1" />
                <label htmlFor="1"></label>
            </div>
            <div className="switch-primary">
                <input type="checkbox" id="2" />
                <label htmlFor="2"></label>
            </div>
        </Fragment>
    )
}

export default Home
