import React, { Component } from 'react'
import Select from 'react-select';
import { Label } from 'reactstrap';

// options title save
export default class FontSettings extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: null,
    };
  }

  onChange = (option) => {
    this.setState({ selected: option });
    this.props.save(option);
  }

  render() {
    const preCls = 'advance-font-settings'
    return (
      <div className={preCls}>
        <Label>{this.props.title}</Label>
        <Select
          value={this.state.selected}
          options={this.props.options}
          onChange={this.onChange}
          captureMenuScroll={false}
          className={`${preCls}-select`}
          classNamePrefix
          // placeholder='选择主题'
        />
      </div>
    )
  }
}

