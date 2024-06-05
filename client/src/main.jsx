import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from "react-redux"
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from "redux-persist/integration/react"
import { store, persistor } from "./redux/reducers/store.js"
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>

  </React.StrictMode>,
)
