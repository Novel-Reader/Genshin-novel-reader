import React, { useState } from "react";
import PropTypes from "prop-types";
import intl from "react-intl-universal";
import { Label } from "reactstrap";
import Select from "react-select";
import { MenuSelectStyle } from "../../utils";

function ThemeSettings(props) {

  const options = [
    { value: 1, label: intl.get('Day'), },
    { value: 2, label: intl.get('Green') },
    { value: 3, label: intl.get('Night') },
  ];

  const [theme, setTheme] = useState(props.theme || 2);

  const onChange = (selectedOption) => {
    props.onSave(selectedOption.value);
    setTheme(selectedOption.value);
  };

  return (
    <div className="basic-settings-item">
      <Label>{intl.get('Page_Theme')}</Label>
      <Select
        value={options.find((option) => option.value === theme) || options[1]}
        options={options}
        onChange={onChange}
        captureMenuScroll={false}
        styles={MenuSelectStyle}
      />
    </div>
  );
}

ThemeSettings.propTypes = {
  onSave: PropTypes.func.isRequired,
  theme: PropTypes.number,
};

ThemeSettings.defaultProps = {};

export default ThemeSettings;
