"use strict";(self.webpackChunkroguelikedev_2022=self.webpackChunkroguelikedev_2022||[]).push([[143],{890:(e,t,s)=>{s.d(t,{Z:()=>a});var o=s(537),n=s.n(o),i=s(645),r=s.n(i)()(n());r.push([e.id,"* {\n    box-sizing: border-box;\n}\n\nbody {\n    margin: 0 auto;\n    overflow: hidden;\n    width: 100vw;\n    height: 100vh;\n    font-size: 1.2vh;\n}","",{version:3,sources:["webpack://./src/styles/style.css"],names:[],mappings:"AAAA;IACI,sBAAsB;AAC1B;;AAEA;IACI,cAAc;IACd,gBAAgB;IAChB,YAAY;IACZ,aAAa;IACb,gBAAgB;AACpB",sourcesContent:["* {\n    box-sizing: border-box;\n}\n\nbody {\n    margin: 0 auto;\n    overflow: hidden;\n    width: 100vw;\n    height: 100vh;\n    font-size: 1.2vh;\n}"],sourceRoot:""}]);const a=r},645:e=>{e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var s="",o=void 0!==t[5];return t[4]&&(s+="@supports (".concat(t[4],") {")),t[2]&&(s+="@media ".concat(t[2]," {")),o&&(s+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),s+=e(t),o&&(s+="}"),t[2]&&(s+="}"),t[4]&&(s+="}"),s})).join("")},t.i=function(e,s,o,n,i){"string"==typeof e&&(e=[[null,e,void 0]]);var r={};if(o)for(var a=0;a<this.length;a++){var h=this[a][0];null!=h&&(r[h]=!0)}for(var c=0;c<e.length;c++){var l=[].concat(e[c]);o&&r[l[0]]||(void 0!==i&&(void 0===l[5]||(l[1]="@layer".concat(l[5].length>0?" ".concat(l[5]):""," {").concat(l[1],"}")),l[5]=i),s&&(l[2]?(l[1]="@media ".concat(l[2]," {").concat(l[1],"}"),l[2]=s):l[2]=s),n&&(l[4]?(l[1]="@supports (".concat(l[4],") {").concat(l[1],"}"),l[4]=n):l[4]="".concat(n)),t.push(l))}},t}},537:e=>{e.exports=function(e){var t=e[1],s=e[3];if(!s)return t;if("function"==typeof btoa){var o=btoa(unescape(encodeURIComponent(JSON.stringify(s)))),n="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(o),i="/*# ".concat(n," */"),r=s.sources.map((function(e){return"/*# sourceURL=".concat(s.sourceRoot||"").concat(e," */")}));return[t].concat(r).concat([i]).join("\n")}return[t].join("\n")}},379:e=>{var t=[];function s(e){for(var s=-1,o=0;o<t.length;o++)if(t[o].identifier===e){s=o;break}return s}function o(e,o){for(var i={},r=[],a=0;a<e.length;a++){var h=e[a],c=o.base?h[0]+o.base:h[0],l=i[c]||0,p="".concat(c," ").concat(l);i[c]=l+1;var d=s(p),u={css:h[1],media:h[2],sourceMap:h[3],supports:h[4],layer:h[5]};if(-1!==d)t[d].references++,t[d].updater(u);else{var m=n(u,o);o.byIndex=a,t.splice(a,0,{identifier:p,updater:m,references:1})}r.push(p)}return r}function n(e,t){var s=t.domAPI(t);return s.update(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap&&t.supports===e.supports&&t.layer===e.layer)return;s.update(e=t)}else s.remove()}}e.exports=function(e,n){var i=o(e=e||[],n=n||{});return function(e){e=e||[];for(var r=0;r<i.length;r++){var a=s(i[r]);t[a].references--}for(var h=o(e,n),c=0;c<i.length;c++){var l=s(i[c]);0===t[l].references&&(t[l].updater(),t.splice(l,1))}i=h}}},569:e=>{var t={};e.exports=function(e,s){var o=function(e){if(void 0===t[e]){var s=document.querySelector(e);if(window.HTMLIFrameElement&&s instanceof window.HTMLIFrameElement)try{s=s.contentDocument.head}catch(e){s=null}t[e]=s}return t[e]}(e);if(!o)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");o.appendChild(s)}},216:e=>{e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t,e.options),t}},565:(e,t,s)=>{e.exports=function(e){var t=s.nc;t&&e.setAttribute("nonce",t)}},795:e=>{e.exports=function(e){var t=e.insertStyleElement(e);return{update:function(s){!function(e,t,s){var o="";s.supports&&(o+="@supports (".concat(s.supports,") {")),s.media&&(o+="@media ".concat(s.media," {"));var n=void 0!==s.layer;n&&(o+="@layer".concat(s.layer.length>0?" ".concat(s.layer):""," {")),o+=s.css,n&&(o+="}"),s.media&&(o+="}"),s.supports&&(o+="}");var i=s.sourceMap;i&&"undefined"!=typeof btoa&&(o+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),t.styleTagTransform(o,e,t.options)}(t,e,s)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)}}}},589:e=>{e.exports=function(e,t){if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}},128:(e,t,s)=>{var o=s(379),n=s.n(o),i=s(795),r=s.n(i),a=s(569),h=s.n(a),c=s(565),l=s.n(c),p=s(216),d=s.n(p),u=s(589),m=s.n(u),f=s(890),v={};v.styleTagTransform=m(),v.setAttributes=l(),v.insert=h().bind(null,"head"),v.domAPI=r(),v.insertStyleElement=d(),n()(f.Z,v),f.Z&&f.Z.locals&&f.Z.locals;class g{constructor(e){this.entity=e}perform(){console.error("Not Implemented")}isPlayer(){return this.entity===b.player}}class y extends g{constructor(e){super(e)}perform(){return this}}class w extends g{constructor(e,t){super(e),this.reason=t}perform(){return this}}const x=new class{constructor(){this.eventHandler=null,this.player=null,this.gameMap=null,this.needsRenderUpdate=!1}handleEvents(){this.processAction(this.eventHandler.handleInput())}processAction(e){if(e&&this.eventHandler.isPlayerTurn){const t=e.perform();return!(t instanceof y||(t instanceof w?(t.reason&&console.log(t.reason),1):(x.needsRenderUpdate=!0,x.player.fov.compute(x.player,5),x.player.fov.updateMap(),this.handleEnemyTurns(),0)))}}handleEnemyTurns(){this.eventHandler.isPlayerTurn=!1;for(const e of this.gameMap.actors)if(e!==this.player){const t=e.getComponent("ai");t&&t.perform()}this.eventHandler.isPlayerTurn=!0}},b=x,A=new class{constructor(){this.setupGameHtml(),this.resizeCanvas(),window.addEventListener("resize",this)}setupGameHtml(){const e=document.createElement("div");e.classList.add("game"),this.canvas=document.createElement("canvas"),this.canvas.classList.add("view"),e.appendChild(this.canvas),document.body.appendChild(e),this.ctx=this.canvas.getContext("2d")}handleEvent(e){"resize"===e.type&&this.resizeCanvas()}resizeCanvas(){this.canvas.width=window.innerWidth,this.canvas.height=window.innerHeight,b.needsRenderUpdate=!0}clearAll(){this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)}},C="ArrowUp",M="ArrowDown",T="Left Shift",k="Right Shift",E="Numpad .",S="Numpad 0",N="Numpad 1",D="Numpad 2",H="Numpad 3",L="Numpad 4",q="Numpad 5",F="Numpad 6",I="Numpad 7",R="Numpad 8",_="Numpad 9",U="Numpad Delete",O="Numpad Insert",B="Numpad End",P="Numpad ArrowDown",W="Numpad PageDown",X="Numpad ArrowLeft",j="Numpad Clear",J="Numpad ArrowRight",z="Numpad Home",G="Numpad ArrowUp",K="Numpad PageUp",V=new class{constructor(){const e=this;e.defaultDelay=25,e.lastShiftUp=null,e.treatShiftNumpadEqual=!0,e.keysDown=[],e.keysDelayed=[],e.defaults=new Map,e.controls=new Map,e.defaults.set("up",[R,C]),e.defaults.set("down",[D,M]),e.defaults.set("nw",[I]),e.defaults.set("ne",[_]),e.defaults.set("sw",[N]),e.defaults.set("se",[H]),e.defaults.set("wait",[q]),e.load(),addEventListener("keydown",(function(t){"/"===t.key&&t.preventDefault(),e.treatShiftNumpadEqual&&t.getModifierState("NumLock")&&!t.shiftKey&&t.code.startsWith("Numpad")&&t.keyCode<90&&e.lastShiftUp&&(e.keysDown[e.lastShiftUp]=!0);const s=e.getKey(t.key,t.code);e.keysDown[s]=!0}),!1),addEventListener("keyup",(function(t){const s=e.getKey(t.key,t.code);s!==T&&s!==k||(e.lastShiftUp=s),delete e.keysDown[s],delete e.keysDelayed[s]}),!1)}getKey(e,t){if(t.startsWith("Arrow")||(t.endsWith("Left")?e="Left "+e:t.endsWith("Right")?e="Right "+e:t.startsWith("Numpad")&&(e="Numpad "+e)),this.treatShiftNumpadEqual)switch(e){case U:e=E;break;case O:e=S;break;case B:e=N;break;case P:e=D;break;case W:e=H;break;case X:e=L;break;case j:e=q;break;case J:e=F;break;case z:e=I;break;case G:e=R;break;case K:e=_}return e}load(){const e=localStorage.getItem("controls");e?this.controls=new Map(JSON.parse(e)):this.resetToDefault()}save(){localStorage.setItem("controls",JSON.stringify(Array.from(this.controls.entries())))}setControls(e){this.controls=new Map;for(const[t,s]of e.entries()){const e=[];for(const t of s)e.push(t);this.controls.set(t,e)}this.save()}resetToDefault(){this.setControls(this.defaults)}clone(){const e=new Map;for(const[t,s]of this.controls.entries()){const o=[];for(const e of s)o.push(e);e.set(t,o)}return e}isPressed(e){const t=this;let s=!1,o=t.controls.get(e);if(!o){const s=t.defaults.get(e);s?(t.controls.set(e,s),t.save(),o=s):console.error("Missing keybindings for: ",e,o)}return o.forEach((function(e){e in t.keysDown&&(s=!0)})),s}isDelayed(e){const t=this;let s=!1;return this.controls.get(e).forEach((function(e){e in t.keysDelayed&&(s=!0)})),s}deleteKey(e,t){const s=this;s.controls.get(e).forEach((function(e){delete s.keysDown[e],t&&(s.keysDelayed[e]=!0)})),t&&setTimeout((function(){s.controls.get(e).forEach((function(e){delete s.keysDelayed[e]}))}),t)}testPressed(e,t){t=t||this.defaultDelay;const s=this;let o=!1;return s.isPressed(e)&&!s.isDelayed(e)&&(s.deleteKey(e,t),o=!0),o}};class Y extends g{constructor(e,t=0,s=0){super(e),this.dq=t,this.dr=s}perform(){console.error("Not Implemented")}}class Z{static PI=Math.PI;static HEX_A=this.PI/3;static HEX_RADIUS=20;constructor(){}static drawHex(e,t,s){e.beginPath();for(let o=0;o<6;o++)e.lineTo(t+Z.HEX_RADIUS*Math.cos(Z.HEX_A*o),s+Z.HEX_RADIUS*Math.sin(Z.HEX_A*o));e.closePath()}static hexToArray(e,t){return{x:Math.floor(e+t/2),y:t}}static arrayToHex(e,t){return{q:e-Math.floor(t/2),r:t}}}class Q extends Y{constructor(e,t,s){super(e,t,s)}perform(){const e=this.entity.getComponent("hex");if(e){const t=Z.hexToArray(e.q+this.dq,e.r+this.dr),s=b.gameMap.getBlockingActorAtArrayLocation(t.x,t.y);if(!s)return new w(this.entity,"There's nothing to attack there!");{let e,t,o;this.isPlayer()?(e="You",t=""):(e=this.entity.name,t="s"),o=s===b.player?"You":s.name;const n=this.entity.getComponent("fighter"),i=s.getComponent("fighter"),r=n.power-i.defense;let a=e+" attack"+t+" "+o;r>0?(a+=" for "+r+" hit points.",i.takeDamage(r)):a+=", but does no damage.",console.log(a)}}return this}}class $ extends Y{constructor(e,t,s){super(e,t,s)}perform(){const e=this.entity.getComponent("hex");if(e){const t=Z.hexToArray(e.q+this.dq,e.r+this.dr);if(!b.gameMap.isInBounds(t.x,t.y))return new w(this.entity,"Location is outside of the map!");const s=b.gameMap.tiles[t.x][t.y];if(s.isWall())return new w(this.entity,"There's a "+s.name+" in the way!");if(b.gameMap.getBlockingActorAtArrayLocation(t.x,t.y))return new w(this.entity,"There's something in the way!");e.moveTo(t.x,t.y)}return this}}class ee extends Y{constructor(e,t,s){super(e,t,s)}perform(){const e=this.entity.getComponent("hex");if(e){const t=Z.hexToArray(e.q+this.dq,e.r+this.dr);return b.gameMap.getBlockingActorAtArrayLocation(t.x,t.y)?new Q(this.entity,this.dq,this.dr).perform():new $(this.entity,this.dq,this.dr).perform()}return this}}class te extends g{constructor(e){super(e)}perform(){return this}}class se extends class{constructor(){this.mouseDown=!1,window.addEventListener("mousemove",this),window.addEventListener("mousedown",this),window.addEventListener("mouseup",this),window.addEventListener("click",this),window.addEventListener("contextmenu",this),window.addEventListener("change",this),window.addEventListener("keydown",this),this.isPlayerTurn=!0}teardown(){window.removeEventListener("mousemove",this),window.removeEventListener("mousedown",this),window.removeEventListener("mouseup",this),window.removeEventListener("click",this),window.removeEventListener("contextmenu",this),window.removeEventListener("change",this),window.removeEventListener("keydown",this)}handleEvent(e){switch(e.type){case"mousemove":this.onMouseMove(e);break;case"mousedown":this.onMouseDown(e);break;case"mouseup":this.onMouseUp(e);break;case"click":this.onLeftClick(e);break;case"contextmenu":this.onRightClick(e);break;case"change":this.onChange(e);break;case"keydown":this.onKeydown(e)}}handleInput(){}onMouseMove(){}onMouseDown(){this.mouseDown=!0}onMouseUp(){this.mouseDown=!1}onLeftClick(){}onRightClick(){}onChange(){}onKeydown(){}}{constructor(){super()}teardown(){super.teardown()}handleInput(){let e=null;return this.isPlayerTurn&&b.player.isAlive()&&(V.testPressed("up")?e=new ee(b.player,-1,0):V.testPressed("down")?e=new ee(b.player,1,0):V.testPressed("nw")?e=new ee(b.player,0,-1):V.testPressed("ne")?e=new ee(b.player,-1,1):V.testPressed("sw")?e=new ee(b.player,1,-1):V.testPressed("se")?e=new ee(b.player,0,1):V.testPressed("wait")&&(e=new te(b.player))),e}}class oe{constructor(e={},t,s){this.args=e,this.baseType=t||"component",this.type=s||this.baseType,this.parentEntity=e.parentEntity,this.cachedSave=null}clearSaveCache(){this.cachedSave=null,this.parentEntity?.clearSaveCache()}save(){return null}hasComponent(){return this.args.components&&void 0!==this.args.components[this.type]}isPlayer(){return this.parentEntity===b.player}saveBoolean(e,t){if(this.cachedSave)return this.cachedSave;const s={};return e!==t&&(s[this.type]=e),this.cachedSave=s,s}loadBooleanOrObject(e){const t=typeof this.args.components[this.type];return"boolean"===t?this.args.components[this.type]:"object"===t?this.args.components[this.type][e]:void 0}loadArg(e,t){return this.args.components[this.type][e]||t}loadArgArray(e){const t=[],s=this.args.components[this.type][e].split(",");for(const e of s)t.push(e.trim());return t}}class ne extends oe{constructor(e={},t){super(e,"ai",t)}save(){return null}perform(){console.error("Not Implemented")}}class ie extends ne{constructor(e={}){super(e,"aiDead"),this.previousAI="",this.hasComponent()&&(this.previousAI=this.loadArg("previousAI",""))}save(){if(this.cachedSave)return this.cachedSave;const e={aiDead:{}};return e.aiDead.previousAI=this.previousAI,this.cachedSave=e,e}perform(){}}class re extends oe{constructor(e){super(e,"fov"),this.explored=!1,this.visible=!1,this.hasComponent()&&(this.explored=this.loadArg("explored",!1),this.visible=this.loadArg("visible",!1))}save(){if(this.cachedSave)return this.cachedSave;const e={fov:{}};return!1!==this.explored&&(e.fov.explored=this.explored),!1!==this.visible&&(e.fov.visible=this.visible),this.cachedSave=e,e}setExplored(e){this.explored=e,this.clearSaveCache()}setVisible(e){this.visible=e}}class ae extends class{constructor(){this.previousVisibleTiles=[],this.visibleTiles=[],this.visibleActors=[]}compute(e,t){this.previousVisibleTiles=this.visibleTiles,this.visibleTiles=[],this.visibleActors=[],this.hex=e.getComponent("hex"),this.q=this.hex.q,this.r=this.hex.r,this.tile=b.gameMap.getTileFromHexCoords(this.q,this.r);const s=this.hex.row,o=this.hex.col;this.left=Math.max(0,s-t),this.right=Math.min(b.gameMap.rows,s+t),this.top=Math.max(0,o-t),this.bottom=Math.min(b.gameMap.cols,o+t)}addVisibleActor(e){-1===this.visibleActors.indexOf(e)&&this.visibleActors.push(e)}exploreTileByHex(e,t){const s=Z.hexToArray(e,t);this.exploreTileByArray(s.x,s.y)}exploreTileByArray(e,t){this.visibleTiles.push(b.gameMap.tiles[e][t]);for(const s of b.gameMap.actors){const o=s.getComponent("hex");o&&e===o.row&&t===o.col&&this.addVisibleActor(s)}}updateMap(){for(const e of this.previousVisibleTiles){const t=e.getComponent("fov");t&&t.setVisible(!1)}for(const e of this.visibleTiles){const t=e.getComponent("fov");t?(t.setExplored(!0),t.setVisible(!0)):e.setComponent(new re({components:{fov:{explored:!0,visible:!0}}}))}}}{constructor(){super()}compute(e,t){super.compute(e,t),this.exploreTileByHex(this.q,this.r);for(let e=1;e<=6;e++)this.exploreDirection(this.q,this.r,e,t)}exploreDirection(e,t,s,o){let n=s+1;n>6&&(n=1);let i,r,a=!1,h=!1;const c=b.gameMap.getTileNeighbor(e,t,s);c&&(i=c.getComponent("hex"),this.exploreTileByArray(i.row,i.col),c.isWall()||(a=!0));const l=b.gameMap.getTileNeighbor(e,t,n);if(l&&(r=l.getComponent("hex"),this.exploreTileByArray(r.row,r.col),l.isWall()||(h=!0)),--o>1){if(a||h){let e;if(i?e=b.gameMap.getTileNeighbor(i.q,i.r,n):r&&(e=b.gameMap.getTileNeighbor(r.q,r.r,s)),e){const t=e.getComponent("hex");this.exploreTileByArray(t.row,t.col)}}a&&this.exploreDirection(i.q,i.r,s,o),h&&this.exploreDirection(r.q,r.r,s,o)}}}class he extends g{constructor(e){super(e)}perform(){const e=Math.floor(7*Math.random());if(0===e)return new te(this.entity).perform();{let t=0,s=0;switch(e){case 1:t=-1;break;case 2:t=-1,s=1;break;case 3:s=1;break;case 4:t=1;break;case 5:t=1,s=-1;break;default:s=-1}return new $(this.entity,t,s)}}}class ce{constructor(e){this.content=[],this.scoreFunction=e}push(e){this.content.push(e),this.sinkDown(this.content.length-1)}pop(){const e=this.content[0],t=this.content.pop();return this.content.length>0&&(this.content[0]=t,this.bubbleUp(0)),e}remove(e){const t=this.content.indexOf(e),s=this.content.pop();t!==this.content.length-1&&(this.content[t]=s,this.scoreFunction(s)<this.scoreFunction(e)?this.sinkDown(t):this.bubbleUp(t))}size(){return this.content.length}rescoreElement(e){this.sinkDown(this.content.indexOf(e))}sinkDown(e){const t=this.content[e];for(;e>0;){const s=(e+1>>1)-1,o=this.content[s];if(!(this.scoreFunction(t)<this.scoreFunction(o)))break;this.content[s]=t,this.content[e]=o,e=s}}bubbleUp(e){const t=this.content.length,s=this.content[e],o=this.scoreFunction(s);let n=!1;for(;!n;){const i=e+1<<1,r=i-1;let a,h=null;if(r<t){const e=this.content[r];a=this.scoreFunction(e),a<o&&(h=r)}if(i<t){const e=this.content[i];this.scoreFunction(e)<(null===h?o:a)&&(h=i)}if(null===h){n=!0;break}this.content[e]=this.content[h],this.content[h]=s,e=h}}}class le{constructor(){}static pathTo(e){let t=e;const s=[];for(;t.parent;)s.unshift(t),t=t.parent;return s}static getHeap(){return new ce((function(e){return e.f}))}static search(e,t,s,o){e.cleanDirty();const n=(o=o||{}).closest||!1,i=this.getHeap();let r=t;for(t.h=this.heuristicManhattan(t,s),e.markDirty(t),i.push(t);i.size()>0;){const t=i.pop();if(t===s)return this.pathTo(t);t.closed=!0;const o=e.neighbors(t);for(let a=0,h=o.length;a<h;++a){const h=o[a];if(h.closed||h.isWall())continue;const c=t.g+h.getCost(t),l=h.visited;(!l||c<h.g)&&(h.visited=!0,h.parent=t,h.h=h.h||this.heuristicManhattan(h,s),h.g=c,h.f=h.g+h.h,e.markDirty(h),n&&(h.h<r.h||h.h===r.h&&h.g<r.g)&&(r=h),l?i.rescoreElement(h):i.push(h))}}return n?this.pathTo(r):[]}static heuristicManhattan(e,t){return Math.abs(t.q-e.q)+Math.abs(t.r-e.r)+Math.abs(t.s-e.s)}static cleanNode(e){e.f=0,e.g=0,e.h=0,e.visited=!1,e.closed=!1,e.parent=null}}class pe{constructor(e,t,s){this.row=e,this.col=t,this.q=this.row-Math.floor(this.col/2),this.r=this.col,this.s=-this.q-this.r,this.weight=s}getCost(){return this.weight}isWall(){return 0===this.weight}}class de{constructor(e){this.nodes=[],this.grid=[];for(let t=0;t<e.length;t++){this.grid[t]=[];for(let s=0,o=e[t];s<o.length;s++){const e=new pe(t,s,o[s]);this.grid[t][s]=e,this.nodes.push(e)}}this.init()}init(){this.dirtyNodes=[];for(let e=0;e<this.nodes.length;e++)le.cleanNode(this.nodes[e])}cleanDirty(){for(let e=0;e<this.dirtyNodes.length;e++)le.cleanNode(this.dirtyNodes[e]);this.dirtyNodes=[]}markDirty(e){this.dirtyNodes.push(e)}neighbors(e){const t=[],s=e.q,o=e.r;return this.addNeighbor(t,s,o-1),this.addNeighbor(t,s+1,o-1),this.addNeighbor(t,s+1,o),this.addNeighbor(t,s,o+1),this.addNeighbor(t,s-1,o+1),this.addNeighbor(t,s-1,o),t}addNeighbor(e,t,s){const o=Z.hexToArray(t,s);this.grid[o.x]&&this.grid[o.x][o.y]&&e.push(this.grid[o.x][o.y])}}class ue extends ne{constructor(e={}){super(e,"aiMeleeChase"),this.fov=new ae,this.chaseLocation=null,this.radius=5,this.movementActions=1,this.currentMovement=0,this.hasComponent()&&(this.radius=this.loadArg("radius",5),this.movementActions=this.loadArg("movementActions",1),this.currentMovement=this.loadArg("currentMovement",0))}save(){if(this.cachedSave)return this.cachedSave;const e={aiMeleeChase:{}};return 5!==this.radius&&(e.aiMeleeChase.radius=this.radius),1!==this.movementActions&&(e.aiMeleeChase.movementActions=this.movementActions),0!==this.currentMovement&&(e.aiMeleeChase.currentMovement=this.currentMovement),this.cachedSave=e,e}perform(){const e=this.parentEntity,t=e.getComponent("hex");if(t){this.fov.compute(e,this.radius);let s=[],o=null;const n=e.getComponent("faction");if(n)for(const e of this.fov.visibleActors)if(e.isAlive()){const i=e.getComponent("faction");if(n.isEnemyOf(i)){const n=e.getComponent("hex");if(n){const i=t.distanceTo(n);null===o||i<o?(s=[],s.push(e),o=i):i===o&&s.push(e)}}}let i;if(1===s.length?i=s[0]:s.length>1&&(i=s[Math.floor(Math.random()*s.length)]),i){const e=i.getComponent("hex");if(this.chaseLocation={row:e.row,col:e.col,q:e.q,r:e.r},o<=1)return new Q(this.parentEntity,e.q-t.q,e.r-t.r).perform()}else if(null!==this.chaseLocation&&this.chaseLocation.q===t.q&&this.chaseLocation.r===t.r&&(this.chaseLocation=null),null===this.chaseLocation)return new he(this.parentEntity).perform();if(this.currentMovement+=this.movementActions,this.currentMovement>=1){const s=this.fov.right-this.fov.left,o=this.fov.bottom-this.fov.top,n=Array(s).fill().map((()=>Array(o).fill(0)));for(const e of this.fov.visibleTiles){if(e.isWall())continue;const t=e.getComponent("hex");n[t.row-this.fov.left][t.col-this.fov.top]+=10}for(const e of this.fov.visibleActors)if(e.isAlive()){const t=e.getComponent("hex");n[t.row-this.fov.left][t.col-this.fov.top]+=100}const i=new de(n),r=i.grid[t.row-this.fov.left][t.col-this.fov.top],a=i.grid[this.chaseLocation.row-this.fov.left][this.chaseLocation.col-this.fov.top];let h;if(a){const s=le.search(i,r,a);for(;this.currentMovement>=1;){if(s&&s.length>0){const o=s.shift();if(o){const s=o.row+this.fov.left-t.row,n=o.col+this.fov.top-t.col,i=Z.arrayToHex(s,n);h=new ee(e,i.q,i.r).perform()}}else h=new te(e).perform();this.currentMovement-=1}}else h=new te(e).perform(),this.currentMovement=0;return h}}}}class me extends oe{constructor(e={}){super(e,"blocksFov"),this.blocksFov=!1,this.hasComponent()&&(this.blocksFov=this.loadBooleanOrObject("blocksFov"))}save(){return this.saveBoolean(this.blocksFov,!1)}}class fe extends oe{constructor(e={}){super(e,"blocksMovement"),this.blocksMovement=!1,this.hasComponent()&&(this.blocksMovement=this.loadBooleanOrObject("blocksMovement"))}save(){return this.saveBoolean(this.blocksMovement,!1)}onEntityDeath(){this.blocksMovement=!1,this.clearSaveCache()}}class ve extends oe{constructor(e={}){super(e,"faction"),this.factions=[],this.enemies=[],this.hasComponent()&&(this.factions=this.loadArgArray("factions"),this.enemies=this.loadArgArray("enemies"))}save(){if(this.cachedSave)return this.cachedSave;const e={faction:{}};return e.faction.factions=this.factions.toString(),e.faction.enemies=this.enemies.toString(),this.cachedSave=e,e}isEnemyOf(e){if(!e)return!1;for(const t of this.factions)if(e.enemies.indexOf(t)>-1)return!0;return!1}}class ge extends oe{constructor(e){super(e,"fighter"),this.hp=0,this.maxHp=0,this.defense=0,this.power=0,this.hasComponent()&&(this.hp=this.loadArg("hp",0),this.maxHp=this.loadArg("maxHp",0),this.defense=this.loadArg("defense",0),this.power=this.loadArg("power",0))}save(){if(this.cachedSave)return this.cachedSave;const e={fighter:{}};return e.fighter.hp=this.hp,e.fighter.maxHp=this.maxHp,e.fighter.defense=this.defense,e.fighter.power=this.power,this.cachedSave=e,e}setHp(e){this.hp=Math.max(0,Math.min(e,this.maxHp))}takeDamage(e){this.hp-=e,this.hp<=0&&this.die(),this.clearSaveCache()}die(){const e=this.parentEntity;this.isPlayer()?console.log("You died!"):console.log(e.name+" dies!"),e.callEvent("onEntityDeath");const t=e.getComponent("ai");if(t){const s={components:{aiDead:{previousAI:t.type}}};e.removeComponent("ai"),e.setComponent(new ie(s))}this.clearSaveCache()}}class ye extends oe{constructor(e={}){super(e,"hex"),this.row=0,this.col=0,this.q=0,this.r=0,this.s=0,this.hasComponent()&&(this.row=this.loadArg("row",0),this.col=this.loadArg("col",0)),this.updateHexCoords()}save(){if(this.cachedSave)return this.cachedSave;const e={hex:{}};return 0!==this.row&&(e.hex.row=this.row),0!==this.col&&(e.hex.col=this.col),this.cachedSave=e,e}moveTo(e,t){this.row=e,this.col=t,this.updateHexCoords()}updateHexCoords(){this.q=this.row-Math.floor(this.col/2),this.r=this.col,this.s=-this.q-this.r}isEdge(e){return 0===this.row||0===this.col||this.row===e.rows-1||this.col===e.cols-1}getDisplayX(){return this.q+this.r/2}getDisplayY(){return this.r}getTileFromArray(e,t,s){const o=Z.hexToArray(t,s);return e[o.x]&&e[o.x][o.y]?e[o.x][o.y]:null}getNumAdjacentWalls(e){const t=this.getTileFromArray(e,this.q,this.r-1),s=this.getTileFromArray(e,this.q+1,this.r-1),o=this.getTileFromArray(e,this.q+1,this.r),n=this.getTileFromArray(e,this.q,this.r+1),i=this.getTileFromArray(e,this.q-1,this.r+1),r=this.getTileFromArray(e,this.q-1,this.r);return this.isTileWall(t)+this.isTileWall(s)+this.isTileWall(o)+this.isTileWall(n)+this.isTileWall(i)+this.isTileWall(r)}isTileWall(e){return null===e||e.isWall()?1:0}isInRange(e,t){return Math.abs(this.q-e.q)<t&&Math.abs(this.r-e.r)<t&&Math.abs(this.s-e.s)<t}distanceTo(e){const t=Math.abs(this.q-e.q),s=Math.abs(this.r-e.r),o=Math.abs(this.s-e.s);return Math.max(t,Math.max(s,o))}}const we=new class{constructor(){this.types=new Map,this.init()}init(){this.load(new ie),this.load(new ue),this.load(new me),this.load(new fe),this.load(new ve),this.load(new ge),this.load(new re),this.load(new ye)}load(e){this.types.set(e.type,e)}create(e,t,s){return new(0,this.types.get(t).constructor)(s)}};class xe{constructor(){}static extend(e){e=e||{};for(let t=1;t<arguments.length;t++)if(arguments[t])for(const s in arguments[t])Object.prototype.hasOwnProperty.call(arguments[t],s)&&(e[s]=arguments[t][s]);return e}static deep(e){e=e||{};for(let t=1;t<arguments.length;t++){const s=arguments[t];if(s)for(const t in s)Object.prototype.hasOwnProperty.call(s,t)&&("object"==typeof s[t]?s[t]instanceof Array?e[t]=s[t].slice(0):e[t]=xe.deep(e[t],s[t]):"boolean"==typeof e&&void 0===e[t]?e=s[t]:e[t]=s[t])}return e}}class be{constructor(e){this.type=e.type||"entity",this.id=e.id,this.name=e.name||"",this.description=e.description||"",this.sprite=e.sprite||"",this.letter=e.letter||"?",this.color=e.color||"#fff",this.componentArray=[],this.components={},e.components&&(this.loadComponents(e,e.components),this.callEvent("onComponentsLoaded")),this.cachedSave=null}clone(){console.error("Not implemented")}callEvent(e,t){for(const s of this.componentArray)s[e]?.(t);this[e]?.(t)}draw(){}loadComponents(e,t){const s=this;Object.keys(t).forEach((function(t){const o=we.types.get(t);if(o){const n=o.baseType;s.getComponent(n)||s.setComponent(we.create(this,t,e),!1)}}))}setComponent(e){e.parentEntity=this,this.components[e.baseType]=e,this.componentArray.push(e)}getComponent(e){return this.components[e]}removeComponent(e){if(this.components[e]){this.components[e]=void 0;for(const t of this.componentArray)if(t.baseType===e){const e=this.componentArray.indexOf(t);this.componentArray.splice(e,1);break}}}clearSaveCache(){this.cachedSave=null}save(){if(null!==this.cachedSave)return this.cachedSave;const e={id:this.id,type:this.type,name:this.name,description:this.description,sprite:this.sprite,letter:this.letter,color:this.color,components:{}};for(const t of this.componentArray){const s=t.save();null!==s&&s!=={}&&xe.deep(e.components,s)}return this.cachedSave=e,e}}class Ae extends be{constructor(e={}){e.type="actor",super(e),this.fov=new ae}clone(){return new Ae(this.save())}isAlive(){const e=this.getComponent("fighter");return e&&e.hp>0}draw(){const e=this.getComponent("hex"),t=Z.HEX_RADIUS+Z.HEX_RADIUS*(1+Math.cos(Z.HEX_A))*e.getDisplayY(),s=1.15*Z.HEX_RADIUS+2*Z.HEX_RADIUS*Math.sin(Z.HEX_A)*e.getDisplayX();super.draw(t,s),A.ctx.fillStyle=this.color||"white",A.ctx.textAlign="center",A.ctx.textBaseline="middle",A.ctx.font="bold 26px serif",A.ctx.fillText(this.letter,t,s)}setName(e){this.name=e,this.clearSaveCache()}onEntityDeath(){this.letter="%",this.color="red",this.setName("Remains of "+this.name)}}class Ce extends be{constructor(e={}){e.type="tile",super(e),this.borderColor=e.borderColor||"#000"}clone(){return new Ce(this.save())}save(){const e=super.save();return e.borderColor=this.borderColor,e}isWall(){return this.getComponent("blocksMovement")&&this.getComponent("blocksMovement").blocksMovement}draw(e,t){const s=this.getComponent("fov");s&&s.explored&&(Z.drawHex(A.ctx,e,t),this.color&&(A.ctx.fillStyle=this.color,A.ctx.fill()),A.ctx.strokeStyle=this.borderColor,A.ctx.stroke(),s.visible||(Z.drawHex(A.ctx,e,t),A.ctx.fillStyle="rgba(0, 0, 0, .25)",A.ctx.fill(),A.ctx.color="rgba(0, 0, 0, .25)",A.ctx.stroke()))}}const Me=JSON.parse('[{"id":"base_actor","type":"actor","components":{"blocksMovement":true,"hex":{"row":0,"col":0}}},{"id":"base_enemy","extends":"base_actor","components":{"faction":{"factions":"monsters","enemies":"player"}}}]'),Te=JSON.parse('[{"id":"orc","extends":"base_enemy","name":"Orc","color":"#3f7f3f","letter":"o","components":{"fighter":{"hp":10,"maxHp":10,"defense":0,"power":3},"aiMeleeChase":{}}},{"id":"troll","extends":"base_enemy","name":"Troll","color":"#007f00","letter":"T","components":{"fighter":{"hp":16,"maxHp":16,"defense":1,"power":4},"aiMeleeChase":{}}}]'),ke=JSON.parse('[{"id":"player","extends":"base_actor","name":"Player","color":"#00f","letter":"@","components":{"faction":{"factions":"player","enemies":"monsters"},"fighter":{"hp":30,"maxHp":30,"defense":2,"power":5}}}]'),Ee=JSON.parse('[{"id":"base_tile","type":"tile","components":{}}]'),Se=JSON.parse('[{"id":"base_floor","extends":"base_tile","components":{}},{"id":"cave_floor","extends":"base_floor","name":"floor","color":"#ddd","borderColor":"#999"}]'),Ne=JSON.parse('[{"id":"base_wall","extends":"base_tile","components":{"blocksMovement":true,"blocksFov":true}},{"id":"cave_wall","extends":"base_wall","name":"wall","color":"#666","borderColor":"#222"}]'),De=new class{constructor(){this.types=new Map,this.templates=new Map,this.init()}init(){this.load(new Ae),this.load(new Ce),this.loadTemplates()}load(e){this.types.set(e.type,e)}create(e,t={}){let s;if(s="object"==typeof e?e:JSON.parse(e),void 0!==s.extends){if(this.templates.has(s.extends)){const e=JSON.parse(this.templates.get(s.extends));return delete s.extends,this.create(xe.deep(e,s),t)}console.error("Json template for id '"+s.extends+"' is missing. Cannot extend from it.")}return new(this.types.get(s.type).constructor)(xe.deep(s,t))}createFromTemplate(e,t={}){return this.templates.has(e)?this.create(this.templates.get(e),t):(console.error("Json template for id '"+e+"' is missing."),null)}loadTemplate(e){for(const t of e){const e=t.id;this.templates.has(e)?console.error("Template for entity id '"+e+"' already exists."):this.templates.set(e,JSON.stringify(t))}}loadTemplates(){this.loadTemplate(Me),this.loadTemplate(Te),this.loadTemplate(ke),this.loadTemplate(Ee),this.loadTemplate(Se),this.loadTemplate(Ne)}},He=JSON.parse('[{"id":"cave","levels":[{"level":1,"actors":[{"id":"orc","weight":80},{"id":"troll","weight":20}]}]}]'),Le=new class{constructor(){this.entityGroups=new Map,this.generators=new Map,this.loadGenerator(He)}loadGenerator(e){for(const t of e)this.generators.set(t.id,t.levels)}getChancesForLevel(e,t){let s;const o=this.generators.get(e);for(const e of o){if(e.level>t)break;s=e}return s}getActorForLevel(e,t){const s=this.getChancesForLevel(e,t).actors;let o=this.getRandomFromGroup(s);for(;void 0!==o.group;){const e=this.entityGroups.get(o.group);o=this.getRandomFromGroup(e)}return o.id}getRandomFromGroup(e){let t,s=0;for(const t of e)s+=t.weight;let o=0;const n=Math.random()*s;for(const s of e)if(o+=s.weight,n<o){t=s;break}return t}};class qe extends class{constructor(e,t){this.rows=e,this.cols=t,this.init()}init(){this.tiles=class{constructor(){}static create2dArray(e){const t=[];for(let s=0;s<e;s++)t[s]=[];return t}}.create2dArray(this.rows),this.actors=[]}isInBounds(e,t){return 0<=e&&e<this.rows&&0<=t&&t<this.cols}create(){}draw(){for(let e=0;e<this.rows;e++){let t=2*Z.HEX_RADIUS+2*Z.HEX_RADIUS*Math.sin(Z.HEX_A)*e;for(let s=0;s<this.cols;s++){const o=Z.HEX_RADIUS+Z.HEX_RADIUS*(1+Math.cos(Z.HEX_A))*s;t-=(-1)**s*Z.HEX_RADIUS*Math.sin(Z.HEX_A);const n=this.tiles[e][s],i=n.getComponent("fov");i&&i.explored&&n.draw(o,t)}}for(const e of this.actors){const t=e.getComponent("hex"),s=b.gameMap.getTileFromArrayCoords(t.row,t.col).getComponent("fov");s&&s.visible&&e.draw()}}getTileFromArrayCoords(e,t){return this.tiles[e]?this.tiles[e][t]:null}getTileFromHexCoords(e,t){const s=Z.hexToArray(e,t);return this.tiles[s.x][s.y]}getTileNeighbor(e,t,s){switch(s){case 1:return this.getTileFromHexCoords(e-1,t);case 2:return this.getTileFromHexCoords(e-1,t+1);case 3:return this.getTileFromHexCoords(e,t+1);case 4:return this.getTileFromHexCoords(e+1,t);case 5:return this.getTileFromHexCoords(e+1,t-1);default:return this.getTileFromHexCoords(e,t-1)}}getBlockingActorAtArrayLocation(e,t){let s=null;for(const o of this.actors){const n=o.getComponent("hex");if(n&&e===n.row&&t===n.col){const e=o.getComponent("blocksMovement");if(e&&e.blocksMovement){s=o;break}}}return s}}{constructor(e,t){super(e,t),this.percentAreWalls=.35,this.wallEntity=De.createFromTemplate("cave_wall",{components:{hex:{row:0,col:0}}}),this.floorEntity=De.createFromTemplate("cave_floor",{components:{hex:{row:0,col:0}}}),this.create()}create(){this.randomFillBuild(),this.makeCaverns(15,0)}randomFillBuild(){const e=Math.floor(Math.random()*this.rows),t=Math.floor(Math.random()*this.cols);for(let s=0;s<this.rows;s++)for(let o=0;o<this.cols;o++){let n;n=0===s||0===o||s===this.rows-1||o===this.cols-1?this.wallEntity.clone():s===e||o===t?this.floorEntity.clone():Math.random()<this.percentAreWalls?this.wallEntity.clone():this.floorEntity.clone(),n.getComponent("hex").moveTo(s,o),this.tiles[s][o]=n}}addRandomNoise(){for(let e=0;e<this.rows;e++)for(let t=0;t<this.cols;t++)if(Math.random()<.02){const s=this.wallEntity.clone();s.getComponent("hex").moveTo(e,t),this.tiles[e][t]=s}}makeCaverns(e,t){this.addRandomNoise();for(let e=0;e<this.rows;e++)for(let t=0;t<this.cols;t++){let s;this.placeWallLogic(this.tiles[e][t]),s=this.placeWallLogic(this.tiles[e][t])?this.wallEntity.clone():this.floorEntity.clone(),s.getComponent("hex").moveTo(e,t),this.tiles[e][t]=s}e--;const s=this;e>0?t>0?(setTimeout((()=>{s.makeCaverns(e,t)}),t),b.needsRenderUpdate=!0):s.makeCaverns(e):b.needsRenderUpdate=!0}placeWallLogic(e){const t=e.getComponent("hex"),s=t.getNumAdjacentWalls(this.tiles);if(t.isEdge(this))return!0;if(e.isWall()){if(s>=2)return!0}else if(s>=4)return!0;return!1}placeEntities(e,t,s,o){const n=b.player.getComponent("hex");for(let i=0;i<this.rows;i++)for(let r=0;r<this.cols;r++){const a=this.tiles[i][r];if(!a.isWall()){const i=a.getComponent("hex");if(!n.isInRange(i,o)&&Math.random()<s){const s=Le.getActorForLevel(e,t),o=De.createFromTemplate(s,{components:{hex:{row:i.row,col:i.col}}});this.actors.push(o)}}}}}!function(){function e(){b.handleEvents(),b.needsRenderUpdate&&(A.clearAll(),b.gameMap.draw(),b.needsRenderUpdate=!1),window.requestAnimationFrame(e)}!function(){b.gameMap=new qe(35,80),b.player=De.createFromTemplate("player",{components:{hex:{row:0,col:0}}});const t=b.player.getComponent("hex");let s=!1;for(;!s;){const e=Math.floor(Math.random()*(b.gameMap.rows-8))+4,o=Math.floor(Math.random()*(b.gameMap.cols-4))+2;b.gameMap.tiles[e][o].isWall()||(t.moveTo(e,o),s=!0)}b.gameMap.actors.push(b.player),b.gameMap.placeEntities("cave",1,.03,5),b.eventHandler=new se,b.needsRenderUpdate=!0,b.player.fov.compute(b.player,5),b.player.fov.updateMap(),window.requestAnimationFrame(e)}()}()}},e=>{e(e.s=128)}]);
//# sourceMappingURL=app.753444b70c6469b0455b.js.map