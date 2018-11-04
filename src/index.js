import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import {BrowserRouter as Router} from 'react-router-dom';
// 引入自定义组件
import rootReducer from './reducers';
import BasicLayout from './containers/layout/layout';

// 1.中间件
const loggerMiddleware = createLogger();// 用来打印 action 日志
// 2.创建 store
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk, loggerMiddleware),
    window.devToolsExtension?window.devToolsExtension():f=>f
  )
);
ReactDOM.render(
  (<Provider store={store}>
    <Router>
      <BasicLayout />
    </Router>
  </Provider>),
  document.getElementById('root'));