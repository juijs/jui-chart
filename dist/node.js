var jsdom = require("jsdom");

global.document = jsdom.jsdom();
global.window = document.defaultView;

require("../lib/core");
require("./chart");
