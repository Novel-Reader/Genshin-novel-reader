import React, { useState } from "react";
import PropTypes from "prop-types";
import intl from "react-intl-universal";
import { Label } from "reactstrap";
import { PAGES, PARAGRAPHS } from "../../utils/constants";
import Select from "react-select";
import { MenuSelectStyle } from "../../utils";

function ModeSettings(props) {

  const [mode, setTheme] = useState(2);

  const options = [
    { value: PAGES, label: intl.get('Separate'), },
    { value: PARAGRAPHS, label: intl.get('Paragraph') },
  ];

  const onChange = (selectedOption) => {
    props.changeMode(selectedOption.value);
    setTheme(selectedOption.value);
  };

  return (
    <div className="basic-settings-item">
      <Label>阅读模式</Label>
      <Select
        value={options.find((option) => option.value === mode) || options[0]}
        options={options}
        onChange={onChange}
        captureMenuScroll={false}
        styles={MenuSelectStyle}
      />
    </div>
  );
}

ModeSettings.propTypes = {
  changeMode: PropTypes.func.isRequired,
};

export default ModeSettings;
