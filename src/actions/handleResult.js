import {
  getMoviesList,
  getMusicList,
  getBooksList,
  createUrlWithOpt
} from '../common/utils/doubanAPI';
export const LOAD_SEARCH_RES = 'LOAD_SEARCH_RES';
export const CLEAR_SEARCH_RES = 'CLEAR_SEARCH_RES';
export const LOAD_CLASS_RES = 'LOAD_CLASS_RES';
export const GET_RESULT_FAILED = 'GET_RESULT_FAILED';

// const baseUrl = 'https://api.douban.com/v2/';// 'v2/' 之前的内容在 proxy 字段中
const baseUrl = 'v2/';
const getResFunctions = {
  movie: getMoviesList,
  music: getMusicList,
  book: getBooksList
}
function loadSearchRes(name, keyword, resData) {
  // name = 'movie' / 'music' / 'book': 为了复用reducer逻辑
  return {
    type: LOAD_SEARCH_RES,
    name,
    data: {
      keyword,
      total: resData.total,
      resultList: resData.resultList
    }
  };
}
function loadClassRes(name, submenuKeyName, resData) {
  // name = 'movie' / 'music' / 'book': 为了复用reducer逻辑
  return {
    type: LOAD_CLASS_RES,
    name,
    data: {
      submenuKeyName,
      total: resData.total,
      resultList: resData.resultList
    }
  }
}
function getResultFailed(name, msg) {
  // name = 'movie' / 'music' / 'book': 为了复用reducer逻辑
  return {
    type: GET_RESULT_FAILED,
    name,
    errMsg: msg
  }
}
// 搜索结果
export function getSearchRes(name, keyword) {
  // name = 'movie' / 'music' / 'book': 为了复用reducer逻辑
  return (dispatch, getState) => {
    const url = _getSearchUrl(getState, keyword);
    const currMenuKeyName = getState().menusData.currMenuKeyName;// 'movie' / 'music' / 'book'
    return getResFunctions[currMenuKeyName](url).then(resData => {
      // res: {total: Number, resultList: Array}
      dispatch(loadSearchRes(name, keyword, resData));// dispatch 一个 action
    }).catch(err => {
      dispatch(getResultFailed(name, err));// dispatch 一个 action
    });
  }
}
// 分类结果
export function getClassRes(name) {
  // name = 'movie' / 'music' / 'book': 为了复用reducer逻辑
  return (dispatch, getState) => {
    const state = getState();
    if (_requestIsNeccessary(state, 'classResult')) {
      const url = _getUrl(state);
      const currMenuKeyName = state.menusData.currMenuKeyName;// 当前一级标题: 'movie' / 'music' / 'book'
      const currSubmenuObj = state.menusData.currSubmenuObj;// 当前二级标题对象: { movie: {}, music: {}, book: {} }
      const currSubmenuKeyName = currSubmenuObj[currMenuKeyName].keyName;
      // 请求数据
      return getResFunctions[currMenuKeyName](url).then(resData => {
        dispatch(loadClassRes(name, currSubmenuKeyName, resData));// dispatch 一个 action
      }).catch(err => {
        dispatch(getResultFailed(name, err));// dispatch 一个 action
      });
    }
  }
}
// 根据当前 state 判断是否需要向服务器请求数据
function _requestIsNeccessary(state, dataType) {
  const currMenuKeyName = state.menusData.currMenuKeyName;// 当前一级标题: 'movie' / 'music' / 'book'
  const allResults = state[currMenuKeyName];
  if (dataType === 'searchResult') {
    const resultList = allResults.searchResult.resultList;
    return !(resultList && resultList.length);
  } else {
    const currSubmenuObj = state.menusData.currSubmenuObj;// 当前二级标题对象: {movie:{},music:{},book:{}}
    const currSubmenuKeyName = currSubmenuObj[currMenuKeyName].keyName;// 当前二级标题的 keyName
    const classResult = state[currMenuKeyName].classResult;
    if(currSubmenuKeyName in classResult){
      const resultList = classResult[currSubmenuKeyName].resultList;
      return !(resultList && resultList.length);
    }
    return true;
  }
}
function _getUrl(state) {
  const currMenuKeyName = state.menusData.currMenuKeyName;// 当前一级标题: 'movie' / 'music' / 'book'
  const currSubmenuObj = state.menusData.currSubmenuObj;// 当前二级标题对象: {movie:{keyName:'', title:''},music:{...},book:{...}}
  const currSubmenuKeyName = currSubmenuObj[currMenuKeyName].keyName;
  const specialKeyNames = ['in_theaters', 'coming_soon', 'top250'];
  let url = baseUrl;
  if (specialKeyNames.indexOf(currSubmenuKeyName) !== -1) {
    url = url + currMenuKeyName + '/' + currSubmenuKeyName;
  } else {
    const title = currSubmenuObj[currMenuKeyName].title;
    url = url + currMenuKeyName + '/search?tag=' + title;
  }
  url = createUrlWithOpt(url, 0, 20);
  return url;
}
function _getSearchUrl(getState, keyword) {
  const currMenuKeyName = getState().menusData.currMenuKeyName;// 'movie' / 'music' / 'book'
  let url = baseUrl;
  url = url + currMenuKeyName + '/search?q=' + encodeURIComponent(keyword);
  url = createUrlWithOpt(url, 0, 20);
  return url;
}