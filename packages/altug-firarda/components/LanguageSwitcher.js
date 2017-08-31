import React, { Component } from 'react';
import { map } from 'lodash';

const languages = {
  'en-US': {
    lan: 'en-US',
    text: 'English',
    abbv: 'EN'
  },
  tr: {
    lan: 'tr',
    text: 'Türkçe',
    abbv: 'TR'
  }
};

export default class LanguageSwitcher extends Component {
  render() {
    const { current } = this.props;
    return (
      <ul className="language-switch">
        { map(languages, lan =>
          <li
            key={lan.lan}
            className={`language-item ${current === lan.lan ? 'active' : ''}`}
            onTouchTap={() => this.props.onClick(lan.lan)}
          >
            <span className="text">{lan.text}</span>
            <span>{lan.abbv}</span>
          </li>
        )}
      </ul>
    );
  }
}

