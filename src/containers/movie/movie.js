import React, { Component } from 'react';
import { connect } from 'react-redux';
// 自定义
import GridsWrapper from '../../components/gridsWrapper/gridsWrapper';

class Movie extends Component {
  // componentWillMount() {

  // }
  render() {
    console.log('movie 组件 render 中');
    return (
      <div>
        <GridsWrapper resList={this.props.resList} />
      </div>
    );
  }
}
const mapStateToProps = state => {
  const currMenuTagName = state.menusData.currMenuTagName;// 当前一级标题
  const currSubmenuTagNames = state.menusData.currSubmenuTagNames;// 所有二级标题(对象)
  const currSubmenuTagName = currSubmenuTagNames[currMenuTagName];// 当前二级标题
  let resList = [];
  const movie = state.movie;// {searchResults: [], classResults: []}
  const classResults = movie.classResults;
  if(classResults){
    for (let i = 0; i < classResults.length; i++) {
      if (classResults[i].tagName === currSubmenuTagName) {
        resList = classResults[i].resultList;
      }
    }
  }
  return {
    resList
  };
}
export default connect(mapStateToProps)(Movie);