import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
// 引入图片
import iconFull from './icons/star-full.png';
import iconHalf from './icons/star-half.png';
import iconEmpty from './icons/star-empty.png';

class Stars extends PureComponent {
  constructor(props) {
    super(props);
    this.getStarsArray = this.getStarsArray.bind(this);
  }
  static propTypes = {
    score: PropTypes.number
  }
  render() {
    const starsPath = {
      'full': iconFull,
      'half': iconHalf,
      'empty': iconEmpty
    };
    const starsArray = this.getStarsArray();
    return (
      <div style={{fontSize: 0,textAlign: 'center'}}>
        {this.props.score ? starsArray.map( (star, index) =>(<img src={starsPath[star]} key={index} style={{width: '12px',height: '12px',verticalAlign: 'middle'}}/>)) : null}
        {<span style={{fontSize: '12px', height: '12px', marginLeft: '4px', verticalAlign: 'middle'}}>{this.props.score ? this.props.score.toFixed(1) : '暂无评分'} </span>}
      </div>
    );
  }
  //
  getStarsArray() {
    let score = this.props.score;
    const res = ['empty', 'empty', 'empty', 'empty', 'empty'];
    if (score) {
      score = score / 2;
      let fullStars = Math.floor(score);// 满星
      let hasHalfStar = false;// 半星
      // 0.5 就近原则
      if ((score - fullStars) >= 0.75) {
        fullStars++;
      } else if ((score - fullStars) >= 0.25) {
        hasHalfStar = true;
      }
      for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
          res[i] = 'full';
        } else {
          res[i] = 'empty';
        }
      }
      if (hasHalfStar) {
        res[fullStars] = 'half';
      }
    } 
    return res;
  }
}
export default Stars;