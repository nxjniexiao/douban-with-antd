import {
  LOAD_SEARCH_RES,
  CLEAR_SEARCH_RES,
  LOAD_CLASS_RES,
  GET_RESULT_FAILED
} from '../actions/handleResult';
const initState = {
  searchResult: {
    keyword: '',
    currNum: 0,
    totalNum: 0,
    resultList: []
  },
  classResult: {
    // in_theaters: { keyName: 'in_theaters', currNum: 0, totalNum: 0, resultList: [] }
  },
  errMsg: null
};
const result = (state = initState, action) => {
  const type = action.type;
  switch (type) {
    case LOAD_SEARCH_RES:
      return {
        ...state,
        searchResult: {
          keyword: action.data.keyword,
          currNum: action.data.resultList.length,
          totalNum: action.data.total,
          resultList: action.data.resultList
        }
      };
    case LOAD_CLASS_RES:
      return {
        ...state,
        classResult: _handleClassRes(state, action)
      };
    default:
      return state;
  }
}
function _loadClassRes(state, action) {
  const classResult = state.classResult;
  const submenuKeyName = action.data.submenuKeyName;
  const resData = action.data.resData;
  let newClassResult = null;
  for (let i = 0; i < classResult.length; i++) {
    if (classResult[i].tagName === submenuKeyName) {
      newClassResult = classResult[i];
      break;
    }
  }
  if (newClassResult) {
    // 已经存在与二级标题对应的结果
  } else {
    // 不存在
    newClassResult = { tagName: submenuKeyName, currNum: resData.resultList.length, totalNum: resData.total, resultList: resData.resultList }
  }
  return newClassResult
}
function _handleClassRes(state, action) {
  const classResult = state.classResult;
  const submenuKeyName = action.data.submenuKeyName;
  const total = action.data.total;
  const resultList = action.data.resultList;
  return {
    ...classResult,
    [submenuKeyName]: {
      currNum: 20,
      totalNum: total,
      resultList
    }
  };
  // let newClassResult = null;
  // for (let i = 0; i < classResult.length; i++) {
  //   if (classResult[i].tagName === submenuKeyName) {
  //     newClassResult = classResult[i];
  //     break;
  //   }
  // }
  // if (newClassResult) {
  //   // 已经存在与二级标题对应的结果
  // } else {
  //   // 不存在
  //   newClassResult = { tagName: submenuKeyName, currNum: resData.resultList.length, totalNum: resData.total, resultList: resData.resultList }
  // }
  // return newClassResult
}
export default result;