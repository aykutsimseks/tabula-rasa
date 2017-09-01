import React, { Component } from 'react';
import { get, each } from 'lodash';

import { setMomentLocale } from './utils/utils';
import ControlPanel from './components/ControlPanel';
import TripMap from './components/TripMap';
import Legend from './components/Legend';
import LanguageSwitcher from './components/LanguageSwitcher';

import trip from '@public/static/data/altug-firarda.json';
import { colorDict } from './utils/map_utils';

require('./styles/main.scss');

each(trip, ((p, i) => { p.departed_by = get(trip, [i + 1, 'arrived_by']); }));

export default class AltugFirarda extends Component {

  constructor(props) {
    super(props);

    const index = Number(this.props.params.pageId - 1) || 0;

    this.colorMap = colorDict(trip);

    this.state = {
      index,
      locale: this.getDefaultLocale(),
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
    document.title = 'Altug Firarda';
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  getDefaultLocale = () => {
    const browserLanguage = navigator.browserLanguage || navigator.language || 'en-US';

    let locationLanguage = get(this.props, 'location.query.l');
    if (locationLanguage && locationLanguage.startsWith('en')) {
      locationLanguage = 'en-US';
    }

    return browserLanguage || locationLanguage || 'tr';
  }

  updateState = (i) => {
    let index = i;
    const lastIndex = trip.length - 1;

    if (index > lastIndex) {
      index = 0;
    } else if (index < 0) {
      index = lastIndex;
    }
    this.setState({ index });
  }

  handleKeyPress = (event) => {
    const keyCode = event.keyCode;
    switch (keyCode) {
      case 37:
        this.updateState(this.state.index - 1);
        break;

      case 39:
        this.updateState(this.state.index + 1);
        break;

      default:
        break;
    }
  }
  changeLocale = locale => this.setState({ locale })

  render() {
    const { index, locale } = this.state;
    const current = trip[index];
    setMomentLocale(locale);

    return (
      <div className="altug-firarda">
        <ControlPanel index={index} locale={locale} updateState={this.updateState} {...current} />
        <TripMap index={index} current={current} trip={trip} colorMap={this.colorMap} />
        <Legend colorMap={this.colorMap} current={current} locale={locale} updateState={this.updateState} />
        <LanguageSwitcher current={locale} onClick={this.changeLocale} />
      </div>
    );
  }
}
