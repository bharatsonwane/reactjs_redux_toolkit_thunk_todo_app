import React, { Fragment, Suspense } from 'react'
// // import library styles files
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// // import styles sass main file
import "src/assets/sass/main.scss"

// // redux 
import { Provider } from 'react-redux'
// import store from "./redux/store"

// // redux persist config
import store, { persistor } from "./redux/storeReduxPersist"
import { PersistGate } from 'redux-persist/integration/react'

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
          <PersistGate loading={null} persistor={persistor}>
            <Routes />
          </PersistGate>
        </Provider>
      </Suspense>
    </Fragment>
  )
}

export default App
