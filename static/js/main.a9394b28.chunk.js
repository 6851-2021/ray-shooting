(this["webpackJsonpray-shooting"]=this["webpackJsonpray-shooting"]||[]).push([[0],{15:function(t,e,n){},16:function(t,e,n){},18:function(t,e,n){"use strict";n.r(e);var r=n(1),i=n.n(r),l=n(8),h=n.n(l),s=(n(15),n(7)),c=n(6),u=n(2),o={NONE:0,CREATING_LINE_SEGMENT:1,SHOOTING_RAY:2},a=(n(16),n(9)),f=n(10);function g(t){return null===t?0:t.height}function p(t){return null===t?0:g(t.right)-g(t.left)}function _(t){this.element=t,this.height=1,this.left=null,this.right=null,this.id=Math.random()}function x(t,e){return t<e?-1:t>e?1:0}function d(t){t.height=Math.max(g(t.left),g(t.right))+1}function m(t){var e=new _(t.element);return e.left=t.left,e.right=t.right,e.height=t.height,e.og=t,e}function y(t){if(null===t)return null;var e=m(t);return e.left=y(t.left),e.right=y(t.right),e}var v=function(){function t(e){Object(a.a)(this,t),this._compare="function"===typeof e?e:x,this.current=null,this.versions=[]}return Object(f.a)(t,[{key:"step",value:function(){this.versions.push(this.current)}},{key:"getVersion",value:function(t){return t<this.versions.length?this.versions[t]:null}},{key:"getSuccessor",value:function(t,e){var n=this._search(t,e),r=n.node,i=n.path;if(null===r)return null;if(r.right)return this.getMin(r.right);for(var l=i.length-2;l>=0;l--)if(i[l].left===i[l+1])return i[l];return null}},{key:"shootVerticalRay",value:function(t,e){var n=this.getVersion(t);if(null===n)return null;var r=this._insert(e,n),i=this.getSuccessor(e,r);return null===i||i}}]),t}();v.prototype.search=function(t){var e=this._search(t,this.current).node;return e?e.element:null},v.prototype._search=function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];if(null===e)return{node:e,path:n};n.push(e);var r=this._compare(t,e.element);return r<0?this._search(t,e.left,n):r>0?this._search(t,e.right,n):{node:e,path:n}},v.prototype.insert=function(t){this.current=this._insert(t,this.current)},v.prototype._insert=function(t,e){if(null===e)return new _(t);e=m(e);var n=this._compare(t,e.element);n<0?e.left=this._insert(t,e.left):n>0&&(e.right=this._insert(t,e.right)),e.height=Math.max(g(e.left),g(e.right))+1;var r=p(e);if(r<-1){var i=this._compare(t,e.left.element);if(i<0)return y(this._rightRotate(e));if(i>0)return e.left=this._leftRotate(e.left),y(this._rightRotate(e))}else if(r>1){var l=this._compare(t,e.right.element);if(l>0)return y(this._leftRotate(e));if(l<0)return e.right=this._rightRotate(e.right),y(this._leftRotate(e))}return e},v.prototype._rightRotate=function(t){var e=t.left,n=e.right;return e.right=t,t.left=n,t.height=Math.max(g(t.left),g(t.right))+1,e.height=Math.max(g(e.left),g(e.right))+1,e},v.prototype._leftRotate=function(t){var e=t.right,n=e.left;return e.left=t,t.right=n,t.height=Math.max(g(t.left),g(t.right))+1,e.height=Math.max(g(e.left),g(e.right))+1,e},v.prototype.delete=function(t){null!==this.current&&(this.current=this._delete(t,this.current,null))},v.prototype._delete=function(t,e,n){if(null===e)return null;var r=e;e=m(e);var i=this._compare(t,e.element);if(i<0)0===this._compare(t,e.left.element)?this._delete(t,e.left,e):e.left=this._delete(t,e.left,e);else if(i>0)this._compare(t,e.right.element),this._delete(t,e.right,e);else if(null!==e.left&&null!==e.right){var l=this._deleteMax(e.left,e);e.element=l.element}else if(null===e.left)if(null===e.right){if(null===n)return null;n.right===r?n.right=null:n.left=null}else{if(null===n)return e.right;n.right===r?n.right=e.right:n.left=e.right,e.right=null}else{if(null===n)return e.left;n.right===r?n.right=e.left:n.left=e.left,e.left=null}return this._balance(e,n)},v.prototype.deleteMax=function(){return this._deleteMax(this.current,null).element},v.prototype._deleteMax=function(t,e){var n;return null===t.right?(n=this._delete(t.element,t,e),this._balance(t,e),n):(n=this._deleteMax(t.right,t),this._balance(t,e),n)},v.prototype.getMin=function(t){return null===t.left?t:this.getMin(t.left)},v.prototype.getMax=function(t){return null===t.right?t:this.getMax(t.right)},v.prototype._balance=function(t,e){d(t);var n,r,i,l,h=p(t);return h<-1?(l=t=y(t),i=t.left,r=this._getTallestSubtree(i),n=this._triNodeRestructure(r,i,l,e),d(l),d(r),d(i),d(l),d(r),d(i),n):h>1?(l=t=y(t),i=t.right,r=this._getTallestSubtree(i),n=this._triNodeRestructure(r,i,l,e),d(l),d(r),d(i),d(l),d(r),d(i),n):(d(t),t)},v.prototype._getTallestSubtree=function(t){return p(t)<0?t.left:t.right},v.prototype._triNodeRestructure=function(t,e,n,r){var i,l,h;return n.right===e&&e.left===t&&(i=n,l=t,h=e),n.right===e&&e.right===t&&(i=n,l=e,h=t),n.left===e&&e.left===t&&(i=t,l=e,h=n),n.left===e&&e.right===t&&(i=e,l=t,h=n),n.og===this.current||n===this.current||n.element===this.current.element?this.current=l:r.left===n?r.left=l:r.right=l,l.left!==t&&l.left!==e&&l.left!==n&&(i.right=l.left),l.right!==t&&l.right!==e&&l.right!==n&&(h.left=l.right),l.left=i,l.right=h,l},v.prototype.forEach=function(t){this._forEach(this.current,t)},v.prototype._forEach=function(t,e){null!==t&&(this._forEach(t.left,e),e(t.element),this._forEach(t.right,e))},v.prototype.getElementsAtDepth=function(t){var e=[];return this._getElementsAtDepth(t,0,this.current,e),e},v.prototype._getElementsAtDepth=function(t,e,n,r){null!==n&&(t!==e?(this._getElementsAtDepth(t,e+1,n.left,r),this._getElementsAtDepth(t,e+1,n.right,r)):r.push(n.element))};var j=n.p+"static/media/plus.18e46bbf.svg",b=n.p+"static/media/ray.86b55e34.svg",O=n(0),N=function(){var t=Object(r.useState)(0),e=Object(u.a)(t,2),n=e[0],i=e[1],l=Object(r.useState)(null),h=Object(u.a)(l,2),a=h[0],f=h[1],g=Object(r.useState)([]),p=Object(u.a)(g,2),_=p[0],x=p[1],d=Object(r.useState)(null),m=Object(u.a)(d,2),y=m[0],N=m[1],E=Object(r.useState)(new v),w=Object(u.a)(E,2),M=w[0],R=w[1];Object(r.useEffect)((function(){if(0!==_.length){var t=new v,e=Object(c.a)(_);e.sort((function(t,e){return t.x1<e.x1?-1:t.x1>e.x1?1:0}));var n=Object(c.a)(_);n.sort((function(t,e){return t.x2<e.x2?-1:t.x2>e.x2?1:0}));for(var r=0,i=0,l=0;l<window.innerWidth;l+=1)r<_.length&&e[r].x1<=l&&(t.insert(window.innerHeight-e[r].y1),r++),i<_.length&&n[i].x2<=l&&(t.delete(window.innerHeight-n[i].y1),i++),t.step();R(t)}}),[_,R]);return Object(O.jsxs)("div",{className:"App",onClick:function(t){if("svg"===t.target.tagName.toLowerCase())if(n===o.CREATING_LINE_SEGMENT)if(null===a)f({x:t.clientX,y:t.clientY});else{i(o.NONE),f(null);var e=t.clientX<a.x;x(_.concat({x1:e?t.clientX:a.x,y1:e?t.clientY:a.y,x2:e?a.x:t.clientX,y2:e?a.y:t.clientY}))}else n===o.SHOOTING_RAY&&console.log(M.shootVerticalRay(t.clientX,window.innerHeight-t.clientY))},children:[Object(O.jsx)("div",{className:"vertical-lines"}),Object(O.jsx)("div",{className:"horizontal-lines"}),Object(O.jsxs)("div",{className:"button-bar",children:[Object(O.jsxs)("button",{className:n===o.CREATING_LINE_SEGMENT?"selected":"",onClick:function(){return i(o.CREATING_LINE_SEGMENT)},children:[Object(O.jsx)("img",{src:j,alt:"Create line segment"}),Object(O.jsx)("p",{children:"Create line segment"})]}),Object(O.jsxs)("button",{className:n===o.SHOOTING_RAY?"selected":"",onClick:function(){0!==_.length&&i(n===o.SHOOTING_RAY?o.NONE:o.SHOOTING_RAY)},children:[Object(O.jsx)("img",{src:b,alt:"Shoot vertical ray"}),Object(O.jsx)("p",{children:"Shoot vertical ray"})]})]}),Object(O.jsxs)("svg",{width:window.innerWidth,height:window.innerHeight,onMouseMove:function(t){if(n===o.SHOOTING_RAY){var e=M.shootVerticalRay(t.clientX,window.innerHeight-t.clientY);if(null!==e){var r=_.find((function(t){return window.innerHeight-t.y1===e.element}));if(void 0!==r){var i=r.y1+(r.y2-r.y1)/(r.x2-r.x1)*(t.clientX-r.x1);N({x1:t.clientX,y1:t.clientY,x2:t.clientX,y2:i})}else N(null)}else N(null)}},children:[null!==a?Object(O.jsx)("circle",{cx:a.x,cy:a.y,r:4}):null,null!==y?Object(O.jsx)("line",Object(s.a)(Object(s.a)({},y),{},{className:"ray"})):null,_.map((function(t,e){return Object(O.jsxs)(r.Fragment,{children:[Object(O.jsx)("circle",{cx:t.x1,cy:t.y1,r:4}),Object(O.jsx)("circle",{cx:t.x2,cy:t.y2,r:4}),Object(O.jsx)("line",{x1:t.x1,y1:t.y1,x2:t.x2,y2:t.y2},e)]},e)}))]})]})},E=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,19)).then((function(e){var n=e.getCLS,r=e.getFID,i=e.getFCP,l=e.getLCP,h=e.getTTFB;n(t),r(t),i(t),l(t),h(t)}))};h.a.render(Object(O.jsx)(i.a.StrictMode,{children:Object(O.jsx)(N,{})}),document.getElementById("root")),E()}},[[18,1,2]]]);
//# sourceMappingURL=main.a9394b28.chunk.js.map