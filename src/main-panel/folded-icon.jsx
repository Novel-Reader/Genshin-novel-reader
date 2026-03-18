import React from "react";
import PropTypes from "prop-types";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

const FoldedIcon = ({ isShowRightPanel, toggleRightPanel }) => {
  return (
    <div className="folder-icon" onClick={toggleRightPanel}>
      {isShowRightPanel ? <BsArrowRight /> : <BsArrowLeft />}
    </div>
  );
};

FoldedIcon.propTypes = {
  isShowRightPanel: PropTypes.bool.isRequired,
  toggleRightPanel: PropTypes.func.isRequired,
};

export default FoldedIcon;
