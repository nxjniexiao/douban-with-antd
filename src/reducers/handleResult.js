import {
  LOAD_SEARCH_RES,
  MORE_SEARCH_RES,
  LOAD_CLASS_RES,
  MORE_CLASS_RES,
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
          currNum: 20,
          totalNum: action.data.total,
          resultList: action.data.resultList
        }
      };
    case MORE_SEARCH_RES:
      const originCurrNum = state.searchResult.currNum;
      const originResultList = state.searchResult.resultList;
      const resultList = action.data.resultList;
      return {
        ...state,
        searchResult: {
          ...state.searchResult,
          currNum: originCurrNum + 20,
          totalNum: action.data.total,
          resultList: originResultList.concat(resultList)
        }
      };
    case LOAD_CLASS_RES:
      return {
        ...state,
        classResult: _handleClassRes(state, action, false)
      };
    case MORE_CLASS_RES:
      return {
        ...state,
        classResult: _handleClassRes(state, action, true)
      };
    case GET_RESULT_FAILED:
      return {
        ...state,
        errMsg: action.errMsg
      }
    default:
      return state;
  }
}
function _handleClassRes(state, action, isLoadingMore) {
  const classResult = state.classResult;
  const submenuKeyName = action.data.submenuKeyName;
  const total = action.data.total;
  const resultList = action.data.resultList;
  if (isLoadingMore) {
    const currNum = classResult[submenuKeyName].currNum;
    const originResultList = classResult[submenuKeyName].resultList;
    return {
      ...classResult,
      [submenuKeyName]: {
        currNum: currNum + 20,
        totalNum: total,
        resultList: originResultList.concat(resultList)
      }
    };
  } else {
    return {
      ...classResult,
      [submenuKeyName]: {
        currNum: 20,
        totalNum: total,
        resultList
      }
    };
  }
}
export default result;