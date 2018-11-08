import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Row, Col, Pagination } from 'antd';
// 自定义
import Grid from '../grid/grid';
import { getClassRes, getSearchRes } from '../../actions/handleResult';

class GridsWrapper extends Component {
  static propTypes = {
    type: PropTypes.string,// 类型: 'movie' 'music' 'book'
    result: PropTypes.object
  }
  constructor(props) {
    super(props);
    this.state = {
      colums: 5,
      rows: 3,
      currPage: 0
    }
    this.createGrids = this.createGrids.bind(this);
    this.createCols = this.createCols.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }
  render() {
    const colums = this.state.colums;
    const rows = this.state.rows;
    const result = this.props.result
    if (!result) {
      return null;
    }
    return (
      <div className="grids-container" style={{ margin: '0 auto', textAlign: 'center', paddingBottom: '10px'}}>
        { (result.resultList && result.resultList.length)?this.createGrids():null}
        <Pagination simple defaultPageSize={rows * colums} total={result.totalNum} onChange={this.handlePageChange} />
      </div>
    );
  }
  createGrids() {
    // const colums = this.state.colums;
    const rows = this.state.rows;
    let grids = [];
    for (let i = 0; i < rows; i++) {
      grids[i] = (
        <Row type="flex" justify="space-around" style={{ marginBottom: '10px' }} key={i}>
          {this.createCols(i)}
        </Row>
      );
    }
    return grids;
  }
  createCols(i) {
    const type = this.props.type;// 类型: 'movie' 'music' 'book'
    const rows = this.state.rows;
    const colums = this.state.colums;
    const currPage = this.state.currPage;
    const resList = this.props.result.resultList; // 结果列表
    let cols = [];
    for (let j = 0; j < colums; j++) {
      const index = currPage * rows * colums + i * colums + j;
      cols[j] = (
        <Col span={4} key={j} >
          {resList[index]?<Grid info={resList[index]} type={type} /> : null}
        </Col>
      );
    }
    return cols;
  }
  // 监听页码改变
  handlePageChange(page, pageSize) {
    console.log(page);
    console.log(pageSize);
    const currNum = this.props.result.currNum;
    // const totalNum = this.props.result.totalNum;
    if (page * pageSize > currNum) {
      const currMenuKeyName = this.props.currMenuKeyName;
      const currPathName = this.props.location.pathname;
      if (/search/.test(currPathName)) {
        this.props.getSearchRes(currMenuKeyName);
      } else {
        this.props.getClassRes(currMenuKeyName);
      }
    }
    this.setState({
      currPage: page - 1
    });
  }
}
const mapStateToProps = state => {
  return {
    currMenuKeyName: state.menusData.currMenuKeyName
  }
};
const mapDispatchToProps = dispatch => {
  return {
    getClassRes: (name, isLoadingMore) => dispatch(getClassRes(name, true)),
    getSearchRes: (name, keyword, isLoadingMore) => dispatch(getSearchRes(name, null, true))
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GridsWrapper));
