import setting from "./setting.json";

let localSetting = {};

try {
  localSetting = require("./setting.local.json");
} catch (error) {
  // eslint-disable-next-line
  console.log("No local setting file found, use default setting.");
}

const newSetting = Object.assign({}, setting, localSetting);

export default newSetting;
