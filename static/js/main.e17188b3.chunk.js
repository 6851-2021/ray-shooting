(this["webpackJsonpray-shooting"]=this["webpackJsonpray-shooting"]||[]).push([[0],{14:function(t,e,n){},15:function(t,e,n){},17:function(t,e,n){"use strict";n.r(e);var r=n(1),i=n.n(r),l=n(8),s=n.n(l),h=(n(14),n(7)),o=n(3),u={NONE:0,CREATING_LINE_SEGMENT:1,SHOOTING_RAY:2},c=(n(15),n(9)),a=n(6);function f(t){return null===t?0:t.height}function g(t){return null===t?0:f(t.right)-f(t.left)}var d=function t(e,n,r,i){Object(a.a)(this,t),this.startX=e,this.startY=n,this.endX=r,this.endY=i};function p(t){this.element=t,this.height=1,this.left=null,this.right=null,this.id=Math.random()}function m(t){t.height=Math.max(f(t.left),f(t.right))+1}function v(t){var e=new p(t.element);return e.left=t.left,e.right=t.right,e.height=t.height,e.og=t,e}function _(t){if(null===t)return null;var e=v(t);return e.left=_(t.left),e.right=_(t.right),e}var b=function(){function t(e){Object(a.a)(this,t),this._compare="function"===typeof e?e:this.sortLeftToRight,this.current=null,this.versions=[],this.currVersionNum=0}return Object(c.a)(t,[{key:"sortLeftToRight",value:function(t,e){var n;if(void 0===t.endX&&void 0===t.endY)n=t.startX;else{if(this.currVersionNum<t.startX||this.currVersionNum>t.endX||this.currVersionNum<e.startX||this.currVersionNum>e.endX)throw console.log("OUT OF RANGE FUCK",this.currVersionNum,t,e),"Point not in range of line!";n=this.currVersionNum}var r=void 0===t.endX&&void 0===t.endY?t.startY:t.startY+(t.endY-t.startY)/(t.endX-t.startX)*(n-t.startX),i=e.startY+(e.endY-e.startY)/(e.endX-e.startX)*(n-e.startX);return r<i?-1:r>i?1:0}},{key:"step",value:function(){this.versions.push(this.current),this.currVersionNum+=1}},{key:"getVersion",value:function(t){return t<this.versions.length?this.versions[t]:null}},{key:"getSuccessor",value:function(t,e){var n=this._search(t,e),r=n.node,i=n.path;if(null===r)return null;if(r.right)return this.getMin(r.right);for(var l=i.length-2;l>=0;l--)if(i[l].left===i[l+1])return i[l];return null}},{key:"shootVerticalRay",value:function(t,e){e=new d(t,e),console.log("element:",e);var n=this.getVersion(t);if(null===n)return null;var r=this._insert(e,n),i=this.getSuccessor(e,r);return null===i||i}}]),t}();b.prototype.search=function(t){var e=this._search(t,this.current).node;return e?e.element:null},b.prototype._search=function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];if(null===e)return{node:e,path:n};n.push(e);var r=this._compare(t,e.element);return r<0?this._search(t,e.left,n):r>0?this._search(t,e.right,n):{node:e,path:n}},b.prototype.insert=function(t){console.log("inserting ",t),console.log("before",this.current),this.current=this._insert(t,this.current),console.log("after",this.current)},b.prototype._insert=function(t,e){if(null===e)return new p(t);e=v(e);var n=this._compare(t,e.element);console.log("comapare",t,e.element,n),n<0?e.left=this._insert(t,e.left):n>0&&(e.right=this._insert(t,e.right)),e.height=Math.max(f(e.left),f(e.right))+1;var r=g(e);if(r<-1){var i=this._compare(t,e.left.element);if(i<0)return _(this._rightRotate(e));if(i>0)return e.left=this._leftRotate(e.left),_(this._rightRotate(e))}else if(r>1){var l=this._compare(t,e.right.element);if(l>0)return _(this._leftRotate(e));if(l<0)return e.right=this._rightRotate(e.right),_(this._leftRotate(e))}return e},b.prototype._rightRotate=function(t){console.log("RIGHT ROTATE");var e=t.left,n=e.right;return e.right=t,t.left=n,t.height=Math.max(f(t.left),f(t.right))+1,e.height=Math.max(f(e.left),f(e.right))+1,e},b.prototype._leftRotate=function(t){console.log("LEFT ROTATE");var e=t.right,n=e.left;return e.left=t,t.right=n,t.height=Math.max(f(t.left),f(t.right))+1,e.height=Math.max(f(e.left),f(e.right))+1,e},b.prototype.delete=function(t){console.log("deleting ",t,this.current),null!==this.current&&(this.current=this._delete(t,this.current,null))},b.prototype._delete=function(t,e,n){if(console.log("DELETE: ",t,e,n),null===e)return null;var r=e;e=v(e),console.log("copyNode: ",e);var i=this._compare(t,e.element);if(i<0)0===this._compare(t,e.left.element)?this._delete(t,e.left,e):e.left=this._delete(t,e.left,e);else if(i>0)this._compare(t,e.right.element),this._delete(t,e.right,e);else if(null!==e.left&&null!==e.right){var l=this._deleteMax(e.left,e);e.element=l.element}else if(null===e.left)if(null===e.right){if(null===n)return null;n.right===r?n.right=null:n.left=null}else{if(null===n)return e.right;n.right===r?n.right=e.right:n.left=e.right,e.right=null}else{if(null===n)return e.left;n.right===r?n.right=e.left:n.left=e.left,e.left=null}return console.log("_balance",e,n),this._balance(e,n)},b.prototype.deleteMax=function(){return this._deleteMax(this.current,null).element},b.prototype._deleteMax=function(t,e){var n;return null===t.right?(n=this._delete(t.element,t,e),this._balance(t,e),n):(n=this._deleteMax(t.right,t),this._balance(t,e),n)},b.prototype.getMin=function(t){return null===t.left?t:this.getMin(t.left)},b.prototype.getMax=function(t){return null===t.right?t:this.getMax(t.right)},b.prototype._balance=function(t,e){m(t);var n,r,i,l,s=g(t);return s<-1?(l=t=_(t),i=t.left,r=this._getTallestSubtree(i),n=this._triNodeRestructure(r,i,l,e),m(l),m(r),m(i),m(l),m(r),m(i),n):s>1?(l=t=_(t),i=t.right,r=this._getTallestSubtree(i),n=this._triNodeRestructure(r,i,l,e),m(l),m(r),m(i),m(l),m(r),m(i),n):(m(t),t)},b.prototype._getTallestSubtree=function(t){return g(t)<0?t.left:t.right},b.prototype._triNodeRestructure=function(t,e,n,r){var i,l,s;return n.right===e&&e.left===t&&(i=n,l=t,s=e),n.right===e&&e.right===t&&(i=n,l=e,s=t),n.left===e&&e.left===t&&(i=t,l=e,s=n),n.left===e&&e.right===t&&(i=e,l=t,s=n),n.og===this.current||n===this.current||n.element===this.current.element?this.current=l:r.left===n?r.left=l:r.right=l,l.left!==t&&l.left!==e&&l.left!==n&&(i.right=l.left),l.right!==t&&l.right!==e&&l.right!==n&&(s.left=l.right),l.left=i,l.right=s,l},b.prototype.forEach=function(t){this._forEach(this.current,t)},b.prototype._forEach=function(t,e){null!==t&&(this._forEach(t.left,e),e(t.element),this._forEach(t.right,e))},b.prototype.getElementsAtDepth=function(t){var e=[];return this._getElementsAtDepth(t,0,this.current,e),e},b.prototype._getElementsAtDepth=function(t,e,n,r){null!==n&&(t!==e?(this._getElementsAtDepth(t,e+1,n.left,r),this._getElementsAtDepth(t,e+1,n.right,r)):r.push(n.element))};var y=n.p+"static/media/plus.18e46bbf.svg",x=n.p+"static/media/ray.86b55e34.svg",N=n(0),E=function(){var t=Object(r.useState)(u.CREATING_LINE_SEGMENT),e=Object(o.a)(t,2),n=e[0],i=e[1],l=Object(r.useState)(null),s=Object(o.a)(l,2),c=s[0],a=s[1],f=Object(r.useState)([]),g=Object(o.a)(f,2),p=g[0],m=g[1],v=Object(r.useState)(new b),_=Object(o.a)(v,2),E=_[0],O=_[1],j=Object(r.useRef)(null),w=Object(r.useCallback)((function(){if(0!==p.length){var t=new b,e=Object(h.a)(p);e.sort((function(t,e){return t.x1<e.x1?-1:t.x1>e.x1?1:0}));var n=Object(h.a)(p);n.sort((function(t,e){return t.x2<e.x2?-1:t.x2>e.x2?1:0}));for(var r=0,i=0,l=0;l<window.innerWidth;l+=1){if(r<p.length&&e[r].x1<=l){var s=e[r],o=s.x1,u=s.y1,c=s.x2,a=s.y2;t.insert(new d(o,window.innerHeight-u,c,window.innerHeight-a)),r++}if(i<p.length&&n[i].x2<=l){var f=n[i],g=f.x1,m=f.y1,v=f.x2,_=f.y2;t.delete(new d(g,window.innerHeight-m,v,window.innerHeight-_)),i++}t.step()}return t}}),[p]),R=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=document.createElementNS("http://www.w3.org/2000/svg","line");return n.setAttribute("x1",t.x1),n.setAttribute("y1",t.y1),n.setAttribute("x2",t.x2),n.setAttribute("y2",t.y2),null!==e&&n.setAttribute("id",e),n},T=function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:4,r=document.createElementNS("http://www.w3.org/2000/svg","circle");return r.setAttribute("cx",t),r.setAttribute("cy",e),r.setAttribute("r",n),r};return Object(N.jsxs)("div",{className:"App",onClick:function(t){if("svg"===t.target.tagName.toLowerCase())if(n===u.CREATING_LINE_SEGMENT)if(null===c)a({x:t.clientX,y:t.clientY}),j.current.appendChild(T(t.clientX,t.clientY));else{a(null);var e=t.clientX<c.x,r={x1:e?t.clientX:c.x,y1:e?t.clientY:c.y,x2:e?c.x:t.clientX,y2:e?c.y:t.clientY};m(p.concat(r)),j.current.appendChild(R(r)),j.current.appendChild(T(t.clientX,t.clientY))}else n===u.SHOOTING_RAY&&console.log("btuhh")},children:[Object(N.jsx)("div",{className:"vertical-lines"}),Object(N.jsx)("div",{className:"horizontal-lines"}),Object(N.jsxs)("div",{className:"button-bar",children:[Object(N.jsxs)("button",{className:n===u.CREATING_LINE_SEGMENT?"selected":"",onClick:function(){return i(u.CREATING_LINE_SEGMENT)},children:[Object(N.jsx)("img",{src:y,alt:"Create line segment"}),Object(N.jsx)("p",{children:"Create line segment"})]}),Object(N.jsxs)("button",{className:n===u.SHOOTING_RAY?"selected":"",onClick:function(){0!==p.length&&(O(w()),i(u.SHOOTING_RAY))},children:[Object(N.jsx)("img",{src:x,alt:"Shoot vertical ray"}),Object(N.jsx)("p",{children:"Shoot vertical ray"})]})]}),Object(N.jsx)("svg",{ref:j,width:window.innerWidth,height:window.innerHeight,onMouseMove:function(t){if(n===u.SHOOTING_RAY){null!==document.getElementById("ray")&&document.getElementById("ray").remove();var e=E.shootVerticalRay(t.clientX,window.innerHeight-t.clientY);if(null!==e&&void 0!==e.element){var r=e.element,i=r.startX,l=r.startY,s=r.endX,h=l+(r.endY-l)/(s-i)*(t.clientX-i);j.current.appendChild(R({x1:t.clientX,y1:t.clientY,x2:t.clientX,y2:window.innerHeight-h},"ray"))}}}})]})},O=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,18)).then((function(e){var n=e.getCLS,r=e.getFID,i=e.getFCP,l=e.getLCP,s=e.getTTFB;n(t),r(t),i(t),l(t),s(t)}))};s.a.render(Object(N.jsx)(i.a.StrictMode,{children:Object(N.jsx)(E,{})}),document.getElementById("root")),O()}},[[17,1,2]]]);
//# sourceMappingURL=main.e17188b3.chunk.js.map