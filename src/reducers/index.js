import {combineReducers} from 'redux' ;
// 引入reducers
import menusData from './menusData';
import handleResult from './handleResult';
const movie = handleResult;
const music = handleResult;
const book = handleResult;
export default combineReducers(
  {
    menusData,
    movie,
    music,
    book
  }
  );