import './grid.css';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
// 自定义
import Stars from '../stars/stars';

class Grid extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      coverWidth: {
        movie: '195px',
        music: '140px',
        book: '195px'
      }
    };
  }
  static propTypes = {
    type: PropTypes.string,
    info: PropTypes.object
  }
  render() {
    const type = this.props.type;// 类型: 'movie' 'music' 'book'
    const info = this.props.info;
    return (
      <Card
        hoverable
        bodyStyle={{ padding: '5px' }}
        style={{ width: '100%' }}
        cover={<div className='cover' alt="example" style={{ height: this.state.coverWidth[type], backgroundImage: 'url(' + info.image + ')' }}></div>}
      >
        <div className='title'>{info.title}</div>
        {(type !== 'movie') ? <div className='sub-title'>{info.author}</div> : null}
        <Stars score={info.rating} />
      </Card>
    );
  }
}
export default Grid;