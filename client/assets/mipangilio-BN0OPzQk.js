import{u as G,a as H,r as i,j as e,L as K,t as o}from"./index-FkIpNxUv.js";function R(){const{user:d,signOut:M}=G(),j=H(),[n,m]=i.useState("profile"),[l,c]=i.useState(!1),[g,I]=i.useState(d?.user_metadata?.full_name||""),[w,E]=i.useState(d?.user_metadata?.phone||""),[x]=i.useState(d?.email||""),[k,N]=i.useState(""),[f,P]=i.useState(""),[z,S]=i.useState(""),[u,A]=i.useState(()=>{const a=localStorage.getItem("emailNotifications");return a!==null?a==="true":!0}),[h,$]=i.useState(()=>{const a=localStorage.getItem("smsNotifications");return a!==null?a==="true":!0}),[b,T]=i.useState(()=>{const a=localStorage.getItem("paymentAlerts");return a!==null?a==="true":!0}),[y,L]=i.useState(()=>{const a=localStorage.getItem("promotionalEmails");return a!==null?a==="true":!1}),[p,U]=i.useState(()=>localStorage.getItem("language")||"sw"),[r,X]=i.useState(()=>localStorage.getItem("theme")||"light");if(i.useEffect(()=>{(s=>{const t=document.documentElement;s==="dark"?(t.style.setProperty("--bg-primary","#1a1a2e"),t.style.setProperty("--bg-secondary","#16213e"),t.style.setProperty("--text-primary","#ffffff"),t.style.setProperty("--text-secondary","#87ceeb"),t.style.setProperty("--card-bg","#1f1f3a"),t.style.setProperty("--border-color","#2d2d4a"),document.body.style.backgroundColor="#0f0f1a",document.body.style.color="#ffffff"):s==="light"?(t.style.setProperty("--bg-primary","#f8f9fa"),t.style.setProperty("--bg-secondary","#ffffff"),t.style.setProperty("--text-primary","#1a1a2e"),t.style.setProperty("--text-secondary","#666666"),t.style.setProperty("--card-bg","#ffffff"),t.style.setProperty("--border-color","#e5e7eb"),document.body.style.backgroundColor="#f8f9fa",document.body.style.color="#1a1a2e"):s==="auto"&&(window.matchMedia("(prefers-color-scheme: dark)").matches?(t.style.setProperty("--bg-primary","#1a1a2e"),t.style.setProperty("--bg-secondary","#16213e"),t.style.setProperty("--text-primary","#ffffff"),t.style.setProperty("--text-secondary","#87ceeb"),t.style.setProperty("--card-bg","#1f1f3a"),t.style.setProperty("--border-color","#2d2d4a"),document.body.style.backgroundColor="#0f0f1a",document.body.style.color="#ffffff"):(t.style.setProperty("--bg-primary","#f8f9fa"),t.style.setProperty("--bg-secondary","#ffffff"),t.style.setProperty("--text-primary","#1a1a2e"),t.style.setProperty("--text-secondary","#666666"),t.style.setProperty("--card-bg","#ffffff"),t.style.setProperty("--border-color","#e5e7eb"),document.body.style.backgroundColor="#f8f9fa",document.body.style.color="#1a1a2e"))})(r)},[r]),i.useEffect(()=>{localStorage.setItem("language",p)},[p]),i.useEffect(()=>{if(r==="auto"){const a=window.matchMedia("(prefers-color-scheme: dark)"),s=()=>{const t=document.documentElement;a.matches?(t.style.setProperty("--bg-primary","#1a1a2e"),t.style.setProperty("--bg-secondary","#16213e"),t.style.setProperty("--text-primary","#ffffff"),t.style.setProperty("--text-secondary","#87ceeb"),t.style.setProperty("--card-bg","#1f1f3a"),t.style.setProperty("--border-color","#2d2d4a"),document.body.style.backgroundColor="#0f0f1a",document.body.style.color="#ffffff"):(t.style.setProperty("--bg-primary","#f8f9fa"),t.style.setProperty("--bg-secondary","#ffffff"),t.style.setProperty("--text-primary","#1a1a2e"),t.style.setProperty("--text-secondary","#666666"),t.style.setProperty("--card-bg","#ffffff"),t.style.setProperty("--border-color","#e5e7eb"),document.body.style.backgroundColor="#f8f9fa",document.body.style.color="#1a1a2e")};return a.addEventListener("change",s),()=>a.removeEventListener("change",s)}},[r]),!d)return j({to:"/login"}),null;const D=a=>{a.preventDefault(),c(!0),setTimeout(()=>{const s={fullName:g,phone:w,email:x};localStorage.setItem(`profile_${d.email}`,JSON.stringify(s)),o.success("✅ Mipangilio ya profaili imesasishwa kwa mafanikio!"),c(!1)},600)},B=a=>{if(a.preventDefault(),f.length<6){o.error("⚠️ Nywila mpya lazima iwe na herufi 6 au zaidi");return}if(f!==z){o.error("⚠️ Nywila mpya na uthibitisho hazifanani");return}if(f===k){o.error("⚠️ Nywila mpya haiwezi kuwa sawa na nywila ya sasa");return}c(!0),setTimeout(()=>{localStorage.setItem(`password_${d.email}`,f),o.success("✅ Nywila imebadilishwa kwa mafanikio!"),N(""),P(""),S(""),c(!1)},600)},O=()=>{c(!0),setTimeout(()=>{localStorage.setItem("emailNotifications",String(u)),localStorage.setItem("smsNotifications",String(h)),localStorage.setItem("paymentAlerts",String(b)),localStorage.setItem("promotionalEmails",String(y)),o.success("✅ Mipangilio ya arifa imesasishwa!"),c(!1)},500)},_=()=>{c(!0),setTimeout(()=>{localStorage.setItem("language",p),localStorage.setItem("theme",r),o.success("✅ Mapendeleo yamehifadhiwa!"),c(!1)},500)},C=a=>{U(a),localStorage.setItem("language",a),o.success(`🌐 Lugha imebadilishwa hadi ${a==="sw"?"Kiswahili":"English"}`)},v=a=>{X(a),localStorage.setItem("theme",a);const s={light:"Nuru",dark:"Giza",auto:"Otomatiki"};o.success(`🎨 Mandhari imebadilishwa hadi ${s[a]}`)},q=async()=>{await M(),j({to:"/"}),o.success("Umetoka kwenye akaunti yako")};return e.jsxs("div",{className:"mipangilio-page",children:[e.jsxs("div",{className:"mipangilio-container",children:[e.jsxs("div",{className:"mipangilio-header",children:[e.jsx(K,{to:"/dashboard",className:"back-button",children:"← Rudi Dashboard"}),e.jsx("h1",{className:"page-title",children:"⚙️ Mipangilio"}),e.jsx("p",{className:"page-subtitle",children:"Dhibiti na usimamie akaunti yako"})]}),e.jsxs("div",{className:"user-info-card",children:[e.jsx("div",{className:"user-avatar-large",children:d?.email?.slice(0,2).toUpperCase()||"GJ"}),e.jsxs("div",{className:"user-details",children:[e.jsx("h3",{children:g||"Mtumiaji"}),e.jsx("p",{children:x}),e.jsx("span",{className:"user-role",children:"Wakala"})]})]}),e.jsxs("div",{className:"mipangilio-tabs",children:[e.jsx("button",{className:`tab-btn ${n==="profile"?"active":""}`,onClick:()=>m("profile"),children:"👤 Profaili"}),e.jsx("button",{className:`tab-btn ${n==="security"?"active":""}`,onClick:()=>m("security"),children:"🔒 Usalama"}),e.jsx("button",{className:`tab-btn ${n==="notifications"?"active":""}`,onClick:()=>m("notifications"),children:"🔔 Arifa"}),e.jsx("button",{className:`tab-btn ${n==="preferences"?"active":""}`,onClick:()=>m("preferences"),children:"🎨 Mapendeleo"})]}),e.jsxs("div",{className:"mipangilio-content",children:[n==="profile"&&e.jsxs("div",{className:"profile-section",children:[e.jsx("h3",{children:"Maelezo ya Akaunti"}),e.jsxs("form",{onSubmit:D,className:"settings-form",children:[e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Jina Kamili"}),e.jsx("input",{type:"text",className:"form-input",value:g,onChange:a=>I(a.target.value),placeholder:"Ingiza jina lako kamili",required:!0})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Barua Pepe"}),e.jsx("input",{type:"email",className:"form-input",value:x,disabled:!0,style:{background:"#f0f0f0",cursor:"not-allowed"}}),e.jsx("span",{className:"form-hint",children:"📌 Barua pepe haiwezi kubadilishwa"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Namba ya Simu"}),e.jsx("input",{type:"tel",className:"form-input",value:w,onChange:a=>E(a.target.value),placeholder:"07XXXXXXXX"})]}),e.jsx("button",{type:"submit",className:"save-btn",disabled:l,children:l?"⏳ Inahifadhi...":"💾 Hifadhi Mabadiliko"})]}),e.jsxs("div",{className:"danger-zone",children:[e.jsx("h4",{children:"⚠️ Eneo la Hatari"}),e.jsx("p",{children:"Vitendo hivi haviwezi kugeuzwa. Tafadhali kuwa mwangalifu."}),e.jsx("button",{onClick:q,className:"logout-btn",children:"🚪 Toka Akaunti"})]})]}),n==="security"&&e.jsxs("div",{className:"security-section",children:[e.jsx("h3",{children:"Badilisha Nywila"}),e.jsxs("form",{onSubmit:B,className:"settings-form",children:[e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Nywila ya Sasa"}),e.jsx("input",{type:"password",className:"form-input",value:k,onChange:a=>N(a.target.value),placeholder:"Ingiza nywila yako ya sasa",required:!0})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Nywila Mpya"}),e.jsx("input",{type:"password",className:"form-input",value:f,onChange:a=>P(a.target.value),placeholder:"Ingiza nywila mpya",required:!0,minLength:6}),e.jsx("span",{className:"form-hint",children:"🔑 Nywila lazima iwe na herufi 6 au zaidi"})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Thibitisha Nywila Mpya"}),e.jsx("input",{type:"password",className:"form-input",value:z,onChange:a=>S(a.target.value),placeholder:"Andika tena nywila mpya",required:!0})]}),e.jsx("button",{type:"submit",className:"save-btn",disabled:l,children:l?"⏳ Inabadilisha...":"🔒 Badilisha Nywila"})]}),e.jsxs("div",{className:"security-tips",children:[e.jsx("h4",{children:"🔐 Vidokezo vya Usalama"}),e.jsxs("ul",{children:[e.jsx("li",{children:"✓ Tumia nywila yenye herufi 8 au zaidi"}),e.jsx("li",{children:"✓ Changanya herufi kubwa, ndogo, namba na alama"}),e.jsx("li",{children:"✓ Usitumie nywila sawa kwenye akaunti mbalimbali"}),e.jsx("li",{children:"✓ Badilisha nywila yako mara kwa mara"}),e.jsx("li",{children:"✓ Usishiriki nywila yako na mtu yeyote"})]})]})]}),n==="notifications"&&e.jsxs("div",{className:"notifications-section",children:[e.jsx("h3",{children:"Mipangilio ya Arifa"}),e.jsxs("div",{className:"notifications-list",children:[e.jsxs("div",{className:"notification-item",children:[e.jsxs("div",{className:"notification-info",children:[e.jsx("div",{className:"notification-icon",children:"📧"}),e.jsxs("div",{children:[e.jsx("h4",{children:"Arifa za Barua Pepe"}),e.jsx("p",{children:"Pokea arifa kupitia barua pepe"})]})]}),e.jsxs("label",{className:"toggle-switch",children:[e.jsx("input",{type:"checkbox",checked:u,onChange:()=>A(!u)}),e.jsx("span",{className:"toggle-slider"})]})]}),e.jsxs("div",{className:"notification-item",children:[e.jsxs("div",{className:"notification-info",children:[e.jsx("div",{className:"notification-icon",children:"📱"}),e.jsxs("div",{children:[e.jsx("h4",{children:"Arifa za SMS"}),e.jsx("p",{children:"Pokea arifa kupitia ujumbe wa SMS"})]})]}),e.jsxs("label",{className:"toggle-switch",children:[e.jsx("input",{type:"checkbox",checked:h,onChange:()=>$(!h)}),e.jsx("span",{className:"toggle-slider"})]})]}),e.jsxs("div",{className:"notification-item",children:[e.jsxs("div",{className:"notification-info",children:[e.jsx("div",{className:"notification-icon",children:"💰"}),e.jsxs("div",{children:[e.jsx("h4",{children:"Arifa za Malipo"}),e.jsx("p",{children:"Pokea arifa wakati malipo yanakamilika"})]})]}),e.jsxs("label",{className:"toggle-switch",children:[e.jsx("input",{type:"checkbox",checked:b,onChange:()=>T(!b)}),e.jsx("span",{className:"toggle-slider"})]})]}),e.jsxs("div",{className:"notification-item",children:[e.jsxs("div",{className:"notification-info",children:[e.jsx("div",{className:"notification-icon",children:"📨"}),e.jsxs("div",{children:[e.jsx("h4",{children:"Barua Pepe za Matangazo"}),e.jsx("p",{children:"Pokea habari na matangazo mapya"})]})]}),e.jsxs("label",{className:"toggle-switch",children:[e.jsx("input",{type:"checkbox",checked:y,onChange:()=>L(!y)}),e.jsx("span",{className:"toggle-slider"})]})]})]}),e.jsx("button",{onClick:O,className:"save-btn",disabled:l,children:l?"⏳ Inahifadhi...":"💾 Hifadhi Mipangilio ya Arifa"})]}),n==="preferences"&&e.jsxs("div",{className:"preferences-section",children:[e.jsx("h3",{children:"Mapendeleo Yako"}),e.jsxs("div",{className:"preference-group",children:[e.jsx("label",{className:"preference-label",children:"🌐 Lugha"}),e.jsxs("div",{className:"preference-options",children:[e.jsx("button",{className:`pref-option ${p==="sw"?"active":""}`,onClick:()=>C("sw"),children:"🇹🇿 Kiswahili"}),e.jsx("button",{className:`pref-option ${p==="en"?"active":""}`,onClick:()=>C("en"),children:"🇬🇧 English"})]}),e.jsx("span",{className:"preference-hint",children:p==="sw"?"Lugha ya sasa: Kiswahili":"Current language: English"})]}),e.jsxs("div",{className:"preference-group",children:[e.jsx("label",{className:"preference-label",children:"🎨 Mandhari (Theme)"}),e.jsxs("div",{className:"preference-options",children:[e.jsx("button",{className:`pref-option ${r==="light"?"active":""}`,onClick:()=>v("light"),children:"☀️ Nuru (Light)"}),e.jsx("button",{className:`pref-option ${r==="dark"?"active":""}`,onClick:()=>v("dark"),children:"🌙 Giza (Dark)"}),e.jsx("button",{className:`pref-option ${r==="auto"?"active":""}`,onClick:()=>v("auto"),children:"🔄 Otomatiki (Auto)"})]}),e.jsx("span",{className:"preference-hint",children:r==="light"?"Mandhari ya sasa: Nuru":r==="dark"?"Mandhari ya sasa: Giza":"Mandhari ya sasa: Otomatiki (kulingana na mfumo)"})]}),e.jsx("button",{onClick:_,className:"save-btn",disabled:l,children:l?"⏳ Inahifadhi...":"💾 Hifadhi Mapendeleo"})]})]})]}),e.jsx("style",{children:`
        :root {
          --bg-primary: #f8f9fa;
          --bg-secondary: #ffffff;
          --text-primary: #1a1a2e;
          --text-secondary: #666666;
          --card-bg: #ffffff;
          --border-color: #e5e7eb;
        }

        .mipangilio-page {
          min-height: 100vh;
          background: var(--bg-primary);
          padding: 20px;
          transition: background 0.3s ease, color 0.3s ease;
        }

        .mipangilio-container {
          max-width: 900px;
          margin: 0 auto;
        }

        .mipangilio-header {
          margin-bottom: 25px;
        }

        .back-button {
          display: inline-block;
          padding: 8px 16px;
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          color: var(--text-primary);
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
          color: var(--text-primary);
          margin: 0;
        }

        .page-subtitle {
          font-size: 16px;
          color: var(--text-secondary);
          margin: 5px 0 0 0;
        }

        .user-info-card {
          background: var(--card-bg);
          border-radius: 14px;
          padding: 25px 30px;
          border: 1px solid var(--border-color);
          box-shadow: 0 2px 10px rgba(0,0,0,0.04);
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 25px;
          transition: background 0.3s ease;
        }

        .user-avatar-large {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: linear-gradient(135deg, #eb5325, #d44a1f);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 28px;
          font-weight: 700;
          flex-shrink: 0;
        }

        .user-details h3 {
          font-size: 20px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
        }

        .user-details p {
          font-size: 14px;
          color: var(--text-secondary);
          margin: 4px 0;
        }

        .user-role {
          display: inline-block;
          padding: 3px 12px;
          background: #eb5325;
          color: white;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
        }

        .mipangilio-tabs {
          display: flex;
          gap: 8px;
          margin-bottom: 25px;
          background: var(--card-bg);
          padding: 6px;
          border-radius: 12px;
          border: 1px solid var(--border-color);
          box-shadow: 0 2px 10px rgba(0,0,0,0.04);
          flex-wrap: wrap;
        }

        .tab-btn {
          flex: 1;
          padding: 12px 16px;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: 0.2s;
          background: transparent;
          color: var(--text-secondary);
          min-width: 80px;
        }

        .tab-btn:hover {
          background: var(--bg-primary);
        }

        .tab-btn.active {
          background: #eb5325;
          color: white;
        }

        .mipangilio-content {
          background: var(--card-bg);
          border-radius: 14px;
          padding: 30px;
          border: 1px solid var(--border-color);
          box-shadow: 0 2px 10px rgba(0,0,0,0.04);
          transition: background 0.3s ease;
        }

        .mipangilio-content h3 {
          font-size: 20px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0 0 20px 0;
        }

        .settings-form {
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
          color: var(--text-primary);
        }

        .form-input {
          padding: 12px 14px;
          border: 1px solid var(--border-color);
          border-radius: 8px;
          font-size: 14px;
          transition: 0.2s;
          font-family: inherit;
          background: var(--bg-primary);
          color: var(--text-primary);
        }

        .form-input:focus {
          outline: none;
          border-color: #eb5325;
          box-shadow: 0 0 0 3px rgba(235, 83, 37, 0.1);
        }

        .form-input:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .form-hint {
          font-size: 12px;
          color: var(--text-secondary);
        }

        .save-btn {
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

        .save-btn:hover:not(:disabled) {
          background: #d44a1f;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(235, 83, 37, 0.3);
        }

        .save-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .danger-zone {
          margin-top: 30px;
          padding: 20px;
          border: 2px solid #ef4444;
          border-radius: 12px;
          background: #fef2f2;
        }

        .danger-zone h4 {
          color: #ef4444;
          font-size: 16px;
          font-weight: 700;
          margin: 0 0 5px 0;
        }

        .danger-zone p {
          font-size: 14px;
          color: var(--text-secondary);
          margin: 0 0 15px 0;
        }

        .logout-btn {
          padding: 12px 24px;
          background: #ef4444;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: 0.2s;
        }

        .logout-btn:hover {
          background: #dc2626;
          transform: translateY(-2px);
        }

        .security-tips {
          margin-top: 25px;
          padding: 20px;
          background: var(--bg-primary);
          border-radius: 12px;
        }

        .security-tips h4 {
          font-size: 16px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0 0 10px 0;
        }

        .security-tips ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .security-tips ul li {
          padding: 5px 0;
          font-size: 14px;
          color: var(--text-secondary);
        }

        .notifications-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
          margin-bottom: 20px;
        }

        .notification-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px;
          border: 1px solid var(--border-color);
          border-radius: 10px;
          transition: 0.2s;
        }

        .notification-item:hover {
          background: var(--bg-primary);
        }

        .notification-info {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .notification-icon {
          font-size: 24px;
        }

        .notification-info h4 {
          font-size: 15px;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0;
        }

        .notification-info p {
          font-size: 13px;
          color: var(--text-secondary);
          margin: 2px 0 0 0;
        }

        .toggle-switch {
          position: relative;
          width: 50px;
          height: 28px;
          flex-shrink: 0;
          cursor: pointer;
        }

        .toggle-switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .toggle-slider {
          position: absolute;
          inset: 0;
          background: #ccc;
          border-radius: 14px;
          transition: 0.3s;
        }

        .toggle-slider::before {
          content: "";
          position: absolute;
          height: 22px;
          width: 22px;
          left: 3px;
          bottom: 3px;
          background: white;
          border-radius: 50%;
          transition: 0.3s;
        }

        .toggle-switch input:checked + .toggle-slider {
          background: #eb5325;
        }

        .toggle-switch input:checked + .toggle-slider::before {
          transform: translateX(22px);
        }

        .preference-group {
          margin-bottom: 25px;
        }

        .preference-label {
          display: block;
          font-weight: 600;
          font-size: 15px;
          color: var(--text-primary);
          margin-bottom: 10px;
        }

        .preference-options {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .pref-option {
          padding: 10px 20px;
          border: 2px solid var(--border-color);
          border-radius: 8px;
          background: var(--bg-primary);
          cursor: pointer;
          transition: 0.2s;
          font-weight: 600;
          font-size: 14px;
          color: var(--text-primary);
        }

        .pref-option:hover {
          border-color: #eb5325;
        }

        .pref-option.active {
          border-color: #eb5325;
          background: #fff5f0;
          color: #eb5325;
        }

        .preference-hint {
          display: block;
          margin-top: 8px;
          font-size: 13px;
          color: var(--text-secondary);
          font-style: italic;
        }

        @media (max-width: 768px) {
          .mipangilio-page {
            padding: 15px;
          }

          .page-title {
            font-size: 22px;
          }

          .user-info-card {
            flex-direction: column;
            text-align: center;
            padding: 20px;
          }

          .mipangilio-tabs {
            gap: 5px;
          }

          .tab-btn {
            font-size: 12px;
            padding: 10px 8px;
            min-width: 60px;
          }

          .mipangilio-content {
            padding: 20px;
          }

          .notification-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }

          .preference-options {
            flex-direction: column;
          }

          .pref-option {
            width: 100%;
            text-align: center;
          }
        }

        @media (max-width: 480px) {
          .mipangilio-tabs {
            flex-direction: column;
          }

          .tab-btn {
            width: 100%;
            text-align: center;
          }

          .mipangilio-content {
            padding: 15px;
          }

          .notification-info {
            flex-direction: column;
            text-align: center;
            width: 100%;
          }

          .danger-zone {
            text-align: center;
          }
        }
      `})]})}export{R as component};
