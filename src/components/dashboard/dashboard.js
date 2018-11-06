import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
// 自定义
import Movie from '../../containers/movie/movie';

class Dashboard extends Component {
  render() {
    // const Movie = () => (<div>movie</div>);
    const Music = () => (<div>music</div>);
    const Book = () => (<div>book</div>);
    const Search = () => (<div>search</div>);
    return (
      <div>
        <Switch>
          <Route path="/movie" component={Movie} />
          <Route path="/music" component={Music} />
          <Route path="/book" component={Book} />
          <Route path="/" component={Search} />
        </Switch>
      </div>
    );
  }
}
export default Dashboard;