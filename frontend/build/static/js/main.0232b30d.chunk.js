(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{167:function(e,t,n){e.exports=n(278)},172:function(e,t,n){},174:function(e,t,n){},278:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(24),l=n.n(i),c=(n(172),n(11)),o=n(73),u=(n(174),n(3)),s=Object(a.createContext)({restaurantName:"",token:null,loggedIn:!1}),m=n(18),d=function(e){var t=e.currentTypes,n=e.setTypes,a=e.foodTypes;return r.a.createElement("div",{style:{flexDirection:"row",padding:8}},a.map(function(e){return r.a.createElement(u.f,{key:e,onClick:function(){t.includes(e)?(t.splice(t.indexOf(e),1),n(Object(m.a)(t))):n([].concat(Object(m.a)(t),[e]))},label:e,variant:t.includes(e)?"default":"outlined",padding:4})}))},p=["Burger","Kebab","Pizza"],g=function(e){var t=e.name,n=e.latLng,a=e.types;return fetch("/restaurant/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:t,location:n,foodTypes:a})}).then(function(e){return e.json()})};var f={container:{flex:1,alignItems:"center",justifyContent:"center",height:!1,paddingTop:"200px",alignSelf:"center"},card:{flexDirection:"column",width:"400px"},content:{flexDirection:"column"}},v=function(){var e=Object(a.useState)(""),t=Object(c.a)(e,2),n=t[0],i=t[1],l=Object(a.useState)({lat:"",lng:""}),o=Object(c.a)(l,2),m=o[0],v=o[1],E=Object(a.useState)([]),y=Object(c.a)(E,2),b=y[0],h=y[1],O=m.lat,j=m.lng,x=Object(a.useContext)(s),C=Object(c.a)(x,2),w=(C[0],C[1]);return r.a.createElement("div",{style:f.container},r.a.createElement(u.b,{style:f.card},r.a.createElement(u.d,{title:"Unlabeled for restaurants"}),r.a.createElement(u.c,{style:f.content},r.a.createElement(u.g,{placeholder:"restaurant name",value:n,onChange:function(e){return i(e.target.value)}}),r.a.createElement("div",{style:{flexDirection:"row"}},r.a.createElement(u.g,{placeholder:"lattitude",value:O,onChange:function(e){return v({lat:e.target.value,lng:j})}}),r.a.createElement(u.g,{placeholder:"longitude",value:j,onChange:function(e){return v({lat:O,lng:e.target.value})}})),r.a.createElement(d,{currentTypes:b,foodTypes:p,setTypes:h}),r.a.createElement(u.a,{onClick:function(){""===n||""===O||""===j?alert("Please enter all the fields."):g({name:n,latLng:m,types:b}).then(function(e){if(e.error)return alert(e.error),null;w({restaurant:n,token:e.token,loggedIn:!0})})}},"Register"))))},E=n(44),y=function(){return r.a.createElement("img",{src:"https://i.imgur.com/xN4UYUs.gif"})},b=n(72),h=function(e){var t=e.name,n=e.picture,a=(e.deliverTime,e.onAccept),i=e.onDecline,l=e.toppings;return r.a.createElement(u.b,{style:{flexDirection:"column"}},r.a.createElement(u.e,{component:"img",alt:"Contemplative Reptile",height:"140px",image:n,title:"Contemplative Reptile"}),r.a.createElement(u.c,{style:{flexDirection:"column",flex:1,alignItems:"left"}},r.a.createElement("div",{style:{fontSize:23,paddingBottom:8}},t),r.a.createElement(j,{toppings:l}),r.a.createElement("div",{style:{flexDirection:"row",flex:1,justifyContent:"space-between",width:"100%"}},r.a.createElement(u.a,{style:{flex:1},onClick:a},"Accept"),r.a.createElement(u.a,{style:{flex:1},onClick:i},"Decline"))))},O=b.a.div({visible:{opacity:1},hidden:{opacity:0}}),j=function(e){var t=e.toppings;return t.length>0?r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{style:{fontSize:16}},"Ingredients"),r.a.createElement("ul",null,t.map(function(e){return r.a.createElement("li",null," ",e," ")}))):null},x=function(e){var t=e.name,n=e.picture,a=(e.deliverTime,e.onDelivered),i=e.toppings;return r.a.createElement(u.b,{style:{flexDirection:"column"}},r.a.createElement(u.e,{component:"img",alt:"Contemplative Reptile",height:"140px",image:n,title:"Contemplative Reptile"}),r.a.createElement(u.c,{style:{flexDirection:"column",alignItems:"left",paddingBottom:"0px !important"}},r.a.createElement("div",{style:{fontSize:23,paddingBottom:8}},t),r.a.createElement(j,{toppings:i}),r.a.createElement(u.a,{onClick:a},"Delivered")))},C=function(e){var t=e.name,n=e.picture,a=(e.deliverTime,e.onShipped),i=e.toppings;return r.a.createElement(u.b,{style:{flexDirection:"column"}},r.a.createElement(u.e,{component:"img",alt:"Contemplative Reptile",height:"140px",image:n,title:"Contemplative Reptile"}),r.a.createElement(u.c,{style:{flexDirection:"column",alignItems:"left",paddingBottom:"0px !important"}},r.a.createElement("div",{style:{fontSize:23,paddingBottom:8}},t),r.a.createElement(j,{toppings:i}),r.a.createElement(u.a,{onClick:a},"Shipped")))};function w(e){var t=Object(a.useState)(!1),n=Object(c.a)(t,2),i=n[0],l=n[1];return Object(a.useEffect)(function(){return l(!0),function(){l(!1)}},[]),r.a.createElement(O,{pose:i?"visible":"hidden"},r.a.createElement(C,e))}var k=new WebSocket("ws://twinone.xyz:17001/ws"),S=function(e){return e.charAt(0).toUpperCase()+e.slice(1)};var D={grid:{display:"grid",gridTemplateColumns:"200px 200px 200px",gridColumnGap:"18px",gridRowGap:"18px"},gridContainer:{flex:1,flexDirection:"column",justifyContent:"center",alignItems:"center"}},I=function(){var e=Object(a.useContext)(s),t=Object(c.a)(e,2),n=t[0].restaurantName,i=t[1],l=Object(a.useState)([]),o=Object(c.a)(l,2),d=o[0],p=o[1];Object(a.useEffect)(function(){k.addEventListener("message",function(e){var t=JSON.parse(e.data);void 0!==t.foodType&&(console.log(t),function(e){p([e].concat(Object(m.a)(d)))}({picture:"https://upload.wikimedia.org/wikipedia/commons/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg",name:S(t.foodType)+" order",price:t.price,latLng:[t.lat,t.lng],toppings:t.toppings,status:"incoming"}))})},[]);var g=function(e){return function(){var t=d.filter(function(t){return t.id!==e.id});p([Object(E.a)({},e,{status:"accepted"})].concat(Object(m.a)(t))),k.send(JSON.stringify({status:"accepted"}))}},f=function(e){return function(){var t=d.filter(function(t){return t.id!==e.id});p(t),k.send(JSON.stringify({status:"delivered"}))}};return r.a.createElement("div",{style:{flex:1,alignItems:"center",justifyContent:"center",alignSelf:"center",flexDirection:"column"}},r.a.createElement("div",null,r.a.createElement("h1",{style:{fontWeight:"200"}},n)),0===d.length?r.a.createElement(y,null):r.a.createElement("div",{style:D.gridContainer},r.a.createElement("h4",null,"Orders"),r.a.createElement("div",{style:D.grid},d.map(function(e){return"accepted"===e.status?r.a.createElement(w,Object.assign({},e,{onShipped:(t=e,function(){var e=d.filter(function(e){return e.id!==t.id});p([Object(E.a)({},t,{status:"delivered"})].concat(Object(m.a)(e))),k.send(JSON.stringify({status:"shipped"}))})})):"delivered"===e.status?r.a.createElement(x,Object.assign({},e,{onDelivered:f(e)})):"done"===e.status?null:r.a.createElement(h,Object.assign({},e,{onAccept:g(e),onDecline:(n=e.id,function(){var e=d.filter(function(e){return e.id!==n});p(e),k.send(JSON.stringify({status:"rejected"}))})}));var t,n}))),r.a.createElement(u.a,{onClick:function(){i({token:null,loggedIn:!1,restaurant:""})}},"LOG OUT"))};var T=function(){var e=Object(a.useState)({token:void 0,restaurantName:null,loggedIn:!1}),t=Object(c.a)(e,2),n=t[0],i=t[1],l=Object(o.a)(["token","restaurant","loggedIn"]),u=Object(c.a)(l,2),m=u[0],d=u[1],p=function(e){var t=e.token,n=e.restaurant,a=e.loggedIn;i({token:t,restaurantName:n,loggedIn:a}),d("token",t),d("restaurant",n),d("loggedIn",a)};return Object(a.useEffect)(function(){p(m)},[]),r.a.createElement(s.Provider,{value:[n,p]},n.loggedIn?r.a.createElement(I,null):r.a.createElement(v,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(T,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[167,1,2]]]);
//# sourceMappingURL=main.0232b30d.chunk.js.map