import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { Typography, Popover } from 'antd';
import { SketchPicker } from "react-color";

const ColorSettings = ({ color: initialColor, changeStyle, settingKey, title }) => {
  const [color, setColor] = useState(initialColor);
  const [isShowPicker, setIsShowPicker] = useState(false);

  const onDocumentClick = useCallback((e) => {
    if (!isShowPicker) return;
    let dom = e.target;
    while (dom) {
      if (dom.className.includes("font-color-settings-picker")) {
        return;
      }
      dom = dom.parentElement;
    }
    setIsShowPicker(false);
  }, [isShowPicker]);

  useEffect(() => {
    document.addEventListener("click", onDocumentClick);
    return () => {
      document.removeEventListener("click", onDocumentClick);
    };
  }, [onDocumentClick]);

  const handleChangeComplete = useCallback((colorObj) => {
    setColor(colorObj.hex);
    changeStyle({
      [settingKey]: colorObj.hex,
    });
  }, [changeStyle, settingKey]);

  const toggle = useCallback((e) => {
    e.stopPropagation();
    setIsShowPicker(prev => !prev);
  }, []);

  const handleVisibleChange = useCallback((visible) => {
    setIsShowPicker(visible);
  }, []);

  return (
    <div className="advance-font-settings">
      <Typography.Title level={5}>{title}</Typography.Title>
      <div
        style={{ backgroundColor: color }}
        onClick={toggle}
        className="font-color-settings-current"
      ></div>
      <Popover
        content={
          <SketchPicker
            className="font-color-settings-picker"
            color={color}
            onChangeComplete={handleChangeComplete}
          />
        }
        trigger="click"
        open={isShowPicker}
        onOpenChange={handleVisibleChange}
      >
        <div></div>
      </Popover>
    </div>
  );
};

ColorSettings.propTypes = {
  color: PropTypes.string.isRequired,
  changeStyle: PropTypes.func.isRequired,
  settingKey: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default ColorSettings;
