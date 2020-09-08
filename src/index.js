import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer, { rootSaga } from "./modules/index";

import App from "./App";
import { check } from "./modules/account/user";

import "semantic-ui-css/semantic.min.css";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

function loadUser() {
  // 새로고침을 하더라도 로그인 상태를 유지
  try {
    const user = localStorage.getItem("user");

    if (!user) return;

    // store.dispatch(tempSetUser(user));
    store.dispatch(check());
  } catch (error) {
    console.log("loadUser is not working");
  }
}
sagaMiddleware.run(rootSaga);
loadUser();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
