import setting from "./setting.json";

let localSetting = {};

try {
  localSetting = require("./setting.local.json");
} catch (error) {
  // eslint-disable-next-line
  console.error("Could not load local settings:", error);
}

const newSetting = Object.assign({}, setting, localSetting);

export default newSetting;
