import React from "react";
import intl from "react-intl-universal";
import Cookies from 'js-cookie';
import Select from "react-select";
import { Typography } from 'antd';
import { MenuSelectStyle } from "../../utils";

function LangSettings() {
  const lang = Cookies.get("lang") || "en";

  const options = [
    { value: "zh_CN", label: "中文" },
    { value: "en", label: "English" },
  ];

  const onChange = (selectedLang) => {
    if (lang !== selectedLang.value) {
      Cookies.set("lang", selectedLang.value);
      location.reload();
    }
  };

  return (
    <div className="basic-settings-item">
      <Typography.Title level={5}>{intl.get("Select")}</Typography.Title>
      <Select
        value={options.find((option) => option.value === lang) || options[1]}
        options={options}
        onChange={onChange}
        captureMenuScroll={false}
        styles={MenuSelectStyle}
      />
    </div>
  );
}

export default LangSettings;
