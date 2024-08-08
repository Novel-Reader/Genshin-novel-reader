import setting from "./setting.json";
import localsetting from "./setting.local.json";

const newSetting = Object.assign({}, setting, localsetting);

export default newSetting;
