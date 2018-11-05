import {
  getMoviesList,
  getMusicList,
  getBooksList,
  createUrlWithOpt
} from '../common/utils/doubanAPI';
export const APPEND_SEARCH_RES = 'APPEND_SEARCH_RES';
export const CLEAR_SEARCH_RES = 'CLEAR_SEARCH_RES';
export const APPEND_CLASS_RES = 'APPEND_CLASS_RES';
export const GET_RESULT_FAILED = 'GET_RESULT_FAILED';

// const baseUrl = 'https://api.douban.com/v2/';// v2 之前的内容在 proxy 字段中
const baseUrl = 'v2/';
const getResFunctions = {
  movie: getMoviesList,
  music: getMusicList,
  book: getBooksList
}
function appendSearchRes(name, resData) {
  // name = 'movie' / 'music' / 'book': 为了复用reducer逻辑
  return {
    type: APPEND_SEARCH_RES,
    name,
    data: {
      total: resData.total,
      resultList: resData.resultList
    }
  };
}
function appendClassRes(name, submenuTagName, resData) {
  // name = 'movie' / 'music' / 'book': 为了复用reducer逻辑
  return {
    type: APPEND_CLASS_RES,
    name,
    data: {
      submenuTagName,
      resData
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
    const currMenuTagName = getState().menusData.currMenuTagName;// 'movie' / 'music' / 'book'
    return getResFunctions[currMenuTagName](url).then(resData => {
      // res: {total: Number, resultList: Array}
      dispatch(appendSearchRes(name, resData));// dispatch 一个 action
    }).catch(err => {
      dispatch(getResultFailed(name, err));// dispatch 一个 action
    });
  }
}
// 分类结果
export function getClassRes(name) {
  // name = 'movie' / 'music' / 'book': 为了复用reducer逻辑
  return (dispatch, getState) => {
    if (_requestIsNeccessary(getState)) {
      const url = _getUrl(getState);
      const currMenuTagName = getState().menusData.currMenuTagName;// 'movie' / 'music' / 'book'
      const currSubmenuTagNames = getState().menusData.currSubmenuTagNames;// {movie: 'in_theaters', music: '华语', book: '小说'}
      const currSubmenuTagName = currSubmenuTagNames[currMenuTagName];
      // 请求数据
      return getResFunctions[currMenuTagName](url).then(resData => {
        dispatch(appendClassRes(name, currSubmenuTagName, resData));// dispatch 一个 action
      }).catch(err => {
        dispatch(getResultFailed(name, err));// dispatch 一个 action
      })
    }
  }
}
// 根据当前 state 判断是否需要向服务器请求数据
function _requestIsNeccessary(getState) {
  const currMenuTagName = getState().menusData.currMenuTagName;// 'movie' / 'music' / 'book'
  const currSubmenuTagNames = getState().menusData.currSubmenuTagNames;// {movie: 'in_theaters', music: '华语', book: '小说'}
  const currSubmenuTagName = currSubmenuTagNames[currMenuTagName];
  const currClassResults = getState()[currMenuTagName].classResults;
  let isNeccessary = true;
  for (let i = 0; i < currClassResults.length; i++) {
    if ((currClassResults[i].tagName === currSubmenuTagName) && (currClassResults[i].resultList.length)) {
      isNeccessary = false;
      break;
    }
  }
  return isNeccessary;
}
function _getUrl(getState) {
  const currMenuTagName = getState().menusData.currMenuTagName;// 'movie' / 'music' / 'book'
  const currSubmenuTagNames = getState().menusData.currSubmenuTagNames;// {movie: 'in_theaters', music: '华语', book: '小说'}
  const currSubmenuTagName = currSubmenuTagNames[currMenuTagName];
  const specialTagNames = ['in_theaters', 'coming_soon', 'top250'];
  let url = baseUrl;
  if (specialTagNames.indexOf(currSubmenuTagName) !== -1) {
    url = url + currMenuTagName + '/' + currSubmenuTagName;
  } else {
    url = url + currMenuTagName + '/search?tag=' + currSubmenuTagName;
  }
  url = createUrlWithOpt(url, 0, 20);
  return url;
}
function _getSearchUrl(getState, keyword) {
  const currMenuTagName = getState().menusData.currMenuTagName;// 'movie' / 'music' / 'book'
  let url = baseUrl;
  url = url + currMenuTagName + '/search?q=' + encodeURIComponent(keyword);
  url = createUrlWithOpt(url, 0, 20);
  return url;
}