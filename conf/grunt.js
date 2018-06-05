// Node.js 및 webpack 환경에서 jui 코어와 연동해서 사용하기 위한 코드
if (typeof module == 'object' && module.exports) {
    try {
        module.exports = require("juijs");
    } catch(e) {
        console.log("JUI_WARNING_MSG: Base module does not exist");
    }
}