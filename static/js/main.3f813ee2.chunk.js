(this["webpackJsonpray-shooting"]=this["webpackJsonpray-shooting"]||[]).push([[0],{14:function(e,t,n){},15:function(e,t,n){},17:function(e,t,n){"use strict";n.r(t);var r=n(1),i=n.n(r),l=n(8),o=n.n(l),s=(n(14),n(4)),h={NONE:0,CREATING_LINE_SEGMENT:1,SHOOTING_RAY:2},c=(n(15),n(9)),a=n(7),u=n(3);function f(e){return null===e?0:e.height}function g(e){return null===e?0:f(e.right)-f(e.left)}var d=function e(t,n,r,i){Object(u.a)(this,e),this.startX=t,this.startY=n,this.endX=r,this.endY=i};function p(e){this.element=e,this.height=1,this.left=null,this.right=null,this.id=Math.random()}function v(e,t){return null==e||null==t?e===t:e.element.startX===t.element.startX&&e.element.startY===t.element.startY&&e.element.endX===t.element.endX&&e.element.endY===t.element.endY}function m(e){e.height=Math.max(f(e.left),f(e.right))+1}function y(e){var t=new p(e.element);return t.left=e.left,t.right=e.right,t.height=e.height,t.og=e,t}function x(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:new Set;if(null==e)return null;if(t.has(e.id))return console.log("cycle detected!"),console.log(t),null;var n=y(e);return n.left=x(e.left,new Set([].concat(Object(a.a)(t),[e.id]))),n.right=x(e.right,new Set([].concat(Object(a.a)(t),[e.id]))),n}var b=function(){function e(t){Object(u.a)(this,e),this._compare="function"===typeof t?t:this.sortLeftToRight,this.current=null,this.versions=[],this.currVersionNum=0}return Object(c.a)(e,[{key:"sortLeftToRight",value:function(e,t){var n;if(void 0===e.endX&&void 0===e.endY)n=e.startX;else{if(this.currVersionNum<e.startX||this.currVersionNum>e.endX||this.currVersionNum<t.startX||this.currVersionNum>t.endX)throw console.log("OUT OF RANGE FUCK",this.currVersionNum,e,t),"Point not in range of line!";n=this.currVersionNum}var r=void 0===e.endX&&void 0===e.endY?e.startY:e.startY+(e.endY-e.startY)/(e.endX-e.startX)*(n-e.startX),i=t.startY+(t.endY-t.startY)/(t.endX-t.startX)*(n-t.startX);return r<i?-1:r>i?1:0}},{key:"step",value:function(){this.versions.push(this.current),this.currVersionNum+=1}},{key:"getVersion",value:function(e){return e<this.versions.length?this.versions[e]:null}},{key:"getSuccessor",value:function(e,t){var n=this._search(e,t),r=n.node,i=n.path;if(null===r||void 0===r)return null;if(r.right)return this.getMin(r.right);for(var l=i.length-2;l>=0;l--)if(i[l].left===i[l+1])return i[l];return null}},{key:"getPredecessor",value:function(e,t){var n=this._search(e,t),r=n.node,i=n.path;if(null===r||void 0===r)return null;if(r.left)return this.getMax(r.left);for(var l=i.length-2;l>=0;l--)if(i[l].right===i[l+1])return i[l];return null}},{key:"shootVerticalRay",value:function(e,t){t=new d(e,t);var n=this.getVersion(e);if(null===n)return null;var r=this._insert(t,n),i=this.getSuccessor(t,r);return null===i||i}},{key:"swap",value:function(e,t){var n=e.element;e.element=t.element,t.element=n}}]),e}();b.prototype.search=function(e){console.log("SEARCH: ",this.currVersionNum,e);var t=this._search(e,this.current).node;return t?t.element:null},b.prototype._search=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];if(null===t)return{node:t,path:n};n.push(t);var r=this._compare(e,t.element);return r<0?this._search(e,t.left,n):r>0?this._search(e,t.right,n):{node:t,path:n}},b.prototype.insert=function(e){return console.log("inserting ",this.currVersionNum),console.log("before",this.currVersionNum,x(this.current)),this.current=this._insert(e,this.current),console.log("after",this.currVersionNum,x(this.current)),this.current},b.prototype._insert=function(e,t){if(null===t)return new p(e);t=y(t);var n=this._compare(e,t.element);n<0?t.left=this._insert(e,t.left):n>0&&(t.right=this._insert(e,t.right)),t.height=Math.max(f(t.left),f(t.right))+1;var r=g(t);if(r<-1){var i=this._compare(e,t.left.element);if(i<0)return x(this._rightRotate(t));if(i>0)return t.left=this._leftRotate(t.left),x(this._rightRotate(t))}else if(r>1){var l=this._compare(e,t.right.element);if(l>0)return x(this._leftRotate(t));if(l<0)return t.right=this._rightRotate(t.right),x(this._leftRotate(t))}return t},b.prototype._rightRotate=function(e){var t=e.left,n=t.right;return t.right=e,e.left=n,e.height=Math.max(f(e.left),f(e.right))+1,t.height=Math.max(f(t.left),f(t.right))+1,t},b.prototype._leftRotate=function(e){var t=e.right,n=t.left;return t.left=e,e.right=n,e.height=Math.max(f(e.left),f(e.right))+1,t.height=Math.max(f(t.left),f(t.right))+1,t},b.prototype.delete=function(e){console.log("deleting ",this.currVersionNum,e,x(this.current)),null!==this.current&&(this.current=this._delete(e,this.current,null),console.log("AFTER DELETE: ",x(this.current)))},b.prototype._delete=function(e,t,n){if(console.log("DELETE: ",this.currVersionNum,e,x(t),x(n)),null===t)return null;var r=t;t=y(t);var i=this._compare(e,t.element);if(i<0)console.log("delete go left"),t.left&&0===this._compare(e,t.left.element)?this._delete(e,t.left,t):(t.left=this._delete(e,t.left,t),m(t),console.log("updated left node"));else if(i>0)console.log("delete go right"),t.right&&0===this._compare(e,t.right.element)?this._delete(e,t.right,t):(t.right=this._delete(e,t.right,t),m(t),console.log("updated right node"));else if(null!==t.left&&null!==t.right){var l=this._deleteMax(t.left,t);t.element=l.element,t.height=Math.max(t.right.height,l.height)+1,null!==n&&(n.right===r?n.right=t:n.left=t)}else if(null===t.left)if(null===t.right){if(null===n)return null;n.right===r?n.right=null:n.left=null,m(n)}else{if(null===n)return t.right;n.right===r?n.right=t.right:n.left=t.right,t.right=null,m(n)}else{if(null===n)return t.left;n.right===r?n.right=t.left:n.left=t.left,t.left=null,m(n)}return this._balance(t,n)},b.prototype.deleteMax=function(){return this._deleteMax(this.current,null).element},b.prototype._deleteMax=function(e,t){var n;return console.log("DELETE_MAX:"),null===e.right?(n=this._delete(e.element,e,t),this._balance(e,t),console.log("MAX: ",n),n):(n=this._deleteMax(e.right,e),this._balance(e,t),n)},b.prototype.getMin=function(e){return null===e.left?e:this.getMin(e.left)},b.prototype.getMax=function(e){return null===e.right?e:this.getMax(e.right)},b.prototype._balance=function(e,t){console.log("Balance: ",this.currVersionNum,x(e),x(t)),e=x(e),console.log("node copy: ",e),m(e);var n,r,i,l,o=g(e);return o<-1?(e=x(e),console.log("balance < -1"),l=e,i=e.left,r=this._getTallestSubtree(i),n=this._triNodeRestructure(r,i,l,t),m(l),m(r),m(i),m(l),m(r),m(i),n):o>1?(e=x(e),console.log("balance > 1"),l=e,i=e.right,r=this._getTallestSubtree(i),n=this._triNodeRestructure(r,i,l,t),m(l),m(r),m(i),m(l),m(r),m(i),n):(console.log("no balance needed"),m(e),console.log("after balance: ",e),e)},b.prototype._getTallestSubtree=function(e){return g(e)<0?e.left:e.right},b.prototype._triNodeRestructure=function(e,t,n,r){var i,l,o;return console.log("TRINODE: ",this.currVersionNum,x(e),x(t),x(n),r,this.current),n.right===t&&t.left===e&&(i=n,l=e,o=t),n.right===t&&t.right===e&&(i=n,l=t,o=e),n.left===t&&t.left===e&&(i=e,l=t,o=n),n.left===t&&t.right===e&&(i=t,l=e,o=n),n.og===this.current||v(n,this.current)||n===this.current||n.element===this.current.element||null===r?this.current=l:v(r.left,n)?r.left=l:r.right=l,v(l.left,e)||v(l.left,t)||v(l.left,n)||(console.log("a.right := b.left"),i.right=l.left),console.log(l.right,e,t,n),v(l.right,e)||v(l.right,t)||v(l.right,n)||(console.log("c.left := b.right"),o.left=l.right),l.left=i,l.right=o,console.log("After Trinode: ",l),l},b.prototype.forEach=function(e){this._forEach(this.current,e)},b.prototype._forEach=function(e,t){null!==e&&(this._forEach(e.left,t),t(e.element),this._forEach(e.right,t))},b.prototype.getElementsAtDepth=function(e){var t=[];return this._getElementsAtDepth(e,0,this.current,t),t},b.prototype._getElementsAtDepth=function(e,t,n,r){null!==n&&(e!==t?(this._getElementsAtDepth(e,t+1,n.left,r),this._getElementsAtDepth(e,t+1,n.right,r)):r.push(n.element))};var _={START:"start",END:"end",CROSS:"cross"},N=n.p+"static/media/clipboard.f03ddbea.svg",E=n.p+"static/media/plus.18e46bbf.svg",j=n.p+"static/media/ray.86b55e34.svg",O=n.p+"static/media/wrench.6be9f8c4.svg",w=function e(){var t=this;Object(u.a)(this,e),this.leftChild=function(e){return 2*e+1},this.rightChild=function(e){return 2*e+2},this.parent=function(e){return Math.floor((e-1)/2)},this.peek=function(){return t.heap[0]},this.swap=function(e,n){var r=t.heap[e];t.heap[e]=t.heap[n],t.heap[n]=r},this.insert=function(e){t.heap.push(e);for(var n=t.heap.length-1;0!==n&&t.heap[n].val<t.heap[t.parent(n)].val;)t.swap(n,t.parent(n)),n=t.parent(n)},this.extractMin=function(){var e=t.heap.shift();return t.heap.unshift(t.heap[t.heap.length-1]),t.heap.pop(),t.heapify(0),e},this.heapify=function(e){var n=t.leftChild(e),r=t.rightChild(e),i=e;n<t.heap.length&&t.heap[i].val>t.heap[n].val&&(i=n),r<t.heap.length&&t.heap[i].val>t.heap[r].val&&(i=r),i!==e&&(t.swap(i,e),t.heapify(i))},this.heap=[]},S=n(0),T=function(){var e=Object(r.useState)(h.CREATING_LINE_SEGMENT),t=Object(s.a)(e,2),n=t[0],i=t[1],l=Object(r.useState)(null),o=Object(s.a)(l,2),c=o[0],a=o[1],u=Object(r.useState)([]),f=Object(s.a)(u,2),g=f[0],p=f[1],v=Object(r.useState)(new b),m=Object(s.a)(v,2),y=m[0],T=m[1],C=Object(r.useRef)(null),X=new Set,M=function(e){if(0!==e.length){var t=new b,n=new w;e.forEach((function(e){n.insert({eventType:_.START,line:e,val:e.x1,shouldInsert:!0}),n.insert({eventType:_.END,line:e,val:e.x2})}));for(var r=0;r<window.innerWidth;r+=1){for(;void 0!==n.peek()&&n.peek().val<=r;){var i=n.extractMin();if(console.log(i),i.eventType===_.START)!function(){var e=void 0,r=void 0,l=void 0,o=void 0,s=void 0,h=void 0;i.shouldInsert?(l=i.line.x1,o=window.innerHeight-i.line.y1,s=i.line.x2,h=window.innerHeight-i.line.y2,e=new d(l,o,s,h),r=t.insert(e)):(l=i.line.startX,o=i.line.startY,s=i.line.endX,h=i.line.endY,e=i.line,r=t.current);var c=t.getSuccessor(e,r),a=t.getPredecessor(e,r),u=function(t){var r=t.element.startX,i=t.element.startY,c=t.element.endX,a=t.element.endY,u=function(e,t,n){return t.x<=Math.max(e.x,n.x)&&t.x>=Math.min(e.x,n.x)&&t.y<=Math.max(e.y,n.y)&&t.y>=Math.min(e.y,n.y)},f=((l*h-o*s)*(r-c)-(l-s)*(r*a-i*c))/((l-s)*(i-a)-(o-h)*(r-c)),g=((l*h-o*s)*(i-a)-(o-h)*(r*a-i*c))/((l-s)*(i-a)-(o-h)*(r-c));!X.has(f.toString()+","+g.toString())&&u({x:l,y:o},{x:f,y:g},{x:s,y:h})&&u({x:r,y:i},{x:f,y:g},{x:c,y:a})&&(X.add(f.toString()+","+g.toString()),n.insert({eventType:_.CROSS,line1:e,line2:t.element,intX:f,intY:g,val:f-1}))};null!==c&&u(c),null!==a&&u(a)}();else if(i.eventType===_.END){var l=i.line,o=l.x1,s=l.y1,h=l.x2,c=l.y2,a=new d(o,window.innerHeight-s,h,window.innerHeight-c);t.delete(a)}else if(i.eventType===_.CROSS){var u=x(t.current),f=t._search(i.line1,u).node,g=t._search(i.line2,u).node;if(null===f||null===g){t.step();continue}t.swap(f,g),t.current=u,n.insert({eventType:_.START,line:f.element,val:Math.ceil(i.intX),shouldInsert:!1}),n.insert({eventType:_.START,line:g.element,val:Math.ceil(i.intX),shouldInsert:!1})}}t.step()}return t}},R=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=document.createElementNS("http://www.w3.org/2000/svg","line");return n.setAttribute("x1",e.x1),n.setAttribute("y1",e.y1),n.setAttribute("x2",e.x2),n.setAttribute("y2",e.y2),null!==t&&n.setAttribute("id",t),n},A=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:4,r=document.createElementNS("http://www.w3.org/2000/svg","circle");return r.setAttribute("cx",e),r.setAttribute("cy",t),r.setAttribute("r",n),r};return Object(S.jsxs)("div",{className:"App",onClick:function(e){if("svg"===e.target.tagName.toLowerCase()&&n===h.CREATING_LINE_SEGMENT)if(null===c)a({x:e.clientX,y:e.clientY}),C.current.appendChild(A(e.clientX,e.clientY));else{a(null);var t=e.clientX<c.x,r={x1:t?e.clientX:c.x,y1:t?e.clientY:c.y,x2:t?c.x:e.clientX,y2:t?c.y:e.clientY};p(g.concat(r)),C.current.appendChild(R(r)),C.current.appendChild(A(e.clientX,e.clientY))}},children:[Object(S.jsx)("div",{className:"vertical-lines"}),Object(S.jsx)("div",{className:"horizontal-lines"}),Object(S.jsxs)("div",{className:"button-bar",children:[Object(S.jsxs)("button",{className:n===h.CREATING_LINE_SEGMENT?"selected":"",onClick:function(){return i(h.CREATING_LINE_SEGMENT)},children:[Object(S.jsx)("img",{src:E,alt:"Create line segment"}),Object(S.jsx)("p",{children:"Create line segment"})]}),Object(S.jsxs)("button",{className:n===h.SHOOTING_RAY?"selected":"",onClick:function(){0!==g.length&&(T(M(g)),i(h.SHOOTING_RAY))},children:[Object(S.jsx)("img",{src:j,alt:"Shoot vertical ray"}),Object(S.jsx)("p",{children:"Shoot vertical ray"})]}),Object(S.jsxs)("button",{onClick:function(){for(;C.current.firstChild;)C.current.removeChild(C.current.firstChild);var e=[{x1:598,y1:308,x2:825,y2:179},{x1:539,y1:202,x2:794,y2:322},{x1:541,y1:213,x2:584,y2:434},{x1:504,y1:381,x2:654,y2:206},{x1:517,y1:309,x2:786,y2:313}];e.forEach((function(e){C.current.appendChild(R(e)),C.current.appendChild(A(e.x1,e.y1)),C.current.appendChild(A(e.x2,e.y2))})),p(e),T(M(e)),i(h.SHOOTING_RAY)},children:[Object(S.jsx)("img",{src:O,alt:"Create user interface"}),Object(S.jsx)("p",{children:"Create user interface"})]}),Object(S.jsxs)("button",{onClick:function(){var e=document.createElement("textarea");document.body.appendChild(e),e.value=JSON.stringify(g),e.select(),document.execCommand("copy"),document.body.removeChild(e)},children:[Object(S.jsx)("img",{src:N,alt:"Copy lines to clipboard"}),Object(S.jsx)("p",{children:"Copy lines to clipboard"})]})]}),Object(S.jsx)("svg",{ref:C,width:window.innerWidth,height:window.innerHeight,onMouseMove:function(e){if(n===h.SHOOTING_RAY&&void 0!==y){null!==document.getElementById("ray")&&document.getElementById("ray").remove();var t=y.shootVerticalRay(e.clientX,window.innerHeight-e.clientY);if(null!==t&&void 0!==t.element){var r=t.element,i=r.startX,l=r.startY,o=r.endX,s=l+(r.endY-l)/(o-i)*(e.clientX-i);C.current.appendChild(R({x1:e.clientX,y1:e.clientY,x2:e.clientX,y2:window.innerHeight-s},"ray"))}}}})]})},C=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,18)).then((function(t){var n=t.getCLS,r=t.getFID,i=t.getFCP,l=t.getLCP,o=t.getTTFB;n(e),r(e),i(e),l(e),o(e)}))};o.a.render(Object(S.jsx)(i.a.StrictMode,{children:Object(S.jsx)(T,{})}),document.getElementById("root")),C()}},[[17,1,2]]]);
//# sourceMappingURL=main.3f813ee2.chunk.js.map