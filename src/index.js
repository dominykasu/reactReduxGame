import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";
import characterReducer from "./features/character";
import inventoryReducer from "./features/inventory";
import weaponReducer from "./features/weapon";
const store = configureStore({
    reducer:{
        character:characterReducer,
        inventory:inventoryReducer,
        weapon:weaponReducer
    }
})
ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <App />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


//TODO: fix max health limit in arena
//TODO: Add stamina potions
//TODO: Weapon Effects
//TODO Style it