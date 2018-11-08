import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
// 自定义
// import Movie from '../../containers/movie/movie';
import GridsWrapper from '../gridsWrapper/gridsWrapper';
import FilterResList from '../../containers/filterResList/filterResList';
const Movie = connect(state => state)(FilterResList(GridsWrapper, 'movie'));
const Music = connect(state => state)(FilterResList(GridsWrapper, 'music'));
const Book = connect(state => state)(FilterResList(GridsWrapper, 'book'));
const Search = connect(state => state)(FilterResList(GridsWrapper, 'search'));

class Dashboard extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/movie" component={Movie} />
          <Route path="/music" component={Music} />
          <Route path="/book" component={Book} />
          <Route path="/search" component={Search} />
        </Switch>
      </div>
    );
  }
}
export default Dashboard;