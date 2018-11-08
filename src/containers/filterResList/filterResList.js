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
      return <Comp type={this.props.menusData.currMenuKeyName} result={this.filterData()} />
    }
    filterData() {
      if( name !== 'search') {
        // 'movie'/'music'/'book' 对应 Movie/Music/Book 组件
        const currSubmenuObj = this.props.menusData.currSubmenuObj;// 所有二级标题(对象:{movie:{},music:{},book:{}} )
        const currSubmenuKeyName = currSubmenuObj[name].keyName;// 当前二级标题
        return this.props[name].classResult[currSubmenuKeyName];
      } else {
        // 'search' 对应 Search 组件
        const currMenuKeyName = this.props.menusData.currMenuKeyName;// 当前一级标题
        return this.props[currMenuKeyName].searchResult;
      }
    }
  }
}