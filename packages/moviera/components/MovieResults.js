import React, { Component } from 'react';
import moment from 'moment';

const MovieItem = (props) => {
  const {
    title,
    imdbId,
    imdbRating,
    plot,
    poster,
    released,
    genres,
    runtimeMinutes,
    actors,
    directors,
    metaScore,
    tomatoRating,
    netflixScore,
  } = props;
  const url = `http://www.imdb.com/title/${imdbId}`;
  return (
    <div className="row col-md-12 movie-item">
      <a className="poster" href={url} rel="noopener noreferrer" target="_blank">
        <img role="presentation" src={poster.replace('_V1_SX300', '_V1_SX100')} />
      </a>
      <div className="details">
        <div className="row col-md-12">
          <a className="title" href={url} rel="noopener noreferrer" target="_blank">
            { title }
          </a>
        </div>
        <div className="row col-md-6">
          <div className="row col-md-12 text" >
            {moment(released).format('MMM, YYYY')} | {genres.join(', ')} | {runtimeMinutes} min
          </div>
          <div className="col-md-3 col-sm-3 col-xs-6 col-xxs-12 rating-box">
            { !isNaN(imdbRating) &&
              <span>
                {imdbRating}<span className="small">/10</span>
                <div className="small">IMDb</div>
              </span>
            }
          </div>
          <div className="col-md-3 col-sm-3 col-xs-6 col-xxs-12 rating-box">
            { !isNaN(tomatoRating) &&
              <span>
                {tomatoRating}<span className="small">/10</span>
                <div className="small">Rotten Tomatoes</div>
              </span>
            }
          </div>
          <div className="col-md-3 col-sm-3 col-xs-6 col-xxs-12 rating-box">
            { !isNaN(metaScore) &&
              <span>
                {metaScore}<span className="small">%</span>
                <div className="small">Critic Score</div>
              </span>
            }
          </div>
          <div className="col-md-3 col-sm-3 col-xs-6 col-xxs-12 rating-box">
            { !isNaN(netflixScore) &&
              <span>
                {imdbRating}<span className="small">/5</span>
                <div className="small">Netflix</div>
              </span>
            }
          </div>
        </div>
        <div className="row col-md-6">
          <div className="row col-md-12 text" >
            <span className="label">Director: </span>{directors.join(', ')}
          </div>
          <div className="row col-md-12 text" >
            <span className="label">Actors: </span>{actors.join(', ')}
          </div>
          <div className="row col-md-12 text" >
            <span className="label">Plot: </span>{ plot }
          </div>
        </div>
      </div>
    </div>
  );
};

export default class MovieResults extends Component {
  render() {
    const { movies } = this.props;
    return (
      <div>
        {
          movies.map(m => <MovieItem key={m._id} {...m._source} />)
        }
      </div>
    );
  }
}
