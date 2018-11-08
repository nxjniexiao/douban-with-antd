import {
  getMoviesList,
  getMusicList,
  getBooksList,
  createUrlWithOpt
} from '../common/utils/doubanAPI';
export const LOAD_SEARCH_RES = 'LOAD_SEARCH_RES';
export const MORE_SEARCH_RES = 'MORE_SEARCH_RES';
export const LOAD_CLASS_RES = 'LOAD_CLASS_RES';
export const MORE_CLASS_RES = 'MORE_CLASS_RES';
export const GET_RESULT_FAILED = 'GET_RESULT_FAILED';

// const baseUrl = 'https://api.douban.com/v2/';// 'v2/' 之前的内容在 proxy 字段中
const baseUrl = 'v2/';
const getResFunctions = {
  movie: getMoviesList,
  music: getMusicList,
  book: getBooksList
}
function loadSearchRes(name, keyword, resData) {
  // name = 'movie' / 'music' / 'book' 为了复用reducer逻辑
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
function moreSearchRes(name, resData) {
  // name = 'movie' / 'music' / 'book' 为了复用reducer逻辑
  return {
    type: MORE_SEARCH_RES,
    name,
    data: {
      total: resData.total,
      resultList: resData.resultList
    }
  };
}
function loadClassRes(name, submenuKeyName, resData) {
  // name = 'movie' / 'music' / 'book' 为了复用reducer逻辑
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
function moreClassRes(name, submenuKeyName, resData) {
  // name = 'movie' / 'music' / 'book' 为了复用reducer逻辑
  return {
    type: MORE_CLASS_RES,
    name,
    data: {
      submenuKeyName,
      total: resData.total,
      resultList: resData.resultList
    }
  }
}
function getResultFailed(name, msg) {
  // name = 'movie' / 'music' / 'book' 为了复用reducer逻辑
  return {
    type: GET_RESULT_FAILED,
    name,
    errMsg: msg
  }
}
// 请求搜索结果
export function getSearchRes(name, keyword, isLoadingMore) {
  // name = 'movie' / 'music' / 'book' 为了复用reducer逻辑
  return (dispatch, getState) => {
    const state = getState();
    if (_requestIsNeccessary(state, 'searchResult', isLoadingMore, keyword)) {
      const url = _getSearchUrl(state, keyword, isLoadingMore);
      const { currMenuKeyName } = _getCurrKeyName(state);
      return getResFunctions[currMenuKeyName](url).then(resData => {
        if(isLoadingMore){
          dispatch(moreSearchRes(name, resData));// dispatch 一个 action
        }else{
          dispatch(loadSearchRes(name, keyword, resData));// dispatch 一个 action
        }
      }).catch(err => {
        dispatch(getResultFailed(name, err));// dispatch 一个 action
      });
    }
  }
}
// 请求分类结果
export function getClassRes(name, isLoadingMore) {
  // name = 'movie' / 'music' / 'book' 为了复用reducer逻辑
  // isLoadingMore = ture 表示加载更多
  return (dispatch, getState) => {
    const state = getState();
    if (_requestIsNeccessary(state, 'classResult', isLoadingMore)) {
      const url = _getUrl(state, isLoadingMore);
      const { currMenuKeyName, currSubmenuKeyName } = _getCurrKeyName(state);
      // 请求数据
      return getResFunctions[currMenuKeyName](url).then(resData => {
        if(isLoadingMore){
          dispatch(moreClassRes(name, currSubmenuKeyName, resData));// dispatch 一个 action
        }else{
          dispatch(loadClassRes(name, currSubmenuKeyName, resData));// dispatch 一个 action
        }
      }).catch(err => {
        dispatch(getResultFailed(name, err));// dispatch 一个 action
      });
    }
  }
}
// 根据当前 state 判断是否需要向服务器请求数据
function _requestIsNeccessary(state, dataType, isLoadingMore, keyword) {
  // const { currMenuKeyName, currSubmenuKeyName } = _getCurrKeyName(state);
  const { searchResult, classResult } = _getCurrResult(state);
  if (isLoadingMore) {
    // 加载更多
    if (dataType === 'searchResult') {
      // 请求搜索数据
      const currNum = searchResult.currNum;
      const totalNum = searchResult.totalNum;
      return currNum < totalNum;
    } else {
      // 请求分类数据
      const currNum = classResult.currNum;
      const totalNum = classResult.totalNum;
      return currNum < totalNum;
    }
  }
  // 第一次加载
  if (dataType === 'searchResult') {
    // 请求搜索数据
    const currKeyword = searchResult.keyword;
    if (keyword === currKeyword) {
      return false;
    }
    return true;
  } else {
    // 请求分类数据
    // if (classResult && (currSubmenuKeyName in classResult)) { // classResult 是根据二级菜单筛选出来的
    if (classResult) {
      const resultList = classResult.resultList;
      return !(resultList && resultList.length);
    }
    return true;
  }
}
function _getUrl(state, isLoadingMore) {
  const { currMenuKeyName, currSubmenuKeyName } = _getCurrKeyName(state);
  const { classResult } = _getCurrResult(state);
  const specialKeyNames = ['in_theaters', 'coming_soon', 'top250'];
  let url = baseUrl;
  if (specialKeyNames.indexOf(currSubmenuKeyName) !== -1) {
    url = url + currMenuKeyName + '/' + currSubmenuKeyName;
  } else {
    const title = _getTitle(state);
    url = url + currMenuKeyName + '/search?tag=' + title;
  }
  if (isLoadingMore) {
    const currNum = classResult.currNum;
    url = createUrlWithOpt(url, currNum, 20);
  } else {
    url = createUrlWithOpt(url, 0, 20);
  }
  return url;
}
function _getSearchUrl(state, keyword, isLoadingMore) {
  const { currMenuKeyName } = _getCurrKeyName(state);
  const { searchResult } = _getCurrResult(state);
  let url = baseUrl;
  if(isLoadingMore) {
    const originKeyword = searchResult.keyword;
    const currNum = searchResult.currNum;
    url = url + currMenuKeyName + '/search?q=' + encodeURIComponent(originKeyword);
    url = createUrlWithOpt(url, currNum, 20);
  }else{
    url = url + currMenuKeyName + '/search?q=' + encodeURIComponent(keyword);
    url = createUrlWithOpt(url, 0, 20);
  }
  return url;
}
// 根据当前一级和二级菜单返回当前要显示的 classResult 和 searchResult
function _getCurrResult(state) {
  const { currMenuKeyName, currSubmenuKeyName } = _getCurrKeyName(state);
  return {
    searchResult: state[currMenuKeyName].searchResult,
    classResult: state[currMenuKeyName].classResult[currSubmenuKeyName]
  };
}
// 返回当前一级和二级菜单的 keyName
function _getCurrKeyName(state) {
  const currMenuKeyName = state.menusData.currMenuKeyName;// 当前一级标题: 'movie' / 'music' / 'book'
  const currSubmenuObj = state.menusData.currSubmenuObj;// 当前二级标题对象: {movie:{keyName:'', title:''},music:{...},book:{...}}
  const currSubmenuKeyName = currSubmenuObj[currMenuKeyName].keyName;
  return {
    currMenuKeyName,
    currSubmenuKeyName
  };
}
// 返回当前二级菜单对应的 title
function _getTitle(state) {
  const currMenuKeyName = state.menusData.currMenuKeyName;// 当前一级标题: 'movie' / 'music' / 'book'
  const currSubmenuObj = state.menusData.currSubmenuObj;// 当前二级标题对象: {movie:{keyName:'', title:''},music:{...},book:{...}}
  return currSubmenuObj[currMenuKeyName].title;
}