import React, { Fragment, Suspense } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// // redux 
import { Provider } from 'react-redux'
import { store } from "./redux/store"


// // localization 
import "src/utils/locales/i18n"

// // Root Routes
import Routes from 'src/containers/Routes';
import SplashScreen from 'src/containers/screens/SplashScreen';

function App() {

  return (
    <Fragment >
      <Suspense fallback={<SplashScreen />}>
        <Provider store={store} >
          <Routes />
        </Provider>
      </Suspense>
    </Fragment>
  )
}

export default App
