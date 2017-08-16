import React, { Component } from 'react';
import Select from 'react-select';
import axios from 'axios';

export default class IndicatorSelect extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value: 1,
      isLoading: false,
    };
  }

  onChange = value => this.props.onChange(value);

  loadOptions = (input, callback) => {
    const { request, mapper } = this.props;
    const defaultResponse = { options: [], isLoading: false };

    if (input.length < 1) {
      return callback(null, defaultResponse);
    }

    this.setState({ isLoading: true });
    return axios(request(input))
      .then(response =>
        callback(null, {
          options: mapper(response),
          isLoading: false,
        }),
      )
      .catch(() => callback(null, defaultResponse));
  }

  render() {
    const { async, allowCreate, multi, containerClassName, label, value } = this.props;
    const { isLoading } = this.state;

    const options = [
      { value: '1', label: 'One' },
      { value: '2', label: 'Two' },
      { value: '3', label: 'Three' },
      { value: '4', label: 'Four' },
      { value: '5', label: 'Five' },
    ];

    const selectComponents = {
      Select,
      'Select.Async': Select.Async,
      'Select.Creatable': Select.Creatable,
      'Select.AsyncCreatable': Select.AsyncCreatable,
    };

    const type = `Select${async || allowCreate ? '.' : ''}${async ? 'Async' : ''}${allowCreate ? 'Creatable' : ''}`;

    const SelectComponent = selectComponents[type];

    return (
      <div className={containerClassName}>
        <div className="inputLabel">{label}</div>
        <SelectComponent
          options={async ? [] : options}
          {...this.props}
          value={Array.isArray(value) && !multi ? value[0] : value}
          onChange={this.onChange}
          isLoading={isLoading}
          loadOptions={this.loadOptions}
        />
      </div>
    );
  }
}
