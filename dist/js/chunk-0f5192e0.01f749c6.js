(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0f5192e0","chunk-2d21f315"],{1276:function(e,t,r){"use strict";var n=r("d784"),a=r("44e7"),i=r("825a"),s=r("1d80"),c=r("4840"),l=r("8aa5"),u=r("50c4"),o=r("14c3"),d=r("9263"),b=r("9f7f"),p=r("d039"),f=b.UNSUPPORTED_Y,v=[].push,j=Math.min,O=4294967295,h=!p((function(){var e=/(?:)/,t=e.exec;e.exec=function(){return t.apply(this,arguments)};var r="ab".split(e);return 2!==r.length||"a"!==r[0]||"b"!==r[1]}));n("split",(function(e,t,r){var n;return n="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(e,r){var n=String(s(this)),i=void 0===r?O:r>>>0;if(0===i)return[];if(void 0===e)return[n];if(!a(e))return t.call(n,e,i);var c,l,u,o=[],b=(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.unicode?"u":"")+(e.sticky?"y":""),p=0,f=new RegExp(e.source,b+"g");while(c=d.call(f,n)){if(l=f.lastIndex,l>p&&(o.push(n.slice(p,c.index)),c.length>1&&c.index<n.length&&v.apply(o,c.slice(1)),u=c[0].length,p=l,o.length>=i))break;f.lastIndex===c.index&&f.lastIndex++}return p===n.length?!u&&f.test("")||o.push(""):o.push(n.slice(p)),o.length>i?o.slice(0,i):o}:"0".split(void 0,0).length?function(e,r){return void 0===e&&0===r?[]:t.call(this,e,r)}:t,[function(t,r){var a=s(this),i=void 0==t?void 0:t[e];return void 0!==i?i.call(t,a,r):n.call(String(a),t,r)},function(e,a){var s=r(n,this,e,a,n!==t);if(s.done)return s.value;var d=i(this),b=String(e),p=c(d,RegExp),v=d.unicode,h=(d.ignoreCase?"i":"")+(d.multiline?"m":"")+(d.unicode?"u":"")+(f?"g":"y"),m=new p(f?"^(?:"+d.source+")":d,h),g=void 0===a?O:a>>>0;if(0===g)return[];if(0===b.length)return null===o(m,b)?[b]:[];var w=0,y=0,x=[];while(y<b.length){m.lastIndex=f?0:y;var U,k=o(m,f?b.slice(y):b);if(null===k||(U=j(u(m.lastIndex+(f?y:0)),b.length))===w)y=l(b,y,v);else{if(x.push(b.slice(w,y)),x.length===g)return x;for(var R=1;R<=k.length-1;R++)if(x.push(k[R]),x.length===g)return x;y=w=U}}return x.push(b.slice(w)),x}]}),!h,f)},"3feb":function(e,t,r){"use strict";r.r(t);var n=r("7a23"),a={key:0,class:"container-fluid"},i={class:"d-sm-flex align-items-center justify-content-between mb-4"},s=Object(n["i"])("h1",{class:"h3 mb-0 text-gray-800"},"Panel de Administración",-1),c=Object(n["h"])("Regresar"),l={class:"row"},u={class:"col-lg-6 m-auto"},o={autocomplete:"off"},d={class:"form-group"},b=Object(n["i"])("label",null,"Rol",-1),p={class:"form-group"},f=Object(n["i"])("label",{for:"usuario"},"Usuario",-1),v={class:"form-group"},j=Object(n["i"])("label",{for:"correo"},"Correo",-1),O={class:"form-group"},h=Object(n["i"])("label",{for:"clave"},"Contraseña",-1),m={class:"form-group"},g=Object(n["i"])("label",{for:"verificarClave"},"Contraseña",-1);function w(e,t,r,w,y,x){var U=Object(n["D"])("router-link"),k=Object(n["D"])("NoAccess");return w.user.rol.grado<=1?(Object(n["u"])(),Object(n["e"])("div",a,[Object(n["i"])("div",i,[s,Object(n["i"])(U,{to:"/manager/usuarios",class:"btn btn-primary mt-2"},{default:Object(n["Q"])((function(){return[c]})),_:1})]),Object(n["i"])("div",l,[Object(n["i"])("div",u,[Object(n["i"])("form",o,[Object(n["i"])("div",d,[b,Object(n["R"])(Object(n["i"])("select",{class:[{"is-invalid":""===w.newUser.rol},"form-control"],"onUpdate:modelValue":t[1]||(t[1]=function(e){return w.newUser.rol=e}),name:"rol",id:"rol"},[(Object(n["u"])(!0),Object(n["e"])(n["a"],null,Object(n["B"])(w.roles,(function(e,t){return Object(n["u"])(),Object(n["e"])("option",{key:t,value:e._id},Object(n["H"])(e.nombre),9,["value"])})),128))],2),[[n["L"],w.newUser.rol]])]),Object(n["i"])("div",p,[f,Object(n["R"])(Object(n["i"])("input",{type:"text",class:["form-control",{"is-invalid":""===w.newUser.username}],placeholder:"Ingrese Usuario",name:"usuario","onUpdate:modelValue":t[2]||(t[2]=function(e){return w.newUser.username=e})},null,2),[[n["M"],w.newUser.username]])]),Object(n["i"])("div",v,[j,Object(n["R"])(Object(n["i"])("input",{type:"email",class:[{"is-invalid":""===w.newUser.email},"form-control"],placeholder:"Ingrese Correo Electrónico",id:"correo","onUpdate:modelValue":t[3]||(t[3]=function(e){return w.newUser.email=e})},null,2),[[n["M"],w.newUser.email]])]),Object(n["i"])("div",O,[h,Object(n["R"])(Object(n["i"])("input",{class:[{"is-invalid":""===w.newUser.password},"form-control"],type:"password",id:"clave",placeholder:"Ingrese Contraseña","onUpdate:modelValue":t[4]||(t[4]=function(e){return w.newUser.password=e})},null,2),[[n["M"],w.newUser.password]])]),Object(n["i"])("div",m,[g,Object(n["R"])(Object(n["i"])("input",{class:[{"is-invalid":w.newUser.password!=w.newUser.verifyPassword},"form-control"],type:"password",id:"verificarClave",placeholder:"Ingrese Contraseña","onUpdate:modelValue":t[5]||(t[5]=function(e){return w.newUser.verifyPassword=e})},null,2),[[n["M"],w.newUser.verifyPassword]])]),Object(n["i"])("button",{onClick:t[6]||(t[6]=Object(n["T"])((function(e){return w.save()}),["prevent"])),type:"submit",value:"Guardar Usuario",class:"btn btn-primary"}," Guardar Usuario ")])])])])):(Object(n["u"])(),Object(n["e"])(k,{key:1}))}var y=r("1da1"),x=(r("96cf"),r("ac1f"),r("1276"),r("4de4"),r("99af"),r("5c40")),U=r("a1e9"),k=r("5502"),R=r("6c02"),C=r("bc3a"),I=r.n(C),E=r("d97a"),P=r("98a0"),_={props:["param"],components:{NoAccess:E["default"]},setup:function(){var e=Object(k["b"])(),t=Object(x["d"])((function(){return e.state.toask})),r=Object(U["k"])({username:null,email:null,password:null,rol:null}),n=Object(R["c"])(),a="";function i(){try{var t=window.location.href.split("?");if(2===t.length){var i=Object(x["d"])((function(){return e.state.usuarios})),s=i.value;if(0===s.length)return void n.push("/manager/usuarios/add");a=t[1];var c=s.filter((function(e){return e._id===a&&e}));c?(c[0].password=null,r.value=c[0],a=t[1]):r.value={}}}catch(l){}}i();var s=Object(x["d"])((function(){return e.state.api})),c=Object(x["d"])((function(){return e.state.token}));function l(){return u.apply(this,arguments)}function u(){return u=Object(y["a"])(regeneratorRuntime.mark((function e(){var i,l,u;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(e.prev=0,i=r.value,i.username){e.next=4;break}return e.abrupt("return",i.username="");case 4:if(i.email){e.next=6;break}return e.abrupt("return",i.email="");case 6:if(i.password){e.next=8;break}return e.abrupt("return",i.password="");case 8:if(i.password==i.verifyPassword){e.next=10;break}return e.abrupt("return",i.password="");case 10:if(i.rol){e.next=12;break}return e.abrupt("return",i.rol="");case 12:return e.next=14,I.a.post("".concat(s.value,"/usuarios/").concat(a),i,{headers:{xtoken:c.value}});case 14:l=e.sent,u=l.data,u.status?(Object(P["a"])(u.value,t.value.success),n.push("/manager/usuarios"),r.value={}):Object(P["a"])(u.value,t.value.danger),e.next=22;break;case 19:e.prev=19,e.t0=e["catch"](0),Object(P["a"])("no hay conexion con el servidor");case 22:case"end":return e.stop()}}),e,null,[[0,19]])}))),u.apply(this,arguments)}var o=Object(U["k"])([]);function d(){return b.apply(this,arguments)}function b(){return b=Object(y["a"])(regeneratorRuntime.mark((function e(){var t,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,I.a.get("".concat(s.value,"/usuarios/roles"));case 3:t=e.sent,r=t.data,o.value=r,e.next=11;break;case 8:e.prev=8,e.t0=e["catch"](0),Object(P["a"])("no hay acceso al servidor");case 11:case"end":return e.stop()}}),e,null,[[0,8]])}))),b.apply(this,arguments)}d();var p=Object(x["d"])((function(){return e.state.usuario}));return{newUser:r,save:l,roles:o,user:p}}};_.render=w;t["default"]=_},"44e7":function(e,t,r){var n=r("861d"),a=r("c6b6"),i=r("b622"),s=i("match");e.exports=function(e){var t;return n(e)&&(void 0!==(t=e[s])?!!t:"RegExp"==a(e))}},"8aa5":function(e,t,r){"use strict";var n=r("6547").charAt;e.exports=function(e,t,r){return t+(r?n(e,t).length:1)}},d97a:function(e,t,r){"use strict";r.r(t);var n=r("7a23"),a={style:{height:"70vh"},id:"layoutError"},i={id:"layoutError_content"},s={class:"container"},c={class:"row mt-5 justify-content-center"},l={class:"col-lg-6"},u={class:"text-center mt-4"},o=Object(n["i"])("h1",{class:"display-1"},"403",-1),d=Object(n["i"])("p",{class:"lead"},"sin autorizacion",-1),b=Object(n["i"])("p",null,"su acceso a esta area no esta permitido.",-1),p=Object(n["i"])("i",{class:"fas fa-arrow-left me-1"},null,-1),f=Object(n["h"])(" regresar al inicio ");function v(e,t,r,v,j,O){var h=Object(n["D"])("router-link");return Object(n["u"])(),Object(n["e"])(n["a"],null,[Object(n["i"])("div",a,[Object(n["i"])("div",i,[Object(n["i"])("main",null,[Object(n["i"])("div",s,[Object(n["i"])("div",c,[Object(n["i"])("div",l,[Object(n["i"])("div",u,[o,d,b,Object(n["i"])(h,{to:"/"},{default:Object(n["Q"])((function(){return[p,f]})),_:1})])])])])])])]),Object(n["i"])("button",{onClick:t[1]||(t[1]=function(){return v.alert&&v.alert.apply(v,arguments)})})],64)}var j={setup:function(){function e(){for(var e=4e4,t=0;t<e;t++)console.log("hola")}return{alert:e}}};j.render=v;t["default"]=j}}]);
//# sourceMappingURL=chunk-0f5192e0.01f749c6.js.map