import{u as K,a as $,r as i,j as a,L as F,t as r}from"./index-FkIpNxUv.js";function R(){const{user:l}=K(),w=$(),[d,h]=i.useState("history"),[m,j]=i.useState(""),[t,x]=i.useState("halopesa"),[p,y]=i.useState(""),[z,k]=i.useState(""),[o,v]=i.useState(""),[b,N]=i.useState(!1),[M,f]=i.useState(!1),[n,g]=i.useState([]);if(i.useEffect(()=>{if(l?.email){const e=`payments_${l.email}`,s=localStorage.getItem(e);if(s)try{const u=JSON.parse(s);g(u)}catch{g([])}}},[l]),i.useEffect(()=>{if(l?.email&&n.length>0){const e=`payments_${l.email}`;localStorage.setItem(e,JSON.stringify(n))}},[n,l]),!l)return w({to:"/login"}),null;const S={halopesa:{name:"HaloPesa",icon:"📱",number:"0762 000 000",accountName:"GJ General Traders Ltd",instructions:"Tuma malipo kupitia HaloPesa kwenye namba iliyo hapo juu. Hakikisha unatumia namba yako ya simu iliyosajiliwa."},mpesa:{name:"M-Pesa",icon:"📞",number:"0754 000 000",accountName:"GJ General Traders Ltd",instructions:"Tuma malipo kupitia M-Pesa kwenye namba iliyo hapo juu. Hakikisha unatumia namba yako ya simu iliyosajiliwa."},bank:{name:"Benki",icon:"🏦",number:"CRDB Bank - A/C: 1234567890",accountName:"GJ General Traders Ltd",instructions:"Fanya uhamisho wa benki kwenye akaunti ya CRDB. Tafadhali tumia jina lako kama maelezo ya malipo."},card:{name:"Kadi ya Benki",icon:"💳",number:"5169 0000 0000 0000",accountName:"GJ General Traders Ltd",instructions:"Malipo kwa kadi inakuja hivi karibuni. Kwa sasa tumia njia zingine za malipo."}},P=e=>{if(e.preventDefault(),!o){r.error("Tafadhali chagua huduma");return}const s=parseFloat(m);if(!m||s<=0){r.error("Tafadhali ingiza kiasi sahihi");return}if(!p||p.length<10){r.error("Tafadhali ingiza namba ya simu sahihi (07XXXXXXXX)");return}f(!0)},H=()=>{N(!0);const e=r.loading("Inathibitisha malipo yako...");setTimeout(()=>{const s=`${t==="halopesa"?"HPS":t==="mpesa"?"MP":"BANK"}-${Date.now().toString().slice(-6)}`,u={"till-wakala":"Sajili Wakala HaloPesa","lipa-namba":"Lipa Namba",voda:"Lipa ya Voda",router:"Router Unlimited Internet",sme:"SME Bundle"},G=parseFloat(m),J={id:Date.now(),date:new Date().toISOString().split("T")[0],service:u[o]||o,amount:G.toLocaleString(),status:"Pending",method:t==="halopesa"?"HaloPesa":t==="mpesa"?"M-Pesa":t==="bank"?"Benki":"Kadi",reference:s,senderPhone:p};g(D=>[J,...D]),j(""),y(""),k(""),v(""),f(!1),r.dismiss(e),r.success("✅ Malipo yako yamewasilishwa!"),r.info(`🔑 Namba ya kumbukumbu: ${s}`),r.info("📌 Malipo yatakamilika baada ya uthibitisho wa pesa."),N(!1)},1500)},C=e=>{switch(e){case"Completed":return"#10b981";case"Pending":return"#f59e0b";case"Failed":return"#ef4444";default:return"#6b7280"}},T=e=>{switch(e){case"Completed":return"✅";case"Pending":return"⏳";case"Failed":return"❌";default:return"📋"}},I=e=>{switch(e){case"HaloPesa":return"📱";case"M-Pesa":return"📞";case"Benki":return"🏦";default:return"💳"}},L=n.reduce((e,s)=>s.status==="Completed"?e+parseInt(s.amount.replace(/,/g,"")):e,0),B=n.filter(e=>e.status==="Completed").length,X=n.filter(e=>e.status==="Pending").length,c=S[t];return a.jsxs("div",{className:"malipo-page",children:[a.jsxs("div",{className:"malipo-container",children:[a.jsxs("div",{className:"malipo-header",children:[a.jsx(F,{to:"/dashboard",className:"back-button",children:"← Rudi Dashboard"}),a.jsx("h1",{className:"page-title",children:"💰 Malipo"}),a.jsx("p",{className:"page-subtitle",children:"Fanya malipo yako kwa urahisi na usalama"})]}),a.jsxs("div",{className:"malipo-stats",children:[a.jsxs("div",{className:"stat-item",children:[a.jsxs("div",{className:"stat-value",children:["TSh ",L.toLocaleString()]}),a.jsx("div",{className:"stat-label",children:"Jumla ya Malipo"})]}),a.jsxs("div",{className:"stat-item",children:[a.jsx("div",{className:"stat-value",children:B}),a.jsx("div",{className:"stat-label",children:"Malipo Yaliyokamilika"})]}),a.jsxs("div",{className:"stat-item",children:[a.jsx("div",{className:"stat-value",children:X}),a.jsx("div",{className:"stat-label",children:"Yanasubiri"})]})]}),a.jsxs("div",{className:"malipo-tabs",children:[a.jsx("button",{className:`tab-btn ${d==="history"?"active":""}`,onClick:()=>h("history"),children:"📋 Historia"}),a.jsx("button",{className:`tab-btn ${d==="new"?"active":""}`,onClick:()=>h("new"),children:"➕ Malipo Mpya"}),a.jsx("button",{className:`tab-btn ${d==="methods"?"active":""}`,onClick:()=>h("methods"),children:"💳 Njia za Malipo"})]}),a.jsxs("div",{className:"malipo-content",children:[d==="history"&&a.jsxs("div",{className:"history-section",children:[a.jsxs("div",{className:"history-header",children:[a.jsx("h3",{children:"Historia ya Malipo"}),a.jsxs("span",{className:"payment-count",children:[n.length," malipo"]})]}),n.length===0?a.jsxs("div",{className:"empty-state",children:[a.jsx("div",{className:"empty-icon",children:"📭"}),a.jsx("h4",{children:"Hakuna Malipo"}),a.jsx("p",{children:"Bado hujafanya malipo yoyote. Fanya malipo yako ya kwanza sasa!"}),a.jsx("button",{className:"empty-btn",onClick:()=>h("new"),children:"➕ Fanya Malipo Mpya"})]}):a.jsx("div",{className:"payment-list",children:n.map(e=>a.jsxs("div",{className:"payment-item",children:[a.jsxs("div",{className:"payment-info",children:[a.jsx("div",{className:"payment-service",children:e.service}),a.jsxs("div",{className:"payment-date",children:["📅 ",e.date]}),a.jsxs("div",{className:"payment-method",children:[I(e.method)," ",e.method]}),e.senderPhone&&a.jsxs("div",{className:"payment-phone",children:["📱 ",e.senderPhone]}),a.jsxs("div",{className:"payment-reference",children:["🔑 ",e.reference]})]}),a.jsxs("div",{className:"payment-details",children:[a.jsxs("div",{className:"payment-amount",children:["TSh ",e.amount]}),a.jsxs("div",{className:"payment-status",style:{color:C(e.status)},children:[T(e.status)," ",e.status]})]})]},e.id))})]}),d==="new"&&a.jsxs("div",{className:"new-payment-section",children:[a.jsx("h3",{children:"Fanya Malipo Mpya"}),M?a.jsxs("div",{className:"payment-confirmation",children:[a.jsx("h4",{children:"✅ Thibitisha Malipo Yako"}),a.jsxs("div",{className:"confirmation-details",children:[a.jsxs("div",{className:"confirmation-row",children:[a.jsx("span",{className:"confirmation-label",children:"Huduma:"}),a.jsx("span",{className:"confirmation-value",children:o==="till-wakala"?"Sajili Wakala HaloPesa":o==="lipa-namba"?"Lipa Namba":o==="voda"?"Lipa ya Voda":o==="router"?"Router Unlimited Internet":"SME Bundle"})]}),a.jsxs("div",{className:"confirmation-row",children:[a.jsx("span",{className:"confirmation-label",children:"Kiasi:"}),a.jsxs("span",{className:"confirmation-value",children:["TSh ",parseFloat(m).toLocaleString()]})]}),a.jsxs("div",{className:"confirmation-row",children:[a.jsx("span",{className:"confirmation-label",children:"Njia ya Malipo:"}),a.jsxs("span",{className:"confirmation-value",children:[c.icon," ",c.name]})]}),a.jsxs("div",{className:"confirmation-row",children:[a.jsx("span",{className:"confirmation-label",children:"Namba ya Simu:"}),a.jsx("span",{className:"confirmation-value",children:p})]})]}),a.jsxs("div",{className:"payment-instructions",children:[a.jsx("h5",{children:"📌 Maelekezo ya Malipo"}),a.jsxs("div",{className:"instruction-box",children:[a.jsxs("p",{children:[a.jsx("strong",{children:"Jina la Akaunti:"})," ",c.accountName]}),a.jsxs("p",{children:[a.jsx("strong",{children:"Namba ya Malipo:"})," ",c.number]}),a.jsxs("p",{children:[a.jsxs("strong",{children:[c.name," Instructions:"]})," ",c.instructions]})]}),a.jsxs("div",{className:"instruction-warning",children:["⚠️ ",a.jsx("strong",{children:"Muhimu:"})," Hakikisha unatuma kiasi sawa. Malipo yatakamilika baada ya uthibitisho wa pesa."]})]}),a.jsxs("div",{className:"confirmation-actions",children:[a.jsx("button",{className:"cancel-btn",onClick:()=>f(!1),children:"❌ Ghairi"}),a.jsx("button",{className:"confirm-btn",onClick:H,disabled:b,children:b?"⏳ Inathibitisha...":"✅ Thibitisha Malipo"})]})]}):a.jsxs("form",{onSubmit:P,className:"payment-form",children:[a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:"Huduma"}),a.jsxs("select",{className:"form-select",value:o,onChange:e=>v(e.target.value),required:!0,children:[a.jsx("option",{value:"",children:"Chagua huduma..."}),a.jsx("option",{value:"till-wakala",children:"Sajili Wakala HaloPesa"}),a.jsx("option",{value:"lipa-namba",children:"Lipa Namba"}),a.jsx("option",{value:"voda",children:"Lipa ya Voda"}),a.jsx("option",{value:"router",children:"Router Unlimited Internet"}),a.jsx("option",{value:"sme",children:"SME Bundle"})]})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:"Kiasi (TSh)"}),a.jsx("input",{type:"number",className:"form-input",value:m,onChange:e=>j(e.target.value),placeholder:"Ingiza kiasi",required:!0,min:"1"})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:"Njia ya Malipo"}),a.jsxs("div",{className:"payment-methods-grid",children:[a.jsx("button",{type:"button",className:`method-option ${t==="halopesa"?"active":""}`,onClick:()=>x("halopesa"),children:"📱 HaloPesa"}),a.jsx("button",{type:"button",className:`method-option ${t==="mpesa"?"active":""}`,onClick:()=>x("mpesa"),children:"📞 M-Pesa"}),a.jsx("button",{type:"button",className:`method-option ${t==="bank"?"active":""}`,onClick:()=>x("bank"),children:"🏦 Benki"}),a.jsx("button",{type:"button",className:`method-option ${t==="card"?"active":""}`,onClick:()=>x("card"),children:"💳 Kadi"})]})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:"Namba ya Simu Yako"}),a.jsx("input",{type:"tel",className:"form-input",value:p,onChange:e=>y(e.target.value),placeholder:"07XXXXXXXX",required:!0}),a.jsx("span",{className:"form-hint",children:"📌 Namba utakayotumia kutuma malipo"})]}),a.jsxs("div",{className:"form-group",children:[a.jsx("label",{className:"form-label",children:"Maelezo (Hiari)"}),a.jsx("textarea",{className:"form-textarea",value:z,onChange:e=>k(e.target.value),placeholder:"Maelezo ya malipo...",rows:3})]}),a.jsx("button",{type:"submit",className:"submit-payment-btn",disabled:b,children:"💳 Endelea na Malipo"})]})]}),d==="methods"&&a.jsxs("div",{className:"methods-section",children:[a.jsx("h3",{children:"Njia Zinazopatikana za Malipo"}),a.jsxs("div",{className:"methods-grid",children:[a.jsxs("div",{className:"method-card real-method",children:[a.jsx("div",{className:"method-icon",children:"📱"}),a.jsx("h4",{children:"HaloPesa"}),a.jsxs("div",{className:"method-details",children:[a.jsxs("p",{children:[a.jsx("strong",{children:"Namba:"})," 0762 000 000"]}),a.jsxs("p",{children:[a.jsx("strong",{children:"Jina:"})," GJ General Traders Ltd"]})]}),a.jsx("p",{children:"Malipo kupitia HaloPesa. Hakikisha una akaunti ya HaloPesa."}),a.jsx("div",{className:"method-badge active",children:"Inatumika"})]}),a.jsxs("div",{className:"method-card real-method",children:[a.jsx("div",{className:"method-icon",children:"📞"}),a.jsx("h4",{children:"M-Pesa"}),a.jsxs("div",{className:"method-details",children:[a.jsxs("p",{children:[a.jsx("strong",{children:"Namba:"})," 0754 000 000"]}),a.jsxs("p",{children:[a.jsx("strong",{children:"Jina:"})," GJ General Traders Ltd"]})]}),a.jsx("p",{children:"Malipo kupitia M-Pesa. Inapatikana kwa wateja wote wa Vodacom."}),a.jsx("div",{className:"method-badge active",children:"Inatumika"})]}),a.jsxs("div",{className:"method-card real-method",children:[a.jsx("div",{className:"method-icon",children:"🏦"}),a.jsx("h4",{children:"Benki"}),a.jsxs("div",{className:"method-details",children:[a.jsxs("p",{children:[a.jsx("strong",{children:"Akaunti:"})," CRDB 1234567890"]}),a.jsxs("p",{children:[a.jsx("strong",{children:"Jina:"})," GJ General Traders Ltd"]})]}),a.jsx("p",{children:"Malipo kupitia uhamisho wa benki. Inachukua siku 1-3 za kazi."}),a.jsx("div",{className:"method-badge active",children:"Inatumika"})]}),a.jsxs("div",{className:"method-card",children:[a.jsx("div",{className:"method-icon",children:"💳"}),a.jsx("h4",{children:"Kadi ya Benki"}),a.jsx("p",{children:"Malipo kupitia kadi za benki (Visa, Mastercard)."}),a.jsx("div",{className:"method-badge",children:"Inakuja Hivi Karibuni"})]})]}),a.jsxs("div",{className:"methods-info",children:[a.jsx("h4",{children:"📌 Maelezo Muhimu ya Malipo"}),a.jsxs("ul",{children:[a.jsx("li",{children:"✓ Hakikisha unatuma kiasi sawa na kilichoombwa"}),a.jsx("li",{children:"✓ Tumia namba ya simu iliyosajiliwa kwenye akaunti yako"}),a.jsx("li",{children:"✓ Malipo yatakamilika baada ya uthibitisho wa pesa (dakika 5-10)"}),a.jsx("li",{children:"✓ Utapata uthibitisho kupitia SMS na barua pepe"}),a.jsx("li",{children:"✓ Kwa usaidizi, wasiliana nasi 24/7: 0762 000 000"}),a.jsx("li",{children:"✓ Hifadhi namba ya kumbukumbu ya malipo yako"})]})]})]})]})]}),a.jsx("style",{children:`
        .malipo-page {
          min-height: 100vh;
          background: #f8f9fa;
          padding: 20px;
        }

        .malipo-container {
          max-width: 1000px;
          margin: 0 auto;
        }

        .malipo-header {
          margin-bottom: 25px;
        }

        .back-button {
          display: inline-block;
          padding: 8px 16px;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          color: #1a1a2e;
          text-decoration: none;
          font-weight: 600;
          font-size: 14px;
          margin-bottom: 15px;
          transition: 0.2s;
          box-shadow: 0 2px 10px rgba(0,0,0,0.04);
        }

        .back-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(0,0,0,0.08);
        }

        .page-title {
          font-size: 28px;
          font-weight: 800;
          color: #1a1a2e;
          margin: 0;
        }

        .page-subtitle {
          font-size: 16px;
          color: #666;
          margin: 5px 0 0 0;
        }

        .malipo-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 15px;
          margin-bottom: 25px;
        }

        .stat-item {
          background: white;
          padding: 18px 20px;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          text-align: center;
          box-shadow: 0 2px 10px rgba(0,0,0,0.04);
        }

        .stat-value {
          font-size: 24px;
          font-weight: 800;
          color: #eb5325;
        }

        .stat-label {
          font-size: 13px;
          color: #666;
          margin-top: 4px;
        }

        .malipo-tabs {
          display: flex;
          gap: 10px;
          margin-bottom: 25px;
          background: white;
          padding: 6px;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          box-shadow: 0 2px 10px rgba(0,0,0,0.04);
        }

        .tab-btn {
          flex: 1;
          padding: 12px 20px;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: 0.2s;
          background: transparent;
          color: #666;
        }

        .tab-btn:hover {
          background: #f0f0f0;
        }

        .tab-btn.active {
          background: #eb5325;
          color: white;
        }

        .malipo-content {
          background: white;
          border-radius: 14px;
          padding: 25px;
          border: 1px solid #e5e7eb;
          box-shadow: 0 2px 10px rgba(0,0,0,0.04);
        }

        /* History */
        .history-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .history-header h3 {
          font-size: 18px;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0;
        }

        .payment-count {
          font-size: 14px;
          color: #666;
          background: #f0f0f0;
          padding: 4px 12px;
          border-radius: 20px;
        }

        .empty-state {
          text-align: center;
          padding: 40px 20px;
        }

        .empty-icon {
          font-size: 60px;
          margin-bottom: 15px;
        }

        .empty-state h4 {
          font-size: 18px;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0 0 5px 0;
        }

        .empty-state p {
          font-size: 14px;
          color: #666;
          margin: 0 0 20px 0;
        }

        .empty-btn {
          padding: 12px 24px;
          background: #eb5325;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: 0.2s;
        }

        .empty-btn:hover {
          background: #d44a1f;
          transform: translateY(-2px);
        }

        .payment-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .payment-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          transition: 0.2s;
        }

        .payment-item:hover {
          background: #f8f9fa;
        }

        .payment-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .payment-service {
          font-weight: 600;
          color: #1a1a2e;
          font-size: 15px;
        }

        .payment-date {
          font-size: 12px;
          color: #999;
        }

        .payment-method {
          font-size: 12px;
          color: #666;
        }

        .payment-phone {
          font-size: 12px;
          color: #666;
          font-weight: 500;
        }

        .payment-reference {
          font-size: 11px;
          color: #999;
          font-family: monospace;
        }

        .payment-details {
          text-align: right;
        }

        .payment-amount {
          font-weight: 700;
          font-size: 16px;
          color: #1a1a2e;
        }

        .payment-status {
          font-size: 13px;
          font-weight: 600;
        }

        /* New Payment */
        .new-payment-section h3 {
          font-size: 18px;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0 0 20px 0;
        }

        .payment-form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-label {
          font-weight: 600;
          font-size: 14px;
          color: #1a1a2e;
        }

        .form-input,
        .form-select,
        .form-textarea {
          padding: 12px 14px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          font-size: 14px;
          transition: 0.2s;
          font-family: inherit;
        }

        .form-input:focus,
        .form-select:focus,
        .form-textarea:focus {
          outline: none;
          border-color: #eb5325;
          box-shadow: 0 0 0 3px rgba(235, 83, 37, 0.1);
        }

        .form-textarea {
          resize: vertical;
        }

        .form-hint {
          font-size: 12px;
          color: #999;
        }

        .payment-methods-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
        }

        .method-option {
          padding: 12px;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          background: white;
          cursor: pointer;
          transition: 0.2s;
          font-weight: 600;
          font-size: 13px;
        }

        .method-option:hover {
          border-color: #eb5325;
        }

        .method-option.active {
          border-color: #eb5325;
          background: #fff5f0;
          color: #eb5325;
        }

        .submit-payment-btn {
          padding: 14px;
          background: #eb5325;
          color: white;
          border: none;
          border-radius: 10px;
          font-weight: 700;
          font-size: 16px;
          cursor: pointer;
          transition: 0.2s;
          margin-top: 10px;
        }

        .submit-payment-btn:hover:not(:disabled) {
          background: #d44a1f;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(235, 83, 37, 0.3);
        }

        .submit-payment-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* Payment Confirmation */
        .payment-confirmation {
          padding: 20px;
          background: #f8f9fa;
          border-radius: 12px;
        }

        .payment-confirmation h4 {
          font-size: 18px;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0 0 20px 0;
          text-align: center;
        }

        .confirmation-details {
          background: white;
          padding: 15px;
          border-radius: 10px;
          margin-bottom: 20px;
        }

        .confirmation-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid #f0f0f0;
        }

        .confirmation-row:last-child {
          border-bottom: none;
        }

        .confirmation-label {
          font-weight: 600;
          color: #666;
        }

        .confirmation-value {
          font-weight: 600;
          color: #1a1a2e;
        }

        .payment-instructions {
          margin: 20px 0;
        }

        .payment-instructions h5 {
          font-size: 16px;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0 0 10px 0;
        }

        .instruction-box {
          background: white;
          padding: 15px;
          border-radius: 10px;
          border-left: 4px solid #eb5325;
        }

        .instruction-box p {
          margin: 5px 0;
          font-size: 14px;
          color: #4a4a4a;
        }

        .instruction-warning {
          background: #fef2f2;
          padding: 12px 15px;
          border-radius: 8px;
          border: 1px solid #fca5a5;
          margin-top: 15px;
          font-size: 14px;
          color: #dc2626;
        }

        .confirmation-actions {
          display: flex;
          gap: 15px;
          margin-top: 20px;
        }

        .cancel-btn {
          flex: 1;
          padding: 12px;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          background: white;
          color: #666;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: 0.2s;
        }

        .cancel-btn:hover {
          background: #f0f0f0;
        }

        .confirm-btn {
          flex: 2;
          padding: 12px;
          background: #10b981;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          transition: 0.2s;
        }

        .confirm-btn:hover:not(:disabled) {
          background: #059669;
          transform: translateY(-2px);
        }

        .confirm-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* Methods */
        .methods-section h3 {
          font-size: 18px;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0 0 20px 0;
        }

        .methods-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
          margin-bottom: 25px;
        }

        .method-card {
          padding: 20px;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          text-align: center;
          transition: 0.2s;
        }

        .method-card:hover {
          border-color: #eb5325;
          box-shadow: 0 4px 15px rgba(0,0,0,0.08);
        }

        .method-card.real-method {
          background: #fff5f0;
          border-color: #eb5325;
        }

        .method-icon {
          font-size: 40px;
          margin-bottom: 10px;
        }

        .method-card h4 {
          font-size: 16px;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0 0 10px 0;
        }

        .method-details {
          background: white;
          padding: 10px;
          border-radius: 8px;
          margin: 10px 0;
          font-size: 13px;
        }

        .method-details p {
          margin: 3px 0;
          color: #4a4a4a;
        }

        .method-card p {
          font-size: 13px;
          color: #666;
          margin: 0 0 10px 0;
          line-height: 1.5;
        }

        .method-badge {
          display: inline-block;
          padding: 4px 12px;
          background: #e5e7eb;
          color: #666;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
        }

        .method-badge.active {
          background: #10b981;
          color: white;
        }

        .methods-info {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 12px;
        }

        .methods-info h4 {
          font-size: 16px;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0 0 10px 0;
        }

        .methods-info ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .methods-info ul li {
          padding: 6px 0;
          font-size: 14px;
          color: #4a4a4a;
        }

        @media (max-width: 768px) {
          .malipo-page {
            padding: 15px;
          }

          .page-title {
            font-size: 22px;
          }

          .malipo-stats {
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
          }

          .stat-item {
            padding: 12px 10px;
          }

          .stat-value {
            font-size: 18px;
          }

          .stat-label {
            font-size: 11px;
          }

          .malipo-tabs {
            flex-wrap: wrap;
          }

          .tab-btn {
            font-size: 12px;
            padding: 10px 12px;
            flex: 1;
            min-width: 60px;
          }

          .payment-methods-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .methods-grid {
            grid-template-columns: 1fr;
          }

          .payment-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }

          .payment-details {
            text-align: left;
            width: 100%;
          }

          .confirmation-row {
            flex-direction: column;
            gap: 3px;
          }

          .confirmation-actions {
            flex-direction: column;
          }
        }

        @media (max-width: 480px) {
          .malipo-stats {
            grid-template-columns: 1fr;
            gap: 8px;
          }

          .stat-item {
            padding: 12px 15px;
          }

          .stat-value {
            font-size: 20px;
          }

          .history-header {
            flex-direction: column;
            gap: 10px;
            align-items: stretch;
          }

          .payment-methods-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .method-option {
            font-size: 12px;
            padding: 10px;
          }

          .submit-payment-btn {
            font-size: 14px;
            padding: 12px;
          }
        }
      `})]})}export{R as component};
