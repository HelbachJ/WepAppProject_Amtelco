"use strict";(self.webpackChunkreact_complete_guide=self.webpackChunkreact_complete_guide||[]).push([[160],{160:function(e,t,n){n.r(t),n.d(t,{default:function(){return b}});var i=n(791),s=n(271),a=n(995),c=n(853),r=n(508),o=n(32),d=n(890),l=n(523),u={item:"AppointmentItem_item__WjRDy"},p=n(556),m=n(184),h=function(e){var t=(0,i.useState)([]),n=(0,d.Z)(t,2),h=(n[0],n[1]),f=(0,i.useState)(!1),x=(0,d.Z)(f,2),j=(x[0],x[1]),g=(0,s.k6)(),v=(0,s.TH)(),_=Date().toLocaleString();localStorage.setItem("timeStamp",_);var b="https://webapp-appointments-default-rtdb.firebaseio.com/appointments/".concat(e.localId,"/").concat(e.id,".json"),I=(0,a.Z)(c.fK).status,N=(0,a.Z)(c.$U,!0);N.data,N.error;(0,i.useEffect)((function(){"completed"===I&&g.replace("/appointments/".concat(e.localId))}),[I,g,e.localId]);var T=function(){var t=(0,o.Z)((0,r.Z)().mark((function t(n){return(0,r.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n.preventDefault(),g.push({pathname:v.pathname}),t.prev=2,t.next=5,fetch(b,{method:"DELETE"}).then((function(e){return e.json()})).then((function(){h((function(t){return t.filter((function(t){return t.id!==e.id}))})),window.location.reload(!1)}));case 5:t.sent,t.next=11;break;case 8:t.prev=8,t.t0=t.catch(2),console.error("Error deleting Item: ",t.t0);case 11:case"end":return t.stop()}}),t,null,[[2,8]])})));return function(e){return t.apply(this,arguments)}}();return(0,m.jsx)("div",{children:(0,m.jsxs)("form",{className:u.form,onSubmit:T,children:[e.isLoading&&(0,m.jsx)("div",{className:u.loading,children:(0,m.jsx)(p.Z,{})}),(0,m.jsxs)("li",{className:u.item,children:[(0,m.jsxs)("figure",{children:[(0,m.jsxs)("figcaption",{children:["User Id: ",e.localId]}),(0,m.jsxs)("time",{children:[e.timeStamp," ",e.updatedTime," "]}),(0,m.jsxs)("blockquote",{children:[(0,m.jsx)("p",{children:e.date}),(0,m.jsx)("p",{children:e.startTime+" - "+e.endTime})]}),(0,m.jsx)("figcaption",{children:e.name}),(0,m.jsx)("figcaption",{children:e.description})]}),(0,m.jsx)("button",{children:(0,m.jsx)(l.rU,{className:"btn",to:"/appointment/".concat(e.localId,"/").concat(e.id),children:"edit"})}),(0,m.jsx)("button",{className:"btn",onClick:function(){j(!0)},children:"delete"})]})]})})},f="AppointmentList_list__Boyws",x="AppointmentList_sorting__-At9z",j=function(e){var t,n,a=(0,s.k6)(),c=(0,s.TH)(),r="asc"===new URLSearchParams(c.search).get("sort"),o=(t=e.appointments,n=r,t.sort((function(e,t){return n?e.id>t.id?1:-1:e.id<t.id?1:-1})));return(0,m.jsxs)(i.Fragment,{children:[(0,m.jsx)("div",{className:x,children:(0,m.jsxs)("button",{onClick:function(){a.push({pathname:c.pathname,search:"?sort=".concat(r?"desc":"asc")})},children:["Sort ",r?"Descending":"Ascending"]})}),(0,m.jsx)("ul",{className:f,children:o.map((function(e){return(0,m.jsx)(h,{localId:e.localId,id:e.id,name:e.name,date:e.date,startTime:e.startTime,endTime:e.endTime,description:e.description,timeStamp:e.timeStamp,updatedTime:e.updatedTime},e.id)}))})]})},g="NoAppointmentsFound_noquotes__xP4i0",v=n(654),_=function(e){var t=(0,i.useContext)(v.Z);return(0,m.jsxs)("div",{className:g,children:[(0,m.jsx)("p",{children:"No Appointments found!"}),(0,m.jsx)(l.rU,{className:"btn",to:"/newAppointment/".concat(t.localId),children:"Add an Appointment"})]})};var b=function(e){var t=(0,i.useContext)(v.Z),n=(0,s.UO)().userId,r=(0,a.Z)(c.$U,!0),o=r.sendRequest,d=r.status,l=r.data,u=r.error;return(0,i.useEffect)((function(){o(n)}),[o,n]),"pending"===d?(0,m.jsx)("div",{className:"centered",children:(0,m.jsx)(p.Z,{})}):u?(0,m.jsx)("p",{className:"centered focused",children:u}):"completed"!==d||l&&0!==l.length?(0,m.jsx)(j,{appointments:l,uid:t.localId}):(0,m.jsx)(_,{})}}}]);
//# sourceMappingURL=160.7649a6f6.chunk.js.map