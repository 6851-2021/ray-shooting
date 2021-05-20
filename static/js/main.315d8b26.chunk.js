(this["webpackJsonpray-shooting"]=this["webpackJsonpray-shooting"]||[]).push([[0],{14:function(t,e,n){},15:function(t,e,n){},17:function(t,e,n){"use strict";n.r(e);var r=n(1),i=n.n(r),l=n(8),h=n.n(l),s=(n(14),n(4)),a={NONE:0,CREATING_LINE_SEGMENT:1,SHOOTING_RAY:2},u=(n(15),n(9)),o=n(7),c=n(3);function f(t){return null===t?0:t.height}function d(t){return null===t?0:f(t.right)-f(t.left)}var g=function t(e,n,r,i,l){Object(c.a)(this,t),this.startX=e,this.startY=n,this.endX=r,this.endY=i,this.action=l};function v(t){this.element=t,this.height=1,this.left=null,this.right=null,this.id=Math.random()}function p(t,e){return null==t||null==e?t===e:t.element.startX===e.element.startX&&t.element.startY===e.element.startY&&t.element.endX===e.element.endX&&t.element.endY===e.element.endY}function m(t){t.height=Math.max(f(t.left),f(t.right))+1}function y(t){var e=new v(t.element);return e.left=t.left,e.right=t.right,e.height=t.height,e.og=t,e}function x(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:new Set;if(null==t)return null;if(e.has(t.id))return null;var n=y(t);return n.left=x(t.left,new Set([].concat(Object(o.a)(e),[t.id]))),n.right=x(t.right,new Set([].concat(Object(o.a)(e),[t.id]))),n}var b=function(){function t(e){Object(c.a)(this,t),this._compare="function"===typeof e?e:this.sortLeftToRight,this.current=null,this.versions=[],this.currVersionNum=0}return Object(u.a)(t,[{key:"sortLeftToRight",value:function(t,e){var n;if(void 0===t.endX&&void 0===t.endY)n=t.startX;else{if(this.currVersionNum<t.startX||this.currVersionNum>t.endX||this.currVersionNum<e.startX||this.currVersionNum>e.endX)throw new Error("Point not in range of line!");n=this.currVersionNum}var r=void 0===t.endX&&void 0===t.endY?t.startY:t.startY+(t.endY-t.startY)/(t.endX-t.startX)*(n-t.startX),i=e.startY+(e.endY-e.startY)/(e.endX-e.startX)*(n-e.startX);return r<i?-1:r>i?1:0}},{key:"step",value:function(){this.versions.push(this.current),this.currVersionNum+=1}},{key:"getVersion",value:function(t){return t<this.versions.length?this.versions[t]:null}},{key:"getSuccessor",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.current,n=this._search(t,e),r=n.node,i=n.path;if(null===r||void 0===r)return null;if(r.right)return this.getMin(r.right);for(var l=i.length-2;l>=0;l--)if(i[l].left===i[l+1])return i[l];return null}},{key:"getPredecessor",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.current,n=this._search(t,e),r=n.node,i=n.path;if(null===r||void 0===r)return null;if(r.left)return this.getMax(r.left);for(var l=i.length-2;l>=0;l--)if(i[l].right===i[l+1])return i[l];return null}},{key:"shootVerticalRay",value:function(t,e){e=new g(t,e);var n=this.getVersion(t);if(null===n)return null;var r=this._insert(e,n),i=this.getSuccessor(e,r);return null===i||i}},{key:"swap",value:function(t,e){var n=t.element;t.element=e.element,e.element=n}}]),t}();b.prototype.search=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.current;return this._search(t,e)},b.prototype._search=function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];if(null===e)return{node:e,path:n};n.push(e);var r=this._compare(t,e.element);return r<0?this._search(t,e.left,n):r>0?this._search(t,e.right,n):{node:e,path:n}},b.prototype.insert=function(t){return this.current=this._insert(t,this.current),this.current},b.prototype._insert=function(t,e){if(null===e)return new v(t);e=y(e);var n=this._compare(t,e.element);n<0?e.left=this._insert(t,e.left):n>0&&(e.right=this._insert(t,e.right)),e.height=Math.max(f(e.left),f(e.right))+1;var r=d(e);if(r<-1){var i=this._compare(t,e.left.element);if(i<0)return x(this._rightRotate(e));if(i>0)return e.left=this._leftRotate(e.left),x(this._rightRotate(e))}else if(r>1){var l=this._compare(t,e.right.element);if(l>0)return x(this._leftRotate(e));if(l<0)return e.right=this._rightRotate(e.right),x(this._leftRotate(e))}return e},b.prototype._rightRotate=function(t){var e=t.left,n=e.right;return e.right=t,t.left=n,t.height=Math.max(f(t.left),f(t.right))+1,e.height=Math.max(f(e.left),f(e.right))+1,e},b.prototype._leftRotate=function(t){var e=t.right,n=e.left;return e.left=t,t.right=n,t.height=Math.max(f(t.left),f(t.right))+1,e.height=Math.max(f(e.left),f(e.right))+1,e},b.prototype.delete=function(t){null!==this.current&&(this.current=this._delete(t,this.current,null))},b.prototype._delete=function(t,e,n){if(null===e)return null;var r=e;e=y(e);var i=this._compare(t,e.element);if(i<0)e.left&&0===this._compare(t,e.left.element)?this._delete(t,e.left,e):(e.left=this._delete(t,e.left,e),m(e));else if(i>0)e.right&&0===this._compare(t,e.right.element)?this._delete(t,e.right,e):(e.right=this._delete(t,e.right,e),m(e));else if(null!==e.left&&null!==e.right){var l=this._deleteMax(e.left,e);e.element=l.element,e.height=Math.max(e.right.height,l.height)+1,null!==n&&(n.right===r?n.right=e:n.left=e)}else if(null===e.left)if(null===e.right){if(null===n)return null;n.right===r?n.right=null:n.left=null,m(n)}else{if(null===n)return e.right;n.right===r?n.right=e.right:n.left=e.right,e.right=null,m(n)}else{if(null===n)return e.left;n.right===r?n.right=e.left:n.left=e.left,e.left=null,m(n)}return this._balance(e,n)},b.prototype.deleteMax=function(){return this._deleteMax(this.current,null).element},b.prototype._deleteMax=function(t,e){var n;return null===t.right?(n=this._delete(t.element,t,e),this._balance(t,e),n):(n=this._deleteMax(t.right,t),this._balance(t,e),n)},b.prototype.getMin=function(t){return null===t.left?t:this.getMin(t.left)},b.prototype.getMax=function(t){return null===t.right?t:this.getMax(t.right)},b.prototype._balance=function(t,e){m(t=x(t));var n,r,i,l,h=d(t);return h<-1?(l=t=x(t),i=t.left,r=this._getTallestSubtree(i),n=this._triNodeRestructure(r,i,l,e),m(l),m(r),m(i),m(l),m(r),m(i),n):h>1?(l=t=x(t),i=t.right,r=this._getTallestSubtree(i),n=this._triNodeRestructure(r,i,l,e),m(l),m(r),m(i),m(l),m(r),m(i),n):(m(t),t)},b.prototype._getTallestSubtree=function(t){return d(t)<0?t.left:t.right},b.prototype._triNodeRestructure=function(t,e,n,r){var i,l,h;return n.right===e&&e.left===t&&(i=n,l=t,h=e),n.right===e&&e.right===t&&(i=n,l=e,h=t),n.left===e&&e.left===t&&(i=t,l=e,h=n),n.left===e&&e.right===t&&(i=e,l=t,h=n),n.og===this.current||p(n,this.current)||n===this.current||n.element===this.current.element||null===r?this.current=l:p(r.left,n)?r.left=l:r.right=l,p(l.left,t)||p(l.left,e)||p(l.left,n)||(i.right=l.left),p(l.right,t)||p(l.right,e)||p(l.right,n)||(h.left=l.right),l.left=i,l.right=h,l};var _={START:"start",END:"end",CROSS:"cross"},w=(n.p,n.p+"static/media/plus.18e46bbf.svg"),T=n.p+"static/media/ray.86b55e34.svg",S=n.p+"static/media/wrench.6be9f8c4.svg",j=function t(){var e=this;Object(c.a)(this,t),this.leftChild=function(t){return 2*t+1},this.rightChild=function(t){return 2*t+2},this.parent=function(t){return Math.floor((t-1)/2)},this.peek=function(){return e.heap[0]},this.swap=function(t,n){var r=e.heap[t];e.heap[t]=e.heap[n],e.heap[n]=r},this.insert=function(t){e.heap.push(t);for(var n=e.heap.length-1;0!==n&&e.heap[n].val<e.heap[e.parent(n)].val;)e.swap(n,e.parent(n)),n=e.parent(n)},this.extractMin=function(){var t=e.heap.shift();return e.heap.unshift(e.heap[e.heap.length-1]),e.heap.pop(),e.heapify(0),t},this.heapify=function(t){var n=e.leftChild(t),r=e.rightChild(t),i=t;n<e.heap.length&&e.heap[i].val>e.heap[n].val&&(i=n),r<e.heap.length&&e.heap[i].val>e.heap[r].val&&(i=r),i!==t&&(e.swap(i,t),e.heapify(i))},this.heap=[]},O=n(0),N=function(){var t=Object(r.useState)(a.CREATING_LINE_SEGMENT),e=Object(s.a)(t,2),n=e[0],i=e[1],l=Object(r.useState)(null),h=Object(s.a)(l,2),u=h[0],o=h[1],c=Object(r.useState)([]),f=Object(s.a)(c,2),d=f[0],v=f[1],p=Object(r.useState)(new b),m=Object(s.a)(p,2),y=m[0],N=m[1],X=Object(r.useRef)(null),R=new Set,M=function(t){if(0!==t.length){var e=new b,n=new j;t.forEach((function(t){n.insert({eventType:_.START,line:t,val:t.x1,shouldInsert:!0}),n.insert({eventType:_.END,line:t,val:t.x2})}));for(var r=0;r<window.innerWidth;r+=1){for(;void 0!==n.peek()&&n.peek().val<=r;){var i=n.extractMin();if(console.log(i),i.eventType===_.START)!function(){var t=void 0,r=void 0,l=void 0,h=void 0,s=void 0;i.shouldInsert?(r=i.line.x1,l=window.innerHeight-i.line.y1,h=i.line.x2,s=window.innerHeight-i.line.y2,t=new g(r,l,h,s,i.line.action),e.insert(t)):(r=i.line.startX,l=i.line.startY,h=i.line.endX,s=i.line.endY,t=i.line);var a=e.getSuccessor(t),u=e.getPredecessor(t),o=function(e){var i=e.element.startX,a=e.element.startY,u=e.element.endX,o=e.element.endY,c=function(t,e,n){return e.x<=Math.max(t.x,n.x)&&e.x>=Math.min(t.x,n.x)&&e.y<=Math.max(t.y,n.y)&&e.y>=Math.min(t.y,n.y)},f=((r*s-l*h)*(i-u)-(r-h)*(i*o-a*u))/((r-h)*(a-o)-(l-s)*(i-u)),d=((r*s-l*h)*(a-o)-(l-s)*(i*o-a*u))/((r-h)*(a-o)-(l-s)*(i-u));!R.has(f.toString()+","+d.toString())&&c({x:r,y:l},{x:f,y:d},{x:h,y:s})&&c({x:i,y:a},{x:f,y:d},{x:u,y:o})&&(R.add(f.toString()+","+d.toString()),n.insert({eventType:_.CROSS,line1:t,line2:e.element,intX:f,intY:d,val:f-1}))};null!==a&&o(a),null!==u&&o(u)}();else if(i.eventType===_.END){var l=i.line,h=l.x1,s=l.y1,a=l.x2,u=l.y2,o=new g(h,window.innerHeight-s,a,window.innerHeight-u),c=e.getPredecessor(o),f=e.getSuccessor(o);null!==c&&n.insert({eventType:_.START,line:c.element,val:i.val,shouldInsert:!1}),null!==f&&n.insert({eventType:_.START,line:f.element,val:i.val,shouldInsert:!1}),e.delete(o)}else if(i.eventType===_.CROSS){var d=x(e.current),v=e.search(i.line1,d).node,p=e.search(i.line2,d).node;if(null===v||null===p){e.step();continue}e.swap(v,p),e.current=d,n.insert({eventType:_.START,line:v.element,val:Math.ceil(i.intX),shouldInsert:!1}),n.insert({eventType:_.START,line:p.element,val:Math.ceil(i.intX),shouldInsert:!1})}}e.step()}return e}},Y=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"red",r=document.createElementNS("http://www.w3.org/2000/svg","line");return r.setAttribute("x1",t.x1),r.setAttribute("y1",t.y1),r.setAttribute("x2",t.x2),r.setAttribute("y2",t.y2),r.setAttribute("stroke",n),null!==e&&r.setAttribute("id",e),r},C=function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:4,r=document.createElementNS("http://www.w3.org/2000/svg","circle");return r.setAttribute("cx",t),r.setAttribute("cy",e),r.setAttribute("r",n),r},E=function(t,e,n){var r=document.createElementNS("http://www.w3.org/2000/svg","text");return r.setAttribute("x",t),r.setAttribute("y",e),r.setAttribute("text-anchor","middle"),r.setAttribute("dominant-baseline","middle"),r.innerHTML=n,r};return Object(O.jsxs)("div",{className:"App",onClick:function(t){if("svg"===t.target.tagName.toLowerCase())if(n===a.CREATING_LINE_SEGMENT)if(null===u)o({x:t.clientX,y:t.clientY}),X.current.appendChild(C(t.clientX,t.clientY));else{o(null);var e=t.clientX<u.x,r={x1:e?t.clientX:u.x,y1:e?t.clientY:u.y,x2:e?u.x:t.clientX,y2:e?u.y:t.clientY};v(d.concat(r)),X.current.appendChild(Y(r)),X.current.appendChild(C(t.clientX,t.clientY))}else if(n===a.SHOOTING_RAY){var i=y.shootVerticalRay(t.clientX,window.innerHeight-t.clientY);if(null===i||void 0===i.element||void 0===i.element.action)return;i.element.action.startsWith("alert:")&&alert(i.element.action.split(":")[1])}},children:[Object(O.jsx)("div",{className:"vertical-lines"}),Object(O.jsx)("div",{className:"horizontal-lines"}),Object(O.jsxs)("div",{className:"button-bar",children:[Object(O.jsxs)("button",{className:n===a.CREATING_LINE_SEGMENT?"selected":"",onClick:function(){return i(a.CREATING_LINE_SEGMENT)},children:[Object(O.jsx)("img",{src:w,alt:"Create line segment"}),Object(O.jsx)("p",{children:"Create line segment"})]}),Object(O.jsxs)("button",{className:n===a.SHOOTING_RAY?"selected":"",onClick:function(){0!==d.length&&(N(M(d)),i(a.SHOOTING_RAY))},children:[Object(O.jsx)("img",{src:T,alt:"Shoot vertical ray"}),Object(O.jsx)("p",{children:"Shoot vertical ray"})]}),Object(O.jsxs)("button",{onClick:function(){for(;X.current.firstChild;)X.current.removeChild(X.current.firstChild);var t=[],e=function(e,n,r,i){var l=arguments.length>4&&void 0!==arguments[4]?arguments[4]:200,h=arguments.length>5&&void 0!==arguments[5]?arguments[5]:50;t.push.apply(t,[{x1:e+1,y1:n,x2:e+l-1,y2:n,action:i},{x1:e-1.001,y1:n,x2:e-1,y2:n+h},{x1:e,y1:n+h,x2:e+l,y2:n+h},{x1:e+l+.999,y1:n,x2:e+l+1,y2:n+h}]),X.current.appendChild(E(e+l/2,n+h/2,r))};e(100,150,"Button #1","alert:This is button #1"),e(400,150,"Button #2","alert:This is button #2"),e(100,250,"Button #3","alert:This is button #3"),e(400,250,"Button #4","alert:This is button #4"),e(100,350,"Button #5","alert:This is button #5"),e(400,350,"Button #6","alert:This is button #6"),t.forEach((function(t){X.current.appendChild(Y(t)),X.current.appendChild(C(t.x1,t.y1)),X.current.appendChild(C(t.x2,t.y2))})),v(t),N(M(t)),i(a.SHOOTING_RAY)},children:[Object(O.jsx)("img",{src:S,alt:"Create user interface"}),Object(O.jsx)("p",{children:"Create user interface"})]}),null]}),Object(O.jsx)("svg",{ref:X,width:window.innerWidth,height:window.innerHeight,onMouseMove:function(t){if(n===a.SHOOTING_RAY&&void 0!==y){null!==document.getElementById("ray")&&document.getElementById("ray").remove();var e=y.shootVerticalRay(t.clientX,window.innerHeight-t.clientY);if(null!==e&&void 0!==e.element){void 0!==e.element.action?document.body.style.cursor="pointer":document.body.style.cursor="default";var r=e.element,i=r.startX,l=r.startY,h=r.endX,s=l+(r.endY-l)/(h-i)*(t.clientX-i);X.current.appendChild(Y({x1:t.clientX,y1:t.clientY-1,x2:t.clientX,y2:window.innerHeight-s},"ray","limegreen"))}else document.body.style.cursor="default"}}})]})},X=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,18)).then((function(e){var n=e.getCLS,r=e.getFID,i=e.getFCP,l=e.getLCP,h=e.getTTFB;n(t),r(t),i(t),l(t),h(t)}))};h.a.render(Object(O.jsx)(i.a.StrictMode,{children:Object(O.jsx)(N,{})}),document.getElementById("root")),X()}},[[17,1,2]]]);
//# sourceMappingURL=main.315d8b26.chunk.js.map