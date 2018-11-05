import React, { Component } from 'react';
import {Route} from 'react-router-dom';
// 自定义
import Movie from '../../containers/movie/movie';

class Dashboard extends Component {
  render() {
    // const Movie = () => (<div>movie</div>);
    const Music = () => (<div>music</div>);
    const Book = () => (<div>book</div>);
    return (
      <div>
        <Route path="/movie" component={Movie} />
        <Route path="/music" component={Music} />
        <Route path="/book" component={Book} />
      </div>
    );
  }
}
export default Dashboard;