import React, { Component } from 'react';

export default function FilterResList(Comp, name) {
  // comp 为组件; name = 'movie' 'music' 'book'
  return class compWithFilterResList extends Component {
    constructor(props) {
      super(props);
      this.filterData = this.filterData.bind(this);
    }
    render() {
      return <Comp result={this.filterData()} />
    }
    filterData() {
      // const currMenuTagName = state.menusData.currMenuTagName;// 当前一级标题
      const currMenuTagName = name;// 当前一级标题
      const currSubmenuTagNames = this.props.menusData.currSubmenuTagNames;// 所有二级标题(对象)
      const currSubmenuTagName = currSubmenuTagNames[currMenuTagName];// 当前二级标题
      const allResults = this.props[currMenuTagName];// {searchResults: {} classResults: []}
      const classResults = allResults.classResults;
      const searchResults = allResults.searchResults;
      if(searchResults.resultList.length){
        // 存在搜索结果，则返回此结果
        return searchResults;
      }
      if (classResults) {
        for (let i = 0; i < classResults.length; i++) {
          if (classResults[i].tagName === currSubmenuTagName) {
            return classResults[i];
          }
        }
      }
    }
  }
}