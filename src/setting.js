import setting from "./setting.json";

let localSetting = {};

localSetting = await import("./setting.local.json").then(module => module.default).catch((error) => {
  // eslint-disable-next-line
  console.log("Error loading local setting file, No local setting file found, use default setting.", error);
});

const newSetting = Object.assign({}, setting, localSetting);

export default newSetting;
