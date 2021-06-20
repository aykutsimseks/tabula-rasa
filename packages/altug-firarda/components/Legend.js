import React, { Component } from 'react';
import { map } from 'lodash';

import { getLocaleText } from '../utils/utils';

export default class Legend extends Component {
  render() {
    const { colorMap, current, locale, updateState } = this.props;

    return (
      <ul className="legend">
        {
          map(colorMap, (obj, country) =>
            <li
              className={`legend-item ${(current.country === country) ? 'active' : ''} ${current.summary ? 'visible' : ''}`}
              key={country}
              onClick={() => updateState(obj.min)}
            >
              { obj.color && <div className="bullet" style={{ background: obj.color }} /> }
              <span className="text">{getLocaleText(obj, 'country', locale)}</span>
            </li>,
          )
        }
      </ul>
    );
  }
}

