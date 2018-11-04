import {
  getMoviesList,
  getMusicList,
  getBooksList,
  createUrlWithOpt
} from '../common/utils/doubanAPI';
export const APPEND_SEARCH_RES = 'APPEND_SEARCH_RES';
export const CLEAR_SEARCH_RES = 'CLEAR_SEARCH_RES';
export const APPEND_CLASS_RES = 'APPENCH_CLASS_RES';
export const GET_RESULT_FAILED = 'GET_RESULT_FAILED';

// const baseUrl = 'https://api.douban.com/v2/';
const baseUrl = 'v2/';
const getResFunctions = {
  movie: getMoviesList,
  music: getMusicList,
  book: getBooksList
}
function appendSearchRes(total, resultList) {
  return {
    type: APPEND_SEARCH_RES,
    data: {
      total,
      resultList
    }
  };
}
function appendClassRes(submenuTagName, resData) {
  return {
    type: APPEND_CLASS_RES,
    data: {
      submenuTagName,
      resData
    }
  }
}
function getResultFailed(msg) {
  return {
    type: GET_RESULT_FAILED,
    errMsg: msg
  }
}
// 搜索结果
export function getSearchRes(menuTagName, url) {
  return dipatch => {
    return getResFunctions[menuTagName](url).then(res => {
      // res: {total: Number, resultList: Array}
      appendSearchRes(...res);
    }).catch(err => {
      getResultFailed(err);
    });
  }
}
// 分类结果
export function getClassRes() {
  return (dispatch, getState) => {
    if (_requestIsNeccessary(getState)) {
      let url = _getUrl(getState);
      const currMenuTagName = getState().menusData.currMenuTagName;// 'movie' / 'music' / 'books'
      const currSubmenuTagNames = getState().menusData.currSubmenuTagNames;// {movie: 'in_theaters', music: '华语', book: '小说'}
      const currSubmenuTagName = currSubmenuTagNames[currMenuTagName];
      // 请求数据
      return getResFunctions[currMenuTagName](url).then(resData => {
        dispatch(appendClassRes(currSubmenuTagName, resData));// dispatch 一个 action
      }).catch(err => {
        dispatch(getResultFailed(err));// dispatch 一个 action
      })
    }
  }
}
// 根据当前 state 判断是否需要向服务器请求数据
function _requestIsNeccessary(getState) {
  const currMenuTagName = getState().menusData.currMenuTagName;// 'movie' / 'music' / 'book'
  const currSubmenuTagNames = getState().menusData.currSubmenuTagNames;// {movie: 'in_theaters', music: '华语', book: '小说'}
  const currClassResult = getState()[currMenuTagName].classResult;
  let isNeccessary = true;
  for (let i = 0; i < currClassResult; i++) {
    if ((currClassResult[i].tagName === currSubmenuTagNames) && (currClassResult[i].list.length)) {
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