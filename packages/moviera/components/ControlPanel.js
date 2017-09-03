import React, { Component } from 'react';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import { Tabs, Tab } from 'material-ui/Tabs';
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';
import SearchIcon from 'material-ui/svg-icons/action/search';

import { Range } from 'rc-slider';

require('../styles/rc-slider.scss');

const genres = ['All', 'Action', 'Adventure', 'Animation', 'Biography', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy', 'History', 'Horror', 'Music', 'Musical', 'Mystery', 'Romance', 'Sci-Fi', 'Sport', 'Thriller', 'War', 'Western'];

export default class ControlPanel extends Component {

  render() {
    const { genre, sortBy, select, q, years: { min, max, selectMin, selectMax }, handleTouchTap, updateState } = this.props;

    const marks = {};
    marks[selectMin] = { number: selectMin, label: selectMin > 2009 ? selectMin : 'pre 2010' };
    marks[selectMax] = { number: selectMax, label: selectMax };

    return (
      <div>
        <div className="main-content">
          <div className="row" style={{ marginTop: 0, marginBottom: -10 }} >
            <SelectField
              floatingLabelText="Genre"
              value={genre}
              fullWidth
              selectedMenuItemStyle={{ color: '#ff5E60' }}
              labelStyle={{ color: '#000' }}
              underlineStyle={{ borderBottomWidth: 2 }}
              onChange={(event, index, value) => updateState({ genre: value })}
              maxHeight={240}
            >
              {
                genres.map(g => <MenuItem value={g.toLowerCase()} primaryText={g} key={g} />)
              }
            </SelectField>
          </div>

          <div className="row">
            <span className="label">Sort By</span>
            <Tabs
              value={sortBy}
              onChange={value => updateState({ sortBy: value })}
              inkBarStyle={{ height: 2 }}
            >
              <Tab value="imdbRating" label="Rating" />
              <Tab value="released" label="Date" />
            </Tabs>
          </div>

          {/*
          <div className="row">
            <span className="label">Select</span>
            <Tabs
              value={select}
              onChange={value => updateState({ select: value })}
              inkBarStyle={{ height: 2 }}
            >
              <Tab value="all" label="All" />
              <Tab value="netflix" label="Netflix" />
            </Tabs>
          </div>

          */}

          <div className="row" style={{ marginTop: -20 }} >
            <AutoComplete
              floatingLabelText="Search"
              filter={AutoComplete.fuzzyFilter}
              dataSource={[]}
              fullWidth
              maxSearchResults={5}
              underlineStyle={{ borderBottomWidth: 2 }}
              floatingLabelShrinkStyle={{ color: '#333' }}
              value={q}
              style={{ borderColor: '#333' }}
              onUpdateInput={value => updateState({ q: value })}
            />
            <SearchIcon style={{ height: 24, width: 24, pointerEvents: 'all', float: 'right', marginTop: -36, marginRight: 10, color: '#aaa' }} />
          </div>

          <div className="row" style={{ marginTop: 50 }}>
            <Range
              min={min}
              max={max}
              defaultValue={[selectMin, selectMax]}
              marks={marks}
              onAfterChange={(values) => {
                updateState({ years: { min, max, selectMin: values[0], selectMax: values[1] } });
              }}
            />
          </div>

          <div className="row toggleButton" style={{ textAlign: 'center' }}>
            <RaisedButton label="Done" primary onTouchTap={handleTouchTap} />
          </div>
        </div>
        <div className="row attribution">
          Crafted by <a href="/" rel="noopener noreferrer">Aykut Simsek</a> | 2016
        </div>
      </div>
    );
  }
}
