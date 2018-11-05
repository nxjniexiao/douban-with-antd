import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card } from 'antd';
// 自定义
import Stars from '../stars/stars';
const { Meta } = Card;

class GridsWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colums: 5,
      rows: 3,
      currPage: 0
    }
    this.createGrids = this.createGrids.bind(this);
    this.createCols = this.createCols.bind(this);
  }
  static propTypes = {
    result: PropTypes.object
  }
  render() {
    const result = this.props.result
    if(!result) {
      return null;
    }
    if ( result.resultList && result.resultList.length) {
      return (
        <div className="grids-container" style={{ margin: '0 auto' }}>
          {this.createGrids()}
        </div>
      );
    } else {
      return null
    }
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
    const rows = this.state.rows;
    const colums = this.state.colums;
    const currPage = this.state.currPage;
    const resList = this.props.result.resultList; // 结果列表
    let cols = [];
    for (let j = 0; j < colums; j++) {
      const index = currPage * rows * colums + i * colums + j;
      cols[j] = (
        <Col span={4} style={{ backgroundColor: 'skyblue' }} key={j} >
          <Card
            // hoverable
            bodyStyle={{ padding: '5px' }}
            style={{ width: '100%' }}
            cover={<div alt="example"  style={{height:'195px',backgroundImage:'url('+resList[index].image+')',backgroundSize:'100% auto',backgroundPosition:'center center',backgroundRepeat:'no-repeat'}}></div>}
          >
            <div style={{ width: '100%', margin: '5px 0', fontSize: '14px', lineHeight: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', textAlign: 'center', color: '#37a'}}>{resList[index].title}</div>
            <Stars score={resList[index].rating} />
          </Card>
        </Col>
      );
    }
    return cols;
  }
}
export default GridsWrapper;