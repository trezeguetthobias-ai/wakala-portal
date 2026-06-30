import{S as oe,p as G,b as v,c as A,d as F,n as L,e as J,i as $,f as ce,g as U,h as he,k as ue,l as ee,m as B,o as te,q as pe,r as u,v as Y,w as V,u as me,a as be,j as e,L as xe,t as P,s as W}from"./index-FkIpNxUv.js";var fe=class extends oe{constructor(t,s){super(),this.options=s,this.#a=t,this.#o=null,this.#n=G(),this.bindMethods(),this.setOptions(s)}#a;#e=void 0;#s=void 0;#t=void 0;#i;#r;#n;#o;#b;#u;#p;#d;#c;#l;#m=new Set;bindMethods(){this.refetch=this.refetch.bind(this)}onSubscribe(){this.listeners.size===1&&(this.#e.addObserver(this),ae(this.#e,this.options)?this.#h():this.updateResult(),this.#v())}onUnsubscribe(){this.hasListeners()||this.destroy()}shouldFetchOnReconnect(){return H(this.#e,this.options,this.options.refetchOnReconnect)}shouldFetchOnWindowFocus(){return H(this.#e,this.options,this.options.refetchOnWindowFocus)}destroy(){this.listeners=new Set,this.#j(),this.#y(),this.#e.removeObserver(this)}setOptions(t){const s=this.options,i=this.#e;if(this.options=this.#a.defaultQueryOptions(t),this.options.enabled!==void 0&&typeof this.options.enabled!="boolean"&&typeof this.options.enabled!="function"&&typeof v(this.options.enabled,this.#e)!="boolean")throw new Error("Expected enabled to be a boolean or a callback that returns a boolean");this.#w(),this.#e.setOptions(this.options),s._defaulted&&!A(this.options,s)&&this.#a.getQueryCache().notify({type:"observerOptionsUpdated",query:this.#e,observer:this});const n=this.hasListeners();n&&se(this.#e,i,this.options,s)&&this.#h(),this.updateResult(),n&&(this.#e!==i||v(this.options.enabled,this.#e)!==v(s.enabled,this.#e)||F(this.options.staleTime,this.#e)!==F(s.staleTime,this.#e))&&this.#x();const r=this.#f();n&&(this.#e!==i||v(this.options.enabled,this.#e)!==v(s.enabled,this.#e)||r!==this.#l)&&this.#g(r)}getOptimisticResult(t){const s=this.#a.getQueryCache().build(this.#a,t),i=this.createResult(s,t);return ve(this,i)&&(this.#t=i,this.#r=this.options,this.#i=this.#e.state),i}getCurrentResult(){return this.#t}trackResult(t,s){return new Proxy(t,{get:(i,n)=>(this.trackProp(n),s?.(n),n==="promise"&&(this.trackProp("data"),!this.options.experimental_prefetchInRender&&this.#n.status==="pending"&&this.#n.reject(new Error("experimental_prefetchInRender feature flag is not enabled"))),Reflect.get(i,n))})}trackProp(t){this.#m.add(t)}getCurrentQuery(){return this.#e}refetch({...t}={}){return this.fetch({...t})}fetchOptimistic(t){const s=this.#a.defaultQueryOptions(t),i=this.#a.getQueryCache().build(this.#a,s);return i.fetch().then(()=>this.createResult(i,s))}fetch(t){return this.#h({...t,cancelRefetch:t.cancelRefetch??!0}).then(()=>(this.updateResult(),this.#t))}#h(t){this.#w();let s=this.#e.fetch(this.options,t);return t?.throwOnError||(s=s.catch(L)),s}#x(){this.#j();const t=F(this.options.staleTime,this.#e);if(J.isServer()||this.#t.isStale||!$(t))return;const i=ce(this.#t.dataUpdatedAt,t)+1;this.#d=U.setTimeout(()=>{this.#t.isStale||this.updateResult()},i)}#f(){return(typeof this.options.refetchInterval=="function"?this.options.refetchInterval(this.#e):this.options.refetchInterval)??!1}#g(t){this.#y(),this.#l=t,!(J.isServer()||v(this.options.enabled,this.#e)===!1||!$(this.#l)||this.#l===0)&&(this.#c=U.setInterval(()=>{(this.options.refetchIntervalInBackground||he.isFocused())&&this.#h()},this.#l))}#v(){this.#x(),this.#g(this.#f())}#j(){this.#d!==void 0&&(U.clearTimeout(this.#d),this.#d=void 0)}#y(){this.#c!==void 0&&(U.clearInterval(this.#c),this.#c=void 0)}createResult(t,s){const i=this.#e,n=this.options,r=this.#t,p=this.#i,c=this.#r,o=t!==i?t.state:this.#s,{state:k}=t;let l={...k},b=!1,d;if(s._optimisticResults){const x=this.hasListeners(),N=!x&&ae(t,s),m=x&&se(t,i,s,n);(N||m)&&(l={...l,...ue(k.data,t.options)}),s._optimisticResults==="isRestoring"&&(l.fetchStatus="idle")}let{error:y,errorUpdatedAt:S,status:j}=l;d=l.data;let g=!1;if(s.placeholderData!==void 0&&d===void 0&&j==="pending"){let x;r?.isPlaceholderData&&s.placeholderData===c?.placeholderData?(x=r.data,g=!0):x=typeof s.placeholderData=="function"?s.placeholderData(this.#p?.state.data,this.#p):s.placeholderData,x!==void 0&&(j="success",d=ee(r?.data,x,s),b=!0)}if(s.select&&d!==void 0&&!g)if(r&&d===p?.data&&s.select===this.#b)d=this.#u;else try{this.#b=s.select,d=s.select(d),d=ee(r?.data,d,s),this.#u=d,this.#o=null}catch(x){this.#o=x}this.#o&&(y=this.#o,d=this.#u,S=Date.now(),j="error");const R=l.fetchStatus==="fetching",I=j==="pending",z=j==="error",O=I&&R,T=d!==void 0,w={status:j,fetchStatus:l.fetchStatus,isPending:I,isSuccess:j==="success",isError:z,isInitialLoading:O,isLoading:O,data:d,dataUpdatedAt:l.dataUpdatedAt,error:y,errorUpdatedAt:S,failureCount:l.fetchFailureCount,failureReason:l.fetchFailureReason,errorUpdateCount:l.errorUpdateCount,isFetched:t.isFetched(),isFetchedAfterMount:l.dataUpdateCount>o.dataUpdateCount||l.errorUpdateCount>o.errorUpdateCount,isFetching:R,isRefetching:R&&!I,isLoadingError:z&&!T,isPaused:l.fetchStatus==="paused",isPlaceholderData:b,isRefetchError:z&&T,isStale:Z(t,s),refetch:this.refetch,promise:this.#n,isEnabled:v(s.enabled,t)!==!1};if(this.options.experimental_prefetchInRender){const x=w.data!==void 0,N=w.status==="error"&&!x,m=M=>{N?M.reject(w.error):x&&M.resolve(w.data)},Q=()=>{const M=this.#n=w.promise=G();m(M)},_=this.#n;switch(_.status){case"pending":t.queryHash===i.queryHash&&m(_);break;case"fulfilled":(N||w.data!==_.value)&&Q();break;case"rejected":(!N||w.error!==_.reason)&&Q();break}}return w}updateResult(){const t=this.#t,s=this.createResult(this.#e,this.options);if(this.#i=this.#e.state,this.#r=this.options,this.#i.data!==void 0&&(this.#p=this.#e),A(s,t))return;this.#t=s;const i=()=>{if(!t)return!0;const{notifyOnChangeProps:n}=this.options,r=typeof n=="function"?n():n;if(r==="all"||!r&&!this.#m.size)return!0;const p=new Set(r??this.#m);return this.options.throwOnError&&p.add("error"),Object.keys(this.#t).some(c=>{const f=c;return this.#t[f]!==t[f]&&p.has(f)})};this.#N({listeners:i()})}#w(){const t=this.#a.getQueryCache().build(this.#a,this.options);if(t===this.#e)return;const s=this.#e;this.#e=t,this.#s=t.state,this.hasListeners()&&(s?.removeObserver(this),t.addObserver(this))}onQueryUpdate(){this.updateResult(),this.hasListeners()&&this.#v()}#N(t){B.batch(()=>{t.listeners&&this.listeners.forEach(s=>{s(this.#t)}),this.#a.getQueryCache().notify({query:this.#e,type:"observerResultsUpdated"})})}};function ge(t,s){return v(s.enabled,t)!==!1&&t.state.data===void 0&&!(t.state.status==="error"&&v(s.retryOnMount,t)===!1)}function ae(t,s){return ge(t,s)||t.state.data!==void 0&&H(t,s,s.refetchOnMount)}function H(t,s,i){if(v(s.enabled,t)!==!1&&F(s.staleTime,t)!=="static"){const n=typeof i=="function"?i(t):i;return n==="always"||n!==!1&&Z(t,s)}return!1}function se(t,s,i,n){return(t!==s||v(n.enabled,t)===!1)&&(!i.suspense||t.state.status!=="error")&&Z(t,i)}function Z(t,s){return v(s.enabled,t)!==!1&&t.isStaleByTime(F(s.staleTime,t))}function ve(t,s){return!A(t.getCurrentResult(),s)}var je=class extends oe{#a;#e=void 0;#s;#t;constructor(t,s){super(),this.#a=t,this.setOptions(s),this.bindMethods(),this.#i()}bindMethods(){this.mutate=this.mutate.bind(this),this.reset=this.reset.bind(this)}setOptions(t){const s=this.options;this.options=this.#a.defaultMutationOptions(t),A(this.options,s)||this.#a.getMutationCache().notify({type:"observerOptionsUpdated",mutation:this.#s,observer:this}),s?.mutationKey&&this.options.mutationKey&&te(s.mutationKey)!==te(this.options.mutationKey)?this.reset():this.#s?.state.status==="pending"&&this.#s.setOptions(this.options)}onUnsubscribe(){this.hasListeners()||this.#s?.removeObserver(this)}onMutationUpdate(t){this.#i(),this.#r(t)}getCurrentResult(){return this.#e}reset(){this.#s?.removeObserver(this),this.#s=void 0,this.#i(),this.#r()}mutate(t,s){return this.#t=s,this.#s?.removeObserver(this),this.#s=this.#a.getMutationCache().build(this.#a,this.options),this.#s.addObserver(this),this.#s.execute(t)}#i(){const t=this.#s?.state??pe();this.#e={...t,isPending:t.status==="pending",isSuccess:t.status==="success",isError:t.status==="error",isIdle:t.status==="idle",mutate:this.mutate,reset:this.reset}}#r(t){B.batch(()=>{if(this.#t&&this.hasListeners()){const s=this.#e.variables,i=this.#e.context,n={client:this.#a,meta:this.options.meta,mutationKey:this.options.mutationKey};if(t?.type==="success"){try{this.#t.onSuccess?.(t.data,s,i,n)}catch(r){Promise.reject(r)}try{this.#t.onSettled?.(t.data,null,s,i,n)}catch(r){Promise.reject(r)}}else if(t?.type==="error"){try{this.#t.onError?.(t.error,s,i,n)}catch(r){Promise.reject(r)}try{this.#t.onSettled?.(void 0,t.error,s,i,n)}catch(r){Promise.reject(r)}}}this.listeners.forEach(s=>{s(this.#e)})})}},le=u.createContext(!1),ye=()=>u.useContext(le);le.Provider;function we(){let t=!1;return{clearReset:()=>{t=!1},reset:()=>{t=!0},isReset:()=>t}}var Ne=u.createContext(we()),ke=()=>u.useContext(Ne),Se=(t,s,i)=>{const n=i?.state.error&&typeof t.throwOnError=="function"?Y(t.throwOnError,[i.state.error,i]):t.throwOnError;(t.suspense||t.experimental_prefetchInRender||n)&&(s.isReset()||(t.retryOnMount=!1))},Ce=t=>{u.useEffect(()=>{t.clearReset()},[t])},Re=({result:t,errorResetBoundary:s,throwOnError:i,query:n,suspense:r})=>t.isError&&!s.isReset()&&!t.isFetching&&n&&(r&&t.data===void 0||Y(i,[t.error,n])),Oe=t=>{if(t.suspense){const i=r=>r==="static"?r:Math.max(r??1e3,1e3),n=t.staleTime;t.staleTime=typeof n=="function"?(...r)=>i(n(...r)):i(n),typeof t.gcTime=="number"&&(t.gcTime=Math.max(t.gcTime,1e3))}},_e=(t,s)=>t.isLoading&&t.isFetching&&!s,Me=(t,s)=>t?.suspense&&s.isPending,ie=(t,s,i)=>s.fetchOptimistic(t).catch(()=>{i.clearReset()});function Ee(t,s,i){const n=ye(),r=ke(),p=V(),c=p.defaultQueryOptions(t);p.getDefaultOptions().queries?._experimental_beforeQuery?.(c);const f=p.getQueryCache().get(c.queryHash),o=t.subscribed!==!1;c._optimisticResults=n?"isRestoring":o?"optimistic":void 0,Oe(c),Se(c,r,f),Ce(r);const k=!p.getQueryCache().get(c.queryHash),[l]=u.useState(()=>new s(p,c)),b=l.getOptimisticResult(c),d=!n&&o;if(u.useSyncExternalStore(u.useCallback(y=>{const S=d?l.subscribe(B.batchCalls(y)):L;return l.updateResult(),S},[l,d]),()=>l.getCurrentResult(),()=>l.getCurrentResult()),u.useEffect(()=>{l.setOptions(c)},[c,l]),Me(c,b))throw ie(c,l,r);if(Re({result:b,errorResetBoundary:r,throwOnError:c.throwOnError,query:f,suspense:c.suspense}))throw b.error;return p.getDefaultOptions().queries?._experimental_afterQuery?.(c,b),c.experimental_prefetchInRender&&!J.isServer()&&_e(b,n)&&(k?ie(c,l,r):f?.promise)?.catch(L).finally(()=>{l.updateResult()}),c.notifyOnChangeProps?b:l.trackResult(b)}function Ie(t,s){return Ee(t,fe)}function re(t,s){const i=V(),[n]=u.useState(()=>new je(i,t));u.useEffect(()=>{n.setOptions(t)},[n,t]);const r=u.useSyncExternalStore(u.useCallback(c=>n.subscribe(B.batchCalls(c)),[n]),()=>n.getCurrentResult(),()=>n.getCurrentResult()),p=u.useCallback((c,f)=>{n.mutate(c,f).catch(L)},[n]);if(r.error&&Y(n.options.throwOnError,[r.error]))throw r.error;return{...r,mutate:p,mutateAsync:r.mutate}}function ne({status:t}){const s={approved:{class:"badge-approved",label:"Imekubaliwa"},rejected:{class:"badge-rejected",label:"Imekataliwa"},processing:{class:"badge-processing",label:"Inafanyiwa Kazi"},pending:{class:"badge-pending",label:"Inasubiri"}},{class:i,label:n}=s[t]||s.pending;return e.jsx("span",{className:`badge ${i}`,children:n})}const ze=async t=>{const{data:s,error:i}=await W.from("applications").select("*").eq("user_id",t).order("created_at",{ascending:!1});if(i)throw i;return s||[]};function De(){const{user:t,loading:s}=me(),i=be(),n=V(),[r,p]=u.useState({status:"",type:"",from:"",to:""}),[c,f]=u.useState(null),[o,k]=u.useState(null),[l,b]=u.useState(null),[d,y]=u.useState({}),[S,j]=u.useState(!1);u.useEffect(()=>{!s&&!t&&i({to:"/login"})},[s,t,i]);const{data:g=[],isFetching:R,refetch:I}=Ie({queryKey:["applications",t?.id],queryFn:()=>ze(t.id),enabled:!!t,staleTime:1e3*60*5,gcTime:1e3*60*30,placeholderData:a=>a}),z=re({mutationFn:async a=>{const{error:h}=await W.from("applications").delete().eq("id",a).eq("user_id",t.id);if(h)throw h;return a},onSuccess:a=>{n.setQueryData(["applications",t?.id],(h=[])=>h.filter(C=>C.id!==a)),P.success("✅ Ombi limefutwa kwa mafanikio!")},onError:a=>{P.error("Imeshindwa kufuta ombi",{description:a?.message||"Jaribu tena baadaye"})}}),O=re({mutationFn:async({id:a,data:h})=>{const C={...h,updated_at:new Date().toISOString()},{error:E}=await W.from("applications").update(C).eq("id",a).eq("user_id",t.id);if(E)throw E;return{id:a,data:h}},onSuccess:({id:a,data:h})=>{n.setQueryData(["applications",t?.id],(C=[])=>C.map(E=>E.id===a?{...E,...h,updated_at:new Date().toISOString()}:E)),P.success("✅ Ombi limebadilishwa kwa mafanikio!"),b(null),y({})},onError:a=>{P.error("Imeshindwa kubadilisha ombi",{description:a?.message||"Jaribu tena baadaye"})}}),T=a=>({wakala:"Sajili Wakala",lipa:"Lipa Namba",voda:"Lipa Voda"})[a]||a,K=()=>{i({to:"/till-wakala"})},w=a=>{const h=a.type==="wakala"?"/till-wakala":a.type==="lipa"?"/lipa-namba":"/voda";sessionStorage.setItem("retry_application",JSON.stringify(a)),P.info("Unaelekezwa kwenye fomu..."),setTimeout(()=>i({to:h}),500)},x=a=>{b(a),y({customer_name:a.customer_name||"",phone:a.phone||"",alt_phone:a.alt_phone||"",email:a.email||"",tin:a.tin||"",id_number:a.id_number||"",business_name:a.business_name||"",business_type:a.business_type||"",ward:a.ward||"",district:a.district||"",region:a.region||"",notes:a.notes||""})},N=()=>{b(null),y({}),j(!1)},m=(a,h)=>{y(C=>({...C,[a]:h}))},Q=async a=>{a.preventDefault(),!(!t||!l)&&(j(!0),await O.mutateAsync({id:l.id,data:d}),j(!1))},_=async a=>{confirm("Je, una hakika unataka kufuta ombi hili?")&&(f(a),await z.mutateAsync(a),f(null))},M=a=>{k(a)},X=()=>{k(null)},q=u.useMemo(()=>g.filter(a=>!(r.status&&a.status!==r.status||r.type&&a.type!==r.type||r.from&&new Date(a.created_at)<new Date(r.from)||r.to&&new Date(a.created_at)>new Date(r.to+"T23:59:59"))),[g,r]),D=u.useMemo(()=>({total:g.length,pending:g.filter(a=>a.status==="pending").length,approved:g.filter(a=>a.status==="approved").length,rejected:g.filter(a=>a.status==="rejected").length,processing:g.filter(a=>a.status==="processing").length}),[g]);if(!t)return null;const de=g.length===0;return e.jsxs("div",{className:"page-wrap",children:[e.jsxs("div",{className:"breadcrumb",children:[e.jsx(xe,{to:"/dashboard",children:"Dashboard"}),e.jsx("span",{className:"crumb-separator",children:"›"}),e.jsx("span",{className:"crumb-active",children:"Fuatilia Maombi"})]}),e.jsxs("div",{className:"page-header",children:[e.jsxs("div",{className:"page-header-left",children:[e.jsx("h2",{children:"📋 Fuatilia Maombi Yako"}),e.jsx("p",{children:"Angalia hali na usimamie maombi yako"})]}),e.jsxs("div",{className:"header-actions",children:[e.jsx("button",{className:"btn-refresh",onClick:()=>I(),disabled:R,children:R?"⏳ Inasasisha...":"🔄 Sasisha"}),e.jsx("button",{className:"btn-new-application",onClick:K,children:"➕ Ombi Mpya"})]})]}),e.jsxs("div",{className:"metric-grid",children:[e.jsxs("div",{className:"metric-card",children:[e.jsx("div",{className:"mc-label",children:"Jumla"}),e.jsx("div",{className:"mc-val",children:D.total}),e.jsx("div",{className:"mc-sub",children:"Maombi yote"})]}),e.jsxs("div",{className:"metric-card pending",children:[e.jsx("div",{className:"mc-label",children:"Yanasubiri"}),e.jsx("div",{className:"mc-val",children:D.pending}),e.jsx("div",{className:"mc-sub",children:"Inahitaji maamuzi"})]}),e.jsxs("div",{className:"metric-card approved",children:[e.jsx("div",{className:"mc-label",children:"Yamekubaliwa"}),e.jsx("div",{className:"mc-val",children:D.approved}),e.jsx("div",{className:"mc-sub",children:"Mafanikio"})]}),e.jsxs("div",{className:"metric-card rejected",children:[e.jsx("div",{className:"mc-label",children:"Yamekataliwa"}),e.jsx("div",{className:"mc-val",children:D.rejected}),e.jsx("div",{className:"mc-sub",children:"Rudia ombi"})]}),e.jsxs("div",{className:"metric-card processing",children:[e.jsx("div",{className:"mc-label",children:"Yanafanyiwa Kazi"}),e.jsx("div",{className:"mc-val",children:D.processing}),e.jsx("div",{className:"mc-sub",children:"Yanakaguliwa"})]})]}),e.jsxs("div",{className:"filters-bar",children:[e.jsxs("div",{className:"filter-group",children:[e.jsx("label",{children:"Hali ya Ombi"}),e.jsxs("select",{value:r.status,onChange:a=>p(h=>({...h,status:a.target.value})),children:[e.jsx("option",{value:"",children:"Zote"}),e.jsx("option",{value:"pending",children:"Inasubiri"}),e.jsx("option",{value:"approved",children:"Imekubaliwa"}),e.jsx("option",{value:"rejected",children:"Imekataliwa"}),e.jsx("option",{value:"processing",children:"Inafanyiwa Kazi"})]})]}),e.jsxs("div",{className:"filter-group",children:[e.jsx("label",{children:"Aina ya Ombi"}),e.jsxs("select",{value:r.type,onChange:a=>p(h=>({...h,type:a.target.value})),children:[e.jsx("option",{value:"",children:"Zote"}),e.jsx("option",{value:"wakala",children:"Sajili Wakala"}),e.jsx("option",{value:"lipa",children:"Lipa Namba"}),e.jsx("option",{value:"voda",children:"Lipa Voda"})]})]}),e.jsxs("div",{className:"filter-group",children:[e.jsx("label",{children:"Tarehe Kuanzia"}),e.jsx("input",{type:"date",value:r.from,onChange:a=>p(h=>({...h,from:a.target.value}))})]}),e.jsxs("div",{className:"filter-group",children:[e.jsx("label",{children:"Tarehe Hadi"}),e.jsx("input",{type:"date",value:r.to,onChange:a=>p(h=>({...h,to:a.target.value}))})]}),e.jsx("button",{className:"clear-filters-btn",onClick:()=>p({status:"",type:"",from:"",to:""}),children:"🔄 Ondoa Vichujio"})]}),e.jsxs("div",{className:"table-card",children:[e.jsxs("div",{className:"table-toolbar",children:[e.jsx("h4",{children:"Orodha ya Maombi"}),e.jsxs("span",{className:"app-count",children:["Maombi ",q.length]})]}),e.jsx("div",{className:"table-scroll-wrap",children:e.jsxs("table",{className:"data-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"#Namba"}),e.jsx("th",{children:"Mteja"}),e.jsx("th",{children:"Simu"}),e.jsx("th",{children:"Aina"}),e.jsx("th",{children:"Tarehe"}),e.jsx("th",{children:"Hali"}),e.jsx("th",{children:"Vitendo"})]})}),e.jsx("tbody",{children:de?e.jsx("tr",{children:e.jsxs("td",{colSpan:7,className:"empty-state",children:[e.jsx("div",{className:"empty-icon",children:"📭"}),e.jsx("p",{children:"Hakuna maombi bado."}),e.jsx("button",{className:"empty-link",onClick:K,children:"Wasilisha Ombi Mpya →"})]})}):q.map(a=>e.jsxs("tr",{children:[e.jsx("td",{className:"ref-cell",children:a.ref_no||a.id.slice(0,8)}),e.jsx("td",{className:"customer-cell",children:e.jsx("div",{className:"customer-info",children:e.jsx("div",{className:"customer-name",children:a.customer_name||a.full_name})})}),e.jsx("td",{children:a.phone}),e.jsx("td",{children:T(a.type)}),e.jsx("td",{children:e.jsxs("div",{className:"date-info",children:[e.jsx("div",{children:new Date(a.created_at).toLocaleDateString("sw-TZ")}),e.jsx("div",{className:"time-info",children:new Date(a.created_at).toLocaleTimeString("sw-TZ",{hour:"2-digit",minute:"2-digit"})})]})}),e.jsx("td",{children:e.jsx(ne,{status:a.status})}),e.jsx("td",{className:"actions-cell",children:e.jsxs("div",{className:"action-buttons",children:[e.jsx("button",{className:"btn-view-action",onClick:()=>M(a),title:"Angalia maelezo",children:"👁️ Tazama"}),(a.status==="pending"||a.status==="rejected")&&e.jsx("button",{className:"btn-edit",onClick:()=>x(a),title:"Badilisha ombi",children:"✏️ Badilisha"}),a.status==="rejected"&&e.jsx("button",{className:"btn-retry",onClick:()=>w(a),title:"Jaribu tena",children:"🔄 Jaribu Tena"}),(a.status==="pending"||a.status==="rejected")&&e.jsx("button",{className:"btn-delete",onClick:()=>_(a.id),disabled:c===a.id,title:"Futa ombi",children:c===a.id?"⏳":"🗑️ Futa"})]})})]},a.id))})]})})]}),o&&e.jsx("div",{className:"modal-overlay",onClick:X,children:e.jsxs("div",{className:"modal-content",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h3",{children:"📄 Maelezo ya Ombi"}),e.jsx("button",{className:"modal-close",onClick:X,children:"✕"})]}),e.jsx("div",{className:"modal-body",children:e.jsxs("div",{className:"detail-grid",children:[e.jsxs("div",{className:"detail-item",children:[e.jsx("label",{children:"Namba ya Ombi"}),e.jsx("span",{children:o.ref_no||o.id.slice(0,8)})]}),e.jsxs("div",{className:"detail-item",children:[e.jsx("label",{children:"Jina Kamili"}),e.jsx("span",{children:o.customer_name||o.full_name})]}),e.jsxs("div",{className:"detail-item",children:[e.jsx("label",{children:"Simu"}),e.jsx("span",{children:o.phone})]}),o.alt_phone&&e.jsxs("div",{className:"detail-item",children:[e.jsx("label",{children:"Simu Mbadala"}),e.jsx("span",{children:o.alt_phone})]}),e.jsxs("div",{className:"detail-item",children:[e.jsx("label",{children:"Aina ya Ombi"}),e.jsx("span",{children:T(o.type)})]}),e.jsxs("div",{className:"detail-item",children:[e.jsx("label",{children:"Hali"}),e.jsx("span",{children:e.jsx(ne,{status:o.status})})]}),o.tin&&e.jsxs("div",{className:"detail-item",children:[e.jsx("label",{children:"TIN"}),e.jsx("span",{children:o.tin})]}),o.id_number&&e.jsxs("div",{className:"detail-item",children:[e.jsx("label",{children:"Namba ya Kitambulisho"}),e.jsx("span",{children:o.id_number})]}),o.business_name&&e.jsxs("div",{className:"detail-item",children:[e.jsx("label",{children:"Jina la Biashara"}),e.jsx("span",{children:o.business_name})]}),o.business_type&&e.jsxs("div",{className:"detail-item",children:[e.jsx("label",{children:"Aina ya Biashara"}),e.jsx("span",{children:o.business_type})]}),o.email&&e.jsxs("div",{className:"detail-item",children:[e.jsx("label",{children:"Barua Pepe"}),e.jsx("span",{children:o.email})]}),(o.ward||o.district||o.region)&&e.jsxs("div",{className:"detail-item full-width",children:[e.jsx("label",{children:"Mahali"}),e.jsx("span",{children:[o.ward,o.district,o.region].filter(Boolean).join(", ")})]}),o.notes&&e.jsxs("div",{className:"detail-item full-width",children:[e.jsx("label",{children:"Maelezo ya Ziada"}),e.jsx("span",{children:o.notes})]}),o.documents&&Object.keys(o.documents).length>0&&e.jsxs("div",{className:"detail-item full-width",children:[e.jsx("label",{children:"Nyaraka"}),e.jsx("div",{className:"documents-list",children:Object.entries(o.documents).map(([a,h])=>typeof h=="string"&&h.startsWith("http")?e.jsxs("a",{href:h,target:"_blank",rel:"noopener noreferrer",className:"doc-link",title:a.replace("_"," "),children:["📄 ",a.replace("_"," ")]},a):null)})]}),e.jsxs("div",{className:"detail-item",children:[e.jsx("label",{children:"Tarehe ya Kuwasilisha"}),e.jsx("span",{children:new Date(o.created_at).toLocaleString("sw-TZ")})]}),o.updated_at&&o.updated_at!==o.created_at&&e.jsxs("div",{className:"detail-item",children:[e.jsx("label",{children:"Ilibadilishwa"}),e.jsx("span",{children:new Date(o.updated_at).toLocaleString("sw-TZ")})]})]})}),e.jsx("div",{className:"modal-footer",children:e.jsx("button",{className:"btn-cancel",onClick:X,children:"Funga"})})]})}),l&&e.jsx("div",{className:"modal-overlay",onClick:N,children:e.jsxs("div",{className:"modal-content modal-edit",onClick:a=>a.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("h3",{children:["✏️ Badilisha Ombi — ",l.ref_no||l.id.slice(0,8)]}),e.jsx("button",{className:"modal-close",onClick:N,children:"✕"})]}),e.jsxs("form",{onSubmit:Q,children:[e.jsxs("div",{className:"modal-body",children:[e.jsxs("div",{className:"edit-grid",children:[e.jsxs("div",{className:"edit-group",children:[e.jsx("label",{children:"Jina Kamili *"}),e.jsx("input",{type:"text",value:d.customer_name||"",onChange:a=>m("customer_name",a.target.value),required:!0,placeholder:"Ingiza jina kamili"})]}),e.jsxs("div",{className:"edit-group",children:[e.jsx("label",{children:"Simu *"}),e.jsx("input",{type:"tel",value:d.phone||"",onChange:a=>m("phone",a.target.value.replace(/\D/g,"").slice(0,10)),required:!0,placeholder:"07XXXXXXXX"})]}),e.jsxs("div",{className:"edit-group",children:[e.jsx("label",{children:"Simu Mbadala"}),e.jsx("input",{type:"tel",value:d.alt_phone||"",onChange:a=>m("alt_phone",a.target.value.replace(/\D/g,"").slice(0,10)),placeholder:"07XXXXXXXX"})]}),e.jsxs("div",{className:"edit-group",children:[e.jsx("label",{children:"Barua Pepe"}),e.jsx("input",{type:"email",value:d.email||"",onChange:a=>m("email",a.target.value),placeholder:"mteja@email.com"})]}),e.jsxs("div",{className:"edit-group",children:[e.jsx("label",{children:"TIN"}),e.jsx("input",{type:"text",value:d.tin||"",onChange:a=>m("tin",a.target.value),placeholder:"TIN number"})]}),e.jsxs("div",{className:"edit-group",children:[e.jsx("label",{children:"Namba ya Kitambulisho"}),e.jsx("input",{type:"text",value:d.id_number||"",onChange:a=>m("id_number",a.target.value),placeholder:"Namba ya kitambulisho"})]}),l.type==="lipa"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"edit-group",children:[e.jsx("label",{children:"Jina la Biashara"}),e.jsx("input",{type:"text",value:d.business_name||"",onChange:a=>m("business_name",a.target.value),placeholder:"Jina la biashara"})]}),e.jsxs("div",{className:"edit-group",children:[e.jsx("label",{children:"Aina ya Biashara"}),e.jsx("input",{type:"text",value:d.business_type||"",onChange:a=>m("business_type",a.target.value),placeholder:"Aina ya biashara"})]}),e.jsxs("div",{className:"edit-group",children:[e.jsx("label",{children:"Wadi"}),e.jsx("input",{type:"text",value:d.ward||"",onChange:a=>m("ward",a.target.value),placeholder:"Wadi"})]}),e.jsxs("div",{className:"edit-group",children:[e.jsx("label",{children:"Wilaya"}),e.jsx("input",{type:"text",value:d.district||"",onChange:a=>m("district",a.target.value),placeholder:"Wilaya"})]}),e.jsxs("div",{className:"edit-group",children:[e.jsx("label",{children:"Mkoa"}),e.jsx("input",{type:"text",value:d.region||"",onChange:a=>m("region",a.target.value),placeholder:"Mkoa"})]})]}),e.jsxs("div",{className:"edit-group full-width",children:[e.jsx("label",{children:"Maelezo ya Ziada"}),e.jsx("textarea",{rows:3,value:d.notes||"",onChange:a=>m("notes",a.target.value),placeholder:"Maelezo yoyote ya ziada..."})]})]}),e.jsx("div",{className:"edit-info",children:e.jsx("p",{className:"edit-note",children:'⚠️ Badilisha taarifa zinazohitaji kusahihishwa. Ombi litawekwa kama "Inasubiri" tena.'})})]}),e.jsxs("div",{className:"modal-footer",children:[e.jsx("button",{type:"button",className:"btn-cancel",onClick:N,children:"Ghairi"}),e.jsx("button",{type:"submit",className:"btn-primary",disabled:S||O.isPending,children:S||O.isPending?"Inahifadhi...":"Hifadhi Mabadiliko"})]})]})]})}),e.jsx("style",{children:`
        .page-wrap {
          max-width: 1400px;
          margin: 0 auto;
          padding: 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
        }

        .breadcrumb {
          font-size: 14px;
          color: #666;
          margin-bottom: 20px;
        }

        .breadcrumb a {
          color: #eb5325;
          text-decoration: none;
        }

        .breadcrumb a:hover {
          text-decoration: underline;
        }

        .crumb-separator {
          margin: 0 8px;
          color: #999;
        }

        .crumb-active {
          color: #1a1a2e;
          font-weight: 600;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 25px;
          flex-wrap: wrap;
          gap: 15px;
        }

        .page-header-left h2 {
          font-size: 24px;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0;
        }

        .page-header-left p {
          font-size: 14px;
          color: #666;
          margin: 5px 0 0 0;
        }

        .header-actions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .btn-refresh {
          padding: 12px 20px;
          background: #e5e7eb;
          color: #1a1a2e;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: 0.2s;
          white-space: nowrap;
        }

        .btn-refresh:hover:not(:disabled) {
          background: #d1d5db;
        }

        .btn-refresh:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn-new-application {
          padding: 12px 24px;
          background: #eb5325;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          transition: 0.2s;
          white-space: nowrap;
        }

        .btn-new-application:hover {
          background: #d44a1f;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(235, 83, 37, 0.3);
        }

        .metric-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 15px;
          margin-bottom: 25px;
        }

        .metric-card {
          background: white;
          padding: 18px 20px;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          text-align: center;
          box-shadow: 0 2px 10px rgba(0,0,0,0.04);
          transition: 0.2s;
        }

        .metric-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(0,0,0,0.08);
        }

        .metric-card.pending {
          border-left: 4px solid #f59e0b;
        }

        .metric-card.approved {
          border-left: 4px solid #10b981;
        }

        .metric-card.rejected {
          border-left: 4px solid #ef4444;
        }

        .metric-card.processing {
          border-left: 4px solid #3b82f6;
        }

        .mc-label {
          font-size: 12px;
          color: #666;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .mc-val {
          font-size: 28px;
          font-weight: 800;
          color: #1a1a2e;
          margin: 4px 0;
        }

        .metric-card.pending .mc-val {
          color: #f59e0b;
        }

        .metric-card.approved .mc-val {
          color: #10b981;
        }

        .metric-card.rejected .mc-val {
          color: #ef4444;
        }

        .metric-card.processing .mc-val {
          color: #3b82f6;
        }

        .mc-sub {
          font-size: 12px;
          color: #999;
        }

        .filters-bar {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
          background: white;
          padding: 20px;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          margin-bottom: 25px;
          align-items: flex-end;
        }

        .filter-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
          min-width: 140px;
          flex: 1;
        }

        .filter-group label {
          font-size: 12px;
          font-weight: 600;
          color: #666;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .filter-group select,
        .filter-group input {
          padding: 8px 12px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          font-size: 13px;
          background: white;
          color: #1a1a2e;
          width: 100%;
        }

        .filter-group select:focus,
        .filter-group input:focus {
          outline: none;
          border-color: #eb5325;
          box-shadow: 0 0 0 3px rgba(235, 83, 37, 0.1);
        }

        .clear-filters-btn {
          padding: 8px 16px;
          background: #e5e7eb;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 13px;
          cursor: pointer;
          transition: 0.2s;
          color: #1a1a2e;
          align-self: flex-end;
          white-space: nowrap;
        }

        .clear-filters-btn:hover {
          background: #d1d5db;
        }

        .table-card {
          background: white;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0,0,0,0.04);
        }

        .table-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 18px 20px;
          border-bottom: 1px solid #e5e7eb;
          flex-wrap: wrap;
          gap: 10px;
        }

        .table-toolbar h4 {
          font-size: 16px;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0;
        }

        .app-count {
          font-size: 13px;
          color: #666;
          background: #f0f0f0;
          padding: 4px 12px;
          border-radius: 20px;
        }

        .table-scroll-wrap {
          overflow-x: auto;
          padding: 0 4px;
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
          min-width: 800px;
        }

        .data-table thead {
          background: #f8f9fa;
        }

        .data-table th {
          padding: 12px 16px;
          text-align: left;
          font-weight: 600;
          color: #666;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          white-space: nowrap;
        }

        .data-table td {
          padding: 12px 16px;
          border-bottom: 1px solid #f0f0f0;
          vertical-align: middle;
        }

        .data-table tbody tr:hover {
          background: #f8f9fa;
        }

        .ref-cell {
          font-weight: 700;
          color: #1a1a2e;
          font-size: 13px;
        }

        .customer-cell {
          font-weight: 500;
          color: #1a1a2e;
        }

        .customer-info {
          display: flex;
          flex-direction: column;
        }

        .customer-name {
          font-weight: 600;
        }

        .date-info {
          display: flex;
          flex-direction: column;
        }

        .time-info {
          font-size: 12px;
          color: #666;
        }

        .badge {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
          display: inline-block;
        }

        .badge-pending {
          background: #fef3c7;
          color: #d97706;
        }

        .badge-approved {
          background: #d1fae5;
          color: #059669;
        }

        .badge-rejected {
          background: #fee2e2;
          color: #dc2626;
        }

        .badge-processing {
          background: #dbeafe;
          color: #2563eb;
        }

        .actions-cell {
          text-align: center;
        }

        .action-buttons {
          display: flex;
          gap: 8px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .action-buttons button {
          padding: 8px 16px;
          border: none;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: 0.2s;
          white-space: nowrap;
          min-width: 80px;
        }

        .action-buttons button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .btn-view-action {
          background: #e5e7eb;
          color: #1a1a2e;
        }

        .btn-view-action:hover:not(:disabled) {
          background: #d1d5db;
          transform: scale(1.05);
        }

        .btn-edit {
          background: #dbeafe;
          color: #1e40af;
        }

        .btn-edit:hover:not(:disabled) {
          background: #bfdbfe;
          transform: scale(1.05);
        }

        .btn-retry {
          background: #dbeafe;
          color: #1e40af;
        }

        .btn-retry:hover:not(:disabled) {
          background: #bfdbfe;
          transform: scale(1.05);
        }

        .btn-delete {
          background: #fee2e2;
          color: #dc2626;
        }

        .btn-delete:hover:not(:disabled) {
          background: #fecaca;
          transform: scale(1.05);
        }

        .empty-state {
          text-align: center;
          padding: 40px 20px !important;
        }

        .empty-icon {
          font-size: 48px;
          margin-bottom: 10px;
        }

        .empty-state p {
          font-size: 14px;
          color: #666;
          margin: 0 0 10px 0;
        }

        .empty-link {
          display: inline-block;
          padding: 8px 20px;
          background: #eb5325;
          color: white;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: 0.2s;
          text-decoration: none;
        }

        .empty-link:hover {
          background: #d44a1f;
          transform: translateY(-2px);
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.2s ease;
          padding: 20px;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-content {
          background: white;
          border-radius: 16px;
          max-width: 700px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          animation: slideUp 0.3s ease;
        }

        .modal-edit {
          max-width: 750px;
        }

        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          border-bottom: 1px solid #e5e7eb;
          position: sticky;
          top: 0;
          background: white;
          border-radius: 16px 16px 0 0;
          z-index: 1;
        }

        .modal-header h3 {
          font-size: 18px;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0;
        }

        .modal-close {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #999;
          transition: 0.2s;
          padding: 0 4px;
        }

        .modal-close:hover {
          color: #1a1a2e;
        }

        .modal-body {
          padding: 24px;
        }

        .detail-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .detail-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .detail-item.full-width {
          grid-column: 1 / -1;
        }

        .detail-item label {
          font-size: 12px;
          font-weight: 600;
          color: #666;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .detail-item span {
          font-size: 14px;
          color: #1a1a2e;
          font-weight: 500;
          word-break: break-word;
        }

        .documents-list {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-top: 4px;
        }

        .doc-link {
          padding: 4px 12px;
          background: #f0f0f0;
          border-radius: 4px;
          font-size: 13px;
          color: #1a1a2e;
          text-decoration: none;
          transition: 0.2s;
        }

        .doc-link:hover {
          background: #e5e7eb;
        }

        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          padding: 16px 24px;
          border-top: 1px solid #e5e7eb;
          position: sticky;
          bottom: 0;
          background: white;
          border-radius: 0 0 16px 16px;
          flex-wrap: wrap;
        }

        .btn-cancel {
          padding: 10px 24px;
          background: #e5e7eb;
          color: #1a1a2e;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: 0.2s;
        }

        .btn-cancel:hover {
          background: #d1d5db;
        }

        .btn-primary {
          padding: 10px 24px;
          background: #eb5325;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          transition: 0.2s;
        }

        .btn-primary:hover:not(:disabled) {
          background: #d44a1f;
        }

        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .edit-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .edit-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .edit-group.full-width {
          grid-column: 1 / -1;
        }

        .edit-group label {
          font-size: 13px;
          font-weight: 600;
          color: #475569;
        }

        .edit-group input,
        .edit-group textarea {
          padding: 10px 12px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          font-size: 14px;
          font-family: inherit;
          transition: 0.2s;
          width: 100%;
          box-sizing: border-box;
        }

        .edit-group input:focus,
        .edit-group textarea:focus {
          outline: none;
          border-color: #eb5325;
          box-shadow: 0 0 0 3px rgba(235, 83, 37, 0.1);
        }

        .edit-info {
          margin-top: 16px;
          padding: 12px 16px;
          background: #fef3c7;
          border-radius: 8px;
          border-left: 4px solid #f59e0b;
          grid-column: 1 / -1;
        }

        .edit-note {
          font-size: 13px;
          color: #1a1a2e;
          margin: 0;
        }

        @media (max-width: 1024px) {
          .metric-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 768px) {
          .page-header {
            flex-direction: column;
            align-items: stretch;
          }

          .btn-new-application {
            width: 100%;
            text-align: center;
          }

          .metric-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }

          .filters-bar {
            flex-direction: column;
            gap: 10px;
          }

          .filter-group {
            min-width: auto;
            width: 100%;
          }

          .clear-filters-btn {
            width: 100%;
            text-align: center;
          }

          .data-table {
            font-size: 12px;
            min-width: 600px;
          }

          .data-table th,
          .data-table td {
            padding: 8px 10px;
          }

          .action-buttons {
            flex-wrap: wrap;
            gap: 4px;
          }

          .action-buttons button {
            padding: 6px 12px;
            font-size: 11px;
            min-width: 60px;
          }

          .detail-grid {
            grid-template-columns: 1fr;
          }

          .edit-grid {
            grid-template-columns: 1fr;
          }

          .edit-group.full-width {
            grid-column: 1;
          }

          .modal-content {
            max-width: 100%;
            margin: 10px;
            max-height: 95vh;
          }

          .header-actions {
            width: 100%;
          }

          .btn-refresh {
            flex: 1;
            text-align: center;
          }
        }

        @media (max-width: 480px) {
          .metric-grid {
            grid-template-columns: 1fr 1fr;
            gap: 8px;
          }

          .metric-card {
            padding: 12px 10px;
          }

          .mc-val {
            font-size: 20px;
          }

          .page-wrap {
            padding: 10px;
          }

          .table-toolbar {
            flex-direction: column;
            align-items: stretch;
            text-align: center;
          }
        }
      `})]})}export{De as component};
