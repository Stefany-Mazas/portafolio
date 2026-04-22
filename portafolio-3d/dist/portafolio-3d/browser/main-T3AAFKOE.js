var JD=Object.defineProperty,QD=Object.defineProperties;var eA=Object.getOwnPropertyDescriptors;var Xx=Object.getOwnPropertySymbols;var tA=Object.prototype.hasOwnProperty,nA=Object.prototype.propertyIsEnumerable;var Yx=(n,e,t)=>e in n?JD(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t,_e=(n,e)=>{for(var t in e||={})tA.call(e,t)&&Yx(n,t,e[t]);if(Xx)for(var t of Xx(e))nA.call(e,t)&&Yx(n,t,e[t]);return n},_t=(n,e)=>QD(n,eA(e));var bn=null,Ju=!1,Xm=1,iA=null,Jn=Symbol("SIGNAL");function Pe(n){let e=bn;return bn=n,e}function ed(){return bn}var Pc={version:0,lastCleanEpoch:0,dirty:!1,producers:void 0,producersTail:void 0,consumers:void 0,consumersTail:void 0,recomputing:!1,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,kind:"unknown",producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function Oc(n){if(Ju)throw new Error("");if(bn===null)return;bn.consumerOnSignalRead(n);let e=bn.producersTail;if(e!==void 0&&e.producer===n)return;let t,i=bn.recomputing;if(i&&(t=e!==void 0?e.nextProducer:bn.producers,t!==void 0&&t.producer===n)){bn.producersTail=t,t.lastReadVersion=n.version;return}let r=n.consumersTail;if(r!==void 0&&r.consumer===bn&&(!i||sA(r,bn)))return;let s=Qo(bn),o={producer:n,consumer:bn,nextProducer:t,prevConsumer:r,lastReadVersion:n.version,nextConsumer:void 0};bn.producersTail=o,e!==void 0?e.nextProducer=o:bn.producers=o,s&&Qx(n,o)}function Zx(){Xm++}function Ym(n){if(!(Qo(n)&&!n.dirty)&&!(!n.dirty&&n.lastCleanEpoch===Xm)){if(!n.producerMustRecompute(n)&&!nd(n)){Qu(n);return}n.producerRecomputeValue(n),Qu(n)}}function Zm(n){if(n.consumers===void 0)return;let e=Ju;Ju=!0;try{for(let t=n.consumers;t!==void 0;t=t.nextConsumer){let i=t.consumer;i.dirty||rA(i)}}finally{Ju=e}}function Km(){return bn?.consumerAllowSignalWrites!==!1}function rA(n){n.dirty=!0,Zm(n),n.consumerMarkedDirty?.(n)}function Qu(n){n.dirty=!1,n.lastCleanEpoch=Xm}function Lc(n){return n&&Kx(n),Pe(n)}function Kx(n){n.producersTail=void 0,n.recomputing=!0}function td(n,e){Pe(e),n&&Jx(n)}function Jx(n){n.recomputing=!1;let e=n.producersTail,t=e!==void 0?e.nextProducer:n.producers;if(t!==void 0){if(Qo(n))do t=Jm(t);while(t!==void 0);e!==void 0?e.nextProducer=void 0:n.producers=void 0}}function nd(n){for(let e=n.producers;e!==void 0;e=e.nextProducer){let t=e.producer,i=e.lastReadVersion;if(i!==t.version||(Ym(t),i!==t.version))return!0}return!1}function Fc(n){if(Qo(n)){let e=n.producers;for(;e!==void 0;)e=Jm(e)}n.producers=void 0,n.producersTail=void 0,n.consumers=void 0,n.consumersTail=void 0}function Qx(n,e){let t=n.consumersTail,i=Qo(n);if(t!==void 0?(e.nextConsumer=t.nextConsumer,t.nextConsumer=e):(e.nextConsumer=void 0,n.consumers=e),e.prevConsumer=t,n.consumersTail=e,!i)for(let r=n.producers;r!==void 0;r=r.nextProducer)Qx(r.producer,r)}function Jm(n){let e=n.producer,t=n.nextProducer,i=n.nextConsumer,r=n.prevConsumer;if(n.nextConsumer=void 0,n.prevConsumer=void 0,i!==void 0?i.prevConsumer=r:e.consumersTail=r,r!==void 0)r.nextConsumer=i;else if(e.consumers=i,!Qo(e)){let s=e.producers;for(;s!==void 0;)s=Jm(s)}return t}function Qo(n){return n.consumerIsAlwaysLive||n.consumers!==void 0}function Qm(n){iA?.(n)}function sA(n,e){let t=e.producersTail;if(t!==void 0){let i=e.producers;do{if(i===n)return!0;if(i===t)break;i=i.nextProducer}while(i!==void 0)}return!1}function eg(n,e){return Object.is(n,e)}function oA(){throw new Error}var eS=oA;function tS(n){eS(n)}function tg(n){eS=n}var aA=null;function ng(n,e){let t=Object.create(id);t.value=n,e!==void 0&&(t.equal=e);let i=()=>nS(t);return i[Jn]=t,Qm(t),[i,o=>ea(t,o),o=>ig(t,o)]}function nS(n){return Oc(n),n.value}function ea(n,e){Km()||tS(n),n.equal(n.value,e)||(n.value=e,cA(n))}function ig(n,e){Km()||tS(n),ea(n,e(n.value))}var id=_t(_e({},Pc),{equal:eg,value:void 0,kind:"signal"});function cA(n){n.version++,Zx(),Zm(n),aA?.(n)}function He(n){return typeof n=="function"}function ta(n){let t=n(i=>{Error.call(i),i.stack=new Error().stack});return t.prototype=Object.create(Error.prototype),t.prototype.constructor=t,t}var rd=ta(n=>function(t){n(this),this.message=t?`${t.length} errors occurred during unsubscription:
${t.map((i,r)=>`${r+1}) ${i.toString()}`).join(`
  `)}`:"",this.name="UnsubscriptionError",this.errors=t});function kc(n,e){if(n){let t=n.indexOf(e);0<=t&&n.splice(t,1)}}var tn=class n{constructor(e){this.initialTeardown=e,this.closed=!1,this._parentage=null,this._finalizers=null}unsubscribe(){let e;if(!this.closed){this.closed=!0;let{_parentage:t}=this;if(t)if(this._parentage=null,Array.isArray(t))for(let s of t)s.remove(this);else t.remove(this);let{initialTeardown:i}=this;if(He(i))try{i()}catch(s){e=s instanceof rd?s.errors:[s]}let{_finalizers:r}=this;if(r){this._finalizers=null;for(let s of r)try{iS(s)}catch(o){e=e??[],o instanceof rd?e=[...e,...o.errors]:e.push(o)}}if(e)throw new rd(e)}}add(e){var t;if(e&&e!==this)if(this.closed)iS(e);else{if(e instanceof n){if(e.closed||e._hasParent(this))return;e._addParent(this)}(this._finalizers=(t=this._finalizers)!==null&&t!==void 0?t:[]).push(e)}}_hasParent(e){let{_parentage:t}=this;return t===e||Array.isArray(t)&&t.includes(e)}_addParent(e){let{_parentage:t}=this;this._parentage=Array.isArray(t)?(t.push(e),t):t?[t,e]:e}_removeParent(e){let{_parentage:t}=this;t===e?this._parentage=null:Array.isArray(t)&&kc(t,e)}remove(e){let{_finalizers:t}=this;t&&kc(t,e),e instanceof n&&e._removeParent(this)}};tn.EMPTY=(()=>{let n=new tn;return n.closed=!0,n})();var rg=tn.EMPTY;function sd(n){return n instanceof tn||n&&"closed"in n&&He(n.remove)&&He(n.add)&&He(n.unsubscribe)}function iS(n){He(n)?n():n.unsubscribe()}var Ii={onUnhandledError:null,onStoppedNotification:null,Promise:void 0,useDeprecatedSynchronousErrorHandling:!1,useDeprecatedNextContext:!1};var na={setTimeout(n,e,...t){let{delegate:i}=na;return i?.setTimeout?i.setTimeout(n,e,...t):setTimeout(n,e,...t)},clearTimeout(n){let{delegate:e}=na;return(e?.clearTimeout||clearTimeout)(n)},delegate:void 0};function od(n){na.setTimeout(()=>{let{onUnhandledError:e}=Ii;if(e)e(n);else throw n})}function Uc(){}var rS=sg("C",void 0,void 0);function sS(n){return sg("E",void 0,n)}function oS(n){return sg("N",n,void 0)}function sg(n,e,t){return{kind:n,value:e,error:t}}var Js=null;function ia(n){if(Ii.useDeprecatedSynchronousErrorHandling){let e=!Js;if(e&&(Js={errorThrown:!1,error:null}),n(),e){let{errorThrown:t,error:i}=Js;if(Js=null,t)throw i}}else n()}function aS(n){Ii.useDeprecatedSynchronousErrorHandling&&Js&&(Js.errorThrown=!0,Js.error=n)}var Qs=class extends tn{constructor(e){super(),this.isStopped=!1,e?(this.destination=e,sd(e)&&e.add(this)):this.destination=dA}static create(e,t,i){return new ra(e,t,i)}next(e){this.isStopped?ag(oS(e),this):this._next(e)}error(e){this.isStopped?ag(sS(e),this):(this.isStopped=!0,this._error(e))}complete(){this.isStopped?ag(rS,this):(this.isStopped=!0,this._complete())}unsubscribe(){this.closed||(this.isStopped=!0,super.unsubscribe(),this.destination=null)}_next(e){this.destination.next(e)}_error(e){try{this.destination.error(e)}finally{this.unsubscribe()}}_complete(){try{this.destination.complete()}finally{this.unsubscribe()}}},lA=Function.prototype.bind;function og(n,e){return lA.call(n,e)}var cg=class{constructor(e){this.partialObserver=e}next(e){let{partialObserver:t}=this;if(t.next)try{t.next(e)}catch(i){ad(i)}}error(e){let{partialObserver:t}=this;if(t.error)try{t.error(e)}catch(i){ad(i)}else ad(e)}complete(){let{partialObserver:e}=this;if(e.complete)try{e.complete()}catch(t){ad(t)}}},ra=class extends Qs{constructor(e,t,i){super();let r;if(He(e)||!e)r={next:e??void 0,error:t??void 0,complete:i??void 0};else{let s;this&&Ii.useDeprecatedNextContext?(s=Object.create(e),s.unsubscribe=()=>this.unsubscribe(),r={next:e.next&&og(e.next,s),error:e.error&&og(e.error,s),complete:e.complete&&og(e.complete,s)}):r=e}this.destination=new cg(r)}};function ad(n){Ii.useDeprecatedSynchronousErrorHandling?aS(n):od(n)}function uA(n){throw n}function ag(n,e){let{onStoppedNotification:t}=Ii;t&&na.setTimeout(()=>t(n,e))}var dA={closed:!0,next:Uc,error:uA,complete:Uc};var sa=typeof Symbol=="function"&&Symbol.observable||"@@observable";function Ri(n){return n}function lg(...n){return ug(n)}function ug(n){return n.length===0?Ri:n.length===1?n[0]:function(t){return n.reduce((i,r)=>r(i),t)}}var ct=(()=>{class n{constructor(t){t&&(this._subscribe=t)}lift(t){let i=new n;return i.source=this,i.operator=t,i}subscribe(t,i,r){let s=hA(t)?t:new ra(t,i,r);return ia(()=>{let{operator:o,source:a}=this;s.add(o?o.call(s,a):a?this._subscribe(s):this._trySubscribe(s))}),s}_trySubscribe(t){try{return this._subscribe(t)}catch(i){t.error(i)}}forEach(t,i){return i=cS(i),new i((r,s)=>{let o=new ra({next:a=>{try{t(a)}catch(c){s(c),o.unsubscribe()}},error:s,complete:r});this.subscribe(o)})}_subscribe(t){var i;return(i=this.source)===null||i===void 0?void 0:i.subscribe(t)}[sa](){return this}pipe(...t){return ug(t)(this)}toPromise(t){return t=cS(t),new t((i,r)=>{let s;this.subscribe(o=>s=o,o=>r(o),()=>i(s))})}}return n.create=e=>new n(e),n})();function cS(n){var e;return(e=n??Ii.Promise)!==null&&e!==void 0?e:Promise}function fA(n){return n&&He(n.next)&&He(n.error)&&He(n.complete)}function hA(n){return n&&n instanceof Qs||fA(n)&&sd(n)}function pA(n){return He(n?.lift)}function ft(n){return e=>{if(pA(e))return e.lift(function(t){try{return n(t,this)}catch(i){this.error(i)}});throw new TypeError("Unable to lift unknown Observable type")}}function yt(n,e,t,i,r){return new dg(n,e,t,i,r)}var dg=class extends Qs{constructor(e,t,i,r,s,o){super(e),this.onFinalize=s,this.shouldUnsubscribe=o,this._next=t?function(a){try{t(a)}catch(c){e.error(c)}}:super._next,this._error=r?function(a){try{r(a)}catch(c){e.error(c)}finally{this.unsubscribe()}}:super._error,this._complete=i?function(){try{i()}catch(a){e.error(a)}finally{this.unsubscribe()}}:super._complete}unsubscribe(){var e;if(!this.shouldUnsubscribe||this.shouldUnsubscribe()){let{closed:t}=this;super.unsubscribe(),!t&&((e=this.onFinalize)===null||e===void 0||e.call(this))}}};var lS=ta(n=>function(){n(this),this.name="ObjectUnsubscribedError",this.message="object unsubscribed"});var hn=(()=>{class n extends ct{constructor(){super(),this.closed=!1,this.currentObservers=null,this.observers=[],this.isStopped=!1,this.hasError=!1,this.thrownError=null}lift(t){let i=new cd(this,this);return i.operator=t,i}_throwIfClosed(){if(this.closed)throw new lS}next(t){ia(()=>{if(this._throwIfClosed(),!this.isStopped){this.currentObservers||(this.currentObservers=Array.from(this.observers));for(let i of this.currentObservers)i.next(t)}})}error(t){ia(()=>{if(this._throwIfClosed(),!this.isStopped){this.hasError=this.isStopped=!0,this.thrownError=t;let{observers:i}=this;for(;i.length;)i.shift().error(t)}})}complete(){ia(()=>{if(this._throwIfClosed(),!this.isStopped){this.isStopped=!0;let{observers:t}=this;for(;t.length;)t.shift().complete()}})}unsubscribe(){this.isStopped=this.closed=!0,this.observers=this.currentObservers=null}get observed(){var t;return((t=this.observers)===null||t===void 0?void 0:t.length)>0}_trySubscribe(t){return this._throwIfClosed(),super._trySubscribe(t)}_subscribe(t){return this._throwIfClosed(),this._checkFinalizedStatuses(t),this._innerSubscribe(t)}_innerSubscribe(t){let{hasError:i,isStopped:r,observers:s}=this;return i||r?rg:(this.currentObservers=null,s.push(t),new tn(()=>{this.currentObservers=null,kc(s,t)}))}_checkFinalizedStatuses(t){let{hasError:i,thrownError:r,isStopped:s}=this;i?t.error(r):s&&t.complete()}asObservable(){let t=new ct;return t.source=this,t}}return n.create=(e,t)=>new cd(e,t),n})(),cd=class extends hn{constructor(e,t){super(),this.destination=e,this.source=t}next(e){var t,i;(i=(t=this.destination)===null||t===void 0?void 0:t.next)===null||i===void 0||i.call(t,e)}error(e){var t,i;(i=(t=this.destination)===null||t===void 0?void 0:t.error)===null||i===void 0||i.call(t,e)}complete(){var e,t;(t=(e=this.destination)===null||e===void 0?void 0:e.complete)===null||t===void 0||t.call(e)}_subscribe(e){var t,i;return(i=(t=this.source)===null||t===void 0?void 0:t.subscribe(e))!==null&&i!==void 0?i:rg}};var pn=class extends hn{constructor(e){super(),this._value=e}get value(){return this.getValue()}_subscribe(e){let t=super._subscribe(e);return!t.closed&&e.next(this._value),t}getValue(){let{hasError:e,thrownError:t,_value:i}=this;if(e)throw t;return this._throwIfClosed(),i}next(e){super.next(this._value=e)}};var mn=new ct(n=>n.complete());function uS(n){return n&&He(n.schedule)}function dS(n){return n[n.length-1]}function fS(n){return He(dS(n))?n.pop():void 0}function as(n){return uS(dS(n))?n.pop():void 0}function pS(n,e,t,i){function r(s){return s instanceof t?s:new t(function(o){o(s)})}return new(t||(t=Promise))(function(s,o){function a(u){try{l(i.next(u))}catch(d){o(d)}}function c(u){try{l(i.throw(u))}catch(d){o(d)}}function l(u){u.done?s(u.value):r(u.value).then(a,c)}l((i=i.apply(n,e||[])).next())})}function hS(n){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&n[e],i=0;if(t)return t.call(n);if(n&&typeof n.length=="number")return{next:function(){return n&&i>=n.length&&(n=void 0),{value:n&&n[i++],done:!n}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}function eo(n){return this instanceof eo?(this.v=n,this):new eo(n)}function mS(n,e,t){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var i=t.apply(n,e||[]),r,s=[];return r=Object.create((typeof AsyncIterator=="function"?AsyncIterator:Object).prototype),a("next"),a("throw"),a("return",o),r[Symbol.asyncIterator]=function(){return this},r;function o(h){return function(m){return Promise.resolve(m).then(h,d)}}function a(h,m){i[h]&&(r[h]=function(v){return new Promise(function(p,g){s.push([h,v,p,g])>1||c(h,v)})},m&&(r[h]=m(r[h])))}function c(h,m){try{l(i[h](m))}catch(v){f(s[0][3],v)}}function l(h){h.value instanceof eo?Promise.resolve(h.value.v).then(u,d):f(s[0][2],h)}function u(h){c("next",h)}function d(h){c("throw",h)}function f(h,m){h(m),s.shift(),s.length&&c(s[0][0],s[0][1])}}function gS(n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var e=n[Symbol.asyncIterator],t;return e?e.call(n):(n=typeof hS=="function"?hS(n):n[Symbol.iterator](),t={},i("next"),i("throw"),i("return"),t[Symbol.asyncIterator]=function(){return this},t);function i(s){t[s]=n[s]&&function(o){return new Promise(function(a,c){o=n[s](o),r(a,c,o.done,o.value)})}}function r(s,o,a,c){Promise.resolve(c).then(function(l){s({value:l,done:a})},o)}}var ld=n=>n&&typeof n.length=="number"&&typeof n!="function";function ud(n){return He(n?.then)}function dd(n){return He(n[sa])}function fd(n){return Symbol.asyncIterator&&He(n?.[Symbol.asyncIterator])}function hd(n){return new TypeError(`You provided ${n!==null&&typeof n=="object"?"an invalid object":`'${n}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`)}function mA(){return typeof Symbol!="function"||!Symbol.iterator?"@@iterator":Symbol.iterator}var pd=mA();function md(n){return He(n?.[pd])}function gd(n){return mS(this,arguments,function*(){let t=n.getReader();try{for(;;){let{value:i,done:r}=yield eo(t.read());if(r)return yield eo(void 0);yield yield eo(i)}}finally{t.releaseLock()}})}function vd(n){return He(n?.getReader)}function ln(n){if(n instanceof ct)return n;if(n!=null){if(dd(n))return gA(n);if(ld(n))return vA(n);if(ud(n))return _A(n);if(fd(n))return vS(n);if(md(n))return yA(n);if(vd(n))return xA(n)}throw hd(n)}function gA(n){return new ct(e=>{let t=n[sa]();if(He(t.subscribe))return t.subscribe(e);throw new TypeError("Provided object does not correctly implement Symbol.observable")})}function vA(n){return new ct(e=>{for(let t=0;t<n.length&&!e.closed;t++)e.next(n[t]);e.complete()})}function _A(n){return new ct(e=>{n.then(t=>{e.closed||(e.next(t),e.complete())},t=>e.error(t)).then(null,od)})}function yA(n){return new ct(e=>{for(let t of n)if(e.next(t),e.closed)return;e.complete()})}function vS(n){return new ct(e=>{SA(n,e).catch(t=>e.error(t))})}function xA(n){return vS(gd(n))}function SA(n,e){var t,i,r,s;return pS(this,void 0,void 0,function*(){try{for(t=gS(n);i=yield t.next(),!i.done;){let o=i.value;if(e.next(o),e.closed)return}}catch(o){r={error:o}}finally{try{i&&!i.done&&(s=t.return)&&(yield s.call(t))}finally{if(r)throw r.error}}e.complete()})}function Hn(n,e,t,i=0,r=!1){let s=e.schedule(function(){t(),r?n.add(this.schedule(null,i)):this.unsubscribe()},i);if(n.add(s),!r)return s}function _d(n,e=0){return ft((t,i)=>{t.subscribe(yt(i,r=>Hn(i,n,()=>i.next(r),e),()=>Hn(i,n,()=>i.complete(),e),r=>Hn(i,n,()=>i.error(r),e)))})}function yd(n,e=0){return ft((t,i)=>{i.add(n.schedule(()=>t.subscribe(i),e))})}function _S(n,e){return ln(n).pipe(yd(e),_d(e))}function yS(n,e){return ln(n).pipe(yd(e),_d(e))}function xS(n,e){return new ct(t=>{let i=0;return e.schedule(function(){i===n.length?t.complete():(t.next(n[i++]),t.closed||this.schedule())})})}function SS(n,e){return new ct(t=>{let i;return Hn(t,e,()=>{i=n[pd](),Hn(t,e,()=>{let r,s;try{({value:r,done:s}=i.next())}catch(o){t.error(o);return}s?t.complete():t.next(r)},0,!0)}),()=>He(i?.return)&&i.return()})}function xd(n,e){if(!n)throw new Error("Iterable cannot be null");return new ct(t=>{Hn(t,e,()=>{let i=n[Symbol.asyncIterator]();Hn(t,e,()=>{i.next().then(r=>{r.done?t.complete():t.next(r.value)})},0,!0)})})}function MS(n,e){return xd(gd(n),e)}function ES(n,e){if(n!=null){if(dd(n))return _S(n,e);if(ld(n))return xS(n,e);if(ud(n))return yS(n,e);if(fd(n))return xd(n,e);if(md(n))return SS(n,e);if(vd(n))return MS(n,e)}throw hd(n)}function Yt(n,e){return e?ES(n,e):ln(n)}function tt(...n){let e=as(n);return Yt(n,e)}function fg(n,e){let t=He(n)?n:()=>n,i=r=>r.error(t());return new ct(e?r=>e.schedule(i,0,r):i)}function Sd(n){return!!n&&(n instanceof ct||He(n.lift)&&He(n.subscribe))}var to=ta(n=>function(){n(this),this.name="EmptyError",this.message="no elements in sequence"});function Bt(n,e){return ft((t,i)=>{let r=0;t.subscribe(yt(i,s=>{i.next(n.call(e,s,r++))}))})}var{isArray:MA}=Array;function EA(n,e){return MA(e)?n(...e):n(e)}function bS(n){return Bt(e=>EA(n,e))}var{isArray:bA}=Array,{getPrototypeOf:wA,prototype:TA,keys:CA}=Object;function wS(n){if(n.length===1){let e=n[0];if(bA(e))return{args:e,keys:null};if(DA(e)){let t=CA(e);return{args:t.map(i=>e[i]),keys:t}}}return{args:n,keys:null}}function DA(n){return n&&typeof n=="object"&&wA(n)===TA}function TS(n,e){return n.reduce((t,i,r)=>(t[i]=e[r],t),{})}function hg(...n){let e=as(n),t=fS(n),{args:i,keys:r}=wS(n);if(i.length===0)return Yt([],e);let s=new ct(AA(i,e,r?o=>TS(r,o):Ri));return t?s.pipe(bS(t)):s}function AA(n,e,t=Ri){return i=>{CS(e,()=>{let{length:r}=n,s=new Array(r),o=r,a=r;for(let c=0;c<r;c++)CS(e,()=>{let l=Yt(n[c],e),u=!1;l.subscribe(yt(i,d=>{s[c]=d,u||(u=!0,a--),a||i.next(t(s.slice()))},()=>{--o||i.complete()}))},i)},i)}}function CS(n,e,t){n?Hn(t,n,e):e()}function DS(n,e,t,i,r,s,o,a){let c=[],l=0,u=0,d=!1,f=()=>{d&&!c.length&&!l&&e.complete()},h=v=>l<i?m(v):c.push(v),m=v=>{s&&e.next(v),l++;let p=!1;ln(t(v,u++)).subscribe(yt(e,g=>{r?.(g),s?h(g):e.next(g)},()=>{p=!0},void 0,()=>{if(p)try{for(l--;c.length&&l<i;){let g=c.shift();o?Hn(e,o,()=>m(g)):m(g)}f()}catch(g){e.error(g)}}))};return n.subscribe(yt(e,h,()=>{d=!0,f()})),()=>{a?.()}}function Ln(n,e,t=1/0){return He(e)?Ln((i,r)=>Bt((s,o)=>e(i,s,r,o))(ln(n(i,r))),t):(typeof e=="number"&&(t=e),ft((i,r)=>DS(i,r,n,t)))}function AS(n=1/0){return Ln(Ri,n)}function IS(){return AS(1)}function oa(...n){return IS()(Yt(n,as(n)))}function Bc(n){return new ct(e=>{ln(n()).subscribe(e)})}function wr(n,e){return ft((t,i)=>{let r=0;t.subscribe(yt(i,s=>n.call(e,s,r++)&&i.next(s)))})}function Vc(n){return ft((e,t)=>{let i=null,r=!1,s;i=e.subscribe(yt(t,void 0,void 0,o=>{s=ln(n(o,Vc(n)(e))),i?(i.unsubscribe(),i=null,s.subscribe(t)):r=!0})),r&&(i.unsubscribe(),i=null,s.subscribe(t))})}function Md(n,e){return He(e)?Ln(n,e,1):Ln(n,1)}function RS(n){return ft((e,t)=>{let i=!1;e.subscribe(yt(t,r=>{i=!0,t.next(r)},()=>{i||t.next(n),t.complete()}))})}function Tr(n){return n<=0?()=>mn:ft((e,t)=>{let i=0;e.subscribe(yt(t,r=>{++i<=n&&(t.next(r),n<=i&&t.complete())}))})}function NS(n=IA){return ft((e,t)=>{let i=!1;e.subscribe(yt(t,r=>{i=!0,t.next(r)},()=>i?t.complete():t.error(n())))})}function IA(){return new to}function pg(n){return ft((e,t)=>{try{e.subscribe(t)}finally{t.add(n)}})}function Cr(n,e){let t=arguments.length>=2;return i=>i.pipe(n?wr((r,s)=>n(r,s,i)):Ri,Tr(1),t?RS(e):NS(()=>new to))}function Ed(n){return n<=0?()=>mn:ft((e,t)=>{let i=[];e.subscribe(yt(t,r=>{i.push(r),n<i.length&&i.shift()},()=>{for(let r of i)t.next(r);t.complete()},void 0,()=>{i=null}))})}function mg(...n){let e=as(n);return ft((t,i)=>{(e?oa(n,t,e):oa(n,t)).subscribe(i)})}function Ni(n,e){return ft((t,i)=>{let r=null,s=0,o=!1,a=()=>o&&!r&&i.complete();t.subscribe(yt(i,c=>{r?.unsubscribe();let l=0,u=s++;ln(n(c,u)).subscribe(r=yt(i,d=>i.next(e?e(c,d,u,l++):d),()=>{r=null,a()}))},()=>{o=!0,a()}))})}function Hc(n){return ft((e,t)=>{ln(n).subscribe(yt(t,()=>t.complete(),Uc)),!t.closed&&e.subscribe(t)})}function vi(n,e,t){let i=He(n)||e||t?{next:n,error:e,complete:t}:n;return i?ft((r,s)=>{var o;(o=i.subscribe)===null||o===void 0||o.call(i);let a=!0;r.subscribe(yt(s,c=>{var l;(l=i.next)===null||l===void 0||l.call(i,c),s.next(c)},()=>{var c;a=!1,(c=i.complete)===null||c===void 0||c.call(i),s.complete()},c=>{var l;a=!1,(l=i.error)===null||l===void 0||l.call(i,c),s.error(c)},()=>{var c,l;a&&((c=i.unsubscribe)===null||c===void 0||c.call(i)),(l=i.finalize)===null||l===void 0||l.call(i)}))}):Ri}var gg;function bd(){return gg}function Ki(n){let e=gg;return gg=n,e}var PS=Symbol("NotFound");function aa(n){return n===PS||n?.name==="\u0275NotFound"}function OS(n){let e=Pe(null);try{return n()}finally{Pe(e)}}var Id="https://angular.dev/best-practices/security#preventing-cross-site-scripting-xss",Te=class extends Error{code;constructor(e,t){super(qc(e,t)),this.code=e}};function OA(n){return`NG0${Math.abs(n)}`}function qc(n,e){return`${OA(n)}${e?": "+e:""}`}function ht(n){for(let e in n)if(n[e]===ht)return e;throw Error("")}function Xc(n){if(typeof n=="string")return n;if(Array.isArray(n))return`[${n.map(Xc).join(", ")}]`;if(n==null)return""+n;let e=n.overriddenName||n.name;if(e)return`${e}`;let t=n.toString();if(t==null)return""+t;let i=t.indexOf(`
`);return i>=0?t.slice(0,i):t}function Rg(n,e){return n?e?`${n} ${e}`:n:e||""}var LA=ht({__forward_ref__:ht});function Rd(n){return n.__forward_ref__=Rd,n}function zn(n){return Ng(n)?n():n}function Ng(n){return typeof n=="function"&&n.hasOwnProperty(LA)&&n.__forward_ref__===Rd}function Oe(n){return{token:n.token,providedIn:n.providedIn||null,factory:n.factory,value:void 0}}function la(n){return{providers:n.providers||[],imports:n.imports||[]}}function Yc(n){return FA(n,Nd)}function Pg(n){return Yc(n)!==null}function FA(n,e){return n.hasOwnProperty(e)&&n[e]||null}function kA(n){let e=n?.[Nd]??null;return e||null}function _g(n){return n&&n.hasOwnProperty(Td)?n[Td]:null}var Nd=ht({\u0275prov:ht}),Td=ht({\u0275inj:ht}),Re=class{_desc;ngMetadataName="InjectionToken";\u0275prov;constructor(e,t){this._desc=e,this.\u0275prov=void 0,typeof t=="number"?this.__NG_ELEMENT_ID__=t:t!==void 0&&(this.\u0275prov=Oe({token:this,providedIn:t.providedIn||"root",factory:t.factory}))}get multi(){return this}toString(){return`InjectionToken ${this._desc}`}};function Og(n){return n&&!!n.\u0275providers}var Lg=ht({\u0275cmp:ht}),Fg=ht({\u0275dir:ht}),kg=ht({\u0275pipe:ht}),Ug=ht({\u0275mod:ht}),Gc=ht({\u0275fac:ht}),ao=ht({__NG_ELEMENT_ID__:ht}),LS=ht({__NG_ENV_ID__:ht});function Bg(n){return Pd(n,"@NgModule"),n[Ug]||null}function ls(n){return Pd(n,"@Component"),n[Lg]||null}function Vg(n){return Pd(n,"@Directive"),n[Fg]||null}function BS(n){return Pd(n,"@Pipe"),n[kg]||null}function Pd(n,e){if(n==null)throw new Te(-919,!1)}function Hg(n){return typeof n=="string"?n:n==null?"":String(n)}var VS=ht({ngErrorCode:ht}),UA=ht({ngErrorMessage:ht}),BA=ht({ngTokenPath:ht});function zg(n,e){return HS("",-200,e)}function Od(n,e){throw new Te(-201,!1)}function HS(n,e,t){let i=new Te(e,n);return i[VS]=e,i[UA]=n,t&&(i[BA]=t),i}function VA(n){return n[VS]}var yg;function zS(){return yg}function Qn(n){let e=yg;return yg=n,e}function Gg(n,e,t){let i=Yc(n);if(i&&i.providedIn=="root")return i.value===void 0?i.value=i.factory():i.value;if(t&8)return null;if(e!==void 0)return e;Od(n,"")}var HA={},no=HA,zA="__NG_DI_FLAG__",xg=class{injector;constructor(e){this.injector=e}retrieve(e,t){let i=io(t)||0;try{return this.injector.get(e,i&8?null:no,i)}catch(r){if(aa(r))return r;throw r}}};function GA(n,e=0){let t=bd();if(t===void 0)throw new Te(-203,!1);if(t===null)return Gg(n,void 0,e);{let i=jA(e),r=t.retrieve(n,i);if(aa(r)){if(i.optional)return null;throw r}return r}}function $e(n,e=0){return(zS()||GA)(zn(n),e)}function ee(n,e){return $e(n,io(e))}function io(n){return typeof n>"u"||typeof n=="number"?n:0|(n.optional&&8)|(n.host&&1)|(n.self&&2)|(n.skipSelf&&4)}function jA(n){return{optional:!!(n&8),host:!!(n&1),self:!!(n&2),skipSelf:!!(n&4)}}function Sg(n){let e=[];for(let t=0;t<n.length;t++){let i=zn(n[t]);if(Array.isArray(i)){if(i.length===0)throw new Te(900,!1);let r,s=0;for(let o=0;o<i.length;o++){let a=i[o],c=WA(a);typeof c=="number"?c===-1?r=a.token:s|=c:r=a}e.push($e(r,s))}else e.push($e(i))}return e}function WA(n){return n[zA]}function ro(n,e){let t=n.hasOwnProperty(Gc);return t?n[Gc]:null}function GS(n,e,t){if(n.length!==e.length)return!1;for(let i=0;i<n.length;i++){let r=n[i],s=e[i];if(t&&(r=t(r),s=t(s)),s!==r)return!1}return!0}function jS(n){return n.flat(Number.POSITIVE_INFINITY)}function Ld(n,e){n.forEach(t=>Array.isArray(t)?Ld(t,e):e(t))}function jg(n,e,t){e>=n.length?n.push(t):n.splice(e,0,t)}function Zc(n,e){return e>=n.length-1?n.pop():n.splice(e,1)[0]}function WS(n,e,t,i){let r=n.length;if(r==e)n.push(t,i);else if(r===1)n.push(i,n[0]),n[0]=t;else{for(r--,n.push(n[r-1],n[r]);r>e;){let s=r-2;n[r]=n[s],r--}n[e]=t,n[e+1]=i}}function $S(n,e,t){let i=ua(n,e);return i>=0?n[i|1]=t:(i=~i,WS(n,i,e,t)),i}function Fd(n,e){let t=ua(n,e);if(t>=0)return n[t|1]}function ua(n,e){return $A(n,e,1)}function $A(n,e,t){let i=0,r=n.length>>t;for(;r!==i;){let s=i+(r-i>>1),o=n[s<<t];if(e===o)return s<<t;o>e?r=s:i=s+1}return~(r<<t)}var co={},_i=[],Ir=new Re(""),Wg=new Re("",-1),$g=new Re(""),jc=class{get(e,t=no){if(t===no){let r=HS("",-201);throw r.name="\u0275NotFound",r}return t}};function lo(n){return{\u0275providers:n}}function qS(n){return lo([{provide:Ir,multi:!0,useValue:n}])}function XS(...n){return{\u0275providers:qg(!0,n),\u0275fromNgModule:!0}}function qg(n,...e){let t=[],i=new Set,r,s=o=>{t.push(o)};return Ld(e,o=>{let a=o;Cd(a,s,[],i)&&(r||=[],r.push(a))}),r!==void 0&&YS(r,s),t}function YS(n,e){for(let t=0;t<n.length;t++){let{ngModule:i,providers:r}=n[t];Xg(r,s=>{e(s,i)})}}function Cd(n,e,t,i){if(n=zn(n),!n)return!1;let r=null,s=_g(n),o=!s&&ls(n);if(!s&&!o){let c=n.ngModule;if(s=_g(c),s)r=c;else return!1}else{if(o&&!o.standalone)return!1;r=n}let a=i.has(r);if(o){if(a)return!1;if(i.add(r),o.dependencies){let c=typeof o.dependencies=="function"?o.dependencies():o.dependencies;for(let l of c)Cd(l,e,t,i)}}else if(s){if(s.imports!=null&&!a){i.add(r);let l;Ld(s.imports,u=>{Cd(u,e,t,i)&&(l||=[],l.push(u))}),l!==void 0&&YS(l,e)}if(!a){let l=ro(r)||(()=>new r);e({provide:r,useFactory:l,deps:_i},r),e({provide:$g,useValue:r,multi:!0},r),e({provide:Ir,useValue:()=>$e(r),multi:!0},r)}let c=s.providers;if(c!=null&&!a){let l=n;Xg(c,u=>{e(u,l)})}}else return!1;return r!==n&&n.providers!==void 0}function Xg(n,e){for(let t of n)Og(t)&&(t=t.\u0275providers),Array.isArray(t)?Xg(t,e):e(t)}var qA=ht({provide:String,useValue:ht});function ZS(n){return n!==null&&typeof n=="object"&&qA in n}function XA(n){return!!(n&&n.useExisting)}function YA(n){return!!(n&&n.useFactory)}function Dd(n){return typeof n=="function"}var Kc=new Re(""),wd={},FS={},vg;function Jc(){return vg===void 0&&(vg=new jc),vg}var nn=class{},so=class extends nn{parent;source;scopes;records=new Map;_ngOnDestroyHooks=new Set;_onDestroyHooks=[];get destroyed(){return this._destroyed}_destroyed=!1;injectorDefTypes;constructor(e,t,i,r){super(),this.parent=t,this.source=i,this.scopes=r,Eg(e,o=>this.processProvider(o)),this.records.set(Wg,ca(void 0,this)),r.has("environment")&&this.records.set(nn,ca(void 0,this));let s=this.records.get(Kc);s!=null&&typeof s.value=="string"&&this.scopes.add(s.value),this.injectorDefTypes=new Set(this.get($g,_i,{self:!0}))}retrieve(e,t){let i=io(t)||0;try{return this.get(e,no,i)}catch(r){if(aa(r))return r;throw r}}destroy(){zc(this),this._destroyed=!0;let e=Pe(null);try{for(let i of this._ngOnDestroyHooks)i.ngOnDestroy();let t=this._onDestroyHooks;this._onDestroyHooks=[];for(let i of t)i()}finally{this.records.clear(),this._ngOnDestroyHooks.clear(),this.injectorDefTypes.clear(),Pe(e)}}onDestroy(e){return zc(this),this._onDestroyHooks.push(e),()=>this.removeOnDestroy(e)}runInContext(e){zc(this);let t=Ki(this),i=Qn(void 0),r;try{return e()}finally{Ki(t),Qn(i)}}get(e,t=no,i){if(zc(this),e.hasOwnProperty(LS))return e[LS](this);let r=io(i),s,o=Ki(this),a=Qn(void 0);try{if(!(r&4)){let l=this.records.get(e);if(l===void 0){let u=eI(e)&&Yc(e);u&&this.injectableDefInScope(u)?l=ca(Mg(e),wd):l=null,this.records.set(e,l)}if(l!=null)return this.hydrate(e,l,r)}let c=r&2?Jc():this.parent;return t=r&8&&t===no?null:t,c.get(e,t)}catch(c){let l=VA(c);throw l===-200||l===-201?new Te(l,null):c}finally{Qn(a),Ki(o)}}resolveInjectorInitializers(){let e=Pe(null),t=Ki(this),i=Qn(void 0),r;try{let s=this.get(Ir,_i,{self:!0});for(let o of s)o()}finally{Ki(t),Qn(i),Pe(e)}}toString(){return"R3Injector[...]"}processProvider(e){e=zn(e);let t=Dd(e)?e:zn(e&&e.provide),i=KA(e);if(!Dd(e)&&e.multi===!0){let r=this.records.get(t);r||(r=ca(void 0,wd,!0),r.factory=()=>Sg(r.multi),this.records.set(t,r)),t=e,r.multi.push(e)}this.records.set(t,i)}hydrate(e,t,i){let r=Pe(null);try{if(t.value===FS)throw zg("");return t.value===wd&&(t.value=FS,t.value=t.factory(void 0,i)),typeof t.value=="object"&&t.value&&QA(t.value)&&this._ngOnDestroyHooks.add(t.value),t.value}finally{Pe(r)}}injectableDefInScope(e){if(!e.providedIn)return!1;let t=zn(e.providedIn);return typeof t=="string"?t==="any"||this.scopes.has(t):this.injectorDefTypes.has(t)}removeOnDestroy(e){let t=this._onDestroyHooks.indexOf(e);t!==-1&&this._onDestroyHooks.splice(t,1)}};function Mg(n){let e=Yc(n),t=e!==null?e.factory:ro(n);if(t!==null)return t;if(n instanceof Re)throw new Te(-204,!1);if(n instanceof Function)return ZA(n);throw new Te(-204,!1)}function ZA(n){if(n.length>0)throw new Te(-204,!1);let t=kA(n);return t!==null?()=>t.factory(n):()=>new n}function KA(n){if(ZS(n))return ca(void 0,n.useValue);{let e=KS(n);return ca(e,wd)}}function KS(n,e,t){let i;if(Dd(n)){let r=zn(n);return ro(r)||Mg(r)}else if(ZS(n))i=()=>zn(n.useValue);else if(YA(n))i=()=>n.useFactory(...Sg(n.deps||[]));else if(XA(n))i=(r,s)=>$e(zn(n.useExisting),s!==void 0&&s&8?8:void 0);else{let r=zn(n&&(n.useClass||n.provide));if(JA(n))i=()=>new r(...Sg(n.deps));else return ro(r)||Mg(r)}return i}function zc(n){if(n.destroyed)throw new Te(-205,!1)}function ca(n,e,t=!1){return{factory:n,value:e,multi:t?[]:void 0}}function JA(n){return!!n.deps}function QA(n){return n!==null&&typeof n=="object"&&typeof n.ngOnDestroy=="function"}function eI(n){return typeof n=="function"||typeof n=="object"&&n.ngMetadataName==="InjectionToken"}function Eg(n,e){for(let t of n)Array.isArray(t)?Eg(t,e):t&&Og(t)?Eg(t.\u0275providers,e):e(t)}function wn(n,e){let t;n instanceof so?(zc(n),t=n):t=new xg(n);let i,r=Ki(t),s=Qn(void 0);try{return e()}finally{Ki(r),Qn(s)}}function JS(){return zS()!==void 0||bd()!=null}var Pi=0,Le=1,ke=2,rn=3,yi=4,xi=5,da=6,fa=7,qt=8,Rr=9,Oi=10,Kt=11,ha=12,Yg=13,uo=14,ei=15,us=16,fo=17,Qi=18,Nr=19,Zg=20,Dr=21,kd=22,Qc=23,ti=24,Ud=25,ds=26,gn=27,QS=1,Kg=6,fs=7,el=8,ho=9,Vt=10;function hs(n){return Array.isArray(n)&&typeof n[QS]=="object"}function Li(n){return Array.isArray(n)&&n[QS]===!0}function Jg(n){return(n.flags&4)!==0}function Pr(n){return n.componentOffset>-1}function Bd(n){return(n.flags&1)===1}function po(n){return!!n.template}function pa(n){return(n[ke]&512)!==0}function mo(n){return(n[ke]&256)===256}var eM="svg",tM="math";function Si(n){for(;Array.isArray(n);)n=n[Pi];return n}function Qg(n,e){return Si(e[n])}function er(n,e){return Si(e[n.index])}function Vd(n,e){return n.data[e]}function Fi(n,e){let t=e[n];return hs(t)?t:t[Pi]}function nM(n){return(n[ke]&4)===4}function Hd(n){return(n[ke]&128)===128}function iM(n){return Li(n[rn])}function tr(n,e){return e==null?null:n[e]}function ev(n){n[fo]=0}function tv(n){n[ke]&1024||(n[ke]|=1024,Hd(n)&&nl(n))}function rM(n,e){for(;n>0;)e=e[uo],n--;return e}function tl(n){return!!(n[ke]&9216||n[ti]?.dirty)}function zd(n){n[Oi].changeDetectionScheduler?.notify(8),n[ke]&64&&(n[ke]|=1024),tl(n)&&nl(n)}function nl(n){n[Oi].changeDetectionScheduler?.notify(0);let e=cs(n);for(;e!==null&&!(e[ke]&8192||(e[ke]|=8192,!Hd(e)));)e=cs(e)}function nv(n,e){if(mo(n))throw new Te(911,!1);n[Dr]===null&&(n[Dr]=[]),n[Dr].push(e)}function sM(n,e){if(n[Dr]===null)return;let t=n[Dr].indexOf(e);t!==-1&&n[Dr].splice(t,1)}function cs(n){let e=n[rn];return Li(e)?e[rn]:e}function iv(n){return n[fa]??=[]}function rv(n){return n.cleanup??=[]}function oM(n,e,t,i){let r=iv(e);r.push(t),n.firstCreatePass&&rv(n).push(i,r.length-1)}var Ke={lFrame:xM(null),bindingsEnabled:!0,skipHydrationRootTNode:null};var bg=!1;function aM(){return Ke.lFrame.elementDepthCount}function cM(){Ke.lFrame.elementDepthCount++}function sv(){Ke.lFrame.elementDepthCount--}function lM(){return Ke.bindingsEnabled}function uM(){return Ke.skipHydrationRootTNode!==null}function ov(n){return Ke.skipHydrationRootTNode===n}function av(){Ke.skipHydrationRootTNode=null}function lt(){return Ke.lFrame.lView}function ni(){return Ke.lFrame.tView}function Gd(n){return Ke.lFrame.contextLView=n,n[qt]}function jd(n){return Ke.lFrame.contextLView=null,n}function ki(){let n=cv();for(;n!==null&&n.type===64;)n=n.parent;return n}function cv(){return Ke.lFrame.currentTNode}function dM(){let n=Ke.lFrame,e=n.currentTNode;return n.isParent?e:e.parent}function ma(n,e){let t=Ke.lFrame;t.currentTNode=n,t.isParent=e}function lv(){return Ke.lFrame.isParent}function fM(){Ke.lFrame.isParent=!1}function uv(){return bg}function dv(n){let e=bg;return bg=n,e}function hM(n){return Ke.lFrame.bindingIndex=n}function ga(){return Ke.lFrame.bindingIndex++}function pM(n){let e=Ke.lFrame,t=e.bindingIndex;return e.bindingIndex=e.bindingIndex+n,t}function mM(){return Ke.lFrame.inI18n}function gM(n,e){let t=Ke.lFrame;t.bindingIndex=t.bindingRootIndex=n,Wd(e)}function vM(){return Ke.lFrame.currentDirectiveIndex}function Wd(n){Ke.lFrame.currentDirectiveIndex=n}function _M(n){let e=Ke.lFrame.currentDirectiveIndex;return e===-1?null:n[e]}function fv(){return Ke.lFrame.currentQueryIndex}function $d(n){Ke.lFrame.currentQueryIndex=n}function tI(n){let e=n[Le];return e.type===2?e.declTNode:e.type===1?n[xi]:null}function hv(n,e,t){if(t&4){let r=e,s=n;for(;r=r.parent,r===null&&!(t&1);)if(r=tI(s),r===null||(s=s[uo],r.type&10))break;if(r===null)return!1;e=r,n=s}let i=Ke.lFrame=yM();return i.currentTNode=e,i.lView=n,!0}function qd(n){let e=yM(),t=n[Le];Ke.lFrame=e,e.currentTNode=t.firstChild,e.lView=n,e.tView=t,e.contextLView=n,e.bindingIndex=t.bindingStartIndex,e.inI18n=!1}function yM(){let n=Ke.lFrame,e=n===null?null:n.child;return e===null?xM(n):e}function xM(n){let e={currentTNode:null,isParent:!0,lView:null,tView:null,selectedIndex:-1,contextLView:null,elementDepthCount:0,currentNamespace:null,currentDirectiveIndex:-1,bindingRootIndex:-1,bindingIndex:-1,currentQueryIndex:0,parent:n,child:null,inI18n:!1};return n!==null&&(n.child=e),e}function SM(){let n=Ke.lFrame;return Ke.lFrame=n.parent,n.currentTNode=null,n.lView=null,n}var pv=SM;function Xd(){let n=SM();n.isParent=!0,n.tView=null,n.selectedIndex=-1,n.contextLView=null,n.elementDepthCount=0,n.currentDirectiveIndex=-1,n.currentNamespace=null,n.bindingRootIndex=-1,n.bindingIndex=-1,n.currentQueryIndex=0}function MM(n){return(Ke.lFrame.contextLView=rM(n,Ke.lFrame.contextLView))[qt]}function ps(){return Ke.lFrame.selectedIndex}function ms(n){Ke.lFrame.selectedIndex=n}function mv(){let n=Ke.lFrame;return Vd(n.tView,n.selectedIndex)}function EM(){return Ke.lFrame.currentNamespace}var bM=!0;function Yd(){return bM}function Zd(n){bM=n}function wg(n,e=null,t=null,i){let r=gv(n,e,t,i);return r.resolveInjectorInitializers(),r}function gv(n,e=null,t=null,i,r=new Set){let s=[t||_i,XS(n)],o;return new so(s,e||Jc(),o||null,r)}var Ji=class n{static THROW_IF_NOT_FOUND=no;static NULL=new jc;static create(e,t){if(Array.isArray(e))return wg({name:""},t,e,"");{let i=e.name??"";return wg({name:i},e.parent,e.providers,i)}}static \u0275prov=Oe({token:n,providedIn:"any",factory:()=>$e(Wg)});static __NG_ELEMENT_ID__=-1},sn=new Re(""),gs=(()=>{class n{static __NG_ELEMENT_ID__=nI;static __NG_ENV_ID__=t=>t}return n})(),Tg=class extends gs{_lView;constructor(e){super(),this._lView=e}get destroyed(){return mo(this._lView)}onDestroy(e){let t=this._lView;return nv(t,e),()=>sM(t,e)}};function nI(){return new Tg(lt())}var vv=!1,wM=new Re(""),Or=(()=>{class n{taskId=0;pendingTasks=new Set;destroyed=!1;pendingTask=new pn(!1);debugTaskTracker=ee(wM,{optional:!0});get hasPendingTasks(){return this.destroyed?!1:this.pendingTask.value}get hasPendingTasksObservable(){return this.destroyed?new ct(t=>{t.next(!1),t.complete()}):this.pendingTask}add(){!this.hasPendingTasks&&!this.destroyed&&this.pendingTask.next(!0);let t=this.taskId++;return this.pendingTasks.add(t),this.debugTaskTracker?.add(t),t}has(t){return this.pendingTasks.has(t)}remove(t){this.pendingTasks.delete(t),this.debugTaskTracker?.remove(t),this.pendingTasks.size===0&&this.hasPendingTasks&&this.pendingTask.next(!1)}ngOnDestroy(){this.pendingTasks.clear(),this.hasPendingTasks&&this.pendingTask.next(!1),this.destroyed=!0,this.pendingTask.unsubscribe()}static \u0275prov=Oe({token:n,providedIn:"root",factory:()=>new n})}return n})(),Cg=class extends hn{__isAsync;destroyRef=void 0;pendingTasks=void 0;constructor(e=!1){super(),this.__isAsync=e,JS()&&(this.destroyRef=ee(gs,{optional:!0})??void 0,this.pendingTasks=ee(Or,{optional:!0})??void 0)}emit(e){let t=Pe(null);try{super.next(e)}finally{Pe(t)}}subscribe(e,t,i){let r=e,s=t||(()=>null),o=i;if(e&&typeof e=="object"){let c=e;r=c.next?.bind(c),s=c.error?.bind(c),o=c.complete?.bind(c)}this.__isAsync&&(s=this.wrapInTimeout(s),r&&(r=this.wrapInTimeout(r)),o&&(o=this.wrapInTimeout(o)));let a=super.subscribe({next:r,error:s,complete:o});return e instanceof tn&&e.add(a),a}wrapInTimeout(e){return t=>{let i=this.pendingTasks?.add();setTimeout(()=>{try{e(t)}finally{i!==void 0&&this.pendingTasks?.remove(i)}})}}},Fn=Cg;function Ad(...n){}function _v(n){let e,t;function i(){n=Ad;try{t!==void 0&&typeof cancelAnimationFrame=="function"&&cancelAnimationFrame(t),e!==void 0&&clearTimeout(e)}catch{}}return e=setTimeout(()=>{n(),i()}),typeof requestAnimationFrame=="function"&&(t=requestAnimationFrame(()=>{n(),i()})),()=>i()}function TM(n){return queueMicrotask(()=>n()),()=>{n=Ad}}var yv="isAngularZone",Wc=yv+"_ID",iI=0,Zt=class n{hasPendingMacrotasks=!1;hasPendingMicrotasks=!1;isStable=!0;onUnstable=new Fn(!1);onMicrotaskEmpty=new Fn(!1);onStable=new Fn(!1);onError=new Fn(!1);constructor(e){let{enableLongStackTrace:t=!1,shouldCoalesceEventChangeDetection:i=!1,shouldCoalesceRunChangeDetection:r=!1,scheduleInRootZone:s=vv}=e;if(typeof Zone>"u")throw new Te(908,!1);Zone.assertZonePatched();let o=this;o._nesting=0,o._outer=o._inner=Zone.current,Zone.TaskTrackingZoneSpec&&(o._inner=o._inner.fork(new Zone.TaskTrackingZoneSpec)),t&&Zone.longStackTraceZoneSpec&&(o._inner=o._inner.fork(Zone.longStackTraceZoneSpec)),o.shouldCoalesceEventChangeDetection=!r&&i,o.shouldCoalesceRunChangeDetection=r,o.callbackScheduled=!1,o.scheduleInRootZone=s,oI(o)}static isInAngularZone(){return typeof Zone<"u"&&Zone.current.get(yv)===!0}static assertInAngularZone(){if(!n.isInAngularZone())throw new Te(909,!1)}static assertNotInAngularZone(){if(n.isInAngularZone())throw new Te(909,!1)}run(e,t,i){return this._inner.run(e,t,i)}runTask(e,t,i,r){let s=this._inner,o=s.scheduleEventTask("NgZoneEvent: "+r,e,rI,Ad,Ad);try{return s.runTask(o,t,i)}finally{s.cancelTask(o)}}runGuarded(e,t,i){return this._inner.runGuarded(e,t,i)}runOutsideAngular(e){return this._outer.run(e)}},rI={};function xv(n){if(n._nesting==0&&!n.hasPendingMicrotasks&&!n.isStable)try{n._nesting++,n.onMicrotaskEmpty.emit(null)}finally{if(n._nesting--,!n.hasPendingMicrotasks)try{n.runOutsideAngular(()=>n.onStable.emit(null))}finally{n.isStable=!0}}}function sI(n){if(n.isCheckStableRunning||n.callbackScheduled)return;n.callbackScheduled=!0;function e(){_v(()=>{n.callbackScheduled=!1,Dg(n),n.isCheckStableRunning=!0,xv(n),n.isCheckStableRunning=!1})}n.scheduleInRootZone?Zone.root.run(()=>{e()}):n._outer.run(()=>{e()}),Dg(n)}function oI(n){let e=()=>{sI(n)},t=iI++;n._inner=n._inner.fork({name:"angular",properties:{[yv]:!0,[Wc]:t,[Wc+t]:!0},onInvokeTask:(i,r,s,o,a,c)=>{if(aI(c))return i.invokeTask(s,o,a,c);try{return kS(n),i.invokeTask(s,o,a,c)}finally{(n.shouldCoalesceEventChangeDetection&&o.type==="eventTask"||n.shouldCoalesceRunChangeDetection)&&e(),US(n)}},onInvoke:(i,r,s,o,a,c,l)=>{try{return kS(n),i.invoke(s,o,a,c,l)}finally{n.shouldCoalesceRunChangeDetection&&!n.callbackScheduled&&!cI(c)&&e(),US(n)}},onHasTask:(i,r,s,o)=>{i.hasTask(s,o),r===s&&(o.change=="microTask"?(n._hasPendingMicrotasks=o.microTask,Dg(n),xv(n)):o.change=="macroTask"&&(n.hasPendingMacrotasks=o.macroTask))},onHandleError:(i,r,s,o)=>(i.handleError(s,o),n.runOutsideAngular(()=>n.onError.emit(o)),!1)})}function Dg(n){n._hasPendingMicrotasks||(n.shouldCoalesceEventChangeDetection||n.shouldCoalesceRunChangeDetection)&&n.callbackScheduled===!0?n.hasPendingMicrotasks=!0:n.hasPendingMicrotasks=!1}function kS(n){n._nesting++,n.isStable&&(n.isStable=!1,n.onUnstable.emit(null))}function US(n){n._nesting--,xv(n)}var $c=class{hasPendingMicrotasks=!1;hasPendingMacrotasks=!1;isStable=!0;onUnstable=new Fn;onMicrotaskEmpty=new Fn;onStable=new Fn;onError=new Fn;run(e,t,i){return e.apply(t,i)}runGuarded(e,t,i){return e.apply(t,i)}runOutsideAngular(e){return e()}runTask(e,t,i,r){return e.apply(t,i)}};function aI(n){return CM(n,"__ignore_ng_zone__")}function cI(n){return CM(n,"__scheduler_tick__")}function CM(n,e){return!Array.isArray(n)||n.length!==1?!1:n[0]?.data?.[e]===!0}var Ar=class{_console=console;handleError(e){this._console.error("ERROR",e)}},Ui=new Re("",{factory:()=>{let n=ee(Zt),e=ee(nn),t;return i=>{n.runOutsideAngular(()=>{e.destroyed&&!t?setTimeout(()=>{throw i}):(t??=e.get(Ar),t.handleError(i))})}}}),DM={provide:Ir,useValue:()=>{let n=ee(Ar,{optional:!0})},multi:!0},lI=new Re("",{factory:()=>{let n=ee(sn).defaultView;if(!n)return;let e=ee(Ui),t=s=>{e(s.reason),s.preventDefault()},i=s=>{s.error?e(s.error):e(new Error(s.message,{cause:s})),s.preventDefault()},r=()=>{n.addEventListener("unhandledrejection",t),n.addEventListener("error",i)};typeof Zone<"u"?Zone.root.run(r):r(),ee(gs).onDestroy(()=>{n.removeEventListener("error",i),n.removeEventListener("unhandledrejection",t)})}});function Sv(){return lo([qS(()=>{ee(lI)})])}function vs(n,e){let[t,i,r]=ng(n,e?.equal),s=t,o=s[Jn];return s.set=i,s.update=r,s.asReadonly=AM.bind(s),s}function AM(){let n=this[Jn];if(n.readonlyFn===void 0){let e=()=>this();e[Jn]=n,n.readonlyFn=e}return n.readonlyFn}var oo=class{},va=new Re("",{factory:()=>!0});var Kd=new Re("");var Mv=(()=>{class n{static \u0275prov=Oe({token:n,providedIn:"root",factory:()=>new Ag})}return n})(),Ag=class{dirtyEffectCount=0;queues=new Map;add(e){this.enqueue(e),this.schedule(e)}schedule(e){e.dirty&&this.dirtyEffectCount++}remove(e){let t=e.zone,i=this.queues.get(t);i.has(e)&&(i.delete(e),e.dirty&&this.dirtyEffectCount--)}enqueue(e){let t=e.zone;this.queues.has(t)||this.queues.set(t,new Set);let i=this.queues.get(t);i.has(e)||i.add(e)}flush(){for(;this.dirtyEffectCount>0;){let e=!1;for(let[t,i]of this.queues)t===null?e||=this.flushQueue(i):e||=t.run(()=>this.flushQueue(i));e||(this.dirtyEffectCount=0)}}flushQueue(e){let t=!1;for(let i of e)i.dirty&&(this.dirtyEffectCount--,t=!0,i.run());return t}},Ig=class{[Jn];constructor(e){this[Jn]=e}destroy(){this[Jn].destroy()}};function fl(n){return{toString:n}.toString()}function xI(n){return typeof n=="function"}function rE(n,e,t,i){e!==null?e.applyValueToInputSignal(e,i):n[t]=i}var rf=class{previousValue;currentValue;firstChange;constructor(e,t,i){this.previousValue=e,this.currentValue=t,this.firstChange=i}isFirstChange(){return this.firstChange}},Mf=(()=>{let n=()=>sE;return n.ngInherit=!0,n})();function sE(n){return n.type.prototype.ngOnChanges&&(n.setInput=MI),SI}function SI(){let n=aE(this),e=n?.current;if(e){let t=n.previous;if(t===co)n.previous=e;else for(let i in e)t[i]=e[i];n.current=null,this.ngOnChanges(e)}}function MI(n,e,t,i,r){let s=this.declaredInputs[i],o=aE(n)||EI(n,{previous:co,current:null}),a=o.current||(o.current={}),c=o.previous,l=c[s];a[s]=new rf(l&&l.currentValue,t,c===co),rE(n,e,r,t)}var oE="__ngSimpleChanges__";function aE(n){return n[oE]||null}function EI(n,e){return n[oE]=e}var IM=[];var xt=function(n,e=null,t){for(let i=0;i<IM.length;i++){let r=IM[i];r(n,e,t)}},ut=(function(n){return n[n.TemplateCreateStart=0]="TemplateCreateStart",n[n.TemplateCreateEnd=1]="TemplateCreateEnd",n[n.TemplateUpdateStart=2]="TemplateUpdateStart",n[n.TemplateUpdateEnd=3]="TemplateUpdateEnd",n[n.LifecycleHookStart=4]="LifecycleHookStart",n[n.LifecycleHookEnd=5]="LifecycleHookEnd",n[n.OutputStart=6]="OutputStart",n[n.OutputEnd=7]="OutputEnd",n[n.BootstrapApplicationStart=8]="BootstrapApplicationStart",n[n.BootstrapApplicationEnd=9]="BootstrapApplicationEnd",n[n.BootstrapComponentStart=10]="BootstrapComponentStart",n[n.BootstrapComponentEnd=11]="BootstrapComponentEnd",n[n.ChangeDetectionStart=12]="ChangeDetectionStart",n[n.ChangeDetectionEnd=13]="ChangeDetectionEnd",n[n.ChangeDetectionSyncStart=14]="ChangeDetectionSyncStart",n[n.ChangeDetectionSyncEnd=15]="ChangeDetectionSyncEnd",n[n.AfterRenderHooksStart=16]="AfterRenderHooksStart",n[n.AfterRenderHooksEnd=17]="AfterRenderHooksEnd",n[n.ComponentStart=18]="ComponentStart",n[n.ComponentEnd=19]="ComponentEnd",n[n.DeferBlockStateStart=20]="DeferBlockStateStart",n[n.DeferBlockStateEnd=21]="DeferBlockStateEnd",n[n.DynamicComponentStart=22]="DynamicComponentStart",n[n.DynamicComponentEnd=23]="DynamicComponentEnd",n[n.HostBindingsUpdateStart=24]="HostBindingsUpdateStart",n[n.HostBindingsUpdateEnd=25]="HostBindingsUpdateEnd",n})(ut||{});function bI(n,e,t){let{ngOnChanges:i,ngOnInit:r,ngDoCheck:s}=e.type.prototype;if(i){let o=sE(e);(t.preOrderHooks??=[]).push(n,o),(t.preOrderCheckHooks??=[]).push(n,o)}r&&(t.preOrderHooks??=[]).push(0-n,r),s&&((t.preOrderHooks??=[]).push(n,s),(t.preOrderCheckHooks??=[]).push(n,s))}function wI(n,e){for(let t=e.directiveStart,i=e.directiveEnd;t<i;t++){let s=n.data[t].type.prototype,{ngAfterContentInit:o,ngAfterContentChecked:a,ngAfterViewInit:c,ngAfterViewChecked:l,ngOnDestroy:u}=s;o&&(n.contentHooks??=[]).push(-t,o),a&&((n.contentHooks??=[]).push(t,a),(n.contentCheckHooks??=[]).push(t,a)),c&&(n.viewHooks??=[]).push(-t,c),l&&((n.viewHooks??=[]).push(t,l),(n.viewCheckHooks??=[]).push(t,l)),u!=null&&(n.destroyHooks??=[]).push(t,u)}}function Qd(n,e,t){cE(n,e,3,t)}function ef(n,e,t,i){(n[ke]&3)===t&&cE(n,e,t,i)}function Ev(n,e){let t=n[ke];(t&3)===e&&(t&=16383,t+=1,n[ke]=t)}function cE(n,e,t,i){let r=i!==void 0?n[fo]&65535:0,s=i??-1,o=e.length-1,a=0;for(let c=r;c<o;c++)if(typeof e[c+1]=="number"){if(a=e[c],i!=null&&a>=i)break}else e[c]<0&&(n[fo]+=65536),(a<s||s==-1)&&(TI(n,t,e,c),n[fo]=(n[fo]&4294901760)+c+2),c++}function RM(n,e){xt(ut.LifecycleHookStart,n,e);let t=Pe(null);try{e.call(n)}finally{Pe(t),xt(ut.LifecycleHookEnd,n,e)}}function TI(n,e,t,i){let r=t[i]<0,s=t[i+1],o=r?-t[i]:t[i],a=n[o];r?n[ke]>>14<n[fo]>>16&&(n[ke]&3)===e&&(n[ke]+=16384,RM(a,s)):RM(a,s)}var ya=-1,ol=class{factory;name;injectImpl;resolving=!1;canSeeViewProviders;multi;componentProviders;index;providerFactory;constructor(e,t,i,r){this.factory=e,this.name=r,this.canSeeViewProviders=t,this.injectImpl=i}};function CI(n){return(n.flags&8)!==0}function DI(n){return(n.flags&16)!==0}function AI(n,e,t){let i=0;for(;i<t.length;){let r=t[i];if(typeof r=="number"){if(r!==0)break;i++;let s=t[i++],o=t[i++],a=t[i++];n.setAttribute(e,o,a,s)}else{let s=r,o=t[++i];RI(s)?n.setProperty(e,s,o):n.setAttribute(e,s,o),i++}}return i}function II(n){return n===3||n===4||n===6}function RI(n){return n.charCodeAt(0)===64}function Ef(n,e){if(!(e===null||e.length===0))if(n===null||n.length===0)n=e.slice();else{let t=-1;for(let i=0;i<e.length;i++){let r=e[i];typeof r=="number"?t=r:t===0||(t===-1||t===2?NM(n,t,r,null,e[++i]):NM(n,t,r,null,null))}}return n}function NM(n,e,t,i,r){let s=0,o=n.length;if(e===-1)o=-1;else for(;s<n.length;){let a=n[s++];if(typeof a=="number"){if(a===e){o=-1;break}else if(a>e){o=s-1;break}}}for(;s<n.length;){let a=n[s];if(typeof a=="number")break;if(a===t){r!==null&&(n[s+1]=r);return}s++,r!==null&&s++}o!==-1&&(n.splice(o,0,e),s=o+1),n.splice(s++,0,t),r!==null&&n.splice(s++,0,r)}function lE(n){return n!==ya}function sf(n){return n&32767}function NI(n){return n>>16}function of(n,e){let t=NI(n),i=e;for(;t>0;)i=i[uo],t--;return i}var Iv=!0;function PM(n){let e=Iv;return Iv=n,e}var PI=256,uE=PI-1,dE=5,OI=0,nr={};function LI(n,e,t){let i;typeof t=="string"?i=t.charCodeAt(0)||0:t.hasOwnProperty(ao)&&(i=t[ao]),i==null&&(i=t[ao]=OI++);let r=i&uE,s=1<<r;e.data[n+(r>>dE)]|=s}function fE(n,e){let t=hE(n,e);if(t!==-1)return t;let i=e[Le];i.firstCreatePass&&(n.injectorIndex=e.length,bv(i.data,n),bv(e,null),bv(i.blueprint,null));let r=i_(n,e),s=n.injectorIndex;if(lE(r)){let o=sf(r),a=of(r,e),c=a[Le].data;for(let l=0;l<8;l++)e[s+l]=a[o+l]|c[o+l]}return e[s+8]=r,s}function bv(n,e){n.push(0,0,0,0,0,0,0,0,e)}function hE(n,e){return n.injectorIndex===-1||n.parent&&n.parent.injectorIndex===n.injectorIndex||e[n.injectorIndex+8]===null?-1:n.injectorIndex}function i_(n,e){if(n.parent&&n.parent.injectorIndex!==-1)return n.parent.injectorIndex;let t=0,i=null,r=e;for(;r!==null;){if(i=_E(r),i===null)return ya;if(t++,r=r[uo],i.injectorIndex!==-1)return i.injectorIndex|t<<16}return ya}function FI(n,e,t){LI(n,e,t)}function pE(n,e,t){if(t&8||n!==void 0)return n;Od(e,"NodeInjector")}function mE(n,e,t,i){if(t&8&&i===void 0&&(i=null),(t&3)===0){let r=n[Rr],s=Qn(void 0);try{return r?r.get(e,i,t&8):Gg(e,i,t&8)}finally{Qn(s)}}return pE(i,e,t)}function gE(n,e,t,i=0,r){if(n!==null){if(e[ke]&2048&&!(i&2)){let o=VI(n,e,t,i,nr);if(o!==nr)return o}let s=vE(n,e,t,i,nr);if(s!==nr)return s}return mE(e,t,i,r)}function vE(n,e,t,i,r){let s=UI(t);if(typeof s=="function"){if(!hv(e,n,i))return i&1?pE(r,t,i):mE(e,t,i,r);try{let o;if(o=s(i),o==null&&!(i&8))Od(t);else return o}finally{pv()}}else if(typeof s=="number"){let o=null,a=hE(n,e),c=ya,l=i&1?e[ei][xi]:null;for((a===-1||i&4)&&(c=a===-1?i_(n,e):e[a+8],c===ya||!LM(i,!1)?a=-1:(o=e[Le],a=sf(c),e=of(c,e)));a!==-1;){let u=e[Le];if(OM(s,a,u.data)){let d=kI(a,e,t,o,i,l);if(d!==nr)return d}c=e[a+8],c!==ya&&LM(i,e[Le].data[a+8]===l)&&OM(s,a,e)?(o=u,a=sf(c),e=of(c,e)):a=-1}}return r}function kI(n,e,t,i,r,s){let o=e[Le],a=o.data[n+8],c=i==null?Pr(a)&&Iv:i!=o&&(a.type&3)!==0,l=r&1&&s===a,u=tf(a,o,t,c,l);return u!==null?af(e,o,u,a,r):nr}function tf(n,e,t,i,r){let s=n.providerIndexes,o=e.data,a=s&1048575,c=n.directiveStart,l=n.directiveEnd,u=s>>20,d=i?a:a+u,f=r?a+u:l;for(let h=d;h<f;h++){let m=o[h];if(h<c&&t===m||h>=c&&m.type===t)return h}if(r){let h=o[c];if(h&&po(h)&&h.type===t)return c}return null}function af(n,e,t,i,r){let s=n[t],o=e.data;if(s instanceof ol){let a=s;if(a.resolving)throw zg("");let c=PM(a.canSeeViewProviders);a.resolving=!0;let l=o[t].type||o[t],u,d=a.injectImpl?Qn(a.injectImpl):null,f=hv(n,i,0);try{s=n[t]=a.factory(void 0,r,o,n,i),e.firstCreatePass&&t>=i.directiveStart&&bI(t,o[t],e)}finally{d!==null&&Qn(d),PM(c),a.resolving=!1,pv()}}return s}function UI(n){if(typeof n=="string")return n.charCodeAt(0)||0;let e=n.hasOwnProperty(ao)?n[ao]:void 0;return typeof e=="number"?e>=0?e&uE:BI:e}function OM(n,e,t){let i=1<<n;return!!(t[e+(n>>dE)]&i)}function LM(n,e){return!(n&2)&&!(n&1&&e)}var go=class{_tNode;_lView;constructor(e,t){this._tNode=e,this._lView=t}get(e,t,i){return gE(this._tNode,this._lView,e,io(i),t)}};function BI(){return new go(ki(),lt())}function hl(n){return fl(()=>{let e=n.prototype.constructor,t=e[Gc]||Rv(e),i=Object.prototype,r=Object.getPrototypeOf(n.prototype).constructor;for(;r&&r!==i;){let s=r[Gc]||Rv(r);if(s&&s!==t)return s;r=Object.getPrototypeOf(r)}return s=>new s})}function Rv(n){return Ng(n)?()=>{let e=Rv(zn(n));return e&&e()}:ro(n)}function VI(n,e,t,i,r){let s=n,o=e;for(;s!==null&&o!==null&&o[ke]&2048&&!pa(o);){let a=vE(s,o,t,i|2,nr);if(a!==nr)return a;let c=s.parent;if(!c){let l=o[Zg];if(l){let u=l.get(t,nr,i&-5);if(u!==nr)return u}c=_E(o),o=o[uo]}s=c}return r}function _E(n){let e=n[Le],t=e.type;return t===2?e.declTNode:t===1?n[xi]:null}function HI(){return wa(ki(),lt())}function wa(n,e){return new Ta(er(n,e))}var Ta=(()=>{class n{nativeElement;constructor(t){this.nativeElement=t}static __NG_ELEMENT_ID__=HI}return n})();function zI(n){return n instanceof Ta?n.nativeElement:n}function GI(){return this._results[Symbol.iterator]()}var cf=class{_emitDistinctChangesOnly;dirty=!0;_onDirty=void 0;_results=[];_changesDetected=!1;_changes=void 0;length=0;first=void 0;last=void 0;get changes(){return this._changes??=new hn}constructor(e=!1){this._emitDistinctChangesOnly=e}get(e){return this._results[e]}map(e){return this._results.map(e)}filter(e){return this._results.filter(e)}find(e){return this._results.find(e)}reduce(e,t){return this._results.reduce(e,t)}forEach(e){this._results.forEach(e)}some(e){return this._results.some(e)}toArray(){return this._results.slice()}toString(){return this._results.toString()}reset(e,t){this.dirty=!1;let i=jS(e);(this._changesDetected=!GS(this._results,i,t))&&(this._results=i,this.length=i.length,this.last=i[this.length-1],this.first=i[0])}notifyOnChanges(){this._changes!==void 0&&(this._changesDetected||!this._emitDistinctChangesOnly)&&this._changes.next(this)}onDirty(e){this._onDirty=e}setDirty(){this.dirty=!0,this._onDirty?.()}destroy(){this._changes!==void 0&&(this._changes.complete(),this._changes.unsubscribe())}[Symbol.iterator]=GI};function yE(n){return(n.flags&128)===128}var r_=(function(n){return n[n.OnPush=0]="OnPush",n[n.Eager=1]="Eager",n[n.Default=1]="Default",n})(r_||{}),xE=new Map,jI=0;function WI(){return jI++}function $I(n){xE.set(n[Nr],n)}function Nv(n){xE.delete(n[Nr])}var FM="__ngContext__";function xa(n,e){hs(e)?(n[FM]=e[Nr],$I(e)):n[FM]=e}function SE(n){return EE(n[ha])}function ME(n){return EE(n[yi])}function EE(n){for(;n!==null&&!Li(n);)n=n[yi];return n}var qI;function s_(n){qI=n}var bf=new Re("",{factory:()=>XI}),XI="ng";var wf=new Re(""),pl=new Re("",{providedIn:"platform",factory:()=>"unknown"});var Tf=new Re("",{factory:()=>ee(sn).body?.querySelector("[ngCspNonce]")?.getAttribute("ngCspNonce")||null});var bE="r";var wE="di";var TE=!1,CE=new Re("",{factory:()=>TE});var YI=(n,e,t,i)=>{};function ZI(n,e,t,i){YI(n,e,t,i)}function o_(n){return(n.flags&32)===32}var KI=()=>null;function DE(n,e,t=!1){return KI(n,e,t)}function AE(n,e){let t=n.contentQueries;if(t!==null){let i=Pe(null);try{for(let r=0;r<t.length;r+=2){let s=t[r],o=t[r+1];if(o!==-1){let a=n.data[o];$d(s),a.contentQueries(2,e[o],o)}}}finally{Pe(i)}}}function Pv(n,e,t){$d(0);let i=Pe(null);try{e(n,t)}finally{Pe(i)}}function IE(n,e,t){if(Jg(e)){let i=Pe(null);try{let r=e.directiveStart,s=e.directiveEnd;for(let o=r;o<s;o++){let a=n.data[o];if(a.contentQueries){let c=t[o];a.contentQueries(1,c,o)}}}finally{Pe(i)}}}var Vi=(function(n){return n[n.Emulated=0]="Emulated",n[n.None=2]="None",n[n.ShadowDom=3]="ShadowDom",n[n.ExperimentalIsolatedShadowDom=4]="ExperimentalIsolatedShadowDom",n})(Vi||{});var lf=class{changingThisBreaksApplicationSecurity;constructor(e){this.changingThisBreaksApplicationSecurity=e}toString(){return`SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${Id})`}};function a_(n){return n instanceof lf?n.changingThisBreaksApplicationSecurity:n}function RE(n,e){let t=NE(n);if(t!=null&&t!==e){if(t==="ResourceURL"&&e==="URL")return!0;throw new Error(`Required a safe ${e}, got a ${t} (see ${Id})`)}return t===e}function NE(n){return n instanceof lf&&n.getTypeName()||null}var JI=/^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;function PE(n){return n=String(n),n.match(JI)?n:"unsafe:"+n}function QI(n,e){return n.createText(e)}function eR(n,e,t){n.setValue(e,t)}function OE(n,e,t){return n.createElement(e,t)}function uf(n,e,t,i,r){n.insertBefore(e,t,i,r)}function LE(n,e,t){n.appendChild(e,t)}function kM(n,e,t,i,r){i!==null?uf(n,e,t,i,r):LE(n,e,t)}function FE(n,e,t,i){n.removeChild(null,e,t,i)}function tR(n,e,t){n.setAttribute(e,"style",t)}function nR(n,e,t){t===""?n.removeAttribute(e,"class"):n.setAttribute(e,"class",t)}function kE(n,e,t){let{mergedAttrs:i,classes:r,styles:s}=t;i!==null&&AI(n,e,i),r!==null&&nR(n,e,r),s!==null&&tR(n,e,s)}var c_=(function(n){return n[n.NONE=0]="NONE",n[n.HTML=1]="HTML",n[n.STYLE=2]="STYLE",n[n.SCRIPT=3]="SCRIPT",n[n.URL=4]="URL",n[n.RESOURCE_URL=5]="RESOURCE_URL",n})(c_||{});function l_(n){let e=iR();return e?e.sanitize(c_.URL,n)||"":RE(n,"URL")?a_(n):PE(Hg(n))}function iR(){let n=lt();return n&&n[Oi].sanitizer}function UE(n){return n instanceof Function?n():n}function rR(n,e,t){let i=n.length;for(;;){let r=n.indexOf(e,t);if(r===-1)return r;if(r===0||n.charCodeAt(r-1)<=32){let s=e.length;if(r+s===i||n.charCodeAt(r+s)<=32)return r}t=r+1}}var BE="ng-template";function sR(n,e,t,i){let r=0;if(i){for(;r<e.length&&typeof e[r]=="string";r+=2)if(e[r]==="class"&&rR(e[r+1].toLowerCase(),t,0)!==-1)return!0}else if(u_(n))return!1;if(r=e.indexOf(1,r),r>-1){let s;for(;++r<e.length&&typeof(s=e[r])=="string";)if(s.toLowerCase()===t)return!0}return!1}function u_(n){return n.type===4&&n.value!==BE}function oR(n,e,t){let i=n.type===4&&!t?BE:n.value;return e===i}function aR(n,e,t){let i=4,r=n.attrs,s=r!==null?uR(r):0,o=!1;for(let a=0;a<e.length;a++){let c=e[a];if(typeof c=="number"){if(!o&&!Bi(i)&&!Bi(c))return!1;if(o&&Bi(c))continue;o=!1,i=c|i&1;continue}if(!o)if(i&4){if(i=2|i&1,c!==""&&!oR(n,c,t)||c===""&&e.length===1){if(Bi(i))return!1;o=!0}}else if(i&8){if(r===null||!sR(n,r,c,t)){if(Bi(i))return!1;o=!0}}else{let l=e[++a],u=cR(c,r,u_(n),t);if(u===-1){if(Bi(i))return!1;o=!0;continue}if(l!==""){let d;if(u>s?d="":d=r[u+1].toLowerCase(),i&2&&l!==d){if(Bi(i))return!1;o=!0}}}}return Bi(i)||o}function Bi(n){return(n&1)===0}function cR(n,e,t,i){if(e===null)return-1;let r=0;if(i||!t){let s=!1;for(;r<e.length;){let o=e[r];if(o===n)return r;if(o===3||o===6)s=!0;else if(o===1||o===2){let a=e[++r];for(;typeof a=="string";)a=e[++r];continue}else{if(o===4)break;if(o===0){r+=4;continue}}r+=s?1:2}return-1}else return dR(e,n)}function lR(n,e,t=!1){for(let i=0;i<e.length;i++)if(aR(n,e[i],t))return!0;return!1}function uR(n){for(let e=0;e<n.length;e++){let t=n[e];if(II(t))return e}return n.length}function dR(n,e){let t=n.indexOf(4);if(t>-1)for(t++;t<n.length;){let i=n[t];if(typeof i=="number")return-1;if(i===e)return t;t++}return-1}function UM(n,e){return n?":not("+e.trim()+")":e}function fR(n){let e=n[0],t=1,i=2,r="",s=!1;for(;t<n.length;){let o=n[t];if(typeof o=="string")if(i&2){let a=n[++t];r+="["+o+(a.length>0?'="'+a+'"':"")+"]"}else i&8?r+="."+o:i&4&&(r+=" "+o);else r!==""&&!Bi(o)&&(e+=UM(s,r),r=""),i=o,s=s||!Bi(i);t++}return r!==""&&(e+=UM(s,r)),e}function hR(n){return n.map(fR).join(",")}function pR(n){let e=[],t=[],i=1,r=2;for(;i<n.length;){let s=n[i];if(typeof s=="string")r===2?s!==""&&e.push(s,n[++i]):r===8&&t.push(s);else{if(!Bi(r))break;r=s}i++}return t.length&&e.push(1,...t),e}var Fr={};function d_(n,e,t,i,r,s,o,a,c,l,u){let d=gn+i,f=d+r,h=mR(d,f),m=typeof l=="function"?l():l;return h[Le]={type:n,blueprint:h,template:t,queries:null,viewQuery:a,declTNode:e,data:h.slice().fill(null,d),bindingStartIndex:d,expandoStartIndex:f,hostBindingOpCodes:null,firstCreatePass:!0,firstUpdatePass:!0,staticViewQueries:!1,staticContentQueries:!1,preOrderHooks:null,preOrderCheckHooks:null,contentHooks:null,contentCheckHooks:null,viewHooks:null,viewCheckHooks:null,destroyHooks:null,cleanup:null,contentQueries:null,components:null,directiveRegistry:typeof s=="function"?s():s,pipeRegistry:typeof o=="function"?o():o,firstChild:null,schemas:c,consts:m,incompleteFirstPass:!1,ssrId:u}}function mR(n,e){let t=[];for(let i=0;i<e;i++)t.push(i<n?null:Fr);return t}function gR(n){let e=n.tView;return e===null||e.incompleteFirstPass?n.tView=d_(1,null,n.template,n.decls,n.vars,n.directiveDefs,n.pipeDefs,n.viewQuery,n.schemas,n.consts,n.id):e}function f_(n,e,t,i,r,s,o,a,c,l,u){let d=e.blueprint.slice();return d[Pi]=r,d[ke]=i|4|128|8|64|1024,(l!==null||n&&n[ke]&2048)&&(d[ke]|=2048),ev(d),d[rn]=d[uo]=n,d[qt]=t,d[Oi]=o||n&&n[Oi],d[Kt]=a||n&&n[Kt],d[Rr]=c||n&&n[Rr]||null,d[xi]=s,d[Nr]=WI(),d[da]=u,d[Zg]=l,d[ei]=e.type==2?n[ei]:d,d}function vR(n,e,t){let i=er(e,n),r=gR(t),s=n[Oi].rendererFactory,o=h_(n,f_(n,r,null,VE(t),i,e,null,s.createRenderer(i,t),null,null,null));return n[e.index]=o}function VE(n){let e=16;return n.signals?e=4096:n.onPush&&(e=64),e}function HE(n,e,t,i){if(t===0)return-1;let r=e.length;for(let s=0;s<t;s++)e.push(i),n.blueprint.push(i),n.data.push(null);return r}function h_(n,e){return n[ha]?n[Yg][yi]=e:n[ha]=e,n[Yg]=e,e}function ir(n=1){zE(ni(),lt(),ps()+n,!1)}function zE(n,e,t,i){if(!i)if((e[ke]&3)===3){let s=n.preOrderCheckHooks;s!==null&&Qd(e,s,t)}else{let s=n.preOrderHooks;s!==null&&ef(e,s,0,t)}ms(t)}var Cf=(function(n){return n[n.None=0]="None",n[n.SignalBased=1]="SignalBased",n[n.HasDecoratorInputTransform=2]="HasDecoratorInputTransform",n})(Cf||{});function Ov(n,e,t,i){let r=Pe(null);try{let[s,o,a]=n.inputs[t],c=null;(o&Cf.SignalBased)!==0&&(c=e[s][Jn]),c!==null&&c.transformFn!==void 0?i=c.transformFn(i):a!==null&&(i=a.call(e,i)),n.setInput!==null?n.setInput(e,c,i,t,s):rE(e,c,s,i)}finally{Pe(r)}}var Lr=(function(n){return n[n.Important=1]="Important",n[n.DashCase=2]="DashCase",n})(Lr||{}),_R;function p_(n,e){return _R(n,e)}var EW=typeof document<"u"&&typeof document?.documentElement?.getAnimations=="function";var Lv=new WeakMap,il=new WeakSet;function yR(n,e){let t=Lv.get(n);if(!t||t.length===0)return;let i=e.parentNode,r=e.previousSibling;for(let s=t.length-1;s>=0;s--){let o=t[s],a=o.parentNode;o===e?(t.splice(s,1),il.add(o),o.dispatchEvent(new CustomEvent("animationend",{detail:{cancel:!0}}))):(r&&o===r||a&&i&&a!==i)&&(t.splice(s,1),o.dispatchEvent(new CustomEvent("animationend",{detail:{cancel:!0}})),o.parentNode?.removeChild(o))}}function xR(n,e){let t=Lv.get(n);t?t.includes(e)||t.push(e):Lv.set(n,[e])}var vo=new Set,m_=(function(n){return n[n.CHANGE_DETECTION=0]="CHANGE_DETECTION",n[n.AFTER_NEXT_RENDER=1]="AFTER_NEXT_RENDER",n})(m_||{}),Ca=new Re(""),BM=new Set;function ys(n){BM.has(n)||(BM.add(n),performance?.mark?.("mark_feature_usage",{detail:{feature:n}}))}var GE=(()=>{class n{impl=null;execute(){this.impl?.execute()}static \u0275prov=Oe({token:n,providedIn:"root",factory:()=>new n})}return n})();var jE=new Re("",{factory:()=>({queue:new Set,isScheduled:!1,scheduler:null,injector:ee(nn)})});function WE(n,e,t){let i=n.get(jE);if(Array.isArray(e))for(let r of e)i.queue.add(r),t?.detachedLeaveAnimationFns?.push(r);else i.queue.add(e),t?.detachedLeaveAnimationFns?.push(e);i.scheduler&&i.scheduler(n)}function SR(n,e){let t=n.get(jE);if(e.detachedLeaveAnimationFns){for(let i of e.detachedLeaveAnimationFns)t.queue.delete(i);e.detachedLeaveAnimationFns=void 0}}function MR(n,e){for(let[t,i]of e)WE(n,i.animateFns)}function VM(n,e,t,i){let r=n?.[ds]?.enter;e!==null&&r&&r.has(t.index)&&MR(i,r)}function _a(n,e,t,i,r,s,o,a){if(r!=null){let c,l=!1;Li(r)?c=r:hs(r)&&(l=!0,r=r[Pi]);let u=Si(r);n===0&&i!==null?(VM(a,i,s,t),o==null?LE(e,i,u):uf(e,i,u,o||null,!0)):n===1&&i!==null?(VM(a,i,s,t),uf(e,i,u,o||null,!0),yR(s,u)):n===2?(a?.[ds]?.leave?.has(s.index)&&xR(s,u),il.delete(u),HM(a,s,t,d=>{if(il.has(u)){il.delete(u);return}FE(e,u,l,d)})):n===3&&(il.delete(u),HM(a,s,t,()=>{e.destroyNode(u)})),c!=null&&LR(e,n,t,c,s,i,o)}}function ER(n,e){$E(n,e),e[Pi]=null,e[xi]=null}function bR(n,e,t,i,r,s){i[Pi]=r,i[xi]=e,Af(n,i,t,1,r,s)}function $E(n,e){e[Oi].changeDetectionScheduler?.notify(9),Af(n,e,e[Kt],2,null,null)}function wR(n){let e=n[ha];if(!e)return wv(n[Le],n);for(;e;){let t=null;if(hs(e))t=e[ha];else{let i=e[Vt];i&&(t=i)}if(!t){for(;e&&!e[yi]&&e!==n;)hs(e)&&wv(e[Le],e),e=e[rn];e===null&&(e=n),hs(e)&&wv(e[Le],e),t=e&&e[yi]}e=t}}function g_(n,e){let t=n[ho],i=t.indexOf(e);t.splice(i,1)}function Df(n,e){if(mo(e))return;let t=e[Kt];t.destroyNode&&Af(n,e,t,3,null,null),wR(e)}function wv(n,e){if(mo(e))return;let t=Pe(null);try{e[ke]&=-129,e[ke]|=256,e[ti]&&Fc(e[ti]),DR(n,e),CR(n,e),e[Le].type===1&&e[Kt].destroy();let i=e[us];if(i!==null&&Li(e[rn])){i!==e[rn]&&g_(i,e);let r=e[Qi];r!==null&&r.detachView(n)}Nv(e)}finally{Pe(t)}}function HM(n,e,t,i){let r=n?.[ds];if(r==null||r.leave==null||!r.leave.has(e.index))return i(!1);n&&vo.add(n[Nr]),WE(t,()=>{if(r.leave&&r.leave.has(e.index)){let o=r.leave.get(e.index),a=[];if(o){for(let c=0;c<o.animateFns.length;c++){let l=o.animateFns[c],{promise:u}=l();a.push(u)}r.detachedLeaveAnimationFns=void 0}r.running=Promise.allSettled(a),TR(n,i)}else n&&vo.delete(n[Nr]),i(!1)},r)}function TR(n,e){let t=n[ds]?.running;if(t){t.then(()=>{n[ds].running=void 0,vo.delete(n[Nr]),e(!0)});return}e(!1)}function CR(n,e){let t=n.cleanup,i=e[fa];if(t!==null)for(let o=0;o<t.length-1;o+=2)if(typeof t[o]=="string"){let a=t[o+3];a>=0?i[a]():i[-a].unsubscribe(),o+=2}else{let a=i[t[o+1]];t[o].call(a)}i!==null&&(e[fa]=null);let r=e[Dr];if(r!==null){e[Dr]=null;for(let o=0;o<r.length;o++){let a=r[o];a()}}let s=e[Qc];if(s!==null){e[Qc]=null;for(let o of s)o.destroy()}}function DR(n,e){let t;if(n!=null&&(t=n.destroyHooks)!=null)for(let i=0;i<t.length;i+=2){let r=e[t[i]];if(!(r instanceof ol)){let s=t[i+1];if(Array.isArray(s))for(let o=0;o<s.length;o+=2){let a=r[s[o]],c=s[o+1];xt(ut.LifecycleHookStart,a,c);try{c.call(a)}finally{xt(ut.LifecycleHookEnd,a,c)}}else{xt(ut.LifecycleHookStart,r,s);try{s.call(r)}finally{xt(ut.LifecycleHookEnd,r,s)}}}}}function AR(n,e,t){return IR(n,e.parent,t)}function IR(n,e,t){let i=e;for(;i!==null&&i.type&168;)e=i,i=e.parent;if(i===null)return t[Pi];if(Pr(i)){let{encapsulation:r}=n.data[i.directiveStart+i.componentOffset];if(r===Vi.None||r===Vi.Emulated)return null}return er(i,t)}function RR(n,e,t){return PR(n,e,t)}function NR(n,e,t){return n.type&40?er(n,t):null}var PR=NR,zM;function v_(n,e,t,i){let r=AR(n,i,e),s=e[Kt],o=i.parent||e[xi],a=RR(o,i,e);if(r!=null)if(Array.isArray(t))for(let c=0;c<t.length;c++)kM(s,r,t[c],a,!1);else kM(s,r,t,a,!1);zM!==void 0&&zM(s,i,e,t,r)}function rl(n,e){if(e!==null){let t=e.type;if(t&3)return er(e,n);if(t&4)return Fv(-1,n[e.index]);if(t&8){let i=e.child;if(i!==null)return rl(n,i);{let r=n[e.index];return Li(r)?Fv(-1,r):Si(r)}}else{if(t&128)return rl(n,e.next);if(t&32)return p_(e,n)()||Si(n[e.index]);{let i=qE(n,e);if(i!==null){if(Array.isArray(i))return i[0];let r=cs(n[ei]);return rl(r,i)}else return rl(n,e.next)}}}return null}function qE(n,e){if(e!==null){let i=n[ei][xi],r=e.projection;return i.projection[r]}return null}function Fv(n,e){let t=Vt+n+1;if(t<e.length){let i=e[t],r=i[Le].firstChild;if(r!==null)return rl(i,r)}return e[fs]}function __(n,e,t,i,r,s,o){for(;t!=null;){let a=i[Rr];if(t.type===128){t=t.next;continue}let c=i[t.index],l=t.type;if(o&&e===0&&(c&&xa(Si(c),i),t.flags|=2),!o_(t))if(l&8)__(n,e,t.child,i,r,s,!1),_a(e,n,a,r,c,t,s,i);else if(l&32){let u=p_(t,i),d;for(;d=u();)_a(e,n,a,r,d,t,s,i);_a(e,n,a,r,c,t,s,i)}else l&16?OR(n,e,i,t,r,s):_a(e,n,a,r,c,t,s,i);t=o?t.projectionNext:t.next}}function Af(n,e,t,i,r,s){__(t,i,n.firstChild,e,r,s,!1)}function OR(n,e,t,i,r,s){let o=t[ei],c=o[xi].projection[i.projection];if(Array.isArray(c))for(let l=0;l<c.length;l++){let u=c[l];_a(e,n,t[Rr],r,u,i,s,t)}else{let l=c,u=o[rn];yE(i)&&(l.flags|=128),__(n,e,l,u,r,s,!0)}}function LR(n,e,t,i,r,s,o){let a=i[fs],c=Si(i);a!==c&&_a(e,n,t,s,a,r,o);for(let l=Vt;l<i.length;l++){let u=i[l];Af(u[Le],u,n,e,s,a)}}function FR(n,e,t,i,r){if(e)r?n.addClass(t,i):n.removeClass(t,i);else{let s=i.indexOf("-")===-1?void 0:Lr.DashCase;r==null?n.removeStyle(t,i,s):(typeof r=="string"&&r.endsWith("!important")&&(r=r.slice(0,-10),s|=Lr.Important),n.setStyle(t,i,r,s))}}function XE(n,e,t,i,r){let s=ps(),o=i&2;try{ms(-1),o&&e.length>gn&&zE(n,e,gn,!1);let a=o?ut.TemplateUpdateStart:ut.TemplateCreateStart;xt(a,r,t),t(i,r)}finally{ms(s);let a=o?ut.TemplateUpdateEnd:ut.TemplateCreateEnd;xt(a,r,t)}}function YE(n,e,t){GR(n,e,t),(t.flags&64)===64&&jR(n,e,t)}function y_(n,e,t=er){let i=e.localNames;if(i!==null){let r=e.index+1;for(let s=0;s<i.length;s+=2){let o=i[s+1],a=o===-1?t(e,n):n[o];n[r++]=a}}}function kR(n,e,t,i){let s=i.get(CE,TE)||t===Vi.ShadowDom||t===Vi.ExperimentalIsolatedShadowDom,o=n.selectRootElement(e,s);return UR(o),o}function UR(n){BR(n)}var BR=()=>null;function VR(n){return n==="class"?"className":n==="for"?"htmlFor":n==="formaction"?"formAction":n==="innerHtml"?"innerHTML":n==="readonly"?"readOnly":n==="tabindex"?"tabIndex":n}function HR(n,e,t,i,r,s){let o=e[Le];if(x_(n,o,e,t,i)){Pr(n)&&zR(e,n.index);return}n.type&3&&(t=VR(t)),ZE(n,e,t,i,r,s)}function ZE(n,e,t,i,r,s){if(n.type&3){let o=er(n,e);i=s!=null?s(i,n.value||"",t):i,r.setProperty(o,t,i)}else n.type&12}function zR(n,e){let t=Fi(e,n);t[ke]&16||(t[ke]|=64)}function GR(n,e,t){let i=t.directiveStart,r=t.directiveEnd;Pr(t)&&vR(e,t,n.data[i+t.componentOffset]),n.firstCreatePass||fE(t,e);let s=t.initialInputs;for(let o=i;o<r;o++){let a=n.data[o],c=af(e,n,o,t);if(xa(c,e),s!==null&&qR(e,o-i,c,a,t,s),po(a)){let l=Fi(t.index,e);l[qt]=af(e,n,o,t)}}}function jR(n,e,t){let i=t.directiveStart,r=t.directiveEnd,s=t.index,o=vM();try{ms(s);for(let a=i;a<r;a++){let c=n.data[a],l=e[a];Wd(a),(c.hostBindings!==null||c.hostVars!==0||c.hostAttrs!==null)&&WR(c,l)}}finally{ms(-1),Wd(o)}}function WR(n,e){n.hostBindings!==null&&n.hostBindings(1,e)}function $R(n,e){let t=n.directiveRegistry,i=null;if(t)for(let r=0;r<t.length;r++){let s=t[r];lR(e,s.selectors,!1)&&(i??=[],po(s)?i.unshift(s):i.push(s))}return i}function qR(n,e,t,i,r,s){let o=s[e];if(o!==null)for(let a=0;a<o.length;a+=2){let c=o[a],l=o[a+1];Ov(i,t,c,l)}}function KE(n,e,t,i,r){let s=gn+t,o=e[Le],a=r(o,e,n,i,t);e[s]=a,ma(n,!0);let c=n.type===2;return c?(kE(e[Kt],a,n),(aM()===0||Bd(n))&&xa(a,e),cM()):xa(a,e),Yd()&&(!c||!o_(n))&&v_(o,e,a,n),n}function JE(n){let e=n;return lv()?fM():(e=e.parent,ma(e,!1)),e}function XR(n,e){let t=n[Rr];if(!t)return;let i;try{i=t.get(Ui,null)}catch{i=null}i?.(e)}function x_(n,e,t,i,r){let s=n.inputs?.[i],o=n.hostDirectiveInputs?.[i],a=!1;if(o)for(let c=0;c<o.length;c+=2){let l=o[c],u=o[c+1],d=e.data[l];Ov(d,t[l],u,r),a=!0}if(s)for(let c of s){let l=t[c],u=e.data[c];Ov(u,l,i,r),a=!0}return a}function YR(n,e){let t=Fi(e,n),i=t[Le];ZR(i,t);let r=t[Pi];r!==null&&t[da]===null&&(t[da]=DE(r,t[Rr])),xt(ut.ComponentStart);try{S_(i,t,t[qt])}finally{xt(ut.ComponentEnd,t[qt])}}function ZR(n,e){for(let t=e.length;t<n.blueprint.length;t++)e.push(n.blueprint[t])}function S_(n,e,t){qd(e);try{let i=n.viewQuery;i!==null&&Pv(1,i,t);let r=n.template;r!==null&&XE(n,e,r,1,t),n.firstCreatePass&&(n.firstCreatePass=!1),e[Qi]?.finishViewCreation(n),n.staticContentQueries&&AE(n,e),n.staticViewQueries&&Pv(2,n.viewQuery,t);let s=n.components;s!==null&&KR(e,s)}catch(i){throw n.firstCreatePass&&(n.incompleteFirstPass=!0,n.firstCreatePass=!1),i}finally{e[ke]&=-5,Xd()}}function KR(n,e){for(let t=0;t<e.length;t++)YR(n,e[t])}function If(n,e,t,i){let r=Pe(null);try{let s=e.tView,a=n[ke]&4096?4096:16,c=f_(n,s,t,a,null,e,null,null,i?.injector??null,i?.embeddedViewInjector??null,i?.dehydratedView??null),l=n[e.index];c[us]=l;let u=n[Qi];return u!==null&&(c[Qi]=u.createEmbeddedView(s)),S_(s,c,t),c}finally{Pe(r)}}function al(n,e){return!e||e.firstChild===null||yE(n)}function cl(n,e,t,i,r=!1){for(;t!==null;){if(t.type===128){t=r?t.projectionNext:t.next;continue}let s=e[t.index];s!==null&&i.push(Si(s)),Li(s)&&QE(s,i);let o=t.type;if(o&8)cl(n,e,t.child,i);else if(o&32){let a=p_(t,e),c;for(;c=a();)i.push(c)}else if(o&16){let a=qE(e,t);if(Array.isArray(a))i.push(...a);else{let c=cs(e[ei]);cl(c[Le],c,a,i,!0)}}t=r?t.projectionNext:t.next}return i}function QE(n,e){for(let t=Vt;t<n.length;t++){let i=n[t],r=i[Le].firstChild;r!==null&&cl(i[Le],i,r,e)}n[fs]!==n[Pi]&&e.push(n[fs])}function eb(n){if(n[Ud]!==null){for(let e of n[Ud])e.impl.addSequence(e);n[Ud].length=0}}var tb=[];function JR(n){return n[ti]??QR(n)}function QR(n){let e=tb.pop()??Object.create(t1);return e.lView=n,e}function e1(n){n.lView[ti]!==n&&(n.lView=null,tb.push(n))}var t1=_t(_e({},Pc),{consumerIsAlwaysLive:!0,kind:"template",consumerMarkedDirty:n=>{nl(n.lView)},consumerOnSignalRead(){this.lView[ti]=this}});function n1(n){let e=n[ti]??Object.create(i1);return e.lView=n,e}var i1=_t(_e({},Pc),{consumerIsAlwaysLive:!0,kind:"template",consumerMarkedDirty:n=>{let e=cs(n.lView);for(;e&&!nb(e[Le]);)e=cs(e);e&&tv(e)},consumerOnSignalRead(){this.lView[ti]=this}});function nb(n){return n.type!==2}function ib(n){if(n[Qc]===null)return;let e=!0;for(;e;){let t=!1;for(let i of n[Qc])i.dirty&&(t=!0,i.zone===null||Zone.current===i.zone?i.run():i.zone.run(()=>i.run()));e=t&&!!(n[ke]&8192)}}var r1=100;function rb(n,e=0){let i=n[Oi].rendererFactory,r=!1;r||i.begin?.();try{s1(n,e)}finally{r||i.end?.()}}function s1(n,e){let t=uv();try{dv(!0),kv(n,e);let i=0;for(;tl(n);){if(i===r1)throw new Te(103,!1);i++,kv(n,1)}}finally{dv(t)}}function o1(n,e,t,i){if(mo(e))return;let r=e[ke],s=!1,o=!1;qd(e);let a=!0,c=null,l=null;s||(nb(n)?(l=JR(e),c=Lc(l)):ed()===null?(a=!1,l=n1(e),c=Lc(l)):e[ti]&&(Fc(e[ti]),e[ti]=null));try{ev(e),hM(n.bindingStartIndex),t!==null&&XE(n,e,t,2,i);let u=(r&3)===3;if(!s)if(u){let h=n.preOrderCheckHooks;h!==null&&Qd(e,h,null)}else{let h=n.preOrderHooks;h!==null&&ef(e,h,0,null),Ev(e,0)}if(o||a1(e),ib(e),sb(e,0),n.contentQueries!==null&&AE(n,e),!s)if(u){let h=n.contentCheckHooks;h!==null&&Qd(e,h)}else{let h=n.contentHooks;h!==null&&ef(e,h,1),Ev(e,1)}l1(n,e);let d=n.components;d!==null&&ab(e,d,0);let f=n.viewQuery;if(f!==null&&Pv(2,f,i),!s)if(u){let h=n.viewCheckHooks;h!==null&&Qd(e,h)}else{let h=n.viewHooks;h!==null&&ef(e,h,2),Ev(e,2)}if(n.firstUpdatePass===!0&&(n.firstUpdatePass=!1),e[kd]){for(let h of e[kd])h();e[kd]=null}s||(eb(e),e[ke]&=-73)}catch(u){throw s||nl(e),u}finally{l!==null&&(td(l,c),a&&e1(l)),Xd()}}function sb(n,e){for(let t=SE(n);t!==null;t=ME(t))for(let i=Vt;i<t.length;i++){let r=t[i];ob(r,e)}}function a1(n){for(let e=SE(n);e!==null;e=ME(e)){if(!(e[ke]&2))continue;let t=e[ho];for(let i=0;i<t.length;i++){let r=t[i];tv(r)}}}function c1(n,e,t){xt(ut.ComponentStart);let i=Fi(e,n);try{ob(i,t)}finally{xt(ut.ComponentEnd,i[qt])}}function ob(n,e){Hd(n)&&kv(n,e)}function kv(n,e){let i=n[Le],r=n[ke],s=n[ti],o=!!(e===0&&r&16);if(o||=!!(r&64&&e===0),o||=!!(r&1024),o||=!!(s?.dirty&&nd(s)),o||=!1,s&&(s.dirty=!1),n[ke]&=-9217,o)o1(i,n,i.template,n[qt]);else if(r&8192){let a=Pe(null);try{ib(n),sb(n,1);let c=i.components;c!==null&&ab(n,c,1),eb(n)}finally{Pe(a)}}}function ab(n,e,t){for(let i=0;i<e.length;i++)c1(n,e[i],t)}function l1(n,e){let t=n.hostBindingOpCodes;if(t!==null)try{for(let i=0;i<t.length;i++){let r=t[i];if(r<0)ms(~r);else{let s=r,o=t[++i],a=t[++i];gM(o,s);let c=e[s];xt(ut.HostBindingsUpdateStart,c);try{a(2,c)}finally{xt(ut.HostBindingsUpdateEnd,c)}}}}finally{ms(-1)}}function M_(n,e){let t=uv()?64:1088;for(n[Oi].changeDetectionScheduler?.notify(e);n;){n[ke]|=t;let i=cs(n);if(pa(n)&&!i)return n;n=i}return null}function cb(n,e,t,i){return[n,!0,0,e,null,i,null,t,null,null]}function lb(n,e){let t=Vt+e;if(t<n.length)return n[t]}function Rf(n,e,t,i=!0){let r=e[Le];if(u1(r,e,n,t),i){let o=Fv(t,n),a=e[Kt],c=a.parentNode(n[fs]);c!==null&&bR(r,n[xi],a,e,c,o)}let s=e[da];s!==null&&s.firstChild!==null&&(s.firstChild=null)}function ub(n,e){let t=ll(n,e);return t!==void 0&&Df(t[Le],t),t}function ll(n,e){if(n.length<=Vt)return;let t=Vt+e,i=n[t];if(i){let r=i[us];r!==null&&r!==n&&g_(r,i),e>0&&(n[t-1][yi]=i[yi]);let s=Zc(n,Vt+e);ER(i[Le],i);let o=s[Qi];o!==null&&o.detachView(s[Le]),i[rn]=null,i[yi]=null,i[ke]&=-129}return i}function u1(n,e,t,i){let r=Vt+i,s=t.length;i>0&&(t[r-1][yi]=e),i<s-Vt?(e[yi]=t[r],jg(t,Vt+i,e)):(t.push(e),e[yi]=null),e[rn]=t;let o=e[us];o!==null&&t!==o&&db(o,e);let a=e[Qi];a!==null&&a.insertView(n),zd(e),e[ke]|=128}function db(n,e){let t=n[ho],i=e[rn];if(hs(i))n[ke]|=2;else{let r=i[rn][ei];e[ei]!==r&&(n[ke]|=2)}t===null?n[ho]=[e]:t.push(e)}var _s=class{_lView;_cdRefInjectingView;_appRef=null;_attachedToViewContainer=!1;exhaustive;get rootNodes(){let e=this._lView,t=e[Le];return cl(t,e,t.firstChild,[])}constructor(e,t){this._lView=e,this._cdRefInjectingView=t}get context(){return this._lView[qt]}set context(e){this._lView[qt]=e}get destroyed(){return mo(this._lView)}destroy(){if(this._appRef)this._appRef.detachView(this);else if(this._attachedToViewContainer){let e=this._lView[rn];if(Li(e)){let t=e[el],i=t?t.indexOf(this):-1;i>-1&&(ll(e,i),Zc(t,i))}this._attachedToViewContainer=!1}Df(this._lView[Le],this._lView)}onDestroy(e){nv(this._lView,e)}markForCheck(){M_(this._cdRefInjectingView||this._lView,4)}detach(){this._lView[ke]&=-129}reattach(){zd(this._lView),this._lView[ke]|=128}detectChanges(){this._lView[ke]|=1024,rb(this._lView)}checkNoChanges(){}attachToViewContainerRef(){if(this._appRef)throw new Te(902,!1);this._attachedToViewContainer=!0}detachFromAppRef(){this._appRef=null;let e=pa(this._lView),t=this._lView[us];t!==null&&!e&&g_(t,this._lView),$E(this._lView[Le],this._lView)}attachToAppRef(e){if(this._attachedToViewContainer)throw new Te(902,!1);this._appRef=e;let t=pa(this._lView),i=this._lView[us];i!==null&&!t&&db(i,this._lView),zd(this._lView)}};var Sa=(()=>{class n{_declarationLView;_declarationTContainer;elementRef;static __NG_ELEMENT_ID__=d1;constructor(t,i,r){this._declarationLView=t,this._declarationTContainer=i,this.elementRef=r}get ssrId(){return this._declarationTContainer.tView?.ssrId||null}createEmbeddedView(t,i){return this.createEmbeddedViewImpl(t,i)}createEmbeddedViewImpl(t,i,r){let s=If(this._declarationLView,this._declarationTContainer,t,{embeddedViewInjector:i,dehydratedView:r});return new _s(s)}}return n})();function d1(){return E_(ki(),lt())}function E_(n,e){return n.type&4?new Sa(e,n,wa(n,e)):null}function Nf(n,e,t,i,r){let s=n.data[e];if(s===null)s=f1(n,e,t,i,r),mM()&&(s.flags|=32);else if(s.type&64){s.type=t,s.value=i,s.attrs=r;let o=dM();s.injectorIndex=o===null?-1:o.injectorIndex}return ma(s,!0),s}function f1(n,e,t,i,r){let s=cv(),o=lv(),a=o?s:s&&s.parent,c=n.data[e]=p1(n,a,t,e,i,r);return h1(n,c,s,o),c}function h1(n,e,t,i){n.firstChild===null&&(n.firstChild=e),t!==null&&(i?t.child==null&&e.parent!==null&&(t.child=e):t.next===null&&(t.next=e,e.prev=t))}function p1(n,e,t,i,r,s){let o=e?e.injectorIndex:-1,a=0;return uM()&&(a|=128),{type:t,index:i,insertBeforeIndex:null,injectorIndex:o,directiveStart:-1,directiveEnd:-1,directiveStylingLast:-1,componentOffset:-1,controlDirectiveIndex:-1,customControlIndex:-1,propertyBindings:null,flags:a,providerIndexes:0,value:r,attrs:s,mergedAttrs:null,localNames:null,initialInputs:null,inputs:null,hostDirectiveInputs:null,outputs:null,hostDirectiveOutputs:null,directiveToIndex:null,tView:null,next:null,prev:null,projectionNext:null,child:null,parent:e,projection:null,styles:null,stylesWithoutHost:null,residualStyles:void 0,classes:null,classesWithoutHost:null,residualClasses:void 0,classBindings:0,styleBindings:0}}function m1(n){let e=n[Kg]??[],i=n[rn][Kt],r=[];for(let s of e)s.data[wE]!==void 0?r.push(s):g1(s,i);n[Kg]=r}function g1(n,e){let t=0,i=n.firstChild;if(i){let r=n.data[bE];for(;t<r;){let s=i.nextSibling;FE(e,i,!1),i=s,t++}}}var v1=()=>null,_1=()=>null;function Uv(n,e){return v1(n,e)}function fb(n,e,t){return _1(n,e,t)}var hb=class{},Pf=class{},Bv=class{resolveComponentFactory(e){throw new Te(917,!1)}},ml=class{static NULL=new Bv},_o=class{};var pb=(()=>{class n{static \u0275prov=Oe({token:n,providedIn:"root",factory:()=>null})}return n})();var nf={},Vv=class{injector;parentInjector;constructor(e,t){this.injector=e,this.parentInjector=t}get(e,t,i){let r=this.injector.get(e,nf,i);return r!==nf||t===nf?r:this.parentInjector.get(e,t,i)}};function df(n,e,t){let i=t?n.styles:null,r=t?n.classes:null,s=0;if(e!==null)for(let o=0;o<e.length;o++){let a=e[o];if(typeof a=="number")s=a;else if(s==1)r=Rg(r,a);else if(s==2){let c=a,l=e[++o];i=Rg(i,c+": "+l+";")}}t?n.styles=i:n.stylesWithoutHost=i,t?n.classes=r:n.classesWithoutHost=r}function b_(n,e=0){let t=lt();if(t===null)return $e(n,e);let i=ki();return gE(i,t,zn(n),e)}function y1(n,e,t,i,r){let s=i===null?null:{"":-1},o=r(n,t);if(o!==null){let a=o,c=null,l=null;for(let u of o)if(u.resolveHostDirectives!==null){[a,c,l]=u.resolveHostDirectives(o);break}M1(n,e,t,a,s,c,l)}s!==null&&i!==null&&x1(t,i,s)}function x1(n,e,t){let i=n.localNames=[];for(let r=0;r<e.length;r+=2){let s=t[e[r+1]];if(s==null)throw new Te(-301,!1);i.push(e[r],s)}}function S1(n,e,t){e.componentOffset=t,(n.components??=[]).push(e.index)}function M1(n,e,t,i,r,s,o){let a=i.length,c=null;for(let f=0;f<a;f++){let h=i[f];c===null&&po(h)&&(c=h,S1(n,t,f)),FI(fE(t,e),n,h.type)}D1(t,n.data.length,a),c?.viewProvidersResolver&&c.viewProvidersResolver(c);for(let f=0;f<a;f++){let h=i[f];h.providersResolver&&h.providersResolver(h)}let l=!1,u=!1,d=HE(n,e,a,null);a>0&&(t.directiveToIndex=new Map);for(let f=0;f<a;f++){let h=i[f];if(t.mergedAttrs=Ef(t.mergedAttrs,h.hostAttrs),b1(n,t,e,d,h),C1(d,h,r),o!==null&&o.has(h)){let[v,p]=o.get(h);t.directiveToIndex.set(h.type,[d,v+t.directiveStart,p+t.directiveStart])}else(s===null||!s.has(h))&&t.directiveToIndex.set(h.type,d);h.contentQueries!==null&&(t.flags|=4),(h.hostBindings!==null||h.hostAttrs!==null||h.hostVars!==0)&&(t.flags|=64);let m=h.type.prototype;!l&&(m.ngOnChanges||m.ngOnInit||m.ngDoCheck)&&((n.preOrderHooks??=[]).push(t.index),l=!0),!u&&(m.ngOnChanges||m.ngDoCheck)&&((n.preOrderCheckHooks??=[]).push(t.index),u=!0),d++}E1(n,t,s)}function E1(n,e,t){for(let i=e.directiveStart;i<e.directiveEnd;i++){let r=n.data[i];if(t===null||!t.has(r))GM(0,e,r,i),GM(1,e,r,i),WM(e,i,!1);else{let s=t.get(r);jM(0,e,s,i),jM(1,e,s,i),WM(e,i,!0)}}}function GM(n,e,t,i){let r=n===0?t.inputs:t.outputs;for(let s in r)if(r.hasOwnProperty(s)){let o;n===0?o=e.inputs??={}:o=e.outputs??={},o[s]??=[],o[s].push(i),mb(e,s)}}function jM(n,e,t,i){let r=n===0?t.inputs:t.outputs;for(let s in r)if(r.hasOwnProperty(s)){let o=r[s],a;n===0?a=e.hostDirectiveInputs??={}:a=e.hostDirectiveOutputs??={},a[o]??=[],a[o].push(i,s),mb(e,o)}}function mb(n,e){e==="class"?n.flags|=8:e==="style"&&(n.flags|=16)}function WM(n,e,t){let{attrs:i,inputs:r,hostDirectiveInputs:s}=n;if(i===null||!t&&r===null||t&&s===null||u_(n)){n.initialInputs??=[],n.initialInputs.push(null);return}let o=null,a=0;for(;a<i.length;){let c=i[a];if(c===0){a+=4;continue}else if(c===5){a+=2;continue}else if(typeof c=="number")break;if(!t&&r.hasOwnProperty(c)){let l=r[c];for(let u of l)if(u===e){o??=[],o.push(c,i[a+1]);break}}else if(t&&s.hasOwnProperty(c)){let l=s[c];for(let u=0;u<l.length;u+=2)if(l[u]===e){o??=[],o.push(l[u+1],i[a+1]);break}}a+=2}n.initialInputs??=[],n.initialInputs.push(o)}function b1(n,e,t,i,r){n.data[i]=r;let s=r.factory||(r.factory=ro(r.type,!0)),o=new ol(s,po(r),b_,null);n.blueprint[i]=o,t[i]=o,w1(n,e,i,HE(n,t,r.hostVars,Fr),r)}function w1(n,e,t,i,r){let s=r.hostBindings;if(s){let o=n.hostBindingOpCodes;o===null&&(o=n.hostBindingOpCodes=[]);let a=~e.index;T1(o)!=a&&o.push(a),o.push(t,i,s)}}function T1(n){let e=n.length;for(;e>0;){let t=n[--e];if(typeof t=="number"&&t<0)return t}return 0}function C1(n,e,t){if(t){if(e.exportAs)for(let i=0;i<e.exportAs.length;i++)t[e.exportAs[i]]=n;po(e)&&(t[""]=n)}}function D1(n,e,t){n.flags|=1,n.directiveStart=e,n.directiveEnd=e+t,n.providerIndexes=e}function gb(n,e,t,i,r,s,o,a){let c=e[Le],l=c.consts,u=tr(l,o),d=Nf(c,n,t,i,u);return s&&y1(c,e,d,tr(l,a),r),d.mergedAttrs=Ef(d.mergedAttrs,d.attrs),d.attrs!==null&&df(d,d.attrs,!1),d.mergedAttrs!==null&&df(d,d.mergedAttrs,!0),c.queries!==null&&c.queries.elementStart(c,d),d}function vb(n,e){wI(n,e),Jg(e)&&n.queries.elementEnd(e)}function A1(n,e,t,i,r,s){let o=e.consts,a=tr(o,r),c=Nf(e,n,t,i,a);if(c.mergedAttrs=Ef(c.mergedAttrs,c.attrs),s!=null){let l=tr(o,s);c.localNames=[];for(let u=0;u<l.length;u+=2)c.localNames.push(l[u],-1)}return c.attrs!==null&&df(c,c.attrs,!1),c.mergedAttrs!==null&&df(c,c.mergedAttrs,!0),e.queries!==null&&e.queries.elementStart(e,c),c}function Da(n,e,t){if(t===Fr)return!1;let i=n[e];return Object.is(i,t)?!1:(n[e]=t,!0)}function I1(n,e,t){return function i(r){let s=Pr(n)?Fi(n.index,e):e;M_(s,5);let o=e[qt],a=$M(e,o,t,r),c=i.__ngNextListenerFn__;for(;c;)a=$M(e,o,c,r)&&a,c=c.__ngNextListenerFn__;return a}}function $M(n,e,t,i){let r=Pe(null);try{return xt(ut.OutputStart,e,t),t(i)!==!1}catch(s){return XR(n,s),!1}finally{xt(ut.OutputEnd,e,t),Pe(r)}}function R1(n,e,t,i,r,s,o,a){let c=Bd(n),l=!1,u=null;if(!i&&c&&(u=P1(e,t,s,n.index)),u!==null){let d=u.__ngLastListenerFn__||u;d.__ngNextListenerFn__=o,u.__ngLastListenerFn__=o,l=!0}else{let d=er(n,t),f=i?i(d):d;ZI(t,f,s,a);let h=r.listen(f,s,a);if(!N1(s)){let m=i?v=>i(Si(v[n.index])):n.index;O1(m,e,t,s,a,h,!1)}}return l}function N1(n){return n.startsWith("animation")||n.startsWith("transition")}function P1(n,e,t,i){let r=n.cleanup;if(r!=null)for(let s=0;s<r.length-1;s+=2){let o=r[s];if(o===t&&r[s+1]===i){let a=e[fa],c=r[s+2];return a&&a.length>c?a[c]:null}typeof o=="string"&&(s+=2)}return null}function O1(n,e,t,i,r,s,o){let a=e.firstCreatePass?rv(e):null,c=iv(t),l=c.length;c.push(r,s),a&&a.push(i,n,l,(l+1)*(o?-1:1))}var Hv=Symbol("BINDING");function _b(n){return n.debugInfo?.className||n.type.name||null}var ff=class extends ml{ngModule;constructor(e){super(),this.ngModule=e}resolveComponentFactory(e){let t=ls(e);return new Ma(t,this.ngModule)}};function L1(n){return Object.keys(n).map(e=>{let[t,i,r]=n[e],s={propName:t,templateName:e,isSignal:(i&Cf.SignalBased)!==0};return r&&(s.transform=r),s})}function F1(n){return Object.keys(n).map(e=>({propName:n[e],templateName:e}))}function k1(n,e,t){let i=e instanceof nn?e:e?.injector;return i&&n.getStandaloneInjector!==null&&(i=n.getStandaloneInjector(i)||i),i?new Vv(t,i):t}function U1(n){let e=n.get(_o,null);if(e===null)throw new Te(407,!1);let t=n.get(pb,null),i=n.get(oo,null),r=n.get(Ca,null,{optional:!0});return{rendererFactory:e,sanitizer:t,changeDetectionScheduler:i,ngReflect:!1,tracingService:r}}function B1(n,e){let t=yb(n);return OE(e,t,t==="svg"?eM:t==="math"?tM:null)}function yb(n){return(n.selectors[0][0]||"div").toLowerCase()}var Ma=class extends Pf{componentDef;ngModule;selector;componentType;ngContentSelectors;isBoundToModule;cachedInputs=null;cachedOutputs=null;get inputs(){return this.cachedInputs??=L1(this.componentDef.inputs),this.cachedInputs}get outputs(){return this.cachedOutputs??=F1(this.componentDef.outputs),this.cachedOutputs}constructor(e,t){super(),this.componentDef=e,this.ngModule=t,this.componentType=e.type,this.selector=hR(e.selectors),this.ngContentSelectors=e.ngContentSelectors??[],this.isBoundToModule=!!t}create(e,t,i,r,s,o){xt(ut.DynamicComponentStart);let a=Pe(null);try{let c=this.componentDef,l=k1(c,r||this.ngModule,e),u=U1(l),d=u.tracingService;return d&&d.componentCreate?d.componentCreate(_b(c),()=>this.createComponentRef(u,l,t,i,s,o)):this.createComponentRef(u,l,t,i,s,o)}finally{Pe(a)}}createComponentRef(e,t,i,r,s,o){let a=this.componentDef,c=V1(r,a,o,s),l=e.rendererFactory.createRenderer(null,a),u=r?kR(l,r,a.encapsulation,t):B1(a,l),d=o?.some(qM)||s?.some(m=>typeof m!="function"&&m.bindings.some(qM)),f=f_(null,c,null,512|VE(a),null,null,e,l,t,null,DE(u,t,!0));f[gn]=u,qd(f);let h=null;try{let m=gb(gn,f,2,"#host",()=>c.directiveRegistry,!0,0);kE(l,u,m),xa(u,f),YE(c,f,m),IE(c,m,f),vb(c,m),i!==void 0&&z1(m,this.ngContentSelectors,i),h=Fi(m.index,f),f[qt]=h[qt],S_(c,f,null)}catch(m){throw h!==null&&Nv(h),Nv(f),m}finally{xt(ut.DynamicComponentEnd),Xd()}return new hf(this.componentType,f,!!d)}};function V1(n,e,t,i){let r=n?["ng-version","21.2.9"]:pR(e.selectors[0]),s=null,o=null,a=0;if(t)for(let u of t)a+=u[Hv].requiredVars,u.create&&(u.targetIdx=0,(s??=[]).push(u)),u.update&&(u.targetIdx=0,(o??=[]).push(u));if(i)for(let u=0;u<i.length;u++){let d=i[u];if(typeof d!="function")for(let f of d.bindings){a+=f[Hv].requiredVars;let h=u+1;f.create&&(f.targetIdx=h,(s??=[]).push(f)),f.update&&(f.targetIdx=h,(o??=[]).push(f))}}let c=[e];if(i)for(let u of i){let d=typeof u=="function"?u:u.type,f=Vg(d);c.push(f)}return d_(0,null,H1(s,o),1,a,c,null,null,null,[r],null)}function H1(n,e){return!n&&!e?null:t=>{if(t&1&&n)for(let i of n)i.create();if(t&2&&e)for(let i of e)i.update()}}function qM(n){let e=n[Hv].kind;return e==="input"||e==="twoWay"}var hf=class extends hb{_rootLView;_hasInputBindings;instance;hostView;changeDetectorRef;componentType;location;previousInputValues=null;_tNode;constructor(e,t,i){super(),this._rootLView=t,this._hasInputBindings=i,this._tNode=Vd(t[Le],gn),this.location=wa(this._tNode,t),this.instance=Fi(this._tNode.index,t)[qt],this.hostView=this.changeDetectorRef=new _s(t,void 0),this.componentType=e}setInput(e,t){this._hasInputBindings;let i=this._tNode;if(this.previousInputValues??=new Map,this.previousInputValues.has(e)&&Object.is(this.previousInputValues.get(e),t))return;let r=this._rootLView,s=x_(i,r[Le],r,e,t);this.previousInputValues.set(e,t);let o=Fi(i.index,r);M_(o,1)}get injector(){return new go(this._tNode,this._rootLView)}destroy(){this.hostView.destroy()}onDestroy(e){this.hostView.onDestroy(e)}};function z1(n,e,t){let i=n.projection=[];for(let r=0;r<e.length;r++){let s=t[r];i.push(s!=null&&s.length?Array.from(s):null)}}var xo=(()=>{class n{static __NG_ELEMENT_ID__=G1}return n})();function G1(){let n=ki();return xb(n,lt())}var zv=class n extends xo{_lContainer;_hostTNode;_hostLView;constructor(e,t,i){super(),this._lContainer=e,this._hostTNode=t,this._hostLView=i}get element(){return wa(this._hostTNode,this._hostLView)}get injector(){return new go(this._hostTNode,this._hostLView)}get parentInjector(){let e=i_(this._hostTNode,this._hostLView);if(lE(e)){let t=of(e,this._hostLView),i=sf(e),r=t[Le].data[i+8];return new go(r,t)}else return new go(null,this._hostLView)}clear(){for(;this.length>0;)this.remove(this.length-1)}get(e){let t=XM(this._lContainer);return t!==null&&t[e]||null}get length(){return this._lContainer.length-Vt}createEmbeddedView(e,t,i){let r,s;typeof i=="number"?r=i:i!=null&&(r=i.index,s=i.injector);let o=Uv(this._lContainer,e.ssrId),a=e.createEmbeddedViewImpl(t||{},s,o);return this.insertImpl(a,r,al(this._hostTNode,o)),a}createComponent(e,t,i,r,s,o,a){let c=e&&!xI(e),l;if(c)l=t;else{let p=t||{};l=p.index,i=p.injector,r=p.projectableNodes,s=p.environmentInjector||p.ngModuleRef,o=p.directives,a=p.bindings}let u=c?e:new Ma(ls(e)),d=i||this.parentInjector;if(!s&&u.ngModule==null){let g=(c?d:this.parentInjector).get(nn,null);g&&(s=g)}let f=ls(u.componentType??{}),h=Uv(this._lContainer,f?.id??null),m=h?.firstChild??null,v=u.create(d,r,m,s,o,a);return this.insertImpl(v.hostView,l,al(this._hostTNode,h)),v}insert(e,t){return this.insertImpl(e,t,!0)}insertImpl(e,t,i){let r=e._lView;if(iM(r)){let a=this.indexOf(e);if(a!==-1)this.detach(a);else{let c=r[rn],l=new n(c,c[xi],c[rn]);l.detach(l.indexOf(e))}}let s=this._adjustIndex(t),o=this._lContainer;return Rf(o,r,s,i),e.attachToViewContainerRef(),jg(Tv(o),s,e),e}move(e,t){return this.insert(e,t)}indexOf(e){let t=XM(this._lContainer);return t!==null?t.indexOf(e):-1}remove(e){let t=this._adjustIndex(e,-1),i=ll(this._lContainer,t);i&&(Zc(Tv(this._lContainer),t),Df(i[Le],i))}detach(e){let t=this._adjustIndex(e,-1),i=ll(this._lContainer,t);return i&&Zc(Tv(this._lContainer),t)!=null?new _s(i):null}_adjustIndex(e,t=0){return e??this.length+t}};function XM(n){return n[el]}function Tv(n){return n[el]||(n[el]=[])}function xb(n,e){let t,i=e[n.index];return Li(i)?t=i:(t=cb(i,e,null,n),e[n.index]=t,h_(e,t)),W1(t,e,n,i),new zv(t,n,e)}function j1(n,e){let t=n[Kt],i=t.createComment(""),r=er(e,n),s=t.parentNode(r);return uf(t,s,i,t.nextSibling(r),!1),i}var W1=X1,$1=()=>!1;function q1(n,e,t){return $1(n,e,t)}function X1(n,e,t,i){if(n[fs])return;let r;t.type&8?r=Si(i):r=j1(e,t),n[fs]=r}var Gv=class n{queryList;matches=null;constructor(e){this.queryList=e}clone(){return new n(this.queryList)}setDirty(){this.queryList.setDirty()}},jv=class n{queries;constructor(e=[]){this.queries=e}createEmbeddedView(e){let t=e.queries;if(t!==null){let i=e.contentQueries!==null?e.contentQueries[0]:t.length,r=[];for(let s=0;s<i;s++){let o=t.getByIndex(s),a=this.queries[o.indexInDeclarationView];r.push(a.clone())}return new n(r)}return null}insertView(e){this.dirtyQueriesWithMatches(e)}detachView(e){this.dirtyQueriesWithMatches(e)}finishViewCreation(e){this.dirtyQueriesWithMatches(e)}dirtyQueriesWithMatches(e){for(let t=0;t<this.queries.length;t++)w_(e,t).matches!==null&&this.queries[t].setDirty()}},Wv=class{flags;read;predicate;constructor(e,t,i=null){this.flags=t,this.read=i,typeof e=="string"?this.predicate=nN(e):this.predicate=e}},$v=class n{queries;constructor(e=[]){this.queries=e}elementStart(e,t){for(let i=0;i<this.queries.length;i++)this.queries[i].elementStart(e,t)}elementEnd(e){for(let t=0;t<this.queries.length;t++)this.queries[t].elementEnd(e)}embeddedTView(e){let t=null;for(let i=0;i<this.length;i++){let r=t!==null?t.length:0,s=this.getByIndex(i).embeddedTView(e,r);s&&(s.indexInDeclarationView=i,t!==null?t.push(s):t=[s])}return t!==null?new n(t):null}template(e,t){for(let i=0;i<this.queries.length;i++)this.queries[i].template(e,t)}getByIndex(e){return this.queries[e]}get length(){return this.queries.length}track(e){this.queries.push(e)}},qv=class n{metadata;matches=null;indexInDeclarationView=-1;crossesNgTemplate=!1;_declarationNodeIndex;_appliesToNextNode=!0;constructor(e,t=-1){this.metadata=e,this._declarationNodeIndex=t}elementStart(e,t){this.isApplyingToNode(t)&&this.matchTNode(e,t)}elementEnd(e){this._declarationNodeIndex===e.index&&(this._appliesToNextNode=!1)}template(e,t){this.elementStart(e,t)}embeddedTView(e,t){return this.isApplyingToNode(e)?(this.crossesNgTemplate=!0,this.addMatch(-e.index,t),new n(this.metadata)):null}isApplyingToNode(e){if(this._appliesToNextNode&&(this.metadata.flags&1)!==1){let t=this._declarationNodeIndex,i=e.parent;for(;i!==null&&i.type&8&&i.index!==t;)i=i.parent;return t===(i!==null?i.index:-1)}return this._appliesToNextNode}matchTNode(e,t){let i=this.metadata.predicate;if(Array.isArray(i))for(let r=0;r<i.length;r++){let s=i[r];this.matchTNodeWithReadOption(e,t,Y1(t,s)),this.matchTNodeWithReadOption(e,t,tf(t,e,s,!1,!1))}else i===Sa?t.type&4&&this.matchTNodeWithReadOption(e,t,-1):this.matchTNodeWithReadOption(e,t,tf(t,e,i,!1,!1))}matchTNodeWithReadOption(e,t,i){if(i!==null){let r=this.metadata.read;if(r!==null)if(r===Ta||r===xo||r===Sa&&t.type&4)this.addMatch(t.index,-2);else{let s=tf(t,e,r,!1,!1);s!==null&&this.addMatch(t.index,s)}else this.addMatch(t.index,i)}}addMatch(e,t){this.matches===null?this.matches=[e,t]:this.matches.push(e,t)}};function Y1(n,e){let t=n.localNames;if(t!==null){for(let i=0;i<t.length;i+=2)if(t[i]===e)return t[i+1]}return null}function Z1(n,e){return n.type&11?wa(n,e):n.type&4?E_(n,e):null}function K1(n,e,t,i){return t===-1?Z1(e,n):t===-2?J1(n,e,i):af(n,n[Le],t,e)}function J1(n,e,t){if(t===Ta)return wa(e,n);if(t===Sa)return E_(e,n);if(t===xo)return xb(e,n)}function Sb(n,e,t,i){let r=e[Qi].queries[i];if(r.matches===null){let s=n.data,o=t.matches,a=[];for(let c=0;o!==null&&c<o.length;c+=2){let l=o[c];if(l<0)a.push(null);else{let u=s[l];a.push(K1(e,u,o[c+1],t.metadata.read))}}r.matches=a}return r.matches}function Xv(n,e,t,i){let r=n.queries.getByIndex(t),s=r.matches;if(s!==null){let o=Sb(n,e,r,t);for(let a=0;a<s.length;a+=2){let c=s[a];if(c>0)i.push(o[a/2]);else{let l=s[a+1],u=e[-c];for(let d=Vt;d<u.length;d++){let f=u[d];f[us]===f[rn]&&Xv(f[Le],f,l,i)}if(u[ho]!==null){let d=u[ho];for(let f=0;f<d.length;f++){let h=d[f];Xv(h[Le],h,l,i)}}}}}return i}function Q1(n,e){return n[Qi].queries[e].queryList}function eN(n,e,t){let i=new cf((t&4)===4);return oM(n,e,i,i.destroy),(e[Qi]??=new jv).queries.push(new Gv(i))-1}function tN(n,e,t){let i=ni();return i.firstCreatePass&&(iN(i,new Wv(n,e,t),-1),(e&2)===2&&(i.staticViewQueries=!0)),eN(i,lt(),e)}function nN(n){return n.split(",").map(e=>e.trim())}function iN(n,e,t){n.queries===null&&(n.queries=new $v),n.queries.track(new qv(e,t))}function w_(n,e){return n.queries.getByIndex(e)}function rN(n,e){let t=n[Le],i=w_(t,e);return i.crossesNgTemplate?Xv(t,n,e,[]):Sb(t,n,i,e)}var Ea=class{},Of=class{};var pf=class extends Ea{ngModuleType;_parent;_bootstrapComponents=[];_r3Injector;instance;destroyCbs=[];componentFactoryResolver=new ff(this);constructor(e,t,i,r=!0){super(),this.ngModuleType=e,this._parent=t;let s=Bg(e);this._bootstrapComponents=UE(s.bootstrap),this._r3Injector=gv(e,t,[{provide:Ea,useValue:this},{provide:ml,useValue:this.componentFactoryResolver},...i],Xc(e),new Set(["environment"])),r&&this.resolveInjectorInitializers()}resolveInjectorInitializers(){this._r3Injector.resolveInjectorInitializers(),this.instance=this._r3Injector.get(this.ngModuleType)}get injector(){return this._r3Injector}destroy(){let e=this._r3Injector;!e.destroyed&&e.destroy(),this.destroyCbs.forEach(t=>t()),this.destroyCbs=null}onDestroy(e){this.destroyCbs.push(e)}},mf=class extends Of{moduleType;constructor(e){super(),this.moduleType=e}create(e){return new pf(this.moduleType,e,[])}};var ul=class extends Ea{injector;componentFactoryResolver=new ff(this);instance=null;constructor(e){super();let t=new so([...e.providers,{provide:Ea,useValue:this},{provide:ml,useValue:this.componentFactoryResolver}],e.parent||Jc(),e.debugName,new Set(["environment"]));this.injector=t,e.runEnvironmentInitializers&&t.resolveInjectorInitializers()}destroy(){this.injector.destroy()}onDestroy(e){this.injector.onDestroy(e)}};function gl(n,e,t=null){return new ul({providers:n,parent:e,debugName:t,runEnvironmentInitializers:!0}).injector}var sN=(()=>{class n{_injector;cachedInjectors=new Map;constructor(t){this._injector=t}getOrCreateStandaloneInjector(t){if(!t.standalone)return null;if(!this.cachedInjectors.has(t)){let i=qg(!1,t.type),r=i.length>0?gl([i],this._injector,""):null;this.cachedInjectors.set(t,r)}return this.cachedInjectors.get(t)}ngOnDestroy(){try{for(let t of this.cachedInjectors.values())t!==null&&t.destroy()}finally{this.cachedInjectors.clear()}}static \u0275prov=Oe({token:n,providedIn:"environment",factory:()=>new n($e(nn))})}return n})();function So(n){return fl(()=>{let e=Mb(n),t=_t(_e({},e),{decls:n.decls,vars:n.vars,template:n.template,consts:n.consts||null,ngContentSelectors:n.ngContentSelectors,onPush:n.changeDetection===r_.OnPush,directiveDefs:null,pipeDefs:null,dependencies:e.standalone&&n.dependencies||null,getStandaloneInjector:e.standalone?r=>r.get(sN).getOrCreateStandaloneInjector(t):null,getExternalStyles:null,signals:n.signals??!1,data:n.data||{},encapsulation:n.encapsulation||Vi.Emulated,styles:n.styles||_i,_:null,schemas:n.schemas||null,tView:null,id:""});e.standalone&&ys("NgStandalone"),Eb(t);let i=n.dependencies;return t.directiveDefs=YM(i,oN),t.pipeDefs=YM(i,BS),t.id=lN(t),t})}function oN(n){return ls(n)||Vg(n)}function vl(n){return fl(()=>({type:n.type,bootstrap:n.bootstrap||_i,declarations:n.declarations||_i,imports:n.imports||_i,exports:n.exports||_i,transitiveCompileScopes:null,schemas:n.schemas||null,id:n.id||null}))}function aN(n,e){if(n==null)return co;let t={};for(let i in n)if(n.hasOwnProperty(i)){let r=n[i],s,o,a,c;Array.isArray(r)?(a=r[0],s=r[1],o=r[2]??s,c=r[3]||null):(s=r,o=r,a=Cf.None,c=null),t[s]=[i,a,c],e[s]=o}return t}function cN(n){if(n==null)return co;let e={};for(let t in n)n.hasOwnProperty(t)&&(e[n[t]]=t);return e}function Lf(n){return fl(()=>{let e=Mb(n);return Eb(e),e})}function Mb(n){let e={};return{type:n.type,providersResolver:null,viewProvidersResolver:null,factory:null,hostBindings:n.hostBindings||null,hostVars:n.hostVars||0,hostAttrs:n.hostAttrs||null,contentQueries:n.contentQueries||null,declaredInputs:e,inputConfig:n.inputs||co,exportAs:n.exportAs||null,standalone:n.standalone??!0,signals:n.signals===!0,selectors:n.selectors||_i,viewQuery:n.viewQuery||null,features:n.features||null,setInput:null,resolveHostDirectives:null,hostDirectives:null,controlDef:null,inputs:aN(n.inputs,e),outputs:cN(n.outputs),debugInfo:null}}function Eb(n){n.features?.forEach(e=>e(n))}function YM(n,e){return n?()=>{let t=typeof n=="function"?n():n,i=[];for(let r of t){let s=e(r);s!==null&&i.push(s)}return i}:null}function lN(n){let e=0,t=typeof n.consts=="function"?"":n.consts,i=[n.selectors,n.ngContentSelectors,n.hostVars,n.hostAttrs,t,n.vars,n.decls,n.encapsulation,n.standalone,n.signals,n.exportAs,JSON.stringify(n.inputs),JSON.stringify(n.outputs),Object.getOwnPropertyNames(n.type.prototype),!!n.contentQueries,!!n.viewQuery];for(let s of i.join("|"))e=Math.imul(31,e)+s.charCodeAt(0)<<0;return e+=2147483648,"c"+e}function uN(n,e,t,i,r,s,o,a){if(t.firstCreatePass){n.mergedAttrs=Ef(n.mergedAttrs,n.attrs);let u=n.tView=d_(2,n,r,s,o,t.directiveRegistry,t.pipeRegistry,null,t.schemas,t.consts,null);t.queries!==null&&(t.queries.template(t,n),u.queries=t.queries.embeddedTView(n))}a&&(n.flags|=a),ma(n,!1);let c=dN(t,e,n,i);Yd()&&v_(t,e,c,n),xa(c,e);let l=cb(c,e,c,n);e[i+gn]=l,h_(e,l),q1(l,n,e)}function gf(n,e,t,i,r,s,o,a,c,l,u){let d=t+gn,f;if(e.firstCreatePass){if(f=Nf(e,d,4,o||null,a||null),l!=null){let h=tr(e.consts,l);f.localNames=[];for(let m=0;m<h.length;m+=2)f.localNames.push(h[m],-1)}}else f=e.data[d];return uN(f,n,e,t,i,r,s,c),l!=null&&y_(n,f,u),f}var dN=fN;function fN(n,e,t,i){return Zd(!0),e[Kt].createComment("")}var T_=(()=>{class n{log(t){console.log(t)}warn(t){console.warn(t)}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Oe({token:n,factory:n.\u0275fac,providedIn:"platform"})}return n})();var C_=new Re("");function _l(n){return!!n&&typeof n.then=="function"}function bb(n){return!!n&&typeof n.subscribe=="function"}var wb=new Re("");var D_=(()=>{class n{resolve;reject;initialized=!1;done=!1;donePromise=new Promise((t,i)=>{this.resolve=t,this.reject=i});appInits=ee(wb,{optional:!0})??[];injector=ee(Ji);constructor(){}runInitializers(){if(this.initialized)return;let t=[];for(let r of this.appInits){let s=wn(this.injector,r);if(_l(s))t.push(s);else if(bb(s)){let o=new Promise((a,c)=>{s.subscribe({complete:a,error:c})});t.push(o)}}let i=()=>{this.done=!0,this.resolve()};Promise.all(t).then(()=>{i()}).catch(r=>{this.reject(r)}),t.length===0&&i(),this.initialized=!0}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Oe({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),Ff=new Re("");function Tb(){tg(()=>{let n="";throw new Te(600,n)})}function Cb(n){return n.isBoundToModule}var hN=10;var Mo=(()=>{class n{_runningTick=!1;_destroyed=!1;_destroyListeners=[];_views=[];internalErrorHandler=ee(Ui);afterRenderManager=ee(GE);zonelessEnabled=ee(va);rootEffectScheduler=ee(Mv);dirtyFlags=0;tracingSnapshot=null;allTestViews=new Set;autoDetectTestViews=new Set;includeAllTestViews=!1;afterTick=new hn;get allViews(){return[...(this.includeAllTestViews?this.allTestViews:this.autoDetectTestViews).keys(),...this._views]}get destroyed(){return this._destroyed}componentTypes=[];components=[];internalPendingTask=ee(Or);get isStable(){return this.internalPendingTask.hasPendingTasksObservable.pipe(Bt(t=>!t))}constructor(){ee(Ca,{optional:!0})}whenStable(){let t;return new Promise(i=>{t=this.isStable.subscribe({next:r=>{r&&i()}})}).finally(()=>{t.unsubscribe()})}_injector=ee(nn);_rendererFactory=null;get injector(){return this._injector}bootstrap(t,i){return this.bootstrapImpl(t,i)}bootstrapImpl(t,i,r=Ji.NULL){return this._injector.get(Zt).run(()=>{xt(ut.BootstrapComponentStart);let o=t instanceof Pf;if(!this._injector.get(D_).done){let m="";throw new Te(405,m)}let c;o?c=t:c=this._injector.get(ml).resolveComponentFactory(t),this.componentTypes.push(c.componentType);let l=Cb(c)?void 0:this._injector.get(Ea),u=i||c.selector,d=c.create(r,[],u,l),f=d.location.nativeElement,h=d.injector.get(C_,null);return h?.registerApplication(f),d.onDestroy(()=>{this.detachView(d.hostView),sl(this.components,d),h?.unregisterApplication(f)}),this._loadComponent(d),xt(ut.BootstrapComponentEnd,d),d})}tick(){this.zonelessEnabled||(this.dirtyFlags|=1),this._tick()}_tick(){xt(ut.ChangeDetectionStart),this.tracingSnapshot!==null?this.tracingSnapshot.run(m_.CHANGE_DETECTION,this.tickImpl):this.tickImpl()}tickImpl=()=>{if(this._runningTick)throw xt(ut.ChangeDetectionEnd),new Te(101,!1);let t=Pe(null);try{this._runningTick=!0,this.synchronize()}finally{this._runningTick=!1,this.tracingSnapshot?.dispose(),this.tracingSnapshot=null,Pe(t),this.afterTick.next(),xt(ut.ChangeDetectionEnd)}};synchronize(){this._rendererFactory===null&&!this._injector.destroyed&&(this._rendererFactory=this._injector.get(_o,null,{optional:!0}));let t=0;for(;this.dirtyFlags!==0&&t++<hN;){xt(ut.ChangeDetectionSyncStart);try{this.synchronizeOnce()}finally{xt(ut.ChangeDetectionSyncEnd)}}}synchronizeOnce(){this.dirtyFlags&16&&(this.dirtyFlags&=-17,this.rootEffectScheduler.flush());let t=!1;if(this.dirtyFlags&7){let i=!!(this.dirtyFlags&1);this.dirtyFlags&=-8,this.dirtyFlags|=8;for(let{_lView:r}of this.allViews){if(!i&&!tl(r))continue;let s=i&&!this.zonelessEnabled?0:1;rb(r,s),t=!0}if(this.dirtyFlags&=-5,this.syncDirtyFlagsWithViews(),this.dirtyFlags&23)return}t||(this._rendererFactory?.begin?.(),this._rendererFactory?.end?.()),this.dirtyFlags&8&&(this.dirtyFlags&=-9,this.afterRenderManager.execute()),this.syncDirtyFlagsWithViews()}syncDirtyFlagsWithViews(){if(this.allViews.some(({_lView:t})=>tl(t))){this.dirtyFlags|=2;return}else this.dirtyFlags&=-8}attachView(t){let i=t;this._views.push(i),i.attachToAppRef(this)}detachView(t){let i=t;sl(this._views,i),i.detachFromAppRef()}_loadComponent(t){this.attachView(t.hostView);try{this.tick()}catch(r){this.internalErrorHandler(r)}this.components.push(t),this._injector.get(Ff,[]).forEach(r=>r(t))}ngOnDestroy(){if(!this._destroyed)try{this._destroyListeners.forEach(t=>t()),this._views.slice().forEach(t=>t.destroy())}finally{this._destroyed=!0,this._views=[],this._destroyListeners=[]}}onDestroy(t){return this._destroyListeners.push(t),()=>sl(this._destroyListeners,t)}destroy(){if(this._destroyed)throw new Te(406,!1);let t=this._injector;t.destroy&&!t.destroyed&&t.destroy()}get viewCount(){return this._views.length}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Oe({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function sl(n,e){let t=n.indexOf(e);t>-1&&n.splice(t,1)}var Yv=class{destroy(e){}updateValue(e,t){}swap(e,t){let i=Math.min(e,t),r=Math.max(e,t),s=this.detach(r);if(r-i>1){let o=this.detach(i);this.attach(i,s),this.attach(r,o)}else this.attach(i,s)}move(e,t){this.attach(t,this.detach(e))}};function Cv(n,e,t,i,r){return n===t&&Object.is(e,i)?1:Object.is(r(n,e),r(t,i))?-1:0}function pN(n,e,t,i){let r,s,o=0,a=n.length-1,c=void 0;if(Array.isArray(e)){Pe(i);let l=e.length-1;for(Pe(null);o<=a&&o<=l;){let u=n.at(o),d=e[o],f=Cv(o,u,o,d,t);if(f!==0){f<0&&n.updateValue(o,d),o++;continue}let h=n.at(a),m=e[l],v=Cv(a,h,l,m,t);if(v!==0){v<0&&n.updateValue(a,m),a--,l--;continue}let p=t(o,u),g=t(a,h),x=t(o,d);if(Object.is(x,g)){let M=t(l,m);Object.is(M,p)?(n.swap(o,a),n.updateValue(a,m),l--,a--):n.move(a,o),n.updateValue(o,d),o++;continue}if(r??=new vf,s??=KM(n,o,a,t),Zv(n,r,o,x))n.updateValue(o,d),o++,a++;else if(s.has(x))r.set(p,n.detach(o)),a--;else{let M=n.create(o,e[o]);n.attach(o,M),o++,a++}}for(;o<=l;)ZM(n,r,t,o,e[o]),o++}else if(e!=null){Pe(i);let l=e[Symbol.iterator]();Pe(null);let u=l.next();for(;!u.done&&o<=a;){let d=n.at(o),f=u.value,h=Cv(o,d,o,f,t);if(h!==0)h<0&&n.updateValue(o,f),o++,u=l.next();else{r??=new vf,s??=KM(n,o,a,t);let m=t(o,f);if(Zv(n,r,o,m))n.updateValue(o,f),o++,a++,u=l.next();else if(!s.has(m))n.attach(o,n.create(o,f)),o++,a++,u=l.next();else{let v=t(o,d);r.set(v,n.detach(o)),a--}}}for(;!u.done;)ZM(n,r,t,n.length,u.value),u=l.next()}for(;o<=a;)n.destroy(n.detach(a--));r?.forEach(l=>{n.destroy(l)})}function Zv(n,e,t,i){return e!==void 0&&e.has(i)?(n.attach(t,e.get(i)),e.delete(i),!0):!1}function ZM(n,e,t,i,r){if(Zv(n,e,i,t(i,r)))n.updateValue(i,r);else{let s=n.create(i,r);n.attach(i,s)}}function KM(n,e,t,i){let r=new Set;for(let s=e;s<=t;s++)r.add(i(s,n.at(s)));return r}var vf=class{kvMap=new Map;_vMap=void 0;has(e){return this.kvMap.has(e)}delete(e){if(!this.has(e))return!1;let t=this.kvMap.get(e);return this._vMap!==void 0&&this._vMap.has(t)?(this.kvMap.set(e,this._vMap.get(t)),this._vMap.delete(t)):this.kvMap.delete(e),!0}get(e){return this.kvMap.get(e)}set(e,t){if(this.kvMap.has(e)){let i=this.kvMap.get(e);this._vMap===void 0&&(this._vMap=new Map);let r=this._vMap;for(;r.has(i);)i=r.get(i);r.set(i,t)}else this.kvMap.set(e,t)}forEach(e){for(let[t,i]of this.kvMap)if(e(i,t),this._vMap!==void 0){let r=this._vMap;for(;r.has(i);)i=r.get(i),e(i,t)}}};function A_(n,e,t,i,r,s,o,a){ys("NgControlFlow");let c=lt(),l=ni(),u=tr(l.consts,s);return gf(c,l,n,e,t,i,r,u,256,o,a),I_}function I_(n,e,t,i,r,s,o,a){ys("NgControlFlow");let c=lt(),l=ni(),u=tr(l.consts,s);return gf(c,l,n,e,t,i,r,u,512,o,a),I_}function R_(n,e){ys("NgControlFlow");let t=lt(),i=ga(),r=t[i]!==Fr?t[i]:-1,s=r!==-1?_f(t,gn+r):void 0,o=0;if(Da(t,i,n)){let a=Pe(null);try{if(s!==void 0&&ub(s,o),n!==-1){let c=gn+n,l=_f(t,c),u=e_(t[Le],c),d=fb(l,u,t),f=If(t,u,e,{dehydratedView:d});Rf(l,f,o,al(u,d))}}finally{Pe(a)}}else if(s!==void 0){let a=lb(s,o);a!==void 0&&(a[qt]=e)}}var Kv=class{lContainer;$implicit;$index;constructor(e,t,i){this.lContainer=e,this.$implicit=t,this.$index=i}get $count(){return this.lContainer.length-Vt}};function N_(n,e){return e}var Jv=class{hasEmptyBlock;trackByFn;liveCollection;constructor(e,t,i){this.hasEmptyBlock=e,this.trackByFn=t,this.liveCollection=i}};function P_(n,e,t,i,r,s,o,a,c,l,u,d,f){ys("NgControlFlow");let h=lt(),m=ni(),v=c!==void 0,p=lt(),g=a?o.bind(p[ei][qt]):o,x=new Jv(v,g);p[gn+n]=x,gf(h,m,n+1,e,t,i,r,tr(m.consts,s),256),v&&gf(h,m,n+2,c,l,u,d,tr(m.consts,f),512)}var Qv=class extends Yv{lContainer;hostLView;templateTNode;operationsCounter=void 0;needsIndexUpdate=!1;constructor(e,t,i){super(),this.lContainer=e,this.hostLView=t,this.templateTNode=i}get length(){return this.lContainer.length-Vt}at(e){return this.getLView(e)[qt].$implicit}attach(e,t){let i=t[da];this.needsIndexUpdate||=e!==this.length,Rf(this.lContainer,t,e,al(this.templateTNode,i)),mN(this.lContainer,e)}detach(e){return this.needsIndexUpdate||=e!==this.length-1,gN(this.lContainer,e),vN(this.lContainer,e)}create(e,t){let i=Uv(this.lContainer,this.templateTNode.tView.ssrId);return If(this.hostLView,this.templateTNode,new Kv(this.lContainer,t,e),{dehydratedView:i})}destroy(e){Df(e[Le],e)}updateValue(e,t){this.getLView(e)[qt].$implicit=t}reset(){this.needsIndexUpdate=!1}updateIndexes(){if(this.needsIndexUpdate)for(let e=0;e<this.length;e++)this.getLView(e)[qt].$index=e}getLView(e){return _N(this.lContainer,e)}};function O_(n){let e=Pe(null),t=ps();try{let i=lt(),r=i[Le],s=i[t],o=t+1,a=_f(i,o);if(s.liveCollection===void 0){let l=e_(r,o);s.liveCollection=new Qv(a,i,l)}else s.liveCollection.reset();let c=s.liveCollection;if(pN(c,n,s.trackByFn,e),c.updateIndexes(),s.hasEmptyBlock){let l=ga(),u=c.length===0;if(Da(i,l,u)){let d=t+2,f=_f(i,d);if(u){let h=e_(r,d),m=fb(f,h,i),v=If(i,h,void 0,{dehydratedView:m});Rf(f,v,0,al(h,m))}else r.firstUpdatePass&&m1(f),ub(f,0)}}}finally{Pe(e)}}function _f(n,e){return n[e]}function mN(n,e){if(n.length<=Vt)return;let t=Vt+e,i=n[t],r=i?i[ds]:void 0;if(i&&r&&r.detachedLeaveAnimationFns&&r.detachedLeaveAnimationFns.length>0){let s=i[Rr];SR(s,r),vo.delete(i[Nr]),r.detachedLeaveAnimationFns=void 0}}function gN(n,e){if(n.length<=Vt)return;let t=Vt+e,i=n[t],r=i?i[ds]:void 0;r&&r.leave&&r.leave.size>0&&(r.detachedLeaveAnimationFns=[])}function vN(n,e){return ll(n,e)}function _N(n,e){return lb(n,e)}function e_(n,e){return Vd(n,e)}function kf(n,e,t){let i=lt(),r=ga();if(Da(i,r,e)){let s=ni(),o=mv();HR(o,i,n,e,i[Kt],t)}return kf}function JM(n,e,t,i,r){x_(e,n,t,r?"class":"style",i)}function yf(n,e,t,i){let r=lt(),s=r[Le],o=n+gn,a=s.firstCreatePass?gb(o,r,2,e,$R,lM(),t,i):s.data[o];if(Pr(a)){let c=r[Oi].tracingService;if(c&&c.componentCreate){let l=s.data[a.directiveStart+a.componentOffset];return c.componentCreate(_b(l),()=>(QM(n,e,r,a,i),yf))}}return QM(n,e,r,a,i),yf}function QM(n,e,t,i,r){if(KE(i,t,n,e,Db),Bd(i)){let s=t[Le];YE(s,t,i),IE(s,i,t)}r!=null&&y_(t,i)}function L_(){let n=ni(),e=ki(),t=JE(e);return n.firstCreatePass&&vb(n,t),ov(t)&&av(),sv(),t.classesWithoutHost!=null&&CI(t)&&JM(n,t,lt(),t.classesWithoutHost,!0),t.stylesWithoutHost!=null&&DI(t)&&JM(n,t,lt(),t.stylesWithoutHost,!1),L_}function Aa(n,e,t,i){return yf(n,e,t,i),L_(),Aa}function vn(n,e,t,i){let r=lt(),s=r[Le],o=n+gn,a=s.firstCreatePass?A1(o,s,2,e,t,i):s.data[o];return KE(a,r,n,e,Db),i!=null&&y_(r,a),vn}function Tn(){let n=ki(),e=JE(n);return ov(e)&&av(),sv(),Tn}function Uf(n,e,t,i){return vn(n,e,t,i),Tn(),Uf}var Db=(n,e,t,i,r)=>(Zd(!0),OE(e[Kt],i,EM()));function F_(){return lt()}function Bf(n,e,t){let i=lt(),r=ga();if(Da(i,r,e)){let s=ni(),o=mv();ZE(o,i,n,e,i[Kt],t)}return Bf}var yl="en-US";var yN=yl;function Ab(n){typeof n=="string"&&(yN=n.toLowerCase().replace(/_/g,"-"))}function Vf(n,e,t){let i=lt(),r=ni(),s=ki();return(s.type&3||t)&&R1(s,r,i,t,i[Kt],n,e,I1(s,i,e)),Vf}function Hf(n=1){return MM(n)}function zf(n,e,t){return tN(n,e,t),zf}function k_(n){let e=lt(),t=ni(),i=fv();$d(i+1);let r=w_(t,i);if(n.dirty&&nM(e)===((r.metadata.flags&2)===2)){if(r.matches===null)n.reset([]);else{let s=rN(e,i);n.reset(s,zI),n.notifyOnChanges()}return!0}return!1}function U_(){return Q1(lt(),fv())}function Jd(n,e){return n<<17|e<<2}function yo(n){return n>>17&32767}function xN(n){return(n&2)==2}function SN(n,e){return n&131071|e<<17}function t_(n){return n|2}function ba(n){return(n&131068)>>2}function Dv(n,e){return n&-131069|e<<2}function MN(n){return(n&1)===1}function n_(n){return n|1}function EN(n,e,t,i,r,s){let o=s?e.classBindings:e.styleBindings,a=yo(o),c=ba(o);n[i]=t;let l=!1,u;if(Array.isArray(t)){let d=t;u=d[1],(u===null||ua(d,u)>0)&&(l=!0)}else u=t;if(r)if(c!==0){let f=yo(n[a+1]);n[i+1]=Jd(f,a),f!==0&&(n[f+1]=Dv(n[f+1],i)),n[a+1]=SN(n[a+1],i)}else n[i+1]=Jd(a,0),a!==0&&(n[a+1]=Dv(n[a+1],i)),a=i;else n[i+1]=Jd(c,0),a===0?a=i:n[c+1]=Dv(n[c+1],i),c=i;l&&(n[i+1]=t_(n[i+1])),eE(n,u,i,!0),eE(n,u,i,!1),bN(e,u,n,i,s),o=Jd(a,c),s?e.classBindings=o:e.styleBindings=o}function bN(n,e,t,i,r){let s=r?n.residualClasses:n.residualStyles;s!=null&&typeof e=="string"&&ua(s,e)>=0&&(t[i+1]=n_(t[i+1]))}function eE(n,e,t,i){let r=n[t+1],s=e===null,o=i?yo(r):ba(r),a=!1;for(;o!==0&&(a===!1||s);){let c=n[o],l=n[o+1];wN(c,e)&&(a=!0,n[o+1]=i?n_(l):t_(l)),o=i?yo(l):ba(l)}a&&(n[t+1]=i?t_(r):n_(r))}function wN(n,e){return n===null||e==null||(Array.isArray(n)?n[1]:n)===e?!0:Array.isArray(n)&&typeof e=="string"?ua(n,e)>=0:!1}function xl(n,e,t){return TN(n,e,t,!1),xl}function TN(n,e,t,i){let r=lt(),s=ni(),o=pM(2);if(s.firstUpdatePass&&DN(s,n,o,i),e!==Fr&&Da(r,o,e)){let a=s.data[ps()];PN(s,a,r,r[Kt],n,r[o+1]=ON(e,t),i,o)}}function CN(n,e){return e>=n.expandoStartIndex}function DN(n,e,t,i){let r=n.data;if(r[t+1]===null){let s=r[ps()],o=CN(n,t);LN(s,i)&&e===null&&!o&&(e=!1),e=AN(r,s,e,i),EN(r,s,e,t,o,i)}}function AN(n,e,t,i){let r=_M(n),s=i?e.residualClasses:e.residualStyles;if(r===null)(i?e.classBindings:e.styleBindings)===0&&(t=Av(null,n,e,t,i),t=dl(t,e.attrs,i),s=null);else{let o=e.directiveStylingLast;if(o===-1||n[o]!==r)if(t=Av(r,n,e,t,i),s===null){let c=IN(n,e,i);c!==void 0&&Array.isArray(c)&&(c=Av(null,n,e,c[1],i),c=dl(c,e.attrs,i),RN(n,e,i,c))}else s=NN(n,e,i)}return s!==void 0&&(i?e.residualClasses=s:e.residualStyles=s),t}function IN(n,e,t){let i=t?e.classBindings:e.styleBindings;if(ba(i)!==0)return n[yo(i)]}function RN(n,e,t,i){let r=t?e.classBindings:e.styleBindings;n[yo(r)]=i}function NN(n,e,t){let i,r=e.directiveEnd;for(let s=1+e.directiveStylingLast;s<r;s++){let o=n[s].hostAttrs;i=dl(i,o,t)}return dl(i,e.attrs,t)}function Av(n,e,t,i,r){let s=null,o=t.directiveEnd,a=t.directiveStylingLast;for(a===-1?a=t.directiveStart:a++;a<o&&(s=e[a],i=dl(i,s.hostAttrs,r),s!==n);)a++;return n!==null&&(t.directiveStylingLast=a),i}function dl(n,e,t){let i=t?1:2,r=-1;if(e!==null)for(let s=0;s<e.length;s++){let o=e[s];typeof o=="number"?r=o:r===i&&(Array.isArray(n)||(n=n===void 0?[]:["",n]),$S(n,o,t?!0:e[++s]))}return n===void 0?null:n}function PN(n,e,t,i,r,s,o,a){if(!(e.type&3))return;let c=n.data,l=c[a+1],u=MN(l)?tE(c,e,t,r,ba(l),o):void 0;if(!xf(u)){xf(s)||xN(l)&&(s=tE(c,null,t,r,a,o));let d=Qg(ps(),t);FR(i,o,d,r,s)}}function tE(n,e,t,i,r,s){let o=e===null,a;for(;r>0;){let c=n[r],l=Array.isArray(c),u=l?c[1]:c,d=u===null,f=t[r+1];f===Fr&&(f=d?_i:void 0);let h=d?Fd(f,i):u===i?f:void 0;if(l&&!xf(h)&&(h=Fd(c,i)),xf(h)&&(a=h,o))return a;let m=n[r+1];r=o?yo(m):ba(m)}if(e!==null){let c=s?e.residualClasses:e.residualStyles;c!=null&&(a=Fd(c,i))}return a}function xf(n){return n!==void 0}function ON(n,e){return n==null||n===""||(typeof e=="string"?n=n+e:typeof n=="object"&&(n=Xc(a_(n)))),n}function LN(n,e){return(n.flags&(e?8:16))!==0}function ii(n,e=""){let t=lt(),i=ni(),r=n+gn,s=i.firstCreatePass?Nf(i,r,1,e,null):i.data[r],o=FN(i,t,s,e);t[r]=o,Yd()&&v_(i,t,o,s),ma(s,!1)}var FN=(n,e,t,i)=>(Zd(!0),QI(e[Kt],i));function kN(n,e,t,i=""){return Da(n,ga(),t)?e+Hg(t)+i:Fr}function Ia(n){return Sl("",n),Ia}function Sl(n,e,t){let i=lt(),r=kN(i,n,e,t);return r!==Fr&&UN(i,ps(),r),Sl}function UN(n,e,t){let i=Qg(e,n);eR(n[Kt],i,t)}var Sf=class{ngModuleFactory;componentFactories;constructor(e,t){this.ngModuleFactory=e,this.componentFactories=t}},B_=(()=>{class n{compileModuleSync(t){return new mf(t)}compileModuleAsync(t){return Promise.resolve(this.compileModuleSync(t))}compileModuleAndAllComponentsSync(t){let i=this.compileModuleSync(t),r=Bg(t),s=UE(r.declarations).reduce((o,a)=>{let c=ls(a);return c&&o.push(new Ma(c)),o},[]);return new Sf(i,s)}compileModuleAndAllComponentsAsync(t){return Promise.resolve(this.compileModuleAndAllComponentsSync(t))}clearCache(){}clearCacheFor(t){}getModuleId(t){}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Oe({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var Ib=(()=>{class n{applicationErrorHandler=ee(Ui);appRef=ee(Mo);taskService=ee(Or);ngZone=ee(Zt);zonelessEnabled=ee(va);tracing=ee(Ca,{optional:!0});zoneIsDefined=typeof Zone<"u"&&!!Zone.root.run;schedulerTickApplyArgs=[{data:{__scheduler_tick__:!0}}];subscriptions=new tn;angularZoneId=this.zoneIsDefined?this.ngZone._inner?.get(Wc):null;scheduleInRootZone=!this.zonelessEnabled&&this.zoneIsDefined&&(ee(Kd,{optional:!0})??!1);cancelScheduledCallback=null;useMicrotaskScheduler=!1;runningTick=!1;pendingRenderTaskId=null;constructor(){this.subscriptions.add(this.appRef.afterTick.subscribe(()=>{let t=this.taskService.add();if(!this.runningTick&&(this.cleanup(),!this.zonelessEnabled||this.appRef.includeAllTestViews)){this.taskService.remove(t);return}this.switchToMicrotaskScheduler(),this.taskService.remove(t)})),this.subscriptions.add(this.ngZone.onUnstable.subscribe(()=>{this.runningTick||this.cleanup()}))}switchToMicrotaskScheduler(){this.ngZone.runOutsideAngular(()=>{let t=this.taskService.add();this.useMicrotaskScheduler=!0,queueMicrotask(()=>{this.useMicrotaskScheduler=!1,this.taskService.remove(t)})})}notify(t){if(!this.zonelessEnabled&&t===5)return;switch(t){case 0:{this.appRef.dirtyFlags|=2;break}case 3:case 2:case 4:case 5:case 1:{this.appRef.dirtyFlags|=4;break}case 6:{this.appRef.dirtyFlags|=2;break}case 12:{this.appRef.dirtyFlags|=16;break}case 13:{this.appRef.dirtyFlags|=2;break}case 11:break;default:this.appRef.dirtyFlags|=8}if(this.appRef.tracingSnapshot=this.tracing?.snapshot(this.appRef.tracingSnapshot)??null,!this.shouldScheduleTick())return;let i=this.useMicrotaskScheduler?TM:_v;this.pendingRenderTaskId=this.taskService.add(),this.scheduleInRootZone?this.cancelScheduledCallback=Zone.root.run(()=>i(()=>this.tick())):this.cancelScheduledCallback=this.ngZone.runOutsideAngular(()=>i(()=>this.tick()))}shouldScheduleTick(){return!(this.appRef.destroyed||this.pendingRenderTaskId!==null||this.runningTick||this.appRef._runningTick||!this.zonelessEnabled&&this.zoneIsDefined&&Zone.current.get(Wc+this.angularZoneId))}tick(){if(this.runningTick||this.appRef.destroyed)return;if(this.appRef.dirtyFlags===0){this.cleanup();return}!this.zonelessEnabled&&this.appRef.dirtyFlags&7&&(this.appRef.dirtyFlags|=1);let t=this.taskService.add();try{this.ngZone.run(()=>{this.runningTick=!0,this.appRef._tick()},void 0,this.schedulerTickApplyArgs)}catch(i){this.applicationErrorHandler(i)}finally{this.taskService.remove(t),this.cleanup()}}ngOnDestroy(){this.subscriptions.unsubscribe(),this.cleanup()}cleanup(){if(this.runningTick=!1,this.cancelScheduledCallback?.(),this.cancelScheduledCallback=null,this.pendingRenderTaskId!==null){let t=this.pendingRenderTaskId;this.pendingRenderTaskId=null,this.taskService.remove(t)}}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Oe({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function Rb(){return[{provide:oo,useExisting:Ib},{provide:Zt,useClass:$c},{provide:va,useValue:!0}]}function BN(){return typeof $localize<"u"&&$localize.locale||yl}var V_=new Re("",{factory:()=>ee(V_,{optional:!0,skipSelf:!0})||BN()});function xs(n){return OS(n)}var Lb=Symbol("InputSignalNode#UNSET"),JN=_t(_e({},id),{transformFn:void 0,applyValueToInputSignal(n,e){ea(n,e)}});function Fb(n,e){let t=Object.create(JN);t.value=n,t.transformFn=e?.transform;function i(){if(Oc(t),t.value===Lb){let r=null;throw new Te(-950,r)}return t.value}return i[Jn]=t,i}function Nb(n,e){return Fb(n,e)}function QN(n){return Fb(Lb,n)}var kb=(Nb.required=QN,Nb);var eP=(()=>{class n{zone=ee(Zt);changeDetectionScheduler=ee(oo);applicationRef=ee(Mo);applicationErrorHandler=ee(Ui);_onMicrotaskEmptySubscription;initialize(){this._onMicrotaskEmptySubscription||(this._onMicrotaskEmptySubscription=this.zone.onMicrotaskEmpty.subscribe({next:()=>{this.changeDetectionScheduler.runningTick||this.zone.run(()=>{try{this.applicationRef.dirtyFlags|=1,this.applicationRef._tick()}catch(t){this.applicationErrorHandler(t)}})}}))}ngOnDestroy(){this._onMicrotaskEmptySubscription?.unsubscribe()}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Oe({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),tP=new Re("",{factory:()=>!1});function nP({ngZoneFactory:n,scheduleInRootZone:e}){return n??=()=>new Zt(_t(_e({},Bb()),{scheduleInRootZone:e})),[{provide:va,useValue:!1},{provide:Zt,useFactory:n},{provide:Ir,multi:!0,useFactory:()=>{let t=ee(eP,{optional:!0});return()=>t.initialize()}},{provide:Ir,multi:!0,useFactory:()=>{let t=ee(iP);return()=>{t.initialize()}}},{provide:Kd,useValue:e??vv}]}function Ub(n){let e=n?.scheduleInRootZone,t=nP({ngZoneFactory:()=>{let i=Bb(n);return i.scheduleInRootZone=e,i.shouldCoalesceEventChangeDetection&&ys("NgZone_CoalesceEvent"),new Zt(i)},scheduleInRootZone:e});return lo([{provide:tP,useValue:!0},t])}function Bb(n){return{enableLongStackTrace:!1,shouldCoalesceEventChangeDetection:n?.eventCoalescing??!1,shouldCoalesceRunChangeDetection:n?.runCoalescing??!1}}var iP=(()=>{class n{subscription=new tn;initialized=!1;zone=ee(Zt);pendingTasks=ee(Or);initialize(){if(this.initialized)return;this.initialized=!0;let t=null;!this.zone.isStable&&!this.zone.hasPendingMacrotasks&&!this.zone.hasPendingMicrotasks&&(t=this.pendingTasks.add()),this.zone.runOutsideAngular(()=>{this.subscription.add(this.zone.onStable.subscribe(()=>{Zt.assertNotInAngularZone(),queueMicrotask(()=>{t!==null&&!this.zone.hasPendingMacrotasks&&!this.zone.hasPendingMicrotasks&&(this.pendingTasks.remove(t),t=null)})}))}),this.subscription.add(this.zone.onUnstable.subscribe(()=>{Zt.assertInAngularZone(),t??=this.pendingTasks.add()}))}ngOnDestroy(){this.subscription.unsubscribe()}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Oe({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var H_=new Re(""),rP=new Re("");function Ml(n){return!n.moduleRef}function sP(n){let e=Ml(n)?n.r3Injector:n.moduleRef.injector,t=e.get(Zt);return t.run(()=>{Ml(n)?n.r3Injector.resolveInjectorInitializers():n.moduleRef.resolveInjectorInitializers();let i=e.get(Ui),r;if(t.runOutsideAngular(()=>{r=t.onError.subscribe({next:i})}),Ml(n)){let s=()=>e.destroy(),o=n.platformInjector.get(H_);o.add(s),e.onDestroy(()=>{r.unsubscribe(),o.delete(s)})}else{let s=()=>n.moduleRef.destroy(),o=n.platformInjector.get(H_);o.add(s),n.moduleRef.onDestroy(()=>{sl(n.allPlatformModules,n.moduleRef),r.unsubscribe(),o.delete(s)})}return aP(i,t,()=>{let s=e.get(Or),o=s.add(),a=e.get(D_);return a.runInitializers(),a.donePromise.then(()=>{let c=e.get(V_,yl);if(Ab(c||yl),!e.get(rP,!0))return Ml(n)?e.get(Mo):(n.allPlatformModules.push(n.moduleRef),n.moduleRef);if(Ml(n)){let u=e.get(Mo);return n.rootComponent!==void 0&&u.bootstrap(n.rootComponent),u}else return oP?.(n.moduleRef,n.allPlatformModules),n.moduleRef}).finally(()=>{s.remove(o)})})})}var oP;function aP(n,e,t){try{let i=t();return _l(i)?i.catch(r=>{throw e.runOutsideAngular(()=>n(r)),r}):i}catch(i){throw e.runOutsideAngular(()=>n(i)),i}}var Gf=null;function cP(n=[],e){return Ji.create({name:e,providers:[{provide:Kc,useValue:"platform"},{provide:H_,useValue:new Set([()=>Gf=null])},...n]})}function lP(n=[]){if(Gf)return Gf;let e=cP(n);return Gf=e,Tb(),uP(e),e}function uP(n){let e=n.get(wf,null);wn(n,()=>{e?.forEach(t=>t())})}var dP=1e4;var vX=dP-1e3;var z_=(()=>{class n{static __NG_ELEMENT_ID__=fP}return n})();function fP(n){return hP(ki(),lt(),(n&16)===16)}function hP(n,e,t){if(Pr(n)&&!t){let i=Fi(n.index,e);return new _s(i,i)}else if(n.type&175){let i=e[ei];return new _s(i,e)}return null}function Vb(n){let{rootComponent:e,appProviders:t,platformProviders:i,platformRef:r}=n;xt(ut.BootstrapApplicationStart);try{let s=r?.injector??lP(i),o=[Rb(),DM,...t||[]],a=new ul({providers:o,parent:s,debugName:"",runEnvironmentInitializers:!1});return sP({r3Injector:a.injector,platformInjector:s,rootComponent:e})}catch(s){return Promise.reject(s)}finally{xt(ut.BootstrapApplicationEnd)}}var Hb=null;function Ur(){return Hb}function G_(n){Hb??=n}var El=class{},jf=(()=>{class n{historyGo(t){throw new Error("")}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Oe({token:n,factory:()=>ee(zb),providedIn:"platform"})}return n})();var zb=(()=>{class n extends jf{_location;_history;_doc=ee(sn);constructor(){super(),this._location=window.location,this._history=window.history}getBaseHrefFromDOM(){return Ur().getBaseHref(this._doc)}onPopState(t){let i=Ur().getGlobalEventTarget(this._doc,"window");return i.addEventListener("popstate",t,!1),()=>i.removeEventListener("popstate",t)}onHashChange(t){let i=Ur().getGlobalEventTarget(this._doc,"window");return i.addEventListener("hashchange",t,!1),()=>i.removeEventListener("hashchange",t)}get href(){return this._location.href}get protocol(){return this._location.protocol}get hostname(){return this._location.hostname}get port(){return this._location.port}get pathname(){return this._location.pathname}get search(){return this._location.search}get hash(){return this._location.hash}set pathname(t){this._location.pathname=t}pushState(t,i,r){this._history.pushState(t,i,r)}replaceState(t,i,r){this._history.replaceState(t,i,r)}forward(){this._history.forward()}back(){this._history.back()}historyGo(t=0){this._history.go(t)}getState(){return this._history.state}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Oe({token:n,factory:()=>new n,providedIn:"platform"})}return n})();function Wb(n,e){return n?e?n.endsWith("/")?e.startsWith("/")?n+e.slice(1):n+e:e.startsWith("/")?n+e:`${n}/${e}`:n:e}function Gb(n){let e=n.search(/#|\?|$/);return n[e-1]==="/"?n.slice(0,e-1)+n.slice(e):n}function Ss(n){return n&&n[0]!=="?"?`?${n}`:n}var Wf=(()=>{class n{historyGo(t){throw new Error("")}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Oe({token:n,factory:()=>ee(mP),providedIn:"root"})}return n})(),pP=new Re(""),mP=(()=>{class n extends Wf{_platformLocation;_baseHref;_removeListenerFns=[];constructor(t,i){super(),this._platformLocation=t,this._baseHref=i??this._platformLocation.getBaseHrefFromDOM()??ee(sn).location?.origin??""}ngOnDestroy(){for(;this._removeListenerFns.length;)this._removeListenerFns.pop()()}onPopState(t){this._removeListenerFns.push(this._platformLocation.onPopState(t),this._platformLocation.onHashChange(t))}getBaseHref(){return this._baseHref}prepareExternalUrl(t){return Wb(this._baseHref,t)}path(t=!1){let i=this._platformLocation.pathname+Ss(this._platformLocation.search),r=this._platformLocation.hash;return r&&t?`${i}${r}`:i}pushState(t,i,r,s){let o=this.prepareExternalUrl(r+Ss(s));this._platformLocation.pushState(t,i,o)}replaceState(t,i,r,s){let o=this.prepareExternalUrl(r+Ss(s));this._platformLocation.replaceState(t,i,o)}forward(){this._platformLocation.forward()}back(){this._platformLocation.back()}getState(){return this._platformLocation.getState()}historyGo(t=0){this._platformLocation.historyGo?.(t)}static \u0275fac=function(i){return new(i||n)($e(jf),$e(pP,8))};static \u0275prov=Oe({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var Ra=(()=>{class n{_subject=new hn;_basePath;_locationStrategy;_urlChangeListeners=[];_urlChangeSubscription=null;constructor(t){this._locationStrategy=t;let i=this._locationStrategy.getBaseHref();this._basePath=_P(Gb(jb(i))),this._locationStrategy.onPopState(r=>{this._subject.next({url:this.path(!0),pop:!0,state:r.state,type:r.type})})}ngOnDestroy(){this._urlChangeSubscription?.unsubscribe(),this._urlChangeListeners=[]}path(t=!1){return this.normalize(this._locationStrategy.path(t))}getState(){return this._locationStrategy.getState()}isCurrentPathEqualTo(t,i=""){return this.path()==this.normalize(t+Ss(i))}normalize(t){return n.stripTrailingSlash(vP(this._basePath,jb(t)))}prepareExternalUrl(t){return t&&t[0]!=="/"&&(t="/"+t),this._locationStrategy.prepareExternalUrl(t)}go(t,i="",r=null){this._locationStrategy.pushState(r,"",t,i),this._notifyUrlChangeListeners(this.prepareExternalUrl(t+Ss(i)),r)}replaceState(t,i="",r=null){this._locationStrategy.replaceState(r,"",t,i),this._notifyUrlChangeListeners(this.prepareExternalUrl(t+Ss(i)),r)}forward(){this._locationStrategy.forward()}back(){this._locationStrategy.back()}historyGo(t=0){this._locationStrategy.historyGo?.(t)}onUrlChange(t){return this._urlChangeListeners.push(t),this._urlChangeSubscription??=this.subscribe(i=>{this._notifyUrlChangeListeners(i.url,i.state)}),()=>{let i=this._urlChangeListeners.indexOf(t);this._urlChangeListeners.splice(i,1),this._urlChangeListeners.length===0&&(this._urlChangeSubscription?.unsubscribe(),this._urlChangeSubscription=null)}}_notifyUrlChangeListeners(t="",i){this._urlChangeListeners.forEach(r=>r(t,i))}subscribe(t,i,r){return this._subject.subscribe({next:t,error:i??void 0,complete:r??void 0})}static normalizeQueryParams=Ss;static joinWithSlash=Wb;static stripTrailingSlash=Gb;static \u0275fac=function(i){return new(i||n)($e(Wf))};static \u0275prov=Oe({token:n,factory:()=>gP(),providedIn:"root"})}return n})();function gP(){return new Ra($e(Wf))}function vP(n,e){if(!n||!e.startsWith(n))return e;let t=e.substring(n.length);return t===""||["/",";","?","#"].includes(t[0])?t:e}function jb(n){return n.replace(/\/index.html$/,"")}function _P(n){if(new RegExp("^(https?:)?//").test(n)){let[,t]=n.split(/\/\/[^\/]+/);return t}return n}var $f=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275mod=vl({type:n});static \u0275inj=la({})}return n})();function j_(n,e){e=encodeURIComponent(e);for(let t of n.split(";")){let i=t.indexOf("="),[r,s]=i==-1?[t,""]:[t.slice(0,i),t.slice(i+1)];if(r.trim()===e)return decodeURIComponent(s)}return null}var bl=class{};var $b="browser";var wl=class{_doc;constructor(e){this._doc=e}manager},qf=(()=>{class n extends wl{constructor(t){super(t)}supports(t){return!0}addEventListener(t,i,r,s){return t.addEventListener(i,r,s),()=>this.removeEventListener(t,i,r,s)}removeEventListener(t,i,r,s){return t.removeEventListener(i,r,s)}static \u0275fac=function(i){return new(i||n)($e(sn))};static \u0275prov=Oe({token:n,factory:n.\u0275fac})}return n})(),Zf=new Re(""),X_=(()=>{class n{_zone;_plugins;_eventNameToPlugin=new Map;constructor(t,i){this._zone=i,t.forEach(o=>{o.manager=this});let r=t.filter(o=>!(o instanceof qf));this._plugins=r.slice().reverse();let s=t.find(o=>o instanceof qf);s&&this._plugins.push(s)}addEventListener(t,i,r,s){return this._findPluginFor(i).addEventListener(t,i,r,s)}getZone(){return this._zone}_findPluginFor(t){let i=this._eventNameToPlugin.get(t);if(i)return i;if(i=this._plugins.find(s=>s.supports(t)),!i)throw new Te(5101,!1);return this._eventNameToPlugin.set(t,i),i}static \u0275fac=function(i){return new(i||n)($e(Zf),$e(Zt))};static \u0275prov=Oe({token:n,factory:n.\u0275fac})}return n})(),W_="ng-app-id";function qb(n){for(let e of n)e.remove()}function Xb(n,e){let t=e.createElement("style");return t.textContent=n,t}function xP(n,e,t,i){let r=n.head?.querySelectorAll(`style[${W_}="${e}"],link[${W_}="${e}"]`);if(r)for(let s of r)s.removeAttribute(W_),s instanceof HTMLLinkElement?i.set(s.href.slice(s.href.lastIndexOf("/")+1),{usage:0,elements:[s]}):s.textContent&&t.set(s.textContent,{usage:0,elements:[s]})}function q_(n,e){let t=e.createElement("link");return t.setAttribute("rel","stylesheet"),t.setAttribute("href",n),t}var Y_=(()=>{class n{doc;appId;nonce;inline=new Map;external=new Map;hosts=new Set;constructor(t,i,r,s={}){this.doc=t,this.appId=i,this.nonce=r,xP(t,i,this.inline,this.external),this.hosts.add(t.head)}addStyles(t,i){for(let r of t)this.addUsage(r,this.inline,Xb);i?.forEach(r=>this.addUsage(r,this.external,q_))}removeStyles(t,i){for(let r of t)this.removeUsage(r,this.inline);i?.forEach(r=>this.removeUsage(r,this.external))}addUsage(t,i,r){let s=i.get(t);s?s.usage++:i.set(t,{usage:1,elements:[...this.hosts].map(o=>this.addElement(o,r(t,this.doc)))})}removeUsage(t,i){let r=i.get(t);r&&(r.usage--,r.usage<=0&&(qb(r.elements),i.delete(t)))}ngOnDestroy(){for(let[,{elements:t}]of[...this.inline,...this.external])qb(t);this.hosts.clear()}addHost(t){this.hosts.add(t);for(let[i,{elements:r}]of this.inline)r.push(this.addElement(t,Xb(i,this.doc)));for(let[i,{elements:r}]of this.external)r.push(this.addElement(t,q_(i,this.doc)))}removeHost(t){this.hosts.delete(t)}addElement(t,i){return this.nonce&&i.setAttribute("nonce",this.nonce),t.appendChild(i)}static \u0275fac=function(i){return new(i||n)($e(sn),$e(bf),$e(Tf,8),$e(pl))};static \u0275prov=Oe({token:n,factory:n.\u0275fac})}return n})(),$_={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/",math:"http://www.w3.org/1998/Math/MathML"},Z_=/%COMP%/g;var Zb="%COMP%",SP=`_nghost-${Zb}`,MP=`_ngcontent-${Zb}`,EP=!0,bP=new Re("",{factory:()=>EP});function wP(n){return MP.replace(Z_,n)}function TP(n){return SP.replace(Z_,n)}function Kb(n,e){return e.map(t=>t.replace(Z_,n))}var K_=(()=>{class n{eventManager;sharedStylesHost;appId;removeStylesOnCompDestroy;doc;ngZone;nonce;tracingService;rendererByCompId=new Map;defaultRenderer;constructor(t,i,r,s,o,a,c=null,l=null){this.eventManager=t,this.sharedStylesHost=i,this.appId=r,this.removeStylesOnCompDestroy=s,this.doc=o,this.ngZone=a,this.nonce=c,this.tracingService=l,this.defaultRenderer=new Tl(t,o,a,this.tracingService)}createRenderer(t,i){if(!t||!i)return this.defaultRenderer;let r=this.getOrCreateRenderer(t,i);return r instanceof Yf?r.applyToHost(t):r instanceof Cl&&r.applyStyles(),r}getOrCreateRenderer(t,i){let r=this.rendererByCompId,s=r.get(i.id);if(!s){let o=this.doc,a=this.ngZone,c=this.eventManager,l=this.sharedStylesHost,u=this.removeStylesOnCompDestroy,d=this.tracingService;switch(i.encapsulation){case Vi.Emulated:s=new Yf(c,l,i,this.appId,u,o,a,d);break;case Vi.ShadowDom:return new Xf(c,t,i,o,a,this.nonce,d,l);case Vi.ExperimentalIsolatedShadowDom:return new Xf(c,t,i,o,a,this.nonce,d);default:s=new Cl(c,l,i,u,o,a,d);break}r.set(i.id,s)}return s}ngOnDestroy(){this.rendererByCompId.clear()}componentReplaced(t){this.rendererByCompId.delete(t)}static \u0275fac=function(i){return new(i||n)($e(X_),$e(Y_),$e(bf),$e(bP),$e(sn),$e(Zt),$e(Tf),$e(Ca,8))};static \u0275prov=Oe({token:n,factory:n.\u0275fac})}return n})(),Tl=class{eventManager;doc;ngZone;tracingService;data=Object.create(null);throwOnSyntheticProps=!0;constructor(e,t,i,r){this.eventManager=e,this.doc=t,this.ngZone=i,this.tracingService=r}destroy(){}destroyNode=null;createElement(e,t){return t?this.doc.createElementNS($_[t]||t,e):this.doc.createElement(e)}createComment(e){return this.doc.createComment(e)}createText(e){return this.doc.createTextNode(e)}appendChild(e,t){(Yb(e)?e.content:e).appendChild(t)}insertBefore(e,t,i){e&&(Yb(e)?e.content:e).insertBefore(t,i)}removeChild(e,t){t.remove()}selectRootElement(e,t){let i=typeof e=="string"?this.doc.querySelector(e):e;if(!i)throw new Te(-5104,!1);return t||(i.textContent=""),i}parentNode(e){return e.parentNode}nextSibling(e){return e.nextSibling}setAttribute(e,t,i,r){if(r){t=r+":"+t;let s=$_[r];s?e.setAttributeNS(s,t,i):e.setAttribute(t,i)}else e.setAttribute(t,i)}removeAttribute(e,t,i){if(i){let r=$_[i];r?e.removeAttributeNS(r,t):e.removeAttribute(`${i}:${t}`)}else e.removeAttribute(t)}addClass(e,t){e.classList.add(t)}removeClass(e,t){e.classList.remove(t)}setStyle(e,t,i,r){r&(Lr.DashCase|Lr.Important)?e.style.setProperty(t,i,r&Lr.Important?"important":""):e.style[t]=i}removeStyle(e,t,i){i&Lr.DashCase?e.style.removeProperty(t):e.style[t]=""}setProperty(e,t,i){e!=null&&(e[t]=i)}setValue(e,t){e.nodeValue=t}listen(e,t,i,r){if(typeof e=="string"&&(e=Ur().getGlobalEventTarget(this.doc,e),!e))throw new Te(5102,!1);let s=this.decoratePreventDefault(i);return this.tracingService?.wrapEventListener&&(s=this.tracingService.wrapEventListener(e,t,s)),this.eventManager.addEventListener(e,t,s,r)}decoratePreventDefault(e){return t=>{if(t==="__ngUnwrap__")return e;e(t)===!1&&t.preventDefault()}}};function Yb(n){return n.tagName==="TEMPLATE"&&n.content!==void 0}var Xf=class extends Tl{hostEl;sharedStylesHost;shadowRoot;constructor(e,t,i,r,s,o,a,c){super(e,r,s,a),this.hostEl=t,this.sharedStylesHost=c,this.shadowRoot=t.attachShadow({mode:"open"}),this.sharedStylesHost&&this.sharedStylesHost.addHost(this.shadowRoot);let l=i.styles;l=Kb(i.id,l);for(let d of l){let f=document.createElement("style");o&&f.setAttribute("nonce",o),f.textContent=d,this.shadowRoot.appendChild(f)}let u=i.getExternalStyles?.();if(u)for(let d of u){let f=q_(d,r);o&&f.setAttribute("nonce",o),this.shadowRoot.appendChild(f)}}nodeOrShadowRoot(e){return e===this.hostEl?this.shadowRoot:e}appendChild(e,t){return super.appendChild(this.nodeOrShadowRoot(e),t)}insertBefore(e,t,i){return super.insertBefore(this.nodeOrShadowRoot(e),t,i)}removeChild(e,t){return super.removeChild(null,t)}parentNode(e){return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(e)))}destroy(){this.sharedStylesHost&&this.sharedStylesHost.removeHost(this.shadowRoot)}},Cl=class extends Tl{sharedStylesHost;removeStylesOnCompDestroy;styles;styleUrls;constructor(e,t,i,r,s,o,a,c){super(e,s,o,a),this.sharedStylesHost=t,this.removeStylesOnCompDestroy=r;let l=i.styles;this.styles=c?Kb(c,l):l,this.styleUrls=i.getExternalStyles?.(c)}applyStyles(){this.sharedStylesHost.addStyles(this.styles,this.styleUrls)}destroy(){this.removeStylesOnCompDestroy&&vo.size===0&&this.sharedStylesHost.removeStyles(this.styles,this.styleUrls)}},Yf=class extends Cl{contentAttr;hostAttr;constructor(e,t,i,r,s,o,a,c){let l=r+"-"+i.id;super(e,t,i,s,o,a,c,l),this.contentAttr=wP(l),this.hostAttr=TP(l)}applyToHost(e){this.applyStyles(),this.setAttribute(e,this.hostAttr,"")}createElement(e,t){let i=super.createElement(e,t);return super.setAttribute(i,this.contentAttr,""),i}};var Kf=class n extends El{supportsDOMEvents=!0;static makeCurrent(){G_(new n)}onAndCancel(e,t,i,r){return e.addEventListener(t,i,r),()=>{e.removeEventListener(t,i,r)}}dispatchEvent(e,t){e.dispatchEvent(t)}remove(e){e.remove()}createElement(e,t){return t=t||this.getDefaultDocument(),t.createElement(e)}createHtmlDocument(){return document.implementation.createHTMLDocument("fakeTitle")}getDefaultDocument(){return document}isElementNode(e){return e.nodeType===Node.ELEMENT_NODE}isShadowRoot(e){return e instanceof DocumentFragment}getGlobalEventTarget(e,t){return t==="window"?window:t==="document"?e:t==="body"?e.body:null}getBaseHref(e){let t=CP();return t==null?null:DP(t)}resetBaseElement(){Dl=null}getUserAgent(){return window.navigator.userAgent}getCookie(e){return j_(document.cookie,e)}},Dl=null;function CP(){return Dl=Dl||document.head.querySelector("base"),Dl?Dl.getAttribute("href"):null}function DP(n){return new URL(n,document.baseURI).pathname}var AP=(()=>{class n{build(){return new XMLHttpRequest}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Oe({token:n,factory:n.\u0275fac})}return n})(),Jb=["alt","control","meta","shift"],IP={"\b":"Backspace","	":"Tab","\x7F":"Delete","\x1B":"Escape",Del:"Delete",Esc:"Escape",Left:"ArrowLeft",Right:"ArrowRight",Up:"ArrowUp",Down:"ArrowDown",Menu:"ContextMenu",Scroll:"ScrollLock",Win:"OS"},RP={alt:n=>n.altKey,control:n=>n.ctrlKey,meta:n=>n.metaKey,shift:n=>n.shiftKey},Qb=(()=>{class n extends wl{constructor(t){super(t)}supports(t){return n.parseEventName(t)!=null}addEventListener(t,i,r,s){let o=n.parseEventName(i),a=n.eventCallback(o.fullKey,r,this.manager.getZone());return this.manager.getZone().runOutsideAngular(()=>Ur().onAndCancel(t,o.domEventName,a,s))}static parseEventName(t){let i=t.toLowerCase().split("."),r=i.shift();if(i.length===0||!(r==="keydown"||r==="keyup"))return null;let s=n._normalizeKey(i.pop()),o="",a=i.indexOf("code");if(a>-1&&(i.splice(a,1),o="code."),Jb.forEach(l=>{let u=i.indexOf(l);u>-1&&(i.splice(u,1),o+=l+".")}),o+=s,i.length!=0||s.length===0)return null;let c={};return c.domEventName=r,c.fullKey=o,c}static matchEventFullKeyCode(t,i){let r=IP[t.key]||t.key,s="";return i.indexOf("code.")>-1&&(r=t.code,s="code."),r==null||!r?!1:(r=r.toLowerCase(),r===" "?r="space":r==="."&&(r="dot"),Jb.forEach(o=>{if(o!==r){let a=RP[o];a(t)&&(s+=o+".")}}),s+=r,s===i)}static eventCallback(t,i,r){return s=>{n.matchEventFullKeyCode(s,t)&&r.runGuarded(()=>i(s))}}static _normalizeKey(t){return t==="esc"?"escape":t}static \u0275fac=function(i){return new(i||n)($e(sn))};static \u0275prov=Oe({token:n,factory:n.\u0275fac})}return n})();async function J_(n,e,t){let i=_e({rootComponent:n},NP(e,t));return Vb(i)}function NP(n,e){return{platformRef:e?.platformRef,appProviders:[...kP,...n?.providers??[]],platformProviders:FP}}function PP(){Kf.makeCurrent()}function OP(){return new Ar}function LP(){return s_(document),document}var FP=[{provide:pl,useValue:$b},{provide:wf,useValue:PP,multi:!0},{provide:sn,useFactory:LP}];var kP=[{provide:Kc,useValue:"root"},{provide:Ar,useFactory:OP},{provide:Zf,useClass:qf,multi:!0},{provide:Zf,useClass:Qb,multi:!0},K_,Y_,X_,{provide:_o,useExisting:K_},{provide:bl,useClass:AP},[]];var ew=(()=>{class n{_doc;constructor(t){this._doc=t}getTitle(){return this._doc.title}setTitle(t){this._doc.title=t||""}static \u0275fac=function(i){return new(i||n)($e(sn))};static \u0275prov=Oe({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var Ue="primary",zl=Symbol("RouteTitle"),iy=class{params;constructor(e){this.params=e||{}}has(e){return Object.prototype.hasOwnProperty.call(this.params,e)}get(e){if(this.has(e)){let t=this.params[e];return Array.isArray(t)?t[0]:t}return null}getAll(e){if(this.has(e)){let t=this.params[e];return Array.isArray(t)?t:[t]}return[]}get keys(){return Object.keys(this.params)}};function bo(n){return new iy(n)}function Q_(n,e,t){for(let i=0;i<n.length;i++){let r=n[i],s=e[i];if(r[0]===":")t[r.substring(1)]=s;else if(r!==s.path)return!1}return!0}function cw(n,e,t){let i=t.path.split("/"),r=i.indexOf("**");if(r===-1){if(i.length>n.length||t.pathMatch==="full"&&(e.hasChildren()||i.length<n.length))return null;let c={},l=n.slice(0,i.length);return Q_(i,l,c)?{consumed:l,posParams:c}:null}if(r!==i.lastIndexOf("**"))return null;let s=i.slice(0,r),o=i.slice(r+1);if(s.length+o.length>n.length||t.pathMatch==="full"&&e.hasChildren()&&t.path!=="**")return null;let a={};return!Q_(s,n.slice(0,s.length),a)||!Q_(o,n.slice(n.length-o.length),a)?null:{consumed:n,posParams:a}}function ih(n){return new Promise((e,t)=>{n.pipe(Cr()).subscribe({next:i=>e(i),error:i=>t(i)})})}function VP(n,e){if(n.length!==e.length)return!1;for(let t=0;t<n.length;++t)if(!rr(n[t],e[t]))return!1;return!0}function rr(n,e){let t=n?ry(n):void 0,i=e?ry(e):void 0;if(!t||!i||t.length!=i.length)return!1;let r;for(let s=0;s<t.length;s++)if(r=t[s],!lw(n[r],e[r]))return!1;return!0}function ry(n){return[...Object.keys(n),...Object.getOwnPropertySymbols(n)]}function lw(n,e){if(Array.isArray(n)&&Array.isArray(e)){if(n.length!==e.length)return!1;let t=[...n].sort(),i=[...e].sort();return t.every((r,s)=>i[s]===r)}else return n===e}function HP(n){return n.length>0?n[n.length-1]:null}function Co(n){return Sd(n)?n:_l(n)?Yt(Promise.resolve(n)):tt(n)}function uw(n){return Sd(n)?ih(n):Promise.resolve(n)}var zP={exact:hw,subset:pw},dw={exact:GP,subset:jP,ignored:()=>!0},fw={paths:"exact",fragment:"ignored",matrixParams:"ignored",queryParams:"exact"},sy={paths:"subset",fragment:"ignored",matrixParams:"ignored",queryParams:"subset"};function tw(n,e,t){return zP[t.paths](n.root,e.root,t.matrixParams)&&dw[t.queryParams](n.queryParams,e.queryParams)&&!(t.fragment==="exact"&&n.fragment!==e.fragment)}function GP(n,e){return rr(n,e)}function hw(n,e,t){if(!Eo(n.segments,e.segments)||!eh(n.segments,e.segments,t)||n.numberOfChildren!==e.numberOfChildren)return!1;for(let i in e.children)if(!n.children[i]||!hw(n.children[i],e.children[i],t))return!1;return!0}function jP(n,e){return Object.keys(e).length<=Object.keys(n).length&&Object.keys(e).every(t=>lw(n[t],e[t]))}function pw(n,e,t){return mw(n,e,e.segments,t)}function mw(n,e,t,i){if(n.segments.length>t.length){let r=n.segments.slice(0,t.length);return!(!Eo(r,t)||e.hasChildren()||!eh(r,t,i))}else if(n.segments.length===t.length){if(!Eo(n.segments,t)||!eh(n.segments,t,i))return!1;for(let r in e.children)if(!n.children[r]||!pw(n.children[r],e.children[r],i))return!1;return!0}else{let r=t.slice(0,n.segments.length),s=t.slice(n.segments.length);return!Eo(n.segments,r)||!eh(n.segments,r,i)||!n.children[Ue]?!1:mw(n.children[Ue],e,s,i)}}function eh(n,e,t){return e.every((i,r)=>dw[t](n[r].parameters,i.parameters))}var Ei=class{root;queryParams;fragment;_queryParamMap;constructor(e=new dt([],{}),t={},i=null){this.root=e,this.queryParams=t,this.fragment=i}get queryParamMap(){return this._queryParamMap??=bo(this.queryParams),this._queryParamMap}toString(){return qP.serialize(this)}},dt=class{segments;children;parent=null;constructor(e,t){this.segments=e,this.children=t,Object.values(t).forEach(i=>i.parent=this)}hasChildren(){return this.numberOfChildren>0}get numberOfChildren(){return Object.keys(this.children).length}toString(){return th(this)}},Ms=class{path;parameters;_parameterMap;constructor(e,t){this.path=e,this.parameters=t}get parameterMap(){return this._parameterMap??=bo(this.parameters),this._parameterMap}toString(){return vw(this)}};function WP(n,e){return Eo(n,e)&&n.every((t,i)=>rr(t.parameters,e[i].parameters))}function Eo(n,e){return n.length!==e.length?!1:n.every((t,i)=>t.path===e[i].path)}function $P(n,e){let t=[];return Object.entries(n.children).forEach(([i,r])=>{i===Ue&&(t=t.concat(e(r,i)))}),Object.entries(n.children).forEach(([i,r])=>{i!==Ue&&(t=t.concat(e(r,i)))}),t}var Gl=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275prov=Oe({token:n,factory:()=>new Es,providedIn:"root"})}return n})(),Es=class{parse(e){let t=new ay(e);return new Ei(t.parseRootSegment(),t.parseQueryParams(),t.parseFragment())}serialize(e){let t=`/${Al(e.root,!0)}`,i=ZP(e.queryParams),r=typeof e.fragment=="string"?`#${XP(e.fragment)}`:"";return`${t}${i}${r}`}},qP=new Es;function th(n){return n.segments.map(e=>vw(e)).join("/")}function Al(n,e){if(!n.hasChildren())return th(n);if(e){let t=n.children[Ue]?Al(n.children[Ue],!1):"",i=[];return Object.entries(n.children).forEach(([r,s])=>{r!==Ue&&i.push(`${r}:${Al(s,!1)}`)}),i.length>0?`${t}(${i.join("//")})`:t}else{let t=$P(n,(i,r)=>r===Ue?[Al(n.children[Ue],!1)]:[`${r}:${Al(i,!1)}`]);return Object.keys(n.children).length===1&&n.children[Ue]!=null?`${th(n)}/${t[0]}`:`${th(n)}/(${t.join("//")})`}}function gw(n){return encodeURIComponent(n).replace(/%40/g,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",")}function Jf(n){return gw(n).replace(/%3B/gi,";")}function XP(n){return encodeURI(n)}function oy(n){return gw(n).replace(/\(/g,"%28").replace(/\)/g,"%29").replace(/%26/gi,"&")}function nh(n){return decodeURIComponent(n)}function nw(n){return nh(n.replace(/\+/g,"%20"))}function vw(n){return`${oy(n.path)}${YP(n.parameters)}`}function YP(n){return Object.entries(n).map(([e,t])=>`;${oy(e)}=${oy(t)}`).join("")}function ZP(n){let e=Object.entries(n).map(([t,i])=>Array.isArray(i)?i.map(r=>`${Jf(t)}=${Jf(r)}`).join("&"):`${Jf(t)}=${Jf(i)}`).filter(t=>t);return e.length?`?${e.join("&")}`:""}var KP=/^[^\/()?;#]+/;function ey(n){let e=n.match(KP);return e?e[0]:""}var JP=/^[^\/()?;=#]+/;function QP(n){let e=n.match(JP);return e?e[0]:""}var eO=/^[^=?&#]+/;function tO(n){let e=n.match(eO);return e?e[0]:""}var nO=/^[^&#]+/;function iO(n){let e=n.match(nO);return e?e[0]:""}var ay=class{url;remaining;constructor(e){this.url=e,this.remaining=e}parseRootSegment(){for(;this.consumeOptional("/"););return this.remaining===""||this.peekStartsWith("?")||this.peekStartsWith("#")?new dt([],{}):new dt([],this.parseChildren())}parseQueryParams(){let e={};if(this.consumeOptional("?"))do this.parseQueryParam(e);while(this.consumeOptional("&"));return e}parseFragment(){return this.consumeOptional("#")?decodeURIComponent(this.remaining):null}parseChildren(e=0){if(e>50)throw new Te(4010,!1);if(this.remaining==="")return{};this.consumeOptional("/");let t=[];for(this.peekStartsWith("(")||t.push(this.parseSegment());this.peekStartsWith("/")&&!this.peekStartsWith("//")&&!this.peekStartsWith("/(");)this.capture("/"),t.push(this.parseSegment());let i={};this.peekStartsWith("/(")&&(this.capture("/"),i=this.parseParens(!0,e));let r={};return this.peekStartsWith("(")&&(r=this.parseParens(!1,e)),(t.length>0||Object.keys(i).length>0)&&(r[Ue]=new dt(t,i)),r}parseSegment(){let e=ey(this.remaining);if(e===""&&this.peekStartsWith(";"))throw new Te(4009,!1);return this.capture(e),new Ms(nh(e),this.parseMatrixParams())}parseMatrixParams(){let e={};for(;this.consumeOptional(";");)this.parseParam(e);return e}parseParam(e){let t=QP(this.remaining);if(!t)return;this.capture(t);let i="";if(this.consumeOptional("=")){let r=ey(this.remaining);r&&(i=r,this.capture(i))}e[nh(t)]=nh(i)}parseQueryParam(e){let t=tO(this.remaining);if(!t)return;this.capture(t);let i="";if(this.consumeOptional("=")){let o=iO(this.remaining);o&&(i=o,this.capture(i))}let r=nw(t),s=nw(i);if(e.hasOwnProperty(r)){let o=e[r];Array.isArray(o)||(o=[o],e[r]=o),o.push(s)}else e[r]=s}parseParens(e,t){let i={};for(this.capture("(");!this.consumeOptional(")")&&this.remaining.length>0;){let r=ey(this.remaining),s=this.remaining[r.length];if(s!=="/"&&s!==")"&&s!==";")throw new Te(4010,!1);let o;r.indexOf(":")>-1?(o=r.slice(0,r.indexOf(":")),this.capture(o),this.capture(":")):e&&(o=Ue);let a=this.parseChildren(t+1);i[o??Ue]=Object.keys(a).length===1&&a[Ue]?a[Ue]:new dt([],a),this.consumeOptional("//")}return i}peekStartsWith(e){return this.remaining.startsWith(e)}consumeOptional(e){return this.peekStartsWith(e)?(this.remaining=this.remaining.substring(e.length),!0):!1}capture(e){if(!this.consumeOptional(e))throw new Te(4011,!1)}};function _w(n){return n.segments.length>0?new dt([],{[Ue]:n}):n}function yw(n){let e={};for(let[i,r]of Object.entries(n.children)){let s=yw(r);if(i===Ue&&s.segments.length===0&&s.hasChildren())for(let[o,a]of Object.entries(s.children))e[o]=a;else(s.segments.length>0||s.hasChildren())&&(e[i]=s)}let t=new dt(n.segments,e);return rO(t)}function rO(n){if(n.numberOfChildren===1&&n.children[Ue]){let e=n.children[Ue];return new dt(n.segments.concat(e.segments),e.children)}return n}function La(n){return n instanceof Ei}function xw(n,e,t=null,i=null,r=new Es){let s=Sw(n);return Mw(s,e,t,i,r)}function Sw(n){let e;function t(s){let o={};for(let c of s.children){let l=t(c);o[c.outlet]=l}let a=new dt(s.url,o);return s===n&&(e=a),a}let i=t(n.root),r=_w(i);return e??r}function Mw(n,e,t,i,r){let s=n;for(;s.parent;)s=s.parent;if(e.length===0)return ty(s,s,s,t,i,r);let o=sO(e);if(o.toRoot())return ty(s,s,new dt([],{}),t,i,r);let a=oO(o,s,n),c=a.processChildren?Rl(a.segmentGroup,a.index,o.commands):bw(a.segmentGroup,a.index,o.commands);return ty(s,a.segmentGroup,c,t,i,r)}function rh(n){return typeof n=="object"&&n!=null&&!n.outlets&&!n.segmentPath}function Ol(n){return typeof n=="object"&&n!=null&&n.outlets}function iw(n,e,t){n||="\u0275";let i=new Ei;return i.queryParams={[n]:e},t.parse(t.serialize(i)).queryParams[n]}function ty(n,e,t,i,r,s){let o={};for(let[l,u]of Object.entries(i??{}))o[l]=Array.isArray(u)?u.map(d=>iw(l,d,s)):iw(l,u,s);let a;n===e?a=t:a=Ew(n,e,t);let c=_w(yw(a));return new Ei(c,o,r)}function Ew(n,e,t){let i={};return Object.entries(n.children).forEach(([r,s])=>{s===e?i[r]=t:i[r]=Ew(s,e,t)}),new dt(n.segments,i)}var sh=class{isAbsolute;numberOfDoubleDots;commands;constructor(e,t,i){if(this.isAbsolute=e,this.numberOfDoubleDots=t,this.commands=i,e&&i.length>0&&rh(i[0]))throw new Te(4003,!1);let r=i.find(Ol);if(r&&r!==HP(i))throw new Te(4004,!1)}toRoot(){return this.isAbsolute&&this.commands.length===1&&this.commands[0]=="/"}};function sO(n){if(typeof n[0]=="string"&&n.length===1&&n[0]==="/")return new sh(!0,0,n);let e=0,t=!1,i=n.reduce((r,s,o)=>{if(typeof s=="object"&&s!=null){if(s.outlets){let a={};return Object.entries(s.outlets).forEach(([c,l])=>{a[c]=typeof l=="string"?l.split("/"):l}),[...r,{outlets:a}]}if(s.segmentPath)return[...r,s.segmentPath]}return typeof s!="string"?[...r,s]:o===0?(s.split("/").forEach((a,c)=>{c==0&&a==="."||(c==0&&a===""?t=!0:a===".."?e++:a!=""&&r.push(a))}),r):[...r,s]},[]);return new sh(t,e,i)}var Pa=class{segmentGroup;processChildren;index;constructor(e,t,i){this.segmentGroup=e,this.processChildren=t,this.index=i}};function oO(n,e,t){if(n.isAbsolute)return new Pa(e,!0,0);if(!t)return new Pa(e,!1,NaN);if(t.parent===null)return new Pa(t,!0,0);let i=rh(n.commands[0])?0:1,r=t.segments.length-1+i;return aO(t,r,n.numberOfDoubleDots)}function aO(n,e,t){let i=n,r=e,s=t;for(;s>r;){if(s-=r,i=i.parent,!i)throw new Te(4005,!1);r=i.segments.length}return new Pa(i,!1,r-s)}function cO(n){return Ol(n[0])?n[0].outlets:{[Ue]:n}}function bw(n,e,t){if(n??=new dt([],{}),n.segments.length===0&&n.hasChildren())return Rl(n,e,t);let i=lO(n,e,t),r=t.slice(i.commandIndex);if(i.match&&i.pathIndex<n.segments.length){let s=new dt(n.segments.slice(0,i.pathIndex),{});return s.children[Ue]=new dt(n.segments.slice(i.pathIndex),n.children),Rl(s,0,r)}else return i.match&&r.length===0?new dt(n.segments,{}):i.match&&!n.hasChildren()?cy(n,e,t):i.match?Rl(n,0,r):cy(n,e,t)}function Rl(n,e,t){if(t.length===0)return new dt(n.segments,{});{let i=cO(t),r={};if(Object.keys(i).some(s=>s!==Ue)&&n.children[Ue]&&n.numberOfChildren===1&&n.children[Ue].segments.length===0){let s=Rl(n.children[Ue],e,t);return new dt(n.segments,s.children)}return Object.entries(i).forEach(([s,o])=>{typeof o=="string"&&(o=[o]),o!==null&&(r[s]=bw(n.children[s],e,o))}),Object.entries(n.children).forEach(([s,o])=>{i[s]===void 0&&(r[s]=o)}),new dt(n.segments,r)}}function lO(n,e,t){let i=0,r=e,s={match:!1,pathIndex:0,commandIndex:0};for(;r<n.segments.length;){if(i>=t.length)return s;let o=n.segments[r],a=t[i];if(Ol(a))break;let c=`${a}`,l=i<t.length-1?t[i+1]:null;if(r>0&&c===void 0)break;if(c&&l&&typeof l=="object"&&l.outlets===void 0){if(!sw(c,l,o))return s;i+=2}else{if(!sw(c,{},o))return s;i++}r++}return{match:!0,pathIndex:r,commandIndex:i}}function cy(n,e,t){let i=n.segments.slice(0,e),r=0;for(;r<t.length;){let s=t[r];if(Ol(s)){let c=uO(s.outlets);return new dt(i,c)}if(r===0&&rh(t[0])){let c=n.segments[e];i.push(new Ms(c.path,rw(t[0]))),r++;continue}let o=Ol(s)?s.outlets[Ue]:`${s}`,a=r<t.length-1?t[r+1]:null;o&&a&&rh(a)?(i.push(new Ms(o,rw(a))),r+=2):(i.push(new Ms(o,{})),r++)}return new dt(i,{})}function uO(n){let e={};return Object.entries(n).forEach(([t,i])=>{typeof i=="string"&&(i=[i]),i!==null&&(e[t]=cy(new dt([],{}),0,i))}),e}function rw(n){let e={};return Object.entries(n).forEach(([t,i])=>e[t]=`${i}`),e}function sw(n,e,t){return n==t.path&&rr(e,t.parameters)}var Nl="imperative",un=(function(n){return n[n.NavigationStart=0]="NavigationStart",n[n.NavigationEnd=1]="NavigationEnd",n[n.NavigationCancel=2]="NavigationCancel",n[n.NavigationError=3]="NavigationError",n[n.RoutesRecognized=4]="RoutesRecognized",n[n.ResolveStart=5]="ResolveStart",n[n.ResolveEnd=6]="ResolveEnd",n[n.GuardsCheckStart=7]="GuardsCheckStart",n[n.GuardsCheckEnd=8]="GuardsCheckEnd",n[n.RouteConfigLoadStart=9]="RouteConfigLoadStart",n[n.RouteConfigLoadEnd=10]="RouteConfigLoadEnd",n[n.ChildActivationStart=11]="ChildActivationStart",n[n.ChildActivationEnd=12]="ChildActivationEnd",n[n.ActivationStart=13]="ActivationStart",n[n.ActivationEnd=14]="ActivationEnd",n[n.Scroll=15]="Scroll",n[n.NavigationSkipped=16]="NavigationSkipped",n})(un||{}),si=class{id;url;constructor(e,t){this.id=e,this.url=t}},wo=class extends si{type=un.NavigationStart;navigationTrigger;restoredState;constructor(e,t,i="imperative",r=null){super(e,t),this.navigationTrigger=i,this.restoredState=r}toString(){return`NavigationStart(id: ${this.id}, url: '${this.url}')`}},Vr=class extends si{urlAfterRedirects;type=un.NavigationEnd;constructor(e,t,i){super(e,t),this.urlAfterRedirects=i}toString(){return`NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`}},Cn=(function(n){return n[n.Redirect=0]="Redirect",n[n.SupersededByNewNavigation=1]="SupersededByNewNavigation",n[n.NoDataFromResolver=2]="NoDataFromResolver",n[n.GuardRejected=3]="GuardRejected",n[n.Aborted=4]="Aborted",n})(Cn||{}),Ll=(function(n){return n[n.IgnoredSameUrlNavigation=0]="IgnoredSameUrlNavigation",n[n.IgnoredByUrlHandlingStrategy=1]="IgnoredByUrlHandlingStrategy",n})(Ll||{}),Mi=class extends si{reason;code;type=un.NavigationCancel;constructor(e,t,i,r){super(e,t),this.reason=i,this.code=r}toString(){return`NavigationCancel(id: ${this.id}, url: '${this.url}')`}};function ww(n){return n instanceof Mi&&(n.code===Cn.Redirect||n.code===Cn.SupersededByNewNavigation)}var Hr=class extends si{reason;code;type=un.NavigationSkipped;constructor(e,t,i,r){super(e,t),this.reason=i,this.code=r}},To=class extends si{error;target;type=un.NavigationError;constructor(e,t,i,r){super(e,t),this.error=i,this.target=r}toString(){return`NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`}},Fl=class extends si{urlAfterRedirects;state;type=un.RoutesRecognized;constructor(e,t,i,r){super(e,t),this.urlAfterRedirects=i,this.state=r}toString(){return`RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},oh=class extends si{urlAfterRedirects;state;type=un.GuardsCheckStart;constructor(e,t,i,r){super(e,t),this.urlAfterRedirects=i,this.state=r}toString(){return`GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},ah=class extends si{urlAfterRedirects;state;shouldActivate;type=un.GuardsCheckEnd;constructor(e,t,i,r,s){super(e,t),this.urlAfterRedirects=i,this.state=r,this.shouldActivate=s}toString(){return`GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`}},ch=class extends si{urlAfterRedirects;state;type=un.ResolveStart;constructor(e,t,i,r){super(e,t),this.urlAfterRedirects=i,this.state=r}toString(){return`ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},lh=class extends si{urlAfterRedirects;state;type=un.ResolveEnd;constructor(e,t,i,r){super(e,t),this.urlAfterRedirects=i,this.state=r}toString(){return`ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`}},uh=class{route;type=un.RouteConfigLoadStart;constructor(e){this.route=e}toString(){return`RouteConfigLoadStart(path: ${this.route.path})`}},dh=class{route;type=un.RouteConfigLoadEnd;constructor(e){this.route=e}toString(){return`RouteConfigLoadEnd(path: ${this.route.path})`}},fh=class{snapshot;type=un.ChildActivationStart;constructor(e){this.snapshot=e}toString(){return`ChildActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},hh=class{snapshot;type=un.ChildActivationEnd;constructor(e){this.snapshot=e}toString(){return`ChildActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},ph=class{snapshot;type=un.ActivationStart;constructor(e){this.snapshot=e}toString(){return`ActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}},mh=class{snapshot;type=un.ActivationEnd;constructor(e){this.snapshot=e}toString(){return`ActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`}};var Fa=class{},kl=class{},ka=class{url;navigationBehaviorOptions;constructor(e,t){this.url=e,this.navigationBehaviorOptions=t}};function dO(n){return!(n instanceof Fa)&&!(n instanceof ka)&&!(n instanceof kl)}var gh=class{rootInjector;outlet=null;route=null;children;attachRef=null;get injector(){return this.route?.snapshot._environmentInjector??this.rootInjector}constructor(e){this.rootInjector=e,this.children=new Ha(this.rootInjector)}},Ha=(()=>{class n{rootInjector;contexts=new Map;constructor(t){this.rootInjector=t}onChildOutletCreated(t,i){let r=this.getOrCreateContext(t);r.outlet=i,this.contexts.set(t,r)}onChildOutletDestroyed(t){let i=this.getContext(t);i&&(i.outlet=null,i.attachRef=null)}onOutletDeactivated(){let t=this.contexts;return this.contexts=new Map,t}onOutletReAttached(t){this.contexts=t}getOrCreateContext(t){let i=this.getContext(t);return i||(i=new gh(this.rootInjector),this.contexts.set(t,i)),i}getContext(t){return this.contexts.get(t)||null}static \u0275fac=function(i){return new(i||n)($e(nn))};static \u0275prov=Oe({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),vh=class{_root;constructor(e){this._root=e}get root(){return this._root.value}parent(e){let t=this.pathFromRoot(e);return t.length>1?t[t.length-2]:null}children(e){let t=ly(e,this._root);return t?t.children.map(i=>i.value):[]}firstChild(e){let t=ly(e,this._root);return t&&t.children.length>0?t.children[0].value:null}siblings(e){let t=uy(e,this._root);return t.length<2?[]:t[t.length-2].children.map(r=>r.value).filter(r=>r!==e)}pathFromRoot(e){return uy(e,this._root).map(t=>t.value)}};function ly(n,e){if(n===e.value)return e;for(let t of e.children){let i=ly(n,t);if(i)return i}return null}function uy(n,e){if(n===e.value)return[e];for(let t of e.children){let i=uy(n,t);if(i.length)return i.unshift(e),i}return[]}var ri=class{value;children;constructor(e,t){this.value=e,this.children=t}toString(){return`TreeNode(${this.value})`}};function Na(n){let e={};return n&&n.children.forEach(t=>e[t.value.outlet]=t),e}var Ul=class extends vh{snapshot;constructor(e,t){super(e),this.snapshot=t,yy(this,e)}toString(){return this.snapshot.toString()}};function Tw(n,e){let t=fO(n,e),i=new pn([new Ms("",{})]),r=new pn({}),s=new pn({}),o=new pn({}),a=new pn(""),c=new bs(i,r,o,a,s,Ue,n,t.root);return c.snapshot=t.root,new Ul(new ri(c,[]),t)}function fO(n,e){let t={},i={},r={},o=new Ua([],t,r,"",i,Ue,n,null,{},e);return new Bl("",new ri(o,[]))}var bs=class{urlSubject;paramsSubject;queryParamsSubject;fragmentSubject;dataSubject;outlet;component;snapshot;_futureSnapshot;_routerState;_paramMap;_queryParamMap;title;url;params;queryParams;fragment;data;constructor(e,t,i,r,s,o,a,c){this.urlSubject=e,this.paramsSubject=t,this.queryParamsSubject=i,this.fragmentSubject=r,this.dataSubject=s,this.outlet=o,this.component=a,this._futureSnapshot=c,this.title=this.dataSubject?.pipe(Bt(l=>l[zl]))??tt(void 0),this.url=e,this.params=t,this.queryParams=i,this.fragment=r,this.data=s}get routeConfig(){return this._futureSnapshot.routeConfig}get root(){return this._routerState.root}get parent(){return this._routerState.parent(this)}get firstChild(){return this._routerState.firstChild(this)}get children(){return this._routerState.children(this)}get pathFromRoot(){return this._routerState.pathFromRoot(this)}get paramMap(){return this._paramMap??=this.params.pipe(Bt(e=>bo(e))),this._paramMap}get queryParamMap(){return this._queryParamMap??=this.queryParams.pipe(Bt(e=>bo(e))),this._queryParamMap}toString(){return this.snapshot?this.snapshot.toString():`Future(${this._futureSnapshot})`}};function _y(n,e,t="emptyOnly"){let i,{routeConfig:r}=n;return e!==null&&(t==="always"||r?.path===""||!e.component&&!e.routeConfig?.loadComponent)?i={params:_e(_e({},e.params),n.params),data:_e(_e({},e.data),n.data),resolve:_e(_e(_e(_e({},n.data),e.data),r?.data),n._resolvedData)}:i={params:_e({},n.params),data:_e({},n.data),resolve:_e(_e({},n.data),n._resolvedData??{})},r&&Dw(r)&&(i.resolve[zl]=r.title),i}var Ua=class{url;params;queryParams;fragment;data;outlet;component;routeConfig;_resolve;_resolvedData;_routerState;_paramMap;_queryParamMap;_environmentInjector;get title(){return this.data?.[zl]}constructor(e,t,i,r,s,o,a,c,l,u){this.url=e,this.params=t,this.queryParams=i,this.fragment=r,this.data=s,this.outlet=o,this.component=a,this.routeConfig=c,this._resolve=l,this._environmentInjector=u}get root(){return this._routerState.root}get parent(){return this._routerState.parent(this)}get firstChild(){return this._routerState.firstChild(this)}get children(){return this._routerState.children(this)}get pathFromRoot(){return this._routerState.pathFromRoot(this)}get paramMap(){return this._paramMap??=bo(this.params),this._paramMap}get queryParamMap(){return this._queryParamMap??=bo(this.queryParams),this._queryParamMap}toString(){let e=this.url.map(i=>i.toString()).join("/"),t=this.routeConfig?this.routeConfig.path:"";return`Route(url:'${e}', path:'${t}')`}},Bl=class extends vh{url;constructor(e,t){super(t),this.url=e,yy(this,t)}toString(){return Cw(this._root)}};function yy(n,e){e.value._routerState=n,e.children.forEach(t=>yy(n,t))}function Cw(n){let e=n.children.length>0?` { ${n.children.map(Cw).join(", ")} } `:"";return`${n.value}${e}`}function ny(n){if(n.snapshot){let e=n.snapshot,t=n._futureSnapshot;n.snapshot=t,rr(e.queryParams,t.queryParams)||n.queryParamsSubject.next(t.queryParams),e.fragment!==t.fragment&&n.fragmentSubject.next(t.fragment),rr(e.params,t.params)||n.paramsSubject.next(t.params),VP(e.url,t.url)||n.urlSubject.next(t.url),rr(e.data,t.data)||n.dataSubject.next(t.data)}else n.snapshot=n._futureSnapshot,n.dataSubject.next(n._futureSnapshot.data)}function dy(n,e){let t=rr(n.params,e.params)&&WP(n.url,e.url),i=!n.parent!=!e.parent;return t&&!i&&(!n.parent||dy(n.parent,e.parent))}function Dw(n){return typeof n.title=="string"||n.title===null}var Aw=new Re(""),jl=(()=>{class n{activated=null;get activatedComponentRef(){return this.activated}_activatedRoute=null;name=Ue;activateEvents=new Fn;deactivateEvents=new Fn;attachEvents=new Fn;detachEvents=new Fn;routerOutletData=kb();parentContexts=ee(Ha);location=ee(xo);changeDetector=ee(z_);inputBinder=ee(Sh,{optional:!0});supportsBindingToComponentInputs=!0;ngOnChanges(t){if(t.name){let{firstChange:i,previousValue:r}=t.name;if(i)return;this.isTrackedInParentContexts(r)&&(this.deactivate(),this.parentContexts.onChildOutletDestroyed(r)),this.initializeOutletWithName()}}ngOnDestroy(){this.isTrackedInParentContexts(this.name)&&this.parentContexts.onChildOutletDestroyed(this.name),this.inputBinder?.unsubscribeFromRouteData(this)}isTrackedInParentContexts(t){return this.parentContexts.getContext(t)?.outlet===this}ngOnInit(){this.initializeOutletWithName()}initializeOutletWithName(){if(this.parentContexts.onChildOutletCreated(this.name,this),this.activated)return;let t=this.parentContexts.getContext(this.name);t?.route&&(t.attachRef?this.attach(t.attachRef,t.route):this.activateWith(t.route,t.injector))}get isActivated(){return!!this.activated}get component(){if(!this.activated)throw new Te(4012,!1);return this.activated.instance}get activatedRoute(){if(!this.activated)throw new Te(4012,!1);return this._activatedRoute}get activatedRouteData(){return this._activatedRoute?this._activatedRoute.snapshot.data:{}}detach(){if(!this.activated)throw new Te(4012,!1);this.location.detach();let t=this.activated;return this.activated=null,this._activatedRoute=null,this.detachEvents.emit(t.instance),t}attach(t,i){this.activated=t,this._activatedRoute=i,this.location.insert(t.hostView),this.inputBinder?.bindActivatedRouteToOutletComponent(this),this.attachEvents.emit(t.instance)}deactivate(){if(this.activated){let t=this.component;this.activated.destroy(),this.activated=null,this._activatedRoute=null,this.deactivateEvents.emit(t)}}activateWith(t,i){if(this.isActivated)throw new Te(4013,!1);this._activatedRoute=t;let r=this.location,o=t.snapshot.component,a=this.parentContexts.getOrCreateContext(this.name).children,c=new fy(t,a,r.injector,this.routerOutletData);this.activated=r.createComponent(o,{index:r.length,injector:c,environmentInjector:i}),this.changeDetector.markForCheck(),this.inputBinder?.bindActivatedRouteToOutletComponent(this),this.activateEvents.emit(this.activated.instance)}static \u0275fac=function(i){return new(i||n)};static \u0275dir=Lf({type:n,selectors:[["router-outlet"]],inputs:{name:"name",routerOutletData:[1,"routerOutletData"]},outputs:{activateEvents:"activate",deactivateEvents:"deactivate",attachEvents:"attach",detachEvents:"detach"},exportAs:["outlet"],features:[Mf]})}return n})(),fy=class{route;childContexts;parent;outletData;constructor(e,t,i,r){this.route=e,this.childContexts=t,this.parent=i,this.outletData=r}get(e,t){return e===bs?this.route:e===Ha?this.childContexts:e===Aw?this.outletData:this.parent.get(e,t)}},Sh=new Re("");var xy=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275cmp=So({type:n,selectors:[["ng-component"]],exportAs:["emptyRouterOutlet"],decls:1,vars:0,template:function(i,r){i&1&&Aa(0,"router-outlet")},dependencies:[jl],encapsulation:2})}return n})();function Sy(n){let e=n.children&&n.children.map(Sy),t=e?_t(_e({},n),{children:e}):_e({},n);return!t.component&&!t.loadComponent&&(e||t.loadChildren)&&t.outlet&&t.outlet!==Ue&&(t.component=xy),t}function hO(n,e,t){let i=Vl(n,e._root,t?t._root:void 0);return new Ul(i,e)}function Vl(n,e,t){if(t&&n.shouldReuseRoute(e.value,t.value.snapshot)){let i=t.value;i._futureSnapshot=e.value;let r=pO(n,e,t);return new ri(i,r)}else{if(n.shouldAttach(e.value)){let s=n.retrieve(e.value);if(s!==null){let o=s.route;return o.value._futureSnapshot=e.value,o.children=e.children.map(a=>Vl(n,a)),o}}let i=mO(e.value),r=e.children.map(s=>Vl(n,s));return new ri(i,r)}}function pO(n,e,t){return e.children.map(i=>{for(let r of t.children)if(n.shouldReuseRoute(i.value,r.value.snapshot))return Vl(n,i,r);return Vl(n,i)})}function mO(n){return new bs(new pn(n.url),new pn(n.params),new pn(n.queryParams),new pn(n.fragment),new pn(n.data),n.outlet,n.component,n)}var Ba=class{redirectTo;navigationBehaviorOptions;constructor(e,t){this.redirectTo=e,this.navigationBehaviorOptions=t}},Iw="ngNavigationCancelingError";function _h(n,e){let{redirectTo:t,navigationBehaviorOptions:i}=La(e)?{redirectTo:e,navigationBehaviorOptions:void 0}:e,r=Rw(!1,Cn.Redirect);return r.url=t,r.navigationBehaviorOptions=i,r}function Rw(n,e){let t=new Error(`NavigationCancelingError: ${n||""}`);return t[Iw]=!0,t.cancellationCode=e,t}function gO(n){return Nw(n)&&La(n.url)}function Nw(n){return!!n&&n[Iw]}var hy=class{routeReuseStrategy;futureState;currState;forwardEvent;inputBindingEnabled;constructor(e,t,i,r,s){this.routeReuseStrategy=e,this.futureState=t,this.currState=i,this.forwardEvent=r,this.inputBindingEnabled=s}activate(e){let t=this.futureState._root,i=this.currState?this.currState._root:null;this.deactivateChildRoutes(t,i,e),ny(this.futureState.root),this.activateChildRoutes(t,i,e)}deactivateChildRoutes(e,t,i){let r=Na(t);e.children.forEach(s=>{let o=s.value.outlet;this.deactivateRoutes(s,r[o],i),delete r[o]}),Object.values(r).forEach(s=>{this.deactivateRouteAndItsChildren(s,i)})}deactivateRoutes(e,t,i){let r=e.value,s=t?t.value:null;if(r===s)if(r.component){let o=i.getContext(r.outlet);o&&this.deactivateChildRoutes(e,t,o.children)}else this.deactivateChildRoutes(e,t,i);else s&&this.deactivateRouteAndItsChildren(t,i)}deactivateRouteAndItsChildren(e,t){e.value.component&&this.routeReuseStrategy.shouldDetach(e.value.snapshot)?this.detachAndStoreRouteSubtree(e,t):this.deactivateRouteAndOutlet(e,t)}detachAndStoreRouteSubtree(e,t){let i=t.getContext(e.value.outlet),r=i&&e.value.component?i.children:t,s=Na(e);for(let o of Object.values(s))this.deactivateRouteAndItsChildren(o,r);if(i&&i.outlet){let o=i.outlet.detach(),a=i.children.onOutletDeactivated();this.routeReuseStrategy.store(e.value.snapshot,{componentRef:o,route:e,contexts:a})}}deactivateRouteAndOutlet(e,t){let i=t.getContext(e.value.outlet),r=i&&e.value.component?i.children:t,s=Na(e);for(let o of Object.values(s))this.deactivateRouteAndItsChildren(o,r);i&&(i.outlet&&(i.outlet.deactivate(),i.children.onOutletDeactivated()),i.attachRef=null,i.route=null)}activateChildRoutes(e,t,i){let r=Na(t);e.children.forEach(s=>{this.activateRoutes(s,r[s.value.outlet],i),this.forwardEvent(new mh(s.value.snapshot))}),e.children.length&&this.forwardEvent(new hh(e.value.snapshot))}activateRoutes(e,t,i){let r=e.value,s=t?t.value:null;if(ny(r),r===s)if(r.component){let o=i.getOrCreateContext(r.outlet);this.activateChildRoutes(e,t,o.children)}else this.activateChildRoutes(e,t,i);else if(r.component){let o=i.getOrCreateContext(r.outlet);if(this.routeReuseStrategy.shouldAttach(r.snapshot)){let a=this.routeReuseStrategy.retrieve(r.snapshot);this.routeReuseStrategy.store(r.snapshot,null),o.children.onOutletReAttached(a.contexts),o.attachRef=a.componentRef,o.route=a.route.value,o.outlet&&o.outlet.attach(a.componentRef,a.route.value),ny(a.route.value),this.activateChildRoutes(e,null,o.children)}else o.attachRef=null,o.route=r,o.outlet&&o.outlet.activateWith(r,o.injector),this.activateChildRoutes(e,null,o.children)}else this.activateChildRoutes(e,null,i)}},yh=class{path;route;constructor(e){this.path=e,this.route=this.path[this.path.length-1]}},Oa=class{component;route;constructor(e,t){this.component=e,this.route=t}};function vO(n,e,t){let i=n._root,r=e?e._root:null;return Il(i,r,t,[i.value])}function _O(n){let e=n.routeConfig?n.routeConfig.canActivateChild:null;return!e||e.length===0?null:{node:n,guards:e}}function za(n,e){let t=Symbol(),i=e.get(n,t);return i===t?typeof n=="function"&&!Pg(n)?n:e.get(n):i}function Il(n,e,t,i,r={canDeactivateChecks:[],canActivateChecks:[]}){let s=Na(e);return n.children.forEach(o=>{yO(o,s[o.value.outlet],t,i.concat([o.value]),r),delete s[o.value.outlet]}),Object.entries(s).forEach(([o,a])=>Pl(a,t.getContext(o),r)),r}function yO(n,e,t,i,r={canDeactivateChecks:[],canActivateChecks:[]}){let s=n.value,o=e?e.value:null,a=t?t.getContext(n.value.outlet):null;if(o&&s.routeConfig===o.routeConfig){let c=xO(o,s,s.routeConfig.runGuardsAndResolvers);c?r.canActivateChecks.push(new yh(i)):(s.data=o.data,s._resolvedData=o._resolvedData),s.component?Il(n,e,a?a.children:null,i,r):Il(n,e,t,i,r),c&&a&&a.outlet&&a.outlet.isActivated&&r.canDeactivateChecks.push(new Oa(a.outlet.component,o))}else o&&Pl(e,a,r),r.canActivateChecks.push(new yh(i)),s.component?Il(n,null,a?a.children:null,i,r):Il(n,null,t,i,r);return r}function xO(n,e,t){if(typeof t=="function")return wn(e._environmentInjector,()=>t(n,e));switch(t){case"pathParamsChange":return!Eo(n.url,e.url);case"pathParamsOrQueryParamsChange":return!Eo(n.url,e.url)||!rr(n.queryParams,e.queryParams);case"always":return!0;case"paramsOrQueryParamsChange":return!dy(n,e)||!rr(n.queryParams,e.queryParams);default:return!dy(n,e)}}function Pl(n,e,t){let i=Na(n),r=n.value;Object.entries(i).forEach(([s,o])=>{r.component?e?Pl(o,e.children.getContext(s),t):Pl(o,null,t):Pl(o,e,t)}),r.component?e&&e.outlet&&e.outlet.isActivated?t.canDeactivateChecks.push(new Oa(e.outlet.component,r)):t.canDeactivateChecks.push(new Oa(null,r)):t.canDeactivateChecks.push(new Oa(null,r))}function Wl(n){return typeof n=="function"}function SO(n){return typeof n=="boolean"}function MO(n){return n&&Wl(n.canLoad)}function EO(n){return n&&Wl(n.canActivate)}function bO(n){return n&&Wl(n.canActivateChild)}function wO(n){return n&&Wl(n.canDeactivate)}function TO(n){return n&&Wl(n.canMatch)}function Pw(n){return n instanceof to||n?.name==="EmptyError"}var Qf=Symbol("INITIAL_VALUE");function Va(){return Ni(n=>hg(n.map(e=>e.pipe(Tr(1),mg(Qf)))).pipe(Bt(e=>{for(let t of e)if(t!==!0){if(t===Qf)return Qf;if(t===!1||CO(t))return t}return!0}),wr(e=>e!==Qf),Tr(1)))}function CO(n){return La(n)||n instanceof Ba}function Ow(n){return n.aborted?tt(void 0).pipe(Tr(1)):new ct(e=>{let t=()=>{e.next(),e.complete()};return n.addEventListener("abort",t),()=>n.removeEventListener("abort",t)})}function Lw(n){return Hc(Ow(n))}function DO(n){return Ln(e=>{let{targetSnapshot:t,currentSnapshot:i,guards:{canActivateChecks:r,canDeactivateChecks:s}}=e;return s.length===0&&r.length===0?tt(_t(_e({},e),{guardsResult:!0})):AO(s,t,i).pipe(Ln(o=>o&&SO(o)?IO(t,r,n):tt(o)),Bt(o=>_t(_e({},e),{guardsResult:o})))})}function AO(n,e,t){return Yt(n).pipe(Ln(i=>LO(i.component,i.route,t,e)),Cr(i=>i!==!0,!0))}function IO(n,e,t){return Yt(e).pipe(Md(i=>oa(NO(i.route.parent,t),RO(i.route,t),OO(n,i.path),PO(n,i.route))),Cr(i=>i!==!0,!0))}function RO(n,e){return n!==null&&e&&e(new ph(n)),tt(!0)}function NO(n,e){return n!==null&&e&&e(new fh(n)),tt(!0)}function PO(n,e){let t=e.routeConfig?e.routeConfig.canActivate:null;if(!t||t.length===0)return tt(!0);let i=t.map(r=>Bc(()=>{let s=e._environmentInjector,o=za(r,s),a=EO(o)?o.canActivate(e,n):wn(s,()=>o(e,n));return Co(a).pipe(Cr())}));return tt(i).pipe(Va())}function OO(n,e){let t=e[e.length-1],r=e.slice(0,e.length-1).reverse().map(s=>_O(s)).filter(s=>s!==null).map(s=>Bc(()=>{let o=s.guards.map(a=>{let c=s.node._environmentInjector,l=za(a,c),u=bO(l)?l.canActivateChild(t,n):wn(c,()=>l(t,n));return Co(u).pipe(Cr())});return tt(o).pipe(Va())}));return tt(r).pipe(Va())}function LO(n,e,t,i){let r=e&&e.routeConfig?e.routeConfig.canDeactivate:null;if(!r||r.length===0)return tt(!0);let s=r.map(o=>{let a=e._environmentInjector,c=za(o,a),l=wO(c)?c.canDeactivate(n,e,t,i):wn(a,()=>c(n,e,t,i));return Co(l).pipe(Cr())});return tt(s).pipe(Va())}function FO(n,e,t,i,r){let s=e.canLoad;if(s===void 0||s.length===0)return tt(!0);let o=s.map(a=>{let c=za(a,n),l=MO(c)?c.canLoad(e,t):wn(n,()=>c(e,t)),u=Co(l);return r?u.pipe(Lw(r)):u});return tt(o).pipe(Va(),Fw(i))}function Fw(n){return lg(vi(e=>{if(typeof e!="boolean")throw _h(n,e)}),Bt(e=>e===!0))}function kO(n,e,t,i,r,s){let o=e.canMatch;if(!o||o.length===0)return tt(!0);let a=o.map(c=>{let l=za(c,n),u=TO(l)?l.canMatch(e,t,r):wn(n,()=>l(e,t,r));return Co(u).pipe(Lw(s))});return tt(a).pipe(Va(),Fw(i))}var Br=class n extends Error{segmentGroup;constructor(e){super(),this.segmentGroup=e||null,Object.setPrototypeOf(this,n.prototype)}},Hl=class n extends Error{urlTree;constructor(e){super(),this.urlTree=e,Object.setPrototypeOf(this,n.prototype)}};function UO(n){throw new Te(4e3,!1)}function BO(n){throw Rw(!1,Cn.GuardRejected)}var py=class{urlSerializer;urlTree;constructor(e,t){this.urlSerializer=e,this.urlTree=t}async lineralizeSegments(e,t){let i=[],r=t.root;for(;;){if(i=i.concat(r.segments),r.numberOfChildren===0)return i;if(r.numberOfChildren>1||!r.children[Ue])throw UO(`${e.redirectTo}`);r=r.children[Ue]}}async applyRedirectCommands(e,t,i,r,s){let o=await VO(t,r,s);if(o instanceof Ei)throw new Hl(o);let a=this.applyRedirectCreateUrlTree(o,this.urlSerializer.parse(o),e,i);if(o[0]==="/")throw new Hl(a);return a}applyRedirectCreateUrlTree(e,t,i,r){let s=this.createSegmentGroup(e,t.root,i,r);return new Ei(s,this.createQueryParams(t.queryParams,this.urlTree.queryParams),t.fragment)}createQueryParams(e,t){let i={};return Object.entries(e).forEach(([r,s])=>{if(typeof s=="string"&&s[0]===":"){let a=s.substring(1);i[r]=t[a]}else i[r]=s}),i}createSegmentGroup(e,t,i,r){let s=this.createSegments(e,t.segments,i,r),o={};return Object.entries(t.children).forEach(([a,c])=>{o[a]=this.createSegmentGroup(e,c,i,r)}),new dt(s,o)}createSegments(e,t,i,r){return t.map(s=>s.path[0]===":"?this.findPosParam(e,s,r):this.findOrReturn(s,i))}findPosParam(e,t,i){let r=i[t.path.substring(1)];if(!r)throw new Te(4001,!1);return r}findOrReturn(e,t){let i=0;for(let r of t){if(r.path===e.path)return t.splice(i),r;i++}return e}};function VO(n,e,t){if(typeof n=="string")return Promise.resolve(n);let i=n;return ih(Co(wn(t,()=>i(e))))}function HO(n,e){return n.providers&&!n._injector&&(n._injector=gl(n.providers,e,`Route: ${n.path}`)),n._injector??e}function Hi(n){return n.outlet||Ue}function zO(n,e){let t=n.filter(i=>Hi(i)===e);return t.push(...n.filter(i=>Hi(i)!==e)),t}var my={matched:!1,consumedSegments:[],remainingSegments:[],parameters:{},positionalParamSegments:{}};function kw(n){return{routeConfig:n.routeConfig,url:n.url,params:n.params,queryParams:n.queryParams,fragment:n.fragment,data:n.data,outlet:n.outlet,title:n.title,paramMap:n.paramMap,queryParamMap:n.queryParamMap}}function GO(n,e,t,i,r,s,o){let a=Uw(n,e,t);if(!a.matched)return tt(a);let c=kw(s(a));return i=HO(e,i),kO(i,e,t,r,c,o).pipe(Bt(l=>l===!0?a:_e({},my)))}function Uw(n,e,t){if(e.path==="")return e.pathMatch==="full"&&(n.hasChildren()||t.length>0)?_e({},my):{matched:!0,consumedSegments:[],remainingSegments:t,parameters:{},positionalParamSegments:{}};let r=(e.matcher||cw)(t,n,e);if(!r)return _e({},my);let s={};Object.entries(r.posParams??{}).forEach(([a,c])=>{s[a]=c.path});let o=r.consumed.length>0?_e(_e({},s),r.consumed[r.consumed.length-1].parameters):s;return{matched:!0,consumedSegments:r.consumed,remainingSegments:t.slice(r.consumed.length),parameters:o,positionalParamSegments:r.posParams??{}}}function ow(n,e,t,i,r){return t.length>0&&$O(n,t,i,r)?{segmentGroup:new dt(e,WO(i,new dt(t,n.children))),slicedSegments:[]}:t.length===0&&qO(n,t,i)?{segmentGroup:new dt(n.segments,jO(n,t,i,n.children)),slicedSegments:t}:{segmentGroup:new dt(n.segments,n.children),slicedSegments:t}}function jO(n,e,t,i){let r={};for(let s of t)if(Mh(n,e,s)&&!i[Hi(s)]){let o=new dt([],{});r[Hi(s)]=o}return _e(_e({},i),r)}function WO(n,e){let t={};t[Ue]=e;for(let i of n)if(i.path===""&&Hi(i)!==Ue){let r=new dt([],{});t[Hi(i)]=r}return t}function $O(n,e,t,i){return t.some(r=>!Mh(n,e,r)||!(Hi(r)!==Ue)?!1:!(i!==void 0&&Hi(r)===i))}function qO(n,e,t){return t.some(i=>Mh(n,e,i))}function Mh(n,e,t){return(n.hasChildren()||e.length>0)&&t.pathMatch==="full"?!1:t.path===""}function XO(n,e,t){return e.length===0&&!n.children[t]}var gy=class{};async function YO(n,e,t,i,r,s,o="emptyOnly",a){return new vy(n,e,t,i,r,o,s,a).recognize()}var ZO=31,vy=class{injector;configLoader;rootComponentType;config;urlTree;paramsInheritanceStrategy;urlSerializer;abortSignal;applyRedirects;absoluteRedirectCount=0;allowRedirects=!0;constructor(e,t,i,r,s,o,a,c){this.injector=e,this.configLoader=t,this.rootComponentType=i,this.config=r,this.urlTree=s,this.paramsInheritanceStrategy=o,this.urlSerializer=a,this.abortSignal=c,this.applyRedirects=new py(this.urlSerializer,this.urlTree)}noMatchError(e){return new Te(4002,`'${e.segmentGroup}'`)}async recognize(){let e=ow(this.urlTree.root,[],[],this.config).segmentGroup,{children:t,rootSnapshot:i}=await this.match(e),r=new ri(i,t),s=new Bl("",r),o=xw(i,[],this.urlTree.queryParams,this.urlTree.fragment);return o.queryParams=this.urlTree.queryParams,s.url=this.urlSerializer.serialize(o),{state:s,tree:o}}async match(e){let t=new Ua([],Object.freeze({}),Object.freeze(_e({},this.urlTree.queryParams)),this.urlTree.fragment,Object.freeze({}),Ue,this.rootComponentType,null,{},this.injector);try{return{children:await this.processSegmentGroup(this.injector,this.config,e,Ue,t),rootSnapshot:t}}catch(i){if(i instanceof Hl)return this.urlTree=i.urlTree,this.match(i.urlTree.root);throw i instanceof Br?this.noMatchError(i):i}}async processSegmentGroup(e,t,i,r,s){if(i.segments.length===0&&i.hasChildren())return this.processChildren(e,t,i,s);let o=await this.processSegment(e,t,i,i.segments,r,!0,s);return o instanceof ri?[o]:[]}async processChildren(e,t,i,r){let s=[];for(let c of Object.keys(i.children))c==="primary"?s.unshift(c):s.push(c);let o=[];for(let c of s){let l=i.children[c],u=zO(t,c),d=await this.processSegmentGroup(e,u,l,c,r);o.push(...d)}let a=Bw(o);return KO(a),a}async processSegment(e,t,i,r,s,o,a){for(let c of t)try{return await this.processSegmentAgainstRoute(c._injector??e,t,c,i,r,s,o,a)}catch(l){if(l instanceof Br||Pw(l))continue;throw l}if(XO(i,r,s))return new gy;throw new Br(i)}async processSegmentAgainstRoute(e,t,i,r,s,o,a,c){if(Hi(i)!==o&&(o===Ue||!Mh(r,s,i)))throw new Br(r);if(i.redirectTo===void 0)return this.matchSegmentAgainstRoute(e,r,i,s,o,c);if(this.allowRedirects&&a)return this.expandSegmentAgainstRouteUsingRedirect(e,r,t,i,s,o,c);throw new Br(r)}async expandSegmentAgainstRouteUsingRedirect(e,t,i,r,s,o,a){let{matched:c,parameters:l,consumedSegments:u,positionalParamSegments:d,remainingSegments:f}=Uw(t,r,s);if(!c)throw new Br(t);typeof r.redirectTo=="string"&&r.redirectTo[0]==="/"&&(this.absoluteRedirectCount++,this.absoluteRedirectCount>ZO&&(this.allowRedirects=!1));let h=this.createSnapshot(e,r,s,l,a);if(this.abortSignal.aborted)throw new Error(this.abortSignal.reason);let m=await this.applyRedirects.applyRedirectCommands(u,r.redirectTo,d,kw(h),e),v=await this.applyRedirects.lineralizeSegments(r,m);return this.processSegment(e,i,t,v.concat(f),o,!1,a)}createSnapshot(e,t,i,r,s){let o=new Ua(i,r,Object.freeze(_e({},this.urlTree.queryParams)),this.urlTree.fragment,QO(t),Hi(t),t.component??t._loadedComponent??null,t,eL(t),e),a=_y(o,s,this.paramsInheritanceStrategy);return o.params=Object.freeze(a.params),o.data=Object.freeze(a.data),o}async matchSegmentAgainstRoute(e,t,i,r,s,o){if(this.abortSignal.aborted)throw new Error(this.abortSignal.reason);let a=M=>this.createSnapshot(e,i,M.consumedSegments,M.parameters,o),c=await ih(GO(t,i,r,e,this.urlSerializer,a,this.abortSignal));if(i.path==="**"&&(t.children={}),!c?.matched)throw new Br(t);e=i._injector??e;let{routes:l}=await this.getChildConfig(e,i,r),u=i._loadedInjector??e,{parameters:d,consumedSegments:f,remainingSegments:h}=c,m=this.createSnapshot(e,i,f,d,o),{segmentGroup:v,slicedSegments:p}=ow(t,f,h,l,s);if(p.length===0&&v.hasChildren()){let M=await this.processChildren(u,l,v,m);return new ri(m,M)}if(l.length===0&&p.length===0)return new ri(m,[]);let g=Hi(i)===s,x=await this.processSegment(u,l,v,p,g?Ue:s,!0,m);return new ri(m,x instanceof ri?[x]:[])}async getChildConfig(e,t,i){if(t.children)return{routes:t.children,injector:e};if(t.loadChildren){if(t._loadedRoutes!==void 0){let s=t._loadedNgModuleFactory;return s&&!t._loadedInjector&&(t._loadedInjector=s.create(e).injector),{routes:t._loadedRoutes,injector:t._loadedInjector}}if(this.abortSignal.aborted)throw new Error(this.abortSignal.reason);if(await ih(FO(e,t,i,this.urlSerializer,this.abortSignal))){let s=await this.configLoader.loadChildren(e,t);return t._loadedRoutes=s.routes,t._loadedInjector=s.injector,t._loadedNgModuleFactory=s.factory,s}throw BO(t)}return{routes:[],injector:e}}};function KO(n){n.sort((e,t)=>e.value.outlet===Ue?-1:t.value.outlet===Ue?1:e.value.outlet.localeCompare(t.value.outlet))}function JO(n){let e=n.value.routeConfig;return e&&e.path===""}function Bw(n){let e=[],t=new Set;for(let i of n){if(!JO(i)){e.push(i);continue}let r=e.find(s=>i.value.routeConfig===s.value.routeConfig);r!==void 0?(r.children.push(...i.children),t.add(r)):e.push(i)}for(let i of t){let r=Bw(i.children);e.push(new ri(i.value,r))}return e.filter(i=>!t.has(i))}function QO(n){return n.data||{}}function eL(n){return n.resolve||{}}function tL(n,e,t,i,r,s,o){return Ln(async a=>{let{state:c,tree:l}=await YO(n,e,t,i,a.extractedUrl,r,s,o);return _t(_e({},a),{targetSnapshot:c,urlAfterRedirects:l})})}function nL(n){return Ln(e=>{let{targetSnapshot:t,guards:{canActivateChecks:i}}=e;if(!i.length)return tt(e);let r=new Set(i.map(a=>a.route)),s=new Set;for(let a of r)if(!s.has(a))for(let c of Vw(a))s.add(c);let o=0;return Yt(s).pipe(Md(a=>r.has(a)?iL(a,t,n):(a.data=_y(a,a.parent,n).resolve,tt(void 0))),vi(()=>o++),Ed(1),Ln(a=>o===s.size?tt(e):mn))})}function Vw(n){let e=n.children.map(t=>Vw(t)).flat();return[n,...e]}function iL(n,e,t){let i=n.routeConfig,r=n._resolve;return i?.title!==void 0&&!Dw(i)&&(r[zl]=i.title),Bc(()=>(n.data=_y(n,n.parent,t).resolve,rL(r,n,e).pipe(Bt(s=>(n._resolvedData=s,n.data=_e(_e({},n.data),s),null)))))}function rL(n,e,t){let i=ry(n);if(i.length===0)return tt({});let r={};return Yt(i).pipe(Ln(s=>sL(n[s],e,t).pipe(Cr(),vi(o=>{if(o instanceof Ba)throw _h(new Es,o);r[s]=o}))),Ed(1),Bt(()=>r),Vc(s=>Pw(s)?mn:fg(s)))}function sL(n,e,t){let i=e._environmentInjector,r=za(n,i),s=r.resolve?r.resolve(e,t):wn(i,()=>r(e,t));return Co(s)}function aw(n){return Ni(e=>{let t=n(e);return t?Yt(t).pipe(Bt(()=>e)):tt(e)})}var My=(()=>{class n{buildTitle(t){let i,r=t.root;for(;r!==void 0;)i=this.getResolvedTitleForRoute(r)??i,r=r.children.find(s=>s.outlet===Ue);return i}getResolvedTitleForRoute(t){return t.data[zl]}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Oe({token:n,factory:()=>ee(Hw),providedIn:"root"})}return n})(),Hw=(()=>{class n extends My{title;constructor(t){super(),this.title=t}updateTitle(t){let i=this.buildTitle(t);i!==void 0&&this.title.setTitle(i)}static \u0275fac=function(i){return new(i||n)($e(ew))};static \u0275prov=Oe({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),$l=new Re("",{factory:()=>({})}),ql=new Re(""),zw=(()=>{class n{componentLoaders=new WeakMap;childrenLoaders=new WeakMap;onLoadStartListener;onLoadEndListener;compiler=ee(B_);async loadComponent(t,i){if(this.componentLoaders.get(i))return this.componentLoaders.get(i);if(i._loadedComponent)return Promise.resolve(i._loadedComponent);this.onLoadStartListener&&this.onLoadStartListener(i);let r=(async()=>{try{let s=await uw(wn(t,()=>i.loadComponent())),o=await Ww(jw(s));return this.onLoadEndListener&&this.onLoadEndListener(i),i._loadedComponent=o,o}finally{this.componentLoaders.delete(i)}})();return this.componentLoaders.set(i,r),r}loadChildren(t,i){if(this.childrenLoaders.get(i))return this.childrenLoaders.get(i);if(i._loadedRoutes)return Promise.resolve({routes:i._loadedRoutes,injector:i._loadedInjector});this.onLoadStartListener&&this.onLoadStartListener(i);let r=(async()=>{try{let s=await Gw(i,this.compiler,t,this.onLoadEndListener);return i._loadedRoutes=s.routes,i._loadedInjector=s.injector,i._loadedNgModuleFactory=s.factory,s}finally{this.childrenLoaders.delete(i)}})();return this.childrenLoaders.set(i,r),r}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Oe({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();async function Gw(n,e,t,i){let r=await uw(wn(t,()=>n.loadChildren())),s=await Ww(jw(r)),o;s instanceof Of||Array.isArray(s)?o=s:o=await e.compileModuleAsync(s),i&&i(n);let a,c,l=!1,u;return Array.isArray(o)?(c=o,l=!0):(a=o.create(t).injector,u=o,c=a.get(ql,[],{optional:!0,self:!0}).flat()),{routes:c.map(Sy),injector:a,factory:u}}function oL(n){return n&&typeof n=="object"&&"default"in n}function jw(n){return oL(n)?n.default:n}async function Ww(n){return n}var Eh=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275prov=Oe({token:n,factory:()=>ee(aL),providedIn:"root"})}return n})(),aL=(()=>{class n{shouldProcessUrl(t){return!0}extract(t){return t}merge(t,i){return t}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Oe({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),$w=new Re("");var cL=()=>{},qw=new Re(""),Xw=(()=>{class n{currentNavigation=vs(null,{equal:()=>!1});currentTransition=null;lastSuccessfulNavigation=vs(null);events=new hn;transitionAbortWithErrorSubject=new hn;configLoader=ee(zw);environmentInjector=ee(nn);destroyRef=ee(gs);urlSerializer=ee(Gl);rootContexts=ee(Ha);location=ee(Ra);inputBindingEnabled=ee(Sh,{optional:!0})!==null;titleStrategy=ee(My);options=ee($l,{optional:!0})||{};paramsInheritanceStrategy=this.options.paramsInheritanceStrategy||"emptyOnly";urlHandlingStrategy=ee(Eh);createViewTransition=ee($w,{optional:!0});navigationErrorHandler=ee(qw,{optional:!0});navigationId=0;get hasRequestedNavigation(){return this.navigationId!==0}transitions;afterPreactivation=()=>tt(void 0);rootComponentType=null;destroyed=!1;constructor(){let t=r=>this.events.next(new uh(r)),i=r=>this.events.next(new dh(r));this.configLoader.onLoadEndListener=i,this.configLoader.onLoadStartListener=t,this.destroyRef.onDestroy(()=>{this.destroyed=!0})}complete(){this.transitions?.complete()}handleNavigationRequest(t){let i=++this.navigationId;xs(()=>{this.transitions?.next(_t(_e({},t),{extractedUrl:this.urlHandlingStrategy.extract(t.rawUrl),targetSnapshot:null,targetRouterState:null,guards:{canActivateChecks:[],canDeactivateChecks:[]},guardsResult:null,id:i,routesRecognizeHandler:{},beforeActivateHandler:{}}))})}setupNavigations(t){return this.transitions=new pn(null),this.transitions.pipe(wr(i=>i!==null),Ni(i=>{let r=!1,s=new AbortController,o=()=>!r&&this.currentTransition?.id===i.id;return tt(i).pipe(Ni(a=>{if(this.navigationId>i.id)return this.cancelNavigationTransition(i,"",Cn.SupersededByNewNavigation),mn;this.currentTransition=i;let c=this.lastSuccessfulNavigation();this.currentNavigation.set({id:a.id,initialUrl:a.rawUrl,extractedUrl:a.extractedUrl,targetBrowserUrl:typeof a.extras.browserUrl=="string"?this.urlSerializer.parse(a.extras.browserUrl):a.extras.browserUrl,trigger:a.source,extras:a.extras,previousNavigation:c?_t(_e({},c),{previousNavigation:null}):null,abort:()=>s.abort(),routesRecognizeHandler:a.routesRecognizeHandler,beforeActivateHandler:a.beforeActivateHandler});let l=!t.navigated||this.isUpdatingInternalState()||this.isUpdatedBrowserUrl(),u=a.extras.onSameUrlNavigation??t.onSameUrlNavigation;if(!l&&u!=="reload")return this.events.next(new Hr(a.id,this.urlSerializer.serialize(a.rawUrl),"",Ll.IgnoredSameUrlNavigation)),a.resolve(!1),mn;if(this.urlHandlingStrategy.shouldProcessUrl(a.rawUrl))return tt(a).pipe(Ni(d=>(this.events.next(new wo(d.id,this.urlSerializer.serialize(d.extractedUrl),d.source,d.restoredState)),d.id!==this.navigationId?mn:Promise.resolve(d))),tL(this.environmentInjector,this.configLoader,this.rootComponentType,t.config,this.urlSerializer,this.paramsInheritanceStrategy,s.signal),vi(d=>{i.targetSnapshot=d.targetSnapshot,i.urlAfterRedirects=d.urlAfterRedirects,this.currentNavigation.update(f=>(f.finalUrl=d.urlAfterRedirects,f)),this.events.next(new kl)}),Ni(d=>Yt(i.routesRecognizeHandler.deferredHandle??tt(void 0)).pipe(Bt(()=>d))),vi(()=>{let d=new Fl(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot);this.events.next(d)}));if(l&&this.urlHandlingStrategy.shouldProcessUrl(a.currentRawUrl)){let{id:d,extractedUrl:f,source:h,restoredState:m,extras:v}=a,p=new wo(d,this.urlSerializer.serialize(f),h,m);this.events.next(p);let g=Tw(this.rootComponentType,this.environmentInjector).snapshot;return this.currentTransition=i=_t(_e({},a),{targetSnapshot:g,urlAfterRedirects:f,extras:_t(_e({},v),{skipLocationChange:!1,replaceUrl:!1})}),this.currentNavigation.update(x=>(x.finalUrl=f,x)),tt(i)}else return this.events.next(new Hr(a.id,this.urlSerializer.serialize(a.extractedUrl),"",Ll.IgnoredByUrlHandlingStrategy)),a.resolve(!1),mn}),Bt(a=>{let c=new oh(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot);return this.events.next(c),this.currentTransition=i=_t(_e({},a),{guards:vO(a.targetSnapshot,a.currentSnapshot,this.rootContexts)}),i}),DO(a=>this.events.next(a)),Ni(a=>{if(i.guardsResult=a.guardsResult,a.guardsResult&&typeof a.guardsResult!="boolean")throw _h(this.urlSerializer,a.guardsResult);let c=new ah(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot,!!a.guardsResult);if(this.events.next(c),!o())return mn;if(!a.guardsResult)return this.cancelNavigationTransition(a,"",Cn.GuardRejected),mn;if(a.guards.canActivateChecks.length===0)return tt(a);let l=new ch(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot);if(this.events.next(l),!o())return mn;let u=!1;return tt(a).pipe(nL(this.paramsInheritanceStrategy),vi({next:()=>{u=!0;let d=new lh(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects),a.targetSnapshot);this.events.next(d)},complete:()=>{u||this.cancelNavigationTransition(a,"",Cn.NoDataFromResolver)}}))}),aw(a=>{let c=u=>{let d=[];if(u.routeConfig?._loadedComponent)u.component=u.routeConfig?._loadedComponent;else if(u.routeConfig?.loadComponent){let f=u._environmentInjector;d.push(this.configLoader.loadComponent(f,u.routeConfig).then(h=>{u.component=h}))}for(let f of u.children)d.push(...c(f));return d},l=c(a.targetSnapshot.root);return l.length===0?tt(a):Yt(Promise.all(l).then(()=>a))}),aw(()=>this.afterPreactivation()),Ni(()=>{let{currentSnapshot:a,targetSnapshot:c}=i,l=this.createViewTransition?.(this.environmentInjector,a.root,c.root);return l?Yt(l).pipe(Bt(()=>i)):tt(i)}),Tr(1),Ni(a=>{let c=hO(t.routeReuseStrategy,a.targetSnapshot,a.currentRouterState);this.currentTransition=i=a=_t(_e({},a),{targetRouterState:c}),this.currentNavigation.update(u=>(u.targetRouterState=c,u)),this.events.next(new Fa);let l=i.beforeActivateHandler.deferredHandle;return l?Yt(l.then(()=>a)):tt(a)}),vi(a=>{new hy(t.routeReuseStrategy,i.targetRouterState,i.currentRouterState,c=>this.events.next(c),this.inputBindingEnabled).activate(this.rootContexts),o()&&(r=!0,this.currentNavigation.update(c=>(c.abort=cL,c)),this.lastSuccessfulNavigation.set(xs(this.currentNavigation)),this.events.next(new Vr(a.id,this.urlSerializer.serialize(a.extractedUrl),this.urlSerializer.serialize(a.urlAfterRedirects))),this.titleStrategy?.updateTitle(a.targetRouterState.snapshot),a.resolve(!0))}),Hc(Ow(s.signal).pipe(wr(()=>!r&&!i.targetRouterState),vi(()=>{this.cancelNavigationTransition(i,s.signal.reason+"",Cn.Aborted)}))),vi({complete:()=>{r=!0}}),Hc(this.transitionAbortWithErrorSubject.pipe(vi(a=>{throw a}))),pg(()=>{s.abort(),r||this.cancelNavigationTransition(i,"",Cn.SupersededByNewNavigation),this.currentTransition?.id===i.id&&(this.currentNavigation.set(null),this.currentTransition=null)}),Vc(a=>{if(r=!0,this.destroyed)return i.resolve(!1),mn;if(Nw(a))this.events.next(new Mi(i.id,this.urlSerializer.serialize(i.extractedUrl),a.message,a.cancellationCode)),gO(a)?this.events.next(new ka(a.url,a.navigationBehaviorOptions)):i.resolve(!1);else{let c=new To(i.id,this.urlSerializer.serialize(i.extractedUrl),a,i.targetSnapshot??void 0);try{let l=wn(this.environmentInjector,()=>this.navigationErrorHandler?.(c));if(l instanceof Ba){let{message:u,cancellationCode:d}=_h(this.urlSerializer,l);this.events.next(new Mi(i.id,this.urlSerializer.serialize(i.extractedUrl),u,d)),this.events.next(new ka(l.redirectTo,l.navigationBehaviorOptions))}else throw this.events.next(c),a}catch(l){this.options.resolveNavigationPromiseOnError?i.resolve(!1):i.reject(l)}}return mn}))}))}cancelNavigationTransition(t,i,r){let s=new Mi(t.id,this.urlSerializer.serialize(t.extractedUrl),i,r);this.events.next(s),t.resolve(!1)}isUpdatingInternalState(){return this.currentTransition?.extractedUrl.toString()!==this.currentTransition?.currentUrlTree.toString()}isUpdatedBrowserUrl(){let t=this.urlHandlingStrategy.extract(this.urlSerializer.parse(this.location.path(!0))),i=xs(this.currentNavigation),r=i?.targetBrowserUrl??i?.extractedUrl;return t.toString()!==r?.toString()&&!i?.extras.skipLocationChange}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Oe({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function lL(n){return n!==Nl}var Yw=new Re("");var Zw=(()=>{class n{static \u0275fac=function(i){return new(i||n)};static \u0275prov=Oe({token:n,factory:()=>ee(uL),providedIn:"root"})}return n})(),xh=class{shouldDetach(e){return!1}store(e,t){}shouldAttach(e){return!1}retrieve(e){return null}shouldReuseRoute(e,t){return e.routeConfig===t.routeConfig}shouldDestroyInjector(e){return!0}},uL=(()=>{class n extends xh{static \u0275fac=(()=>{let t;return function(r){return(t||(t=hl(n)))(r||n)}})();static \u0275prov=Oe({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),Ey=(()=>{class n{urlSerializer=ee(Gl);options=ee($l,{optional:!0})||{};canceledNavigationResolution=this.options.canceledNavigationResolution||"replace";location=ee(Ra);urlHandlingStrategy=ee(Eh);urlUpdateStrategy=this.options.urlUpdateStrategy||"deferred";currentUrlTree=new Ei;getCurrentUrlTree(){return this.currentUrlTree}rawUrlTree=this.currentUrlTree;getRawUrlTree(){return this.rawUrlTree}createBrowserPath({finalUrl:t,initialUrl:i,targetBrowserUrl:r}){let s=t!==void 0?this.urlHandlingStrategy.merge(t,i):i,o=r??s;return o instanceof Ei?this.urlSerializer.serialize(o):o}commitTransition({targetRouterState:t,finalUrl:i,initialUrl:r}){i&&t?(this.currentUrlTree=i,this.rawUrlTree=this.urlHandlingStrategy.merge(i,r),this.routerState=t):this.rawUrlTree=r}routerState=Tw(null,ee(nn));getRouterState(){return this.routerState}_stateMemento=this.createStateMemento();get stateMemento(){return this._stateMemento}updateStateMemento(){this._stateMemento=this.createStateMemento()}createStateMemento(){return{rawUrlTree:this.rawUrlTree,currentUrlTree:this.currentUrlTree,routerState:this.routerState}}restoredState(){return this.location.getState()}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Oe({token:n,factory:()=>ee(dL),providedIn:"root"})}return n})(),dL=(()=>{class n extends Ey{currentPageId=0;lastSuccessfulId=-1;get browserPageId(){return this.canceledNavigationResolution!=="computed"?this.currentPageId:this.restoredState()?.\u0275routerPageId??this.currentPageId}registerNonRouterCurrentEntryChangeListener(t){return this.location.subscribe(i=>{i.type==="popstate"&&setTimeout(()=>{t(i.url,i.state,"popstate",{replaceUrl:!0})})})}handleRouterEvent(t,i){t instanceof wo?this.updateStateMemento():t instanceof Hr?this.commitTransition(i):t instanceof Fl?this.urlUpdateStrategy==="eager"&&(i.extras.skipLocationChange||this.setBrowserUrl(this.createBrowserPath(i),i)):t instanceof Fa?(this.commitTransition(i),this.urlUpdateStrategy==="deferred"&&!i.extras.skipLocationChange&&this.setBrowserUrl(this.createBrowserPath(i),i)):t instanceof Mi&&!ww(t)?this.restoreHistory(i):t instanceof To?this.restoreHistory(i,!0):t instanceof Vr&&(this.lastSuccessfulId=t.id,this.currentPageId=this.browserPageId)}setBrowserUrl(t,{extras:i,id:r}){let{replaceUrl:s,state:o}=i;if(this.location.isCurrentPathEqualTo(t)||s){let a=this.browserPageId,c=_e(_e({},o),this.generateNgRouterState(r,a));this.location.replaceState(t,"",c)}else{let a=_e(_e({},o),this.generateNgRouterState(r,this.browserPageId+1));this.location.go(t,"",a)}}restoreHistory(t,i=!1){if(this.canceledNavigationResolution==="computed"){let r=this.browserPageId,s=this.currentPageId-r;s!==0?this.location.historyGo(s):this.getCurrentUrlTree()===t.finalUrl&&s===0&&(this.resetInternalState(t),this.resetUrlToCurrentUrlTree())}else this.canceledNavigationResolution==="replace"&&(i&&this.resetInternalState(t),this.resetUrlToCurrentUrlTree())}resetInternalState({finalUrl:t}){this.routerState=this.stateMemento.routerState,this.currentUrlTree=this.stateMemento.currentUrlTree,this.rawUrlTree=this.urlHandlingStrategy.merge(this.currentUrlTree,t??this.rawUrlTree)}resetUrlToCurrentUrlTree(){this.location.replaceState(this.urlSerializer.serialize(this.getRawUrlTree()),"",this.generateNgRouterState(this.lastSuccessfulId,this.currentPageId))}generateNgRouterState(t,i){return this.canceledNavigationResolution==="computed"?{navigationId:t,\u0275routerPageId:i}:{navigationId:t}}static \u0275fac=(()=>{let t;return function(r){return(t||(t=hl(n)))(r||n)}})();static \u0275prov=Oe({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function by(n,e){n.events.pipe(wr(t=>t instanceof Vr||t instanceof Mi||t instanceof To||t instanceof Hr),Bt(t=>t instanceof Vr||t instanceof Hr?0:(t instanceof Mi?t.code===Cn.Redirect||t.code===Cn.SupersededByNewNavigation:!1)?2:1),wr(t=>t!==2),Tr(1)).subscribe(()=>{e()})}var bh=(()=>{class n{get currentUrlTree(){return this.stateManager.getCurrentUrlTree()}get rawUrlTree(){return this.stateManager.getRawUrlTree()}disposed=!1;nonRouterCurrentEntryChangeSubscription;console=ee(T_);stateManager=ee(Ey);options=ee($l,{optional:!0})||{};pendingTasks=ee(Or);urlUpdateStrategy=this.options.urlUpdateStrategy||"deferred";navigationTransitions=ee(Xw);urlSerializer=ee(Gl);location=ee(Ra);urlHandlingStrategy=ee(Eh);injector=ee(nn);_events=new hn;get events(){return this._events}get routerState(){return this.stateManager.getRouterState()}navigated=!1;routeReuseStrategy=ee(Zw);injectorCleanup=ee(Yw,{optional:!0});onSameUrlNavigation=this.options.onSameUrlNavigation||"ignore";config=ee(ql,{optional:!0})?.flat()??[];componentInputBindingEnabled=!!ee(Sh,{optional:!0});currentNavigation=this.navigationTransitions.currentNavigation.asReadonly();constructor(){this.resetConfig(this.config),this.navigationTransitions.setupNavigations(this).subscribe({error:t=>{}}),this.subscribeToNavigationEvents()}eventsSubscription=new tn;subscribeToNavigationEvents(){let t=this.navigationTransitions.events.subscribe(i=>{try{let r=this.navigationTransitions.currentTransition,s=xs(this.navigationTransitions.currentNavigation);if(r!==null&&s!==null){if(this.stateManager.handleRouterEvent(i,s),i instanceof Mi&&i.code!==Cn.Redirect&&i.code!==Cn.SupersededByNewNavigation)this.navigated=!0;else if(i instanceof Vr)this.navigated=!0,this.injectorCleanup?.(this.routeReuseStrategy,this.routerState,this.config);else if(i instanceof ka){let o=i.navigationBehaviorOptions,a=this.urlHandlingStrategy.merge(i.url,r.currentRawUrl),c=_e({scroll:r.extras.scroll,browserUrl:r.extras.browserUrl,info:r.extras.info,skipLocationChange:r.extras.skipLocationChange,replaceUrl:r.extras.replaceUrl||this.urlUpdateStrategy==="eager"||lL(r.source)},o);this.scheduleNavigation(a,Nl,null,c,{resolve:r.resolve,reject:r.reject,promise:r.promise})}}dO(i)&&this._events.next(i)}catch(r){this.navigationTransitions.transitionAbortWithErrorSubject.next(r)}});this.eventsSubscription.add(t)}resetRootComponentType(t){this.routerState.root.component=t,this.navigationTransitions.rootComponentType=t}initialNavigation(){this.setUpLocationChangeListener(),this.navigationTransitions.hasRequestedNavigation||this.navigateToSyncWithBrowser(this.location.path(!0),Nl,this.stateManager.restoredState(),{replaceUrl:!0})}setUpLocationChangeListener(){this.nonRouterCurrentEntryChangeSubscription??=this.stateManager.registerNonRouterCurrentEntryChangeListener((t,i,r,s)=>{this.navigateToSyncWithBrowser(t,r,i,s)})}navigateToSyncWithBrowser(t,i,r,s){let o=r?.navigationId?r:null;if(r){let c=_e({},r);delete c.navigationId,delete c.\u0275routerPageId,Object.keys(c).length!==0&&(s.state=c)}let a=this.parseUrl(t);this.scheduleNavigation(a,i,o,s).catch(c=>{this.disposed||this.injector.get(Ui)(c)})}get url(){return this.serializeUrl(this.currentUrlTree)}getCurrentNavigation(){return xs(this.navigationTransitions.currentNavigation)}get lastSuccessfulNavigation(){return this.navigationTransitions.lastSuccessfulNavigation}resetConfig(t){this.config=t.map(Sy),this.navigated=!1}ngOnDestroy(){this.dispose()}dispose(){this._events.unsubscribe(),this.navigationTransitions.complete(),this.nonRouterCurrentEntryChangeSubscription?.unsubscribe(),this.nonRouterCurrentEntryChangeSubscription=void 0,this.disposed=!0,this.eventsSubscription.unsubscribe()}createUrlTree(t,i={}){let{relativeTo:r,queryParams:s,fragment:o,queryParamsHandling:a,preserveFragment:c}=i,l=c?this.currentUrlTree.fragment:o,u=null;switch(a??this.options.defaultQueryParamsHandling){case"merge":u=_e(_e({},this.currentUrlTree.queryParams),s);break;case"preserve":u=this.currentUrlTree.queryParams;break;default:u=s||null}u!==null&&(u=this.removeEmptyProps(u));let d;try{let f=r?r.snapshot:this.routerState.snapshot.root;d=Sw(f)}catch{(typeof t[0]!="string"||t[0][0]!=="/")&&(t=[]),d=this.currentUrlTree.root}return Mw(d,t,u,l??null,this.urlSerializer)}navigateByUrl(t,i={skipLocationChange:!1}){let r=La(t)?t:this.parseUrl(t),s=this.urlHandlingStrategy.merge(r,this.rawUrlTree);return this.scheduleNavigation(s,Nl,null,i)}navigate(t,i={skipLocationChange:!1}){return fL(t),this.navigateByUrl(this.createUrlTree(t,i),i)}serializeUrl(t){return this.urlSerializer.serialize(t)}parseUrl(t){try{return this.urlSerializer.parse(t)}catch{return this.console.warn(qc(4018,!1)),this.urlSerializer.parse("/")}}isActive(t,i){let r;if(i===!0?r=_e({},fw):i===!1?r=_e({},sy):r=_e(_e({},sy),i),La(t))return tw(this.currentUrlTree,t,r);let s=this.parseUrl(t);return tw(this.currentUrlTree,s,r)}removeEmptyProps(t){return Object.entries(t).reduce((i,[r,s])=>(s!=null&&(i[r]=s),i),{})}scheduleNavigation(t,i,r,s,o){if(this.disposed)return Promise.resolve(!1);let a,c,l;o?(a=o.resolve,c=o.reject,l=o.promise):l=new Promise((d,f)=>{a=d,c=f});let u=this.pendingTasks.add();return by(this,()=>{queueMicrotask(()=>this.pendingTasks.remove(u))}),this.navigationTransitions.handleNavigationRequest({source:i,restoredState:r,currentUrlTree:this.currentUrlTree,currentRawUrl:this.currentUrlTree,rawUrl:t,extras:s,resolve:a,reject:c,promise:l,currentSnapshot:this.routerState.snapshot,currentRouterState:this.routerState}),l.catch(Promise.reject.bind(Promise))}static \u0275fac=function(i){return new(i||n)};static \u0275prov=Oe({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function fL(n){for(let e=0;e<n.length;e++)if(n[e]==null)throw new Te(4008,!1)}var mL=new Re("");function wy(n,...e){return lo([{provide:ql,multi:!0,useValue:n},[],{provide:bs,useFactory:gL},{provide:Ff,multi:!0,useFactory:vL},e.map(t=>t.\u0275providers)])}function gL(){return ee(bh).routerState.root}function vL(){let n=ee(Ji);return e=>{let t=n.get(Mo);if(e!==t.components[0])return;let i=n.get(bh),r=n.get(_L);n.get(yL)===1&&i.initialNavigation(),n.get(xL,null,{optional:!0})?.setUpPreloading(),n.get(mL,null,{optional:!0})?.init(),i.resetRootComponentType(t.componentTypes[0]),r.closed||(r.next(),r.complete(),r.unsubscribe())}}var _L=new Re("",{factory:()=>new hn}),yL=new Re("",{factory:()=>1});var xL=new Re("");var ET=0,l0=1,bT=2;var bu=1,wT=2,vc=3,Yr=0,xn=1,hr=2,pr=0,Oo=1,u0=2,d0=3,f0=4,TT=5;var Ns=100,CT=101,DT=102,AT=103,IT=104,RT=200,NT=201,PT=202,OT=203,Kh=204,Jh=205,LT=206,FT=207,kT=208,UT=209,BT=210,VT=211,HT=212,zT=213,GT=214,Qh=0,ep=1,tp=2,Lo=3,np=4,ip=5,rp=6,sp=7,h0=0,jT=1,WT=2,$i=0,p0=1,m0=2,g0=3,v0=4,_0=5,y0=6,x0=7;var Ky=300,ks=301,Uo=302,Rp=303,Np=304,wu=306,op=1e3,cr=1001,ap=1002,fn=1003,$T=1004;var Tu=1005;var yn=1006,Pp=1007;var Us=1008;var jn=1009,S0=1010,M0=1011,_c=1012,Op=1013,qi=1014,Xi=1015,mr=1016,Lp=1017,Fp=1018,yc=1020,E0=35902,b0=35899,w0=1021,T0=1022,Ti=1023,lr=1026,Bs=1027,C0=1028,kp=1029,Vs=1030,Up=1031;var Bp=1033,Cu=33776,Du=33777,Au=33778,Iu=33779,Vp=35840,Hp=35841,zp=35842,Gp=35843,jp=36196,Wp=37492,$p=37496,qp=37488,Xp=37489,Ru=37490,Yp=37491,Zp=37808,Kp=37809,Jp=37810,Qp=37811,em=37812,tm=37813,nm=37814,im=37815,rm=37816,sm=37817,om=37818,am=37819,cm=37820,lm=37821,um=36492,dm=36494,fm=36495,hm=36283,pm=36284,Nu=36285,mm=36286;var tu=2300,cp=2301,Zh=2302,Jy=2303,Qy=2400,e0=2401,t0=2402;var qT=3200;var gm=0,XT=1,Jr="",ci="srgb",nu="srgb-linear",iu="linear",pt="srgb";var No=7680;var n0=519,YT=512,ZT=513,KT=514,vm=515,JT=516,QT=517,_m=518,eC=519,lp=35044;var D0="300 es",Wi=2e3,oc=2001;function ML(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function EL(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function ru(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function tC(){let n=ru("canvas");return n.style.display="block",n}var Kw={},ac=null;function su(...n){let e="THREE."+n.shift();ac?ac("log",e,...n):console.log(e,...n)}function nC(n){let e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function De(...n){n=nC(n);let e="THREE."+n.shift();if(ac)ac("warn",e,...n);else{let t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function Ce(...n){n=nC(n);let e="THREE."+n.shift();if(ac)ac("error",e,...n);else{let t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function up(...n){let e=n.join(" ");e in Kw||(Kw[e]=!0,De(...n))}function iC(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}var rC={[Qh]:ep,[tp]:rp,[np]:sp,[Lo]:ip,[ep]:Qh,[rp]:tp,[sp]:np,[ip]:Lo},ur=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){let i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){let i=this._listeners;if(i===void 0)return;let r=i[e];if(r!==void 0){let s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let i=t[e.type];if(i!==void 0){e.target=this;let r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}},Dn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var Ty=Math.PI/180,dp=180/Math.PI;function Rs(){let n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Dn[n&255]+Dn[n>>8&255]+Dn[n>>16&255]+Dn[n>>24&255]+"-"+Dn[e&255]+Dn[e>>8&255]+"-"+Dn[e>>16&15|64]+Dn[e>>24&255]+"-"+Dn[t&63|128]+Dn[t>>8&255]+"-"+Dn[t>>16&255]+Dn[t>>24&255]+Dn[i&255]+Dn[i>>8&255]+Dn[i>>16&255]+Dn[i>>24&255]).toLowerCase()}function rt(n,e,t){return Math.max(e,Math.min(t,n))}function bL(n,e){return(n%e+e)%e}function Cy(n,e,t){return(1-t)*n+t*e}function ar(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function St(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}var We=class n{static{n.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=rt(this.x,e.x,t.x),this.y=rt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=rt(this.x,e,t),this.y=rt(this.y,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(rt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(rt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},dr=class{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,o,a){let c=i[r+0],l=i[r+1],u=i[r+2],d=i[r+3],f=s[o+0],h=s[o+1],m=s[o+2],v=s[o+3];if(d!==v||c!==f||l!==h||u!==m){let p=c*f+l*h+u*m+d*v;p<0&&(f=-f,h=-h,m=-m,v=-v,p=-p);let g=1-a;if(p<.9995){let x=Math.acos(p),M=Math.sin(x);g=Math.sin(g*x)/M,a=Math.sin(a*x)/M,c=c*g+f*a,l=l*g+h*a,u=u*g+m*a,d=d*g+v*a}else{c=c*g+f*a,l=l*g+h*a,u=u*g+m*a,d=d*g+v*a;let x=1/Math.sqrt(c*c+l*l+u*u+d*d);c*=x,l*=x,u*=x,d*=x}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,r,s,o){let a=i[r],c=i[r+1],l=i[r+2],u=i[r+3],d=s[o],f=s[o+1],h=s[o+2],m=s[o+3];return e[t]=a*m+u*d+c*h-l*f,e[t+1]=c*m+u*f+l*d-a*h,e[t+2]=l*m+u*h+a*f-c*d,e[t+3]=u*m-a*d-c*f-l*h,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(i/2),u=a(r/2),d=a(s/2),f=c(i/2),h=c(r/2),m=c(s/2);switch(o){case"XYZ":this._x=f*u*d+l*h*m,this._y=l*h*d-f*u*m,this._z=l*u*m+f*h*d,this._w=l*u*d-f*h*m;break;case"YXZ":this._x=f*u*d+l*h*m,this._y=l*h*d-f*u*m,this._z=l*u*m-f*h*d,this._w=l*u*d+f*h*m;break;case"ZXY":this._x=f*u*d-l*h*m,this._y=l*h*d+f*u*m,this._z=l*u*m+f*h*d,this._w=l*u*d-f*h*m;break;case"ZYX":this._x=f*u*d-l*h*m,this._y=l*h*d+f*u*m,this._z=l*u*m-f*h*d,this._w=l*u*d+f*h*m;break;case"YZX":this._x=f*u*d+l*h*m,this._y=l*h*d+f*u*m,this._z=l*u*m-f*h*d,this._w=l*u*d-f*h*m;break;case"XZY":this._x=f*u*d-l*h*m,this._y=l*h*d-f*u*m,this._z=l*u*m+f*h*d,this._w=l*u*d+f*h*m;break;default:De("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,i=t[0],r=t[4],s=t[8],o=t[1],a=t[5],c=t[9],l=t[2],u=t[6],d=t[10],f=i+a+d;if(f>0){let h=.5/Math.sqrt(f+1);this._w=.25/h,this._x=(u-c)*h,this._y=(s-l)*h,this._z=(o-r)*h}else if(i>a&&i>d){let h=2*Math.sqrt(1+i-a-d);this._w=(u-c)/h,this._x=.25*h,this._y=(r+o)/h,this._z=(s+l)/h}else if(a>d){let h=2*Math.sqrt(1+a-i-d);this._w=(s-l)/h,this._x=(r+o)/h,this._y=.25*h,this._z=(c+u)/h}else{let h=2*Math.sqrt(1+d-i-a);this._w=(o-r)/h,this._x=(s+l)/h,this._y=(c+u)/h,this._z=.25*h}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(rt(this.dot(e),-1,1)))}rotateTowards(e,t){let i=this.angleTo(e);if(i===0)return this;let r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let i=e._x,r=e._y,s=e._z,o=e._w,a=t._x,c=t._y,l=t._z,u=t._w;return this._x=i*u+o*a+r*l-s*c,this._y=r*u+o*c+s*a-i*l,this._z=s*u+o*l+i*c-r*a,this._w=o*u-i*a-r*c-s*l,this._onChangeCallback(),this}slerp(e,t){let i=e._x,r=e._y,s=e._z,o=e._w,a=this.dot(e);a<0&&(i=-i,r=-r,s=-s,o=-o,a=-a);let c=1-t;if(a<.9995){let l=Math.acos(a),u=Math.sin(l);c=Math.sin(c*l)/u,t=Math.sin(t*l)/u,this._x=this._x*c+i*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+o*t,this._onChangeCallback()}else this._x=this._x*c+i*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+o*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},U=class n{static{n.prototype.isVector3=!0}constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Jw.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Jw.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){let t=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*r-a*i),u=2*(a*t-s*r),d=2*(s*i-o*t);return this.x=t+c*l+o*d-a*u,this.y=i+c*u+a*l-s*d,this.z=r+c*d+s*u-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=rt(this.x,e.x,t.x),this.y=rt(this.y,e.y,t.y),this.z=rt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=rt(this.x,e,t),this.y=rt(this.y,e,t),this.z=rt(this.z,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(rt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let i=e.x,r=e.y,s=e.z,o=t.x,a=t.y,c=t.z;return this.x=r*c-s*a,this.y=s*o-i*c,this.z=i*a-r*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Dy.copy(this).projectOnVector(e),this.sub(Dy)}reflect(e){return this.sub(Dy.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(rt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){let r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Dy=new U,Jw=new dr,Be=class n{static{n.prototype.isMatrix3=!0}constructor(e,t,i,r,s,o,a,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,c,l)}set(e,t,i,r,s,o,a,c,l){let u=this.elements;return u[0]=e,u[1]=r,u[2]=a,u[3]=t,u[4]=s,u[5]=c,u[6]=i,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[3],c=i[6],l=i[1],u=i[4],d=i[7],f=i[2],h=i[5],m=i[8],v=r[0],p=r[3],g=r[6],x=r[1],M=r[4],E=r[7],C=r[2],T=r[5],D=r[8];return s[0]=o*v+a*x+c*C,s[3]=o*p+a*M+c*T,s[6]=o*g+a*E+c*D,s[1]=l*v+u*x+d*C,s[4]=l*p+u*M+d*T,s[7]=l*g+u*E+d*D,s[2]=f*v+h*x+m*C,s[5]=f*p+h*M+m*T,s[8]=f*g+h*E+m*D,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8];return t*o*u-t*a*l-i*s*u+i*a*c+r*s*l-r*o*c}invert(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],d=u*o-a*l,f=a*c-u*s,h=l*s-o*c,m=t*d+i*f+r*h;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let v=1/m;return e[0]=d*v,e[1]=(r*l-u*i)*v,e[2]=(a*i-r*o)*v,e[3]=f*v,e[4]=(u*t-r*c)*v,e[5]=(r*s-a*t)*v,e[6]=h*v,e[7]=(i*c-l*t)*v,e[8]=(o*t-i*s)*v,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,o,a){let c=Math.cos(s),l=Math.sin(s);return this.set(i*c,i*l,-i*(c*o+l*a)+o+e,-r*l,r*c,-r*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Ay.makeScale(e,t)),this}rotate(e){return this.premultiply(Ay.makeRotation(-e)),this}translate(e,t){return this.premultiply(Ay.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Ay=new Be,Qw=new Be().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),eT=new Be().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function wL(){let n={enabled:!0,workingColorSpace:nu,spaces:{},convert:function(r,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===pt&&(r.r=Xr(r.r),r.g=Xr(r.g),r.b=Xr(r.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===pt&&(r.r=sc(r.r),r.g=sc(r.g),r.b=sc(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Jr?iu:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,o){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return up("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return up("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[nu]:{primaries:e,whitePoint:i,transfer:iu,toXYZ:Qw,fromXYZ:eT,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:ci},outputColorSpaceConfig:{drawingBufferColorSpace:ci}},[ci]:{primaries:e,whitePoint:i,transfer:pt,toXYZ:Qw,fromXYZ:eT,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:ci}}}),n}var nt=wL();function Xr(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function sc(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var Ga,fp=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Ga===void 0&&(Ga=ru("canvas")),Ga.width=e.width,Ga.height=e.height;let r=Ga.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=Ga}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=ru("canvas");t.width=e.width,t.height=e.height;let i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);let r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=Xr(s[o]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){let t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Xr(t[i]/255)*255):t[i]=Xr(t[i]);return{data:t,width:e.width,height:e.height}}else return De("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},TL=0,cc=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:TL++}),this.uuid=Rs(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(Iy(r[o].image)):s.push(Iy(r[o]))}else s=Iy(r);i.url=s}return t||(e.images[this.uuid]=i),i}};function Iy(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?fp.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(De("Texture: Unable to serialize Texture."),{})}var CL=0,Ry=new U,gr=(()=>{class n extends ur{constructor(t=n.DEFAULT_IMAGE,i=n.DEFAULT_MAPPING,r=cr,s=cr,o=yn,a=Us,c=Ti,l=jn,u=n.DEFAULT_ANISOTROPY,d=Jr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:CL++}),this.uuid=Rs(),this.name="",this.source=new cc(t),this.mipmaps=[],this.mapping=i,this.channel=0,this.wrapS=r,this.wrapT=s,this.magFilter=o,this.minFilter=a,this.anisotropy=u,this.format=c,this.internalFormat=null,this.type=l,this.offset=new We(0,0),this.repeat=new We(1,1),this.center=new We(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Be,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Ry).x}get height(){return this.source.getSize(Ry).y}get depth(){return this.source.getSize(Ry).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,i){this.updateRanges.push({start:t,count:i})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let i in t){let r=t[i];if(r===void 0){De(`Texture.setValues(): parameter '${i}' has value of undefined.`);continue}let s=this[i];if(s===void 0){De(`Texture.setValues(): property '${i}' does not exist.`);continue}s&&r&&s.isVector2&&r.isVector2||s&&r&&s.isVector3&&r.isVector3||s&&r&&s.isMatrix3&&r.isMatrix3?s.copy(r):this[i]=r}}toJSON(t){let i=t===void 0||typeof t=="string";if(!i&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let r={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(r.userData=this.userData),i||(t.textures[this.uuid]=r),r}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Ky)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case op:t.x=t.x-Math.floor(t.x);break;case cr:t.x=t.x<0?0:1;break;case ap:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case op:t.y=t.y-Math.floor(t.y);break;case cr:t.y=t.y<0?0:1;break;case ap:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}return n.DEFAULT_IMAGE=null,n.DEFAULT_MAPPING=Ky,n.DEFAULT_ANISOTROPY=1,n})(),Pt=class n{static{n.prototype.isVector4=!0}constructor(e=0,t=0,i=0,r=1){this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*i+o[11]*r+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s,c=e.elements,l=c[0],u=c[4],d=c[8],f=c[1],h=c[5],m=c[9],v=c[2],p=c[6],g=c[10];if(Math.abs(u-f)<.01&&Math.abs(d-v)<.01&&Math.abs(m-p)<.01){if(Math.abs(u+f)<.1&&Math.abs(d+v)<.1&&Math.abs(m+p)<.1&&Math.abs(l+h+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let M=(l+1)/2,E=(h+1)/2,C=(g+1)/2,T=(u+f)/4,D=(d+v)/4,_=(m+p)/4;return M>E&&M>C?M<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(M),r=T/i,s=D/i):E>C?E<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(E),i=T/r,s=_/r):C<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(C),i=D/s,r=_/s),this.set(i,r,s,t),this}let x=Math.sqrt((p-m)*(p-m)+(d-v)*(d-v)+(f-u)*(f-u));return Math.abs(x)<.001&&(x=1),this.x=(p-m)/x,this.y=(d-v)/x,this.z=(f-u)/x,this.w=Math.acos((l+h+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=rt(this.x,e.x,t.x),this.y=rt(this.y,e.y,t.y),this.z=rt(this.z,e.z,t.z),this.w=rt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=rt(this.x,e,t),this.y=rt(this.y,e,t),this.z=rt(this.z,e,t),this.w=rt(this.w,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(rt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},hp=class extends ur{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:yn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new Pt(0,0,e,t),this.scissorTest=!1,this.viewport=new Pt(0,0,e,t),this.textures=[];let r={width:e,height:t,depth:i.depth},s=new gr(r),o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){let t={minFilter:yn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let r=Object.assign({},e.textures[t].image);this.textures[t].source=new cc(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this}dispose(){this.dispatchEvent({type:"dispose"})}},li=class extends hp{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}},ou=class extends gr{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=fn,this.minFilter=fn,this.wrapR=cr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var pp=class extends gr{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=fn,this.minFilter=fn,this.wrapR=cr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var At=class n{static{n.prototype.isMatrix4=!0}constructor(e,t,i,r,s,o,a,c,l,u,d,f,h,m,v,p){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,c,l,u,d,f,h,m,v,p)}set(e,t,i,r,s,o,a,c,l,u,d,f,h,m,v,p){let g=this.elements;return g[0]=e,g[4]=t,g[8]=i,g[12]=r,g[1]=s,g[5]=o,g[9]=a,g[13]=c,g[2]=l,g[6]=u,g[10]=d,g[14]=f,g[3]=h,g[7]=m,g[11]=v,g[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){let t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();let t=this.elements,i=e.elements,r=1/ja.setFromMatrixColumn(e,0).length(),s=1/ja.setFromMatrixColumn(e,1).length(),o=1/ja.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),c=Math.cos(r),l=Math.sin(r),u=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){let f=o*u,h=o*d,m=a*u,v=a*d;t[0]=c*u,t[4]=-c*d,t[8]=l,t[1]=h+m*l,t[5]=f-v*l,t[9]=-a*c,t[2]=v-f*l,t[6]=m+h*l,t[10]=o*c}else if(e.order==="YXZ"){let f=c*u,h=c*d,m=l*u,v=l*d;t[0]=f+v*a,t[4]=m*a-h,t[8]=o*l,t[1]=o*d,t[5]=o*u,t[9]=-a,t[2]=h*a-m,t[6]=v+f*a,t[10]=o*c}else if(e.order==="ZXY"){let f=c*u,h=c*d,m=l*u,v=l*d;t[0]=f-v*a,t[4]=-o*d,t[8]=m+h*a,t[1]=h+m*a,t[5]=o*u,t[9]=v-f*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){let f=o*u,h=o*d,m=a*u,v=a*d;t[0]=c*u,t[4]=m*l-h,t[8]=f*l+v,t[1]=c*d,t[5]=v*l+f,t[9]=h*l-m,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){let f=o*c,h=o*l,m=a*c,v=a*l;t[0]=c*u,t[4]=v-f*d,t[8]=m*d+h,t[1]=d,t[5]=o*u,t[9]=-a*u,t[2]=-l*u,t[6]=h*d+m,t[10]=f-v*d}else if(e.order==="XZY"){let f=o*c,h=o*l,m=a*c,v=a*l;t[0]=c*u,t[4]=-d,t[8]=l*u,t[1]=f*d+v,t[5]=o*u,t[9]=h*d-m,t[2]=m*d-h,t[6]=a*u,t[10]=v*d+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(DL,e,AL)}lookAt(e,t,i){let r=this.elements;return oi.subVectors(e,t),oi.lengthSq()===0&&(oi.z=1),oi.normalize(),ws.crossVectors(i,oi),ws.lengthSq()===0&&(Math.abs(i.z)===1?oi.x+=1e-4:oi.z+=1e-4,oi.normalize(),ws.crossVectors(i,oi)),ws.normalize(),wh.crossVectors(oi,ws),r[0]=ws.x,r[4]=wh.x,r[8]=oi.x,r[1]=ws.y,r[5]=wh.y,r[9]=oi.y,r[2]=ws.z,r[6]=wh.z,r[10]=oi.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[4],c=i[8],l=i[12],u=i[1],d=i[5],f=i[9],h=i[13],m=i[2],v=i[6],p=i[10],g=i[14],x=i[3],M=i[7],E=i[11],C=i[15],T=r[0],D=r[4],_=r[8],b=r[12],I=r[1],A=r[5],L=r[9],z=r[13],j=r[2],N=r[6],B=r[10],F=r[14],Z=r[3],Q=r[7],ce=r[11],ge=r[15];return s[0]=o*T+a*I+c*j+l*Z,s[4]=o*D+a*A+c*N+l*Q,s[8]=o*_+a*L+c*B+l*ce,s[12]=o*b+a*z+c*F+l*ge,s[1]=u*T+d*I+f*j+h*Z,s[5]=u*D+d*A+f*N+h*Q,s[9]=u*_+d*L+f*B+h*ce,s[13]=u*b+d*z+f*F+h*ge,s[2]=m*T+v*I+p*j+g*Z,s[6]=m*D+v*A+p*N+g*Q,s[10]=m*_+v*L+p*B+g*ce,s[14]=m*b+v*z+p*F+g*ge,s[3]=x*T+M*I+E*j+C*Z,s[7]=x*D+M*A+E*N+C*Q,s[11]=x*_+M*L+E*B+C*ce,s[15]=x*b+M*z+E*F+C*ge,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],c=e[9],l=e[13],u=e[2],d=e[6],f=e[10],h=e[14],m=e[3],v=e[7],p=e[11],g=e[15],x=c*h-l*f,M=a*h-l*d,E=a*f-c*d,C=o*h-l*u,T=o*f-c*u,D=o*d-a*u;return t*(v*x-p*M+g*E)-i*(m*x-p*C+g*T)+r*(m*M-v*C+g*D)-s*(m*E-v*T+p*D)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],u=e[8],d=e[9],f=e[10],h=e[11],m=e[12],v=e[13],p=e[14],g=e[15],x=t*a-i*o,M=t*c-r*o,E=t*l-s*o,C=i*c-r*a,T=i*l-s*a,D=r*l-s*c,_=u*v-d*m,b=u*p-f*m,I=u*g-h*m,A=d*p-f*v,L=d*g-h*v,z=f*g-h*p,j=x*z-M*L+E*A+C*I-T*b+D*_;if(j===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let N=1/j;return e[0]=(a*z-c*L+l*A)*N,e[1]=(r*L-i*z-s*A)*N,e[2]=(v*D-p*T+g*C)*N,e[3]=(f*T-d*D-h*C)*N,e[4]=(c*I-o*z-l*b)*N,e[5]=(t*z-r*I+s*b)*N,e[6]=(p*E-m*D-g*M)*N,e[7]=(u*D-f*E+h*M)*N,e[8]=(o*L-a*I+l*_)*N,e[9]=(i*I-t*L-s*_)*N,e[10]=(m*T-v*E+g*x)*N,e[11]=(d*E-u*T-h*x)*N,e[12]=(a*b-o*A-c*_)*N,e[13]=(t*A-i*b+r*_)*N,e[14]=(v*M-m*C-p*x)*N,e[15]=(u*C-d*M+f*x)*N,this}scale(e){let t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let i=Math.cos(t),r=Math.sin(t),s=1-i,o=e.x,a=e.y,c=e.z,l=s*o,u=s*a;return this.set(l*o+i,l*a-r*c,l*c+r*a,0,l*a+r*c,u*a+i,u*c-r*o,0,l*c-r*a,u*c+r*o,s*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){let r=this.elements,s=t._x,o=t._y,a=t._z,c=t._w,l=s+s,u=o+o,d=a+a,f=s*l,h=s*u,m=s*d,v=o*u,p=o*d,g=a*d,x=c*l,M=c*u,E=c*d,C=i.x,T=i.y,D=i.z;return r[0]=(1-(v+g))*C,r[1]=(h+E)*C,r[2]=(m-M)*C,r[3]=0,r[4]=(h-E)*T,r[5]=(1-(f+g))*T,r[6]=(p+x)*T,r[7]=0,r[8]=(m+M)*D,r[9]=(p-x)*D,r[10]=(1-(f+v))*D,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let s=this.determinant();if(s===0)return i.set(1,1,1),t.identity(),this;let o=ja.set(r[0],r[1],r[2]).length(),a=ja.set(r[4],r[5],r[6]).length(),c=ja.set(r[8],r[9],r[10]).length();s<0&&(o=-o),zi.copy(this);let l=1/o,u=1/a,d=1/c;return zi.elements[0]*=l,zi.elements[1]*=l,zi.elements[2]*=l,zi.elements[4]*=u,zi.elements[5]*=u,zi.elements[6]*=u,zi.elements[8]*=d,zi.elements[9]*=d,zi.elements[10]*=d,t.setFromRotationMatrix(zi),i.x=o,i.y=a,i.z=c,this}makePerspective(e,t,i,r,s,o,a=Wi,c=!1){let l=this.elements,u=2*s/(t-e),d=2*s/(i-r),f=(t+e)/(t-e),h=(i+r)/(i-r),m,v;if(c)m=s/(o-s),v=o*s/(o-s);else if(a===Wi)m=-(o+s)/(o-s),v=-2*o*s/(o-s);else if(a===oc)m=-o/(o-s),v=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=d,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,r,s,o,a=Wi,c=!1){let l=this.elements,u=2/(t-e),d=2/(i-r),f=-(t+e)/(t-e),h=-(i+r)/(i-r),m,v;if(c)m=1/(o-s),v=o/(o-s);else if(a===Wi)m=-2/(o-s),v=-(o+s)/(o-s);else if(a===oc)m=-1/(o-s),v=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=0,l[12]=f,l[1]=0,l[5]=d,l[9]=0,l[13]=h,l[2]=0,l[6]=0,l[10]=m,l[14]=v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}},ja=new U,zi=new At,DL=new U(0,0,0),AL=new U(1,1,1),ws=new U,wh=new U,oi=new U,tT=new At,nT=new dr,lc=(()=>{class n{constructor(t=0,i=0,r=0,s=n.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=i,this._z=r,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,i,r,s=this._order){return this._x=t,this._y=i,this._z=r,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,i=this._order,r=!0){let s=t.elements,o=s[0],a=s[4],c=s[8],l=s[1],u=s[5],d=s[9],f=s[2],h=s[6],m=s[10];switch(i){case"XYZ":this._y=Math.asin(rt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-d,m),this._z=Math.atan2(-a,o)):(this._x=Math.atan2(h,u),this._z=0);break;case"YXZ":this._x=Math.asin(-rt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(c,m),this._z=Math.atan2(l,u)):(this._y=Math.atan2(-f,o),this._z=0);break;case"ZXY":this._x=Math.asin(rt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,m),this._z=Math.atan2(-a,u)):(this._y=0,this._z=Math.atan2(l,o));break;case"ZYX":this._y=Math.asin(-rt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,m),this._z=Math.atan2(l,o)):(this._x=0,this._z=Math.atan2(-a,u));break;case"YZX":this._z=Math.asin(rt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,u),this._y=Math.atan2(-f,o)):(this._x=0,this._y=Math.atan2(c,m));break;case"XZY":this._z=Math.asin(-rt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,u),this._y=Math.atan2(c,o)):(this._x=Math.atan2(-d,m),this._y=0);break;default:De("Euler: .setFromRotationMatrix() encountered an unknown order: "+i)}return this._order=i,r===!0&&this._onChangeCallback(),this}setFromQuaternion(t,i,r){return tT.makeRotationFromQuaternion(t),this.setFromRotationMatrix(tT,i,r)}setFromVector3(t,i=this._order){return this.set(t.x,t.y,t.z,i)}reorder(t){return nT.setFromEuler(this),this.setFromQuaternion(nT,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],i=0){return t[i]=this._x,t[i+1]=this._y,t[i+2]=this._z,t[i+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}return n.DEFAULT_ORDER="XYZ",n})(),uc=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},IL=0,iT=new U,Wa=new dr,zr=new At,Th=new U,Xl=new U,RL=new U,NL=new dr,rT=new U(1,0,0),sT=new U(0,1,0),oT=new U(0,0,1),aT={type:"added"},PL={type:"removed"},$a={type:"childadded",child:null},Ny={type:"childremoved",child:null},vr=(()=>{class n extends ur{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:IL++}),this.uuid=Rs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let t=new U,i=new lc,r=new dr,s=new U(1,1,1);function o(){r.setFromEuler(i,!1)}function a(){i.setFromQuaternion(r,void 0,!1)}i._onChange(o),r._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:i},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new At},normalMatrix:{value:new Be}}),this.matrix=new At,this.matrixWorld=new At,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new uc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,i){this.quaternion.setFromAxisAngle(t,i)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,i){return Wa.setFromAxisAngle(t,i),this.quaternion.multiply(Wa),this}rotateOnWorldAxis(t,i){return Wa.setFromAxisAngle(t,i),this.quaternion.premultiply(Wa),this}rotateX(t){return this.rotateOnAxis(rT,t)}rotateY(t){return this.rotateOnAxis(sT,t)}rotateZ(t){return this.rotateOnAxis(oT,t)}translateOnAxis(t,i){return iT.copy(t).applyQuaternion(this.quaternion),this.position.add(iT.multiplyScalar(i)),this}translateX(t){return this.translateOnAxis(rT,t)}translateY(t){return this.translateOnAxis(sT,t)}translateZ(t){return this.translateOnAxis(oT,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(zr.copy(this.matrixWorld).invert())}lookAt(t,i,r){t.isVector3?Th.copy(t):Th.set(t,i,r);let s=this.parent;this.updateWorldMatrix(!0,!1),Xl.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?zr.lookAt(Xl,Th,this.up):zr.lookAt(Th,Xl,this.up),this.quaternion.setFromRotationMatrix(zr),s&&(zr.extractRotation(s.matrixWorld),Wa.setFromRotationMatrix(zr),this.quaternion.premultiply(Wa.invert()))}add(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.add(arguments[i]);return this}return t===this?(Ce("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(aT),$a.child=t,this.dispatchEvent($a),$a.child=null):Ce("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let r=0;r<arguments.length;r++)this.remove(arguments[r]);return this}let i=this.children.indexOf(t);return i!==-1&&(t.parent=null,this.children.splice(i,1),t.dispatchEvent(PL),Ny.child=t,this.dispatchEvent(Ny),Ny.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),zr.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),zr.multiply(t.parent.matrixWorld)),t.applyMatrix4(zr),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(aT),$a.child=t,this.dispatchEvent($a),$a.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,i){if(this[t]===i)return this;for(let r=0,s=this.children.length;r<s;r++){let a=this.children[r].getObjectByProperty(t,i);if(a!==void 0)return a}}getObjectsByProperty(t,i,r=[]){this[t]===i&&r.push(this);let s=this.children;for(let o=0,a=s.length;o<a;o++)s[o].getObjectsByProperty(t,i,r);return r}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Xl,t,RL),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Xl,NL,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let i=this.matrixWorld.elements;return t.set(i[8],i[9],i[10]).normalize()}raycast(){}traverse(t){t(this);let i=this.children;for(let r=0,s=i.length;r<s;r++)i[r].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let i=this.children;for(let r=0,s=i.length;r<s;r++)i[r].traverseVisible(t)}traverseAncestors(t){let i=this.parent;i!==null&&(t(i),i.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let i=t.x,r=t.y,s=t.z,o=this.matrix.elements;o[12]+=i-o[0]*i-o[4]*r-o[8]*s,o[13]+=r-o[1]*i-o[5]*r-o[9]*s,o[14]+=s-o[2]*i-o[6]*r-o[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let i=this.children;for(let r=0,s=i.length;r<s;r++)i[r].updateMatrixWorld(t)}updateWorldMatrix(t,i){let r=this.parent;if(t===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),i===!0){let s=this.children;for(let o=0,a=s.length;o<a;o++)s[o].updateWorldMatrix(!1,!0)}}toJSON(t){let i=t===void 0||typeof t=="string",r={};i&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},r.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(c=>_t(_e({},c),{boundingBox:c.boundingBox?c.boundingBox.toJSON():void 0,boundingSphere:c.boundingSphere?c.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(c=>_e({},c)),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function o(c,l){return c[l.uuid]===void 0&&(c[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=o(t.geometries,this.geometry);let c=this.geometry.parameters;if(c!==void 0&&c.shapes!==void 0){let l=c.shapes;if(Array.isArray(l))for(let u=0,d=l.length;u<d;u++){let f=l[u];o(t.shapes,f)}else o(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(o(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let c=[];for(let l=0,u=this.material.length;l<u;l++)c.push(o(t.materials,this.material[l]));s.material=c}else s.material=o(t.materials,this.material);if(this.children.length>0){s.children=[];for(let c=0;c<this.children.length;c++)s.children.push(this.children[c].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let c=0;c<this.animations.length;c++){let l=this.animations[c];s.animations.push(o(t.animations,l))}}if(i){let c=a(t.geometries),l=a(t.materials),u=a(t.textures),d=a(t.images),f=a(t.shapes),h=a(t.skeletons),m=a(t.animations),v=a(t.nodes);c.length>0&&(r.geometries=c),l.length>0&&(r.materials=l),u.length>0&&(r.textures=u),d.length>0&&(r.images=d),f.length>0&&(r.shapes=f),h.length>0&&(r.skeletons=h),m.length>0&&(r.animations=m),v.length>0&&(r.nodes=v)}return r.object=s,r;function a(c){let l=[];for(let u in c){let d=c[u];delete d.metadata,l.push(d)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,i=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),i===!0)for(let r=0;r<t.children.length;r++){let s=t.children[r];this.add(s.clone())}return this}}return n.DEFAULT_UP=new U(0,1,0),n.DEFAULT_MATRIX_AUTO_UPDATE=!0,n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0,n})(),Po=class extends vr{constructor(){super(),this.isGroup=!0,this.type="Group"}},OL={type:"move"},dc=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Po,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Po,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Po,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(let v of e.hand.values()){let p=t.getJointPose(v,i),g=this._getHandJoint(l,v);p!==null&&(g.matrix.fromArray(p.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=p.radius),g.visible=p!==null}let u=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],f=u.position.distanceTo(d.position),h=.02,m=.005;l.inputState.pinching&&f>h+m?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=h-m&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));a!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(OL)))}return a!==null&&(a.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let i=new Po;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}},sC={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ts={h:0,s:0,l:0},Ch={h:0,s:0,l:0};function Py(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}var it=class{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=ci){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,nt.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=nt.workingColorSpace){return this.r=e,this.g=t,this.b=i,nt.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=nt.workingColorSpace){if(e=bL(e,1),t=rt(t,0,1),i=rt(i,0,1),t===0)this.r=this.g=this.b=i;else{let s=i<=.5?i*(1+t):i+t-i*t,o=2*i-s;this.r=Py(o,s,e+1/3),this.g=Py(o,s,e),this.b=Py(o,s,e-1/3)}return nt.colorSpaceToWorking(this,r),this}setStyle(e,t=ci){function i(s){s!==void 0&&parseFloat(s)<1&&De("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:De("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);De("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=ci){let i=sC[e.toLowerCase()];return i!==void 0?this.setHex(i,t):De("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Xr(e.r),this.g=Xr(e.g),this.b=Xr(e.b),this}copyLinearToSRGB(e){return this.r=sc(e.r),this.g=sc(e.g),this.b=sc(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ci){return nt.workingToColorSpace(An.copy(this),e),Math.round(rt(An.r*255,0,255))*65536+Math.round(rt(An.g*255,0,255))*256+Math.round(rt(An.b*255,0,255))}getHexString(e=ci){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=nt.workingColorSpace){nt.workingToColorSpace(An.copy(this),t);let i=An.r,r=An.g,s=An.b,o=Math.max(i,r,s),a=Math.min(i,r,s),c,l,u=(a+o)/2;if(a===o)c=0,l=0;else{let d=o-a;switch(l=u<=.5?d/(o+a):d/(2-o-a),o){case i:c=(r-s)/d+(r<s?6:0);break;case r:c=(s-i)/d+2;break;case s:c=(i-r)/d+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=nt.workingColorSpace){return nt.workingToColorSpace(An.copy(this),t),e.r=An.r,e.g=An.g,e.b=An.b,e}getStyle(e=ci){nt.workingToColorSpace(An.copy(this),e);let t=An.r,i=An.g,r=An.b;return e!==ci?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(Ts),this.setHSL(Ts.h+e,Ts.s+t,Ts.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Ts),e.getHSL(Ch);let i=Cy(Ts.h,Ch.h,t),r=Cy(Ts.s,Ch.s,t),s=Cy(Ts.l,Ch.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},An=new it;it.NAMES=sC;var au=class extends vr{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new lc,this.environmentIntensity=1,this.environmentRotation=new lc,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},Gi=new U,Gr=new U,Oy=new U,jr=new U,qa=new U,Xa=new U,cT=new U,Ly=new U,Fy=new U,ky=new U,Uy=new Pt,By=new Pt,Vy=new Pt,qr=class n{constructor(e=new U,t=new U,i=new U){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),Gi.subVectors(e,t),r.cross(Gi);let s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){Gi.subVectors(r,t),Gr.subVectors(i,t),Oy.subVectors(e,t);let o=Gi.dot(Gi),a=Gi.dot(Gr),c=Gi.dot(Oy),l=Gr.dot(Gr),u=Gr.dot(Oy),d=o*l-a*a;if(d===0)return s.set(0,0,0),null;let f=1/d,h=(l*c-a*u)*f,m=(o*u-a*c)*f;return s.set(1-h-m,m,h)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,jr)===null?!1:jr.x>=0&&jr.y>=0&&jr.x+jr.y<=1}static getInterpolation(e,t,i,r,s,o,a,c){return this.getBarycoord(e,t,i,r,jr)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,jr.x),c.addScaledVector(o,jr.y),c.addScaledVector(a,jr.z),c)}static getInterpolatedAttribute(e,t,i,r,s,o){return Uy.setScalar(0),By.setScalar(0),Vy.setScalar(0),Uy.fromBufferAttribute(e,t),By.fromBufferAttribute(e,i),Vy.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(Uy,s.x),o.addScaledVector(By,s.y),o.addScaledVector(Vy,s.z),o}static isFrontFacing(e,t,i,r){return Gi.subVectors(i,t),Gr.subVectors(e,t),Gi.cross(Gr).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Gi.subVectors(this.c,this.b),Gr.subVectors(this.a,this.b),Gi.cross(Gr).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return n.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return n.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let i=this.a,r=this.b,s=this.c,o,a;qa.subVectors(r,i),Xa.subVectors(s,i),Ly.subVectors(e,i);let c=qa.dot(Ly),l=Xa.dot(Ly);if(c<=0&&l<=0)return t.copy(i);Fy.subVectors(e,r);let u=qa.dot(Fy),d=Xa.dot(Fy);if(u>=0&&d<=u)return t.copy(r);let f=c*d-u*l;if(f<=0&&c>=0&&u<=0)return o=c/(c-u),t.copy(i).addScaledVector(qa,o);ky.subVectors(e,s);let h=qa.dot(ky),m=Xa.dot(ky);if(m>=0&&h<=m)return t.copy(s);let v=h*l-c*m;if(v<=0&&l>=0&&m<=0)return a=l/(l-m),t.copy(i).addScaledVector(Xa,a);let p=u*m-h*d;if(p<=0&&d-u>=0&&h-m>=0)return cT.subVectors(s,r),a=(d-u)/(d-u+(h-m)),t.copy(r).addScaledVector(cT,a);let g=1/(p+v+f);return o=v*g,a=f*g,t.copy(i).addScaledVector(qa,o).addScaledVector(Xa,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Ps=class{constructor(e=new U(1/0,1/0,1/0),t=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(ji.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(ji.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=ji.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let i=e.geometry;if(i!==void 0){let s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,ji):ji.fromBufferAttribute(s,o),ji.applyMatrix4(e.matrixWorld),this.expandByPoint(ji);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Dh.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Dh.copy(i.boundingBox)),Dh.applyMatrix4(e.matrixWorld),this.union(Dh)}let r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,ji),ji.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Yl),Ah.subVectors(this.max,Yl),Ya.subVectors(e.a,Yl),Za.subVectors(e.b,Yl),Ka.subVectors(e.c,Yl),Cs.subVectors(Za,Ya),Ds.subVectors(Ka,Za),Do.subVectors(Ya,Ka);let t=[0,-Cs.z,Cs.y,0,-Ds.z,Ds.y,0,-Do.z,Do.y,Cs.z,0,-Cs.x,Ds.z,0,-Ds.x,Do.z,0,-Do.x,-Cs.y,Cs.x,0,-Ds.y,Ds.x,0,-Do.y,Do.x,0];return!Hy(t,Ya,Za,Ka,Ah)||(t=[1,0,0,0,1,0,0,0,1],!Hy(t,Ya,Za,Ka,Ah))?!1:(Ih.crossVectors(Cs,Ds),t=[Ih.x,Ih.y,Ih.z],Hy(t,Ya,Za,Ka,Ah))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ji).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ji).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Wr[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Wr[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Wr[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Wr[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Wr[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Wr[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Wr[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Wr[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Wr),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Wr=[new U,new U,new U,new U,new U,new U,new U,new U],ji=new U,Dh=new Ps,Ya=new U,Za=new U,Ka=new U,Cs=new U,Ds=new U,Do=new U,Yl=new U,Ah=new U,Ih=new U,Ao=new U;function Hy(n,e,t,i,r){for(let s=0,o=n.length-3;s<=o;s+=3){Ao.fromArray(n,s);let a=r.x*Math.abs(Ao.x)+r.y*Math.abs(Ao.y)+r.z*Math.abs(Ao.z),c=e.dot(Ao),l=t.dot(Ao),u=i.dot(Ao);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}var Jt=new U,Rh=new We,LL=0,In=class extends ur{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:LL++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=lp,this.updateRanges=[],this.gpuType=Xi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Rh.fromBufferAttribute(this,t),Rh.applyMatrix3(e),this.setXY(t,Rh.x,Rh.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Jt.fromBufferAttribute(this,t),Jt.applyMatrix3(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Jt.fromBufferAttribute(this,t),Jt.applyMatrix4(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Jt.fromBufferAttribute(this,t),Jt.applyNormalMatrix(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Jt.fromBufferAttribute(this,t),Jt.transformDirection(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=ar(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=St(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ar(t,this.array)),t}setX(e,t){return this.normalized&&(t=St(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ar(t,this.array)),t}setY(e,t){return this.normalized&&(t=St(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ar(t,this.array)),t}setZ(e,t){return this.normalized&&(t=St(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ar(t,this.array)),t}setW(e,t){return this.normalized&&(t=St(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=St(t,this.array),i=St(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=St(t,this.array),i=St(i,this.array),r=St(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=St(t,this.array),i=St(i,this.array),r=St(r,this.array),s=St(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==lp&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}};var cu=class extends In{constructor(e,t,i){super(new Uint16Array(e),t,i)}};var lu=class extends In{constructor(e,t,i){super(new Uint32Array(e),t,i)}};var wi=class extends In{constructor(e,t,i){super(new Float32Array(e),t,i)}},FL=new Ps,Zl=new U,zy=new U,Fo=class{constructor(e=new U,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let i=this.center;t!==void 0?i.copy(t):FL.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Zl.subVectors(e,this.center);let t=Zl.lengthSq();if(t>this.radius*this.radius){let i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(Zl,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(zy.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Zl.copy(e.center).add(zy)),this.expandByPoint(Zl.copy(e.center).sub(zy))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},kL=0,bi=new At,Gy=new vr,Ja=new U,ai=new Ps,Kl=new Ps,dn=new U,Gn=class n extends ur{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:kL++}),this.uuid=Rs(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(ML(e)?lu:cu)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let s=new Be().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return bi.makeRotationFromQuaternion(e),this.applyMatrix4(bi),this}rotateX(e){return bi.makeRotationX(e),this.applyMatrix4(bi),this}rotateY(e){return bi.makeRotationY(e),this.applyMatrix4(bi),this}rotateZ(e){return bi.makeRotationZ(e),this.applyMatrix4(bi),this}translate(e,t,i){return bi.makeTranslation(e,t,i),this.applyMatrix4(bi),this}scale(e,t,i){return bi.makeScale(e,t,i),this.applyMatrix4(bi),this}lookAt(e){return Gy.lookAt(e),Gy.updateMatrix(),this.applyMatrix4(Gy.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ja).negate(),this.translate(Ja.x,Ja.y,Ja.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let i=[];for(let r=0,s=e.length;r<s;r++){let o=e[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new wi(i,3))}else{let i=Math.min(e.length,t.count);for(let r=0;r<i;r++){let s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&De("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ps);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ce("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){let s=t[i];ai.setFromBufferAttribute(s),this.morphTargetsRelative?(dn.addVectors(this.boundingBox.min,ai.min),this.boundingBox.expandByPoint(dn),dn.addVectors(this.boundingBox.max,ai.max),this.boundingBox.expandByPoint(dn)):(this.boundingBox.expandByPoint(ai.min),this.boundingBox.expandByPoint(ai.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ce('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Fo);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ce("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new U,1/0);return}if(e){let i=this.boundingSphere.center;if(ai.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){let a=t[s];Kl.setFromBufferAttribute(a),this.morphTargetsRelative?(dn.addVectors(ai.min,Kl.min),ai.expandByPoint(dn),dn.addVectors(ai.max,Kl.max),ai.expandByPoint(dn)):(ai.expandByPoint(Kl.min),ai.expandByPoint(Kl.max))}ai.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)dn.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(dn));if(t)for(let s=0,o=t.length;s<o;s++){let a=t[s],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)dn.fromBufferAttribute(a,l),c&&(Ja.fromBufferAttribute(e,l),dn.add(Ja)),r=Math.max(r,i.distanceToSquared(dn))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&Ce('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Ce("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new In(new Float32Array(4*i.count),4));let o=this.getAttribute("tangent"),a=[],c=[];for(let _=0;_<i.count;_++)a[_]=new U,c[_]=new U;let l=new U,u=new U,d=new U,f=new We,h=new We,m=new We,v=new U,p=new U;function g(_,b,I){l.fromBufferAttribute(i,_),u.fromBufferAttribute(i,b),d.fromBufferAttribute(i,I),f.fromBufferAttribute(s,_),h.fromBufferAttribute(s,b),m.fromBufferAttribute(s,I),u.sub(l),d.sub(l),h.sub(f),m.sub(f);let A=1/(h.x*m.y-m.x*h.y);isFinite(A)&&(v.copy(u).multiplyScalar(m.y).addScaledVector(d,-h.y).multiplyScalar(A),p.copy(d).multiplyScalar(h.x).addScaledVector(u,-m.x).multiplyScalar(A),a[_].add(v),a[b].add(v),a[I].add(v),c[_].add(p),c[b].add(p),c[I].add(p))}let x=this.groups;x.length===0&&(x=[{start:0,count:e.count}]);for(let _=0,b=x.length;_<b;++_){let I=x[_],A=I.start,L=I.count;for(let z=A,j=A+L;z<j;z+=3)g(e.getX(z+0),e.getX(z+1),e.getX(z+2))}let M=new U,E=new U,C=new U,T=new U;function D(_){C.fromBufferAttribute(r,_),T.copy(C);let b=a[_];M.copy(b),M.sub(C.multiplyScalar(C.dot(b))).normalize(),E.crossVectors(T,b);let A=E.dot(c[_])<0?-1:1;o.setXYZW(_,M.x,M.y,M.z,A)}for(let _=0,b=x.length;_<b;++_){let I=x[_],A=I.start,L=I.count;for(let z=A,j=A+L;z<j;z+=3)D(e.getX(z+0)),D(e.getX(z+1)),D(e.getX(z+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new In(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let f=0,h=i.count;f<h;f++)i.setXYZ(f,0,0,0);let r=new U,s=new U,o=new U,a=new U,c=new U,l=new U,u=new U,d=new U;if(e)for(let f=0,h=e.count;f<h;f+=3){let m=e.getX(f+0),v=e.getX(f+1),p=e.getX(f+2);r.fromBufferAttribute(t,m),s.fromBufferAttribute(t,v),o.fromBufferAttribute(t,p),u.subVectors(o,s),d.subVectors(r,s),u.cross(d),a.fromBufferAttribute(i,m),c.fromBufferAttribute(i,v),l.fromBufferAttribute(i,p),a.add(u),c.add(u),l.add(u),i.setXYZ(m,a.x,a.y,a.z),i.setXYZ(v,c.x,c.y,c.z),i.setXYZ(p,l.x,l.y,l.z)}else for(let f=0,h=t.count;f<h;f+=3)r.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),u.subVectors(o,s),d.subVectors(r,s),u.cross(d),i.setXYZ(f+0,u.x,u.y,u.z),i.setXYZ(f+1,u.x,u.y,u.z),i.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)dn.fromBufferAttribute(e,t),dn.normalize(),e.setXYZ(t,dn.x,dn.y,dn.z)}toNonIndexed(){function e(a,c){let l=a.array,u=a.itemSize,d=a.normalized,f=new l.constructor(c.length*u),h=0,m=0;for(let v=0,p=c.length;v<p;v++){a.isInterleavedBufferAttribute?h=c[v]*a.data.stride+a.offset:h=c[v]*u;for(let g=0;g<u;g++)f[m++]=l[h++]}return new In(f,u,d)}if(this.index===null)return De("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new n,i=this.index.array,r=this.attributes;for(let a in r){let c=r[a],l=e(c,i);t.setAttribute(a,l)}let s=this.morphAttributes;for(let a in s){let c=[],l=s[a];for(let u=0,d=l.length;u<d;u++){let f=l[u],h=e(f,i);c.push(h)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let i=this.attributes;for(let c in i){let l=i[c];e.data.attributes[c]=l.toJSON(e.data)}let r={},s=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],u=[];for(let d=0,f=l.length;d<f;d++){let h=l[d];u.push(h.toJSON(e.data))}u.length>0&&(r[c]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let i=e.index;i!==null&&this.setIndex(i.clone());let r=e.attributes;for(let l in r){let u=r[l];this.setAttribute(l,u.clone(t))}let s=e.morphAttributes;for(let l in s){let u=[],d=s[l];for(let f=0,h=d.length;f<h;f++)u.push(d[f].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let l=0,u=o.length;l<u;l++){let d=o[l];this.addGroup(d.start,d.count,d.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},mp=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=lp,this.updateRanges=[],this.version=0,this.uuid=Rs()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=t.array[i+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Rs()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Rs()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},kn=new U,uu=class n{constructor(e,t,i,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)kn.fromBufferAttribute(this,t),kn.applyMatrix4(e),this.setXYZ(t,kn.x,kn.y,kn.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)kn.fromBufferAttribute(this,t),kn.applyNormalMatrix(e),this.setXYZ(t,kn.x,kn.y,kn.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)kn.fromBufferAttribute(this,t),kn.transformDirection(e),this.setXYZ(t,kn.x,kn.y,kn.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=ar(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=St(i,this.array)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=St(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=St(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=St(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=St(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=ar(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=ar(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=ar(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=ar(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=St(t,this.array),i=St(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=St(t,this.array),i=St(i,this.array),r=St(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=St(t,this.array),i=St(i,this.array),r=St(r,this.array),s=St(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){su("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return new In(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new n(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){su("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},UL=0,fr=class extends ur{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:UL++}),this.uuid=Rs(),this.name="",this.type="Material",this.blending=Oo,this.side=Yr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Kh,this.blendDst=Jh,this.blendEquation=Ns,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new it(0,0,0),this.blendAlpha=0,this.depthFunc=Lo,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=n0,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=No,this.stencilZFail=No,this.stencilZPass=No,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let i=e[t];if(i===void 0){De(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){De(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Oo&&(i.blending=this.blending),this.side!==Yr&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Kh&&(i.blendSrc=this.blendSrc),this.blendDst!==Jh&&(i.blendDst=this.blendDst),this.blendEquation!==Ns&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Lo&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==n0&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==No&&(i.stencilFail=this.stencilFail),this.stencilZFail!==No&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==No&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){let o=[];for(let a in s){let c=s[a];delete c.metadata,o.push(c)}return o}if(t){let s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,i=null;if(t!==null){let r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},fc=class extends fr{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new it(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Qa,Jl=new U,ec=new U,tc=new U,nc=new We,Ql=new We,oC=new At,Nh=new U,eu=new U,Ph=new U,lT=new We,jy=new We,uT=new We,du=class extends vr{constructor(e=new fc){if(super(),this.isSprite=!0,this.type="Sprite",Qa===void 0){Qa=new Gn;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new mp(t,5);Qa.setIndex([0,1,2,0,2,3]),Qa.setAttribute("position",new uu(i,3,0,!1)),Qa.setAttribute("uv",new uu(i,2,3,!1))}this.geometry=Qa,this.material=e,this.center=new We(.5,.5),this.count=1}raycast(e,t){e.camera===null&&Ce('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),ec.setFromMatrixScale(this.matrixWorld),oC.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),tc.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&ec.multiplyScalar(-tc.z);let i=this.material.rotation,r,s;i!==0&&(s=Math.cos(i),r=Math.sin(i));let o=this.center;Oh(Nh.set(-.5,-.5,0),tc,o,ec,r,s),Oh(eu.set(.5,-.5,0),tc,o,ec,r,s),Oh(Ph.set(.5,.5,0),tc,o,ec,r,s),lT.set(0,0),jy.set(1,0),uT.set(1,1);let a=e.ray.intersectTriangle(Nh,eu,Ph,!1,Jl);if(a===null&&(Oh(eu.set(-.5,.5,0),tc,o,ec,r,s),jy.set(0,1),a=e.ray.intersectTriangle(Nh,Ph,eu,!1,Jl),a===null))return;let c=e.ray.origin.distanceTo(Jl);c<e.near||c>e.far||t.push({distance:c,point:Jl.clone(),uv:qr.getInterpolation(Jl,Nh,eu,Ph,lT,jy,uT,new We),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function Oh(n,e,t,i,r,s){nc.subVectors(n,t).addScalar(.5).multiply(i),r!==void 0?(Ql.x=s*nc.x-r*nc.y,Ql.y=r*nc.x+s*nc.y):Ql.copy(nc),n.copy(e),n.x+=Ql.x,n.y+=Ql.y,n.applyMatrix4(oC)}var $r=new U,Wy=new U,Lh=new U,As=new U,$y=new U,Fh=new U,qy=new U,hc=class{constructor(e=new U,t=new U(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,$r)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=$r.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):($r.copy(this.origin).addScaledVector(this.direction,t),$r.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){Wy.copy(e).add(t).multiplyScalar(.5),Lh.copy(t).sub(e).normalize(),As.copy(this.origin).sub(Wy);let s=e.distanceTo(t)*.5,o=-this.direction.dot(Lh),a=As.dot(this.direction),c=-As.dot(Lh),l=As.lengthSq(),u=Math.abs(1-o*o),d,f,h,m;if(u>0)if(d=o*c-a,f=o*a-c,m=s*u,d>=0)if(f>=-m)if(f<=m){let v=1/u;d*=v,f*=v,h=d*(d+o*f+2*a)+f*(o*d+f+2*c)+l}else f=s,d=Math.max(0,-(o*f+a)),h=-d*d+f*(f+2*c)+l;else f=-s,d=Math.max(0,-(o*f+a)),h=-d*d+f*(f+2*c)+l;else f<=-m?(d=Math.max(0,-(-o*s+a)),f=d>0?-s:Math.min(Math.max(-s,-c),s),h=-d*d+f*(f+2*c)+l):f<=m?(d=0,f=Math.min(Math.max(-s,-c),s),h=f*(f+2*c)+l):(d=Math.max(0,-(o*s+a)),f=d>0?s:Math.min(Math.max(-s,-c),s),h=-d*d+f*(f+2*c)+l);else f=o>0?-s:s,d=Math.max(0,-(o*f+a)),h=-d*d+f*(f+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(Wy).addScaledVector(Lh,f),h}intersectSphere(e,t){$r.subVectors(e.center,this.origin);let i=$r.dot(this.direction),r=$r.dot($r)-i*i,s=e.radius*e.radius;if(r>s)return null;let o=Math.sqrt(s-r),a=i-o,c=i+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){let i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,o,a,c,l=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,f=this.origin;return l>=0?(i=(e.min.x-f.x)*l,r=(e.max.x-f.x)*l):(i=(e.max.x-f.x)*l,r=(e.min.x-f.x)*l),u>=0?(s=(e.min.y-f.y)*u,o=(e.max.y-f.y)*u):(s=(e.max.y-f.y)*u,o=(e.min.y-f.y)*u),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),d>=0?(a=(e.min.z-f.z)*d,c=(e.max.z-f.z)*d):(a=(e.max.z-f.z)*d,c=(e.min.z-f.z)*d),i>c||a>r)||((a>i||i!==i)&&(i=a),(c<r||r!==r)&&(r=c),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,$r)!==null}intersectTriangle(e,t,i,r,s){$y.subVectors(t,e),Fh.subVectors(i,e),qy.crossVectors($y,Fh);let o=this.direction.dot(qy),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;As.subVectors(this.origin,e);let c=a*this.direction.dot(Fh.crossVectors(As,Fh));if(c<0)return null;let l=a*this.direction.dot($y.cross(As));if(l<0||c+l>o)return null;let u=-a*As.dot(qy);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ko=class extends fr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new it(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new lc,this.combine=h0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},dT=new At,Io=new hc,kh=new Fo,fT=new U,Uh=new U,Bh=new U,Vh=new U,Xy=new U,Hh=new U,hT=new U,zh=new U,Un=class extends vr{constructor(e=new Gn,t=new ko){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){let a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){let i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(r,e);let a=this.morphTargetInfluences;if(s&&a){Hh.set(0,0,0);for(let c=0,l=s.length;c<l;c++){let u=a[c],d=s[c];u!==0&&(Xy.fromBufferAttribute(d,e),o?Hh.addScaledVector(Xy,u):Hh.addScaledVector(Xy.sub(t),u))}t.add(Hh)}return t}raycast(e,t){let i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),kh.copy(i.boundingSphere),kh.applyMatrix4(s),Io.copy(e.ray).recast(e.near),!(kh.containsPoint(Io.origin)===!1&&(Io.intersectSphere(kh,fT)===null||Io.origin.distanceToSquared(fT)>(e.far-e.near)**2))&&(dT.copy(s).invert(),Io.copy(e.ray).applyMatrix4(dT),!(i.boundingBox!==null&&Io.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Io)))}_computeIntersections(e,t,i){let r,s=this.geometry,o=this.material,a=s.index,c=s.attributes.position,l=s.attributes.uv,u=s.attributes.uv1,d=s.attributes.normal,f=s.groups,h=s.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,v=f.length;m<v;m++){let p=f[m],g=o[p.materialIndex],x=Math.max(p.start,h.start),M=Math.min(a.count,Math.min(p.start+p.count,h.start+h.count));for(let E=x,C=M;E<C;E+=3){let T=a.getX(E),D=a.getX(E+1),_=a.getX(E+2);r=Gh(this,g,e,i,l,u,d,T,D,_),r&&(r.faceIndex=Math.floor(E/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{let m=Math.max(0,h.start),v=Math.min(a.count,h.start+h.count);for(let p=m,g=v;p<g;p+=3){let x=a.getX(p),M=a.getX(p+1),E=a.getX(p+2);r=Gh(this,o,e,i,l,u,d,x,M,E),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(o))for(let m=0,v=f.length;m<v;m++){let p=f[m],g=o[p.materialIndex],x=Math.max(p.start,h.start),M=Math.min(c.count,Math.min(p.start+p.count,h.start+h.count));for(let E=x,C=M;E<C;E+=3){let T=E,D=E+1,_=E+2;r=Gh(this,g,e,i,l,u,d,T,D,_),r&&(r.faceIndex=Math.floor(E/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{let m=Math.max(0,h.start),v=Math.min(c.count,h.start+h.count);for(let p=m,g=v;p<g;p+=3){let x=p,M=p+1,E=p+2;r=Gh(this,o,e,i,l,u,d,x,M,E),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}}};function BL(n,e,t,i,r,s,o,a){let c;if(e.side===xn?c=i.intersectTriangle(o,s,r,!0,a):c=i.intersectTriangle(r,s,o,e.side===Yr,a),c===null)return null;zh.copy(a),zh.applyMatrix4(n.matrixWorld);let l=t.ray.origin.distanceTo(zh);return l<t.near||l>t.far?null:{distance:l,point:zh.clone(),object:n}}function Gh(n,e,t,i,r,s,o,a,c,l){n.getVertexPosition(a,Uh),n.getVertexPosition(c,Bh),n.getVertexPosition(l,Vh);let u=BL(n,e,t,i,Uh,Bh,Vh,hT);if(u){let d=new U;qr.getBarycoord(hT,Uh,Bh,Vh,d),r&&(u.uv=qr.getInterpolatedAttribute(r,a,c,l,d,new We)),s&&(u.uv1=qr.getInterpolatedAttribute(s,a,c,l,d,new We)),o&&(u.normal=qr.getInterpolatedAttribute(o,a,c,l,d,new U),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));let f={a,b:c,c:l,normal:new U,materialIndex:0};qr.getNormal(Uh,Bh,Vh,f.normal),u.face=f,u.barycoord=d}return u}var gp=class extends gr{constructor(e=null,t=1,i=1,r,s,o,a,c,l=fn,u=fn,d,f){super(null,o,a,c,l,u,r,s,d,f),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Yy=new U,VL=new U,HL=new Be,or=class{constructor(e=new U(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){let r=Yy.subVectors(i,t).cross(VL.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){let r=e.delta(Yy),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let o=-(e.start.dot(this.normal)+this.constant)/s;return i===!0&&(o<0||o>1)?null:t.copy(e.start).addScaledVector(r,o)}intersectsLine(e){let t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let i=t||HL.getNormalMatrix(e),r=this.coplanarPoint(Yy).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Ro=new Fo,zL=new We(.5,.5),jh=new U,pc=class{constructor(e=new or,t=new or,i=new or,r=new or,s=new or,o=new or){this.planes=[e,t,i,r,s,o]}set(e,t,i,r,s,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){let t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Wi,i=!1){let r=this.planes,s=e.elements,o=s[0],a=s[1],c=s[2],l=s[3],u=s[4],d=s[5],f=s[6],h=s[7],m=s[8],v=s[9],p=s[10],g=s[11],x=s[12],M=s[13],E=s[14],C=s[15];if(r[0].setComponents(l-o,h-u,g-m,C-x).normalize(),r[1].setComponents(l+o,h+u,g+m,C+x).normalize(),r[2].setComponents(l+a,h+d,g+v,C+M).normalize(),r[3].setComponents(l-a,h-d,g-v,C-M).normalize(),i)r[4].setComponents(c,f,p,E).normalize(),r[5].setComponents(l-c,h-f,g-p,C-E).normalize();else if(r[4].setComponents(l-c,h-f,g-p,C-E).normalize(),t===Wi)r[5].setComponents(l+c,h+f,g+p,C+E).normalize();else if(t===oc)r[5].setComponents(c,f,p,E).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ro.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ro.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ro)}intersectsSprite(e){Ro.center.set(0,0,0);let t=zL.distanceTo(e.center);return Ro.radius=.7071067811865476+t,Ro.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ro)}intersectsSphere(e){let t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let i=0;i<6;i++){let r=t[i];if(jh.x=r.normal.x>0?e.max.x:e.min.x,jh.y=r.normal.y>0?e.max.y:e.min.y,jh.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(jh)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var mc=class extends fr{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new it(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},pT=new At,i0=new hc,Wh=new Fo,$h=new U,fu=class extends vr{constructor(e=new Gn,t=new mc){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let i=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Wh.copy(i.boundingSphere),Wh.applyMatrix4(r),Wh.radius+=s,e.ray.intersectsSphere(Wh)===!1)return;pT.copy(r).invert(),i0.copy(e.ray).applyMatrix4(pT);let a=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=i.index,d=i.attributes.position;if(l!==null){let f=Math.max(0,o.start),h=Math.min(l.count,o.start+o.count);for(let m=f,v=h;m<v;m++){let p=l.getX(m);$h.fromBufferAttribute(d,p),mT($h,p,c,r,e,t,this)}}else{let f=Math.max(0,o.start),h=Math.min(d.count,o.start+o.count);for(let m=f,v=h;m<v;m++)$h.fromBufferAttribute(d,m),mT($h,m,c,r,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){let a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}};function mT(n,e,t,i,r,s,o){let a=i0.distanceSqToPoint(n);if(a<t){let c=new U;i0.closestPointToPoint(n,c),c.applyMatrix4(i);let l=r.ray.origin.distanceTo(c);if(l<r.near||l>r.far)return;s.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}var hu=class extends gr{constructor(e=[],t=ks,i,r,s,o,a,c,l,u){super(e,t,i,r,s,o,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},pu=class extends gr{constructor(e,t,i,r,s,o,a,c,l){super(e,t,i,r,s,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Zr=class extends gr{constructor(e,t,i=qi,r,s,o,a=fn,c=fn,l,u=lr,d=1){if(u!==lr&&u!==Bs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let f={width:e,height:t,depth:d};super(f,r,s,o,a,c,u,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new cc(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},vp=class extends Zr{constructor(e,t=qi,i=ks,r,s,o=fn,a=fn,c,l=lr){let u={width:e,height:e,depth:1},d=[u,u,u,u,u,u];super(e,e,t,i,r,s,o,a,c,l),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},mu=class extends gr{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Kr=class n extends Gn{constructor(e=1,t=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};let a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);let c=[],l=[],u=[],d=[],f=0,h=0;m("z","y","x",-1,-1,i,t,e,o,s,0),m("z","y","x",1,-1,i,t,-e,o,s,1),m("x","z","y",1,1,e,i,t,r,o,2),m("x","z","y",1,-1,e,i,-t,r,o,3),m("x","y","z",1,-1,e,t,i,r,s,4),m("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(c),this.setAttribute("position",new wi(l,3)),this.setAttribute("normal",new wi(u,3)),this.setAttribute("uv",new wi(d,2));function m(v,p,g,x,M,E,C,T,D,_,b){let I=E/D,A=C/_,L=E/2,z=C/2,j=T/2,N=D+1,B=_+1,F=0,Z=0,Q=new U;for(let ce=0;ce<B;ce++){let ge=ce*A-z;for(let Se=0;Se<N;Se++){let Je=Se*I-L;Q[v]=Je*x,Q[p]=ge*M,Q[g]=j,l.push(Q.x,Q.y,Q.z),Q[v]=0,Q[p]=0,Q[g]=T>0?1:-1,u.push(Q.x,Q.y,Q.z),d.push(Se/D),d.push(1-ce/_),F+=1}}for(let ce=0;ce<_;ce++)for(let ge=0;ge<D;ge++){let Se=f+ge+N*ce,Je=f+ge+N*(ce+1),Ye=f+(ge+1)+N*(ce+1),Ae=f+(ge+1)+N*ce;c.push(Se,Je,Ae),c.push(Je,Ye,Ae),Z+=6}a.addGroup(h,Z,b),h+=Z,f+=F}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var gu=class n extends Gn{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};let s=e/2,o=t/2,a=Math.floor(i),c=Math.floor(r),l=a+1,u=c+1,d=e/a,f=t/c,h=[],m=[],v=[],p=[];for(let g=0;g<u;g++){let x=g*f-o;for(let M=0;M<l;M++){let E=M*d-s;m.push(E,-x,0),v.push(0,0,1),p.push(M/a),p.push(1-g/c)}}for(let g=0;g<c;g++)for(let x=0;x<a;x++){let M=x+l*g,E=x+l*(g+1),C=x+1+l*(g+1),T=x+1+l*g;h.push(M,E,T),h.push(E,C,T)}this.setIndex(h),this.setAttribute("position",new wi(m,3)),this.setAttribute("normal",new wi(v,3)),this.setAttribute("uv",new wi(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.widthSegments,e.heightSegments)}};function Bo(n){let e={};for(let t in n){e[t]={};for(let i in n[t]){let r=n[t][i];if(gT(r))r.isRenderTargetTexture?(De("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone();else if(Array.isArray(r))if(gT(r[0])){let s=[];for(let o=0,a=r.length;o<a;o++)s[o]=r[o].clone();e[t][i]=s}else e[t][i]=r.slice();else e[t][i]=r}}return e}function Rn(n){let e={};for(let t=0;t<n.length;t++){let i=Bo(n[t]);for(let r in i)e[r]=i[r]}return e}function gT(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function GL(n){let e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function A0(n){let e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:nt.workingColorSpace}var aC={clone:Bo,merge:Rn},jL=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,WL=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,ui=class extends fr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=jL,this.fragmentShader=WL,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Bo(e.uniforms),this.uniformsGroups=GL(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let r in this.uniforms){let o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let i={};for(let r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}},_p=class extends ui{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},vu=class extends fr{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new it(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new it(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=gm,this.normalScale=new We(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new lc,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var yp=class extends fr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=qT,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},xp=class extends fr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function qh(n,e){return!n||n.constructor===e?n:typeof e.BYTES_PER_ELEMENT=="number"?new e(n):Array.prototype.slice.call(n)}var Os=class{constructor(e,t,i,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,i=this._cachedIndex,r=t[i],s=t[i-1];n:{e:{let o;t:{i:if(!(e<r)){for(let a=i+2;;){if(r===void 0){if(e<s)break i;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===a)break;if(s=r,r=t[++i],e<r)break e}o=t.length;break t}if(!(e>=s)){let a=t[1];e<a&&(i=2,s=a);for(let c=i-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===c)break;if(r=s,s=t[--i-1],e>=s)break e}o=i,i=0;break t}break n}for(;i<o;){let a=i+o>>>1;e<t[a]?o=a:i=a+1}if(r=t[i],s=t[i-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,s,r)}return this.interpolate_(i,s,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,r=this.valueSize,s=e*r;for(let o=0;o!==r;++o)t[o]=i[s+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Sp=class extends Os{constructor(e,t,i,r){super(e,t,i,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Qy,endingEnd:Qy}}intervalChanged_(e,t,i){let r=this.parameterPositions,s=e-2,o=e+1,a=r[s],c=r[o];if(a===void 0)switch(this.getSettings_().endingStart){case e0:s=e,a=2*t-i;break;case t0:s=r.length-2,a=t+r[s]-r[s+1];break;default:s=e,a=i}if(c===void 0)switch(this.getSettings_().endingEnd){case e0:o=e,c=2*i-t;break;case t0:o=1,c=i+r[1]-r[0];break;default:o=e-1,c=t}let l=(i-t)*.5,u=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-i),this._offsetPrev=s*u,this._offsetNext=o*u}interpolate_(e,t,i,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=this._offsetPrev,d=this._offsetNext,f=this._weightPrev,h=this._weightNext,m=(i-t)/(r-t),v=m*m,p=v*m,g=-f*p+2*f*v-f*m,x=(1+f)*p+(-1.5-2*f)*v+(-.5+f)*m+1,M=(-1-h)*p+(1.5+h)*v+.5*m,E=h*p-h*v;for(let C=0;C!==a;++C)s[C]=g*o[u+C]+x*o[l+C]+M*o[c+C]+E*o[d+C];return s}},Mp=class extends Os{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=(i-t)/(r-t),d=1-u;for(let f=0;f!==a;++f)s[f]=o[l+f]*d+o[c+f]*u;return s}},Ep=class extends Os{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e){return this.copySampleValue_(e-1)}},bp=class extends Os{interpolate_(e,t,i,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,u=this.settings||this.DefaultSettings_,d=u.inTangents,f=u.outTangents;if(!d||!f){let v=(i-t)/(r-t),p=1-v;for(let g=0;g!==a;++g)s[g]=o[l+g]*p+o[c+g]*v;return s}let h=a*2,m=e-1;for(let v=0;v!==a;++v){let p=o[l+v],g=o[c+v],x=m*h+v*2,M=f[x],E=f[x+1],C=e*h+v*2,T=d[C],D=d[C+1],_=(i-t)/(r-t),b,I,A,L,z;for(let j=0;j<8;j++){b=_*_,I=b*_,A=1-_,L=A*A,z=L*A;let B=z*t+3*L*_*M+3*A*b*T+I*r-i;if(Math.abs(B)<1e-10)break;let F=3*L*(M-t)+6*A*_*(T-M)+3*b*(r-T);if(Math.abs(F)<1e-10)break;_=_-B/F,_=Math.max(0,Math.min(1,_))}s[v]=z*p+3*L*_*E+3*A*b*D+I*g}return s}},di=class{constructor(e,t,i,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=qh(t,this.TimeBufferType),this.values=qh(i,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:qh(e.times,Array),values:qh(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(i.interpolation=r)}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new Ep(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Mp(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Sp(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new bp(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.settings=this.settings),t}setInterpolation(e){let t;switch(e){case tu:t=this.InterpolantFactoryMethodDiscrete;break;case cp:t=this.InterpolantFactoryMethodLinear;break;case Zh:t=this.InterpolantFactoryMethodSmooth;break;case Jy:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return De("KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return tu;case this.InterpolantFactoryMethodLinear:return cp;case this.InterpolantFactoryMethodSmooth:return Zh;case this.InterpolantFactoryMethodBezier:return Jy}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]*=e}return this}trim(e,t){let i=this.times,r=i.length,s=0,o=r-1;for(;s!==r&&i[s]<e;)++s;for(;o!==-1&&i[o]>t;)--o;if(++o,s!==0||o!==r){s>=o&&(o=Math.max(o,1),s=o-1);let a=this.getValueSize();this.times=i.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Ce("KeyframeTrack: Invalid value size in track.",this),e=!1);let i=this.times,r=this.values,s=i.length;s===0&&(Ce("KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==s;a++){let c=i[a];if(typeof c=="number"&&isNaN(c)){Ce("KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(o!==null&&o>c){Ce("KeyframeTrack: Out of order keys.",this,a,c,o),e=!1;break}o=c}if(r!==void 0&&EL(r))for(let a=0,c=r.length;a!==c;++a){let l=r[a];if(isNaN(l)){Ce("KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),r=this.getInterpolation()===Zh,s=e.length-1,o=1;for(let a=1;a<s;++a){let c=!1,l=e[a],u=e[a+1];if(l!==u&&(a!==1||l!==e[0]))if(r)c=!0;else{let d=a*i,f=d-i,h=d+i;for(let m=0;m!==i;++m){let v=t[d+m];if(v!==t[f+m]||v!==t[h+m]){c=!0;break}}}if(c){if(a!==o){e[o]=e[a];let d=a*i,f=o*i;for(let h=0;h!==i;++h)t[f+h]=t[d+h]}++o}}if(s>0){e[o]=e[s];for(let a=s*i,c=o*i,l=0;l!==i;++l)t[c+l]=t[a+l];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*i)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),i=this.constructor,r=new i(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}};di.prototype.ValueTypeName="";di.prototype.TimeBufferType=Float32Array;di.prototype.ValueBufferType=Float32Array;di.prototype.DefaultInterpolation=cp;var Ls=class extends di{constructor(e,t,i){super(e,t,i)}};Ls.prototype.ValueTypeName="bool";Ls.prototype.ValueBufferType=Array;Ls.prototype.DefaultInterpolation=tu;Ls.prototype.InterpolantFactoryMethodLinear=void 0;Ls.prototype.InterpolantFactoryMethodSmooth=void 0;var wp=class extends di{constructor(e,t,i,r){super(e,t,i,r)}};wp.prototype.ValueTypeName="color";var Tp=class extends di{constructor(e,t,i,r){super(e,t,i,r)}};Tp.prototype.ValueTypeName="number";var Cp=class extends Os{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(i-t)/(r-t),l=e*a;for(let u=l+a;l!==u;l+=4)dr.slerpFlat(s,0,o,l-a,o,l,c);return s}},_u=class extends di{constructor(e,t,i,r){super(e,t,i,r)}InterpolantFactoryMethodLinear(e){return new Cp(this.times,this.values,this.getValueSize(),e)}};_u.prototype.ValueTypeName="quaternion";_u.prototype.InterpolantFactoryMethodSmooth=void 0;var Fs=class extends di{constructor(e,t,i){super(e,t,i)}};Fs.prototype.ValueTypeName="string";Fs.prototype.ValueBufferType=Array;Fs.prototype.DefaultInterpolation=tu;Fs.prototype.InterpolantFactoryMethodLinear=void 0;Fs.prototype.InterpolantFactoryMethodSmooth=void 0;var Dp=class extends di{constructor(e,t,i,r){super(e,t,i,r)}};Dp.prototype.ValueTypeName="vector";var yu=class extends vr{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new it(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}};var Zy=new At,vT=new U,_T=new U,r0=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new We(512,512),this.mapType=jn,this.map=null,this.mapPass=null,this.matrix=new At,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new pc,this._frameExtents=new We(1,1),this._viewportCount=1,this._viewports=[new Pt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,i=this.matrix;vT.setFromMatrixPosition(e.matrixWorld),t.position.copy(vT),_T.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(_T),t.updateMatrixWorld(),Zy.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Zy,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===oc||t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Zy)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Xh=new U,Yh=new dr,sr=new U,xu=class extends vr{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new At,this.projectionMatrix=new At,this.projectionMatrixInverse=new At,this.coordinateSystem=Wi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Xh,Yh,sr),sr.x===1&&sr.y===1&&sr.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Xh,Yh,sr.set(1,1,1)).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorld.decompose(Xh,Yh,sr),sr.x===1&&sr.y===1&&sr.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Xh,Yh,sr.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Is=new U,yT=new We,xT=new We,_n=class extends xu{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=dp*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Ty*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return dp*2*Math.atan(Math.tan(Ty*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Is.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Is.x,Is.y).multiplyScalar(-e/Is.z),Is.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Is.x,Is.y).multiplyScalar(-e/Is.z)}getViewSize(e,t){return this.getViewBounds(e,yT,xT),t.subVectors(xT,yT)}setViewOffset(e,t,i,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Ty*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;s+=o.offsetX*r/c,t-=o.offsetY*i/l,r*=o.width/c,i*=o.height/l}let a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var s0=class extends r0{constructor(){super(new _n(90,1,.5,500)),this.isPointLightShadow=!0}},gc=class extends yu{constructor(e,t,i=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=r,this.shadow=new s0}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},Su=class extends xu{constructor(e=-1,t=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2,s=i-e,o=i+e,a=r+t,c=r-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,o=s+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}};var Mu=class extends yu{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}};var ic=-90,rc=1,Ap=class extends vr{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new _n(ic,rc,e,t);r.layers=this.layers,this.add(r);let s=new _n(ic,rc,e,t);s.layers=this.layers,this.add(s);let o=new _n(ic,rc,e,t);o.layers=this.layers,this.add(o);let a=new _n(ic,rc,e,t);a.layers=this.layers,this.add(a);let c=new _n(ic,rc,e,t);c.layers=this.layers,this.add(c);let l=new _n(ic,rc,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[i,r,s,o,a,c]=t;for(let l of t)this.remove(l);if(e===Wi)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===oc)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,o,a,c,l,u]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),h=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;let v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let p=!1;e.isWebGLRenderer===!0?p=e.state.buffers.depth.getReversed():p=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(i,1,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,2,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,3,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(i,4,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),i.texture.generateMipmaps=v,e.setRenderTarget(i,5,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(d,f,h),e.xr.enabled=m,i.texture.needsPMREMUpdate=!0}},Ip=class extends _n{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var I0="\\[\\]\\.:\\/",$L=new RegExp("["+I0+"]","g"),R0="[^"+I0+"]",qL="[^"+I0.replace("\\.","")+"]",XL=/((?:WC+[\/:])*)/.source.replace("WC",R0),YL=/(WCOD+)?/.source.replace("WCOD",qL),ZL=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",R0),KL=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",R0),JL=new RegExp("^"+XL+YL+ZL+KL+"$"),QL=["material","materials","bones","map"],o0=class{constructor(e,t,i){let r=i||Ht.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let i=this._targetGroup.nCachedObjects_,r=this._bindings[i];r!==void 0&&r.getValue(e,t)}setValue(e,t){let i=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=i.length;r!==s;++r)i[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}},Ht=(()=>{class n{constructor(t,i,r){this.path=i,this.parsedPath=r||n.parseTrackName(i),this.node=n.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,i,r){return t&&t.isAnimationObjectGroup?new n.Composite(t,i,r):new n(t,i,r)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace($L,"")}static parseTrackName(t){let i=JL.exec(t);if(i===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let r={nodeName:i[2],objectName:i[3],objectIndex:i[4],propertyName:i[5],propertyIndex:i[6]},s=r.nodeName&&r.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let o=r.nodeName.substring(s+1);QL.indexOf(o)!==-1&&(r.nodeName=r.nodeName.substring(0,s),r.objectName=o)}if(r.propertyName===null||r.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return r}static findNode(t,i){if(i===void 0||i===""||i==="."||i===-1||i===t.name||i===t.uuid)return t;if(t.skeleton){let r=t.skeleton.getBoneByName(i);if(r!==void 0)return r}if(t.children){let r=function(o){for(let a=0;a<o.length;a++){let c=o[a];if(c.name===i||c.uuid===i)return c;let l=r(c.children);if(l)return l}return null},s=r(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,i){t[i]=this.targetObject[this.propertyName]}_getValue_array(t,i){let r=this.resolvedProperty;for(let s=0,o=r.length;s!==o;++s)t[i++]=r[s]}_getValue_arrayElement(t,i){t[i]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,i){this.resolvedProperty.toArray(t,i)}_setValue_direct(t,i){this.targetObject[this.propertyName]=t[i]}_setValue_direct_setNeedsUpdate(t,i){this.targetObject[this.propertyName]=t[i],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,i){this.targetObject[this.propertyName]=t[i],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,i){let r=this.resolvedProperty;for(let s=0,o=r.length;s!==o;++s)r[s]=t[i++]}_setValue_array_setNeedsUpdate(t,i){let r=this.resolvedProperty;for(let s=0,o=r.length;s!==o;++s)r[s]=t[i++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,i){let r=this.resolvedProperty;for(let s=0,o=r.length;s!==o;++s)r[s]=t[i++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,i){this.resolvedProperty[this.propertyIndex]=t[i]}_setValue_arrayElement_setNeedsUpdate(t,i){this.resolvedProperty[this.propertyIndex]=t[i],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,i){this.resolvedProperty[this.propertyIndex]=t[i],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,i){this.resolvedProperty.fromArray(t,i)}_setValue_fromArray_setNeedsUpdate(t,i){this.resolvedProperty.fromArray(t,i),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,i){this.resolvedProperty.fromArray(t,i),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,i){this.bind(),this.getValue(t,i)}_setValue_unbound(t,i){this.bind(),this.setValue(t,i)}bind(){let t=this.node,i=this.parsedPath,r=i.objectName,s=i.propertyName,o=i.propertyIndex;if(t||(t=n.findNode(this.rootNode,i.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){De("PropertyBinding: No target node found for track: "+this.path+".");return}if(r){let u=i.objectIndex;switch(r){case"materials":if(!t.material){Ce("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Ce("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Ce("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let d=0;d<t.length;d++)if(t[d].name===u){u=d;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Ce("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Ce("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[r]===void 0){Ce("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[r]}if(u!==void 0){if(t[u]===void 0){Ce("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[u]}}let a=t[s];if(a===void 0){let u=i.nodeName;Ce("PropertyBinding: Trying to update property for track: "+u+"."+s+" but it wasn't found.",t);return}let c=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?c=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(c=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(o!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){Ce("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Ce("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[o]!==void 0&&(o=t.morphTargetDictionary[o])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=o}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][c]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}return n.Composite=o0,n})();Ht.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Ht.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Ht.prototype.GetterByBindingType=[Ht.prototype._getValue_direct,Ht.prototype._getValue_array,Ht.prototype._getValue_arrayElement,Ht.prototype._getValue_toArray];Ht.prototype.SetterByBindingTypeAndVersioning=[[Ht.prototype._setValue_direct,Ht.prototype._setValue_direct_setNeedsUpdate,Ht.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ht.prototype._setValue_array,Ht.prototype._setValue_array_setNeedsUpdate,Ht.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ht.prototype._setValue_arrayElement,Ht.prototype._setValue_arrayElement_setNeedsUpdate,Ht.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ht.prototype._setValue_fromArray,Ht.prototype._setValue_fromArray_setNeedsUpdate,Ht.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var NK=new Float32Array(1);var ST=new At,Eu=class{constructor(e,t,i=0,r=1/0){this.ray=new hc(e,t),this.near=i,this.far=r,this.camera=null,this.layers=new uc,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Ce("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return ST.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(ST),this}intersectObject(e,t=!0,i=[]){return a0(e,this,i,t),i.sort(MT),i}intersectObjects(e,t=!0,i=[]){for(let r=0,s=e.length;r<s;r++)a0(e[r],this,i,t);return i.sort(MT),i}};function MT(n,e){return n.distance-e.distance}function a0(n,e,t,i){let r=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(r=!1),r===!0&&i===!0){let s=n.children;for(let o=0,a=s.length;o<a;o++)a0(s[o],e,t,!0)}}var c0=class n{static{n.prototype.isMatrix2=!0}constructor(e,t,i,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,r){let s=this.elements;return s[0]=e,s[2]=t,s[1]=i,s[3]=r,this}};function N0(n,e,t,i){let r=eF(i);switch(t){case w0:return n*e;case C0:return n*e/r.components*r.byteLength;case kp:return n*e/r.components*r.byteLength;case Vs:return n*e*2/r.components*r.byteLength;case Up:return n*e*2/r.components*r.byteLength;case T0:return n*e*3/r.components*r.byteLength;case Ti:return n*e*4/r.components*r.byteLength;case Bp:return n*e*4/r.components*r.byteLength;case Cu:case Du:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Au:case Iu:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Hp:case Gp:return Math.max(n,16)*Math.max(e,8)/4;case Vp:case zp:return Math.max(n,8)*Math.max(e,8)/2;case jp:case Wp:case qp:case Xp:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case $p:case Ru:case Yp:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Zp:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Kp:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Jp:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Qp:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case em:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case tm:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case nm:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case im:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case rm:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case sm:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case om:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case am:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case cm:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case lm:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case um:case dm:case fm:return Math.ceil(n/4)*Math.ceil(e/4)*16;case hm:case pm:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Nu:case mm:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function eF(n){switch(n){case jn:case S0:return{byteLength:1,components:1};case _c:case M0:case mr:return{byteLength:2,components:1};case Lp:case Fp:return{byteLength:2,components:4};case qi:case Op:case Xi:return{byteLength:4,components:1};case E0:case b0:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"184"}}));typeof window<"u"&&(window.__THREE__?De("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="184");function IC(){let n=null,e=!1,t=null,i=null;function r(s,o){t(s,o),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function nF(n){let e=new WeakMap;function t(a,c){let l=a.array,u=a.usage,d=l.byteLength,f=n.createBuffer();n.bindBuffer(c,f),n.bufferData(c,l,u),a.onUploadCallback();let h;if(l instanceof Float32Array)h=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)h=n.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?h=n.HALF_FLOAT:h=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)h=n.SHORT;else if(l instanceof Uint32Array)h=n.UNSIGNED_INT;else if(l instanceof Int32Array)h=n.INT;else if(l instanceof Int8Array)h=n.BYTE;else if(l instanceof Uint8Array)h=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)h=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:h,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:d}}function i(a,c,l){let u=c.array,d=c.updateRanges;if(n.bindBuffer(l,a),d.length===0)n.bufferSubData(l,0,u);else{d.sort((h,m)=>h.start-m.start);let f=0;for(let h=1;h<d.length;h++){let m=d[f],v=d[h];v.start<=m.start+m.count+1?m.count=Math.max(m.count,v.start+v.count-m.start):(++f,d[f]=v)}d.length=f+1;for(let h=0,m=d.length;h<m;h++){let v=d[h];n.bufferSubData(l,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=e.get(a);c&&(n.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,a,c),l.version=a.version}}return{get:r,remove:s,update:o}}var iF=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,rF=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,sF=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,oF=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,aF=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,cF=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,lF=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,uF=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,dF=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,fF=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,hF=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,pF=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,mF=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,gF=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,vF=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,_F=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,yF=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,xF=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,SF=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,MF=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,EF=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,bF=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,wF=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,TF=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,CF=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,DF=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,AF=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,IF=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,RF=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,NF=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,PF="gl_FragColor = linearToOutputTexel( gl_FragColor );",OF=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,LF=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,FF=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,kF=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,UF=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,BF=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,VF=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,HF=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,zF=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,GF=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,jF=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,WF=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,$F=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,qF=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,XF=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,YF=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,ZF=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,KF=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,JF=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,QF=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,e2=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,t2=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,n2=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = inverseTransformDirection( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,i2=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,r2=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,s2=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,o2=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,a2=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,c2=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,l2=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,u2=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,d2=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,f2=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,h2=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,p2=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,m2=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,g2=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,v2=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,_2=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,y2=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,x2=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,S2=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,M2=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,E2=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,b2=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,w2=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,T2=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,C2=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,D2=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,A2=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,I2=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,R2=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,N2=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,P2=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,O2=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,L2=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,F2=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,k2=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,U2=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,B2=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,V2=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,H2=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,z2=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,G2=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,j2=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,W2=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,$2=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,q2=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,X2=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Y2=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Z2=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,K2=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,J2=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Q2=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,ek=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,tk=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,nk=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,ik=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,rk=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sk=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ok=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ak=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ck=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,lk=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,uk=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,dk=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,fk=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,hk=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,pk=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,mk=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,gk=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,vk=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,_k=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,yk=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,xk=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Sk=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Mk=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ek=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,bk=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,wk=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Tk=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ck=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Dk=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ak=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ik=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Rk=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Nk=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Pk=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ok=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Lk=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Fk=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,qe={alphahash_fragment:iF,alphahash_pars_fragment:rF,alphamap_fragment:sF,alphamap_pars_fragment:oF,alphatest_fragment:aF,alphatest_pars_fragment:cF,aomap_fragment:lF,aomap_pars_fragment:uF,batching_pars_vertex:dF,batching_vertex:fF,begin_vertex:hF,beginnormal_vertex:pF,bsdfs:mF,iridescence_fragment:gF,bumpmap_pars_fragment:vF,clipping_planes_fragment:_F,clipping_planes_pars_fragment:yF,clipping_planes_pars_vertex:xF,clipping_planes_vertex:SF,color_fragment:MF,color_pars_fragment:EF,color_pars_vertex:bF,color_vertex:wF,common:TF,cube_uv_reflection_fragment:CF,defaultnormal_vertex:DF,displacementmap_pars_vertex:AF,displacementmap_vertex:IF,emissivemap_fragment:RF,emissivemap_pars_fragment:NF,colorspace_fragment:PF,colorspace_pars_fragment:OF,envmap_fragment:LF,envmap_common_pars_fragment:FF,envmap_pars_fragment:kF,envmap_pars_vertex:UF,envmap_physical_pars_fragment:YF,envmap_vertex:BF,fog_vertex:VF,fog_pars_vertex:HF,fog_fragment:zF,fog_pars_fragment:GF,gradientmap_pars_fragment:jF,lightmap_pars_fragment:WF,lights_lambert_fragment:$F,lights_lambert_pars_fragment:qF,lights_pars_begin:XF,lights_toon_fragment:ZF,lights_toon_pars_fragment:KF,lights_phong_fragment:JF,lights_phong_pars_fragment:QF,lights_physical_fragment:e2,lights_physical_pars_fragment:t2,lights_fragment_begin:n2,lights_fragment_maps:i2,lights_fragment_end:r2,lightprobes_pars_fragment:s2,logdepthbuf_fragment:o2,logdepthbuf_pars_fragment:a2,logdepthbuf_pars_vertex:c2,logdepthbuf_vertex:l2,map_fragment:u2,map_pars_fragment:d2,map_particle_fragment:f2,map_particle_pars_fragment:h2,metalnessmap_fragment:p2,metalnessmap_pars_fragment:m2,morphinstance_vertex:g2,morphcolor_vertex:v2,morphnormal_vertex:_2,morphtarget_pars_vertex:y2,morphtarget_vertex:x2,normal_fragment_begin:S2,normal_fragment_maps:M2,normal_pars_fragment:E2,normal_pars_vertex:b2,normal_vertex:w2,normalmap_pars_fragment:T2,clearcoat_normal_fragment_begin:C2,clearcoat_normal_fragment_maps:D2,clearcoat_pars_fragment:A2,iridescence_pars_fragment:I2,opaque_fragment:R2,packing:N2,premultiplied_alpha_fragment:P2,project_vertex:O2,dithering_fragment:L2,dithering_pars_fragment:F2,roughnessmap_fragment:k2,roughnessmap_pars_fragment:U2,shadowmap_pars_fragment:B2,shadowmap_pars_vertex:V2,shadowmap_vertex:H2,shadowmask_pars_fragment:z2,skinbase_vertex:G2,skinning_pars_vertex:j2,skinning_vertex:W2,skinnormal_vertex:$2,specularmap_fragment:q2,specularmap_pars_fragment:X2,tonemapping_fragment:Y2,tonemapping_pars_fragment:Z2,transmission_fragment:K2,transmission_pars_fragment:J2,uv_pars_fragment:Q2,uv_pars_vertex:ek,uv_vertex:tk,worldpos_vertex:nk,background_vert:ik,background_frag:rk,backgroundCube_vert:sk,backgroundCube_frag:ok,cube_vert:ak,cube_frag:ck,depth_vert:lk,depth_frag:uk,distance_vert:dk,distance_frag:fk,equirect_vert:hk,equirect_frag:pk,linedashed_vert:mk,linedashed_frag:gk,meshbasic_vert:vk,meshbasic_frag:_k,meshlambert_vert:yk,meshlambert_frag:xk,meshmatcap_vert:Sk,meshmatcap_frag:Mk,meshnormal_vert:Ek,meshnormal_frag:bk,meshphong_vert:wk,meshphong_frag:Tk,meshphysical_vert:Ck,meshphysical_frag:Dk,meshtoon_vert:Ak,meshtoon_frag:Ik,points_vert:Rk,points_frag:Nk,shadow_vert:Pk,shadow_frag:Ok,sprite_vert:Lk,sprite_frag:Fk},ue={common:{diffuse:{value:new it(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Be},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Be}},envmap:{envMap:{value:null},envMapRotation:{value:new Be},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Be}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Be}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Be},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Be},normalScale:{value:new We(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Be},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Be}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Be}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Be}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new it(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new U},probesMax:{value:new U},probesResolution:{value:new U}},points:{diffuse:{value:new it(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0},uvTransform:{value:new Be}},sprite:{diffuse:{value:new it(16777215)},opacity:{value:1},center:{value:new We(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Be},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0}}},yr={basic:{uniforms:Rn([ue.common,ue.specularmap,ue.envmap,ue.aomap,ue.lightmap,ue.fog]),vertexShader:qe.meshbasic_vert,fragmentShader:qe.meshbasic_frag},lambert:{uniforms:Rn([ue.common,ue.specularmap,ue.envmap,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.fog,ue.lights,{emissive:{value:new it(0)},envMapIntensity:{value:1}}]),vertexShader:qe.meshlambert_vert,fragmentShader:qe.meshlambert_frag},phong:{uniforms:Rn([ue.common,ue.specularmap,ue.envmap,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.fog,ue.lights,{emissive:{value:new it(0)},specular:{value:new it(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:qe.meshphong_vert,fragmentShader:qe.meshphong_frag},standard:{uniforms:Rn([ue.common,ue.envmap,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.roughnessmap,ue.metalnessmap,ue.fog,ue.lights,{emissive:{value:new it(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:qe.meshphysical_vert,fragmentShader:qe.meshphysical_frag},toon:{uniforms:Rn([ue.common,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.gradientmap,ue.fog,ue.lights,{emissive:{value:new it(0)}}]),vertexShader:qe.meshtoon_vert,fragmentShader:qe.meshtoon_frag},matcap:{uniforms:Rn([ue.common,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.fog,{matcap:{value:null}}]),vertexShader:qe.meshmatcap_vert,fragmentShader:qe.meshmatcap_frag},points:{uniforms:Rn([ue.points,ue.fog]),vertexShader:qe.points_vert,fragmentShader:qe.points_frag},dashed:{uniforms:Rn([ue.common,ue.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:qe.linedashed_vert,fragmentShader:qe.linedashed_frag},depth:{uniforms:Rn([ue.common,ue.displacementmap]),vertexShader:qe.depth_vert,fragmentShader:qe.depth_frag},normal:{uniforms:Rn([ue.common,ue.bumpmap,ue.normalmap,ue.displacementmap,{opacity:{value:1}}]),vertexShader:qe.meshnormal_vert,fragmentShader:qe.meshnormal_frag},sprite:{uniforms:Rn([ue.sprite,ue.fog]),vertexShader:qe.sprite_vert,fragmentShader:qe.sprite_frag},background:{uniforms:{uvTransform:{value:new Be},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:qe.background_vert,fragmentShader:qe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Be}},vertexShader:qe.backgroundCube_vert,fragmentShader:qe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:qe.cube_vert,fragmentShader:qe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:qe.equirect_vert,fragmentShader:qe.equirect_frag},distance:{uniforms:Rn([ue.common,ue.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:qe.distance_vert,fragmentShader:qe.distance_frag},shadow:{uniforms:Rn([ue.lights,ue.fog,{color:{value:new it(0)},opacity:{value:1}}]),vertexShader:qe.shadow_vert,fragmentShader:qe.shadow_frag}};yr.physical={uniforms:Rn([yr.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Be},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Be},clearcoatNormalScale:{value:new We(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Be},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Be},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Be},sheen:{value:0},sheenColor:{value:new it(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Be},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Be},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Be},transmissionSamplerSize:{value:new We},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Be},attenuationDistance:{value:0},attenuationColor:{value:new it(0)},specularColor:{value:new it(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Be},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Be},anisotropyVector:{value:new We},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Be}}]),vertexShader:qe.meshphysical_vert,fragmentShader:qe.meshphysical_frag};var ym={r:0,b:0,g:0},kk=new At,RC=new Be;RC.set(-1,0,0,0,1,0,0,0,1);function Uk(n,e,t,i,r,s){let o=new it(0),a=r===!0?0:1,c,l,u=null,d=0,f=null;function h(x){let M=x.isScene===!0?x.background:null;if(M&&M.isTexture){let E=x.backgroundBlurriness>0;M=e.get(M,E)}return M}function m(x){let M=!1,E=h(x);E===null?p(o,a):E&&E.isColor&&(p(E,1),M=!0);let C=n.xr.getEnvironmentBlendMode();C==="additive"?t.buffers.color.setClear(0,0,0,1,s):C==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(n.autoClear||M)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function v(x,M){let E=h(M);E&&(E.isCubeTexture||E.mapping===wu)?(l===void 0&&(l=new Un(new Kr(1,1,1),new ui({name:"BackgroundCubeMaterial",uniforms:Bo(yr.backgroundCube.uniforms),vertexShader:yr.backgroundCube.vertexShader,fragmentShader:yr.backgroundCube.fragmentShader,side:xn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(C,T,D){this.matrixWorld.copyPosition(D.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),l.material.uniforms.envMap.value=E,l.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(kk.makeRotationFromEuler(M.backgroundRotation)).transpose(),E.isCubeTexture&&E.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(RC),l.material.toneMapped=nt.getTransfer(E.colorSpace)!==pt,(u!==E||d!==E.version||f!==n.toneMapping)&&(l.material.needsUpdate=!0,u=E,d=E.version,f=n.toneMapping),l.layers.enableAll(),x.unshift(l,l.geometry,l.material,0,0,null)):E&&E.isTexture&&(c===void 0&&(c=new Un(new gu(2,2),new ui({name:"BackgroundMaterial",uniforms:Bo(yr.background.uniforms),vertexShader:yr.background.vertexShader,fragmentShader:yr.background.fragmentShader,side:Yr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=E,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.toneMapped=nt.getTransfer(E.colorSpace)!==pt,E.matrixAutoUpdate===!0&&E.updateMatrix(),c.material.uniforms.uvTransform.value.copy(E.matrix),(u!==E||d!==E.version||f!==n.toneMapping)&&(c.material.needsUpdate=!0,u=E,d=E.version,f=n.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null))}function p(x,M){x.getRGB(ym,A0(n)),t.buffers.color.setClear(ym.r,ym.g,ym.b,M,s)}function g(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(x,M=1){o.set(x),a=M,p(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(x){a=x,p(o,a)},render:m,addToRenderList:v,dispose:g}}function Bk(n,e){let t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=f(null),s=r,o=!1;function a(A,L,z,j,N){let B=!1,F=d(A,j,z,L);s!==F&&(s=F,l(s.object)),B=h(A,j,z,N),B&&m(A,j,z,N),N!==null&&e.update(N,n.ELEMENT_ARRAY_BUFFER),(B||o)&&(o=!1,E(A,L,z,j),N!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(N).buffer))}function c(){return n.createVertexArray()}function l(A){return n.bindVertexArray(A)}function u(A){return n.deleteVertexArray(A)}function d(A,L,z,j){let N=j.wireframe===!0,B=i[L.id];B===void 0&&(B={},i[L.id]=B);let F=A.isInstancedMesh===!0?A.id:0,Z=B[F];Z===void 0&&(Z={},B[F]=Z);let Q=Z[z.id];Q===void 0&&(Q={},Z[z.id]=Q);let ce=Q[N];return ce===void 0&&(ce=f(c()),Q[N]=ce),ce}function f(A){let L=[],z=[],j=[];for(let N=0;N<t;N++)L[N]=0,z[N]=0,j[N]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:z,attributeDivisors:j,object:A,attributes:{},index:null}}function h(A,L,z,j){let N=s.attributes,B=L.attributes,F=0,Z=z.getAttributes();for(let Q in Z)if(Z[Q].location>=0){let ge=N[Q],Se=B[Q];if(Se===void 0&&(Q==="instanceMatrix"&&A.instanceMatrix&&(Se=A.instanceMatrix),Q==="instanceColor"&&A.instanceColor&&(Se=A.instanceColor)),ge===void 0||ge.attribute!==Se||Se&&ge.data!==Se.data)return!0;F++}return s.attributesNum!==F||s.index!==j}function m(A,L,z,j){let N={},B=L.attributes,F=0,Z=z.getAttributes();for(let Q in Z)if(Z[Q].location>=0){let ge=B[Q];ge===void 0&&(Q==="instanceMatrix"&&A.instanceMatrix&&(ge=A.instanceMatrix),Q==="instanceColor"&&A.instanceColor&&(ge=A.instanceColor));let Se={};Se.attribute=ge,ge&&ge.data&&(Se.data=ge.data),N[Q]=Se,F++}s.attributes=N,s.attributesNum=F,s.index=j}function v(){let A=s.newAttributes;for(let L=0,z=A.length;L<z;L++)A[L]=0}function p(A){g(A,0)}function g(A,L){let z=s.newAttributes,j=s.enabledAttributes,N=s.attributeDivisors;z[A]=1,j[A]===0&&(n.enableVertexAttribArray(A),j[A]=1),N[A]!==L&&(n.vertexAttribDivisor(A,L),N[A]=L)}function x(){let A=s.newAttributes,L=s.enabledAttributes;for(let z=0,j=L.length;z<j;z++)L[z]!==A[z]&&(n.disableVertexAttribArray(z),L[z]=0)}function M(A,L,z,j,N,B,F){F===!0?n.vertexAttribIPointer(A,L,z,N,B):n.vertexAttribPointer(A,L,z,j,N,B)}function E(A,L,z,j){v();let N=j.attributes,B=z.getAttributes(),F=L.defaultAttributeValues;for(let Z in B){let Q=B[Z];if(Q.location>=0){let ce=N[Z];if(ce===void 0&&(Z==="instanceMatrix"&&A.instanceMatrix&&(ce=A.instanceMatrix),Z==="instanceColor"&&A.instanceColor&&(ce=A.instanceColor)),ce!==void 0){let ge=ce.normalized,Se=ce.itemSize,Je=e.get(ce);if(Je===void 0)continue;let Ye=Je.buffer,Ae=Je.type,Y=Je.bytesPerElement,he=Ae===n.INT||Ae===n.UNSIGNED_INT||ce.gpuType===Op;if(ce.isInterleavedBufferAttribute){let re=ce.data,Ie=re.stride,Ve=ce.offset;if(re.isInstancedInterleavedBuffer){for(let Ne=0;Ne<Q.locationSize;Ne++)g(Q.location+Ne,re.meshPerAttribute);A.isInstancedMesh!==!0&&j._maxInstanceCount===void 0&&(j._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let Ne=0;Ne<Q.locationSize;Ne++)p(Q.location+Ne);n.bindBuffer(n.ARRAY_BUFFER,Ye);for(let Ne=0;Ne<Q.locationSize;Ne++)M(Q.location+Ne,Se/Q.locationSize,Ae,ge,Ie*Y,(Ve+Se/Q.locationSize*Ne)*Y,he)}else{if(ce.isInstancedBufferAttribute){for(let re=0;re<Q.locationSize;re++)g(Q.location+re,ce.meshPerAttribute);A.isInstancedMesh!==!0&&j._maxInstanceCount===void 0&&(j._maxInstanceCount=ce.meshPerAttribute*ce.count)}else for(let re=0;re<Q.locationSize;re++)p(Q.location+re);n.bindBuffer(n.ARRAY_BUFFER,Ye);for(let re=0;re<Q.locationSize;re++)M(Q.location+re,Se/Q.locationSize,Ae,ge,Se*Y,Se/Q.locationSize*re*Y,he)}}else if(F!==void 0){let ge=F[Z];if(ge!==void 0)switch(ge.length){case 2:n.vertexAttrib2fv(Q.location,ge);break;case 3:n.vertexAttrib3fv(Q.location,ge);break;case 4:n.vertexAttrib4fv(Q.location,ge);break;default:n.vertexAttrib1fv(Q.location,ge)}}}}x()}function C(){b();for(let A in i){let L=i[A];for(let z in L){let j=L[z];for(let N in j){let B=j[N];for(let F in B)u(B[F].object),delete B[F];delete j[N]}}delete i[A]}}function T(A){if(i[A.id]===void 0)return;let L=i[A.id];for(let z in L){let j=L[z];for(let N in j){let B=j[N];for(let F in B)u(B[F].object),delete B[F];delete j[N]}}delete i[A.id]}function D(A){for(let L in i){let z=i[L];for(let j in z){let N=z[j];if(N[A.id]===void 0)continue;let B=N[A.id];for(let F in B)u(B[F].object),delete B[F];delete N[A.id]}}}function _(A){for(let L in i){let z=i[L],j=A.isInstancedMesh===!0?A.id:0,N=z[j];if(N!==void 0){for(let B in N){let F=N[B];for(let Z in F)u(F[Z].object),delete F[Z];delete N[B]}delete z[j],Object.keys(z).length===0&&delete i[L]}}}function b(){I(),o=!0,s!==r&&(s=r,l(s.object))}function I(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:b,resetDefaultState:I,dispose:C,releaseStatesOfGeometry:T,releaseStatesOfObject:_,releaseStatesOfProgram:D,initAttributes:v,enableAttribute:p,disableUnusedAttributes:x}}function Vk(n,e,t){let i;function r(c){i=c}function s(c,l){n.drawArrays(i,c,l),t.update(l,i,1)}function o(c,l,u){u!==0&&(n.drawArraysInstanced(i,c,l,u),t.update(l,i,u))}function a(c,l,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,l,0,u);let f=0;for(let h=0;h<u;h++)f+=l[h];t.update(f,i,1)}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a}function Hk(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){let D=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(D.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(D){return!(D!==Ti&&i.convert(D)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(D){let _=D===mr&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(D!==jn&&i.convert(D)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&D!==Xi&&!_)}function c(D){if(D==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";D="mediump"}return D==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",u=c(l);u!==l&&(De("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);let d=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&f===!1&&De("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let h=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),m=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_TEXTURE_SIZE),p=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),g=n.getParameter(n.MAX_VERTEX_ATTRIBS),x=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),M=n.getParameter(n.MAX_VARYING_VECTORS),E=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),C=n.getParameter(n.MAX_SAMPLES),T=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:h,maxVertexTextures:m,maxTextureSize:v,maxCubemapSize:p,maxAttributes:g,maxVertexUniforms:x,maxVaryings:M,maxFragmentUniforms:E,maxSamples:C,samples:T}}function zk(n){let e=this,t=null,i=0,r=!1,s=!1,o=new or,a=new Be,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){let h=d.length!==0||f||i!==0||r;return r=f,i=d.length,h},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,f){t=u(d,f,0)},this.setState=function(d,f,h){let m=d.clippingPlanes,v=d.clipIntersection,p=d.clipShadows,g=n.get(d);if(!r||m===null||m.length===0||s&&!p)s?u(null):l();else{let x=s?0:i,M=x*4,E=g.clippingState||null;c.value=E,E=u(m,f,M,h);for(let C=0;C!==M;++C)E[C]=t[C];g.clippingState=E,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=x}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(d,f,h,m){let v=d!==null?d.length:0,p=null;if(v!==0){if(p=c.value,m!==!0||p===null){let g=h+v*4,x=f.matrixWorldInverse;a.getNormalMatrix(x),(p===null||p.length<g)&&(p=new Float32Array(g));for(let M=0,E=h;M!==v;++M,E+=4)o.copy(d[M]).applyMatrix4(x,a),o.normal.toArray(p,E),p[E+3]=o.constant}c.value=p,c.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,p}}var Hs=4,cC=[.125,.215,.35,.446,.526,.582],Vo=20,Gk=256,Pu=new Su,lC=new it,P0=null,O0=0,L0=0,F0=!1,jk=new U,Sm=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,r=100,s={}){let{size:o=256,position:a=jk}=s;P0=this._renderer.getRenderTarget(),O0=this._renderer.getActiveCubeFace(),L0=this._renderer.getActiveMipmapLevel(),F0=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,i,r,c,a),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=fC(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=dC(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(P0,O0,L0),this._renderer.xr.enabled=F0,e.scissorTest=!1,xc(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ks||e.mapping===Uo?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),P0=this._renderer.getRenderTarget(),O0=this._renderer.getActiveCubeFace(),L0=this._renderer.getActiveMipmapLevel(),F0=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:yn,minFilter:yn,generateMipmaps:!1,type:mr,format:Ti,colorSpace:nu,depthBuffer:!1},r=uC(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=uC(e,t,i);let{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Wk(s)),this._blurMaterial=qk(s,e,t),this._ggxMaterial=$k(s,e,t)}return r}_compileMaterial(e){let t=new Un(new Gn,e);this._renderer.compile(t,Pu)}_sceneToCubeUV(e,t,i,r,s){let c=new _n(90,1,t,i),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,f=d.autoClear,h=d.toneMapping;d.getClearColor(lC),d.toneMapping=$i,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(r),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Un(new Kr,new ko({name:"PMREM.Background",side:xn,depthWrite:!1,depthTest:!1})));let v=this._backgroundBox,p=v.material,g=!1,x=e.background;x?x.isColor&&(p.color.copy(x),e.background=null,g=!0):(p.color.copy(lC),g=!0);for(let M=0;M<6;M++){let E=M%3;E===0?(c.up.set(0,l[M],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x+u[M],s.y,s.z)):E===1?(c.up.set(0,0,l[M]),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y+u[M],s.z)):(c.up.set(0,l[M],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y,s.z+u[M]));let C=this._cubeSize;xc(r,E*C,M>2?C:0,C,C),d.setRenderTarget(r),g&&d.render(v,c),d.render(e,c)}d.toneMapping=h,d.autoClear=f,e.background=x}_textureToCubeUV(e,t){let i=this._renderer,r=e.mapping===ks||e.mapping===Uo;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=fC()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=dC());let s=r?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=s;let a=s.uniforms;a.envMap.value=e;let c=this._cubeSize;xc(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(o,Pu)}_applyPMREM(e){let t=this._renderer,i=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=i}_applyGGXFilter(e,t,i){let r=this._renderer,s=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[i];a.material=o;let c=o.uniforms,l=i/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),d=Math.sqrt(l*l-u*u),f=0+l*1.25,h=d*f,{_lodMax:m}=this,v=this._sizeLods[i],p=3*v*(i>m-Hs?i-m+Hs:0),g=4*(this._cubeSize-v);c.envMap.value=e.texture,c.roughness.value=h,c.mipInt.value=m-t,xc(s,p,g,3*v,2*v),r.setRenderTarget(s),r.render(a,Pu),c.envMap.value=s.texture,c.roughness.value=0,c.mipInt.value=m-i,xc(e,p,g,3*v,2*v),r.setRenderTarget(e),r.render(a,Pu)}_blur(e,t,i,r,s){let o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,o,a){let c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&Ce("blur direction must be either latitudinal or longitudinal!");let u=3,d=this._lodMeshes[r];d.material=l;let f=l.uniforms,h=this._sizeLods[i]-1,m=isFinite(s)?Math.PI/(2*h):2*Math.PI/(2*Vo-1),v=s/m,p=isFinite(s)?1+Math.floor(u*v):Vo;p>Vo&&De(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Vo}`);let g=[],x=0;for(let D=0;D<Vo;++D){let _=D/v,b=Math.exp(-_*_/2);g.push(b),D===0?x+=b:D<p&&(x+=2*b)}for(let D=0;D<g.length;D++)g[D]=g[D]/x;f.envMap.value=e.texture,f.samples.value=p,f.weights.value=g,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);let{_lodMax:M}=this;f.dTheta.value=m,f.mipInt.value=M-i;let E=this._sizeLods[r],C=3*E*(r>M-Hs?r-M+Hs:0),T=4*(this._cubeSize-E);xc(t,C,T,3*E,2*E),c.setRenderTarget(t),c.render(d,Pu)}};function Wk(n){let e=[],t=[],i=[],r=n,s=n-Hs+1+cC.length;for(let o=0;o<s;o++){let a=Math.pow(2,r);e.push(a);let c=1/a;o>n-Hs?c=cC[o-n+Hs-1]:o===0&&(c=0),t.push(c);let l=1/(a-2),u=-l,d=1+l,f=[u,u,d,u,d,d,u,u,d,d,u,d],h=6,m=6,v=3,p=2,g=1,x=new Float32Array(v*m*h),M=new Float32Array(p*m*h),E=new Float32Array(g*m*h);for(let T=0;T<h;T++){let D=T%3*2/3-1,_=T>2?0:-1,b=[D,_,0,D+2/3,_,0,D+2/3,_+1,0,D,_,0,D+2/3,_+1,0,D,_+1,0];x.set(b,v*m*T),M.set(f,p*m*T);let I=[T,T,T,T,T,T];E.set(I,g*m*T)}let C=new Gn;C.setAttribute("position",new In(x,v)),C.setAttribute("uv",new In(M,p)),C.setAttribute("faceIndex",new In(E,g)),i.push(new Un(C,null)),r>Hs&&r--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function uC(n,e,t){let i=new li(n,e,t);return i.texture.mapping=wu,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function xc(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function $k(n,e,t){return new ui({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Gk,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:bm(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:pr,depthTest:!1,depthWrite:!1})}function qk(n,e,t){let i=new Float32Array(Vo),r=new U(0,1,0);return new ui({name:"SphericalGaussianBlur",defines:{n:Vo,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:bm(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:pr,depthTest:!1,depthWrite:!1})}function dC(){return new ui({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:bm(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:pr,depthTest:!1,depthWrite:!1})}function fC(){return new ui({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:bm(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:pr,depthTest:!1,depthWrite:!1})}function bm(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}var Mm=class extends li{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new hu(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Kr(5,5,5),s=new ui({name:"CubemapFromEquirect",uniforms:Bo(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:xn,blending:pr});s.uniforms.tEquirect.value=t;let o=new Un(r,s),a=t.minFilter;return t.minFilter===Us&&(t.minFilter=yn),new Ap(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){let s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,r);e.setRenderTarget(s)}};function Xk(n){let e=new WeakMap,t=new WeakMap,i=null;function r(f,h=!1){return f==null?null:h?o(f):s(f)}function s(f){if(f&&f.isTexture){let h=f.mapping;if(h===Rp||h===Np)if(e.has(f)){let m=e.get(f).texture;return a(m,f.mapping)}else{let m=f.image;if(m&&m.height>0){let v=new Mm(m.height);return v.fromEquirectangularTexture(n,f),e.set(f,v),f.addEventListener("dispose",l),a(v.texture,f.mapping)}else return null}}return f}function o(f){if(f&&f.isTexture){let h=f.mapping,m=h===Rp||h===Np,v=h===ks||h===Uo;if(m||v){let p=t.get(f),g=p!==void 0?p.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==g)return i===null&&(i=new Sm(n)),p=m?i.fromEquirectangular(f,p):i.fromCubemap(f,p),p.texture.pmremVersion=f.pmremVersion,t.set(f,p),p.texture;if(p!==void 0)return p.texture;{let x=f.image;return m&&x&&x.height>0||v&&x&&c(x)?(i===null&&(i=new Sm(n)),p=m?i.fromEquirectangular(f):i.fromCubemap(f),p.texture.pmremVersion=f.pmremVersion,t.set(f,p),f.addEventListener("dispose",u),p.texture):null}}}return f}function a(f,h){return h===Rp?f.mapping=ks:h===Np&&(f.mapping=Uo),f}function c(f){let h=0,m=6;for(let v=0;v<m;v++)f[v]!==void 0&&h++;return h===m}function l(f){let h=f.target;h.removeEventListener("dispose",l);let m=e.get(h);m!==void 0&&(e.delete(h),m.dispose())}function u(f){let h=f.target;h.removeEventListener("dispose",u);let m=t.get(h);m!==void 0&&(t.delete(h),m.dispose())}function d(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:d}}function Yk(n){let e={};function t(i){if(e[i]!==void 0)return e[i];let r=n.getExtension(i);return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){let r=t(i);return r===null&&up("WebGLRenderer: "+i+" extension not supported."),r}}}function Zk(n,e,t,i){let r={},s=new WeakMap;function o(d){let f=d.target;f.index!==null&&e.remove(f.index);for(let m in f.attributes)e.remove(f.attributes[m]);f.removeEventListener("dispose",o),delete r[f.id];let h=s.get(f);h&&(e.remove(h),s.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(d,f){return r[f.id]===!0||(f.addEventListener("dispose",o),r[f.id]=!0,t.memory.geometries++),f}function c(d){let f=d.attributes;for(let h in f)e.update(f[h],n.ARRAY_BUFFER)}function l(d){let f=[],h=d.index,m=d.attributes.position,v=0;if(m===void 0)return;if(h!==null){let x=h.array;v=h.version;for(let M=0,E=x.length;M<E;M+=3){let C=x[M+0],T=x[M+1],D=x[M+2];f.push(C,T,T,D,D,C)}}else{let x=m.array;v=m.version;for(let M=0,E=x.length/3-1;M<E;M+=3){let C=M+0,T=M+1,D=M+2;f.push(C,T,T,D,D,C)}}let p=new(m.count>=65535?lu:cu)(f,1);p.version=v;let g=s.get(d);g&&e.remove(g),s.set(d,p)}function u(d){let f=s.get(d);if(f){let h=d.index;h!==null&&f.version<h.version&&l(d)}else l(d);return s.get(d)}return{get:a,update:c,getWireframeAttribute:u}}function Kk(n,e,t){let i;function r(d){i=d}let s,o;function a(d){s=d.type,o=d.bytesPerElement}function c(d,f){n.drawElements(i,f,s,d*o),t.update(f,i,1)}function l(d,f,h){h!==0&&(n.drawElementsInstanced(i,f,s,d*o,h),t.update(f,i,h))}function u(d,f,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,s,d,0,h);let v=0;for(let p=0;p<h;p++)v+=f[p];t.update(v,i,1)}this.setMode=r,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function Jk(n){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(s/3);break;case n.LINES:t.lines+=a*(s/2);break;case n.LINE_STRIP:t.lines+=a*(s-1);break;case n.LINE_LOOP:t.lines+=a*s;break;case n.POINTS:t.points+=a*s;break;default:Ce("WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function Qk(n,e,t){let i=new WeakMap,r=new Pt;function s(o,a,c){let l=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=u!==void 0?u.length:0,f=i.get(a);if(f===void 0||f.count!==d){let I=function(){_.dispose(),i.delete(a),a.removeEventListener("dispose",I)};var h=I;f!==void 0&&f.texture.dispose();let m=a.morphAttributes.position!==void 0,v=a.morphAttributes.normal!==void 0,p=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],x=a.morphAttributes.normal||[],M=a.morphAttributes.color||[],E=0;m===!0&&(E=1),v===!0&&(E=2),p===!0&&(E=3);let C=a.attributes.position.count*E,T=1;C>e.maxTextureSize&&(T=Math.ceil(C/e.maxTextureSize),C=e.maxTextureSize);let D=new Float32Array(C*T*4*d),_=new ou(D,C,T,d);_.type=Xi,_.needsUpdate=!0;let b=E*4;for(let A=0;A<d;A++){let L=g[A],z=x[A],j=M[A],N=C*T*4*A;for(let B=0;B<L.count;B++){let F=B*b;m===!0&&(r.fromBufferAttribute(L,B),D[N+F+0]=r.x,D[N+F+1]=r.y,D[N+F+2]=r.z,D[N+F+3]=0),v===!0&&(r.fromBufferAttribute(z,B),D[N+F+4]=r.x,D[N+F+5]=r.y,D[N+F+6]=r.z,D[N+F+7]=0),p===!0&&(r.fromBufferAttribute(j,B),D[N+F+8]=r.x,D[N+F+9]=r.y,D[N+F+10]=r.z,D[N+F+11]=j.itemSize===4?r.w:1)}}f={count:d,texture:_,size:new We(C,T)},i.set(a,f),a.addEventListener("dispose",I)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let m=0;for(let p=0;p<l.length;p++)m+=l[p];let v=a.morphTargetsRelative?1:1-m;c.getUniforms().setValue(n,"morphTargetBaseInfluence",v),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",f.texture,t),c.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:s}}function eU(n,e,t,i,r){let s=new WeakMap;function o(l){let u=r.render.frame,d=l.geometry,f=e.get(l,d);if(s.get(f)!==u&&(e.update(f),s.set(f,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),s.get(l)!==u&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,u))),l.isSkinnedMesh){let h=l.skeleton;s.get(h)!==u&&(h.update(),s.set(h,u))}return f}function a(){s=new WeakMap}function c(l){let u=l.target;u.removeEventListener("dispose",c),i.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:o,dispose:a}}var tU={[p0]:"LINEAR_TONE_MAPPING",[m0]:"REINHARD_TONE_MAPPING",[g0]:"CINEON_TONE_MAPPING",[v0]:"ACES_FILMIC_TONE_MAPPING",[y0]:"AGX_TONE_MAPPING",[x0]:"NEUTRAL_TONE_MAPPING",[_0]:"CUSTOM_TONE_MAPPING"};function nU(n,e,t,i,r){let s=new li(e,t,{type:n,depthBuffer:i,stencilBuffer:r,depthTexture:i?new Zr(e,t):void 0}),o=new li(e,t,{type:mr,depthBuffer:!1,stencilBuffer:!1}),a=new Gn;a.setAttribute("position",new wi([-1,3,0,-1,-1,0,3,-1,0],3)),a.setAttribute("uv",new wi([0,2,0,0,2,0],2));let c=new _p({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),l=new Un(a,c),u=new Su(-1,1,1,-1,0,1),d=null,f=null,h=!1,m,v=null,p=[],g=!1;this.setSize=function(x,M){s.setSize(x,M),o.setSize(x,M);for(let E=0;E<p.length;E++){let C=p[E];C.setSize&&C.setSize(x,M)}},this.setEffects=function(x){p=x,g=p.length>0&&p[0].isRenderPass===!0;let M=s.width,E=s.height;for(let C=0;C<p.length;C++){let T=p[C];T.setSize&&T.setSize(M,E)}},this.begin=function(x,M){if(h||x.toneMapping===$i&&p.length===0)return!1;if(v=M,M!==null){let E=M.width,C=M.height;(s.width!==E||s.height!==C)&&this.setSize(E,C)}return g===!1&&x.setRenderTarget(s),m=x.toneMapping,x.toneMapping=$i,!0},this.hasRenderPass=function(){return g},this.end=function(x,M){x.toneMapping=m,h=!0;let E=s,C=o;for(let T=0;T<p.length;T++){let D=p[T];if(D.enabled!==!1&&(D.render(x,C,E,M),D.needsSwap!==!1)){let _=E;E=C,C=_}}if(d!==x.outputColorSpace||f!==x.toneMapping){d=x.outputColorSpace,f=x.toneMapping,c.defines={},nt.getTransfer(d)===pt&&(c.defines.SRGB_TRANSFER="");let T=tU[f];T&&(c.defines[T]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=E.texture,x.setRenderTarget(v),x.render(l,u),v=null,h=!1},this.isCompositing=function(){return h},this.dispose=function(){s.depthTexture&&s.depthTexture.dispose(),s.dispose(),o.dispose(),a.dispose(),c.dispose()}}var NC=new gr,B0=new Zr(1,1),PC=new ou,OC=new pp,LC=new hu,hC=[],pC=[],mC=new Float32Array(16),gC=new Float32Array(9),vC=new Float32Array(4);function Mc(n,e,t){let i=n[0];if(i<=0||i>0)return n;let r=e*t,s=hC[r];if(s===void 0&&(s=new Float32Array(r),hC[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(s,a)}return s}function on(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function an(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function wm(n,e){let t=pC[e];t===void 0&&(t=new Int32Array(e),pC[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function iU(n,e){let t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function rU(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(on(t,e))return;n.uniform2fv(this.addr,e),an(t,e)}}function sU(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(on(t,e))return;n.uniform3fv(this.addr,e),an(t,e)}}function oU(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(on(t,e))return;n.uniform4fv(this.addr,e),an(t,e)}}function aU(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(on(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),an(t,e)}else{if(on(t,i))return;vC.set(i),n.uniformMatrix2fv(this.addr,!1,vC),an(t,i)}}function cU(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(on(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),an(t,e)}else{if(on(t,i))return;gC.set(i),n.uniformMatrix3fv(this.addr,!1,gC),an(t,i)}}function lU(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(on(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),an(t,e)}else{if(on(t,i))return;mC.set(i),n.uniformMatrix4fv(this.addr,!1,mC),an(t,i)}}function uU(n,e){let t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function dU(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(on(t,e))return;n.uniform2iv(this.addr,e),an(t,e)}}function fU(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(on(t,e))return;n.uniform3iv(this.addr,e),an(t,e)}}function hU(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(on(t,e))return;n.uniform4iv(this.addr,e),an(t,e)}}function pU(n,e){let t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function mU(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(on(t,e))return;n.uniform2uiv(this.addr,e),an(t,e)}}function gU(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(on(t,e))return;n.uniform3uiv(this.addr,e),an(t,e)}}function vU(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(on(t,e))return;n.uniform4uiv(this.addr,e),an(t,e)}}function _U(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(B0.compareFunction=t.isReversedDepthBuffer()?_m:vm,s=B0):s=NC,t.setTexture2D(e||s,r)}function yU(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||OC,r)}function xU(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||LC,r)}function SU(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||PC,r)}function MU(n){switch(n){case 5126:return iU;case 35664:return rU;case 35665:return sU;case 35666:return oU;case 35674:return aU;case 35675:return cU;case 35676:return lU;case 5124:case 35670:return uU;case 35667:case 35671:return dU;case 35668:case 35672:return fU;case 35669:case 35673:return hU;case 5125:return pU;case 36294:return mU;case 36295:return gU;case 36296:return vU;case 35678:case 36198:case 36298:case 36306:case 35682:return _U;case 35679:case 36299:case 36307:return yU;case 35680:case 36300:case 36308:case 36293:return xU;case 36289:case 36303:case 36311:case 36292:return SU}}function EU(n,e){n.uniform1fv(this.addr,e)}function bU(n,e){let t=Mc(e,this.size,2);n.uniform2fv(this.addr,t)}function wU(n,e){let t=Mc(e,this.size,3);n.uniform3fv(this.addr,t)}function TU(n,e){let t=Mc(e,this.size,4);n.uniform4fv(this.addr,t)}function CU(n,e){let t=Mc(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function DU(n,e){let t=Mc(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function AU(n,e){let t=Mc(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function IU(n,e){n.uniform1iv(this.addr,e)}function RU(n,e){n.uniform2iv(this.addr,e)}function NU(n,e){n.uniform3iv(this.addr,e)}function PU(n,e){n.uniform4iv(this.addr,e)}function OU(n,e){n.uniform1uiv(this.addr,e)}function LU(n,e){n.uniform2uiv(this.addr,e)}function FU(n,e){n.uniform3uiv(this.addr,e)}function kU(n,e){n.uniform4uiv(this.addr,e)}function UU(n,e,t){let i=this.cache,r=e.length,s=wm(t,r);on(i,s)||(n.uniform1iv(this.addr,s),an(i,s));let o;this.type===n.SAMPLER_2D_SHADOW?o=B0:o=NC;for(let a=0;a!==r;++a)t.setTexture2D(e[a]||o,s[a])}function BU(n,e,t){let i=this.cache,r=e.length,s=wm(t,r);on(i,s)||(n.uniform1iv(this.addr,s),an(i,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||OC,s[o])}function VU(n,e,t){let i=this.cache,r=e.length,s=wm(t,r);on(i,s)||(n.uniform1iv(this.addr,s),an(i,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||LC,s[o])}function HU(n,e,t){let i=this.cache,r=e.length,s=wm(t,r);on(i,s)||(n.uniform1iv(this.addr,s),an(i,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||PC,s[o])}function zU(n){switch(n){case 5126:return EU;case 35664:return bU;case 35665:return wU;case 35666:return TU;case 35674:return CU;case 35675:return DU;case 35676:return AU;case 5124:case 35670:return IU;case 35667:case 35671:return RU;case 35668:case 35672:return NU;case 35669:case 35673:return PU;case 5125:return OU;case 36294:return LU;case 36295:return FU;case 36296:return kU;case 35678:case 36198:case 36298:case 36306:case 35682:return UU;case 35679:case 36299:case 36307:return BU;case 35680:case 36300:case 36308:case 36293:return VU;case 36289:case 36303:case 36311:case 36292:return HU}}var V0=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=MU(t.type)}},H0=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=zU(t.type)}},z0=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){let r=this.seq;for(let s=0,o=r.length;s!==o;++s){let a=r[s];a.setValue(e,t[a.id],i)}}},k0=/(\w+)(\])?(\[|\.)?/g;function _C(n,e){n.seq.push(e),n.map[e.id]=e}function GU(n,e,t){let i=n.name,r=i.length;for(k0.lastIndex=0;;){let s=k0.exec(i),o=k0.lastIndex,a=s[1],c=s[2]==="]",l=s[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===r){_C(t,l===void 0?new V0(a,n,e):new H0(a,n,e));break}else{let d=t.map[a];d===void 0&&(d=new z0(a),_C(t,d)),t=d}}}var Sc=class{constructor(e,t){this.seq=[],this.map={};let i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<i;++o){let a=e.getActiveUniform(t,o),c=e.getUniformLocation(t,a.name);GU(a,c,this)}let r=[],s=[];for(let o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(o):s.push(o);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,i,r){let s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){let r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,o=t.length;s!==o;++s){let a=t[s],c=i[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,r)}}static seqWithValue(e,t){let i=[];for(let r=0,s=e.length;r!==s;++r){let o=e[r];o.id in t&&i.push(o)}return i}};function yC(n,e,t){let i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}var jU=37297,WU=0;function $U(n,e){let t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){let a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}var xC=new Be;function qU(n){nt._getMatrix(xC,nt.workingColorSpace,n);let e=`mat3( ${xC.elements.map(t=>t.toFixed(4))} )`;switch(nt.getTransfer(n)){case iu:return[e,"LinearTransferOETF"];case pt:return[e,"sRGBTransferOETF"];default:return De("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function SC(n,e,t){let i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";let o=/ERROR: 0:(\d+)/.exec(s);if(o){let a=parseInt(o[1]);return t.toUpperCase()+`

`+s+`

`+$U(n.getShaderSource(e),a)}else return s}function XU(n,e){let t=qU(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var YU={[p0]:"Linear",[m0]:"Reinhard",[g0]:"Cineon",[v0]:"ACESFilmic",[y0]:"AgX",[x0]:"Neutral",[_0]:"Custom"};function ZU(n,e){let t=YU[e];return t===void 0?(De("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var xm=new U;function KU(){nt.getLuminanceCoefficients(xm);let n=xm.x.toFixed(4),e=xm.y.toFixed(4),t=xm.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function JU(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Lu).join(`
`)}function QU(n){let e=[];for(let t in n){let i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function e3(n,e){let t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){let s=n.getActiveAttrib(e,r),o=s.name,a=1;s.type===n.FLOAT_MAT2&&(a=2),s.type===n.FLOAT_MAT3&&(a=3),s.type===n.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function Lu(n){return n!==""}function MC(n,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function EC(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var t3=/^[ \t]*#include +<([\w\d./]+)>/gm;function G0(n){return n.replace(t3,i3)}var n3=new Map;function i3(n,e){let t=qe[e];if(t===void 0){let i=n3.get(e);if(i!==void 0)t=qe[i],De('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return G0(t)}var r3=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function bC(n){return n.replace(r3,s3)}function s3(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function wC(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}var o3={[bu]:"SHADOWMAP_TYPE_PCF",[vc]:"SHADOWMAP_TYPE_VSM"};function a3(n){return o3[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var c3={[ks]:"ENVMAP_TYPE_CUBE",[Uo]:"ENVMAP_TYPE_CUBE",[wu]:"ENVMAP_TYPE_CUBE_UV"};function l3(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":c3[n.envMapMode]||"ENVMAP_TYPE_CUBE"}var u3={[Uo]:"ENVMAP_MODE_REFRACTION"};function d3(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":u3[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}var f3={[h0]:"ENVMAP_BLENDING_MULTIPLY",[jT]:"ENVMAP_BLENDING_MIX",[WT]:"ENVMAP_BLENDING_ADD"};function h3(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":f3[n.combine]||"ENVMAP_BLENDING_NONE"}function p3(n){let e=n.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function m3(n,e,t,i){let r=n.getContext(),s=t.defines,o=t.vertexShader,a=t.fragmentShader,c=a3(t),l=l3(t),u=d3(t),d=h3(t),f=p3(t),h=JU(t),m=QU(s),v=r.createProgram(),p,g,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Lu).join(`
`),p.length>0&&(p+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Lu).join(`
`),g.length>0&&(g+=`
`)):(p=[wC(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Lu).join(`
`),g=[wC(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==$i?"#define TONE_MAPPING":"",t.toneMapping!==$i?qe.tonemapping_pars_fragment:"",t.toneMapping!==$i?ZU("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",qe.colorspace_pars_fragment,XU("linearToOutputTexel",t.outputColorSpace),KU(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Lu).join(`
`)),o=G0(o),o=MC(o,t),o=EC(o,t),a=G0(a),a=MC(a,t),a=EC(a,t),o=bC(o),a=bC(a),t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,p=[h,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,g=["#define varying in",t.glslVersion===D0?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===D0?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);let M=x+p+o,E=x+g+a,C=yC(r,r.VERTEX_SHADER,M),T=yC(r,r.FRAGMENT_SHADER,E);r.attachShader(v,C),r.attachShader(v,T),t.index0AttributeName!==void 0?r.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(v,0,"position"),r.linkProgram(v);function D(A){if(n.debug.checkShaderErrors){let L=r.getProgramInfoLog(v)||"",z=r.getShaderInfoLog(C)||"",j=r.getShaderInfoLog(T)||"",N=L.trim(),B=z.trim(),F=j.trim(),Z=!0,Q=!0;if(r.getProgramParameter(v,r.LINK_STATUS)===!1)if(Z=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,v,C,T);else{let ce=SC(r,C,"vertex"),ge=SC(r,T,"fragment");Ce("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(v,r.VALIDATE_STATUS)+`

Material Name: `+A.name+`
Material Type: `+A.type+`

Program Info Log: `+N+`
`+ce+`
`+ge)}else N!==""?De("WebGLProgram: Program Info Log:",N):(B===""||F==="")&&(Q=!1);Q&&(A.diagnostics={runnable:Z,programLog:N,vertexShader:{log:B,prefix:p},fragmentShader:{log:F,prefix:g}})}r.deleteShader(C),r.deleteShader(T),_=new Sc(r,v),b=e3(r,v)}let _;this.getUniforms=function(){return _===void 0&&D(this),_};let b;this.getAttributes=function(){return b===void 0&&D(this),b};let I=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return I===!1&&(I=r.getProgramParameter(v,jU)),I},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=WU++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=C,this.fragmentShader=T,this}var g3=0,j0=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){let t=this.shaderCache,i=t.get(e);return i===void 0&&(i=new W0(e),t.set(e,i)),i}},W0=class{constructor(e){this.id=g3++,this.code=e,this.usedTimes=0}};function v3(n){return n===Vs||n===Ru||n===Nu}function _3(n,e,t,i,r,s){let o=new uc,a=new j0,c=new Set,l=[],u=new Map,d=i.logarithmicDepthBuffer,f=i.precision,h={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(_){return c.add(_),_===0?"uv":`uv${_}`}function v(_,b,I,A,L,z){let j=A.fog,N=L.geometry,B=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?A.environment:null,F=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,Z=e.get(_.envMap||B,F),Q=Z&&Z.mapping===wu?Z.image.height:null,ce=h[_.type];_.precision!==null&&(f=i.getMaxPrecision(_.precision),f!==_.precision&&De("WebGLProgram.getParameters:",_.precision,"not supported, using",f,"instead."));let ge=N.morphAttributes.position||N.morphAttributes.normal||N.morphAttributes.color,Se=ge!==void 0?ge.length:0,Je=0;N.morphAttributes.position!==void 0&&(Je=1),N.morphAttributes.normal!==void 0&&(Je=2),N.morphAttributes.color!==void 0&&(Je=3);let Ye,Ae,Y,he;if(ce){let ze=yr[ce];Ye=ze.vertexShader,Ae=ze.fragmentShader}else Ye=_.vertexShader,Ae=_.fragmentShader,a.update(_),Y=a.getVertexShaderID(_),he=a.getFragmentShaderID(_);let re=n.getRenderTarget(),Ie=n.state.buffers.depth.getReversed(),Ve=L.isInstancedMesh===!0,Ne=L.isBatchedMesh===!0,Rt=!!_.map,Qe=!!_.matcap,mt=!!Z,Dt=!!_.aoMap,Ze=!!_.lightMap,Qt=!!_.bumpMap,Nt=!!_.normalMap,Zn=!!_.displacementMap,P=!!_.emissiveMap,en=!!_.metalnessMap,et=!!_.roughnessMap,Tt=_.anisotropy>0,le=_.clearcoat>0,kt=_.dispersion>0,w=_.iridescence>0,y=_.sheen>0,k=_.transmission>0,q=Tt&&!!_.anisotropyMap,J=le&&!!_.clearcoatMap,te=le&&!!_.clearcoatNormalMap,ae=le&&!!_.clearcoatRoughnessMap,W=w&&!!_.iridescenceMap,X=w&&!!_.iridescenceThicknessMap,pe=y&&!!_.sheenColorMap,ye=y&&!!_.sheenRoughnessMap,se=!!_.specularMap,ne=!!_.specularColorMap,Fe=!!_.specularIntensityMap,je=k&&!!_.transmissionMap,at=k&&!!_.thicknessMap,R=!!_.gradientMap,ie=!!_.alphaMap,$=_.alphaTest>0,me=!!_.alphaHash,oe=!!_.extensions,K=$i;_.toneMapped&&(re===null||re.isXRRenderTarget===!0)&&(K=n.toneMapping);let Ee={shaderID:ce,shaderType:_.type,shaderName:_.name,vertexShader:Ye,fragmentShader:Ae,defines:_.defines,customVertexShaderID:Y,customFragmentShaderID:he,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:f,batching:Ne,batchingColor:Ne&&L._colorsTexture!==null,instancing:Ve,instancingColor:Ve&&L.instanceColor!==null,instancingMorph:Ve&&L.morphTexture!==null,outputColorSpace:re===null?n.outputColorSpace:re.isXRRenderTarget===!0?re.texture.colorSpace:nt.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:Rt,matcap:Qe,envMap:mt,envMapMode:mt&&Z.mapping,envMapCubeUVHeight:Q,aoMap:Dt,lightMap:Ze,bumpMap:Qt,normalMap:Nt,displacementMap:Zn,emissiveMap:P,normalMapObjectSpace:Nt&&_.normalMapType===XT,normalMapTangentSpace:Nt&&_.normalMapType===gm,packedNormalMap:Nt&&_.normalMapType===gm&&v3(_.normalMap.format),metalnessMap:en,roughnessMap:et,anisotropy:Tt,anisotropyMap:q,clearcoat:le,clearcoatMap:J,clearcoatNormalMap:te,clearcoatRoughnessMap:ae,dispersion:kt,iridescence:w,iridescenceMap:W,iridescenceThicknessMap:X,sheen:y,sheenColorMap:pe,sheenRoughnessMap:ye,specularMap:se,specularColorMap:ne,specularIntensityMap:Fe,transmission:k,transmissionMap:je,thicknessMap:at,gradientMap:R,opaque:_.transparent===!1&&_.blending===Oo&&_.alphaToCoverage===!1,alphaMap:ie,alphaTest:$,alphaHash:me,combine:_.combine,mapUv:Rt&&m(_.map.channel),aoMapUv:Dt&&m(_.aoMap.channel),lightMapUv:Ze&&m(_.lightMap.channel),bumpMapUv:Qt&&m(_.bumpMap.channel),normalMapUv:Nt&&m(_.normalMap.channel),displacementMapUv:Zn&&m(_.displacementMap.channel),emissiveMapUv:P&&m(_.emissiveMap.channel),metalnessMapUv:en&&m(_.metalnessMap.channel),roughnessMapUv:et&&m(_.roughnessMap.channel),anisotropyMapUv:q&&m(_.anisotropyMap.channel),clearcoatMapUv:J&&m(_.clearcoatMap.channel),clearcoatNormalMapUv:te&&m(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ae&&m(_.clearcoatRoughnessMap.channel),iridescenceMapUv:W&&m(_.iridescenceMap.channel),iridescenceThicknessMapUv:X&&m(_.iridescenceThicknessMap.channel),sheenColorMapUv:pe&&m(_.sheenColorMap.channel),sheenRoughnessMapUv:ye&&m(_.sheenRoughnessMap.channel),specularMapUv:se&&m(_.specularMap.channel),specularColorMapUv:ne&&m(_.specularColorMap.channel),specularIntensityMapUv:Fe&&m(_.specularIntensityMap.channel),transmissionMapUv:je&&m(_.transmissionMap.channel),thicknessMapUv:at&&m(_.thicknessMap.channel),alphaMapUv:ie&&m(_.alphaMap.channel),vertexTangents:!!N.attributes.tangent&&(Nt||Tt),vertexNormals:!!N.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!N.attributes.color&&N.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!N.attributes.uv&&(Rt||ie),fog:!!j,useFog:_.fog===!0,fogExp2:!!j&&j.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||N.attributes.normal===void 0&&Nt===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:Ie,skinning:L.isSkinnedMesh===!0,morphTargets:N.morphAttributes.position!==void 0,morphNormals:N.morphAttributes.normal!==void 0,morphColors:N.morphAttributes.color!==void 0,morphTargetsCount:Se,morphTextureStride:Je,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numLightProbeGrids:z.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:_.dithering,shadowMapEnabled:n.shadowMap.enabled&&I.length>0,shadowMapType:n.shadowMap.type,toneMapping:K,decodeVideoTexture:Rt&&_.map.isVideoTexture===!0&&nt.getTransfer(_.map.colorSpace)===pt,decodeVideoTextureEmissive:P&&_.emissiveMap.isVideoTexture===!0&&nt.getTransfer(_.emissiveMap.colorSpace)===pt,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===hr,flipSided:_.side===xn,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:oe&&_.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(oe&&_.extensions.multiDraw===!0||Ne)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return Ee.vertexUv1s=c.has(1),Ee.vertexUv2s=c.has(2),Ee.vertexUv3s=c.has(3),c.clear(),Ee}function p(_){let b=[];if(_.shaderID?b.push(_.shaderID):(b.push(_.customVertexShaderID),b.push(_.customFragmentShaderID)),_.defines!==void 0)for(let I in _.defines)b.push(I),b.push(_.defines[I]);return _.isRawShaderMaterial===!1&&(g(b,_),x(b,_),b.push(n.outputColorSpace)),b.push(_.customProgramCacheKey),b.join()}function g(_,b){_.push(b.precision),_.push(b.outputColorSpace),_.push(b.envMapMode),_.push(b.envMapCubeUVHeight),_.push(b.mapUv),_.push(b.alphaMapUv),_.push(b.lightMapUv),_.push(b.aoMapUv),_.push(b.bumpMapUv),_.push(b.normalMapUv),_.push(b.displacementMapUv),_.push(b.emissiveMapUv),_.push(b.metalnessMapUv),_.push(b.roughnessMapUv),_.push(b.anisotropyMapUv),_.push(b.clearcoatMapUv),_.push(b.clearcoatNormalMapUv),_.push(b.clearcoatRoughnessMapUv),_.push(b.iridescenceMapUv),_.push(b.iridescenceThicknessMapUv),_.push(b.sheenColorMapUv),_.push(b.sheenRoughnessMapUv),_.push(b.specularMapUv),_.push(b.specularColorMapUv),_.push(b.specularIntensityMapUv),_.push(b.transmissionMapUv),_.push(b.thicknessMapUv),_.push(b.combine),_.push(b.fogExp2),_.push(b.sizeAttenuation),_.push(b.morphTargetsCount),_.push(b.morphAttributeCount),_.push(b.numDirLights),_.push(b.numPointLights),_.push(b.numSpotLights),_.push(b.numSpotLightMaps),_.push(b.numHemiLights),_.push(b.numRectAreaLights),_.push(b.numDirLightShadows),_.push(b.numPointLightShadows),_.push(b.numSpotLightShadows),_.push(b.numSpotLightShadowsWithMaps),_.push(b.numLightProbes),_.push(b.shadowMapType),_.push(b.toneMapping),_.push(b.numClippingPlanes),_.push(b.numClipIntersection),_.push(b.depthPacking)}function x(_,b){o.disableAll(),b.instancing&&o.enable(0),b.instancingColor&&o.enable(1),b.instancingMorph&&o.enable(2),b.matcap&&o.enable(3),b.envMap&&o.enable(4),b.normalMapObjectSpace&&o.enable(5),b.normalMapTangentSpace&&o.enable(6),b.clearcoat&&o.enable(7),b.iridescence&&o.enable(8),b.alphaTest&&o.enable(9),b.vertexColors&&o.enable(10),b.vertexAlphas&&o.enable(11),b.vertexUv1s&&o.enable(12),b.vertexUv2s&&o.enable(13),b.vertexUv3s&&o.enable(14),b.vertexTangents&&o.enable(15),b.anisotropy&&o.enable(16),b.alphaHash&&o.enable(17),b.batching&&o.enable(18),b.dispersion&&o.enable(19),b.batchingColor&&o.enable(20),b.gradientMap&&o.enable(21),b.packedNormalMap&&o.enable(22),b.vertexNormals&&o.enable(23),_.push(o.mask),o.disableAll(),b.fog&&o.enable(0),b.useFog&&o.enable(1),b.flatShading&&o.enable(2),b.logarithmicDepthBuffer&&o.enable(3),b.reversedDepthBuffer&&o.enable(4),b.skinning&&o.enable(5),b.morphTargets&&o.enable(6),b.morphNormals&&o.enable(7),b.morphColors&&o.enable(8),b.premultipliedAlpha&&o.enable(9),b.shadowMapEnabled&&o.enable(10),b.doubleSided&&o.enable(11),b.flipSided&&o.enable(12),b.useDepthPacking&&o.enable(13),b.dithering&&o.enable(14),b.transmission&&o.enable(15),b.sheen&&o.enable(16),b.opaque&&o.enable(17),b.pointsUvs&&o.enable(18),b.decodeVideoTexture&&o.enable(19),b.decodeVideoTextureEmissive&&o.enable(20),b.alphaToCoverage&&o.enable(21),b.numLightProbeGrids>0&&o.enable(22),_.push(o.mask)}function M(_){let b=h[_.type],I;if(b){let A=yr[b];I=aC.clone(A.uniforms)}else I=_.uniforms;return I}function E(_,b){let I=u.get(b);return I!==void 0?++I.usedTimes:(I=new m3(n,b,_,r),l.push(I),u.set(b,I)),I}function C(_){if(--_.usedTimes===0){let b=l.indexOf(_);l[b]=l[l.length-1],l.pop(),u.delete(_.cacheKey),_.destroy()}}function T(_){a.remove(_)}function D(){a.dispose()}return{getParameters:v,getProgramCacheKey:p,getUniforms:M,acquireProgram:E,releaseProgram:C,releaseShaderCache:T,programs:l,dispose:D}}function y3(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function r(o,a,c){n.get(o)[a]=c}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function x3(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function TC(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function CC(){let n=[],e=0,t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function o(f){let h=0;return f.isInstancedMesh&&(h+=2),f.isSkinnedMesh&&(h+=1),h}function a(f,h,m,v,p,g){let x=n[e];return x===void 0?(x={id:f.id,object:f,geometry:h,material:m,materialVariant:o(f),groupOrder:v,renderOrder:f.renderOrder,z:p,group:g},n[e]=x):(x.id=f.id,x.object=f,x.geometry=h,x.material=m,x.materialVariant=o(f),x.groupOrder=v,x.renderOrder=f.renderOrder,x.z=p,x.group=g),e++,x}function c(f,h,m,v,p,g){let x=a(f,h,m,v,p,g);m.transmission>0?i.push(x):m.transparent===!0?r.push(x):t.push(x)}function l(f,h,m,v,p,g){let x=a(f,h,m,v,p,g);m.transmission>0?i.unshift(x):m.transparent===!0?r.unshift(x):t.unshift(x)}function u(f,h){t.length>1&&t.sort(f||x3),i.length>1&&i.sort(h||TC),r.length>1&&r.sort(h||TC)}function d(){for(let f=e,h=n.length;f<h;f++){let m=n[f];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:c,unshift:l,finish:d,sort:u}}function S3(){let n=new WeakMap;function e(i,r){let s=n.get(i),o;return s===void 0?(o=new CC,n.set(i,[o])):r>=s.length?(o=new CC,s.push(o)):o=s[r],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function M3(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new U,color:new it};break;case"SpotLight":t={position:new U,direction:new U,color:new it,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new U,color:new it,distance:0,decay:0};break;case"HemisphereLight":t={direction:new U,skyColor:new it,groundColor:new it};break;case"RectAreaLight":t={color:new it,position:new U,halfWidth:new U,halfHeight:new U};break}return n[e.id]=t,t}}}function E3(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}var b3=0;function w3(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function T3(n){let e=new M3,t=E3(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new U);let r=new U,s=new At,o=new At;function a(l){let u=0,d=0,f=0;for(let b=0;b<9;b++)i.probe[b].set(0,0,0);let h=0,m=0,v=0,p=0,g=0,x=0,M=0,E=0,C=0,T=0,D=0;l.sort(w3);for(let b=0,I=l.length;b<I;b++){let A=l[b],L=A.color,z=A.intensity,j=A.distance,N=null;if(A.shadow&&A.shadow.map&&(A.shadow.map.texture.format===Vs?N=A.shadow.map.texture:N=A.shadow.map.depthTexture||A.shadow.map.texture),A.isAmbientLight)u+=L.r*z,d+=L.g*z,f+=L.b*z;else if(A.isLightProbe){for(let B=0;B<9;B++)i.probe[B].addScaledVector(A.sh.coefficients[B],z);D++}else if(A.isDirectionalLight){let B=e.get(A);if(B.color.copy(A.color).multiplyScalar(A.intensity),A.castShadow){let F=A.shadow,Z=t.get(A);Z.shadowIntensity=F.intensity,Z.shadowBias=F.bias,Z.shadowNormalBias=F.normalBias,Z.shadowRadius=F.radius,Z.shadowMapSize=F.mapSize,i.directionalShadow[h]=Z,i.directionalShadowMap[h]=N,i.directionalShadowMatrix[h]=A.shadow.matrix,x++}i.directional[h]=B,h++}else if(A.isSpotLight){let B=e.get(A);B.position.setFromMatrixPosition(A.matrixWorld),B.color.copy(L).multiplyScalar(z),B.distance=j,B.coneCos=Math.cos(A.angle),B.penumbraCos=Math.cos(A.angle*(1-A.penumbra)),B.decay=A.decay,i.spot[v]=B;let F=A.shadow;if(A.map&&(i.spotLightMap[C]=A.map,C++,F.updateMatrices(A),A.castShadow&&T++),i.spotLightMatrix[v]=F.matrix,A.castShadow){let Z=t.get(A);Z.shadowIntensity=F.intensity,Z.shadowBias=F.bias,Z.shadowNormalBias=F.normalBias,Z.shadowRadius=F.radius,Z.shadowMapSize=F.mapSize,i.spotShadow[v]=Z,i.spotShadowMap[v]=N,E++}v++}else if(A.isRectAreaLight){let B=e.get(A);B.color.copy(L).multiplyScalar(z),B.halfWidth.set(A.width*.5,0,0),B.halfHeight.set(0,A.height*.5,0),i.rectArea[p]=B,p++}else if(A.isPointLight){let B=e.get(A);if(B.color.copy(A.color).multiplyScalar(A.intensity),B.distance=A.distance,B.decay=A.decay,A.castShadow){let F=A.shadow,Z=t.get(A);Z.shadowIntensity=F.intensity,Z.shadowBias=F.bias,Z.shadowNormalBias=F.normalBias,Z.shadowRadius=F.radius,Z.shadowMapSize=F.mapSize,Z.shadowCameraNear=F.camera.near,Z.shadowCameraFar=F.camera.far,i.pointShadow[m]=Z,i.pointShadowMap[m]=N,i.pointShadowMatrix[m]=A.shadow.matrix,M++}i.point[m]=B,m++}else if(A.isHemisphereLight){let B=e.get(A);B.skyColor.copy(A.color).multiplyScalar(z),B.groundColor.copy(A.groundColor).multiplyScalar(z),i.hemi[g]=B,g++}}p>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ue.LTC_FLOAT_1,i.rectAreaLTC2=ue.LTC_FLOAT_2):(i.rectAreaLTC1=ue.LTC_HALF_1,i.rectAreaLTC2=ue.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=d,i.ambient[2]=f;let _=i.hash;(_.directionalLength!==h||_.pointLength!==m||_.spotLength!==v||_.rectAreaLength!==p||_.hemiLength!==g||_.numDirectionalShadows!==x||_.numPointShadows!==M||_.numSpotShadows!==E||_.numSpotMaps!==C||_.numLightProbes!==D)&&(i.directional.length=h,i.spot.length=v,i.rectArea.length=p,i.point.length=m,i.hemi.length=g,i.directionalShadow.length=x,i.directionalShadowMap.length=x,i.pointShadow.length=M,i.pointShadowMap.length=M,i.spotShadow.length=E,i.spotShadowMap.length=E,i.directionalShadowMatrix.length=x,i.pointShadowMatrix.length=M,i.spotLightMatrix.length=E+C-T,i.spotLightMap.length=C,i.numSpotLightShadowsWithMaps=T,i.numLightProbes=D,_.directionalLength=h,_.pointLength=m,_.spotLength=v,_.rectAreaLength=p,_.hemiLength=g,_.numDirectionalShadows=x,_.numPointShadows=M,_.numSpotShadows=E,_.numSpotMaps=C,_.numLightProbes=D,i.version=b3++)}function c(l,u){let d=0,f=0,h=0,m=0,v=0,p=u.matrixWorldInverse;for(let g=0,x=l.length;g<x;g++){let M=l[g];if(M.isDirectionalLight){let E=i.directional[d];E.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),E.direction.sub(r),E.direction.transformDirection(p),d++}else if(M.isSpotLight){let E=i.spot[h];E.position.setFromMatrixPosition(M.matrixWorld),E.position.applyMatrix4(p),E.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),E.direction.sub(r),E.direction.transformDirection(p),h++}else if(M.isRectAreaLight){let E=i.rectArea[m];E.position.setFromMatrixPosition(M.matrixWorld),E.position.applyMatrix4(p),o.identity(),s.copy(M.matrixWorld),s.premultiply(p),o.extractRotation(s),E.halfWidth.set(M.width*.5,0,0),E.halfHeight.set(0,M.height*.5,0),E.halfWidth.applyMatrix4(o),E.halfHeight.applyMatrix4(o),m++}else if(M.isPointLight){let E=i.point[f];E.position.setFromMatrixPosition(M.matrixWorld),E.position.applyMatrix4(p),f++}else if(M.isHemisphereLight){let E=i.hemi[v];E.direction.setFromMatrixPosition(M.matrixWorld),E.direction.transformDirection(p),v++}}}return{setup:a,setupView:c,state:i}}function DC(n){let e=new T3(n),t=[],i=[],r=[];function s(f){d.camera=f,t.length=0,i.length=0,r.length=0}function o(f){t.push(f)}function a(f){i.push(f)}function c(f){r.push(f)}function l(){e.setup(t)}function u(f){e.setupView(t,f)}let d={lightsArray:t,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:d,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:a,pushLightProbeGrid:c}}function C3(n){let e=new WeakMap;function t(r,s=0){let o=e.get(r),a;return o===void 0?(a=new DC(n),e.set(r,[a])):s>=o.length?(a=new DC(n),o.push(a)):a=o[s],a}function i(){e=new WeakMap}return{get:t,dispose:i}}var D3=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,A3=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,I3=[new U(1,0,0),new U(-1,0,0),new U(0,1,0),new U(0,-1,0),new U(0,0,1),new U(0,0,-1)],R3=[new U(0,-1,0),new U(0,-1,0),new U(0,0,1),new U(0,0,-1),new U(0,-1,0),new U(0,-1,0)],AC=new At,Ou=new U,U0=new U;function N3(n,e,t){let i=new pc,r=new We,s=new We,o=new Pt,a=new yp,c=new xp,l={},u=t.maxTextureSize,d={[Yr]:xn,[xn]:Yr,[hr]:hr},f=new ui({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new We},radius:{value:4}},vertexShader:D3,fragmentShader:A3}),h=f.clone();h.defines.HORIZONTAL_PASS=1;let m=new Gn;m.setAttribute("position",new In(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let v=new Un(m,f),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=bu;let g=this.type;this.render=function(T,D,_){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||T.length===0)return;this.type===wT&&(De("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=bu);let b=n.getRenderTarget(),I=n.getActiveCubeFace(),A=n.getActiveMipmapLevel(),L=n.state;L.setBlending(pr),L.buffers.depth.getReversed()===!0?L.buffers.color.setClear(0,0,0,0):L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);let z=g!==this.type;z&&D.traverse(function(j){j.material&&(Array.isArray(j.material)?j.material.forEach(N=>N.needsUpdate=!0):j.material.needsUpdate=!0)});for(let j=0,N=T.length;j<N;j++){let B=T[j],F=B.shadow;if(F===void 0){De("WebGLShadowMap:",B,"has no shadow.");continue}if(F.autoUpdate===!1&&F.needsUpdate===!1)continue;r.copy(F.mapSize);let Z=F.getFrameExtents();r.multiply(Z),s.copy(F.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/Z.x),r.x=s.x*Z.x,F.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/Z.y),r.y=s.y*Z.y,F.mapSize.y=s.y));let Q=n.state.buffers.depth.getReversed();if(F.camera._reversedDepth=Q,F.map===null||z===!0){if(F.map!==null&&(F.map.depthTexture!==null&&(F.map.depthTexture.dispose(),F.map.depthTexture=null),F.map.dispose()),this.type===vc){if(B.isPointLight){De("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}F.map=new li(r.x,r.y,{format:Vs,type:mr,minFilter:yn,magFilter:yn,generateMipmaps:!1}),F.map.texture.name=B.name+".shadowMap",F.map.depthTexture=new Zr(r.x,r.y,Xi),F.map.depthTexture.name=B.name+".shadowMapDepth",F.map.depthTexture.format=lr,F.map.depthTexture.compareFunction=null,F.map.depthTexture.minFilter=fn,F.map.depthTexture.magFilter=fn}else B.isPointLight?(F.map=new Mm(r.x),F.map.depthTexture=new vp(r.x,qi)):(F.map=new li(r.x,r.y),F.map.depthTexture=new Zr(r.x,r.y,qi)),F.map.depthTexture.name=B.name+".shadowMap",F.map.depthTexture.format=lr,this.type===bu?(F.map.depthTexture.compareFunction=Q?_m:vm,F.map.depthTexture.minFilter=yn,F.map.depthTexture.magFilter=yn):(F.map.depthTexture.compareFunction=null,F.map.depthTexture.minFilter=fn,F.map.depthTexture.magFilter=fn);F.camera.updateProjectionMatrix()}let ce=F.map.isWebGLCubeRenderTarget?6:1;for(let ge=0;ge<ce;ge++){if(F.map.isWebGLCubeRenderTarget)n.setRenderTarget(F.map,ge),n.clear();else{ge===0&&(n.setRenderTarget(F.map),n.clear());let Se=F.getViewport(ge);o.set(s.x*Se.x,s.y*Se.y,s.x*Se.z,s.y*Se.w),L.viewport(o)}if(B.isPointLight){let Se=F.camera,Je=F.matrix,Ye=B.distance||Se.far;Ye!==Se.far&&(Se.far=Ye,Se.updateProjectionMatrix()),Ou.setFromMatrixPosition(B.matrixWorld),Se.position.copy(Ou),U0.copy(Se.position),U0.add(I3[ge]),Se.up.copy(R3[ge]),Se.lookAt(U0),Se.updateMatrixWorld(),Je.makeTranslation(-Ou.x,-Ou.y,-Ou.z),AC.multiplyMatrices(Se.projectionMatrix,Se.matrixWorldInverse),F._frustum.setFromProjectionMatrix(AC,Se.coordinateSystem,Se.reversedDepth)}else F.updateMatrices(B);i=F.getFrustum(),E(D,_,F.camera,B,this.type)}F.isPointLightShadow!==!0&&this.type===vc&&x(F,_),F.needsUpdate=!1}g=this.type,p.needsUpdate=!1,n.setRenderTarget(b,I,A)};function x(T,D){let _=e.update(v);f.defines.VSM_SAMPLES!==T.blurSamples&&(f.defines.VSM_SAMPLES=T.blurSamples,h.defines.VSM_SAMPLES=T.blurSamples,f.needsUpdate=!0,h.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new li(r.x,r.y,{format:Vs,type:mr})),f.uniforms.shadow_pass.value=T.map.depthTexture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,n.setRenderTarget(T.mapPass),n.clear(),n.renderBufferDirect(D,null,_,f,v,null),h.uniforms.shadow_pass.value=T.mapPass.texture,h.uniforms.resolution.value=T.mapSize,h.uniforms.radius.value=T.radius,n.setRenderTarget(T.map),n.clear(),n.renderBufferDirect(D,null,_,h,v,null)}function M(T,D,_,b){let I=null,A=_.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(A!==void 0)I=A;else if(I=_.isPointLight===!0?c:a,n.localClippingEnabled&&D.clipShadows===!0&&Array.isArray(D.clippingPlanes)&&D.clippingPlanes.length!==0||D.displacementMap&&D.displacementScale!==0||D.alphaMap&&D.alphaTest>0||D.map&&D.alphaTest>0||D.alphaToCoverage===!0){let L=I.uuid,z=D.uuid,j=l[L];j===void 0&&(j={},l[L]=j);let N=j[z];N===void 0&&(N=I.clone(),j[z]=N,D.addEventListener("dispose",C)),I=N}if(I.visible=D.visible,I.wireframe=D.wireframe,b===vc?I.side=D.shadowSide!==null?D.shadowSide:D.side:I.side=D.shadowSide!==null?D.shadowSide:d[D.side],I.alphaMap=D.alphaMap,I.alphaTest=D.alphaToCoverage===!0?.5:D.alphaTest,I.map=D.map,I.clipShadows=D.clipShadows,I.clippingPlanes=D.clippingPlanes,I.clipIntersection=D.clipIntersection,I.displacementMap=D.displacementMap,I.displacementScale=D.displacementScale,I.displacementBias=D.displacementBias,I.wireframeLinewidth=D.wireframeLinewidth,I.linewidth=D.linewidth,_.isPointLight===!0&&I.isMeshDistanceMaterial===!0){let L=n.properties.get(I);L.light=_}return I}function E(T,D,_,b,I){if(T.visible===!1)return;if(T.layers.test(D.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&I===vc)&&(!T.frustumCulled||i.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,T.matrixWorld);let z=e.update(T),j=T.material;if(Array.isArray(j)){let N=z.groups;for(let B=0,F=N.length;B<F;B++){let Z=N[B],Q=j[Z.materialIndex];if(Q&&Q.visible){let ce=M(T,Q,b,I);T.onBeforeShadow(n,T,D,_,z,ce,Z),n.renderBufferDirect(_,null,z,ce,T,Z),T.onAfterShadow(n,T,D,_,z,ce,Z)}}}else if(j.visible){let N=M(T,j,b,I);T.onBeforeShadow(n,T,D,_,z,N,null),n.renderBufferDirect(_,null,z,N,T,null),T.onAfterShadow(n,T,D,_,z,N,null)}}let L=T.children;for(let z=0,j=L.length;z<j;z++)E(L[z],D,_,b,I)}function C(T){T.target.removeEventListener("dispose",C);for(let _ in l){let b=l[_],I=T.target.uuid;I in b&&(b[I].dispose(),delete b[I])}}}function P3(n,e){function t(){let R=!1,ie=new Pt,$=null,me=new Pt(0,0,0,0);return{setMask:function(oe){$!==oe&&!R&&(n.colorMask(oe,oe,oe,oe),$=oe)},setLocked:function(oe){R=oe},setClear:function(oe,K,Ee,ze,jt){jt===!0&&(oe*=ze,K*=ze,Ee*=ze),ie.set(oe,K,Ee,ze),me.equals(ie)===!1&&(n.clearColor(oe,K,Ee,ze),me.copy(ie))},reset:function(){R=!1,$=null,me.set(-1,0,0,0)}}}function i(){let R=!1,ie=!1,$=null,me=null,oe=null;return{setReversed:function(K){if(ie!==K){let Ee=e.get("EXT_clip_control");K?Ee.clipControlEXT(Ee.LOWER_LEFT_EXT,Ee.ZERO_TO_ONE_EXT):Ee.clipControlEXT(Ee.LOWER_LEFT_EXT,Ee.NEGATIVE_ONE_TO_ONE_EXT),ie=K;let ze=oe;oe=null,this.setClear(ze)}},getReversed:function(){return ie},setTest:function(K){K?re(n.DEPTH_TEST):Ie(n.DEPTH_TEST)},setMask:function(K){$!==K&&!R&&(n.depthMask(K),$=K)},setFunc:function(K){if(ie&&(K=rC[K]),me!==K){switch(K){case Qh:n.depthFunc(n.NEVER);break;case ep:n.depthFunc(n.ALWAYS);break;case tp:n.depthFunc(n.LESS);break;case Lo:n.depthFunc(n.LEQUAL);break;case np:n.depthFunc(n.EQUAL);break;case ip:n.depthFunc(n.GEQUAL);break;case rp:n.depthFunc(n.GREATER);break;case sp:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}me=K}},setLocked:function(K){R=K},setClear:function(K){oe!==K&&(oe=K,ie&&(K=1-K),n.clearDepth(K))},reset:function(){R=!1,$=null,me=null,oe=null,ie=!1}}}function r(){let R=!1,ie=null,$=null,me=null,oe=null,K=null,Ee=null,ze=null,jt=null;return{setTest:function(gt){R||(gt?re(n.STENCIL_TEST):Ie(n.STENCIL_TEST))},setMask:function(gt){ie!==gt&&!R&&(n.stencilMask(gt),ie=gt)},setFunc:function(gt,br,Yi){($!==gt||me!==br||oe!==Yi)&&(n.stencilFunc(gt,br,Yi),$=gt,me=br,oe=Yi)},setOp:function(gt,br,Yi){(K!==gt||Ee!==br||ze!==Yi)&&(n.stencilOp(gt,br,Yi),K=gt,Ee=br,ze=Yi)},setLocked:function(gt){R=gt},setClear:function(gt){jt!==gt&&(n.clearStencil(gt),jt=gt)},reset:function(){R=!1,ie=null,$=null,me=null,oe=null,K=null,Ee=null,ze=null,jt=null}}}let s=new t,o=new i,a=new r,c=new WeakMap,l=new WeakMap,u={},d={},f={},h=new WeakMap,m=[],v=null,p=!1,g=null,x=null,M=null,E=null,C=null,T=null,D=null,_=new it(0,0,0),b=0,I=!1,A=null,L=null,z=null,j=null,N=null,B=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),F=!1,Z=0,Q=n.getParameter(n.VERSION);Q.indexOf("WebGL")!==-1?(Z=parseFloat(/^WebGL (\d)/.exec(Q)[1]),F=Z>=1):Q.indexOf("OpenGL ES")!==-1&&(Z=parseFloat(/^OpenGL ES (\d)/.exec(Q)[1]),F=Z>=2);let ce=null,ge={},Se=n.getParameter(n.SCISSOR_BOX),Je=n.getParameter(n.VIEWPORT),Ye=new Pt().fromArray(Se),Ae=new Pt().fromArray(Je);function Y(R,ie,$,me){let oe=new Uint8Array(4),K=n.createTexture();n.bindTexture(R,K),n.texParameteri(R,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(R,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Ee=0;Ee<$;Ee++)R===n.TEXTURE_3D||R===n.TEXTURE_2D_ARRAY?n.texImage3D(ie,0,n.RGBA,1,1,me,0,n.RGBA,n.UNSIGNED_BYTE,oe):n.texImage2D(ie+Ee,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,oe);return K}let he={};he[n.TEXTURE_2D]=Y(n.TEXTURE_2D,n.TEXTURE_2D,1),he[n.TEXTURE_CUBE_MAP]=Y(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),he[n.TEXTURE_2D_ARRAY]=Y(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),he[n.TEXTURE_3D]=Y(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),re(n.DEPTH_TEST),o.setFunc(Lo),Qt(!1),Nt(l0),re(n.CULL_FACE),Dt(pr);function re(R){u[R]!==!0&&(n.enable(R),u[R]=!0)}function Ie(R){u[R]!==!1&&(n.disable(R),u[R]=!1)}function Ve(R,ie){return f[R]!==ie?(n.bindFramebuffer(R,ie),f[R]=ie,R===n.DRAW_FRAMEBUFFER&&(f[n.FRAMEBUFFER]=ie),R===n.FRAMEBUFFER&&(f[n.DRAW_FRAMEBUFFER]=ie),!0):!1}function Ne(R,ie){let $=m,me=!1;if(R){$=h.get(ie),$===void 0&&($=[],h.set(ie,$));let oe=R.textures;if($.length!==oe.length||$[0]!==n.COLOR_ATTACHMENT0){for(let K=0,Ee=oe.length;K<Ee;K++)$[K]=n.COLOR_ATTACHMENT0+K;$.length=oe.length,me=!0}}else $[0]!==n.BACK&&($[0]=n.BACK,me=!0);me&&n.drawBuffers($)}function Rt(R){return v!==R?(n.useProgram(R),v=R,!0):!1}let Qe={[Ns]:n.FUNC_ADD,[CT]:n.FUNC_SUBTRACT,[DT]:n.FUNC_REVERSE_SUBTRACT};Qe[AT]=n.MIN,Qe[IT]=n.MAX;let mt={[RT]:n.ZERO,[NT]:n.ONE,[PT]:n.SRC_COLOR,[Kh]:n.SRC_ALPHA,[BT]:n.SRC_ALPHA_SATURATE,[kT]:n.DST_COLOR,[LT]:n.DST_ALPHA,[OT]:n.ONE_MINUS_SRC_COLOR,[Jh]:n.ONE_MINUS_SRC_ALPHA,[UT]:n.ONE_MINUS_DST_COLOR,[FT]:n.ONE_MINUS_DST_ALPHA,[VT]:n.CONSTANT_COLOR,[HT]:n.ONE_MINUS_CONSTANT_COLOR,[zT]:n.CONSTANT_ALPHA,[GT]:n.ONE_MINUS_CONSTANT_ALPHA};function Dt(R,ie,$,me,oe,K,Ee,ze,jt,gt){if(R===pr){p===!0&&(Ie(n.BLEND),p=!1);return}if(p===!1&&(re(n.BLEND),p=!0),R!==TT){if(R!==g||gt!==I){if((x!==Ns||C!==Ns)&&(n.blendEquation(n.FUNC_ADD),x=Ns,C=Ns),gt)switch(R){case Oo:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case u0:n.blendFunc(n.ONE,n.ONE);break;case d0:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case f0:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Ce("WebGLState: Invalid blending: ",R);break}else switch(R){case Oo:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case u0:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case d0:Ce("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case f0:Ce("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ce("WebGLState: Invalid blending: ",R);break}M=null,E=null,T=null,D=null,_.set(0,0,0),b=0,g=R,I=gt}return}oe=oe||ie,K=K||$,Ee=Ee||me,(ie!==x||oe!==C)&&(n.blendEquationSeparate(Qe[ie],Qe[oe]),x=ie,C=oe),($!==M||me!==E||K!==T||Ee!==D)&&(n.blendFuncSeparate(mt[$],mt[me],mt[K],mt[Ee]),M=$,E=me,T=K,D=Ee),(ze.equals(_)===!1||jt!==b)&&(n.blendColor(ze.r,ze.g,ze.b,jt),_.copy(ze),b=jt),g=R,I=!1}function Ze(R,ie){R.side===hr?Ie(n.CULL_FACE):re(n.CULL_FACE);let $=R.side===xn;ie&&($=!$),Qt($),R.blending===Oo&&R.transparent===!1?Dt(pr):Dt(R.blending,R.blendEquation,R.blendSrc,R.blendDst,R.blendEquationAlpha,R.blendSrcAlpha,R.blendDstAlpha,R.blendColor,R.blendAlpha,R.premultipliedAlpha),o.setFunc(R.depthFunc),o.setTest(R.depthTest),o.setMask(R.depthWrite),s.setMask(R.colorWrite);let me=R.stencilWrite;a.setTest(me),me&&(a.setMask(R.stencilWriteMask),a.setFunc(R.stencilFunc,R.stencilRef,R.stencilFuncMask),a.setOp(R.stencilFail,R.stencilZFail,R.stencilZPass)),P(R.polygonOffset,R.polygonOffsetFactor,R.polygonOffsetUnits),R.alphaToCoverage===!0?re(n.SAMPLE_ALPHA_TO_COVERAGE):Ie(n.SAMPLE_ALPHA_TO_COVERAGE)}function Qt(R){A!==R&&(R?n.frontFace(n.CW):n.frontFace(n.CCW),A=R)}function Nt(R){R!==ET?(re(n.CULL_FACE),R!==L&&(R===l0?n.cullFace(n.BACK):R===bT?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Ie(n.CULL_FACE),L=R}function Zn(R){R!==z&&(F&&n.lineWidth(R),z=R)}function P(R,ie,$){R?(re(n.POLYGON_OFFSET_FILL),(j!==ie||N!==$)&&(j=ie,N=$,o.getReversed()&&(ie=-ie),n.polygonOffset(ie,$))):Ie(n.POLYGON_OFFSET_FILL)}function en(R){R?re(n.SCISSOR_TEST):Ie(n.SCISSOR_TEST)}function et(R){R===void 0&&(R=n.TEXTURE0+B-1),ce!==R&&(n.activeTexture(R),ce=R)}function Tt(R,ie,$){$===void 0&&(ce===null?$=n.TEXTURE0+B-1:$=ce);let me=ge[$];me===void 0&&(me={type:void 0,texture:void 0},ge[$]=me),(me.type!==R||me.texture!==ie)&&(ce!==$&&(n.activeTexture($),ce=$),n.bindTexture(R,ie||he[R]),me.type=R,me.texture=ie)}function le(){let R=ge[ce];R!==void 0&&R.type!==void 0&&(n.bindTexture(R.type,null),R.type=void 0,R.texture=void 0)}function kt(){try{n.compressedTexImage2D(...arguments)}catch(R){Ce("WebGLState:",R)}}function w(){try{n.compressedTexImage3D(...arguments)}catch(R){Ce("WebGLState:",R)}}function y(){try{n.texSubImage2D(...arguments)}catch(R){Ce("WebGLState:",R)}}function k(){try{n.texSubImage3D(...arguments)}catch(R){Ce("WebGLState:",R)}}function q(){try{n.compressedTexSubImage2D(...arguments)}catch(R){Ce("WebGLState:",R)}}function J(){try{n.compressedTexSubImage3D(...arguments)}catch(R){Ce("WebGLState:",R)}}function te(){try{n.texStorage2D(...arguments)}catch(R){Ce("WebGLState:",R)}}function ae(){try{n.texStorage3D(...arguments)}catch(R){Ce("WebGLState:",R)}}function W(){try{n.texImage2D(...arguments)}catch(R){Ce("WebGLState:",R)}}function X(){try{n.texImage3D(...arguments)}catch(R){Ce("WebGLState:",R)}}function pe(R){return d[R]!==void 0?d[R]:n.getParameter(R)}function ye(R,ie){d[R]!==ie&&(n.pixelStorei(R,ie),d[R]=ie)}function se(R){Ye.equals(R)===!1&&(n.scissor(R.x,R.y,R.z,R.w),Ye.copy(R))}function ne(R){Ae.equals(R)===!1&&(n.viewport(R.x,R.y,R.z,R.w),Ae.copy(R))}function Fe(R,ie){let $=l.get(ie);$===void 0&&($=new WeakMap,l.set(ie,$));let me=$.get(R);me===void 0&&(me=n.getUniformBlockIndex(ie,R.name),$.set(R,me))}function je(R,ie){let me=l.get(ie).get(R);c.get(ie)!==me&&(n.uniformBlockBinding(ie,me,R.__bindingPointIndex),c.set(ie,me))}function at(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),u={},d={},ce=null,ge={},f={},h=new WeakMap,m=[],v=null,p=!1,g=null,x=null,M=null,E=null,C=null,T=null,D=null,_=new it(0,0,0),b=0,I=!1,A=null,L=null,z=null,j=null,N=null,Ye.set(0,0,n.canvas.width,n.canvas.height),Ae.set(0,0,n.canvas.width,n.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:re,disable:Ie,bindFramebuffer:Ve,drawBuffers:Ne,useProgram:Rt,setBlending:Dt,setMaterial:Ze,setFlipSided:Qt,setCullFace:Nt,setLineWidth:Zn,setPolygonOffset:P,setScissorTest:en,activeTexture:et,bindTexture:Tt,unbindTexture:le,compressedTexImage2D:kt,compressedTexImage3D:w,texImage2D:W,texImage3D:X,pixelStorei:ye,getParameter:pe,updateUBOMapping:Fe,uniformBlockBinding:je,texStorage2D:te,texStorage3D:ae,texSubImage2D:y,texSubImage3D:k,compressedTexSubImage2D:q,compressedTexSubImage3D:J,scissor:se,viewport:ne,reset:at}}function O3(n,e,t,i,r,s,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new We,u=new WeakMap,d=new Set,f,h=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(w,y){return m?new OffscreenCanvas(w,y):ru("canvas")}function p(w,y,k){let q=1,J=kt(w);if((J.width>k||J.height>k)&&(q=k/Math.max(J.width,J.height)),q<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){let te=Math.floor(q*J.width),ae=Math.floor(q*J.height);f===void 0&&(f=v(te,ae));let W=y?v(te,ae):f;return W.width=te,W.height=ae,W.getContext("2d").drawImage(w,0,0,te,ae),De("WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+te+"x"+ae+")."),W}else return"data"in w&&De("WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),w;return w}function g(w){return w.generateMipmaps}function x(w){n.generateMipmap(w)}function M(w){return w.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?n.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function E(w,y,k,q,J,te=!1){if(w!==null){if(n[w]!==void 0)return n[w];De("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let ae;q&&(ae=e.get("EXT_texture_norm16"),ae||De("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let W=y;if(y===n.RED&&(k===n.FLOAT&&(W=n.R32F),k===n.HALF_FLOAT&&(W=n.R16F),k===n.UNSIGNED_BYTE&&(W=n.R8),k===n.UNSIGNED_SHORT&&ae&&(W=ae.R16_EXT),k===n.SHORT&&ae&&(W=ae.R16_SNORM_EXT)),y===n.RED_INTEGER&&(k===n.UNSIGNED_BYTE&&(W=n.R8UI),k===n.UNSIGNED_SHORT&&(W=n.R16UI),k===n.UNSIGNED_INT&&(W=n.R32UI),k===n.BYTE&&(W=n.R8I),k===n.SHORT&&(W=n.R16I),k===n.INT&&(W=n.R32I)),y===n.RG&&(k===n.FLOAT&&(W=n.RG32F),k===n.HALF_FLOAT&&(W=n.RG16F),k===n.UNSIGNED_BYTE&&(W=n.RG8),k===n.UNSIGNED_SHORT&&ae&&(W=ae.RG16_EXT),k===n.SHORT&&ae&&(W=ae.RG16_SNORM_EXT)),y===n.RG_INTEGER&&(k===n.UNSIGNED_BYTE&&(W=n.RG8UI),k===n.UNSIGNED_SHORT&&(W=n.RG16UI),k===n.UNSIGNED_INT&&(W=n.RG32UI),k===n.BYTE&&(W=n.RG8I),k===n.SHORT&&(W=n.RG16I),k===n.INT&&(W=n.RG32I)),y===n.RGB_INTEGER&&(k===n.UNSIGNED_BYTE&&(W=n.RGB8UI),k===n.UNSIGNED_SHORT&&(W=n.RGB16UI),k===n.UNSIGNED_INT&&(W=n.RGB32UI),k===n.BYTE&&(W=n.RGB8I),k===n.SHORT&&(W=n.RGB16I),k===n.INT&&(W=n.RGB32I)),y===n.RGBA_INTEGER&&(k===n.UNSIGNED_BYTE&&(W=n.RGBA8UI),k===n.UNSIGNED_SHORT&&(W=n.RGBA16UI),k===n.UNSIGNED_INT&&(W=n.RGBA32UI),k===n.BYTE&&(W=n.RGBA8I),k===n.SHORT&&(W=n.RGBA16I),k===n.INT&&(W=n.RGBA32I)),y===n.RGB&&(k===n.UNSIGNED_SHORT&&ae&&(W=ae.RGB16_EXT),k===n.SHORT&&ae&&(W=ae.RGB16_SNORM_EXT),k===n.UNSIGNED_INT_5_9_9_9_REV&&(W=n.RGB9_E5),k===n.UNSIGNED_INT_10F_11F_11F_REV&&(W=n.R11F_G11F_B10F)),y===n.RGBA){let X=te?iu:nt.getTransfer(J);k===n.FLOAT&&(W=n.RGBA32F),k===n.HALF_FLOAT&&(W=n.RGBA16F),k===n.UNSIGNED_BYTE&&(W=X===pt?n.SRGB8_ALPHA8:n.RGBA8),k===n.UNSIGNED_SHORT&&ae&&(W=ae.RGBA16_EXT),k===n.SHORT&&ae&&(W=ae.RGBA16_SNORM_EXT),k===n.UNSIGNED_SHORT_4_4_4_4&&(W=n.RGBA4),k===n.UNSIGNED_SHORT_5_5_5_1&&(W=n.RGB5_A1)}return(W===n.R16F||W===n.R32F||W===n.RG16F||W===n.RG32F||W===n.RGBA16F||W===n.RGBA32F)&&e.get("EXT_color_buffer_float"),W}function C(w,y){let k;return w?y===null||y===qi||y===yc?k=n.DEPTH24_STENCIL8:y===Xi?k=n.DEPTH32F_STENCIL8:y===_c&&(k=n.DEPTH24_STENCIL8,De("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===qi||y===yc?k=n.DEPTH_COMPONENT24:y===Xi?k=n.DEPTH_COMPONENT32F:y===_c&&(k=n.DEPTH_COMPONENT16),k}function T(w,y){return g(w)===!0||w.isFramebufferTexture&&w.minFilter!==fn&&w.minFilter!==yn?Math.log2(Math.max(y.width,y.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?y.mipmaps.length:1}function D(w){let y=w.target;y.removeEventListener("dispose",D),b(y),y.isVideoTexture&&u.delete(y),y.isHTMLTexture&&d.delete(y)}function _(w){let y=w.target;y.removeEventListener("dispose",_),A(y)}function b(w){let y=i.get(w);if(y.__webglInit===void 0)return;let k=w.source,q=h.get(k);if(q){let J=q[y.__cacheKey];J.usedTimes--,J.usedTimes===0&&I(w),Object.keys(q).length===0&&h.delete(k)}i.remove(w)}function I(w){let y=i.get(w);n.deleteTexture(y.__webglTexture);let k=w.source,q=h.get(k);delete q[y.__cacheKey],o.memory.textures--}function A(w){let y=i.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),i.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(y.__webglFramebuffer[q]))for(let J=0;J<y.__webglFramebuffer[q].length;J++)n.deleteFramebuffer(y.__webglFramebuffer[q][J]);else n.deleteFramebuffer(y.__webglFramebuffer[q]);y.__webglDepthbuffer&&n.deleteRenderbuffer(y.__webglDepthbuffer[q])}else{if(Array.isArray(y.__webglFramebuffer))for(let q=0;q<y.__webglFramebuffer.length;q++)n.deleteFramebuffer(y.__webglFramebuffer[q]);else n.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&n.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&n.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let q=0;q<y.__webglColorRenderbuffer.length;q++)y.__webglColorRenderbuffer[q]&&n.deleteRenderbuffer(y.__webglColorRenderbuffer[q]);y.__webglDepthRenderbuffer&&n.deleteRenderbuffer(y.__webglDepthRenderbuffer)}let k=w.textures;for(let q=0,J=k.length;q<J;q++){let te=i.get(k[q]);te.__webglTexture&&(n.deleteTexture(te.__webglTexture),o.memory.textures--),i.remove(k[q])}i.remove(w)}let L=0;function z(){L=0}function j(){return L}function N(w){L=w}function B(){let w=L;return w>=r.maxTextures&&De("WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+r.maxTextures),L+=1,w}function F(w){let y=[];return y.push(w.wrapS),y.push(w.wrapT),y.push(w.wrapR||0),y.push(w.magFilter),y.push(w.minFilter),y.push(w.anisotropy),y.push(w.internalFormat),y.push(w.format),y.push(w.type),y.push(w.generateMipmaps),y.push(w.premultiplyAlpha),y.push(w.flipY),y.push(w.unpackAlignment),y.push(w.colorSpace),y.join()}function Z(w,y){let k=i.get(w);if(w.isVideoTexture&&Tt(w),w.isRenderTargetTexture===!1&&w.isExternalTexture!==!0&&w.version>0&&k.__version!==w.version){let q=w.image;if(q===null)De("WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)De("WebGLRenderer: Texture marked for update but image is incomplete");else{Ie(k,w,y);return}}else w.isExternalTexture&&(k.__webglTexture=w.sourceTexture?w.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,k.__webglTexture,n.TEXTURE0+y)}function Q(w,y){let k=i.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&k.__version!==w.version){Ie(k,w,y);return}else w.isExternalTexture&&(k.__webglTexture=w.sourceTexture?w.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,k.__webglTexture,n.TEXTURE0+y)}function ce(w,y){let k=i.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&k.__version!==w.version){Ie(k,w,y);return}t.bindTexture(n.TEXTURE_3D,k.__webglTexture,n.TEXTURE0+y)}function ge(w,y){let k=i.get(w);if(w.isCubeDepthTexture!==!0&&w.version>0&&k.__version!==w.version){Ve(k,w,y);return}t.bindTexture(n.TEXTURE_CUBE_MAP,k.__webglTexture,n.TEXTURE0+y)}let Se={[op]:n.REPEAT,[cr]:n.CLAMP_TO_EDGE,[ap]:n.MIRRORED_REPEAT},Je={[fn]:n.NEAREST,[$T]:n.NEAREST_MIPMAP_NEAREST,[Tu]:n.NEAREST_MIPMAP_LINEAR,[yn]:n.LINEAR,[Pp]:n.LINEAR_MIPMAP_NEAREST,[Us]:n.LINEAR_MIPMAP_LINEAR},Ye={[YT]:n.NEVER,[eC]:n.ALWAYS,[ZT]:n.LESS,[vm]:n.LEQUAL,[KT]:n.EQUAL,[_m]:n.GEQUAL,[JT]:n.GREATER,[QT]:n.NOTEQUAL};function Ae(w,y){if(y.type===Xi&&e.has("OES_texture_float_linear")===!1&&(y.magFilter===yn||y.magFilter===Pp||y.magFilter===Tu||y.magFilter===Us||y.minFilter===yn||y.minFilter===Pp||y.minFilter===Tu||y.minFilter===Us)&&De("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(w,n.TEXTURE_WRAP_S,Se[y.wrapS]),n.texParameteri(w,n.TEXTURE_WRAP_T,Se[y.wrapT]),(w===n.TEXTURE_3D||w===n.TEXTURE_2D_ARRAY)&&n.texParameteri(w,n.TEXTURE_WRAP_R,Se[y.wrapR]),n.texParameteri(w,n.TEXTURE_MAG_FILTER,Je[y.magFilter]),n.texParameteri(w,n.TEXTURE_MIN_FILTER,Je[y.minFilter]),y.compareFunction&&(n.texParameteri(w,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(w,n.TEXTURE_COMPARE_FUNC,Ye[y.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===fn||y.minFilter!==Tu&&y.minFilter!==Us||y.type===Xi&&e.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||i.get(y).__currentAnisotropy){let k=e.get("EXT_texture_filter_anisotropic");n.texParameterf(w,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,r.getMaxAnisotropy())),i.get(y).__currentAnisotropy=y.anisotropy}}}function Y(w,y){let k=!1;w.__webglInit===void 0&&(w.__webglInit=!0,y.addEventListener("dispose",D));let q=y.source,J=h.get(q);J===void 0&&(J={},h.set(q,J));let te=F(y);if(te!==w.__cacheKey){J[te]===void 0&&(J[te]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,k=!0),J[te].usedTimes++;let ae=J[w.__cacheKey];ae!==void 0&&(J[w.__cacheKey].usedTimes--,ae.usedTimes===0&&I(y)),w.__cacheKey=te,w.__webglTexture=J[te].texture}return k}function he(w,y,k){return Math.floor(Math.floor(w/k)/y)}function re(w,y,k,q){let te=w.updateRanges;if(te.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,y.width,y.height,k,q,y.data);else{te.sort((ye,se)=>ye.start-se.start);let ae=0;for(let ye=1;ye<te.length;ye++){let se=te[ae],ne=te[ye],Fe=se.start+se.count,je=he(ne.start,y.width,4),at=he(se.start,y.width,4);ne.start<=Fe+1&&je===at&&he(ne.start+ne.count-1,y.width,4)===je?se.count=Math.max(se.count,ne.start+ne.count-se.start):(++ae,te[ae]=ne)}te.length=ae+1;let W=t.getParameter(n.UNPACK_ROW_LENGTH),X=t.getParameter(n.UNPACK_SKIP_PIXELS),pe=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,y.width);for(let ye=0,se=te.length;ye<se;ye++){let ne=te[ye],Fe=Math.floor(ne.start/4),je=Math.ceil(ne.count/4),at=Fe%y.width,R=Math.floor(Fe/y.width),ie=je,$=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,at),t.pixelStorei(n.UNPACK_SKIP_ROWS,R),t.texSubImage2D(n.TEXTURE_2D,0,at,R,ie,$,k,q,y.data)}w.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,W),t.pixelStorei(n.UNPACK_SKIP_PIXELS,X),t.pixelStorei(n.UNPACK_SKIP_ROWS,pe)}}function Ie(w,y,k){let q=n.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(q=n.TEXTURE_2D_ARRAY),y.isData3DTexture&&(q=n.TEXTURE_3D);let J=Y(w,y),te=y.source;t.bindTexture(q,w.__webglTexture,n.TEXTURE0+k);let ae=i.get(te);if(te.version!==ae.__version||J===!0){if(t.activeTexture(n.TEXTURE0+k),(typeof ImageBitmap<"u"&&y.image instanceof ImageBitmap)===!1){let $=nt.getPrimaries(nt.workingColorSpace),me=y.colorSpace===Jr?null:nt.getPrimaries(y.colorSpace),oe=y.colorSpace===Jr||$===me?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,y.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,oe)}t.pixelStorei(n.UNPACK_ALIGNMENT,y.unpackAlignment);let X=p(y.image,!1,r.maxTextureSize);X=le(y,X);let pe=s.convert(y.format,y.colorSpace),ye=s.convert(y.type),se=E(y.internalFormat,pe,ye,y.normalized,y.colorSpace,y.isVideoTexture);Ae(q,y);let ne,Fe=y.mipmaps,je=y.isVideoTexture!==!0,at=ae.__version===void 0||J===!0,R=te.dataReady,ie=T(y,X);if(y.isDepthTexture)se=C(y.format===Bs,y.type),at&&(je?t.texStorage2D(n.TEXTURE_2D,1,se,X.width,X.height):t.texImage2D(n.TEXTURE_2D,0,se,X.width,X.height,0,pe,ye,null));else if(y.isDataTexture)if(Fe.length>0){je&&at&&t.texStorage2D(n.TEXTURE_2D,ie,se,Fe[0].width,Fe[0].height);for(let $=0,me=Fe.length;$<me;$++)ne=Fe[$],je?R&&t.texSubImage2D(n.TEXTURE_2D,$,0,0,ne.width,ne.height,pe,ye,ne.data):t.texImage2D(n.TEXTURE_2D,$,se,ne.width,ne.height,0,pe,ye,ne.data);y.generateMipmaps=!1}else je?(at&&t.texStorage2D(n.TEXTURE_2D,ie,se,X.width,X.height),R&&re(y,X,pe,ye)):t.texImage2D(n.TEXTURE_2D,0,se,X.width,X.height,0,pe,ye,X.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){je&&at&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ie,se,Fe[0].width,Fe[0].height,X.depth);for(let $=0,me=Fe.length;$<me;$++)if(ne=Fe[$],y.format!==Ti)if(pe!==null)if(je){if(R)if(y.layerUpdates.size>0){let oe=N0(ne.width,ne.height,y.format,y.type);for(let K of y.layerUpdates){let Ee=ne.data.subarray(K*oe/ne.data.BYTES_PER_ELEMENT,(K+1)*oe/ne.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,$,0,0,K,ne.width,ne.height,1,pe,Ee)}y.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,$,0,0,0,ne.width,ne.height,X.depth,pe,ne.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,$,se,ne.width,ne.height,X.depth,0,ne.data,0,0);else De("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else je?R&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,$,0,0,0,ne.width,ne.height,X.depth,pe,ye,ne.data):t.texImage3D(n.TEXTURE_2D_ARRAY,$,se,ne.width,ne.height,X.depth,0,pe,ye,ne.data)}else{je&&at&&t.texStorage2D(n.TEXTURE_2D,ie,se,Fe[0].width,Fe[0].height);for(let $=0,me=Fe.length;$<me;$++)ne=Fe[$],y.format!==Ti?pe!==null?je?R&&t.compressedTexSubImage2D(n.TEXTURE_2D,$,0,0,ne.width,ne.height,pe,ne.data):t.compressedTexImage2D(n.TEXTURE_2D,$,se,ne.width,ne.height,0,ne.data):De("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):je?R&&t.texSubImage2D(n.TEXTURE_2D,$,0,0,ne.width,ne.height,pe,ye,ne.data):t.texImage2D(n.TEXTURE_2D,$,se,ne.width,ne.height,0,pe,ye,ne.data)}else if(y.isDataArrayTexture)if(je){if(at&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ie,se,X.width,X.height,X.depth),R)if(y.layerUpdates.size>0){let $=N0(X.width,X.height,y.format,y.type);for(let me of y.layerUpdates){let oe=X.data.subarray(me*$/X.data.BYTES_PER_ELEMENT,(me+1)*$/X.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,me,X.width,X.height,1,pe,ye,oe)}y.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,X.width,X.height,X.depth,pe,ye,X.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,se,X.width,X.height,X.depth,0,pe,ye,X.data);else if(y.isData3DTexture)je?(at&&t.texStorage3D(n.TEXTURE_3D,ie,se,X.width,X.height,X.depth),R&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,X.width,X.height,X.depth,pe,ye,X.data)):t.texImage3D(n.TEXTURE_3D,0,se,X.width,X.height,X.depth,0,pe,ye,X.data);else if(y.isFramebufferTexture){if(at)if(je)t.texStorage2D(n.TEXTURE_2D,ie,se,X.width,X.height);else{let $=X.width,me=X.height;for(let oe=0;oe<ie;oe++)t.texImage2D(n.TEXTURE_2D,oe,se,$,me,0,pe,ye,null),$>>=1,me>>=1}}else if(y.isHTMLTexture){if("texElementImage2D"in n){let $=n.canvas;if($.hasAttribute("layoutsubtree")||$.setAttribute("layoutsubtree","true"),X.parentNode!==$){$.appendChild(X),d.add(y),$.onpaint=ze=>{let jt=ze.changedElements;for(let gt of d)jt.includes(gt.image)&&(gt.needsUpdate=!0)},$.requestPaint();return}let me=0,oe=n.RGBA,K=n.RGBA,Ee=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,me,oe,K,Ee,X),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Fe.length>0){if(je&&at){let $=kt(Fe[0]);t.texStorage2D(n.TEXTURE_2D,ie,se,$.width,$.height)}for(let $=0,me=Fe.length;$<me;$++)ne=Fe[$],je?R&&t.texSubImage2D(n.TEXTURE_2D,$,0,0,pe,ye,ne):t.texImage2D(n.TEXTURE_2D,$,se,pe,ye,ne);y.generateMipmaps=!1}else if(je){if(at){let $=kt(X);t.texStorage2D(n.TEXTURE_2D,ie,se,$.width,$.height)}R&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,pe,ye,X)}else t.texImage2D(n.TEXTURE_2D,0,se,pe,ye,X);g(y)&&x(q),ae.__version=te.version,y.onUpdate&&y.onUpdate(y)}w.__version=y.version}function Ve(w,y,k){if(y.image.length!==6)return;let q=Y(w,y),J=y.source;t.bindTexture(n.TEXTURE_CUBE_MAP,w.__webglTexture,n.TEXTURE0+k);let te=i.get(J);if(J.version!==te.__version||q===!0){t.activeTexture(n.TEXTURE0+k);let ae=nt.getPrimaries(nt.workingColorSpace),W=y.colorSpace===Jr?null:nt.getPrimaries(y.colorSpace),X=y.colorSpace===Jr||ae===W?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,y.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,y.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,X);let pe=y.isCompressedTexture||y.image[0].isCompressedTexture,ye=y.image[0]&&y.image[0].isDataTexture,se=[];for(let K=0;K<6;K++)!pe&&!ye?se[K]=p(y.image[K],!0,r.maxCubemapSize):se[K]=ye?y.image[K].image:y.image[K],se[K]=le(y,se[K]);let ne=se[0],Fe=s.convert(y.format,y.colorSpace),je=s.convert(y.type),at=E(y.internalFormat,Fe,je,y.normalized,y.colorSpace),R=y.isVideoTexture!==!0,ie=te.__version===void 0||q===!0,$=J.dataReady,me=T(y,ne);Ae(n.TEXTURE_CUBE_MAP,y);let oe;if(pe){R&&ie&&t.texStorage2D(n.TEXTURE_CUBE_MAP,me,at,ne.width,ne.height);for(let K=0;K<6;K++){oe=se[K].mipmaps;for(let Ee=0;Ee<oe.length;Ee++){let ze=oe[Ee];y.format!==Ti?Fe!==null?R?$&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,Ee,0,0,ze.width,ze.height,Fe,ze.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,Ee,at,ze.width,ze.height,0,ze.data):De("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):R?$&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,Ee,0,0,ze.width,ze.height,Fe,je,ze.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,Ee,at,ze.width,ze.height,0,Fe,je,ze.data)}}}else{if(oe=y.mipmaps,R&&ie){oe.length>0&&me++;let K=kt(se[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,me,at,K.width,K.height)}for(let K=0;K<6;K++)if(ye){R?$&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,se[K].width,se[K].height,Fe,je,se[K].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,at,se[K].width,se[K].height,0,Fe,je,se[K].data);for(let Ee=0;Ee<oe.length;Ee++){let jt=oe[Ee].image[K].image;R?$&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,Ee+1,0,0,jt.width,jt.height,Fe,je,jt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,Ee+1,at,jt.width,jt.height,0,Fe,je,jt.data)}}else{R?$&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,Fe,je,se[K]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,at,Fe,je,se[K]);for(let Ee=0;Ee<oe.length;Ee++){let ze=oe[Ee];R?$&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,Ee+1,0,0,Fe,je,ze.image[K]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+K,Ee+1,at,Fe,je,ze.image[K])}}}g(y)&&x(n.TEXTURE_CUBE_MAP),te.__version=J.version,y.onUpdate&&y.onUpdate(y)}w.__version=y.version}function Ne(w,y,k,q,J,te){let ae=s.convert(k.format,k.colorSpace),W=s.convert(k.type),X=E(k.internalFormat,ae,W,k.normalized,k.colorSpace),pe=i.get(y),ye=i.get(k);if(ye.__renderTarget=y,!pe.__hasExternalTextures){let se=Math.max(1,y.width>>te),ne=Math.max(1,y.height>>te);J===n.TEXTURE_3D||J===n.TEXTURE_2D_ARRAY?t.texImage3D(J,te,X,se,ne,y.depth,0,ae,W,null):t.texImage2D(J,te,X,se,ne,0,ae,W,null)}t.bindFramebuffer(n.FRAMEBUFFER,w),et(y)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,q,J,ye.__webglTexture,0,en(y)):(J===n.TEXTURE_2D||J>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,q,J,ye.__webglTexture,te),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Rt(w,y,k){if(n.bindRenderbuffer(n.RENDERBUFFER,w),y.depthBuffer){let q=y.depthTexture,J=q&&q.isDepthTexture?q.type:null,te=C(y.stencilBuffer,J),ae=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;et(y)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,en(y),te,y.width,y.height):k?n.renderbufferStorageMultisample(n.RENDERBUFFER,en(y),te,y.width,y.height):n.renderbufferStorage(n.RENDERBUFFER,te,y.width,y.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,ae,n.RENDERBUFFER,w)}else{let q=y.textures;for(let J=0;J<q.length;J++){let te=q[J],ae=s.convert(te.format,te.colorSpace),W=s.convert(te.type),X=E(te.internalFormat,ae,W,te.normalized,te.colorSpace);et(y)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,en(y),X,y.width,y.height):k?n.renderbufferStorageMultisample(n.RENDERBUFFER,en(y),X,y.width,y.height):n.renderbufferStorage(n.RENDERBUFFER,X,y.width,y.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Qe(w,y,k){let q=y.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,w),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let J=i.get(y.depthTexture);if(J.__renderTarget=y,(!J.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),q){if(J.__webglInit===void 0&&(J.__webglInit=!0,y.depthTexture.addEventListener("dispose",D)),J.__webglTexture===void 0){J.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,J.__webglTexture),Ae(n.TEXTURE_CUBE_MAP,y.depthTexture);let pe=s.convert(y.depthTexture.format),ye=s.convert(y.depthTexture.type),se;y.depthTexture.format===lr?se=n.DEPTH_COMPONENT24:y.depthTexture.format===Bs&&(se=n.DEPTH24_STENCIL8);for(let ne=0;ne<6;ne++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,se,y.width,y.height,0,pe,ye,null)}}else Z(y.depthTexture,0);let te=J.__webglTexture,ae=en(y),W=q?n.TEXTURE_CUBE_MAP_POSITIVE_X+k:n.TEXTURE_2D,X=y.depthTexture.format===Bs?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(y.depthTexture.format===lr)et(y)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,X,W,te,0,ae):n.framebufferTexture2D(n.FRAMEBUFFER,X,W,te,0);else if(y.depthTexture.format===Bs)et(y)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,X,W,te,0,ae):n.framebufferTexture2D(n.FRAMEBUFFER,X,W,te,0);else throw new Error("Unknown depthTexture format")}function mt(w){let y=i.get(w),k=w.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==w.depthTexture){let q=w.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),q){let J=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,q.removeEventListener("dispose",J)};q.addEventListener("dispose",J),y.__depthDisposeCallback=J}y.__boundDepthTexture=q}if(w.depthTexture&&!y.__autoAllocateDepthBuffer)if(k)for(let q=0;q<6;q++)Qe(y.__webglFramebuffer[q],w,q);else{let q=w.texture.mipmaps;q&&q.length>0?Qe(y.__webglFramebuffer[0],w,0):Qe(y.__webglFramebuffer,w,0)}else if(k){y.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(t.bindFramebuffer(n.FRAMEBUFFER,y.__webglFramebuffer[q]),y.__webglDepthbuffer[q]===void 0)y.__webglDepthbuffer[q]=n.createRenderbuffer(),Rt(y.__webglDepthbuffer[q],w,!1);else{let J=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,te=y.__webglDepthbuffer[q];n.bindRenderbuffer(n.RENDERBUFFER,te),n.framebufferRenderbuffer(n.FRAMEBUFFER,J,n.RENDERBUFFER,te)}}else{let q=w.texture.mipmaps;if(q&&q.length>0?t.bindFramebuffer(n.FRAMEBUFFER,y.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=n.createRenderbuffer(),Rt(y.__webglDepthbuffer,w,!1);else{let J=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,te=y.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,te),n.framebufferRenderbuffer(n.FRAMEBUFFER,J,n.RENDERBUFFER,te)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Dt(w,y,k){let q=i.get(w);y!==void 0&&Ne(q.__webglFramebuffer,w,w.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),k!==void 0&&mt(w)}function Ze(w){let y=w.texture,k=i.get(w),q=i.get(y);w.addEventListener("dispose",_);let J=w.textures,te=w.isWebGLCubeRenderTarget===!0,ae=J.length>1;if(ae||(q.__webglTexture===void 0&&(q.__webglTexture=n.createTexture()),q.__version=y.version,o.memory.textures++),te){k.__webglFramebuffer=[];for(let W=0;W<6;W++)if(y.mipmaps&&y.mipmaps.length>0){k.__webglFramebuffer[W]=[];for(let X=0;X<y.mipmaps.length;X++)k.__webglFramebuffer[W][X]=n.createFramebuffer()}else k.__webglFramebuffer[W]=n.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){k.__webglFramebuffer=[];for(let W=0;W<y.mipmaps.length;W++)k.__webglFramebuffer[W]=n.createFramebuffer()}else k.__webglFramebuffer=n.createFramebuffer();if(ae)for(let W=0,X=J.length;W<X;W++){let pe=i.get(J[W]);pe.__webglTexture===void 0&&(pe.__webglTexture=n.createTexture(),o.memory.textures++)}if(w.samples>0&&et(w)===!1){k.__webglMultisampledFramebuffer=n.createFramebuffer(),k.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let W=0;W<J.length;W++){let X=J[W];k.__webglColorRenderbuffer[W]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,k.__webglColorRenderbuffer[W]);let pe=s.convert(X.format,X.colorSpace),ye=s.convert(X.type),se=E(X.internalFormat,pe,ye,X.normalized,X.colorSpace,w.isXRRenderTarget===!0),ne=en(w);n.renderbufferStorageMultisample(n.RENDERBUFFER,ne,se,w.width,w.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+W,n.RENDERBUFFER,k.__webglColorRenderbuffer[W])}n.bindRenderbuffer(n.RENDERBUFFER,null),w.depthBuffer&&(k.__webglDepthRenderbuffer=n.createRenderbuffer(),Rt(k.__webglDepthRenderbuffer,w,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(te){t.bindTexture(n.TEXTURE_CUBE_MAP,q.__webglTexture),Ae(n.TEXTURE_CUBE_MAP,y);for(let W=0;W<6;W++)if(y.mipmaps&&y.mipmaps.length>0)for(let X=0;X<y.mipmaps.length;X++)Ne(k.__webglFramebuffer[W][X],w,y,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+W,X);else Ne(k.__webglFramebuffer[W],w,y,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+W,0);g(y)&&x(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ae){for(let W=0,X=J.length;W<X;W++){let pe=J[W],ye=i.get(pe),se=n.TEXTURE_2D;(w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(se=w.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(se,ye.__webglTexture),Ae(se,pe),Ne(k.__webglFramebuffer,w,pe,n.COLOR_ATTACHMENT0+W,se,0),g(pe)&&x(se)}t.unbindTexture()}else{let W=n.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(W=w.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(W,q.__webglTexture),Ae(W,y),y.mipmaps&&y.mipmaps.length>0)for(let X=0;X<y.mipmaps.length;X++)Ne(k.__webglFramebuffer[X],w,y,n.COLOR_ATTACHMENT0,W,X);else Ne(k.__webglFramebuffer,w,y,n.COLOR_ATTACHMENT0,W,0);g(y)&&x(W),t.unbindTexture()}w.depthBuffer&&mt(w)}function Qt(w){let y=w.textures;for(let k=0,q=y.length;k<q;k++){let J=y[k];if(g(J)){let te=M(w),ae=i.get(J).__webglTexture;t.bindTexture(te,ae),x(te),t.unbindTexture()}}}let Nt=[],Zn=[];function P(w){if(w.samples>0){if(et(w)===!1){let y=w.textures,k=w.width,q=w.height,J=n.COLOR_BUFFER_BIT,te=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ae=i.get(w),W=y.length>1;if(W)for(let pe=0;pe<y.length;pe++)t.bindFramebuffer(n.FRAMEBUFFER,ae.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+pe,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,ae.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+pe,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,ae.__webglMultisampledFramebuffer);let X=w.texture.mipmaps;X&&X.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ae.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ae.__webglFramebuffer);for(let pe=0;pe<y.length;pe++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(J|=n.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(J|=n.STENCIL_BUFFER_BIT)),W){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ae.__webglColorRenderbuffer[pe]);let ye=i.get(y[pe]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ye,0)}n.blitFramebuffer(0,0,k,q,0,0,k,q,J,n.NEAREST),c===!0&&(Nt.length=0,Zn.length=0,Nt.push(n.COLOR_ATTACHMENT0+pe),w.depthBuffer&&w.resolveDepthBuffer===!1&&(Nt.push(te),Zn.push(te),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Zn)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Nt))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),W)for(let pe=0;pe<y.length;pe++){t.bindFramebuffer(n.FRAMEBUFFER,ae.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+pe,n.RENDERBUFFER,ae.__webglColorRenderbuffer[pe]);let ye=i.get(y[pe]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,ae.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+pe,n.TEXTURE_2D,ye,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ae.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&c){let y=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[y])}}}function en(w){return Math.min(r.maxSamples,w.samples)}function et(w){let y=i.get(w);return w.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function Tt(w){let y=o.render.frame;u.get(w)!==y&&(u.set(w,y),w.update())}function le(w,y){let k=w.colorSpace,q=w.format,J=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||k!==nu&&k!==Jr&&(nt.getTransfer(k)===pt?(q!==Ti||J!==jn)&&De("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ce("WebGLTextures: Unsupported texture color space:",k)),y}function kt(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(l.width=w.naturalWidth||w.width,l.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(l.width=w.displayWidth,l.height=w.displayHeight):(l.width=w.width,l.height=w.height),l}this.allocateTextureUnit=B,this.resetTextureUnits=z,this.getTextureUnits=j,this.setTextureUnits=N,this.setTexture2D=Z,this.setTexture2DArray=Q,this.setTexture3D=ce,this.setTextureCube=ge,this.rebindTextures=Dt,this.setupRenderTarget=Ze,this.updateRenderTargetMipmap=Qt,this.updateMultisampleRenderTarget=P,this.setupDepthRenderbuffer=mt,this.setupFrameBufferTexture=Ne,this.useMultisampledRTT=et,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function L3(n,e){function t(i,r=Jr){let s,o=nt.getTransfer(r);if(i===jn)return n.UNSIGNED_BYTE;if(i===Lp)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Fp)return n.UNSIGNED_SHORT_5_5_5_1;if(i===E0)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===b0)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===S0)return n.BYTE;if(i===M0)return n.SHORT;if(i===_c)return n.UNSIGNED_SHORT;if(i===Op)return n.INT;if(i===qi)return n.UNSIGNED_INT;if(i===Xi)return n.FLOAT;if(i===mr)return n.HALF_FLOAT;if(i===w0)return n.ALPHA;if(i===T0)return n.RGB;if(i===Ti)return n.RGBA;if(i===lr)return n.DEPTH_COMPONENT;if(i===Bs)return n.DEPTH_STENCIL;if(i===C0)return n.RED;if(i===kp)return n.RED_INTEGER;if(i===Vs)return n.RG;if(i===Up)return n.RG_INTEGER;if(i===Bp)return n.RGBA_INTEGER;if(i===Cu||i===Du||i===Au||i===Iu)if(o===pt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Cu)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Du)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Au)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Iu)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Cu)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Du)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Au)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Iu)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Vp||i===Hp||i===zp||i===Gp)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Vp)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Hp)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===zp)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Gp)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===jp||i===Wp||i===$p||i===qp||i===Xp||i===Ru||i===Yp)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===jp||i===Wp)return o===pt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===$p)return o===pt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===qp)return s.COMPRESSED_R11_EAC;if(i===Xp)return s.COMPRESSED_SIGNED_R11_EAC;if(i===Ru)return s.COMPRESSED_RG11_EAC;if(i===Yp)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Zp||i===Kp||i===Jp||i===Qp||i===em||i===tm||i===nm||i===im||i===rm||i===sm||i===om||i===am||i===cm||i===lm)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Zp)return o===pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Kp)return o===pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Jp)return o===pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Qp)return o===pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===em)return o===pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===tm)return o===pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===nm)return o===pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===im)return o===pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===rm)return o===pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===sm)return o===pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===om)return o===pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===am)return o===pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===cm)return o===pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===lm)return o===pt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===um||i===dm||i===fm)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===um)return o===pt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===dm)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===fm)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===hm||i===pm||i===Nu||i===mm)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===hm)return s.COMPRESSED_RED_RGTC1_EXT;if(i===pm)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Nu)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===mm)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===yc?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}var F3=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,k3=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,$0=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let i=new mu(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,i=new ui({vertexShader:F3,fragmentShader:k3,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Un(new gu(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},q0=class extends ur{constructor(e,t){super();let i=this,r=null,s=1,o=null,a="local-floor",c=1,l=null,u=null,d=null,f=null,h=null,m=null,v=typeof XRWebGLBinding<"u",p=new $0,g={},x=t.getContextAttributes(),M=null,E=null,C=[],T=[],D=new We,_=null,b=new _n;b.viewport=new Pt;let I=new _n;I.viewport=new Pt;let A=[b,I],L=new Ip,z=null,j=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let he=C[Y];return he===void 0&&(he=new dc,C[Y]=he),he.getTargetRaySpace()},this.getControllerGrip=function(Y){let he=C[Y];return he===void 0&&(he=new dc,C[Y]=he),he.getGripSpace()},this.getHand=function(Y){let he=C[Y];return he===void 0&&(he=new dc,C[Y]=he),he.getHandSpace()};function N(Y){let he=T.indexOf(Y.inputSource);if(he===-1)return;let re=C[he];re!==void 0&&(re.update(Y.inputSource,Y.frame,l||o),re.dispatchEvent({type:Y.type,data:Y.inputSource}))}function B(){r.removeEventListener("select",N),r.removeEventListener("selectstart",N),r.removeEventListener("selectend",N),r.removeEventListener("squeeze",N),r.removeEventListener("squeezestart",N),r.removeEventListener("squeezeend",N),r.removeEventListener("end",B),r.removeEventListener("inputsourceschange",F);for(let Y=0;Y<C.length;Y++){let he=T[Y];he!==null&&(T[Y]=null,C[Y].disconnect(he))}z=null,j=null,p.reset();for(let Y in g)delete g[Y];e.setRenderTarget(M),h=null,f=null,d=null,r=null,E=null,Ae.stop(),i.isPresenting=!1,e.setPixelRatio(_),e.setSize(D.width,D.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){s=Y,i.isPresenting===!0&&De("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){a=Y,i.isPresenting===!0&&De("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(Y){l=Y},this.getBaseLayer=function(){return f!==null?f:h},this.getBinding=function(){return d===null&&v&&(d=new XRWebGLBinding(r,t)),d},this.getFrame=function(){return m},this.getSession=function(){return r},this.setSession=async function(Y){if(r=Y,r!==null){if(M=e.getRenderTarget(),r.addEventListener("select",N),r.addEventListener("selectstart",N),r.addEventListener("selectend",N),r.addEventListener("squeeze",N),r.addEventListener("squeezestart",N),r.addEventListener("squeezeend",N),r.addEventListener("end",B),r.addEventListener("inputsourceschange",F),x.xrCompatible!==!0&&await t.makeXRCompatible(),_=e.getPixelRatio(),e.getSize(D),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let re=null,Ie=null,Ve=null;x.depth&&(Ve=x.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,re=x.stencil?Bs:lr,Ie=x.stencil?yc:qi);let Ne={colorFormat:t.RGBA8,depthFormat:Ve,scaleFactor:s};d=this.getBinding(),f=d.createProjectionLayer(Ne),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),E=new li(f.textureWidth,f.textureHeight,{format:Ti,type:jn,depthTexture:new Zr(f.textureWidth,f.textureHeight,Ie,void 0,void 0,void 0,void 0,void 0,void 0,re),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{let re={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:s};h=new XRWebGLLayer(r,t,re),r.updateRenderState({baseLayer:h}),e.setPixelRatio(1),e.setSize(h.framebufferWidth,h.framebufferHeight,!1),E=new li(h.framebufferWidth,h.framebufferHeight,{format:Ti,type:jn,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}E.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await r.requestReferenceSpace(a),Ae.setContext(r),Ae.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function F(Y){for(let he=0;he<Y.removed.length;he++){let re=Y.removed[he],Ie=T.indexOf(re);Ie>=0&&(T[Ie]=null,C[Ie].disconnect(re))}for(let he=0;he<Y.added.length;he++){let re=Y.added[he],Ie=T.indexOf(re);if(Ie===-1){for(let Ne=0;Ne<C.length;Ne++)if(Ne>=T.length){T.push(re),Ie=Ne;break}else if(T[Ne]===null){T[Ne]=re,Ie=Ne;break}if(Ie===-1)break}let Ve=C[Ie];Ve&&Ve.connect(re)}}let Z=new U,Q=new U;function ce(Y,he,re){Z.setFromMatrixPosition(he.matrixWorld),Q.setFromMatrixPosition(re.matrixWorld);let Ie=Z.distanceTo(Q),Ve=he.projectionMatrix.elements,Ne=re.projectionMatrix.elements,Rt=Ve[14]/(Ve[10]-1),Qe=Ve[14]/(Ve[10]+1),mt=(Ve[9]+1)/Ve[5],Dt=(Ve[9]-1)/Ve[5],Ze=(Ve[8]-1)/Ve[0],Qt=(Ne[8]+1)/Ne[0],Nt=Rt*Ze,Zn=Rt*Qt,P=Ie/(-Ze+Qt),en=P*-Ze;if(he.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(en),Y.translateZ(P),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),Ve[10]===-1)Y.projectionMatrix.copy(he.projectionMatrix),Y.projectionMatrixInverse.copy(he.projectionMatrixInverse);else{let et=Rt+P,Tt=Qe+P,le=Nt-en,kt=Zn+(Ie-en),w=mt*Qe/Tt*et,y=Dt*Qe/Tt*et;Y.projectionMatrix.makePerspective(le,kt,w,y,et,Tt),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function ge(Y,he){he===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(he.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(r===null)return;let he=Y.near,re=Y.far;p.texture!==null&&(p.depthNear>0&&(he=p.depthNear),p.depthFar>0&&(re=p.depthFar)),L.near=I.near=b.near=he,L.far=I.far=b.far=re,(z!==L.near||j!==L.far)&&(r.updateRenderState({depthNear:L.near,depthFar:L.far}),z=L.near,j=L.far),L.layers.mask=Y.layers.mask|6,b.layers.mask=L.layers.mask&-5,I.layers.mask=L.layers.mask&-3;let Ie=Y.parent,Ve=L.cameras;ge(L,Ie);for(let Ne=0;Ne<Ve.length;Ne++)ge(Ve[Ne],Ie);Ve.length===2?ce(L,b,I):L.projectionMatrix.copy(b.projectionMatrix),Se(Y,L,Ie)};function Se(Y,he,re){re===null?Y.matrix.copy(he.matrixWorld):(Y.matrix.copy(re.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(he.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(he.projectionMatrix),Y.projectionMatrixInverse.copy(he.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=dp*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return L},this.getFoveation=function(){if(!(f===null&&h===null))return c},this.setFoveation=function(Y){c=Y,f!==null&&(f.fixedFoveation=Y),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=Y)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(L)},this.getCameraTexture=function(Y){return g[Y]};let Je=null;function Ye(Y,he){if(u=he.getViewerPose(l||o),m=he,u!==null){let re=u.views;h!==null&&(e.setRenderTargetFramebuffer(E,h.framebuffer),e.setRenderTarget(E));let Ie=!1;re.length!==L.cameras.length&&(L.cameras.length=0,Ie=!0);for(let Qe=0;Qe<re.length;Qe++){let mt=re[Qe],Dt=null;if(h!==null)Dt=h.getViewport(mt);else{let Qt=d.getViewSubImage(f,mt);Dt=Qt.viewport,Qe===0&&(e.setRenderTargetTextures(E,Qt.colorTexture,Qt.depthStencilTexture),e.setRenderTarget(E))}let Ze=A[Qe];Ze===void 0&&(Ze=new _n,Ze.layers.enable(Qe),Ze.viewport=new Pt,A[Qe]=Ze),Ze.matrix.fromArray(mt.transform.matrix),Ze.matrix.decompose(Ze.position,Ze.quaternion,Ze.scale),Ze.projectionMatrix.fromArray(mt.projectionMatrix),Ze.projectionMatrixInverse.copy(Ze.projectionMatrix).invert(),Ze.viewport.set(Dt.x,Dt.y,Dt.width,Dt.height),Qe===0&&(L.matrix.copy(Ze.matrix),L.matrix.decompose(L.position,L.quaternion,L.scale)),Ie===!0&&L.cameras.push(Ze)}let Ve=r.enabledFeatures;if(Ve&&Ve.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&v){d=i.getBinding();let Qe=d.getDepthInformation(re[0]);Qe&&Qe.isValid&&Qe.texture&&p.init(Qe,r.renderState)}if(Ve&&Ve.includes("camera-access")&&v){e.state.unbindTexture(),d=i.getBinding();for(let Qe=0;Qe<re.length;Qe++){let mt=re[Qe].camera;if(mt){let Dt=g[mt];Dt||(Dt=new mu,g[mt]=Dt);let Ze=d.getCameraImage(mt);Dt.sourceTexture=Ze}}}}for(let re=0;re<C.length;re++){let Ie=T[re],Ve=C[re];Ie!==null&&Ve!==void 0&&Ve.update(Ie,he,l||o)}Je&&Je(Y,he),he.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:he}),m=null}let Ae=new IC;Ae.setAnimationLoop(Ye),this.setAnimationLoop=function(Y){Je=Y},this.dispose=function(){}}},U3=new At,FC=new Be;FC.set(-1,0,0,0,1,0,0,0,1);function B3(n,e){function t(p,g){p.matrixAutoUpdate===!0&&p.updateMatrix(),g.value.copy(p.matrix)}function i(p,g){g.color.getRGB(p.fogColor.value,A0(n)),g.isFog?(p.fogNear.value=g.near,p.fogFar.value=g.far):g.isFogExp2&&(p.fogDensity.value=g.density)}function r(p,g,x,M,E){g.isNodeMaterial?g.uniformsNeedUpdate=!1:g.isMeshBasicMaterial?s(p,g):g.isMeshLambertMaterial?(s(p,g),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)):g.isMeshToonMaterial?(s(p,g),d(p,g)):g.isMeshPhongMaterial?(s(p,g),u(p,g),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)):g.isMeshStandardMaterial?(s(p,g),f(p,g),g.isMeshPhysicalMaterial&&h(p,g,E)):g.isMeshMatcapMaterial?(s(p,g),m(p,g)):g.isMeshDepthMaterial?s(p,g):g.isMeshDistanceMaterial?(s(p,g),v(p,g)):g.isMeshNormalMaterial?s(p,g):g.isLineBasicMaterial?(o(p,g),g.isLineDashedMaterial&&a(p,g)):g.isPointsMaterial?c(p,g,x,M):g.isSpriteMaterial?l(p,g):g.isShadowMaterial?(p.color.value.copy(g.color),p.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function s(p,g){p.opacity.value=g.opacity,g.color&&p.diffuse.value.copy(g.color),g.emissive&&p.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(p.map.value=g.map,t(g.map,p.mapTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,t(g.alphaMap,p.alphaMapTransform)),g.bumpMap&&(p.bumpMap.value=g.bumpMap,t(g.bumpMap,p.bumpMapTransform),p.bumpScale.value=g.bumpScale,g.side===xn&&(p.bumpScale.value*=-1)),g.normalMap&&(p.normalMap.value=g.normalMap,t(g.normalMap,p.normalMapTransform),p.normalScale.value.copy(g.normalScale),g.side===xn&&p.normalScale.value.negate()),g.displacementMap&&(p.displacementMap.value=g.displacementMap,t(g.displacementMap,p.displacementMapTransform),p.displacementScale.value=g.displacementScale,p.displacementBias.value=g.displacementBias),g.emissiveMap&&(p.emissiveMap.value=g.emissiveMap,t(g.emissiveMap,p.emissiveMapTransform)),g.specularMap&&(p.specularMap.value=g.specularMap,t(g.specularMap,p.specularMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest);let x=e.get(g),M=x.envMap,E=x.envMapRotation;M&&(p.envMap.value=M,p.envMapRotation.value.setFromMatrix4(U3.makeRotationFromEuler(E)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&p.envMapRotation.value.premultiply(FC),p.reflectivity.value=g.reflectivity,p.ior.value=g.ior,p.refractionRatio.value=g.refractionRatio),g.lightMap&&(p.lightMap.value=g.lightMap,p.lightMapIntensity.value=g.lightMapIntensity,t(g.lightMap,p.lightMapTransform)),g.aoMap&&(p.aoMap.value=g.aoMap,p.aoMapIntensity.value=g.aoMapIntensity,t(g.aoMap,p.aoMapTransform))}function o(p,g){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,g.map&&(p.map.value=g.map,t(g.map,p.mapTransform))}function a(p,g){p.dashSize.value=g.dashSize,p.totalSize.value=g.dashSize+g.gapSize,p.scale.value=g.scale}function c(p,g,x,M){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,p.size.value=g.size*x,p.scale.value=M*.5,g.map&&(p.map.value=g.map,t(g.map,p.uvTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,t(g.alphaMap,p.alphaMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest)}function l(p,g){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,p.rotation.value=g.rotation,g.map&&(p.map.value=g.map,t(g.map,p.mapTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,t(g.alphaMap,p.alphaMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest)}function u(p,g){p.specular.value.copy(g.specular),p.shininess.value=Math.max(g.shininess,1e-4)}function d(p,g){g.gradientMap&&(p.gradientMap.value=g.gradientMap)}function f(p,g){p.metalness.value=g.metalness,g.metalnessMap&&(p.metalnessMap.value=g.metalnessMap,t(g.metalnessMap,p.metalnessMapTransform)),p.roughness.value=g.roughness,g.roughnessMap&&(p.roughnessMap.value=g.roughnessMap,t(g.roughnessMap,p.roughnessMapTransform)),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)}function h(p,g,x){p.ior.value=g.ior,g.sheen>0&&(p.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),p.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(p.sheenColorMap.value=g.sheenColorMap,t(g.sheenColorMap,p.sheenColorMapTransform)),g.sheenRoughnessMap&&(p.sheenRoughnessMap.value=g.sheenRoughnessMap,t(g.sheenRoughnessMap,p.sheenRoughnessMapTransform))),g.clearcoat>0&&(p.clearcoat.value=g.clearcoat,p.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(p.clearcoatMap.value=g.clearcoatMap,t(g.clearcoatMap,p.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,t(g.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(p.clearcoatNormalMap.value=g.clearcoatNormalMap,t(g.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===xn&&p.clearcoatNormalScale.value.negate())),g.dispersion>0&&(p.dispersion.value=g.dispersion),g.iridescence>0&&(p.iridescence.value=g.iridescence,p.iridescenceIOR.value=g.iridescenceIOR,p.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(p.iridescenceMap.value=g.iridescenceMap,t(g.iridescenceMap,p.iridescenceMapTransform)),g.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=g.iridescenceThicknessMap,t(g.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),g.transmission>0&&(p.transmission.value=g.transmission,p.transmissionSamplerMap.value=x.texture,p.transmissionSamplerSize.value.set(x.width,x.height),g.transmissionMap&&(p.transmissionMap.value=g.transmissionMap,t(g.transmissionMap,p.transmissionMapTransform)),p.thickness.value=g.thickness,g.thicknessMap&&(p.thicknessMap.value=g.thicknessMap,t(g.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=g.attenuationDistance,p.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(p.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(p.anisotropyMap.value=g.anisotropyMap,t(g.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=g.specularIntensity,p.specularColor.value.copy(g.specularColor),g.specularColorMap&&(p.specularColorMap.value=g.specularColorMap,t(g.specularColorMap,p.specularColorMapTransform)),g.specularIntensityMap&&(p.specularIntensityMap.value=g.specularIntensityMap,t(g.specularIntensityMap,p.specularIntensityMapTransform))}function m(p,g){g.matcap&&(p.matcap.value=g.matcap)}function v(p,g){let x=e.get(g).light;p.referencePosition.value.setFromMatrixPosition(x.matrixWorld),p.nearDistance.value=x.shadow.camera.near,p.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function V3(n,e,t,i){let r={},s={},o=[],a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(x,M){let E=M.program;i.uniformBlockBinding(x,E)}function l(x,M){let E=r[x.id];E===void 0&&(m(x),E=u(x),r[x.id]=E,x.addEventListener("dispose",p));let C=M.program;i.updateUBOMapping(x,C);let T=e.render.frame;s[x.id]!==T&&(f(x),s[x.id]=T)}function u(x){let M=d();x.__bindingPointIndex=M;let E=n.createBuffer(),C=x.__size,T=x.usage;return n.bindBuffer(n.UNIFORM_BUFFER,E),n.bufferData(n.UNIFORM_BUFFER,C,T),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,M,E),E}function d(){for(let x=0;x<a;x++)if(o.indexOf(x)===-1)return o.push(x),x;return Ce("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(x){let M=r[x.id],E=x.uniforms,C=x.__cache;n.bindBuffer(n.UNIFORM_BUFFER,M);for(let T=0,D=E.length;T<D;T++){let _=Array.isArray(E[T])?E[T]:[E[T]];for(let b=0,I=_.length;b<I;b++){let A=_[b];if(h(A,T,b,C)===!0){let L=A.__offset,z=Array.isArray(A.value)?A.value:[A.value],j=0;for(let N=0;N<z.length;N++){let B=z[N],F=v(B);typeof B=="number"||typeof B=="boolean"?(A.__data[0]=B,n.bufferSubData(n.UNIFORM_BUFFER,L+j,A.__data)):B.isMatrix3?(A.__data[0]=B.elements[0],A.__data[1]=B.elements[1],A.__data[2]=B.elements[2],A.__data[3]=0,A.__data[4]=B.elements[3],A.__data[5]=B.elements[4],A.__data[6]=B.elements[5],A.__data[7]=0,A.__data[8]=B.elements[6],A.__data[9]=B.elements[7],A.__data[10]=B.elements[8],A.__data[11]=0):ArrayBuffer.isView(B)?A.__data.set(new B.constructor(B.buffer,B.byteOffset,A.__data.length)):(B.toArray(A.__data,j),j+=F.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,L,A.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function h(x,M,E,C){let T=x.value,D=M+"_"+E;if(C[D]===void 0)return typeof T=="number"||typeof T=="boolean"?C[D]=T:ArrayBuffer.isView(T)?C[D]=T.slice():C[D]=T.clone(),!0;{let _=C[D];if(typeof T=="number"||typeof T=="boolean"){if(_!==T)return C[D]=T,!0}else{if(ArrayBuffer.isView(T))return!0;if(_.equals(T)===!1)return _.copy(T),!0}}return!1}function m(x){let M=x.uniforms,E=0,C=16;for(let D=0,_=M.length;D<_;D++){let b=Array.isArray(M[D])?M[D]:[M[D]];for(let I=0,A=b.length;I<A;I++){let L=b[I],z=Array.isArray(L.value)?L.value:[L.value];for(let j=0,N=z.length;j<N;j++){let B=z[j],F=v(B),Z=E%C,Q=Z%F.boundary,ce=Z+Q;E+=Q,ce!==0&&C-ce<F.storage&&(E+=C-ce),L.__data=new Float32Array(F.storage/Float32Array.BYTES_PER_ELEMENT),L.__offset=E,E+=F.storage}}}let T=E%C;return T>0&&(E+=C-T),x.__size=E,x.__cache={},this}function v(x){let M={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(M.boundary=4,M.storage=4):x.isVector2?(M.boundary=8,M.storage=8):x.isVector3||x.isColor?(M.boundary=16,M.storage=12):x.isVector4?(M.boundary=16,M.storage=16):x.isMatrix3?(M.boundary=48,M.storage=48):x.isMatrix4?(M.boundary=64,M.storage=64):x.isTexture?De("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(x)?(M.boundary=16,M.storage=x.byteLength):De("WebGLRenderer: Unsupported uniform value type.",x),M}function p(x){let M=x.target;M.removeEventListener("dispose",p);let E=o.indexOf(M.__bindingPointIndex);o.splice(E,1),n.deleteBuffer(r[M.id]),delete r[M.id],delete s[M.id]}function g(){for(let x in r)n.deleteBuffer(r[x]);o=[],r={},s={}}return{bind:c,update:l,dispose:g}}var H3=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),_r=null;function z3(){return _r===null&&(_r=new gp(H3,16,16,Vs,mr),_r.name="DFG_LUT",_r.minFilter=yn,_r.magFilter=yn,_r.wrapS=cr,_r.wrapT=cr,_r.generateMipmaps=!1,_r.needsUpdate=!0),_r}var Em=class{constructor(e={}){let{canvas:t=tC(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:f=!1,outputBufferType:h=jn}=e;this.isWebGLRenderer=!0;let m;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=i.getContextAttributes().alpha}else m=o;let v=h,p=new Set([Bp,Up,kp]),g=new Set([jn,qi,_c,yc,Lp,Fp]),x=new Uint32Array(4),M=new Int32Array(4),E=new U,C=null,T=null,D=[],_=[],b=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=$i,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let I=this,A=!1,L=null;this._outputColorSpace=ci;let z=0,j=0,N=null,B=-1,F=null,Z=new Pt,Q=new Pt,ce=null,ge=new it(0),Se=0,Je=t.width,Ye=t.height,Ae=1,Y=null,he=null,re=new Pt(0,0,Je,Ye),Ie=new Pt(0,0,Je,Ye),Ve=!1,Ne=new pc,Rt=!1,Qe=!1,mt=new At,Dt=new U,Ze=new Pt,Qt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Nt=!1;function Zn(){return N===null?Ae:1}let P=i;function en(S,O){return t.getContext(S,O)}try{let S={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"184"}`),t.addEventListener("webglcontextlost",K,!1),t.addEventListener("webglcontextrestored",Ee,!1),t.addEventListener("webglcontextcreationerror",ze,!1),P===null){let O="webgl2";if(P=en(O,S),P===null)throw en(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw Ce("WebGLRenderer: "+S.message),S}let et,Tt,le,kt,w,y,k,q,J,te,ae,W,X,pe,ye,se,ne,Fe,je,at,R,ie,$;function me(){et=new Yk(P),et.init(),R=new L3(P,et),Tt=new Hk(P,et,e,R),le=new P3(P,et),Tt.reversedDepthBuffer&&f&&le.buffers.depth.setReversed(!0),kt=new Jk(P),w=new y3,y=new O3(P,et,le,w,Tt,R,kt),k=new Xk(I),q=new nF(P),ie=new Bk(P,q),J=new Zk(P,q,kt,ie),te=new eU(P,J,q,ie,kt),Fe=new Qk(P,Tt,y),ye=new zk(w),ae=new _3(I,k,et,Tt,ie,ye),W=new B3(I,w),X=new S3,pe=new C3(et),ne=new Uk(I,k,le,te,m,c),se=new N3(I,te,Tt),$=new V3(P,kt,Tt,le),je=new Vk(P,et,kt),at=new Kk(P,et,kt),kt.programs=ae.programs,I.capabilities=Tt,I.extensions=et,I.properties=w,I.renderLists=X,I.shadowMap=se,I.state=le,I.info=kt}me(),v!==jn&&(b=new nU(v,t.width,t.height,r,s));let oe=new q0(I,P);this.xr=oe,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){let S=et.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){let S=et.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return Ae},this.setPixelRatio=function(S){S!==void 0&&(Ae=S,this.setSize(Je,Ye,!1))},this.getSize=function(S){return S.set(Je,Ye)},this.setSize=function(S,O,G=!0){if(oe.isPresenting){De("WebGLRenderer: Can't change size while VR device is presenting.");return}Je=S,Ye=O,t.width=Math.floor(S*Ae),t.height=Math.floor(O*Ae),G===!0&&(t.style.width=S+"px",t.style.height=O+"px"),b!==null&&b.setSize(t.width,t.height),this.setViewport(0,0,S,O)},this.getDrawingBufferSize=function(S){return S.set(Je*Ae,Ye*Ae).floor()},this.setDrawingBufferSize=function(S,O,G){Je=S,Ye=O,Ae=G,t.width=Math.floor(S*G),t.height=Math.floor(O*G),this.setViewport(0,0,S,O)},this.setEffects=function(S){if(v===jn){Ce("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(S){for(let O=0;O<S.length;O++)if(S[O].isOutputPass===!0){De("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}b.setEffects(S||[])},this.getCurrentViewport=function(S){return S.copy(Z)},this.getViewport=function(S){return S.copy(re)},this.setViewport=function(S,O,G,V){S.isVector4?re.set(S.x,S.y,S.z,S.w):re.set(S,O,G,V),le.viewport(Z.copy(re).multiplyScalar(Ae).round())},this.getScissor=function(S){return S.copy(Ie)},this.setScissor=function(S,O,G,V){S.isVector4?Ie.set(S.x,S.y,S.z,S.w):Ie.set(S,O,G,V),le.scissor(Q.copy(Ie).multiplyScalar(Ae).round())},this.getScissorTest=function(){return Ve},this.setScissorTest=function(S){le.setScissorTest(Ve=S)},this.setOpaqueSort=function(S){Y=S},this.setTransparentSort=function(S){he=S},this.getClearColor=function(S){return S.copy(ne.getClearColor())},this.setClearColor=function(){ne.setClearColor(...arguments)},this.getClearAlpha=function(){return ne.getClearAlpha()},this.setClearAlpha=function(){ne.setClearAlpha(...arguments)},this.clear=function(S=!0,O=!0,G=!0){let V=0;if(S){let H=!1;if(N!==null){let fe=N.texture.format;H=p.has(fe)}if(H){let fe=N.texture.type,xe=g.has(fe),de=ne.getClearColor(),Me=ne.getClearAlpha(),be=de.r,Ge=de.g,Xe=de.b;xe?(x[0]=be,x[1]=Ge,x[2]=Xe,x[3]=Me,P.clearBufferuiv(P.COLOR,0,x)):(M[0]=be,M[1]=Ge,M[2]=Xe,M[3]=Me,P.clearBufferiv(P.COLOR,0,M))}else V|=P.COLOR_BUFFER_BIT}O&&(V|=P.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),G&&(V|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),V!==0&&P.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(S){S.setRenderer(this),L=S},this.dispose=function(){t.removeEventListener("webglcontextlost",K,!1),t.removeEventListener("webglcontextrestored",Ee,!1),t.removeEventListener("webglcontextcreationerror",ze,!1),ne.dispose(),X.dispose(),pe.dispose(),w.dispose(),k.dispose(),te.dispose(),ie.dispose(),$.dispose(),ae.dispose(),oe.dispose(),oe.removeEventListener("sessionstart",Vx),oe.removeEventListener("sessionend",Hx),Ks.stop()};function K(S){S.preventDefault(),su("WebGLRenderer: Context Lost."),A=!0}function Ee(){su("WebGLRenderer: Context Restored."),A=!1;let S=kt.autoReset,O=se.enabled,G=se.autoUpdate,V=se.needsUpdate,H=se.type;me(),kt.autoReset=S,se.enabled=O,se.autoUpdate=G,se.needsUpdate=V,se.type=H}function ze(S){Ce("WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function jt(S){let O=S.target;O.removeEventListener("dispose",jt),gt(O)}function gt(S){br(S),w.remove(S)}function br(S){let O=w.get(S).programs;O!==void 0&&(O.forEach(function(G){ae.releaseProgram(G)}),S.isShaderMaterial&&ae.releaseShaderCache(S))}this.renderBufferDirect=function(S,O,G,V,H,fe){O===null&&(O=Qt);let xe=H.isMesh&&H.matrixWorld.determinant()<0,de=$D(S,O,G,V,H);le.setMaterial(V,xe);let Me=G.index,be=1;if(V.wireframe===!0){if(Me=J.getWireframeAttribute(G),Me===void 0)return;be=2}let Ge=G.drawRange,Xe=G.attributes.position,we=Ge.start*be,vt=(Ge.start+Ge.count)*be;fe!==null&&(we=Math.max(we,fe.start*be),vt=Math.min(vt,(fe.start+fe.count)*be)),Me!==null?(we=Math.max(we,0),vt=Math.min(vt,Me.count)):Xe!=null&&(we=Math.max(we,0),vt=Math.min(vt,Xe.count));let Wt=vt-we;if(Wt<0||Wt===1/0)return;ie.setup(H,V,de,G,Me);let Ut,Mt=je;if(Me!==null&&(Ut=q.get(Me),Mt=at,Mt.setIndex(Ut)),H.isMesh)V.wireframe===!0?(le.setLineWidth(V.wireframeLinewidth*Zn()),Mt.setMode(P.LINES)):Mt.setMode(P.TRIANGLES);else if(H.isLine){let En=V.linewidth;En===void 0&&(En=1),le.setLineWidth(En*Zn()),H.isLineSegments?Mt.setMode(P.LINES):H.isLineLoop?Mt.setMode(P.LINE_LOOP):Mt.setMode(P.LINE_STRIP)}else H.isPoints?Mt.setMode(P.POINTS):H.isSprite&&Mt.setMode(P.TRIANGLES);if(H.isBatchedMesh)if(et.get("WEBGL_multi_draw"))Mt.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{let En=H._multiDrawStarts,ve=H._multiDrawCounts,Kn=H._multiDrawCount,ot=Me?q.get(Me).bytesPerElement:1,gi=w.get(V).currentProgram.getUniforms();for(let Zi=0;Zi<Kn;Zi++)gi.setValue(P,"_gl_DrawID",Zi),Mt.render(En[Zi]/ot,ve[Zi])}else if(H.isInstancedMesh)Mt.renderInstances(we,Wt,H.count);else if(G.isInstancedBufferGeometry){let En=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,ve=Math.min(G.instanceCount,En);Mt.renderInstances(we,Wt,ve)}else Mt.render(we,Wt)};function Yi(S,O,G){S.transparent===!0&&S.side===hr&&S.forceSinglePass===!1?(S.side=xn,S.needsUpdate=!0,Ku(S,O,G),S.side=Yr,S.needsUpdate=!0,Ku(S,O,G),S.side=hr):Ku(S,O,G)}this.compile=function(S,O,G=null){G===null&&(G=S),T=pe.get(G),T.init(O),_.push(T),G.traverseVisible(function(H){H.isLight&&H.layers.test(O.layers)&&(T.pushLight(H),H.castShadow&&T.pushShadow(H))}),S!==G&&S.traverseVisible(function(H){H.isLight&&H.layers.test(O.layers)&&(T.pushLight(H),H.castShadow&&T.pushShadow(H))}),T.setupLights();let V=new Set;return S.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;let fe=H.material;if(fe)if(Array.isArray(fe))for(let xe=0;xe<fe.length;xe++){let de=fe[xe];Yi(de,G,H),V.add(de)}else Yi(fe,G,H),V.add(fe)}),T=_.pop(),V},this.compileAsync=function(S,O,G=null){let V=this.compile(S,O,G);return new Promise(H=>{function fe(){if(V.forEach(function(xe){w.get(xe).currentProgram.isReady()&&V.delete(xe)}),V.size===0){H(S);return}setTimeout(fe,10)}et.get("KHR_parallel_shader_compile")!==null?fe():setTimeout(fe,10)})};let $m=null;function jD(S){$m&&$m(S)}function Vx(){Ks.stop()}function Hx(){Ks.start()}let Ks=new IC;Ks.setAnimationLoop(jD),typeof self<"u"&&Ks.setContext(self),this.setAnimationLoop=function(S){$m=S,oe.setAnimationLoop(S),S===null?Ks.stop():Ks.start()},oe.addEventListener("sessionstart",Vx),oe.addEventListener("sessionend",Hx),this.render=function(S,O){if(O!==void 0&&O.isCamera!==!0){Ce("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;L!==null&&L.renderStart(S,O);let G=oe.enabled===!0&&oe.isPresenting===!0,V=b!==null&&(N===null||G)&&b.begin(I,N);if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),oe.enabled===!0&&oe.isPresenting===!0&&(b===null||b.isCompositing()===!1)&&(oe.cameraAutoUpdate===!0&&oe.updateCamera(O),O=oe.getCamera()),S.isScene===!0&&S.onBeforeRender(I,S,O,N),T=pe.get(S,_.length),T.init(O),T.state.textureUnits=y.getTextureUnits(),_.push(T),mt.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),Ne.setFromProjectionMatrix(mt,Wi,O.reversedDepth),Qe=this.localClippingEnabled,Rt=ye.init(this.clippingPlanes,Qe),C=X.get(S,D.length),C.init(),D.push(C),oe.enabled===!0&&oe.isPresenting===!0){let xe=I.xr.getDepthSensingMesh();xe!==null&&qm(xe,O,-1/0,I.sortObjects)}qm(S,O,0,I.sortObjects),C.finish(),I.sortObjects===!0&&C.sort(Y,he),Nt=oe.enabled===!1||oe.isPresenting===!1||oe.hasDepthSensing()===!1,Nt&&ne.addToRenderList(C,S),this.info.render.frame++,Rt===!0&&ye.beginShadows();let H=T.state.shadowsArray;if(se.render(H,S,O),Rt===!0&&ye.endShadows(),this.info.autoReset===!0&&this.info.reset(),(V&&b.hasRenderPass())===!1){let xe=C.opaque,de=C.transmissive;if(T.setupLights(),O.isArrayCamera){let Me=O.cameras;if(de.length>0)for(let be=0,Ge=Me.length;be<Ge;be++){let Xe=Me[be];Gx(xe,de,S,Xe)}Nt&&ne.render(S);for(let be=0,Ge=Me.length;be<Ge;be++){let Xe=Me[be];zx(C,S,Xe,Xe.viewport)}}else de.length>0&&Gx(xe,de,S,O),Nt&&ne.render(S),zx(C,S,O)}N!==null&&j===0&&(y.updateMultisampleRenderTarget(N),y.updateRenderTargetMipmap(N)),V&&b.end(I),S.isScene===!0&&S.onAfterRender(I,S,O),ie.resetDefaultState(),B=-1,F=null,_.pop(),_.length>0?(T=_[_.length-1],y.setTextureUnits(T.state.textureUnits),Rt===!0&&ye.setGlobalState(I.clippingPlanes,T.state.camera)):T=null,D.pop(),D.length>0?C=D[D.length-1]:C=null,L!==null&&L.renderEnd()};function qm(S,O,G,V){if(S.visible===!1)return;if(S.layers.test(O.layers)){if(S.isGroup)G=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(O);else if(S.isLightProbeGrid)T.pushLightProbeGrid(S);else if(S.isLight)T.pushLight(S),S.castShadow&&T.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||Ne.intersectsSprite(S)){V&&Ze.setFromMatrixPosition(S.matrixWorld).applyMatrix4(mt);let xe=te.update(S),de=S.material;de.visible&&C.push(S,xe,de,G,Ze.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||Ne.intersectsObject(S))){let xe=te.update(S),de=S.material;if(V&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Ze.copy(S.boundingSphere.center)):(xe.boundingSphere===null&&xe.computeBoundingSphere(),Ze.copy(xe.boundingSphere.center)),Ze.applyMatrix4(S.matrixWorld).applyMatrix4(mt)),Array.isArray(de)){let Me=xe.groups;for(let be=0,Ge=Me.length;be<Ge;be++){let Xe=Me[be],we=de[Xe.materialIndex];we&&we.visible&&C.push(S,xe,we,G,Ze.z,Xe)}}else de.visible&&C.push(S,xe,de,G,Ze.z,null)}}let fe=S.children;for(let xe=0,de=fe.length;xe<de;xe++)qm(fe[xe],O,G,V)}function zx(S,O,G,V){let{opaque:H,transmissive:fe,transparent:xe}=S;T.setupLightsView(G),Rt===!0&&ye.setGlobalState(I.clippingPlanes,G),V&&le.viewport(Z.copy(V)),H.length>0&&Zu(H,O,G),fe.length>0&&Zu(fe,O,G),xe.length>0&&Zu(xe,O,G),le.buffers.depth.setTest(!0),le.buffers.depth.setMask(!0),le.buffers.color.setMask(!0),le.setPolygonOffset(!1)}function Gx(S,O,G,V){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[V.id]===void 0){let we=et.has("EXT_color_buffer_half_float")||et.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[V.id]=new li(1,1,{generateMipmaps:!0,type:we?mr:jn,minFilter:Us,samples:Math.max(4,Tt.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:nt.workingColorSpace})}let fe=T.state.transmissionRenderTarget[V.id],xe=V.viewport||Z;fe.setSize(xe.z*I.transmissionResolutionScale,xe.w*I.transmissionResolutionScale);let de=I.getRenderTarget(),Me=I.getActiveCubeFace(),be=I.getActiveMipmapLevel();I.setRenderTarget(fe),I.getClearColor(ge),Se=I.getClearAlpha(),Se<1&&I.setClearColor(16777215,.5),I.clear(),Nt&&ne.render(G);let Ge=I.toneMapping;I.toneMapping=$i;let Xe=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),T.setupLightsView(V),Rt===!0&&ye.setGlobalState(I.clippingPlanes,V),Zu(S,G,V),y.updateMultisampleRenderTarget(fe),y.updateRenderTargetMipmap(fe),et.has("WEBGL_multisampled_render_to_texture")===!1){let we=!1;for(let vt=0,Wt=O.length;vt<Wt;vt++){let Ut=O[vt],{object:Mt,geometry:En,material:ve,group:Kn}=Ut;if(ve.side===hr&&Mt.layers.test(V.layers)){let ot=ve.side;ve.side=xn,ve.needsUpdate=!0,jx(Mt,G,V,En,ve,Kn),ve.side=ot,ve.needsUpdate=!0,we=!0}}we===!0&&(y.updateMultisampleRenderTarget(fe),y.updateRenderTargetMipmap(fe))}I.setRenderTarget(de,Me,be),I.setClearColor(ge,Se),Xe!==void 0&&(V.viewport=Xe),I.toneMapping=Ge}function Zu(S,O,G){let V=O.isScene===!0?O.overrideMaterial:null;for(let H=0,fe=S.length;H<fe;H++){let xe=S[H],{object:de,geometry:Me,group:be}=xe,Ge=xe.material;Ge.allowOverride===!0&&V!==null&&(Ge=V),de.layers.test(G.layers)&&jx(de,O,G,Me,Ge,be)}}function jx(S,O,G,V,H,fe){S.onBeforeRender(I,O,G,V,H,fe),S.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),H.onBeforeRender(I,O,G,V,S,fe),H.transparent===!0&&H.side===hr&&H.forceSinglePass===!1?(H.side=xn,H.needsUpdate=!0,I.renderBufferDirect(G,O,V,H,S,fe),H.side=Yr,H.needsUpdate=!0,I.renderBufferDirect(G,O,V,H,S,fe),H.side=hr):I.renderBufferDirect(G,O,V,H,S,fe),S.onAfterRender(I,O,G,V,H,fe)}function Ku(S,O,G){O.isScene!==!0&&(O=Qt);let V=w.get(S),H=T.state.lights,fe=T.state.shadowsArray,xe=H.state.version,de=ae.getParameters(S,H.state,fe,O,G,T.state.lightProbeGridArray),Me=ae.getProgramCacheKey(de),be=V.programs;V.environment=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?O.environment:null,V.fog=O.fog;let Ge=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap;V.envMap=k.get(S.envMap||V.environment,Ge),V.envMapRotation=V.environment!==null&&S.envMap===null?O.environmentRotation:S.envMapRotation,be===void 0&&(S.addEventListener("dispose",jt),be=new Map,V.programs=be);let Xe=be.get(Me);if(Xe!==void 0){if(V.currentProgram===Xe&&V.lightsStateVersion===xe)return $x(S,de),Xe}else de.uniforms=ae.getUniforms(S),L!==null&&S.isNodeMaterial&&L.build(S,G,de),S.onBeforeCompile(de,I),Xe=ae.acquireProgram(de,Me),be.set(Me,Xe),V.uniforms=de.uniforms;let we=V.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(we.clippingPlanes=ye.uniform),$x(S,de),V.needsLights=XD(S),V.lightsStateVersion=xe,V.needsLights&&(we.ambientLightColor.value=H.state.ambient,we.lightProbe.value=H.state.probe,we.directionalLights.value=H.state.directional,we.directionalLightShadows.value=H.state.directionalShadow,we.spotLights.value=H.state.spot,we.spotLightShadows.value=H.state.spotShadow,we.rectAreaLights.value=H.state.rectArea,we.ltc_1.value=H.state.rectAreaLTC1,we.ltc_2.value=H.state.rectAreaLTC2,we.pointLights.value=H.state.point,we.pointLightShadows.value=H.state.pointShadow,we.hemisphereLights.value=H.state.hemi,we.directionalShadowMatrix.value=H.state.directionalShadowMatrix,we.spotLightMatrix.value=H.state.spotLightMatrix,we.spotLightMap.value=H.state.spotLightMap,we.pointShadowMatrix.value=H.state.pointShadowMatrix),V.lightProbeGrid=T.state.lightProbeGridArray.length>0,V.currentProgram=Xe,V.uniformsList=null,Xe}function Wx(S){if(S.uniformsList===null){let O=S.currentProgram.getUniforms();S.uniformsList=Sc.seqWithValue(O.seq,S.uniforms)}return S.uniformsList}function $x(S,O){let G=w.get(S);G.outputColorSpace=O.outputColorSpace,G.batching=O.batching,G.batchingColor=O.batchingColor,G.instancing=O.instancing,G.instancingColor=O.instancingColor,G.instancingMorph=O.instancingMorph,G.skinning=O.skinning,G.morphTargets=O.morphTargets,G.morphNormals=O.morphNormals,G.morphColors=O.morphColors,G.morphTargetsCount=O.morphTargetsCount,G.numClippingPlanes=O.numClippingPlanes,G.numIntersection=O.numClipIntersection,G.vertexAlphas=O.vertexAlphas,G.vertexTangents=O.vertexTangents,G.toneMapping=O.toneMapping}function WD(S,O){if(S.length===0)return null;if(S.length===1)return S[0].texture!==null?S[0]:null;E.setFromMatrixPosition(O.matrixWorld);for(let G=0,V=S.length;G<V;G++){let H=S[G];if(H.texture!==null&&H.boundingBox.containsPoint(E))return H}return null}function $D(S,O,G,V,H){O.isScene!==!0&&(O=Qt),y.resetTextureUnits();let fe=O.fog,xe=V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial?O.environment:null,de=N===null?I.outputColorSpace:N.isXRRenderTarget===!0?N.texture.colorSpace:nt.workingColorSpace,Me=V.isMeshStandardMaterial||V.isMeshLambertMaterial&&!V.envMap||V.isMeshPhongMaterial&&!V.envMap,be=k.get(V.envMap||xe,Me),Ge=V.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,Xe=!!G.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),we=!!G.morphAttributes.position,vt=!!G.morphAttributes.normal,Wt=!!G.morphAttributes.color,Ut=$i;V.toneMapped&&(N===null||N.isXRRenderTarget===!0)&&(Ut=I.toneMapping);let Mt=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,En=Mt!==void 0?Mt.length:0,ve=w.get(V),Kn=T.state.lights;if(Rt===!0&&(Qe===!0||S!==F)){let Ct=S===F&&V.id===B;ye.setState(V,S,Ct)}let ot=!1;V.version===ve.__version?(ve.needsLights&&ve.lightsStateVersion!==Kn.state.version||ve.outputColorSpace!==de||H.isBatchedMesh&&ve.batching===!1||!H.isBatchedMesh&&ve.batching===!0||H.isBatchedMesh&&ve.batchingColor===!0&&H.colorTexture===null||H.isBatchedMesh&&ve.batchingColor===!1&&H.colorTexture!==null||H.isInstancedMesh&&ve.instancing===!1||!H.isInstancedMesh&&ve.instancing===!0||H.isSkinnedMesh&&ve.skinning===!1||!H.isSkinnedMesh&&ve.skinning===!0||H.isInstancedMesh&&ve.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&ve.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&ve.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&ve.instancingMorph===!1&&H.morphTexture!==null||ve.envMap!==be||V.fog===!0&&ve.fog!==fe||ve.numClippingPlanes!==void 0&&(ve.numClippingPlanes!==ye.numPlanes||ve.numIntersection!==ye.numIntersection)||ve.vertexAlphas!==Ge||ve.vertexTangents!==Xe||ve.morphTargets!==we||ve.morphNormals!==vt||ve.morphColors!==Wt||ve.toneMapping!==Ut||ve.morphTargetsCount!==En||!!ve.lightProbeGrid!=T.state.lightProbeGridArray.length>0)&&(ot=!0):(ot=!0,ve.__version=V.version);let gi=ve.currentProgram;ot===!0&&(gi=Ku(V,O,H),L&&V.isNodeMaterial&&L.onUpdateProgram(V,gi,ve));let Zi=!1,rs=!1,Ko=!1,Et=gi.getUniforms(),$t=ve.uniforms;if(le.useProgram(gi.program)&&(Zi=!0,rs=!0,Ko=!0),V.id!==B&&(B=V.id,rs=!0),ve.needsLights){let Ct=WD(T.state.lightProbeGridArray,H);ve.lightProbeGrid!==Ct&&(ve.lightProbeGrid=Ct,rs=!0)}if(Zi||F!==S){le.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),Et.setValue(P,"projectionMatrix",S.projectionMatrix),Et.setValue(P,"viewMatrix",S.matrixWorldInverse);let os=Et.map.cameraPosition;os!==void 0&&os.setValue(P,Dt.setFromMatrixPosition(S.matrixWorld)),Tt.logarithmicDepthBuffer&&Et.setValue(P,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&Et.setValue(P,"isOrthographic",S.isOrthographicCamera===!0),F!==S&&(F=S,rs=!0,Ko=!0)}if(ve.needsLights&&(Kn.state.directionalShadowMap.length>0&&Et.setValue(P,"directionalShadowMap",Kn.state.directionalShadowMap,y),Kn.state.spotShadowMap.length>0&&Et.setValue(P,"spotShadowMap",Kn.state.spotShadowMap,y),Kn.state.pointShadowMap.length>0&&Et.setValue(P,"pointShadowMap",Kn.state.pointShadowMap,y)),H.isSkinnedMesh){Et.setOptional(P,H,"bindMatrix"),Et.setOptional(P,H,"bindMatrixInverse");let Ct=H.skeleton;Ct&&(Ct.boneTexture===null&&Ct.computeBoneTexture(),Et.setValue(P,"boneTexture",Ct.boneTexture,y))}H.isBatchedMesh&&(Et.setOptional(P,H,"batchingTexture"),Et.setValue(P,"batchingTexture",H._matricesTexture,y),Et.setOptional(P,H,"batchingIdTexture"),Et.setValue(P,"batchingIdTexture",H._indirectTexture,y),Et.setOptional(P,H,"batchingColorTexture"),H._colorsTexture!==null&&Et.setValue(P,"batchingColorTexture",H._colorsTexture,y));let ss=G.morphAttributes;if((ss.position!==void 0||ss.normal!==void 0||ss.color!==void 0)&&Fe.update(H,G,gi),(rs||ve.receiveShadow!==H.receiveShadow)&&(ve.receiveShadow=H.receiveShadow,Et.setValue(P,"receiveShadow",H.receiveShadow)),(V.isMeshStandardMaterial||V.isMeshLambertMaterial||V.isMeshPhongMaterial)&&V.envMap===null&&O.environment!==null&&($t.envMapIntensity.value=O.environmentIntensity),$t.dfgLUT!==void 0&&($t.dfgLUT.value=z3()),rs){if(Et.setValue(P,"toneMappingExposure",I.toneMappingExposure),ve.needsLights&&qD($t,Ko),fe&&V.fog===!0&&W.refreshFogUniforms($t,fe),W.refreshMaterialUniforms($t,V,Ae,Ye,T.state.transmissionRenderTarget[S.id]),ve.needsLights&&ve.lightProbeGrid){let Ct=ve.lightProbeGrid;$t.probesSH.value=Ct.texture,$t.probesMin.value.copy(Ct.boundingBox.min),$t.probesMax.value.copy(Ct.boundingBox.max),$t.probesResolution.value.copy(Ct.resolution)}Sc.upload(P,Wx(ve),$t,y)}if(V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(Sc.upload(P,Wx(ve),$t,y),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&Et.setValue(P,"center",H.center),Et.setValue(P,"modelViewMatrix",H.modelViewMatrix),Et.setValue(P,"normalMatrix",H.normalMatrix),Et.setValue(P,"modelMatrix",H.matrixWorld),V.uniformsGroups!==void 0){let Ct=V.uniformsGroups;for(let os=0,Jo=Ct.length;os<Jo;os++){let qx=Ct[os];$.update(qx,gi),$.bind(qx,gi)}}return gi}function qD(S,O){S.ambientLightColor.needsUpdate=O,S.lightProbe.needsUpdate=O,S.directionalLights.needsUpdate=O,S.directionalLightShadows.needsUpdate=O,S.pointLights.needsUpdate=O,S.pointLightShadows.needsUpdate=O,S.spotLights.needsUpdate=O,S.spotLightShadows.needsUpdate=O,S.rectAreaLights.needsUpdate=O,S.hemisphereLights.needsUpdate=O}function XD(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return z},this.getActiveMipmapLevel=function(){return j},this.getRenderTarget=function(){return N},this.setRenderTargetTextures=function(S,O,G){let V=w.get(S);V.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,V.__autoAllocateDepthBuffer===!1&&(V.__useRenderToTexture=!1),w.get(S.texture).__webglTexture=O,w.get(S.depthTexture).__webglTexture=V.__autoAllocateDepthBuffer?void 0:G,V.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,O){let G=w.get(S);G.__webglFramebuffer=O,G.__useDefaultFramebuffer=O===void 0};let YD=P.createFramebuffer();this.setRenderTarget=function(S,O=0,G=0){N=S,z=O,j=G;let V=null,H=!1,fe=!1;if(S){let de=w.get(S);if(de.__useDefaultFramebuffer!==void 0){le.bindFramebuffer(P.FRAMEBUFFER,de.__webglFramebuffer),Z.copy(S.viewport),Q.copy(S.scissor),ce=S.scissorTest,le.viewport(Z),le.scissor(Q),le.setScissorTest(ce),B=-1;return}else if(de.__webglFramebuffer===void 0)y.setupRenderTarget(S);else if(de.__hasExternalTextures)y.rebindTextures(S,w.get(S.texture).__webglTexture,w.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){let Ge=S.depthTexture;if(de.__boundDepthTexture!==Ge){if(Ge!==null&&w.has(Ge)&&(S.width!==Ge.image.width||S.height!==Ge.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");y.setupDepthRenderbuffer(S)}}let Me=S.texture;(Me.isData3DTexture||Me.isDataArrayTexture||Me.isCompressedArrayTexture)&&(fe=!0);let be=w.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(be[O])?V=be[O][G]:V=be[O],H=!0):S.samples>0&&y.useMultisampledRTT(S)===!1?V=w.get(S).__webglMultisampledFramebuffer:Array.isArray(be)?V=be[G]:V=be,Z.copy(S.viewport),Q.copy(S.scissor),ce=S.scissorTest}else Z.copy(re).multiplyScalar(Ae).floor(),Q.copy(Ie).multiplyScalar(Ae).floor(),ce=Ve;if(G!==0&&(V=YD),le.bindFramebuffer(P.FRAMEBUFFER,V)&&le.drawBuffers(S,V),le.viewport(Z),le.scissor(Q),le.setScissorTest(ce),H){let de=w.get(S.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+O,de.__webglTexture,G)}else if(fe){let de=O;for(let Me=0;Me<S.textures.length;Me++){let be=w.get(S.textures[Me]);P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0+Me,be.__webglTexture,G,de)}}else if(S!==null&&G!==0){let de=w.get(S.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,de.__webglTexture,G)}B=-1},this.readRenderTargetPixels=function(S,O,G,V,H,fe,xe,de=0){if(!(S&&S.isWebGLRenderTarget)){Ce("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Me=w.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&xe!==void 0&&(Me=Me[xe]),Me){le.bindFramebuffer(P.FRAMEBUFFER,Me);try{let be=S.textures[de],Ge=be.format,Xe=be.type;if(S.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+de),!Tt.textureFormatReadable(Ge)){Ce("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Tt.textureTypeReadable(Xe)){Ce("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=S.width-V&&G>=0&&G<=S.height-H&&P.readPixels(O,G,V,H,R.convert(Ge),R.convert(Xe),fe)}finally{let be=N!==null?w.get(N).__webglFramebuffer:null;le.bindFramebuffer(P.FRAMEBUFFER,be)}}},this.readRenderTargetPixelsAsync=async function(S,O,G,V,H,fe,xe,de=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Me=w.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&xe!==void 0&&(Me=Me[xe]),Me)if(O>=0&&O<=S.width-V&&G>=0&&G<=S.height-H){le.bindFramebuffer(P.FRAMEBUFFER,Me);let be=S.textures[de],Ge=be.format,Xe=be.type;if(S.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+de),!Tt.textureFormatReadable(Ge))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Tt.textureTypeReadable(Xe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let we=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,we),P.bufferData(P.PIXEL_PACK_BUFFER,fe.byteLength,P.STREAM_READ),P.readPixels(O,G,V,H,R.convert(Ge),R.convert(Xe),0);let vt=N!==null?w.get(N).__webglFramebuffer:null;le.bindFramebuffer(P.FRAMEBUFFER,vt);let Wt=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await iC(P,Wt,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,we),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,fe),P.deleteBuffer(we),P.deleteSync(Wt),fe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,O=null,G=0){let V=Math.pow(2,-G),H=Math.floor(S.image.width*V),fe=Math.floor(S.image.height*V),xe=O!==null?O.x:0,de=O!==null?O.y:0;y.setTexture2D(S,0),P.copyTexSubImage2D(P.TEXTURE_2D,G,0,0,xe,de,H,fe),le.unbindTexture()};let ZD=P.createFramebuffer(),KD=P.createFramebuffer();this.copyTextureToTexture=function(S,O,G=null,V=null,H=0,fe=0){let xe,de,Me,be,Ge,Xe,we,vt,Wt,Ut=S.isCompressedTexture?S.mipmaps[fe]:S.image;if(G!==null)xe=G.max.x-G.min.x,de=G.max.y-G.min.y,Me=G.isBox3?G.max.z-G.min.z:1,be=G.min.x,Ge=G.min.y,Xe=G.isBox3?G.min.z:0;else{let $t=Math.pow(2,-H);xe=Math.floor(Ut.width*$t),de=Math.floor(Ut.height*$t),S.isDataArrayTexture?Me=Ut.depth:S.isData3DTexture?Me=Math.floor(Ut.depth*$t):Me=1,be=0,Ge=0,Xe=0}V!==null?(we=V.x,vt=V.y,Wt=V.z):(we=0,vt=0,Wt=0);let Mt=R.convert(O.format),En=R.convert(O.type),ve;O.isData3DTexture?(y.setTexture3D(O,0),ve=P.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(y.setTexture2DArray(O,0),ve=P.TEXTURE_2D_ARRAY):(y.setTexture2D(O,0),ve=P.TEXTURE_2D),le.activeTexture(P.TEXTURE0),le.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,O.flipY),le.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),le.pixelStorei(P.UNPACK_ALIGNMENT,O.unpackAlignment);let Kn=le.getParameter(P.UNPACK_ROW_LENGTH),ot=le.getParameter(P.UNPACK_IMAGE_HEIGHT),gi=le.getParameter(P.UNPACK_SKIP_PIXELS),Zi=le.getParameter(P.UNPACK_SKIP_ROWS),rs=le.getParameter(P.UNPACK_SKIP_IMAGES);le.pixelStorei(P.UNPACK_ROW_LENGTH,Ut.width),le.pixelStorei(P.UNPACK_IMAGE_HEIGHT,Ut.height),le.pixelStorei(P.UNPACK_SKIP_PIXELS,be),le.pixelStorei(P.UNPACK_SKIP_ROWS,Ge),le.pixelStorei(P.UNPACK_SKIP_IMAGES,Xe);let Ko=S.isDataArrayTexture||S.isData3DTexture,Et=O.isDataArrayTexture||O.isData3DTexture;if(S.isDepthTexture){let $t=w.get(S),ss=w.get(O),Ct=w.get($t.__renderTarget),os=w.get(ss.__renderTarget);le.bindFramebuffer(P.READ_FRAMEBUFFER,Ct.__webglFramebuffer),le.bindFramebuffer(P.DRAW_FRAMEBUFFER,os.__webglFramebuffer);for(let Jo=0;Jo<Me;Jo++)Ko&&(P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,w.get(S).__webglTexture,H,Xe+Jo),P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,w.get(O).__webglTexture,fe,Wt+Jo)),P.blitFramebuffer(be,Ge,xe,de,we,vt,xe,de,P.DEPTH_BUFFER_BIT,P.NEAREST);le.bindFramebuffer(P.READ_FRAMEBUFFER,null),le.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else if(H!==0||S.isRenderTargetTexture||w.has(S)){let $t=w.get(S),ss=w.get(O);le.bindFramebuffer(P.READ_FRAMEBUFFER,ZD),le.bindFramebuffer(P.DRAW_FRAMEBUFFER,KD);for(let Ct=0;Ct<Me;Ct++)Ko?P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,$t.__webglTexture,H,Xe+Ct):P.framebufferTexture2D(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,$t.__webglTexture,H),Et?P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,ss.__webglTexture,fe,Wt+Ct):P.framebufferTexture2D(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,ss.__webglTexture,fe),H!==0?P.blitFramebuffer(be,Ge,xe,de,we,vt,xe,de,P.COLOR_BUFFER_BIT,P.NEAREST):Et?P.copyTexSubImage3D(ve,fe,we,vt,Wt+Ct,be,Ge,xe,de):P.copyTexSubImage2D(ve,fe,we,vt,be,Ge,xe,de);le.bindFramebuffer(P.READ_FRAMEBUFFER,null),le.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else Et?S.isDataTexture||S.isData3DTexture?P.texSubImage3D(ve,fe,we,vt,Wt,xe,de,Me,Mt,En,Ut.data):O.isCompressedArrayTexture?P.compressedTexSubImage3D(ve,fe,we,vt,Wt,xe,de,Me,Mt,Ut.data):P.texSubImage3D(ve,fe,we,vt,Wt,xe,de,Me,Mt,En,Ut):S.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,fe,we,vt,xe,de,Mt,En,Ut.data):S.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,fe,we,vt,Ut.width,Ut.height,Mt,Ut.data):P.texSubImage2D(P.TEXTURE_2D,fe,we,vt,xe,de,Mt,En,Ut);le.pixelStorei(P.UNPACK_ROW_LENGTH,Kn),le.pixelStorei(P.UNPACK_IMAGE_HEIGHT,ot),le.pixelStorei(P.UNPACK_SKIP_PIXELS,gi),le.pixelStorei(P.UNPACK_SKIP_ROWS,Zi),le.pixelStorei(P.UNPACK_SKIP_IMAGES,rs),fe===0&&O.generateMipmaps&&P.generateMipmap(ve),le.unbindTexture()},this.initRenderTarget=function(S){w.get(S).__webglFramebuffer===void 0&&y.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?y.setTextureCube(S,0):S.isData3DTexture?y.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?y.setTexture2DArray(S,0):y.setTexture2D(S,0),le.unbindTexture()},this.resetState=function(){z=0,j=0,N=null,le.reset(),ie.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Wi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=nt._getDrawingBufferColorSpace(e),t.unpackColorSpace=nt._getUnpackColorSpace()}};function Qr(n){if(n===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}function WC(n,e){n.prototype=Object.create(e.prototype),n.prototype.constructor=n,n.__proto__=e}var Xn={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},Hu={duration:.5,overwrite:!1,delay:0},dx,Sn,It,Di=1e8,wt=1/Di,tx=Math.PI*2,j3=tx/4,W3=0,$C=Math.sqrt,$3=Math.cos,q3=Math.sin,cn=function(e){return typeof e=="string"},zt=function(e){return typeof e=="function"},ts=function(e){return typeof e=="number"},Lm=function(e){return typeof e>"u"},Mr=function(e){return typeof e=="object"},qn=function(e){return e!==!1},fx=function(){return typeof window<"u"},Tm=function(e){return zt(e)||cn(e)},qC=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},Pn=Array.isArray,X3=/random\([^)]+\)/g,Y3=/,\s*/g,kC=/(?:-?\.?\d|\.)+/gi,hx=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,jo=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,X0=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,px=/[+-]=-?[.\d]+/,Z3=/[^,'"\[\]\s]+/gi,K3=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,Lt,xr,nx,mx,hi={},Im={},XC,YC=function(e){return(Im=bc(e,hi))&&On},Fm=function(e,t){return console.warn("Invalid property",e,"set to",t,"Missing plugin? gsap.registerPlugin()")},zu=function(e,t){return!t&&console.warn(e)},ZC=function(e,t){return e&&(hi[e]=t)&&Im&&(Im[e]=t)||hi},Gu=function(){return 0},J3={suppressEvents:!0,isStart:!0,kill:!1},Cm={suppressEvents:!0,kill:!1},Q3={suppressEvents:!0},gx={},Gs=[],ix={},KC,Wn={},Y0={},UC=30,Dm=[],vx="",_x=function(e){var t=e[0],i,r;if(Mr(t)||zt(t)||(e=[e]),!(i=(t._gsap||{}).harness)){for(r=Dm.length;r--&&!Dm[r].targetTest(t););i=Dm[r]}for(r=e.length;r--;)e[r]&&(e[r]._gsap||(e[r]._gsap=new Mx(e[r],i)))||e.splice(r,1);return e},js=function(e){return e._gsap||_x(Ai(e))[0]._gsap},yx=function(e,t,i){return(i=e[t])&&zt(i)?e[t]():Lm(i)&&e.getAttribute&&e.getAttribute(t)||i},Bn=function(e,t){return(e=e.split(",")).forEach(t)||e},Gt=function(e){return Math.round(e*1e5)/1e5||0},Ot=function(e){return Math.round(e*1e7)/1e7||0},Wo=function(e,t){var i=t.charAt(0),r=parseFloat(t.substr(2));return e=parseFloat(e),i==="+"?e+r:i==="-"?e-r:i==="*"?e*r:e/r},eB=function(e,t){for(var i=t.length,r=0;e.indexOf(t[r])<0&&++r<i;);return r<i},Rm=function(){var e=Gs.length,t=Gs.slice(0),i,r;for(ix={},Gs.length=0,i=0;i<e;i++)r=t[i],r&&r._lazy&&(r.render(r._lazy[0],r._lazy[1],!0)._lazy=0)},xx=function(e){return!!(e._initted||e._startAt||e.add)},JC=function(e,t,i,r){Gs.length&&!Sn&&Rm(),e.render(t,i,r||!!(Sn&&t<0&&xx(e))),Gs.length&&!Sn&&Rm()},QC=function(e){var t=parseFloat(e);return(t||t===0)&&(e+"").match(Z3).length<2?t:cn(e)?e.trim():e},eD=function(e){return e},pi=function(e,t){for(var i in t)i in e||(e[i]=t[i]);return e},tB=function(e){return function(t,i){for(var r in i)r in t||r==="duration"&&e||r==="ease"||(t[r]=i[r])}},bc=function(e,t){for(var i in t)e[i]=t[i];return e},BC=function n(e,t){for(var i in t)i!=="__proto__"&&i!=="constructor"&&i!=="prototype"&&(e[i]=Mr(t[i])?n(e[i]||(e[i]={}),t[i]):t[i]);return e},Nm=function(e,t){var i={},r;for(r in e)r in t||(i[r]=e[r]);return i},Uu=function(e){var t=e.parent||Lt,i=e.keyframes?tB(Pn(e.keyframes)):pi;if(qn(e.inherit))for(;t;)i(e,t.vars.defaults),t=t.parent||t._dp;return e},nB=function(e,t){for(var i=e.length,r=i===t.length;r&&i--&&e[i]===t[i];);return i<0},tD=function(e,t,i,r,s){i===void 0&&(i="_first"),r===void 0&&(r="_last");var o=e[r],a;if(s)for(a=t[s];o&&o[s]>a;)o=o._prev;return o?(t._next=o._next,o._next=t):(t._next=e[i],e[i]=t),t._next?t._next._prev=t:e[r]=t,t._prev=o,t.parent=t._dp=e,t},km=function(e,t,i,r){i===void 0&&(i="_first"),r===void 0&&(r="_last");var s=t._prev,o=t._next;s?s._next=o:e[i]===t&&(e[i]=o),o?o._prev=s:e[r]===t&&(e[r]=s),t._next=t._prev=t.parent=null},Ws=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},Ho=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var i=e;i;)i._dirty=1,i=i.parent;return e},iB=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},rx=function(e,t,i,r){return e._startAt&&(Sn?e._startAt.revert(Cm):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,r))},rB=function n(e){return!e||e._ts&&n(e.parent)},VC=function(e){return e._repeat?wc(e._tTime,e=e.duration()+e._rDelay)*e:0},wc=function(e,t){var i=Math.floor(e=Ot(e/t));return e&&i===e?i-1:i},Pm=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},Um=function(e){return e._end=Ot(e._start+(e._tDur/Math.abs(e._ts||e._rts||wt)||0))},Bm=function(e,t){var i=e._dp;return i&&i.smoothChildTiming&&e._ts&&(e._start=Ot(i._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),Um(e),i._dirty||Ho(i,e)),e},nD=function(e,t){var i;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(i=Pm(e.rawTime(),t),(!t._dur||$u(0,t.totalDuration(),i)-t._tTime>wt)&&t.render(i,!0)),Ho(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(i=e;i._dp;)i.rawTime()>=0&&i.totalTime(i._tTime),i=i._dp;e._zTime=-wt}},Sr=function(e,t,i,r){return t.parent&&Ws(t),t._start=Ot((ts(i)?i:i||e!==Lt?Ci(e,i,t):e._time)+t._delay),t._end=Ot(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),tD(e,t,"_first","_last",e._sort?"_start":0),sx(t)||(e._recent=t),r||nD(e,t),e._ts<0&&Bm(e,e._tTime),e},iD=function(e,t){return(hi.ScrollTrigger||Fm("scrollTrigger",t))&&hi.ScrollTrigger.create(t,e)},rD=function(e,t,i,r,s){if(wx(e,t,s),!e._initted)return 1;if(!i&&e._pt&&!Sn&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&KC!==$n.frame)return Gs.push(e),e._lazy=[s,r],1},sB=function n(e){var t=e.parent;return t&&t._ts&&t._initted&&!t._lock&&(t.rawTime()<0||n(t))},sx=function(e){var t=e.data;return t==="isFromStart"||t==="isStart"},oB=function(e,t,i,r){var s=e.ratio,o=t<0||!t&&(!e._start&&sB(e)&&!(!e._initted&&sx(e))||(e._ts<0||e._dp._ts<0)&&!sx(e))?0:1,a=e._rDelay,c=0,l,u,d;if(a&&e._repeat&&(c=$u(0,e._tDur,t),u=wc(c,a),e._yoyo&&u&1&&(o=1-o),u!==wc(e._tTime,a)&&(s=1-o,e.vars.repeatRefresh&&e._initted&&e.invalidate())),o!==s||Sn||r||e._zTime===wt||!t&&e._zTime){if(!e._initted&&rD(e,t,r,i,c))return;for(d=e._zTime,e._zTime=t||(i?wt:0),i||(i=t&&!d),e.ratio=o,e._from&&(o=1-o),e._time=0,e._tTime=c,l=e._pt;l;)l.r(o,l.d),l=l._next;t<0&&rx(e,t,i,!0),e._onUpdate&&!i&&fi(e,"onUpdate"),c&&e._repeat&&!i&&e.parent&&fi(e,"onRepeat"),(t>=e._tDur||t<0)&&e.ratio===o&&(o&&Ws(e,1),!i&&!Sn&&(fi(e,o?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=t)},aB=function(e,t,i){var r;if(i>t)for(r=e._first;r&&r._start<=i;){if(r.data==="isPause"&&r._start>t)return r;r=r._next}else for(r=e._last;r&&r._start>=i;){if(r.data==="isPause"&&r._start<t)return r;r=r._prev}},Tc=function(e,t,i,r){var s=e._repeat,o=Ot(t)||0,a=e._tTime/e._tDur;return a&&!r&&(e._time*=o/e._dur),e._dur=o,e._tDur=s?s<0?1e10:Ot(o*(s+1)+e._rDelay*s):o,a>0&&!r&&Bm(e,e._tTime=e._tDur*a),e.parent&&Um(e),i||Ho(e.parent,e),e},HC=function(e){return e instanceof Nn?Ho(e):Tc(e,e._dur)},cB={_start:0,endTime:Gu,totalDuration:Gu},Ci=function n(e,t,i){var r=e.labels,s=e._recent||cB,o=e.duration()>=Di?s.endTime(!1):e._dur,a,c,l;return cn(t)&&(isNaN(t)||t in r)?(c=t.charAt(0),l=t.substr(-1)==="%",a=t.indexOf("="),c==="<"||c===">"?(a>=0&&(t=t.replace(/=/,"")),(c==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(t.substr(1))||0)*(l?(a<0?s:i).totalDuration()/100:1)):a<0?(t in r||(r[t]=o),r[t]):(c=parseFloat(t.charAt(a-1)+t.substr(a+1)),l&&i&&(c=c/100*(Pn(i)?i[0]:i).totalDuration()),a>1?n(e,t.substr(0,a-1),i)+c:o+c)):t==null?o:+t},Bu=function(e,t,i){var r=ts(t[1]),s=(r?2:1)+(e<2?0:1),o=t[s],a,c;if(r&&(o.duration=t[1]),o.parent=i,e){for(a=o,c=i;c&&!("immediateRender"in a);)a=c.vars.defaults||{},c=qn(c.vars.inherit)&&c.parent;o.immediateRender=qn(a.immediateRender),e<2?o.runBackwards=1:o.startAt=t[s-1]}return new Xt(t[0],o,t[s+1])},$s=function(e,t){return e||e===0?t(e):t},$u=function(e,t,i){return i<e?e:i>t?t:i},Mn=function(e,t){return!cn(e)||!(t=K3.exec(e))?"":t[1]},lB=function(e,t,i){return $s(i,function(r){return $u(e,t,r)})},ox=[].slice,sD=function(e,t){return e&&Mr(e)&&"length"in e&&(!t&&!e.length||e.length-1 in e&&Mr(e[0]))&&!e.nodeType&&e!==xr},uB=function(e,t,i){return i===void 0&&(i=[]),e.forEach(function(r){var s;return cn(r)&&!t||sD(r,1)?(s=i).push.apply(s,Ai(r)):i.push(r)})||i},Ai=function(e,t,i){return It&&!t&&It.selector?It.selector(e):cn(e)&&!i&&(nx||!Cc())?ox.call((t||mx).querySelectorAll(e),0):Pn(e)?uB(e,i):sD(e)?ox.call(e,0):e?[e]:[]},ax=function(e){return e=Ai(e)[0]||zu("Invalid scope")||{},function(t){var i=e.current||e.nativeElement||e;return Ai(t,i.querySelectorAll?i:i===e?zu("Invalid scope")||mx.createElement("div"):e)}},oD=function(e){return e.sort(function(){return .5-Math.random()})},aD=function(e){if(zt(e))return e;var t=Mr(e)?e:{each:e},i=zo(t.ease),r=t.from||0,s=parseFloat(t.base)||0,o={},a=r>0&&r<1,c=isNaN(r)||a,l=t.axis,u=r,d=r;return cn(r)?u=d={center:.5,edges:.5,end:1}[r]||0:!a&&c&&(u=r[0],d=r[1]),function(f,h,m){var v=(m||t).length,p=o[v],g,x,M,E,C,T,D,_,b;if(!p){if(b=t.grid==="auto"?0:(t.grid||[1,Di])[1],!b){for(D=-Di;D<(D=m[b++].getBoundingClientRect().left)&&b<v;);b<v&&b--}for(p=o[v]=[],g=c?Math.min(b,v)*u-.5:r%b,x=b===Di?0:c?v*d/b-.5:r/b|0,D=0,_=Di,T=0;T<v;T++)M=T%b-g,E=x-(T/b|0),p[T]=C=l?Math.abs(l==="y"?E:M):$C(M*M+E*E),C>D&&(D=C),C<_&&(_=C);r==="random"&&oD(p),p.max=D-_,p.min=_,p.v=v=(parseFloat(t.amount)||parseFloat(t.each)*(b>v?v-1:l?l==="y"?v/b:b:Math.max(b,v/b))||0)*(r==="edges"?-1:1),p.b=v<0?s-v:s,p.u=Mn(t.amount||t.each)||0,i=i&&v<0?EB(i):i}return v=(p[f]-p.min)/p.max||0,Ot(p.b+(i?i(v):v)*p.v)+p.u}},cx=function(e){var t=Math.pow(10,((e+"").split(".")[1]||"").length);return function(i){var r=Ot(Math.round(parseFloat(i)/e)*e*t);return(r-r%1)/t+(ts(i)?0:Mn(i))}},cD=function(e,t){var i=Pn(e),r,s;return!i&&Mr(e)&&(r=i=e.radius||Di,e.values?(e=Ai(e.values),(s=!ts(e[0]))&&(r*=r)):e=cx(e.increment)),$s(t,i?zt(e)?function(o){return s=e(o),Math.abs(s-o)<=r?s:o}:function(o){for(var a=parseFloat(s?o.x:o),c=parseFloat(s?o.y:0),l=Di,u=0,d=e.length,f,h;d--;)s?(f=e[d].x-a,h=e[d].y-c,f=f*f+h*h):f=Math.abs(e[d]-a),f<l&&(l=f,u=d);return u=!r||l<=r?e[u]:o,s||u===o||ts(o)?u:u+Mn(o)}:cx(e))},lD=function(e,t,i,r){return $s(Pn(e)?!t:i===!0?!!(i=0):!r,function(){return Pn(e)?e[~~(Math.random()*e.length)]:(i=i||1e-5)&&(r=i<1?Math.pow(10,(i+"").length-2):1)&&Math.floor(Math.round((e-i/2+Math.random()*(t-e+i*.99))/i)*i*r)/r})},dB=function(){for(var e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i];return function(r){return t.reduce(function(s,o){return o(s)},r)}},fB=function(e,t){return function(i){return e(parseFloat(i))+(t||Mn(i))}},hB=function(e,t,i){return dD(e,t,0,1,i)},uD=function(e,t,i){return $s(i,function(r){return e[~~t(r)]})},pB=function n(e,t,i){var r=t-e;return Pn(e)?uD(e,n(0,e.length),t):$s(i,function(s){return(r+(s-e)%r)%r+e})},mB=function n(e,t,i){var r=t-e,s=r*2;return Pn(e)?uD(e,n(0,e.length-1),t):$s(i,function(o){return o=(s+(o-e)%s)%s||0,e+(o>r?s-o:o)})},Dc=function(e){return e.replace(X3,function(t){var i=t.indexOf("[")+1,r=t.substring(i||7,i?t.indexOf("]"):t.length-1).split(Y3);return lD(i?r:+r[0],i?0:+r[1],+r[2]||1e-5)})},dD=function(e,t,i,r,s){var o=t-e,a=r-i;return $s(s,function(c){return i+((c-e)/o*a||0)})},gB=function n(e,t,i,r){var s=isNaN(e+t)?0:function(h){return(1-h)*e+h*t};if(!s){var o=cn(e),a={},c,l,u,d,f;if(i===!0&&(r=1)&&(i=null),o)e={p:e},t={p:t};else if(Pn(e)&&!Pn(t)){for(u=[],d=e.length,f=d-2,l=1;l<d;l++)u.push(n(e[l-1],e[l]));d--,s=function(m){m*=d;var v=Math.min(f,~~m);return u[v](m-v)},i=t}else r||(e=bc(Pn(e)?[]:{},e));if(!u){for(c in t)Ex.call(a,e,c,"get",t[c]);s=function(m){return Dx(m,a)||(o?e.p:e)}}}return $s(i,s)},zC=function(e,t,i){var r=e.labels,s=Di,o,a,c;for(o in r)a=r[o]-t,a<0==!!i&&a&&s>(a=Math.abs(a))&&(c=o,s=a);return c},fi=function(e,t,i){var r=e.vars,s=r[t],o=It,a=e._ctx,c,l,u;if(s)return c=r[t+"Params"],l=r.callbackScope||e,i&&Gs.length&&Rm(),a&&(It=a),u=c?s.apply(l,c):s.call(l),It=o,u},Fu=function(e){return Ws(e),e.scrollTrigger&&e.scrollTrigger.kill(!!Sn),e.progress()<1&&fi(e,"onInterrupt"),e},Ec,fD=[],hD=function(e){if(e)if(e=!e.name&&e.default||e,fx()||e.headless){var t=e.name,i=zt(e),r=t&&!i&&e.init?function(){this._props=[]}:e,s={init:Gu,render:Dx,add:Ex,kill:PB,modifier:NB,rawVars:0},o={targetTest:0,get:0,getSetter:Vm,aliases:{},register:0};if(Cc(),e!==r){if(Wn[t])return;pi(r,pi(Nm(e,s),o)),bc(r.prototype,bc(s,Nm(e,o))),Wn[r.prop=t]=r,e.targetTest&&(Dm.push(r),gx[t]=1),t=(t==="css"?"CSS":t.charAt(0).toUpperCase()+t.substr(1))+"Plugin"}ZC(t,r),e.register&&e.register(On,r,Vn)}else fD.push(e)},bt=255,ku={aqua:[0,bt,bt],lime:[0,bt,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,bt],navy:[0,0,128],white:[bt,bt,bt],olive:[128,128,0],yellow:[bt,bt,0],orange:[bt,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[bt,0,0],pink:[bt,192,203],cyan:[0,bt,bt],transparent:[bt,bt,bt,0]},Z0=function(e,t,i){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(i-t)*e*6:e<.5?i:e*3<2?t+(i-t)*(2/3-e)*6:t)*bt+.5|0},pD=function(e,t,i){var r=e?ts(e)?[e>>16,e>>8&bt,e&bt]:0:ku.black,s,o,a,c,l,u,d,f,h,m;if(!r){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),ku[e])r=ku[e];else if(e.charAt(0)==="#"){if(e.length<6&&(s=e.charAt(1),o=e.charAt(2),a=e.charAt(3),e="#"+s+s+o+o+a+a+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return r=parseInt(e.substr(1,6),16),[r>>16,r>>8&bt,r&bt,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),r=[e>>16,e>>8&bt,e&bt]}else if(e.substr(0,3)==="hsl"){if(r=m=e.match(kC),!t)c=+r[0]%360/360,l=+r[1]/100,u=+r[2]/100,o=u<=.5?u*(l+1):u+l-u*l,s=u*2-o,r.length>3&&(r[3]*=1),r[0]=Z0(c+1/3,s,o),r[1]=Z0(c,s,o),r[2]=Z0(c-1/3,s,o);else if(~e.indexOf("="))return r=e.match(hx),i&&r.length<4&&(r[3]=1),r}else r=e.match(kC)||ku.transparent;r=r.map(Number)}return t&&!m&&(s=r[0]/bt,o=r[1]/bt,a=r[2]/bt,d=Math.max(s,o,a),f=Math.min(s,o,a),u=(d+f)/2,d===f?c=l=0:(h=d-f,l=u>.5?h/(2-d-f):h/(d+f),c=d===s?(o-a)/h+(o<a?6:0):d===o?(a-s)/h+2:(s-o)/h+4,c*=60),r[0]=~~(c+.5),r[1]=~~(l*100+.5),r[2]=~~(u*100+.5)),i&&r.length<4&&(r[3]=1),r},mD=function(e){var t=[],i=[],r=-1;return e.split(es).forEach(function(s){var o=s.match(jo)||[];t.push.apply(t,o),i.push(r+=o.length+1)}),t.c=i,t},GC=function(e,t,i){var r="",s=(e+r).match(es),o=t?"hsla(":"rgba(",a=0,c,l,u,d;if(!s)return e;if(s=s.map(function(f){return(f=pD(f,t,1))&&o+(t?f[0]+","+f[1]+"%,"+f[2]+"%,"+f[3]:f.join(","))+")"}),i&&(u=mD(e),c=i.c,c.join(r)!==u.c.join(r)))for(l=e.replace(es,"1").split(jo),d=l.length-1;a<d;a++)r+=l[a]+(~c.indexOf(a)?s.shift()||o+"0,0,0,0)":(u.length?u:s.length?s:i).shift());if(!l)for(l=e.split(es),d=l.length-1;a<d;a++)r+=l[a]+s[a];return r+l[d]},es=(function(){var n="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in ku)n+="|"+e+"\\b";return new RegExp(n+")","gi")})(),vB=/hsl[a]?\(/,Sx=function(e){var t=e.join(" "),i;if(es.lastIndex=0,es.test(t))return i=vB.test(t),e[1]=GC(e[1],i),e[0]=GC(e[0],i,mD(e[1])),!0},ju,$n=(function(){var n=Date.now,e=500,t=33,i=n(),r=i,s=1e3/240,o=s,a=[],c,l,u,d,f,h,m=function v(p){var g=n()-r,x=p===!0,M,E,C,T;if((g>e||g<0)&&(i+=g-t),r+=g,C=r-i,M=C-o,(M>0||x)&&(T=++d.frame,f=C-d.time*1e3,d.time=C=C/1e3,o+=M+(M>=s?4:s-M),E=1),x||(c=l(v)),E)for(h=0;h<a.length;h++)a[h](C,f,T,p)};return d={time:0,frame:0,tick:function(){m(!0)},deltaRatio:function(p){return f/(1e3/(p||60))},wake:function(){XC&&(!nx&&fx()&&(xr=nx=window,mx=xr.document||{},hi.gsap=On,(xr.gsapVersions||(xr.gsapVersions=[])).push(On.version),YC(Im||xr.GreenSockGlobals||!xr.gsap&&xr||{}),fD.forEach(hD)),u=typeof requestAnimationFrame<"u"&&requestAnimationFrame,c&&d.sleep(),l=u||function(p){return setTimeout(p,o-d.time*1e3+1|0)},ju=1,m(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(c),ju=0,l=Gu},lagSmoothing:function(p,g){e=p||1/0,t=Math.min(g||33,e)},fps:function(p){s=1e3/(p||240),o=d.time*1e3+s},add:function(p,g,x){var M=g?function(E,C,T,D){p(E,C,T,D),d.remove(M)}:p;return d.remove(p),a[x?"unshift":"push"](M),Cc(),M},remove:function(p,g){~(g=a.indexOf(p))&&a.splice(g,1)&&h>=g&&h--},_listeners:a},d})(),Cc=function(){return!ju&&$n.wake()},st={},_B=/^[\d.\-M][\d.\-,\s]/,yB=/["']/g,xB=function(e){for(var t={},i=e.substr(1,e.length-3).split(":"),r=i[0],s=1,o=i.length,a,c,l;s<o;s++)c=i[s],a=s!==o-1?c.lastIndexOf(","):c.length,l=c.substr(0,a),t[r]=isNaN(l)?l.replace(yB,"").trim():+l,r=c.substr(a+1).trim();return t},SB=function(e){var t=e.indexOf("(")+1,i=e.indexOf(")"),r=e.indexOf("(",t);return e.substring(t,~r&&r<i?e.indexOf(")",i+1):i)},MB=function(e){var t=(e+"").split("("),i=st[t[0]];return i&&t.length>1&&i.config?i.config.apply(null,~e.indexOf("{")?[xB(t[1])]:SB(e).split(",").map(QC)):st._CE&&_B.test(e)?st._CE("",e):i},EB=function(e){return function(t){return 1-e(1-t)}},zo=function(e,t){return e&&(zt(e)?e:st[e]||MB(e))||t},$o=function(e,t,i,r){i===void 0&&(i=function(c){return 1-t(1-c)}),r===void 0&&(r=function(c){return c<.5?t(c*2)/2:1-t((1-c)*2)/2});var s={easeIn:t,easeOut:i,easeInOut:r},o;return Bn(e,function(a){st[a]=hi[a]=s,st[o=a.toLowerCase()]=i;for(var c in s)st[o+(c==="easeIn"?".in":c==="easeOut"?".out":".inOut")]=st[a+"."+c]=s[c]}),s},gD=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},K0=function n(e,t,i){var r=t>=1?t:1,s=(i||(e?.3:.45))/(t<1?t:1),o=s/tx*(Math.asin(1/r)||0),a=function(u){return u===1?1:r*Math.pow(2,-10*u)*q3((u-o)*s)+1},c=e==="out"?a:e==="in"?function(l){return 1-a(1-l)}:gD(a);return s=tx/s,c.config=function(l,u){return n(e,l,u)},c},J0=function n(e,t){t===void 0&&(t=1.70158);var i=function(o){return o?--o*o*((t+1)*o+t)+1:0},r=e==="out"?i:e==="in"?function(s){return 1-i(1-s)}:gD(i);return r.config=function(s){return n(e,s)},r};Bn("Linear,Quad,Cubic,Quart,Quint,Strong",function(n,e){var t=e<5?e+1:e;$o(n+",Power"+(t-1),e?function(i){return Math.pow(i,t)}:function(i){return i},function(i){return 1-Math.pow(1-i,t)},function(i){return i<.5?Math.pow(i*2,t)/2:1-Math.pow((1-i)*2,t)/2})});st.Linear.easeNone=st.none=st.Linear.easeIn;$o("Elastic",K0("in"),K0("out"),K0());(function(n,e){var t=1/e,i=2*t,r=2.5*t,s=function(a){return a<t?n*a*a:a<i?n*Math.pow(a-1.5/e,2)+.75:a<r?n*(a-=2.25/e)*a+.9375:n*Math.pow(a-2.625/e,2)+.984375};$o("Bounce",function(o){return 1-s(1-o)},s)})(7.5625,2.75);$o("Expo",function(n){return Math.pow(2,10*(n-1))*n+n*n*n*n*n*n*(1-n)});$o("Circ",function(n){return-($C(1-n*n)-1)});$o("Sine",function(n){return n===1?1:-$3(n*j3)+1});$o("Back",J0("in"),J0("out"),J0());st.SteppedEase=st.steps=hi.SteppedEase={config:function(e,t){e===void 0&&(e=1);var i=1/e,r=e+(t?0:1),s=t?1:0,o=1-wt;return function(a){return((r*$u(0,o,a)|0)+s)*i}}};Hu.ease=st["quad.out"];Bn("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(n){return vx+=n+","+n+"Params,"});var Mx=function(e,t){this.id=W3++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:yx,this.set=t?t.getSetter:Vm},Wu=(function(){function n(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,Tc(this,+t.duration,1,1),this.data=t.data,It&&(this._ctx=It,It.data.push(this)),ju||$n.wake()}var e=n.prototype;return e.delay=function(i){return i||i===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+i-this._delay),this._delay=i,this):this._delay},e.duration=function(i){return arguments.length?this.totalDuration(this._repeat>0?i+(i+this._rDelay)*this._repeat:i):this.totalDuration()&&this._dur},e.totalDuration=function(i){return arguments.length?(this._dirty=0,Tc(this,this._repeat<0?i:(i-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(i,r){if(Cc(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(Bm(this,i),!s._dp||s.parent||nD(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&i<this._tDur||this._ts<0&&i>0||!this._tDur&&!i)&&Sr(this._dp,this,this._start-this._delay)}return(this._tTime!==i||!this._dur&&!r||this._initted&&Math.abs(this._zTime)===wt||!this._initted&&this._dur&&i||!i&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=i),JC(this,i,r)),this},e.time=function(i,r){return arguments.length?this.totalTime(Math.min(this.totalDuration(),i+VC(this))%(this._dur+this._rDelay)||(i?this._dur:0),r):this._time},e.totalProgress=function(i,r){return arguments.length?this.totalTime(this.totalDuration()*i,r):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},e.progress=function(i,r){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-i:i)+VC(this),r):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},e.iteration=function(i,r){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(i-1)*s,r):this._repeat?wc(this._tTime,s)+1:1},e.timeScale=function(i,r){if(!arguments.length)return this._rts===-wt?0:this._rts;if(this._rts===i)return this;var s=this.parent&&this._ts?Pm(this.parent._time,this):this._tTime;return this._rts=+i||0,this._ts=this._ps||i===-wt?0:this._rts,this.totalTime($u(-Math.abs(this._delay),this.totalDuration(),s),r!==!1),Um(this),iB(this)},e.paused=function(i){return arguments.length?(this._ps!==i&&(this._ps=i,i?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(Cc(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==wt&&(this._tTime-=wt)))),this):this._ps},e.startTime=function(i){if(arguments.length){this._start=Ot(i);var r=this.parent||this._dp;return r&&(r._sort||!this.parent)&&Sr(r,this,this._start-this._delay),this}return this._start},e.endTime=function(i){return this._start+(qn(i)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(i){var r=this.parent||this._dp;return r?i&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Pm(r.rawTime(i),this):this._tTime:this._tTime},e.revert=function(i){i===void 0&&(i=Q3);var r=Sn;return Sn=i,xx(this)&&(this.timeline&&this.timeline.revert(i),this.totalTime(-.01,i.suppressEvents)),this.data!=="nested"&&i.kill!==!1&&this.kill(),Sn=r,this},e.globalTime=function(i){for(var r=this,s=arguments.length?i:r.rawTime();r;)s=r._start+s/(Math.abs(r._ts)||1),r=r._dp;return!this.parent&&this._sat?this._sat.globalTime(i):s},e.repeat=function(i){return arguments.length?(this._repeat=i===1/0?-2:i,HC(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(i){if(arguments.length){var r=this._time;return this._rDelay=i,HC(this),r?this.time(r):this}return this._rDelay},e.yoyo=function(i){return arguments.length?(this._yoyo=i,this):this._yoyo},e.seek=function(i,r){return this.totalTime(Ci(this,i),qn(r))},e.restart=function(i,r){return this.play().totalTime(i?-this._delay:0,qn(r)),this._dur||(this._zTime=-wt),this},e.play=function(i,r){return i!=null&&this.seek(i,r),this.reversed(!1).paused(!1)},e.reverse=function(i,r){return i!=null&&this.seek(i||this.totalDuration(),r),this.reversed(!0).paused(!1)},e.pause=function(i,r){return i!=null&&this.seek(i,r),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(i){return arguments.length?(!!i!==this.reversed()&&this.timeScale(-this._rts||(i?-wt:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-wt,this},e.isActive=function(){var i=this.parent||this._dp,r=this._start,s;return!!(!i||this._ts&&this._initted&&i.isActive()&&(s=i.rawTime(!0))>=r&&s<this.endTime(!0)-wt)},e.eventCallback=function(i,r,s){var o=this.vars;return arguments.length>1?(r?(o[i]=r,s&&(o[i+"Params"]=s),i==="onUpdate"&&(this._onUpdate=r)):delete o[i],this):o[i]},e.then=function(i){var r=this,s=r._prom;return new Promise(function(o){var a=zt(i)?i:eD,c=function(){var u=r.then;r.then=null,s&&s(),zt(a)&&(a=a(r))&&(a.then||a===r)&&(r.then=u),o(a),r.then=u};r._initted&&r.totalProgress()===1&&r._ts>=0||!r._tTime&&r._ts<0?c():r._prom=c})},e.kill=function(){Fu(this)},n})();pi(Wu.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-wt,_prom:0,_ps:!1,_rts:1});var Nn=(function(n){WC(e,n);function e(i,r){var s;return i===void 0&&(i={}),s=n.call(this,i)||this,s.labels={},s.smoothChildTiming=!!i.smoothChildTiming,s.autoRemoveChildren=!!i.autoRemoveChildren,s._sort=qn(i.sortChildren),Lt&&Sr(i.parent||Lt,Qr(s),r),i.reversed&&s.reverse(),i.paused&&s.paused(!0),i.scrollTrigger&&iD(Qr(s),i.scrollTrigger),s}var t=e.prototype;return t.to=function(r,s,o){return Bu(0,arguments,this),this},t.from=function(r,s,o){return Bu(1,arguments,this),this},t.fromTo=function(r,s,o,a){return Bu(2,arguments,this),this},t.set=function(r,s,o){return s.duration=0,s.parent=this,Uu(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new Xt(r,s,Ci(this,o),1),this},t.call=function(r,s,o){return Sr(this,Xt.delayedCall(0,r,s),o)},t.staggerTo=function(r,s,o,a,c,l,u){return o.duration=s,o.stagger=o.stagger||a,o.onComplete=l,o.onCompleteParams=u,o.parent=this,new Xt(r,o,Ci(this,c)),this},t.staggerFrom=function(r,s,o,a,c,l,u){return o.runBackwards=1,Uu(o).immediateRender=qn(o.immediateRender),this.staggerTo(r,s,o,a,c,l,u)},t.staggerFromTo=function(r,s,o,a,c,l,u,d){return a.startAt=o,Uu(a).immediateRender=qn(a.immediateRender),this.staggerTo(r,s,a,c,l,u,d)},t.render=function(r,s,o){var a=this._time,c=this._dirty?this.totalDuration():this._tDur,l=this._dur,u=r<=0?0:Ot(r),d=this._zTime<0!=r<0&&(this._initted||!l),f,h,m,v,p,g,x,M,E,C,T,D;if(this!==Lt&&u>c&&r>=0&&(u=c),u!==this._tTime||o||d){if(a!==this._time&&l&&(u+=this._time-a,r+=this._time-a),f=u,E=this._start,M=this._ts,g=!M,d&&(l||(a=this._zTime),(r||!s)&&(this._zTime=r)),this._repeat){if(T=this._yoyo,p=l+this._rDelay,this._repeat<-1&&r<0)return this.totalTime(p*100+r,s,o);if(f=Ot(u%p),u===c?(v=this._repeat,f=l):(C=Ot(u/p),v=~~C,v&&v===C&&(f=l,v--),f>l&&(f=l)),C=wc(this._tTime,p),!a&&this._tTime&&C!==v&&this._tTime-C*p-this._dur<=0&&(C=v),T&&v&1&&(f=l-f,D=1),v!==C&&!this._lock){var _=T&&C&1,b=_===(T&&v&1);if(v<C&&(_=!_),a=_?0:u%l?l:u,this._lock=1,this.render(a||(D?0:Ot(v*p)),s,!l)._lock=0,this._tTime=u,!s&&this.parent&&fi(this,"onRepeat"),this.vars.repeatRefresh&&!D&&(this.invalidate()._lock=1,C=v),a&&a!==this._time||g!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(l=this._dur,c=this._tDur,b&&(this._lock=2,a=_?l:-1e-4,this.render(a,!0),this.vars.repeatRefresh&&!D&&this.invalidate()),this._lock=0,!this._ts&&!g)return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(x=aB(this,Ot(a),Ot(f)),x&&(u-=f-(f=x._start))),this._tTime=u,this._time=f,this._act=!!M,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=r,a=0),!a&&u&&l&&!s&&!C&&(fi(this,"onStart"),this._tTime!==u))return this;if(f>=a&&r>=0)for(h=this._first;h;){if(m=h._next,(h._act||f>=h._start)&&h._ts&&x!==h){if(h.parent!==this)return this.render(r,s,o);if(h.render(h._ts>0?(f-h._start)*h._ts:(h._dirty?h.totalDuration():h._tDur)+(f-h._start)*h._ts,s,o),f!==this._time||!this._ts&&!g){x=0,m&&(u+=this._zTime=-wt);break}}h=m}else{h=this._last;for(var I=r<0?r:f;h;){if(m=h._prev,(h._act||I<=h._end)&&h._ts&&x!==h){if(h.parent!==this)return this.render(r,s,o);if(h.render(h._ts>0?(I-h._start)*h._ts:(h._dirty?h.totalDuration():h._tDur)+(I-h._start)*h._ts,s,o||Sn&&xx(h)),f!==this._time||!this._ts&&!g){x=0,m&&(u+=this._zTime=I?-wt:wt);break}}h=m}}if(x&&!s&&(this.pause(),x.render(f>=a?0:-wt)._zTime=f>=a?1:-1,this._ts))return this._start=E,Um(this),this.render(r,s,o);this._onUpdate&&!s&&fi(this,"onUpdate",!0),(u===c&&this._tTime>=this.totalDuration()||!u&&a)&&(E===this._start||Math.abs(M)!==Math.abs(this._ts))&&(this._lock||((r||!l)&&(u===c&&this._ts>0||!u&&this._ts<0)&&Ws(this,1),!s&&!(r<0&&!a)&&(u||a||!c)&&(fi(this,u===c&&r>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(u<c&&this.timeScale()>0)&&this._prom())))}return this},t.add=function(r,s){var o=this;if(ts(s)||(s=Ci(this,s,r)),!(r instanceof Wu)){if(Pn(r))return r.forEach(function(a){return o.add(a,s)}),this;if(cn(r))return this.addLabel(r,s);if(zt(r))r=Xt.delayedCall(0,r);else return this}return this!==r?Sr(this,r,s):this},t.getChildren=function(r,s,o,a){r===void 0&&(r=!0),s===void 0&&(s=!0),o===void 0&&(o=!0),a===void 0&&(a=-Di);for(var c=[],l=this._first;l;)l._start>=a&&(l instanceof Xt?s&&c.push(l):(o&&c.push(l),r&&c.push.apply(c,l.getChildren(!0,s,o)))),l=l._next;return c},t.getById=function(r){for(var s=this.getChildren(1,1,1),o=s.length;o--;)if(s[o].vars.id===r)return s[o]},t.remove=function(r){return cn(r)?this.removeLabel(r):zt(r)?this.killTweensOf(r):(r.parent===this&&km(this,r),r===this._recent&&(this._recent=this._last),Ho(this))},t.totalTime=function(r,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=Ot($n.time-(this._ts>0?r/this._ts:(this.totalDuration()-r)/-this._ts))),n.prototype.totalTime.call(this,r,s),this._forcing=0,this):this._tTime},t.addLabel=function(r,s){return this.labels[r]=Ci(this,s),this},t.removeLabel=function(r){return delete this.labels[r],this},t.addPause=function(r,s,o){var a=Xt.delayedCall(0,s||Gu,o);return a.data="isPause",this._hasPause=1,Sr(this,a,Ci(this,r))},t.removePause=function(r){var s=this._first;for(r=Ci(this,r);s;)s._start===r&&s.data==="isPause"&&Ws(s),s=s._next},t.killTweensOf=function(r,s,o){for(var a=this.getTweensOf(r,o),c=a.length;c--;)zs!==a[c]&&a[c].kill(r,s);return this},t.getTweensOf=function(r,s){for(var o=[],a=Ai(r),c=this._first,l=ts(s),u;c;)c instanceof Xt?eB(c._targets,a)&&(l?(!zs||c._initted&&c._ts)&&c.globalTime(0)<=s&&c.globalTime(c.totalDuration())>s:!s||c.isActive())&&o.push(c):(u=c.getTweensOf(a,s)).length&&o.push.apply(o,u),c=c._next;return o},t.tweenTo=function(r,s){s=s||{};var o=this,a=Ci(o,r),c=s,l=c.startAt,u=c.onStart,d=c.onStartParams,f=c.immediateRender,h,m=Xt.to(o,pi({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:a,overwrite:"auto",duration:s.duration||Math.abs((a-(l&&"time"in l?l.time:o._time))/o.timeScale())||wt,onStart:function(){if(o.pause(),!h){var p=s.duration||Math.abs((a-(l&&"time"in l?l.time:o._time))/o.timeScale());m._dur!==p&&Tc(m,p,0,1).render(m._time,!0,!0),h=1}u&&u.apply(m,d||[])}},s));return f?m.render(0):m},t.tweenFromTo=function(r,s,o){return this.tweenTo(s,pi({startAt:{time:Ci(this,r)}},o))},t.recent=function(){return this._recent},t.nextLabel=function(r){return r===void 0&&(r=this._time),zC(this,Ci(this,r))},t.previousLabel=function(r){return r===void 0&&(r=this._time),zC(this,Ci(this,r),1)},t.currentLabel=function(r){return arguments.length?this.seek(r,!0):this.previousLabel(this._time+wt)},t.shiftChildren=function(r,s,o){o===void 0&&(o=0);var a=this._first,c=this.labels,l;for(r=Ot(r);a;)a._start>=o&&(a._start+=r,a._end+=r),a=a._next;if(s)for(l in c)c[l]>=o&&(c[l]+=r);return Ho(this)},t.invalidate=function(r){var s=this._first;for(this._lock=0;s;)s.invalidate(r),s=s._next;return n.prototype.invalidate.call(this,r)},t.clear=function(r){r===void 0&&(r=!0);for(var s=this._first,o;s;)o=s._next,this.remove(s),s=o;return this._dp&&(this._time=this._tTime=this._pTime=0),r&&(this.labels={}),Ho(this)},t.totalDuration=function(r){var s=0,o=this,a=o._last,c=Di,l,u,d;if(arguments.length)return o.timeScale((o._repeat<0?o.duration():o.totalDuration())/(o.reversed()?-r:r));if(o._dirty){for(d=o.parent;a;)l=a._prev,a._dirty&&a.totalDuration(),u=a._start,u>c&&o._sort&&a._ts&&!o._lock?(o._lock=1,Sr(o,a,u-a._delay,1)._lock=0):c=u,u<0&&a._ts&&(s-=u,(!d&&!o._dp||d&&d.smoothChildTiming)&&(o._start+=Ot(u/o._ts),o._time-=u,o._tTime-=u),o.shiftChildren(-u,!1,-1/0),c=0),a._end>s&&a._ts&&(s=a._end),a=l;Tc(o,o===Lt&&o._time>s?o._time:s,1,1),o._dirty=0}return o._tDur},e.updateRoot=function(r){if(Lt._ts&&(JC(Lt,Pm(r,Lt)),KC=$n.frame),$n.frame>=UC){UC+=Xn.autoSleep||120;var s=Lt._first;if((!s||!s._ts)&&Xn.autoSleep&&$n._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||$n.sleep()}}},e})(Wu);pi(Nn.prototype,{_lock:0,_hasPause:0,_forcing:0});var bB=function(e,t,i,r,s,o,a){var c=new Vn(this._pt,e,t,0,1,Cx,null,s),l=0,u=0,d,f,h,m,v,p,g,x;for(c.b=i,c.e=r,i+="",r+="",(g=~r.indexOf("random("))&&(r=Dc(r)),o&&(x=[i,r],o(x,e,t),i=x[0],r=x[1]),f=i.match(X0)||[];d=X0.exec(r);)m=d[0],v=r.substring(l,d.index),h?h=(h+1)%5:v.substr(-5)==="rgba("&&(h=1),m!==f[u++]&&(p=parseFloat(f[u-1])||0,c._pt={_next:c._pt,p:v||u===1?v:",",s:p,c:m.charAt(1)==="="?Wo(p,m)-p:parseFloat(m)-p,m:h&&h<4?Math.round:0},l=X0.lastIndex);return c.c=l<r.length?r.substring(l,r.length):"",c.fp=a,(px.test(r)||g)&&(c.e=0),this._pt=c,c},Ex=function(e,t,i,r,s,o,a,c,l,u){zt(r)&&(r=r(s||0,e,o));var d=e[t],f=i!=="get"?i:zt(d)?l?e[t.indexOf("set")||!zt(e["get"+t.substr(3)])?t:"get"+t.substr(3)](l):e[t]():d,h=zt(d)?l?AB:yD:Tx,m;if(cn(r)&&(~r.indexOf("random(")&&(r=Dc(r)),r.charAt(1)==="="&&(m=Wo(f,r)+(Mn(f)||0),(m||m===0)&&(r=m))),!u||f!==r||lx)return!isNaN(f*r)&&r!==""?(m=new Vn(this._pt,e,t,+f||0,r-(f||0),typeof d=="boolean"?RB:xD,0,h),l&&(m.fp=l),a&&m.modifier(a,this,e),this._pt=m):(!d&&!(t in e)&&Fm(t,r),bB.call(this,e,t,f,r,h,c||Xn.stringFilter,l))},wB=function(e,t,i,r,s){if(zt(e)&&(e=Vu(e,s,t,i,r)),!Mr(e)||e.style&&e.nodeType||Pn(e)||qC(e))return cn(e)?Vu(e,s,t,i,r):e;var o={},a;for(a in e)o[a]=Vu(e[a],s,t,i,r);return o},bx=function(e,t,i,r,s,o){var a,c,l,u;if(Wn[e]&&(a=new Wn[e]).init(s,a.rawVars?t[e]:wB(t[e],r,s,o,i),i,r,o)!==!1&&(i._pt=c=new Vn(i._pt,s,e,0,1,a.render,a,0,a.priority),i!==Ec))for(l=i._ptLookup[i._targets.indexOf(s)],u=a._props.length;u--;)l[a._props[u]]=c;return a},zs,lx,wx=function n(e,t,i){var r=e.vars,s=r.ease,o=r.startAt,a=r.immediateRender,c=r.lazy,l=r.onUpdate,u=r.runBackwards,d=r.yoyoEase,f=r.keyframes,h=r.autoRevert,m=e._dur,v=e._startAt,p=e._targets,g=e.parent,x=g&&g.data==="nested"?g.vars.targets:p,M=e._overwrite==="auto"&&!dx,E=e.timeline,C=r.easeReverse||d,T,D,_,b,I,A,L,z,j,N,B,F,Z;if(E&&(!f||!s)&&(s="none"),e._ease=zo(s,Hu.ease),e._rEase=C&&(zo(C)||e._ease),e._from=!E&&!!r.runBackwards,e._from&&(e.ratio=1),!E||f&&!r.stagger){if(z=p[0]?js(p[0]).harness:0,F=z&&r[z.prop],T=Nm(r,gx),v&&(v._zTime<0&&v.progress(1),t<0&&u&&a&&!h?v.render(-1,!0):v.revert(u&&m?Cm:J3),v._lazy=0),o){if(Ws(e._startAt=Xt.set(p,pi({data:"isStart",overwrite:!1,parent:g,immediateRender:!0,lazy:!v&&qn(c),startAt:null,delay:0,onUpdate:l&&function(){return fi(e,"onUpdate")},stagger:0},o))),e._startAt._dp=0,e._startAt._sat=e,t<0&&(Sn||!a&&!h)&&e._startAt.revert(Cm),a&&m&&t<=0&&i<=0){t&&(e._zTime=t);return}}else if(u&&m&&!v){if(t&&(a=!1),_=pi({overwrite:!1,data:"isFromStart",lazy:a&&!v&&qn(c),immediateRender:a,stagger:0,parent:g},T),F&&(_[z.prop]=F),Ws(e._startAt=Xt.set(p,_)),e._startAt._dp=0,e._startAt._sat=e,t<0&&(Sn?e._startAt.revert(Cm):e._startAt.render(-1,!0)),e._zTime=t,!a)n(e._startAt,wt,wt);else if(!t)return}for(e._pt=e._ptCache=0,c=m&&qn(c)||c&&!m,D=0;D<p.length;D++){if(I=p[D],L=I._gsap||_x(p)[D]._gsap,e._ptLookup[D]=N={},ix[L.id]&&Gs.length&&Rm(),B=x===p?D:x.indexOf(I),z&&(j=new z).init(I,F||T,e,B,x)!==!1&&(e._pt=b=new Vn(e._pt,I,j.name,0,1,j.render,j,0,j.priority),j._props.forEach(function(Q){N[Q]=b}),j.priority&&(A=1)),!z||F)for(_ in T)Wn[_]&&(j=bx(_,T,e,B,I,x))?j.priority&&(A=1):N[_]=b=Ex.call(e,I,_,"get",T[_],B,x,0,r.stringFilter);e._op&&e._op[D]&&e.kill(I,e._op[D]),M&&e._pt&&(zs=e,Lt.killTweensOf(I,N,e.globalTime(t)),Z=!e.parent,zs=0),e._pt&&c&&(ix[L.id]=1)}A&&Ax(e),e._onInit&&e._onInit(e)}e._onUpdate=l,e._initted=(!e._op||e._pt)&&!Z,f&&t<=0&&E.render(Di,!0,!0)},TB=function(e,t,i,r,s,o,a,c){var l=(e._pt&&e._ptCache||(e._ptCache={}))[t],u,d,f,h;if(!l)for(l=e._ptCache[t]=[],f=e._ptLookup,h=e._targets.length;h--;){if(u=f[h][t],u&&u.d&&u.d._pt)for(u=u.d._pt;u&&u.p!==t&&u.fp!==t;)u=u._next;if(!u)return lx=1,e.vars[t]="+=0",wx(e,a),lx=0,c?zu(t+" not eligible for reset. Try splitting into individual properties"):1;l.push(u)}for(h=l.length;h--;)d=l[h],u=d._pt||d,u.s=(r||r===0)&&!s?r:u.s+(r||0)+o*u.c,u.c=i-u.s,d.e&&(d.e=Gt(i)+Mn(d.e)),d.b&&(d.b=u.s+Mn(d.b))},CB=function(e,t){var i=e[0]?js(e[0]).harness:0,r=i&&i.aliases,s,o,a,c;if(!r)return t;s=bc({},t);for(o in r)if(o in s)for(c=r[o].split(","),a=c.length;a--;)s[c[a]]=s[o];return s},DB=function(e,t,i,r){var s=t.ease||r||"power1.inOut",o,a;if(Pn(t))a=i[e]||(i[e]=[]),t.forEach(function(c,l){return a.push({t:l/(t.length-1)*100,v:c,e:s})});else for(o in t)a=i[o]||(i[o]=[]),o==="ease"||a.push({t:parseFloat(e),v:t[o],e:s})},Vu=function(e,t,i,r,s){return zt(e)?e.call(t,i,r,s):cn(e)&&~e.indexOf("random(")?Dc(e):e},vD=vx+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert",_D={};Bn(vD+",id,stagger,delay,duration,paused,scrollTrigger",function(n){return _D[n]=1});var Xt=(function(n){WC(e,n);function e(i,r,s,o){var a;typeof r=="number"&&(s.duration=r,r=s,s=null),a=n.call(this,o?r:Uu(r))||this;var c=a.vars,l=c.duration,u=c.delay,d=c.immediateRender,f=c.stagger,h=c.overwrite,m=c.keyframes,v=c.defaults,p=c.scrollTrigger,g=r.parent||Lt,x=(Pn(i)||qC(i)?ts(i[0]):"length"in r)?[i]:Ai(i),M,E,C,T,D,_,b,I;if(a._targets=x.length?_x(x):zu("GSAP target "+i+" not found. https://gsap.com",!Xn.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=h,m||f||Tm(l)||Tm(u)){r=a.vars;var A=r.easeReverse||r.yoyoEase;if(M=a.timeline=new Nn({data:"nested",defaults:v||{},targets:g&&g.data==="nested"?g.vars.targets:x}),M.kill(),M.parent=M._dp=Qr(a),M._start=0,f||Tm(l)||Tm(u)){if(T=x.length,b=f&&aD(f),Mr(f))for(D in f)~vD.indexOf(D)&&(I||(I={}),I[D]=f[D]);for(E=0;E<T;E++)C=Nm(r,_D),C.stagger=0,A&&(C.easeReverse=A),I&&bc(C,I),_=x[E],C.duration=+Vu(l,Qr(a),E,_,x),C.delay=(+Vu(u,Qr(a),E,_,x)||0)-a._delay,!f&&T===1&&C.delay&&(a._delay=u=C.delay,a._start+=u,C.delay=0),M.to(_,C,b?b(E,_,x):0),M._ease=st.none;M.duration()?l=u=0:a.timeline=0}else if(m){Uu(pi(M.vars.defaults,{ease:"none"})),M._ease=zo(m.ease||r.ease||"none");var L=0,z,j,N;if(Pn(m))m.forEach(function(B){return M.to(x,B,">")}),M.duration();else{C={};for(D in m)D==="ease"||D==="easeEach"||DB(D,m[D],C,m.easeEach);for(D in C)for(z=C[D].sort(function(B,F){return B.t-F.t}),L=0,E=0;E<z.length;E++)j=z[E],N={ease:j.e,duration:(j.t-(E?z[E-1].t:0))/100*l},N[D]=j.v,M.to(x,N,L),L+=N.duration;M.duration()<l&&M.to({},{duration:l-M.duration()})}}l||a.duration(l=M.duration())}else a.timeline=0;return h===!0&&!dx&&(zs=Qr(a),Lt.killTweensOf(x),zs=0),Sr(g,Qr(a),s),r.reversed&&a.reverse(),r.paused&&a.paused(!0),(d||!l&&!m&&a._start===Ot(g._time)&&qn(d)&&rB(Qr(a))&&g.data!=="nested")&&(a._tTime=-wt,a.render(Math.max(0,-u)||0)),p&&iD(Qr(a),p),a}var t=e.prototype;return t.render=function(r,s,o){var a=this._time,c=this._tDur,l=this._dur,u=r<0,d=r>c-wt&&!u?c:r<wt?0:r,f,h,m,v,p,g,x,M;if(!l)oB(this,r,s,o);else if(d!==this._tTime||!r||o||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==u||this._lazy){if(f=d,M=this.timeline,this._repeat){if(v=l+this._rDelay,this._repeat<-1&&u)return this.totalTime(v*100+r,s,o);if(f=Ot(d%v),d===c?(m=this._repeat,f=l):(p=Ot(d/v),m=~~p,m&&m===p?(f=l,m--):f>l&&(f=l)),g=this._yoyo&&m&1,g&&(f=l-f),p=wc(this._tTime,v),f===a&&!o&&this._initted&&m===p)return this._tTime=d,this;m!==p&&this.vars.repeatRefresh&&!g&&!this._lock&&f!==v&&this._initted&&(this._lock=o=1,this.render(Ot(v*m),!0).invalidate()._lock=0)}if(!this._initted){if(rD(this,u?r:f,o,s,d))return this._tTime=0,this;if(a!==this._time&&!(o&&this.vars.repeatRefresh&&m!==p))return this;if(l!==this._dur)return this.render(r,s,o)}if(this._rEase){var E=f<a;if(E!==this._inv){var C=E?a:l-a;this._inv=E,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=a,this._invRecip=C?(E?-1:1)/C:0,this._invScale=E?-this.ratio:1-this.ratio,this._invEase=E?this._rEase:this._ease}this.ratio=x=this._invRatio+this._invScale*this._invEase((f-this._invTime)*this._invRecip)}else this.ratio=x=this._ease(f/l);if(this._from&&(this.ratio=x=1-x),this._tTime=d,this._time=f,!this._act&&this._ts&&(this._act=1,this._lazy=0),!a&&d&&!s&&!p&&(fi(this,"onStart"),this._tTime!==d))return this;for(h=this._pt;h;)h.r(x,h.d),h=h._next;M&&M.render(r<0?r:M._dur*M._ease(f/this._dur),s,o)||this._startAt&&(this._zTime=r),this._onUpdate&&!s&&(u&&rx(this,r,s,o),fi(this,"onUpdate")),this._repeat&&m!==p&&this.vars.onRepeat&&!s&&this.parent&&fi(this,"onRepeat"),(d===this._tDur||!d)&&this._tTime===d&&(u&&!this._onUpdate&&rx(this,r,!0,!0),(r||!l)&&(d===this._tDur&&this._ts>0||!d&&this._ts<0)&&Ws(this,1),!s&&!(u&&!a)&&(d||a||g)&&(fi(this,d===c?"onComplete":"onReverseComplete",!0),this._prom&&!(d<c&&this.timeScale()>0)&&this._prom()))}return this},t.targets=function(){return this._targets},t.invalidate=function(r){return(!r||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(r),n.prototype.invalidate.call(this,r)},t.resetTo=function(r,s,o,a,c){ju||$n.wake(),this._ts||this.play();var l=Math.min(this._dur,(this._dp._time-this._start)*this._ts),u;return this._initted||wx(this,l),u=this._ease(l/this._dur),TB(this,r,s,o,a,u,l,c)?this.resetTo(r,s,o,a,1):(Bm(this,0),this.parent||tD(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},t.kill=function(r,s){if(s===void 0&&(s="all"),!r&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?Fu(this):this.scrollTrigger&&this.scrollTrigger.kill(!!Sn),this;if(this.timeline){var o=this.timeline.totalDuration();return this.timeline.killTweensOf(r,s,zs&&zs.vars.overwrite!==!0)._first||Fu(this),this.parent&&o!==this.timeline.totalDuration()&&Tc(this,this._dur*this.timeline._tDur/o,0,1),this}var a=this._targets,c=r?Ai(r):a,l=this._ptLookup,u=this._pt,d,f,h,m,v,p,g;if((!s||s==="all")&&nB(a,c))return s==="all"&&(this._pt=0),Fu(this);for(d=this._op=this._op||[],s!=="all"&&(cn(s)&&(v={},Bn(s,function(x){return v[x]=1}),s=v),s=CB(a,s)),g=a.length;g--;)if(~c.indexOf(a[g])){f=l[g],s==="all"?(d[g]=s,m=f,h={}):(h=d[g]=d[g]||{},m=s);for(v in m)p=f&&f[v],p&&((!("kill"in p.d)||p.d.kill(v)===!0)&&km(this,p,"_pt"),delete f[v]),h!=="all"&&(h[v]=1)}return this._initted&&!this._pt&&u&&Fu(this),this},e.to=function(r,s){return new e(r,s,arguments[2])},e.from=function(r,s){return Bu(1,arguments)},e.delayedCall=function(r,s,o,a){return new e(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:r,onComplete:s,onReverseComplete:s,onCompleteParams:o,onReverseCompleteParams:o,callbackScope:a})},e.fromTo=function(r,s,o){return Bu(2,arguments)},e.set=function(r,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new e(r,s)},e.killTweensOf=function(r,s,o){return Lt.killTweensOf(r,s,o)},e})(Wu);pi(Xt.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});Bn("staggerTo,staggerFrom,staggerFromTo",function(n){Xt[n]=function(){var e=new Nn,t=ox.call(arguments,0);return t.splice(n==="staggerFromTo"?5:4,0,0),e[n].apply(e,t)}});var Tx=function(e,t,i){return e[t]=i},yD=function(e,t,i){return e[t](i)},AB=function(e,t,i,r){return e[t](r.fp,i)},IB=function(e,t,i){return e.setAttribute(t,i)},Vm=function(e,t){return zt(e[t])?yD:Lm(e[t])&&e.setAttribute?IB:Tx},xD=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},RB=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},Cx=function(e,t){var i=t._pt,r="";if(!e&&t.b)r=t.b;else if(e===1&&t.e)r=t.e;else{for(;i;)r=i.p+(i.m?i.m(i.s+i.c*e):Math.round((i.s+i.c*e)*1e4)/1e4)+r,i=i._next;r+=t.c}t.set(t.t,t.p,r,t)},Dx=function(e,t){for(var i=t._pt;i;)i.r(e,i.d),i=i._next},NB=function(e,t,i,r){for(var s=this._pt,o;s;)o=s._next,s.p===r&&s.modifier(e,t,i),s=o},PB=function(e){for(var t=this._pt,i,r;t;)r=t._next,t.p===e&&!t.op||t.op===e?km(this,t,"_pt"):t.dep||(i=1),t=r;return!i},OB=function(e,t,i,r){r.mSet(e,t,r.m.call(r.tween,i,r.mt),r)},Ax=function(e){for(var t=e._pt,i,r,s,o;t;){for(i=t._next,r=s;r&&r.pr>t.pr;)r=r._next;(t._prev=r?r._prev:o)?t._prev._next=t:s=t,(t._next=r)?r._prev=t:o=t,t=i}e._pt=s},Vn=(function(){function n(t,i,r,s,o,a,c,l,u){this.t=i,this.s=s,this.c=o,this.p=r,this.r=a||xD,this.d=c||this,this.set=l||Tx,this.pr=u||0,this._next=t,t&&(t._prev=this)}var e=n.prototype;return e.modifier=function(i,r,s){this.mSet=this.mSet||this.set,this.set=OB,this.m=i,this.mt=s,this.tween=r},n})();Bn(vx+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse",function(n){return gx[n]=1});hi.TweenMax=hi.TweenLite=Xt;hi.TimelineLite=hi.TimelineMax=Nn;Lt=new Nn({sortChildren:!1,defaults:Hu,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});Xn.stringFilter=Sx;var Go=[],Am={},LB=[],jC=0,FB=0,Q0=function(e){return(Am[e]||LB).map(function(t){return t()})},ux=function(){var e=Date.now(),t=[];e-jC>2&&(Q0("matchMediaInit"),Go.forEach(function(i){var r=i.queries,s=i.conditions,o,a,c,l;for(a in r)o=xr.matchMedia(r[a]).matches,o&&(c=1),o!==s[a]&&(s[a]=o,l=1);l&&(i.revert(),c&&t.push(i))}),Q0("matchMediaRevert"),t.forEach(function(i){return i.onMatch(i,function(r){return i.add(null,r)})}),jC=e,Q0("matchMedia"))},SD=(function(){function n(t,i){this.selector=i&&ax(i),this.data=[],this._r=[],this.isReverted=!1,this.id=FB++,t&&this.add(t)}var e=n.prototype;return e.add=function(i,r,s){zt(i)&&(s=r,r=i,i=zt);var o=this,a=function(){var l=It,u=o.selector,d;return l&&l!==o&&l.data.push(o),s&&(o.selector=ax(s)),It=o,d=r.apply(o,arguments),zt(d)&&o._r.push(d),It=l,o.selector=u,o.isReverted=!1,d};return o.last=a,i===zt?a(o,function(c){return o.add(null,c)}):i?o[i]=a:a},e.ignore=function(i){var r=It;It=null,i(this),It=r},e.getTweens=function(){var i=[];return this.data.forEach(function(r){return r instanceof n?i.push.apply(i,r.getTweens()):r instanceof Xt&&!(r.parent&&r.parent.data==="nested")&&i.push(r)}),i},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(i,r){var s=this;if(i?(function(){for(var a=s.getTweens(),c=s.data.length,l;c--;)l=s.data[c],l.data==="isFlip"&&(l.revert(),l.getChildren(!0,!0,!1).forEach(function(u){return a.splice(a.indexOf(u),1)}));for(a.map(function(u){return{g:u._dur||u._delay||u._sat&&!u._sat.vars.immediateRender?u.globalTime(0):-1/0,t:u}}).sort(function(u,d){return d.g-u.g||-1/0}).forEach(function(u){return u.t.revert(i)}),c=s.data.length;c--;)l=s.data[c],l instanceof Nn?l.data!=="nested"&&(l.scrollTrigger&&l.scrollTrigger.revert(),l.kill()):!(l instanceof Xt)&&l.revert&&l.revert(i);s._r.forEach(function(u){return u(i,s)}),s.isReverted=!0})():this.data.forEach(function(a){return a.kill&&a.kill()}),this.clear(),r)for(var o=Go.length;o--;)Go[o].id===this.id&&Go.splice(o,1)},e.revert=function(i){this.kill(i||{})},n})(),kB=(function(){function n(t){this.contexts=[],this.scope=t,It&&It.data.push(this)}var e=n.prototype;return e.add=function(i,r,s){Mr(i)||(i={matches:i});var o=new SD(0,s||this.scope),a=o.conditions={},c,l,u;It&&!o.selector&&(o.selector=It.selector),this.contexts.push(o),r=o.add("onMatch",r),o.queries=i;for(l in i)l==="all"?u=1:(c=xr.matchMedia(i[l]),c&&(Go.indexOf(o)<0&&Go.push(o),(a[l]=c.matches)&&(u=1),c.addListener?c.addListener(ux):c.addEventListener("change",ux)));return u&&r(o,function(d){return o.add(null,d)}),this},e.revert=function(i){this.kill(i||{})},e.kill=function(i){this.contexts.forEach(function(r){return r.kill(i,!0)})},n})(),Om={registerPlugin:function(){for(var e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i];t.forEach(function(r){return hD(r)})},timeline:function(e){return new Nn(e)},getTweensOf:function(e,t){return Lt.getTweensOf(e,t)},getProperty:function(e,t,i,r){cn(e)&&(e=Ai(e)[0]);var s=js(e||{}).get,o=i?eD:QC;return i==="native"&&(i=""),e&&(t?o((Wn[t]&&Wn[t].get||s)(e,t,i,r)):function(a,c,l){return o((Wn[a]&&Wn[a].get||s)(e,a,c,l))})},quickSetter:function(e,t,i){if(e=Ai(e),e.length>1){var r=e.map(function(u){return On.quickSetter(u,t,i)}),s=r.length;return function(u){for(var d=s;d--;)r[d](u)}}e=e[0]||{};var o=Wn[t],a=js(e),c=a.harness&&(a.harness.aliases||{})[t]||t,l=o?function(u){var d=new o;Ec._pt=0,d.init(e,i?u+i:u,Ec,0,[e]),d.render(1,d),Ec._pt&&Dx(1,Ec)}:a.set(e,c);return o?l:function(u){return l(e,c,i?u+i:u,a,1)}},quickTo:function(e,t,i){var r,s=On.to(e,pi((r={},r[t]="+=0.1",r.paused=!0,r.stagger=0,r),i||{})),o=function(c,l,u){return s.resetTo(t,c,l,u)};return o.tween=s,o},isTweening:function(e){return Lt.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=zo(e.ease,Hu.ease)),BC(Hu,e||{})},config:function(e){return BC(Xn,e||{})},registerEffect:function(e){var t=e.name,i=e.effect,r=e.plugins,s=e.defaults,o=e.extendTimeline;(r||"").split(",").forEach(function(a){return a&&!Wn[a]&&!hi[a]&&zu(t+" effect requires "+a+" plugin.")}),Y0[t]=function(a,c,l){return i(Ai(a),pi(c||{},s),l)},o&&(Nn.prototype[t]=function(a,c,l){return this.add(Y0[t](a,Mr(c)?c:(l=c)&&{},this),l)})},registerEase:function(e,t){st[e]=zo(t)},parseEase:function(e,t){return arguments.length?zo(e,t):st},getById:function(e){return Lt.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var i=new Nn(e),r,s;for(i.smoothChildTiming=qn(e.smoothChildTiming),Lt.remove(i),i._dp=0,i._time=i._tTime=Lt._time,r=Lt._first;r;)s=r._next,(t||!(!r._dur&&r instanceof Xt&&r.vars.onComplete===r._targets[0]))&&Sr(i,r,r._start-r._delay),r=s;return Sr(Lt,i,0),i},context:function(e,t){return e?new SD(e,t):It},matchMedia:function(e){return new kB(e)},matchMediaRefresh:function(){return Go.forEach(function(e){var t=e.conditions,i,r;for(r in t)t[r]&&(t[r]=!1,i=1);i&&e.revert()})||ux()},addEventListener:function(e,t){var i=Am[e]||(Am[e]=[]);~i.indexOf(t)||i.push(t)},removeEventListener:function(e,t){var i=Am[e],r=i&&i.indexOf(t);r>=0&&i.splice(r,1)},utils:{wrap:pB,wrapYoyo:mB,distribute:aD,random:lD,snap:cD,normalize:hB,getUnit:Mn,clamp:lB,splitColor:pD,toArray:Ai,selector:ax,mapRange:dD,pipe:dB,unitize:fB,interpolate:gB,shuffle:oD},install:YC,effects:Y0,ticker:$n,updateRoot:Nn.updateRoot,plugins:Wn,globalTimeline:Lt,core:{PropTween:Vn,globals:ZC,Tween:Xt,Timeline:Nn,Animation:Wu,getCache:js,_removeLinkedListItem:km,reverting:function(){return Sn},context:function(e){return e&&It&&(It.data.push(e),e._ctx=It),It},suppressOverwrites:function(e){return dx=e}}};Bn("to,from,fromTo,delayedCall,set,killTweensOf",function(n){return Om[n]=Xt[n]});$n.add(Nn.updateRoot);Ec=Om.to({},{duration:0});var UB=function(e,t){for(var i=e._pt;i&&i.p!==t&&i.op!==t&&i.fp!==t;)i=i._next;return i},BB=function(e,t){var i=e._targets,r,s,o;for(r in t)for(s=i.length;s--;)o=e._ptLookup[s][r],o&&(o=o.d)&&(o._pt&&(o=UB(o,r)),o&&o.modifier&&o.modifier(t[r],e,i[s],r))},ex=function(e,t){return{name:e,headless:1,rawVars:1,init:function(r,s,o){o._onInit=function(a){var c,l;if(cn(s)&&(c={},Bn(s,function(u){return c[u]=1}),s=c),t){c={};for(l in s)c[l]=t(s[l]);s=c}BB(a,s)}}}},On=Om.registerPlugin({name:"attr",init:function(e,t,i,r,s){var o,a,c;this.tween=i;for(o in t)c=e.getAttribute(o)||"",a=this.add(e,"setAttribute",(c||0)+"",t[o],r,s,0,0,o),a.op=o,a.b=c,this._props.push(o)},render:function(e,t){for(var i=t._pt;i;)Sn?i.set(i.t,i.p,i.b,i):i.r(e,i.d),i=i._next}},{name:"endArray",headless:1,init:function(e,t){for(var i=t.length;i--;)this.add(e,i,e[i]||0,t[i],0,0,0,0,0,1)}},ex("roundProps",cx),ex("modifiers"),ex("snap",cD))||Om;Xt.version=Nn.version=On.version="3.15.0";XC=1;fx()&&Cc();var VB=st.Power0,HB=st.Power1,zB=st.Power2,GB=st.Power3,jB=st.Power4,WB=st.Linear,$B=st.Quad,qB=st.Cubic,XB=st.Quart,YB=st.Quint,ZB=st.Strong,KB=st.Elastic,JB=st.Back,QB=st.SteppedEase,eV=st.Bounce,tV=st.Sine,nV=st.Expo,iV=st.Circ;var MD,qs,Ic,Lx,Zo,rV,ED,Fx,sV=function(){return typeof window<"u"},is={},Yo=180/Math.PI,Rc=Math.PI/180,Ac=Math.atan2,bD=1e8,kx=/([A-Z])/g,oV=/(left|right|width|margin|padding|x)/i,aV=/[\s,\(]\S/,Er={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},Rx=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},cV=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},lV=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},uV=function(e,t){return t.set(t.t,t.p,e===1?t.e:e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},dV=function(e,t){var i=t.s+t.c*e;t.set(t.t,t.p,~~(i+(i<0?-.5:.5))+t.u,t)},ND=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},PD=function(e,t){return t.set(t.t,t.p,e!==1?t.b:t.e,t)},fV=function(e,t,i){return e.style[t]=i},hV=function(e,t,i){return e.style.setProperty(t,i)},pV=function(e,t,i){return e._gsap[t]=i},mV=function(e,t,i){return e._gsap.scaleX=e._gsap.scaleY=i},gV=function(e,t,i,r,s){var o=e._gsap;o.scaleX=o.scaleY=i,o.renderTransform(s,o)},vV=function(e,t,i,r,s){var o=e._gsap;o[t]=i,o.renderTransform(s,o)},Ft="transform",Yn=Ft+"Origin",_V=function n(e,t){var i=this,r=this.target,s=r.style,o=r._gsap;if(e in is&&s){if(this.tfm=this.tfm||{},e!=="transform")e=Er[e]||e,~e.indexOf(",")?e.split(",").forEach(function(a){return i.tfm[a]=ns(r,a)}):this.tfm[e]=o.x?o[e]:ns(r,e),e===Yn&&(this.tfm.zOrigin=o.zOrigin);else return Er.transform.split(",").forEach(function(a){return n.call(i,a,t)});if(this.props.indexOf(Ft)>=0)return;o.svg&&(this.svgo=r.getAttribute("data-svg-origin"),this.props.push(Yn,t,"")),e=Ft}(s||t)&&this.props.push(e,t,s[e])},OD=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},yV=function(){var e=this.props,t=this.target,i=t.style,r=t._gsap,s,o;for(s=0;s<e.length;s+=3)e[s+1]?e[s+1]===2?t[e[s]](e[s+2]):t[e[s]]=e[s+2]:e[s+2]?i[e[s]]=e[s+2]:i.removeProperty(e[s].substr(0,2)==="--"?e[s]:e[s].replace(kx,"-$1").toLowerCase());if(this.tfm){for(o in this.tfm)r[o]=this.tfm[o];r.svg&&(r.renderTransform(),t.setAttribute("data-svg-origin",this.svgo||"")),s=Fx(),(!s||!s.isStart)&&!i[Ft]&&(OD(i),r.zOrigin&&i[Yn]&&(i[Yn]+=" "+r.zOrigin+"px",r.zOrigin=0,r.renderTransform()),r.uncache=1)}},LD=function(e,t){var i={target:e,props:[],revert:yV,save:_V};return e._gsap||On.core.getCache(e),t&&e.style&&e.nodeType&&t.split(",").forEach(function(r){return i.save(r)}),i},FD,Nx=function(e,t){var i=qs.createElementNS?qs.createElementNS((t||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):qs.createElement(e);return i&&i.style?i:qs.createElement(e)},mi=function n(e,t,i){var r=getComputedStyle(e);return r[t]||r.getPropertyValue(t.replace(kx,"-$1").toLowerCase())||r.getPropertyValue(t)||!i&&n(e,Nc(t)||t,1)||""},wD="O,Moz,ms,Ms,Webkit".split(","),Nc=function(e,t,i){var r=t||Zo,s=r.style,o=5;if(e in s&&!i)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);o--&&!(wD[o]+e in s););return o<0?null:(o===3?"ms":o>=0?wD[o]:"")+e},Px=function(){sV()&&window.document&&(MD=window,qs=MD.document,Ic=qs.documentElement,Zo=Nx("div")||{style:{}},rV=Nx("div"),Ft=Nc(Ft),Yn=Ft+"Origin",Zo.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",FD=!!Nc("perspective"),Fx=On.core.reverting,Lx=1)},TD=function(e){var t=e.ownerSVGElement,i=Nx("svg",t&&t.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),r=e.cloneNode(!0),s;r.style.display="block",i.appendChild(r),Ic.appendChild(i);try{s=r.getBBox()}catch{}return i.removeChild(r),Ic.removeChild(i),s},CD=function(e,t){for(var i=t.length;i--;)if(e.hasAttribute(t[i]))return e.getAttribute(t[i])},kD=function(e){var t,i;try{t=e.getBBox()}catch{t=TD(e),i=1}return t&&(t.width||t.height)||i||(t=TD(e)),t&&!t.width&&!t.x&&!t.y?{x:+CD(e,["x","cx","x1"])||0,y:+CD(e,["y","cy","y1"])||0,width:0,height:0}:t},UD=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&kD(e))},Ys=function(e,t){if(t){var i=e.style,r;t in is&&t!==Yn&&(t=Ft),i.removeProperty?(r=t.substr(0,2),(r==="ms"||t.substr(0,6)==="webkit")&&(t="-"+t),i.removeProperty(r==="--"?t:t.replace(kx,"-$1").toLowerCase())):i.removeAttribute(t)}},Xs=function(e,t,i,r,s,o){var a=new Vn(e._pt,t,i,0,1,o?PD:ND);return e._pt=a,a.b=r,a.e=s,e._props.push(i),a},DD={deg:1,rad:1,turn:1},xV={grid:1,flex:1},Zs=function n(e,t,i,r){var s=parseFloat(i)||0,o=(i+"").trim().substr((s+"").length)||"px",a=Zo.style,c=oV.test(t),l=e.tagName.toLowerCase()==="svg",u=(l?"client":"offset")+(c?"Width":"Height"),d=100,f=r==="px",h=r==="%",m,v,p,g;if(r===o||!s||DD[r]||DD[o])return s;if(o!=="px"&&!f&&(s=n(e,t,i,"px")),g=e.getCTM&&UD(e),(h||o==="%")&&(is[t]||~t.indexOf("adius")))return m=g?e.getBBox()[c?"width":"height"]:e[u],Gt(h?s/m*d:s/100*m);if(a[c?"width":"height"]=d+(f?o:r),v=r!=="rem"&&~t.indexOf("adius")||r==="em"&&e.appendChild&&!l?e:e.parentNode,g&&(v=(e.ownerSVGElement||{}).parentNode),(!v||v===qs||!v.appendChild)&&(v=qs.body),p=v._gsap,p&&h&&p.width&&c&&p.time===$n.time&&!p.uncache)return Gt(s/p.width*d);if(h&&(t==="height"||t==="width")){var x=e.style[t];e.style[t]=d+r,m=e[u],x?e.style[t]=x:Ys(e,t)}else(h||o==="%")&&!xV[mi(v,"display")]&&(a.position=mi(e,"position")),v===e&&(a.position="static"),v.appendChild(Zo),m=Zo[u],v.removeChild(Zo),a.position="absolute";return c&&h&&(p=js(v),p.time=$n.time,p.width=v[u]),Gt(f?m*s/d:m&&s?d/m*s:0)},ns=function(e,t,i,r){var s;return Lx||Px(),t in Er&&t!=="transform"&&(t=Er[t],~t.indexOf(",")&&(t=t.split(",")[0])),is[t]&&t!=="transform"?(s=Yu(e,r),s=t!=="transformOrigin"?s[t]:s.svg?s.origin:zm(mi(e,Yn))+" "+s.zOrigin+"px"):(s=e.style[t],(!s||s==="auto"||r||~(s+"").indexOf("calc("))&&(s=Hm[t]&&Hm[t](e,t,i)||mi(e,t)||yx(e,t)||(t==="opacity"?1:0))),i&&!~(s+"").trim().indexOf(" ")?Zs(e,t,s,i)+i:s},SV=function(e,t,i,r){if(!i||i==="none"){var s=Nc(t,e,1),o=s&&mi(e,s,1);o&&o!==i?(t=s,i=o):t==="borderColor"&&(i=mi(e,"borderTopColor"))}var a=new Vn(this._pt,e.style,t,0,1,Cx),c=0,l=0,u,d,f,h,m,v,p,g,x,M,E,C;if(a.b=i,a.e=r,i+="",r+="",r.substring(0,6)==="var(--"&&(r=mi(e,r.substring(4,r.indexOf(")")))),r==="auto"&&(v=e.style[t],e.style[t]=r,r=mi(e,t)||r,v?e.style[t]=v:Ys(e,t)),u=[i,r],Sx(u),i=u[0],r=u[1],f=i.match(jo)||[],C=r.match(jo)||[],C.length){for(;d=jo.exec(r);)p=d[0],x=r.substring(c,d.index),m?m=(m+1)%5:(x.substr(-5)==="rgba("||x.substr(-5)==="hsla(")&&(m=1),p!==(v=f[l++]||"")&&(h=parseFloat(v)||0,E=v.substr((h+"").length),p.charAt(1)==="="&&(p=Wo(h,p)+E),g=parseFloat(p),M=p.substr((g+"").length),c=jo.lastIndex-M.length,M||(M=M||Xn.units[t]||E,c===r.length&&(r+=M,a.e+=M)),E!==M&&(h=Zs(e,t,v,M)||0),a._pt={_next:a._pt,p:x||l===1?x:",",s:h,c:g-h,m:m&&m<4||t==="zIndex"?Math.round:0});a.c=c<r.length?r.substring(c,r.length):""}else a.r=t==="display"&&r==="none"?PD:ND;return px.test(r)&&(a.e=0),this._pt=a,a},AD={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},MV=function(e){var t=e.split(" "),i=t[0],r=t[1]||"50%";return(i==="top"||i==="bottom"||r==="left"||r==="right")&&(e=i,i=r,r=e),t[0]=AD[i]||i,t[1]=AD[r]||r,t.join(" ")},EV=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var i=t.t,r=i.style,s=t.u,o=i._gsap,a,c,l;if(s==="all"||s===!0)r.cssText="",c=1;else for(s=s.split(","),l=s.length;--l>-1;)a=s[l],is[a]&&(c=1,a=a==="transformOrigin"?Yn:Ft),Ys(i,a);c&&(Ys(i,Ft),o&&(o.svg&&i.removeAttribute("transform"),r.scale=r.rotate=r.translate="none",Yu(i,1),o.uncache=1,OD(r)))}},Hm={clearProps:function(e,t,i,r,s){if(s.data!=="isFromStart"){var o=e._pt=new Vn(e._pt,t,i,0,0,EV);return o.u=r,o.pr=-10,o.tween=s,e._props.push(i),1}}},Xu=[1,0,0,1,0,0],BD={},VD=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},ID=function(e){var t=mi(e,Ft);return VD(t)?Xu:t.substr(7).match(hx).map(Gt)},Ux=function(e,t){var i=e._gsap||js(e),r=e.style,s=ID(e),o,a,c,l;return i.svg&&e.getAttribute("transform")?(c=e.transform.baseVal.consolidate().matrix,s=[c.a,c.b,c.c,c.d,c.e,c.f],s.join(",")==="1,0,0,1,0,0"?Xu:s):(s===Xu&&!e.offsetParent&&e!==Ic&&!i.svg&&(c=r.display,r.display="block",o=e.parentNode,(!o||!e.offsetParent&&!e.getBoundingClientRect().width)&&(l=1,a=e.nextElementSibling,Ic.appendChild(e)),s=ID(e),c?r.display=c:Ys(e,"display"),l&&(a?o.insertBefore(e,a):o?o.appendChild(e):Ic.removeChild(e))),t&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},Ox=function(e,t,i,r,s,o){var a=e._gsap,c=s||Ux(e,!0),l=a.xOrigin||0,u=a.yOrigin||0,d=a.xOffset||0,f=a.yOffset||0,h=c[0],m=c[1],v=c[2],p=c[3],g=c[4],x=c[5],M=t.split(" "),E=parseFloat(M[0])||0,C=parseFloat(M[1])||0,T,D,_,b;i?c!==Xu&&(D=h*p-m*v)&&(_=E*(p/D)+C*(-v/D)+(v*x-p*g)/D,b=E*(-m/D)+C*(h/D)-(h*x-m*g)/D,E=_,C=b):(T=kD(e),E=T.x+(~M[0].indexOf("%")?E/100*T.width:E),C=T.y+(~(M[1]||M[0]).indexOf("%")?C/100*T.height:C)),r||r!==!1&&a.smooth?(g=E-l,x=C-u,a.xOffset=d+(g*h+x*v)-g,a.yOffset=f+(g*m+x*p)-x):a.xOffset=a.yOffset=0,a.xOrigin=E,a.yOrigin=C,a.smooth=!!r,a.origin=t,a.originIsAbsolute=!!i,e.style[Yn]="0px 0px",o&&(Xs(o,a,"xOrigin",l,E),Xs(o,a,"yOrigin",u,C),Xs(o,a,"xOffset",d,a.xOffset),Xs(o,a,"yOffset",f,a.yOffset)),e.setAttribute("data-svg-origin",E+" "+C)},Yu=function(e,t){var i=e._gsap||new Mx(e);if("x"in i&&!t&&!i.uncache)return i;var r=e.style,s=i.scaleX<0,o="px",a="deg",c=getComputedStyle(e),l=mi(e,Yn)||"0",u,d,f,h,m,v,p,g,x,M,E,C,T,D,_,b,I,A,L,z,j,N,B,F,Z,Q,ce,ge,Se,Je,Ye,Ae;return u=d=f=v=p=g=x=M=E=0,h=m=1,i.svg=!!(e.getCTM&&UD(e)),c.translate&&((c.translate!=="none"||c.scale!=="none"||c.rotate!=="none")&&(r[Ft]=(c.translate!=="none"?"translate3d("+(c.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(c.rotate!=="none"?"rotate("+c.rotate+") ":"")+(c.scale!=="none"?"scale("+c.scale.split(" ").join(",")+") ":"")+(c[Ft]!=="none"?c[Ft]:"")),r.scale=r.rotate=r.translate="none"),D=Ux(e,i.svg),i.svg&&(i.uncache?(Z=e.getBBox(),l=i.xOrigin-Z.x+"px "+(i.yOrigin-Z.y)+"px",F=""):F=!t&&e.getAttribute("data-svg-origin"),Ox(e,F||l,!!F||i.originIsAbsolute,i.smooth!==!1,D)),C=i.xOrigin||0,T=i.yOrigin||0,D!==Xu&&(A=D[0],L=D[1],z=D[2],j=D[3],u=N=D[4],d=B=D[5],D.length===6?(h=Math.sqrt(A*A+L*L),m=Math.sqrt(j*j+z*z),v=A||L?Ac(L,A)*Yo:0,x=z||j?Ac(z,j)*Yo+v:0,x&&(m*=Math.abs(Math.cos(x*Rc))),i.svg&&(u-=C-(C*A+T*z),d-=T-(C*L+T*j))):(Ae=D[6],Je=D[7],ce=D[8],ge=D[9],Se=D[10],Ye=D[11],u=D[12],d=D[13],f=D[14],_=Ac(Ae,Se),p=_*Yo,_&&(b=Math.cos(-_),I=Math.sin(-_),F=N*b+ce*I,Z=B*b+ge*I,Q=Ae*b+Se*I,ce=N*-I+ce*b,ge=B*-I+ge*b,Se=Ae*-I+Se*b,Ye=Je*-I+Ye*b,N=F,B=Z,Ae=Q),_=Ac(-z,Se),g=_*Yo,_&&(b=Math.cos(-_),I=Math.sin(-_),F=A*b-ce*I,Z=L*b-ge*I,Q=z*b-Se*I,Ye=j*I+Ye*b,A=F,L=Z,z=Q),_=Ac(L,A),v=_*Yo,_&&(b=Math.cos(_),I=Math.sin(_),F=A*b+L*I,Z=N*b+B*I,L=L*b-A*I,B=B*b-N*I,A=F,N=Z),p&&Math.abs(p)+Math.abs(v)>359.9&&(p=v=0,g=180-g),h=Gt(Math.sqrt(A*A+L*L+z*z)),m=Gt(Math.sqrt(B*B+Ae*Ae)),_=Ac(N,B),x=Math.abs(_)>2e-4?_*Yo:0,E=Ye?1/(Ye<0?-Ye:Ye):0),i.svg&&(F=e.getAttribute("transform"),i.forceCSS=e.setAttribute("transform","")||!VD(mi(e,Ft)),F&&e.setAttribute("transform",F))),Math.abs(x)>90&&Math.abs(x)<270&&(s?(h*=-1,x+=v<=0?180:-180,v+=v<=0?180:-180):(m*=-1,x+=x<=0?180:-180)),t=t||i.uncache,i.x=u-((i.xPercent=u&&(!t&&i.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-u)?-50:0)))?e.offsetWidth*i.xPercent/100:0)+o,i.y=d-((i.yPercent=d&&(!t&&i.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-d)?-50:0)))?e.offsetHeight*i.yPercent/100:0)+o,i.z=f+o,i.scaleX=Gt(h),i.scaleY=Gt(m),i.rotation=Gt(v)+a,i.rotationX=Gt(p)+a,i.rotationY=Gt(g)+a,i.skewX=x+a,i.skewY=M+a,i.transformPerspective=E+o,(i.zOrigin=parseFloat(l.split(" ")[2])||!t&&i.zOrigin||0)&&(r[Yn]=zm(l)),i.xOffset=i.yOffset=0,i.force3D=Xn.force3D,i.renderTransform=i.svg?wV:FD?HD:bV,i.uncache=0,i},zm=function(e){return(e=e.split(" "))[0]+" "+e[1]},Ix=function(e,t,i){var r=Mn(t);return Gt(parseFloat(t)+parseFloat(Zs(e,"x",i+"px",r)))+r},bV=function(e,t){t.z="0px",t.rotationY=t.rotationX="0deg",t.force3D=0,HD(e,t)},qo="0deg",qu="0px",Xo=") ",HD=function(e,t){var i=t||this,r=i.xPercent,s=i.yPercent,o=i.x,a=i.y,c=i.z,l=i.rotation,u=i.rotationY,d=i.rotationX,f=i.skewX,h=i.skewY,m=i.scaleX,v=i.scaleY,p=i.transformPerspective,g=i.force3D,x=i.target,M=i.zOrigin,E="",C=g==="auto"&&e&&e!==1||g===!0;if(M&&(d!==qo||u!==qo)){var T=parseFloat(u)*Rc,D=Math.sin(T),_=Math.cos(T),b;T=parseFloat(d)*Rc,b=Math.cos(T),o=Ix(x,o,D*b*-M),a=Ix(x,a,-Math.sin(T)*-M),c=Ix(x,c,_*b*-M+M)}p!==qu&&(E+="perspective("+p+Xo),(r||s)&&(E+="translate("+r+"%, "+s+"%) "),(C||o!==qu||a!==qu||c!==qu)&&(E+=c!==qu||C?"translate3d("+o+", "+a+", "+c+") ":"translate("+o+", "+a+Xo),l!==qo&&(E+="rotate("+l+Xo),u!==qo&&(E+="rotateY("+u+Xo),d!==qo&&(E+="rotateX("+d+Xo),(f!==qo||h!==qo)&&(E+="skew("+f+", "+h+Xo),(m!==1||v!==1)&&(E+="scale("+m+", "+v+Xo),x.style[Ft]=E||"translate(0, 0)"},wV=function(e,t){var i=t||this,r=i.xPercent,s=i.yPercent,o=i.x,a=i.y,c=i.rotation,l=i.skewX,u=i.skewY,d=i.scaleX,f=i.scaleY,h=i.target,m=i.xOrigin,v=i.yOrigin,p=i.xOffset,g=i.yOffset,x=i.forceCSS,M=parseFloat(o),E=parseFloat(a),C,T,D,_,b;c=parseFloat(c),l=parseFloat(l),u=parseFloat(u),u&&(u=parseFloat(u),l+=u,c+=u),c||l?(c*=Rc,l*=Rc,C=Math.cos(c)*d,T=Math.sin(c)*d,D=Math.sin(c-l)*-f,_=Math.cos(c-l)*f,l&&(u*=Rc,b=Math.tan(l-u),b=Math.sqrt(1+b*b),D*=b,_*=b,u&&(b=Math.tan(u),b=Math.sqrt(1+b*b),C*=b,T*=b)),C=Gt(C),T=Gt(T),D=Gt(D),_=Gt(_)):(C=d,_=f,T=D=0),(M&&!~(o+"").indexOf("px")||E&&!~(a+"").indexOf("px"))&&(M=Zs(h,"x",o,"px"),E=Zs(h,"y",a,"px")),(m||v||p||g)&&(M=Gt(M+m-(m*C+v*D)+p),E=Gt(E+v-(m*T+v*_)+g)),(r||s)&&(b=h.getBBox(),M=Gt(M+r/100*b.width),E=Gt(E+s/100*b.height)),b="matrix("+C+","+T+","+D+","+_+","+M+","+E+")",h.setAttribute("transform",b),x&&(h.style[Ft]=b)},TV=function(e,t,i,r,s){var o=360,a=cn(s),c=parseFloat(s)*(a&&~s.indexOf("rad")?Yo:1),l=c-r,u=r+l+"deg",d,f;return a&&(d=s.split("_")[1],d==="short"&&(l%=o,l!==l%(o/2)&&(l+=l<0?o:-o)),d==="cw"&&l<0?l=(l+o*bD)%o-~~(l/o)*o:d==="ccw"&&l>0&&(l=(l-o*bD)%o-~~(l/o)*o)),e._pt=f=new Vn(e._pt,t,i,r,l,cV),f.e=u,f.u="deg",e._props.push(i),f},RD=function(e,t){for(var i in t)e[i]=t[i];return e},CV=function(e,t,i){var r=RD({},i._gsap),s="perspective,force3D,transformOrigin,svgOrigin",o=i.style,a,c,l,u,d,f,h,m;r.svg?(l=i.getAttribute("transform"),i.setAttribute("transform",""),o[Ft]=t,a=Yu(i,1),Ys(i,Ft),i.setAttribute("transform",l)):(l=getComputedStyle(i)[Ft],o[Ft]=t,a=Yu(i,1),o[Ft]=l);for(c in is)l=r[c],u=a[c],l!==u&&s.indexOf(c)<0&&(h=Mn(l),m=Mn(u),d=h!==m?Zs(i,c,l,m):parseFloat(l),f=parseFloat(u),e._pt=new Vn(e._pt,a,c,d,f-d,Rx),e._pt.u=m||0,e._props.push(c));RD(a,r)};Bn("padding,margin,Width,Radius",function(n,e){var t="Top",i="Right",r="Bottom",s="Left",o=(e<3?[t,i,r,s]:[t+s,t+i,r+i,r+s]).map(function(a){return e<2?n+a:"border"+a+n});Hm[e>1?"border"+n:n]=function(a,c,l,u,d){var f,h;if(arguments.length<4)return f=o.map(function(m){return ns(a,m,l)}),h=f.join(" "),h.split(f[0]).length===5?f[0]:h;f=(u+"").split(" "),h={},o.forEach(function(m,v){return h[m]=f[v]=f[v]||f[(v-1)/2|0]}),a.init(c,h,d)}});var Bx={name:"css",register:Px,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,i,r,s){var o=this._props,a=e.style,c=i.vars.startAt,l,u,d,f,h,m,v,p,g,x,M,E,C,T,D,_,b;Lx||Px(),this.styles=this.styles||LD(e),_=this.styles.props,this.tween=i;for(v in t)if(v!=="autoRound"&&(u=t[v],!(Wn[v]&&bx(v,t,i,r,e,s)))){if(h=typeof u,m=Hm[v],h==="function"&&(u=u.call(i,r,e,s),h=typeof u),h==="string"&&~u.indexOf("random(")&&(u=Dc(u)),m)m(this,e,v,u,i)&&(D=1);else if(v.substr(0,2)==="--")l=(getComputedStyle(e).getPropertyValue(v)+"").trim(),u+="",es.lastIndex=0,es.test(l)||(p=Mn(l),g=Mn(u),g?p!==g&&(l=Zs(e,v,l,g)+g):p&&(u+=p)),this.add(a,"setProperty",l,u,r,s,0,0,v),o.push(v),_.push(v,0,a[v]);else if(h!=="undefined"){if(c&&v in c?(l=typeof c[v]=="function"?c[v].call(i,r,e,s):c[v],cn(l)&&~l.indexOf("random(")&&(l=Dc(l)),Mn(l+"")||l==="auto"||(l+=Xn.units[v]||Mn(ns(e,v))||""),(l+"").charAt(1)==="="&&(l=ns(e,v))):l=ns(e,v),f=parseFloat(l),x=h==="string"&&u.charAt(1)==="="&&u.substr(0,2),x&&(u=u.substr(2)),d=parseFloat(u),v in Er&&(v==="autoAlpha"&&(f===1&&ns(e,"visibility")==="hidden"&&d&&(f=0),_.push("visibility",0,a.visibility),Xs(this,a,"visibility",f?"inherit":"hidden",d?"inherit":"hidden",!d)),v!=="scale"&&v!=="transform"&&(v=Er[v],~v.indexOf(",")&&(v=v.split(",")[0]))),M=v in is,M){if(this.styles.save(v),b=u,h==="string"&&u.substring(0,6)==="var(--"){if(u=mi(e,u.substring(4,u.indexOf(")"))),u.substring(0,5)==="calc("){var I=e.style.perspective;e.style.perspective=u,u=mi(e,"perspective"),I?e.style.perspective=I:Ys(e,"perspective")}d=parseFloat(u)}if(E||(C=e._gsap,C.renderTransform&&!t.parseTransform||Yu(e,t.parseTransform),T=t.smoothOrigin!==!1&&C.smooth,E=this._pt=new Vn(this._pt,a,Ft,0,1,C.renderTransform,C,0,-1),E.dep=1),v==="scale")this._pt=new Vn(this._pt,C,"scaleY",C.scaleY,(x?Wo(C.scaleY,x+d):d)-C.scaleY||0,Rx),this._pt.u=0,o.push("scaleY",v),v+="X";else if(v==="transformOrigin"){_.push(Yn,0,a[Yn]),u=MV(u),C.svg?Ox(e,u,0,T,0,this):(g=parseFloat(u.split(" ")[2])||0,g!==C.zOrigin&&Xs(this,C,"zOrigin",C.zOrigin,g),Xs(this,a,v,zm(l),zm(u)));continue}else if(v==="svgOrigin"){Ox(e,u,1,T,0,this);continue}else if(v in BD){TV(this,C,v,f,x?Wo(f,x+u):u);continue}else if(v==="smoothOrigin"){Xs(this,C,"smooth",C.smooth,u);continue}else if(v==="force3D"){C[v]=u;continue}else if(v==="transform"){CV(this,u,e);continue}}else v in a||(v=Nc(v)||v);if(M||(d||d===0)&&(f||f===0)&&!aV.test(u)&&v in a)p=(l+"").substr((f+"").length),d||(d=0),g=Mn(u)||(v in Xn.units?Xn.units[v]:p),p!==g&&(f=Zs(e,v,l,g)),this._pt=new Vn(this._pt,M?C:a,v,f,(x?Wo(f,x+d):d)-f,!M&&(g==="px"||v==="zIndex")&&t.autoRound!==!1?dV:Rx),this._pt.u=g||0,M&&b!==u?(this._pt.b=l,this._pt.e=b,this._pt.r=uV):p!==g&&g!=="%"&&(this._pt.b=l,this._pt.r=lV);else if(v in a)SV.call(this,e,v,l,x?x+u:u);else if(v in e)this.add(e,v,l||e[v],x?x+u:u,r,s);else if(v!=="parseTransform"){Fm(v,u);continue}M||(v in a?_.push(v,0,a[v]):typeof e[v]=="function"?_.push(v,2,e[v]()):_.push(v,1,l||e[v])),o.push(v)}}D&&Ax(this)},render:function(e,t){if(t.tween._time||!Fx())for(var i=t._pt;i;)i.r(e,i.d),i=i._next;else t.styles.revert()},get:ns,aliases:Er,getSetter:function(e,t,i){var r=Er[t];return r&&r.indexOf(",")<0&&(t=r),t in is&&t!==Yn&&(e._gsap.x||ns(e,"x"))?i&&ED===i?t==="scale"?mV:pV:(ED=i||{})&&(t==="scale"?gV:vV):e.style&&!Lm(e.style[t])?fV:~t.indexOf("-")?hV:Vm(e,t)},core:{_removeProperty:Ys,_getMatrix:Ux}};On.utils.checkPrefix=Nc;On.core.getStyleSaver=LD;(function(n,e,t,i){var r=Bn(n+","+e+","+t,function(s){is[s]=1});Bn(e,function(s){Xn.units[s]="deg",BD[s]=1}),Er[r[13]]=n+","+e,Bn(i,function(s){var o=s.split(":");Er[o[1]]=r[o[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");Bn("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(n){Xn.units[n]="px"});On.registerPlugin(Bx);var Gm=On.registerPlugin(Bx)||On,yte=Gm.core.Tween;var DV=["canvas3d"];function AV(n,e){if(n&1&&(vn(0,"span",14),ii(1),Tn()),n&2){let t=e.$implicit;ir(),Ia(t)}}function IV(n,e){if(n&1){let t=F_();vn(0,"div",9)(1,"button",10),Vf("click",function(){Gd(t);let r=Hf();return jd(r.closeCard())}),ii(2,"\u2715"),Tn(),vn(3,"div",11),ii(4),Tn(),vn(5,"h2"),ii(6),Tn(),vn(7,"p",12),ii(8),Tn(),vn(9,"div",13),P_(10,AV,2,1,"span",14,N_),Tn(),vn(12,"a",15),ii(13," Ver Proyecto \u2192 "),Tn()()}if(n&2){let t=Hf();xl("border-color","#"+t.selectedProject().color.toString(16)),kf("@cardAnimation",void 0),ir(3),xl("background","#"+t.selectedProject().color.toString(16)),ir(),Sl(" ",t.selectedProject().icon," "),ir(2),Ia(t.selectedProject().name),ir(2),Ia(t.selectedProject().description),ir(2),O_(t.selectedProject().technologies),ir(2),Bf("href",t.selectedProject().link,l_)}}var jm=class n{canvasRef;selectedProject=vs(null);scene;camera;renderer;raycaster=new Eu;mouse=new We;cubes=[];animationId;isDragging=!1;previousMousePosition={x:0,y:0};targetRotation={x:0,y:0};projects=[{id:"aw",name:"AdventureWorks E-commerce",description:"Migraci\xF3n completa de ASP.NET MVC 4 a .NET 8 con Angular 21. API REST, Entity Framework Core, SQL Server y autenticaci\xF3n con Identity.",color:5319636,icon:"\u{1F6D2}",link:"https://stefany-mazas.github.io/portafolio/AW_Migration/",technologies:[".NET 8","Angular 21","EF Core","SQL Server","Identity"]},{id:"editor",name:"Figma Lite Pro",description:"Editor visual de dise\xF1o con sistema de capas, undo/redo, exportaci\xF3n PNG/PDF/ZIP y dise\xF1o responsivo. 3500+ l\xEDneas de JS vanilla.",color:15485081,icon:"\u{1F3A8}",link:"https://stefany-mazas.github.io/portafolio/editor/",technologies:["JavaScript","Canvas","html2canvas","jsPDF"]},{id:"cafeteria",name:"Camper Caf\xE9 Pro",description:"Sistema Order & Pickup con PWA, QR codes, panel staff (POS), sincronizaci\xF3n en tiempo real y accesibilidad WCAG.",color:5025616,icon:"\u2615",link:"https://stefany-mazas.github.io/portafolio/cafeteria/",technologies:["PWA","QRCode.js","LocalStorage","ARIA"]},{id:"juego",name:"Digital Circus Runner",description:"Juego endless runner con IA adaptativa, sistema de r\xE9cords por per\xEDodos, comentarios y panel de admin oculto.",color:16096779,icon:"\u{1F3AE}",link:"https://stefany-mazas.github.io/portafolio/juego/",technologies:["JavaScript","IA","Web Audio","LocalStorage"]},{id:"angular",name:"Demo Angular",description:"Proyecto demo de migraci\xF3n AngularJS \u2192 Angular 21. Demuestra Signals, Standalone Components, Control Flow y TypeScript.",color:14483505,icon:"\u{1F680}",link:"https://github.com/Stefany-Mazas/portafolio/tree/main/angular/demo-migracion-angular",technologies:["Angular 21","TypeScript","Signals","HTTP"]}];ngOnInit(){}ngAfterViewInit(){this.initThree(),this.createCubes(),this.addEventListeners(),this.animate()}ngOnDestroy(){this.animationId&&cancelAnimationFrame(this.animationId),window.removeEventListener("resize",this.onResize),this.canvasRef.nativeElement.removeEventListener("click",this.onClick),this.canvasRef.nativeElement.removeEventListener("mousedown",this.onMouseDown),this.canvasRef.nativeElement.removeEventListener("mousemove",this.onMouseMove),this.canvasRef.nativeElement.removeEventListener("mouseup",this.onMouseUp),this.renderer.dispose()}initThree(){let e=this.canvasRef.nativeElement;this.scene=new au,this.camera=new _n(60,window.innerWidth/window.innerHeight,.1,1e3),this.camera.position.z=8,this.renderer=new Em({canvas:e,antialias:!0,alpha:!0}),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));let t=new Mu(16777215,.5);this.scene.add(t);let i=new gc(9133302,1,100);i.position.set(5,5,5),this.scene.add(i);let r=new gc(440020,1,100);r.position.set(-5,-5,5),this.scene.add(r),this.createParticles()}createParticles(){let e=new Gn,t=500,i=new Float32Array(t*3);for(let o=0;o<t*3;o++)i[o]=(Math.random()-.5)*50;e.setAttribute("position",new In(i,3));let r=new mc({color:9133302,size:.05,transparent:!0,opacity:.6}),s=new fu(e,r);this.scene.add(s)}createCubes(){let e=new Kr(1.2,1.2,1.2),t=this.projects.length,i=4,r=Math.PI/(t+1);this.projects.forEach((s,o)=>{let a=r*(o+1)-Math.PI/2,c=Math.sin(a)*i,l=Math.cos(a)*i*.3-2,u=new vu({color:s.color,metalness:.3,roughness:.4,emissive:s.color,emissiveIntensity:.2}),d=new Un(e,u);d.position.set(c,0,l),d.userData={project:s,index:o};let f=new Kr(1.4,1.4,1.4),h=new ko({color:s.color,transparent:!0,opacity:.15,side:xn}),m=new Un(f,h);d.add(m);let v=document.createElement("canvas");v.width=128,v.height=128;let p=v.getContext("2d");p.fillStyle="white",p.font="80px sans-serif",p.textAlign="center",p.textBaseline="middle",p.fillText(s.icon,64,64);let g=new pu(v),x=new fc({map:g,transparent:!0}),M=new du(x);M.scale.set(.8,.8,1),M.position.y=1.5,d.add(M),this.cubes.push(d),this.scene.add(d),d.scale.set(0,0,0),Gm.to(d.scale,{x:1,y:1,z:1,duration:.8,delay:o*.15,ease:"back.out(1.7)"})})}addEventListeners(){window.addEventListener("resize",this.onResize),this.canvasRef.nativeElement.addEventListener("click",this.onClick),this.canvasRef.nativeElement.addEventListener("mousedown",this.onMouseDown),this.canvasRef.nativeElement.addEventListener("mousemove",this.onMouseMove),this.canvasRef.nativeElement.addEventListener("mouseup",this.onMouseUp),this.canvasRef.nativeElement.addEventListener("touchstart",this.onTouchStart),this.canvasRef.nativeElement.addEventListener("touchmove",this.onTouchMove),this.canvasRef.nativeElement.addEventListener("touchend",this.onTouchEnd)}onResize=()=>{this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight)};onClick=e=>{this.mouse.x=e.clientX/window.innerWidth*2-1,this.mouse.y=-(e.clientY/window.innerHeight)*2+1,this.raycaster.setFromCamera(this.mouse,this.camera);let t=this.raycaster.intersectObjects(this.cubes);if(t.length>0){let i=t[0].object,r=i.userData.project;this.selectProject(i,r)}};onMouseDown=e=>{this.isDragging=!1,this.previousMousePosition={x:e.clientX,y:e.clientY}};onMouseMove=e=>{let t=e.clientX-this.previousMousePosition.x,i=e.clientY-this.previousMousePosition.y;(Math.abs(t)>3||Math.abs(i)>3)&&(this.isDragging=!0),this.isDragging&&(this.targetRotation.y+=t*.005,this.targetRotation.x+=i*.005),this.previousMousePosition={x:e.clientX,y:e.clientY}};onMouseUp=()=>{setTimeout(()=>{this.isDragging=!1},100)};onTouchStart=e=>{e.touches.length===1&&(this.previousMousePosition={x:e.touches[0].clientX,y:e.touches[0].clientY})};onTouchMove=e=>{if(e.touches.length===1){let t=e.touches[0].clientX-this.previousMousePosition.x,i=e.touches[0].clientY-this.previousMousePosition.y;this.targetRotation.y+=t*.005,this.targetRotation.x+=i*.005,this.previousMousePosition={x:e.touches[0].clientX,y:e.touches[0].clientY}}};onTouchEnd=e=>{};selectProject(e,t){Gm.to(e.scale,{x:1.3,y:1.3,z:1.3,duration:.3,yoyo:!0,repeat:1,ease:"power2.out"}),this.selectedProject.set(t)}closeCard(){this.selectedProject.set(null)}animate(){this.animationId=requestAnimationFrame(()=>this.animate()),this.cubes.forEach((e,t)=>{e.rotation.y+=.005,e.rotation.x+=.002,e.position.y=Math.sin(Date.now()*.001+t)*.15}),this.scene.rotation.y+=(this.targetRotation.y-this.scene.rotation.y)*.05,this.scene.rotation.x+=(this.targetRotation.x-this.scene.rotation.x)*.05,this.renderer.render(this.scene,this.camera)}static \u0275fac=function(t){return new(t||n)};static \u0275cmp=So({type:n,selectors:[["app-three-scene"]],viewQuery:function(t,i){if(t&1&&zf(DV,5),t&2){let r;k_(r=U_())&&(i.canvasRef=r.first)}},decls:18,vars:1,consts:[["canvas3d",""],[1,"portfolio-container"],[1,"three-canvas"],[1,"ui-overlay"],[1,"header"],[1,"subtitle"],[1,"instructions"],[1,"project-card",3,"borderColor"],[1,"scroll-indicator"],[1,"project-card"],[1,"close-btn",3,"click"],[1,"card-icon"],[1,"description"],[1,"tech-stack"],[1,"tech-tag"],["target","_blank",1,"btn-project",3,"href"]],template:function(t,i){t&1&&(vn(0,"div",1),Uf(1,"canvas",2,0),vn(3,"div",3)(4,"header",4)(5,"h1"),ii(6,"\u2728 Stefany Mazas"),Tn(),vn(7,"p",5),ii(8,"Desarrolladora Full Stack"),Tn()(),vn(9,"div",6)(10,"span"),ii(11,"\u{1F3AE} Haz clic en los cubos para ver los proyectos"),Tn(),vn(12,"span"),ii(13,"\u{1F5B1}\uFE0F Arrastra para rotar la vista"),Tn()()(),A_(14,IV,14,9,"div",7),vn(15,"div",8)(16,"span"),ii(17,"\u2193"),Tn()()()),t&2&&(ir(14),R_(i.selectedProject()?14:-1))},dependencies:[$f],styles:['@font-face{font-family:Space Mono;font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/spacemono/v17/i7dPIFZifjKcF5UAWdDRYE58RWq7.woff2) format("woff2");unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB}@font-face{font-family:Space Mono;font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/spacemono/v17/i7dPIFZifjKcF5UAWdDRYE98RWq7.woff2) format("woff2");unicode-range:U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Space Mono;font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/spacemono/v17/i7dPIFZifjKcF5UAWdDRYEF8RQ.woff2) format("woff2");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}@font-face{font-family:Space Mono;font-style:normal;font-weight:700;font-display:swap;src:url(https://fonts.gstatic.com/s/spacemono/v17/i7dMIFZifjKcF5UAWdDRaPpZUFqaHjyV.woff2) format("woff2");unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB}@font-face{font-family:Space Mono;font-style:normal;font-weight:700;font-display:swap;src:url(https://fonts.gstatic.com/s/spacemono/v17/i7dMIFZifjKcF5UAWdDRaPpZUFuaHjyV.woff2) format("woff2");unicode-range:U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:Space Mono;font-style:normal;font-weight:700;font-display:swap;src:url(https://fonts.gstatic.com/s/spacemono/v17/i7dMIFZifjKcF5UAWdDRaPpZUFWaHg.woff2) format("woff2");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}.portfolio-container[_ngcontent-%COMP%]{width:100%;height:100vh;position:relative;overflow:hidden;background:linear-gradient(135deg,#0a0a0f,#1a1a2e,#0f0f1a);font-family:Space Mono,monospace}.three-canvas[_ngcontent-%COMP%]{position:absolute;top:0;left:0;width:100%;height:100%;z-index:1}.ui-overlay[_ngcontent-%COMP%]{position:absolute;top:0;left:0;width:100%;height:100%;z-index:10;pointer-events:none}.header[_ngcontent-%COMP%]{position:absolute;top:40px;left:50%;transform:translate(-50%);text-align:center;color:#fff}.header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:2.5rem;margin:0;background:linear-gradient(135deg,#8b5cf6,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;text-shadow:0 0 30px rgba(139,92,246,.5)}.subtitle[_ngcontent-%COMP%]{font-size:1rem;color:#94a3b8;margin-top:8px}.instructions[_ngcontent-%COMP%]{position:absolute;bottom:40px;left:50%;transform:translate(-50%);display:flex;gap:20px;color:#64748b;font-size:.85rem}.project-card[_ngcontent-%COMP%]{position:absolute;top:50%;right:5%;transform:translateY(-50%);width:380px;background:#0f0f19f2;border:2px solid;border-radius:20px;padding:30px;z-index:100;-webkit-backdrop-filter:blur(20px);backdrop-filter:blur(20px);box-shadow:0 25px 50px -12px #00000080;animation:_ngcontent-%COMP%_slideIn .4s ease-out}@keyframes _ngcontent-%COMP%_slideIn{0%{opacity:0;transform:translateY(-50%) translate(50px)}to{opacity:1;transform:translateY(-50%) translate(0)}}.close-btn[_ngcontent-%COMP%]{position:absolute;top:15px;right:15px;background:#ffffff1a;border:none;color:#fff;width:30px;height:30px;border-radius:50%;cursor:pointer;font-size:14px;transition:all .3s}.close-btn[_ngcontent-%COMP%]:hover{background:#fff3;transform:rotate(90deg)}.card-icon[_ngcontent-%COMP%]{width:60px;height:60px;border-radius:15px;display:flex;align-items:center;justify-content:center;font-size:2rem;margin-bottom:20px}.project-card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{color:#fff;font-size:1.5rem;margin-bottom:15px}.description[_ngcontent-%COMP%]{color:#94a3b8;line-height:1.6;margin-bottom:20px}.tech-stack[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:25px}.tech-tag[_ngcontent-%COMP%]{background:#8b5cf633;color:#a78bfa;padding:5px 12px;border-radius:20px;font-size:.75rem}.btn-project[_ngcontent-%COMP%]{display:inline-block;padding:12px 24px;background:linear-gradient(135deg,#8b5cf6,#06b6d4);color:#fff;text-decoration:none;border-radius:10px;font-weight:600;transition:all .3s}.btn-project[_ngcontent-%COMP%]:hover{transform:translateY(-2px);box-shadow:0 10px 30px -10px #8b5cf680}.scroll-indicator[_ngcontent-%COMP%]{position:absolute;bottom:80px;left:50%;transform:translate(-50%);color:#64748b;font-size:1.5rem;animation:_ngcontent-%COMP%_bounce 2s infinite}@keyframes _ngcontent-%COMP%_bounce{0%,to{transform:translate(-50%) translateY(0)}50%{transform:translate(-50%) translateY(10px)}}@media(max-width:768px){.header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:1.8rem}.project-card[_ngcontent-%COMP%]{width:90%;inset:auto 5% 20px;transform:none}.instructions[_ngcontent-%COMP%]{flex-direction:column;gap:5px;text-align:center}}']})};var zD=[{path:"",component:jm},{path:"**",redirectTo:""}];var GD={providers:[Sv(),Ub({eventCoalescing:!0}),wy(zD)]};var Wm=class n{static \u0275fac=function(t){return new(t||n)};static \u0275cmp=So({type:n,selectors:[["app-root"]],decls:1,vars:0,template:function(t,i){t&1&&Aa(0,"router-outlet")},dependencies:[jl],styles:["[_nghost-%COMP%]{display:block;width:100%;height:100vh}"]})};J_(Wm,GD).catch(n=>console.error(n));
