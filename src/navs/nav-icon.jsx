import React from "react";
import PropTypes from "prop-types";

function NavIcon({ onClick, children }) {
  return (
    <div className="navs-header-icon" onClick={onClick}>
      {children}
    </div>
  );
};

NavIcon.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.any,
};

export default NavIcon;
