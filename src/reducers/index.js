import { combineReducers } from 'redux';
// 引入reducers
import menusData from './menusData';
import handleResult from './handleResult';// 处理 movie/music/book 的 reducer
import createNamedWrapperReducer from './createNamedWrapperReducer';// 高阶 reducer

export default combineReducers(
  {
    menusData,
    movie: createNamedWrapperReducer(handleResult, 'movie'),
    music: createNamedWrapperReducer(handleResult, 'music'),
    book: createNamedWrapperReducer(handleResult, 'book')
  }
);