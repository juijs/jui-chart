import jui from 'juijs-graph'

jui.use = function() {
    let modules = [];

    if(arguments.length == 1 && typeof(arguments[0]) == "object") {
        modules = arguments[0];
    } else {
        modules = arguments;
    }

    for(let i = 0; i < modules.length; i++) {
        let module = modules[i];

        if(typeof(module) == "object") {
            if(typeof(module.name) != "string") return;
            if(typeof(module.component) != "function") return;

            // 상속 대상 부모 클래스가 존재할 경우
            if(module.extend != null) {
                if(jui.include(module.extend) == null) {
                    console.warn("JUI_WARNING_MSG: '" + module.extend +  "' module should be imported in first");
                }
            }

            jui.redefine(module.name, [], module.component, module.extend);
        }
    }
}

export default jui;