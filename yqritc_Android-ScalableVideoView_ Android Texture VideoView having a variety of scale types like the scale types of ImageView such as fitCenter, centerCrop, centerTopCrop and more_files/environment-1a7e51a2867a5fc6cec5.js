(()=>{var ee=Object.defineProperty;var e=(P,r)=>ee(P,"name",{value:r,configurable:!0});(globalThis.webpackChunk=globalThis.webpackChunk||[]).push([["environment"],{81308:(P,r,u)=>{"use strict";var f=u(99510);window.addEventListener("error",f.LN),window.addEventListener("unhandledrejection",f.mT),window.location.hash==="#b00m"&&setTimeout(()=>{throw new Error("b00m")});var S=u(41153);function g(){const o=document.createElement("div");return o.style.cssText="-ms-user-select: element; user-select: contain;",o.style.getPropertyValue("-ms-user-select")==="element"||o.style.getPropertyValue("-ms-user-select")==="contain"||o.style.getPropertyValue("user-select")==="contain"}e(g,"supportsUserSelectContain");function _(o){if(!(o.target instanceof Element))return;const m=o.target.closest(".user-select-contain");if(!m)return;const b=window.getSelection();if(!b.rangeCount)return;const h=b.getRangeAt(0).commonAncestorContainer;m.contains(h)||b.selectAllChildren(m)}e(_,"handleUserSelectContain"),window.getSelection&&!g()&&document.addEventListener("click",_);var p=u(77997);(0,p.nn)()},1347:(P,r,u)=>{"use strict";u.d(r,{S:()=>_});function f(p){const o=document.querySelectorAll(p);if(o.length>0)return o[o.length-1]}e(f,"queryLast");function S(){const p=f("meta[name=analytics-location]");return p?p.content:window.location.pathname}e(S,"pagePathname");function g(){const p=f("meta[name=analytics-location-query-strip]");let o="";p||(o=window.location.search);const m=f("meta[name=analytics-location-params]");m&&(o+=(o?"&":"?")+m.content);for(const b of document.querySelectorAll("meta[name=analytics-param-rename]")){const h=b.content.split(":",2);o=o.replace(new RegExp(`(^|[?&])${h[0]}($|=)`,"g"),`$1${h[1]}$2`)}return o}e(g,"pageQuery");function _(){return`${window.location.protocol}//${window.location.host}${S()+g()}`}e(_,"requestUri")},99510:(P,r,u)=>{"use strict";u.d(r,{LN:()=>h,mT:()=>w,eK:()=>A,cI:()=>y,aJ:()=>a});var f=u(40411),S=u(9534),g=u(77997),_=u(45316),p=u(1347);let o=!1,m=0;const b=Date.now();function h(l){l.error&&T(E(x(l.error)))}e(h,"reportEvent");async function w(l){if(!!l.promise)try{await l.promise}catch(c){T(E(x(c)))}}e(w,"reportPromiseRejectionEvent");function A(l,c={}){l&&l.name!=="AbortError"&&T(E(x(l),c))}e(A,"reportError");async function T(l){var c,j;if(!C())return;const D=(j=(c=document.head)==null?void 0:c.querySelector('meta[name="browser-errors-url"]'))==null?void 0:j.content;if(!!D){if(t(l.error.stacktrace)){o=!0;return}m++;try{await fetch(D,{method:"post",body:JSON.stringify(l)})}catch{}}}e(T,"report");function x(l){return{type:l.name,value:l.message,stacktrace:y(l)}}e(x,"formatError");function E(l,c={}){return Object.assign({error:l,sanitizedUrl:(0,p.S)()||window.location.href,readyState:document.readyState,referrer:document.referrer,timeSinceLoad:Math.round(Date.now()-b),user:a()||void 0,bundler:k()},c)}e(E,"errorContext");function y(l){return(0,_.Q)(l.stack||"").map(c=>({filename:c.file||"",function:String(c.methodName),lineno:(c.lineNumber||0).toString(),colno:(c.column||0).toString()}))}e(y,"stacktrace");const n=/(chrome|moz|safari)-extension:\/\//;function t(l){return l.some(c=>n.test(c.filename)||n.test(c.function))}e(t,"isExtensionError");function a(){var l,c;const j=(c=(l=document.head)==null?void 0:l.querySelector('meta[name="user-login"]'))==null?void 0:c.content;return j||`anonymous-${(0,S.b)()}`}e(a,"pageUser");let s=!1;window.addEventListener("pageshow",()=>s=!1),window.addEventListener("pagehide",()=>s=!0);function C(){return!s&&!o&&m<10&&(0,g.Gb)()&&!(0,f.Z)(document)}e(C,"reportable");function k(){return"System"in window?"rollup":"webpack"}e(k,"bundlerName"),typeof BroadcastChannel=="function"&&new BroadcastChannel("shared-worker-error").addEventListener("message",c=>{A(c.data.error)})},40411:(P,r,u)=>{"use strict";u.d(r,{Z:()=>f});function f(S){var g,_;const p=(_=(g=S.head)==null?void 0:g.querySelector('meta[name="expected-hostname"]'))==null?void 0:_.content;if(!p)return!1;const o=p.replace(/\.$/,"").split(".").slice(-2).join("."),m=S.location.hostname.replace(/\.$/,"").split(".").slice(-2).join(".");return o!==m}e(f,"detectProxySite")},41153:P=>{(function(){"use strict";var r=window,u=document;function f(g){var _=["MSIE ","Trident/","Edge/"];return new RegExp(_.join("|")).test(g)}e(f,"isMicrosoftBrowser");function S(){if("scrollBehavior"in u.documentElement.style&&r.__forceSmoothScrollPolyfill__!==!0)return;var g=r.HTMLElement||r.Element,_=468,p=f(r.navigator.userAgent)?1:0,o={scroll:r.scroll||r.scrollTo,scrollBy:r.scrollBy,elementScroll:g.prototype.scroll||b,scrollIntoView:g.prototype.scrollIntoView},m=r.performance&&r.performance.now?r.performance.now.bind(r.performance):Date.now;function b(t,a){this.scrollLeft=t,this.scrollTop=a}e(b,"scrollElement");function h(t){return .5*(1-Math.cos(Math.PI*t))}e(h,"ease");function w(t){if(t===null||typeof t!="object"||t.behavior===void 0||t.behavior==="auto"||t.behavior==="instant")return!0;if(typeof t=="object"&&t.behavior==="smooth")return!1;throw new TypeError("behavior member of ScrollOptions "+t.behavior+" is not a valid value for enumeration ScrollBehavior.")}e(w,"shouldBailOut");function A(t,a){if(a==="Y")return t.clientHeight+p<t.scrollHeight;if(a==="X")return t.clientWidth+p<t.scrollWidth}e(A,"hasScrollableSpace");function T(t,a){var s=r.getComputedStyle(t,null)["overflow"+a];return s==="auto"||s==="scroll"}e(T,"canOverflow");function x(t){var a=A(t,"Y")&&T(t,"Y"),s=A(t,"X")&&T(t,"X");return a||s}e(x,"isScrollable");function E(t){var a;do t=t.parentNode,a=t===u.body;while(a===!1&&x(t)===!1);return a=null,t}e(E,"findScrollableParent");function y(t){var a=m(),s,C,k,l=(a-t.startTime)/_;l=l>1?1:l,s=h(l),C=t.startX+(t.x-t.startX)*s,k=t.startY+(t.y-t.startY)*s,t.method.call(t.scrollable,C,k),(C!==t.x||k!==t.y)&&r.requestAnimationFrame(y.bind(r,t))}e(y,"step");function n(t,a,s){var C,k,l,c,j=m();t===u.body?(C=r,k=r.scrollX||r.pageXOffset,l=r.scrollY||r.pageYOffset,c=o.scroll):(C=t,k=t.scrollLeft,l=t.scrollTop,c=b),y({scrollable:C,method:c,startTime:j,startX:k,startY:l,x:a,y:s})}e(n,"smoothScroll"),r.scroll=r.scrollTo=function(){if(arguments[0]!==void 0){if(w(arguments[0])===!0){o.scroll.call(r,arguments[0].left!==void 0?arguments[0].left:typeof arguments[0]!="object"?arguments[0]:r.scrollX||r.pageXOffset,arguments[0].top!==void 0?arguments[0].top:arguments[1]!==void 0?arguments[1]:r.scrollY||r.pageYOffset);return}n.call(r,u.body,arguments[0].left!==void 0?~~arguments[0].left:r.scrollX||r.pageXOffset,arguments[0].top!==void 0?~~arguments[0].top:r.scrollY||r.pageYOffset)}},r.scrollBy=function(){if(arguments[0]!==void 0){if(w(arguments[0])){o.scrollBy.call(r,arguments[0].left!==void 0?arguments[0].left:typeof arguments[0]!="object"?arguments[0]:0,arguments[0].top!==void 0?arguments[0].top:arguments[1]!==void 0?arguments[1]:0);return}n.call(r,u.body,~~arguments[0].left+(r.scrollX||r.pageXOffset),~~arguments[0].top+(r.scrollY||r.pageYOffset))}},g.prototype.scroll=g.prototype.scrollTo=function(){if(arguments[0]!==void 0){if(w(arguments[0])===!0){if(typeof arguments[0]=="number"&&arguments[1]===void 0)throw new SyntaxError("Value couldn't be converted");o.elementScroll.call(this,arguments[0].left!==void 0?~~arguments[0].left:typeof arguments[0]!="object"?~~arguments[0]:this.scrollLeft,arguments[0].top!==void 0?~~arguments[0].top:arguments[1]!==void 0?~~arguments[1]:this.scrollTop);return}var t=arguments[0].left,a=arguments[0].top;n.call(this,this,typeof t>"u"?this.scrollLeft:~~t,typeof a>"u"?this.scrollTop:~~a)}},g.prototype.scrollBy=function(){if(arguments[0]!==void 0){if(w(arguments[0])===!0){o.elementScroll.call(this,arguments[0].left!==void 0?~~arguments[0].left+this.scrollLeft:~~arguments[0]+this.scrollLeft,arguments[0].top!==void 0?~~arguments[0].top+this.scrollTop:~~arguments[1]+this.scrollTop);return}this.scroll({left:~~arguments[0].left+this.scrollLeft,top:~~arguments[0].top+this.scrollTop,behavior:arguments[0].behavior})}},g.prototype.scrollIntoView=function(){if(w(arguments[0])===!0){o.scrollIntoView.call(this,arguments[0]===void 0?!0:arguments[0]);return}var t=E(this),a=t.getBoundingClientRect(),s=this.getBoundingClientRect();t!==u.body?(n.call(this,t,t.scrollLeft+s.left-a.left,t.scrollTop+s.top-a.top),r.getComputedStyle(t).position!=="fixed"&&r.scrollBy({left:a.left,top:a.top,behavior:"smooth"})):r.scrollBy({left:s.left,top:s.top,behavior:"smooth"})}}e(S,"polyfill"),P.exports={polyfill:S}})()},45316:(P,r,u)=>{"use strict";u.d(r,{Q:()=>S});var f="<unknown>";function S(y){var n=y.split(`
`);return n.reduce(function(t,a){var s=p(a)||m(a)||w(a)||E(a)||T(a);return s&&t.push(s),t},[])}e(S,"parse");var g=/^\s*at (.*?) ?\(((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,_=/\((\S*)(?::(\d+))(?::(\d+))\)/;function p(y){var n=g.exec(y);if(!n)return null;var t=n[2]&&n[2].indexOf("native")===0,a=n[2]&&n[2].indexOf("eval")===0,s=_.exec(n[2]);return a&&s!=null&&(n[2]=s[1],n[3]=s[2],n[4]=s[3]),{file:t?null:n[2],methodName:n[1]||f,arguments:t?[n[2]]:[],lineNumber:n[3]?+n[3]:null,column:n[4]?+n[4]:null}}e(p,"parseChrome");var o=/^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i;function m(y){var n=o.exec(y);return n?{file:n[2],methodName:n[1]||f,arguments:[],lineNumber:+n[3],column:n[4]?+n[4]:null}:null}e(m,"parseWinjs");var b=/^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|resource|\[native).*?|[^@]*bundle)(?::(\d+))?(?::(\d+))?\s*$/i,h=/(\S+) line (\d+)(?: > eval line \d+)* > eval/i;function w(y){var n=b.exec(y);if(!n)return null;var t=n[3]&&n[3].indexOf(" > eval")>-1,a=h.exec(n[3]);return t&&a!=null&&(n[3]=a[1],n[4]=a[2],n[5]=null),{file:n[3],methodName:n[1]||f,arguments:n[2]?n[2].split(","):[],lineNumber:n[4]?+n[4]:null,column:n[5]?+n[5]:null}}e(w,"parseGecko");var A=/^\s*(?:([^@]*)(?:\((.*?)\))?@)?(\S.*?):(\d+)(?::(\d+))?\s*$/i;function T(y){var n=A.exec(y);return n?{file:n[3],methodName:n[1]||f,arguments:[],lineNumber:+n[4],column:n[5]?+n[5]:null}:null}e(T,"parseJSC");var x=/^\s*at (?:((?:\[object object\])?[^\\/]+(?: \[as \S+\])?) )?\(?(.*?):(\d+)(?::(\d+))?\)?\s*$/i;function E(y){var n=x.exec(y);return n?{file:n[2],methodName:n[1]||f,arguments:[],lineNumber:+n[3],column:n[4]?+n[4]:null}:null}e(E,"parseNode")},77997:(P,r,u)=>{"use strict";u.d(r,{nn:()=>Q,Gb:()=>J});function f(i){const d=new AbortController;return d.abort(i),d.signal}e(f,"abortsignal_abort_abortSignalAbort");function S(){return"abort"in AbortSignal&&typeof AbortSignal.abort=="function"}e(S,"isSupported");function g(){return AbortSignal.abort===f}e(g,"isPolyfilled");function _(){S()||(AbortSignal.abort=f)}e(_,"apply");function p(i){const d=new AbortController;return setTimeout(()=>d.abort(new DOMException("TimeoutError")),i),d.signal}e(p,"abortsignal_timeout_abortSignalTimeout");function o(){return"abort"in AbortSignal&&typeof AbortSignal.timeout=="function"}e(o,"abortsignal_timeout_isSupported");function m(){return AbortSignal.timeout===p}e(m,"abortsignal_timeout_isPolyfilled");function b(){o()||(AbortSignal.timeout=p)}e(b,"abortsignal_timeout_apply");class h extends Error{constructor(d,v,O={}){super(v);Object.defineProperty(this,"errors",{value:Array.from(d),configurable:!0,writable:!0}),O.cause&&Object.defineProperty(this,"cause",{value:O.cause,configurable:!0,writable:!0})}}e(h,"AggregateError");function w(){return typeof globalThis.AggregateError=="function"}e(w,"aggregateerror_isSupported");function A(){return globalThis.AggregateError===h}e(A,"aggregateerror_isPolyfilled");function T(){w()||(globalThis.AggregateError=h)}e(T,"aggregateerror_apply");const x=Reflect.getPrototypeOf(Int8Array)||{};function E(i){const d=this.length;return i=Math.trunc(i)||0,i<0&&(i+=d),i<0||i>=d?void 0:this[i]}e(E,"arrayLikeAt");function y(){return"at"in Array.prototype&&typeof Array.prototype.at=="function"&&"at"in String.prototype&&typeof String.prototype.at=="function"&&"at"in x&&typeof x.at=="function"}e(y,"arraylike_at_isSupported");function n(){return Array.prototype.at===E&&String.prototype.at===E&&x.at===E}e(n,"arraylike_at_isPolyfilled");function t(){if(!y()){const i={value:E,writable:!0,configurable:!0};Object.defineProperty(Array.prototype,"at",i),Object.defineProperty(String.prototype,"at",i),Object.defineProperty(x,"at",i)}}e(t,"arraylike_at_apply");function a(){const i=new Uint32Array(4);crypto.getRandomValues(i);let d=-1;return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(v){d++;const O=i[d>>3]>>d%8*4&15;return(v==="x"?O:O&3|8).toString(16)})}e(a,"randomUUID");function s(){return typeof crypto=="object"&&"randomUUID"in crypto&&typeof crypto.randomUUID=="function"}e(s,"crypto_randomuuid_isSupported");function C(){return s()&&crypto.randomUUID===a}e(C,"crypto_randomuuid_isPolyfilled");function k(){s()||(crypto.randomUUID=a)}e(k,"crypto_randomuuid_apply");const l=EventTarget.prototype.addEventListener;function c(i,d,v){if(typeof v=="object"&&"signal"in v&&v.signal instanceof AbortSignal){if(v.signal.aborted)return;l.call(v.signal,"abort",()=>{this.removeEventListener(i,d,v)})}return l.call(this,i,d,v)}e(c,"addEventListenerWithAbortSignal");function j(){let i=!1;const d=e(()=>i=!0,"setSignalSupported");function v(){}e(v,"noop");const O=Object.create({},{signal:{get:d}});try{const I=new EventTarget;return I.addEventListener("test",v,O),I.removeEventListener("test",v,O),i}catch{return i}}e(j,"event_abortsignal_isSupported");function D(){return EventTarget.prototype.addEventListener===c}e(D,"event_abortsignal_isPolyfilled");function W(){typeof AbortSignal=="function"&&!j()&&(EventTarget.prototype.addEventListener=c)}e(W,"event_abortsignal_apply");const V=Object.prototype.hasOwnProperty;function M(i,d){if(i==null)throw new TypeError("Cannot convert undefined or null to object");return V.call(Object(i),d)}e(M,"object_hasown_objectHasOwn");function N(){return"hasOwn"in Object&&typeof Object.hasOwn=="function"}e(N,"object_hasown_isSupported");function te(){return Object.hasOwn===M}e(te,"object_hasown_isPolyfilled");function q(){N()||Object.defineProperty(Object,"hasOwn",{value:M,configurable:!0,writable:!0})}e(q,"object_hasown_apply");function U(i){return new Promise((d,v)=>{let O=!1;const I=Array.from(i),R=[];function z(L){O||(O=!0,d(L))}e(z,"resolveOne");function Z(L){R.push(L),R.length===I.length&&v(new globalThis.AggregateError(R,"All Promises rejected"))}e(Z,"rejectIfDone");for(const L of I)Promise.resolve(L).then(z,Z)})}e(U,"promise_any_promiseAny");function B(){return"any"in Promise&&typeof Promise.any=="function"}e(B,"promise_any_isSupported");function ne(){return Promise.all===U}e(ne,"promise_any_isPolyfilled");function H(){B()||(Promise.any=U)}e(H,"promise_any_apply");const K=50;function $(i,d={}){const v=Date.now(),O=d.timeout||0,I=Object.defineProperty({didTimeout:!1,timeRemaining(){return Math.max(0,K-(Date.now()-v))}},"didTimeout",{get(){return Date.now()-v>O}});return window.setTimeout(()=>{i(I)})}e($,"requestidlecallback_requestIdleCallback");function X(i){clearTimeout(i)}e(X,"cancelIdleCallback");function Y(){return typeof globalThis.requestIdleCallback=="function"}e(Y,"requestidlecallback_isSupported");function re(){return globalThis.requestIdleCallback===$&&globalThis.cancelIdleCallback===X}e(re,"requestidlecallback_isPolyfilled");function G(){Y()||(globalThis.requestIdleCallback=$,globalThis.cancelIdleCallback=X)}e(G,"requestidlecallback_apply");const F=typeof Blob=="function"&&typeof PerformanceObserver=="function"&&typeof Intl=="object"&&typeof MutationObserver=="function"&&typeof URLSearchParams=="function"&&typeof WebSocket=="function"&&typeof IntersectionObserver=="function"&&typeof queueMicrotask=="function"&&typeof TextEncoder=="function"&&typeof TextDecoder=="function"&&typeof customElements=="object"&&typeof HTMLDetailsElement=="function"&&typeof AbortController=="function"&&typeof AbortSignal=="function"&&"entries"in FormData.prototype&&"toggleAttribute"in Element.prototype&&"replaceChildren"in Element.prototype&&"fromEntries"in Object&&"flatMap"in Array.prototype&&"trimEnd"in String.prototype&&"allSettled"in Promise&&"matchAll"in String.prototype&&"replaceAll"in String.prototype&&!0;function J(){return F&&S()&&o()&&w()&&y()&&s()&&j()&&N()&&B()&&Y()}e(J,"lib_isSupported");function oe(){return abortSignalAbort.isPolyfilled()&&abortSignalTimeout.isPolyfilled()&&aggregateError.isPolyfilled()&&arrayAt.isPolyfilled()&&cryptoRandomUUID.isPolyfilled()&&eventAbortSignal.isPolyfilled()&&objectHasOwn.isPolyfilled()&&promiseAny.isPolyfilled()&&requestIdleCallback.isPolyfilled()}e(oe,"lib_isPolyfilled");function Q(){_(),b(),T(),t(),k(),W(),q(),H(),G()}e(Q,"lib_apply")},9534:(P,r,u)=>{"use strict";u.d(r,{b:()=>p});let f;function S(){return`${Math.round(Math.random()*(Math.pow(2,31)-1))}.${Math.round(Date.now()/1e3)}`}e(S,"generateClientId");function g(o){const m=`GH1.1.${o}`,b=Date.now(),h=new Date(b+1*365*86400*1e3).toUTCString();let{domain:w}=document;w.endsWith(".github.com")&&(w="github.com"),document.cookie=`_octo=${m}; expires=${h}; path=/; domain=${w}; secure; samesite=lax`}e(g,"setClientIdCookie");function _(){let o;const b=document.cookie.match(/_octo=([^;]+)/g);if(!b)return;let h=[0,0];for(const w of b){const[,A]=w.split("="),[,T,...x]=A.split("."),E=T.split("-").map(Number);E>h&&(h=E,o=x.join("."))}return o}e(_,"getClientIdFromCookie");function p(){try{const o=_();if(o)return o;const m=S();return g(m),m}catch{return f||(f=S()),f}}e(p,"getOrCreateClientId")}},P=>{var r=e(f=>P(P.s=f),"__webpack_exec__"),u=r(81308)}]);})();

//# sourceMappingURL=environment-17f8d96d40fde9a486a57417e03dc965f2ba0626ea09aaca37b2ddc1ce7ea22d1eb9e00191bb3e9baac34932b21a907cc10f578c45d05bfe6f78b6faee49e95e.js.map