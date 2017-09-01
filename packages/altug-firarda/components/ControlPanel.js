import React, { Component } from 'react';

import { capitalize } from 'lodash';

import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Dialog from 'material-ui/Dialog';

import BackIcon from 'material-ui/svg-icons/navigation/arrow-back';
import ForwardIcon from 'material-ui/svg-icons/navigation/arrow-forward';
import CalendarIcon from 'material-ui/svg-icons/action/date-range';
import InfoIcon from 'material-ui/svg-icons/action/info-outline';

import { formatDateDisplay, dayDiff, getLocaleText } from '../utils/utils';

const day0 = '2015-02-02';

const aboutModal = (modalState, toggle) => (
  <Dialog
    modal={false}
    open={modalState}
    onRequestClose={() => { toggle(false); }}
  >
    <div className="info-modal">
      <div className="row">Crafted with ❤ by <a href="/" rel="noopener noreferrer">Aykut Simsek</a> | 2016</div>
    </div>
  </Dialog>
);

export default class ControlPanel extends Component {

  constructor(props) {
    super(props);

    this.state = {
      modalState: false,
    };
  }

  toggleAboutModal = (bool) => {
    this.setState({ modalState: bool });
  };

  render() {
    const { index, country, instagram_image_id, start_date, end_date, locale, summary, updateState } = this.props;
    const props = this.props;

    return (
      <div className="control-panel">
        <div className="header-bar">
          <div className="title">
            {`${getLocaleText(props, 'place', locale)}${country ? `, ${getLocaleText(props, 'country', locale)}` : ''}`}
          </div>
          <div className="dates">
            <CalendarIcon style={{ color: '#fff', height: 18, width: 18, marginBottom: -4, marginLeft: -1 }} />
            &nbsp;{ formatDateDisplay(start_date, end_date) }
          </div>
          { !summary &&
            <div className="nth-day">
              {capitalize(getLocaleText(props, 'day', locale))} <div style={{ fontSize: 18 }}>{dayDiff(day0, start_date, locale) + 1}</div>
            </div>
          }
        </div>
        <div className="main-content">
          { !summary &&
            <div className="instagram-embed">
              <iframe
                className="instagram-media instagram-media-rendered"
                id="instagram-embed"
                allowTransparency="true"
                scrolling="no"
                width={320}
                height={400}
                frameBorder={0}
                src={`https://instagram.com/p/${instagram_image_id}/embed/?v=1`}
              />
            </div>
          }
          <div className="story">
            <div dangerouslySetInnerHTML={{ __html: getLocaleText(props, 'story', locale).replace(/(#\w+)/g, "<span class='hastag' >$1</span>") }} />
          </div>
        </div>
        <div className="bottom-navigation">
          <BottomNavigation>
            <BottomNavigationItem
              className="bottom-navigation-item"
              onTouchTap={() => updateState(index - 1)}
              icon={<BackIcon />}
            />
            <BottomNavigationItem
              className="bottom-navigation-item"
              icon={<InfoIcon style={{ width: 18, margin: 'auto' }} />}
              onTouchTap={() => { this.toggleAboutModal(true); }}
            />
            { aboutModal(this.state.modalState, this.toggleAboutModal) }
            <BottomNavigationItem
              className="bottom-navigation-item"
              onTouchTap={() => updateState(index + 1)}
              icon={<ForwardIcon />}
            />
          </BottomNavigation>
        </div>
      </div>
    );
  }
}
