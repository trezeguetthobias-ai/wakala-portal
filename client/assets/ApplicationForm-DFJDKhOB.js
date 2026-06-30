import{u as W,a as O,r as f,j as e,L as k,t as d,s as B}from"./index-FkIpNxUv.js";const $=t=>t.replace(/\D/g,""),g=t=>t.toUpperCase(),K=t=>{const o=$(t).slice(0,9);return o.length<=3?o:o.length<=5?`${o.slice(0,3)}-${o.slice(3)}`:`${o.slice(0,3)}-${o.slice(3,5)}-${o.slice(5)}`},H=t=>{const o=$(t).slice(0,20);return o.length<=8?o:o.length<=13?`${o.slice(0,8)}-${o.slice(8)}`:o.length<=18?`${o.slice(0,8)}-${o.slice(8,13)}-${o.slice(13)}`:`${o.slice(0,8)}-${o.slice(8,13)}-${o.slice(13,18)}-${o.slice(18)}`},Y=async(t,o,X,z)=>new Promise((N,b)=>{const r=new XMLHttpRequest,v=`https://ckizyyhlfvnvlsqnfhma.supabase.co/storage/v1/object/application-docs/${o}`;r.open("POST",v),r.setRequestHeader("Authorization",`Bearer ${z}`),r.upload.onprogress=i=>{if(i.lengthComputable){const j=Math.round(i.loaded/i.total*100);X(j),console.log(`📊 Upload progress: ${j}%`)}},r.onload=()=>{if(r.status>=200&&r.status<300){const i=`https://ckizyyhlfvnvlsqnfhma.supabase.co/storage/v1/object/public/application-docs/${o}`;console.log(`✅ Upload successful: ${i}`),N(i)}else{console.error(`❌ Upload failed with status ${r.status}:`,r.responseText);try{const i=JSON.parse(r.responseText);b(new Error(i.message||`Upload failed: ${r.status}`))}catch{b(new Error(`Upload failed: ${r.status} - ${r.responseText}`))}}},r.onerror=()=>{console.error("❌ Network error during upload"),b(new Error("Network error during upload"))},r.ontimeout=()=>{console.error("❌ Upload timeout"),b(new Error("Upload timeout"))},r.timeout=12e4;const m=new FormData;m.append("file",t),r.send(m)});function Q({type:t,title:o,subtitle:X,extra:z,category:N,onCategoryChange:b}){const{user:r}=W(),v=O(),m={id_photo:f.useRef(null),tin_photo:f.useRef(null),business_store_photo:f.useRef(null)},[i,j]=f.useState(!1),[a,P]=f.useState({customer_name:"",phone:"",alt_phone:"",tin:"",id_type:"NIDA",id_number:"",business_name:"",business_type:"",email:"",ward:"",district:"",region:"",has_agent_line:!1,notes:""}),[I,T]=f.useState({}),[F,L]=f.useState(!1),[V,q]=f.useState(null),[n,y]=f.useState({}),c=(s,_)=>P(p=>({...p,[s]:_}));if(!r)return e.jsx("div",{className:"form-page",children:e.jsxs("div",{className:"info-box",children:["Tafadhali ",e.jsx(k,{to:"/login",children:"ingia"})," kwanza."]})});const A=s=>_=>{const p=_.target.files?.[0];if(p){if(p.size>10*1024*1024){d.error(`Faili ${p.name} inazidi 10MB.`);return}T(h=>({...h,[s]:p.name})),d.success(`${p.name} imechaguliwa!`)}},J=async()=>{const{data:{session:s}}=await B.auth.getSession();if(!s)throw new Error("No active session. Please login again.");return s.access_token},E=async s=>{if(s.preventDefault(),i)return;if(!a.customer_name||!a.phone){d.error("Jaza taarifa za msingi");return}if(!/^(06|07)\d{8}$/.test(a.phone)){d.error("Namba ya simu si sahihi");return}if(!m.id_photo.current?.files?.[0]){d.error("Picha ya Kitambulisho inahitajika");return}j(!0);const p=d.loading("Inatuma maombi...");try{const h=await J();console.log("🔑 Got access token");const C={},U=[{key:"id_photo",ref:m.id_photo,required:!0,label:"Picha ya Kitambulisho"},{key:"tin_photo",ref:m.tin_photo,required:!1,label:"Picha ya TIN"},{key:"business_store_photo",ref:m.business_store_photo,required:!1,label:"Picha ya Biashara"}];for(const l of U){const D=l.ref.current?.files?.[0];if(!D){if(l.required)throw new Error(`${l.label} inahitajika`);continue}try{const w=`${r.id}/${Date.now()}-${D.name}`;d.loading(`Inapakia ${l.label}... 0%`,{id:p}),y(x=>({...x,[l.key]:0}));const G=await Y(D,w,x=>{y(R=>({...R,[l.key]:x})),d.loading(`Inapakia ${l.label}... ${x}%`,{id:p})},h);C[l.key]=G,y(x=>({...x,[l.key]:100})),d.loading(`✅ ${l.label} imepakiwa (100%)`,{id:p})}catch(w){throw console.error(`Failed to upload ${l.key}:`,w),new Error(`Imeshindwa kupakia ${l.label}. ${w.message||"Jaribu tena."}`)}}const u={user_id:r.id,type:t,customer_name:a.customer_name,phone:a.phone,documents:C,status:"pending",processing_status:"queued",submitted_at:new Date().toISOString()};a.alt_phone&&(u.alt_phone=a.alt_phone),a.tin&&(u.tin=a.tin),a.id_number&&(u.id_number=a.id_number),a.business_name&&(u.business_name=a.business_name),a.business_type&&(u.business_type=a.business_type),a.email&&(u.email=a.email),a.ward&&(u.ward=a.ward),a.district&&(u.district=a.district),a.region&&(u.region=a.region),a.has_agent_line&&(u.has_agent_line=a.has_agent_line),a.notes&&(u.notes=a.notes),t==="lipa"&&N&&(u.category=N),console.log("📝 Submitting payload:",u),d.loading("Inahifadhi taarifa...",{id:p});const{data:S,error:M}=await B.from("applications").insert(u).select().single();if(M)throw console.error("❌ Database error:",M),new Error(`Database error: ${M.message}`);console.log("✅ Data saved successfully:",S),d.dismiss(p),d.success("✅ Maombi yamewasilishwa!"),L(!0),q(S),P({customer_name:"",phone:"",alt_phone:"",tin:"",id_type:"NIDA",id_number:"",business_name:"",business_type:"",email:"",ward:"",district:"",region:"",has_agent_line:!1,notes:""}),T({}),y({}),Object.values(m).forEach(l=>{l.current&&(l.current.value="")}),setTimeout(()=>{v({to:"/fuatilia"})},1500)}catch(h){console.error("❌ Submit error:",h),d.dismiss(p),h.message?.includes("Invalid Compact JWS")||h.message?.includes("JWT")?(d.error("Sesi imeisha muda",{description:"Tafadhali ingia tena ili kuendelea."}),setTimeout(()=>{v({to:"/login"})},2e3)):d.error("Imeshindwa kutuma",{description:h.message||"Jaribu tena baadaye"})}finally{j(!1)}};return e.jsxs("div",{className:"form-page",children:[e.jsxs("div",{className:"breadcrumb",children:[e.jsx(k,{to:"/",children:"Nyumbani"}),e.jsx("span",{className:"crumb-separator",children:"›"}),e.jsx("span",{className:"crumb-active",children:o})]}),F&&e.jsxs("div",{className:"success-banner",children:[e.jsx("div",{className:"success-icon",children:"✅"}),e.jsxs("div",{className:"success-content",children:[e.jsx("h4",{children:"Hongera! Ombi Limesajiliwa!"}),e.jsx("p",{children:"Taarifa zako zimehifadhiwa."}),e.jsx("div",{className:"success-actions",children:e.jsx(k,{to:"/fuatilia",className:"btn-view",children:"👁️ Fuatilia"})})]})]}),e.jsxs("form",{onSubmit:E,className:"form-card",children:[e.jsxs("div",{className:"form-card-header",children:[e.jsxs("svg",{viewBox:"0 0 24 24",children:[e.jsx("path",{d:"M9 11l3 3L22 4"}),e.jsx("path",{d:"M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"})]}),e.jsxs("div",{children:[e.jsx("h3",{children:o}),e.jsx("p",{children:X})]})]}),e.jsxs("div",{className:"form-body",children:[e.jsxs("div",{className:"info-box",children:[e.jsx("strong",{children:"📌"})," Jaza taarifa zote. Nyaraka zitahifadhiwa kwa usalama."]}),t==="lipa"&&b&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"section-label",children:"Aina ya Biashara"}),e.jsx("div",{className:"category-tabs",children:["MACHINGA","BINAFSI","COMPANY_LIMITED"].map(s=>e.jsx("button",{type:"button",className:`cat-tab ${N===s?"active":""}`,onClick:()=>b(s),children:s.replace("_"," ")},s))})]}),e.jsx("div",{className:"section-label",children:"Taarifa za Msingi"}),e.jsxs("div",{className:"form-row",children:[e.jsxs("div",{className:"form-group form-group-full",children:[e.jsx("label",{className:"form-label",children:"Jina Kamili *"}),e.jsx("input",{className:"form-input",style:{textTransform:"uppercase"},value:a.customer_name,onChange:s=>c("customer_name",g(s.target.value)),required:!0,disabled:i,placeholder:"INGIZA JINA KAMILI"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:t==="voda"?"Namba ya Voda *":"Namba ya Simu *"}),e.jsx("input",{className:"form-input",inputMode:"numeric",maxLength:10,value:a.phone,onChange:s=>c("phone",s.target.value.replace(/\D/g,"").slice(0,10)),placeholder:"07XXXXXXXX",required:!0,disabled:i})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Namba Mbadala"}),e.jsx("input",{className:"form-input",inputMode:"numeric",maxLength:10,value:a.alt_phone,onChange:s=>c("alt_phone",s.target.value.replace(/\D/g,"").slice(0,10)),placeholder:"07XXXXXXXX",disabled:i})]}),e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{className:"form-label",children:["Namba ya TIN ",t==="voda"&&"*"]}),e.jsx("input",{className:"form-input",inputMode:"numeric",maxLength:14,value:K(a.tin),onChange:s=>c("tin",$(s.target.value).slice(0,9)),placeholder:"XXX-XX-XXX",required:t==="voda",disabled:i})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Aina ya Kitambulisho"}),e.jsxs("select",{className:"form-select",value:a.id_type,onChange:s=>c("id_type",s.target.value),disabled:i,children:[e.jsx("option",{value:"NIDA",children:"NIDA"}),e.jsx("option",{value:"Passport",children:"Passport"}),e.jsx("option",{value:"Voter ID",children:"Voter ID"})]})]}),e.jsxs("div",{className:"form-group form-group-full",children:[e.jsx("label",{className:"form-label",children:"Namba ya Kitambulisho *"}),e.jsx("input",{className:"form-input",inputMode:"numeric",maxLength:23,value:H(a.id_number),onChange:s=>c("id_number",$(s.target.value).slice(0,20)),placeholder:"XXXXXXXX-XXXXX-XXXXX-XX",required:!0,disabled:i})]})]}),t==="lipa"&&e.jsxs(e.Fragment,{children:[e.jsx("hr",{className:"section-divider"}),e.jsx("div",{className:"section-label",children:"Taarifa za Biashara"}),e.jsxs("div",{className:"form-row",children:[e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Jina la Biashara"}),e.jsx("input",{className:"form-input",style:{textTransform:"uppercase"},value:a.business_name,onChange:s=>c("business_name",g(s.target.value)),disabled:i,placeholder:"JINA LA BIASHARA"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Aina ya Biashara"}),e.jsx("input",{className:"form-input",style:{textTransform:"uppercase"},value:a.business_type,onChange:s=>c("business_type",g(s.target.value)),placeholder:"Restaurant, Salon...",disabled:i})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Barua Pepe"}),e.jsx("input",{type:"email",className:"form-input",value:a.email,onChange:s=>c("email",s.target.value),disabled:i,placeholder:"mteja@email.com"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Wadi"}),e.jsx("input",{className:"form-input",style:{textTransform:"uppercase"},value:a.ward,onChange:s=>c("ward",g(s.target.value)),disabled:i,placeholder:"WADI"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Wilaya"}),e.jsx("input",{className:"form-input",style:{textTransform:"uppercase"},value:a.district,onChange:s=>c("district",g(s.target.value)),disabled:i,placeholder:"WILAYA"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Mkoa"}),e.jsx("input",{className:"form-input",style:{textTransform:"uppercase"},value:a.region,onChange:s=>c("region",g(s.target.value)),disabled:i,placeholder:"MKOA"})]})]})]}),e.jsx("hr",{className:"section-divider"}),e.jsx("div",{className:"section-label",children:"Nyaraka"}),e.jsxs("div",{className:"form-row",children:[e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Picha ya Kitambulisho *"}),e.jsxs("label",{className:`file-upload ${i?"disabled":""}`,children:[e.jsx("div",{className:"fu-label",children:I.id_photo||"Bonyeza kupakia"}),e.jsx("div",{className:"fu-sub",children:"PNG, JPG, PDF · Max 10MB"}),n.id_photo!==void 0&&e.jsxs("div",{className:"progress-bar",children:[e.jsx("div",{className:"progress-fill",style:{width:`${n.id_photo}%`,background:n.id_photo===100?"#10b981":"#eb5325"}}),e.jsx("span",{className:"progress-text",children:n.id_photo===100?"✅":`${n.id_photo}%`})]}),e.jsx("input",{ref:m.id_photo,type:"file",accept:"image/*,.pdf",onChange:A("id_photo"),required:!0,disabled:i})]})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Picha ya TIN"}),e.jsxs("label",{className:`file-upload ${i?"disabled":""}`,children:[e.jsx("div",{className:"fu-label",children:I.tin_photo||"Bonyeza kupakia"}),e.jsx("div",{className:"fu-sub",children:"PNG, JPG, PDF · Max 10MB"}),n.tin_photo!==void 0&&e.jsxs("div",{className:"progress-bar",children:[e.jsx("div",{className:"progress-fill",style:{width:`${n.tin_photo}%`,background:n.tin_photo===100?"#10b981":"#eb5325"}}),e.jsx("span",{className:"progress-text",children:n.tin_photo===100?"✅":`${n.tin_photo}%`})]}),e.jsx("input",{ref:m.tin_photo,type:"file",accept:"image/*,.pdf",onChange:A("tin_photo"),disabled:i})]})]}),e.jsxs("div",{className:"form-group form-group-full",children:[e.jsx("label",{className:"form-label",children:"Picha ya Duka/Biashara"}),e.jsxs("label",{className:`file-upload ${i?"disabled":""}`,children:[e.jsx("div",{className:"fu-label",children:I.business_store_photo||"Bonyeza kupakia"}),e.jsx("div",{className:"fu-sub",children:"PNG, JPG, PDF · Max 10MB"}),n.business_store_photo!==void 0&&e.jsxs("div",{className:"progress-bar",children:[e.jsx("div",{className:"progress-fill",style:{width:`${n.business_store_photo}%`,background:n.business_store_photo===100?"#10b981":"#eb5325"}}),e.jsx("span",{className:"progress-text",children:n.business_store_photo===100?"✅":`${n.business_store_photo}%`})]}),e.jsx("input",{ref:m.business_store_photo,type:"file",accept:"image/*,.pdf",onChange:A("business_store_photo"),disabled:i})]})]}),z]}),t==="lipa"&&e.jsxs(e.Fragment,{children:[e.jsx("hr",{className:"section-divider"}),e.jsx("div",{className:"section-label",children:"Maelezo ya Ziada"}),e.jsxs("div",{className:"toggle-row",children:[e.jsxs("div",{children:[e.jsx("div",{className:"tr-label",children:"Ana Wakala Line"}),e.jsx("div",{className:"tr-sub",children:"Washa kama mteja ana agent line"})]}),e.jsx("button",{type:"button",className:`toggle ${a.has_agent_line?"on":""}`,onClick:()=>c("has_agent_line",!a.has_agent_line),disabled:i})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Maelezo ya Ziada"}),e.jsx("textarea",{className:"form-input",rows:3,value:a.notes,onChange:s=>c("notes",s.target.value),disabled:i,placeholder:"Maelezo yoyote ya ziada..."})]})]})]}),e.jsxs("div",{className:"form-actions",children:[e.jsx(k,{to:"/",className:"btn-secondary",style:{pointerEvents:i?"none":"auto",opacity:i?.5:1},children:"Rudi Nyuma"}),e.jsx("button",{type:"submit",className:"btn-primary",disabled:i,children:i?"Inatuma...":"Wasilisha Maombi"})]})]}),e.jsx("style",{children:`
        .form-page {
          max-width: 900px;
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

        .crumb-separator {
          margin: 0 8px;
          color: #999;
        }

        .crumb-active {
          color: #1a1a2e;
          font-weight: 600;
        }

        .success-banner {
          background: #d1fae5;
          border: 2px solid #10b981;
          border-radius: 14px;
          padding: 20px 25px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 20px;
          animation: slideDown 0.4s ease;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .success-icon {
          font-size: 40px;
          flex-shrink: 0;
        }

        .success-content h4 {
          font-size: 17px;
          font-weight: 700;
          color: #065f46;
          margin: 0 0 4px 0;
        }

        .success-content p {
          font-size: 14px;
          color: #065f46;
          margin: 0 0 12px 0;
        }

        .success-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .btn-view {
          padding: 10px 18px;
          background: #eb5325;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 13px;
          text-decoration: none;
          text-align: center;
          transition: 0.2s;
        }

        .btn-view:hover {
          background: #d44a1f;
        }

        .form-card {
          background: white;
          border-radius: 16px;
          border: 1px solid #e5e7eb;
          box-shadow: 0 2px 10px rgba(0,0,0,0.04);
          overflow: hidden;
        }

        .form-card-header {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 20px 25px;
          background: #f8f9fa;
          border-bottom: 1px solid #e5e7eb;
        }

        .form-card-header svg {
          width: 30px;
          height: 30px;
          stroke: #eb5325;
          stroke-width: 2;
          fill: none;
          flex-shrink: 0;
        }

        .form-card-header h3 {
          font-size: 20px;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0;
        }

        .form-card-header p {
          font-size: 14px;
          color: #666;
          margin: 2px 0 0 0;
        }

        .form-body {
          padding: 25px;
        }

        .info-box {
          background: #eff6ff;
          padding: 15px;
          border-radius: 10px;
          border: 1px solid #bfdbfe;
          font-size: 14px;
          color: #1a1a2e;
          margin-bottom: 20px;
          line-height: 1.5;
        }

        .section-label {
          font-size: 15px;
          font-weight: 700;
          color: #1a1a2e;
          margin: 20px 0 12px 0;
          border-left: 3px solid #eb5325;
          padding-left: 8px;
        }

        .section-divider {
          border: none;
          border-top: 1px solid #e5e7eb;
          margin: 20px 0;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .form-group-full {
          grid-column: 1 / -1;
        }

        .form-label {
          font-weight: 600;
          font-size: 13px;
          color: #1a1a2e;
        }

        .form-input,
        .form-select {
          padding: 10px 12px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          font-size: 14px;
          font-family: inherit;
          transition: 0.2s;
          width: 100%;
          box-sizing: border-box;
          background: white;
        }

        .form-input:focus,
        .form-select:focus {
          outline: none;
          border-color: #eb5325;
          box-shadow: 0 0 0 3px rgba(235, 83, 37, 0.1);
        }

        .form-input:disabled,
        .form-select:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          background: #f5f5f5;
        }

        .form-input::placeholder {
          color: #aaa;
        }

        .category-tabs {
          display: flex;
          gap: 8px;
          margin-bottom: 15px;
          flex-wrap: wrap;
        }

        .cat-tab {
          padding: 8px 16px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          background: white;
          cursor: pointer;
          font-weight: 600;
          font-size: 13px;
          color: #666;
          transition: 0.2s;
        }

        .cat-tab.active {
          border-color: #eb5325;
          background: #fff5f0;
          color: #eb5325;
        }

        .cat-tab:hover {
          border-color: #eb5325;
        }

        .file-upload {
          display: block;
          padding: 15px;
          border: 2px dashed #e5e7eb;
          border-radius: 8px;
          text-align: center;
          cursor: pointer;
          position: relative;
          transition: 0.2s;
          background: #fafafa;
        }

        .file-upload:hover:not(.disabled) {
          border-color: #eb5325;
          background: #fff7f3;
        }

        .file-upload.disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .fu-label {
          font-weight: 600;
          font-size: 13px;
          color: #1a1a2e;
        }

        .fu-sub {
          font-size: 12px;
          color: #999;
          margin-top: 2px;
        }

        .file-upload input {
          position: absolute;
          inset: 0;
          opacity: 0;
          cursor: pointer;
        }

        .progress-bar {
          margin-top: 8px;
          height: 24px;
          background: #e5e7eb;
          border-radius: 12px;
          overflow: hidden;
          position: relative;
        }

        .progress-fill {
          height: 100%;
          border-radius: 12px;
          transition: width 0.3s ease;
        }

        .progress-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 12px;
          font-weight: 700;
          color: #1a1a2e;
        }

        .toggle-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 16px;
          background: #f8f9fa;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
          margin-bottom: 15px;
        }

        .tr-label {
          font-weight: 600;
          font-size: 13px;
        }

        .tr-sub {
          font-size: 11px;
          color: #666;
        }

        .toggle {
          width: 46px;
          height: 24px;
          border-radius: 12px;
          background: #ccc;
          border: none;
          cursor: pointer;
          position: relative;
          transition: 0.2s;
          flex-shrink: 0;
        }

        .toggle:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .toggle::after {
          content: "";
          position: absolute;
          width: 18px;
          height: 18px;
          background: white;
          border-radius: 50%;
          top: 3px;
          left: 3px;
          transition: 0.2s;
        }

        .toggle.on {
          background: #eb5325;
        }

        .toggle.on::after {
          transform: translateX(22px);
        }

        .form-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 25px;
          background: #f8f9fa;
          border-top: 1px solid #e5e7eb;
        }

        .btn-primary {
          padding: 12px 28px;
          background: #eb5325;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
          transition: 0.2s;
        }

        .btn-primary:hover:not(:disabled) {
          background: #d44a1f;
          transform: translateY(-2px);
        }

        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .btn-secondary {
          padding: 12px 20px;
          background: transparent;
          color: #1a1a2e;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          transition: 0.2s;
        }

        .btn-secondary:hover {
          background: #f0f0f0;
        }

        @media (max-width: 600px) {
          .form-page {
            padding: 10px;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .success-banner {
            flex-direction: column;
            text-align: center;
          }

          .success-actions {
            flex-direction: column;
          }

          .form-actions {
            flex-direction: column-reverse;
            gap: 10px;
          }

          .form-actions a,
          .form-actions button {
            width: 100%;
            text-align: center;
            justify-content: center;
          }
        }
      `})]})}export{Q as A};
