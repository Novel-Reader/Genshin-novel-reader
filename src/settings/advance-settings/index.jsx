import React from "react";
import PropTypes from "prop-types";
import intl from "react-intl-universal";
import AdvanceThemeSettings from "./advance-theme-settings";
import ColorSettings from "./color-settings";
import FontSettings from "./font-settings";
import WatermarkSettings from "./watermark-settings";
import {
  FONT_SIZES,
  FONT_FAMILYS,
  FONT_WEIGHTS,
  LINE_HEIGHTS,
  OPACITIES,
} from "../../utils/constants";
import "./index.css";

const INIT_FONT_COLOR = "#666";
const INIT_BACKGROUND_COLOR = "#aaa";

function AdvanceSettings(props) {
  // isPro ? <>welcome to user advance setting</> : <>please upgrade to VIP version</>
  const changeStyle = props.changeStyle;
  return (
    <div className="advance-settings">
      <WatermarkSettings />
      <div className="setting-divide-line"></div>
      <AdvanceThemeSettings changeStyle={changeStyle} />
      <div className="setting-divide-line"></div>
      <FontSettings
        options={FONT_SIZES}
        title={intl.get('Font size')}
        save={(option) => {
          changeStyle({ fontSize: option.value });
        }}
      />
      <FontSettings
        options={FONT_FAMILYS}
        title={intl.get('Font typeface')}
        save={(option) => {
          changeStyle({ fontFamily: option.value });
        }}
      />
      <FontSettings
        options={FONT_WEIGHTS}
        title={intl.get('Font weight')}
        save={(option) => {
          changeStyle({ fontWeight: option.value });
        }}
      />
      <FontSettings
        options={LINE_HEIGHTS}
        title={intl.get('Line height')}
        save={(option) => {
          changeStyle({ lineHeight: option.value });
        }}
      />
      <div className="setting-divide-line"></div>
      <ColorSettings
        changeStyle={changeStyle}
        title={intl.get('Font color')}
        color={INIT_FONT_COLOR}
        settingKey="color"
      />
      <ColorSettings
        changeStyle={changeStyle}
        title={intl.get('Background color')}
        color={INIT_BACKGROUND_COLOR}
        settingKey="backgroundColor"
      />
      <FontSettings
        options={OPACITIES}
        title={intl.get('Background transparency')}
        save={(option) => {
          changeStyle({ opacity: option.value });
        }}
      />
    </div>
  );
}

AdvanceSettings.propTypes = {
  changeStyle: PropTypes.func.isRequired,
};

export default AdvanceSettings;
