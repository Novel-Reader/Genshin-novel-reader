import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import intl from "react-intl-universal";
import { Typography } from 'antd';
import Select from "react-select";
import { MenuSelectStyle } from "../../utils";

const FontSettings = ({ onSave }) => {
  const options = useMemo(() => [
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
  ], []);

  const [activeOption, setActiveOption] = useState(options[1]);

  const onChange = (option) => {
    setActiveOption(option);
    onSave(option.value);
  };

  return (
    <div className="basic-settings-item">
      <Typography.Title level={5}>{intl.get('Font_Size')}</Typography.Title>
      <Select
        value={activeOption}
        options={options}
        onChange={onChange}
        captureMenuScroll={false}
        classNamePrefix
        styles={MenuSelectStyle}
      />
    </div>
  );
};

FontSettings.propTypes = {
  fontSize: PropTypes.number,
  onSave: PropTypes.func.isRequired,
};

export default FontSettings;
