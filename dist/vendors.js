(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

if (typeof module == 'object' && module.exports) {
    try {
        module.exports = __webpack_require__(1);

        __webpack_require__(3)
        __webpack_require__(4)
        __webpack_require__(5)
        __webpack_require__(6)
        __webpack_require__(7)
        __webpack_require__(8)
        __webpack_require__(9)
        __webpack_require__(10)
        __webpack_require__(11)
        __webpack_require__(12)
        __webpack_require__(13)
        __webpack_require__(14)
        __webpack_require__(15)
        __webpack_require__(16)
        __webpack_require__(17)
        __webpack_require__(18)
        __webpack_require__(19)
        __webpack_require__(20)
        __webpack_require__(21)
        __webpack_require__(22)
        __webpack_require__(23)
        __webpack_require__(24)
        __webpack_require__(25)
        __webpack_require__(26)
        __webpack_require__(27)
        __webpack_require__(28)
        __webpack_require__(29)
        __webpack_require__(30)
        __webpack_require__(31)
        __webpack_require__(32)
        __webpack_require__(33)
        __webpack_require__(34)
        __webpack_require__(35)
        __webpack_require__(36)
        __webpack_require__(37)
        __webpack_require__(38)
        __webpack_require__(39)
        __webpack_require__(40)
        __webpack_require__(41)
        __webpack_require__(42)
        __webpack_require__(43)
        __webpack_require__(44)
        __webpack_require__(45)
        __webpack_require__(46)
        __webpack_require__(47)
        __webpack_require__(48)
        __webpack_require__(49)
        __webpack_require__(50)
        __webpack_require__(51)
        __webpack_require__(52)
        __webpack_require__(53)
        __webpack_require__(54)
        __webpack_require__(55)
        __webpack_require__(56)
    } catch(e) {
        console.log("JUI_WARNING_MSG: Base module does not exist");
    }
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {!function(a,b){var c={jquery:"undefined"!=typeof jQuery?jQuery:null},d={},e={},f={template:{evaluate:/<\!([\s\S]+?)\!>/g,interpolate:/<\!=([\s\S]+?)\!>/g,escape:/<\!-([\s\S]+?)\!>/g},logUrl:"tool/debug.html"},g=c["util.base"]={browser:{webkit:"WebkitAppearance"in document.documentElement.style,mozilla:"undefined"!=typeof a.mozInnerScreenX,msie:a.navigator.userAgent.indexOf("Trident")!=-1},isTouch:/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(a.navigator.userAgent),inherit:function(a,b){this.typeCheck("function",a)&&this.typeCheck("function",b)&&(a.parent=b,a.prototype=new b,a.prototype.constructor=a,a.prototype.parent=a.prototype,a.prototype["super"]=function(a,b){return this.constructor.prototype[a].apply(this,b)})},extend:function(a,b,c){function d(a){return g.typeCheck("object",a)}if(this.typeCheck(["object","function"],a)||(a={}),!this.typeCheck(["object","function"],b))return a;for(var e in b)c===!0?d(a[e])?this.extend(a[e],b[e],c):this.typeCheck("undefined",a[e])&&(a[e]=b[e]):d(a[e])?this.extend(a[e],b[e],c):a[e]=b[e];return a},pxToInt:function(a){return this.typeCheck("string",a)&&a.indexOf("px")!=-1?parseInt(a.split("px").join("")):a},clone:function(a){var b=this.typeCheck("array",a)?[]:{};for(var c in a)this.typeCheck("object",a[c])?b[c]=this.clone(a[c]):b[c]=a[c];return b},deepClone:function(a,b){var c=null;if(b=b||{},this.typeCheck("array",a)){c=new Array(a.length);for(var d=0,e=a.length;d<e;d++)c[d]=this.deepClone(a[d],b)}else if(this.typeCheck("date",a))c=a;else if(this.typeCheck("object",a)){c={};for(var f in a)b[f]?c[f]=a[f]:c[f]=this.deepClone(a[f],b)}else c=a;return c},sort:function(a){var b=jui.include("util.sort");return new b(a)},runtime:function(a,b){var c=(new Date).getTime();b();var d=(new Date).getTime();console.log(a+" : "+(d-c)+"ms")},template:function(a,b){var c=jui.include("util.template");return b?c(a,b,f.template):c(a,null,f.template)},resize:function(b,c){var d=function(){var a=0;return function(){clearTimeout(a),a=setTimeout(b,c)}}();a.addEventListener?a.addEventListener("resize",d):object.attachEvent?a.attachEvent("onresize",d):a.onresize=d},index:function(){var a=jui.include("util.keyparser");return new a},chunk:function(a,b){for(var c=[],d=0,e=a.length;d<e;)c.push(a.slice(d,d+=b));return c},typeCheck:function(a,b){function c(a,b){return"string"==typeof a&&("string"==a?"string"==typeof b:"integer"==a?"number"==typeof b&&b%1==0:"float"==a?"number"==typeof b&&b%1!=0:"number"==a?"number"==typeof b:"boolean"==a?"boolean"==typeof b:"undefined"==a?"undefined"==typeof b:"null"==a?null===b:"array"==a?b instanceof Array:"date"==a?b instanceof Date:"function"==a?"function"==typeof b:"object"==a&&!("object"!=typeof b||null===b||b instanceof Array||b instanceof Date||b instanceof RegExp))}if("object"==typeof a&&a.length){for(var d=a,e=0;e<d.length;e++)if(c(d[e],b))return!0;return!1}return c(a,b)},typeCheckObj:function(a,b){if("object"==typeof a){var c=this;for(var d in a){var e=a[d];"function"==typeof e&&!function(d,e){a[d]=function(){for(var a=arguments,f=b[d],g=0;g<a.length;g++)if(!c.typeCheck(f[g],a[g]))throw new Error("JUI_CRITICAL_ERR: the "+g+"th parameter is not a "+f[g]+" ("+name+")");return e.apply(this,a)}}(d,e)}}},dataToCsv:function(a,b,c){for(var d="",e=c?c:b.length,f=-1;f<e;f++){for(var g=[],h=0;h<a.length;h++)if(a[h])if(f==-1)g.push('"'+a[h]+'"');else{var i=b[f][a[h]];g.push(isNaN(i)?'"'+i+'"':i)}d+=g.join(",")+"\n"}return d},dataToCsv2:function(a){for(var b="",c=this.extend({fields:null,rows:null,names:null,types:null,count:this.typeCheck("integer",a.count)?a.count:a.rows.length},a),d=-1;d<c.count;d++){for(var e=[],f=0;f<c.fields.length;f++)if(c.fields[f])if(d==-1)c.names&&c.names[f]?e.push('"'+c.names[f]+'"'):e.push('"'+c.fields[f]+'"');else{var g=c.rows[d][c.fields[f]];this.typeCheck("array",c.types)?"string"==c.types[f]?e.push('"'+g+'"'):"integer"==c.types[f]?e.push(parseInt(g)):"float"==c.types[f]?e.push(parseFloat(g)):e.push(g):e.push(isNaN(g)?'"'+g+'"':g)}b+=e.join(",")+"\n"}return b},fileToCsv:function(a,b){var c=new FileReader;c.onload=function(a){g.typeCheck("function",b)&&b(a.target.result)},c.readAsText(a)},csvToBase64:function(a){var b=jui.include("util.base64");return"data:application/octet-stream;base64,"+b.encode(a)},csvToData:function(a,b,c){for(var d=[],e=b.split("\n"),f=1;f<e.length;f++)if(""!=e[f]){for(var g=e[f].split(","),h={},i=0;i<a.length;i++)h[a[i]]=g[i],this.startsWith(g[i],'"')&&this.endsWith(g[i],'"')?h[a[i]]=g[i].split('"').join(""):h[a[i]]=g[i],this.inArray(a[i],c)!=-1&&(h[a[i]]=parseFloat(g[i]));d.push(h)}return d},getCsvFields:function(a,b){for(var c=this.typeCheck("array",b)?b:a,d=0;d<c.length;d++)isNaN(c[d])||(c[d]=a[c[d]]);return c},svgToBase64:function(a){var b=jui.include("util.base64");return"data:image/svg+xml;base64,"+b.encode(a)},dateFormat:function(a,b,c){function d(a,b){var c=a+"";for(b=b||2;c.length<b;)c="0"+c;return c}var e=["\0","January","February","March","April","May","June","July","August","September","October","November","December"],f=["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],g=["","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],h=["","Sun","Mon","Tue","Wed","Thu","Fri","Sat"],i=c?a.getUTCFullYear():a.getFullYear();b=b.replace(/(^|[^\\])yyyy+/g,"$1"+i),b=b.replace(/(^|[^\\])yy/g,"$1"+i.toString().substr(2,2)),b=b.replace(/(^|[^\\])y/g,"$1"+i);var j=(c?a.getUTCMonth():a.getMonth())+1;b=b.replace(/(^|[^\\])MMMM+/g,"$1"+e[0]),b=b.replace(/(^|[^\\])MMM/g,"$1"+f[0]),b=b.replace(/(^|[^\\])MM/g,"$1"+d(j)),b=b.replace(/(^|[^\\])M/g,"$1"+j);var k=c?a.getUTCDate():a.getDate();b=b.replace(/(^|[^\\])dddd+/g,"$1"+g[0]),b=b.replace(/(^|[^\\])ddd/g,"$1"+h[0]),b=b.replace(/(^|[^\\])dd/g,"$1"+d(k)),b=b.replace(/(^|[^\\])d/g,"$1"+k);var l=c?a.getUTCHours():a.getHours();b=b.replace(/(^|[^\\])HH+/g,"$1"+d(l)),b=b.replace(/(^|[^\\])H/g,"$1"+l);var m=l>12?l-12:0==l?12:l;b=b.replace(/(^|[^\\])hh+/g,"$1"+d(m)),b=b.replace(/(^|[^\\])h/g,"$1"+m);var n=c?a.getUTCMinutes():a.getMinutes();b=b.replace(/(^|[^\\])mm+/g,"$1"+d(n)),b=b.replace(/(^|[^\\])m/g,"$1"+n);var o=c?a.getUTCSeconds():a.getSeconds();b=b.replace(/(^|[^\\])ss+/g,"$1"+d(o)),b=b.replace(/(^|[^\\])s/g,"$1"+o);var p=c?a.getUTCMilliseconds():a.getMilliseconds();b=b.replace(/(^|[^\\])fff+/g,"$1"+d(p,3)),p=Math.round(p/10),b=b.replace(/(^|[^\\])ff/g,"$1"+d(p)),p=Math.round(p/10),b=b.replace(/(^|[^\\])f/g,"$1"+p);var q=l<12?"AM":"PM";b=b.replace(/(^|[^\\])TT+/g,"$1"+q),b=b.replace(/(^|[^\\])T/g,"$1"+q.charAt(0));var r=q.toLowerCase();b=b.replace(/(^|[^\\])tt+/g,"$1"+r),b=b.replace(/(^|[^\\])t/g,"$1"+r.charAt(0));var s=-a.getTimezoneOffset(),t=c||!s?"Z":s>0?"+":"-";if(!c){s=Math.abs(s);var u=Math.floor(s/60),v=s%60;t+=d(u)+":"+d(v)}b=b.replace(/(^|[^\\])K/g,"$1"+t);var w=(c?a.getUTCDay():a.getDay())+1;return b=b.replace(new RegExp(g[0],"g"),g[w]),b=b.replace(new RegExp(h[0],"g"),h[w]),b=b.replace(new RegExp(e[0],"g"),e[j]),b=b.replace(new RegExp(f[0],"g"),f[j]),b=b.replace(/\\(.)/g,"$1")},createId:function(a){return[a||"id",+new Date,Math.round(100*Math.random())%100].join("-")},btoa:function(a){var b=jui.include("util.base64");return b.encode(a)},atob:function(a){var b=jui.include("util.base64");return b.decode(a)},timeLoop:function(a,b){return function(c,d){function e(a){a<1||(1==a?(c.call(b,a),d.call(b)):setTimeout(function(){a>-1&&c.call(b,a--),a>-1&&e(a)},1))}e(a)}},loop:function(a,b){var c=0,d=a,e=Math.ceil(a/5);return function(a){for(var f=c,g=1*e,h=2*e,i=3*e,j=4*e,k=g,l=h,m=i,n=j,o=d;f<k&&f<d;)a.call(b,f,1),f++,g<l&&g<d&&(a.call(b,g,2),g++),h<m&&h<d&&(a.call(b,h,3),h++),i<n&&i<d&&(a.call(b,i,4),i++),j<o&&j<d&&(a.call(b,j,5),j++)}},loopArray:function(a,b){var c=a.length,d=0,e=c,f=Math.ceil(c/5);return function(c){for(var g=d,h=1*f,i=2*f,j=3*f,k=4*f,l=h,m=i,n=j,o=k,p=e;g<l&&g<e;)c.call(b,a[g],g,1),g++,h<m&&h<e&&(c.call(b,a[h],h,2),h++),i<n&&i<e&&(c.call(b,a[i],i,3),i++),j<o&&j<e&&(c.call(b,a[j],j,4),j++),k<p&&k<e&&(c.call(b,a[k],k,5),k++)}},makeIndex:function(a,b){var c={},d=this.loopArray(a);return d(function(a,d){var e=a[b];"undefined"==typeof c[e]&&(c[e]=[]),c[e].push(d)}),c},startsWith:function(a,b,c){return c=c||0,a.lastIndexOf(b,c)===c},endsWith:function(a,b,c){var d=a;(void 0===c||c>d.length)&&(c=d.length),c-=b.length;var e=d.indexOf(b,c);return e!==-1&&e===c},inArray:function(a,b){if(this.typeCheck(["undefined","null"],a)||!this.typeCheck("array",b))return-1;for(var c=0,d=b.length;c<d;c++)if(b[c]==a)return c;return-1},trim:function(a){var b="[\\x20\\t\\r\\n\\f]",c=new RegExp("^"+b+"+|((?:^|[^\\\\])(?:\\\\.)*)"+b+"+$","g");return null==a?"":(a+"").replace(c,"")},ready:function(){function b(){if(!g.isReady){try{document.documentElement.doScroll("left")}catch(a){return void setTimeout(b,1)}g.ready()}}function c(a){g.bindReady();g.type(a);d.done(a)}var d,e,f={};f["[object Boolean]"]="boolean",f["[object Number]"]="number",f["[object String]"]="string",f["[object Function]"]="function",f["[object Array]"]="array",f["[object Date]"]="date",f["[object RegExp]"]="regexp",f["[object Object]"]="object";var g={isReady:!1,readyWait:1,holdReady:function(a){a?g.readyWait++:g.ready(!0)},ready:function(a){if(a===!0&&!--g.readyWait||a!==!0&&!g.isReady){if(!document.body)return setTimeout(g.ready,1);if(g.isReady=!0,a!==!0&&--g.readyWait>0)return;d.resolveWith(document,[g])}},bindReady:function(){if(!d){if(d=g._Deferred(),"complete"===document.readyState)return setTimeout(g.ready,1);if(document.addEventListener)document.addEventListener("DOMContentLoaded",e,!1),a.addEventListener("load",g.ready,!1);else if(document.attachEvent){document.attachEvent("onreadystatechange",e),a.attachEvent("onload",g.ready);var c=!1;try{c=null==a.frameElement}catch(f){}document.documentElement.doScroll&&c&&b()}}},_Deferred:function(){var a,b,c,d=[],e={done:function(){if(!c){var b,f,h,i,j,k=arguments;for(a&&(j=a,a=0),b=0,f=k.length;b<f;b++)h=k[b],i=g.type(h),"array"===i?e.done.apply(e,h):"function"===i&&d.push(h);j&&e.resolveWith(j[0],j[1])}return this},resolveWith:function(e,f){if(!c&&!a&&!b){f=f||[],b=1;try{for(;d[0];)d.shift().apply(e,f)}finally{a=[e,f],b=0}}return this},resolve:function(){return e.resolveWith(this,arguments),this},isResolved:function(){return!(!b&&!a)},cancel:function(){return c=1,d=[],this}};return e},type:function(a){return null==a?String(a):f[Object.prototype.toString.call(a)]||"object"}};return document.addEventListener?e=function(){document.removeEventListener("DOMContentLoaded",e,!1),g.ready()}:document.attachEvent&&(e=function(){"complete"===document.readyState&&(document.detachEvent("onreadystatechange",e),g.ready())}),c}(),param:function(a){var b=/%20/g,c=[],d=function(a,b){b=g.typeCheck("function",b)?b():null==b?"":b,c[c.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};for(var e in a)d(e,a[e]);return c.join("&").replace(b,"+")},ajax:function(a){var b=null,c="",d=null,e=g.extend({url:null,type:"GET",data:null,async:!0,success:null,fail:null},a);if(this.typeCheck("string",e.url)&&this.typeCheck("function",e.success)){if(this.typeCheck("object",e.data)&&(c=this.param(e.data)),this.typeCheck("undefined",XMLHttpRequest))for(var f=["MSXML2.XmlHttp.5.0","MSXML2.XmlHttp.4.0","MSXML2.XmlHttp.3.0","MSXML2.XmlHttp.2.0","Microsoft.XmlHttp"],h=0,i=f.length;h<i;h++)try{b=new ActiveXObject(f[h]);break}catch(j){}else b=new XMLHttpRequest;null!=b&&(b.open(e.type,e.url,e.async),b.send(c),d=function(){4===b.readyState&&200==b.status?e.success(b):g.typeCheck("function",e.fail)&&e.fail(b)},e.async?b.onreadystatechange=d:d())}},scrollWidth:function(){var a=document.createElement("p");a.style.width="100%",a.style.height="200px";var b=document.createElement("div");b.style.position="absolute",b.style.top="0px",b.style.left="0px",b.style.visibility="hidden",b.style.width="200px",b.style.height="150px",b.style.overflow="hidden",b.appendChild(a),document.body.appendChild(b);var c=a.offsetWidth;b.style.overflow="scroll";var d=a.offsetWidth;return c==d&&(d=b.clientWidth),document.body.removeChild(b),c-d}},h=function(a){for(var b=[],d=0;d<a.length;d++){var e=c[a[d]];if(g.typeCheck(["function","object"],e))b.push(e);else{var f=i(a[d]);null==f?(console.log("JUI_WARNING_MSG: '"+a[d]+"' is not loaded"),b.push(null)):b.push(f)}}return b},i=function(a){var b=null,a=a+".";for(var d in c)if(d.indexOf(a)!=-1&&g.typeCheck(["function","object"],c[d])){var e=d.split(a).join("");e.indexOf(".")==-1&&(null==b&&(b={}),b[e]=c[d])}return b};a.jui=b.jui={ready:function(){var a=[],b=2==arguments.length?arguments[1]:arguments[0],c=2==arguments.length?arguments[0]:null;if(!g.typeCheck(["array","null"],c)||!g.typeCheck("function",b))throw new Error("JUI_CRITICAL_ERR: Invalid parameter type of the function");g.ready(function(){if(c)a=h(c);else{var d=i("ui"),e={};g.extend(e,d),g.extend(e,i("grid")),a=[d,e,g]}b.apply(null,a)})},defineUI:function(a,b,f,i){if(!(g.typeCheck("string",a)&&g.typeCheck("array",b)&&g.typeCheck("function",f)&&g.typeCheck(["string","undefined"],i)))throw new Error("JUI_CRITICAL_ERR: Invalid parameter type of the function");if(g.typeCheck("function",e[a]))throw new Error("JUI_CRITICAL_ERR: '"+a+"' is already exist");if(g.typeCheck("undefined",i)&&(i="event"),!g.typeCheck("function",e[i]))throw new Error("JUI_CRITICAL_ERR: Parents are the only function");if(d[i]!==!0)throw new Error("JUI_CRITICAL_ERR: UI function can not be inherited");var j=h(b),k=f.apply(null,j);g.inherit(k,e[i]),c[a]=e["core"!=i?"event":"core"].init({type:a,"class":k}),e[a]=k,d[a]=!0},createUIObject:function(a,b,c,d,e,f){var h=new a["class"],i=jui.defineOptions(a["class"],e||{});h.init.prototype=h,h.init.prototype.selector=b,h.init.prototype.root=d,h.init.prototype.options=i,h.init.prototype.tpl={},h.init.prototype.event=new Array,h.init.prototype.timestamp=(new Date).getTime(),h.init.prototype.index=c,h.init.prototype.module=a,g.typeCheck("function",f)&&f(h,i);for(var j in i.tpl){var k=i.tpl[j];g.typeCheck("string",k)&&""!=k&&(h.init.prototype.tpl[j]=g.template(k))}var l=new h.init;for(var m in i.event)l.on(m,i.event[m]);return d.jui=l,l},define:function(a,b,f,i){if(!(g.typeCheck("string",a)&&g.typeCheck("array",b)&&g.typeCheck("function",f)&&g.typeCheck(["string","undefined","null"],i)))throw new Error("JUI_CRITICAL_ERR: Invalid parameter type of the function");if(g.typeCheck("function",e[a]))throw new Error("JUI_CRITICAL_ERR: '"+a+"' is already exist");var j=h(b),k=f.apply(null,j);if(g.typeCheck("function",e[i])){if(d[i]!==!0)throw new Error("JUI_CRITICAL_ERR: UI function can not be inherited");g.inherit(k,e[i])}c[a]=k,e[a]=k,d[a]=!0},redefine:function(a,b,f,g,h){h||d[a]!==!0||(c[a]=null,e[a]=null,d[a]=!1),(!h||h&&d[a]!==!0)&&this.define(a,b,f,g)},defineOptions:function(a,b,c){function d(a,b){if(g.typeCheck("function",a)){if(g.typeCheck("function",a.setup)){var c=a.setup();for(var e in c)g.typeCheck("undefined",b[e])&&(b[e]=c[e])}d(a.parent,b)}return b}for(var e=d(a,{}),f=Object.keys(e),h=Object.keys(b),i=0;i<h.length;i++){var j=h[i];if(g.inArray(j,f)==-1&&g.inArray(j,c)==-1)throw new Error("JUI_CRITICAL_ERR: '"+j+"' is not an option")}return g.extend(b,e,!0),b},include:function(a){if(!g.typeCheck("string",a))throw new Error("JUI_CRITICAL_ERR: Invalid parameter type of the function");var b=c[a];if(g.typeCheck(["function","object"],b))return b;var d=i(a);return null==d?(console.log("JUI_WARNING_MSG: '"+a+"' is not loaded"),null):d},includeAll:function(){var a=[];for(var b in c)a.push(c[b]);return a},log:function(b){var c=a.open(b||f.logUrl,"JUIM","width=1024, height=768, toolbar=no, menubar=no, resizable=yes");return jui.debugAll(function(a,b){c.log(a,b)}),c},setup:function(a){return g.typeCheck("object",a)&&(f=g.extend(f,a)),f}},"object"==typeof module&&module.exports&&(module.exports=a.jui||c.jui)}(window,"undefined"!=typeof global?global:window),jui.define("util.dom",["util.base"],function(a){return{find:function(){var b=arguments;if(1==b.length){if(a.typeCheck("string",b[0]))return document.querySelectorAll(b[0])}else if(2==b.length&&a.typeCheck("object",b[0])&&a.typeCheck("string",b[1]))return b[0].querySelectorAll(b[1]);return[]},each:function(b,c){if(a.typeCheck("function",c)){var d=null;a.typeCheck("string",b)?d=document.querySelectorAll(b):a.typeCheck("array",b)&&(d=b),null!=d&&Array.prototype.forEach.call(d,function(a,b){c.apply(a,[b,a])})}},attr:function(b,c){if(a.typeCheck(["string","array"],b)){var d=document.querySelectorAll(b);if(a.typeCheck("object",c))for(var e=0;e<d.length;e++)for(var f in c)d[e].setAttribute(f,c[f]);else if(a.typeCheck("string",c)&&d.length>0)return d[0].getAttribute(c)}},remove:function(a){this.each(a,function(){this.parentNode.removeChild(this)})},offset:function(a){function b(a){return null!=a&&a==a.window}function c(a){return b(a)?a:9===a.nodeType&&(a.defaultView||a.parentWindow)}var d,e,f={top:0,left:0},g=a&&a.ownerDocument;if(g){d=g.documentElement;var h="undefined";return typeof a.getBoundingClientRect!==h&&(f=a.getBoundingClientRect()),e=c(g),{top:f.top+(e.pageYOffset||d.scrollTop)-(d.clientTop||0),left:f.left+(e.pageXOffset||d.scrollLeft)-(d.clientLeft||0)}}}}}),jui.define("util.sort",[],function(){var a=function(a,b){function c(b,c){var d=a[b];a[b]=a[c],a[c]=d}function d(b,d,f){var g=d,h=a[b];c(b,f);for(var i=d;i<f;i++)(e(a[i],h)||!e(h,a[i])&&i%2==1)&&(c(i,g),g++);return c(f,g),g}var e=null,a=b?a.slice(0):a;this.setCompare=function(a){e=a},this.run=function(b,c){var e=null;return"number"!=typeof b&&(b=0),"number"!=typeof c&&(c=a.length-1),b<c&&(e=b+Math.ceil(.5*(c-b)),newPivot=d(e,b,c),this.run(b,newPivot-1),this.run(newPivot+1,c)),a}};return a}),jui.define("util.keyparser",[],function(){var a=function(){this.isIndexDepth=function(a){return"string"==typeof a&&a.indexOf(".")!=-1},this.getIndexList=function(a){for(var b=[],c=(""+a).split("."),d=0;d<c.length;d++)b[d]=parseInt(c[d]);return b},this.changeIndex=function(a,b,c){for(var d=this.getIndexList(c).length,e=this.getIndexList(a),f=this.getIndexList(b),g=0;g<d;g++)e.shift();return f.concat(e).join(".")},this.getNextIndex=function(a){var b=this.getIndexList(a),c=b.pop()+1;return b.push(c),b.join(".")},this.getParentIndex=function(a){return this.isIndexDepth(a)?a.substr(0,a.lastIndexOf(".")):null}};return a}),jui.define("util.base64",[],function(){var a={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(b){var c,d,e,f,g,h,i,j="",k=0;for(b=a._utf8_encode(b);k<b.length;)c=b.charCodeAt(k++),d=b.charCodeAt(k++),e=b.charCodeAt(k++),f=c>>2,g=(3&c)<<4|d>>4,h=(15&d)<<2|e>>6,i=63&e,isNaN(d)?h=i=64:isNaN(e)&&(i=64),j=j+a._keyStr.charAt(f)+a._keyStr.charAt(g)+a._keyStr.charAt(h)+a._keyStr.charAt(i);return j},decode:function(b){var c,d,e,f,g,h,i,j="",k=0;for(b=b.replace(/[^A-Za-z0-9\+\/\=]/g,"");k<b.length;)f=a._keyStr.indexOf(b.charAt(k++)),g=a._keyStr.indexOf(b.charAt(k++)),h=a._keyStr.indexOf(b.charAt(k++)),i=a._keyStr.indexOf(b.charAt(k++)),c=f<<2|g>>4,d=(15&g)<<4|h>>2,e=(3&h)<<6|i,j+=String.fromCharCode(c),64!=h&&(j+=String.fromCharCode(d)),64!=i&&(j+=String.fromCharCode(e));return j=a._utf8_decode(j)},_utf8_encode:function(a){a=a.replace(/\r\n/g,"\n");for(var b=String.fromCharCode(239)+String.fromCharCode(187)+String.fromCharCode(191),c=0;c<a.length;c++){var d=a.charCodeAt(c);d<128?b+=String.fromCharCode(d):d>127&&d<2048?(b+=String.fromCharCode(d>>6|192),b+=String.fromCharCode(63&d|128)):(b+=String.fromCharCode(d>>12|224),b+=String.fromCharCode(d>>6&63|128),b+=String.fromCharCode(63&d|128))}return b},_utf8_decode:function(a){for(var b="",c=0,d=c1=c2=0;c<a.length;)d=a.charCodeAt(c),d<128?(b+=String.fromCharCode(d),c++):d>191&&d<224?(c2=a.charCodeAt(c+1),b+=String.fromCharCode((31&d)<<6|63&c2),c+=2):(c2=a.charCodeAt(c+1),c3=a.charCodeAt(c+2),b+=String.fromCharCode((15&d)<<12|(63&c2)<<6|63&c3),c+=3);return b}};return a}),jui.define("util.math",["util.base"],function(a){function b(a,b){for(var c=[],d=0,e=a.length;d<e;d++){for(var f=0,g=0,h=a[d].length;g<h;g++)f+=a[d][g]*b[g];c.push(f)}return c}function c(a,c){for(var d=[],e=[],f=0,g=c.length;f<g;f++)d[f]=[],e[f]=[];for(var f=0,g=c.length;f<g;f++)for(var h=0,i=c[f].length;h<i;h++)d[h].push(c[f][h]);for(var f=0,g=d.length;f<g;f++)for(var j=b(a,d[f]),h=0,i=j.length;h<i;h++)e[h].push(j[h]);return e}function d(a,b){var c=new Float32Array(4);return c[0]=a[0][0]*b[0]+a[0][1]*b[1]+a[0][2]*b[2]+a[0][3]*b[3],c[1]=a[1][0]*b[0]+a[1][1]*b[1]+a[1][2]*b[2]+a[1][3]*b[3],c[2]=a[2][0]*b[0]+a[2][1]*b[1]+a[2][2]*b[2]+a[2][3]*b[3],c[3]=a[3][0]*b[0]+a[3][1]*b[1]+a[3][2]*b[2]+a[3][3]*b[3],c}function e(a,b){var c=[new Float32Array(4),new Float32Array(4),new Float32Array(4),new Float32Array(4)],d=[new Float32Array([b[0][0],b[1][0],b[2][0],b[3][0]]),new Float32Array([b[0][1],b[1][1],b[2][1],b[3][1]]),new Float32Array([b[0][2],b[1][2],b[2][2],b[3][2]]),new Float32Array([b[0][3],b[1][3],b[2][3],b[3][3]])];return c[0][0]=a[0][0]*d[0][0]+a[0][1]*d[0][1]+a[0][2]*d[0][2]+a[0][3]*d[0][3],c[1][0]=a[1][0]*d[0][0]+a[1][1]*d[0][1]+a[1][2]*d[0][2]+a[1][3]*d[0][3],c[2][0]=a[2][0]*d[0][0]+a[2][1]*d[0][1]+a[2][2]*d[0][2]+a[2][3]*d[0][3],c[3][0]=a[3][0]*d[0][0]+a[3][1]*d[0][1]+a[3][2]*d[0][2]+a[3][3]*d[0][3],c[0][1]=a[0][0]*d[1][0]+a[0][1]*d[1][1]+a[0][2]*d[1][2]+a[0][3]*d[1][3],c[1][1]=a[1][0]*d[1][0]+a[1][1]*d[1][1]+a[1][2]*d[1][2]+a[1][3]*d[1][3],c[2][1]=a[2][0]*d[1][0]+a[2][1]*d[1][1]+a[2][2]*d[1][2]+a[2][3]*d[1][3],c[3][1]=a[3][0]*d[1][0]+a[3][1]*d[1][1]+a[3][2]*d[1][2]+a[3][3]*d[1][3],c[0][2]=a[0][0]*d[2][0]+a[0][1]*d[2][1]+a[0][2]*d[2][2]+a[0][3]*d[2][3],c[1][2]=a[1][0]*d[2][0]+a[1][1]*d[2][1]+a[1][2]*d[2][2]+a[1][3]*d[2][3],c[2][2]=a[2][0]*d[2][0]+a[2][1]*d[2][1]+a[2][2]*d[2][2]+a[2][3]*d[2][3],c[3][2]=a[3][0]*d[2][0]+a[3][1]*d[2][1]+a[3][2]*d[2][2]+a[3][3]*d[2][3],c[0][3]=a[0][0]*d[3][0]+a[0][1]*d[3][1]+a[0][2]*d[3][2]+a[0][3]*d[3][3],c[1][3]=a[1][0]*d[3][0]+a[1][1]*d[3][1]+a[1][2]*d[3][2]+a[1][3]*d[3][3],c[2][3]=a[2][0]*d[3][0]+a[2][1]*d[3][1]+a[2][2]*d[3][2]+a[2][3]*d[3][3],c[3][3]=a[3][0]*d[3][0]+a[3][1]*d[3][1]+a[3][2]*d[3][2]+a[3][3]*d[3][3],c}function f(a){var b=[new Float32Array(4),new Float32Array(4),new Float32Array(4),new Float32Array(4)],c=a[0][0],d=a[0][1],e=a[0][2],f=a[0][3],g=a[1][0],h=a[1][1],i=a[1][2],j=a[1][3],k=a[2][0],l=a[2][1],m=a[2][2],n=a[2][3],o=a[3][0],p=a[3][1],q=a[3][2],r=a[3][3];b[0][0]=i*n*p-j*m*p+j*l*q-h*n*q-i*l*r+h*m*r,b[0][1]=f*m*p-e*n*p-f*l*q+d*n*q+e*l*r-d*m*r,b[0][2]=e*j*p-f*i*p+f*h*q-d*j*q-e*h*r+d*i*r,b[0][3]=f*i*l-e*j*l-f*h*m+d*j*m+e*h*n-d*i*n,b[1][0]=j*m*o-i*n*o-j*k*q+g*n*q+i*k*r-g*m*r,b[1][1]=e*n*o-f*m*o+f*k*q-c*n*q-e*k*r+c*m*r,b[1][2]=f*i*o-e*j*o-f*g*q+c*j*q+e*g*r-c*i*r,b[1][3]=e*j*k-f*i*k+f*g*m-c*j*m-e*g*n+c*i*n,b[2][0]=h*n*o-j*l*o+j*k*p-g*n*p-h*k*r+g*l*r,b[2][1]=f*l*o-d*n*o-f*k*p+c*n*p+d*k*r-c*l*r,b[2][2]=d*j*o-f*h*o+f*g*p-c*j*p-d*g*r+c*h*r,b[2][3]=f*h*k-d*j*k-f*g*l+c*j*l+d*g*n-c*h*n,b[3][0]=i*l*o-h*m*o-i*k*p+g*m*p+h*k*q-g*l*q,b[3][1]=d*m*o-e*l*o+e*k*p-c*m*p-d*k*q+c*l*q,b[3][2]=e*h*o-d*i*o-e*g*p+c*i*p+d*g*q-c*h*q,b[3][4]=d*i*k-e*h*k+e*g*l-c*i*l-d*g*m+c*h*m;var s=1/(c*b[0][0]+g*b[0][1]+k*b[0][2]+o*b[0][3]);return 0===s?b=[new Float32Array([1,0,0,0]),new Float32Array([0,1,0,0]),new Float32Array([0,0,1,0]),new Float32Array([0,0,0,1])]:(b[0][0]*=s,b[0][1]*=s,b[0][2]*=s,b[0][3]*=s,b[1][0]*=s,b[1][1]*=s,b[1][2]*=s,b[1][3]*=s,b[2][0]*=s,b[2][1]*=s,b[2][2]*=s,b[2][3]*=s,b[3][0]*=s,b[3][1]*=s,b[3][2]*=s,b[3][4]*=s),b}var g={rotate:function(a,b,c){return{x:a*Math.cos(c)-b*Math.sin(c),y:a*Math.sin(c)+b*Math.cos(c)}},resize:function(a,b,c,d){var e=d/c;return c>=a&&e<=1?(c=a,d=b*e):d>=b&&(d=b,c=a/e),{width:c,height:d}},radian:function(a){return a*Math.PI/180},degree:function(a){return 180*a/Math.PI},angle:function(a,b,c,d){var e=c-a,f=d-b;return Math.atan2(f,e)},interpolateNumber:function(a,b){var c=b-a;return function(b){return a+c*b}},interpolateRound:function(a,b){var c=b-a;return function(b){return Math.round(a+c*b)}},getFixed:function(a,b){var c=(a+"").split("."),d=c.length<2?0:c[1].length,e=(b+"").split("."),f=e.length<2?0:e[1].length;return d>f?d:f},fixed:function(a){var b=this.getFixed(a,0),c=Math.pow(10,b),d=function(a){return Math.round(a*c)/c};return d.plus=function(a,b){return Math.round(a*c+b*c)/c},d.minus=function(a,b){return Math.round(a*c-b*c)/c},d.multi=function(a,b){return Math.round(a*c*(b*c))/(c*c)},d.div=function(a,b){var d=a*c/(b*c),e=Math.pow(10,this.getFixed(d,0));return Math.round(d*e)/e},d.remain=function(a,b){return Math.round(a*c%(b*c))/c},d},round:function(a,b){var c=Math.pow(10,b);return Math.round(a*c)/c},plus:function(a,b){var c=Math.pow(10,this.getFixed(a,b));return Math.round(a*c+b*c)/c},minus:function(a,b){var c=Math.pow(10,this.getFixed(a,b));return Math.round(a*c-b*c)/c},multi:function(a,b){var c=Math.pow(10,this.getFixed(a,b));return Math.round(a*c*(b*c))/(c*c)},div:function(a,b){var c=Math.pow(10,this.getFixed(a,b)),d=a*c/(b*c),e=Math.pow(10,this.getFixed(d,0));return Math.round(d*e)/e},remain:function(a,b){var c=Math.pow(10,this.getFixed(a,b));return Math.round(a*c%(b*c))/c},nice:function(a,b,c,d){function e(a,b){var c=Math.floor(Math.log(a)/Math.LN10),d=a/Math.pow(10,c);return b?d<1.5?niceFraction=1:d<3?niceFraction=2:d<7?niceFraction=5:niceFraction=10:d<=1?niceFraction=1:d<=2?niceFraction=2:d<=5?niceFraction=5:niceFraction=10,niceFraction*Math.pow(10,c)}function f(){m=d?e(g-h,!1):g-h,l=d?e(m/k,!0):m/k,i=d?Math.floor(h/l)*l:h,j=d?Math.floor(g/l)*l:g}if(d=d||!1,a>b)var g=a,h=b;else var h=a,g=b;var i,j,k=c,l=0,m=[];return f(),{min:i,max:j,range:m,spacing:l}},matrix:function(d,e){return a.typeCheck("array",e[0])?c(d,e):b(d,e)},matrix3d:function(a,b){return b[0]instanceof Array||b[0]instanceof Float32Array?e(a,b):d(a,b)},inverseMatrix3d:function(a){return f(a)},scaleValue:function(a,b,c,d,e){function f(){var d=c-b,e=a-b,f=e/d;return f}b=b==c?0:b;var g=e-d,h=g*f();return h+d}};return g},null,!0),jui.define("util.template",[],function(){var a=function(a,b,c){var d={},e={},f=Array.prototype,g=f.slice,h=f.forEach,i={"\\":"\\","'":"'",r:"\r",n:"\n",t:"\t",u2028:"\u2028",u2029:"\u2029"};for(var j in i)i[i[j]]=j;var k=/\\|'|\r|\n|\t|\u2028|\u2029/g,l=/\\(\\|'|r|n|t|u2028|u2029)/g,m=/.^/,n=function(a){return a.replace(l,function(a,b){return i[b]})},o=d.each=d.forEach=function(a,b,c){if(null!=a)if(h&&a.forEach===h)a.forEach(b,c);else if(a.length===+a.length){for(var f=0,g=a.length;f<g;f++)if(f in a&&b.call(c,a[f],f,a)===e)return}else for(var i in a)if(d.has(a,i)&&b.call(c,a[i],i,a)===e)return};return d.has=function(a,b){return hasOwnProperty.call(a,b)},d.defaults=function(a){return o(g.call(arguments,1),function(b){for(var c in b)null==a[c]&&(a[c]=b[c])}),a},d.template=function(a,b,c){c=d.defaults(c||{});var e="__p+='"+a.replace(k,function(a){return"\\"+i[a]}).replace(c.escape||m,function(a,b){return"'+\n_.escape("+n(b)+")+\n'"}).replace(c.interpolate||m,function(a,b){return"'+\n("+n(b)+")+\n'"}).replace(c.evaluate||m,function(a,b){return"';\n"+n(b)+"\n;__p+='"})+"';\n";c.variable||(e="with(obj||{}){\n"+e+"}\n"),e="var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};\n"+e+"return __p;\n";var f=new Function(c.variable||"obj","_",e);if(b)return f(b,d);var g=function(a){return f.call(this,a,d)};return g.source="function("+(c.variable||"obj")+"){\n"+e+"}",g},d.template(a,b,c)};return a}),jui.define("util.color",["util.base","util.math"],function(a,b){function c(a){var b=0,c=1,d=0,e=10,f=6;if(a){for(var g=0;g<a.length&&!(g>f);g++)b+=c*(a.charCodeAt(g)%e),d+=c*(e-1),c*=.7;d>0&&(b/=d)}return b}var d={regex:/(linear|radial)\((.*)\)(.*)/i,format:function(a,b){if("hex"==b){var c=a.r.toString(16);a.r<16&&(c="0"+c);var d=a.g.toString(16);a.g<16&&(d="0"+d);var e=a.b.toString(16);return a.b<16&&(e="0"+e),"#"+[c,d,e].join("").toUpperCase()}return"rgb"==b?"undefined"==typeof a.a?"rgb("+[a.r,a.g,a.b].join(",")+")":"rgba("+[a.r,a.g,a.b,a.a].join(",")+")":a},scale:function(){function a(a,b){var f={r:parseInt(c.r+(e.r-c.r)*a,10),g:parseInt(c.g+(e.g-c.g)*a,10),b:parseInt(c.b+(e.b-c.b)*a,10)};return d.format(f,b)}var c,e;return a.domain=function(b,f){return c=d.rgb(b),e=d.rgb(f),a},a.ticks=function(c){for(var d=1/c,e=0,f=[];e<=1;){var g=a(e,"hex");f.push(g),e=b.plus(e,d)}return f},a},map:function(a,b){var c=[];b=b||5;for(var e=d.scale(),f=0,g=a.length-1;f<g;f++)if(0==f)c=e.domain(a[f],a[f+1]).ticks(b);else{var h=e.domain(a[f],a[f+1]).ticks(b);h.shift(),c=c.concat(h)}return c},rgb:function(b){if("string"==typeof b){if(b.indexOf("rgb(")>-1){for(var c=b.replace("rgb(","").replace(")","").split(","),d=0,e=c.length;d<e;d++)c[d]=parseInt(a.trim(c[d]),10);return{r:c[0],g:c[1],b:c[2],a:1}}if(b.indexOf("rgba(")>-1){for(var c=b.replace("rgba(","").replace(")","").split(","),d=0,e=c.length;d<e;d++)e-1==d?c[d]=parseFloat(a.trim(c[d])):c[d]=parseInt(a.trim(c[d]),10);return{r:c[0],g:c[1],b:c[2],a:c[3]}}if(0==b.indexOf("#")){b=b.replace("#","");var c=[];if(3==b.length)for(var d=0,e=b.length;d<e;d++){var f=b.substr(d,1);c.push(parseInt(f+f,16))}else for(var d=0,e=b.length;d<e;d+=2)c.push(parseInt(b.substr(d,2),16));return{r:c[0],g:c[1],b:c[2],a:1}}}return b},HSVtoRGB:function(a,b,c){360==a&&(a=0);var d=b*c,e=d*(1-Math.abs(a/60%2-1)),f=c-d,g=[];return 0<=a&&a<60?g=[d,e,0]:60<=a&&a<120?g=[e,d,0]:120<=a&&a<180?g=[0,d,e]:180<=a&&a<240?g=[0,e,d]:240<=a&&a<300?g=[e,0,d]:300<=a&&a<360&&(g=[d,0,e]),{r:Math.ceil(255*(g[0]+f)),g:Math.ceil(255*(g[1]+f)),b:Math.ceil(255*(g[2]+f))}},RGBtoHSV:function(a,b,c){var d=a/255,e=b/255,f=c/255,g=Math.max(d,e,f),h=Math.min(d,e,f),i=g-h,j=0;0==i?j=0:g==d?j=60*((e-f)/i%6):g==e?j=60*((f-d)/i+2):g==f&&(j=60*((d-e)/i+4)),j<0&&(j=360+j);var k=0;k=0==g?0:i/g;var l=g;return{h:j,s:k,v:l}},trim:function(a){return(a||"").replace(/^\s+|\s+$/g,"")},lighten:function(a,b){a=a.replace(/[^0-9a-f]/gi,""),b=b||0;var c,d,e=[];for(d=0;d<6;d+=2)c=parseInt(a.substr(d,2),16),c=Math.round(Math.min(Math.max(0,c+c*b),255)).toString(16),e.push(("00"+c).substr(c.length));return"#"+e.join("")},darken:function(a,b){return this.lighten(a,-b)},parse:function(a){return this.parseGradient(a)},parseGradient:function(a){var b=a.match(this.regex);if(!b)return a;var c=this.trim(b[1]),d=this.parseAttr(c,this.trim(b[2])),e=this.parseStop(this.trim(b[3])),f={type:c+"Gradient",attr:d,children:e};return f},parseStop:function(a){for(var b=a.split(","),c=[],d=0,e=b.length;d<e;d++){var a=b[d],f=a.split(" ");0!=f.length&&(1==f.length?c.push({type:"stop",attr:{"stop-color":f[0]}}):2==f.length?c.push({type:"stop",attr:{offset:f[0],"stop-color":f[1]}}):3==f.length&&c.push({type:"stop",attr:{offset:f[0],"stop-color":f[1],"stop-opacity":f[2]}}))}for(var g=-1,h=-1,d=0,e=c.length;d<e;d++){var a=c[d];if(0==d?a.offset||(a.offset=0):d==e-1&&(a.offset||(a.offset=1)),g==-1&&"undefined"==typeof a.offset)g=d;else if(h==-1&&"undefined"==typeof a.offset){h=d;for(var i=h-g,j=c[h].offset.indexOf("%")>-1?parseFloat(c[h].offset)/100:c[h].offset,k=c[g].offset.indexOf("%")>-1?parseFloat(c[g].offset)/100:c[g].offset,l=j-k,m=l/i,n=k+m,o=g+1;o<h;o++)c[o].offset=n,n+=m;g=h,h=-1}}return c},parseAttr:function(a,b){if("linear"!=a){for(var c=b.split(","),d=0,e=c.length;d<e;d++)c[d].indexOf("%")==-1&&(c[d]=parseFloat(c[d]));return{cx:c[0],cy:c[1],r:c[2],fx:c[3],fy:c[4]}}switch(b){case"":case"left":return{x1:0,y1:0,x2:1,y2:0,direction:b||"left"};case"right":return{x1:1,y1:0,x2:0,y2:0,direction:b};case"top":return{x1:0,y1:0,x2:0,y2:1,direction:b};case"bottom":return{x1:0,y1:1,x2:0,y2:0,direction:b};case"top left":return{x1:0,y1:0,x2:1,y2:1,direction:b};case"top right":return{x1:1,y1:0,x2:0,y2:1,direction:b};case"bottom left":return{x1:0,y1:1,x2:1,y2:0,direction:b};case"bottom right":return{x1:1,y1:1,x2:0,y2:0,direction:b};default:for(var c=b.split(","),d=0,e=c.length;d<e;d++)c[d].indexOf("%")==-1&&(c[d]=parseFloat(c[d]));return{x1:c[0],y1:c[1],x2:c[2],y2:c[3]}}},colorHash:function(a,b){var d=0;return a&&(a=a.replace(/.*`/,""),a=a.replace(/\(.*/,""),d=c(a)),"function"==typeof b?b(d):{r:200+Math.round(55*d),g:0+Math.round(230*(1-d)),b:0+Math.round(55*(1-d))}}};return d.map.parula=function(a){return d.map(["#352a87","#0f5cdd","#00b5a6","#ffc337","#fdff00"],a)},d.map.jet=function(a){return d.map(["#00008f","#0020ff","#00ffff","#51ff77","#fdff00","#ff0000","#800000"],a);
},d.map.hsv=function(a){return d.map(["#ff0000","#ffff00","#00ff00","#00ffff","#0000ff","#ff00ff","#ff0000"],a)},d.map.hot=function(a){return d.map(["#0b0000","#ff0000","#ffff00","#ffffff"],a)},d.map.pink=function(a){return d.map(["#1e0000","#bd7b7b","#e7e5b2","#ffffff"],a)},d.map.bone=function(a){return d.map(["#000000","#4a4a68","#a6c6c6","#ffffff"],a)},d.map.copper=function(a){return d.map(["#000000","#3d2618","#9d623e","#ffa167","#ffc77f"],a)},d}),jui.define("manager",["util.base"],function(a){var b=new function(){var c=[],d=[];this.add=function(a){c.push(a)},this.emit=function(a,b,d){for(var e=[],f=0;f<c.length;f++){var g=c[f];a!=g.selector&&a!=g.type||e.push(g)}for(var f=0;f<e.length;f++)for(var g=e[f],h=0;h<g.length;h++)g[h].emit(b,d)},this.get=function(b){if(a.typeCheck("integer",b))return c[b];if(a.typeCheck("string",b)){for(var d=0;d<c.length;d++){var e=c[d];if(b==e.selector)return 1==e.length?e[0]:e}for(var f=[],d=0;d<c.length;d++){var e=c[d];b==e.type&&f.push(e)}return f}},this.getAll=function(){return c},this.remove=function(b){if(a.typeCheck("integer",b))return c.splice(b,1)[0]},this.shift=function(){return c.shift()},this.pop=function(){return c.pop()},this.size=function(){return c.length},this.debug=function(b,c,d,e){if(b.__proto__){var f=["emit","on","addEvent","addValid","callBefore","callAfter","callDelay","setTpl","setVo","setOption"];for(var g in b){var h=b[g];"function"==typeof h&&a.inArray(g,f)==-1&&!function(a,d,f,g){b.__proto__[a]=function(){var b=Date.now(),h=d.apply(this,arguments),i=Date.now();return"function"==typeof e?e({type:jui.get(c).type,name:a,c_index:f,u_index:g,time:i-b},arguments):(isNaN(f)||isNaN(g)?console.log("NAME("+a+"), TIME("+(i-b)+"ms), ARGUMENTS..."):console.log("TYPE("+jui.get(c).type+"), NAME("+a+"), INDEX("+f+":"+g+"), TIME("+(i-b)+"ms), ARGUMENTS..."),console.log(arguments),console.log("")),h}}(g,h,c,d)}}},this.debugAll=function(a){for(var b=0;b<c.length;b++)for(var d=c[b],e=0;e<d.length;e++)this.debug(d[e],b,e,a)},this.addClass=function(a){d.push(a)},this.getClass=function(b){if(a.typeCheck("integer",b))return d[b];if(a.typeCheck("string",b))for(var c=0;c<d.length;c++)if(b==d[c].type)return d[c];return null},this.getClassAll=function(){return d},this.create=function(c,d,e){var f=b.getClass(c);if(a.typeCheck("null",f))throw new Error("JUI_CRITICAL_ERR: '"+c+"' does not exist");return f["class"](d,e)}};return b}),jui.define("collection",[],function(){var a=function(a,b,c,d){this.type=a,this.selector=b,this.options=c,this.destroy=function(){for(var a=0;a<d.length;a++)d[a].destroy()};for(var e=0;e<d.length;e++)this.push(d[e])};return a.prototype=Object.create(Array.prototype),a}),jui.define("core",["util.base","util.dom","manager","collection"],function(a,b,c,d){var e=function(){this.emit=function(b,c){if(a.typeCheck("string",b)){for(var d,e=0;e<this.event.length;e++){var f=this.event[e];if(f.type==b.toLowerCase()){var g=a.typeCheck("array",c)?c:[c];d=f.callback.apply(this,g)}}return d}},this.on=function(b,c){a.typeCheck("string",b)&&a.typeCheck("function",c)&&this.event.push({type:b.toLowerCase(),callback:c,unique:!1})},this.off=function(b){for(var c=[],d=0;d<this.event.length;d++){var e=this.event[d];(a.typeCheck("function",b)&&e.callback!=b||a.typeCheck("string",b)&&e.type!=b.toLowerCase())&&c.push(e)}this.event=c},this.addValid=function(b,c){if(this.__proto__){var d=this.__proto__[b];this.__proto__[b]=function(){for(var e=arguments,f=0;f<e.length;f++)if(!a.typeCheck(c[f],e[f]))throw new Error("JUI_CRITICAL_ERR: the "+f+"th parameter is not a "+c[f]+" ("+b+")");return d.apply(this,e)}}},this.callBefore=function(b,c){if(this.__proto__){var d=this.__proto__[b];this.__proto__[b]=function(){var b=arguments;return a.typeCheck("function",c)?c.apply(this,b)!==!1?d.apply(this,b):void 0:d.apply(this,b)}}},this.callAfter=function(b,c){if(this.__proto__){var d=this.__proto__[b];this.__proto__[b]=function(){var b=arguments,e=d.apply(this,b);return a.typeCheck("function",c)&&e!==!1&&c.apply(this,b),e}}},this.callDelay=function(b,c){function d(b,d){var f=e.apply(b,d);a.typeCheck("function",c.after)&&f!==!1&&c.after.apply(b,d)}if(this.__proto__){var e=this.__proto__[b],f=isNaN(c.delay)?0:c.delay;this.__proto__[b]=function(){var b=this,e=arguments;a.typeCheck("function",c.before)&&c.before.apply(b,e),f>0?setTimeout(function(){d(b,e)},f):d(b,e)}}},this.setTpl=function(b,c){this.tpl[b]=a.template(c)},this.setOption=function(b,c){if(a.typeCheck("object",b))for(var d in b)this.options[d]=b[d];else this.options[b]=c},this.destroy=function(){if(this.__proto__)for(var a in this.__proto__)delete this.__proto__[a]}};return e.build=function(e){return function(f,g){var h=[],i=[];a.typeCheck("string",f)?i=b.find(f):a.typeCheck("object",f)?i.push(f):i.push(document.createElement("div"));for(var j=0,k=i.length;j<k;j++)h[j]=jui.createUIObject(e,f,j,i[j],g);return c.add(new d(e.type,f,g,h)),0==h.length?null:1==h.length?h[0]:h}},e.init=function(a){var b=null;return"object"==typeof a&&(b=e.build(a),c.addClass({type:a.type,"class":b})),b},e.setup=function(){return{tpl:{},event:{}}},window.jui="object"==typeof jui?a.extend(jui,c,!0):c,e}),jui.define("event",["jquery","util.base","manager","collection"],function(a,b,c,d){var e=function(){function c(b){for(var c=["webkit","moz","MS","o",""],d=0;d<c.length;d++){var e=b.type;c[d]||(e=e.toLowerCase()),a(b.target).on(c[d]+e,b.callback)}g.push(b)}function d(b){b.callback&&!b.children?a(b.target).on(b.type,b.callback):a(b.target).on(b.type,b.children,b.callback),g.push(b)}function e(b){b.callback&&!b.children?a(b.target).on(f(b.type),b.callback):a(b.target).on(f(b.type),b.children,b.callback),g.push(b)}function f(a){return{click:"touchstart",dblclick:"touchend",mousedown:"touchstart",mousemove:"touchmove",mouseup:"touchend"}[a]}var g=[];this.add=function(f){var g={target:f[0],type:f[1]};b.typeCheck("function",f[2])?g=a.extend(g,{callback:f[2]}):b.typeCheck("string",f[2])&&(g=a.extend(g,{children:f[2],callback:f[3]}));for(var h=b.typeCheck("array",g.type)?g.type:[g.type],i=0;i<h.length;i++)g.type=h[i],g.type.toLowerCase().indexOf("animation")!=-1?c(g):("body"!=g.target&&g.target!=window&&g.target!=document&&a(g.target).off(g.type),b.isTouch?e(g):d(g))},this.trigger=function(c,d){a(c).trigger(b.isTouch?f(d):d)},this.get=function(a){return g[a]},this.getAll=function(){return g},this.size=function(){return g.length}},f=function(){var b=null;this.find=function(b){return a(this.root).find(b)},this.addEvent=function(){this.listen.add(arguments)},this.addTrigger=function(a,b){this.listen.trigger(a,b)},this.setVo=function(){this.options.vo&&(null!=b&&b.reload(),b=a(this.selector).jbinder(),this.bind=b)},this.destroy=function(){for(var b=0;b<this.listen.size();b++){var c=this.listen.get(b);a(c.target).off(c.type)}if(this.__proto__)for(var d in this.__proto__)delete this.__proto__[d]}};return f.build=function(b){return function(f,g){var h=[],i=a(f||"<div />");return i.each(function(c){h[c]=jui.createUIObject(b,i.selector,c,this,g,function(b,c){b.init.prototype.listen=new e,a("script").each(function(b){if(f==a(this).data("jui")||f==a(this).data("vo")||f instanceof HTMLElement){var d=a(this).data("tpl");if(""==d)throw new Error("JUI_CRITICAL_ERR: 'data-tpl' property is required");c.tpl[d]=a(this).html()}})})}),c.add(new d(b.type,f,g,h)),0==h.length?null:1==h.length?h[0]:h}},f.init=function(a){var b=null;return"object"==typeof a&&(b=f.build(a),c.addClass({type:a.type,"class":b})),b},f.setup=function(){return{vo:null}},f},"core");
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(2)))

/***/ }),
/* 2 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

jui.redefine("util.time", [ "util.base" ], function(_) {

	/**
	 * @class util.time
	 *
	 * Time Utility
	 *
	 * @singleton
	 * 
	 */
	var self = {

		//constant
		MILLISECOND : 1000,
		MINUTE : 1000 * 60,
		HOUR : 1000 * 60 * 60,
		DAY : 1000 * 60 * 60 * 24,

		// unit
		years : "years",
		months : "months",
		days : "days",
		hours : "hours",
		minutes : "minutes",
		seconds : "seconds",
		milliseconds : "milliseconds",
		weeks : "weeks",

		/**
		 * @method diff
		 *
		 * caculate time difference from a to b
		 *
		 * @param type
		 * @param a
		 * @param b
		 * @returns {number}
		 */
		diff : function (type, a, b) {
			var milliseconds =  (+a) - (+b);

			if (type == 'seconds') {
				return Math.abs(Math.floor(milliseconds / self.MILLISECOND));
			} else if (type == 'minutes') {
				return Math.abs(Math.floor(milliseconds / self.MINUTE));
			} else if (type == 'hours') {
				return Math.abs(Math.floor(milliseconds / self.HOUR));
			} else if (type == 'days') {
				return Math.abs(Math.floor(milliseconds / self.DAY));
			}

			return milliseconds;
		},

		/**
		 * @method add
		 *
		 * add time
		 *
		 * 		var date = new Date();
		 * 		time.add(date, time.hours, 1); 		// add an hour on now
		 * 		time.add(date, time.hours, 1, time.minutes, 2); 		// add an hour and 2 minutes on now
		 * 
 		 * @param {Object} date
		 */
		add : function(date) {

			if (arguments.length <= 2) {
				return date;
			}

			if (arguments.length > 2) {
				var d = new Date(+date);

				for (var i = 1; i < arguments.length; i += 2) {

					var split = typeof arguments[i] == 'string' ? this[arguments[i]] : arguments[i];
					var time = arguments[i + 1];

					if (this.years == split) {
						d.setFullYear(d.getFullYear() + time);
					} else if (this.months == split) {
						d.setMonth(d.getMonth() + time);
					} else if (this.days == split) {
						d.setDate(d.getDate() + time);
					} else if (this.hours == split) {
						d.setHours(d.getHours() + time);
					} else if (this.minutes == split) {
						d.setMinutes(d.getMinutes() + time);
					} else if (this.seconds == split) {
						d.setSeconds(d.getSeconds() + time);
					} else if (this.milliseconds == split) {
						d.setMilliseconds(d.getMilliseconds() + time);
					} else if (this.weeks == split) {
						d.setDate(d.getDate() + time * 7);
					}
				}

				return d;
			}
		},
		
		/**
		 * @method format
		 *
		 * {util.dateFormat} 's alias
		 * 
		 * @param {Object} date
		 * @param {Object} format
		 * @param {Object} utc
		 */
		format: function(date, format, utc) {
			return _.dateFormat(date, format, utc);
        }		
	}

	return self;
}, null, true);


/***/ }),
/* 4 */
/***/ (function(module, exports) {

jui.redefine("util.transform", [ "util.math" ], function(math) {
    var Transform = function(points) {
        function calculate(m) {
            for(var i = 0, count = points.length; i < count; i++) {
                points[i] = math.matrix(m, points[i]);
            }

            return points;
        }

        // 매트릭스 맵
        this.matrix = function() {
            var a = arguments,
                type = a[0];

            if(type == "move") {
                return [
                    new Float32Array([1, 0, a[1]]),
                    new Float32Array([0, 1, a[2]]),
                    new Float32Array([0, 0, 1])
                ];
            } else if(type == "scale") {
                return [
                    new Float32Array([ a[1], 0, 0 ]),
                    new Float32Array([ 0, a[2], 0 ]),
                    new Float32Array([ 0, 0, 1 ])
                ];
            } else if(type == "rotate") {
                return [
                    new Float32Array([ Math.cos(math.radian(a[1])), -Math.sin(math.radian(a[1])), 0 ]),
                    new Float32Array([ Math.sin(math.radian(a[1])), Math.cos(math.radian(a[1])), 0 ]),
                    new Float32Array([ 0, 0, 1 ])
                ];
            } else if(type == "move3d") {
                return [
                    new Float32Array([ 1, 0, 0, a[1] ]),
                    new Float32Array([ 0, 1, 0, a[2] ]),
                    new Float32Array([ 0, 0, 1, a[3] ]),
                    new Float32Array([ 0, 0, 0, 1 ])
                ];
            } else if(type == "scale3d") {
                return [
                    new Float32Array([ a[1], 0, 0, 0 ]),
                    new Float32Array([ 0, a[2], 0, 0 ]),
                    new Float32Array([ 0, 0, a[3], 0 ]),
                    new Float32Array([ 0, 0, 0, 1 ])
                ];
            } else if(type == "rotate3dz") {
                return [
                    new Float32Array([ Math.cos(math.radian(a[1])), -Math.sin(math.radian(a[1])), 0, 0 ]),
                    new Float32Array([ Math.sin(math.radian(a[1])), Math.cos(math.radian(a[1])), 0, 0 ]),
                    new Float32Array([ 0, 0, 1, 0 ]),
                    new Float32Array([ 0, 0, 0, 1 ])
                ];
            } else if(type == "rotate3dx") {
                return [
                    new Float32Array([ 1, 0, 0, 0 ]),
                    new Float32Array([ 0, Math.cos(math.radian(a[1])), -Math.sin(math.radian(a[1])), 0 ]),
                    new Float32Array([ 0, Math.sin(math.radian(a[1])), Math.cos(math.radian(a[1])), 0 ]),
                    new Float32Array([ 0, 0, 0, 1 ])
                ];
            } else if(type == "rotate3dy") {
                return [
                    new Float32Array([ Math.cos(math.radian(a[1])), 0, Math.sin(math.radian(a[1])), 0 ]),
                    new Float32Array([ 0, 1, 0, 0 ]),
                    new Float32Array([ -Math.sin(math.radian(a[1])), 0, Math.cos(math.radian(a[1])), 0 ]),
                    new Float32Array([ 0, 0, 0, 1 ])
                ];
            }
        }

        // 2차원 이동
        this.move = function(dx, dy) {
            return calculate(this.matrix("move", dx, dy));
        }

        // 3차원 이동
        this.move3d = function(dx, dy, dz) {
            return calculate(this.matrix("move3d", dx, dy, dz));
        }

        // 2차원 스케일
        this.scale = function(sx, sy) {
            return calculate(this.matrix("scale", sx, sy));
        }

        // 3차원 스케일
        this.scale3d = function(sx, sy, sz) {
            return calculate(this.matrix("scale3d", sx, sy, sz));
        }

        // 2차원 회전
        this.rotate = function(angle) {
            return calculate(this.matrix("rotate", angle));
        }

        // Z축 중심 3차원 회전 - 롤(ROLL)
        this.rotate3dz = function(angle) {
            return calculate(this.matrix("rotate3dz", angle));
        }

        // X축 중심 3차원 회전 - 롤(PITCH)
        this.rotate3dx = function(angle) {
            return calculate(this.matrix("rotate3dx", angle));
        }

        // Y축 중심 3차원 회전 - 요(YAW)
        this.rotate3dy = function(angle) {
            return calculate(this.matrix("rotate3dy", angle));
        }

        // 임의의 행렬 처리
        this.custom = function(m) {
            return calculate(m);
        }

        // 행렬의 병합
        this.merge = function() {
            var a = arguments,
                m = this.matrix.apply(this, a[0]);

            for(var i = 1; i < a.length; i++) {
                m = math.matrix(m, this.matrix.apply(this, a[i]));
            }

            return calculate(m);
        }

        // 행렬의 병합 (콜백 형태)
        this.merge2 = function(callback) {
            for(var i = 0, count = points.length; i < count; i++) {
                var a = callback.apply(null, points[i]),
                    m = this.matrix.apply(this, a[0]);

                for(var j = 1; j < a.length; j++) {
                    m = math.matrix(m, this.matrix.apply(this, a[j]));
                }

                points[i] = math.matrix(m, points[i]);
            }
        }
    }

    return Transform;
}, null, true);

/***/ }),
/* 5 */
/***/ (function(module, exports) {

jui.define("util.svg.element", [], function() {

    /**
     * @class util.svg.element
     * A model class wraps the SVG element
     *
     * @alias Element
     */
    var Element = function() {
        var events = [];

        this.create = function(type, attr) {
            // 퍼블릭 프로퍼티
            this.element = document.createElementNS("http://www.w3.org/2000/svg", type);
            this.children = [];
            this.parent = null;
            this.styles = {};
            this.attributes = {};
            this.order = 0;

            // 기본 속성 설정
            this.attr(attr);
        };

        this.each = function(callback) {
            if(typeof(callback) != "function") return;

            for(var i = 0, len = this.children.length; i < len; i++) {
                var self = this.children[i];
                callback.apply(self, [ i, self ]);
            }

            return this.children;
        };

        this.get = function(index) {
            if(this.children[index]) {
                return this.children[index];
            }

            return null;
        }

        this.index = function(obj) {
            for(var i = 0; i < this.children.length; i++) {
                if(obj == this.children[i]) {
                    return i;
                }
            }

            return -1;
        }

        this.append = function(elem) {
            if(elem instanceof Element) {
                if (elem.parent) {
                    elem.remove();
                }

                this.children.push(elem);
                elem.parent = this;
            }

            return this;
        }

        this.prepend = function(elem) {
            return this.insert(0, elem);
        }

        this.insert = function(index, elem) {
            if(elem.parent) {
                elem.remove();
            }

            this.children.splice(index, 0, elem);
            elem.parent = this;

            return this;
        }

        this.remove = function() {
            var index = 0,
                nChild = [],
                pChild = this.parent.children;

            for(var i = 0; i < pChild.length; i++) {
                if (pChild[i] == this) {
                    index = i;
                    break;
                }

                nChild.push(pChild[i]);
            }

            this.parent.children = nChild;

            return this;
        }

        this.attr = function(attr) {
            if(typeof attr == "undefined" || !attr) return;

            if(typeof attr == "string") {
                return this.attributes[attr] || this.element.getAttribute(attr);
            }

            for(var k in attr) {
                this.attributes[k] = attr[k];

                if(k.indexOf("xlink:") != -1) {
                    this.element.setAttributeNS("http://www.w3.org/1999/xlink", k, attr[k]);
                } else {
                    this.element.setAttribute(k, attr[k]);
                }
            }

            return this;
        }

        this.css = function(css) {
            var list = [];

            for(var k in css) {
                this.styles[k] = css[k];
            }

            for(var k in css) {
                list.push(k + ":" + css[k]);
            }

            this.attr({ style: list.join(";") });

            return this;
        }

        this.html = function(html) { // @deprecated
            this.element.innerHTML = html;

            return this;
        }

        this.text = function(text) {
            var children = this.element.childNodes;

            for(var i = 0; i < children.length; i++) {
                this.element.removeChild(children[i]);
            }

            this.element.appendChild(document.createTextNode(text));
            return this;
        }

        this.on = function(type, handler) {
            var callback = function(e) {
                if(typeof(handler) == "function") {
                    handler.call(this, e);
                }
            }

            this.element.addEventListener(type, callback, false);
            events.push({ type: type, callback: callback });

            return this;
        }

        this.off = function(type) {
            if(!type) {
                for (var i = 0, len = events.length; i < len; i++) {
                    var e = events.shift();

                    this.element.removeEventListener(e.type, e.callback, false);
                }
            } else {
                var newEvents = [];

                for (var i = 0, len = events.length; i < len; i++) {
                    var e = events[i];

                    if (e.type != type) {
                        newEvents.push(e);
                    } else {
                        this.element.removeEventListener(e.type, e.callback, false);
                    }
                }

                events = newEvents;
            }

            return this;
        }

        this.hover = function(overHandler, outHandler) {
            var callback1 = function(e) {
                if(typeof(overHandler) == "function") {
                    overHandler.call(this, e);
                }
            }

            var callback2 = function(e) {
                if(typeof(outHandler) == "function") {
                    outHandler.call(this, e);
                }
            }

            this.element.addEventListener("mouseover", callback1, false);
            this.element.addEventListener("mouseout", callback2, false);
            events.push({ type: "mouseover", callback: callback1 });
            events.push({ type: "mouseout", callback: callback2 });

            return this;
        }

        this.size = function() {
            var size = { width: 0, height: 0 },
                rect = this.element.getBoundingClientRect();

            if(!rect || (rect.width == 0 && rect.height == 0)) {
                var height_list = [ "height", "paddingTop", "paddingBottom", "borderTopWidth", "borderBottomWidth" ],
                    width_list = [ "width", "paddingLeft", "paddingRight", "borderLeftWidth", "borderRightWidth" ];

                var computedStyle = window.getComputedStyle(this.element);

                for (var i = 0; i < height_list.length; i++) {
                    size.height += parseFloat(computedStyle[height_list[i]]);
                }

                for (var i = 0; i < width_list.length; i++) {
                    size.width += parseFloat(computedStyle[width_list[i]]);
                }

                size.width = size.width || this.element.getAttribute('width');
                size.height = size.height || this.element.getAttribute('height');
            } else {
                size.width = rect.width;
                size.height = rect.height;
            }

            if(isNaN(size.width)) size.width = 0;
            if(isNaN(size.height)) size.height = 0;

            return size;
        }

        this.is = function(moduleId) {
            return this instanceof jui.include(moduleId);
        }
    }

    return Element;
});

/***/ }),
/* 6 */
/***/ (function(module, exports) {

jui.define("util.svg.element.transform", [ "util.base" ], function(_) { // polygon, polyline

    /**
     * @class util.svg.element.transform
     *
     * @alias TransElement
     * @extends util.svg.element
     * @requires util.base
     */
    var TransElement = function() {
        var orders = {
            translate: null,
            scale: null,
            rotate: null,
            skew: null,
            matrix: null
        };

        function applyOrders(self) {
            var orderArr = [];

            for(var key in orders) {
                if(orders[key]) orderArr.push(orders[key]);
            }

            self.attr({ transform: orderArr.join(" ") });
        }

        function getStringArgs(args) {
            var result = [];

            for(var i = 0; i < args.length; i++) {
                result.push(args[i]);
            }

            return result.join(",");
        }

        this.translate = function() {
            orders["translate"] = "translate(" + getStringArgs(arguments) + ")";
            applyOrders(this);

            return this;
        }

        this.rotate = function(angle, x, y) {
            if(arguments.length == 1) {
                var str = angle;
            } else if(arguments.length == 3) {
                var str = angle + " " + x + "," + y;
            }

            orders["rotate"] = "rotate(" + str + ")";
            applyOrders(this);

            return this;
        }

        this.scale = function() {
            orders["scale"] = "scale(" + getStringArgs(arguments) + ")";
            applyOrders(this);

            return this;
        }

        this.skew = function() {
            orders["skew"] = "skew(" + getStringArgs(arguments) + ")";
            applyOrders(this);

            return this;
        }

        this.matrix = function() {
            orders["matrix"] = "matrix(" + getStringArgs(arguments) + ")";
            applyOrders(this);

            return this;
        }

        this.data = function(type) {
            var text = this.attr("transform"),
                regex = {
                    translate: /[^translate()]+/g,
                    rotate: /[^rotate()]+/g,
                    scale: /[^scale()]+/g,
                    skew: /[^skew()]+/g,
                    matrix: /[^matrix()]+/g
                };

            if(_.typeCheck("string", text)) {
                return text.match(regex[type])[0];
            }

            return null;
        }
    }

    return TransElement;
}, "util.svg.element");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

jui.define("util.svg.element.path", [ "util.base" ], function(_) {

    /**
     * @class util.svg.element.path
     *
     * @alias PathElement
     * @extends util.svg.transform
     * @requires util.base
     */
    var PathElement = function() {
        var orders = [];

        this.moveTo = function(x, y, type) {
            orders.push( (type || "m") + x + "," + y );
            return this;
        }
        this.MoveTo = function(x, y) {
            return this.moveTo(x, y, "M");
        }

        this.lineTo = function(x, y, type) {
            orders.push( (type || "l") + x + "," + y );
            return this;
        }
        this.LineTo = function(x, y) {
            return this.lineTo(x, y, "L");
        }

        this.hLineTo = function(x, type) {
            orders.push( (type || "h") + x );
            return this;
        }
        this.HLineTo = function(x) {
            return this.hLineTo(x, "H");
        }

        this.vLineTo = function(y, type) {
            orders.push( (type || "v") + y );
            return this;
        }
        this.VLineTo = function(y) {
            return this.vLineTo(y, "V");
        }

        this.curveTo = function(x1, y1, x2, y2, x, y, type) {
            orders.push( (type || "c") + x1 + "," + y1 + " " + x2 + "," + y2 + " " + x + "," + y );
            return this;
        }
        this.CurveTo = function(x1, y1, x2, y2, x, y) {
            return this.curveTo(x1, y1, x2, y2, x, y, "C");
        }

        this.sCurveTo = function(x2, y2, x, y, type) {
            orders.push( (type || "s") + x2 + "," + y2 + " " + x + "," + y );
            return this;
        }
        this.SCurveTo = function(x2, y2, x, y) {
            return this.sCurveTo(x2, y2, x, y, "S");
        }

        this.qCurveTo = function(x1, y1, x, y, type) {
            orders.push( (type || "q") + x1 + "," + y1 + " " + x + "," + y );
            return this;
        }
        this.QCurveTo = function(x1, y1, x, y) {
            return this.qCurveTo(x1, y1, x, y, "Q");
        }

        this.tCurveTo = function(x1, y1, x, y, type) {
            orders.push( (type || "t") + x1 + "," + y1 + " " + x + "," + y );
            return this;
        }
        this.TCurveTo = function(x1, y1, x, y) {
            return this.tCurveTo(x1, y1, x, y, "T");
        }

        this.arc = function(rx, ry, x_axis_rotation, large_arc_flag, sweep_flag, x, y, type) {
            large_arc_flag = (large_arc_flag) ? 1 : 0;
            sweep_flag = (sweep_flag) ? 1 : 0;

            orders.push( (type || "a") + rx + "," + ry + " " + x_axis_rotation + " " + large_arc_flag + "," + sweep_flag + " " + x + "," + y );
            return this;
        }
        this.Arc = function(rx, ry, x_axis_rotation, large_arc_flag, sweep_flag, x, y) {
            return this.arc(rx, ry, x_axis_rotation, large_arc_flag, sweep_flag, x, y, "A");
        }

        this.closePath = function(type) {
            orders.push( (type || "z") );
            return this;
        }
        this.ClosePath = function() {
            return this.closePath("Z");
        }

        this.join = function() {
            if(orders.length > 0) {
                this.attr({ d: orders.join(" ") });
                orders = [];
            }
        }

        this.length = function() {
            var id = _.createId(),
                d = orders.join(" ");

            var svg = document.createElement("svg"),
                path = document.createElementNS("http://www.w3.org/2000/svg", "path");

            path.setAttributeNS(null, "id", id);
            path.setAttributeNS(null, "d", d);
            svg.appendChild(path);

            document.body.appendChild(svg);
            var length = document.getElementById(id).getTotalLength();
            document.body.removeChild(svg);

            return length;
        }
    }

    return PathElement;
}, "util.svg.element.transform");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

jui.define("util.svg.element.path.rect", [], function() {

    /**
     * @class util.svg.element.path.rect
     *
     * @alias PathRectElement
     * @extends util.svg.element.path
     */
    var PathRectElement = function() {
        this.round = function(width, height, tl, tr, br, bl) {
            tl = (!tl) ? 0 : tl;
            tr = (!tr) ? 0 : tr;
            br = (!br) ? 0 : br;
            bl = (!bl) ? 0 : bl;

            this.MoveTo(0, tl)
                .Arc(tl, tl, 0, 0, 1, tl, 0)
                .HLineTo(width - tr)
                .Arc(tr, tr, 0, 0, 1, width, tr)
                .VLineTo(height - br)
                .Arc(br, br, 0, 0, 1, width - br, height)
                .HLineTo(bl)
                .Arc(bl, bl, 0, 0, 1, 0, height - bl)
                .ClosePath()
                .join();
        }
    }

    return PathRectElement;
}, "util.svg.element.path");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

jui.define("util.svg.element.path.symbol", [], function() {

    /**
     * @class util.svg.element.path.symbol
     *
     * @alias PathSymbolElement
     * @extends util.svg.element.path
     */
    var PathSymbolElement = function() {
        var ordersString = "";

        /**
         * 심볼 템플릿
         *
         */
        this.template = function(width, height) {
            var r = width,
                half_width = half_r =  width / 2,
                half_height = height / 2;

            var start = "a" + half_r + "," + half_r + " 0 1,1 " + r + ",0",
                end = "a" + half_r + "," + half_r + " 0 1,1 " + -r + ",0";

            var obj = {
                triangle : ["m0," + -half_height, "l" + (half_width) + "," + height, "l" + (-width) + ",0", "l" + (half_width) + "," + (-height)].join(" "),
                rect : ["m" + (-half_width) + "," + (-half_height), "l" + (width) + ",0", "l0," + (height) , "l" + (-width) + ',0', "l0," + (-height)].join(" "),
                cross : ["m" + (-half_width) + ',' + (-half_height), "l" + (width) + "," + (height), "m0," + (-height), "l" + (-width) + "," + (height)].join(" "),
                circle : ["m" + (-r) + ",0", start, end  ].join(" ")
            }

            obj.rectangle = obj.rect;

            return obj;
        }

        this.join = function() {
            if(ordersString.length > 0) {
                this.attr({ d: ordersString });
                ordersString = "";
            }
        }

        /**
         * 심볼 추가 하기 (튜닝)
         */
        this.add = function(cx, cy, tpl) {
            ordersString += " M" + (cx) + "," + (cy) + tpl;
        }

        /**
         * path 내 심볼 생성
         *
         */
        this.triangle = function(cx, cy, width, height) {
            return this.MoveTo(cx, cy).moveTo(0, -height/2).lineTo(width/2,height).lineTo(-width, 0).lineTo(width/2, -height);
        }

        this.rect = this.rectangle = function(cx, cy, width, height) {
            return this.MoveTo(cx, cy).moveTo(-width/2, -height/2).lineTo(width,0).lineTo(0, height).lineTo(-width, 0).lineTo(0, -height);
        }

        this.cross = function(cx, cy, width, height) {
            return this.MoveTo(cx, cy).moveTo(-width/2, -height/2).lineTo(width, height).moveTo(0, -height).lineTo(-width, height);
        }

        this.circle = function(cx, cy, r) {
            return this.MoveTo(cx, cy).moveTo(-r, 0).arc(r/2, r/2, 0, 1, 1, r, 0).arc(r/2, r/2, 0, 1, 1, -r, 0);
        }
    }

    return PathSymbolElement;
}, "util.svg.element.path");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

jui.define("util.svg.element.poly", [], function() {

    /**
     * @class util.svg.element.poly
     *
     * @alias PolyElement
     * @extends util.svg.element.transform
     */
    var PolyElement = function() {
        var orders = [];

        this.point = function(x, y) {
            orders.push(x + "," + y);
            return this;
        }

        this.join = function() {
            if(orders.length > 0) {
                // Firefox 처리
                var start = orders[0];
                orders.push(start);

                // 폴리곤 그리기
                this.attr({ points: orders.join(" ") });
                orders = [];
            }
        }
    }

    return PolyElement;
}, "util.svg.element.transform");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

jui.define("util.svg.base",
    [ "util.base", "util.math", "util.color", "util.svg.element", "util.svg.element.transform",
        "util.svg.element.path", "util.svg.element.path.symbol", "util.svg.element.path.rect", "util.svg.element.poly" ],
    function(_, math, color, Element, TransElement, PathElement, PathSymbolElement, PathRectElement, PolyElement) {

    var globalObj = null;

    /**
     * @class util.svg.base
     * SVG base module
     *
     * @requires util.base
     * @requires util.math
     * @requires util.color
     * @requires util.svg.element
     * @requires util.svg.element.transform
     * @requires util.svg.element.path
     * @requires util.svg.element.path.symbol
     * @requires util.svg.element.path.rect
     * @requires util.svg.element.poly
     * @alias SVGBase
     */
    var SVGBase = function() {
        this.create = function(obj, type, attr, callback) {
            obj.create(type, attr);
            return obj;
        }

        this.createChild = function(obj, type, attr, callback) {
            return this.create(obj, type, attr, callback);
        }

        /**
         * @method custom
         *
         * return custom element
         *
         * @param {String} name
         * @param {Object} attr
         * @param {Function} callback
         * @return {util.svg.element}
         */
        this.custom = function(name, attr, callback) {
            return this.create(new Element(), name, attr, callback);
        }

        /**
         * @method defs
         *
         * return defs element
         *
         * @param {Function} callback
         * @return {util.svg.element}
         */
        this.defs = function(callback) {
            return this.create(new Element(), "defs", null, callback);
        }

        /**
         * @method symbol
         *
         * return symbol element
         *
         * @param {Object} attr
         * @param {Function} callback
         * @return {util.svg.element}
         */
        this.symbol = function(attr, callback) {
            return this.create(new Element(), "symbol", attr, callback);
        }

        /**
         * @method g
         *
         * return defs element
         *
         * @alias group
         * @param {Object} attr
         * @param {Function} callback
         * @return {util.svg.element.transform}
         */
        this.g = this.group = function(attr, callback) {
            return this.create(new TransElement(), "g", attr, callback);
        }

        /**
         * @method marker
         *
         * return marker element
         *
         * @param {Object} attr
         * @param {Function} callback
         * @return {util.svg.element}
         */
        this.marker = function(attr, callback) {
            return this.create(new Element(), "marker", attr, callback);
        }

        /**
         * @method a
         *
         * return a element
         *
         * @param {Object} attr
         * @param {Function} callback
         * @return {util.svg.element.transform}
         */
        this.a = function(attr, callback) {
            return this.create(new TransElement(), "a", attr, callback);
        }

        /**
         * @method switch
         *
         * return switch element
         *
         * @param {Object} attr
         * @param {Function} callback
         * @return {util.svg.element}
         */
        this.switch = function(attr, callback) {
            return this.create(new Element(), "switch", attr, callback);
        }

        /**
         * @method use
         *
         * return use element
         *
         * @param {Object} attr
         * @return {util.svg.element}
         */
        this.use = function(attr) {
            return this.create(new Element(), "use", attr);
        }

        /**
         * @method rect
         *
         * return rect element
         *
         * @param {Object} attr
         * @param {Function} callback
         * @return {util.svg.element.transform}
         */
        this.rect = function(attr, callback) {
            return this.create(new TransElement(), "rect", attr, callback);
        }

        /**
         * @method line
         *
         * return line element
         *
         * @param {Object} attr
         * @param {Function} callback
         * @return {util.svg.element.transform}
         */
        this.line = function(attr, callback) {
            return this.create(new TransElement(), "line", attr, callback);
        }

        this.circle = function(attr, callback) {
            return this.create(new TransElement(), "circle", attr, callback);
        }

        this.text = function(attr, textOrCallback) {
            if(arguments.length == 2) {
                if (_.typeCheck("function", textOrCallback)) {
                    return this.create(new TransElement(), "text", attr, textOrCallback);
                }

                return this.create(new TransElement(), "text", attr).text(textOrCallback);
            }

            return this.create(new TransElement(), "text", attr);
        }

        this.textPath = function(attr, text) {
            if(_.typeCheck("string", text)) {
                return this.create(new Element(), "textPath", attr).text(text);
            }

            return this.create(new Element(), "textPath", attr);
        }

        this.tref = function(attr, text) {
            if(_.typeCheck("string", text)) {
                return this.create(new Element(), "tref", attr).text(text);
            }

            return this.create(new Element(), "tref", attr);
        }

        this.tspan = function(attr, text) {
            if(_.typeCheck("string", text)) {
                return this.create(new Element(), "tspan", attr).text(text);
            }

            return this.create(new Element(), "tspan", attr);
        }

        this.ellipse = function(attr, callback) {
            return this.create(new TransElement(), "ellipse", attr, callback);
        }

        this.image = function(attr, callback) {
            return this.create(new TransElement(), "image", attr, callback);
        }

        this.path = function(attr, callback) {
            return this.create(new PathElement(), "path", attr, callback);
        }

        this.pathSymbol = function(attr, callback) {
            return this.create(new PathSymbolElement(), "path", attr, callback);
        }

        this.pathRect = function(attr, callback) {
            return this.create(new PathRectElement(), "path", attr, callback);
        }

        this.polyline = function(attr, callback) {
            return this.create(new PolyElement(), "polyline", attr, callback);
        }

        this.polygon = function(attr, callback) {
            return this.create(new PolyElement(), "polygon", attr, callback);
        }

        this.pattern = function(attr, callback) {
            return this.create(new Element(), "pattern", attr, callback);
        }

        this.mask = function(attr, callback) {
            return this.create(new Element(), "mask", attr, callback);
        }

        this.clipPath = function(attr, callback) {
            return this.create(new Element(), "clipPath", attr, callback);
        }

        this.linearGradient = function(attr, callback) {
            return this.create(new Element(), "linearGradient", attr, callback);
        }

        this.radialGradient = function(attr, callback) {
            return this.create(new Element(), "radialGradient", attr, callback);
        }

        this.filter = function(attr, callback) {
            return this.create(new Element(), "filter", attr, callback);
        }

        this.foreignObject = function(attr, callback) {
            return this.create(new TransElement(), "foreignObject", attr, callback);
        }

        /**
         * 엘리먼트 관련 메소드 (그라데이션)
         *
         */

        this.stop = function(attr) {
            return this.createChild(new Element(), "stop", attr);
        }

        /**
         * 엘리먼트 관련 메소드 (애니메이션)
         *
         */

        this.animate = function(attr) {
            return this.createChild(new Element(), "animate", attr);
        }

        this.animateColor = function(attr) {
            return this.createChild(new Element(), "animateColor", attr);
        }

        this.animateMotion = function(attr) {
            return this.createChild(new Element(), "animateMotion", attr);
        }

        this.animateTransform = function(attr) {
            return this.createChild(new Element(), "animateTransform", attr);
        }

        this.mpath = function(attr) {
            return this.createChild(new Element(), "mpath", attr);
        }

        this.set = function(attr) {
            return this.createChild(new Element(), "set", attr);
        }

        /**
         * 엘리먼트 관련 메소드 (필터)
         *
         */

        this.feBlend = function(attr) {
            return this.createChild(new Element(), "feBlend", attr);
        }

        this.feColorMatrix = function(attr) {
            return this.createChild(new Element(), "feColorMatrix", attr);
        }

        this.feComponentTransfer = function(attr) {
            return this.createChild(new Element(), "feComponentTransfer", attr);
        }

        this.feComposite = function(attr) {
            return this.createChild(new Element(), "feComposite", attr);
        }

        this.feConvolveMatrix = function(attr) {
            return this.createChild(new Element(), "feConvolveMatrix", attr);
        }

        this.feDiffuseLighting = function(attr) {
            return this.createChild(new Element(), "feDiffuseLighting", attr);
        }

        this.feDisplacementMap = function(attr) {
            return this.createChild(new Element(), "feDisplacementMap", attr);
        }

        this.feFlood = function(attr) {
            return this.createChild(new Element(), "feFlood", attr);
        }

        this.feGaussianBlur = function(attr) {
            return this.createChild(new Element(), "feGaussianBlur", attr);
        }

        this.feImage = function(attr) {
            return this.createChild(new Element(), "feImage", attr);
        }

        this.feMerge = function(attr, callback) {
            return this.createChild(new Element(), "feMerge", attr, callback);
        }

        this.feMergeNode = function(attr) {
            return this.createChild(new Element(), "feMergeNode", attr);
        }

        this.feMorphology = function(attr) {
            return this.createChild(new Element(), "feMorphology", attr);
        }

        this.feOffset = function(attr) {
            return this.createChild(new Element(), "feOffset", attr);
        }

        this.feSpecularLighting = function(attr) {
            return this.createChild(new Element(), "feSpecularLighting", attr);
        }

        this.feTile = function(attr) {
            return this.createChild(new Element(), "feTile", attr);
        }

        this.feTurbulence = function(attr) {
            return this.createChild(new Element(), "feTurbulence", attr);
        }
    }

    SVGBase.create = function(name, attr, callback) {
        if(globalObj == null) {
            globalObj = new SVGBase();
        }

        return globalObj.custom(name, attr, callback);
    }

    return SVGBase;
});

/***/ }),
/* 12 */
/***/ (function(module, exports) {

jui.define("util.svg.base3d", [ "util.base", "util.math", "util.color" ], function(_, math, color) {

    /**
     * @class util.svg.base3d
     * SVG 3d module
     *
     * @extends util.svg.base
     * @requires util.base
     * @requires util.math
     * @requires util.color
     * @alias SVG3d
     */
    var SVG3d = function() {

        this.rect3d = function(fill, width, height, degree, depth) {
            var self = this;

            var radian = math.radian(degree),
                x1 = 0,
                y1 = 0,
                w1 = width,
                h1 = height;

            var x2 = Math.cos(radian) * depth,
                y2 = Math.sin(radian) * depth,
                w2 = width + x2,
                h2 = height + y2;

            var g = self.group({}, function() {
                self.path({
                    fill: color.lighten(fill, 0.15),
                    stroke: color.lighten(fill, 0.15)
                }).MoveTo(x2, x1)
                    .LineTo(w2, y1)
                    .LineTo(w1, y2)
                    .LineTo(x1, y2);

                self.path({
                    fill: fill,
                    stroke: fill
                }).MoveTo(x1, y2)
                    .LineTo(x1, h2)
                    .LineTo(w1, h2)
                    .LineTo(w1, y2);

                self.path({
                    fill: color.darken(fill, 0.2),
                    stroke: color.darken(fill, 0.2)
                }).MoveTo(w1, h2)
                    .LineTo(w2, h1)
                    .LineTo(w2, y1)
                    .LineTo(w1, y2);
            });

            return g;
        }

        this.cylinder3d = function(fill, width, height, degree, depth, rate) {
            var self = this;

            var radian = math.radian(degree),
                rate = (rate == undefined) ? 1 : (rate == 0) ? 0.01 : rate,
                r = width / 2,
                tr = r * rate,
                l = (Math.cos(radian) * depth) / 2,
                d = (Math.sin(radian) * depth) / 2,
                key = _.createId("cylinder3d");

            var g = self.group({}, function() {
                self.ellipse({
                    fill: color.darken(fill, 0.05),
                    "fill-opacity": 0.85,
                    stroke: color.darken(fill, 0.05),
                    rx: r,
                    ry: d,
                    cx: r,
                    cy: height
                }).translate(l, d);

                self.path({
                    fill: "url(#" + key + ")",
                    "fill-opacity": 0.85,
                    stroke: fill
                }).MoveTo(r - tr, d)
                    .LineTo(0, height)
                    .Arc(r, d, 0, 0, 0, width, height)
                    .LineTo(r + tr, d)
                    .Arc(r + tr, d, 0, 0, 1, r - tr, d)
                    .translate(l, d);

                self.ellipse({
                    fill: color.lighten(fill, 0.2),
                    "fill-opacity": 0.95,
                    stroke: color.lighten(fill, 0.2),
                    rx: r * rate,
                    ry: d * rate,
                    cx: r,
                    cy: d
                }).translate(l, d);

                self.linearGradient({
                    id: key,
                    x1: "100%",
                    x2: "0%",
                    y1: "0%",
                    y2: "0%"
                }, function() {
                    self.stop({
                        offset: "0%",
                        "stop-color": color.lighten(fill, 0.15)
                    });
                    self.stop({
                        offset: "33.333333333333336%",
                        "stop-color": color.darken(fill, 0.2)
                    });
                    self.stop({
                        offset: "66.66666666666667%",
                        "stop-color": color.darken(fill, 0.2)
                    });
                    self.stop({
                        offset: "100%",
                        "stop-color": color.lighten(fill, 0.15)
                    });
                });
            });

            return g;
        }
    }

    return SVG3d;
}, "util.svg.base");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

jui.redefine("util.svg",
    [ "util.base", "util.math", "util.color", "util.svg.element", "util.svg.element.transform",
        "util.svg.element.path", "util.svg.element.path.symbol", "util.svg.element.path.rect", "util.svg.element.poly" ],
    function(_, math, color, Element, TransElement, PathElement, PathSymbolElement, PathRectElement, PolyElement) {

    /**
     * @class util.svg
     * SVG Utility
     *
     * @param {Element} rootElem
     * @param {Object} rootAttr
     * @extends util.svg.base3d
     * @requires util.base
     * @requires util.math
     * @requires util.color
     * @requires util.svg.element
     * @requires util.svg.element.transform
     * @requires util.svg.element.transform
     * @requires util.svg.element.path
     * @requires util.svg.element.path.symbol
     * @requires util.svg.element.path.rect
     * @requires util.svg.element.poly
     * @constructor
     * @alias SVG
     */
    var SVG = function(rootElem, rootAttr) {
        var self = this,
            root = null,
            main = null,
            sub = null,
            parent = {},
            depth = 0;
        var isFirst = false; // 첫번째 렌더링 체크

        function init() {
            self.root = root = new Element();
            main = new TransElement();
            sub = new TransElement();

            root.create("svg", rootAttr);
            main.create("g");
            sub.create("g");

            main.translate(0.5, 0.5);
            sub.translate(0.5, 0.5);

            rootElem.appendChild(root.element);
            root.append(main);
            root.append(sub);
        }
        
        function appendAll(target) {
            var childs = target.children;

            // 엘리먼트 렌더링 순서 정하기
            if(isOrderingChild(childs)) {
                childs.sort(function (a, b) {
                    return a.order - b.order;
                });
            }

            for(var i = 0, len = childs.length; i < len; i++) {
                var child = childs[i];

                if(child) {
                    if(child.children.length > 0) {
                        appendAll(child);
                    }
                    
                    // PathElement & PathSymbolElement & PathRectElement & PolyElement auto join
                    if(child instanceof PathElement || child instanceof PolyElement) {
                        child.join();
                    }

                    if(child.parent == target) {
                        target.element.appendChild(child.element);
                    }
                }
            }
        }

        function removeEventAll(target) {
            var childs = target.children;

            for(var i = 0, len = childs.length; i < len; i++) {
                var child = childs[i];

                if(child) {
                    child.off();

                    if(child.children.length > 0) {
                        removeEventAll(child);
                    }
                }
            }
        }

        function isOrderingChild(childs) { // order가 0 이상인 엘리먼트가 하나라도 있을 경우
            for(var i = 0, len = childs.length; i < len; i++) {
                if(childs[i].order > 0) {
                    return true;
                }
            }

            return false;
        }

        this.create = function(obj, type, attr, callback) {
            obj.create(type, attr);

            if(depth == 0) {
                main.append(obj);
            } else {
                parent[depth].append(obj);
            }

            if(_.typeCheck("function", callback)) {
                depth++;
                parent[depth] = obj;

                callback.call(obj);
                depth--;
            }

            return obj;
        }

        this.createChild = function(obj, type, attr, callback) {
            if(obj.parent == main) {
                throw new Error("JUI_CRITICAL_ERR: Parents are required elements of the '" + type + "'");
            }

            return this.create(obj, type, attr, callback);
        }

        /**
         * @method size
         *
         * if arguments.length is 2, set attribute width, height to root element
         * if arguments.length is zero, return svg size
         *
         * @return {Object}
         * @return {Integer} width
         * @return {Integer} height
         */
        this.size = function() {
            if(arguments.length == 2) {
                var w = arguments[0],
                    h = arguments[1];

                root.attr({ width: w, height: h });
            } else {
                return root.size();
            }
        }

        /**
         * @method clear
         * @param isAll
         */
        this.clear = function(isAll) {
            main.each(function() {
                if(this.element.parentNode) {
                    main.element.removeChild(this.element);
                }
            });

            removeEventAll(main);

            if(isAll === true) {
                sub.each(function() {
                    if(this.element.parentNode) {
                        sub.element.removeChild(this.element);
                    }
                });

                removeEventAll(sub);
            }
        }

        /**
         * @method reset
         * @param isAll
         */
        this.reset = function(isAll) {
            this.clear(isAll);
            main.children = [];

            if(isAll === true) {
                sub.children = [];
            }
        }

        /**
         * @method render
         * @param isAll
         */
        this.render = function(isAll) {
            this.clear();

            if(isFirst === false || isAll === true) {
                appendAll(root);
            } else {
                appendAll(main);
            }

            isFirst = true;
        }

        /**
         * @method
         * implements svg image file download used by canvas
         * @param name
         */
        this.download = function(name) {
            if(_.typeCheck("string", name)) {
                name = name.split(".")[0];
            }

            var a = document.createElement("a");
            a.download = (name) ? name + ".svg" : "svg.svg";
            a.href = this.toDataURI()//;_.svgToBase64(rootElem.innerHTML);

            document.body.appendChild(a);
            a.click();
            a.parentNode.removeChild(a);
        }
        
        this.downloadImage = function(name, type) {
            type = type || "image/png";

            var img = new Image();
            var size = this.size();
            var uri = this.toDataURI()
                            .replace('width="100%"', 'width="' + size.width + '"')
                            .replace('height="100%"', 'height="' + size.height + '"');
            img.onload = function(){
              var canvas = document.createElement("canvas");
              canvas.width = img.width;
              canvas.height = img.height;
              
              var context = canvas.getContext('2d');
              context.drawImage(img, 0, 0);
              
              var png = canvas.toDataURL(type);
              
              if(_.typeCheck("string", name)) {
                  name = name.split(".")[0];
              }              
              
              var a = document.createElement('a');
              a.download = (name) ? name + ".png" : "svg.png";
              a.href = png;
  
              document.body.appendChild(a);
              a.click();
              a.parentNode.removeChild(a);
            }

            img.src = uri;   
      
        }

        /**
         * @method exportCanvas
         *
         * convert svg image to canvas
         *
         * @param {Canvas} canvas
         */
        this.exportCanvas = function(canvas) {
            var img = new Image(),
                size = this.size();

            var uri = this.toDataURI()
                .replace('width="100%"', 'width="' + size.width + '"')
                .replace('height="100%"', 'height="' + size.height + '"');

            img.onload = function() {
                canvas.width = img.width;
                canvas.height = img.height;

                var context = canvas.getContext('2d');
                context.drawImage(img, 0, 0);
            }

            img.src = uri;
        }

        /**
         * @method toXML
         *
         * convert xml string
         *
         * @return {String} xml
         */
        this.toXML = function() {
            var text = rootElem.innerHTML;

            text = text.replace('xmlns="http://www.w3.org/2000/svg"', '');

            return [
                '<?xml version="1.0" encoding="utf-8"?>',
                text.replace("<svg ", '<svg xmlns="http://www.w3.org/2000/svg" ')
            ].join("\n");
        }

        /**
         * @method toDataURI
         *
         * convert svg to datauri format
         *
         * @return {String}
         */
        this.toDataURI = function() {
            var xml = this.toXML();

            if (_.browser.mozilla || _.browser.msie) {
                xml = encodeURIComponent(xml);
            }

            if (_.browser.msie) {
                return "data:image/svg+xml," + xml;
            } else {
                return "data:image/svg+xml;utf8," + xml;
            }
        }

        /**
         * @method autoRender
         *
         * @param {util.svg.element} elem
         * @param {Boolean} isAuto
         */
        this.autoRender = function(elem, isAuto) {
            if(depth > 0) return;

            if(!isAuto) {
                sub.append(elem);
            } else {
                main.append(elem);
            }
        }

        /**
         * @method getTextSize
         *
         * caculate real pixel size of text element
         *
         * @param {String} text target text
         * @return {Object}
         * @return {Integer} return.width  text element's width (px)
         * @return {Integer} return.height text element's height(px)
         */
        this.getTextSize = function(text, opt) {
            if (text == "") {
                return { width : 0, height : 0 };
            }

            opt = opt || {};

            var bodyElement = document.body || root.element;

            var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.setAttributeNS(null, "width", 500);
            svg.setAttributeNS(null, "height", 100);
            svg.setAttributeNS(null, "x", -20000);
            svg.setAttributeNS(null, "y", -20000);

            var el = document.createElementNS("http://www.w3.org/2000/svg", "text");
            el.setAttributeNS(null, "x", -200);
            el.setAttributeNS(null, "y", -200);
            el.appendChild(document.createTextNode(text));

            if (opt.fontSize) {
                el.setAttributeNS(null, "font-size", opt.fontSize);
            }

            if (opt.fontFamily) {
                el.setAttributeNS(null, "font-family", opt.fontFamily);
            }

            if (opt.bold) {
                el.setAttributeNS(null, "font-weight", opt.bold);
            }

            if (opt.style) {
                el.setAttributeNS(null, "font-style", opt.style);
            }


            svg.appendChild(el);

            bodyElement.appendChild(svg);
            var rect = el.getBoundingClientRect();
            bodyElement.removeChild(svg);

        	return { width : rect.width, height : rect.height }; 
        }

        init();
    }

    /**
     * @method create
     *
     * create nested elements by json
     *
     *      @example
     *      SVG.create({
     *          tag : "pattern",
     *          attr : { x : 0, y : 0, width : 20, height : 20  },
     *          children : [
     *              { tag : 'rect', attr : {width : 20, height : 20, fill : 'black', stroke : 'blue', 'stroke-width' : 2 } ,
     *              { tag : 'rect', attr : {width : 20, height : 20, fill : 'black', stroke : 'blue', 'stroke-width' : 2 } ,
     *              { tag : 'rect', attr : {width : 20, height : 20, fill : 'black', stroke : 'blue', 'stroke-width' : 2 } ,
     *              { tag : 'rect', attr : {width : 20, height : 20, fill : 'black', stroke : 'blue', 'stroke-width' : 2 }
     *          ]
     *      });
     *
     * is equals to
     *
     *      @example
     *      <pattern x="0" y="0" width="20" height="20">
     *          <rect width="20" height="20" fill="black" stroke="blue" stroke-width="2" />
     *          <rect width="20" height="20" fill="black" stroke="blue" stroke-width="2" />
     *          <rect width="20" height="20" fill="black" stroke="blue" stroke-width="2" />
     *          <rect width="20" height="20" fill="black" stroke="blue" stroke-width="2" />
     *      </pattern>
     *
     * @param {Object} obj json literal
     * @param {String} obj.type  svg element name
     * @param {Object} obj.attr  svg element's attributes
     * @param {Array} [obj.children=null] svg element's children
     * @static
     * @return {util.svg.element}
     *
     */
    SVG.createObject = function(obj) {
        var el = new Element();

        el.create(obj.type, obj.attr);

        if (obj.children instanceof Array) {
            for(var i = 0, len = obj.children.length; i < len; i++) {
                el.append(SVG.createObject(obj.children[i]));
            }
        }

        return el;
    }

    return SVG;
}, "util.svg.base3d", true);


/***/ }),
/* 14 */
/***/ (function(module, exports) {

jui.define("util.scale.linear", [ "util.math" ], function(math) {

    /**
     * @class util.scale.linear
     * Linear scale
     *
     * @singleton
     * @requires util.math
     */
    var linear = function() {
        var _domain = [0, 1];
        var _range = [0, 1];
        var _isRound = false;
        var _isClamp = false;
        var _cache = {};

        var roundFunction = null;
        var numberFunction = null;

        var domainMin = null;
        var domainMax = null;

        var rangeMin = null;
        var rangeMax = null;

        var distDomain = null;
        var distRange = null;
        var rate = 0;

        var callFunction = null;
        var _rangeBand = null;

        function func(x) {
            if (domainMax < x) {
                if (_isClamp) {
                    return func(domainMax);
                }

                return _range[0] + Math.abs(x - _domain[0]) * rate;
            } else if (domainMin > x) {
                if (_isClamp) {
                    return func(domainMin);
                }

                return _range[0] - Math.abs(x - _domain[0]) * rate;
            } else {
                var pos = (x - _domain[0]) / (distDomain);

                return callFunction(pos);
            }
        }

        func.cache = function () {
            return _cache;
        }

        /**
         * @method min
         * @static
         *
         * @returns {number}
         */
        func.min = function () {
            return Math.min.apply(Math, _domain);
        }

        func.max = function () {
            return Math.max.apply(Math, _domain);
        }

        func.rangeMin = function () {
            return Math.min.apply(Math, _range);
        }

        func.rangeMax = function () {
            return Math.max.apply(Math, _range);
        }

        func.rate = function (value, max) {
            return func(func.max() * (value / max));
        }

        func.clamp = function (isClamp) {
            _isClamp = isClamp || false;
        }

        func.domain = function (values) {

            if (!arguments.length) {
                return _domain;
            }

            for (var i = 0; i < values.length; i++) {
                _domain[i] = values[i];
            }

            domainMin = func.min();
            domainMax = func.max();

            distDomain = _domain[1] - _domain[0];

            return this;
        }

        func.range = function (values) {

            if (!arguments.length) {
                return _range;
            }

            for (var i = 0; i < values.length; i++) {
                _range[i] = values[i];
            }

            roundFunction = math.interpolateRound(_range[0], _range[1]);
            numberFunction = math.interpolateNumber(_range[0], _range[1]);

            rangeMin = func.rangeMin();
            rangeMax = func.rangeMax();

            distRange = Math.abs(rangeMax - rangeMin);

            rate = distRange / distDomain;

            callFunction = _isRound ? roundFunction : numberFunction;

            return this;
        }

        func.rangeRound = function (values) {
            _isRound = true;

            return func.range(values);
        }

        func.rangeBand = function () {
            return _rangeBand;
        }

        func.invert = function (y) {
            var f = linear().domain(_range).range(_domain);
            return f(y);
        }

        func.ticks = function (count, isNice, /** @deprecated */intNumber, reverse) {

            //intNumber = intNumber || 10000;
            reverse = reverse || false;
            var max = func.max();

            if (_domain[0] == 0 && _domain[1] == 0) {
                return [];
            }

            var obj = math.nice(_domain[0], _domain[1], count || 10, isNice || false);

            var arr = [];

            var start = (reverse ? obj.max : obj.min);
            var end = (reverse ? obj.min : obj.max);
            var unit = obj.spacing;
            var fixed = math.fixed(unit);

            while ((reverse ? end <= start : start <= end)) {
                arr.push(start/* / intNumber*/);

                if (reverse) {
                    start = fixed.minus(start, unit);
                } else {
                    start = fixed.plus(start, unit);
                }

            }

            if (reverse) {
                if (arr[0] != max) {
                    arr.unshift(max);
                }

                for (var i = 0, len = arr.length; i < len; i++) {
                    arr[i] = Math.abs(arr[i] - max);
                }
                //arr.reverse();

            } else {
                if (arr[arr.length - 1] != end && start > end) {
                    arr.push(end);
                }

                if (_domain[0] > _domain[1]) {
                    arr.reverse();
                }
            }

            var first = func(arr[0]);
            var second = func(arr[1]);

            _rangeBand = Math.abs(second - first);

            return arr;
        }

        return func;
    }

    return linear;
});

/***/ }),
/* 15 */
/***/ (function(module, exports) {

jui.define("util.scale.circle", [], function() {

    /**
     * @class util.scale.circle
     * For the circular coordinate scale
     *
     * @singleton
     */
    var circle = function () {

        var _domain = [];
        var _range = [];
        var _rangeBand = 0;

        function func(t) {}

        /**
         * @method domain
         * @static 
         *
         * @param values
         * @returns {*}
         */
        func.domain = function(values) {

            if ( typeof values == 'undefined') {
                return _domain;
            }

            for (var i = 0; i < values.length; i++) {
                _domain[i] = values[i];
            }

            return this;
        }

        func.range = function(values) {

            if ( typeof values == 'undefined') {
                return _range;
            }

            for (var i = 0; i < values.length; i++) {
                _range[i] = values[i];
            }

            return this;
        }

        func.rangePoints = function(interval, padding) {

            padding = padding || 0;

            var step = _domain.length;
            var unit = (interval[1] - interval[0] - padding) / step;

            var range = [];
            for (var i = 0; i < _domain.length; i++) {
                if (i == 0) {
                    range[i] = interval[0] + padding / 2 + unit / 2;
                } else {
                    range[i] = range[i - 1] + unit;
                }
            }

            _range = range;
            _rangeBand = unit;

            return func;
        }

        func.rangeBands = function(interval, padding, outerPadding) {
            padding = padding || 0;
            outerPadding = outerPadding || 0;

            var count = _domain.length;
            var step = count - 1;
            var band = (interval[1] - interval[0]) / step;

            var range = [];
            for (var i = 0; i < _domain.length; i++) {
                if (i == 0) {
                    range[i] = interval[0];
                } else {
                    range[i] = band + range[i - 1];
                }
            }

            _rangeBand = band;
            _range = range;

            return func;
        }

        func.rangeBand = function() {
            return _rangeBand;
        }

        return func;
    };

    return circle;
});

/***/ }),
/* 16 */
/***/ (function(module, exports) {

jui.define("util.scale.log", [ "util.base", "util.scale.linear" ], function(_, linear) {

    /**
     * @class util.scale.log
     * Log scale
     *
     * @singleton
     * @requires util.base
     * @requires util.scale.linear
     */
    var log = function(base) {
        var _base = base || 10;

        var func = linear();
        var _domain = [];
        var _domainMax = null;
        var _domainMin = null;

        function log(value) {
            if (value < 0) {
                return -(Math.log(Math.abs(value)) / Math.log(_base));
            } else if (value > 0) {
                return Math.log(value) / Math.log(_base);
            }

            return 0;
        }

        function pow(value) {
            if (value < 0) {
                return - Math.pow(_base, Math.abs(value));
            } else if (value > 0) {
                return Math.pow(_base, value);
            }

            return 0;
        }

        function checkMax(value) {
            return Math.pow(_base, (value+"").length-1) < value;
        }

        function getNextMax(value) {
            return Math.pow(_base, (value+"").length);
        }

        var newFunc = function(x) {
            var value = x;

            if (x > _domainMax) {
                value = _domainMax;
            } else if (x < _domainMin) {
                value = _domainMin;
            }

            return func(log(value));
        }

        _.extend(newFunc, func);

        newFunc.log = function() {
            var newDomain = [];
            for (var i = 0; i < _domain.length; i++) {
                newDomain[i] = log(_domain[i]);
            }

            return newDomain;
        }

        newFunc.domain = function(values) {
            if (!arguments.length) {
                return _domain;
            }

            for (var i = 0; i < values.length; i++) {
                _domain[i] = values[i];
            }

            _domainMax = Math.max.apply(Math, _domain);
            _domainMin = Math.min.apply(Math, _domain);

            if (checkMax(_domainMax)) {
                _domain[1] = _domainMax = getNextMax(_domainMax);
            }

            if (checkMax(Math.abs(_domainMin))) {

                var value = getNextMax(Math.abs(_domainMin));
                _domain[0] = _domainMin = _domainMin < 0  ? -value : value ;
            }

            func.domain(newFunc.log());

            return newFunc;
        }

        newFunc.base = function(base) {
            func.domain(newFunc.log());

            return newFunc;
        }

        newFunc.invert = function(y) {
            return pow(func.invert(y));
        }

        newFunc.ticks = function(count, isNice, intNumber) {
            var arr = func.ticks(count, isNice, intNumber || 100000000000000000000, true);

            if (arr[arr.length-1] < func.max()) {
                arr.push(func.max());
            }

            var newArr = [];
            for(var i = 0, len = arr.length; i < len; i++) {
                newArr[i] = pow(arr[i]);
            }

            return newArr;
        }

        return newFunc;
    }

    return log;
});

/***/ }),
/* 17 */
/***/ (function(module, exports) {

jui.define("util.scale.ordinal", [], function() {

    /**
     * @class util.scale.singleton
     * Scale for the list, which has the sequence
     *
     * @singleton
     */
    var ordinal = function () {
        var _domain = [];
        var _range = [];
        var _rangeBand = 0;
        var _cache = {};
        var _isRangePoints = false;

        function func(t) {
            var key = "" + t;
            if (typeof _cache[key] != 'undefined') {
                return _cache[key];
            }

            var index = -1;
            for (var i = 0; i < _domain.length; i++) {
                if (typeof t == 'string' && _domain[i] === t) {
                    index = i;
                    break;
                }
            }

            if (index > -1) {
                _cache[key] = _range[index];
                return _range[index];
            } else {
                if ( typeof _range[t] != 'undefined') {
                    //_domain[t] = t;               // FIXME: 이건 나중에 따로 연산해야할 듯
                    _cache[key] = _range[t];
                    return _range[t];
                }

                return null;
            }
        }

        /**
         * @method domain
         * @static
         *
         * @param values
         * @returns {*}
         */
        func.domain = function(values) {

            if ( typeof values == 'undefined') {
                return _domain;
            }

            for (var i = 0; i < values.length; i++) {
                _domain[i] = values[i];
            }

            return this;
        }

        func.range = function(values) {
            if ( typeof values == 'undefined') {
                return _range;
            }

            for (var i = 0; i < values.length; i++) {
                _range[i] = values[i];
            }

            return this;
        }

        func.rangePoints = function(interval, padding) {
            padding = padding || 0;

            var step = _domain.length;
            var unit = (interval[1] - interval[0] - padding) / step;

            var range = [];
            for (var i = 0; i < _domain.length; i++) {
                if (i == 0) {
                    range[i] = interval[0] + padding / 2 + unit / 2;
                } else {
                    range[i] = range[i - 1] + unit;
                }
            }

            _range = range;
            _rangeBand = unit;
            _isRangePoints = true;

            return func;
        }

        func.rangeBands = function(interval, padding, outerPadding) {
            padding = padding || 0;
            outerPadding = outerPadding || 0;

            var count = _domain.length;
            var step = count - 1;
            var band = (interval[1] - interval[0]) / step;

            var range = [];
            for (var i = 0; i < _domain.length; i++) {
                if (i == 0) {
                    range[i] = interval[0];
                } else {
                    range[i] = band + range[i - 1];
                }
            }

            _rangeBand = band;
            _range = range;
            _isRangePoints = false;

            return func;
        }

        func.rangeBand = function() {
            return _rangeBand;
        }

        func.invert = function(x) {
            var min = Math.min(_range[0], _range[1]);

            if (_isRangePoints) {
                min -= _rangeBand/2;

                var tempX = x;
                if (tempX < min) {
                    tempX = min;
                }
                var result = Math.abs(tempX - min) / _rangeBand ;
                return Math.floor(result);
            } else {
                var result = Math.abs(x - min) / _rangeBand ;
                return Math.ceil(result);
            }


        }

        return func;

    }

    return ordinal;
});

/***/ }),
/* 18 */
/***/ (function(module, exports) {

jui.define("util.scale.time", [ "util.math", "util.time", "util.scale.linear" ], function(math, _time, linear) {

    /**
     * @class util.scale.time
     * Scale for the time
     *
     * @singleton
     * @requires util.math
     * @requires util.time
     * @requires util.scale.linear
     */
    var time = function () {

        var _domain = [];
        var _rangeBand;
        var func = linear();
        var df = func.domain;

        func.domain = function (domain) {
            if (!arguments.length)
                return df.call(func);

            for (var i = 0; i < domain.length; i++) {
                _domain[i] = +domain[i];
            }

            return df.call(func, _domain);
        }

        func.min = function () {
            return Math.min(_domain[0], _domain[_domain.length - 1]);
        }

        func.max = function () {
            return Math.max(_domain[0], _domain[_domain.length - 1]);
        }

        func.rate = function (value, max) {
            return func(func.max() * (value / max));
        }

        func.ticks = function (type, interval) {
            var start = _domain[0];
            var end = _domain[1];

            var times = [];
            while (start < end) {
                times.push(new Date(+start));

                start = _time.add(start, type, interval);

            }

            times.push(new Date(+start));

            var first = func(times[1]);
            var second = func(times[2]);

            _rangeBand = second - first;

            return times;

        }

        func.realTicks = function (type, interval) {
            var start = _domain[0];
            var end = _domain[1];

            var times = [];
            var date = new Date(+start)
            var realStart = null;

            if (type == _time.years) {
                realStart = new Date(date.getFullYear(), 0, 1);
            } else if (type == _time.months) {
                realStart = new Date(date.getFullYear(), date.getMonth(), 1);
            } else if (type == _time.days || type == _time.weeks) {
                realStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            } else if (type == _time.hours) {
                realStart = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), 0, 0, 0);
            } else if (type == _time.minutes) {
                realStart = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), 0, 0);
            } else if (type == _time.seconds) {
                realStart = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), 0);
            } else if (type == _time.milliseconds) {
                realStart = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());

            }
            realStart = _time.add(realStart, type, interval);

            while (+realStart < +end) {
                times.push(new Date(+realStart));
                realStart = _time.add(realStart, type, interval);
            }

            var first = func(times[1]);
            var second = func(times[2]);

            _rangeBand = second - first;

            return times;
        }

        func.rangeBand = function () {
            return _rangeBand;
        }

        func.invert = function (y) {
            var f = linear().domain(func.range()).range(func.domain());
            return new Date(f(y));
        }

        return func;

    };

    return time;
});

/***/ }),
/* 19 */
/***/ (function(module, exports) {

jui.redefine("util.scale", [ "util.math", "util.time" ], function(math, _time) {

	/**
	 * scale utility
	 * @class util.scale
	 * @singleton
	 */
	var self = {

		/**
		 * 원형 좌표에 대한 scale
		 *
		 */
		circle : function() {// 원형 radar

			var that = this;

			var _domain = [];
			var _range = [];
			var _rangeBand = 0;

			function func(t) {

			}


			func.domain = function(values) {

				if ( typeof values == 'undefined') {
					return _domain;
				}

				for (var i = 0; i < values.length; i++) {
					_domain[i] = values[i];
				}

				return this;
			}

			func.range = function(values) {

				if ( typeof values == 'undefined') {
					return _range;
				}

				for (var i = 0; i < values.length; i++) {
					_range[i] = values[i];
				}

				return this;
			}

			func.rangePoints = function(interval, padding) {

				padding = padding || 0;

				var step = _domain.length;
				var unit = (interval[1] - interval[0] - padding) / step;

				var range = [];
				for (var i = 0; i < _domain.length; i++) {
					if (i == 0) {
						range[i] = interval[0] + padding / 2 + unit / 2;
					} else {
						range[i] = range[i - 1] + unit;
					}
				}

				_range = range;
				_rangeBand = unit;

				return func;
			}

			func.rangeBands = function(interval, padding, outerPadding) {

				padding = padding || 0;
				outerPadding = outerPadding || 0;

				var count = _domain.length;
				var step = count - 1;
				var band = (interval[1] - interval[0]) / step;

				var range = [];
				for (var i = 0; i < _domain.length; i++) {
					if (i == 0) {
						range[i] = interval[0];
					} else {
						range[i] = band + range[i - 1];
					}
				}

				_rangeBand = band;
				_range = range;

				return func;
			}

			func.rangeBand = function() {
				return _rangeBand;
			}

			return func;

		},

		/**
		 *
		 * 순서를 가지는 리스트에 대한 scale
		 *
		 */
		ordinal : function() {// 순서
			var that = this;

			var _domain = [];
			var _range = [];
			var _rangeBand = 0;
			var _cache = {};

			function func(t) {

				var key = "" + t;
				if (typeof _cache[key] != 'undefined') {
					return _cache[key];
				}

				var index = -1;
				for (var i = 0; i < _domain.length; i++) {
					if (typeof t == 'string' && _domain[i] === t) {
						index = i;
						break;
					}
				}

				if (index > -1) {
					_cache[key] = _range[index];
					return _range[index];
				} else {
					if ( typeof _range[t] != 'undefined') {
						_domain[t] = t;
						_cache[key] = _range[t];
						return _range[t];
					}

					return null;
				}

			}


			func.domain = function(values) {

				if ( typeof values == 'undefined') {
					return _domain;
				}

				for (var i = 0; i < values.length; i++) {
					_domain[i] = values[i];
				}

				return this;
			}

			func.range = function(values) {

				if ( typeof values == 'undefined') {
					return _range;
				}

				for (var i = 0; i < values.length; i++) {
					_range[i] = values[i];
				}

				return this;
			}

			func.rangePoints = function(interval, padding) {

				padding = padding || 0;

				var step = _domain.length;
				var unit = (interval[1] - interval[0] - padding) / step;

				var range = [];
				for (var i = 0; i < _domain.length; i++) {
					if (i == 0) {
						range[i] = interval[0] + padding / 2 + unit / 2;
					} else {
						range[i] = range[i - 1] + unit;
					}
				}

				_range = range;
				_rangeBand = unit;

				return func;
			}

			func.rangeBands = function(interval, padding, outerPadding) {

				padding = padding || 0;
				outerPadding = outerPadding || 0;

				var count = _domain.length;
				var step = count - 1;
				var band = (interval[1] - interval[0]) / step;

				var range = [];
				for (var i = 0; i < _domain.length; i++) {
					if (i == 0) {
						range[i] = interval[0];
					} else {
						range[i] = band + range[i - 1];
					}
				}

				_rangeBand = band;
				_range = range;

				return func;
			}

			func.rangeBand = function() {
				return _rangeBand;
			}

			func.invert = function(x) {
				return Math.ceil(x / _rangeBand);
			}

			return func;
		},

		/**
		 * 시간에 대한 scale
		 *
		 */
		time : function() {// 시간

			var that = this;

			var _domain = [];
			var _range = [];
			var _rangeBand;

			var func = self.linear();

			var df = func.domain;

			func.domain = function(domain) {

				if (!arguments.length)
					return df.call(func);

				for (var i = 0; i < domain.length; i++) {
					_domain[i] = +domain[i];
				}

				return df.call(func, _domain);
			}

			func.min = function() {
				return Math.min(_domain[0], _domain[_domain.length - 1]);
			}

			func.max = function() {
				return Math.max(_domain[0], _domain[_domain.length - 1]);
			}

			func.rate = function(value, max) {
				return func(func.max() * (value / max));
			}

			func.ticks = function(type, interval) {
				var start = _domain[0];
				var end = _domain[1];

				var times = [];
				while (start < end) {
					times.push(new Date(+start));

					start = _time.add(start, type, interval);

				}

				times.push(new Date(+start));

				var first = func(times[1]);
				var second = func(times[2]);

				_rangeBand = second - first;

				return times;

			}

			func.realTicks = function(type, interval) {
				var start = _domain[0];
				var end = _domain[1];

				var times = [];
				var date = new Date(+start)
				var realStart = null;

				if (type == _time.years) {
					realStart = new Date(date.getFullYear(), 0, 1);
				} else if (type == _time.months) {
					realStart = new Date(date.getFullYear(), date.getMonth(), 1);
				} else if (type == _time.days || type == _time.weeks) {
					realStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
				} else if (type == _time.hours) {
					realStart = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), 0, 0, 0);
				} else if (type == _time.minutes) {
					realStart = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), 0, 0);
				} else if (type == _time.seconds) {
					realStart = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), 0);
				} else if (type == _time.milliseconds) {
					realStart = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());

				}
				realStart = _time.add(realStart, type, interval);

				while (+realStart < +end) {
					times.push(new Date(+realStart));
					realStart = _time.add(realStart, type, interval);
				}

				var first = func(times[1]);
				var second = func(times[2]);

				_rangeBand = second - first;

				return times;
			}

			func.rangeBand = function() {
				return _rangeBand;
			}

			func.invert = function(y) {
				var f = self.linear().domain(func.range()).range(func.domain());

				return new Date(f(y));
			}

			return func;
		},

		/**
		 * log scale
		 *
		 * var log = _.scale.log(10).domain([0, 1000000]).range([0, 300]);
		 *
		 * log(0) == 0
		 * log.ticks(4) == [0, 100, 10000, 1000000]
		 *
		 * @param base
		 */
		log : function(base) {
			var that = this;

			var _base = base || 10;

			var func = self.linear();
			var _domain = [];
			var _domainMax = null;
			var _domainMin = null;

			function log(value) {

				if (value < 0) {
					return -(Math.log(Math.abs(value)) / Math.log(_base));
				} else if (value > 0) {
					return Math.log(value) / Math.log(_base);
				}

				return 0;
			}

			function pow(value) {
				if (value < 0) {
					return - Math.pow(_base, Math.abs(value));
				} else if (value > 0) {
					return Math.pow(_base, value);
				}

				return 0;
			}

			function checkMax(value) {
				return Math.pow(_base, (value+"").length-1) < value;
			}

			function getNextMax(value) {
				return Math.pow(_base, (value+"").length);
			}

			var newFunc = function(x) {

				var value = x;

				if (x > _domainMax) {
					value = _domainMax;
				} else if (x < _domainMin) {
					value = _domainMin;
				}

				return func(log(value));
			}

			$.extend(newFunc, func);

			newFunc.log = function() {
				var newDomain = [];
				for (var i = 0; i < _domain.length; i++) {
					newDomain[i] = log(_domain[i]);
				}

				return newDomain;
			}

			newFunc.domain = function(values) {

				if (!arguments.length) {
					return _domain;
				}

				for (var i = 0; i < values.length; i++) {
					_domain[i] = values[i];
				}

				_domainMax = Math.max.apply(Math, _domain);
				_domainMin = Math.min.apply(Math, _domain);

				if (checkMax(_domainMax)) {
					_domain[1] = _domainMax = getNextMax(_domainMax);
				}

				if (checkMax(Math.abs(_domainMin))) {

					var value = getNextMax(Math.abs(_domainMin));
					_domain[0] = _domainMin = _domainMin < 0  ? -value : value ;
				}

				func.domain(newFunc.log());

				return newFunc;
			}

			newFunc.base = function(base) {
				func.domain(newFunc.log());

				return newFunc;
			}

			newFunc.invert = function(y) {
				return pow(func.invert(y));
			}


			newFunc.ticks = function(count, isNice, intNumber) {

				var arr = func.ticks(count, isNice, intNumber || 100000000000000000000, true);

				if (arr[arr.length-1] < func.max()) {
					arr.push(func.max());
				}

				var newArr = [];
				for(var i = 0, len = arr.length; i < len; i++) {
					newArr[i] = pow(arr[i]);
				}

				return newArr;
			}

			return newFunc;
		},

		/**
		 * 범위에 대한 scale
		 *
		 */
		linear : function() {// 선형

			var that = this;

			var _domain = [0, 1];
			var _range = [0, 1];
			var _isRound = false;
			var _isClamp = false;
			var _cache = {};

			var roundFunction = null;
			var numberFunction = null;

			var domainMin = null;
			var domainMax = null;

			var rangeMin = null;
			var rangeMax = null;

			var distDomain = null;
			var distRange = null;
			var rate = 0;

			var callFunction = null;
			var _rangeBand = null;

			function func(x) {

				if (domainMax < x) {
					if (_isClamp) {
						return func(domainMax);
					}

					return _range[0] + Math.abs(x - _domain[0]) * rate;
				} else if (domainMin > x) {
					if (_isClamp) {
						return func(domainMin);
					}

					return _range[0] - Math.abs(x - _domain[0]) * rate;
				} else {
					var pos = (x - _domain[0]) / (distDomain);

					return callFunction(pos);
				}

			}

			func.cache = function() {
				return _cache;
			}

			func.min = function() {
				return Math.min.apply(Math, _domain);
			}

			func.max = function() {
				return Math.max.apply(Math, _domain);
			}

			func.rangeMin = function() {
				return Math.min.apply(Math, _range);
			}

			func.rangeMax = function() {
				return Math.max.apply(Math, _range);
			}

			func.rate = function(value, max) {
				return func(func.max() * (value / max));
			}

			func.clamp = function(isClamp) {
				_isClamp = isClamp || false;
			}

			func.domain = function(values) {

				if (!arguments.length) {
					return _domain;
				}

				for (var i = 0; i < values.length; i++) {
					_domain[i] = values[i];
				}

				domainMin = func.min();
				domainMax = func.max();

				distDomain = _domain[1] - _domain[0];

				return this;
			}

			func.range = function(values) {

				if (!arguments.length) {
					return _range;
				}

				for (var i = 0; i < values.length; i++) {
					_range[i] = values[i];
				}

				roundFunction = math.interpolateRound(_range[0], _range[1]);
				numberFunction = math.interpolateNumber(_range[0], _range[1]);

				rangeMin = func.rangeMin();
				rangeMax = func.rangeMax();

				distRange = Math.abs(rangeMax - rangeMin);

				rate = distRange / distDomain;

				callFunction = _isRound ? roundFunction : numberFunction;

				return this;
			}

			func.rangeRound = function(values) {
				_isRound = true;

				return func.range(values);
			}

			func.rangeBand = function() {
				return _rangeBand;
			}

			func.invert = function(y) {

				var f = self.linear().domain(_range).range(_domain);
				return f(y);
			}

			func.ticks = function(count, isNice, /** @deprecated */intNumber, reverse) {

				//intNumber = intNumber || 10000;
				reverse = reverse || false;
				var max = func.max();

				if (_domain[0] == 0 && _domain[1] == 0) {
					return [];
				}

				var obj = math.nice(_domain[0], _domain[1], count || 10, isNice || false);

				var arr = [];

				var start = (reverse ? obj.max : obj.min);
				var end = (reverse ? obj.min : obj.max);
				var unit = obj.spacing;
				var fixed = math.fixed(unit);

				while ((reverse ? end <= start : start <= end)) {
					arr.push(start/* / intNumber*/);

					if (reverse) {
						start = fixed.minus(start, unit);
					} else {
						start = fixed.plus(start, unit);
					}

				}

				if (reverse) {
					if (arr[0] != max) {
						arr.unshift(max);
					}

					for(var i = 0, len = arr.length; i < len; i++) {
						arr[i] = Math.abs(arr[i] - max);
					}
					//arr.reverse();

				} else {
					if (arr[arr.length - 1] != end && start > end) {
						arr.push(end);
					}

					if (_domain[0] > _domain[1]) {
						arr.reverse();
					}
				}

				var first = func(arr[0]);
				var second = func(arr[1]);

				_rangeBand = Math.abs(second - first);

				return arr;
			}

			return func;
		}
	}

	return self;
}, null, true);


/***/ }),
/* 20 */
/***/ (function(module, exports) {

jui.define("chart.vector", [], function() {
    var Vector = function(x, y, z) {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;

        this.add = function(numberOrVector) {
            if(numberOrVector instanceof Vector) {
                return new Vector(this.x + numberOrVector.x, this.y + numberOrVector.y, this.z + numberOrVector.z);
            }

            return new Vector(this.x + numberOrVector, this.y + numberOrVector, this.z + numberOrVector);
        }

        this.subtract = function(numberOrVector) {
            if(numberOrVector instanceof Vector) {
                return new Vector(this.x - numberOrVector.x, this.y - numberOrVector.y, this.z - numberOrVector.z);
            }

            return new Vector(this.x - numberOrVector, this.y - numberOrVector, this.z - numberOrVector);
        }

        this.multiply = function(numberOrVector) {
            if(numberOrVector instanceof Vector) {
                return new Vector(this.x * numberOrVector.x, this.y * numberOrVector.y, this.z * numberOrVector.z);
            }

            return new Vector(this.x * numberOrVector, this.y * numberOrVector, this.z * numberOrVector);
        }

        this.dotProduct = function(vector) {
            var value = this.x * vector.x + this.y * vector.y + this.z * vector.z;
            return Math.acos(value / (this.getMagnitude() * vector.getMagnitude()))
        }

        this.crossProduct = function(vector) {
            return new Vector(
                this.y * vector.z - this.z * vector.y,
                this.z * vector.x - this.x * vector.z,
                this.x * vector.y - this.y * vector.x
            );
        }

        this.normalize = function() {
            var mag = this.getMagnitude();

            this.x /= mag;
            this.y /= mag;
            this.z /= mag;
        }

        this.getMagnitude = function() {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        }
    }

    return Vector;
});

/***/ }),
/* 21 */
/***/ (function(module, exports) {

jui.define("chart.draw", [ "util.base" ], function(_) {
    /**
     * @class chart.draw
     * @alias Draw
     * @requires util.base
     * @requires jquery
     *
     */
	var Draw = function() {

        /**
         * @method drawBefore
         *
         * run before draw object
         *
         */

        /**
         * @method draw
         *
         * draw object
         *
         * @return {Object}
         *
         */

        /**
         * @method drawAfter
         *
         * run after draw object
         */

        /**
         * @method drawAnimate
         *
         * implements animate code after draw object
         */

		/**
		 * @method render
         *
         * 모든 Draw 객체는  render 함수를 통해서 그려진다.
		 * 
		 */
		this.render = function() {
            if(!_.typeCheck("function", this.draw)) {
                throw new Error("JUI_CRITICAL_ERR: 'draw' method must be implemented");
            }

            // Call drawBefore method
            if(_.typeCheck("function", this.drawBefore)) {
                this.drawBefore();
            }

            // Call draw method (All)
			var obj = this.draw();

            // Call drawAnimate method
            if(_.typeCheck("function", this.drawAnimate)) {
                var draw = this.grid || this.brush || this.widget || this.map;

                if(draw.animate !== false) {
                    this.drawAnimate(obj);
                }
            }

            // Call drawAfter method
            if(_.typeCheck("function", this.drawAfter)) {
                this.drawAfter(obj);
            }

            return obj;
		}

        /**
         * @method format
         * Get a default format callback of draw object.
         *
         * @return {Function}
         */
        this.format = function() {
            var draw = this.grid || this.brush || this.widget,
                callback = draw.format || this.chart.format;

            return callback.apply(this.chart, arguments);
        }

        /**
         * @method balloonPoints
         *
         * 말풍선 그리그 메소드
         *
         * @param {String} type
         * @param {Number} w
         * @param {Number} h
         * @param {Number} anchor
         * @return {String}
         */
        this.balloonPoints = function(type, w, h, anchor) {
            var points = [];

            if(type == "top") {
                points.push([ 0, 0 ].join(","));
                points.push([ w, 0 ].join(","));
                points.push([ w, h ].join(","));
                points.push([ (w / 2) + (anchor / 2), h ].join(","));
                points.push([ (w / 2), h + anchor ].join(","));
                points.push([ (w / 2) - (anchor / 2), h ].join(","))
                points.push([ 0, h ].join(","));
                points.push([ 0, 0 ].join(","));
            } else if(type == "bottom") {
                points.push([ 0, anchor ].join(","));
                points.push([ (w / 2) - (anchor / 2), anchor ].join(","));
                points.push([ (w / 2), 0 ].join(","));
                points.push([ (w / 2) + (anchor / 2), anchor ].join(","));
                points.push([ w, anchor ].join(","));
                points.push([ w, anchor + h ].join(","))
                points.push([ 0, anchor + h ].join(","));
                points.push([ 0, anchor ].join(","));
            } else if(type == "left") {
                points.push([ 0, 0 ].join(","));
                points.push([ w, 0 ].join(","));
                points.push([ w, (h / 2) - (anchor / 2) ].join(","));
                points.push([ w + anchor, (h / 2) ].join(","));
                points.push([ w, (h / 2) + (anchor / 2) ].join(","));
                points.push([ w, h ].join(","));
                points.push([ 0, h ].join(","));
                points.push([ 0, 0 ].join(","));
            } else if(type == "right") {
                points.push([ 0, 0 ].join(","));
                points.push([ w, 0 ].join(","));
                points.push([ w, h ].join(","));
                points.push([ 0, h ].join(","));
                points.push([ 0, (h / 2) + (anchor / 2) ].join(","));
                points.push([ 0 - anchor, (h / 2) ].join(","));
                points.push([ 0, (h / 2) - (anchor / 2) ].join(","));
                points.push([ 0, 0 ].join(","));
            } else {
                points.push([ 0, 0 ].join(","));
                points.push([ w, 0 ].join(","));
                points.push([ w, h ].join(","));
                points.push([ 0, h ].join(","));
                points.push([ 0, 0 ].join(","));
            }

            return points.join(" ");
        }

        /**
         * @method on
         *
         * chart.on() 을 쉽게 사용 할 수 있게 해주는 유틸리티 함수
         *
         * @param {String} type event name
         * @param {Function} callback
         * @return {*}
         */
        this.on = function(type, callback) {
            var self = this;

            return this.chart.on(type, function() {
                if(_.startsWith(type, "axis.") && _.typeCheck("integer", self.axis.index)) {
                    var axis = self.chart.axis(self.axis.index),
                        e = arguments[0];

                    if (_.typeCheck("object", axis)) {
                        if (arguments[1] == self.axis.index) {
                            callback.apply(self, [ e ]);
                        }
                    }
                } else {
                    callback.apply(self, arguments);
                }
            }, "render");
        }

        this.calculate3d = function() {
            var w = this.axis.area("width"),
                h = this.axis.area("height"),
                x = this.axis.area("x"),
                y = this.axis.area("y"),
                d = this.axis.depth,
                r = this.axis.degree,
                p = this.axis.perspective,
                list = arguments;

            if(!_.typeCheck("integer", r.x)) r.x = 0;
            if(!_.typeCheck("integer", r.y)) r.y = 0;
            if(!_.typeCheck("integer", r.z)) r.z = 0;

            for(var i = 0; i < list.length; i++) {
                list[i].perspective = p;
                list[i].rotate(Math.max(w, h, d), r, x + (w/2), y + (h/2), d/2);
            }
        }
	}

    Draw.setup = function() {
        return {
            /** @cfg {String} [type=null] Specifies the type of a widget/brush/grid to be added.*/
            type: null,
            /** @cfg {Boolean} [animate=false] Run the animation effect.*/
            animate: false
        }
    }

	return Draw;
});


/***/ }),
/* 22 */
/***/ (function(module, exports) {

jui.define("chart.axis", [ "util.base" ], function(_) {

    /**
     * @class chart.axis
     *
     * Axis 를 관리하는 클래스
     *
     * * x 축
     * * y 축
     * * area { x, y, width, height}
     * * data Axis 에 적용될 데이타
     *
     */
    var Axis = function(chart, originAxis, cloneAxis) {
        var self = this,
            map = null;
        var _area = {},
            _padding = {},
            _clipId = "",
            _clipPath = null,
            _clipRectId = "",
            _clipRect = null;

        function calculatePanel(a, padding) {
            a.x = getRate(a.x, chart.area('width'));
            a.y = getRate(a.y, chart.area('height'));
            a.width = getRate(a.width, chart.area('width'));
            a.height = getRate(a.height, chart.area('height'));

            a.x2 = a.x + a.width;
            a.y2 = a.y + a.height;
            
            // 패딩 개념 추가 
            a.x += padding.left || 0;
            a.y += padding.top || 0;
            
            a.x2 -= padding.right || 0;
            a.y2 -= padding.bottom || 0;
            
            a.width = a.x2 - a.x;
            a.height = a.y2 - a.y;

            return a;
        }

        function getRate(value, max) {
            if(_.typeCheck("string", value) && value.indexOf("%") > -1) {
                return max * (parseFloat(value.replace("%", "")) /100);
            }

            return value;
        }

        function drawGridType(axis, k) {
            if((k == "x" || k == "y" || k == "z") && !_.typeCheck("object", axis[k]))
                return null;

            // 축 위치 설정
            axis[k] = axis[k]  || {};

            if (k == "x") {
                axis[k].orient = axis[k].orient == "top" ? "top" : "bottom";
            } else if (k == "y") {
                axis[k].orient = axis[k].orient == "right" ? "right" : "left";
            } else if (k == "z") {
                axis[k].orient = "center";
            } else if (k == "c") {
                axis[k].type = axis[k].type || "panel";
                axis[k].orient = "custom";
            }

            axis[k].type = axis[k].type || "block";
            var Grid = jui.include("chart.grid." + axis[k].type);

            // 그리드 기본 옵션과 사용자 옵션을 합침
            jui.defineOptions(Grid, axis[k]);

            // 엑시스 기본 프로퍼티 정의
            var obj = new Grid(chart, axis, axis[k]);
            obj.chart = chart;
            obj.axis = axis;
            obj.grid = axis[k];
            obj.svg = chart.svg;

            var elem = obj.render();

            // 그리드 별 위치 선정하기 (z축이 없을 때)
            if(!self.isFull3D()) {
                if (axis[k].orient == "left") {
                    elem.root.translate(chart.area("x") + self.area("x") - axis[k].dist, chart.area("y"));
                } else if (axis[k].orient == "right") {
                    elem.root.translate(chart.area("x") + self.area("x2") + axis[k].dist, chart.area("y"));
                } else if (axis[k].orient == "bottom") {
                    elem.root.translate(chart.area("x"), chart.area("y") + self.area("y2") + axis[k].dist);
                } else if (axis[k].orient == "top") {
                    elem.root.translate(chart.area("x"), chart.area("y") + self.area("y") - axis[k].dist);
                } else {
                    if (elem.root) elem.root.translate(chart.area("x") + self.area("x"), chart.area("y") + self.area("y"));
                }
            }

            elem.scale.type = axis[k].type;
            elem.scale.root = elem.root;

            return elem.scale;
        }

        function drawMapType(axis, k) {
            if(k == "map" && !_.typeCheck("object", axis[k])) return null;

            // 축 위치 설정
            axis[k] = axis[k]  || {};

            var Map = jui.include("chart.map");

            // 맵 기본 옵션과 사용자 옵션을 합침
            jui.defineOptions(Map, axis[k]);

            // 맵 객체는 한번만 생성함
            if(map == null) {
                map = new Map(chart, axis, axis[k]);
            }

            // 맵 기본 프로퍼티 설정
            map.chart = chart;
            map.axis = axis;
            map.map = axis[k];
            map.svg = chart.svg;

            // 그리드 별 위치 선정하기
            var elem = map.render();
            elem.root.translate(chart.area("x") + self.area("x"), chart.area("y") + self.area("y"));
            elem.scale.type = axis[k].type;
            elem.scale.root = elem.root;
            
            return elem.scale;
        }
        
        function setScreen(pNo) {
            var dataList = self.origin,
                limit = self.buffer,
                maxPage = Math.ceil(dataList.length / limit);

            // 최소 & 최대 페이지 설정
            if(pNo < 1) {
                self.page = 1;
            } else {
                self.page = (pNo > maxPage) ? maxPage : pNo;
            }

            self.start = (self.page - 1) * limit, self.end = self.start + limit;

            // 마지막 페이지 처리
            if(self.end > dataList.length) {
                self.start = dataList.length - limit;
                self.end = dataList.length;
            }

            if(self.end <= dataList.length) {
                self.start = (self.start < 0) ? 0 : self.start;
                self.data = dataList.slice(self.start, self.end);

                if(dataList.length > 0) self.page++;
            }
        }

        function setZoom(start, end) {
            var dataList = self.origin;

            self.end = (end > dataList.length) ? dataList.length : end;
            self.start = (start < 0) ? 0 : start;
            self.data = dataList.slice(self.start, self.end);
        }

        function createClipPath() {
            // clippath with x, y
            if (_clipPath) {
                _clipPath.remove();
                _clipPath = null;
            }

            _clipId = _.createId("clip-id-");

            _clipPath = chart.svg.clipPath({
                id: _clipId
            }, function() {
                chart.svg.rect({
                    x: _area.x,
                    y: _area.y,
                    width: _area.width,
                    height: _area.height
                });
            });
            chart.appendDefs(_clipPath);

            // clippath without x, y
            if (_clipRect) {
                _clipRect.remove();
                _clipRect = null;
            }

            _clipRectId = _.createId("clip-rect-id-");

            _clipRect = chart.svg.clipPath({
                id: _clipRectId
            }, function() {
                chart.svg.rect({
                    x: 0,
                    y: 0,
                    width: _area.width,
                    height: _area.height
                });
            });

            chart.appendDefs(_clipRect);
        }

        function checkAxisPoint(e) {
            var top = self.area("y"),
                left = self.area("x");

            if((e.chartY > top && e.chartY < top + self.area("height")) &&
                (e.chartX > left && e.chartX < left + self.area("width"))) {

                e.axisX = e.chartX - left;
                e.axisY = e.chartY - top;

                return true;
            }

            return false;
        }

        function setAxisMouseEvent() {
            var isMouseOver = false,
                index = cloneAxis.index;

            chart.on("chart.mousemove", function(e) {
                if(checkAxisPoint(e)) {
                    if(!isMouseOver) {
                        chart.emit("axis.mouseover", [ e, index ]);
                        isMouseOver = true;
                    }
                } else {
                    if(isMouseOver) {
                        chart.emit("axis.mouseout", [ e, index ]);
                        isMouseOver = false;
                    }
                }

                if(checkAxisPoint(e)) {
                    chart.emit("axis.mousemove", [e, index]);
                }
            });

            chart.on("bg.mousemove", function(e) {
                if(!checkAxisPoint(e) && isMouseOver) {
                    chart.emit("axis.mouseout", [ e, index ]);
                    isMouseOver = false;
                }
            });

            chart.on("chart.mousedown", function(e) {
                if(!checkAxisPoint(e)) return;
                chart.emit("axis.mousedown", [ e, index ]);
            });

            chart.on("chart.mouseup", function(e) {
                if(!checkAxisPoint(e)) return;
                chart.emit("axis.mouseup", [ e, index ]);
            });

            chart.on("chart.click", function(e) {
                if(!checkAxisPoint(e)) return;
                chart.emit("axis.click", [ e, index ]);
            });

            chart.on("chart.dbclick", function(e) {
                if(!checkAxisPoint(e)) return;
                chart.emit("axis.dbclick", [ e, index ]);
            });

            chart.on("chart.rclick", function(e) {
                if(!checkAxisPoint(e)) return;
                chart.emit("axis.rclick", [ e, index ]);
            });

            chart.on("chart.mousewheel", function(e) {
                if(!checkAxisPoint(e)) return;
                chart.emit("axis.mousewheel", [ e, index ]);
            });
        }

        function drawAxisBackground() {
            var bw = chart.theme("axisBorderWidth"),
                lr = _padding.left + _padding.right,
                tb = _padding.top + _padding.bottom;

            var bg = chart.svg.rect({
                rx: chart.theme("axisBorderRadius"),
                ry: chart.theme("axisBorderRadius"),
                fill: chart.theme("axisBackgroundColor"),
                "fill-opacity": chart.theme("axisBackgroundOpacity"),
                stroke: chart.theme("axisBorderColor"),
                "stroke-width": bw,
                width: _area.width + lr - bw,
                height: _area.height + tb - bw,
                x: _area.x - _padding.left,
                y: _area.y - _padding.top
            });

            bg.translate(chart.area("x"), chart.area("y"));

            return bg;
        }

        function init() {
            _.extend(self, {
                data : cloneAxis.data,
                origin : cloneAxis.origin,
                buffer : cloneAxis.buffer,
                shift : cloneAxis.shift,
                index : cloneAxis.index,
                page : cloneAxis.page,
                start : cloneAxis.start,
                end : cloneAxis.end,
                degree : cloneAxis.degree,
                depth : cloneAxis.depth,
                perspective : cloneAxis.perspective
            });

            // 원본 데이터 설정
            self.origin = self.data;

            // 페이지 초기화
            if(self.start > 0 || self.end > 0) {
                setZoom(self.start, self.end);
            } else {
                setScreen(self.page);
            }

            // 엑시스 이벤트 설정
            setAxisMouseEvent();

            // Grid 및 Area 설정
            self.reload(cloneAxis);
        }
        
        /**
         * @method getValue
         *
         * 특정 필드의 값을 맵핑해서 가지고 온다.
         *
         * @param {Object} data row data
         * @param {String} fieldString 필드 이름
         * @param {String/Number/Boolean/Object} [defaultValue=''] 기본값
         * @return {Mixed}
         */
        this.getValue = function(data, fieldString, defaultValue) {
            var value = data[cloneAxis.keymap[fieldString]];
            if (!_.typeCheck("undefined", value)) {
                return value;
            }

            value = data[fieldString];
            if (!_.typeCheck("undefined", value)) {
                return value;
            }
            
            return defaultValue;
        }

        /**
         * @method reload
         * 
         * Axis 의 x,y,z 축을 다시 생성한다. 
         * * * 
         * @param {Object} options
         */
        this.reload = function(options) {
            var area = chart.area();

            _.extend(this, {
                x : options.x,
                y : options.y,
                z : options.z,
                c : options.c,
                map : options.map
            });

            // 패딩 옵션 설정
            if(_.typeCheck("integer", options.padding)) {
                _padding = { left: options.padding, right: options.padding, bottom: options.padding, top: options.padding };
            } else {
                _padding = options.padding;
            }

            _area = calculatePanel(_.extend(options.area, {
                x: 0, y: 0 , width: area.width, height: area.height
            }, true), _padding);

            // 클립 패스 설정
            createClipPath();

            this.root = drawAxisBackground();
            this.x = drawGridType(this, "x");
            this.y = drawGridType(this, "y");
            this.z = drawGridType(this, "z");
            this.c = drawGridType(this, "c");
            this.map = drawMapType(this, "map");

            this.buffer = options.buffer;
            this.shift = options.shift;
            this.index = options.index;
            this.page = options.page;
            this.start = options.start;
            this.end = options.end;
            this.degree = options.degree;
            this.depth = options.depth;
            this.perspective = options.perspective;
        }

        /**
         * @method area
         *
         * Axis 의 표시 영역을 리턴한다. 
         *  
         * @param {"x"/"y"/"width"/'height"/null} key  area's key
         * @return {Number/Object} key 가 있으면 해당 key 의 value 를 리턴한다. 없으면 전체 area 객체를 리턴한다.
         */
        this.area = function(key) {
            return _.typeCheck("undefined", _area[key]) ? _area : _area[key];
        }

        /**
         * Gets the top, bottom, left and right margin values.
         *
         * @param {"top"/"left"/"bottom"/"right"} key
         * @return {Number/Object}
         */
        this.padding = function(key) {
            return _.typeCheck("undefined", _padding[key]) ? _padding : _padding[key];
        }

        /**
         * @method get
         *
         * Axis 의 옵션 정보를 리턴한다.
         *
         * @param key
         */
        this.get = function(type) {
            var obj = {
                area: _area,
                padding: _padding,
                clipId: _clipId,
                clipRectId : _clipRectId
            };

            return obj[type] || cloneAxis[type];
        }

        /**
         * @method set
         *
         * axis의 주요 프로퍼티를 업데이트한다.
         *
         * @param {"x"/"y"/"c"/"map"/"degree"/"padding"} type
         * @param {Object} grid
         */
        this.set = function(type, value, isReset) {
            if(_.typeCheck("object", value)) {
                if (isReset === true) {
                    originAxis[type] = _.deepClone(value);
                    cloneAxis[type] = _.deepClone(value);
                } else {
                    _.extend(originAxis[type], value);
                    _.extend(cloneAxis[type], value);
                }
            } else {
                originAxis[type] = value;
                cloneAxis[type] = value;
            }

            if(chart.isRender()) chart.render();
        }

        /**
         * @deprecated
         * @method updateGrid
         *
         * grid 정보를 업데이트 한다.
         *
         * @param {"x"/"y"/"c"/"map"} type
         * @param {Object} grid
         */
        this.updateGrid = this.set;

        /**
         * @method update 
         * 
         * data 를 업데이트 한다.
         *  
         * @param {Array} data
         */
        this.update = function(data) {
            this.origin = _.typeCheck("array", data) ? data : [ data ];
            this.page = 1;
            this.start = 0;
            this.end = 0;

            this.screen(1);
        }

        /**
         * @method screen 
         * 
         * 화면상에 보여줄 데이타를 페이징한다.  
         *  
         * @param {Number} pNo 페이지 번호 
         */
        this.screen = function(pNo) {
            setScreen(pNo);

            if(this.end <= this.origin.length) {
                if(chart.isRender()) chart.render();
            }
        }

        /**
         * @method next 
         * 
         */
        this.next = function() {
            var dataList = this.origin,
                limit = this.buffer,
                step = this.shift;

            this.start += step;

            var isLimit = (this.start + limit > dataList.length);

            this.end = (isLimit) ? dataList.length : this.start + limit;
            this.start = (isLimit) ? dataList.length - limit : this.start;
            this.start = (this.start < 0) ? 0 : this.start;
            this.data = dataList.slice(this.start, this.end);

            if(chart.isRender()) chart.render();
        }

        /**
         * @method prev  
         */
        this.prev = function() {
            var dataList = this.origin,
                limit = this.buffer,
                step = this.shift;

            this.start -= step;

            var isLimit = (this.start < 0);

            this.end = (isLimit) ? limit : this.start + limit;
            this.start = (isLimit) ? 0 : this.start;
            this.data = dataList.slice(this.start, this.end);

            if(chart.isRender()) chart.render();
        }

        /**
         * @method zoom 
         * 
         * 특정 인덱스의 영역으로 데이타를 다시 맞춘다.
         *
         * @param {Number} start
         * @param {Number} end
         */
        this.zoom = function(start, end) {
            if(start == end) return;

            setZoom(start, end);
            if(chart.isRender()) chart.render();
        }

        this.isFull3D = function() {
            return !_.typeCheck([ "undefined", "null" ], this.z);
        }

        init();
    }

    Axis.setup = function() {

        /** @property {chart.grid.core} [x=null] Sets a grid on the X axis (see the grid tab). */
        /** @property {chart.grid.core} [y=null] Sets a grid on the Y axis (see the grid tab). */
        /** @property {chart.grid.core} [c=null] Sets a custom grid (see the grid tab). */
        /** @property {chart.map} [map=null] Sets a chart map. */
        /** @property {Array} [data=[]] Sets the row set data which constitute a chart. */
        /** @property {Integer} [buffer=10000] Limits the number of elements shown on a chart. */
        /** @property {Integer} [shift=1] Data shift count for the 'prev' or 'next' method of the chart builder. */
        /** @property {Array} [origin=[]] [For read only] Original data initially set. */
        /** @property {Integer} [page=1] [For read only] Page number of the data currently drawn. */
        /** @property {Integer} [start=0] [For read only] Start index of the data currently drawn. */
        /** @property {Integer} [end=0] [For read only] End index of the data currently drawn. */

        return {
            /** @cfg {Integer} [extend=null]  Configures the index of an applicable grid group when intending to use already configured axis options. */
            extend: null,

            /** @cfg {chart.grid.core} [x=null] Sets a grid on the X axis (see the grid tab). */
            x: null,
            /** @cfg {chart.grid.core} [y=null]  Sets a grid on the Y axis (see the grid tab). */
            y: null,
            /** @cfg {chart.grid.core} [z=null] Sets a grid on the Z axis (see the grid tab). */
            z: null,
            /** @cfg {chart.grid.core} [c=null] Sets a grid on the C axis (see the grid tab). */
            c: null,
            /** @cfg {chart.map.core} [map=null] Sets a map on the Map axis */
            map : null,
            /** @cfg {Array} [data=[]]  Sets the row set data which constitute a chart.  */
            data: [],
            /** @cfg {Array} [origin=[]]  [Fore read only] Original data initially set. */
            origin: [],
            /** @cfg {Object} [keymap={}] grid's data key map  */
            keymap: {},
            /** @cfg {Object} [area={}]  set area(x, y, width, height) of axis */
            area: {},
            /**
             * @cfg  {Object} padding axis padding
             * @cfg  {Number} [padding.top=0] axis's top padding
             * @cfg  {Number} [padding.bottom=0] axis's bottom padding
             * @cfg  {Number} [padding.left=0] axis's left padding
             * @cfg  {Number} [padding.right=0] axis's right padding
             */
            padding : {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0
            },
            /** @cfg {Number} [buffer=10000] Limits the number of elements shown on a chart.  */
            buffer: 10000,
            /** @cfg {Number} [shift=1]  Data shift count for the 'prev' or 'next' method of the chart builder.  */
            shift: 1,

            /** @cfg {Number} [page=1]  Page number of the data currently drawn. */
            page: 1,
            /** @cfg {Number} [start=0] */
            start: 0,
            /** @cfg {Number} [end=0] */
            end: 0,
            /**
             * @cfg  {Object} Set degree of 3d chart
             * @cfg  {Number} [degree.x=0] axis's x-degree
             * @cfg  {Number} [degree.y=0] axis's y-degree
             * @cfg  {Number} [degree.z=0] axis's z-degree
             */
            degree: {
                x: 0,
                y: 0,
                z: 0
            },
            /** @cfg {Number} [depth=0]  Set depth of 3d chart  */
            depth: 0,
            /** @cfg {Number} [perspective=0.9]  Set perspective values in the 3d chart  */
            perspective: 0.9
        }
    }

    return Axis;
});


/***/ }),
/* 23 */
/***/ (function(module, exports) {

jui.define("chart.map", [ "util.base", "util.dom", "util.math", "util.svg" ], function(_, $, math, SVG) {
    /**
     * @class chart.grid.core
     * @extends chart.draw
     * @abstract
     */
    var Map = function() {
        var self = this;
        var pathData = {},
            pathGroup = null,
            pathIndex = {},
            pathScale = 1,
            pathX = 0,
            pathY = 0;

        function loadArray(data) {
            var children = [];

            for(var i = 0, len = data.length; i < len; i++) {
                if(_.typeCheck("object", data[i])) {
                    var style = {};

                    if(_.typeCheck("string", data[i].style)) {
                        style = getStyleObj(data[i].style);
                        delete data[i].style;
                    }

                    var elem = SVG.createObject({
                        type: (data[i].d != null) ? "path" : "polygon",
                        attr: data[i]
                    });

                    // Set styles
                    elem.attr(_.extend(style, {
                        fill: self.chart.theme("mapPathBackgroundColor"),
                        "fill-opacity": self.chart.theme("mapPathBackgroundOpacity"),
                        stroke: self.chart.theme("mapPathBorderColor"),
                        "stroke-width": self.chart.theme("mapPathBorderWidth"),
                        "stroke-opacity": self.chart.theme("mapPathBorderOpacity")
                    }));

                    children.push({
                        path: elem,
                        data: data[i]
                    });
                }
            }

            function getStyleObj(str) {
                var style = {},
                    list = str.split(";");

                for(var i = 0; i < list.length; i++) {
                    if(list[i].indexOf(":") != -1) {
                        var obj = list[i].split(":");

                        style[_.trim(obj[0])] = _.trim(obj[1]);
                    }
                }

                return style;
            }

            return children;
        }

        function getPathList(root) {
            if(!_.typeCheck("string", root.id)) return;

            var pathData = [],
                children = root.childNodes;

            for(var i = 0, len = children.length; i < len; i++) {
                var elem = children[i],
                    name = elem.nodeName.toLowerCase();

                if(elem.nodeType != 1) continue;

                if(name == "g") {
                    pathData = pathData.concat(getPathList(elem));
                } else if(name == "path" || name == "polygon") {
                    var obj = { group: root.id };

                    for(var key in elem.attributes) {
                        var attr = elem.attributes[key];

                        if(attr.specified && isLoadAttribute(attr.name)) {
                            obj[attr.name] = replaceXYValue(attr);
                        }
                    }

                    if(_.typeCheck("string", obj.id)) {
                        _.extend(obj, getDataById(obj.id));
                    }

                    pathData.push(obj);
                }
            }

            return pathData;
        }

        function loadPath(uri) {
            // 해당 URI의 데이터가 존재할 경우
            if(_.typeCheck("array", pathData[uri])) {
                return loadArray(pathData[uri]);
            }

            // 해당 URI의 데이터가 없을 경우
            pathData[uri] = [];

            _.ajax({
                url: uri,
                async: false,
                success: function(xhr) {
                    var xml = xhr.responseXML,
                        svg = xml.getElementsByTagName("svg"),
                        style = xml.getElementsByTagName("style");

                    if(svg.length != 1) return;
                    var children = svg[0].childNodes;

                    for(var i = 0, len = children.length; i < len; i++) {
                        var elem = children[i],
                            name = elem.nodeName.toLowerCase();

                        if(elem.nodeType != 1) continue;

                        if(name == "g") {
                            pathData[uri] = pathData[uri].concat(getPathList(elem));
                        } else if(name == "path" || name == "polygon") {
                            var obj = {};

                            for(var key in elem.attributes) {
                                var attr = elem.attributes[key];

                                if(attr.specified && isLoadAttribute(attr.name)) {
                                    obj[attr.name] = replaceXYValue(attr);
                                }
                            }

                            if(_.typeCheck("string", obj.id)) {
                                _.extend(obj, getDataById(obj.id));
                            }

                            pathData[uri].push(obj);
                        }
                    }

                    // 스타일 태그가 정의되어 있을 경우
                    for(var i = 0; i < style.length; i++) {
                        self.svg.root.element.appendChild(style[i]);
                    }
                },
                fail: function(xhr) {
                    throw new Error("JUI_CRITICAL_ERR: Failed to load resource");
                }
            });

            return loadArray(pathData[uri]);
        }

        function isLoadAttribute(name) {
            return (
                name == "group" || name == "id" || name == "title" || name == "x" || name == "y" ||
                name == "d" || name == "points" || name == "class" || name == "style"
            );
        }

        function replaceXYValue(attr) {
            if(attr.name == "x" || attr.name == "y") {
                return parseFloat(attr.value);
            }

            return attr.value;
        }

        function getDataById(id) {
            var list = self.axis.data;

            for(var i = 0; i < list.length; i++) {
                var dataId = self.axis.getValue(list[i], "id", null);

                if(dataId == id) {
                    return list[i];
                }
            }

            return null;
        }

        function makePathGroup() {
            var group = self.chart.svg.group(),
                list = loadPath(self.map.path);

            for(var i = 0, len = list.length; i < len; i++) {
                var path = list[i].path,
                    data = list[i].data;

                //addEvent(path, list[i]);
                group.append(path);

                if(_.typeCheck("string", data.id)) {
                    pathIndex[data.id] = list[i];
                }
            }

            return group;
        }

        function getScaleXY() { // 차후에 공통 함수로 변경해야 함
            var w = self.map.width,
                h = self.map.height,
                px = ((w * pathScale) - w) / 2,
                py = ((h * pathScale) - h) / 2;

            return {
                x: px + pathX,
                y: py + pathY
            }
        }

        function addEvent(elem, obj) {
            var chart = self.chart;

            elem.on("click", function(e) {
                setMouseEvent(e);
                chart.emit("map.click", [ obj, e ]);
            });

            elem.on("dblclick", function(e) {
                setMouseEvent(e);
                chart.emit("map.dblclick", [ obj, e ]);
            });

            elem.on("contextmenu", function(e) {
                setMouseEvent(e);
                chart.emit("map.rclick", [ obj, e ]);
                e.preventDefault();
            });

            elem.on("mouseover", function(e) {
                setMouseEvent(e);
                chart.emit("map.mouseover", [ obj, e ]);
            });

            elem.on("mouseout", function(e) {
                setMouseEvent(e);
                chart.emit("map.mouseout", [ obj, e ]);
            });

            elem.on("mousemove", function(e) {
                setMouseEvent(e);
                chart.emit("map.mousemove", [ obj, e ]);
            });

            elem.on("mousedown", function(e) {
                setMouseEvent(e);
                chart.emit("map.mousedown", [ obj, e ]);
            });

            elem.on("mouseup", function(e) {
                setMouseEvent(e);
                chart.emit("map.mouseup", [ obj, e ]);
            });

            function setMouseEvent(e) {
                var pos = $.offset(chart.root),
                    offsetX = e.pageX - pos.left,
                    offsetY = e.pageY - pos.top;

                e.bgX = offsetX;
                e.bgY = offsetY;
                e.chartX = offsetX - chart.padding("left");
                e.chartY = offsetY - chart.padding("top");
            }
        }

        this.scale = function(id) {
            if(!_.typeCheck("string", id)) return;

            var x = null,
                y = null,
                path = null,
                data = null,
                pxy = getScaleXY();

            if(_.typeCheck("object", pathIndex[id])) {
                path = pathIndex[id].path;
                data = pathIndex[id].data;

                if(data.x != null) {
                    var dx = self.axis.getValue(data, "dx", 0),
                        cx = parseFloat(data.x) + dx;
                    x = (cx * pathScale) - pxy.x;
                }

                if(data.y != null) {
                    var dy = self.axis.getValue(data, "dy", 0),
                        cy = parseFloat(data.y) + dy;
                    y = (cy * pathScale) - pxy.y;
                }
            }

            return {
                x: x,
                y: y,
                path: path,
                data: data
            }
        }

        this.scale.each = function(callback) {
            var self = this;

            for(var id in pathIndex) {
                callback.apply(self, [ id, pathIndex[id] ]);
            }
        }

        this.scale.size = function() {
            return {
                width: self.map.width,
                height: self.map.height
            }
        }

        this.scale.scale = function(scale) {
            if(!scale || scale < 0) return pathScale;

            pathScale = scale;
            pathGroup.scale(pathScale);
            this.view(pathX, pathY);

            return pathScale;
        }

        this.scale.view = function(x, y) {
            var xy = { x: pathX, y: pathY };

            if(!_.typeCheck("number", x) || !_.typeCheck("number", y))
                return xy;

            pathX = x;
            pathY = y;

            var pxy = getScaleXY();
            pathGroup.translate(-pxy.x, -pxy.y);

            return {
                x: pathX,
                y: pathY
            }
        }

        this.draw = function() {
            var root = this.chart.svg.group();

            pathScale = this.map.scale;
            pathX = this.map.viewX;
            pathY = this.map.viewY;
            pathGroup = makePathGroup();

            // pathGroup 루트에 추가
            root.append(pathGroup);

            if(this.map.scale != 1) {
                this.scale.scale(pathScale);
            }

            if(this.map.viewX != 0 || this.map.viewY != 0) {
                this.scale.view(pathX, pathY);
            }

            if(this.map.hide) {
                root.attr({ visibility: "hidden" });
            }

            return {
                root: root,
                scale: this.scale
            };
        }

        this.drawAfter = function(obj) {
            obj.root.attr({ "clip-path": "url(#" + this.axis.get("clipRectId") + ")" });

            // 모든 path가 그려진 이후에 이벤트 설정
            setTimeout(function() {
                self.scale.each(function(id, obj) {
                    addEvent(obj.path, obj);
                });
            }, 1);
        }
    }

    Map.setup = function() {
        /** @property {chart.builder} chart */
        /** @property {chart.axis} axis */
        /** @property {Object} map */

        return {
            scale: 1,
            viewX: 0,
            viewY: 0,

            /** @cfg {Boolean} [hide=false] Determines whether to display an applicable grid.  */
            hide: false,
            /** @cfg {String} [map=''] Set a map file's name */
            path: "",
            /** @cfg {Number} [width=-1] Set map's width */
            width: -1,
            /** @cfg {Number} [height=-1] Set map's height */
            height: -1
        };
    }

    /**
     * @event map_click
     * Event that occurs when clicking on the map area. (real name ``` map.click ```)
     * @param {jQueryEvent} e The event object.
     * @param {Number} index Axis index.
     */
    /**
     * @event map_dblclick
     * Event that occurs when double clicking on the map area. (real name ``` map.dblclick ```)
     * @param {jQueryEvent} e The event object.
     * @param {Number} index Axis index.
     */
    /**
     * @event map_rclick
     * Event that occurs when right clicking on the map area. (real name ``` map.rclick ```)
     * @param {jQueryEvent} e The event object.
     * @param {Number} index Axis index.
     */
    /**
     * @event map_mouseover
     * Event that occurs when placing the mouse over the map area. (real name ``` map.mouseover ```)
     * @param {jQueryEvent} e The event object.
     * @param {Number} index Axis index.
     */
    /**
     * @event map_mouseout
     * Event that occurs when moving the mouse out of the map area. (real name ``` map.mouseout ```)
     * @param {jQueryEvent} e The event object.
     * @param {Number} index Axis index.
     */
    /**
     * @event map_mousemove
     * Event that occurs when moving the mouse over the map area. (real name ``` map.mousemove ```)
     * @param {jQueryEvent} e The event object.
     * @param {Number} index Axis index.
     */
    /**
     * @event map_mousedown
     * Event that occurs when left clicking on the map area. (real name ``` map.mousedown ```)
     * @param {jQueryEvent} e The event object.
     * @param {Number} index Axis index.
     */
    /**
     * @event map_mouseup
     * Event that occurs after left clicking on the map area. (real name ``` map.mouseup ```)
     * @param {jQueryEvent} e The event object.
     * @param {Number} index Axis index.
     */

    return Map;
}, "chart.draw"); 

/***/ }),
/* 24 */
/***/ (function(module, exports) {

jui.defineUI("chart.builder", [ "util.base", "util.dom", "util.svg", "util.color", "chart.axis" ],
    function(_, $, SVGUtil, ColorUtil, Axis) {

    _.resize(function() {
        var call_list = jui.get("chart.builder");

        for(var i = 0; i < call_list.length; i++) {
            var ui_list = call_list[i];

            for(var j = 0; j < ui_list.length; j++) {
                ui_list[j].resize();
            }
        }
    }, 1000);

    /**
     * @class chart.builder
     *
     * Implements chart builder
     *
     * @extends core
     * @alias ChartBuilder
     * @requires util.base
     * @requires util.svg
     * @requires util.color
     * @requires chart.axis
     * @requires jquery
     *
     */
    var UI = function() {
        var _axis = [], _brush = [], _widget = [], _defs = null;
        var _padding, _area,  _theme, _hash = {};
        var _initialize = false, _options = null, _handler = { render: [], renderAll: [] }; // 리셋 대상 커스텀 이벤트 핸들러
        var _canvas = { main: null, sub: null }; // 캔버스 모드 전용

        function calculate(self) {
            var max = self.svg.size();

            var _chart = {
                width: max.width - (_padding.left + _padding.right),
                height: max.height - (_padding.top + _padding.bottom),
                x: _padding.left,
                y: _padding.top
            };

            // chart 크기가 마이너스일 경우 (엘리먼트가 hidden 상태)
            if(_chart.width < 0) _chart.width = 0;
            if(_chart.height < 0) _chart.height = 0;

            // _chart 영역 계산
            _chart.x2 = _chart.x + _chart.width;
            _chart.y2 = _chart.y + _chart.height;

            _area = _chart;
        }

        function drawBefore(self) {
            _brush = _.deepClone(_options.brush);
            _widget = _.deepClone(_options.widget);

            // defs 엘리먼트 생성
            _defs = self.svg.defs();

            // 해쉬 코드 초기화
            _hash = {};
        }

        function drawAxis(self) {
            
            // 엑시스 리스트 얻어오기
            var axisList = _.deepClone(_options.axis, { data : true, origin : true });

            for(var i = 0; i < axisList.length; i++) {
                jui.defineOptions(Axis, axisList[i]);

                // 엑시스 인덱스 설정
                axisList[i].index = i;

                if(!_axis[i]) {
                    _axis[i] = new Axis(self, _options.axis[i], axisList[i]);
                } else {
                    _axis[i].reload(axisList[i]);
                }
            }
        }

        function drawBrush(self) {
            var draws = _brush;

            if(draws != null) {
                for(var i = 0; i < draws.length; i++) {
                    var Obj = jui.include("chart.brush." + draws[i].type);

                    // 브러쉬 기본 옵션과 사용자 옵션을 합침
                    jui.defineOptions(Obj, draws[i]);
                    var axis = _axis[draws[i].axis];

                    // 타겟 프로퍼티 설정
                    if(!draws[i].target) {
                        var target = [];

                        if(axis) {
                            for(var key in axis.data[0]) {
                                target.push(key);
                            }
                        }

                        draws[i].target = target;
                    } else if(_.typeCheck("string", draws[i].target)) {
                        draws[i].target = [ draws[i].target ];
                    }

                    // 브러쉬 인덱스 설정
                    draws[i].index = i;

                    // 브러쉬 기본 프로퍼티 정의
                    var draw = new Obj(self, axis, draws[i]);
                    draw.chart = self;
                    draw.axis = axis;
                    draw.brush = draws[i];
                    draw.svg = self.svg;
                    draw.canvas = _canvas.main;

                    // 브러쉬 렌더링
                    draw.render();
                }
            }
        }

        function drawWidget(self, isAll) {
            var draws = _widget;

            if(draws != null) {
                for(var i = 0; i < draws.length; i++) {
                    var Obj = jui.include("chart.widget." + draws[i].type);

                    // 위젯 기본 옵션과 사용자 옵션을 합침
                    jui.defineOptions(Obj, draws[i]);

                    // 위젯 인덱스 설정
                    draws[i].index = i;

                    // 위젯 기본 프로퍼티 정의
                    var draw = new Obj(self, _axis[0], draws[i]);
                    draw.chart = self;
                    draw.axis = _axis[0];
                    draw.widget = draws[i];
                    draw.svg = self.svg;
                    draw.canvas = _canvas.sub;

                    // 위젯은 렌더 옵션이 false일 때, 최초 한번만 로드함 (연산 + 드로잉)
                    // 하지만 isAll이 true이면, 강제로 연산 및 드로잉을 함 (테마 변경 및 리사이징 시)
                    if(_initialize && !draw.isRender() && isAll !== true) {
                        return;
                    }

                    var elem = draw.render();
                    if(!draw.isRender()) {
                        self.svg.autoRender(elem, false);
                    }
                }
            }
        }

        function setCommonEvents(self, elem) {
            var isMouseOver = false;

            elem.on("click", function(e) {
                if (!checkPosition(e)) {
                    self.emit("bg.click", [ e ]);
                } else {
                    self.emit("chart.click", [ e ]);
                }
            });

            elem.on("dblclick", function(e) {
                if (!checkPosition(e)) {
                    self.emit("bg.dblclick", [ e ]);
                } else {
                    self.emit("chart.dblclick", [ e ]);
                }
            });

            elem.on("contextmenu", function(e) {
                if (!checkPosition(e)) {
                    self.emit("bg.rclick", [ e ]);
                } else {
                    self.emit("chart.rclick", [ e ]);
                }

                e.preventDefault();
            });

            elem.on("mousemove", function(e) {
                if (!checkPosition(e)) {
                    if (isMouseOver) {
                        self.emit("chart.mouseout", [ e ]);
                        isMouseOver = false;
                    }

                    self.emit("bg.mousemove", [ e ]);
                } else {
                    if (isMouseOver) {
                        self.emit("chart.mousemove", [ e ]);
                    } else {
                        self.emit("chart.mouseover", [ e ]);
                        isMouseOver = true;
                    }
                }
            });

            elem.on("mousedown", function(e) {
                if (!checkPosition(e)) {
                    self.emit("bg.mousedown", [ e ]);
                } else {
                    self.emit("chart.mousedown", [ e ]);
                }
            });

            elem.on("mouseup", function(e) {
                if (!checkPosition(e)) {
                    self.emit("bg.mouseup", [ e ]);
                } else {
                    self.emit("chart.mouseup", [ e ]);
                }
            });

            elem.on("mouseover", function(e) {
                if (!checkPosition(e)) {
                    self.emit("bg.mouseover", [ e ]);
                }
            });

            elem.on("mouseout", function(e) {
                if (!checkPosition(e)) {
                    self.emit("bg.mouseout", [ e ]);
                }
            });

            elem.on("mousewheel", function(e) {
                if (!checkPosition(e)) {
                    self.emit("bg.mousewheel", [ e ]);
                } else {
                    self.emit("chart.mousewheel", [ e ]);
                }
            });

            function checkPosition(e) {
                var pos = $.offset(self.root),
                    offsetX = e.pageX - pos.left,
                    offsetY = e.pageY - pos.top;

                e.bgX = offsetX;
                e.bgY = offsetY;
                e.chartX = offsetX - self.padding("left");
                e.chartY = offsetY - self.padding("top");

                if(e.chartX < 0) return;
                if(e.chartX > self.area("width")) return;
                if(e.chartY < 0) return;
                if(e.chartY > self.area("height")) return;

                return true;
            }
        }

        function resetCustomEvent(self, isAll) {
            for(var i = 0; i < _handler.render.length; i++) {
                self.off(_handler.render[i]);
            }
            _handler.render = [];

            if(isAll === true) {
                for(var i = 0; i < _handler.renderAll.length; i++) {
                    self.off(_handler.renderAll[i]);
                }
                _handler.renderAll = [];
            }
        }

        function createGradient(obj, hashKey) {
            if(!_.typeCheck("undefined", hashKey) && _hash[hashKey]) {
                return "url(#" + _hash[hashKey] + ")";
            }

            var g = null,
                id = _.createId("gradient");

            obj.attr.id = id;

            g = SVGUtil.createObject(obj);

            _defs.append(g);

            if(!_.typeCheck("undefined", hashKey)) {
                _hash[hashKey] = id;
            }

            return "url(#" + id + ")";
        }
        
        function createPattern(obj) {
            if (_.typeCheck("string", obj)) {
                obj = obj.replace("url(#", "").replace(")", "");

                if(_hash[obj]) {
                    return "url(#" + obj + ")";
                }
                
                // already pattern id 
                if (obj.indexOf('pattern-') == -1) {
                    return false
                }

                var arr = obj.split("-"),
                    method = arr.pop();

                var pattern = jui.include("chart." + arr.join("."));
                
                if (!pattern) {
                    return false;
                }

                var patternElement = pattern[method];
                
                if (typeof patternElement == 'function') {
                    patternElement = patternElement.call(patternElement);
                }

                // json 객체를 svg element 로 변환
                if (patternElement.attr && !patternElement.attr.id) {
                    patternElement.attr.id = obj;
                }

                patternElement = SVGUtil.createObject(patternElement);

                _defs.append(patternElement);
                
                _hash[obj] = obj;
                
                return "url(#" + obj + ")";
                
            } else {
                obj.attr.id = obj.attr.id || _.createId('pattern-');

                if (_hash[obj.attr.id]) {
                    return "url(#" + obj.attr.id + ")";
                }                
                
                var patternElement = SVGUtil.createObject(obj);
                
                _defs.append(patternElement);
                
                _hash[obj.attr.id] = obj.attr.id;
                
                return "url(#" + obj.attr.id + ")";
            }
        }

        function createColor(color) {
            if(_.typeCheck("undefined", color)) {
                return "none";
            }

            if(_.typeCheck("object", color)) {
                
                if (color.type == "pattern") {
                    return createPattern(color);
                } else {
                    return createGradient(color);
                }
            }
            
            if (typeof color == "string") {
                var url = createPattern(color);
                if (url) {
                    return url; 
                }
            }

            var parsedColor = ColorUtil.parse(color);
            if(parsedColor == color)
                return color;

            return createGradient(parsedColor, color);
        }

        function setThemeStyle(theme) {
            var style = {};

            // 테마를 하나의 객체로 Merge
            if(_.typeCheck("string", theme)) {
                _.extend(style, jui.include("chart.theme." + theme));
                _.extend(style, _options.style);
            } else if(_.typeCheck("object", theme)) {
                _.extend(_theme, _options.style);
                _.extend(_theme, theme);
                _.extend(style, _theme);
            }

            // 최종 렌더링에 적용되는 객체
            _theme = style;
        }

        function setDefaultOptions(self) {
            // 일부 옵션을 제외하고 클론
            _options = _.deepClone(self.options, { data: true, bind: true });

            var padding = _options.padding;

            // 패딩 옵션 설정
            if(_.typeCheck("integer", padding)) {
                _padding = { left: padding, right: padding, bottom: padding, top: padding };
            } else {
                _padding = padding;
            }

            // UI 바인딩 설정 (차후에 변경, 현재는 첫번째 엑시스로 고정)
            if(_.typeCheck("object", _options.bind)) {
                self.bindUI(0, _options.bind);
            }

            // Draw 옵션 설정
            if(!_.typeCheck("array", _options.axis)) {
                _options.axis = [ _options.axis ];
            }

            if(!_.typeCheck("array", _options.brush)) {
                _options.brush = [ _options.brush ];
            }

            if(!_.typeCheck("array", _options.widget)) {
                _options.widget = [ _options.widget ];
            }

            // Axis 확장 설정
            for(var i = 0; i < _options.axis.length; i++) {
                var axis = _options.axis[i];
                _.extend(axis, _options.axis[axis.extend], true);
            }
        }

        function setVectorFontIcons() {
            var icon = _options.icon;
            if(!_.typeCheck([ "string", "array" ], icon.path)) return;

            var pathList = (_.typeCheck("string", icon.path)) ? [ icon.path ] : icon.path,
                urlList = [];

            for(var i = 0; i < pathList.length; i++) {
                var path = pathList[i],
                    url = "url(" + path + ") ";

                if (path.indexOf(".eot") != -1) {
                    url += "format('embedded-opentype')";
                } else if (path.indexOf(".woff") != -1) {
                    url += "format('woff')";
                } else if (path.indexOf(".ttf") != -1) {
                    url += "format('truetype')";
                } else if (path.indexOf(".svg") != -1) {
                    url += "format('svg')";
                }

                urlList.push(url);
            }

            var fontFace = "font-family: " + icon.type + "; font-weight: normal; font-style: normal; src: " + urlList.join(",");

            (function(rule) {
                var sheet = (function() {
                    var style = document.createElement("style");

                    style.appendChild(document.createTextNode(""));
                    document.head.appendChild(style);

                    return style.sheet;
                })();

                sheet.insertRule(rule, 0);
            })("@font-face {" + fontFace + "}");
        }

        function parseIconInText(self, text) {
            var regex = /{([^{}]+)}/g,
                result = text.match(regex);

            if(result != null) {
                for(var i = 0; i < result.length; i++) {
                    var key = result[i].substring(1, result[i].length - 1);
                    text = text.replace(result[i], self.icon(key));
                }
            }

            return text;
        }

        function getCanvasRealSize(self) {
            var size = self.svg.size();

            return {
                width : (_.typeCheck("integer", _options.width)) ? _options.width : size.width,
                height : (_.typeCheck("integer", _options.height)) ? _options.height : size.height
            }
        }

        function initRootStyles(root) {
            root.style.position = "relative";
            root.style.userSelect = "none";
            root.style.webkitUserSelect = "none";
            root.style.MozUserSelect = "none";
            root.setAttribute("unselectable", "on");
        }

        function initCanvasElement(self) {
            var size = getCanvasRealSize(self);

            for(var key in _canvas) {
                var elem = document.createElement("CANVAS");

                elem.setAttribute("width", size.width);
                elem.setAttribute("height", size.height);
                elem.style.position = "absolute";
                elem.style.left = "0px";
                elem.style.top = "0px";

                // Context 설정하기
                if (elem.getContext) {
                    _canvas[key] = elem.getContext("2d");
                    self.root.appendChild(elem);
                }

                // Widget 캔버스 이벤트 함수 정의
                if (key == "sub") {
                    elem.on = function(type, handler) {
                        var callback = function(e) {
                            if(typeof(handler) == "function") {
                                handler.call(this, e);
                            }
                        }

                        elem.addEventListener(type, callback, false);
                        return this;
                    }
                }
            }
        }

        function resetCanvasElement(self, type) {
            var size = getCanvasRealSize(self),
                context = _canvas[type];

            context.restore();
            context.clearRect(0, 0, size.width, size.height);
            context.save();

            if(type == "main") {
                context.translate(_area.x, _area.y);
            }
        }

        this.init = function() {
            // 기본 옵션 설정
            setDefaultOptions(this);

            // 차트 테마 설정 (+옵션 스타일)
            setThemeStyle(_options.theme);

            // 루트 엘리먼트 기본 스타일 설정
            initRootStyles(this.root);

            /** @property {chart.svg} svg Refers to an SVG utility object. */
            this.svg = new SVGUtil(this.root, {
                width: _options.width,
                height: _options.height,
                "buffered-rendering" : "dynamic"
            });

            // canvas 기본 객체 생성
            if(_options.canvas) {
                initCanvasElement(this);
                setCommonEvents(this, $.find(this.root, "CANVAS")[1]);
            } else {
                setCommonEvents(this, this.svg.root);
            }

            // 아이콘 폰트 설정
            setVectorFontIcons();

            // 차트 기본 렌더링
            this.render();
        }
        
        /**
         * @method get  
         *
         * Gets a named axis, brush, widget (type: axis, brush, widget, padding, area)
         *
         * @param {"axis"/"brush"/"widget"/"padding"/"area"} type
         * @param {String} key  Property name
         * @return {Mixed/Object}
         */
        this.get = function(type, key) {
            var obj = {
                axis: _axis,
                brush: _brush,
                widget: _widget,
                padding: _padding,
                area: _area
            };

            if(obj[type][key]) {
                return obj[type][key];
            }

            return obj[type] || obj;
        }

        /**
         * Gets the axis object of that index.
         *
         * @param {Number} key
         * @returns {Array/Object}
         */
        this.axis = function(key) {
            return (arguments.length == 0) ? _axis : _axis[key];
        }

        /**
         * Gets a calculated value for a chart area (type: width, height, x, y, x2, y2)).
         *
         * @param {String} key
         * @return {Number/Object}
         */
        this.area = function(key) {
            return _.typeCheck("undefined", _area[key]) ? _area : _area[key];
        }

        /**
         * Gets the top, bottom, left and right margin values.
         *
         * @param {"top"/"left"/"bottom"/"right"} key
         * @return {Number/Object}
         */
        this.padding = function(key) {
            return _.typeCheck("undefined", _padding[key]) ? _padding : _padding[key];
        }

        /**
         * Gets a color defined in the theme or the color set.
         *
         * @param {Number/String} key
         * @param {Array} colors
         * @param {Array} target
         * @return {String} Selected color string
         */
        this.color = function(key, colors) {
            var color = null;

            // 직접 색상을 추가할 경우 (+그라데이션, +필터)
            if(arguments.length == 1) {
                if(_.typeCheck("string", key)) {
                    color = key;
                } else if(_.typeCheck("integer", key)) {
                    color = nextColor(key);
                }
            } else {
                // 테마 & 브러쉬 옵션 컬러 설정
                if(_.typeCheck([ "array", "object" ], colors)) {
                    color = colors[key];

                    if(_.typeCheck("integer", color)) {
                        color = nextColor(color);
                    }
                } else {
                    color = nextColor();
                }
            }

            if(_hash[color]) {
                return "url(#" + _hash[color] + ")";
            }

            function nextColor(newIndex) {
                var c = _theme["colors"],
                    index = newIndex || key;

                return (index > c.length - 1) ? c[c.length - 1] : c[index];
            }

            return createColor(color);
        }

        /**
         * Gets the unicode string of the icon.
         *
         * @param {String} key  icon's alias
         */
        this.icon = function(key) {
            return jui.include("chart.icon." + _options.icon.type)[key];
        }

        /**
         * Creates a text element to which a theme is applied.
         *
         * Also it support icon string
         *
         * @param {Object} attr
         * @param {String|Function} textOrCallback
         */
        this.text = function(attr, textOrCallback) {
            if(_.typeCheck("string", textOrCallback)) {
                textOrCallback = parseIconInText(this, textOrCallback);
            } else if(_.typeCheck("undefined", textOrCallback)) {
                textOrCallback = "";
            }

            return this.svg.text(attr, textOrCallback);
        }

        /**
         * Creates a text element to which a theme is applied.
         *
         * Also it support icon string
         *
         * @param {Object} attr
         * @param {Array} texts
         * @param {Number} lineBreakRate
         */
        this.texts = function(attr, texts, lineBreakRate) {
            var g = this.svg.group();

            for(var i = 0; i < texts.length; i++) {
                if(_.typeCheck("string", texts[i])) {
                    var size = (attr["font-size"] || 10) * (lineBreakRate || 1);

                    g.append(this.svg.text(
                        _.extend({ y: i * size }, attr, true),
                        parseIconInText(this, texts[i])
                    ));
                }
            }

            return g;
        }

        /**
         * @method theme
         *
         * Gets a value for the theme element applied to the current chart.
         *
         * ```
         *      // get all theme property
         *      var theme = chart.theme();
         *      // get a part of theme
         *      var fontColor = chart.theme("fontColor");
         *      // get selected value of theme
         *      chart.theme(isSelected, "selectedFontColor", "fontColor");  // if isSelected is true, return 'selectedFontColor' else return 'fontColor'
         * ```
         */
        this.theme = function(key, value, value2) {
            if(arguments.length == 0) {
                return _theme;
            } else if(arguments.length == 1) {
                if(key.indexOf("Color") > -1 && _theme[key] != null) {
                    return createColor(_theme[key]);
                }

                return _theme[key];
            } else if(arguments.length == 3) {
                var val = (key) ? value : value2;

                if(val.indexOf("Color") > -1 && _theme[val] != null) {
                    return createColor(_theme[val]);
                }

                return _theme[val];
            }
        }

        /**
         * Returns a value from the format callback function of a defined option.
         *
         * @param {Function} format
         * @return {Mixed}
         */
        this.format = function() {
            if(arguments.length == 0) return;
            var callback = _options.format;

            if(_.typeCheck("function", callback)) {
                return callback.apply(this, arguments);
            }

            return arguments[0];
        }

        /**
         * @method bindUI 
         * 
         * Binds data used in a uix.table or the uix.xtable.
         *
         * @param {Number} axisIndex
         * @param {Object} uiObj
         */
        this.bindUI = function(axisIndex, uiObj) {
            var self = this;

            if(uiObj.module.type == "grid.table") {
                uiObj.callAfter("update", updateTable);
                uiObj.callAfter("sort", updateTable);
                uiObj.callAfter("append", updateTable);
                uiObj.callAfter("insert", updateTable);
                uiObj.callAfter("remove", updateTable);
            } else if(uiObj.module.type == "grid.xtable") {
                uiObj.callAfter("update", updateTable);
                uiObj.callAfter("sort", updateTable);
            }

            function updateTable() {
                self.axis(axisIndex).update(uiObj.listData());
            }
        }

        /**
         * @method on
         * 
         * A callback function defined as an on method is run when an emit method is called.
         *
         * @param {String} type Event's name
         * @param {Function} callback
         * @param {"render"/"renderAll"/undefined} resetType
         */
        this.on = function(type, callback, resetType) {
            if(!_.typeCheck("string", type)  || !_.typeCheck("function", callback)) return;

            this.event.push({ type: type.toLowerCase(), callback: callback  });

            // 브러쉬나 위젯에서 설정한 이벤트 핸들러만 추가
            if(resetType == "render" || resetType == "renderAll") {
                _handler[resetType].push(callback);
            }
        }

        /**
         * @method render 
         *
         * Renders all draw objects.
         *
         * @param {Boolean} isAll
         */
        this.render = function(isAll) {
            // SVG 메인 리셋
            this.svg.reset(isAll);

            // chart 이벤트 초기화 (삭제 대상)
            resetCustomEvent(this, isAll);

            // chart 영역 계산
            calculate(this);

            // Canvas 초기 설정
            if(this.options.canvas) {
                resetCanvasElement(this, "main");

                if(isAll) {
                    resetCanvasElement(this, "sub");
                }
            }

            // chart 관련된 요소 draw
            drawBefore(this);
            drawAxis(this);
            drawBrush(this);
            drawWidget(this, isAll);

            // SVG 기본 테마 설정
            this.svg.root.css({
                "font-family": this.theme("fontFamily") + "," + _options.icon.type,
                background: this.theme("backgroundColor")
            });

            // SVG 메인/서브 렌더링
            this.svg.render(isAll);

            // 커스텀 이벤트 발생
            this.emit("render", [ _initialize ]);

            // 초기화 및 렌더링 체크 설정
            _initialize = true;
        }

        /**
         * @method appendDefs
         *
         * Add the child element in defs tag.
         *
         * @param {chart.svg.element} elem
         */
        this.appendDefs = function(elem) {
            _defs.append(elem);
        }

        /**
         * @method addBrush 
         * 
         * Adds a brush and performs rendering again.
         *  
         * @param {Object} brush
         */
        this.addBrush = function(brush) {
            _options.brush.push(brush);
            if(this.isRender()) this.render();
        }

        /**
         * @method removeBrush 
         * 
         * Deletes the brush of a specified index and performs rendering again.
         * @param {Number} index
         */
        this.removeBrush = function(index) {
            _options.brush.splice(index, 1);
            if(this.isRender()) this.render();
        }

        /**
         * @method updateBrush 
         * Updates the brush of a specified index and performs rendering again.
         * @param {Number} index
         * @param {Object} brush
         * @param {Boolean} isReset
         */
        this.updateBrush = function(index, brush, isReset) {
            if(isReset === true) {
                _options.brush[index] = brush;
            } else {
                _.extend(_options.brush[index], brush);
            }

            if(this.isRender()) this.render();
        }

        /**
         * @method addWidget 
         * Adds a widget and performs rendering again.
         * 
         * @param {Object} widget
         */
        this.addWidget = function(widget) {
            _options.widget.push(widget);
            if(this.isRender()) this.render();
        }

        /**
         * @method removeWidget 
         * Deletes the widget of a specified index and performs rendering again.
         * @param {Number} index
         */
        this.removeWidget = function(index) {
            _options.widget.splice(index, 1);
            if(this.isRender()) this.render();
        }

        /**
         * @method updateWidget
         * Updates the widget of a specified index and performs rendering again
         * @param {Number} index
         * @param {Object} widget
         * @param {Boolean} isReset
         */
        this.updateWidget = function(index, widget, isReset) {
            if(isReset === true) {
                _options.widget[index] = widget;
            } else {
                _.extend(_options.widget[index], widget);
            }

            if(this.isRender()) this.render();
        }

        /**
         * Changes a chart to a specified theme and renders the chart again.
         *
         * @param {String/Object} theme
         */
        this.setTheme = function(theme) {
            setThemeStyle(theme);
            if(this.isRender()) this.render(true);
        }

        /**
         * Changes the size of a chart to the specified area and height then performs rendering.
         *
         * @param {Number} width
         * @param {Number} height
         */
        this.setSize = function(width, height) {
            if(arguments.length == 2) {
                _options.width = width;
                _options.height = height;
            }

            // Resize svg
            this.svg.size(_options.width, _options.height);

            // Resize canvas
            if(_options.canvas) {
                var list = $.find(this.root, "CANVAS"),
                    size = getCanvasRealSize(this);

                for(var i = 0; i < list.length; i++) {
                    list[i].setAttribute("width", size.width);
                    list[i].setAttribute("height", size.height);
                }
            }

            if(this.isRender()) this.render(true);
        }

        /**
         * Returns true if the horizontal or vertical size of the chart is 100%.
         *
         * @return {Boolean}
         */
        this.isFullSize = function() {
            if(_options.width == "100%" || _options.height == "100%")
                return true;

            return true;
        }

        /**
         * Resize the chart to fit the screen width.
         *
         */
        this.resize = function() {
            if(this.isFullSize()) {
                this.setSize();
            }

            if(!this.isRender()) {
                this.render(true);
            }
        }

        /**
         * Returns the values of rendering options and, if the rendering option is false, does not render the chart again when a method is called.
         *
         * @return {Boolean}
         */
        this.isRender = function() {
            return (!_initialize) ? true : _options.render;
        }
    }

    UI.setup = function() {
        return {
            /** @cfg  {String/Number} [width="100%"] chart width */ 
            width: "100%",
            /** @cfg  {String/Number} [height="100%"] chart height */
            height: "100%",
            /** 
             * @cfg  {Object} padding chart padding 
             * @cfg  {Number} [padding.top=50] chart padding 
             * @cfg  {Number} [padding.bottom=50] chart padding
             * @cfg  {Number} [padding.left=50] chart padding
             * @cfg  {Number} [padding.right=50] chart padding
             */
            padding: {
                top: 50,
                bottom: 50,
                left: 50,
                right: 50
            },

            /** @cfg  {String} [theme=jennifer] chart theme  */
            theme: "jennifer",
            /** @cfg  {Object} style chart custom theme  */
            style: {},
            /** @cfg {Array} brush Determines a brush to be added to a chart. */
            brush: [],
            /** @cfg {Array} widget Determines a widget to be added to a chart. */
            widget: [],
            /** @cfg {Array} [axis=[]] Determines a axis to be added to a chart. */
            axis: [],

            /** @cfg {Object} [bind=null] Sets a component objects to be bind.*/
            bind: null,
            /** @cfg {Function} [format=null] Sets a format callback function to be used in a grid/brush/widget. */
            format: null,
            /** @cfg {Boolean} [render=true] Does not render a chart when a rendering-related method is called with false (although the render method is not included). */
            render: true,

            /**
             * @cfg {Object} icon Icon-related settings available in the chart.
             * @cfg {String} [icon.type="jennifer"]
             * @cfg {String} [icon.path=null]
             */
            icon: {
                type: "jennifer",
                path: null
            },

            /** @cfg {Boolean} [canvas=false] */
            canvas: false
        }
    }

    /**
     * @event chart_click
     * Event that occurs when clicking on the chart area. (real name ``` chart.click ```)
     * @param {jQueryEvent} e The event object.
     */
    /**
     * @event chart_dblclick
     * Event that occurs when double clicking on the chart area. (real name ``` chart.dblclick ```)
     * @param {jQueryEvent} e The event object.
     */
    /**
     * @event chart_rclick
     * Event that occurs when right clicking on the chart area. (real name ``` chart.rclick ```)
     * @param {jQueryEvent} e The event object.
     */
    /**
     * @event chart_mouseover
     * Event that occurs when placing the mouse over the chart area. (real name ``` chart.mouseover ```)
     * @param {jQueryEvent} e The event object.
     */
    /**
     * @event chart_mouseout
     * Event that occurs when moving the mouse out of the chart area. (real name ``` chart.mouseout ```)
     * @param {jQueryEvent} e The event object.
     */
    /**
     * @event chart_mousemove
     * Event that occurs when moving the mouse over the chart area. (real name ``` chart.mousemove ```)
     * @param {jQueryEvent} e The event object.
     */
    /**
     * @event chart_mousedown
     * Event that occurs when left clicking on the chart area. (real name ``` chart.mousedown ```)
     * @param {jQueryEvent} e The event object.
     */
    /**
     * @event chart_mouseup
     * Event that occurs after left clicking on the chart area. (real name ``` chart.mouseup ```)
     * @param {jQueryEvent} e The event object.
     */

    /**
     * @event bg_click
     * Event that occurs when clicking on the chart margin. (real name ``` bg.click ```)
     * @param {jQueryEvent} e The event object.
     */
    /**
     * @event bg_dblclick
     * Event that occurs when double clicking on the chart margin. (real name ``` bg.dblclick ```)
     * @param {jQueryEvent} e The event object.
     */
    /**
     * @event bg_rclick
     * Event that occurs when right clicking on the chart margin. (real name ``` bg.rclick ```)
     * @param {jQueryEvent} e The event object.
     */
    /**
     * @event bg_mouseover
     * Event that occurs when placing the mouse over the chart margin. (real name ``` bg.mouseover ```)
     * @param {jQueryEvent} e The event object.
     */
    /**
     * @event bg_mouseout
     * Event that occurs when moving the mouse out of the chart margin. (real name ``` bg.mouseout ```)
     * @param {jQueryEvent} e The event object.
     */
    /**
     * @event bg_mousemove
     * Event that occurs when moving the mouse over the chart margin. (real name ``` bg.mousemove ```)
     * @param {jQueryEvent} e The event object.
     */
    /**
     * @event bg_mousedown
     * Event that occurs when left clicking on the chart margin. (real name ``` bg.mousedown ```)
     * @param {jQueryEvent} e The event object.
     */
    /**
     * @event bg_mouseup
     * Event that occurs after left clicking on the chart margin. (real name ``` bg.mouseup ```)
     * @param {jQueryEvent} e The event object.
     */

    return UI;
}, "core");


/***/ }),
/* 25 */
/***/ (function(module, exports) {

jui.defineUI("chart.plane", [ "chart.builder", "util.base" ], function(builder, _) {
    var UI = function() {
        var chart = null,
            axis = [],
            brush = [],
            widget = [];

        var axisIndex = 0,
            baseAxis = {},
            etcAxis = {};

        this.init = function() {
            var opts = this.options,
                defAxis = {
                    type : "range",
                    step : opts.step,
                    line : opts.line
                };

            baseAxis.x = _.extend({ domain: opts.x }, defAxis);
            baseAxis.y = _.extend({ domain: opts.y }, defAxis);
            baseAxis.x.orient = "bottom";
            baseAxis.y.orient = "left";
            baseAxis.z = _.extend({ domain: opts.z }, defAxis);
            baseAxis.depth = opts.depth - (opts.padding * 2);
            baseAxis.degree = { x: opts.dx, y: opts.dy, z: opts.dz };
            baseAxis.perspective = opts.perspective;

            etcAxis.extend = 0;
            etcAxis.x = { hide: true };
            etcAxis.y = { hide: true };
            etcAxis.z = { hide: true };

            if(opts.dimension == "2d") {
                baseAxis.perspective = 1;
                baseAxis.degree.x = 0;
                baseAxis.degree.y = 0;
                baseAxis.degree.z = 0;
                baseAxis.z.hideText = true;
            }
        }

        this.push = function(data) {
            if(!_.typeCheck("array", data)) return;

            if(!axis[axisIndex]) {
                axis.push(_.extend({}, (axisIndex == 0) ? baseAxis : etcAxis));
            }

            if(!axis[axisIndex].data) {
                axis[axisIndex].data = [];
            }

            axis[axisIndex].data.push(data);
        }

        this.commit = function(symbol, r) {
            var opts = this.options;

            brush.push({
                type: "canvas.dot3d",
                color: axisIndex,
                axis: axisIndex,
                symbol: symbol || opts.symbol,
                size: (r || opts.r) * 2
            });

            axisIndex++;
        }

        this.append = function(datas, symbol, r) {
            var opts = this.options;

            axis.push(_.extend({}, (axisIndex == 0) ? baseAxis : etcAxis));
            axis[axisIndex].data = datas;

            brush.push({
                type: "canvas.dot3d",
                color: axisIndex,
                axis: axisIndex,
                symbol: symbol || opts.symbol,
                size: (r || opts.r) * 2
            });

            axisIndex++;
        }

        this.render = function() {
            var opts = this.options;

            if(opts.dimension == "3d") {
                widget.push({
                    type: "polygon.rotate3d"
                });
            }

            if(chart != null) {
                chart.root.innerHTML = "";
                chart = null;
            }

            if(axis.length == 0) {
                axis.push(baseAxis);
            }

            chart = builder(this.root, {
                padding: opts.padding,
                width : opts.width,
                height : opts.height,
                axis : axis,
                brush : brush,
                widget : widget,
                canvas : true,
                render : false,
                style : {
                    gridFaceBackgroundOpacity: 0.1
                }
            });

            if(_.typeCheck("array", opts.colors)) {
                var colors = [];

                for(var i = 0; i < opts.colors.length; i++) {
                    colors.push(chart.color(opts.colors[i]));
                }

                chart.setTheme({ colors: colors });
            }

            axis = [];
            brush = [];
            widget = [];
            axisIndex = 0;

            chart.render();
        }
    }

    UI.setup = function() {
        return {
            dimension: "2d",
            width: 500,
            height: 500,
            depth: 500,
            padding: 50,
            x: [ -100, 100 ],
            y: [ -100, 100 ],
            z: [ -100, 100 ],
            step: 4,
            line: true,
            symbol: "dot",
            r: 2,
            perspective: 0.9,
            dx: 10,
            dy: 5,
            dz: 0,
            colors: null
        }
    }

    return UI;
}, "core");


/***/ }),
/* 26 */
/***/ (function(module, exports) {

jui.define("chart.polygon.core", [ "chart.vector", "util.transform", "util.math", "util.base" ],
    function(Vector, Transform, math, _) {

    var PolygonCore = function() {
        this.perspective = 0.9;

        this.rotate = function(depth, degree, cx, cy, cz) {
            var p = this.perspective,
                t = new Transform(this.vertices),
                m = t.matrix("move3d", cx, cy, cz);

            // 폴리곤 이동 및 각도 변경
            m = math.matrix3d(m, t.matrix("rotate3dx", degree.x));
            m = math.matrix3d(m, t.matrix("rotate3dy", degree.y));
            m = math.matrix3d(m, t.matrix("rotate3dz", degree.z));
            m = math.matrix3d(m, t.matrix("move3d", -cx, -cy, -cz));
            this.vertices = t.custom(m);

            for (var i = 0, count = this.vertices.length; i < count; i++) {
                var far = Math.abs(this.vertices[i][2] - depth),
                    s = math.scaleValue(far, 0, depth, p, 1),
                    t2 = new Transform(),
                    m2 = t2.matrix("move3d", cx, cy, depth/2);

                // 폴리곤 스케일 변경
                m2 = math.matrix3d(m2, t2.matrix("scale3d", s, s, s));
                m2 = math.matrix3d(m2, t2.matrix("move3d", -cx, -cy, -depth/2));
                this.vertices[i] = math.matrix3d(m2, this.vertices[i]);

                // 벡터 객체 생성 및 갱신
                if(_.typeCheck("array", this.vectors)) {
                    if(this.vectors[i] == null) {
                        this.vectors[i] = new Vector(this.vertices[i][0], this.vertices[i][1], this.vertices[i][2]);
                    } else {
                        this.vectors[i].x = this.vertices[i][0];
                        this.vectors[i].y = this.vertices[i][1];
                        this.vectors[i].z = this.vertices[i][2];
                    }
                }
            }
        }

        this.min = function() {
            var obj = {
                x: this.vertices[0][0],
                y: this.vertices[0][1],
                z: this.vertices[0][2]
            };

            for(var i = 1, len = this.vertices.length; i < len; i++) {
                obj.x = Math.min(obj.x, this.vertices[i][0]);
                obj.y = Math.min(obj.y, this.vertices[i][1]);
                obj.z = Math.min(obj.z, this.vertices[i][2]);
            }

            return obj;
        }

        this.max = function() {
            var obj = {
                x: this.vertices[0][0],
                y: this.vertices[0][1],
                z: this.vertices[0][2]
            };

            for(var i = 1, len = this.vertices.length; i < len; i++) {
                obj.x = Math.max(obj.x, this.vertices[i][0]);
                obj.y = Math.max(obj.y, this.vertices[i][1]);
                obj.z = Math.max(obj.z, this.vertices[i][2]);
            }

            return obj;
        }
    }

    return PolygonCore;
});

/***/ }),
/* 27 */
/***/ (function(module, exports) {

jui.define("chart.polygon.grid", [], function() {
    var GridPolygon = function(type, width, height, depth, x, y) {
        x = x || 0;
        y = y || 0;
        width = x + width;
        height = y + height;

        var matrix = {
            center: [
                new Float32Array([ x, y, depth, 1 ]),
                new Float32Array([ width, y, depth, 1 ]),
                new Float32Array([ width, height, depth, 1 ]),
                new Float32Array([ x, height, depth, 1 ])
            ],
            horizontal: [
                new Float32Array([ x, height, 0, 1 ]),
                new Float32Array([ width, height, 0, 1 ]),
                new Float32Array([ width, height, depth, 1 ]),
                new Float32Array([ x, height, depth, 1 ])
            ],
            vertical: [
                new Float32Array([ width, y, 0, 1 ]),
                new Float32Array([ width, height, 0, 1 ]),
                new Float32Array([ width, height, depth, 1 ]),
                new Float32Array([ width, y, depth, 1 ])
            ]
        };

        this.vertices = matrix[type];

        this.vectors = [];
    }

    return GridPolygon;
}, "chart.polygon.core");

/***/ }),
/* 28 */
/***/ (function(module, exports) {

jui.define("chart.polygon.line", [], function() {
    var LinePolygon = function(x1, y1, d1, x2, y2, d2) {
        this.vertices = [
            new Float32Array([ x1, y1, d1, 1 ]),
            new Float32Array([ x2, y2, d2, 1 ])
        ];

        this.vectors = [];
    }

    return LinePolygon;
}, "chart.polygon.core");

/***/ }),
/* 29 */
/***/ (function(module, exports) {

jui.define("chart.polygon.point", [], function() {
    var PointPolygon = function(x, y, d) {
        this.vertices = [
            new Float32Array([ x, y, d, 1 ])
        ];

        this.vectors = [];
    }

    return PointPolygon;
}, "chart.polygon.core");

/***/ }),
/* 30 */
/***/ (function(module, exports) {

jui.define("chart.polygon.cube", [], function() {
    var CubePolygon = function(x, y, z, w, h, d) {
        this.vertices = [
            new Float32Array([ x,       y,      z,      1 ]),
            new Float32Array([ x + w,   y,      z,      1 ]),
            new Float32Array([ x + w,   y,      z + d,  1 ]),
            new Float32Array([ x,       y,      z + d,  1 ]),

            new Float32Array([ x,       y + h,  z,      1 ]),
            new Float32Array([ x + w,   y + h,  z,      1 ]),
            new Float32Array([ x + w,   y + h,  z + d,  1 ]),
            new Float32Array([ x,       y + h,  z + d,  1 ]),
        ];

        this.faces = [
            [ 0, 1, 2, 3 ],
            [ 3, 2, 6, 7 ],
            [ 0, 3, 7, 4 ],
            [ 1, 2, 6, 5 ],
            [ 0, 1, 5, 4 ],
            [ 4, 5, 6, 7 ]
        ];

        this.vectors = [];
    }

    return CubePolygon;
}, "chart.polygon.core");

/***/ }),
/* 31 */
/***/ (function(module, exports) {

jui.define("chart.grid.draw2d", [ "util.base", "util.math" ], function(_, math) {

    /**
     * @class chart.grid.draw2d
     * @abstract
     */
    var Draw2DGrid = function() {

        this.createGridX = function(position, index, x, isActive, isLast) {
            var line = this.getLineOption(),
                axis = this.chart.svg.group().translate(x, 0),
                size = this.chart.theme("gridTickBorderSize");

            axis.append(this.line({
                y2 : (position == "bottom") ? size : -size,
                stroke : this.color(isActive, "gridActiveBorderColor", "gridXAxisBorderColor"),
                "stroke-width" : this.chart.theme("gridTickBorderWidth")
            }));

            if (line) {
                this.drawValueLine(position, axis, isActive, line, index, isLast);
            }

            return axis;
        }

        this.createGridY = function(position, index, y, isActive, isLast) {
            var line = this.getLineOption(),
                axis = this.chart.svg.group().translate(0, y),
                size = this.chart.theme("gridTickBorderSize");

            axis.append(this.line({
                x2 : (position == "left") ? -size : size,
                stroke : this.color(isActive, "gridActiveBorderColor", "gridYAxisBorderColor"),
                "stroke-width" : this.chart.theme("gridTickBorderWidth")
            }));

            if (line) {
                this.drawValueLine(position, axis, isActive, line, index, isLast);
            }

            return axis;
        }

        this.fillRectObject = function(g, line, position, x, y , width, height) {
            if (line.type.indexOf("gradient") > -1) {
                g.append(this.chart.svg.rect({
                    x : x,
                    y : y,
                    height : height,
                    width : width,
                    fill : this.chart.color(( line.fill ? line.fill : "linear(" + position + ") " + this.chart.theme("gridPatternColor") + ",0.5 " + this.chart.theme("backgroundColor") )),
                    "fill-opacity" : this.chart.theme("gridPatternOpacity")
                }));
            } else if (line.type.indexOf("rect") > -1) {
                g.append(this.chart.svg.rect({
                    x : x,
                    y : y,
                    height : height,
                    width : width,
                    fill : this.chart.color( line.fill ? line.fill : this.chart.theme("gridPatternColor") ),
                    "fill-opacity" : this.chart.theme("gridPatternOpacity")
                }));
            }
        }

        /**
         * @method drawAxisLine
         * theme 이 적용된  axis line 리턴
         * @param {ChartBuilder} chart
         * @param {Object} attr
         */
        this.drawAxisLine = function(position, g, attr) {
            var isTopOrBottom = (position == "top" || position == "bottom");

            g.append(this.chart.svg.line(_.extend({
                x1 : 0,
                y1 : 0,
                x2 : 0,
                y2 : 0,
                stroke : this.color(isTopOrBottom ? "gridXAxisBorderColor" : "gridYAxisBorderColor"),
                "stroke-width" : this.chart.theme(isTopOrBottom ? "gridXAxisBorderWidth" : "gridYAxisBorderWidth"),
                "stroke-opacity" : 1
            }, attr)));
        }

        this.drawPattern = function(position, ticks, values, isMove) {
            if (this.grid.hide) return;
            if (!position) return;
            if (!ticks) return;
            if (!values) return;

            var line = this.getLineOption(),
                isY = (position == "left" || position == "right"),
                g = this.chart.svg.group();

            g.translate(this.axis.area("x") + this.chart.area("x"), this.axis.area("y") + this.chart.area("y"));

            if (line && (line.type.indexOf("gradient") > -1 || line.type.indexOf("rect") > -1)) {
                for(var i = 0; i < values.length-1; i += 2) {
                    var dist = Math.abs(values[i+1] - values[i]),
                        pos = values[i] - (isMove ?  dist/2 : 0 ),
                        x = (isY) ? 0 : pos,
                        y = (isY) ? pos : 0,
                        width = (isY) ?  this.axis.area("width") : dist,
                        height = (isY) ?  dist : this.axis.area("height");

                    this.fillRectObject(g, line, position, x, y, width, height);
                }
            }
        }

        this.drawBaseLine = function(position, g) {
            var obj = this.getGridSize(),
                pos = {};

            if (position == "bottom" || position == "top") {
                pos = { x1 : obj.start, x2 : obj.end };
            } else if (position == "left" || position == "right") {
                pos = { y1 : obj.start, y2 : obj.end };
            }

            this.drawAxisLine(position, g, pos)
        }

        this.drawValueLine = function(position, axis, isActive, line, index, isLast) {
            var area = {},
                isDrawLine = false;

            if (position == "top") {
                isDrawLine = this.checkDrawLineY(index, isLast);
                area = { x1: 0, x2: 0, y1: 0, y2: this.axis.area("height") };
            } else if (position == "bottom" ) {
                isDrawLine = this.checkDrawLineY(index, isLast);
                area = { x1: 0, x2: 0, y1: 0, y2: -this.axis.area("height") };
            } else if (position == "left") {
                isDrawLine = this.checkDrawLineX(index, isLast);
                area = { x1: 0, x2: this.axis.area("width"), y1: 0, y2: 0 };
            } else if (position == "right" ) {
                isDrawLine = this.checkDrawLineX(index, isLast);
                area = { x1: 0, x2: -this.axis.area("width"), y1: 0, y2: 0 };
            }

            if(isDrawLine) {
                var lineObject = this.line(_.extend({
                    stroke: this.chart.theme(isActive, "gridActiveBorderColor", "gridBorderColor"),
                    "stroke-width": this.chart.theme(isActive, "gridActiveBorderWidth", "gridBorderWidth")
                }, area));

                if (line.type.indexOf("dashed") > -1) {
                    var dash = this.chart.theme("gridBorderDashArray");

                    lineObject.attr({
                        "stroke-dasharray": (dash == "none" || !dash) ? "3,3" : dash
                    });
                }

                axis.append(lineObject);
            }
        }

        this.drawValueText = function(position, axis, index, xy, domain, move, isActive) {
            if (this.grid.hideText) return;

            if(position == "top") {
                axis.append(this.getTextRotate(this.chart.text({
                    x: move,
                    y: -(this.chart.theme("gridTickBorderSize") + this.chart.theme("gridTickPadding") * 2),
                    dy: this.chart.theme("gridXFontSize") / 3,
                    fill: this.chart.theme(isActive, "gridActiveFontColor", "gridXFontColor"),
                    "text-anchor": "middle",
                    "font-size": this.chart.theme("gridXFontSize"),
                    "font-weight": this.chart.theme("gridXFontWeight")
                }, domain)));
            } else if(position == "bottom") {
                axis.append(this.getTextRotate(this.chart.text({
                    x: move,
                    y: this.chart.theme("gridTickBorderSize") + this.chart.theme("gridTickPadding") * 2,
                    dy: this.chart.theme("gridXFontSize") / 3,
                    fill: this.chart.theme(isActive, "gridActiveFontColor", "gridXFontColor"),
                    "text-anchor": "middle",
                    "font-size": this.chart.theme("gridXFontSize"),
                    "font-weight": this.chart.theme("gridXFontWeight")
                }, domain)));
            } else if(position == "left") {
                axis.append(this.getTextRotate(this.chart.text({
                    x: -this.chart.theme("gridTickBorderSize") - this.chart.theme("gridTickPadding"),
                    y: move,
                    dy: this.chart.theme("gridYFontSize") / 3,
                    fill: this.chart.theme(isActive, "gridActiveFontColor", "gridYFontColor"),
                    "text-anchor": "end",
                    "font-size": this.chart.theme("gridYFontSize"),
                    "font-weight": this.chart.theme("gridYFontWeight")
                }, domain)));
            } else if(position == "right") {
                axis.append(this.getTextRotate(this.chart.text({
                    x: this.chart.theme("gridTickBorderSize") + this.chart.theme("gridTickPadding"),
                    y: move,
                    dy: this.chart.theme("gridYFontSize") / 3,
                    fill: this.chart.theme(isActive, "gridActiveFontColor", "gridYFontColor"),
                    "text-anchor": "start",
                    "font-size": this.chart.theme("gridYFontSize"),
                    "font-weight": this.chart.theme("gridYFontWeight")
                }, domain)));
            }
        }

        this.drawImage = function(orient, g, tick, index, x, y) {
            if (!_.typeCheck("function", this.grid.image)) return;

            var opts = this.grid.image.apply(this.chart, [ tick, index ]);

            if(_.typeCheck("object", opts)) {
                var image = this.chart.svg.image({
                    "xlink:href": opts.uri,
                    width: opts.width,
                    height: opts.height
                });

                if(orient == "top" || orient == "bottom") {
                    image.attr({
                        x: (this.grid.type == "block") ? this.scale.rangeBand()/2 - opts.width/2 : -(opts.width/2)
                    });
                } else if(orient == "left" || orient == "right") {
                    image.attr({
                        y: (this.grid.type == "block") ? this.scale.rangeBand()/2 - opts.height/2 : -(opts.height/2)
                    })
                }

                if(orient == "bottom") {
                    image.attr({ y: opts.dist });
                } else if(orient == "top") {
                    image.attr({ y: -(opts.dist + opts.height) });
                } else if(orient == "left") {
                    image.attr({ x: -(opts.dist + opts.width) });
                } else if(orient == "right") {
                    image.attr({ x: opts.dist });
                }

                image.translate(x, y)
                g.append(image);
            }
        }
    }

    return Draw2DGrid;
}, "chart.draw");

/***/ }),
/* 32 */
/***/ (function(module, exports) {

jui.define("chart.grid.draw3d", [ "util.base", "chart.polygon.grid", "chart.polygon.line", "chart.polygon.point" ],
    function(_, GridPolygon, LinePolygon, PointPolygon) {

    /**
     * @class chart.grid.draw3d
     * @abstract
     */
    var Draw3DGrid = function() {

        this.createGridX = function(position, index, x, isActive, isLast) {
            var line = this.getLineOption(),
                axis = this.svg.group();

            if (line) {
                this.drawValueLine(position, axis, isActive, line, index, x, isLast);
            }

            return axis;
        }

        this.createGridY = function(position, index, y, isActive, isLast) {
            var line = this.getLineOption(),
                axis = this.svg.group();

            if (line) {
                this.drawValueLine(position, axis, isActive, line, index, y, isLast);
            }

            return axis;
        }

        /**
         * @method center
         *
         * draw center
         *
         * @param {chart.util.svg} g
         * @param {Array} ticks
         * @param {Array} values
         * @param {Number} min
         * @param {Function} checkActive
         */
        this.drawCenter = function(g, ticks, values, checkActive, moveZ) {
            var axis = this.svg.group(),
                line = this.getLineOption();

            if(line) {
                this.drawValueLineCenter(axis, ticks, line);
            }

            this.drawValueTextCenter(axis, ticks, values, checkActive, moveZ);

            g.append(axis);
        }

        this.drawBaseLine = function(position, g) {
            var axis = this.svg.group();
            this.drawAxisLine(position, axis);

            g.append(axis);
        }

        /**
         * @method axisLine
         * theme 이 적용된  axis line 리턴
         * @param {ChartBuilder} chart
         * @param {Object} attr
         */
        this.drawAxisLine = function(position, axis) {
            var isTopOrBottom = (position == "top" || position == "bottom"),
                borderColor = (isTopOrBottom) ? "gridXAxisBorderColor" : "gridYAxisBorderColor",
                borderWidth = (isTopOrBottom) ? "gridXAxisBorderWidth" : "gridYAxisBorderWidth";

            if(position == "center") {
                borderColor = "gridZAxisBorderColor";
                borderWidth = "gridZAxisBorderWidth";
            }

            var face = this.svg.polygon({
                stroke: this.chart.theme(borderColor),
                "stroke-width": this.chart.theme(borderWidth),
                "stroke-opacity" : 1,
                fill: this.chart.theme("gridFaceBackgroundColor"),
                "fill-opacity": this.chart.theme("gridFaceBackgroundOpacity")
            });

            var p = null,
                w = this.axis.area("width"),
                h = this.axis.area("height"),
                x = this.axis.area("x"),
                y = this.axis.area("y"),
                d = this.axis.depth;

            if(position == "center") {
                p = new GridPolygon("center", w, h, d, x, y);
            } else {
                if(isTopOrBottom) {
                    h = (position == "bottom") ? h : 0;
                    p = new GridPolygon("horizontal", w, h, d, x, y);
                } else {
                    w = (position == "right") ? w : 0;
                    p = new GridPolygon("vertical", w, h, d, x, y);
                }
            }

            // 사각면 위치 계산 및 추가
            this.calculate3d(p);
            for(var i = 0; i < p.vectors.length; i++) {
                face.point(p.vectors[i].x, p.vectors[i].y);
            }

            // Y축이 숨김 상태일 때
            if(position == "center") {
                if(this.axis.get("y").hide !== true) {
                    axis.append(face);
                }
            } else {
                axis.append(face);
            }
        }

        this.drawValueLine = function(position, axis, isActive, line, index, xy, isLast) {
            var isDrawLine = false,
                w = this.axis.area("width"),
                h = this.axis.area("height"),
                x = this.axis.area("x"),
                y = this.axis.area("y"),
                d = this.axis.depth,
                l1 = null,
                l2 = null;

            if (position == "top") {
                isDrawLine = this.checkDrawLineY(index, isLast);
                l1 = new LinePolygon(xy, y, 0, xy, y, d);
                l2 = new LinePolygon(xy, y, d, xy, y + h, d);
            } else if (position == "bottom" ) {
                isDrawLine = this.checkDrawLineY(index, isLast);
                l1 = new LinePolygon(xy, y + h, 0, xy, y + h, d);
                l2 = new LinePolygon(xy, y + h, d, xy, y, d);
            } else if (position == "left") {
                isDrawLine = this.checkDrawLineX(index, isLast);
                l1 = new LinePolygon(x, xy, 0, x, xy, d);
                l2 = new LinePolygon(x, xy, d, x + w, xy, d);
            } else if (position == "right" ) {
                isDrawLine = this.checkDrawLineX(index, isLast);
                l1 = new LinePolygon(x + w, xy, 0, x + w, xy, d);
                l2 = new LinePolygon(x + w, xy, d, x, xy, d);
            }

            if(isDrawLine) {
                // 폴리곤 계산
                this.calculate3d(l1, l2);

                var lo1 = this.line({
                    stroke: this.chart.theme("gridBorderColor"),
                    "stroke-width": this.chart.theme("gridBorderWidth"),
                    x1: l1.vectors[0].x,
                    y1: l1.vectors[0].y,
                    x2: l1.vectors[1].x,
                    y2: l1.vectors[1].y
                });

                var lo2 = this.line({
                    stroke: this.chart.theme("gridBorderColor"),
                    "stroke-width": this.chart.theme("gridBorderWidth"),
                    x1: l2.vectors[0].x,
                    y1: l2.vectors[0].y,
                    x2: l2.vectors[1].x,
                    y2: l2.vectors[1].y
                });

                if (line.type.indexOf("dashed") > -1) {
                    var dash = this.chart.theme("gridBorderDashArray"),
                        style = (dash == "none" || !dash) ? "3,3" : dash;

                    lo1.attr({ "stroke-dasharray": style });
                    lo2.attr({ "stroke-dasharray": style });
                }

                axis.append(lo1);

                // Y축이 숨김 상태가 아닐 때만 추가
                if(this.axis.get("y").hide !== true) {
                    axis.append(lo2);
                }
            }
        }

        this.drawValueLineCenter = function(axis, ticks, line) {
            var len = (this.grid.type != "block") ? ticks.length - 1 : ticks.length,
                w = this.axis.area("width"),
                h = this.axis.area("height"),
                x = this.axis.area("x"),
                y = this.axis.area("y"),
                d = this.axis.depth,
                dx = (this.axis.get("y").orient == "left") ? 0 : w,
                dy = (this.axis.get("x").orient == "top") ? 0 : h;

            // z축 라인 드로잉
            for(var i = 1; i < len; i++) {
                var t = i * (d / len),
                    p1 = new LinePolygon(x, y + dy, t, x + w, y + dy, t),
                    p2 = new LinePolygon(x + dx, y, t, x + dx, y + h, t);

                this.calculate3d(p1, p2);

                var lo1 = this.line({
                    stroke: this.chart.theme("gridBorderColor"),
                    "stroke-width": this.chart.theme("gridBorderWidth"),
                    x1: p1.vectors[0].x,
                    y1: p1.vectors[0].y,
                    x2: p1.vectors[1].x,
                    y2: p1.vectors[1].y
                });

                var lo2 = this.line({
                    stroke: this.chart.theme("gridBorderColor"),
                    "stroke-width": this.chart.theme("gridBorderWidth"),
                    x1: p2.vectors[0].x,
                    y1: p2.vectors[0].y,
                    x2: p2.vectors[1].x,
                    y2: p2.vectors[1].y
                });

                if (line.type.indexOf("dashed") > -1) {
                    var dash = this.chart.theme("gridBorderDashArray"),
                        style = (dash == "none" || !dash) ? "3,3" : dash;

                    lo1.attr({ "stroke-dasharray": style });
                    lo2.attr({ "stroke-dasharray": style });
                }

                axis.append(lo1);

                // Y축이 숨김 상태가 아닐 때만 추가
                if(this.axis.get("y").hide !== true) {
                    axis.append(lo2);
                }
            }
        }

        this.drawValueText = function(position, axis, index, xy, domain) {
            if (this.grid.hideText) return;

            var isVertical = (position == "left" || position == "right");

            var tickSize = this.chart.theme("gridTickBorderSize"),
                tickPadding = this.chart.theme("gridTickPadding"),
                w = this.axis.area("width"),
                h = this.axis.area("height"),
                dx = this.axis.area("x"),
                dy = this.axis.area("y"),
                x = 0,
                y = 0;

            if(position == "top") {
                x = xy;
                y = dy + (-(tickSize + tickPadding * 2));
            } else if(position == "bottom") {
                x = xy;
                y = dy + (h + tickSize + tickPadding * 2);
            } else if(position == "left") {
                x = dx + (-(tickSize + tickPadding));
                y = xy;
            } else if(position == "right") {
                x = dx + (w + tickSize + tickPadding);
                y = xy;
            }

            var p = new PointPolygon(x, y, 0);
            this.calculate3d(p);

            axis.append(this.getTextRotate(this.chart.text({
                x: p.vectors[0].x,
                y: p.vectors[0].y,
                dx: !isVertical ? this.chart.theme("gridXFontSize") / 3 : 0,
                dy: isVertical ? this.chart.theme("gridYFontSize") / 3 : 0,
                fill: this.chart.theme(isVertical ? "gridYFontColor" : "gridXFontColor"),
                "text-anchor": isVertical ? (position == "left" ? "end" : "start") : "middle",
                "font-size": this.chart.theme(isVertical ? "gridYFontSize" : "gridXFontSize"),
                "font-weight": this.chart.theme(isVertical ? "gridYFontWeight" : "gridXFontWeight")
            }, domain)));
        }

        this.drawValueTextCenter = function(axis, ticks, values, checkActive, moveZ) {
            if (this.grid.hideText) return;

            var margin = this.chart.theme("gridTickBorderSize") + this.chart.theme("gridTickPadding"),
                isLeft = (this.axis.get("y").orient == "left"),
                isTop = (this.axis.get("x").orient == "top"),
                len = (this.grid.type != "block") ? ticks.length - 1 : ticks.length,
                w = this.axis.area("width"),
                h = this.axis.area("height"),
                d = this.axis.depth,
                x = this.axis.area("x") + ((isLeft) ? w + margin : -margin),
                y = this.axis.area("y") + ((isTop) ? -margin : h + margin);

            // z축 라인 드로잉
            for(var i = 0; i < ticks.length; i++) {
                var domain = this.format(ticks[i], i),
                    t = i * (d / len) + moveZ,
                    p = new PointPolygon(x, y, t);

                this.calculate3d(p);

                axis.append(this.getTextRotate(this.chart.text({
                    x: p.vectors[0].x,
                    y: p.vectors[0].y,
                    fill: this.chart.theme("gridZFontColor"),
                    "text-anchor": (isLeft) ? "start" : "end",
                    "font-size": this.chart.theme("gridZFontSize"),
                    "font-weight": this.chart.theme("gridZFontWeight")
                }, domain)));
            }
        }

        this.drawPattern = function() {}
        this.drawImage = function() {}
    }

    return Draw3DGrid;
}, "chart.draw");

/***/ }),
/* 33 */
/***/ (function(module, exports) {

jui.define("chart.grid.core", [ "util.base", "util.math", "chart.grid.draw2d", "chart.grid.draw3d" ],
	function(_, math, Draw2D, Draw3D) {

	/**
	 * @class chart.grid.core
	 * Grid Core 객체
	 * @extends chart.draw
	 * @abstract
	 */
	var CoreGrid = function() {

		/**
		 * @method wrapper
		 * scale wrapper
		 *
		 * grid 의 x 좌표 값을 같은 형태로 가지고 오기 위한 wrapper 함수
		 *
		 * grid 속성에 key 가 있다면  key 의 속성값으로 실제 값을 처리
		 *
		 *      @example
		 *      // 그리드 속성에 키가 없을 때
		 *      scale(0);		// 0 인덱스에 대한 값  (block, radar)
		 *      // grid 속성에 key 가 있을 때
		 *      grid { key : "field" }
		 *      scale(0)			// field 값으로 scale 설정 (range, date)
		 *
		 * @protected
		 */
		this.wrapper = function(scale, key) {
			return scale;
		}

		/**
		 * @method line
		 * theme 이 적용된  line 리턴
		 * @protected
		 * @param {ChartBuilder} chart
		 * @param {Object} attr
		 */
		this.line = function(attr) {
			return this.chart.svg.line(_.extend({
				x1 : 0,
				y1 : 0,
				x2 : 0,
				y2 : 0,
				stroke : this.color("gridBorderColor"),
				"stroke-width" : this.chart.theme("gridBorderWidth"),
				"stroke-dasharray" : this.chart.theme("gridBorderDashArray"),
				"stroke-opacity" : this.chart.theme("gridBorderOpacity")
			}, attr));
		}

		/**
		 * @method color
		 * grid 에서 color 를 위한 유틸리티 함수
		 * @param theme
		 * @return {Mixed}
		 */
		this.color = function(theme) {
			var color = this.grid.color;

			if (arguments.length == 3) {
				return (color != null) ? this.chart.color(color) : this.chart.theme.apply(this.chart, arguments);
			}

			return (color != null) ? this.chart.color(color) : this.chart.theme(theme);
		}

		/**
		 * @method data
		 * get data for axis
		 * @protected
		 * @param {Number} index
		 * @param {String} field
		 */
		this.data = function(index, field) {
			if(this.axis.data && this.axis.data[index]) {
				return this.axis.data[index][field] || this.axis.data[index];
			}

			return this.axis.data || [];
		}

		this.getGridSize = function() {
			var orient = this.grid.orient,
				depth = this.axis.depth,
				degree = this.axis.degree,
				axis = (orient == "left" || orient == "right") ? this.axis.area("y") : this.axis.area("x"),
				max = (orient == "left" || orient == "right") ? this.axis.area("height") : this.axis.area("width"),
				start = axis,
				size = max,
				end = start + size;

			var result = {
				start: start,
				size: size,
				end: end
			};

			if(!this.axis.isFull3D()) {
				if(depth > 0 || degree > 0) {
					var radian = math.radian(360 - degree),
						x2 = Math.cos(radian) * depth,
						y2 = Math.sin(radian) * depth;

					if(orient == "left") {
						result.start = result.start - y2;
						result.size = result.size - y2;
					} else if(orient == "bottom") {
						result.end = result.end - x2;
						result.size = result.size - x2;
					}
				}
			} else {
				if(orient == "center") { // z축
					result.start = 0;
					result.size = depth;
					result.end = depth;
				}
			}

			return result;
		}

		/**
		 * @method getDefaultOffset
		 *
		 * get real size of grid
		 *
		 * @param {chart.builder} chart
		 * @param {Strng} orient
		 * @param {Object} grid             그리드 옵션
		 * @return {Object}
		 * @return {Number} return.start    시작 지점
		 * @return {Number} return.size     그리드 넓이 또는 높이
		 * @return {Number} return.end      마지막 지점
		 */
		this.getDefaultOffset = function() {
			var orient = this.grid.orient,
				area = this.axis.area();

			var width = area.width,
				height = area.height,
				axis = (orient == "left" || orient == "right") ? area.y : area.x,
				max = (orient == "left" || orient == "right") ? height : width,
				start = axis,
				size = max,
				end = start + size;

			return {
				start: start,
				size: size,
				end: end
			};
		}

		/**
		 * @method getTextRotate
		 * implement text rotate in grid text
		 * @protected
		 * @param {SVGElement} textElement
		 */
		this.getTextRotate = function(textElement) {
			var rotate = this.grid.textRotate;

			if (rotate == null) {
				return textElement;
			}

			if (_.typeCheck("function", rotate)) {
				rotate = rotate.apply(this.chart, [ textElement ]);
			}

			var x = textElement.attr("x");
			var y = textElement.attr("y");

			textElement.rotate(rotate, x, y);

			return textElement;
		}


		this.getLineOption = function() {
			var line = this.grid.line;

			if (typeof line === "string") {
				line = { type : line || "solid"}
			} else if (typeof line === "number") {
				line = { type : "solid", "stroke-width" : line }
			} else if (typeof line !== "object") {
				line = !!line;

				if (line) {
					line = { type : "solid" }
				}
			}

			if (line && !line.type == "string") {
				line.type = line.type.split(/ /g);
			}

			return line;
		}

		this.checkDrawLineY = function(index, isLast) {
			var y = this.axis.get("y");

			if(!y.hide) {
				if (y.orient == "left" && index == 0 && !this.grid.realtime) {
					return false;
				} else if (y.orient == "right" && isLast) {
					return false;
				}
			}

			return true;
		}

		this.checkDrawLineX = function(index, isLast) {
			var x = this.axis.get("x");

			if (!x.hide) {
				if (x.orient == "top" && index == 0) {
					return false;
				} else if (x.orient == "bottom" && isLast && !this.grid.realtime ) {
					return false;
				}
			}

			return true;
		}

		/**
		 * @method top
		 *
		 * draw top
		 *
		 * @param {chart.util.svg} g
		 * @param {Array} ticks
		 * @param {Array} values
		 * @param {Number} min
		 * @param {Function} checkActive
		 */
		this.drawTop = function(g, ticks, values, checkActive, moveX) {
			for (var i = 0, len = ticks.length; i < len; i++) {
				var domain = this.format(ticks[i], i),
					x = values[i] - moveX,
					isLast = (i == len - 1) && this.grid.type != "block",
					isActive = false;

				// 그리드 이미지 그리기
				this.drawImage("top", g, ticks[i], i, x, 0);

				// 도메인이 없으면 그리지 않음
				if (!domain && domain !== 0) {
					continue;
				}

				// 액티브 라인 체크
				if (_.typeCheck("function", checkActive)) {
					isActive = checkActive(ticks[i]);
				}

				var axis = this.createGridX("top", i, x, isActive, isLast);
				this.drawValueText("top", axis, i, values[i], domain, moveX, isActive);

				g.append(axis);
			}
		}

		this.drawBottom = function(g, ticks, values, checkActive, moveX) {
			for (var i = 0, len = ticks.length; i < len; i++) {
				var domain = this.format(ticks[i], i),
					x = values[i] - moveX,
					isLast = (i == len - 1) && this.grid.type != "block",
					isActive = false;

				// 그리드 이미지 그리기
				this.drawImage("bottom", g, ticks[i], i, x, 0);

				// 도메인이 없으면 그리지 않음
				if (!domain && domain !== 0) {
					continue;
				}

				// 액티브 라인 체크
				if (_.typeCheck("function", checkActive)) {
					isActive = checkActive(ticks[i]);
				}

				var axis = this.createGridX("bottom", i, x, isActive, isLast);
				this.drawValueText("bottom", axis, i, values[i], domain, moveX, isActive);

				g.append(axis);
			}
		}

		this.drawLeft = function(g, ticks, values, checkActive, moveY) {
			for (var i = 0, len = ticks.length; i < len; i++) {
				var domain = this.format(ticks[i], i),
					y = values[i] - moveY,
					isLast = (i == len - 1) && this.grid.type != "block",
					isActive = false;

				// 그리드 이미지 그리기
				this.drawImage("left", g, ticks[i], i, 0, y);

				// 도메인이 없으면 그리지 않음
				if (!domain && domain !== 0) {
					continue;
				}

				// 액티브 라인 체크
				if (_.typeCheck("function", checkActive)) {
					isActive = checkActive(ticks[i]);
				}

				var axis = this.createGridY("left", i, y, isActive, isLast);
				this.drawValueText("left", axis, i, values[i], domain, moveY, isActive);

				g.append(axis);
			}
		}

		this.drawRight = function(g, ticks, values, checkActive, moveY) {
			for (var i = 0, len = ticks.length; i < len; i++) {
				var domain = this.format(ticks[i], i),
					y = values[i] - moveY,
					isLast = (i == len - 1) && this.grid.type != "block",
					isActive = false;

				// 그리드 이미지 그리기
				this.drawImage("right", g, ticks[i], i, 0, y);

				// 도메인이 없으면 그리지 않음
				if (!domain && domain !== 0) {
					continue;
				}

				// 액티브 라인 체크
				if (_.typeCheck("function", checkActive)) {
					isActive = checkActive(ticks[i]);
				}

				var axis = this.createGridY("right", i, y, isActive, isLast);
				this.drawValueText("right", axis, i, values[i], domain, moveY, isActive);

				g.append(axis);
			}
		}

		/**
		 * @method drawGrid
		 * draw base grid structure
		 * @protected
		 * @param {chart.builder} chart
		 * @param {String} orient
		 * @param {String} cls
		 * @param {Grid} grid
		 */
		this.drawGrid = function() {
			// create group
			var root = this.chart.svg.group(),
				func = this[this.grid.orient],
				draw = (this.axis.isFull3D()) ? Draw3D : Draw2D;

			// wrapped scale
			this.scale = this.wrapper(this.scale, this.grid.key);

			// render axis
			if(_.typeCheck("function", func)) {
				draw.call(this);
				func.call(this, root);
			}

			// hide grid
			if(this.grid.hide) {
				root.attr({ display : "none" })
			}

			return {
				root : root,
				scale : this.scale
			};
		}

		/**
		 * @method drawAfter
		 *
		 * @param {Object} obj
		 * @protected
		 */
		this.drawAfter = function(obj) {
			obj.root.attr({ "class" : "grid-" + this.grid.type });
			obj.root.translate(this.chart.area("x") , this.chart.area("y"));
		}
	}

	CoreGrid.setup = function() {

		/** @property {chart.builder} chart */
		/** @property {chart.axis} axis */
		/** @property {Object} grid */

		return {
			/**  @cfg {Number} [dist=0] Able to change the locatn of an axis.  */
			dist: 0,
			/**  @cfg {"top"/"left"/"bottom"/"right"} [orient=null] Specifies the direction in which an axis is shown (top, bottom, left or right). */
			orient: null,
			/** @cfg {Boolean} [hide=false] Determines whether to display an applicable grid.  */
			hide: false,
			/** @cfg {String/Object/Number} [color=null] Specifies the color of a grid. */
			color: null,
			/** @cfg {String} [title=null] Specifies the text shown on a grid.*/
			title: null,
			/** @cfg {Boolean} [hide=false] Determines whether to display a line on the axis background. */
			line: false,
			/** @cfg {Function} [format=null]  Determines whether to format the value on an axis. */
			format: null,
			/** @cfg {Function} [image=null]  Determines whether to image the value on an axis. */
			image: null,
			/** @cfg {Number} [textRotate=null] Specifies the slope of text displayed on a grid. */
			textRotate : null
		};
	}

	return CoreGrid;
}, "chart.draw"); 

/***/ }),
/* 34 */
/***/ (function(module, exports) {

jui.define("chart.grid.block", [ "util.scale", "util.base" ], function(UtilScale, _) {

	/**
	 * @class chart.grid.block
	 * Implements Block Grid
	 *
	 *  { type : "block", domain : [ 'week1', 'week2', 'week3' ] }
	 *
	 * @extends chart.grid.core
	 */
	var BlockGrid = function() {
		this.center = function(g) {
			this.drawCenter(g, this.domain, this.points, null, this.half_band);
			this.drawBaseLine("center", g);
		}

		this.top = function(g) {
			this.drawPattern("top", this.domain, this.points, true);
			this.drawTop(g, this.domain, this.points, null, this.half_band);
			this.drawBaseLine("top", g);
			g.append(this.createGridX("top", this.domain.length, this.end, null, true));
		}

		this.bottom = function(g) {
			this.drawPattern("bottom", this.domain, this.points, true);
			this.drawBottom(g, this.domain, this.points, null, this.half_band);
			this.drawBaseLine("bottom", g);
			g.append(this.createGridX("bottom", this.domain.length, this.end, null, true));
		}

		this.left = function(g) {
			this.drawPattern("left", this.domain, this.points, true);
			this.drawLeft(g, this.domain, this.points, null, this.half_band);
			this.drawBaseLine("left", g);
			g.append(this.createGridY("left", this.domain.length, this.end, null, true));
		}

		this.right = function(g) {
			this.drawPattern("right", this.domain, this.points, true);
			this.drawRight(g, this.domain, this.points, null, this.half_band);
			this.drawBaseLine("right", g);
			g.append(this.createGridY("right", this.domain.length, this.end, null, true));
		}

		this.initDomain = function() {
			var domain = [];

			if (_.typeCheck("string", this.grid.domain)) {
				var field = this.grid.domain;
				var data = this.data();

				if (this.grid.reverse) {
					var start = data.length - 1,
						end = 0,
						step = -1;
				} else {
					var start = 0,
						end = data.length - 1,
						step = 1;
				}

				for (var i = start; ((this.grid.reverse) ? i >= end : i <=end); i += step) {
					domain.push(data[i][field]);
				}

			} else if (_.typeCheck("function", this.grid.domain)) {	// block 은 배열을 통째로 리턴함
				domain = this.grid.domain.call(this.chart);
			} else if (_.typeCheck("array", this.grid.domain)) {
				domain = this.grid.domain;
			}

			if (this.grid.reverse) {
				domain.reverse();
			}

			return domain;
		}

		this.wrapper = function(scale, key) {
			var old_scale = scale;
			var self = this;
			var len = self.domain.length;
			var reverse = self.grid.reverse;

			function new_scale(i) {
				if (typeof i == 'number' && key) {
					return old_scale(self.axis.data[i][key]);
				} else {
					return old_scale(reverse ? len - i - 1 : i);
				}

			}

			return (key) ? _.extend(new_scale, old_scale) : old_scale;
		}

		this.drawBefore = function() {
			var domain = this.initDomain(),
				obj = this.getGridSize(),
				range = [ obj.start, obj.end ];

			// scale 설정
			this.scale = UtilScale.ordinal().domain(domain);
			this.scale.rangePoints(range);

			this.start = obj.start;
			this.size = obj.size;
			this.end = obj.end;
			this.points = this.scale.range();
			this.domain = this.scale.domain();

			this.band = this.scale.rangeBand();
			this.half_band = this.band/2;
			this.bar = 6;
			this.reverse = this.grid.reverse;
		}

		this.draw = function() {
			return this.drawGrid("block");
		}
	}


	BlockGrid.setup = function() {
		return {
			/** @cfg {String/Array/Function} [domain=null] Sets the value displayed on an axis.*/
			domain: null,
			/** @cfg {Boolean} [reverse=false] Reverses the value on domain values*/
			reverse: false,
			/** @cfg {Number} [max=10] Sets the maximum value of a grid. */
			max: 10,
			/** @cfg {Boolean} [hideText=false] Determines whether to show text across the grid. */
			hideText: false,
			/** @cfg {String} [key=null] Sets the value on the grid to the value for the specified key. */
			key: null
		};
	}

	return BlockGrid;
}, "chart.grid.core");

/***/ }),
/* 35 */
/***/ (function(module, exports) {

jui.define("chart.grid.date", [ "util.time", "util.scale", "util.base" ], function(UtilTime, UtilScale, _) {

	/**
	 * @class chart.grid.date
	 * @extends chart.grid.core
	 */
	var DateGrid = function() {

		this.center = function(g) {
			this.drawCenter(g, this.ticks, this.values, null, 0);
			this.drawBaseLine("center", g);
		}

		this.top = function(g) {
			this.drawPattern("top", this.ticks, this.values);
			this.drawTop(g, this.ticks, this.values, null, 0);
			this.drawBaseLine("top", g);
		}

		this.bottom = function(g) {
			this.drawPattern("bottom", this.ticks, this.values);
			this.drawBottom(g, this.ticks, this.values, null, 0);
			this.drawBaseLine("bottom", g);
		}

		this.left = function(g) {
			this.drawPattern("left", this.ticks, this.values);
			this.drawLeft(g, this.ticks, this.values, null, 0);
			this.drawBaseLine("left", g);
		}

		this.right = function(g) {
			this.drawPattern("right", this.ticks, this.values);
			this.drawRight(g, this.ticks, this.values, null, 0);
			this.drawBaseLine("right", g);
		}

		this.wrapper = function(scale, key) {
			var old_scale = scale;
			var self = this;

			function new_scale(i) {
				if (typeof i == 'number') {
					return old_scale(self.axis.data[i][key]);
				} else {
					return old_scale(+i);
				}
			}

			return (key) ? _.extend(new_scale, old_scale) : old_scale;
		}

		this.initDomain = function() {
			var domain = [],
				interval = [];
			var min = this.grid.min || undefined,
				max = this.grid.max || undefined;
			var data = this.data(),
				value_list = [] ;

			if (_.typeCheck("string", this.grid.domain) ) {
				if (data.length > 0) {
					var field = this.grid.domain;
					value_list.push(+data[0][field]);
					value_list.push(+data[data.length-1][field]);
				}
			} else if (_.typeCheck("function", this.grid.domain)) {
				var index = data.length;

				while(index--) {
					var value = this.grid.domain.call(this.chart, data[index]);

					if (_.typeCheck("array", value)) {
						value_list[index] = Math.max.apply(Math, value);
						value_list.push(Math.min.apply(Math, value));
					} else {
						value_list[index]  = value;
					}
				}
			} else {
				value_list = this.grid.domain;
			}

			if (_.typeCheck("undefined", min) && value_list.length > 0 ) min = Math.min.apply(Math, value_list);
			if (_.typeCheck("undefined", max) && value_list.length > 0 ) max = Math.max.apply(Math, value_list);

			domain = [ min, max ];
			interval = this.grid.interval;

			if (this.grid.reverse) {
				domain.reverse();
			}

			if (_.typeCheck("function", interval)) {
				this.interval = interval.call(this.chart, domain);
			} else {
				this.interval = interval;
			}

			return domain;
		}

		this.drawBefore = function() {
			var domain = this.initDomain();

			var obj = this.getGridSize(),
				range = [obj.start, obj.end];

			this.scale = UtilScale.time().domain(domain).range(range);

			this.scale.clamp(this.grid.clamp);

			// 기본값 설정
			this.ticks = [];

			if (this.grid.realtime != null && UtilTime[this.grid.realtime] == this.grid.realtime) {
				var ticks = this.scale.realTicks(this.grid.realtime, this.interval);
			} else {
				var ticks = this.scale.ticks("milliseconds", this.interval);
			}

			/* data 없을 때도 기본 설정만으로 보여야 하기 때문에. 지우겠음
			if (this.axis.data.length == 0) {
				//this.ticks = [];
			} */

			if ( typeof this.grid.format == "string") {
				(function(grid, str) {
					grid.format = function(value) {
						return UtilTime.format(value, str);
					}
				})(this.grid, this.grid.format)
			}

			// interval = [this.time.days, 1];
			this.start = obj.start;
			this.size = obj.size;
			this.end = obj.end;
			this.bar = 6;
			this.values = [];

			for (var i = 0, len = ticks.length; i < len; i++) {
				var value = this.scale(ticks[i]);

				if (value >= obj.start && value <= obj.end) {
					this.values.push(value);
					this.ticks.push(ticks[i]);
				}
			}
		}

		this.draw = function() {
			return this.drawGrid("date");
		}
	}

	DateGrid.setup = function() {
		return {
			/** @cfg {Array} [domain=null] Sets the value displayed on a grid. */
			domain: null,
			/** @cfg {Number} [interval=1000] Sets the interval of the scale displayed on a grid.*/
			interval : 1000,
			/** @cfg {Number} [min=null] Sets the minimum timestamp of a grid.  */
			min: null,
			/** @cfg {Number} [max=null] Sets the maximum timestamp of a grid. */
			max: null,
			/** @cfg {Boolean} [reverse=false] Reverses the value on domain values*/
			reverse: false,
			/** @cfg {String} [key=null] Sets the value on the grid to the value for the specified key. */
			key: null,
			/** @cfg {"years"/"months"/"days"/"hours"/"minutes"/"seconds"/"milliseconds"} [realtime=""] Determines whether to use as a real-time grid. */
			realtime: null,
			/** @cfg {Boolean} [hideText=false] Determines whether to show text across the grid. */
			hideText: false
		};
	}

	return DateGrid;
}, "chart.grid.core");


/***/ }),
/* 36 */
/***/ (function(module, exports) {

jui.define("chart.grid.dateblock", [ "util.time", "util.scale", "util.base" ], function(UtilTime, UtilScale, _) {

	/**
	 * @class chart.grid.dateblock
	 * @extends chart.grid.date
	 */
	var DateBlockGrid = function() {

		this.wrapper = function(scale, key) {
			var old_scale = scale;
			var self = this;

			old_scale.rangeBand = function() {
				return self.grid.unit;
			}

			return old_scale;
		}

		this.initDomain = function() {
			var domain = [],
				interval = [];
			var min = this.grid.min || undefined,
				max = this.grid.max || undefined;
			var data = this.data(),
				value_list = [] ;

			if (_.typeCheck("string", this.grid.domain)) {
				var field = this.grid.domain;
				value_list.push(+data[0][field]);
				value_list.push(+data[data.length-1][field]);
			} else if (_.typeCheck("function", this.grid.domain)) {
				var index = data.length;

				while(index--) {
					var value = this.grid.domain.call(this.chart, data[index]);

					if (_.typeCheck("array", value)) {
						value_list[index] = +Math.max.apply(Math, value);
						value_list.push(+Math.min.apply(Math, value));
					} else {
						value_list[index]  = +value;
					}
				}
			} else {
				value_list = this.grid.domain;
			}

			if (_.typeCheck("undefined", min)) min = Math.min.apply(Math, value_list);
			if (_.typeCheck("undefined", max)) max = Math.max.apply(Math, value_list);

			domain = [ min, max ];
			interval = this.grid.interval;

			if (this.grid.reverse) {
				domain.reverse();
			}

			if (_.typeCheck("function", interval)) {
				domain.interval = interval.call(this.chart, domain);
			} else {
				domain.interval = interval;
			}

			return domain;
		}

		this.drawBefore = function() {
			var domain = this.initDomain(),
				obj = this.getGridSize(), range = [obj.start, obj.end],
				time = UtilScale.time().domain(domain).rangeRound(range);

			if (this.grid.realtime != null && UtilTime[this.grid.realtime] == this.grid.realtime) {
				this.ticks = time.realTicks(this.grid.realtime, domain.interval);
			} else {
				this.ticks = time.ticks("milliseconds", domain.interval);
			}

			var len = this.axis.data.length - 1;
			var unit = this.grid.unit = Math.abs(range[0] - range[1])/(len);

			if ( typeof this.grid.format == "string") {
				(function(grid, str) {
					grid.format = function(value) {
						return UtilTime.format(value, str);
					}
				})(this.grid, this.grid.format)
			}

			// interval = [this.time.days, 1];
			this.start = obj.start;
			this.size = obj.size;
			this.end = obj.end;
			this.bar = 6;
			this.values = [];

			for (var i = 0, len = this.ticks.length; i < len; i++) {
				this.values[i] = time(this.ticks[i]);
			}

			var self = this;
			this.scale = _.extend((function(i) {
				// area 시작 영역 추가
				return  self.start + i * unit;
			}), time);

		}

		this.draw = function() {
			return this.drawGrid("dateblock");
		}
	}

	return DateBlockGrid;
}, "chart.grid.date");


/***/ }),
/* 37 */
/***/ (function(module, exports) {

jui.define("chart.grid.fullblock", [ "util.scale", "util.base" ], function(UtilScale, _) {

    /**
     * @class chart.grid.block
     * @extends chart.grid.core
     */
    var FullBlockGrid = function() {
        this.center = function(g) {
            this.drawCenter(g, this.domain, this.points, null, 0);
            this.drawBaseLine("center", g);
        }

        this.top = function(g) {
            this.drawPattern("top", this.domain, this.points);
            this.drawTop(g, this.domain, this.points, null, 0);
            this.drawBaseLine("top", g);
        }

        this.bottom = function(g) {
            this.drawPattern("bottom", this.domain, this.points);
            this.drawBottom(g, this.domain, this.points, null, 0);
            this.drawBaseLine("bottom", g);
        }

        this.left = function(g) {
            this.drawPattern("left", this.domain, this.points);
            this.drawLeft(g, this.domain, this.points, null, 0);
            this.drawBaseLine("left", g);
        }

        this.right = function(g) {
            this.drawPattern("right", this.domain, this.points);
            this.drawRight(g, this.domain, this.points, null, 0);
            this.drawBaseLine("right", g);
        }

        this.initDomain = function() {
            var domain = [];

            if (_.typeCheck("string", this.grid.domain)) {
                var field = this.grid.domain;
                var data = this.data();

                if (this.grid.reverse) {
                    var start = data.length - 1,
                        end = 0,
                        step = -1;
                } else {
                    var start = 0,
                        end = data.length - 1,
                        step = 1;
                }

                for (var i = start; ((this.grid.reverse) ? i >= end : i <=end); i += step) {
                    domain.push(data[i][field]);
                }

            } else if (_.typeCheck("function", this.grid.domain)) {	// block 은 배열을 통째로 리턴함
                domain = this.grid.domain.call(this.chart);
            } else if (_.typeCheck("array", this.grid.domain)) {
                domain = this.grid.domain;
            }

            if (this.grid.reverse) {
                domain.reverse();
            }

            return domain;
        }

        this.wrapper = function(scale, key) {
            var old_scale = scale;
            var self = this;
            var len = self.domain.length;
            var reverse = self.grid.reverse;

            function new_scale(i) {
                if (typeof i == 'number' && key) {
                    return old_scale(self.axis.data[i][key]);
                } else {
                    return old_scale(reverse ? len - i : i);
                }

            }

            return (key) ? _.extend(new_scale, old_scale) : old_scale;
        }

        this.drawBefore = function() {
            var domain = this.initDomain();

            var obj = this.getGridSize();

            // scale 설정
            this.scale = UtilScale.ordinal().domain(domain);
            var range = [obj.start, obj.end];

            this.scale.rangeBands(range);

            this.start = obj.start;
            this.size = obj.size;
            this.end = obj.end;
            this.points = this.scale.range();
            this.domain = this.scale.domain();

            this.band = this.scale.rangeBand();
            this.half_band = 0 ;
            this.bar = 6;
            this.reverse = this.grid.reverse;
        }

        this.draw = function() {
            return this.drawGrid("fullblock");
        }
    }


    FullBlockGrid.setup = function() {
        return {
            /** @cfg {String/Array/Function} [domain=null] Sets the value displayed on an axis.*/
            domain: null,
            /** @cfg {Boolean} [reverse=false] Reverses the value on domain values*/
            reverse: false,
            /** @cfg {Number} [max=10] Sets the maximum value of a grid. */
            max: 10,
            /** @cfg {Boolean} [hideText=false] Determines whether to show text across the grid. */
            hideText: false
        };
    }

    return FullBlockGrid;
}, "chart.grid.core");


/***/ }),
/* 38 */
/***/ (function(module, exports) {

jui.define("chart.grid.radar", [ "util.math", "util.base" ], function(math, _) {

	/**
	 * @class chart.grid.radar
	 * @extends chart.grid.core
	 */
	var RadarGrid = function() {
		var self = this,
			position = [];

		function drawCircle(root, centerX, centerY, x, y, count) {
			var r = Math.abs(y),
				cx = centerX,
				cy = centerY;

			root.append(self.chart.svg.circle({
				cx : cx,
				cy : cy,
				r : r,
				"fill-opacity" : 0,
				stroke : self.color("gridBorderColor"),
				"stroke-width" : self.chart.theme("gridBorderWidth")
			}));
		}

		function drawRadial(root, centerX, centerY, x, y, count, unit) {
			var g = self.chart.svg.group();
			var points = [];

			points.push([centerX + x, centerY + y]);

			var startX = x,
				startY = y;

			for (var i = 0; i < count; i++) {
				var obj = math.rotate(startX, startY, unit);

				startX = obj.x;
				startY = obj.y;

				points.push([centerX + obj.x, centerY + obj.y]);
			}

			var path = self.chart.svg.path({
				"fill" : "none",
				stroke : self.color("gridBorderColor"),
				"stroke-width" : self.chart.theme("gridBorderWidth")
			});

			for (var i = 0; i < points.length; i++) {
				var point = points[i];

				if (i == 0) {
					path.MoveTo(point[0], point[1])
				} else {
					path.LineTo(point[0], point[1]);
				}
			}

			path.LineTo(points[0][0], points[0][1]);
			//path.ClosePath();

			g.append(path);
			root.append(g);
		}

        function scale(obj) {
            var max = self.grid.max;

            var dx = self.chart.padding('left');
            var dy = self.chart.padding('top');

            return function(index, value) {
                var rate = value / max;

				var height = Math.abs(obj.y1) - Math.abs(obj.y2),
					pos = height * rate,
					unit = 2 * Math.PI / self.domain.length;

				var cx = obj.x1,
					cy = obj.y1,
					y = -pos,
					x = 0;

                var o = math.rotate(x, y, unit * index);
                
                var result = {
                    x : dx + cx + o.x,
                    y : dy + cy + o.y
                }

                return result;
            }
        }

		this.initDomain = function() {
			var domain = [];
			if (_.typeCheck("string", this.grid.domain)) {
				var field = this.grid.domain;
				var data = this.data();

				if (this.grid.reverse) {
					var start = data.length - 1,
						end = 0,
						step = -1;
				} else {
					var start = 0,
						end = data.length - 1,
						step = 1;
				}

				for (var i = start; ((this.grid.reverse) ? i >= end : i <=end); i += step) {
					domain.push(data[i][field]);
				}

				//grid.domain = domain;
			} else if (_.typeCheck("function", this.grid.domain)) {	// block 은 배열을 통째로 리턴함
				domain = this.grid.domain(this.chart, this.grid);
			} else {
				domain = this.grid.domain;
			}

			if (this.grid.reverse) {
				domain.reverse();
			}

			return domain;

		}

		this.drawBefore = function() {
			this.domain = this.initDomain();
		}

		this.draw = function() {
			var width = this.axis.area('width'), height = this.axis.area('height');
			var min = width;

			if (height < min) {
				min = height;
			}

			// center
			var w = min / 2,
				centerX = this.axis.area('x') + width / 2,
				centerY = this.axis.area('y') + height / 2;

			var startY = -w,
				startX = 0,
				count = this.domain.length,
				step = this.grid.step,
				unit = 2 * Math.PI / count,
				h = Math.abs(startY) / step;

			var g = this.chart.svg.group(),
				root = this.chart.svg.group();

			g.append(root);

			// domain line
			position = [];

			for (var i = 0; i < count; i++) {
				var x2 = centerX + startX,
					y2 = centerY + startY;

				root.append(this.chart.svg.line({
					x1 : centerX,
					y1 : centerY,
					x2 : x2,
					y2 : y2,
					stroke : this.color("gridAxisBorderColor"),
					"stroke-width" : this.chart.theme("gridBorderWidth")
				}));

				position[i] = {
					x1 : centerX,
					y1 : centerY,
					x2 : x2,
					y2 : y2
				};

				var ty = y2,
					tx = x2,
					talign = "middle";

				if (y2 > centerY) {
					ty = y2 + 20;
				} else if (y2 < centerY) {
					ty = y2 - 10;
				}

				if (x2 > centerX) {
					talign = "start";
					tx += 10;
				} else if (x2 < centerX) {
					talign = "end";
					tx -= 10;
				}

				if (!this.grid.hideText) {
					root.append(this.chart.text({
						x : tx,
						y : ty,
						"text-anchor" : talign,
						"font-size" : this.chart.theme("gridCFontSize"),
						"font-weight" : this.chart.theme("gridCFontWeight"),
						fill : this.chart.theme("gridCFontColor")
					}, this.domain[i]))
				}
				
				var obj = math.rotate(startX, startY, unit);

				startX = obj.x;
				startY = obj.y;
			}

			if (!this.grid.line) {
				return {
					root : root , 
					scale : scale(position[0])
				};
			}

			// area split line
			startY = -w;
			var stepBase = 0,
				stepValue = this.grid.max / this.grid.step;

			for (var i = 0; i < step; i++) {
				if (i == 0 && this.grid.extra) {
					startY += h;
					continue;
				}

				if (this.grid.shape == "circle") {
					drawCircle(root, centerX, centerY, 0, startY, count);
				} else {
					drawRadial(root, centerX, centerY, 0, startY, count, unit);
				}

				if (!this.grid.hideText) {
					root.append(this.chart.text({
						x : centerX,
						y : centerY + (startY + h - 5),
						"font-size" : this.chart.theme("gridCFontSize"),
						"font-weight" : this.chart.theme("gridCFontWeight"),
						fill : this.chart.theme("gridCFontColor")
					}, (this.grid.max - stepBase) + ""))
				}

				startY += h;
				stepBase += stepValue;
			}
			
			// hide
			if (this.grid.hide) {
				root.attr({ display : "none" })
			}			

			return {
				root : root, 
				scale : scale(position[0])
			};
		}
	}

	RadarGrid.setup = function() {
		return {
			/** @cfg {String/Array/Function} [domain=null] Sets the value displayed on an axis.*/
			domain: null,
			/** @cfg {Boolean} [reverse=false] Reverses the value on domain values*/
			reverse: false,
			/** @cfg {Number} [max=null] Sets the maximum value of a grid. */
			max: 100,
			/** @cfg {Array} [step=10] Sets the interval of the scale displayed on a grid. */
            step : 10,
			/** @cfg {Boolean} [line=true] Determines whether to display a line on the axis background. */
			line: true,
			/** @cfg {Boolean} [hideText=false] Determines whether to show text across the grid. */
			hideText: false,
			/** @cfg {Boolean} [extra=false] Leaves a certain spacing distance from the grid start point and displays a line where the spacing ends. */
			extra: false,
			/** @cfg {"radial"/"circle"} [shape="radial"] Determines the shape of a grid (radial, circle). */
			shape: "radial" // or circle
		};
	}

	return RadarGrid;
}, "chart.grid.core");


/***/ }),
/* 39 */
/***/ (function(module, exports) {

jui.define("chart.grid.range", [ "util.scale", "util.base", "util.math" ], function(UtilScale, _, math) {

	/**
	 * @class chart.grid.range
	 * @extends chart.grid.core
	 */
	var RangeGrid = function() {
		this.center = function(g) {
			var min = this.scale.min(),
				max = this.scale.max();

			this.drawCenter(g, this.ticks, this.values, function(tick) {
				return tick == 0 && tick != min && tick != max;
			}, 0);
			this.drawBaseLine("center", g);
		}

		this.top = function(g) {
			this.drawPattern("top", this.ticks, this.values);
			var min = this.scale.min(),
				max = this.scale.max();

			this.drawTop(g, this.ticks, this.values, function(tick) {
				return tick == 0 && tick != min && tick != max;
			}, 0);
			this.drawBaseLine("top", g);
		}

		this.bottom = function(g) {
			this.drawPattern("bottom", this.ticks, this.values);
			var min = this.scale.min(),
				max = this.scale.max();

			this.drawBottom(g, this.ticks, this.values, function(tick) {
				return tick == 0 && tick != min && tick != max;
			}, 0);
			this.drawBaseLine("bottom", g);
		}

		this.left = function(g) {
			this.drawPattern("left", this.ticks, this.values);
			var min = this.scale.min(),
				max = this.scale.max();

			this.drawLeft(g, this.ticks, this.values, function(tick) {
				return tick == 0 && tick != min && tick != max;
			}, 0);
			this.drawBaseLine("left", g);
		}

		this.right = function(g) {
			this.drawPattern("right", this.ticks, this.values);
			var min = this.scale.min(),
				max = this.scale.max();

			this.drawRight(g, this.ticks, this.values, function(tick) {
				return tick == 0 && tick != min && tick != max;
			}, 0);
			this.drawBaseLine("right", g);
		}

        this.wrapper = function(scale, key) {
            var old_scale = scale;
            var self = this;

            function new_scale(i) {
                return old_scale(self.axis.data[i][key]);
            }

            return (key) ? _.extend(new_scale, old_scale) : old_scale;
        }

		this.initDomain = function() {

			var domain = [];
			var min = this.grid.min || undefined,
				max = this.grid.max || undefined,
				data = this.data();
			var value_list = [];
			var isArray = false;

			if (_.typeCheck("string", this.grid.domain)) {
				var field = this.grid.domain;

				value_list = new Array(data.length);
				var index = data.length;
				while(index--) {
					var value = data[index][field];

					if (_.typeCheck("array", value)) {
						value_list[index] = Math.max(value);
						value_list.push(Math.min(value));
					} else {
						value_list[index]  = value;
						value_list.push(0);
					}
				}
			} else if (_.typeCheck("function", this.grid.domain)) {
				value_list = new Array(data.length);

                var isCheck = false;
				var index = data.length;
				while(index--) {

					var value = this.grid.domain.call(this.chart, data[index]);

					if (_.typeCheck("array", value)) {

						value_list[index] = Math.max.apply(Math, value);
						value_list.push(Math.min.apply(Math, value));
					} else {
						value_list[index]  = value;

                        if (!isCheck) {
                            value_list.push(0);
                            isCheck = true;
                        }

					}
				}
			} else {
				value_list = this.grid.domain;
				isArray = true;
			}

			var tempMin = Math.min.apply(Math, value_list);
			var tempMax = Math.max.apply(Math, value_list);

			if (isArray) {
				min = tempMin;
				max = tempMax;
			} else {
				if (typeof min == 'undefined' || min > tempMin) min = tempMin;
				if (typeof max == 'undefined' || max < tempMax) max = tempMax;
			}

			var unit;
			var hasUnit = true;
			if (_.typeCheck("function", this.grid.unit)) {
				unit = this.grid.unit.call(this.chart, this.grid);
			} else if (_.typeCheck("number", this.grid.unit)) {
				unit = this.grid.unit;
			} else {

				if (min > 0) {
					min = Math.floor(min);
				}

				unit = math.div((max - min), this.grid.step);   // (max - min) / this.grid.step

				if (unit > 1) {
					unit = Math.ceil(unit);
				} else if (0 < unit && unit < 1) {
					unit = math.div(Math.ceil(math.multi(unit, 10)),10);
				}

			}

			if (unit == 0) {
				domain = [0, 0];
			} else {

				var start = 0;

				var fixed = math.fixed(unit);
				while (start < max) {
					start = fixed.plus(start, unit);
				}

				var end = start;
				while (end > min) {
				  end = fixed.minus(end, unit);
				}
        
				domain = [end, start];

				domain.step = (Math.abs(end - start) / unit);

			}

			if (this.grid.reverse) {
				domain.reverse();
			}
            
			return domain;
		}

		this.drawBefore = function() {
			var domain = this.initDomain();

			var obj = this.getGridSize();

			this.scale = UtilScale.linear().domain(domain);

			if (this.grid.orient == "left" || this.grid.orient == "right") {
                var arr = [obj.end, obj.start];
			} else {
                var arr = [obj.start, obj.end]
			}

            this.scale.range(arr);
			this.scale.clamp(this.grid.clamp)

			this.start = obj.start;
			this.size = obj.size;
			this.end = obj.end;
			this.step = domain.step;
			this.nice = this.grid.nice;
			this.ticks = this.scale.ticks(this.step, this.nice);

			if (this.grid.orient == 'left' || this.grid.orient == 'right') {
				this.ticks.reverse();
			}

			this.bar = 6;

			this.values = [];

			for (var i = 0, len = this.ticks.length; i < len; i++) {
				this.values[i] = this.scale(this.ticks[i]);
			}

		}

		this.draw = function() {
			return this.drawGrid("range");
		}
	}

	RangeGrid.setup = function() {
		return {
			/** @cfg {String/Array/Function} [domain=null] Sets the value displayed on an axis.*/
			domain: null,
			/** @cfg {Array} [step=10] Sets the interval of the scale displayed on a grid. */
			step: 10,
			/** @cfg {Number} [min=0] Sets the minimum value of a grid.  */
			min: 0,
			/** @cfg {Number} [max=0] Sets the maximum value of a grid. */
			max: 0,
			/** @cfg {Number} [unit=null] Multiplies the axis value to be displayed.  */
			unit: null,
			/**
			 * @cfg {Boolean} [clamp=true]
			 *
			 * max 나 min 을 넘어가는 값에 대한 체크,
			 * true 이면 넘어가는 값도 min, max 에서 조정, false 이면  비율로 계산해서 넘어가는 값 적용
			 */
			clamp : true,
			/** @cfg {Boolean} [reverse=false] Reverses the value on domain values*/
			reverse: false,
			/** @cfg {String} [key=null] Sets the value on the grid to the value for the specified key. */
			key: null,
			/** @cfg {Boolean} [hideText=false] Determines whether to show text across the grid. */
			hideText: false,
			/** @cfg {Boolean} [nice=false] Automatically sets the value of a specific section.  */
			nice: false
		};
	}

	return RangeGrid;
}, "chart.grid.core");


/***/ }),
/* 40 */
/***/ (function(module, exports) {

jui.define("chart.grid.log", [ "util.scale", "util.base" ], function(UtilScale, _) {

	/**
	 * @class chart.grid.log
	 * @extends chart.grid.range
	 */
	var LogGrid = function() {

		this.drawBefore = function() {
			this.grid.unit = false;

			var domain = this.initDomain();

			var obj = this.getGridSize();

			this.scale = UtilScale.log(this.grid.base).domain(domain);

			if (this.grid.orient == "left" || this.grid.orient == "right") {
                var arr = [obj.end, obj.start];
			} else {
                var arr = [obj.start, obj.end]
			}
            this.scale.range(arr);

			this.start = obj.start;
			this.size = obj.size;
			this.end = obj.end;
			this.step = this.grid.step;
			this.nice = this.grid.nice;
			this.ticks = this.scale.ticks(this.step, this.nice);

			if (this.grid.orient == 'left' || this.grid.orient == 'right') {
				this.ticks.reverse();
			}

			this.bar = 6;

			this.values = [];

			for (var i = 0, len = this.ticks.length; i < len; i++) {
				this.values[i] = this.scale(this.ticks[i]);
			}

		}

		this.draw = function() {
			return this.drawGrid("log");
		}
	}

	LogGrid.setup = function() {
		return {
			/** @cfg {Number} [base=10] log's base */
			base : 10,
			step : 4,
			nice : false,
			/** @cfg {Boolean} [hideText=false] Determines whether to show text across the grid. */
			hideText: false
		};
	}

	return LogGrid;
}, "chart.grid.range");


/***/ }),
/* 41 */
/***/ (function(module, exports) {

jui.define("chart.grid.rule", [ "util.scale", "util.base" ], function(UtilScale, _) {

	/**
	 * @class chart.grid.rule
	 * @extends chart.grid.core
	 */
	var RuleGrid = function() {

		this.top = function(g) {
			var height = this.axis.area('height'),
				half_height = height/2;

			g.append(this.axisLine({
				y1 : this.center ? half_height : 0,
				y2 : this.center ? half_height : 0,
				x1 : this.start,
				x2 : this.end
			}));

			var ticks = this.ticks,
				values = this.values,
				bar = this.bar;

			for (var i = 0; i < ticks.length; i++) {
				var domain = this.format(ticks[i], i);

				if (!domain && domain !== 0) {
					continue;
				}

				var isZero = (ticks[i] == 0),
					axis = this.chart.svg.group().translate(values[i], (this.center) ? half_height : 0)

				axis.append(this.line({
				  y1 : (this.center) ? -bar : 0,
					y2 : bar,
					stroke : this.color("gridAxisBorderColor"),
					"stroke-width" : this.chart.theme("gridBorderWidth")
				}));

				if (!isZero || (isZero && !this.hideZero)) {
					axis.append(this.getTextRotate(this.chart.text({
						x : 0,
						y : bar + bar + 4,
						"text-anchor" : "middle",
						fill : this.chart.theme("gridFontColor")
					}, domain)));
				}

				g.append(axis);
			}
		}

		this.bottom = function(g) {
			var height = this.axis.area('height'),
				half_height = height/2;
		  
			g.append(this.axisLine({
				y1 : this.center ? -half_height : 0,
				y2 : this.center ? -half_height : 0,
				x1 : this.start,
				x2 : this.end
			}));

			var ticks = this.ticks,
				values = this.values,
				bar = this.bar;

			for (var i = 0; i < ticks.length; i++) {
				var domain = this.format(ticks[i], i);

				if (!domain && domain !== 0) {
					continue;
				}

				var isZero = (ticks[i] == 0),
					axis = this.chart.svg.group().translate(values[i], (this.center) ? -half_height : 0);

				axis.append(this.line({
				  y1 : (this.center) ? -bar : 0,
					y2 : (this.center) ? bar : -bar,
					stroke : this.color("gridAxisBorderColor"),
					"stroke-width" : this.chart.theme("gridBorderWidth")
				}));
				
				if (!isZero ||  (isZero && !this.hideZero)) {
					axis.append(this.getTextRotate(this.chart.text({
						x : 0,
						y : -bar * 2,
						"text-anchor" : "middle",
						fill : this.chart.theme(isZero, "gridActiveFontColor", "gridFontColor")
					}, domain)));
				}

				g.append(axis);
			}
		}

		this.left = function(g) {
			var width = this.axis.area('width'),
				height = this.axis.area('height'),
				half_width = width/2;

			g.append(this.axisLine({
				x1 : this.center ? half_width : 0,
				x2 : this.center ? half_width : 0,
				y1 : this.start ,
				y2 : this.end
			}));

			var ticks = this.ticks,
				values = this.values,
				bar = this.bar;

			for (var i = 0; i < ticks.length; i++) {
				var domain = this.format(ticks[i], i);

				if (!domain && domain !== 0) {
					continue;
				}

				var isZero = (ticks[i] == 0),
					axis = this.chart.svg.group().translate((this.center) ? half_width : 0, values[i])

				axis.append(this.line({
					x1 : (this.center) ? -bar : 0,
					x2 : bar,
					stroke : this.color("gridAxisBorderColor"),
					"stroke-width" : this.chart.theme("gridBorderWidth")
				}));
				
				if (!isZero ||  (isZero && !this.hideZero)) {
					axis.append(this.getTextRotate(this.chart.text({
					  x : bar/2 + 4,
					  y : bar-2,
					  fill : this.chart.theme("gridFontColor")
					}, domain)));
				}

				g.append(axis);
			}
		}

		this.right = function(g) {
			var width = this.axis.area('width'),
				half_width = width/2;

			g.append(this.axisLine({
				x1 : this.center ? -half_width : 0,
				x2 : this.center ? -half_width : 0,
				y1 : this.start ,
				y2 : this.end
			}));

			var ticks = this.ticks,
				values = this.values,
				bar = this.bar;

			for (var i = 0; i < ticks.length; i++) {
				var domain = this.format(ticks[i], i);

				if (!domain && domain !== 0) {
					continue;
				}

				var isZero = (ticks[i] == 0),
					axis = this.chart.svg.group().translate((this.center) ? -half_width : 0, values[i]);

				axis.append(this.line({
					x1 : (this.center) ? -bar : 0,
					x2 : (this.center) ? bar : -bar,
					stroke : this.color("gridAxisBorderColor"),
					"stroke-width" : this.chart.theme("gridBorderWidth")
				}));

				if (!isZero ||  (isZero && !this.hideZero)) {
					axis.append(this.getTextRotate(this.chart.text({
						x : -bar - 4,
						y : bar-2,
						"text-anchor" : "end",
						fill : this.chart.theme("gridFontColor")
					}, domain)));
				}

				g.append(axis);
			}
		}

        this.wrapper = function(scale, key) {
            var old_scale = scale;
            var self = this;

            function new_scale(i) {
                return old_scale(self.axis.data[i][key]);
            }

            return (key) ? _.extend(new_scale, old_scale) : old_scale;
        }

        this.initDomain = function() {

			var domain = [];
            var min = this.grid.min || undefined,
                max = this.grid.max || undefined,
                data = this.data();
            var value_list = [];

            if (_.typeCheck("string", this.grid.domain)) {
                var field = this.grid.domain;

                value_list = new Array(data.length);
                for (var index = 0, len = data.length; index < len; index++) {

                    var value = data[index][field];

                    if (_.typeCheck("array", value)) {
                        value_list[index] = Math.max(value);
                        value_list.push(Math.min(value));
                    } else {
                        value_list[index]  = value;
                    }

                }
            } else if (_.typeCheck("function", this.grid.domain)) {
                value_list = new Array(data.length);

                for (var index = 0, len = data.length; index < len; index++) {

                    var value = this.grid.domain.call(this.chart, data[index]);

                    if (_.typeCheck("array", value)) {

                        value_list[index] = Math.max.apply(Math, value);
                        value_list.push(Math.min.apply(Math, value));
                    } else {
                        value_list[index]  = value;
                    }
                }
            } else {
                value_list = grid.domain;
            }

            var tempMin = Math.min.apply(Math, value_list);
            var tempMax = Math.max.apply(Math, value_list);

            if (typeof min == 'undefined') min = tempMin;
            if (typeof max == 'undefined') max = tempMax;

            this.grid.max = max;
            this.grid.min = min;

            var unit;

            if (_.typeCheck("function", this.grid.unit)) {
                unit = this.grid.unit.call(this.chart, this.grid);
            } else if (_.typeCheck("number", this.grid.unit)) {
                unit = this.grid.unit;
            } else {
                unit = Math.ceil((max - min) / this.grid.step);
            }

            if (unit == 0) {
                domain = [0, 0];
            } else {

                var start = 0;

                while (start < max) {
                    start += unit;
                }

                var end = start;
                while (end > min) {
                    end -= unit;
                }

                domain = [end, start];
                //this.grid.step = Math.abs(start / unit) + Math.abs(end / unit);
            }

            if (this.grid.reverse) {
                domain.reverse();
            }

            return domain;
        }

		this.drawBefore = function() {
			var domain = this.initDomain();

			var obj = this.getGridSize();
			this.scale = UtilScale.linear().domain(domain);

            if (this.grid.orient == "left" || this.grid.orient == "right") {
                var arr = [obj.end, obj.start];
            } else {
                var arr = [obj.start, obj.end]
            }
            this.scale.range(arr);

			this.start = obj.start;
			this.size = obj.size;
			this.end = obj.end;
			this.step = this.grid.step;
			this.nice = this.grid.nice;
			this.ticks = this.scale.ticks(this.step, this.nice);
			this.bar = 6;
			this.hideZero = this.grid.hideZero;
			this.center = this.grid.center;
			this.values = [];

			for (var i = 0, len = this.ticks.length; i < len; i++) {
				this.values[i] = this.scale(this.ticks[i]);
			}
		}

		this.draw = function() {
			return this.drawGrid(chart, orient, "rule", grid);
		}
	}

	RuleGrid.setup = function() {
		return {
			/** @cfg {String/Array/Function} [domain=null] Sets the value displayed on an axis.*/
			domain: null,
			/** @cfg {Array} [step=10] Sets the interval of the scale displayed on a grid. */
			step: 10,
			/** @cfg {Number} [min=0] Sets the minimum value of a grid.  */
			min: 0,
			/** @cfg {Number} [max=0] Sets the maximum value of a grid. */
			max: 0,
			/** @cfg {Number} [unit=null] Multiplies the axis value to be displayed.  */
			unit: null,
			/**
			 * @cfg {Boolean} [clamp=true]
			 *
			 * max 나 min 을 넘어가는 값에 대한 체크,
			 * true 이면 넘어가는 값도 min, max 에서 조정, false 이면  비율로 계산해서 넘어가는 값 적용
			 */
			clamp : true,
			/** @cfg {Boolean} [reverse=false] Reverses the value on domain values*/
			reverse: false,
			/** @cfg {String} [key=null] Sets the value on the grid to the value for the specified key. */
			key: null,
			/** @cfg {Boolean} [hideText=false] Determines whether to show text across the grid. */
			hideText: false,
			/** @cfg {Boolean} [hideZero=false] Determines whether to show '0' displayed on the grid. */
			hideZero: false,
			/** @cfg {Boolean} [nice=false] Automatically sets the value of a specific section.  */
			nice: false,
			/** @cfg {Boolean} [center=false] Place the reference axis in the middle.  */
			center: false

		};
	}

	return RuleGrid;
}, "chart.grid.core");


/***/ }),
/* 42 */
/***/ (function(module, exports) {

jui.define("chart.grid.panel", [ "util.base" ], function(_) {

    /**
     * @class chart.grid.panel
     * @extends chart.grid.core
     */
    var PanelGrid = function() {

        this.custom = function(g) {
            var obj = this.scale(0);

            obj.x -= this.axis.area("x");
            obj.y -= this.axis.area("y");

            g.append(this.chart.svg.rect(_.extend(obj, {
                fill : "transparent",
                stroke : "transparent"
            })));
        }

        this.drawBefore = function() {
            this.scale = (function(axis) {
                return function(i) {

                    return {
                        x : axis.area("x"),
                        y : axis.area("y"),
                        width : axis.area("width"),
                        height : axis.area("height")
                    }
                }
            })(this.axis);
        }

        this.draw = function() {
            this.grid.hide = true;
            return this.drawGrid("panel");
        }
    }
    
    return PanelGrid;
}, "chart.grid.core");


/***/ }),
/* 43 */
/***/ (function(module, exports) {

jui.define("chart.grid.table", [  ], function() {

    /**
     * @class chart.grid.table
     * @extends chart.grid.core
     */
    var TableGrid = function(chart, axis, grid) {
        var rowUnit, columnUnit, outerPadding, row, column ;

        this.custom = function(g) {
            for(var r = 0; r < row; r++) {
                for (var c = 0; c < column; c++) {
                    var index = r * column + c;

                    var obj = this.scale(index);
                    
                    obj.x -= this.axis.area('x');
                    obj.y -= this.axis.area('y');

                    var rect = this.chart.svg.rect(_.extend(obj, {
                        fill : "tranparent",
                        stroke : "black"
                    }));

                    //g.append(rect);
                }
            }
        }

        this.drawBefore = function() {

            var row = this.grid.rows;
            var column = this.grid.columns;
            
            padding = this.grid.padding;
            
            var columnUnit = (this.axis.area('width') -  (column - 1) * padding) / column;
            var rowUnit = (this.axis.area('height') - (row - 1) * padding ) / row;

            // create scale
            this.scale = (function(axis, row, column, rowUnit, columnUnit) {
                return function(i) {

                    var r = Math.floor(i  / column) ;
                    var c = i % column;

                    var x = c * columnUnit;
                    var y = r * rowUnit;

                    var space = padding * c;
                    var rspace = padding * r;

                    return {
                        x : axis.area('x') + x +  space,
                        y : axis.area('y') + y + rspace,
                        width : columnUnit,
                        height : rowUnit
                    }
                }
            })(this.axis, row, column, rowUnit, columnUnit);
        }

        this.draw = function() {
            this.grid.hide = true;
            return this.drawGrid("table");
        }
    }

    TableGrid.setup = function() {
        return {
            /** @cfg {Number} [rows=1] row count in table  */
            rows: 1,
            /** @cfg {Number} [column=1] column count in table  */
            columns: 1,
            /** @cfg {Number} [padding=1] padding in table  */
            padding: 10
        };
    }
    
    return TableGrid;
}, "chart.grid.core");


/***/ }),
/* 44 */
/***/ (function(module, exports) {

jui.define("chart.grid.overlap", [ "util.base" ], function(_) {

    /**
     * @class chart.grid.overlap
     * @extends chart.grid.core
     */
    var OverlapGrid = function() {
        var size, widthUnit, heightUnit, width, height ;

        this.custom = function() {
            for(var i = 0, len = this.axis.data.length; i < len; i++) {
                var obj = this.scale(i);

                obj.x -= this.axis.area("x");
                obj.y -= this.axis.area("y");

                this.chart.svg.rect(_.extend(obj, {
                    fill : "transparent",
                    stroke : "transparent"
                }));
            }
        }

        this.drawBefore = function() {
            size = this.grid.count || this.axis.data.length ||  1;

            widthUnit = (this.axis.area('width') / 2) / size;
            heightUnit = (this.axis.area('height') / 2) / size;

            width = this.axis.area('width');
            height = this.axis.area('height');

            // create scale
            this.scale = (function(axis) {
                return function(i) {

                    var x = i * widthUnit;
                    var y = i * heightUnit;

                    return {
                        x : axis.area('x') + x,
                        y : axis.area('y') + y,
                        width : Math.abs(width/2 - x)*2,
                        height : Math.abs(height/2 - y)*2
                    }

                }
            })(this.axis);

        }

        this.draw = function() {
            this.grid.hide = true;
            return this.drawGrid("overlap");
        }

    }

    OverlapGrid.setup = function() {
        return {
            /** @cfg {Number} [count=null] Splited count  */
            count : null
        }
    }
    
    return OverlapGrid;
}, "chart.grid.core");


/***/ }),
/* 45 */
/***/ (function(module, exports) {

jui.define("chart.topology.sort.random", [], function() {
    return function(data, area, space) {
        var xy = [];

        for(var i = 0; i < data.length; i++) {
            var x = Math.floor(Math.random() * (area.width - space)),
                y = Math.floor(Math.random() * (area.height - space));

            xy[i] = {
                x: area.x + x,
                y: area.y + y
            };
        }

        return xy;
    }
});

jui.define("chart.topology.sort.linear", [], function() {
    var cache = {};

    function getRandomRowIndex(row_cnt) {
        var row_index = Math.floor(Math.random() * row_cnt);

        if(cache[row_index]) {
            var cnt = 0;
            for(var k in cache) { cnt++; }

            if(cnt < row_cnt) {
                return getRandomRowIndex(row_cnt);
            } else {
                cache = {};
            }
        } else {
            cache[row_index] = true;
        }

        return row_index;
    }

    return function(data, area, space) {
        var xy = [],
            row_cnt = Math.floor(area.height / space),
            col_cnt = Math.floor(area.width / space),
            col_step = Math.floor(col_cnt / data.length),
            col_index = 0;

        var left = -1,
            right = data.length;

        for(var i = 0; i < data.length; i++) {
            var x = 0, y = 0, index = 0;

            if(i % 2 == 0) {
                x = col_index * space;
                y = getRandomRowIndex(row_cnt) * space;
                col_index += col_step;

                left += 1;
                index = left;
            } else {
                x = (col_cnt - col_index) * space + space;
                y = getRandomRowIndex(row_cnt) * space;

                right -=1;
                index = right;
            }

            xy[index] = {
                x: area.x + x + space,
                y: area.y + y + (space / 2)
            };
        }

        return xy;
    }
});

jui.define("chart.grid.topologytable", [ "util.base" ], function(_) {

    /**
     * @class chart.grid.topologytable
     * @extends chart.grid.core
     */
    var TopologyTableGrid = function() {
        var self = this;

        function getDataIndex(key) {
            var index = null,
                data = self.axis.data;

            for(var i = 0, len = data.length; i < len; i++) {
                if(self.axis.getValue(data[i], "key") == key) {
                    index = i;
                    break;
                }
            }

            return index;
        }

        this.drawBefore = function() {
            if(!this.axis.cacheXY) {
                var sortFunc = jui.include("chart.topology.sort." + this.grid.sort),
                    sortArgs = [ this.axis.data, this.axis.area(), this.grid.space ];

                if(_.typeCheck("function", sortFunc)) {
                    this.axis.cacheXY = sortFunc.apply(this, sortArgs);
                } else {
                    sortFunc = jui.include(this.grid.sort);

                    if(_.typeCheck("function", sortFunc)) {
                        this.axis.cacheXY = sortFunc.apply(this, sortArgs);
                    }
                }
            }

            if(!this.axis.cache) {
                this.axis.cache = {
                    scale: 1,
                    viewX: 0,
                    viewY: 0,
                    nodeKey: null // 활성화 상태의 노드 키
                }
            }

            this.scale = (function() {
                return function(index) {
                    var index = (_.typeCheck("string", index)) ? getDataIndex(index) : index;

                    var func = {
                        setX: function(value) {
                            self.axis.cacheXY[index].x = value - self.axis.cache.viewX;
                        },
                        setY: function(value) {
                            self.axis.cacheXY[index].y = value - self.axis.cache.viewY;
                        },
                        setScale: function(s) {
                            self.axis.cache.scale = s;
                        },
                        setView: function(x, y) {
                            self.axis.cache.viewX = x;
                            self.axis.cache.viewY = y;
                        },
                        moveLast: function() {
                            var target1 = self.axis.cacheXY.splice(index, 1);
                            self.axis.cacheXY.push(target1[0]);

                            var target2 = self.axis.data.splice(index, 1);
                            self.axis.data.push(target2[0]);
                        }
                    }

                    if(_.typeCheck("integer", index)) {
                        var x = self.axis.cacheXY[index].x + self.axis.cache.viewX,
                            y = self.axis.cacheXY[index].y + self.axis.cache.viewY,
                            scale = self.axis.cache.scale;

                        return _.extend(func, {
                            x: x * scale,
                            y: y * scale,
                            scale: scale
                        });
                    }

                    return func;
                }
            })(this.axis);
        }
        
        this.draw = function() {
            this.grid.hide = true;
            return this.drawGrid();
        }
    }

    TopologyTableGrid.setup = function() {
        return {
            /** @cfg {String} [sort=null]  */
            sort: "linear", // or random
            /** @cfg {Number} [space=50]  */
            space: 50
        }
    }
    
    return TopologyTableGrid;
}, "chart.grid.core");


/***/ }),
/* 46 */
/***/ (function(module, exports) {

jui.define("chart.grid.grid3d", [ "util.base", "util.math" ], function(_, math) {

    /**
     * @class chart.grid.grid3d
     * @extends chart.grid.core
     */
    var Grid3D = function() {
        var self = this,
            depth = 0,
            degree = 0,
            radian = 0;

        function getElementAttr(root) {
            var attr = null;

            root.each(function(i, elem) {
                if(elem.element.nodeName == "line") {
                    attr = elem.attributes;
                }
            });

            return attr;
        }

        this.drawBefore = function() {
            depth = this.axis.get("depth");
            degree = this.axis.get("degree");
            radian = math.radian(360 - degree);

            this.scale = (function() {
                return function(x, y, z, count) {
                    var step = _.typeCheck("integer", count) ? count : 1,
                        split = depth / step;

                    if(z == undefined || step == 1) {
                        return {
                            x: self.axis.x(x),
                            y: self.axis.y(y),
                            depth: split
                        }
                    } else {
                        var z = (z == undefined) ? 0 : z,
                            c = split * z,
                            top = Math.sin(radian) * split;

                        return {
                            x: self.axis.x(x) + Math.cos(radian) * c,
                            y: (self.axis.y(y) + Math.sin(radian) * c) + top,
                            depth: split
                        }
                    }
                }
            })(this.axis);

            this.scale.depth = depth;
            this.scale.degree = degree;
            this.scale.radian = radian;
        }

        this.draw = function() {
            var xRoot = this.axis.x.root,
                yRoot = this.axis.y.root;

            var y2 = Math.sin(radian) * depth,
                x2 = Math.cos(radian) * depth;

            yRoot.each(function(i, elem) {
                if(elem.element.nodeName == "line") {
                    yRoot.append(self.line({
                        x1 : x2,
                        y1 : 0,
                        x2 : x2,
                        y2 : y2 + elem.attributes.y2
                    }));
                } else {
                    // X축 라인 속성 가져오기
                    var xAttr = getElementAttr(xRoot);

                    elem.append(self.line({
                        x1 : 0,
                        y1 : 0,
                        x2 : x2,
                        y2 : y2
                    }));

                    elem.append(self.line({
                        x1 : x2,
                        y1 : y2,
                        x2 : x2 + xAttr.x2,
                        y2 : y2
                    }));
                }
            });

            xRoot.each(function(i, elem) {
                var attr = (elem.element.nodeName == "line") ? elem.attributes : elem.get(0).attributes,
                    y2 = attr.y1 + Math.sin(radian) * depth,
                    x2 = attr.x1 + Math.cos(radian) * depth;

                if(i > 0) {
                    // Y축 라인 속성 가져오기
                    var yAttr = getElementAttr(yRoot);

                    elem.append(self.line({
                        x1 : attr.x1,
                        y1 : attr.y1,
                        x2 : x2,
                        y2 : y2
                    }));

                    elem.append(self.line({
                        x1 : x2,
                        y1 : y2,
                        x2 : x2,
                        y2 : -(yAttr.y2 - y2)
                    }));
                }
            });

            return this.drawGrid();
        }
    }

    Grid3D.setup = function() {
        return {
            /** @cfg {Array} [domain=null] */
            domain: null
        }
    }
    
    return Grid3D;
}, "chart.grid.core");


/***/ }),
/* 47 */
/***/ (function(module, exports) {

jui.define("chart.brush.core", [ "util.base", "util.dom" ], function(_, $) {
    /**
     * @class chart.brush.core
     *
     * implements core method for brush
     *
     * @abstract
     * @extends chart.draw
     * @requires jquery
     * @requires util.base
     */
	var CoreBrush = function() {

        function getMinMaxValue(data, target) {
            var seriesList = {},
                targetList = {};

            for(var i = 0; i < target.length; i++) {
                if (!seriesList[target[i]]) {
                    targetList[target[i]] = [];
                }
            }

            // 시리즈 데이터 구성
            for(var i = 0, len = data.length; i < len; i++) {
                var row = data[i];

                for(var k in targetList) {
                    targetList[k].push(row[k]);
                }
            }

            for(var key in targetList) {
                seriesList[key] = {
                    min : Math.min.apply(Math, targetList[key]),
                    max : Math.max.apply(Math, targetList[key])
                }
            }

            return seriesList;
        }

        this.drawAfter = function(obj) {
            if(this.brush.clip !== false) {
                obj.attr({ "clip-path" : "url(#" + this.axis.get("clipId") + ")" });
            }

            obj.attr({ "class" : "brush-" + this.brush.type });
            obj.translate(this.chart.area("x"), this.chart.area("y")); // 브러쉬일 경우, 기본 좌표 설정
        }

        this.drawTooltip = function(fill, stroke, opacity) {
            var self = this,
                tooltip = null;

            function draw() {
                return self.chart.svg.group({ "visibility" : "hidden" }, function() {
                    self.chart.text({
                        fill : self.chart.theme("tooltipPointFontColor"),
                        "font-size" : self.chart.theme("tooltipPointFontSize"),
                        "font-weight" : self.chart.theme("tooltipPointFontWeight"),
                        "text-anchor" : "middle",
                        opacity: opacity
                    });

                    self.chart.svg.circle({
                        r: self.chart.theme("tooltipPointRadius"),
                        fill: fill,
                        stroke: stroke,
                        opacity: opacity,
                        "stroke-width": self.chart.theme("tooltipPointBorderWidth")
                    });
                });
            }

            function show(orient, x, y, value) {
                var text = tooltip.get(0);
                text.element.textContent = value;

                if(orient == "left") {
                    text.attr({ x: -7, y: 4, "text-anchor": "end" });
                } else if(orient == "right") {
                    text.attr({ x: 7, y: 4, "text-anchor": "start" });
                } else if(orient == "bottom") {
                    text.attr({ y: 16 });
                } else {
                    text.attr({ y: -7 });
                }

                tooltip.attr({ visibility: (value != 0) ? "visible" : "hidden" });
                tooltip.translate(x, y);
            }

            // 툴팁 생성
            tooltip = draw();

            return {
                tooltip: tooltip,
                control: show,
                style: function(fill, stroke, opacity) {
                    tooltip.get(0).attr({
                        opacity: opacity
                    });

                    tooltip.get(1).attr({
                        fill: fill,
                        stroke: stroke,
                        opacity: opacity
                    })
                }
            }
        }

        /**
         * 
         * @method curvePoints
         *
         * 좌표 배열 'K'에 대한 커브 좌표 'P1', 'P2'를 구하는 함수
         *
         * TODO: min, max 에 대한 처리도 같이 필요함.
         *
         * @param {Array} K
         * @return {Object}
         * @return {Array} return.p1
         * @return {Array} return.p2
         *
         */
		this.curvePoints = function(K) {
			var p1 = [];
			var p2 = [];
			var n = K.length - 1;

			/*rhs vector*/
			var a = [];
			var b = [];
			var c = [];
			var r = [];

			/*left most segment*/
			a[0] = 0;
			b[0] = 2;
			c[0] = 1;
			r[0] = K[0] + 2 * K[1];

			/*internal segments*/
			for ( i = 1; i < n - 1; i++) {
				a[i] = 1;
				b[i] = 4;
				c[i] = 1;
				r[i] = 4 * K[i] + 2 * K[i + 1];
			}

			/*right segment*/
			a[n - 1] = 2;
			b[n - 1] = 7;
			c[n - 1] = 0;
			r[n - 1] = 8 * K[n - 1] + K[n];

			/*solves Ax=b with the Thomas algorithm (from Wikipedia)*/
			for (var i = 1; i < n; i++) {
				var m = a[i] / b[i - 1];
				b[i] = b[i] - m * c[i - 1];
				r[i] = r[i] - m * r[i - 1];
			}

			p1[n - 1] = r[n - 1] / b[n - 1];
			for (var i = n - 2; i >= 0; --i)
				p1[i] = (r[i] - c[i] * p1[i + 1]) / b[i];

			/*we have p1, now compute p2*/
			for (var i = 0; i < n - 1; i++)
				p2[i] = 2 * K[i + 1] - p1[i + 1];

			p2[n - 1] = 0.5 * (K[n] + p1[n - 1]);

			return {
				p1 : p1,
				p2 : p2
			};
		}

        /**
         * 
         * @method eachData
         *
         * loop axis data
         *
         * @param {Function} callback
         */
        this.eachData = function(callback, reverse) {
            if(!_.typeCheck("function", callback)) return;
            var list = this.listData();

            if(reverse === true) {
                for(var len = list.length - 1; len >= 0; len--) {
                    callback.call(this, len, list[len]);
                }
            } else {
                for(var index = 0, len = list.length; index < len; index++) {
                    callback.call(this, list[index], index);
                }
            }
        }

        /**
         * 
         * @method listData
         *
         * get axis.data
         *
         * @returns {Array} axis.data
         */
        this.listData = function() {
            if(!this.axis) {
                return [];
            } else {
                if(!this.axis.data) {
                    return [];
                }
            }

            return this.axis.data;
        }

        /**
         * 
         * @method getData
         *
         * get record by index in axis.data
         *
         * @param {Integer} index
         * @returns {Object} record in axis.data
         */
        this.getData = function(index) {
            return this.listData()[index];
        }

        /**
         * @method getValue
         *
         * chart.axis.getValue alias
         *
         * @param {Object} data row data
         * @param {String} fieldString 필드 이름
         * @param {String/Number/Boolean/Object} [defaultValue=''] 기본값
         * @return {Mixed}
         */
        this.getValue = function(data, fieldString, defaultValue) {
            return this.axis.getValue(data, fieldString, defaultValue);
        }

        /**
         * 
         * @method getXY
         *
         * 차트 데이터에 대한 좌표 'x', 'y'를 구하는 함수
         *
         * @param {Boolean} [isCheckMinMax=true]
         * @return {Array}
         */
        this.getXY = function(isCheckMinMax) {
            var xy = [],
                series = {},
                length = this.listData().length,
                i = length,
                target = this.brush.target,
                targetLength = target.length;

            if(isCheckMinMax !== false) {
                series = getMinMaxValue(this.axis.data, target);
            }

            for(var j = 0; j < targetLength; j++) {
                xy[j] = {
                    x: new Array(length),
                    y: new Array(length),
                    value: new Array(length),
                    min: [],
                    max: [],
                    length: length
                };
            }
            
            var axisData = this.axis.data,
                isRangeY = (this.axis.y.type == "range"),
                x = this.axis.x,
                y = this.axis.y,
                func = _.loop(i);

            func(function(i, group) {
                var data = axisData[i],
                    startX = 0,
                    startY = 0;

                if(isRangeY) startX = x(i);
                else startY = y(i);

                for(var j = 0; j < targetLength ; j++) {
                    var key = target[j],
                        value = data[key];

                    if(isRangeY) startY = y(value);
                    else startX = x(value);

                    xy[j].x[i] = startX;
                    xy[j].y[i] = startY;
                    xy[j].value[i] = value;

                    if(isCheckMinMax !== false) {
                        xy[j].min[i] = (value == series[key].min);
                        xy[j].max[i] = (value == series[key].max);
                    }
                }
            })

            return xy;
        }

        /**
         * 
         * @method getStackXY
         *
         * 차트 데이터에 대한 좌표 'x', 'y'를 구하는 함수
         * 단, 'y' 좌표는 다음 데이터 보다 높게 구해진다.
         *
         * @param {Boolean} [isCheckMinMax=true]
         * @return {Array}
         */
        this.getStackXY = function(isCheckMinMax) {
            var xy = this.getXY(isCheckMinMax),
                isRangeY = (this.axis.y.type == "range");

            this.eachData(function(data, i) {
                var valueSum = 0;

                for(var j = 0; j < this.brush.target.length; j++) {
                    var key = this.brush.target[j],
                        value = data[key];

                    if(j > 0) {
                        valueSum += data[this.brush.target[j - 1]];
                    }

                    if(isRangeY) {
                        xy[j].y[i] = this.axis.y(value + valueSum);
                    } else {
                        xy[j].x[i] = this.axis.x(value + valueSum);
                    }
                }
            });

            return xy;
        }
        
        /**
         * @method addEvent 
         * 브러쉬 엘리먼트에 대한 공통 이벤트 정의
         *
         * @param {Element} element
         * @param {Integer} dataIndex
         * @param {Integer} targetIndex
         */
        this.addEvent = function(elem, dataIndex, targetIndex) {
            if(this.brush.useEvent !== true) return;

            var chart = this.chart,
                obj = {};

            if(_.typeCheck("object", dataIndex) && !targetIndex) {
                obj.brush = this.brush;
                obj.data = dataIndex;
            } else {
                obj.brush = this.brush;
                obj.dataIndex = dataIndex;
                obj.dataKey = (targetIndex != null) ? this.brush.target[targetIndex] : null;
                obj.data = (dataIndex != null) ? this.getData(dataIndex) : null;
            }

            elem.on("click", function(e) {
                setMouseEvent(e);
                chart.emit("click", [ obj, e ]);
            });

            elem.on("dblclick", function(e) {
                setMouseEvent(e);
                chart.emit("dblclick", [ obj, e ]);
            });

            elem.on("contextmenu", function(e) {
                setMouseEvent(e);
                chart.emit("rclick", [ obj, e ]);
                e.preventDefault();
            });

            elem.on("mouseover", function(e) {
                setMouseEvent(e);
                chart.emit("mouseover", [ obj, e ]);
            });

            elem.on("mouseout", function(e) {
                setMouseEvent(e);
                chart.emit("mouseout", [ obj, e ]);
            });

            elem.on("mousemove", function(e) {
                setMouseEvent(e);
                chart.emit("mousemove", [ obj, e ]);
            });

            elem.on("mousedown", function(e) {
                setMouseEvent(e);
                chart.emit("mousedown", [ obj, e ]);
            });

            elem.on("mouseup", function(e) {
                setMouseEvent(e);
                chart.emit("mouseup", [ obj, e ]);
            });

            function setMouseEvent(e) {
                var pos = $.offset(chart.root),
                    offsetX = e.pageX - pos.left,
                    offsetY = e.pageY - pos.top;

                e.bgX = offsetX;
                e.bgY = offsetY;
                e.chartX = offsetX - chart.padding("left");
                e.chartY = offsetY - chart.padding("top");
            }
        }

        /**
         * @method color
         *  
         * chart.color() 를 쉽게 사용할 수 있게 만든 유틸리티 함수 
         *  
         * @param {Number} key1  브러쉬에서 사용될 컬러 Index
         * @param {Number} key2  브러쉬에서 사용될 컬러 Index
         * @returns {*}
         */
        this.color = function(key1, key2) {
            var colors = this.brush.colors,
                color = null,
                colorIndex = 0,
                rowIndex = 0;

            if(!_.typeCheck("undefined", key2)) {
                colorIndex = key2;
                rowIndex = key1;
            } else {
                colorIndex = key1;
            }

            if(_.typeCheck("function", colors)) {
                var newColor = colors.call(this.chart, this.getData(rowIndex), rowIndex);

                if(_.typeCheck([ "string", "integer" ], newColor)) {
                    color = this.chart.color(newColor);
                } else if(_.typeCheck("array", newColor)) {
                    color = this.chart.color(colorIndex, newColor);
                } else {
                    color = this.chart.color(0);
                }
            } else {
                color = this.chart.color(colorIndex, colors);
            }

            return color;
        }

        /**
         * @method offset
         *
         * 그리드 타입에 따른 시작 좌표 가져오기 (블럭)
         *
         * @param {String} 그리드 종류
         * @param {Number} 인덱스
         * @returns {*}
         */
        this.offset = function(type, index) { // 그리드 타입에 따른 시작 좌표 가져오기
            var res = this.axis[type](index);

            if(this.axis[type].type != "block") {
                res += this.axis[type].rangeBand() / 2;
            }

            return res;
        }
	}


    CoreBrush.setup = function() {
        return {

            /** @property {chart.builder} chart */
            /** @property {chart.axis} axis */
            /** @property {Object} brush */

            /** @cfg {Array} [target=null] Specifies the key value of data displayed on a brush.  */
            target: null,
            /** @cfg {Array/Function} [colors=null] Able to specify color codes according to the target order (basically, refers to the color codes of a theme) */
            colors: null,
            /** @cfg {Integer} [axis=0] Specifies the index of a grid group which acts as the reference axis of a brush. */
            axis: 0,
            /** @cfg {Integer} [index=null] [Read Only] Sequence index on which brush is drawn. */
            index: null,
            /** @cfg {boolean} [clip=true] If the brush is drawn outside of the chart, cut the area. */
            clip: true,
            /** @cfg {boolean} [useEvent=true] If you do not use a brush events, it gives better performance. */
            useEvent: true
        }
    }

    /**
     * @event click
     * Event that occurs when clicking on the brush.
     * @param {BrushData} obj Related brush data.
     */
    /**
     * @event dblclick
     * Event that occurs when double clicking on the brush.
     * @param {BrushData} obj Related brush data.
     */
    /**
     * @event rclick
     * Event that occurs when right clicking on the brush.
     * @param {BrushData} obj Related brush data.
     */
    /**
     * @event mouseover
     * Event that occurs when placing the mouse over the brush.
     * @param {BrushData} obj Related brush data.
     */
    /**
     * @event mouseout
     * Event that occurs when moving the mouse out of the brush.
     * @param {BrushData} obj Related brush data.
     */
    /**
     * @event mousemove
     * Event that occurs when moving the mouse over the brush.
     * @param {BrushData} obj Related brush data.
     */
    /**
     * @event mousedown
     * Event that occurs when left clicking on the brush.
     * @param {BrushData} obj Related brush data.
     */
    /**
     * @event mouseup
     * Event that occurs after left clicking on the brush.
     * @param {BrushData} obj Related brush data.
     */

	return CoreBrush;
}, "chart.draw"); 

/***/ }),
/* 48 */
/***/ (function(module, exports) {

jui.define("chart.brush.map.core", [], function() {
    /**
     * @class chart.brush.map.core
     * @abstract
     * @extends chart.brush.core
     * @requires jquery
     * @requires util.base
     */
	var MapCoreBrush = function() {
	}

	return MapCoreBrush;
}, "chart.brush.core");

/***/ }),
/* 49 */
/***/ (function(module, exports) {

jui.define("chart.brush.polygon.core", [], function() {
    var PolygonCoreBrush = function() {
        this.createPolygon = function(polygon, callback) {
            this.calculate3d(polygon);

            var element = callback.call(this, polygon);
            if(element) {
                element.order = this.axis.depth - polygon.max().z;
                return element;
            }
        }
    }

    PolygonCoreBrush.setup = function() {
        return {
            id: null,
            clip: false
        }
    }

    return PolygonCoreBrush;
}, "chart.brush.core");

/***/ }),
/* 50 */
/***/ (function(module, exports) {

jui.define("chart.brush.canvas.core", [ "util.base" ], function(_) {
    var CanvasCoreBrush = function() {
        this.addPolygon = function(polygon, callback) {
            if(!_.typeCheck("array", this.polygons)) {
                this.polygons = [];
            }

            // 폴리곤 각도 및 깊이 연산
            this.calculate3d(polygon);

            // 연산된 폴리곤 객체 추가
            this.polygons.push({
                polygon: polygon,
                order: this.axis.depth - polygon.max().z,
                handler: callback
            });
        }

        this.drawAfter = function() {
            // 폴리곤 기반의 브러쉬일 경우
            if(_.typeCheck("array", this.polygons)) {
                var list = this.polygons;

                list.sort(function(a, b) {
                    return a.order - b.order;
                });

                for(var i = 0, len = list.length; i < len; i++) {
                    var p = list.shift();
                    p.handler.call(this, p.polygon);
                }
            }
        }
    }

    return CanvasCoreBrush;
}, "chart.brush.core");

/***/ }),
/* 51 */
/***/ (function(module, exports) {

jui.define("chart.widget.core", [ "util.base" ], function(_) {


    /**
     * @class chart.widget.core
     * implements core widget
     * @extends chart.draw
     * @alias CoreWidget
     * @requires util.base
     * @requires jquery
     *
     */
	var CoreWidget = function() {

        this.getIndexArray = function(index) {
            var list = [ 0 ];

            if(_.typeCheck("array", index)) {
                list = index;
            } else if(_.typeCheck("integer", index)) {
                list = [ index ];
            }

            return list;
        }

        this.getScaleToValue = function(scale, minScale, maxScale, minValue, maxValue) {
            var tick = (maxScale - minScale) * 10,
                step = (maxValue - minValue) / tick,
                value = maxValue - (step * ((scale - minScale) / 0.1));

            if(value < minValue) return minValue;
            else if(value > maxValue) return maxValue;

            return value;
        }

        this.getValueToScale = function(value, minValue, maxValue, minScale, maxScale) {
            var tick = (maxScale - minScale) * 10,
                step = (maxValue - minValue) / tick;

            return parseFloat((minScale + ((maxValue - value) / step) * 0.1).toFixed(1));
        }

        this.isRender = function() {
            return (this.widget.render === true) ? true : false;
        }

        this.on = function(type, callback, axisIndex) {
            var self = this;

            return this.chart.on(type, function() {
                if(_.startsWith(type, "axis.") && _.typeCheck("integer", axisIndex)) {
                    var axis = self.chart.axis(axisIndex),
                        e = arguments[0];

                    if (_.typeCheck("object", axis)) {
                        if (arguments[1] == axisIndex) {
                            callback.apply(self, [ e ]);
                        }
                    }
                } else {
                    callback.apply(self, arguments);
                }
            }, this.isRender() ? "render" : "renderAll");
        }

        this.drawAfter = function(obj) {
            obj.attr({ "class" : "widget-" + this.widget.type });
        }
	}

    CoreWidget.setup = function() {

        /** @property {chart.builder} chart */
        /** @property {chart.axis} axis */
        /** @property {Object} widget */
        /** @property {Number} index [Read Only] Index which shows the sequence how a widget is drawn. */

        return {
            /**
             * @cfg {Boolean} [render=false] Determines whether a widget is to be rendered.
             */            
            render: false,
            /**
             * @cfg {Number} [index=0] current widget index
             */
            index: 0
        }
    }

	return CoreWidget;
}, "chart.draw"); 

/***/ }),
/* 52 */
/***/ (function(module, exports) {

jui.define("chart.widget.map.core", [], function() {

    /**
     * @class chart.widget.map.core
     * @extends chart.widget.core
     */
    var MapCoreWidget = function(chart, axis, widget) {
    }

    MapCoreWidget.setup = function() {
        return {
            axis: 0
        }
    }

    return MapCoreWidget;
}, "chart.widget.core");

/***/ }),
/* 53 */
/***/ (function(module, exports) {

jui.define("chart.widget.polygon.core", [], function() {

    /**
     * @class chart.widget.polygon.core
     * @extends chart.widget.core
     */
    var PolygonCoreWidget = function() {
        this.drawAfter = function(obj) {
        }
    }

    return PolygonCoreWidget;
}, "chart.widget.core");

/***/ }),
/* 54 */
/***/ (function(module, exports) {

jui.define("chart.widget.canvas.core", [], function() {
    var CanvasCoreWidget = function() {
        this.drawAfter = function(obj) {
        }
    }

    return CanvasCoreWidget;
}, "chart.widget.core");

/***/ }),
/* 55 */
/***/ (function(module, exports) {

jui.define("chart.theme.jennifer", [], function() {

    /**
     * @class chart.theme.jennifer
     * Jennifer Theme
     * @singleton
     */
    var themeColors = [
        "#7977C2",
        "#7BBAE7",
        "#FFC000",
        "#FF7800",
        "#87BB66",
        "#1DA8A0",
        "#929292",
        "#555D69",
        "#0298D5",
        "#FA5559",
        "#F5A397",
        "#06D9B6",
        "#C6A9D9",
        "#6E6AFC",
        "#E3E766",
        "#C57BC3",
        "#DF328B",
        "#96D7EB",
        "#839CB5",
        "#9228E4"
    ];

    return {
        fontFamily : "arial,Tahoma,verdana",
        backgroundColor : "#fff",
        colors : themeColors,

        // Axis styles
        axisBackgroundColor : "#fff",
        axisBackgroundOpacity : 0,
        axisBorderColor : "#fff",
        axisBorderWidth : 0,
        axisBorderRadius : 0,

        // Grid styles
        gridXFontSize : 11,
        gridYFontSize : 11,
        gridZFontSize : 10,
        gridCFontSize : 11,
        gridXFontColor : "#333",
        gridYFontColor : "#333",
        gridZFontColor : "#333",
        gridCFontColor : "#333",
        gridXFontWeight : "normal",
        gridYFontWeight : "normal",
        gridZFontWeight : "normal",
        gridCFontWeight : "normal",
        gridXAxisBorderColor : "#bfbfbf",
        gridYAxisBorderColor : "#bfbfbf",
        gridZAxisBorderColor : "#bfbfbf",
        gridXAxisBorderWidth : 2,
        gridYAxisBorderWidth : 2,
        gridZAxisBorderWidth : 2,

        // Full 3D 전용 테마
        gridFaceBackgroundColor: "#dcdcdc",
        gridFaceBackgroundOpacity: 0.3,

        gridActiveFontColor : "#ff7800",
        gridActiveBorderColor : "#ff7800",
        gridActiveBorderWidth : 1,
        gridPatternColor : "#ababab",
        gridPatternOpacity : 0.1,
        gridBorderColor : "#ebebeb",
        gridBorderWidth : 1,
        gridBorderDashArray : "none",
        gridBorderOpacity : 1,
        gridTickBorderSize : 3,
        gridTickBorderWidth : 1.5,
        gridTickPadding : 5,

        // Brush styles
        tooltipPointRadius : 5, // common
        tooltipPointBorderWidth : 1, // common
        tooltipPointFontWeight : "bold", // common
        tooltipPointFontSize : 11,
        tooltipPointFontColor : "#333",
        barFontSize : 11,
        barFontColor : "#333",
        barBorderColor : "none",
        barBorderWidth : 0,
        barBorderOpacity : 0,
        barBorderRadius : 3,
        barPointBorderColor : "#fff",
        barDisableBackgroundOpacity : 0.4,
        barStackEdgeBorderWidth : 1,
        gaugeBackgroundColor : "#ececec",
        gaugeArrowColor : "#a9a9a9",
        gaugeFontColor : "#666666",
        gaugeFontSize : 20,
        gaugeFontWeight : "bold",
        gaugeTitleFontSize : 12,
        gaugeTitleFontWeight : "normal",
        gaugeTitleFontColor : "#333",
        gaugePaddingAngle : 2,
        bargaugeBackgroundColor : "#ececec",
        bargaugeFontSize : 11,
        bargaugeFontColor : "#333333",
        pieBorderColor : "#ececec",
        pieBorderWidth : 1,
        pieOuterFontSize : 11,
        pieOuterFontColor : "#333",
        pieOuterLineColor : "#a9a9a9",
        pieOuterLineSize : 8,
        pieOuterLineRate : 1.3,
        pieOuterLineWidth : 0.7,
        pieInnerFontSize : 11,
        pieInnerFontColor : "#333",
        pieActiveDistance : 5,
        pieNoDataBackgroundColor : "#E9E9E9",
        pieTotalValueFontSize : 36,
        pieTotalValueFontColor : "#dcdcdc",
        pieTotalValueFontWeight : "bold",
        areaBackgroundOpacity : 0.5,
        areaSplitBackgroundColor : "#929292",
        bubbleBackgroundOpacity : 0.5,
        bubbleBorderWidth : 1,
        bubbleFontSize : 12,
        bubbleFontColor : "#fff",
        candlestickBorderColor : "#000",
        candlestickBackgroundColor : "#fff",
        candlestickInvertBorderColor : "#ff0000",
        candlestickInvertBackgroundColor : "#ff0000",
        ohlcBorderColor : "#000",
        ohlcInvertBorderColor : "#ff0000",
        ohlcBorderRadius : 5,
        lineBorderWidth : 2,
        lineBorderDashArray : "none",
        lineBorderOpacity : 1,
        lineDisableBorderOpacity : 0.3,
        linePointBorderColor : "#fff",
        lineSplitBorderColor : null,
        lineSplitBorderOpacity : 0.5,
        pathBackgroundOpacity : 0.5,
        pathBorderWidth : 1,
        scatterBorderColor : "#fff",
        scatterBorderWidth : 1,
        scatterHoverColor : "#fff",
        waterfallBackgroundColor : "#87BB66",
        waterfallInvertBackgroundColor : "#FF7800",
        waterfallEdgeBackgroundColor : "#7BBAE7",
        waterfallLineColor : "#a9a9a9",
        waterfallLineDashArray : "0.9",
        focusBorderColor : "#FF7800",
        focusBorderWidth : 1,
        focusBackgroundColor : "#FF7800",
        focusBackgroundOpacity : 0.1,
        pinFontColor : "#FF7800",
        pinFontSize : 10,
        pinBorderColor : "#FF7800",
        pinBorderWidth : 0.7,
        topologyNodeRadius : 12.5,
        topologyNodeFontSize : 14,
        topologyNodeFontColor : "#fff",
        topologyNodeTitleFontSize : 11,
        topologyNodeTitleFontColor : "#333",
        topologyEdgeWidth : 1,
        topologyActiveEdgeWidth : 2,
        topologyHoverEdgeWidth : 2,
        topologyEdgeColor : "#b2b2b2",
        topologyActiveEdgeColor : "#905ed1",
        topologyHoverEdgeColor : "#d3bdeb",
        topologyEdgeFontSize : 10,
        topologyEdgeFontColor : "#666",
        topologyEdgePointRadius : 3,
        topologyEdgeOpacity : 1,
        topologyTooltipBackgroundColor : "#fff",
        topologyTooltipBorderColor : "#ccc",
        topologyTooltipFontSize : 11,
        topologyTooltipFontColor : "#333",

        timelineTitleFontSize: 10,
        timelineTitleFontColor: "#333",
        timelineTitleFontWeight: 700,
        timelineColumnFontSize: 10,
        timelineColumnFontColor: "#333",
        timelineColumnBackgroundColor: "#fff",
        timelineHoverRowBackgroundColor: "#f4f0f9",
        timelineEvenRowBackgroundColor: "#f8f8f8",
        timelineOddRowBackgroundColor: "#fff",
        timelineActiveBarBackgroundColor: "#9262cf",
        timelineActiveBarFontColor: "#fff",
        timelineActiveBarFontSize: 9,
        timelineHoverBarBackgroundColor: null,
        timelineLayerBackgroundOpacity: 0.15,
        timelineActiveLayerBackgroundColor: "#A75CFF",
        timelineActiveLayerBorderColor: "#caa4f5",
        timelineHoverLayerBackgroundColor: "#DEC2FF",
        timelineHoverLayerBorderColor: "#caa4f5",
        timelineVerticalLineColor: "#f0f0f0",
        timelineHorizontalLineColor: "#ddd",

        hudColumnGridPointRadius: 7,
        hudColumnGridPointBorderColor: "#868686",
        hudColumnGridPointBorderWidth: 2,
        hudColumnGridFontColor: "#868686",
        hudColumnGridFontSize: 12,
        hudColumnGridFontWeight: "normal",
        hudColumnLeftBackgroundColor: "#3C3C3C",
        hudColumnRightBackgroundColor: "#838383",
        hudBarGridFontColor: "#868686",
        hudBarGridFontSize: 16,
        hudBarGridLineColor: "#868686",
        hudBarGridLineWidth: 1,
        hudBarGridLineOpacity: 0.8,
        hudBarGridBackgroundColor: "#868686",
        hudBarGridBackgroundOpacity: 0.5,
        hudBarTextLineColor: "#B2A6A6",
        hudBarTextLineWidth: 1.5,
        hudBarTextLinePadding: 12,
        hudBarTextLineFontColor: "#868686",
        hudBarTextLineFontSize: 13,
        hudBarBackgroundOpacity: 0.6,
        hudBarTopBackgroundColor: "#bbb",
        hudBarBottomBackgroundColor: "#3C3C3C",

        heatmapBackgroundColor: "#fff",
        heatmapBackgroundOpacity: 1,
        heatmapHoverBackgroundOpacity: 0.2,
        heatmapBorderColor: "#000",
        heatmapBorderWidth: 0.5,
        heatmapBorderOpacity: 1,
        heatmapFontSize: 11,
        heatmapFontColor: "#000",

        pyramidLineColor: "#fff",
        pyramidLineWidth: 1,
        pyramidTextLineColor: "#a9a9a9",
        pyramidTextLineWidth: 1,
        pyramidTextLineSize: 30,
        pyramidTextFontSize: 10,
        pyramidTextFontColor: "#333",

        heatmapscatterBorderWidth: 0.5,
        heatmapscatterBorderColor: "#fff",
        heatmapscatterActiveBackgroundColor: "#fff",

        treemapNodeBorderWidth: 0.5,
        treemapNodeBorderColor: "#333",
        treemapTextFontSize: 11,
        treemapTextFontColor: "#333",
        treemapTitleFontSize: 12,
        treemapTitleFontColor: "#333",

        arcEqualizerBorderColor: "#fff",
        arcEqualizerBorderWidth: 1,
        arcEqualizerFontSize: 13,
        arcEqualizerFontColor: "#333",
        arcEqualizerBackgroundColor: "#a9a9a9",

        flameNodeBorderWidth: 0.5,
        flameNodeBorderColor: "#fff",
        flameDisableBackgroundOpacity: 0.4,
        flameTextFontSize: 11,
        flameTextFontColor: "#333",

        selectBoxBackgroundColor: "#666",
        selectBoxBackgroundOpacity: 0.1,
        selectBoxBorderColor: "#666",
        selectBoxBorderOpacity: 0.2,

        // Widget styles
        titleFontColor : "#333",
        titleFontSize : 13,
        titleFontWeight : "normal",
        legendFontColor : "#333",
        legendFontSize : 12,
        legendSwitchCircleColor : "#fff",
        legendSwitchDisableColor : "#c8c8c8",
        tooltipFontColor : "#333",
        tooltipFontSize : 12,
        tooltipBackgroundColor : "#fff",
        tooltipBackgroundOpacity : 0.7,
        tooltipBorderColor : null,
        tooltipBorderWidth : 2,
        tooltipLineColor : null,
        tooltipLineWidth : 0.7,
        scrollBackgroundSize : 7,
        scrollBackgroundColor : "#dcdcdc",
        scrollThumbBackgroundColor : "#b2b2b2",
        scrollThumbBorderColor : "#9f9fa4",
        zoomBackgroundColor : "#ff0000",
        zoomFocusColor : "#808080",
        zoomScrollBackgroundSize : 45,
        zoomScrollButtonImage : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAACXBIWXMAAAsTAAALEwEAmpwYAAABL2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjarY69SsNQHEfPbUXBIYgEN+HiIC7ix9YxaUsRHGoUSbI1yaWKNrncXD86+RI+hIOLo6BvUHEQnHwEN0EcHBwiZHAQwTOd/xn+/KCx4nX8bmMORrk1Qc+XYRTLmUemaQLAIC211+9vA+RFrvjB+zMC4GnV6/hd/sZsqo0FPoHNTJUpiHUgO7PagrgE3ORIWxBXgGv2gjaIO8AZVj4BnKTyF8AxYRSDeAXcYRjF0ABwk8pdwLXq3AK0Cz02h8MDKzdarZb0siJRcndcWjUq5VaeFkYXZmBVBlT7qt2e1sdKBj2f/yWMYlnZ2w4CEAuTutWkJ+b0W4V4+P2uf4zvwQtg6rZu+x9wvQaLzbotL8H8BdzoL/HAUD36i+bmAAA7VmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMTEgNzkuMTU4MzI1LCAyMDE1LzA5LzEwLTAxOjEwOjIwICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgICAgICAgICB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIgogICAgICAgICAgICB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoTWFjaW50b3NoKTwveG1wOkNyZWF0b3JUb29sPgogICAgICAgICA8eG1wOkNyZWF0ZURhdGU+MjAxNi0wMi0yM1QyMjoxMDowOSswOTowMDwveG1wOkNyZWF0ZURhdGU+CiAgICAgICAgIDx4bXA6TWV0YWRhdGFEYXRlPjIwMTYtMDItMjNUMjI6MTA6MDkrMDk6MDA8L3htcDpNZXRhZGF0YURhdGU+CiAgICAgICAgIDx4bXA6TW9kaWZ5RGF0ZT4yMDE2LTAyLTIzVDIyOjEwOjA5KzA5OjAwPC94bXA6TW9kaWZ5RGF0ZT4KICAgICAgICAgPHhtcE1NOkluc3RhbmNlSUQ+eG1wLmlpZDoxZjEyZjk2NS02OTgxLTQxZTktYTU3Ny0zMmMwMDg2NjBhMjM8L3htcE1NOkluc3RhbmNlSUQ+CiAgICAgICAgIDx4bXBNTTpEb2N1bWVudElEPmFkb2JlOmRvY2lkOnBob3Rvc2hvcDoyNjNlNTQzMi0xYWJkLTExNzktYjc1Ny1lYmNlZjk1ZGNmOGE8L3htcE1NOkRvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+eG1wLmRpZDpjMjgwNGJmNi0zZTI5LTQ4NTQtOGRhMi05MjAyMDVkNDAzMDY8L3htcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD4KICAgICAgICAgPHhtcE1NOkhpc3Rvcnk+CiAgICAgICAgICAgIDxyZGY6U2VxPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5jcmVhdGVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6YzI4MDRiZjYtM2UyOS00ODU0LThkYTItOTIwMjA1ZDQwMzA2PC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDE2LTAyLTIzVDIyOjEwOjA5KzA5OjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoTWFjaW50b3NoKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPnNhdmVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6MWYxMmY5NjUtNjk4MS00MWU5LWE1NzctMzJjMDA4NjYwYTIzPC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDE2LTAyLTIzVDIyOjEwOjA5KzA5OjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoTWFjaW50b3NoKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOlNlcT4KICAgICAgICAgPC94bXBNTTpIaXN0b3J5PgogICAgICAgICA8cGhvdG9zaG9wOkRvY3VtZW50QW5jZXN0b3JzPgogICAgICAgICAgICA8cmRmOkJhZz4KICAgICAgICAgICAgICAgPHJkZjpsaT5hZG9iZTpkb2NpZDpwaG90b3Nob3A6OTkxNzEzNDYtMTllNS0xMTc5LTg1YjUtZjAwOGZkMGY4OTgyPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGk+eG1wLmRpZDozNWYyZjJkMC0xNmY3LTQ1YjktYjI3MS0zY2VkNTgwZmNjNmE8L3JkZjpsaT4KICAgICAgICAgICAgPC9yZGY6QmFnPgogICAgICAgICA8L3Bob3Rvc2hvcDpEb2N1bWVudEFuY2VzdG9ycz4KICAgICAgICAgPHBob3Rvc2hvcDpDb2xvck1vZGU+MzwvcGhvdG9zaG9wOkNvbG9yTW9kZT4KICAgICAgICAgPHBob3Rvc2hvcDpJQ0NQcm9maWxlPkFwcGxlIFJHQjwvcGhvdG9zaG9wOklDQ1Byb2ZpbGU+CiAgICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2UvcG5nPC9kYzpmb3JtYXQ+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgICAgIDx0aWZmOlhSZXNvbHV0aW9uPjcyMDAwMC8xMDAwMDwvdGlmZjpYUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6WVJlc29sdXRpb24+NzIwMDAwLzEwMDAwPC90aWZmOllSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpSZXNvbHV0aW9uVW5pdD4yPC90aWZmOlJlc29sdXRpb25Vbml0PgogICAgICAgICA8ZXhpZjpDb2xvclNwYWNlPjY1NTM1PC9leGlmOkNvbG9yU3BhY2U+CiAgICAgICAgIDxleGlmOlBpeGVsWERpbWVuc2lvbj44MDwvZXhpZjpQaXhlbFhEaW1lbnNpb24+CiAgICAgICAgIDxleGlmOlBpeGVsWURpbWVuc2lvbj44MDwvZXhpZjpQaXhlbFlEaW1lbnNpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8P3hwYWNrZXQgZW5kPSJ3Ij8+32DD9QAAACBjSFJNAAB6JQAAgIMAAPQlAACE0QAAbV8AAOhsAAA8iwAAG1iD5wd4AABkYElEQVR4AQBQZK+bAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAAAAAAAAAAAAAAAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAEAAAAAAAAAAAAAAAEAAAAAAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAAAAAAAAAAAA/wAAAAAAAAD/AAAAAAAAAAAAAAD/AAAAAAAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAEAAAAAAAAAAAAAAAEAAAABAAAAAAAAAAEAAAABAAAAAAAAAAEAAAABAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAAAAAAAAAAAAP8AAAD/AAAAAAAAAP8AAAD/AAAAAAAAAP8AAAD/AAAAAAAAAAAAAAD/AAAAAAAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///8AAAAAAAAAAAAAAAAAAAAAAAAAAAABAQEBAAAAAAAAAAAAAAABAAAAAAAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAAAAAAAAQAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAAAAAAA/wAAAAAAAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAP////8BAQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEBAQAAAAAAAAABAAAAAAAAAAEAAAABAAAAAAAAAAIAAAABAAAAAQAAAAJ5eXkLaGhoNw8PDykFBQUmBQUFJAEBARgCAgILAQEBDQEBAQz////0////8/7+/vX9/f3p+vr63fb29tzt7e3WiYmJzKKiovYAAAD/AAAA/wAAAP4AAAD/AAAA/wAAAP8AAAD+AAAA/wAAAP8AAAD+AAAAAAAAAP8AAAD/AAAAAAEBAQAAAAAAAAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///8A////AP///wAAAAABAAAAAQAAAAIAAAADAAAABAAAAAUAAAAGAAAACAAAAAnR0dEy8/Pzhfv7+8X////5/////////////////////////////////////////////////////////////////////////////////v7++vf398jr6+uKtLS0OgAAABMAAAASAAAAEAAAAA4AAAAMAAAACwAAAAkAAAAIAAAABgAAAAUAAAAEAAAAAwAAAAIAAAABAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///8AAAAAAQAAAAEAAAACAAAAAgAAAAQAAAAFAAAABgAAAAifn58Y8vLydPv7+8////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////n5+dHi4uJ8ampqJAAAABQAAAASAAAAEAAAAA0AAAALAAAACgAAAAgAAAAGAAAABQAAAAQAAAACAAAAAgAAAAEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAgAAAAIAAAADAAAABAAAAAYAAAAItra2HPT09In+/v7x/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////f398ujo6JB5eXkqAAAAFQAAABMAAAAQAAAADgAAAAwAAAAJAAAACAAAAAYAAAAEAAAAAwAAAAIAAAACAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAEAAAACAAAAAgAAAAQAAAAFAAAAB2ZmZg/z8/OA/v7+9f/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+/v715eXliTMzMx4AAAAWAAAAEwAAABAAAAAOAAAACwAAAAkAAAAHAAAABQAAAAQAAAADAAAAAgAAAAEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAQAAAAIAAAADAAAABAAAAAYAAAAI5+fnS/39/dr///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////n5+d7Dw8NZAAAAGQAAABYAAAASAAAADwAAAAwAAAAKAAAACAAAAAYAAAAEAAAAAwAAAAIAAAABAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAABAAAAAgAAAAMAAAAFAAAABmJiYg329vaT/////v/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+6OjonCgoKCAAAAAYAAAAFQAAABEAAAAOAAAACwAAAAgAAAAGAAAABQAAAAMAAAACAAAAAQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAIAAAACAAAABAAAAAUAAAAHzc3NKfv7+8z///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////b29tGMjIw8AAAAGwAAABcAAAATAAAADwAAAAwAAAAJAAAABwAAAAUAAAAEAAAAAgAAAAIAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAgAAAAIAAAAEAAAABQAAAAfc3Nw7/v7+6f/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7+/vsp6enTgAAAB0AAAAYAAAAFAAAABAAAAANAAAACgAAAAcAAAAFAAAABAAAAAIAAAACAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAABAAAAAgAAAAQAAAAFAAAAB+fn50r+/v7z/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////f399La2tl4AAAAfAAAAGgAAABUAAAARAAAADQAAAAoAAAAHAAAABQAAAAQAAAACAAAAAQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAEAAAACAAAABAAAAAUAAAAH5+fnSf////n///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7+/vqzs7NeAAAAIAAAABsAAAAWAAAAEgAAAA4AAAAKAAAABwAAAAUAAAAEAAAAAgAAAAEAAAABAAAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAEAAAABAAAAAgAAAALc3NwzHR0dsAEBAQoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAQMjIyNFISEhybGxsesAAAABAAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAQAAAAEAAAACAAAAAsjIyCMsLCy5AQEBEQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAgIGLCwsRv///73CwsLyAAAAAAAAAP8AAAAAAAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAACAAAAAwAAAAQAAAAGgICAEv39/dD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////T09NgwMDAwAAAAIgAAABwAAAAWAAAAEQAAAA0AAAAJAAAABgAAAAQAAAADAAAAAgAAAAEAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAABAAAAAgAAAAIAAAAC9/f3kwgICGQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADj4+OqHh4efwAAAPkAAAD6AAAA+gAAAPsAAAD8AAAA/AAAAP4AAAD+AAAA/gAAAP8AAAD/AgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAEAAAABAAAAAQAAAALk5ORECAgIYwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAdHR1VqqqqPgAAAAYAAAAFAAAABQAAAAQAAAADAAAAAwAAAAIAAAABAAAAAQAAAAEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAQAAAAIAAAAEAAAAB2lpaRH9/f3b////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9vb24CMjIzMAAAAmAAAAHwAAABgAAAATAAAADgAAAAoAAAAHAAAABAAAAAIAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAgAAAAQAAAAGAAAACfPz84H//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9PT05UAAAArAAAAJAAAAB0AAAAXAAAAEQAAAAwAAAAJAAAABgAAAAQAAAACAwAAAAAAAAAAAAAAAAAAAAEAAAABAAAAAQAAAAIAAAADsrKyGSwsLKUBAQEFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQUFCzY2Ni01dXV9QAAAP8AAAD/AAAA/wAAAAAAAAD/AAAAAAAAAP8AAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAABAAAAAgAAAAIAAAAD9fX1iwoKCmsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP39/QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAwMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP39/QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAwMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADb29unJiYmiAAAAPkAAAD4AAAA+QAAAPoAAAD8AAAA+wAAAP0AAAD+BAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAQAAAAKXl5cSCQkJYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/f39AMDAwAD9/f0AAAAAAAAAAAAAAAAAAAAAAAMDAwBAQEAAAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/f39AMDAwAD9/f0AAAAAAAAAAAAAAAAAAAAAAAMDAwBAQEAAAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiIiJQPz8/m8HBwesAAAD9AAAA/QAAAP4AAAD+AAAAAwAAAP8AAAD/AgAAAAAAAAAAAAAAAQAAAAEAAAABAAAAAQAAAAJXV1deAQEBCwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP39/QD9/f0A/f39AP39/QD9/f0A/f39AP39/QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP39/QD9/f0A/f39AP39/QD9/f0A/f39AP39/QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAwMJiIiIUAAAAAQAAAAEAAAABAAAAAMAAAADAAAAAgAAAAIAAAABAgAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAgAAAAINDQ1fAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALS0tTgAAAAUAAAAFAAAABAAAAAQAAAADAAAAAgAAAAIAAAACAgAAAAAAAAABAAAAAQAAAAEAAAABAAAAAc/Pzy4EBAQnAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwsLIICAgCkAAAAEAAAABAAAAAMAAAADAAAAAwAAAAIAAAABAgAAAAAAAAAAAAAAAAAAAAEAAAABAAAAAiEhIVAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAE9PT0IAAAAEAAAABAAAAAQAAAADAAAAAgAAAAIAAAACAgAAAAAAAAAAAAAAAQAAAAEAAAABAAAAAQoKCkMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8fHzgAAAAEAAAABAAAAAMAAAADAAAAAwAAAAIAAAABAgAAAAAAAAABAAAAAAAAAAEAAAAChISEDwUFBS8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQECUyMjIOAAAABAAAAAQAAAADAAAAAgAAAAIAAAACAgAAAAEAAAAAAAAAAQAAAAEAAAABVVVVNQAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAQJlZWUsAAAAAwAAAAMAAAADAAAAAwAAAAIAAAACAgAAAAAAAAAAAAAAAAAAAAEAAAABERERJwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAnJychAAAAAwAAAAMAAAADAAAAAgAAAAIAAAACAgAAAAAAAAABAAAAAQAAAAEAAAACCAgIJgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAXFxceAAAAAgAAAAIAAAACAAAAAgAAAAIAAAABAgAAAAAAAAAAAAAAAQAAAAEAAAABBgYGJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUFBQdAAAAAwAAAAMAAAACAAAAAwAAAAIAAAABAgAAAAEAAAABAAAAAQAAAAEAAAABAgICFwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAICAgRAAAAAgAAAAIAAAACAAAAAQAAAAEAAAACAgAAAAAAAAAAAAAAAAAAAAEAAAABAgICDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAQKAAAAAQAAAAIAAAACAAAAAgAAAAEAAAABAgAAAAAAAAAAAAAAAQAAAAAAAAABAgICDQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGBgYKAAAAAgAAAAEAAAACAAAAAQAAAAIAAAABAgAAAAAAAAABAAAAAAAAAAEAAAAAAQEBDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAwMJAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAgAAAAAAAAAAAAAAAAAAAAAAAAAB////9gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD9/f35AAAAAQAAAAIAAAABAAAAAQAAAAEAAAABAgAAAAAAAAAAAAAAAQAAAAEAAAAA////+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+/v77AAAAAQAAAAAAAAABAAAAAQAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAB/f397wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD5+fn0AAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAA/Pz85wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD19fXsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAgAAAAAAAAAAAAAAAAAAAAAAAAAA9/f33QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADr6+vkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AgAAAAAAAAAAAAAAAAAAAAAAAAAA8/Pz3AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADk5OTlAAAAAAAAAP8AAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAP8AAAD/5+fn2wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADV1dXjAAAA/wAAAAAAAAD/AAAA/wAAAAAAAAAAAgAAAAAAAAAAAAAA/wAAAAAAAAD/l5eXzwAAAP0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////6enp7aAAAA/wAAAP4AAAD/AAAA/wAAAP8AAAD/AgAAAAAAAAD/AAAAAAAAAP8AAAAAoqKi8vf399UAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO3t7d/X19f1AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AgAAAAAAAAAAAAAA/wAAAAAAAAD/AAAA/+/v78AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANjY2M4AAAD+AAAA/gAAAP8AAAD+AAAA/wAAAP4AAAD/AgAAAAAAAAAAAAAAAAAAAP8AAAD/AAAA/8TExLYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKioqMYAAAD/AAAA/wAAAP4AAAD+AAAA/gAAAP8AAAD/AgAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/ldXV9X5+fndAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8PDw5JWVld4AAAD+AAAA/gAAAP4AAAD+AAAA/wAAAP8AAAD+AgAAAAAAAAAAAAAA/wAAAP8AAAD/AAAA/wAAAP7i4uKoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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/QAAAP0AAAD9AAAA/AAAAPwAAAD8AAAA+wAAAPwAAAD7AAAA/AAAAPwAAAD8AAAA/AAAAP0AAAD9AAAA/gAAAP4AAAD/AAAA/gAAAAAAAAD/AAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAAAAAAAAAAAA/gAAAAEAAAAAAAAA/wAAAP8AAAD/AAAA/wAAAP4AAAD+AAAA/QAAAP0AAAAEAAAABAAAAPwAAAAEAAAABAAAAAQAAAADAAAAAwAAAAIAAAADAAAAAgAAAAEAAAACAAAAAQAAAAEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAD/AAAA/wAAAP4AAAD/AAAA/gAAAP0AAAD+AAAA/QAAAP0AAAD8AAAA/AAAAPwAAAD8AAAA/AAAAPwAAAD8AAAA/QAAAPwAAAD9AAAA/QAAAP0AAAD+AAAA/wAAAP4AAAD/AAAA/wAAAAAAAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAABAAAA/wAAAAAAAAD+AAAAAQAAAAAAAAAAAAAA/wAAAP4AAAD+AAAAAwAAAP4AAAD9AAAA/QAAAPwAAAAEAAAAAwAAAAMAAAAEAAAAAgAAAAMAAAADAAAAAgAAAAIAAAABAAAAAQAAAAIAAAAAAAAAAAAAAAEAAAD/AAAAAAAAAAAAAAD+AAAA/wAAAP8AAAD+AAAA/gAAAP0AAAD9AAAA/gAAAPwAAAD9AAAA/QAAAPwAAAD9AAAA/AAAAP0AAAD8AAAA/QAAAP0AAAD+AAAA/gAAAP4AAAD+AAAA/wAAAP8AAAD/AAAAAAAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAAAQAAAP8AAAAAAAAAAAAAAP4AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP4AAAADAAAA/QAAAAMAAAD8AAAAAwAAAAMAAAADAAAAAwAAAAIAAAACAAAAAgAAAAIAAAACAAAAAQAAAAEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAD/AAAA/wAAAP4AAAD+AAAA/gAAAP4AAAD+AAAA/QAAAP0AAAD9AAAA/QAAAP0AAAD9AAAA/QAAAP0AAAD+AAAA/QAAAP4AAAD+AAAA/gAAAP8AAAD/AAAA/wAAAP8AAAAAAAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAQAAAAAAAAABAAAAAQAAAAIAAAACAAAAAQAAAAMAAAACAAAAAgAAAAMAAAACAAAAAwAAAAIAAAADAAAAAgAAAAIAAAACAAAAAgAAAAIAAAABAAAAAQAAAAEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAD/AAAA/wAAAP8AAAD+AAAA/gAAAP4AAAD+AAAA/gAAAP0AAAD+AAAA/QAAAP4AAAD9AAAA/gAAAP4AAAD9AAAA/wAAAP4AAAD+AAAA/wAAAP8AAAAAAAAA/wAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAAAAAAAAAAAAAAAAAA/wAAAAAAAAD/AAAAAQAAAP8AAAACAAAAAQAAAP0AAAADAAAA/QAAAAIAAAACAAAAAgAAAAIAAAABAAAAAgAAAAEAAAACAAAAAQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAA/wAAAP4AAAD/AAAA/gAAAP8AAAD+AAAA/gAAAP4AAAD+AAAA/gAAAP0AAAD+AAAA/wAAAP4AAAD+AAAA/wAAAP8AAAD+AAAAAAAAAP8AAAAAAAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA//+C+dbJggW+VAAAAABJRU5ErkJggg==",
        zoomScrollButtonSize : 18,
        zoomScrollAreaBackgroundColor : "#fff",
        zoomScrollAreaBackgroundOpacity : 0.7,
        zoomScrollAreaBorderColor : "#d4d4d4",
        zoomScrollAreaBorderWidth : 1,
        zoomScrollAreaBorderRadius : 3,
        zoomScrollGridFontSize : 10,
        zoomScrollGridTickPadding : 4,
        zoomScrollBrushAreaBackgroundOpacity : 0.7,
        zoomScrollBrushLineBorderWidth : 1,
        crossBorderColor : "#a9a9a9",
        crossBorderWidth : 1,
        crossBorderOpacity : 0.8,
        crossBalloonFontSize : 11,
        crossBalloonFontColor : "#fff",
        crossBalloonBackgroundColor : "#000",
        crossBalloonBackgroundOpacity : 0.5,
        dragSelectBackgroundColor : "#7BBAE7",
        dragSelectBackgroundOpacity : 0.3,
        dragSelectBorderColor : "#7BBAE7",
        dragSelectBorderWidth : 1,

        // Map Common
        mapPathBackgroundColor : "#67B7DC",
        mapPathBackgroundOpacity : 1,
        mapPathBorderColor : "#fff",
        mapPathBorderWidth : 1,
        mapPathBorderOpacity : 1,
        // Map Brushes
        mapBubbleBackgroundOpacity : 0.5,
        mapBubbleBorderWidth : 1,
        mapBubbleFontSize : 11,
        mapBubbleFontColor : "#fff",
        mapSelectorHoverColor : "#5a73db",
        mapSelectorActiveColor : "#CC0000",
        mapFlightRouteAirportSmallColor : "#CC0000",
        mapFlightRouteAirportLargeColor : "#000",
        mapFlightRouteAirportBorderWidth : 2,
        mapFlightRouteAirportRadius : 8,
        mapFlightRouteLineColor : "#ff0000",
        mapFlightRouteLineWidth : 1,
        mapWeatherBackgroundColor : "#fff",
        mapWeatherBorderColor : "#a9a9a9",
        mapWeatherFontSize : 11,
        mapWeatherTitleFontColor : "#666",
        mapWeatherInfoFontColor : "#ff0000",
        mapCompareBubbleMaxLineColor : "#fff",
        mapCompareBubbleMaxLineDashArray : "2,2",
        mapCompareBubbleMaxBorderColor : "#fff",
        mapCompareBubbleMaxFontSize : 36,
        mapCompareBubbleMaxFontColor : "#fff",
        mapCompareBubbleMinBorderColor : "#ffff00",
        mapCompareBubbleMinFontSize : 24,
        mapCompareBubbleMinFontColor : "#000",
        // Map Widgets
        mapControlButtonColor : "#3994e2",
        mapControlLeftButtonImage : "data:image/gif;base64,R0lGODlhCwALAPABAP///wAAACH5BAUAAAEALAAAAAALAAsAAAIQjI9poMcdXpOKTujw0pGjAgA7",
        mapControlRightButtonImage : "data:image/gif;base64,R0lGODlhCwALAPABAP///wAAACH5BAUAAAEALAAAAAALAAsAAAIQjI8JycvonomSKhksxBqbAgA7",
        mapControlTopButtonImage : "data:image/gif;base64,R0lGODlhCwALAPABAP///wAAACH5BAUAAAEALAAAAAALAAsAAAIQjI+pCmvd2IkzUYqw27yfAgA7",
        mapControlBottomButtonImage : "data:image/gif;base64,R0lGODlhCwALAPABAP///wAAACH5BAUAAAEALAAAAAALAAsAAAIQjI+pyw37TDxTUhhq0q2fAgA7",
        mapControlHomeButtonImage : "data:image/gif;base64,R0lGODlhCwALAPABAAAAAAAAACH5BAUAAAEALAAAAAALAAsAAAIZjI8ZoAffIERzMVMxm+9KvIBh6Imb2aVMAQA7",
        mapControlUpButtonImage : "data:image/gif;base64,R0lGODlhCwALAPABAP///wAAACH5BAUAAAEALAAAAAALAAsAAAISjI8ZoMhtHpQH2HsV1TD29SkFADs=",
        mapControlDownButtonImage : "data:image/gif;base64,R0lGODlhCwALAPABAP///wAAACH5BAUAAAEALAAAAAALAAsAAAIMjI+py+0BopSv2qsKADs=",
        mapControlScrollColor : "#000",
        mapControlScrollLineColor : "#fff",
        mapMinimapBackgroundColor : "transparent",
        mapMinimapBorderColor : "transparent",
        mapMinimapBorderWidth : 1,
        mapMinimapPathBackgroundColor : "#67B7DC",
        mapMinimapPathBackgroundOpacity : 0.5,
        mapMinimapPathBorderColor : "#67B7DC",
        mapMinimapPathBorderWidth : 0.5,
        mapMinimapPathBorderOpacity : 0.1,
        mapMinimapDragBackgroundColor : "#7CC7C3",
        mapMinimapDragBackgroundOpacity : 0.3,
        mapMinimapDragBorderColor : "#56B4AF",
        mapMinimapDragBorderWidth : 1,


        // Polygon Brushes
        polygonColumnBackgroundOpacity: 0.6,
        polygonColumnBorderOpacity: 0.5,
        polygonScatterRadialOpacity: 0.7,
        polygonScatterBackgroundOpacity: 0.8,
        polygonLineBackgroundOpacity: 0.6,
        polygonLineBorderOpacity: 0.7
    }
});

/***/ }),
/* 56 */
/***/ (function(module, exports) {

jui.define("chart.theme.dark", [], function() {
    var themeColors = [
        "#12f2e8",
        "#26f67c",
        "#e9f819",
        "#b78bf9",
        "#f94590",
        "#8bccf9",
        "#9228e4",
        "#06d9b6",
        "#fc6d65",
        "#f199ff",
        "#c8f21d",
        "#16a6e5",
        "#00ba60",
        "#91f2a1",
        "#fc9765",
        "#f21d4f"
    ];

    return {
        fontFamily : "arial,Tahoma,verdana",
        backgroundColor : "#222222",
        colors : themeColors,

        // Axis styles
        axisBackgroundColor : "#222222",
        axisBackgroundOpacity : 0,
        axisBorderColor : "#222222",
        axisBorderWidth : 0,
        axisBorderRadius : 0,

        // Grid styles
        gridXFontSize : 11,
        gridYFontSize : 11,
        gridZFontSize : 10,
        gridCFontSize : 11,
        gridXFontColor : "#868686",
        gridYFontColor : "#868686",
        gridZFontColor : "#868686",
        gridCFontColor : "#868686",
        gridXFontWeight : "normal",
        gridYFontWeight : "normal",
        gridZFontWeight : "normal",
        gridCFontWeight : "normal",
        gridXAxisBorderColor : "#464646",
        gridYAxisBorderColor : "#464646",
        gridZAxisBorderColor : "#464646",
        gridXAxisBorderWidth : 2,
        gridYAxisBorderWidth : 2,
        gridZAxisBorderWidth : 2,

        // Full 3D 전용 테마
        gridFaceBackgroundColor: "#dcdcdc",
        gridFaceBackgroundOpacity: 0.3,

        gridActiveFontColor : "#ff762d",
        gridActiveBorderColor : "#ff7800",
        gridActiveBorderWidth : 1,
        gridPatternColor : "#ababab",
        gridPatternOpacity : 0.1,
        gridBorderColor : "#868686",
        gridBorderWidth : 1,
        gridBorderDashArray : "none",
        gridBorderOpacity : 1,
        gridTickBorderSize : 3,
        gridTickBorderWidth : 1.5,
        gridTickPadding : 5,

        // Brush styles
        tooltipPointRadius : 5, // common
        tooltipPointBorderWidth : 1, // common
        tooltipPointFontWeight : "bold", // common
        tooltipPointFontSize : 11,
        tooltipPointFontColor : "#868686",
        barFontSize : 11,
        barFontColor : "#868686",
        barBorderColor : "none",
        barBorderWidth : 0,
        barBorderOpacity : 0,
        barBorderRadius : 3,
        barActiveBackgroundColor : "#fc6d65",
        barPointBorderColor : "#fff",
        barDisableBackgroundOpacity : 0.4,
        barStackEdgeBorderWidth : 1,
        gaugeBackgroundColor : "#3e3e3e",
        gaugeArrowColor : "#a6a6a6",
        gaugeFontColor : "#c5c5c5",
        gaugeFontSize : 20,
        gaugeFontWeight : "bold",
        gaugeTitleFontSize : 12,
        gaugeTitleFontWeight : "normal",
        gaugeTitleFontColor : "#c5c5c5",
        gaugePaddingAngle : 2,
        bargaugeBackgroundColor : "#3e3e3e",
        bargaugeFontSize : 11,
        bargaugeFontColor : "#c5c5c5",
        pieBorderColor : "#232323",
        pieBorderWidth : 1,
        pieOuterFontSize : 11,
        pieOuterFontColor : "#868686",
        pieOuterLineColor : "#a9a9a9",
        pieOuterLineSize : 8,
        pieOuterLineRate : 1.3,
        pieOuterLineWidth : 0.7,
        pieInnerFontSize : 11,
        pieInnerFontColor : "#868686",
        pieActiveDistance : 5,
        pieNoDataBackgroundColor : "#E9E9E9",
        pieTotalValueFontSize : 36,
        pieTotalValueFontColor : "#dcdcdc",
        pieTotalValueFontWeight : "bold",
        areaBackgroundOpacity : 0.5,
        areaSplitBackgroundColor : "#ebebeb",
        bubbleBackgroundOpacity : 0.5,
        bubbleBorderWidth : 1,
        bubbleFontSize : 12,
        bubbleFontColor : "#868686",
        candlestickBorderColor : "#14be9d",
        candlestickBackgroundColor : "#14be9d",
        candlestickInvertBorderColor : "#ff4848",
        candlestickInvertBackgroundColor : "#ff4848",
        ohlcBorderColor : "#14be9d",
        ohlcInvertBorderColor : "#ff4848",
        ohlcBorderRadius : 5,
        lineBorderWidth : 2,
        lineBorderDashArray : "none",
        lineBorderOpacity : 1,
        lineDisableBorderOpacity : 0.3,
        linePointBorderColor : "#fff",
        lineSplitBorderColor : null,
        lineSplitBorderOpacity : 0.5,
        pathBackgroundOpacity : 0.2,
        pathBorderWidth : 1,
        scatterBorderColor : "none",
        scatterBorderWidth : 1,
        scatterHoverColor : "#222222",
        waterfallBackgroundColor : "#26f67c",
        waterfallInvertBackgroundColor : "#f94590",
        waterfallEdgeBackgroundColor : "#8bccf9",
        waterfallLineColor : "#a9a9a9",
        waterfallLineDashArray : "0.9",
        focusBorderColor : "#FF7800",
        focusBorderWidth : 1,
        focusBackgroundColor : "#FF7800",
        focusBackgroundOpacity : 0.1,
        pinFontColor : "#FF7800",
        pinFontSize : 10,
        pinBorderColor : "#FF7800",
        pinBorderWidth : 0.7,

        topologyNodeRadius : 12.5,
        topologyNodeFontSize : 14,
        topologyNodeFontColor : "#c5c5c5",
        topologyNodeTitleFontSize : 11,
        topologyNodeTitleFontColor : "#c5c5c5",
        topologyEdgeWidth : 1,
        topologyActiveEdgeWidth : 2,
        topologyHoverEdgeWidth : 2,
        topologyEdgeColor : "#b2b2b2",
        topologyActiveEdgeColor : "#905ed1",
        topologyHoverEdgeColor : "#d3bdeb",
        topologyEdgeFontSize : 10,
        topologyEdgeFontColor : "#c5c5c5",
        topologyEdgePointRadius : 3,
        topologyEdgeOpacity : 1,
        topologyTooltipBackgroundColor : "#222222",
        topologyTooltipBorderColor : "#ccc",
        topologyTooltipFontSize : 11,
        topologyTooltipFontColor : "#c5c5c5",

        timelineTitleFontSize: 11,
        timelineTitleFontColor: "#d5d5d5",
        timelineTitleFontWeight: 700,
        timelineColumnFontSize: 10,
        timelineColumnFontColor: "#d5d5d5",
        timelineColumnBackgroundColor: "#1c1c1c",
        timelineHoverRowBackgroundColor: "#2f2f2f",
        timelineEvenRowBackgroundColor: "#202020",
        timelineOddRowBackgroundColor: "#1c1c1c",
        timelineActiveBarBackgroundColor: "#6f32ba",
        timelineActiveBarFontColor: "#fff",
        timelineActiveBarFontSize: 9,
        timelineHoverBarBackgroundColor: null,
        timelineLayerBackgroundOpacity: 0.1,
        timelineActiveLayerBackgroundColor: "#7F5FA4",
        timelineActiveLayerBorderColor: "#7f5fa4",
        timelineHoverLayerBackgroundColor: "#7F5FA4",
        timelineHoverLayerBorderColor: "#7f5fa4",
        timelineVerticalLineColor: "#2f2f2f",
        timelineHorizontalLineColor: "#4d4d4d",

        hudColumnGridPointRadius: 7,
        hudColumnGridPointBorderColor: "#868686",
        hudColumnGridPointBorderWidth: 2,
        hudColumnGridFontColor: "#868686",
        hudColumnGridFontSize: 12,
        hudColumnGridFontWeight: "normal",
        hudColumnLeftBackgroundColor: "#3C3C3C",
        hudColumnRightBackgroundColor: "#838383",
        hudBarGridFontColor: "#868686",
        hudBarGridFontSize: 16,
        hudBarGridLineColor: "#868686",
        hudBarGridLineWidth: 1,
        hudBarGridLineOpacity: 0.8,
        hudBarGridBackgroundColor: "#868686",
        hudBarGridBackgroundOpacity: 0.5,
        hudBarTextLineColor: "#B2A6A6",
        hudBarTextLineWidth: 1.5,
        hudBarTextLinePadding: 12,
        hudBarTextLineFontColor: "#868686",
        hudBarTextLineFontSize: 13,
        hudBarBackgroundOpacity: 0.6,
        hudBarTopBackgroundColor: "#bbb",
        hudBarBottomBackgroundColor: "#3C3C3C",

        heatmapBackgroundColor: "#222222",
        heatmapBackgroundOpacity: 1,
        heatmapHoverBackgroundOpacity: 0.2,
        heatmapBorderColor: "#fff",
        heatmapBorderWidth: 0.5,
        heatmapBorderOpacity: 1,
        heatmapFontSize: 11,
        heatmapFontColor: "#868686",

        pyramidLineColor: "#464646",
        pyramidLineWidth: 1,
        pyramidTextLineColor: "#B2A6A6",
        pyramidTextLineWidth: 1,
        pyramidTextLineSize: 30,
        pyramidTextFontSize: 10,
        pyramidTextFontColor: "#222",

        heatmapscatterBorderWidth: 0.5,
        heatmapscatterBorderColor: "#222222",
        heatmapscatterActiveBackgroundColor: "#222222",

        treemapNodeBorderWidth: 0.5,
        treemapNodeBorderColor: "#222222",
        treemapTextFontSize: 11,
        treemapTextFontColor: "#868686",
        treemapTitleFontSize: 12,
        treemapTitleFontColor: "#868686",

        arcEqualizerBorderColor: "#222222",
        arcEqualizerBorderWidth: 1,
        arcEqualizerFontSize: 13,
        arcEqualizerFontColor: "#868686",
        arcEqualizerBackgroundColor: "#222222",

        flameNodeBorderWidth: 0.5,
        flameNodeBorderColor: "#222",
        flameDisableBackgroundOpacity: 0.4,
        flameTextFontSize: 12,
        flameTextFontColor: "#868686",

        selectBoxBackgroundColor: "#fff",
        selectBoxBackgroundOpacity: 0.1,
        selectBoxBorderColor: "#fff",
        selectBoxBorderOpacity: 0.2,

        // widget styles
        titleFontColor : "#ffffff",
        titleFontSize : 14,
        titleFontWeight : "normal",
        legendFontColor : "#ffffff",
        legendFontSize : 11,
        legendSwitchCircleColor : "#fff",
        legendSwitchDisableColor : "#c8c8c8",
        tooltipFontColor : "#333333",
        tooltipFontSize : 12,
        tooltipBackgroundColor : "#fff",
        tooltipBackgroundOpacity : 1,
        tooltipBorderColor : null,
        tooltipBorderWidth : 2,
        tooltipLineColor : null,
        tooltipLineWidth : 1,
        scrollBackgroundSize : 7,
        scrollBackgroundColor : "#3e3e3e",
        scrollThumbBackgroundColor : "#666666",
        scrollThumbBorderColor : "#686868",
        zoomBackgroundColor : "#ff0000",
        zoomFocusColor : "#808080",
        zoomScrollBackgroundSize : 45,
        zoomScrollButtonImage : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAACXBIWXMAAAsTAAALEwEAmpwYAAABL2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjarY69SsNQHEfPbUXBIYgEN+HiIC7ix9YxaUsRHGoUSbI1yaWKNrncXD86+RI+hIOLo6BvUHEQnHwEN0EcHBwiZHAQwTOd/xn+/KCx4nX8bmMORrk1Qc+XYRTLmUemaQLAIC211+9vA+RFrvjB+zMC4GnV6/hd/sZsqo0FPoHNTJUpiHUgO7PagrgE3ORIWxBXgGv2gjaIO8AZVj4BnKTyF8AxYRSDeAXcYRjF0ABwk8pdwLXq3AK0Cz02h8MDKzdarZb0siJRcndcWjUq5VaeFkYXZmBVBlT7qt2e1sdKBj2f/yWMYlnZ2w4CEAuTutWkJ+b0W4V4+P2uf4zvwQtg6rZu+x9wvQaLzbotL8H8BdzoL/HAUD36i+bmAAA7VmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMTEgNzkuMTU4MzI1LCAyMDE1LzA5LzEwLTAxOjEwOjIwICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgICAgICAgICB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIgogICAgICAgICAgICB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoTWFjaW50b3NoKTwveG1wOkNyZWF0b3JUb29sPgogICAgICAgICA8eG1wOkNyZWF0ZURhdGU+MjAxNi0wMi0yM1QyMjoxMDowOSswOTowMDwveG1wOkNyZWF0ZURhdGU+CiAgICAgICAgIDx4bXA6TWV0YWRhdGFEYXRlPjIwMTYtMDItMjNUMjI6MTA6MDkrMDk6MDA8L3htcDpNZXRhZGF0YURhdGU+CiAgICAgICAgIDx4bXA6TW9kaWZ5RGF0ZT4yMDE2LTAyLTIzVDIyOjEwOjA5KzA5OjAwPC94bXA6TW9kaWZ5RGF0ZT4KICAgICAgICAgPHhtcE1NOkluc3RhbmNlSUQ+eG1wLmlpZDoxZjEyZjk2NS02OTgxLTQxZTktYTU3Ny0zMmMwMDg2NjBhMjM8L3htcE1NOkluc3RhbmNlSUQ+CiAgICAgICAgIDx4bXBNTTpEb2N1bWVudElEPmFkb2JlOmRvY2lkOnBob3Rvc2hvcDoyNjNlNTQzMi0xYWJkLTExNzktYjc1Ny1lYmNlZjk1ZGNmOGE8L3htcE1NOkRvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+eG1wLmRpZDpjMjgwNGJmNi0zZTI5LTQ4NTQtOGRhMi05MjAyMDVkNDAzMDY8L3htcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD4KICAgICAgICAgPHhtcE1NOkhpc3Rvcnk+CiAgICAgICAgICAgIDxyZGY6U2VxPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5jcmVhdGVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6YzI4MDRiZjYtM2UyOS00ODU0LThkYTItOTIwMjA1ZDQwMzA2PC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDE2LTAyLTIzVDIyOjEwOjA5KzA5OjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoTWFjaW50b3NoKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPnNhdmVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6MWYxMmY5NjUtNjk4MS00MWU5LWE1NzctMzJjMDA4NjYwYTIzPC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDE2LTAyLTIzVDIyOjEwOjA5KzA5OjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoTWFjaW50b3NoKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOlNlcT4KICAgICAgICAgPC94bXBNTTpIaXN0b3J5PgogICAgICAgICA8cGhvdG9zaG9wOkRvY3VtZW50QW5jZXN0b3JzPgogICAgICAgICAgICA8cmRmOkJhZz4KICAgICAgICAgICAgICAgPHJkZjpsaT5hZG9iZTpkb2NpZDpwaG90b3Nob3A6OTkxNzEzNDYtMTllNS0xMTc5LTg1YjUtZjAwOGZkMGY4OTgyPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGk+eG1wLmRpZDozNWYyZjJkMC0xNmY3LTQ1YjktYjI3MS0zY2VkNTgwZmNjNmE8L3JkZjpsaT4KICAgICAgICAgICAgPC9yZGY6QmFnPgogICAgICAgICA8L3Bob3Rvc2hvcDpEb2N1bWVudEFuY2VzdG9ycz4KICAgICAgICAgPHBob3Rvc2hvcDpDb2xvck1vZGU+MzwvcGhvdG9zaG9wOkNvbG9yTW9kZT4KICAgICAgICAgPHBob3Rvc2hvcDpJQ0NQcm9maWxlPkFwcGxlIFJHQjwvcGhvdG9zaG9wOklDQ1Byb2ZpbGU+CiAgICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2UvcG5nPC9kYzpmb3JtYXQ+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgICAgIDx0aWZmOlhSZXNvbHV0aW9uPjcyMDAwMC8xMDAwMDwvdGlmZjpYUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6WVJlc29sdXRpb24+NzIwMDAwLzEwMDAwPC90aWZmOllSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpSZXNvbHV0aW9uVW5pdD4yPC90aWZmOlJlc29sdXRpb25Vbml0PgogICAgICAgICA8ZXhpZjpDb2xvclNwYWNlPjY1NTM1PC9leGlmOkNvbG9yU3BhY2U+CiAgICAgICAgIDxleGlmOlBpeGVsWERpbWVuc2lvbj44MDwvZXhpZjpQaXhlbFhEaW1lbnNpb24+CiAgICAgICAgIDxleGlmOlBpeGVsWURpbWVuc2lvbj44MDwvZXhpZjpQaXhlbFlEaW1lbnNpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8P3hwYWNrZXQgZW5kPSJ3Ij8+32DD9QAAACBjSFJNAAB6JQAAgIMAAPQlAACE0QAAbV8AAOhsAAA8iwAAG1iD5wd4AABkYElEQVR4AQBQZK+bAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAAAAAAAAAAAAAAAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAEAAAAAAAAAAAAAAAEAAAAAAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAAAAAAAAAAAA/wAAAAAAAAD/AAAAAAAAAAAAAAD/AAAAAAAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAEAAAAAAAAAAAAAAAEAAAABAAAAAAAAAAEAAAABAAAAAAAAAAEAAAABAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAAAAAAAAAAAAP8AAAD/AAAAAAAAAP8AAAD/AAAAAAAAAP8AAAD/AAAAAAAAAAAAAAD/AAAAAAAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///8AAAAAAAAAAAAAAAAAAAAAAAAAAAABAQEBAAAAAAAAAAAAAAABAAAAAAAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAAAAAAAAQAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAAAAAAA/wAAAAAAAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAP////8BAQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEBAQAAAAAAAAABAAAAAAAAAAEAAAABAAAAAAAAAAIAAAABAAAAAQAAAAJ5eXkLaGhoNw8PDykFBQUmBQUFJAEBARgCAgILAQEBDQEBAQz////0////8/7+/vX9/f3p+vr63fb29tzt7e3WiYmJzKKiovYAAAD/AAAA/wAAAP4AAAD/AAAA/wAAAP8AAAD+AAAA/wAAAP8AAAD+AAAAAAAAAP8AAAD/AAAAAAEBAQAAAAAAAAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///8A////AP///wAAAAABAAAAAQAAAAIAAAADAAAABAAAAAUAAAAGAAAACAAAAAnR0dEy8/Pzhfv7+8X////5/////////////////////////////////////////////////////////////////////////////////v7++vf398jr6+uKtLS0OgAAABMAAAASAAAAEAAAAA4AAAAMAAAACwAAAAkAAAAIAAAABgAAAAUAAAAEAAAAAwAAAAIAAAABAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///8AAAAAAQAAAAEAAAACAAAAAgAAAAQAAAAFAAAABgAAAAifn58Y8vLydPv7+8////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////n5+dHi4uJ8ampqJAAAABQAAAASAAAAEAAAAA0AAAALAAAACgAAAAgAAAAGAAAABQAAAAQAAAACAAAAAgAAAAEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAgAAAAIAAAADAAAABAAAAAYAAAAItra2HPT09In+/v7x/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////f398ujo6JB5eXkqAAAAFQAAABMAAAAQAAAADgAAAAwAAAAJAAAACAAAAAYAAAAEAAAAAwAAAAIAAAACAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAEAAAACAAAAAgAAAAQAAAAFAAAAB2ZmZg/z8/OA/v7+9f/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+/v715eXliTMzMx4AAAAWAAAAEwAAABAAAAAOAAAACwAAAAkAAAAHAAAABQAAAAQAAAADAAAAAgAAAAEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAQAAAAIAAAADAAAABAAAAAYAAAAI5+fnS/39/dr///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////n5+d7Dw8NZAAAAGQAAABYAAAASAAAADwAAAAwAAAAKAAAACAAAAAYAAAAEAAAAAwAAAAIAAAABAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAABAAAAAgAAAAMAAAAFAAAABmJiYg329vaT/////v/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+6OjonCgoKCAAAAAYAAAAFQAAABEAAAAOAAAACwAAAAgAAAAGAAAABQAAAAMAAAACAAAAAQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAIAAAACAAAABAAAAAUAAAAHzc3NKfv7+8z///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////b29tGMjIw8AAAAGwAAABcAAAATAAAADwAAAAwAAAAJAAAABwAAAAUAAAAEAAAAAgAAAAIAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAgAAAAIAAAAEAAAABQAAAAfc3Nw7/v7+6f/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7+/vsp6enTgAAAB0AAAAYAAAAFAAAABAAAAANAAAACgAAAAcAAAAFAAAABAAAAAIAAAACAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAABAAAAAgAAAAQAAAAFAAAAB+fn50r+/v7z/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////f399La2tl4AAAAfAAAAGgAAABUAAAARAAAADQAAAAoAAAAHAAAABQAAAAQAAAACAAAAAQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAEAAAACAAAABAAAAAUAAAAH5+fnSf////n///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7+/vqzs7NeAAAAIAAAABsAAAAWAAAAEgAAAA4AAAAKAAAABwAAAAUAAAAEAAAAAgAAAAEAAAABAAAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAEAAAABAAAAAgAAAALc3NwzHR0dsAEBAQoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAQMjIyNFISEhybGxsesAAAABAAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAQAAAAEAAAACAAAAAsjIyCMsLCy5AQEBEQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAgIGLCwsRv///73CwsLyAAAAAAAAAP8AAAAAAAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAACAAAAAwAAAAQAAAAGgICAEv39/dD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////T09NgwMDAwAAAAIgAAABwAAAAWAAAAEQAAAA0AAAAJAAAABgAAAAQAAAADAAAAAgAAAAEAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAABAAAAAgAAAAIAAAAC9/f3kwgICGQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADj4+OqHh4efwAAAPkAAAD6AAAA+gAAAPsAAAD8AAAA/AAAAP4AAAD+AAAA/gAAAP8AAAD/AgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAEAAAABAAAAAQAAAALk5ORECAgIYwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAdHR1VqqqqPgAAAAYAAAAFAAAABQAAAAQAAAADAAAAAwAAAAIAAAABAAAAAQAAAAEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAQAAAAIAAAAEAAAAB2lpaRH9/f3b////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9vb24CMjIzMAAAAmAAAAHwAAABgAAAATAAAADgAAAAoAAAAHAAAABAAAAAIAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAgAAAAQAAAAGAAAACfPz84H//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9PT05UAAAArAAAAJAAAAB0AAAAXAAAAEQAAAAwAAAAJAAAABgAAAAQAAAACAwAAAAAAAAAAAAAAAAAAAAEAAAABAAAAAQAAAAIAAAADsrKyGSwsLKUBAQEFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQUFCzY2Ni01dXV9QAAAP8AAAD/AAAA/wAAAAAAAAD/AAAAAAAAAP8AAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAABAAAAAgAAAAIAAAAD9fX1iwoKCmsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP39/QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAwMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP39/QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAwMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADb29unJiYmiAAAAPkAAAD4AAAA+QAAAPoAAAD8AAAA+wAAAP0AAAD+BAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAQAAAAKXl5cSCQkJYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/f39AMDAwAD9/f0AAAAAAAAAAAAAAAAAAAAAAAMDAwBAQEAAAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/f39AMDAwAD9/f0AAAAAAAAAAAAAAAAAAAAAAAMDAwBAQEAAAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiIiJQPz8/m8HBwesAAAD9AAAA/QAAAP4AAAD+AAAAAwAAAP8AAAD/AgAAAAAAAAAAAAAAAQAAAAEAAAABAAAAAQAAAAJXV1deAQEBCwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP39/QD9/f0A/f39AP39/QD9/f0A/f39AP39/QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP39/QD9/f0A/f39AP39/QD9/f0A/f39AP39/QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAwMJiIiIUAAAAAQAAAAEAAAABAAAAAMAAAADAAAAAgAAAAIAAAABAgAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAgAAAAINDQ1fAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALS0tTgAAAAUAAAAFAAAABAAAAAQAAAADAAAAAgAAAAIAAAACAgAAAAAAAAABAAAAAQAAAAEAAAABAAAAAc/Pzy4EBAQnAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwsLIICAgCkAAAAEAAAABAAAAAMAAAADAAAAAwAAAAIAAAABAgAAAAAAAAAAAAAAAAAAAAEAAAABAAAAAiEhIVAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAE9PT0IAAAAEAAAABAAAAAQAAAADAAAAAgAAAAIAAAACAgAAAAAAAAAAAAAAAQAAAAEAAAABAAAAAQoKCkMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8fHzgAAAAEAAAABAAAAAMAAAADAAAAAwAAAAIAAAABAgAAAAAAAAABAAAAAAAAAAEAAAAChISEDwUFBS8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQECUyMjIOAAAABAAAAAQAAAADAAAAAgAAAAIAAAACAgAAAAEAAAAAAAAAAQAAAAEAAAABVVVVNQAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAQJlZWUsAAAAAwAAAAMAAAADAAAAAwAAAAIAAAACAgAAAAAAAAAAAAAAAAAAAAEAAAABERERJwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAnJychAAAAAwAAAAMAAAADAAAAAgAAAAIAAAACAgAAAAAAAAABAAAAAQAAAAEAAAACCAgIJgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAXFxceAAAAAgAAAAIAAAACAAAAAgAAAAIAAAABAgAAAAAAAAAAAAAAAQAAAAEAAAABBgYGJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUFBQdAAAAAwAAAAMAAAACAAAAAwAAAAIAAAABAgAAAAEAAAABAAAAAQAAAAEAAAABAgICFwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAICAgRAAAAAgAAAAIAAAACAAAAAQAAAAEAAAACAgAAAAAAAAAAAAAAAAAAAAEAAAABAgICDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAQKAAAAAQAAAAIAAAACAAAAAgAAAAEAAAABAgAAAAAAAAAAAAAAAQAAAAAAAAABAgICDQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGBgYKAAAAAgAAAAEAAAACAAAAAQAAAAIAAAABAgAAAAAAAAABAAAAAAAAAAEAAAAAAQEBDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAwMJAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAgAAAAAAAAAAAAAAAAAAAAAAAAAB////9gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD9/f35AAAAAQAAAAIAAAABAAAAAQAAAAEAAAABAgAAAAAAAAAAAAAAAQAAAAEAAAAA////+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+/v77AAAAAQAAAAAAAAABAAAAAQAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAB/f397wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD5+fn0AAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAA/Pz85wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD19fXsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAgAAAAAAAAAAAAAAAAAAAAAAAAAA9/f33QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADr6+vkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AgAAAAAAAAAAAAAAAAAAAAAAAAAA8/Pz3AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADk5OTlAAAAAAAAAP8AAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAP8AAAD/5+fn2wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADV1dXjAAAA/wAAAAAAAAD/AAAA/wAAAAAAAAAAAgAAAAAAAAAAAAAA/wAAAAAAAAD/l5eXzwAAAP0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////6enp7aAAAA/wAAAP4AAAD/AAAA/wAAAP8AAAD/AgAAAAAAAAD/AAAAAAAAAP8AAAAAoqKi8vf399UAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO3t7d/X19f1AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AgAAAAAAAAAAAAAA/wAAAAAAAAD/AAAA/+/v78AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANjY2M4AAAD+AAAA/gAAAP8AAAD+AAAA/wAAAP4AAAD/AgAAAAAAAAAAAAAAAAAAAP8AAAD/AAAA/8TExLYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKioqMYAAAD/AAAA/wAAAP4AAAD+AAAA/gAAAP8AAAD/AgAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/ldXV9X5+fndAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8PDw5JWVld4AAAD+AAAA/gAAAP4AAAD+AAAA/wAAAP8AAAD+AgAAAAAAAAAAAAAA/wAAAP8AAAD/AAAA/wAAAP7i4uKoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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/QAAAP0AAAD9AAAA/AAAAPwAAAD8AAAA+wAAAPwAAAD7AAAA/AAAAPwAAAD8AAAA/AAAAP0AAAD9AAAA/gAAAP4AAAD/AAAA/gAAAAAAAAD/AAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAAAAAAAAAAAA/gAAAAEAAAAAAAAA/wAAAP8AAAD/AAAA/wAAAP4AAAD+AAAA/QAAAP0AAAAEAAAABAAAAPwAAAAEAAAABAAAAAQAAAADAAAAAwAAAAIAAAADAAAAAgAAAAEAAAACAAAAAQAAAAEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAD/AAAA/wAAAP4AAAD/AAAA/gAAAP0AAAD+AAAA/QAAAP0AAAD8AAAA/AAAAPwAAAD8AAAA/AAAAPwAAAD8AAAA/QAAAPwAAAD9AAAA/QAAAP0AAAD+AAAA/wAAAP4AAAD/AAAA/wAAAAAAAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAABAAAA/wAAAAAAAAD+AAAAAQAAAAAAAAAAAAAA/wAAAP4AAAD+AAAAAwAAAP4AAAD9AAAA/QAAAPwAAAAEAAAAAwAAAAMAAAAEAAAAAgAAAAMAAAADAAAAAgAAAAIAAAABAAAAAQAAAAIAAAAAAAAAAAAAAAEAAAD/AAAAAAAAAAAAAAD+AAAA/wAAAP8AAAD+AAAA/gAAAP0AAAD9AAAA/gAAAPwAAAD9AAAA/QAAAPwAAAD9AAAA/AAAAP0AAAD8AAAA/QAAAP0AAAD+AAAA/gAAAP4AAAD+AAAA/wAAAP8AAAD/AAAAAAAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAAAQAAAP8AAAAAAAAAAAAAAP4AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP4AAAADAAAA/QAAAAMAAAD8AAAAAwAAAAMAAAADAAAAAwAAAAIAAAACAAAAAgAAAAIAAAACAAAAAQAAAAEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAD/AAAA/wAAAP4AAAD+AAAA/gAAAP4AAAD+AAAA/QAAAP0AAAD9AAAA/QAAAP0AAAD9AAAA/QAAAP0AAAD+AAAA/QAAAP4AAAD+AAAA/gAAAP8AAAD/AAAA/wAAAP8AAAAAAAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAQAAAAAAAAABAAAAAQAAAAIAAAACAAAAAQAAAAMAAAACAAAAAgAAAAMAAAACAAAAAwAAAAIAAAADAAAAAgAAAAIAAAACAAAAAgAAAAIAAAABAAAAAQAAAAEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAD/AAAA/wAAAP8AAAD+AAAA/gAAAP4AAAD+AAAA/gAAAP0AAAD+AAAA/QAAAP4AAAD9AAAA/gAAAP4AAAD9AAAA/wAAAP4AAAD+AAAA/wAAAP8AAAAAAAAA/wAAAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAAAAAAAAAAAAAAAAAA/wAAAAAAAAD/AAAAAQAAAP8AAAACAAAAAQAAAP0AAAADAAAA/QAAAAIAAAACAAAAAgAAAAIAAAABAAAAAgAAAAEAAAACAAAAAQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAA/wAAAP4AAAD/AAAA/gAAAP8AAAD+AAAA/gAAAP4AAAD+AAAA/gAAAP0AAAD+AAAA/wAAAP4AAAD+AAAA/wAAAP8AAAD+AAAAAAAAAP8AAAAAAAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA//+C+dbJggW+VAAAAABJRU5ErkJggg==",
        zoomScrollButtonSize : 18,
        zoomScrollAreaBackgroundColor : "#fff",
        zoomScrollAreaBackgroundOpacity : 0.7,
        zoomScrollAreaBorderColor : "#d4d4d4",
        zoomScrollAreaBorderWidth : 1,
        zoomScrollAreaBorderRadius : 3,
        zoomScrollGridFontSize : 10,
        zoomScrollGridTickPadding : 4,
        zoomScrollBrushAreaBackgroundOpacity : 0.7,
        zoomScrollBrushLineBorderWidth : 1,
        crossBorderColor : "#a9a9a9",
        crossBorderWidth : 1,
        crossBorderOpacity : 0.8,
        crossBalloonFontSize : 11,
        crossBalloonFontColor : "#333",
        crossBalloonBackgroundColor : "#fff",
        crossBalloonBackgroundOpacity : 1,
        dragSelectBackgroundColor : "#7BBAE7",
        dragSelectBackgroundOpacity : 0.3,
        dragSelectBorderColor : "#7BBAE7",
        dragSelectBorderWidth : 1,

        // Map Common
        mapPathBackgroundColor : "#67B7DC",
        mapPathBackgroundOpacity : 1,
        mapPathBorderColor : "#fff",
        mapPathBorderWidth : 1,
        mapPathBorderOpacity : 1,
        // Map Brushes
        mapBubbleBackgroundOpacity : 0.5,
        mapBubbleBorderWidth : 1,
        mapBubbleFontSize : 11,
        mapBubbleFontColor : "#868686",
        mapSelectorHoverColor : "#5a73db",
        mapSelectorActiveColor : "#CC0000",
        mapFlightRouteAirportSmallColor : "#CC0000",
        mapFlightRouteAirportLargeColor : "#000",
        mapFlightRouteAirportBorderWidth : 2,
        mapFlightRouteAirportRadius : 8,
        mapFlightRouteLineColor : "#ff0000",
        mapFlightRouteLineWidth : 1,
        mapWeatherBackgroundColor : "#fff",
        mapWeatherBorderColor : "#a9a9a9",
        mapWeatherFontSize : 11,
        mapWeatherTitleFontColor : "#666",
        mapWeatherInfoFontColor : "#ff0000",
        mapCompareBubbleMaxLineColor : "#fff",
        mapCompareBubbleMaxLineDashArray : "2,2",
        mapCompareBubbleMaxBorderColor : "#fff",
        mapCompareBubbleMaxFontSize : 36,
        mapCompareBubbleMaxFontColor : "#fff",
        mapCompareBubbleMinBorderColor : "#ffff00",
        mapCompareBubbleMinFontSize : 24,
        mapCompareBubbleMinFontColor : "#000",
        // Map Widgets
        mapControlButtonColor : "#3994e2",
        mapControlLeftButtonImage : "data:image/gif;base64,R0lGODlhCwALAPABAP///wAAACH5BAUAAAEALAAAAAALAAsAAAIQjI9poMcdXpOKTujw0pGjAgA7",
        mapControlRightButtonImage : "data:image/gif;base64,R0lGODlhCwALAPABAP///wAAACH5BAUAAAEALAAAAAALAAsAAAIQjI8JycvonomSKhksxBqbAgA7",
        mapControlTopButtonImage : "data:image/gif;base64,R0lGODlhCwALAPABAP///wAAACH5BAUAAAEALAAAAAALAAsAAAIQjI+pCmvd2IkzUYqw27yfAgA7",
        mapControlBottomButtonImage : "data:image/gif;base64,R0lGODlhCwALAPABAP///wAAACH5BAUAAAEALAAAAAALAAsAAAIQjI+pyw37TDxTUhhq0q2fAgA7",
        mapControlHomeButtonImage : "data:image/gif;base64,R0lGODlhCwALAPABAAAAAAAAACH5BAUAAAEALAAAAAALAAsAAAIZjI8ZoAffIERzMVMxm+9KvIBh6Imb2aVMAQA7",
        mapControlUpButtonImage : "data:image/gif;base64,R0lGODlhCwALAPABAP///wAAACH5BAUAAAEALAAAAAALAAsAAAISjI8ZoMhtHpQH2HsV1TD29SkFADs=",
        mapControlDownButtonImage : "data:image/gif;base64,R0lGODlhCwALAPABAP///wAAACH5BAUAAAEALAAAAAALAAsAAAIMjI+py+0BopSv2qsKADs=",
        mapControlScrollColor : "#000",
        mapControlScrollLineColor : "#fff",
        mapMinimapBackgroundColor : "transparent",
        mapMinimapBorderColor : "transparent",
        mapMinimapBorderWidth : 1,
        mapMinimapPathBackgroundColor : "#67B7DC",
        mapMinimapPathBackgroundOpacity : 0.5,
        mapMinimapPathBorderColor : "#67B7DC",
        mapMinimapPathBorderWidth : 0.5,
        mapMinimapPathBorderOpacity : 0.1,
        mapMinimapDragBackgroundColor : "#7CC7C3",
        mapMinimapDragBackgroundOpacity : 0.3,
        mapMinimapDragBorderColor : "#56B4AF",
        mapMinimapDragBorderWidth : 1,

        // Polygon Brushes
        polygonColumnBackgroundOpacity: 0.6,
        polygonColumnBorderOpacity: 0.5,
        polygonScatterRadialOpacity: 0.7,
        polygonScatterBackgroundOpacity: 0.8,
        polygonLineBackgroundOpacity: 0.6,
        polygonLineBorderOpacity: 0.7
    }
});

/***/ }),
/* 57 */,
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(0);


/***/ })
]]);