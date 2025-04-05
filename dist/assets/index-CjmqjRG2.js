(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const l of o)if(l.type==="childList")for(const h of l.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&r(h)}).observe(document,{childList:!0,subtree:!0});function n(o){const l={};return o.integrity&&(l.integrity=o.integrity),o.referrerPolicy&&(l.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?l.credentials="include":o.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function r(o){if(o.ep)return;o.ep=!0;const l=n(o);fetch(o.href,l)}})();const yr=[{lat:32.497202,lng:-116.968198},{lat:32.435302,lng:-116.679407}],Ho=[{location:{lat:32.503934,lng:-116.951473}},{location:{lat:32.500272,lng:-116.936966}},{location:{lat:32.495798,lng:-116.932338}},{location:{lat:32.464595,lng:-116.91377}},{location:{lat:32.451498,lng:-116.872543}},{location:{lat:32.455584,lng:-116.831797}}],_r=[{lat:32.455584,lng:-116.831797},{lat:32.435302,lng:-116.679407}],$o=document.getElementById("search-section-btn"),zo=document.getElementById("favorites-section-btn"),Wo=document.getElementById("account-section-btn"),Go=document.getElementById("account-section"),Ko=document.getElementById("favorites-section"),qo=document.getElementById("search-section"),Jo=document.getElementById("select-route"),Xo=document.getElementById("select-route-btn"),Ir=document.getElementById("route-origin"),wr=document.getElementById("route-destiny"),Er=document.getElementById("tarif-price"),$n=document.getElementById("route-eta"),gt=document.getElementById("start-trip-btn");function ni(i){document.querySelectorAll(".sections").forEach(n=>n.classList.add("hidden")),i.classList.remove("hidden")}const Yo="#BD93F9",Qo="#F8F8F2",Zo="#282A36",ea="#44475A",ta="#6272A4",na="#4a69c6";let mt,zn,Wn,Ln=null;const ls=14;window.initMap=function(i,e){mt=new google.maps.Map(document.getElementById("map"),{center:{lat:i,lng:e},zoom:ls,disableDefaultUI:!0,styles:[{elementType:"geometry",stylers:[{color:ea}]},{elementType:"labels.icon",stylers:[{visibility:"off"}]},{elementType:"labels.text.fill",stylers:[{color:Qo}]},{elementType:"labels.text.stroke",stylers:[{color:Zo}]},{featureType:"administrative",elementType:"geometry",stylers:[{visibility:"off"}]},{featureType:"poi",elementType:"geometry",stylers:[{visibility:"off"}]},{featureType:"road",elementType:"geometry",stylers:[{color:ta}]},{featureType:"water",elementType:"geometry",stylers:[{color:na}]}]}),zn=new google.maps.DirectionsService,Wn=new google.maps.DirectionsRenderer({map:mt,suppressMarkers:!1,polylineOptions:{strokeColor:Yo,strokeWeight:5}})};function ia(){navigator.geolocation?navigator.geolocation.getCurrentPosition(ra,sa):alert("Browser not supported")}function ra(i){const e=i.coords.latitude,n=i.coords.longitude;console.log("Latitude: ",e),console.log("Longitude: ",n),initMap(e,n)}function sa(){alert("Sorry, no position available.")}async function oa(){const i=await Notification.requestPermission();console.log(i==="granted"?"Permiso para notificaciones concedido.":"Permiso denegado.")}oa();async function aa(){const e=await(await navigator.serviceWorker.ready).pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:"BBswnwYK1ainOyoSKM-kQ6Dx7-rz35pItXaKp-N_OQoRAjjl040Jax0nYE4qJDBMcdYAhIHGlcBY3OTj27Za61A"});console.log("Suscripción:",JSON.stringify(e))}aa();document.addEventListener("DOMContentLoaded",ia);Wo.addEventListener("click",()=>{ni(Go)});zo.addEventListener("click",()=>{ni(Ko)});$o.addEventListener("click",()=>{ni(qo)});let Gn=[];Xo.addEventListener("click",()=>{const i=Jo.value;i==="1"?(gt.disabled=!1,Ir.innerText="5 y 10",wr.innerText="UABC Valle",Er.innerText="$20",zn.route({origin:yr[0],destination:yr[1],waypoints:Ho,travelMode:google.maps.TravelMode.DRIVING,optimizeWaypoints:!1},(e,n)=>{if(n==="OK"){Wn.setDirections(e),Gn=e.routes[0].overview_path;const r=e.routes[0].legs.reduce((l,h)=>l+h.duration.value,0),o=Math.ceil(r/60);$n.innerText=`${o} minutos`}else alert("Error al generar la ruta: "+n)})):i==="2"&&(gt.disabled=!1,Ir.innerText="Refugio",wr.innerText="UABC Valle",Er.innerText="$20",zn.route({origin:_r[0],destination:_r[1],travelMode:google.maps.TravelMode.DRIVING,optimizeWaypoints:!1},(e,n)=>{if(n==="OK"){Wn.setDirections(e),Gn=e.routes[0].overview_path;const r=e.routes[0].legs.reduce((l,h)=>l+h.duration.value,0),o=Math.ceil(r/60);$n.innerText=`${o} minutos`}else alert("Error al generar la ruta: "+n)}))});gt.addEventListener("click",()=>{navigator.geolocation?navigator.geolocation.getCurrentPosition(i=>{const e=new google.maps.LatLng(i.coords.latitude,i.coords.longitude),n=20/111320;google.maps.geometry.poly.isLocationOnEdge(e,new google.maps.Polyline({path:Gn}),n)?(gt.disabled=!0,gt.innerText="Viaje en curso...",$n.style.color="rgb(15, 203, 15)",navigator.geolocation.watchPosition(o=>{const l={lat:o.coords.latitude,lng:o.coords.longitude};Ln?Ln.setPosition(l):Ln=new google.maps.Marker({position:l,map:mt,title:"Tu ubicación",icon:{path:google.maps.SymbolPath.CIRCLE,scale:7,fillColor:"#00BFFF",fillOpacity:1,strokeColor:"#ffffff",strokeWeight:2}}),mt.setCenter(l),mt.setZoom(ls)},o=>{console.error("Error al obtener ubicación:",o)},{enableHighAccuracy:!0,maximumAge:0,timeout:5e3})):alert("Debes estar dentro de 20 metros de la ruta para iniciar el viaje.")},i=>{console.error("Error al obtener ubicación:",i),alert("No se pudo obtener tu ubicación.")},{enableHighAccuracy:!0,maximumAge:0,timeout:5e3}):alert("Geolocalización no soportada en este navegador.")});const la=()=>{};var Tr={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cs=function(i){const e=[];let n=0;for(let r=0;r<i.length;r++){let o=i.charCodeAt(r);o<128?e[n++]=o:o<2048?(e[n++]=o>>6|192,e[n++]=o&63|128):(o&64512)===55296&&r+1<i.length&&(i.charCodeAt(r+1)&64512)===56320?(o=65536+((o&1023)<<10)+(i.charCodeAt(++r)&1023),e[n++]=o>>18|240,e[n++]=o>>12&63|128,e[n++]=o>>6&63|128,e[n++]=o&63|128):(e[n++]=o>>12|224,e[n++]=o>>6&63|128,e[n++]=o&63|128)}return e},ca=function(i){const e=[];let n=0,r=0;for(;n<i.length;){const o=i[n++];if(o<128)e[r++]=String.fromCharCode(o);else if(o>191&&o<224){const l=i[n++];e[r++]=String.fromCharCode((o&31)<<6|l&63)}else if(o>239&&o<365){const l=i[n++],h=i[n++],y=i[n++],w=((o&7)<<18|(l&63)<<12|(h&63)<<6|y&63)-65536;e[r++]=String.fromCharCode(55296+(w>>10)),e[r++]=String.fromCharCode(56320+(w&1023))}else{const l=i[n++],h=i[n++];e[r++]=String.fromCharCode((o&15)<<12|(l&63)<<6|h&63)}}return e.join("")},hs={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(i,e){if(!Array.isArray(i))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let o=0;o<i.length;o+=3){const l=i[o],h=o+1<i.length,y=h?i[o+1]:0,w=o+2<i.length,E=w?i[o+2]:0,A=l>>2,S=(l&3)<<4|y>>4;let k=(y&15)<<2|E>>6,x=E&63;w||(x=64,h||(k=64)),r.push(n[A],n[S],n[k],n[x])}return r.join("")},encodeString(i,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(i):this.encodeByteArray(cs(i),e)},decodeString(i,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(i):ca(this.decodeStringToByteArray(i,e))},decodeStringToByteArray(i,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let o=0;o<i.length;){const l=n[i.charAt(o++)],y=o<i.length?n[i.charAt(o)]:0;++o;const E=o<i.length?n[i.charAt(o)]:64;++o;const S=o<i.length?n[i.charAt(o)]:64;if(++o,l==null||y==null||E==null||S==null)throw new ha;const k=l<<2|y>>4;if(r.push(k),E!==64){const x=y<<4&240|E>>2;if(r.push(x),S!==64){const P=E<<6&192|S;r.push(P)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let i=0;i<this.ENCODED_VALS.length;i++)this.byteToCharMap_[i]=this.ENCODED_VALS.charAt(i),this.charToByteMap_[this.byteToCharMap_[i]]=i,this.byteToCharMapWebSafe_[i]=this.ENCODED_VALS_WEBSAFE.charAt(i),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[i]]=i,i>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(i)]=i,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(i)]=i)}}};class ha extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const ua=function(i){const e=cs(i);return hs.encodeByteArray(e,!0)},Xt=function(i){return ua(i).replace(/\./g,"")},us=function(i){try{return hs.decodeString(i,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function da(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fa=()=>da().__FIREBASE_DEFAULTS__,pa=()=>{if(typeof process>"u"||typeof Tr>"u")return;const i=Tr.__FIREBASE_DEFAULTS__;if(i)return JSON.parse(i)},ga=()=>{if(typeof document>"u")return;let i;try{i=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=i&&us(i[1]);return e&&JSON.parse(e)},ii=()=>{try{return la()||fa()||pa()||ga()}catch(i){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${i}`);return}},ds=i=>{var e,n;return(n=(e=ii())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[i]},ma=i=>{const e=ds(i);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),r]:[e.substring(0,n),r]},fs=()=>{var i;return(i=ii())===null||i===void 0?void 0:i.config},ps=i=>{var e;return(e=ii())===null||e===void 0?void 0:e[`_${i}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class va{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ya(i,e){if(i.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=e||"demo-project",o=i.iat||0,l=i.sub||i.user_id;if(!l)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const h=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:o,exp:o+3600,auth_time:o,sub:l,user_id:l,firebase:{sign_in_provider:"custom",identities:{}}},i);return[Xt(JSON.stringify(n)),Xt(JSON.stringify(h)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function K(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function _a(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(K())}function Ia(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function wa(){const i=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof i=="object"&&i.id!==void 0}function Ea(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Ta(){const i=K();return i.indexOf("MSIE ")>=0||i.indexOf("Trident/")>=0}function ba(){try{return typeof indexedDB=="object"}catch{return!1}}function Aa(){return new Promise((i,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",o=self.indexedDB.open(r);o.onsuccess=()=>{o.result.close(),n||self.indexedDB.deleteDatabase(r),i(!0)},o.onupgradeneeded=()=>{n=!1},o.onerror=()=>{var l;e(((l=o.error)===null||l===void 0?void 0:l.message)||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sa="FirebaseError";class ge extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=Sa,Object.setPrototypeOf(this,ge.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Et.prototype.create)}}class Et{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},o=`${this.service}/${e}`,l=this.errors[e],h=l?ka(l,r):"Error",y=`${this.serviceName}: ${h} (${o}).`;return new ge(o,y,r)}}function ka(i,e){return i.replace(Ca,(n,r)=>{const o=e[r];return o!=null?String(o):`<${r}?>`})}const Ca=/\{\$([^}]+)}/g;function Pa(i){for(const e in i)if(Object.prototype.hasOwnProperty.call(i,e))return!1;return!0}function Le(i,e){if(i===e)return!0;const n=Object.keys(i),r=Object.keys(e);for(const o of n){if(!r.includes(o))return!1;const l=i[o],h=e[o];if(br(l)&&br(h)){if(!Le(l,h))return!1}else if(l!==h)return!1}for(const o of r)if(!n.includes(o))return!1;return!0}function br(i){return i!==null&&typeof i=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tt(i){const e=[];for(const[n,r]of Object.entries(i))Array.isArray(r)?r.forEach(o=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(o))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Ra(i,e){const n=new Oa(i,e);return n.subscribe.bind(n)}class Oa{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,r){let o;if(e===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");Da(e,["next","error","complete"])?o=e:o={next:e,error:n,complete:r},o.next===void 0&&(o.next=Mn),o.error===void 0&&(o.error=Mn),o.complete===void 0&&(o.complete=Mn);const l=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?o.error(this.finalError):o.complete()}catch{}}),this.observers.push(o),l}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Da(i,e){if(typeof i!="object"||i===null)return!1;for(const n of e)if(n in i&&typeof i[n]=="function")return!0;return!1}function Mn(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Je(i){return i&&i._delegate?i._delegate:i}class Me{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const De="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Na{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new va;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const o=this.getOrInitializeService({instanceIdentifier:n});o&&r.resolve(o)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),o=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(l){if(o)return null;throw l}else{if(o)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Ma(e))try{this.getOrInitializeService({instanceIdentifier:De})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const o=this.normalizeInstanceIdentifier(n);try{const l=this.getOrInitializeService({instanceIdentifier:o});r.resolve(l)}catch{}}}}clearInstance(e=De){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=De){return this.instances.has(e)}getOptions(e=De){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const o=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[l,h]of this.instancesDeferred.entries()){const y=this.normalizeInstanceIdentifier(l);r===y&&h.resolve(o)}return o}onInit(e,n){var r;const o=this.normalizeInstanceIdentifier(n),l=(r=this.onInitCallbacks.get(o))!==null&&r!==void 0?r:new Set;l.add(e),this.onInitCallbacks.set(o,l);const h=this.instances.get(o);return h&&e(h,o),()=>{l.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const o of r)try{o(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:La(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=De){return this.component?this.component.multipleInstances?e:De:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function La(i){return i===De?void 0:i}function Ma(i){return i.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ua{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new Na(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var O;(function(i){i[i.DEBUG=0]="DEBUG",i[i.VERBOSE=1]="VERBOSE",i[i.INFO=2]="INFO",i[i.WARN=3]="WARN",i[i.ERROR=4]="ERROR",i[i.SILENT=5]="SILENT"})(O||(O={}));const xa={debug:O.DEBUG,verbose:O.VERBOSE,info:O.INFO,warn:O.WARN,error:O.ERROR,silent:O.SILENT},Fa=O.INFO,ja={[O.DEBUG]:"log",[O.VERBOSE]:"log",[O.INFO]:"info",[O.WARN]:"warn",[O.ERROR]:"error"},Ba=(i,e,...n)=>{if(e<i.logLevel)return;const r=new Date().toISOString(),o=ja[e];if(o)console[o](`[${r}]  ${i.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class ri{constructor(e){this.name=e,this._logLevel=Fa,this._logHandler=Ba,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in O))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?xa[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,O.DEBUG,...e),this._logHandler(this,O.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,O.VERBOSE,...e),this._logHandler(this,O.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,O.INFO,...e),this._logHandler(this,O.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,O.WARN,...e),this._logHandler(this,O.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,O.ERROR,...e),this._logHandler(this,O.ERROR,...e)}}const Va=(i,e)=>e.some(n=>i instanceof n);let Ar,Sr;function Ha(){return Ar||(Ar=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function $a(){return Sr||(Sr=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const gs=new WeakMap,Kn=new WeakMap,ms=new WeakMap,Un=new WeakMap,si=new WeakMap;function za(i){const e=new Promise((n,r)=>{const o=()=>{i.removeEventListener("success",l),i.removeEventListener("error",h)},l=()=>{n(Ae(i.result)),o()},h=()=>{r(i.error),o()};i.addEventListener("success",l),i.addEventListener("error",h)});return e.then(n=>{n instanceof IDBCursor&&gs.set(n,i)}).catch(()=>{}),si.set(e,i),e}function Wa(i){if(Kn.has(i))return;const e=new Promise((n,r)=>{const o=()=>{i.removeEventListener("complete",l),i.removeEventListener("error",h),i.removeEventListener("abort",h)},l=()=>{n(),o()},h=()=>{r(i.error||new DOMException("AbortError","AbortError")),o()};i.addEventListener("complete",l),i.addEventListener("error",h),i.addEventListener("abort",h)});Kn.set(i,e)}let qn={get(i,e,n){if(i instanceof IDBTransaction){if(e==="done")return Kn.get(i);if(e==="objectStoreNames")return i.objectStoreNames||ms.get(i);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Ae(i[e])},set(i,e,n){return i[e]=n,!0},has(i,e){return i instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in i}};function Ga(i){qn=i(qn)}function Ka(i){return i===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=i.call(xn(this),e,...n);return ms.set(r,e.sort?e.sort():[e]),Ae(r)}:$a().includes(i)?function(...e){return i.apply(xn(this),e),Ae(gs.get(this))}:function(...e){return Ae(i.apply(xn(this),e))}}function qa(i){return typeof i=="function"?Ka(i):(i instanceof IDBTransaction&&Wa(i),Va(i,Ha())?new Proxy(i,qn):i)}function Ae(i){if(i instanceof IDBRequest)return za(i);if(Un.has(i))return Un.get(i);const e=qa(i);return e!==i&&(Un.set(i,e),si.set(e,i)),e}const xn=i=>si.get(i);function Ja(i,e,{blocked:n,upgrade:r,blocking:o,terminated:l}={}){const h=indexedDB.open(i,e),y=Ae(h);return r&&h.addEventListener("upgradeneeded",w=>{r(Ae(h.result),w.oldVersion,w.newVersion,Ae(h.transaction),w)}),n&&h.addEventListener("blocked",w=>n(w.oldVersion,w.newVersion,w)),y.then(w=>{l&&w.addEventListener("close",()=>l()),o&&w.addEventListener("versionchange",E=>o(E.oldVersion,E.newVersion,E))}).catch(()=>{}),y}const Xa=["get","getKey","getAll","getAllKeys","count"],Ya=["put","add","delete","clear"],Fn=new Map;function kr(i,e){if(!(i instanceof IDBDatabase&&!(e in i)&&typeof e=="string"))return;if(Fn.get(e))return Fn.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,o=Ya.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(o||Xa.includes(n)))return;const l=async function(h,...y){const w=this.transaction(h,o?"readwrite":"readonly");let E=w.store;return r&&(E=E.index(y.shift())),(await Promise.all([E[n](...y),o&&w.done]))[0]};return Fn.set(e,l),l}Ga(i=>({...i,get:(e,n,r)=>kr(e,n)||i.get(e,n,r),has:(e,n)=>!!kr(e,n)||i.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qa{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(Za(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function Za(i){const e=i.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Jn="@firebase/app",Cr="0.11.4";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const de=new ri("@firebase/app"),el="@firebase/app-compat",tl="@firebase/analytics-compat",nl="@firebase/analytics",il="@firebase/app-check-compat",rl="@firebase/app-check",sl="@firebase/auth",ol="@firebase/auth-compat",al="@firebase/database",ll="@firebase/data-connect",cl="@firebase/database-compat",hl="@firebase/functions",ul="@firebase/functions-compat",dl="@firebase/installations",fl="@firebase/installations-compat",pl="@firebase/messaging",gl="@firebase/messaging-compat",ml="@firebase/performance",vl="@firebase/performance-compat",yl="@firebase/remote-config",_l="@firebase/remote-config-compat",Il="@firebase/storage",wl="@firebase/storage-compat",El="@firebase/firestore",Tl="@firebase/vertexai",bl="@firebase/firestore-compat",Al="firebase",Sl="11.6.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xn="[DEFAULT]",kl={[Jn]:"fire-core",[el]:"fire-core-compat",[nl]:"fire-analytics",[tl]:"fire-analytics-compat",[rl]:"fire-app-check",[il]:"fire-app-check-compat",[sl]:"fire-auth",[ol]:"fire-auth-compat",[al]:"fire-rtdb",[ll]:"fire-data-connect",[cl]:"fire-rtdb-compat",[hl]:"fire-fn",[ul]:"fire-fn-compat",[dl]:"fire-iid",[fl]:"fire-iid-compat",[pl]:"fire-fcm",[gl]:"fire-fcm-compat",[ml]:"fire-perf",[vl]:"fire-perf-compat",[yl]:"fire-rc",[_l]:"fire-rc-compat",[Il]:"fire-gcs",[wl]:"fire-gcs-compat",[El]:"fire-fst",[bl]:"fire-fst-compat",[Tl]:"fire-vertex","fire-js":"fire-js",[Al]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yt=new Map,Cl=new Map,Yn=new Map;function Pr(i,e){try{i.container.addComponent(e)}catch(n){de.debug(`Component ${e.name} failed to register with FirebaseApp ${i.name}`,n)}}function Ge(i){const e=i.name;if(Yn.has(e))return de.debug(`There were multiple attempts to register component ${e}.`),!1;Yn.set(e,i);for(const n of Yt.values())Pr(n,i);for(const n of Cl.values())Pr(n,i);return!0}function oi(i,e){const n=i.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),i.container.getProvider(e)}function ie(i){return i==null?!1:i.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pl={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Se=new Et("app","Firebase",Pl);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rl{constructor(e,n,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Me("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Se.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xe=Sl;function vs(i,e={}){let n=i;typeof e!="object"&&(e={name:e});const r=Object.assign({name:Xn,automaticDataCollectionEnabled:!1},e),o=r.name;if(typeof o!="string"||!o)throw Se.create("bad-app-name",{appName:String(o)});if(n||(n=fs()),!n)throw Se.create("no-options");const l=Yt.get(o);if(l){if(Le(n,l.options)&&Le(r,l.config))return l;throw Se.create("duplicate-app",{appName:o})}const h=new Ua(o);for(const w of Yn.values())h.addComponent(w);const y=new Rl(n,r,h);return Yt.set(o,y),y}function ys(i=Xn){const e=Yt.get(i);if(!e&&i===Xn&&fs())return vs();if(!e)throw Se.create("no-app",{appName:i});return e}function ke(i,e,n){var r;let o=(r=kl[i])!==null&&r!==void 0?r:i;n&&(o+=`-${n}`);const l=o.match(/\s|\//),h=e.match(/\s|\//);if(l||h){const y=[`Unable to register library "${o}" with version "${e}":`];l&&y.push(`library name "${o}" contains illegal characters (whitespace or "/")`),l&&h&&y.push("and"),h&&y.push(`version name "${e}" contains illegal characters (whitespace or "/")`),de.warn(y.join(" "));return}Ge(new Me(`${o}-version`,()=>({library:o,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ol="firebase-heartbeat-database",Dl=1,It="firebase-heartbeat-store";let jn=null;function _s(){return jn||(jn=Ja(Ol,Dl,{upgrade:(i,e)=>{switch(e){case 0:try{i.createObjectStore(It)}catch(n){console.warn(n)}}}}).catch(i=>{throw Se.create("idb-open",{originalErrorMessage:i.message})})),jn}async function Nl(i){try{const n=(await _s()).transaction(It),r=await n.objectStore(It).get(Is(i));return await n.done,r}catch(e){if(e instanceof ge)de.warn(e.message);else{const n=Se.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});de.warn(n.message)}}}async function Rr(i,e){try{const r=(await _s()).transaction(It,"readwrite");await r.objectStore(It).put(e,Is(i)),await r.done}catch(n){if(n instanceof ge)de.warn(n.message);else{const r=Se.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});de.warn(r.message)}}}function Is(i){return`${i.name}!${i.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ll=1024,Ml=30;class Ul{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new Fl(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,n;try{const o=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),l=Or();if(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===l||this._heartbeatsCache.heartbeats.some(h=>h.date===l))return;if(this._heartbeatsCache.heartbeats.push({date:l,agent:o}),this._heartbeatsCache.heartbeats.length>Ml){const h=jl(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(h,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){de.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=Or(),{heartbeatsToSend:r,unsentEntries:o}=xl(this._heartbeatsCache.heartbeats),l=Xt(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,o.length>0?(this._heartbeatsCache.heartbeats=o,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),l}catch(n){return de.warn(n),""}}}function Or(){return new Date().toISOString().substring(0,10)}function xl(i,e=Ll){const n=[];let r=i.slice();for(const o of i){const l=n.find(h=>h.agent===o.agent);if(l){if(l.dates.push(o.date),Dr(n)>e){l.dates.pop();break}}else if(n.push({agent:o.agent,dates:[o.date]}),Dr(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class Fl{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return ba()?Aa().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await Nl(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const o=await this.read();return Rr(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:o.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const o=await this.read();return Rr(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:o.lastSentHeartbeatDate,heartbeats:[...o.heartbeats,...e.heartbeats]})}else return}}function Dr(i){return Xt(JSON.stringify({version:2,heartbeats:i})).length}function jl(i){if(i.length===0)return-1;let e=0,n=i[0].date;for(let r=1;r<i.length;r++)i[r].date<n&&(n=i[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bl(i){Ge(new Me("platform-logger",e=>new Qa(e),"PRIVATE")),Ge(new Me("heartbeat",e=>new Ul(e),"PRIVATE")),ke(Jn,Cr,i),ke(Jn,Cr,"esm2017"),ke("fire-js","")}Bl("");var Vl="firebase",Hl="11.6.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ke(Vl,Hl,"app");function ai(i,e){var n={};for(var r in i)Object.prototype.hasOwnProperty.call(i,r)&&e.indexOf(r)<0&&(n[r]=i[r]);if(i!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,r=Object.getOwnPropertySymbols(i);o<r.length;o++)e.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(i,r[o])&&(n[r[o]]=i[r[o]]);return n}function ws(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const $l=ws,Es=new Et("auth","Firebase",ws());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qt=new ri("@firebase/auth");function zl(i,...e){Qt.logLevel<=O.WARN&&Qt.warn(`Auth (${Xe}): ${i}`,...e)}function Gt(i,...e){Qt.logLevel<=O.ERROR&&Qt.error(`Auth (${Xe}): ${i}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fe(i,...e){throw li(i,...e)}function re(i,...e){return li(i,...e)}function Ts(i,e,n){const r=Object.assign(Object.assign({},$l()),{[e]:n});return new Et("auth","Firebase",r).create(e,{appName:i.name})}function Ne(i){return Ts(i,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function li(i,...e){if(typeof i!="string"){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=i.name),i._errorFactory.create(n,...r)}return Es.create(i,...e)}function b(i,e,...n){if(!i)throw li(e,...n)}function he(i){const e="INTERNAL ASSERTION FAILED: "+i;throw Gt(e),new Error(e)}function pe(i,e){i||he(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qn(){var i;return typeof self<"u"&&((i=self.location)===null||i===void 0?void 0:i.href)||""}function Wl(){return Nr()==="http:"||Nr()==="https:"}function Nr(){var i;return typeof self<"u"&&((i=self.location)===null||i===void 0?void 0:i.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gl(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Wl()||wa()||"connection"in navigator)?navigator.onLine:!0}function Kl(){if(typeof navigator>"u")return null;const i=navigator;return i.languages&&i.languages[0]||i.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bt{constructor(e,n){this.shortDelay=e,this.longDelay=n,pe(n>e,"Short delay should be less than long delay!"),this.isMobile=_a()||Ea()}get(){return Gl()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ci(i,e){pe(i.emulator,"Emulator should always be set here");const{url:n}=i.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bs{static initialize(e,n,r){this.fetchImpl=e,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;he("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;he("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;he("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ql={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jl=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],Xl=new bt(3e4,6e4);function hi(i,e){return i.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:i.tenantId}):e}async function Ye(i,e,n,r,o={}){return As(i,o,async()=>{let l={},h={};r&&(e==="GET"?h=r:l={body:JSON.stringify(r)});const y=Tt(Object.assign({key:i.config.apiKey},h)).slice(1),w=await i._getAdditionalHeaders();w["Content-Type"]="application/json",i.languageCode&&(w["X-Firebase-Locale"]=i.languageCode);const E=Object.assign({method:e,headers:w},l);return Ia()||(E.referrerPolicy="no-referrer"),bs.fetch()(await Ss(i,i.config.apiHost,n,y),E)})}async function As(i,e,n){i._canInitEmulator=!1;const r=Object.assign(Object.assign({},ql),e);try{const o=new Ql(i),l=await Promise.race([n(),o.promise]);o.clearNetworkTimeout();const h=await l.json();if("needConfirmation"in h)throw zt(i,"account-exists-with-different-credential",h);if(l.ok&&!("errorMessage"in h))return h;{const y=l.ok?h.errorMessage:h.error.message,[w,E]=y.split(" : ");if(w==="FEDERATED_USER_ID_ALREADY_LINKED")throw zt(i,"credential-already-in-use",h);if(w==="EMAIL_EXISTS")throw zt(i,"email-already-in-use",h);if(w==="USER_DISABLED")throw zt(i,"user-disabled",h);const A=r[w]||w.toLowerCase().replace(/[_\s]+/g,"-");if(E)throw Ts(i,A,E);fe(i,A)}}catch(o){if(o instanceof ge)throw o;fe(i,"network-request-failed",{message:String(o)})}}async function Yl(i,e,n,r,o={}){const l=await Ye(i,e,n,r,o);return"mfaPendingCredential"in l&&fe(i,"multi-factor-auth-required",{_serverResponse:l}),l}async function Ss(i,e,n,r){const o=`${e}${n}?${r}`,l=i,h=l.config.emulator?ci(i.config,o):`${i.config.apiScheme}://${o}`;return Jl.includes(n)&&(await l._persistenceManagerAvailable,l._getPersistenceType()==="COOKIE")?l._getPersistence()._getFinalTarget(h).toString():h}class Ql{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(re(this.auth,"network-request-failed")),Xl.get())})}}function zt(i,e,n){const r={appName:i.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const o=re(i,e,r);return o.customData._tokenResponse=n,o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Zl(i,e){return Ye(i,"POST","/v1/accounts:delete",e)}async function Zt(i,e){return Ye(i,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vt(i){if(i)try{const e=new Date(Number(i));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function ec(i,e=!1){const n=Je(i),r=await n.getIdToken(e),o=ui(r);b(o&&o.exp&&o.auth_time&&o.iat,n.auth,"internal-error");const l=typeof o.firebase=="object"?o.firebase:void 0,h=l==null?void 0:l.sign_in_provider;return{claims:o,token:r,authTime:vt(Bn(o.auth_time)),issuedAtTime:vt(Bn(o.iat)),expirationTime:vt(Bn(o.exp)),signInProvider:h||null,signInSecondFactor:(l==null?void 0:l.sign_in_second_factor)||null}}function Bn(i){return Number(i)*1e3}function ui(i){const[e,n,r]=i.split(".");if(e===void 0||n===void 0||r===void 0)return Gt("JWT malformed, contained fewer than 3 sections"),null;try{const o=us(n);return o?JSON.parse(o):(Gt("Failed to decode base64 JWT payload"),null)}catch(o){return Gt("Caught error parsing JWT payload as JSON",o==null?void 0:o.toString()),null}}function Lr(i){const e=ui(i);return b(e,"internal-error"),b(typeof e.exp<"u","internal-error"),b(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function wt(i,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof ge&&tc(r)&&i.auth.currentUser===i&&await i.auth.signOut(),r}}function tc({code:i}){return i==="auth/user-disabled"||i==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nc{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const o=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,o)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zn{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=vt(this.lastLoginAt),this.creationTime=vt(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function en(i){var e;const n=i.auth,r=await i.getIdToken(),o=await wt(i,Zt(n,{idToken:r}));b(o==null?void 0:o.users.length,n,"internal-error");const l=o.users[0];i._notifyReloadListener(l);const h=!((e=l.providerUserInfo)===null||e===void 0)&&e.length?ks(l.providerUserInfo):[],y=rc(i.providerData,h),w=i.isAnonymous,E=!(i.email&&l.passwordHash)&&!(y!=null&&y.length),A=w?E:!1,S={uid:l.localId,displayName:l.displayName||null,photoURL:l.photoUrl||null,email:l.email||null,emailVerified:l.emailVerified||!1,phoneNumber:l.phoneNumber||null,tenantId:l.tenantId||null,providerData:y,metadata:new Zn(l.createdAt,l.lastLoginAt),isAnonymous:A};Object.assign(i,S)}async function ic(i){const e=Je(i);await en(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function rc(i,e){return[...i.filter(r=>!e.some(o=>o.providerId===r.providerId)),...e]}function ks(i){return i.map(e=>{var{providerId:n}=e,r=ai(e,["providerId"]);return{providerId:n,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function sc(i,e){const n=await As(i,{},async()=>{const r=Tt({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:o,apiKey:l}=i.config,h=await Ss(i,o,"/v1/token",`key=${l}`),y=await i._getAdditionalHeaders();return y["Content-Type"]="application/x-www-form-urlencoded",bs.fetch()(h,{method:"POST",headers:y,body:r})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function oc(i,e){return Ye(i,"POST","/v2/accounts:revokeToken",hi(i,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $e{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){b(e.idToken,"internal-error"),b(typeof e.idToken<"u","internal-error"),b(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Lr(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){b(e.length!==0,"internal-error");const n=Lr(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(b(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:r,refreshToken:o,expiresIn:l}=await sc(e,n);this.updateTokensAndExpiration(r,o,Number(l))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){const{refreshToken:r,accessToken:o,expirationTime:l}=n,h=new $e;return r&&(b(typeof r=="string","internal-error",{appName:e}),h.refreshToken=r),o&&(b(typeof o=="string","internal-error",{appName:e}),h.accessToken=o),l&&(b(typeof l=="number","internal-error",{appName:e}),h.expirationTime=l),h}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new $e,this.toJSON())}_performRefresh(){return he("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ie(i,e){b(typeof i=="string"||typeof i>"u","internal-error",{appName:e})}class te{constructor(e){var{uid:n,auth:r,stsTokenManager:o}=e,l=ai(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new nc(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=r,this.stsTokenManager=o,this.accessToken=o.accessToken,this.displayName=l.displayName||null,this.email=l.email||null,this.emailVerified=l.emailVerified||!1,this.phoneNumber=l.phoneNumber||null,this.photoURL=l.photoURL||null,this.isAnonymous=l.isAnonymous||!1,this.tenantId=l.tenantId||null,this.providerData=l.providerData?[...l.providerData]:[],this.metadata=new Zn(l.createdAt||void 0,l.lastLoginAt||void 0)}async getIdToken(e){const n=await wt(this,this.stsTokenManager.getToken(this.auth,e));return b(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return ec(this,e)}reload(){return ic(this)}_assign(e){this!==e&&(b(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new te(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return n.metadata._copy(this.metadata),n}_onReload(e){b(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await en(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(ie(this.auth.app))return Promise.reject(Ne(this.auth));const e=await this.getIdToken();return await wt(this,Zl(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var r,o,l,h,y,w,E,A;const S=(r=n.displayName)!==null&&r!==void 0?r:void 0,k=(o=n.email)!==null&&o!==void 0?o:void 0,x=(l=n.phoneNumber)!==null&&l!==void 0?l:void 0,P=(h=n.photoURL)!==null&&h!==void 0?h:void 0,U=(y=n.tenantId)!==null&&y!==void 0?y:void 0,L=(w=n._redirectEventId)!==null&&w!==void 0?w:void 0,oe=(E=n.createdAt)!==null&&E!==void 0?E:void 0,Y=(A=n.lastLoginAt)!==null&&A!==void 0?A:void 0,{uid:j,emailVerified:Z,isAnonymous:Ce,providerData:q,stsTokenManager:m}=n;b(j&&m,e,"internal-error");const u=$e.fromJSON(this.name,m);b(typeof j=="string",e,"internal-error"),Ie(S,e.name),Ie(k,e.name),b(typeof Z=="boolean",e,"internal-error"),b(typeof Ce=="boolean",e,"internal-error"),Ie(x,e.name),Ie(P,e.name),Ie(U,e.name),Ie(L,e.name),Ie(oe,e.name),Ie(Y,e.name);const f=new te({uid:j,auth:e,email:k,emailVerified:Z,displayName:S,isAnonymous:Ce,photoURL:P,phoneNumber:x,tenantId:U,stsTokenManager:u,createdAt:oe,lastLoginAt:Y});return q&&Array.isArray(q)&&(f.providerData=q.map(p=>Object.assign({},p))),L&&(f._redirectEventId=L),f}static async _fromIdTokenResponse(e,n,r=!1){const o=new $e;o.updateFromServerResponse(n);const l=new te({uid:n.localId,auth:e,stsTokenManager:o,isAnonymous:r});return await en(l),l}static async _fromGetAccountInfoResponse(e,n,r){const o=n.users[0];b(o.localId!==void 0,"internal-error");const l=o.providerUserInfo!==void 0?ks(o.providerUserInfo):[],h=!(o.email&&o.passwordHash)&&!(l!=null&&l.length),y=new $e;y.updateFromIdToken(r);const w=new te({uid:o.localId,auth:e,stsTokenManager:y,isAnonymous:h}),E={uid:o.localId,displayName:o.displayName||null,photoURL:o.photoUrl||null,email:o.email||null,emailVerified:o.emailVerified||!1,phoneNumber:o.phoneNumber||null,tenantId:o.tenantId||null,providerData:l,metadata:new Zn(o.createdAt,o.lastLoginAt),isAnonymous:!(o.email&&o.passwordHash)&&!(l!=null&&l.length)};return Object.assign(w,E),w}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mr=new Map;function ue(i){pe(i instanceof Function,"Expected a class definition");let e=Mr.get(i);return e?(pe(e instanceof i,"Instance stored in cache mismatched with class"),e):(e=new i,Mr.set(i,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cs{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}Cs.type="NONE";const Ur=Cs;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kt(i,e,n){return`firebase:${i}:${e}:${n}`}class ze{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;const{config:o,name:l}=this.auth;this.fullUserKey=Kt(this.userKey,o.apiKey,l),this.fullPersistenceKey=Kt("persistence",o.apiKey,l),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const n=await Zt(this.auth,{idToken:e}).catch(()=>{});return n?te._fromGetAccountInfoResponse(this.auth,n,e):null}return te._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new ze(ue(Ur),e,r);const o=(await Promise.all(n.map(async E=>{if(await E._isAvailable())return E}))).filter(E=>E);let l=o[0]||ue(Ur);const h=Kt(r,e.config.apiKey,e.name);let y=null;for(const E of n)try{const A=await E._get(h);if(A){let S;if(typeof A=="string"){const k=await Zt(e,{idToken:A}).catch(()=>{});if(!k)break;S=await te._fromGetAccountInfoResponse(e,k,A)}else S=te._fromJSON(e,A);E!==l&&(y=S),l=E;break}}catch{}const w=o.filter(E=>E._shouldAllowMigration);return!l._shouldAllowMigration||!w.length?new ze(l,e,r):(l=w[0],y&&await l._set(h,y.toJSON()),await Promise.all(n.map(async E=>{if(E!==l)try{await E._remove(h)}catch{}})),new ze(l,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xr(i){const e=i.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Ds(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Ps(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Ls(e))return"Blackberry";if(Ms(e))return"Webos";if(Rs(e))return"Safari";if((e.includes("chrome/")||Os(e))&&!e.includes("edge/"))return"Chrome";if(Ns(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=i.match(n);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function Ps(i=K()){return/firefox\//i.test(i)}function Rs(i=K()){const e=i.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Os(i=K()){return/crios\//i.test(i)}function Ds(i=K()){return/iemobile/i.test(i)}function Ns(i=K()){return/android/i.test(i)}function Ls(i=K()){return/blackberry/i.test(i)}function Ms(i=K()){return/webos/i.test(i)}function di(i=K()){return/iphone|ipad|ipod/i.test(i)||/macintosh/i.test(i)&&/mobile/i.test(i)}function ac(i=K()){var e;return di(i)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function lc(){return Ta()&&document.documentMode===10}function Us(i=K()){return di(i)||Ns(i)||Ms(i)||Ls(i)||/windows phone/i.test(i)||Ds(i)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xs(i,e=[]){let n;switch(i){case"Browser":n=xr(K());break;case"Worker":n=`${xr(K())}-${i}`;break;default:n=i}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${Xe}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cc{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const r=l=>new Promise((h,y)=>{try{const w=e(l);h(w)}catch(w){y(w)}});r.onAbort=n,this.queue.push(r);const o=this.queue.length-1;return()=>{this.queue[o]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const r of this.queue)await r(e),r.onAbort&&n.push(r.onAbort)}catch(r){n.reverse();for(const o of n)try{o()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function hc(i,e={}){return Ye(i,"GET","/v2/passwordPolicy",hi(i,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uc=6;class dc{constructor(e){var n,r,o,l;const h=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(n=h.minPasswordLength)!==null&&n!==void 0?n:uc,h.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=h.maxPasswordLength),h.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=h.containsLowercaseCharacter),h.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=h.containsUppercaseCharacter),h.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=h.containsNumericCharacter),h.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=h.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(o=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&o!==void 0?o:"",this.forceUpgradeOnSignin=(l=e.forceUpgradeOnSignin)!==null&&l!==void 0?l:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var n,r,o,l,h,y;const w={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,w),this.validatePasswordCharacterOptions(e,w),w.isValid&&(w.isValid=(n=w.meetsMinPasswordLength)!==null&&n!==void 0?n:!0),w.isValid&&(w.isValid=(r=w.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),w.isValid&&(w.isValid=(o=w.containsLowercaseLetter)!==null&&o!==void 0?o:!0),w.isValid&&(w.isValid=(l=w.containsUppercaseLetter)!==null&&l!==void 0?l:!0),w.isValid&&(w.isValid=(h=w.containsNumericCharacter)!==null&&h!==void 0?h:!0),w.isValid&&(w.isValid=(y=w.containsNonAlphanumericCharacter)!==null&&y!==void 0?y:!0),w}validatePasswordLengthOptions(e,n){const r=this.customStrengthOptions.minPasswordLength,o=this.customStrengthOptions.maxPasswordLength;r&&(n.meetsMinPasswordLength=e.length>=r),o&&(n.meetsMaxPasswordLength=e.length<=o)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let r;for(let o=0;o<e.length;o++)r=e.charAt(o),this.updatePasswordCharacterOptionsStatuses(n,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,n,r,o,l){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=o)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=l))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fc{constructor(e,n,r,o){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=r,this.config=o,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Fr(this),this.idTokenSubscription=new Fr(this),this.beforeStateQueue=new cc(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Es,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=o.sdkClientVersion,this._persistenceManagerAvailable=new Promise(l=>this._resolvePersistenceManagerAvailable=l)}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=ue(n)),this._initializationPromise=this.queue(async()=>{var r,o,l;if(!this._deleted&&(this.persistenceManager=await ze.create(this,e),(r=this._resolvePersistenceManagerAvailable)===null||r===void 0||r.call(this),!this._deleted)){if(!((o=this._popupRedirectResolver)===null||o===void 0)&&o._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((l=this.currentUser)===null||l===void 0?void 0:l.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await Zt(this,{idToken:e}),r=await te._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(r)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var n;if(ie(this.app)){const h=this.app.settings.authIdToken;return h?new Promise(y=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(h).then(y,y))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let o=r,l=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const h=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,y=o==null?void 0:o._redirectEventId,w=await this.tryRedirectSignIn(e);(!h||h===y)&&(w!=null&&w.user)&&(o=w.user,l=!0)}if(!o)return this.directlySetCurrentUser(null);if(!o._redirectEventId){if(l)try{await this.beforeStateQueue.runMiddleware(o)}catch(h){o=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(h))}return o?this.reloadAndSetCurrentUserOrClear(o):this.directlySetCurrentUser(null)}return b(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===o._redirectEventId?this.directlySetCurrentUser(o):this.reloadAndSetCurrentUserOrClear(o)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await en(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Kl()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(ie(this.app))return Promise.reject(Ne(this));const n=e?Je(e):null;return n&&b(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&b(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return ie(this.app)?Promise.reject(Ne(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return ie(this.app)?Promise.reject(Ne(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(ue(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await hc(this),n=new dc(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Et("auth","Firebase",e())}onAuthStateChanged(e,n,r){return this.registerStateListener(this.authStateSubscription,e,n,r)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,r){return this.registerStateListener(this.idTokenSubscription,e,n,r)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(r.tenantId=this.tenantId),await oc(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){const r=await this.getOrInitRedirectPersistenceManager(n);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&ue(e)||this._popupRedirectResolver;b(n,this,"argument-error"),this.redirectPersistenceManager=await ze.create(this,[ue(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,r;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,r,o){if(this._deleted)return()=>{};const l=typeof n=="function"?n:n.next.bind(n);let h=!1;const y=this._isInitialized?Promise.resolve():this._initializationPromise;if(b(y,this,"internal-error"),y.then(()=>{h||l(this.currentUser)}),typeof n=="function"){const w=e.addObserver(n,r,o);return()=>{h=!0,w()}}else{const w=e.addObserver(n);return()=>{h=!0,w()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return b(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=xs(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const n={"X-Client-Version":this.clientVersion};this.app.options.appId&&(n["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(n["X-Firebase-Client"]=r);const o=await this._getAppCheckToken();return o&&(n["X-Firebase-AppCheck"]=o),n}async _getAppCheckToken(){var e;if(ie(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const n=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return n!=null&&n.error&&zl(`Error while retrieving App Check token: ${n.error}`),n==null?void 0:n.token}}function fi(i){return Je(i)}class Fr{constructor(e){this.auth=e,this.observer=null,this.addObserver=Ra(n=>this.observer=n)}get next(){return b(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let pi={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function pc(i){pi=i}function gc(i){return pi.loadJS(i)}function mc(){return pi.gapiScript}function vc(i){return`__${i}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yc(i,e){const n=oi(i,"auth");if(n.isInitialized()){const o=n.getImmediate(),l=n.getOptions();if(Le(l,e??{}))return o;fe(o,"already-initialized")}return n.initialize({options:e})}function _c(i,e){const n=(e==null?void 0:e.persistence)||[],r=(Array.isArray(n)?n:[n]).map(ue);e!=null&&e.errorMap&&i._updateErrorMap(e.errorMap),i._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function Ic(i,e,n){const r=fi(i);b(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const o=!1,l=Fs(e),{host:h,port:y}=wc(e),w=y===null?"":`:${y}`,E={url:`${l}//${h}${w}/`},A=Object.freeze({host:h,port:y,protocol:l.replace(":",""),options:Object.freeze({disableWarnings:o})});if(!r._canInitEmulator){b(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),b(Le(E,r.config.emulator)&&Le(A,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=E,r.emulatorConfig=A,r.settings.appVerificationDisabledForTesting=!0,Ec()}function Fs(i){const e=i.indexOf(":");return e<0?"":i.substr(0,e+1)}function wc(i){const e=Fs(i),n=/(\/\/)?([^?#/]+)/.exec(i.substr(e.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",o=/^(\[[^\]]+\])(:|$)/.exec(r);if(o){const l=o[1];return{host:l,port:jr(r.substr(l.length+1))}}else{const[l,h]=r.split(":");return{host:l,port:jr(h)}}}function jr(i){if(!i)return null;const e=Number(i);return isNaN(e)?null:e}function Ec(){function i(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",i):i())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class js{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return he("not implemented")}_getIdTokenResponse(e){return he("not implemented")}_linkToIdToken(e,n){return he("not implemented")}_getReauthenticationResolver(e){return he("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function We(i,e){return Yl(i,"POST","/v1/accounts:signInWithIdp",hi(i,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tc="http://localhost";class Ue extends js{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new Ue(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):fe("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:o}=n,l=ai(n,["providerId","signInMethod"]);if(!r||!o)return null;const h=new Ue(r,o);return h.idToken=l.idToken||void 0,h.accessToken=l.accessToken||void 0,h.secret=l.secret,h.nonce=l.nonce,h.pendingToken=l.pendingToken||null,h}_getIdTokenResponse(e){const n=this.buildRequest();return We(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,We(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,We(e,n)}buildRequest(){const e={requestUri:Tc,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=Tt(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bs{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class At extends Bs{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class we extends At{constructor(){super("facebook.com")}static credential(e){return Ue._fromParams({providerId:we.PROVIDER_ID,signInMethod:we.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return we.credentialFromTaggedObject(e)}static credentialFromError(e){return we.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return we.credential(e.oauthAccessToken)}catch{return null}}}we.FACEBOOK_SIGN_IN_METHOD="facebook.com";we.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ee extends At{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return Ue._fromParams({providerId:Ee.PROVIDER_ID,signInMethod:Ee.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return Ee.credentialFromTaggedObject(e)}static credentialFromError(e){return Ee.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r}=e;if(!n&&!r)return null;try{return Ee.credential(n,r)}catch{return null}}}Ee.GOOGLE_SIGN_IN_METHOD="google.com";Ee.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Te extends At{constructor(){super("github.com")}static credential(e){return Ue._fromParams({providerId:Te.PROVIDER_ID,signInMethod:Te.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Te.credentialFromTaggedObject(e)}static credentialFromError(e){return Te.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Te.credential(e.oauthAccessToken)}catch{return null}}}Te.GITHUB_SIGN_IN_METHOD="github.com";Te.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class be extends At{constructor(){super("twitter.com")}static credential(e,n){return Ue._fromParams({providerId:be.PROVIDER_ID,signInMethod:be.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return be.credentialFromTaggedObject(e)}static credentialFromError(e){return be.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=e;if(!n||!r)return null;try{return be.credential(n,r)}catch{return null}}}be.TWITTER_SIGN_IN_METHOD="twitter.com";be.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ke{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,r,o=!1){const l=await te._fromIdTokenResponse(e,r,o),h=Br(r);return new Ke({user:l,providerId:h,_tokenResponse:r,operationType:n})}static async _forOperation(e,n,r){await e._updateTokensIfNecessary(r,!0);const o=Br(r);return new Ke({user:e,providerId:o,_tokenResponse:r,operationType:n})}}function Br(i){return i.providerId?i.providerId:"phoneNumber"in i?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tn extends ge{constructor(e,n,r,o){var l;super(n.code,n.message),this.operationType=r,this.user=o,Object.setPrototypeOf(this,tn.prototype),this.customData={appName:e.name,tenantId:(l=e.tenantId)!==null&&l!==void 0?l:void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,n,r,o){return new tn(e,n,r,o)}}function Vs(i,e,n,r){return(e==="reauthenticate"?n._getReauthenticationResolver(i):n._getIdTokenResponse(i)).catch(l=>{throw l.code==="auth/multi-factor-auth-required"?tn._fromErrorAndOperation(i,l,e,r):l})}async function bc(i,e,n=!1){const r=await wt(i,e._linkToIdToken(i.auth,await i.getIdToken()),n);return Ke._forOperation(i,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ac(i,e,n=!1){const{auth:r}=i;if(ie(r.app))return Promise.reject(Ne(r));const o="reauthenticate";try{const l=await wt(i,Vs(r,o,e,i),n);b(l.idToken,r,"internal-error");const h=ui(l.idToken);b(h,r,"internal-error");const{sub:y}=h;return b(i.uid===y,r,"user-mismatch"),Ke._forOperation(i,o,l)}catch(l){throw(l==null?void 0:l.code)==="auth/user-not-found"&&fe(r,"user-mismatch"),l}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Sc(i,e,n=!1){if(ie(i.app))return Promise.reject(Ne(i));const r="signIn",o=await Vs(i,r,e),l=await Ke._fromIdTokenResponse(i,r,o);return n||await i._updateCurrentUser(l.user),l}function kc(i,e,n,r){return Je(i).onIdTokenChanged(e,n,r)}function Cc(i,e,n){return Je(i).beforeAuthStateChanged(e,n)}const nn="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hs{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(nn,"1"),this.storage.removeItem(nn),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pc=1e3,Rc=10;class $s extends Hs{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Us(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),o=this.localCache[n];r!==o&&e(n,o,r)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((h,y,w)=>{this.notifyListeners(h,w)});return}const r=e.key;n?this.detachListener():this.stopPolling();const o=()=>{const h=this.storage.getItem(r);!n&&this.localCache[r]===h||this.notifyListeners(r,h)},l=this.storage.getItem(r);lc()&&l!==e.newValue&&e.newValue!==e.oldValue?setTimeout(o,Rc):o()}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const o of Array.from(r))o(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:r}),!0)})},Pc)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}$s.type="LOCAL";const Oc=$s;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zs extends Hs{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}zs.type="SESSION";const Ws=zs;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dc(i){return Promise.all(i.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class on{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(o=>o.isListeningto(e));if(n)return n;const r=new on(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:r,eventType:o,data:l}=n.data,h=this.handlersMap[o];if(!(h!=null&&h.size))return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:o});const y=Array.from(h).map(async E=>E(n.origin,l)),w=await Dc(y);n.ports[0].postMessage({status:"done",eventId:r,eventType:o,response:w})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}on.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gi(i="",e=10){let n="";for(let r=0;r<e;r++)n+=Math.floor(Math.random()*10);return i+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nc{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,r=50){const o=typeof MessageChannel<"u"?new MessageChannel:null;if(!o)throw new Error("connection_unavailable");let l,h;return new Promise((y,w)=>{const E=gi("",20);o.port1.start();const A=setTimeout(()=>{w(new Error("unsupported_event"))},r);h={messageChannel:o,onMessage(S){const k=S;if(k.data.eventId===E)switch(k.data.status){case"ack":clearTimeout(A),l=setTimeout(()=>{w(new Error("timeout"))},3e3);break;case"done":clearTimeout(l),y(k.data.response);break;default:clearTimeout(A),clearTimeout(l),w(new Error("invalid_response"));break}}},this.handlers.add(h),o.port1.addEventListener("message",h.onMessage),this.target.postMessage({eventType:e,eventId:E,data:n},[o.port2])}).finally(()=>{h&&this.removeMessageHandler(h)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function se(){return window}function Lc(i){se().location.href=i}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gs(){return typeof se().WorkerGlobalScope<"u"&&typeof se().importScripts=="function"}async function Mc(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Uc(){var i;return((i=navigator==null?void 0:navigator.serviceWorker)===null||i===void 0?void 0:i.controller)||null}function xc(){return Gs()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ks="firebaseLocalStorageDb",Fc=1,rn="firebaseLocalStorage",qs="fbase_key";class St{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function an(i,e){return i.transaction([rn],e?"readwrite":"readonly").objectStore(rn)}function jc(){const i=indexedDB.deleteDatabase(Ks);return new St(i).toPromise()}function ei(){const i=indexedDB.open(Ks,Fc);return new Promise((e,n)=>{i.addEventListener("error",()=>{n(i.error)}),i.addEventListener("upgradeneeded",()=>{const r=i.result;try{r.createObjectStore(rn,{keyPath:qs})}catch(o){n(o)}}),i.addEventListener("success",async()=>{const r=i.result;r.objectStoreNames.contains(rn)?e(r):(r.close(),await jc(),e(await ei()))})})}async function Vr(i,e,n){const r=an(i,!0).put({[qs]:e,value:n});return new St(r).toPromise()}async function Bc(i,e){const n=an(i,!1).get(e),r=await new St(n).toPromise();return r===void 0?null:r.value}function Hr(i,e){const n=an(i,!0).delete(e);return new St(n).toPromise()}const Vc=800,Hc=3;class Js{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await ei(),this.db)}async _withRetries(e){let n=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(n++>Hc)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Gs()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=on._getInstance(xc()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var e,n;if(this.activeServiceWorker=await Mc(),!this.activeServiceWorker)return;this.sender=new Nc(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((n=r[0])===null||n===void 0)&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Uc()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await ei();return await Vr(e,nn,"1"),await Hr(e,nn),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>Vr(r,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(r=>Bc(r,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>Hr(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(o=>{const l=an(o,!1).getAll();return new St(l).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;if(e.length!==0)for(const{fbase_key:o,value:l}of e)r.add(o),JSON.stringify(this.localCache[o])!==JSON.stringify(l)&&(this.notifyListeners(o,l),n.push(o));for(const o of Object.keys(this.localCache))this.localCache[o]&&!r.has(o)&&(this.notifyListeners(o,null),n.push(o));return n}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const o of Array.from(r))o(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Vc)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Js.type="LOCAL";const $c=Js;new bt(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zc(i,e){return e?ue(e):(b(i._popupRedirectResolver,i,"argument-error"),i._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mi extends js{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return We(e,this._buildIdpRequest())}_linkToIdToken(e,n){return We(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return We(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function Wc(i){return Sc(i.auth,new mi(i),i.bypassAuthState)}function Gc(i){const{auth:e,user:n}=i;return b(n,e,"internal-error"),Ac(n,new mi(i),i.bypassAuthState)}async function Kc(i){const{auth:e,user:n}=i;return b(n,e,"internal-error"),bc(n,new mi(i),i.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xs{constructor(e,n,r,o,l=!1){this.auth=e,this.resolver=r,this.user=o,this.bypassAuthState=l,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:r,postBody:o,tenantId:l,error:h,type:y}=e;if(h){this.reject(h);return}const w={auth:this.auth,requestUri:n,sessionId:r,tenantId:l||void 0,postBody:o||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(y)(w))}catch(E){this.reject(E)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Wc;case"linkViaPopup":case"linkViaRedirect":return Kc;case"reauthViaPopup":case"reauthViaRedirect":return Gc;default:fe(this.auth,"internal-error")}}resolve(e){pe(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){pe(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qc=new bt(2e3,1e4);class He extends Xs{constructor(e,n,r,o,l){super(e,n,o,l),this.provider=r,this.authWindow=null,this.pollId=null,He.currentPopupAction&&He.currentPopupAction.cancel(),He.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return b(e,this.auth,"internal-error"),e}async onExecution(){pe(this.filter.length===1,"Popup operations only handle one event");const e=gi();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(re(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(re(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,He.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,r;if(!((r=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(re(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,qc.get())};e()}}He.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jc="pendingRedirect",qt=new Map;class Xc extends Xs{constructor(e,n,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let e=qt.get(this.auth._key());if(!e){try{const r=await Yc(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(n){e=()=>Promise.reject(n)}qt.set(this.auth._key(),e)}return this.bypassAuthState||qt.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Yc(i,e){const n=eh(e),r=Zc(i);if(!await r._isAvailable())return!1;const o=await r._get(n)==="true";return await r._remove(n),o}function Qc(i,e){qt.set(i._key(),e)}function Zc(i){return ue(i._redirectPersistence)}function eh(i){return Kt(Jc,i.config.apiKey,i.name)}async function th(i,e,n=!1){if(ie(i.app))return Promise.reject(Ne(i));const r=fi(i),o=zc(r,e),h=await new Xc(r,o,n).execute();return h&&!n&&(delete h.user._redirectEventId,await r._persistUserIfCurrent(h.user),await r._setRedirectUser(null,e)),h}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nh=10*60*1e3;class ih{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(n=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!rh(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var r;if(e.error&&!Ys(e)){const o=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";n.onError(re(this.auth,o))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const r=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=nh&&this.cachedEventUids.clear(),this.cachedEventUids.has($r(e))}saveEventToCache(e){this.cachedEventUids.add($r(e)),this.lastProcessedEventTime=Date.now()}}function $r(i){return[i.type,i.eventId,i.sessionId,i.tenantId].filter(e=>e).join("-")}function Ys({type:i,error:e}){return i==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function rh(i){switch(i.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Ys(i);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function sh(i,e={}){return Ye(i,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oh=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,ah=/^https?/;async function lh(i){if(i.config.emulator)return;const{authorizedDomains:e}=await sh(i);for(const n of e)try{if(ch(n))return}catch{}fe(i,"unauthorized-domain")}function ch(i){const e=Qn(),{protocol:n,hostname:r}=new URL(e);if(i.startsWith("chrome-extension://")){const h=new URL(i);return h.hostname===""&&r===""?n==="chrome-extension:"&&i.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&h.hostname===r}if(!ah.test(n))return!1;if(oh.test(i))return r===i;const o=i.replace(/\./g,"\\.");return new RegExp("^(.+\\."+o+"|"+o+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hh=new bt(3e4,6e4);function zr(){const i=se().___jsl;if(i!=null&&i.H){for(const e of Object.keys(i.H))if(i.H[e].r=i.H[e].r||[],i.H[e].L=i.H[e].L||[],i.H[e].r=[...i.H[e].L],i.CP)for(let n=0;n<i.CP.length;n++)i.CP[n]=null}}function uh(i){return new Promise((e,n)=>{var r,o,l;function h(){zr(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{zr(),n(re(i,"network-request-failed"))},timeout:hh.get()})}if(!((o=(r=se().gapi)===null||r===void 0?void 0:r.iframes)===null||o===void 0)&&o.Iframe)e(gapi.iframes.getContext());else if(!((l=se().gapi)===null||l===void 0)&&l.load)h();else{const y=vc("iframefcb");return se()[y]=()=>{gapi.load?h():n(re(i,"network-request-failed"))},gc(`${mc()}?onload=${y}`).catch(w=>n(w))}}).catch(e=>{throw Jt=null,e})}let Jt=null;function dh(i){return Jt=Jt||uh(i),Jt}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fh=new bt(5e3,15e3),ph="__/auth/iframe",gh="emulator/auth/iframe",mh={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},vh=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function yh(i){const e=i.config;b(e.authDomain,i,"auth-domain-config-required");const n=e.emulator?ci(e,gh):`https://${i.config.authDomain}/${ph}`,r={apiKey:e.apiKey,appName:i.name,v:Xe},o=vh.get(i.config.apiHost);o&&(r.eid=o);const l=i._getFrameworks();return l.length&&(r.fw=l.join(",")),`${n}?${Tt(r).slice(1)}`}async function _h(i){const e=await dh(i),n=se().gapi;return b(n,i,"internal-error"),e.open({where:document.body,url:yh(i),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:mh,dontclear:!0},r=>new Promise(async(o,l)=>{await r.restyle({setHideOnLeave:!1});const h=re(i,"network-request-failed"),y=se().setTimeout(()=>{l(h)},fh.get());function w(){se().clearTimeout(y),o(r)}r.ping(w).then(w,()=>{l(h)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ih={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},wh=500,Eh=600,Th="_blank",bh="http://localhost";class Wr{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Ah(i,e,n,r=wh,o=Eh){const l=Math.max((window.screen.availHeight-o)/2,0).toString(),h=Math.max((window.screen.availWidth-r)/2,0).toString();let y="";const w=Object.assign(Object.assign({},Ih),{width:r.toString(),height:o.toString(),top:l,left:h}),E=K().toLowerCase();n&&(y=Os(E)?Th:n),Ps(E)&&(e=e||bh,w.scrollbars="yes");const A=Object.entries(w).reduce((k,[x,P])=>`${k}${x}=${P},`,"");if(ac(E)&&y!=="_self")return Sh(e||"",y),new Wr(null);const S=window.open(e||"",y,A);b(S,i,"popup-blocked");try{S.focus()}catch{}return new Wr(S)}function Sh(i,e){const n=document.createElement("a");n.href=i,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kh="__/auth/handler",Ch="emulator/auth/handler",Ph=encodeURIComponent("fac");async function Gr(i,e,n,r,o,l){b(i.config.authDomain,i,"auth-domain-config-required"),b(i.config.apiKey,i,"invalid-api-key");const h={apiKey:i.config.apiKey,appName:i.name,authType:n,redirectUrl:r,v:Xe,eventId:o};if(e instanceof Bs){e.setDefaultLanguage(i.languageCode),h.providerId=e.providerId||"",Pa(e.getCustomParameters())||(h.customParameters=JSON.stringify(e.getCustomParameters()));for(const[A,S]of Object.entries({}))h[A]=S}if(e instanceof At){const A=e.getScopes().filter(S=>S!=="");A.length>0&&(h.scopes=A.join(","))}i.tenantId&&(h.tid=i.tenantId);const y=h;for(const A of Object.keys(y))y[A]===void 0&&delete y[A];const w=await i._getAppCheckToken(),E=w?`#${Ph}=${encodeURIComponent(w)}`:"";return`${Rh(i)}?${Tt(y).slice(1)}${E}`}function Rh({config:i}){return i.emulator?ci(i,Ch):`https://${i.authDomain}/${kh}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vn="webStorageSupport";class Oh{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Ws,this._completeRedirectFn=th,this._overrideRedirectResult=Qc}async _openPopup(e,n,r,o){var l;pe((l=this.eventManagers[e._key()])===null||l===void 0?void 0:l.manager,"_initialize() not called before _openPopup()");const h=await Gr(e,n,r,Qn(),o);return Ah(e,h,gi())}async _openRedirect(e,n,r,o){await this._originValidation(e);const l=await Gr(e,n,r,Qn(),o);return Lc(l),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:o,promise:l}=this.eventManagers[n];return o?Promise.resolve(o):(pe(l,"If manager is not set, promise should be"),l)}const r=this.initAndGetManager(e);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(e){const n=await _h(e),r=new ih(e);return n.register("authEvent",o=>(b(o==null?void 0:o.authEvent,e,"invalid-auth-event"),{status:r.onEvent(o.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=n,r}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(Vn,{type:Vn},o=>{var l;const h=(l=o==null?void 0:o[0])===null||l===void 0?void 0:l[Vn];h!==void 0&&n(!!h),fe(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=lh(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return Us()||Rs()||di()}}const Dh=Oh;var Kr="@firebase/auth",qr="1.10.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nh{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){b(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lh(i){switch(i){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function Mh(i){Ge(new Me("auth",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),o=e.getProvider("heartbeat"),l=e.getProvider("app-check-internal"),{apiKey:h,authDomain:y}=r.options;b(h&&!h.includes(":"),"invalid-api-key",{appName:r.name});const w={apiKey:h,authDomain:y,clientPlatform:i,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:xs(i)},E=new fc(r,o,l,w);return _c(E,n),E},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),Ge(new Me("auth-internal",e=>{const n=fi(e.getProvider("auth").getImmediate());return(r=>new Nh(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),ke(Kr,qr,Lh(i)),ke(Kr,qr,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uh=5*60,xh=ps("authIdTokenMaxAge")||Uh;let Jr=null;const Fh=i=>async e=>{const n=e&&await e.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>xh)return;const o=n==null?void 0:n.token;Jr!==o&&(Jr=o,await fetch(i,{method:o?"POST":"DELETE",headers:o?{Authorization:`Bearer ${o}`}:{}}))};function jh(i=ys()){const e=oi(i,"auth");if(e.isInitialized())return e.getImmediate();const n=yc(i,{popupRedirectResolver:Dh,persistence:[$c,Oc,Ws]}),r=ps("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const l=new URL(r,location.origin);if(location.origin===l.origin){const h=Fh(l.toString());Cc(n,h,()=>h(n.currentUser)),kc(n,y=>h(y))}}const o=ds("auth");return o&&Ic(n,`http://${o}`),n}function Bh(){var i,e;return(e=(i=document.getElementsByTagName("head"))===null||i===void 0?void 0:i[0])!==null&&e!==void 0?e:document}pc({loadJS(i){return new Promise((e,n)=>{const r=document.createElement("script");r.setAttribute("src",i),r.onload=e,r.onerror=o=>{const l=re("internal-error");l.customData=o,n(l)},r.type="text/javascript",r.charset="UTF-8",Bh().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});Mh("Browser");var Xr=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Qs;(function(){var i;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(m,u){function f(){}f.prototype=u.prototype,m.D=u.prototype,m.prototype=new f,m.prototype.constructor=m,m.C=function(p,g,_){for(var d=Array(arguments.length-2),ae=2;ae<arguments.length;ae++)d[ae-2]=arguments[ae];return u.prototype[g].apply(p,d)}}function n(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,n),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function o(m,u,f){f||(f=0);var p=Array(16);if(typeof u=="string")for(var g=0;16>g;++g)p[g]=u.charCodeAt(f++)|u.charCodeAt(f++)<<8|u.charCodeAt(f++)<<16|u.charCodeAt(f++)<<24;else for(g=0;16>g;++g)p[g]=u[f++]|u[f++]<<8|u[f++]<<16|u[f++]<<24;u=m.g[0],f=m.g[1],g=m.g[2];var _=m.g[3],d=u+(_^f&(g^_))+p[0]+3614090360&4294967295;u=f+(d<<7&4294967295|d>>>25),d=_+(g^u&(f^g))+p[1]+3905402710&4294967295,_=u+(d<<12&4294967295|d>>>20),d=g+(f^_&(u^f))+p[2]+606105819&4294967295,g=_+(d<<17&4294967295|d>>>15),d=f+(u^g&(_^u))+p[3]+3250441966&4294967295,f=g+(d<<22&4294967295|d>>>10),d=u+(_^f&(g^_))+p[4]+4118548399&4294967295,u=f+(d<<7&4294967295|d>>>25),d=_+(g^u&(f^g))+p[5]+1200080426&4294967295,_=u+(d<<12&4294967295|d>>>20),d=g+(f^_&(u^f))+p[6]+2821735955&4294967295,g=_+(d<<17&4294967295|d>>>15),d=f+(u^g&(_^u))+p[7]+4249261313&4294967295,f=g+(d<<22&4294967295|d>>>10),d=u+(_^f&(g^_))+p[8]+1770035416&4294967295,u=f+(d<<7&4294967295|d>>>25),d=_+(g^u&(f^g))+p[9]+2336552879&4294967295,_=u+(d<<12&4294967295|d>>>20),d=g+(f^_&(u^f))+p[10]+4294925233&4294967295,g=_+(d<<17&4294967295|d>>>15),d=f+(u^g&(_^u))+p[11]+2304563134&4294967295,f=g+(d<<22&4294967295|d>>>10),d=u+(_^f&(g^_))+p[12]+1804603682&4294967295,u=f+(d<<7&4294967295|d>>>25),d=_+(g^u&(f^g))+p[13]+4254626195&4294967295,_=u+(d<<12&4294967295|d>>>20),d=g+(f^_&(u^f))+p[14]+2792965006&4294967295,g=_+(d<<17&4294967295|d>>>15),d=f+(u^g&(_^u))+p[15]+1236535329&4294967295,f=g+(d<<22&4294967295|d>>>10),d=u+(g^_&(f^g))+p[1]+4129170786&4294967295,u=f+(d<<5&4294967295|d>>>27),d=_+(f^g&(u^f))+p[6]+3225465664&4294967295,_=u+(d<<9&4294967295|d>>>23),d=g+(u^f&(_^u))+p[11]+643717713&4294967295,g=_+(d<<14&4294967295|d>>>18),d=f+(_^u&(g^_))+p[0]+3921069994&4294967295,f=g+(d<<20&4294967295|d>>>12),d=u+(g^_&(f^g))+p[5]+3593408605&4294967295,u=f+(d<<5&4294967295|d>>>27),d=_+(f^g&(u^f))+p[10]+38016083&4294967295,_=u+(d<<9&4294967295|d>>>23),d=g+(u^f&(_^u))+p[15]+3634488961&4294967295,g=_+(d<<14&4294967295|d>>>18),d=f+(_^u&(g^_))+p[4]+3889429448&4294967295,f=g+(d<<20&4294967295|d>>>12),d=u+(g^_&(f^g))+p[9]+568446438&4294967295,u=f+(d<<5&4294967295|d>>>27),d=_+(f^g&(u^f))+p[14]+3275163606&4294967295,_=u+(d<<9&4294967295|d>>>23),d=g+(u^f&(_^u))+p[3]+4107603335&4294967295,g=_+(d<<14&4294967295|d>>>18),d=f+(_^u&(g^_))+p[8]+1163531501&4294967295,f=g+(d<<20&4294967295|d>>>12),d=u+(g^_&(f^g))+p[13]+2850285829&4294967295,u=f+(d<<5&4294967295|d>>>27),d=_+(f^g&(u^f))+p[2]+4243563512&4294967295,_=u+(d<<9&4294967295|d>>>23),d=g+(u^f&(_^u))+p[7]+1735328473&4294967295,g=_+(d<<14&4294967295|d>>>18),d=f+(_^u&(g^_))+p[12]+2368359562&4294967295,f=g+(d<<20&4294967295|d>>>12),d=u+(f^g^_)+p[5]+4294588738&4294967295,u=f+(d<<4&4294967295|d>>>28),d=_+(u^f^g)+p[8]+2272392833&4294967295,_=u+(d<<11&4294967295|d>>>21),d=g+(_^u^f)+p[11]+1839030562&4294967295,g=_+(d<<16&4294967295|d>>>16),d=f+(g^_^u)+p[14]+4259657740&4294967295,f=g+(d<<23&4294967295|d>>>9),d=u+(f^g^_)+p[1]+2763975236&4294967295,u=f+(d<<4&4294967295|d>>>28),d=_+(u^f^g)+p[4]+1272893353&4294967295,_=u+(d<<11&4294967295|d>>>21),d=g+(_^u^f)+p[7]+4139469664&4294967295,g=_+(d<<16&4294967295|d>>>16),d=f+(g^_^u)+p[10]+3200236656&4294967295,f=g+(d<<23&4294967295|d>>>9),d=u+(f^g^_)+p[13]+681279174&4294967295,u=f+(d<<4&4294967295|d>>>28),d=_+(u^f^g)+p[0]+3936430074&4294967295,_=u+(d<<11&4294967295|d>>>21),d=g+(_^u^f)+p[3]+3572445317&4294967295,g=_+(d<<16&4294967295|d>>>16),d=f+(g^_^u)+p[6]+76029189&4294967295,f=g+(d<<23&4294967295|d>>>9),d=u+(f^g^_)+p[9]+3654602809&4294967295,u=f+(d<<4&4294967295|d>>>28),d=_+(u^f^g)+p[12]+3873151461&4294967295,_=u+(d<<11&4294967295|d>>>21),d=g+(_^u^f)+p[15]+530742520&4294967295,g=_+(d<<16&4294967295|d>>>16),d=f+(g^_^u)+p[2]+3299628645&4294967295,f=g+(d<<23&4294967295|d>>>9),d=u+(g^(f|~_))+p[0]+4096336452&4294967295,u=f+(d<<6&4294967295|d>>>26),d=_+(f^(u|~g))+p[7]+1126891415&4294967295,_=u+(d<<10&4294967295|d>>>22),d=g+(u^(_|~f))+p[14]+2878612391&4294967295,g=_+(d<<15&4294967295|d>>>17),d=f+(_^(g|~u))+p[5]+4237533241&4294967295,f=g+(d<<21&4294967295|d>>>11),d=u+(g^(f|~_))+p[12]+1700485571&4294967295,u=f+(d<<6&4294967295|d>>>26),d=_+(f^(u|~g))+p[3]+2399980690&4294967295,_=u+(d<<10&4294967295|d>>>22),d=g+(u^(_|~f))+p[10]+4293915773&4294967295,g=_+(d<<15&4294967295|d>>>17),d=f+(_^(g|~u))+p[1]+2240044497&4294967295,f=g+(d<<21&4294967295|d>>>11),d=u+(g^(f|~_))+p[8]+1873313359&4294967295,u=f+(d<<6&4294967295|d>>>26),d=_+(f^(u|~g))+p[15]+4264355552&4294967295,_=u+(d<<10&4294967295|d>>>22),d=g+(u^(_|~f))+p[6]+2734768916&4294967295,g=_+(d<<15&4294967295|d>>>17),d=f+(_^(g|~u))+p[13]+1309151649&4294967295,f=g+(d<<21&4294967295|d>>>11),d=u+(g^(f|~_))+p[4]+4149444226&4294967295,u=f+(d<<6&4294967295|d>>>26),d=_+(f^(u|~g))+p[11]+3174756917&4294967295,_=u+(d<<10&4294967295|d>>>22),d=g+(u^(_|~f))+p[2]+718787259&4294967295,g=_+(d<<15&4294967295|d>>>17),d=f+(_^(g|~u))+p[9]+3951481745&4294967295,m.g[0]=m.g[0]+u&4294967295,m.g[1]=m.g[1]+(g+(d<<21&4294967295|d>>>11))&4294967295,m.g[2]=m.g[2]+g&4294967295,m.g[3]=m.g[3]+_&4294967295}r.prototype.u=function(m,u){u===void 0&&(u=m.length);for(var f=u-this.blockSize,p=this.B,g=this.h,_=0;_<u;){if(g==0)for(;_<=f;)o(this,m,_),_+=this.blockSize;if(typeof m=="string"){for(;_<u;)if(p[g++]=m.charCodeAt(_++),g==this.blockSize){o(this,p),g=0;break}}else for(;_<u;)if(p[g++]=m[_++],g==this.blockSize){o(this,p),g=0;break}}this.h=g,this.o+=u},r.prototype.v=function(){var m=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);m[0]=128;for(var u=1;u<m.length-8;++u)m[u]=0;var f=8*this.o;for(u=m.length-8;u<m.length;++u)m[u]=f&255,f/=256;for(this.u(m),m=Array(16),u=f=0;4>u;++u)for(var p=0;32>p;p+=8)m[f++]=this.g[u]>>>p&255;return m};function l(m,u){var f=y;return Object.prototype.hasOwnProperty.call(f,m)?f[m]:f[m]=u(m)}function h(m,u){this.h=u;for(var f=[],p=!0,g=m.length-1;0<=g;g--){var _=m[g]|0;p&&_==u||(f[g]=_,p=!1)}this.g=f}var y={};function w(m){return-128<=m&&128>m?l(m,function(u){return new h([u|0],0>u?-1:0)}):new h([m|0],0>m?-1:0)}function E(m){if(isNaN(m)||!isFinite(m))return S;if(0>m)return L(E(-m));for(var u=[],f=1,p=0;m>=f;p++)u[p]=m/f|0,f*=4294967296;return new h(u,0)}function A(m,u){if(m.length==0)throw Error("number format error: empty string");if(u=u||10,2>u||36<u)throw Error("radix out of range: "+u);if(m.charAt(0)=="-")return L(A(m.substring(1),u));if(0<=m.indexOf("-"))throw Error('number format error: interior "-" character');for(var f=E(Math.pow(u,8)),p=S,g=0;g<m.length;g+=8){var _=Math.min(8,m.length-g),d=parseInt(m.substring(g,g+_),u);8>_?(_=E(Math.pow(u,_)),p=p.j(_).add(E(d))):(p=p.j(f),p=p.add(E(d)))}return p}var S=w(0),k=w(1),x=w(16777216);i=h.prototype,i.m=function(){if(U(this))return-L(this).m();for(var m=0,u=1,f=0;f<this.g.length;f++){var p=this.i(f);m+=(0<=p?p:4294967296+p)*u,u*=4294967296}return m},i.toString=function(m){if(m=m||10,2>m||36<m)throw Error("radix out of range: "+m);if(P(this))return"0";if(U(this))return"-"+L(this).toString(m);for(var u=E(Math.pow(m,6)),f=this,p="";;){var g=Z(f,u).g;f=oe(f,g.j(u));var _=((0<f.g.length?f.g[0]:f.h)>>>0).toString(m);if(f=g,P(f))return _+p;for(;6>_.length;)_="0"+_;p=_+p}},i.i=function(m){return 0>m?0:m<this.g.length?this.g[m]:this.h};function P(m){if(m.h!=0)return!1;for(var u=0;u<m.g.length;u++)if(m.g[u]!=0)return!1;return!0}function U(m){return m.h==-1}i.l=function(m){return m=oe(this,m),U(m)?-1:P(m)?0:1};function L(m){for(var u=m.g.length,f=[],p=0;p<u;p++)f[p]=~m.g[p];return new h(f,~m.h).add(k)}i.abs=function(){return U(this)?L(this):this},i.add=function(m){for(var u=Math.max(this.g.length,m.g.length),f=[],p=0,g=0;g<=u;g++){var _=p+(this.i(g)&65535)+(m.i(g)&65535),d=(_>>>16)+(this.i(g)>>>16)+(m.i(g)>>>16);p=d>>>16,_&=65535,d&=65535,f[g]=d<<16|_}return new h(f,f[f.length-1]&-2147483648?-1:0)};function oe(m,u){return m.add(L(u))}i.j=function(m){if(P(this)||P(m))return S;if(U(this))return U(m)?L(this).j(L(m)):L(L(this).j(m));if(U(m))return L(this.j(L(m)));if(0>this.l(x)&&0>m.l(x))return E(this.m()*m.m());for(var u=this.g.length+m.g.length,f=[],p=0;p<2*u;p++)f[p]=0;for(p=0;p<this.g.length;p++)for(var g=0;g<m.g.length;g++){var _=this.i(p)>>>16,d=this.i(p)&65535,ae=m.i(g)>>>16,Qe=m.i(g)&65535;f[2*p+2*g]+=d*Qe,Y(f,2*p+2*g),f[2*p+2*g+1]+=_*Qe,Y(f,2*p+2*g+1),f[2*p+2*g+1]+=d*ae,Y(f,2*p+2*g+1),f[2*p+2*g+2]+=_*ae,Y(f,2*p+2*g+2)}for(p=0;p<u;p++)f[p]=f[2*p+1]<<16|f[2*p];for(p=u;p<2*u;p++)f[p]=0;return new h(f,0)};function Y(m,u){for(;(m[u]&65535)!=m[u];)m[u+1]+=m[u]>>>16,m[u]&=65535,u++}function j(m,u){this.g=m,this.h=u}function Z(m,u){if(P(u))throw Error("division by zero");if(P(m))return new j(S,S);if(U(m))return u=Z(L(m),u),new j(L(u.g),L(u.h));if(U(u))return u=Z(m,L(u)),new j(L(u.g),u.h);if(30<m.g.length){if(U(m)||U(u))throw Error("slowDivide_ only works with positive integers.");for(var f=k,p=u;0>=p.l(m);)f=Ce(f),p=Ce(p);var g=q(f,1),_=q(p,1);for(p=q(p,2),f=q(f,2);!P(p);){var d=_.add(p);0>=d.l(m)&&(g=g.add(f),_=d),p=q(p,1),f=q(f,1)}return u=oe(m,g.j(u)),new j(g,u)}for(g=S;0<=m.l(u);){for(f=Math.max(1,Math.floor(m.m()/u.m())),p=Math.ceil(Math.log(f)/Math.LN2),p=48>=p?1:Math.pow(2,p-48),_=E(f),d=_.j(u);U(d)||0<d.l(m);)f-=p,_=E(f),d=_.j(u);P(_)&&(_=k),g=g.add(_),m=oe(m,d)}return new j(g,m)}i.A=function(m){return Z(this,m).h},i.and=function(m){for(var u=Math.max(this.g.length,m.g.length),f=[],p=0;p<u;p++)f[p]=this.i(p)&m.i(p);return new h(f,this.h&m.h)},i.or=function(m){for(var u=Math.max(this.g.length,m.g.length),f=[],p=0;p<u;p++)f[p]=this.i(p)|m.i(p);return new h(f,this.h|m.h)},i.xor=function(m){for(var u=Math.max(this.g.length,m.g.length),f=[],p=0;p<u;p++)f[p]=this.i(p)^m.i(p);return new h(f,this.h^m.h)};function Ce(m){for(var u=m.g.length+1,f=[],p=0;p<u;p++)f[p]=m.i(p)<<1|m.i(p-1)>>>31;return new h(f,m.h)}function q(m,u){var f=u>>5;u%=32;for(var p=m.g.length-f,g=[],_=0;_<p;_++)g[_]=0<u?m.i(_+f)>>>u|m.i(_+f+1)<<32-u:m.i(_+f);return new h(g,m.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,h.prototype.add=h.prototype.add,h.prototype.multiply=h.prototype.j,h.prototype.modulo=h.prototype.A,h.prototype.compare=h.prototype.l,h.prototype.toNumber=h.prototype.m,h.prototype.toString=h.prototype.toString,h.prototype.getBits=h.prototype.i,h.fromNumber=E,h.fromString=A,Qs=h}).apply(typeof Xr<"u"?Xr:typeof self<"u"?self:typeof window<"u"?window:{});var Wt=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};(function(){var i,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(t,s,a){return t==Array.prototype||t==Object.prototype||(t[s]=a.value),t};function n(t){t=[typeof globalThis=="object"&&globalThis,t,typeof window=="object"&&window,typeof self=="object"&&self,typeof Wt=="object"&&Wt];for(var s=0;s<t.length;++s){var a=t[s];if(a&&a.Math==Math)return a}throw Error("Cannot find global object")}var r=n(this);function o(t,s){if(s)e:{var a=r;t=t.split(".");for(var c=0;c<t.length-1;c++){var v=t[c];if(!(v in a))break e;a=a[v]}t=t[t.length-1],c=a[t],s=s(c),s!=c&&s!=null&&e(a,t,{configurable:!0,writable:!0,value:s})}}function l(t,s){t instanceof String&&(t+="");var a=0,c=!1,v={next:function(){if(!c&&a<t.length){var I=a++;return{value:s(I,t[I]),done:!1}}return c=!0,{done:!0,value:void 0}}};return v[Symbol.iterator]=function(){return v},v}o("Array.prototype.values",function(t){return t||function(){return l(this,function(s,a){return a})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var h=h||{},y=this||self;function w(t){var s=typeof t;return s=s!="object"?s:t?Array.isArray(t)?"array":s:"null",s=="array"||s=="object"&&typeof t.length=="number"}function E(t){var s=typeof t;return s=="object"&&t!=null||s=="function"}function A(t,s,a){return t.call.apply(t.bind,arguments)}function S(t,s,a){if(!t)throw Error();if(2<arguments.length){var c=Array.prototype.slice.call(arguments,2);return function(){var v=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(v,c),t.apply(s,v)}}return function(){return t.apply(s,arguments)}}function k(t,s,a){return k=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?A:S,k.apply(null,arguments)}function x(t,s){var a=Array.prototype.slice.call(arguments,1);return function(){var c=a.slice();return c.push.apply(c,arguments),t.apply(this,c)}}function P(t,s){function a(){}a.prototype=s.prototype,t.aa=s.prototype,t.prototype=new a,t.prototype.constructor=t,t.Qb=function(c,v,I){for(var T=Array(arguments.length-2),D=2;D<arguments.length;D++)T[D-2]=arguments[D];return s.prototype[v].apply(c,T)}}function U(t){const s=t.length;if(0<s){const a=Array(s);for(let c=0;c<s;c++)a[c]=t[c];return a}return[]}function L(t,s){for(let a=1;a<arguments.length;a++){const c=arguments[a];if(w(c)){const v=t.length||0,I=c.length||0;t.length=v+I;for(let T=0;T<I;T++)t[v+T]=c[T]}else t.push(c)}}class oe{constructor(s,a){this.i=s,this.j=a,this.h=0,this.g=null}get(){let s;return 0<this.h?(this.h--,s=this.g,this.g=s.next,s.next=null):s=this.i(),s}}function Y(t){return/^[\s\xa0]*$/.test(t)}function j(){var t=y.navigator;return t&&(t=t.userAgent)?t:""}function Z(t){return Z[" "](t),t}Z[" "]=function(){};var Ce=j().indexOf("Gecko")!=-1&&!(j().toLowerCase().indexOf("webkit")!=-1&&j().indexOf("Edge")==-1)&&!(j().indexOf("Trident")!=-1||j().indexOf("MSIE")!=-1)&&j().indexOf("Edge")==-1;function q(t,s,a){for(const c in t)s.call(a,t[c],c,t)}function m(t,s){for(const a in t)s.call(void 0,t[a],a,t)}function u(t){const s={};for(const a in t)s[a]=t[a];return s}const f="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function p(t,s){let a,c;for(let v=1;v<arguments.length;v++){c=arguments[v];for(a in c)t[a]=c[a];for(let I=0;I<f.length;I++)a=f[I],Object.prototype.hasOwnProperty.call(c,a)&&(t[a]=c[a])}}function g(t){var s=1;t=t.split(":");const a=[];for(;0<s&&t.length;)a.push(t.shift()),s--;return t.length&&a.push(t.join(":")),a}function _(t){y.setTimeout(()=>{throw t},0)}function d(){var t=ln;let s=null;return t.g&&(s=t.g,t.g=t.g.next,t.g||(t.h=null),s.next=null),s}class ae{constructor(){this.h=this.g=null}add(s,a){const c=Qe.get();c.set(s,a),this.h?this.h.next=c:this.g=c,this.h=c}}var Qe=new oe(()=>new ro,t=>t.reset());class ro{constructor(){this.next=this.g=this.h=null}set(s,a){this.h=s,this.g=a,this.next=null}reset(){this.next=this.g=this.h=null}}let Ze,et=!1,ln=new ae,Ii=()=>{const t=y.Promise.resolve(void 0);Ze=()=>{t.then(so)}};var so=()=>{for(var t;t=d();){try{t.h.call(t.g)}catch(a){_(a)}var s=Qe;s.j(t),100>s.h&&(s.h++,t.next=s.g,s.g=t)}et=!1};function me(){this.s=this.s,this.C=this.C}me.prototype.s=!1,me.prototype.ma=function(){this.s||(this.s=!0,this.N())},me.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function B(t,s){this.type=t,this.g=this.target=s,this.defaultPrevented=!1}B.prototype.h=function(){this.defaultPrevented=!0};var oo=function(){if(!y.addEventListener||!Object.defineProperty)return!1;var t=!1,s=Object.defineProperty({},"passive",{get:function(){t=!0}});try{const a=()=>{};y.addEventListener("test",a,s),y.removeEventListener("test",a,s)}catch{}return t}();function tt(t,s){if(B.call(this,t?t.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,t){var a=this.type=t.type,c=t.changedTouches&&t.changedTouches.length?t.changedTouches[0]:null;if(this.target=t.target||t.srcElement,this.g=s,s=t.relatedTarget){if(Ce){e:{try{Z(s.nodeName);var v=!0;break e}catch{}v=!1}v||(s=null)}}else a=="mouseover"?s=t.fromElement:a=="mouseout"&&(s=t.toElement);this.relatedTarget=s,c?(this.clientX=c.clientX!==void 0?c.clientX:c.pageX,this.clientY=c.clientY!==void 0?c.clientY:c.pageY,this.screenX=c.screenX||0,this.screenY=c.screenY||0):(this.clientX=t.clientX!==void 0?t.clientX:t.pageX,this.clientY=t.clientY!==void 0?t.clientY:t.pageY,this.screenX=t.screenX||0,this.screenY=t.screenY||0),this.button=t.button,this.key=t.key||"",this.ctrlKey=t.ctrlKey,this.altKey=t.altKey,this.shiftKey=t.shiftKey,this.metaKey=t.metaKey,this.pointerId=t.pointerId||0,this.pointerType=typeof t.pointerType=="string"?t.pointerType:ao[t.pointerType]||"",this.state=t.state,this.i=t,t.defaultPrevented&&tt.aa.h.call(this)}}P(tt,B);var ao={2:"touch",3:"pen",4:"mouse"};tt.prototype.h=function(){tt.aa.h.call(this);var t=this.i;t.preventDefault?t.preventDefault():t.returnValue=!1};var Ct="closure_listenable_"+(1e6*Math.random()|0),lo=0;function co(t,s,a,c,v){this.listener=t,this.proxy=null,this.src=s,this.type=a,this.capture=!!c,this.ha=v,this.key=++lo,this.da=this.fa=!1}function Pt(t){t.da=!0,t.listener=null,t.proxy=null,t.src=null,t.ha=null}function Rt(t){this.src=t,this.g={},this.h=0}Rt.prototype.add=function(t,s,a,c,v){var I=t.toString();t=this.g[I],t||(t=this.g[I]=[],this.h++);var T=hn(t,s,c,v);return-1<T?(s=t[T],a||(s.fa=!1)):(s=new co(s,this.src,I,!!c,v),s.fa=a,t.push(s)),s};function cn(t,s){var a=s.type;if(a in t.g){var c=t.g[a],v=Array.prototype.indexOf.call(c,s,void 0),I;(I=0<=v)&&Array.prototype.splice.call(c,v,1),I&&(Pt(s),t.g[a].length==0&&(delete t.g[a],t.h--))}}function hn(t,s,a,c){for(var v=0;v<t.length;++v){var I=t[v];if(!I.da&&I.listener==s&&I.capture==!!a&&I.ha==c)return v}return-1}var un="closure_lm_"+(1e6*Math.random()|0),dn={};function wi(t,s,a,c,v){if(Array.isArray(s)){for(var I=0;I<s.length;I++)wi(t,s[I],a,c,v);return null}return a=bi(a),t&&t[Ct]?t.K(s,a,E(c)?!!c.capture:!1,v):ho(t,s,a,!1,c,v)}function ho(t,s,a,c,v,I){if(!s)throw Error("Invalid event type");var T=E(v)?!!v.capture:!!v,D=pn(t);if(D||(t[un]=D=new Rt(t)),a=D.add(s,a,c,T,I),a.proxy)return a;if(c=uo(),a.proxy=c,c.src=t,c.listener=a,t.addEventListener)oo||(v=T),v===void 0&&(v=!1),t.addEventListener(s.toString(),c,v);else if(t.attachEvent)t.attachEvent(Ti(s.toString()),c);else if(t.addListener&&t.removeListener)t.addListener(c);else throw Error("addEventListener and attachEvent are unavailable.");return a}function uo(){function t(a){return s.call(t.src,t.listener,a)}const s=fo;return t}function Ei(t,s,a,c,v){if(Array.isArray(s))for(var I=0;I<s.length;I++)Ei(t,s[I],a,c,v);else c=E(c)?!!c.capture:!!c,a=bi(a),t&&t[Ct]?(t=t.i,s=String(s).toString(),s in t.g&&(I=t.g[s],a=hn(I,a,c,v),-1<a&&(Pt(I[a]),Array.prototype.splice.call(I,a,1),I.length==0&&(delete t.g[s],t.h--)))):t&&(t=pn(t))&&(s=t.g[s.toString()],t=-1,s&&(t=hn(s,a,c,v)),(a=-1<t?s[t]:null)&&fn(a))}function fn(t){if(typeof t!="number"&&t&&!t.da){var s=t.src;if(s&&s[Ct])cn(s.i,t);else{var a=t.type,c=t.proxy;s.removeEventListener?s.removeEventListener(a,c,t.capture):s.detachEvent?s.detachEvent(Ti(a),c):s.addListener&&s.removeListener&&s.removeListener(c),(a=pn(s))?(cn(a,t),a.h==0&&(a.src=null,s[un]=null)):Pt(t)}}}function Ti(t){return t in dn?dn[t]:dn[t]="on"+t}function fo(t,s){if(t.da)t=!0;else{s=new tt(s,this);var a=t.listener,c=t.ha||t.src;t.fa&&fn(t),t=a.call(c,s)}return t}function pn(t){return t=t[un],t instanceof Rt?t:null}var gn="__closure_events_fn_"+(1e9*Math.random()>>>0);function bi(t){return typeof t=="function"?t:(t[gn]||(t[gn]=function(s){return t.handleEvent(s)}),t[gn])}function V(){me.call(this),this.i=new Rt(this),this.M=this,this.F=null}P(V,me),V.prototype[Ct]=!0,V.prototype.removeEventListener=function(t,s,a,c){Ei(this,t,s,a,c)};function z(t,s){var a,c=t.F;if(c)for(a=[];c;c=c.F)a.push(c);if(t=t.M,c=s.type||s,typeof s=="string")s=new B(s,t);else if(s instanceof B)s.target=s.target||t;else{var v=s;s=new B(c,t),p(s,v)}if(v=!0,a)for(var I=a.length-1;0<=I;I--){var T=s.g=a[I];v=Ot(T,c,!0,s)&&v}if(T=s.g=t,v=Ot(T,c,!0,s)&&v,v=Ot(T,c,!1,s)&&v,a)for(I=0;I<a.length;I++)T=s.g=a[I],v=Ot(T,c,!1,s)&&v}V.prototype.N=function(){if(V.aa.N.call(this),this.i){var t=this.i,s;for(s in t.g){for(var a=t.g[s],c=0;c<a.length;c++)Pt(a[c]);delete t.g[s],t.h--}}this.F=null},V.prototype.K=function(t,s,a,c){return this.i.add(String(t),s,!1,a,c)},V.prototype.L=function(t,s,a,c){return this.i.add(String(t),s,!0,a,c)};function Ot(t,s,a,c){if(s=t.i.g[String(s)],!s)return!0;s=s.concat();for(var v=!0,I=0;I<s.length;++I){var T=s[I];if(T&&!T.da&&T.capture==a){var D=T.listener,F=T.ha||T.src;T.fa&&cn(t.i,T),v=D.call(F,c)!==!1&&v}}return v&&!c.defaultPrevented}function Ai(t,s,a){if(typeof t=="function")a&&(t=k(t,a));else if(t&&typeof t.handleEvent=="function")t=k(t.handleEvent,t);else throw Error("Invalid listener argument");return 2147483647<Number(s)?-1:y.setTimeout(t,s||0)}function Si(t){t.g=Ai(()=>{t.g=null,t.i&&(t.i=!1,Si(t))},t.l);const s=t.h;t.h=null,t.m.apply(null,s)}class po extends me{constructor(s,a){super(),this.m=s,this.l=a,this.h=null,this.i=!1,this.g=null}j(s){this.h=arguments,this.g?this.i=!0:Si(this)}N(){super.N(),this.g&&(y.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function nt(t){me.call(this),this.h=t,this.g={}}P(nt,me);var ki=[];function Ci(t){q(t.g,function(s,a){this.g.hasOwnProperty(a)&&fn(s)},t),t.g={}}nt.prototype.N=function(){nt.aa.N.call(this),Ci(this)},nt.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var mn=y.JSON.stringify,go=y.JSON.parse,mo=class{stringify(t){return y.JSON.stringify(t,void 0)}parse(t){return y.JSON.parse(t,void 0)}};function vn(){}vn.prototype.h=null;function Pi(t){return t.h||(t.h=t.i())}function vo(){}var it={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function yn(){B.call(this,"d")}P(yn,B);function _n(){B.call(this,"c")}P(_n,B);var xe={},Ri=null;function In(){return Ri=Ri||new V}xe.La="serverreachability";function Oi(t){B.call(this,xe.La,t)}P(Oi,B);function rt(t){const s=In();z(s,new Oi(s))}xe.STAT_EVENT="statevent";function Di(t,s){B.call(this,xe.STAT_EVENT,t),this.stat=s}P(Di,B);function W(t){const s=In();z(s,new Di(s,t))}xe.Ma="timingevent";function Ni(t,s){B.call(this,xe.Ma,t),this.size=s}P(Ni,B);function st(t,s){if(typeof t!="function")throw Error("Fn must not be null and must be a function");return y.setTimeout(function(){t()},s)}function ot(){this.g=!0}ot.prototype.xa=function(){this.g=!1};function yo(t,s,a,c,v,I){t.info(function(){if(t.g)if(I)for(var T="",D=I.split("&"),F=0;F<D.length;F++){var R=D[F].split("=");if(1<R.length){var H=R[0];R=R[1];var $=H.split("_");T=2<=$.length&&$[1]=="type"?T+(H+"="+R+"&"):T+(H+"=redacted&")}}else T=null;else T=I;return"XMLHTTP REQ ("+c+") [attempt "+v+"]: "+s+`
`+a+`
`+T})}function _o(t,s,a,c,v,I,T){t.info(function(){return"XMLHTTP RESP ("+c+") [ attempt "+v+"]: "+s+`
`+a+`
`+I+" "+T})}function Fe(t,s,a,c){t.info(function(){return"XMLHTTP TEXT ("+s+"): "+wo(t,a)+(c?" "+c:"")})}function Io(t,s){t.info(function(){return"TIMEOUT: "+s})}ot.prototype.info=function(){};function wo(t,s){if(!t.g)return s;if(!s)return null;try{var a=JSON.parse(s);if(a){for(t=0;t<a.length;t++)if(Array.isArray(a[t])){var c=a[t];if(!(2>c.length)){var v=c[1];if(Array.isArray(v)&&!(1>v.length)){var I=v[0];if(I!="noop"&&I!="stop"&&I!="close")for(var T=1;T<v.length;T++)v[T]=""}}}}return mn(a)}catch{return s}}var wn={NO_ERROR:0,TIMEOUT:8},Eo={},En;function Dt(){}P(Dt,vn),Dt.prototype.g=function(){return new XMLHttpRequest},Dt.prototype.i=function(){return{}},En=new Dt;function ve(t,s,a,c){this.j=t,this.i=s,this.l=a,this.R=c||1,this.U=new nt(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Li}function Li(){this.i=null,this.g="",this.h=!1}var Mi={},Tn={};function bn(t,s,a){t.L=1,t.v=Ut(le(s)),t.m=a,t.P=!0,Ui(t,null)}function Ui(t,s){t.F=Date.now(),Nt(t),t.A=le(t.v);var a=t.A,c=t.R;Array.isArray(c)||(c=[String(c)]),Xi(a.i,"t",c),t.C=0,a=t.j.J,t.h=new Li,t.g=pr(t.j,a?s:null,!t.m),0<t.O&&(t.M=new po(k(t.Y,t,t.g),t.O)),s=t.U,a=t.g,c=t.ca;var v="readystatechange";Array.isArray(v)||(v&&(ki[0]=v.toString()),v=ki);for(var I=0;I<v.length;I++){var T=wi(a,v[I],c||s.handleEvent,!1,s.h||s);if(!T)break;s.g[T.key]=T}s=t.H?u(t.H):{},t.m?(t.u||(t.u="POST"),s["Content-Type"]="application/x-www-form-urlencoded",t.g.ea(t.A,t.u,t.m,s)):(t.u="GET",t.g.ea(t.A,t.u,null,s)),rt(),yo(t.i,t.u,t.A,t.l,t.R,t.m)}ve.prototype.ca=function(t){t=t.target;const s=this.M;s&&ce(t)==3?s.j():this.Y(t)},ve.prototype.Y=function(t){try{if(t==this.g)e:{const $=ce(this.g);var s=this.g.Ba();const Ve=this.g.Z();if(!(3>$)&&($!=3||this.g&&(this.h.h||this.g.oa()||ir(this.g)))){this.J||$!=4||s==7||(s==8||0>=Ve?rt(3):rt(2)),An(this);var a=this.g.Z();this.X=a;t:if(xi(this)){var c=ir(this.g);t="";var v=c.length,I=ce(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Pe(this),at(this);var T="";break t}this.h.i=new y.TextDecoder}for(s=0;s<v;s++)this.h.h=!0,t+=this.h.i.decode(c[s],{stream:!(I&&s==v-1)});c.length=0,this.h.g+=t,this.C=0,T=this.h.g}else T=this.g.oa();if(this.o=a==200,_o(this.i,this.u,this.A,this.l,this.R,$,a),this.o){if(this.T&&!this.K){t:{if(this.g){var D,F=this.g;if((D=F.g?F.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!Y(D)){var R=D;break t}}R=null}if(a=R)Fe(this.i,this.l,a,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Sn(this,a);else{this.o=!1,this.s=3,W(12),Pe(this),at(this);break e}}if(this.P){a=!0;let ee;for(;!this.J&&this.C<T.length;)if(ee=To(this,T),ee==Tn){$==4&&(this.s=4,W(14),a=!1),Fe(this.i,this.l,null,"[Incomplete Response]");break}else if(ee==Mi){this.s=4,W(15),Fe(this.i,this.l,T,"[Invalid Chunk]"),a=!1;break}else Fe(this.i,this.l,ee,null),Sn(this,ee);if(xi(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),$!=4||T.length!=0||this.h.h||(this.s=1,W(16),a=!1),this.o=this.o&&a,!a)Fe(this.i,this.l,T,"[Invalid Chunked Response]"),Pe(this),at(this);else if(0<T.length&&!this.W){this.W=!0;var H=this.j;H.g==this&&H.ba&&!H.M&&(H.j.info("Great, no buffering proxy detected. Bytes received: "+T.length),Dn(H),H.M=!0,W(11))}}else Fe(this.i,this.l,T,null),Sn(this,T);$==4&&Pe(this),this.o&&!this.J&&($==4?hr(this.j,this):(this.o=!1,Nt(this)))}else Bo(this.g),a==400&&0<T.indexOf("Unknown SID")?(this.s=3,W(12)):(this.s=0,W(13)),Pe(this),at(this)}}}catch{}finally{}};function xi(t){return t.g?t.u=="GET"&&t.L!=2&&t.j.Ca:!1}function To(t,s){var a=t.C,c=s.indexOf(`
`,a);return c==-1?Tn:(a=Number(s.substring(a,c)),isNaN(a)?Mi:(c+=1,c+a>s.length?Tn:(s=s.slice(c,c+a),t.C=c+a,s)))}ve.prototype.cancel=function(){this.J=!0,Pe(this)};function Nt(t){t.S=Date.now()+t.I,Fi(t,t.I)}function Fi(t,s){if(t.B!=null)throw Error("WatchDog timer not null");t.B=st(k(t.ba,t),s)}function An(t){t.B&&(y.clearTimeout(t.B),t.B=null)}ve.prototype.ba=function(){this.B=null;const t=Date.now();0<=t-this.S?(Io(this.i,this.A),this.L!=2&&(rt(),W(17)),Pe(this),this.s=2,at(this)):Fi(this,this.S-t)};function at(t){t.j.G==0||t.J||hr(t.j,t)}function Pe(t){An(t);var s=t.M;s&&typeof s.ma=="function"&&s.ma(),t.M=null,Ci(t.U),t.g&&(s=t.g,t.g=null,s.abort(),s.ma())}function Sn(t,s){try{var a=t.j;if(a.G!=0&&(a.g==t||kn(a.h,t))){if(!t.K&&kn(a.h,t)&&a.G==3){try{var c=a.Da.g.parse(s)}catch{c=null}if(Array.isArray(c)&&c.length==3){var v=c;if(v[0]==0){e:if(!a.u){if(a.g)if(a.g.F+3e3<t.F)Ht(a),Bt(a);else break e;On(a),W(18)}}else a.za=v[1],0<a.za-a.T&&37500>v[2]&&a.F&&a.v==0&&!a.C&&(a.C=st(k(a.Za,a),6e3));if(1>=Vi(a.h)&&a.ca){try{a.ca()}catch{}a.ca=void 0}}else Oe(a,11)}else if((t.K||a.g==t)&&Ht(a),!Y(s))for(v=a.Da.g.parse(s),s=0;s<v.length;s++){let R=v[s];if(a.T=R[0],R=R[1],a.G==2)if(R[0]=="c"){a.K=R[1],a.ia=R[2];const H=R[3];H!=null&&(a.la=H,a.j.info("VER="+a.la));const $=R[4];$!=null&&(a.Aa=$,a.j.info("SVER="+a.Aa));const Ve=R[5];Ve!=null&&typeof Ve=="number"&&0<Ve&&(c=1.5*Ve,a.L=c,a.j.info("backChannelRequestTimeoutMs_="+c)),c=a;const ee=t.g;if(ee){const $t=ee.g?ee.g.getResponseHeader("X-Client-Wire-Protocol"):null;if($t){var I=c.h;I.g||$t.indexOf("spdy")==-1&&$t.indexOf("quic")==-1&&$t.indexOf("h2")==-1||(I.j=I.l,I.g=new Set,I.h&&(Cn(I,I.h),I.h=null))}if(c.D){const Nn=ee.g?ee.g.getResponseHeader("X-HTTP-Session-Id"):null;Nn&&(c.ya=Nn,N(c.I,c.D,Nn))}}a.G=3,a.l&&a.l.ua(),a.ba&&(a.R=Date.now()-t.F,a.j.info("Handshake RTT: "+a.R+"ms")),c=a;var T=t;if(c.qa=fr(c,c.J?c.ia:null,c.W),T.K){Hi(c.h,T);var D=T,F=c.L;F&&(D.I=F),D.B&&(An(D),Nt(D)),c.g=T}else lr(c);0<a.i.length&&Vt(a)}else R[0]!="stop"&&R[0]!="close"||Oe(a,7);else a.G==3&&(R[0]=="stop"||R[0]=="close"?R[0]=="stop"?Oe(a,7):Rn(a):R[0]!="noop"&&a.l&&a.l.ta(R),a.v=0)}}rt(4)}catch{}}var bo=class{constructor(t,s){this.g=t,this.map=s}};function ji(t){this.l=t||10,y.PerformanceNavigationTiming?(t=y.performance.getEntriesByType("navigation"),t=0<t.length&&(t[0].nextHopProtocol=="hq"||t[0].nextHopProtocol=="h2")):t=!!(y.chrome&&y.chrome.loadTimes&&y.chrome.loadTimes()&&y.chrome.loadTimes().wasFetchedViaSpdy),this.j=t?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Bi(t){return t.h?!0:t.g?t.g.size>=t.j:!1}function Vi(t){return t.h?1:t.g?t.g.size:0}function kn(t,s){return t.h?t.h==s:t.g?t.g.has(s):!1}function Cn(t,s){t.g?t.g.add(s):t.h=s}function Hi(t,s){t.h&&t.h==s?t.h=null:t.g&&t.g.has(s)&&t.g.delete(s)}ji.prototype.cancel=function(){if(this.i=$i(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const t of this.g.values())t.cancel();this.g.clear()}};function $i(t){if(t.h!=null)return t.i.concat(t.h.D);if(t.g!=null&&t.g.size!==0){let s=t.i;for(const a of t.g.values())s=s.concat(a.D);return s}return U(t.i)}function Ao(t){if(t.V&&typeof t.V=="function")return t.V();if(typeof Map<"u"&&t instanceof Map||typeof Set<"u"&&t instanceof Set)return Array.from(t.values());if(typeof t=="string")return t.split("");if(w(t)){for(var s=[],a=t.length,c=0;c<a;c++)s.push(t[c]);return s}s=[],a=0;for(c in t)s[a++]=t[c];return s}function So(t){if(t.na&&typeof t.na=="function")return t.na();if(!t.V||typeof t.V!="function"){if(typeof Map<"u"&&t instanceof Map)return Array.from(t.keys());if(!(typeof Set<"u"&&t instanceof Set)){if(w(t)||typeof t=="string"){var s=[];t=t.length;for(var a=0;a<t;a++)s.push(a);return s}s=[],a=0;for(const c in t)s[a++]=c;return s}}}function zi(t,s){if(t.forEach&&typeof t.forEach=="function")t.forEach(s,void 0);else if(w(t)||typeof t=="string")Array.prototype.forEach.call(t,s,void 0);else for(var a=So(t),c=Ao(t),v=c.length,I=0;I<v;I++)s.call(void 0,c[I],a&&a[I],t)}var Wi=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function ko(t,s){if(t){t=t.split("&");for(var a=0;a<t.length;a++){var c=t[a].indexOf("="),v=null;if(0<=c){var I=t[a].substring(0,c);v=t[a].substring(c+1)}else I=t[a];s(I,v?decodeURIComponent(v.replace(/\+/g," ")):"")}}}function Re(t){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,t instanceof Re){this.h=t.h,Lt(this,t.j),this.o=t.o,this.g=t.g,Mt(this,t.s),this.l=t.l;var s=t.i,a=new ht;a.i=s.i,s.g&&(a.g=new Map(s.g),a.h=s.h),Gi(this,a),this.m=t.m}else t&&(s=String(t).match(Wi))?(this.h=!1,Lt(this,s[1]||"",!0),this.o=lt(s[2]||""),this.g=lt(s[3]||"",!0),Mt(this,s[4]),this.l=lt(s[5]||"",!0),Gi(this,s[6]||"",!0),this.m=lt(s[7]||"")):(this.h=!1,this.i=new ht(null,this.h))}Re.prototype.toString=function(){var t=[],s=this.j;s&&t.push(ct(s,Ki,!0),":");var a=this.g;return(a||s=="file")&&(t.push("//"),(s=this.o)&&t.push(ct(s,Ki,!0),"@"),t.push(encodeURIComponent(String(a)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a=this.s,a!=null&&t.push(":",String(a))),(a=this.l)&&(this.g&&a.charAt(0)!="/"&&t.push("/"),t.push(ct(a,a.charAt(0)=="/"?Ro:Po,!0))),(a=this.i.toString())&&t.push("?",a),(a=this.m)&&t.push("#",ct(a,Do)),t.join("")};function le(t){return new Re(t)}function Lt(t,s,a){t.j=a?lt(s,!0):s,t.j&&(t.j=t.j.replace(/:$/,""))}function Mt(t,s){if(s){if(s=Number(s),isNaN(s)||0>s)throw Error("Bad port number "+s);t.s=s}else t.s=null}function Gi(t,s,a){s instanceof ht?(t.i=s,No(t.i,t.h)):(a||(s=ct(s,Oo)),t.i=new ht(s,t.h))}function N(t,s,a){t.i.set(s,a)}function Ut(t){return N(t,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),t}function lt(t,s){return t?s?decodeURI(t.replace(/%25/g,"%2525")):decodeURIComponent(t):""}function ct(t,s,a){return typeof t=="string"?(t=encodeURI(t).replace(s,Co),a&&(t=t.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),t):null}function Co(t){return t=t.charCodeAt(0),"%"+(t>>4&15).toString(16)+(t&15).toString(16)}var Ki=/[#\/\?@]/g,Po=/[#\?:]/g,Ro=/[#\?]/g,Oo=/[#\?@]/g,Do=/#/g;function ht(t,s){this.h=this.g=null,this.i=t||null,this.j=!!s}function ye(t){t.g||(t.g=new Map,t.h=0,t.i&&ko(t.i,function(s,a){t.add(decodeURIComponent(s.replace(/\+/g," ")),a)}))}i=ht.prototype,i.add=function(t,s){ye(this),this.i=null,t=je(this,t);var a=this.g.get(t);return a||this.g.set(t,a=[]),a.push(s),this.h+=1,this};function qi(t,s){ye(t),s=je(t,s),t.g.has(s)&&(t.i=null,t.h-=t.g.get(s).length,t.g.delete(s))}function Ji(t,s){return ye(t),s=je(t,s),t.g.has(s)}i.forEach=function(t,s){ye(this),this.g.forEach(function(a,c){a.forEach(function(v){t.call(s,v,c,this)},this)},this)},i.na=function(){ye(this);const t=Array.from(this.g.values()),s=Array.from(this.g.keys()),a=[];for(let c=0;c<s.length;c++){const v=t[c];for(let I=0;I<v.length;I++)a.push(s[c])}return a},i.V=function(t){ye(this);let s=[];if(typeof t=="string")Ji(this,t)&&(s=s.concat(this.g.get(je(this,t))));else{t=Array.from(this.g.values());for(let a=0;a<t.length;a++)s=s.concat(t[a])}return s},i.set=function(t,s){return ye(this),this.i=null,t=je(this,t),Ji(this,t)&&(this.h-=this.g.get(t).length),this.g.set(t,[s]),this.h+=1,this},i.get=function(t,s){return t?(t=this.V(t),0<t.length?String(t[0]):s):s};function Xi(t,s,a){qi(t,s),0<a.length&&(t.i=null,t.g.set(je(t,s),U(a)),t.h+=a.length)}i.toString=function(){if(this.i)return this.i;if(!this.g)return"";const t=[],s=Array.from(this.g.keys());for(var a=0;a<s.length;a++){var c=s[a];const I=encodeURIComponent(String(c)),T=this.V(c);for(c=0;c<T.length;c++){var v=I;T[c]!==""&&(v+="="+encodeURIComponent(String(T[c]))),t.push(v)}}return this.i=t.join("&")};function je(t,s){return s=String(s),t.j&&(s=s.toLowerCase()),s}function No(t,s){s&&!t.j&&(ye(t),t.i=null,t.g.forEach(function(a,c){var v=c.toLowerCase();c!=v&&(qi(this,c),Xi(this,v,a))},t)),t.j=s}function Lo(t,s){const a=new ot;if(y.Image){const c=new Image;c.onload=x(_e,a,"TestLoadImage: loaded",!0,s,c),c.onerror=x(_e,a,"TestLoadImage: error",!1,s,c),c.onabort=x(_e,a,"TestLoadImage: abort",!1,s,c),c.ontimeout=x(_e,a,"TestLoadImage: timeout",!1,s,c),y.setTimeout(function(){c.ontimeout&&c.ontimeout()},1e4),c.src=t}else s(!1)}function Mo(t,s){const a=new ot,c=new AbortController,v=setTimeout(()=>{c.abort(),_e(a,"TestPingServer: timeout",!1,s)},1e4);fetch(t,{signal:c.signal}).then(I=>{clearTimeout(v),I.ok?_e(a,"TestPingServer: ok",!0,s):_e(a,"TestPingServer: server error",!1,s)}).catch(()=>{clearTimeout(v),_e(a,"TestPingServer: error",!1,s)})}function _e(t,s,a,c,v){try{v&&(v.onload=null,v.onerror=null,v.onabort=null,v.ontimeout=null),c(a)}catch{}}function Uo(){this.g=new mo}function xo(t,s,a){const c=a||"";try{zi(t,function(v,I){let T=v;E(v)&&(T=mn(v)),s.push(c+I+"="+encodeURIComponent(T))})}catch(v){throw s.push(c+"type="+encodeURIComponent("_badmap")),v}}function xt(t){this.l=t.Ub||null,this.j=t.eb||!1}P(xt,vn),xt.prototype.g=function(){return new Ft(this.l,this.j)},xt.prototype.i=function(t){return function(){return t}}({});function Ft(t,s){V.call(this),this.D=t,this.o=s,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}P(Ft,V),i=Ft.prototype,i.open=function(t,s){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=t,this.A=s,this.readyState=1,dt(this)},i.send=function(t){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const s={headers:this.u,method:this.B,credentials:this.m,cache:void 0};t&&(s.body=t),(this.D||y).fetch(new Request(this.A,s)).then(this.Sa.bind(this),this.ga.bind(this))},i.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,ut(this)),this.readyState=0},i.Sa=function(t){if(this.g&&(this.l=t,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=t.headers,this.readyState=2,dt(this)),this.g&&(this.readyState=3,dt(this),this.g)))if(this.responseType==="arraybuffer")t.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof y.ReadableStream<"u"&&"body"in t){if(this.j=t.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Yi(this)}else t.text().then(this.Ra.bind(this),this.ga.bind(this))};function Yi(t){t.j.read().then(t.Pa.bind(t)).catch(t.ga.bind(t))}i.Pa=function(t){if(this.g){if(this.o&&t.value)this.response.push(t.value);else if(!this.o){var s=t.value?t.value:new Uint8Array(0);(s=this.v.decode(s,{stream:!t.done}))&&(this.response=this.responseText+=s)}t.done?ut(this):dt(this),this.readyState==3&&Yi(this)}},i.Ra=function(t){this.g&&(this.response=this.responseText=t,ut(this))},i.Qa=function(t){this.g&&(this.response=t,ut(this))},i.ga=function(){this.g&&ut(this)};function ut(t){t.readyState=4,t.l=null,t.j=null,t.v=null,dt(t)}i.setRequestHeader=function(t,s){this.u.append(t,s)},i.getResponseHeader=function(t){return this.h&&this.h.get(t.toLowerCase())||""},i.getAllResponseHeaders=function(){if(!this.h)return"";const t=[],s=this.h.entries();for(var a=s.next();!a.done;)a=a.value,t.push(a[0]+": "+a[1]),a=s.next();return t.join(`\r
`)};function dt(t){t.onreadystatechange&&t.onreadystatechange.call(t)}Object.defineProperty(Ft.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(t){this.m=t?"include":"same-origin"}});function Qi(t){let s="";return q(t,function(a,c){s+=c,s+=":",s+=a,s+=`\r
`}),s}function Pn(t,s,a){e:{for(c in a){var c=!1;break e}c=!0}c||(a=Qi(a),typeof t=="string"?a!=null&&encodeURIComponent(String(a)):N(t,s,a))}function M(t){V.call(this),this.headers=new Map,this.o=t||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}P(M,V);var Fo=/^https?$/i,jo=["POST","PUT"];i=M.prototype,i.Ha=function(t){this.J=t},i.ea=function(t,s,a,c){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+t);s=s?s.toUpperCase():"GET",this.D=t,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():En.g(),this.v=this.o?Pi(this.o):Pi(En),this.g.onreadystatechange=k(this.Ea,this);try{this.B=!0,this.g.open(s,String(t),!0),this.B=!1}catch(I){Zi(this,I);return}if(t=a||"",a=new Map(this.headers),c)if(Object.getPrototypeOf(c)===Object.prototype)for(var v in c)a.set(v,c[v]);else if(typeof c.keys=="function"&&typeof c.get=="function")for(const I of c.keys())a.set(I,c.get(I));else throw Error("Unknown input type for opt_headers: "+String(c));c=Array.from(a.keys()).find(I=>I.toLowerCase()=="content-type"),v=y.FormData&&t instanceof y.FormData,!(0<=Array.prototype.indexOf.call(jo,s,void 0))||c||v||a.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[I,T]of a)this.g.setRequestHeader(I,T);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{nr(this),this.u=!0,this.g.send(t),this.u=!1}catch(I){Zi(this,I)}};function Zi(t,s){t.h=!1,t.g&&(t.j=!0,t.g.abort(),t.j=!1),t.l=s,t.m=5,er(t),jt(t)}function er(t){t.A||(t.A=!0,z(t,"complete"),z(t,"error"))}i.abort=function(t){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=t||7,z(this,"complete"),z(this,"abort"),jt(this))},i.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),jt(this,!0)),M.aa.N.call(this)},i.Ea=function(){this.s||(this.B||this.u||this.j?tr(this):this.bb())},i.bb=function(){tr(this)};function tr(t){if(t.h&&typeof h<"u"&&(!t.v[1]||ce(t)!=4||t.Z()!=2)){if(t.u&&ce(t)==4)Ai(t.Ea,0,t);else if(z(t,"readystatechange"),ce(t)==4){t.h=!1;try{const T=t.Z();e:switch(T){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var s=!0;break e;default:s=!1}var a;if(!(a=s)){var c;if(c=T===0){var v=String(t.D).match(Wi)[1]||null;!v&&y.self&&y.self.location&&(v=y.self.location.protocol.slice(0,-1)),c=!Fo.test(v?v.toLowerCase():"")}a=c}if(a)z(t,"complete"),z(t,"success");else{t.m=6;try{var I=2<ce(t)?t.g.statusText:""}catch{I=""}t.l=I+" ["+t.Z()+"]",er(t)}}finally{jt(t)}}}}function jt(t,s){if(t.g){nr(t);const a=t.g,c=t.v[0]?()=>{}:null;t.g=null,t.v=null,s||z(t,"ready");try{a.onreadystatechange=c}catch{}}}function nr(t){t.I&&(y.clearTimeout(t.I),t.I=null)}i.isActive=function(){return!!this.g};function ce(t){return t.g?t.g.readyState:0}i.Z=function(){try{return 2<ce(this)?this.g.status:-1}catch{return-1}},i.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},i.Oa=function(t){if(this.g){var s=this.g.responseText;return t&&s.indexOf(t)==0&&(s=s.substring(t.length)),go(s)}};function ir(t){try{if(!t.g)return null;if("response"in t.g)return t.g.response;switch(t.H){case"":case"text":return t.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in t.g)return t.g.mozResponseArrayBuffer}return null}catch{return null}}function Bo(t){const s={};t=(t.g&&2<=ce(t)&&t.g.getAllResponseHeaders()||"").split(`\r
`);for(let c=0;c<t.length;c++){if(Y(t[c]))continue;var a=g(t[c]);const v=a[0];if(a=a[1],typeof a!="string")continue;a=a.trim();const I=s[v]||[];s[v]=I,I.push(a)}m(s,function(c){return c.join(", ")})}i.Ba=function(){return this.m},i.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function ft(t,s,a){return a&&a.internalChannelParams&&a.internalChannelParams[t]||s}function rr(t){this.Aa=0,this.i=[],this.j=new ot,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=ft("failFast",!1,t),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=ft("baseRetryDelayMs",5e3,t),this.cb=ft("retryDelaySeedMs",1e4,t),this.Wa=ft("forwardChannelMaxRetries",2,t),this.wa=ft("forwardChannelRequestTimeoutMs",2e4,t),this.pa=t&&t.xmlHttpFactory||void 0,this.Xa=t&&t.Tb||void 0,this.Ca=t&&t.useFetchStreams||!1,this.L=void 0,this.J=t&&t.supportsCrossDomainXhr||!1,this.K="",this.h=new ji(t&&t.concurrentRequestLimit),this.Da=new Uo,this.P=t&&t.fastHandshake||!1,this.O=t&&t.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=t&&t.Rb||!1,t&&t.xa&&this.j.xa(),t&&t.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&t&&t.detectBufferingProxy||!1,this.ja=void 0,t&&t.longPollingTimeout&&0<t.longPollingTimeout&&(this.ja=t.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}i=rr.prototype,i.la=8,i.G=1,i.connect=function(t,s,a,c){W(0),this.W=t,this.H=s||{},a&&c!==void 0&&(this.H.OSID=a,this.H.OAID=c),this.F=this.X,this.I=fr(this,null,this.W),Vt(this)};function Rn(t){if(sr(t),t.G==3){var s=t.U++,a=le(t.I);if(N(a,"SID",t.K),N(a,"RID",s),N(a,"TYPE","terminate"),pt(t,a),s=new ve(t,t.j,s),s.L=2,s.v=Ut(le(a)),a=!1,y.navigator&&y.navigator.sendBeacon)try{a=y.navigator.sendBeacon(s.v.toString(),"")}catch{}!a&&y.Image&&(new Image().src=s.v,a=!0),a||(s.g=pr(s.j,null),s.g.ea(s.v)),s.F=Date.now(),Nt(s)}dr(t)}function Bt(t){t.g&&(Dn(t),t.g.cancel(),t.g=null)}function sr(t){Bt(t),t.u&&(y.clearTimeout(t.u),t.u=null),Ht(t),t.h.cancel(),t.s&&(typeof t.s=="number"&&y.clearTimeout(t.s),t.s=null)}function Vt(t){if(!Bi(t.h)&&!t.s){t.s=!0;var s=t.Ga;Ze||Ii(),et||(Ze(),et=!0),ln.add(s,t),t.B=0}}function Vo(t,s){return Vi(t.h)>=t.h.j-(t.s?1:0)?!1:t.s?(t.i=s.D.concat(t.i),!0):t.G==1||t.G==2||t.B>=(t.Va?0:t.Wa)?!1:(t.s=st(k(t.Ga,t,s),ur(t,t.B)),t.B++,!0)}i.Ga=function(t){if(this.s)if(this.s=null,this.G==1){if(!t){this.U=Math.floor(1e5*Math.random()),t=this.U++;const v=new ve(this,this.j,t);let I=this.o;if(this.S&&(I?(I=u(I),p(I,this.S)):I=this.S),this.m!==null||this.O||(v.H=I,I=null),this.P)e:{for(var s=0,a=0;a<this.i.length;a++){t:{var c=this.i[a];if("__data__"in c.map&&(c=c.map.__data__,typeof c=="string")){c=c.length;break t}c=void 0}if(c===void 0)break;if(s+=c,4096<s){s=a;break e}if(s===4096||a===this.i.length-1){s=a+1;break e}}s=1e3}else s=1e3;s=ar(this,v,s),a=le(this.I),N(a,"RID",t),N(a,"CVER",22),this.D&&N(a,"X-HTTP-Session-Id",this.D),pt(this,a),I&&(this.O?s="headers="+encodeURIComponent(String(Qi(I)))+"&"+s:this.m&&Pn(a,this.m,I)),Cn(this.h,v),this.Ua&&N(a,"TYPE","init"),this.P?(N(a,"$req",s),N(a,"SID","null"),v.T=!0,bn(v,a,null)):bn(v,a,s),this.G=2}}else this.G==3&&(t?or(this,t):this.i.length==0||Bi(this.h)||or(this))};function or(t,s){var a;s?a=s.l:a=t.U++;const c=le(t.I);N(c,"SID",t.K),N(c,"RID",a),N(c,"AID",t.T),pt(t,c),t.m&&t.o&&Pn(c,t.m,t.o),a=new ve(t,t.j,a,t.B+1),t.m===null&&(a.H=t.o),s&&(t.i=s.D.concat(t.i)),s=ar(t,a,1e3),a.I=Math.round(.5*t.wa)+Math.round(.5*t.wa*Math.random()),Cn(t.h,a),bn(a,c,s)}function pt(t,s){t.H&&q(t.H,function(a,c){N(s,c,a)}),t.l&&zi({},function(a,c){N(s,c,a)})}function ar(t,s,a){a=Math.min(t.i.length,a);var c=t.l?k(t.l.Na,t.l,t):null;e:{var v=t.i;let I=-1;for(;;){const T=["count="+a];I==-1?0<a?(I=v[0].g,T.push("ofs="+I)):I=0:T.push("ofs="+I);let D=!0;for(let F=0;F<a;F++){let R=v[F].g;const H=v[F].map;if(R-=I,0>R)I=Math.max(0,v[F].g-100),D=!1;else try{xo(H,T,"req"+R+"_")}catch{c&&c(H)}}if(D){c=T.join("&");break e}}}return t=t.i.splice(0,a),s.D=t,c}function lr(t){if(!t.g&&!t.u){t.Y=1;var s=t.Fa;Ze||Ii(),et||(Ze(),et=!0),ln.add(s,t),t.v=0}}function On(t){return t.g||t.u||3<=t.v?!1:(t.Y++,t.u=st(k(t.Fa,t),ur(t,t.v)),t.v++,!0)}i.Fa=function(){if(this.u=null,cr(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var t=2*this.R;this.j.info("BP detection timer enabled: "+t),this.A=st(k(this.ab,this),t)}},i.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,W(10),Bt(this),cr(this))};function Dn(t){t.A!=null&&(y.clearTimeout(t.A),t.A=null)}function cr(t){t.g=new ve(t,t.j,"rpc",t.Y),t.m===null&&(t.g.H=t.o),t.g.O=0;var s=le(t.qa);N(s,"RID","rpc"),N(s,"SID",t.K),N(s,"AID",t.T),N(s,"CI",t.F?"0":"1"),!t.F&&t.ja&&N(s,"TO",t.ja),N(s,"TYPE","xmlhttp"),pt(t,s),t.m&&t.o&&Pn(s,t.m,t.o),t.L&&(t.g.I=t.L);var a=t.g;t=t.ia,a.L=1,a.v=Ut(le(s)),a.m=null,a.P=!0,Ui(a,t)}i.Za=function(){this.C!=null&&(this.C=null,Bt(this),On(this),W(19))};function Ht(t){t.C!=null&&(y.clearTimeout(t.C),t.C=null)}function hr(t,s){var a=null;if(t.g==s){Ht(t),Dn(t),t.g=null;var c=2}else if(kn(t.h,s))a=s.D,Hi(t.h,s),c=1;else return;if(t.G!=0){if(s.o)if(c==1){a=s.m?s.m.length:0,s=Date.now()-s.F;var v=t.B;c=In(),z(c,new Ni(c,a)),Vt(t)}else lr(t);else if(v=s.s,v==3||v==0&&0<s.X||!(c==1&&Vo(t,s)||c==2&&On(t)))switch(a&&0<a.length&&(s=t.h,s.i=s.i.concat(a)),v){case 1:Oe(t,5);break;case 4:Oe(t,10);break;case 3:Oe(t,6);break;default:Oe(t,2)}}}function ur(t,s){let a=t.Ta+Math.floor(Math.random()*t.cb);return t.isActive()||(a*=2),a*s}function Oe(t,s){if(t.j.info("Error code "+s),s==2){var a=k(t.fb,t),c=t.Xa;const v=!c;c=new Re(c||"//www.google.com/images/cleardot.gif"),y.location&&y.location.protocol=="http"||Lt(c,"https"),Ut(c),v?Lo(c.toString(),a):Mo(c.toString(),a)}else W(2);t.G=0,t.l&&t.l.sa(s),dr(t),sr(t)}i.fb=function(t){t?(this.j.info("Successfully pinged google.com"),W(2)):(this.j.info("Failed to ping google.com"),W(1))};function dr(t){if(t.G=0,t.ka=[],t.l){const s=$i(t.h);(s.length!=0||t.i.length!=0)&&(L(t.ka,s),L(t.ka,t.i),t.h.i.length=0,U(t.i),t.i.length=0),t.l.ra()}}function fr(t,s,a){var c=a instanceof Re?le(a):new Re(a);if(c.g!="")s&&(c.g=s+"."+c.g),Mt(c,c.s);else{var v=y.location;c=v.protocol,s=s?s+"."+v.hostname:v.hostname,v=+v.port;var I=new Re(null);c&&Lt(I,c),s&&(I.g=s),v&&Mt(I,v),a&&(I.l=a),c=I}return a=t.D,s=t.ya,a&&s&&N(c,a,s),N(c,"VER",t.la),pt(t,c),c}function pr(t,s,a){if(s&&!t.J)throw Error("Can't create secondary domain capable XhrIo object.");return s=t.Ca&&!t.pa?new M(new xt({eb:a})):new M(t.pa),s.Ha(t.J),s}i.isActive=function(){return!!this.l&&this.l.isActive(this)};function gr(){}i=gr.prototype,i.ua=function(){},i.ta=function(){},i.sa=function(){},i.ra=function(){},i.isActive=function(){return!0},i.Na=function(){};function Q(t,s){V.call(this),this.g=new rr(s),this.l=t,this.h=s&&s.messageUrlParams||null,t=s&&s.messageHeaders||null,s&&s.clientProtocolHeaderRequired&&(t?t["X-Client-Protocol"]="webchannel":t={"X-Client-Protocol":"webchannel"}),this.g.o=t,t=s&&s.initMessageHeaders||null,s&&s.messageContentType&&(t?t["X-WebChannel-Content-Type"]=s.messageContentType:t={"X-WebChannel-Content-Type":s.messageContentType}),s&&s.va&&(t?t["X-WebChannel-Client-Profile"]=s.va:t={"X-WebChannel-Client-Profile":s.va}),this.g.S=t,(t=s&&s.Sb)&&!Y(t)&&(this.g.m=t),this.v=s&&s.supportsCrossDomainXhr||!1,this.u=s&&s.sendRawJson||!1,(s=s&&s.httpSessionIdParam)&&!Y(s)&&(this.g.D=s,t=this.h,t!==null&&s in t&&(t=this.h,s in t&&delete t[s])),this.j=new Be(this)}P(Q,V),Q.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Q.prototype.close=function(){Rn(this.g)},Q.prototype.o=function(t){var s=this.g;if(typeof t=="string"){var a={};a.__data__=t,t=a}else this.u&&(a={},a.__data__=mn(t),t=a);s.i.push(new bo(s.Ya++,t)),s.G==3&&Vt(s)},Q.prototype.N=function(){this.g.l=null,delete this.j,Rn(this.g),delete this.g,Q.aa.N.call(this)};function mr(t){yn.call(this),t.__headers__&&(this.headers=t.__headers__,this.statusCode=t.__status__,delete t.__headers__,delete t.__status__);var s=t.__sm__;if(s){e:{for(const a in s){t=a;break e}t=void 0}(this.i=t)&&(t=this.i,s=s!==null&&t in s?s[t]:void 0),this.data=s}else this.data=t}P(mr,yn);function vr(){_n.call(this),this.status=1}P(vr,_n);function Be(t){this.g=t}P(Be,gr),Be.prototype.ua=function(){z(this.g,"a")},Be.prototype.ta=function(t){z(this.g,new mr(t))},Be.prototype.sa=function(t){z(this.g,new vr)},Be.prototype.ra=function(){z(this.g,"b")},Q.prototype.send=Q.prototype.o,Q.prototype.open=Q.prototype.m,Q.prototype.close=Q.prototype.close,wn.NO_ERROR=0,wn.TIMEOUT=8,wn.HTTP_ERROR=6,Eo.COMPLETE="complete",vo.EventType=it,it.OPEN="a",it.CLOSE="b",it.ERROR="c",it.MESSAGE="d",V.prototype.listen=V.prototype.K,M.prototype.listenOnce=M.prototype.L,M.prototype.getLastError=M.prototype.Ka,M.prototype.getLastErrorCode=M.prototype.Ba,M.prototype.getStatus=M.prototype.Z,M.prototype.getResponseJson=M.prototype.Oa,M.prototype.getResponseText=M.prototype.oa,M.prototype.send=M.prototype.ea,M.prototype.setWithCredentials=M.prototype.Ha}).apply(typeof Wt<"u"?Wt:typeof self<"u"?self:typeof window<"u"?window:{});const Yr="@firebase/firestore",Qr="4.7.10";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class G{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}G.UNAUTHENTICATED=new G(null),G.GOOGLE_CREDENTIALS=new G("google-credentials-uid"),G.FIRST_PARTY=new G("first-party-uid"),G.MOCK_USER=new G("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let kt="11.5.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qe=new ri("@firebase/firestore");function ne(i,...e){if(qe.logLevel<=O.DEBUG){const n=e.map(vi);qe.debug(`Firestore (${kt}): ${i}`,...n)}}function Zs(i,...e){if(qe.logLevel<=O.ERROR){const n=e.map(vi);qe.error(`Firestore (${kt}): ${i}`,...n)}}function Vh(i,...e){if(qe.logLevel<=O.WARN){const n=e.map(vi);qe.warn(`Firestore (${kt}): ${i}`,...n)}}function vi(i){if(typeof i=="string")return i;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(n){return JSON.stringify(n)}(i)}catch{return i}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yi(i="Unexpected state"){const e=`FIRESTORE (${kt}) INTERNAL ASSERTION FAILED: `+i;throw Zs(e),new Error(e)}function yt(i,e){i||yi()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const J={CANCELLED:"cancelled",INVALID_ARGUMENT:"invalid-argument",FAILED_PRECONDITION:"failed-precondition"};class X extends ge{constructor(e,n){super(e,n),this.code=e,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _t{constructor(){this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eo{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class Hh{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable(()=>n(G.UNAUTHENTICATED))}shutdown(){}}class $h{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,n){this.changeListener=n,e.enqueueRetryable(()=>n(this.token.user))}shutdown(){this.changeListener=null}}class zh{constructor(e){this.t=e,this.currentUser=G.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,n){yt(this.o===void 0);let r=this.i;const o=w=>this.i!==r?(r=this.i,n(w)):Promise.resolve();let l=new _t;this.o=()=>{this.i++,this.currentUser=this.u(),l.resolve(),l=new _t,e.enqueueRetryable(()=>o(this.currentUser))};const h=()=>{const w=l;e.enqueueRetryable(async()=>{await w.promise,await o(this.currentUser)})},y=w=>{ne("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=w,this.o&&(this.auth.addAuthTokenListener(this.o),h())};this.t.onInit(w=>y(w)),setTimeout(()=>{if(!this.auth){const w=this.t.getImmediate({optional:!0});w?y(w):(ne("FirebaseAuthCredentialsProvider","Auth not yet detected"),l.resolve(),l=new _t)}},0),h()}getToken(){const e=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then(r=>this.i!==e?(ne("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(yt(typeof r.accessToken=="string"),new eo(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return yt(e===null||typeof e=="string"),new G(e)}}class Wh{constructor(e,n,r){this.l=e,this.h=n,this.P=r,this.type="FirstParty",this.user=G.FIRST_PARTY,this.T=new Map}I(){return this.P?this.P():null}get headers(){this.T.set("X-Goog-AuthUser",this.l);const e=this.I();return e&&this.T.set("Authorization",e),this.h&&this.T.set("X-Goog-Iam-Authorization-Token",this.h),this.T}}class Gh{constructor(e,n,r){this.l=e,this.h=n,this.P=r}getToken(){return Promise.resolve(new Wh(this.l,this.h,this.P))}start(e,n){e.enqueueRetryable(()=>n(G.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Zr{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Kh{constructor(e,n){this.A=n,this.forceRefresh=!1,this.appCheck=null,this.R=null,this.V=null,ie(e)&&e.settings.appCheckToken&&(this.V=e.settings.appCheckToken)}start(e,n){yt(this.o===void 0);const r=l=>{l.error!=null&&ne("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${l.error.message}`);const h=l.token!==this.R;return this.R=l.token,ne("FirebaseAppCheckTokenProvider",`Received ${h?"new":"existing"} token.`),h?n(l.token):Promise.resolve()};this.o=l=>{e.enqueueRetryable(()=>r(l))};const o=l=>{ne("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=l,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(l=>o(l)),setTimeout(()=>{if(!this.appCheck){const l=this.A.getImmediate({optional:!0});l?o(l):ne("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.V)return Promise.resolve(new Zr(this.V));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(n=>n?(yt(typeof n.token=="string"),this.R=n.token,new Zr(n.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}function qh(i){return i.name==="IndexedDbTransactionError"}const ti="(default)";class sn{constructor(e,n){this.projectId=e,this.database=n||ti}static empty(){return new sn("","")}get isDefaultDatabase(){return this.database===ti}isEqual(e){return e instanceof sn&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var es,C;(C=es||(es={}))[C.OK=0]="OK",C[C.CANCELLED=1]="CANCELLED",C[C.UNKNOWN=2]="UNKNOWN",C[C.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",C[C.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",C[C.NOT_FOUND=5]="NOT_FOUND",C[C.ALREADY_EXISTS=6]="ALREADY_EXISTS",C[C.PERMISSION_DENIED=7]="PERMISSION_DENIED",C[C.UNAUTHENTICATED=16]="UNAUTHENTICATED",C[C.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",C[C.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",C[C.ABORTED=10]="ABORTED",C[C.OUT_OF_RANGE=11]="OUT_OF_RANGE",C[C.UNIMPLEMENTED=12]="UNIMPLEMENTED",C[C.INTERNAL=13]="INTERNAL",C[C.UNAVAILABLE=14]="UNAVAILABLE",C[C.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */new Qs([4294967295,4294967295],0);/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jh=41943040;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xh=1048576;function Hn(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yh{constructor(e,n,r=1e3,o=1.5,l=6e4){this.Ti=e,this.timerId=n,this.Go=r,this.zo=o,this.jo=l,this.Ho=0,this.Jo=null,this.Yo=Date.now(),this.reset()}reset(){this.Ho=0}Zo(){this.Ho=this.jo}Xo(e){this.cancel();const n=Math.floor(this.Ho+this.e_()),r=Math.max(0,Date.now()-this.Yo),o=Math.max(0,n-r);o>0&&ne("ExponentialBackoff",`Backing off for ${o} ms (base delay: ${this.Ho} ms, delay with jitter: ${n} ms, last attempt: ${r} ms ago)`),this.Jo=this.Ti.enqueueAfterDelay(this.timerId,o,()=>(this.Yo=Date.now(),e())),this.Ho*=this.zo,this.Ho<this.Go&&(this.Ho=this.Go),this.Ho>this.jo&&(this.Ho=this.jo)}t_(){this.Jo!==null&&(this.Jo.skipDelay(),this.Jo=null)}cancel(){this.Jo!==null&&(this.Jo.cancel(),this.Jo=null)}e_(){return(Math.random()-.5)*this.Ho}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _i{constructor(e,n,r,o,l){this.asyncQueue=e,this.timerId=n,this.targetTimeMs=r,this.op=o,this.removalCallback=l,this.deferred=new _t,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(h=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,n,r,o,l){const h=Date.now()+r,y=new _i(e,n,h,o,l);return y.start(r),y}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new X(J.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}var ts,ns;(ns=ts||(ts={}))._a="default",ns.Cache="cache";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qh(i){const e={};return i.timeoutSeconds!==void 0&&(e.timeoutSeconds=i.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const is=new Map;function Zh(i,e,n,r){if(e===!0&&r===!0)throw new X(J.INVALID_ARGUMENT,`${i} and ${n} cannot be used together.`)}function eu(i){if(i===void 0)return"undefined";if(i===null)return"null";if(typeof i=="string")return i.length>20&&(i=`${i.substring(0,20)}...`),JSON.stringify(i);if(typeof i=="number"||typeof i=="boolean")return""+i;if(typeof i=="object"){if(i instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(i);return e?`a custom ${e} object`:"an object"}}return typeof i=="function"?"a function":yi()}function tu(i,e){if("_delegate"in i&&(i=i._delegate),!(i instanceof e)){if(e.name===i.constructor.name)throw new X(J.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=eu(i);throw new X(J.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const to="firestore.googleapis.com",rs=!0;class ss{constructor(e){var n,r;if(e.host===void 0){if(e.ssl!==void 0)throw new X(J.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=to,this.ssl=rs}else this.host=e.host,this.ssl=(n=e.ssl)!==null&&n!==void 0?n:rs;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=Jh;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<Xh)throw new X(J.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}Zh("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Qh((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(l){if(l.timeoutSeconds!==void 0){if(isNaN(l.timeoutSeconds))throw new X(J.INVALID_ARGUMENT,`invalid long polling timeout: ${l.timeoutSeconds} (must not be NaN)`);if(l.timeoutSeconds<5)throw new X(J.INVALID_ARGUMENT,`invalid long polling timeout: ${l.timeoutSeconds} (minimum allowed value is 5)`);if(l.timeoutSeconds>30)throw new X(J.INVALID_ARGUMENT,`invalid long polling timeout: ${l.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,o){return r.timeoutSeconds===o.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class no{constructor(e,n,r,o){this._authCredentials=e,this._appCheckCredentials=n,this._databaseId=r,this._app=o,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new ss({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new X(J.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new X(J.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new ss(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new Hh;switch(r.type){case"firstParty":return new Gh(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new X(J.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(n){const r=is.get(n);r&&(ne("ComponentProvider","Removing Datastore"),is.delete(n),r.terminate())}(this),Promise.resolve()}}function nu(i,e,n,r={}){var o;const l=(i=tu(i,no))._getSettings(),h=Object.assign(Object.assign({},l),{emulatorOptions:i._getEmulatorOptions()}),y=`${e}:${n}`;l.host!==to&&l.host!==y&&Vh("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const w=Object.assign(Object.assign({},l),{host:y,ssl:!1,emulatorOptions:r});if(!Le(w,h)&&(i._setSettings(w),r.mockUserToken)){let E,A;if(typeof r.mockUserToken=="string")E=r.mockUserToken,A=G.MOCK_USER;else{E=ya(r.mockUserToken,(o=i._app)===null||o===void 0?void 0:o.options.projectId);const S=r.mockUserToken.sub||r.mockUserToken.user_id;if(!S)throw new X(J.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");A=new G(S)}i._authCredentials=new $h(new eo(E,A))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const os="AsyncQueue";class as{constructor(e=Promise.resolve()){this.Vu=[],this.mu=!1,this.fu=[],this.gu=null,this.pu=!1,this.yu=!1,this.wu=[],this.a_=new Yh(this,"async_queue_retry"),this.Su=()=>{const r=Hn();r&&ne(os,"Visibility state changed to "+r.visibilityState),this.a_.t_()},this.bu=e;const n=Hn();n&&typeof n.addEventListener=="function"&&n.addEventListener("visibilitychange",this.Su)}get isShuttingDown(){return this.mu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.Du(),this.vu(e)}enterRestrictedMode(e){if(!this.mu){this.mu=!0,this.yu=e||!1;const n=Hn();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this.Su)}}enqueue(e){if(this.Du(),this.mu)return new Promise(()=>{});const n=new _t;return this.vu(()=>this.mu&&this.yu?Promise.resolve():(e().then(n.resolve,n.reject),n.promise)).then(()=>n.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Vu.push(e),this.Cu()))}async Cu(){if(this.Vu.length!==0){try{await this.Vu[0](),this.Vu.shift(),this.a_.reset()}catch(e){if(!qh(e))throw e;ne(os,"Operation failed with retryable error: "+e)}this.Vu.length>0&&this.a_.Xo(()=>this.Cu())}}vu(e){const n=this.bu.then(()=>(this.pu=!0,e().catch(r=>{this.gu=r,this.pu=!1;const o=function(h){let y=h.message||"";return h.stack&&(y=h.stack.includes(h.message)?h.stack:h.message+`
`+h.stack),y}(r);throw Zs("INTERNAL UNHANDLED ERROR: ",o),r}).then(r=>(this.pu=!1,r))));return this.bu=n,n}enqueueAfterDelay(e,n,r){this.Du(),this.wu.indexOf(e)>-1&&(n=0);const o=_i.createAndSchedule(this,e,n,r,l=>this.Fu(l));return this.fu.push(o),o}Du(){this.gu&&yi()}verifyOperationInProgress(){}async Mu(){let e;do e=this.bu,await e;while(e!==this.bu)}xu(e){for(const n of this.fu)if(n.timerId===e)return!0;return!1}Ou(e){return this.Mu().then(()=>{this.fu.sort((n,r)=>n.targetTimeMs-r.targetTimeMs);for(const n of this.fu)if(n.skipDelay(),e!=="all"&&n.timerId===e)break;return this.Mu()})}Nu(e){this.wu.push(e)}Fu(e){const n=this.fu.indexOf(e);this.fu.splice(n,1)}}class iu extends no{constructor(e,n,r,o){super(e,n,r,o),this.type="firestore",this._queue=new as,this._persistenceKey=(o==null?void 0:o.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new as(e),this._firestoreClient=void 0,await e}}}function ru(i,e){const n=typeof i=="object"?i:ys(),r=typeof i=="string"?i:ti,o=oi(n,"firestore").getImmediate({identifier:r});if(!o._initialized){const l=ma("firestore");l&&nu(o,...l)}return o}(function(e,n=!0){(function(o){kt=o})(Xe),Ge(new Me("firestore",(r,{instanceIdentifier:o,options:l})=>{const h=r.getProvider("app").getImmediate(),y=new iu(new zh(r.getProvider("auth-internal")),new Kh(h,r.getProvider("app-check-internal")),function(E,A){if(!Object.prototype.hasOwnProperty.apply(E.options,["projectId"]))throw new X(J.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new sn(E.options.projectId,A)}(h,o),h);return l=Object.assign({useFetchStreams:n},l),y._setSettings(l),y},"PUBLIC").setMultipleInstances(!0)),ke(Yr,Qr,e),ke(Yr,Qr,"esm2017")})();const su={apiKey:"AIzaSyCR6xXBhiIeH00S59-27zJsmcOLIt9JCWQ",authDomain:"mooove-pwa.firebaseapp.com",projectId:"mooove-pwa",storageBucket:"mooove-pwa.firebasestorage.app",messagingSenderId:"67182474532",appId:"1:67182474532:web:de9f1b7cd67d23a8b46fb1"},io=vs(su);console.log("firebase init");jh(io);ru(io);
