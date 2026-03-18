import React, { useState } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { Typography } from 'antd';
import { MenuSelectStyle } from "../../utils";

const FontSettings = ({ title, options, save }) => {
  const [selected, setSelected] = useState(null);

  const onChange = (option) => {
    setSelected(option);
    save(option);
  };

  const preCls = "advance-font-settings";
  return (
    <div className={preCls}>
      <Typography.Title level={5}>{title}</Typography.Title>
      <Select
        value={selected}
        options={options}
        onChange={onChange}
        captureMenuScroll={false}
        className={`${preCls}-select`}
        classNamePrefix
        styles={MenuSelectStyle}
      />
    </div>
  );
};

FontSettings.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  save: PropTypes.func.isRequired,
};

export default FontSettings;
