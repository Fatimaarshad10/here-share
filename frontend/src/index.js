import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store , {persistor}  from './store'
import App from "./App";
import {PersistGate} from "redux-persist/integration/react";
// import {persistStore} from 'redux-persist'
const root = ReactDOM.createRoot(document.getElementById("root"));
// let persistor = persistStore(store)
root.render (<Provider store={store}>
    <PersistGate persistor={persistor}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </PersistGate>
</Provider>);
