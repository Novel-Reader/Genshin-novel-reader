import React, { useContext } from "react";
import PropTypes from "prop-types";
import FontSettings from "./font-settings";
import ThemeSettings from "./theme-settings";
import ModeSettings from "./mode-settings";
import LangSettings from "./lang-settings";
import Share from "./share";
import FullScreen from "./full-screen";
import Admin from "../admin-settings/admin";
import { AppContext } from "../../context";

import "./index.less";

function BasicSettings(props) {

  function changeStyle(style) {
    props.changeStyle(style);
  };

  const onSaveFont = (index) => {
    const fontMap = {
      1: "24px",
      2: "16px",
      3: "12px",
    };
    const style = {
      fontSize: fontMap[index],
    };
    if (props.style.fontSize !== fontMap[index]) {
      changeStyle(style);
    }
  };

  const onSaveTheme = (index) => {
    const colorMap = {
      1: "#212529",
      2: "#212529",
      3: "rgb(153, 153, 153)",
    };
    const backgroundMap = {
      1: "rgb(251, 246, 236)",
      2: "rgb(220, 236, 210)",
      3: "rgb(50, 55, 59)",
    };
    const style = {
      color: colorMap[index],
      backgroundColor: backgroundMap[index],
    };
    if (
      props.style.color !== colorMap[index] ||
      props.style.backgroundColor !== backgroundMap[index]
    ) {
      changeStyle(style);
    }
  };

  const { isAdmin, api } = useContext(AppContext);

  return (
    <div className="basic-settings">
      {isAdmin && api && <Admin />}
      <Share />
      <FullScreen />
      <LangSettings />
      <FontSettings onSave={onSaveFont} />
      <ThemeSettings onSave={onSaveTheme} />
      <ModeSettings changeMode={props.changeMode} />
    </div>
  );
}

BasicSettings.propTypes = {
  style: PropTypes.object.isRequired,
  changeStyle: PropTypes.func.isRequired,
  changeMode: PropTypes.func.isRequired,
};

export default BasicSettings;
