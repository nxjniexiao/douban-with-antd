import React, {Component} from 'react';
import {connect} from 'react-redux';

class Movies extends Component{
  componentWillMount() {

  }
  render(){
    return (
      <div>
        电影页面
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    movies: state.movies
  };
}
export default connect(mapStateToProps)(Movies);