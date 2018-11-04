import {
  APPEND_SEARCH_RES,
  CLEAR_SEARCH_RES,
  APPEND_CLASS_RES,
  GET_RESULT_FAILED
} from '../actions/handleResult';
const initState = {
  searchResults: {
    currNum: 0,
    totalNum: 0,
    list: []
  },
  classResults: [
    // { tagName: 'in_theaters', currNum: 0, totalNum: 0, resultList: [] }
  ],
  errMsg: null
};
const result = (state = initState, action) => {
  const type = action.type;
  switch (type) {
    case APPEND_CLASS_RES:
      return {
        ...state,
        classResults: [
          ...state.classResults,
          _appendClassRes(state, action)
        ]
      };
    default:
      return state;
  }
}
function _appendClassRes(state, action) {
  const classResults = state.classResults;
  const submenuTagName = action.data.submenuTagName;
  const resData = action.data.resData;
  let newClassResult = null;
  // let hasSameClass = false;
  for (let i = 0; i < classResults.length; i++) {
    if (classResults[i].tagName === submenuTagName){
      newClassResult = classResults[i];
      break;
    }
  }
  if(newClassResult){
    // 已经存在与二级标题对应的结果
  }else{
    // 不存在
    newClassResult = { tagName: submenuTagName, currNum: resData.resultList.length, totalNum: resData.total, resultList: resData.resultList }
  }
  return newClassResult
}
export default result;