import React, { Component } from "react";
import PropTypes from "prop-types";
import intl from "react-intl-universal";
import { Label } from "reactstrap";
import Select from "react-select";
import { MenuSelectStyle } from "../../utils";

class FontSettings extends Component {

  constructor(props) {
    super(props);
    this.options = [
      {
        value: 1,
        label: <>{intl.get('Large')}</>
      },
      {
        value: 2,
        label: <>{intl.get('Middle')}</>
      },
      {
        value: 3,
        label: <>{intl.get('Small')}</>
      },
    ];
    this.state = {
      activeOption: this.options[1],
    };
  }

  onChange = (option) => {
    this.setState({ activeOption: option });
    this.props.onSave(option.value);
  };

  render() {
    return (
      <div className="basic-settings-item">
        <Label>{intl.get('Font_Size')}</Label>
          <Select
            value={this.state.activeOption}
            options={this.options}
            onChange={this.onChange}
            captureMenuScroll={false}
            classNamePrefix
            styles={MenuSelectStyle}
          />
      </div>
    );
  }
}

FontSettings.propTypes = {
  fontSize: PropTypes.number,
  onSave: PropTypes.func.isRequired,
};

export default FontSettings;
