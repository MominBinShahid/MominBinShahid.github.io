(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{G0mt:function(e,t,a){e.exports={content:"sidebar-module--content--2KaFb",sidebarContent:"sidebar-module--sidebarContent--2f_aG",profileAvatar:"sidebar-module--profileAvatar--10UQs",name:"sidebar-module--name--MsMlK",badge:"sidebar-module--badge--1s2_Z",badgeGray:"sidebar-module--badgeGray--1BKQQ",badgeGrayDescText:"sidebar-module--badgeGrayDescText--29Xzi",boxName:"sidebar-module--boxName--2PeRV",contactBlock:"sidebar-module--contactBlock--2LsNd",contactBlockItem:"sidebar-module--contactBlockItem--22-Qo",resumeDownload:"sidebar-module--resumeDownload--2krDh",resumePrintableDownload:"sidebar-module--resumePrintableDownload--3PNw1",fixSidebarInfoIcons:"sidebar-module--fixSidebarInfoIcons--3G9VQ",fixSidebarSmiley:"sidebar-module--fixSidebarSmiley--1JBlb",emailHider:"sidebar-module--emailHider--1kdEE",phoneHider:"sidebar-module--phoneHider--2Z0ha",fixSideBarRefText:"sidebar-module--fixSideBarRefText--2I2EF",unsetFontWeight:"sidebar-module--unsetFontWeight--36BFI",background:"sidebar-module--background--3FKZV",boxContent:"sidebar-module--boxContent--vtY2V",sideBar404Radius:"sidebar-module--sideBar404Radius--1bUIi"}},M7k7:function(e,t,a){"use strict";a("SchZ"),a("lUaL")},"Oh/9":function(e,t,a){e.exports={hoverLighter:"socials-module--hoverLighter--3LwSg",hoverDarker:"socials-module--hoverDarker--3nQ8P",stackOverflowSquareIcon:"socials-module--stackOverflowSquareIcon--y5qrj"}},Ol7k:function(e,t,a){"use strict";var n=a("KQm4"),r=a("rePB"),o=a("ODXe"),i=a("wx14"),l=a("q1tI"),c=a("TSYQ"),s=a.n(c),u=a("H84U"),d=function(e,t){var a={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(a[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var r=0;for(n=Object.getOwnPropertySymbols(e);r<n.length;r++)t.indexOf(n[r])<0&&Object.prototype.propertyIsEnumerable.call(e,n[r])&&(a[n[r]]=e[n[r]])}return a},f=l.createContext({siderHook:{addSider:function(){return null},removeSider:function(){return null}}});function m(e){var t=e.suffixCls,a=e.tagName,n=e.displayName;return function(e){var r=function(n){var r=l.useContext(u.b).getPrefixCls,o=n.prefixCls,c=r(t,o);return l.createElement(e,Object(i.a)({prefixCls:c,tagName:a},n))};return r.displayName=n,r}}var h=function(e){var t=e.prefixCls,a=e.className,n=e.children,r=e.tagName,o=d(e,["prefixCls","className","children","tagName"]),c=s()(t,a);return l.createElement(r,Object(i.a)({className:c},o),n)},p=m({suffixCls:"layout",tagName:"section",displayName:"Layout"})((function(e){var t,a=l.useContext(u.b).direction,c=l.useState([]),m=Object(o.a)(c,2),h=m[0],p=m[1],b=e.prefixCls,v=e.className,g=e.children,y=e.hasSider,O=e.tagName,E=d(e,["prefixCls","className","children","hasSider","tagName"]),x=s()(b,(t={},Object(r.a)(t,"".concat(b,"-has-sider"),"boolean"==typeof y?y:h.length>0),Object(r.a)(t,"".concat(b,"-rtl"),"rtl"===a),t),v);return l.createElement(f.Provider,{value:{siderHook:{addSider:function(e){p((function(t){return[].concat(Object(n.a)(t),[e])}))},removeSider:function(e){p((function(t){return t.filter((function(t){return t!==e}))}))}}}},l.createElement(O,Object(i.a)({className:x},E),g))})),b=m({suffixCls:"layout-header",tagName:"header",displayName:"Header"})(h),v=m({suffixCls:"layout-footer",tagName:"footer",displayName:"Footer"})(h),g=m({suffixCls:"layout-content",tagName:"main",displayName:"Content"})(h),y=p,O=a("bT9E"),E={icon:{tag:"svg",attrs:{viewBox:"0 0 1024 1024",focusable:"false"},children:[{tag:"path",attrs:{d:"M912 192H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM104 228a56 56 0 10112 0 56 56 0 10-112 0zm0 284a56 56 0 10112 0 56 56 0 10-112 0zm0 284a56 56 0 10112 0 56 56 0 10-112 0z"}}]},name:"bars",theme:"outlined"},x=a("6VBw"),w=function(e,t){return l.createElement(x.a,Object.assign({},e,{ref:t,icon:E}))};w.displayName="BarsOutlined";var N=l.forwardRef(w),j={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"}}]},name:"right",theme:"outlined"},k=function(e,t){return l.createElement(x.a,Object.assign({},e,{ref:t,icon:j}))};k.displayName="RightOutlined";var S=l.forwardRef(k),C={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"}}]},name:"left",theme:"outlined"},P=function(e,t){return l.createElement(x.a,Object.assign({},e,{ref:t,icon:C}))};P.displayName="LeftOutlined";var z,B=l.forwardRef(P),I=function(e){return!isNaN(parseFloat(e))&&isFinite(e)},T=function(e,t){var a={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(a[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var r=0;for(n=Object.getOwnPropertySymbols(e);r<n.length;r++)t.indexOf(n[r])<0&&Object.prototype.propertyIsEnumerable.call(e,n[r])&&(a[n[r]]=e[n[r]])}return a},R={xs:"479.98px",sm:"575.98px",md:"767.98px",lg:"991.98px",xl:"1199.98px",xxl:"1599.98px"},L=l.createContext({}),M=(z=0,function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return z+=1,"".concat(e).concat(z)}),W=l.forwardRef((function(e,t){var a=e.prefixCls,n=e.className,c=e.trigger,d=e.children,m=e.defaultCollapsed,h=void 0!==m&&m,p=e.theme,b=void 0===p?"dark":p,v=e.style,g=void 0===v?{}:v,y=e.collapsible,E=void 0!==y&&y,x=e.reverseArrow,w=void 0!==x&&x,j=e.width,k=void 0===j?200:j,C=e.collapsedWidth,P=void 0===C?80:C,z=e.zeroWidthTriggerStyle,W=e.breakpoint,F=e.onCollapse,D=e.onBreakpoint,H=T(e,["prefixCls","className","trigger","children","defaultCollapsed","theme","style","collapsible","reverseArrow","width","collapsedWidth","zeroWidthTriggerStyle","breakpoint","onCollapse","onBreakpoint"]),U=Object(l.useContext)(f).siderHook,A=Object(l.useState)("collapsed"in H?H.collapsed:h),_=Object(o.a)(A,2),K=_[0],Q=_[1],q=Object(l.useState)(!1),G=Object(o.a)(q,2),V=G[0],Y=G[1];Object(l.useEffect)((function(){"collapsed"in H&&Q(H.collapsed)}),[H.collapsed]);var Z=function(e,t){"collapsed"in H||Q(e),null==F||F(e,t)},J=Object(l.useRef)();J.current=function(e){Y(e.matches),null==D||D(e.matches),K!==e.matches&&Z(e.matches,"responsive")},Object(l.useEffect)((function(){function e(e){return J.current(e)}var t;if("undefined"!=typeof window){var a=window.matchMedia;if(a&&W&&W in R){t=a("(max-width: ".concat(R[W],")"));try{t.addEventListener("change",e)}catch(n){t.addListener(e)}e(t)}}return function(){try{null==t||t.removeEventListener("change",e)}catch(n){null==t||t.removeListener(e)}}}),[]),Object(l.useEffect)((function(){var e=M("ant-sider-");return U.addSider(e),function(){return U.removeSider(e)}}),[]);var X,$,ee,te,ae,ne,re,oe,ie,le,ce=function(){Z(!K,"clickTrigger")},se=Object(l.useContext)(u.b).getPrefixCls;return l.createElement(L.Provider,{value:{siderCollapsed:K}},($=se("layout-sider",a),ee=Object(O.a)(H,["collapsed"]),ae=I(te=K?P:k)?"".concat(te,"px"):String(te),ne=0===parseFloat(String(P||0))?l.createElement("span",{onClick:ce,className:s()("".concat($,"-zero-width-trigger"),"".concat($,"-zero-width-trigger-").concat(w?"right":"left")),style:z},c||l.createElement(N,null)):null,re={expanded:w?l.createElement(S,null):l.createElement(B,null),collapsed:w?l.createElement(B,null):l.createElement(S,null)}[K?"collapsed":"expanded"],oe=null!==c?ne||l.createElement("div",{className:"".concat($,"-trigger"),onClick:ce,style:{width:ae}},c||re):null,ie=Object(i.a)(Object(i.a)({},g),{flex:"0 0 ".concat(ae),maxWidth:ae,minWidth:ae,width:ae}),le=s()($,"".concat($,"-").concat(b),(X={},Object(r.a)(X,"".concat($,"-collapsed"),!!K),Object(r.a)(X,"".concat($,"-has-trigger"),E&&null!==c&&!ne),Object(r.a)(X,"".concat($,"-below"),!!V),Object(r.a)(X,"".concat($,"-zero-width"),0===parseFloat(ae)),X),n),l.createElement("aside",Object(i.a)({className:le},ee,{style:ie,ref:t}),l.createElement("div",{className:"".concat($,"-children")},d),E||V&&ne?oe:null)))}));W.displayName="Sider";var F=W,D=y;D.Header=b,D.Footer=v,D.Content=g,D.Sider=F;t.a=D},QtAv:function(e,t,a){},S1Gy:function(e,t,a){},U4IR:function(e,t,a){"use strict";a("M7k7");var n=a("Ol7k"),r=a("q1tI"),o=a.n(r),i=a("Wbzz"),l=a("lwPf"),c=a("obyI"),s=a.n(c),u=a("pA78"),d=a("z0WU"),f=a("WzeP"),m=a.n(f);a("QtAv"),a("S1Gy");t.a=function(){Object(r.useEffect)((function(){Object(d.switchThemeColor)(),Object(d.showConsoleMessage)()}),[]);var e,t=Object(r.useState)(!1),a=t[0],c=t[1],f=Object(l.a)()[0],h=s.a.pages,p=function(){0!==f&&f<=768&&c(!a)};return o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:m.a.circleMenu,role:"button",tabIndex:"0",onClick:p,onKeyDown:p},o.a.createElement("div",{className:m.a.hamburger+" "+(a?m.a.menuIcon:"")},o.a.createElement("div",{className:m.a.hamburgerText},o.a.createElement("div",{className:m.a.line}),o.a.createElement("div",{className:m.a.line}),o.a.createElement("div",{className:m.a.line})))),o.a.createElement(n.a,{className:m.a.navWrap+" "+(a?"":m.a.hidden)+" "+(a?m.a.openMenu:"")},o.a.createElement("div",{className:m.a.backgroundDiv},o.a.createElement("ul",{className:m.a.nav+" text-center"},(e=[],Object.keys(h).forEach((function(t){var a=h[t],n=a.path,r=a.name;if(!a.hide){var l="/"+n+(n&&"/");e.push(o.a.createElement("li",{className:m.a.navItem,key:n+"-"+r},o.a.createElement(i.Link,{to:l,onClick:p,activeClassName:m.a.anchorActive},r)))}})),e.push(o.a.createElement("li",{className:m.a.navItem,key:"DarkMode"},o.a.createElement(u.a,null))),e)))))}},WzeP:function(e,t,a){e.exports={circleMenu:"header-module--circleMenu--3BRHL",hamburger:"header-module--hamburger--3m0Le",hamburgerText:"header-module--hamburgerText--2OjNb",line:"header-module--line--210OK",menuIcon:"header-module--menuIcon--3RZBW",content:"header-module--content--1Dc1Y",navWrap:"header-module--navWrap--1N3Xz",nav:"header-module--nav--2NA-_",navItem:"header-module--navItem--zrD25",anchorActive:"header-module--anchorActive--1VNy4",openMenu:"header-module--openMenu--1P0eY",backgroundDiv:"header-module--backgroundDiv--2l_54",hidden:"header-module--hidden--3bcOU"}},kuUC:function(e,t,a){"use strict";a.d(t,"a",(function(){return G}));a("Jmwx");var n=a("BMrR"),r=(a("rO+z"),a("kPKH")),o=(a("SchZ"),a("rSSF"),a("wx14")),i=a("rePB"),l=a("1OyB"),c=a("vuIU"),s=a("Ji7U"),u=a("LK+K"),d=a("U8pU"),f=a("q1tI"),m=a.n(f),h=a("TSYQ"),p=a.n(h),b=a("bT9E"),v=a("t23M"),g=a("H84U"),y=a("KQm4"),O=a("wgJM");function E(){return function(e,t,a){var n=a.value,r=!1;return{configurable:!0,get:function(){if(r||this===e.prototype||this.hasOwnProperty(t))return n;var a=function(e){var t,a=function(a){return function(){t=null,e.apply(void 0,Object(y.a)(a))}},n=function(){if(null==t){for(var e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];t=Object(O.a)(a(n))}};return n.cancel=function(){return O.a.cancel(t)},n}(n.bind(this));return r=!0,Object.defineProperty(this,t,{value:a,configurable:!0,writable:!0}),r=!1,a}}}}var x=a("zT1h");function w(e){return e!==window?e.getBoundingClientRect():{top:0,bottom:window.innerHeight}}function N(e,t,a){if(void 0!==a&&t.top>e.top-a)return a+t.top}function j(e,t,a){if(void 0!==a&&t.bottom<e.bottom+a)return a+(window.innerHeight-t.bottom)}var k=["resize","scroll","touchstart","touchmove","touchend","pageshow","load"],S=[];function C(e,t){if(e){var a=S.find((function(t){return t.target===e}));a?a.affixList.push(t):(a={target:e,affixList:[t],eventHandlers:{}},S.push(a),k.forEach((function(t){a.eventHandlers[t]=Object(x.a)(e,t,(function(){a.affixList.forEach((function(e){e.lazyUpdatePosition()}))}))})))}}function P(e){var t=S.find((function(t){var a=t.affixList.some((function(t){return t===e}));return a&&(t.affixList=t.affixList.filter((function(t){return t!==e}))),a}));t&&0===t.affixList.length&&(S=S.filter((function(e){return e!==t})),k.forEach((function(e){var a=t.eventHandlers[e];a&&a.remove&&a.remove()})))}var z,B=function(e,t,a,n){var r,o=arguments.length,i=o<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,a):n;if("object"===("undefined"==typeof Reflect?"undefined":Object(d.a)(Reflect))&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,a,n);else for(var l=e.length-1;l>=0;l--)(r=e[l])&&(i=(o<3?r(i):o>3?r(t,a,i):r(t,a))||i);return o>3&&i&&Object.defineProperty(t,a,i),i};function I(){return"undefined"!=typeof window?window:null}!function(e){e[e.None=0]="None",e[e.Prepare=1]="Prepare"}(z||(z={}));var T=function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(){var e;return Object(l.a)(this,a),(e=t.apply(this,arguments)).state={status:z.None,lastAffix:!1,prevTarget:null},e.getOffsetTop=function(){var t=e.props.offsetBottom,a=e.props.offsetTop;return void 0===t&&void 0===a&&(a=0),a},e.getOffsetBottom=function(){return e.props.offsetBottom},e.savePlaceholderNode=function(t){e.placeholderNode=t},e.saveFixedNode=function(t){e.fixedNode=t},e.measure=function(){var t=e.state,a=t.status,n=t.lastAffix,r=e.props.onChange,o=e.getTargetFunc();if(a===z.Prepare&&e.fixedNode&&e.placeholderNode&&o){var i=e.getOffsetTop(),l=e.getOffsetBottom(),c=o();if(c){var s={status:z.None},u=w(c),d=w(e.placeholderNode),f=N(d,u,i),m=j(d,u,l);void 0!==f?(s.affixStyle={position:"fixed",top:f,width:d.width,height:d.height},s.placeholderStyle={width:d.width,height:d.height}):void 0!==m&&(s.affixStyle={position:"fixed",bottom:m,width:d.width,height:d.height},s.placeholderStyle={width:d.width,height:d.height}),s.lastAffix=!!s.affixStyle,r&&n!==s.lastAffix&&r(s.lastAffix),e.setState(s)}}},e.prepareMeasure=function(){e.setState({status:z.Prepare,affixStyle:void 0,placeholderStyle:void 0})},e.render=function(){var t=e.context.getPrefixCls,a=e.state,n=a.affixStyle,r=a.placeholderStyle,l=e.props,c=l.prefixCls,s=l.children,u=p()(Object(i.a)({},t("affix",c),!!n)),d=Object(b.a)(e.props,["prefixCls","offsetTop","offsetBottom","target","onChange"]);return f.createElement(v.a,{onResize:function(){e.updatePosition()}},f.createElement("div",Object(o.a)({},d,{ref:e.savePlaceholderNode}),n&&f.createElement("div",{style:r,"aria-hidden":"true"}),f.createElement("div",{className:u,ref:e.saveFixedNode,style:n},f.createElement(v.a,{onResize:function(){e.updatePosition()}},s))))},e}return Object(c.a)(a,[{key:"getTargetFunc",value:function(){var e=this.context.getTargetContainer,t=this.props.target;return void 0!==t?t:e||I}},{key:"componentDidMount",value:function(){var e=this,t=this.getTargetFunc();t&&(this.timeout=setTimeout((function(){C(t(),e),e.updatePosition()})))}},{key:"componentDidUpdate",value:function(e){var t=this.state.prevTarget,a=this.getTargetFunc(),n=null;a&&(n=a()||null),t!==n&&(P(this),n&&(C(n,this),this.updatePosition()),this.setState({prevTarget:n})),e.offsetTop===this.props.offsetTop&&e.offsetBottom===this.props.offsetBottom||this.updatePosition(),this.measure()}},{key:"componentWillUnmount",value:function(){clearTimeout(this.timeout),P(this),this.updatePosition.cancel(),this.lazyUpdatePosition.cancel()}},{key:"updatePosition",value:function(){this.prepareMeasure()}},{key:"lazyUpdatePosition",value:function(){var e=this.getTargetFunc(),t=this.state.affixStyle;if(e&&t){var a=this.getOffsetTop(),n=this.getOffsetBottom(),r=e();if(r&&this.placeholderNode){var o=w(r),i=w(this.placeholderNode),l=N(i,o,a),c=j(i,o,n);if(void 0!==l&&t.top===l||void 0!==c&&t.bottom===c)return}}this.prepareMeasure()}}]),a}(f.Component);T.contextType=g.b,B([E()],T.prototype,"updatePosition",null),B([E()],T.prototype,"lazyUpdatePosition",null);var R=T,L=(a("Y2jk"),a("zeV3")),M=(a("M7k7"),a("Ol7k")),W=a("YwZP"),F=a("lwPf"),D=a("obyI"),H=a.n(D),U=a("G0mt"),A=a.n(U),_=a("rjQw"),K=M.a.Content,Q=H.a.resumeDownloadLink,q=function(){return m.a.createElement("aside",null,m.a.createElement("div",{className:A.a.profileAvatar+" invert"}),m.a.createElement("div",{className:A.a.name+" centerAlign"},m.a.createElement("div",{className:A.a.boxName+" centerAlign"},m.a.createElement("h2",null,m.a.createElement("span",null,"Momin "),m.a.createElement("span",{className:""+A.a.unsetFontWeight}," Bin Shahid "),m.a.createElement("span",null,m.a.createElement("emoji",null,"👨‍💻")))),m.a.createElement("div",{className:A.a.badge+" "+A.a.badgeGray},"Sr. Software Dev Engineer"),m.a.createElement("div",{className:A.a.badge+" "+A.a.badgeGray+" "+A.a.badgeGrayDescText},"@ ",m.a.createElement("a",{href:"https://Securiti.ai",target:"_blank",rel:"noreferrer"},"Securiti.ai")),m.a.createElement("div",{className:"centerAlign box"},m.a.createElement(_.a,{useSidebar:!0})),m.a.createElement("ul",{className:"box "+A.a.badge+" contactBlock"},m.a.createElement("li",{className:""+A.a.contactBlockItem},m.a.createElement(L.b,{size:"middle",className:""+A.a.fixSidebarInfoIcons},m.a.createElement("span",{className:""+A.a.fixSidebarSmiley},m.a.createElement("emoji",null,"📞")),m.a.createElement("a",{href:"tel:+923343526270"},m.a.createElement("span",{className:A.a.fixSideBarRefText+" "+A.a.unsetFontWeight+" "+A.a.phoneHider},"+")))),m.a.createElement("li",{className:""+A.a.contactBlockItem},m.a.createElement(L.b,{size:"middle",className:""+A.a.fixSidebarInfoIcons},m.a.createElement("span",{className:""+A.a.fixSidebarSmiley},m.a.createElement("emoji",null,"🎂")),m.a.createElement("a",{href:"https://en.wikipedia.org/wiki/December_13",target:"_blank",rel:"noreferrer"},m.a.createElement("span",{className:A.a.unsetFontWeight+" "+A.a.fixSideBarRefText},"Dec 13, 1995")))),m.a.createElement("li",{className:""+A.a.contactBlockItem},m.a.createElement(L.b,{size:"middle",className:""+A.a.fixSidebarInfoIcons},m.a.createElement("span",{className:""+A.a.fixSidebarSmiley},m.a.createElement("emoji",null,"📍")),m.a.createElement("a",{href:"https://en.wikipedia.org/wiki/Karachi",target:"_blank",rel:"noreferrer"},m.a.createElement("span",{className:A.a.unsetFontWeight+" "+A.a.fixSideBarRefText},"Karachi, Pakistan")))),m.a.createElement("li",{className:""+A.a.contactBlockItem},m.a.createElement(L.b,{size:"middle",className:""+A.a.fixSidebarInfoIcons},m.a.createElement("span",{className:""+A.a.fixSidebarSmiley},m.a.createElement("emoji",null,"📧")),m.a.createElement("a",{href:"mailto:MominBinShahid@gmail.com",target:"_top"},m.a.createElement("span",{className:A.a.emailHider+" "+A.a.fixSideBarRefText},"@"))))),m.a.createElement("div",{className:A.a.resumeDownload},m.a.createElement("a",{href:Q,download:!0,target:"_blank",rel:"noreferrer"},"Download CV"))))},G=function(e){var t=e.children;return m.a.createElement(M.a,null,m.a.createElement(K,{className:A.a.content+" "+A.a.background+" "},m.a.createElement(n.a,null,m.a.createElement(r.a,{sm:24,md:24,lg:24},m.a.createElement(M.a,{className:A.a.background+" "+A.a.boxContent+" "+A.a.sideBar404Radius},t)))))};t.b=function(e){var t=Object(F.a)()[0],a=e.children,o=W.globalHistory.location.pathname,i=m.a.createElement(q,null);return t>997&&(i=m.a.createElement(R,{offsetTop:0},m.a.createElement(q,null))),t<768&&(i=m.a.createElement(m.a.Fragment,null),"/"===o&&(i=m.a.createElement(q,null))),m.a.createElement(m.a.Fragment,null,m.a.createElement(M.a,null,m.a.createElement(K,{className:A.a.content+" "+A.a.background},m.a.createElement(n.a,null,m.a.createElement(r.a,{sm:24,md:9,lg:6,className:A.a.sidebarContent},i),m.a.createElement(r.a,{sm:24,md:15,lg:18},m.a.createElement(M.a,{className:A.a.background+" "+A.a.boxContent+" borderRadiusSection"},a))))))}},lUaL:function(e,t,a){},lwPf:function(e,t,a){"use strict";a.d(t,"a",(function(){return r}));var n=a("q1tI"),r=function(){var e=Object(n.useState)([0,0]),t=e[0],a=e[1];return Object(n.useLayoutEffect)((function(){function e(){a([window.innerWidth,window.innerHeight])}return window.addEventListener("resize",e),e(),function(){return window.removeEventListener("resize",e)}}),[]),t}},rSSF:function(e,t,a){},rjQw:function(e,t,a){"use strict";a("TfFZ");var n=a("3S7+"),r=a("q1tI"),o=a.n(r),i=a("yNYL"),l=a.n(i),c=a("obyI"),s=a.n(c),u=a("Oh/9"),d=a.n(u),f=s.a.social;t.a=function(e){var t=e.useSidebar,a=e.useSquareIcons,r=void 0!==a&&a,i=e.useToolTip,c=void 0!==i&&i,s=[];Object.keys(f).forEach((function(e){var t=f[e],a=t.link,i=t.icon,u=t.hide,m=t.color,h=t["icon-square"];if(i||h){var p=r?"4rem":"2rem",b=o.a.createElement(l.a,{name:r&&h||i,style:{color:m,fontSize:p}}),v=c?o.a.createElement(n.a,{title:e,color:m},b):b,g=r&&"stack-overflow"===i?d.a.stackOverflowSquareIcon:"";u||s.push(o.a.createElement("span",{key:a,className:""+g},o.a.createElement("a",{href:a,target:"_blank",label:"button",rel:"noopener noreferrer","aria-label":e},v)))}}));var u=o.a.createElement("div",{className:""+d.a.hoverLighter},s),m=o.a.createElement("div",{className:""+d.a.hoverDarker},o.a.createElement("h2",{className:"titleSeparate"},"Elsewhere"),s);return o.a.createElement("div",null,t?u:m)}},t23M:function(e,t,a){"use strict";var n=a("VTBJ"),r=a("1OyB"),o=a("vuIU"),i=a("Ji7U"),l=a("LK+K"),c=a("q1tI"),s=a("m+aA"),u=a("Zm9Q"),d=a("Kwbf"),f=a("c+Xe"),m=a("bdgK"),h=function(e){Object(i.a)(a,e);var t=Object(l.a)(a);function a(){var e;return Object(r.a)(this,a),(e=t.apply(this,arguments)).resizeObserver=null,e.childNode=null,e.currentElement=null,e.state={width:0,height:0,offsetHeight:0,offsetWidth:0},e.onResize=function(t){var a=e.props.onResize,r=t[0].target,o=r.getBoundingClientRect(),i=o.width,l=o.height,c=r.offsetWidth,s=r.offsetHeight,u=Math.floor(i),d=Math.floor(l);if(e.state.width!==u||e.state.height!==d||e.state.offsetWidth!==c||e.state.offsetHeight!==s){var f={width:u,height:d,offsetWidth:c,offsetHeight:s};e.setState(f),a&&Promise.resolve().then((function(){a(Object(n.a)(Object(n.a)({},f),{},{offsetWidth:c,offsetHeight:s}),r)}))}},e.setChildNode=function(t){e.childNode=t},e}return Object(o.a)(a,[{key:"componentDidMount",value:function(){this.onComponentUpdated()}},{key:"componentDidUpdate",value:function(){this.onComponentUpdated()}},{key:"componentWillUnmount",value:function(){this.destroyObserver()}},{key:"onComponentUpdated",value:function(){if(this.props.disabled)this.destroyObserver();else{var e=Object(s.a)(this.childNode||this);e!==this.currentElement&&(this.destroyObserver(),this.currentElement=e),!this.resizeObserver&&e&&(this.resizeObserver=new m.a(this.onResize),this.resizeObserver.observe(e))}}},{key:"destroyObserver",value:function(){this.resizeObserver&&(this.resizeObserver.disconnect(),this.resizeObserver=null)}},{key:"render",value:function(){var e=this.props.children,t=Object(u.a)(e);if(t.length>1)Object(d.a)(!1,"Find more than one child node with `children` in ResizeObserver. Will only observe first one.");else if(0===t.length)return Object(d.a)(!1,"`children` of ResizeObserver is empty. Nothing is in observe."),null;var a=t[0];if(c.isValidElement(a)&&Object(f.c)(a)){var n=a.ref;t[0]=c.cloneElement(a,{ref:Object(f.a)(n,this.setChildNode)})}return 1===t.length?t[0]:t.map((function(e,t){return!c.isValidElement(e)||"key"in e&&null!==e.key?e:c.cloneElement(e,{key:"".concat("rc-observer-key","-").concat(t)})}))}}]),a}(c.Component);h.displayName="ResizeObserver",t.a=h},yNYL:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},r=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),o=l(a("q1tI")),i=l(a("17x9"));function l(e){return e&&e.__esModule?e:{default:e}}var c=function(e){function t(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var e=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e.displayName="FontAwesome",e}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),r(t,[{key:"render",value:function(){var e=this.props,t=e.border,a=e.cssModule,r=e.className,i=e.fixedWidth,l=e.flip,c=e.inverse,s=e.name,u=e.pulse,d=e.rotate,f=e.size,m=e.spin,h=e.stack,p=e.tag,b=void 0===p?"span":p,v=e.ariaLabel,g=function(e,t){var a={};for(var n in e)t.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(e,n)&&(a[n]=e[n]);return a}(e,["border","cssModule","className","fixedWidth","flip","inverse","name","pulse","rotate","size","spin","stack","tag","ariaLabel"]),y=v?{"aria-label":v}:{"aria-hidden":!0},O=[];return a?(O.push(a.fa),O.push(a["fa-"+s]),f&&O.push(a["fa-"+f]),m&&O.push(a["fa-spin"]),u&&O.push(a["fa-pulse"]),t&&O.push(a["fa-border"]),i&&O.push(a["fa-fw"]),c&&O.push(a["fa-inverse"]),l&&O.push(a["fa-flip-"+l]),d&&O.push(a["fa-rotate-"+d]),h&&O.push(a["fa-stack-"+h])):(O.push("fa"),O.push("fa-"+s),f&&O.push("fa-"+f),m&&O.push("fa-spin"),u&&O.push("fa-pulse"),t&&O.push("fa-border"),i&&O.push("fa-fw"),c&&O.push("fa-inverse"),l&&O.push("fa-flip-"+l),d&&O.push("fa-rotate-"+d),h&&O.push("fa-stack-"+h)),r&&O.push(r),o.default.createElement(b,n({},g,y,{className:O.join(" ")}))}}]),t}(o.default.Component);c.propTypes={ariaLabel:i.default.string,border:i.default.bool,className:i.default.string,cssModule:i.default.object,fixedWidth:i.default.bool,flip:i.default.oneOf(["horizontal","vertical"]),inverse:i.default.bool,name:i.default.string.isRequired,pulse:i.default.bool,rotate:i.default.oneOf([90,180,270]),size:i.default.oneOf(["lg","2x","3x","4x","5x"]),spin:i.default.bool,stack:i.default.oneOf(["1x","2x"]),tag:i.default.string},t.default=c,e.exports=t.default}}]);