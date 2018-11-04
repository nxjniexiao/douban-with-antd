import React, { Component } from 'react';
import {Route} from 'react-router-dom';
// 自定义
import Movies from '../movies/movies';

class Dashboard extends Component {
  render() {
    // const Movies = () => (<div>movies</div>);
    const Music = () => (<div>music</div>);
    const Books = () => (<div>books</div>);
    return (
      <div>
        <Route path="/movies" component={Movies} />
        <Route path="/music" component={Music} />
        <Route path="/books" component={Books} />
      </div>
    );
  }
}
export default Dashboard;