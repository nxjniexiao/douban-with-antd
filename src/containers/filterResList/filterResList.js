import React, { Component } from 'react';
/* * 高阶组件 * */
export default function FilterResList(Comp, name) {
  // comp 为通用组件; name为新组件名 'movie' 'music' 'book' 'search'
  return class compWithFilterResList extends Component {
    constructor(props) {
      super(props);
      this.filterData = this.filterData.bind(this);
    }
    render() {
      return <Comp result={this.filterData()} />
    }
    filterData() {
      const currMenuKeyName = this.props.menusData.currMenuKeyName;// 当前一级标题
      const currSubmenuObj = this.props.menusData.currSubmenuObj;// 所有二级标题(对象:{movie:{},music:{},book:{}} )
      const currSubmenuKeyName = currSubmenuObj[currMenuKeyName].keyName;// 当前二级标题
      const allResults = this.props[currMenuKeyName];// { searchResult:{}, classResult: {in_threater:{}, coming_soon:{} }
      const classResult = allResults.classResult;
      const searchResult = allResults.searchResult;
      return (name === 'search') ? searchResult : classResult[currSubmenuKeyName];
    }
  }
}