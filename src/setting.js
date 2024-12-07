import setting from "./setting.json";
import localSetting from "./setting.local.json";

const newSetting = Object.assign({}, setting, localSetting);

export default newSetting;
