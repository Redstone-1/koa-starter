import log4js from "log4js";

// 加载配置文件
log4js.configure('./log4js.json');

export default log4js.getLogger();
