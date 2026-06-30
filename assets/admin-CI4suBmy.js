import{s as U,u as G,a as Z,r as b,t as u,j as e,L}from"./index-FkIpNxUv.js";import{E as V,t as q,f as Q,g as X,s as ee,A as ae,d as te}from"./jspdf.es.min-DxHzNxfz.js";function ie(s){const a=new V("p","mm","a4"),o=a.internal.pageSize.getWidth(),l=a.internal.pageSize.getHeight(),n=20;let i=20;const d=r=>{i+r>l-20&&(a.addPage(),i=20)};a.setFontSize(22),a.setFont("helvetica","bold"),a.setTextColor("#1a1a2e"),a.text("GJ GENERAL TRADERS COMPANY LIMITED",o/2,i+10,{align:"center"}),i+=12,a.setFontSize(12),a.setFont("helvetica","normal"),a.setTextColor("#666"),a.text("P.O. Box 1234, Dar es Salaam, Tanzania",o/2,i,{align:"center"}),i+=6,a.text("Tel: +255 762 000 000 | Email: info@gjgeneral.co.tz",o/2,i,{align:"center"}),i+=8,a.setDrawColor("#eb5325"),a.setLineWidth(1),a.line(n,i,o-n,i),i+=10,a.setFontSize(20),a.setFont("helvetica","bold"),a.setTextColor("#eb5325"),a.text("MKATABA WA USAJILI",o/2,i,{align:"center"}),i+=8,a.setFontSize(14),a.setFont("helvetica","bold"),a.setTextColor("#1a1a2e");const _={wakala:"HUDUMA YA WAKALA WA HALOPESA",lipa:"HUDUMA YA LIPA NAMBA",voda:"HUDUMA YA LIPA YA VODA"};a.text(_[s.type]||"HUDUMA YA KIBIASHARA",o/2,i,{align:"center"}),i+=12,a.setDrawColor("#e5e7eb"),a.setFillColor("#f8f9fa"),a.roundedRect(n,i,o-n*2,20,3,3,"FD"),a.setFontSize(10),a.setFont("helvetica","bold"),a.setTextColor("#1a1a2e"),a.text(`REF NO: ${s.ref_no||"N/A"}`,n+10,i+12),a.text(`TAREHE: ${s.date||new Date().toISOString().split("T")[0]}`,o-n-60,i+12),i+=28,a.setFontSize(14),a.setFont("helvetica","bold"),a.setTextColor("#eb5325"),a.text("SEHEMU YA 1: MAELEZO YA MTEJA",n,i),i+=8,a.setDrawColor("#e5e7eb"),a.setLineWidth(.3),a.line(n,i,o-n,i),i+=6,a.setFontSize(10),a.setFont("helvetica","normal"),a.setTextColor("#333"),[["Jina Kamili la Mteja:",s.customer_name||"N/A"],["Namba ya Simu:",s.phone||"N/A"],["Namba Mbadala ya Simu:",s.alt_phone||"N/A"],["Namba ya TIN:",s.tin||"N/A"],["Aina ya Kitambulisho:",s.id_type||"NIDA"],["Namba ya Kitambulisho:",s.id_number||"N/A"]].forEach(([r,f])=>{a.setFont("helvetica","bold"),a.text(r,n,i),a.setFont("helvetica","normal"),a.text(String(f),n+65,i),i+=7}),i+=5,(s.type==="lipa"||s.business_name||s.region)&&(d(80),a.setFontSize(14),a.setFont("helvetica","bold"),a.setTextColor("#eb5325"),a.text("SEHEMU YA 2: MAELEZO YA BIASHARA NA MAHALI",n,i),i+=8,a.setDrawColor("#e5e7eb"),a.setLineWidth(.3),a.line(n,i,o-n,i),i+=6,a.setFontSize(10),a.setFont("helvetica","normal"),a.setTextColor("#333"),[["Jina la Biashara:",s.business_name||"N/A"],["Aina ya Biashara:",s.business_type||"N/A"],["Kundi (Category):",s.category?s.category.replace("_"," "):"N/A"],["Barua Pepe (Email):",s.email||"N/A"],["Wadi / Kata:",s.ward||"N/A"],["Wilaya:",s.district||"N/A"],["Mkoa:",s.region||"N/A"]].forEach(([f,c])=>{a.setFont("helvetica","bold"),a.text(f,n,i),a.setFont("helvetica","normal"),a.text(String(c),n+60,i),i+=7}),i+=5),d(120),a.setFontSize(14),a.setFont("helvetica","bold"),a.setTextColor("#eb5325"),a.text("SEHEMU YA 3: SHERIA NA MASHARTI",n,i),i+=8,a.setDrawColor("#e5e7eb"),a.setLineWidth(.3),a.line(n,i,o-n,i),i+=6,a.setFontSize(9),a.setFont("helvetica","normal"),a.setTextColor("#444");const w=["1. UTANGULIZI: Mkataba huu ni makubaliano ya kisheria kati ya GJ General Traders Company Limited na mteja.","2. USAHIHI WA TAARIFA: Mteja anathibitisha taarifa zote ni sahihi na za kweli.","3. MATUMIZI YA HUDUMA: Huduma zitatumika kwa shughuli halali za kibiashara tu.","4. KUFUATA SHERIA: Mteja anakubali kufuata sheria na kanuni zote za nchi.","5. ULINZI WA TAARIFA: Kampuni itahifadhi na kulinda taarifa za mteja.","6. WAJIBU WA MTEJA: Mteja anawajibika kwa matumizi yote ya huduma.","7. USITISHAJI WA HUDUMA: Kampuni ina haki ya kusitisha huduma iwapo sheria zitakiukwa.","8. MAREJELEO NA MALIPO: Malipo yote lazima yafanywe kwa wakati.","9. MABADILIKO YA MASHARTI: Kampuni ina haki ya kubadilisha masharti kwa notisi ya siku 14."];s.category==="COMPANY_LIMITED"&&w.push("10. KIPENGELE CHA KAMPUNI: Kampuni Limited inapaswa kuwasilisha nyaraka za BRELA."),w.forEach(r=>{a.splitTextToSize(r,o-n*2).forEach(c=>{d(5),a.text(c,n,i),i+=5})}),i+=5,d(50),a.setFontSize(14),a.setFont("helvetica","bold"),a.setTextColor("#eb5325"),a.text("SEHEMU YA 4: SAINI",n,i),i+=8,a.setDrawColor("#e5e7eb"),a.setLineWidth(.3),a.line(n,i,o-n,i),i+=10,a.setFontSize(10),a.setFont("helvetica","normal"),a.setTextColor("#333");const m=i+30;if(a.setDrawColor("#ccc"),a.setLineWidth(.5),a.rect(n,m-10,80,45),a.rect(n+100,m-10,80,45),a.setFont("helvetica","bold"),a.text("Saini ya Mteja:",n+5,m+5),a.text("Saini ya Kampuni:",n+105,m+5),s.signature_data)try{let r=s.signature_data;r.startsWith("data:image")||(r=`data:image/png;base64,${r}`),a.addImage(r,"PNG",n+5,m+10,70,25)}catch{a.setFont("helvetica","italic"),a.setTextColor("#999"),a.text("[Saini imesainiwa]",n+5,m+25)}else a.setFont("helvetica","italic"),a.setTextColor("#999"),a.text("[Saini haipo]",n+5,m+25);a.setFont("helvetica","italic"),a.setTextColor("#999"),a.text("[Saini ya Kampuni]",n+105,m+25),a.setFont("helvetica","normal"),a.setTextColor("#333"),a.text(`Tarehe: ${s.date||new Date().toISOString().split("T")[0]}`,n+5,m+42),a.text(`Tarehe: ${s.date||new Date().toISOString().split("T")[0]}`,n+105,m+42),i+=60,s.documents&&Object.keys(s.documents).length>0&&["id_photo","tin_photo","business_store_photo"].filter(c=>s.documents?.[c]).forEach(c=>{const h=s.documents?.[c];if(h&&h.data){a.addPage(),i=20,a.setFontSize(14),a.setFont("helvetica","bold"),a.setTextColor("#eb5325");const k={id_photo:"KIAMBATANISHO A: PICHA YA KITAMBULISHO",tin_photo:"KIAMBATANISHO B: PICHA YA TIN",business_store_photo:"KIAMBATANISHO C: PICHA YA DUKA"};a.text(k[c]||`KIAMBATANISHO: ${h.name.toUpperCase()}`,n,i),i+=8,a.setDrawColor("#e5e7eb"),a.setLineWidth(.3),a.line(n,i,o-n,i),i+=10;try{let j="JPEG";h.type.includes("png")&&(j="PNG"),h.type.includes("gif")&&(j="GIF");const N=o-n*2,g=150;a.addImage(`data:${h.type};base64,${h.data}`,j,n,i,N,g),i+=g+10,a.setFontSize(9),a.setFont("helvetica","italic"),a.setTextColor("#666"),a.text(`Jina: ${h.name} | Ukubwa: ${(h.size/1024).toFixed(1)} KB`,n,i)}catch{a.setFont("helvetica","italic"),a.setTextColor("#999"),a.text("[Faili hili halikuweza kuonyeshwa]",n,i+20)}}});const x=a.internal.pages.length-1;for(let r=1;r<=x;r++)a.setPage(r),a.setDrawColor("#e5e7eb"),a.setLineWidth(.2),a.line(n,l-18,o-n,l-18),a.setFontSize(8),a.setFont("helvetica","italic"),a.setTextColor("#999"),a.text("Mkataba huu umezalishwa kiotomatiki na ni mali ya GJ General Traders Company Limited.",o/2,l-10,{align:"center"}),a.text(`Ukurasa ${r} wa ${x}  |  Ref: ${s.ref_no}`,o/2,l-5,{align:"center"});return a}const ne="contracts";async function se(s){try{const{data:a,error:o}=await U.storage.from(ne).download(s);if(o||!a)return null;const l=await a.arrayBuffer();return new Uint8Array(l)}catch(a){return console.error("Error fetching stored contract:",a),null}}async function B(s){if(s.contract_path){const l=await se(s.contract_path);if(l)return l}const o=ie(s).output("arraybuffer");return new Uint8Array(o)}function oe(s,a){const o=new ArrayBuffer(s.length);new Uint8Array(o).set(s);const n=new Blob([o],{type:"application/pdf"}),i=URL.createObjectURL(n),d=document.createElement("a");d.href=i,d.download=a,document.body.appendChild(d),d.click(),d.remove(),setTimeout(()=>URL.revokeObjectURL(i),4e3)}async function re(s){const a=await B(s);oe(a,`Mkataba-${s.ref_no}.pdf`)}async function le(s){const a=await B(s),o=new ArrayBuffer(a.length);new Uint8Array(o).set(a);const n=new Blob([o],{type:"application/pdf"}),i=URL.createObjectURL(n);window.open(i,"_blank"),setTimeout(()=>URL.revokeObjectURL(i),6e4)}function me(){const{user:s,isAdmin:a,loading:o,signOut:l}=G(),n=Z(),[i,d]=b.useState([]),[_,z]=b.useState(!0),[w,m]=b.useState("pending"),[x,r]=b.useState(null),[f,c]=b.useState(null),[h,k]=b.useState(""),[j,N]=b.useState(""),[g,D]=b.useState(!1),[O,Y]=b.useState(""),[H,S]=b.useState(null);b.useEffect(()=>{if(!o){if(!s){n({to:"/login"});return}if(!a){u.error("Hauna ruhusa ya kufikia ukurasa huu"),n({to:"/dashboard"});return}}},[o,s,a,n]);const T=async()=>{if(!(!s||!a)){z(!0),S(null);try{const{data:t,error:p}=await U.from("applications").select("*").order("created_at",{ascending:!1});if(p){S(p.message),u.error("Imeshindwa kupakia maombi"),d([]);return}d(t||[])}catch(t){S(t.message),u.error("Hitilafu imetokea"),d([])}finally{z(!1)}}};b.useEffect(()=>{s&&a&&T()},[s,a]);const I=()=>{T(),u.info("Inasasisha data...")},K=async()=>{try{await l(),u.success("Umetoka kwenye mfumo"),n({to:"/login"})}catch{u.error("Imeshindwa kutoka")}},v=b.useMemo(()=>({total:i.length,pending:i.filter(t=>t.status==="pending").length,approved:i.filter(t=>t.status==="approved").length,rejected:i.filter(t=>t.status==="rejected").length,processing:i.filter(t=>t.status==="processing").length,users:new Set(i.map(t=>t.user_id)).size}),[i]),A=async(t,p,y)=>{const E={status:p};y?.till_code!==void 0&&(E.till_code=y.till_code||null),y?.admin_notes!==void 0&&(E.admin_notes=y.admin_notes||null),D(!0);try{const{error:C}=await U.from("applications").update(E).eq("id",t);if(C)throw C;const J={approved:"Ombi limekubaliwa kwa mafanikio!",rejected:"Ombi limekataliwa",processing:"Ombi linaendelea kushughulikiwa"};u.success(J[p]),await T(),c(null),r(null)}catch(C){u.error("Imeshindwa: "+C.message)}finally{D(!1)}},F=t=>{c(t),k(t.till_code||""),N(t.admin_notes||"")},W=async()=>{if(!f)return;const t=h.trim();if(!t){u.error("Tafadhali ingiza Till Code");return}await A(f.id,"approved",{till_code:t,admin_notes:j.trim()||null})},P=t=>{if(!t.contract_path){u.info("Mkataba haujazalishwa bado");return}const p={ref_no:t.ref_no||t.id.slice(0,8),date:new Date(t.created_at).toISOString().split("T")[0],customer_name:t.customer_name||"",phone:t.phone||"",alt_phone:t.alt_phone||void 0,tin:t.tin||void 0,id_type:t.id_type||"NIDA",id_number:t.id_number||"",business_name:t.business_name||void 0,business_type:t.business_type||void 0,email:t.email||void 0,ward:t.ward||void 0,district:t.district||void 0,region:t.region||void 0,type:t.type,category:t.category||void 0,signature_data:t.signature_data||void 0,contract_path:t.contract_path};le(p)},R=t=>{if(!t.contract_path){u.info("Mkataba haujazalishwa bado");return}const p={ref_no:t.ref_no||t.id.slice(0,8),date:new Date(t.created_at).toISOString().split("T")[0],customer_name:t.customer_name||"",phone:t.phone||"",alt_phone:t.alt_phone||void 0,tin:t.tin||void 0,id_type:t.id_type||"NIDA",id_number:t.id_number||"",business_name:t.business_name||void 0,business_type:t.business_type||void 0,email:t.email||void 0,ward:t.ward||void 0,district:t.district||void 0,region:t.region||void 0,type:t.type,category:t.category||void 0,signature_data:t.signature_data||void 0,contract_path:t.contract_path};re(p)};if(o)return e.jsxs("div",{className:"admin-loading",children:[e.jsx("div",{className:"loading-spinner"}),e.jsx("p",{children:"Inapakia..."})]});if(!s||!a)return e.jsx("div",{className:"admin-container",children:e.jsxs("div",{className:"info-box error",children:[e.jsx("strong",{children:"⚠️ Hauna ruhusa ya kufikia ukurasa huu."}),e.jsx(L,{to:"/dashboard",className:"btn-primary",style:{display:"inline-block",marginTop:"15px",padding:"10px 20px"},children:"Rudi Dashboard"})]})});const $=t=>{const p=O.trim().toLowerCase();return p?[t.ref_no,t.customer_name,t.phone,t.tin,t.id_number,t.business_name].filter(Boolean).some(y=>String(y).toLowerCase().includes(p)):!0},M=(w==="pending"?i.filter(t=>t.status==="pending"):i).filter($);return e.jsxs("div",{className:"admin-layout",children:[e.jsxs("aside",{className:"admin-sidebar",children:[e.jsxs("div",{className:"sidebar-brand",children:[e.jsx("span",{className:"brand-icon",children:"⚡"}),e.jsx("span",{className:"brand-text",children:"Admin"})]}),e.jsxs("nav",{className:"sidebar-nav",children:[e.jsxs("button",{className:`sidebar-link ${w==="all"?"active":""}`,onClick:()=>m("all"),children:[e.jsx("span",{className:"link-icon",children:"📊"})," Muhtasari"]}),e.jsxs("button",{className:`sidebar-link ${w==="pending"?"active":""}`,onClick:()=>m("pending"),children:[e.jsx("span",{className:"link-icon",children:"⏳"})," Yanasubiri (",v.pending,")"]}),e.jsxs("button",{className:"sidebar-link",onClick:I,children:[e.jsx("span",{className:"link-icon",children:"🔄"})," Onyesha Upya"]}),e.jsxs(L,{to:"/reports",className:"sidebar-link",children:[e.jsx("span",{className:"link-icon",children:"📈"})," Ripoti"]}),e.jsxs(L,{to:"/mipangilio",className:"sidebar-link",children:[e.jsx("span",{className:"link-icon",children:"⚙️"})," Mipangilio"]})]}),e.jsx("div",{className:"sidebar-footer",children:e.jsx("button",{onClick:K,className:"btn-sidebar-logout",children:"🚪 Ondoka"})})]}),e.jsxs("main",{className:"admin-main",children:[e.jsxs("div",{className:"admin-header",children:[e.jsxs("div",{children:[e.jsx("h1",{children:"Dashibodi ya Msimamizi"}),e.jsx("p",{className:"admin-subtitle",children:"Simamia maombi ya watumiaji wote"})]}),e.jsxs("div",{className:"admin-actions-top",children:[e.jsx("button",{className:"btn-refresh",onClick:I,children:"🔄 Onyesha Upya"}),e.jsx("button",{onClick:K,className:"btn-mobile-logout-top",children:"🚪 Ondoka"})]})]}),e.jsxs("div",{className:"stats-grid",children:[e.jsxs("div",{className:"stat-card",children:[e.jsx("div",{className:"stat-icon",children:"📋"}),e.jsxs("div",{children:[e.jsx("div",{className:"stat-number",children:v.total}),e.jsx("div",{className:"stat-label",children:"Jumla ya Maombi"})]})]}),e.jsxs("div",{className:"stat-card pending",children:[e.jsx("div",{className:"stat-icon",children:"⏳"}),e.jsxs("div",{children:[e.jsx("div",{className:"stat-number",children:v.pending}),e.jsx("div",{className:"stat-label",children:"Yanasubiri"})]})]}),e.jsxs("div",{className:"stat-card approved",children:[e.jsx("div",{className:"stat-icon",children:"✅"}),e.jsxs("div",{children:[e.jsx("div",{className:"stat-number",children:v.approved}),e.jsx("div",{className:"stat-label",children:"Yamekubaliwa"})]})]}),e.jsxs("div",{className:"stat-card rejected",children:[e.jsx("div",{className:"stat-icon",children:"❌"}),e.jsxs("div",{children:[e.jsx("div",{className:"stat-number",children:v.rejected}),e.jsx("div",{className:"stat-label",children:"Yamekataliwa"})]})]}),e.jsxs("div",{className:"stat-card processing",children:[e.jsx("div",{className:"stat-icon",children:"🔄"}),e.jsxs("div",{children:[e.jsx("div",{className:"stat-number",children:v.processing}),e.jsx("div",{className:"stat-label",children:"Yanashughulikiwa"})]})]}),e.jsxs("div",{className:"stat-card users",children:[e.jsx("div",{className:"stat-icon",children:"👥"}),e.jsxs("div",{children:[e.jsx("div",{className:"stat-number",children:v.users}),e.jsx("div",{className:"stat-label",children:"Watumiaji"})]})]})]}),e.jsxs("div",{className:"search-bar",children:[e.jsx("input",{type:"search",className:"search-input",placeholder:"🔍 Tafuta kwa jina, simu, TIN, au namba ya ombi...",value:O,onChange:t=>Y(t.target.value)}),e.jsxs("span",{className:"search-count",children:["Maombi ",M.length]})]}),e.jsx("div",{className:"table-wrapper",children:_?e.jsxs("div",{className:"loading-state",children:[e.jsx("div",{className:"loading-spinner"}),e.jsx("p",{children:"Inapakia maombi..."})]}):H?e.jsxs("div",{className:"error-state",children:[e.jsxs("p",{children:["⚠️ ",H]}),e.jsx("button",{className:"btn-primary",onClick:I,children:"Jaribu Tena"})]}):e.jsx("div",{className:"table-scroll",children:e.jsxs("table",{className:"admin-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Namba"}),e.jsx("th",{children:"Mteja"}),e.jsx("th",{children:"Aina"}),e.jsx("th",{children:"Simu"}),e.jsx("th",{children:"Kamisheni"}),e.jsx("th",{children:"Till Code"}),e.jsx("th",{children:"Hali"}),e.jsx("th",{children:"Mkataba"}),e.jsx("th",{children:"Vitendo"})]})}),e.jsxs("tbody",{children:[M.length===0&&e.jsx("tr",{children:e.jsxs("td",{colSpan:9,className:"empty-state",children:[e.jsx("div",{className:"empty-icon",children:"📭"}),e.jsx("p",{children:"Hakuna maombi yanayolingana na vichujio vyako."})]})}),M.map(t=>e.jsxs("tr",{children:[e.jsx("td",{className:"ref-cell",children:t.ref_no||t.id.slice(0,8)}),e.jsx("td",{className:"customer-cell",children:t.customer_name}),e.jsx("td",{children:q(t.type)}),e.jsx("td",{children:t.phone}),e.jsx("td",{className:"commission-cell",children:Q(X(t.type))}),e.jsx("td",{children:t.till_code||"—"}),e.jsx("td",{children:e.jsx("span",{className:`status-badge ${t.status}`,children:ee(t.status)})}),e.jsx("td",{children:t.contract_path?e.jsxs("div",{className:"contract-actions",children:[e.jsx("button",{className:"icon-btn",onClick:()=>P(t),title:"Fungua Mkataba",children:"📄 Fungua"}),e.jsx("button",{className:"icon-btn",onClick:()=>R(t),title:"Pakua Mkataba",children:"⬇️ Pakua"})]}):e.jsx("span",{className:"text-muted",children:"—"})}),e.jsx("td",{children:e.jsxs("div",{className:"action-buttons",children:[e.jsx("button",{className:"btn-view",onClick:()=>r(t),children:"Tazama"}),t.status==="pending"&&e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"btn-approve",onClick:()=>F(t),disabled:g,children:"Kubali"}),e.jsx("button",{className:"btn-process",onClick:()=>A(t.id,"processing"),disabled:g,children:"Shughulikia"}),e.jsx("button",{className:"btn-reject",onClick:()=>A(t.id,"rejected"),disabled:g,children:"Kataa"})]}),t.status==="processing"&&e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"btn-approve",onClick:()=>F(t),disabled:g,children:"Kubali"}),e.jsx("button",{className:"btn-reject",onClick:()=>A(t.id,"rejected"),disabled:g,children:"Kataa"})]})]})})]},t.id))]})]})})})]}),x&&e.jsx("div",{className:"modal-overlay",onClick:()=>r(null),children:e.jsxs("div",{className:"modal-content",onClick:t=>t.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("h3",{children:["📋 Taarifa za Ombi — ",x.ref_no]}),e.jsx("button",{className:"modal-close",onClick:()=>r(null),children:"✕"})]}),e.jsx("div",{className:"modal-body",children:ae.map(t=>e.jsxs("div",{className:"detail-row",children:[e.jsx("span",{className:"detail-label",children:t.label}),e.jsx("span",{className:"detail-value",children:te(x,t)||"—"})]},t.key))}),e.jsxs("div",{className:"modal-footer",children:[x.contract_path&&e.jsxs(e.Fragment,{children:[e.jsx("button",{className:"btn-secondary",onClick:()=>P(x),children:"📄 Fungua Mkataba"}),e.jsx("button",{className:"btn-secondary",onClick:()=>R(x),children:"⬇️ Pakua Mkataba"})]}),e.jsx("button",{className:"btn-secondary",onClick:()=>r(null),children:"Funga"}),x.status==="pending"&&e.jsx("button",{className:"btn-primary",onClick:()=>F(x),children:"Kubali Ombi"})]})]})}),f&&e.jsx("div",{className:"modal-overlay",onClick:()=>c(null),children:e.jsxs("div",{className:"modal-content modal-sm",onClick:t=>t.stopPropagation(),children:[e.jsxs("div",{className:"modal-header",children:[e.jsxs("h3",{children:["✅ Kubali Ombi — ",f.ref_no]}),e.jsx("button",{className:"modal-close",onClick:()=>c(null),children:"✕"})]}),e.jsxs("div",{className:"modal-body",children:[e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Till Code *"}),e.jsx("input",{className:"form-input",value:h,onChange:t=>k(t.target.value),placeholder:"Ingiza Till Code...",autoFocus:!0}),e.jsx("span",{className:"form-hint",children:"Till Code inahitajika ili kukamilisha ombi"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Maelezo ya Ziada (hiari)"}),e.jsx("textarea",{className:"form-textarea",rows:3,value:j,onChange:t=>N(t.target.value),placeholder:"Ingiza maelezo yoyote ya ziada kwa mteja..."})]})]}),e.jsxs("div",{className:"modal-footer",children:[e.jsx("button",{className:"btn-secondary",onClick:()=>c(null),children:"Ghairi"}),e.jsx("button",{className:"btn-primary",disabled:g,onClick:W,children:g?"Inahifadhi...":"Kubali Ombi"})]})]})}),e.jsx("style",{children:`
        .admin-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          gap: 16px;
          background: #f8f9fa;
        }
        .admin-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px;
        }
        .admin-layout {
          display: flex;
          min-height: 100vh;
          background: #f4f6f9;
        }
        .admin-sidebar {
          width: 220px;
          background: #1a1a2e;
          color: white;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          flex-shrink: 0;
          padding: 20px 0;
        }
        .sidebar-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0 20px 20px 20px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .brand-icon { font-size: 24px; }
        .brand-text { font-size: 18px; font-weight: 800; }
        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 2px;
          padding: 15px 0;
        }
        .sidebar-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 20px;
          color: #cbd5e1;
          text-decoration: none;
          font-weight: 600;
          font-size: 14px;
          border: none;
          background: transparent;
          width: 100%;
          text-align: left;
          cursor: pointer;
          transition: 0.2s;
        }
        .sidebar-link:hover {
          background: rgba(255,255,255,0.08);
          color: white;
        }
        .sidebar-link.active {
          background: #eb5325;
          color: white;
          border-left: 4px solid white;
        }
        .link-icon { font-size: 18px; }
        .sidebar-footer {
          padding: 15px 20px;
          border-top: 1px solid rgba(255,255,255,0.1);
        }
        .btn-sidebar-logout {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          padding: 10px;
          background: #dc2626;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          transition: 0.2s;
        }
        .btn-sidebar-logout:hover {
          background: #b91c1c;
        }
        .admin-main {
          flex: 1;
          padding: 24px;
          overflow-x: auto;
        }
        .admin-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          flex-wrap: wrap;
          gap: 12px;
        }
        .admin-header h1 {
          font-size: 24px;
          font-weight: 800;
          margin: 0;
          color: #1a1a2e;
        }
        .admin-subtitle {
          font-size: 14px;
          color: #64748b;
          margin-top: 4px;
        }
        .admin-actions-top {
          display: flex;
          gap: 10px;
        }
        .btn-refresh {
          padding: 8px 16px;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: 0.2s;
        }
        .btn-refresh:hover {
          background: #f8fafc;
        }
        .btn-mobile-logout-top {
          display: none;
          padding: 8px 16px;
          background: #dc2626;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 700;
          font-size: 13px;
          cursor: pointer;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 12px;
          margin-bottom: 24px;
        }
        .stat-card {
          background: white;
          padding: 16px 14px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          gap: 12px;
          transition: 0.2s;
        }
        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        .stat-card.pending { border-left: 4px solid #f59e0b; }
        .stat-card.approved { border-left: 4px solid #10b981; }
        .stat-card.rejected { border-left: 4px solid #ef4444; }
        .stat-card.processing { border-left: 4px solid #3b82f6; }
        .stat-card.users { border-left: 4px solid #8b5cf6; }
        .stat-icon { font-size: 28px; }
        .stat-number { font-size: 22px; font-weight: 800; color: #1a1a2e; line-height: 1; }
        .stat-label { font-size: 11px; color: #64748b; font-weight: 600; margin-top: 2px; }
        .search-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: white;
          padding: 12px 16px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          margin-bottom: 24px;
          gap: 12px;
        }
        .search-input {
          flex: 1;
          padding: 8px 12px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          font-size: 14px;
        }
        .search-input:focus {
          outline: none;
          border-color: #eb5325;
          box-shadow: 0 0 0 3px rgba(235,83,37,0.1);
        }
        .search-count {
          font-size: 13px;
          font-weight: 600;
          color: #475569;
          background: #f1f5f9;
          padding: 4px 12px;
          border-radius: 20px;
        }
        .table-wrapper {
          background: white;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          overflow: hidden;
        }
        .table-scroll { overflow-x: auto; }
        .admin-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
          min-width: 800px;
        }
        .admin-table th {
          background: #f8fafc;
          padding: 10px 14px;
          font-weight: 700;
          color: #475569;
          font-size: 11px;
          text-transform: uppercase;
          border-bottom: 1px solid #e2e8f0;
        }
        .admin-table td {
          padding: 10px 14px;
          border-bottom: 1px solid #f1f5f9;
          vertical-align: middle;
        }
        .admin-table tbody tr:hover { background: #f8fafc; }
        .ref-cell { font-weight: 700; color: #eb5325; }
        .customer-cell { font-weight: 600; color: #1a1a2e; }
        .commission-cell { font-weight: 700; color: #10b981; }
        .status-badge {
          padding: 3px 10px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 700;
          display: inline-block;
        }
        .status-badge.pending { background: #fef3c7; color: #d97706; }
        .status-badge.approved { background: #d1fae5; color: #059669; }
        .status-badge.rejected { background: #fee2e2; color: #dc2626; }
        .status-badge.processing { background: #dbeafe; color: #2563eb; }
        .text-muted { color: #999; font-size: 12px; }
        .contract-actions { display: flex; gap: 6px; flex-wrap: wrap; }
        .icon-btn {
          padding: 4px 12px;
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          border-radius: 4px;
          cursor: pointer;
          font-size: 12px;
          font-weight: 600;
          transition: 0.2s;
        }
        .icon-btn:hover { background: #e2e8f0; }
        .action-buttons {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }
        .action-buttons button {
          padding: 5px 12px;
          border: none;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: 0.2s;
        }
        .action-buttons button:disabled { opacity: 0.5; cursor: not-allowed; }
        .btn-view {
          background: #e2e8f0;
          color: #1a1a2e;
        }
        .btn-view:hover:not(:disabled) { background: #cbd5e1; }
        .btn-approve {
          background: #10b981;
          color: white;
        }
        .btn-approve:hover:not(:disabled) { background: #059669; }
        .btn-process {
          background: #3b82f6;
          color: white;
        }
        .btn-process:hover:not(:disabled) { background: #2563eb; }
        .btn-reject {
          background: #ef4444;
          color: white;
        }
        .btn-reject:hover:not(:disabled) { background: #dc2626; }
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(15,23,42,0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          z-index: 999;
        }
        .modal-content {
          background: white;
          border-radius: 14px;
          width: 100%;
          max-width: 560px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1);
          animation: scaleUp 0.2s ease;
        }
        .modal-sm { max-width: 420px; }
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          border-bottom: 1px solid #e2e8f0;
          position: sticky;
          top: 0;
          background: white;
          border-radius: 14px 14px 0 0;
          z-index: 1;
        }
        .modal-header h3 {
          margin: 0;
          font-size: 17px;
          font-weight: 800;
        }
        .modal-close {
          border: none;
          background: transparent;
          font-size: 24px;
          cursor: pointer;
          color: #64748b;
        }
        .modal-close:hover { color: #1a1a2e; }
        .modal-body { padding: 20px; }
        .detail-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid #f1f5f9;
          font-size: 13px;
        }
        .detail-label { color: #64748b; font-weight: 600; }
        .detail-value { font-weight: 700; color: #1a1a2e; text-align: right; }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-bottom: 12px;
        }
        .form-label { font-weight: 700; font-size: 13px; color: #475569; }
        .form-hint { font-size: 12px; color: #94a3b8; }
        .form-input, .form-textarea {
          padding: 8px 12px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          font-size: 14px;
          width: 100%;
          box-sizing: border-box;
          font-family: inherit;
        }
        .form-input:focus, .form-textarea:focus {
          outline: none;
          border-color: #eb5325;
          box-shadow: 0 0 0 3px rgba(235,83,37,0.1);
        }
        .form-textarea { resize: vertical; }
        .modal-footer {
          padding: 14px 20px;
          border-top: 1px solid #e2e8f0;
          display: flex;
          justify-content: flex-end;
          gap: 8px;
          background: #f8fafc;
          border-radius: 0 0 14px 14px;
          flex-wrap: wrap;
          position: sticky;
          bottom: 0;
        }
        .btn-primary {
          padding: 8px 18px;
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
          transform: translateY(-1px);
        }
        .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }
        .btn-secondary {
          padding: 8px 18px;
          background: transparent;
          color: #1a1a2e;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: 0.2s;
        }
        .btn-secondary:hover { background: #f1f5f9; }
        .loading-state, .empty-state, .error-state {
          text-align: center;
          padding: 40px 20px;
          color: #64748b;
        }
        .error-state p { color: #dc2626; font-weight: 600; margin-bottom: 12px; }
        .loading-spinner {
          width: 36px;
          height: 36px;
          border: 3px solid #f1f5f9;
          border-top-color: #eb5325;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin: 0 auto 15px auto;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .empty-icon { font-size: 48px; margin-bottom: 10px; }
        .info-box {
          padding: 20px;
          border-radius: 10px;
          border: 1px solid #bfdbfe;
          background: #eff6ff;
          text-align: center;
        }
        .info-box.error {
          border-color: #fca5a5;
          background: #fef2f2;
        }

        @media (max-width: 991px) {
          .admin-layout { flex-direction: column; }
          .admin-sidebar {
            width: 100%;
            flex-direction: row;
            flex-wrap: wrap;
            padding: 10px 15px;
            align-items: center;
          }
          .sidebar-brand { padding: 0; border-bottom: none; }
          .sidebar-nav {
            flex-direction: row;
            gap: 4px;
            padding: 0;
            flex-wrap: wrap;
          }
          .sidebar-link {
            padding: 6px 12px;
            width: auto;
            font-size: 13px;
          }
          .sidebar-link.active { border-left: none; border-bottom: 3px solid white; }
          .sidebar-footer { display: none; }
          .btn-mobile-logout-top { display: block; }
          .admin-main { padding: 16px; }
          .stats-grid { grid-template-columns: repeat(3, 1fr); }
        }

        @media (max-width: 575px) {
          .stats-grid { grid-template-columns: 1fr 1fr; gap: 8px; }
          .search-bar { flex-direction: column; align-items: stretch; }
          .admin-header { flex-direction: column; align-items: flex-start; }
          .admin-actions-top { width: 100%; justify-content: space-between; }
          .action-buttons { flex-wrap: wrap; }
          .admin-table { font-size: 12px; min-width: 600px; }
          .admin-table th, .admin-table td { padding: 6px 8px; }
          .modal-content { max-width: 100%; }
          .modal-footer { flex-direction: column; }
          .modal-footer button { width: 100%; text-align: center; }
          .contract-actions { flex-direction: column; }
          .contract-actions button { width: 100%; }
        }
      `})]})}export{me as component};
