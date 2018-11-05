import React, { Component } from 'react';
import { connect } from 'react-redux';
// 自定义
import GridsWrapper from '../../components/gridsWrapper/gridsWrapper';
import FilterResList from '../filterResList/filterResList';

class Movie extends Component {
  render() {
    console.log('movie 组件 render 中');
    return (
      <div>
        <GridsWrapper result={this.props.result} />
      </div>
    );
  }
}
const mapStateToProps = state => state;
export default connect(mapStateToProps)(FilterResList(Movie, 'movie'));