import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


import { load } from './actions/raspaActions';

import ReactHighcharts from 'react-highcharts';

import * as qs from 'query-string';

// import apartments from './all_results.json';

// import { groupBy } from '../utils';

// const groups = groupBy(apartments, a => a.apartment);

// let series = Object.keys(groups)
//   .map(g => ({
//     ...groups[g][0],
//     type: 'spline',
//     name: g,
//     data: groups[g]
//       .map(d => ({ ...d, x: new Date(d.date), y: Number(d.rent) }))
//       .sort((a, b) => a.x - b.x),
//   }));
//
const series = [];

// // series = series.filter(s => s.rent > 2900 && s.rent < 3300);
// series = series.filter(s => ['02', '01', '03', '04', '18'].includes(s.name.slice(-2)) && s.name.length > 3 && s.name >= "2800");
// // series = series.filter(s => ['02'].includes(s.name.slice(-2)));
// // series = series.filter(s => s.beds == 1);
// // series = series.filter(s => s.data[s.data.length - 1].date !== '2018-12-29');
// // series = series.filter(s => s.data[s.data.length - 1].date === '2019-1-8');
// series = series.filter(s => s.beds === '1');

// const series = [];

const config = {
  exporting: {
    enabled: false,
  },
  credits: {
    enabled: false,
  },
  chart: {
    backgroundColor: 'rgba(255, 255, 255, 0)',
    plotShadow: false,
    spacingTop: 15,
    fontFamily: 'ProximaNova, Helvetica, Verdana, sans-serifNova',
  },
  title: {
    text: 'Avalon Fort Greene',
    floating: false,
    align: 'left',
    style: {
      fontSize: '19px',
      //background: 'rgb(238, 238, 238)',
      top: 0,
      left: 0,
      minWidth: '100%',
      lineHeight: '52px',
      height: '52px',
      padding: '0 10px',
      borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
      fontFamily: 'ProximaNova, Helvetica, Verdana, sans-serifNova',
      overflowX: 'hidden',
      textOverflow: 'ellipsis',
    },
    x: -10,
    y: 2,
    useHTML: true,
  },
  tooltip: {
    style: {
      fontSize: '11px',
    },
    shadow: true,
    opacity: 1,
    borderWidth: 0,
    boxShadow: '0 1px 3px rgba(0,0,0,0.65)',
    backgroundColor: 'rgba(255,255,255,1)',
    borderRadius: 0,
    margin: 'auto',
    boder: 'none',
    shared: true,
    xDateFormat: '%Y',
    headerFormat: '<span style="font-size: 10px">{point.key}</span><br/>',
  },
  subtitle: {
    text: '',
    floating: false,
    align: 'left',
  },
  yAxis: {
    title: {
      text: 'Price',
    },
    gridLineWidth: 1,
    gridLineDashStyle: 'Dot',
    labels: {
      style: {
        fontSize: 10,
      },
    },
    labels: {
      formatter() { return `$${this.value}`; },
    },
  },
  xAxis: {
    type: 'datetime',
    // crosshair: true,
    lineWidth: 0,
    minorTickLength: 0,
    labels: {
      overflow: 'justify',
      style: {
        fontSize: 10,
      },
    },
  },
  legend: {
    enabled: true,
    floating: false,
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'middle',
    borderWidth: 0,
    y: 0,
    padding: 0,
    itemStyle: {
      opacity: 1,
      fontSize: 11,
      fontWeight: 600,
    },
    itemHoverStyle: {
      opacity: 0.7,
    },
  },
  plotOptions: {
    series: {
      cursor: 'pointer',
      connectNulls: true,
      lineWidth: 2,
      marker: {
        enabled: false,
        radius: 2,
        symbol: 'circle',
      },
      states: {
        hover: {
          lineWidth: 2,
          symbol: 'circle',
        },
      },
    },
  },
  series,
  responsive: {
    rules: [{
      condition: {
        maxWidth: 500,
      },
      chartOptions: {
        legend: {
          layout: 'horizontal',
          align: 'center',
          verticalAlign: 'bottom',
        },
      },
    }],
  },
};

class Raspa extends Component {
  render() {
    const params = qs.parse(location.search);

    return (
      <ReactHighcharts config={config}></ReactHighcharts>
    );
  }
}


const mapStateToProps = state => state.toJS().raspa;

const mapDispatchToProps = dispatch => bindActionCreators({
  load,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Raspa);
