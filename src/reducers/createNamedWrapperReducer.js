function createNamedWrapperReducer(reducer, reducerName) {
  return (state, action) => {
    const { name } = action;// 'movie' 'music' 'book'
    const isInitializationCall = (state === undefined);// 判断是否为初始化(否则会报错)
    if ((reducerName !== name) && !isInitializationCall) {
      return state;
    }
    // 初始化或者name一致
    return reducer(state, action);// 注意使用 return
  }
}
export default createNamedWrapperReducer;