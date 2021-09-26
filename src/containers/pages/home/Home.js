import React, { Fragment } from 'react'

function Home() {
    return (
        <Fragment>
            <h1>Home Page of ToDo App</h1>

            <div class="switch-success">
                <input type="checkbox" id="1" />
                <label for="1"></label>
            </div>
            <div class="switch-primary">
                <input type="checkbox" id="2" />
                <label for="2"></label>
            </div>
        </Fragment>
    )
}

export default Home
