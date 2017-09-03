import React, { Component } from 'react';
import cx from 'classnames';
import { get, uniqBy, merge } from 'lodash';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MaterialTheme from './styles/material-theme';

import CircularProgress from 'material-ui/CircularProgress';
import IconButton from 'material-ui/IconButton';
import AppBar from 'material-ui/AppBar';
import Settings from 'material-ui/svg-icons/content/filter-list';
import MovieraLogo from '@public/static/img/moviera_logo.png';

import { onPageScroll } from '@packages/utils';
import { runElasticQuery } from './utils/elasticsearch_utils';

import ControlPanel from './components/ControlPanel';
import MovieResults from './components/MovieResults';

require('./styles/main.scss');

export default class Moviera extends Component {

  constructor(props) {
    super(props);

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    this.state = {
      hideControls: true,
      page: 0,
      reset: true,
      genre: 'all',
      sortBy: 'imdbRating',
      select: 'all',
      showLoader: true,
      years: {
        min: 2009,
        max: currentYear,
        selectMin: currentYear,
        selectMax: currentYear,
      },
    };
  }

  componentDidMount = () => {
    document.title = 'Moviera | Aykut Simsek';
    window.addEventListener('scroll', this.handleScroll);
    this.updateMovies(this.state);
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    if (nextState.showLoader) {
      this.updateMovies(nextState);
    }
    // return !_.isEqual(this.props, nextProps) || nextState.showLoader || !_.isEqual(this.state.movies, nextState.movies) ;
    return true;
  }

  updateMovies = (state) => {
    const { page, reset, q, genre, sortBy, select, years: { selectMin, selectMax } } = state;
    const terms = [['type', 'movie']];

    if (genre !== 'all') {
      terms.push(['genres', genre]);
    }

    if (select !== 'all') {
      terms.push(['platform', select]);
    }

    runElasticQuery(q, sortBy, selectMin, selectMax, terms, reset ? 0 : page, (body) => {
      this.setState({
        movies: reset ? get(body, 'hits.hits') : uniqBy(this.state.movies.concat(get(body, 'hits.hits')), '_id'),
        reset: false,
        showLoader: false,
      });
    });
  }

  updateState = obj => this.setState(merge(obj, { showLoader: true, reset: true }))

  handleScroll = () => {
    onPageScroll(() => {
      this.setState({
        page: this.state.page + 1,
        showLoader: true,
      });
    });
  }

  handleTouchTap = () => {
    this.setState({ hideControls: !this.state.hideControls });
  }

  render() {
    const { movies = [], showLoader, hideControls } = this.state;
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(MaterialTheme)}>
        <div className={cx('moviera', hideControls && 'hideControls')}>
          <AppBar
            title={
              <a href="/moviera" className="logoContainer">
                <img className="logo" src={MovieraLogo} alt="Moviera Logo" title="Moviera Logo" />
              </a>
            }
            className="header"
            iconElementRight={<IconButton className="toggleButton" tooltip="Filter" touch onTouchTap={this.handleTouchTap} style={{ marginRight: 15 }} ><Settings /></IconButton>}
            showMenuIconButton={false}
          />
          <div className="control-panel">
            <ControlPanel {...this.state} updateState={this.updateState} handleTouchTap={this.handleTouchTap} />
          </div>
          <div className="results">
            <MovieResults movies={movies} />
            { showLoader ? <CircularProgress color="#DE5E60" size={40} className="circular-loader" /> : null}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
