import React from "react";
import PropTypes from "prop-types";
import intl from "react-intl-universal";
import { Tooltip } from 'antd';

import "./index.less";

const ScrollTopIcon = ({ onClick, style }) => {
  const id = "novel-scroll-top-icon";
  return (
    <Tooltip
      placement="right"
      title={intl.get('Back to top')}
      getPopupContainer={() => document.getElementById(id)}
    >
      <div
        className="scroll-top-icon"
        onClick={onClick}
        style={style}
        id={id}
      ></div>
    </Tooltip>
  );
};

ScrollTopIcon.propTypes = {
  onClick: PropTypes.func.isRequired,
  style: PropTypes.object.isRequired,
};

export default ScrollTopIcon;
