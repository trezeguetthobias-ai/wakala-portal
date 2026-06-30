import{u as J,a as K,r as d,s as U,t as g,j as e,L as F}from"./index-FkIpNxUv.js";import{t as L,f as H,E as q}from"./jspdf.es.min-DxHzNxfz.js";import B from"./html2canvas.esm-DXEQVQnt.js";function X(){const{user:x,loading:y}=J(),N=K(),w=d.useRef(null),[j,E]=d.useState([]),[k,z]=d.useState(!0),[h,D]=d.useState({from:new Date(new Date().setDate(new Date().getDate()-30)).toISOString().split("T")[0],to:new Date().toISOString().split("T")[0]}),[f,_]=d.useState("all"),[R,M]=d.useState(!1);d.useEffect(()=>{!y&&!x&&N({to:"/login"})},[y,x,N]),d.useEffect(()=>{x&&S()},[x,h]);const S=async()=>{if(x){z(!0);try{let a=U.from("applications").select("*").eq("user_id",x.id);h.from&&(a=a.gte("created_at",h.from)),h.to&&(a=a.lte("created_at",h.to+"T23:59:59"));const{data:t,error:i}=await a.order("created_at",{ascending:!1});if(i)throw i;E(t||[])}catch(a){g.error("Imeshindwa kupakia ripoti",{description:a?.message||"Jaribu tena baadaye"})}finally{z(!1)}}},s=d.useMemo(()=>f==="all"?j:j.filter(a=>a.type===f),[j,f]),o=d.useMemo(()=>{const a=s.length,t=s.filter(n=>n.status==="pending").length,i=s.filter(n=>n.status==="approved").length,m=s.filter(n=>n.status==="rejected").length,r=s.filter(n=>n.status==="processing").length,c={wakala:15e3,lipa:1e4,voda:8e3},l=s.reduce((n,b)=>n+(c[b.type]||0),0);return{total:a,pending:t,approved:i,rejected:m,processing:r,totalCommission:l,successRate:a>0?Math.round(i/a*100):0}},[s]),A=d.useMemo(()=>({pending:s.filter(a=>a.status==="pending").length,approved:s.filter(a=>a.status==="approved").length,rejected:s.filter(a=>a.status==="rejected").length,processing:s.filter(a=>a.status==="processing").length}),[s]),T=d.useMemo(()=>{const a={};return s.forEach(t=>{const i=L(t.type);a[i]=(a[i]||0)+1}),a},[s]),u=d.useMemo(()=>{const a={};s.forEach(i=>{const m=new Date(i.created_at),c=`Wiki ${W(m)}`;a[c]=(a[c]||0)+1});const t={};return Object.keys(a).sort((i,m)=>{const r=parseInt(i.split(" ")[1]),c=parseInt(m.split(" ")[1]);return r-c}).forEach(i=>{t[i]=a[i]}),t},[s]);function W(a){const t=new Date(a.getFullYear(),0,1),i=Math.floor((a.getTime()-t.getTime())/(1440*60*1e3));return Math.ceil((i+t.getDay()+1)/7)}const $=async()=>{if(!w.current){g.error("Ripoti haipatikani");return}M(!0);const a=g.loading("Inaandaa ripoti yako...");try{const i=w.current.cloneNode(!0);i.querySelectorAll(".btn-download, .btn-print, .btn-refresh, .filters-section, .back-button, .header-actions").forEach(v=>v.remove());const r=document.createElement("div");r.style.position="fixed",r.style.left="-9999px",r.style.top="0",r.style.width="1200px",r.style.background="white",r.style.padding="20px",r.style.zIndex="9999",r.appendChild(i),document.body.appendChild(r),await new Promise(v=>setTimeout(v,500));const c=await B(r,{scale:2,useCORS:!0,logging:!1,backgroundColor:"#ffffff",width:1200,height:r.scrollHeight,scrollY:0,scrollX:0});document.body.removeChild(r);const l=new q("p","mm","a4"),n=l.internal.pageSize.getWidth(),b=c.height*n/c.width,I=c.toDataURL("image/png");l.addImage(I,"PNG",0,0,n,b);let C=b-l.internal.pageSize.getHeight(),O=-l.internal.pageSize.getHeight();for(;C>0;)O-=l.internal.pageSize.getHeight(),l.addPage(),l.addImage(I,"PNG",0,O,n,b),C-=l.internal.pageSize.getHeight();const Y=`Ripoti_${new Date().toISOString().split("T")[0]}.pdf`,P=l.output("blob"),p=document.createElement("a");p.href=URL.createObjectURL(P),p.download=Y,p.target="_blank",p.style.display="none",document.body.appendChild(p),p.click(),setTimeout(()=>{document.body.removeChild(p),URL.revokeObjectURL(p.href)},100),g.dismiss(a),g.success("✅ Ripoti imepakuliwa kwa mafanikio!",{description:`Faili: ${Y}`})}catch(t){console.error("Download error:",t),g.dismiss(a),g.error("Imeshindwa kupakua ripoti",{description:"Jaribu tena baadaye"})}finally{M(!1)}};return x?e.jsxs("div",{className:"reports-page",children:[e.jsxs("div",{className:"reports-container",ref:w,children:[e.jsxs("div",{className:"reports-header",children:[e.jsxs("div",{className:"header-left",children:[e.jsx(F,{to:"/dashboard",className:"back-button",children:"← Rudi Dashboard"}),e.jsx("h1",{className:"page-title",children:"📊 Ripoti za Biashara"}),e.jsx("p",{className:"page-subtitle",children:"Angalia takwimu na ripoti za maombi yako"})]}),e.jsxs("div",{className:"header-actions",children:[e.jsx("button",{className:"btn-download",onClick:$,disabled:R||k,children:R?"⏳ Inapakua...":"📥 Pakua Ripoti"}),e.jsx("button",{className:"btn-print",onClick:()=>window.print(),children:"🖨️ Chapisha"})]})]}),e.jsxs("div",{className:"filters-section",children:[e.jsxs("div",{className:"filter-group",children:[e.jsx("label",{children:"Kuanzia Tarehe"}),e.jsx("input",{type:"date",value:h.from,onChange:a=>D(t=>({...t,from:a.target.value}))})]}),e.jsxs("div",{className:"filter-group",children:[e.jsx("label",{children:"Hadi Tarehe"}),e.jsx("input",{type:"date",value:h.to,onChange:a=>D(t=>({...t,to:a.target.value}))})]}),e.jsxs("div",{className:"filter-group",children:[e.jsx("label",{children:"Aina ya Ombi"}),e.jsxs("select",{value:f,onChange:a=>_(a.target.value),children:[e.jsx("option",{value:"all",children:"Zote"}),e.jsx("option",{value:"wakala",children:"Till Wakala"}),e.jsx("option",{value:"lipa",children:"Lipa Namba"}),e.jsx("option",{value:"voda",children:"Lipa ya Voda"})]})]}),e.jsx("button",{className:"btn-refresh",onClick:S,children:"🔄 Refresh"})]}),k?e.jsx("div",{className:"loading-state",children:"Inapakia ripoti..."}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"stats-grid",children:[e.jsxs("div",{className:"stat-card",children:[e.jsx("div",{className:"stat-icon",children:"📋"}),e.jsxs("div",{className:"stat-content",children:[e.jsx("div",{className:"stat-value",children:o.total}),e.jsx("div",{className:"stat-label",children:"Jumla ya Maombi"})]})]}),e.jsxs("div",{className:"stat-card success",children:[e.jsx("div",{className:"stat-icon",children:"✅"}),e.jsxs("div",{className:"stat-content",children:[e.jsx("div",{className:"stat-value",children:o.approved}),e.jsx("div",{className:"stat-label",children:"Yamekubaliwa"})]})]}),e.jsxs("div",{className:"stat-card warning",children:[e.jsx("div",{className:"stat-icon",children:"⏳"}),e.jsxs("div",{className:"stat-content",children:[e.jsx("div",{className:"stat-value",children:o.pending}),e.jsx("div",{className:"stat-label",children:"Yanasubiri"})]})]}),e.jsxs("div",{className:"stat-card danger",children:[e.jsx("div",{className:"stat-icon",children:"❌"}),e.jsxs("div",{className:"stat-content",children:[e.jsx("div",{className:"stat-value",children:o.rejected}),e.jsx("div",{className:"stat-label",children:"Yamekataliwa"})]})]}),e.jsxs("div",{className:"stat-card info",children:[e.jsx("div",{className:"stat-icon",children:"🔄"}),e.jsxs("div",{className:"stat-content",children:[e.jsx("div",{className:"stat-value",children:o.processing}),e.jsx("div",{className:"stat-label",children:"Yanashughulikiwa"})]})]}),e.jsxs("div",{className:"stat-card primary",children:[e.jsx("div",{className:"stat-icon",children:"💰"}),e.jsxs("div",{className:"stat-content",children:[e.jsx("div",{className:"stat-value",children:H(o.totalCommission)}),e.jsx("div",{className:"stat-label",children:"Jumla ya Kamisheni"})]})]}),e.jsxs("div",{className:"stat-card purple",children:[e.jsx("div",{className:"stat-icon",children:"📈"}),e.jsxs("div",{className:"stat-content",children:[e.jsxs("div",{className:"stat-value",children:[o.successRate,"%"]}),e.jsx("div",{className:"stat-label",children:"Kiwango cha Mafanikio"})]})]})]}),e.jsxs("div",{className:"charts-grid",children:[e.jsxs("div",{className:"chart-card",children:[e.jsx("h3",{children:"📊 Mgawanyo wa Hali"}),e.jsx("div",{className:"chart-content",children:e.jsx("div",{className:"distribution-list",children:Object.entries(A).map(([a,t])=>e.jsxs("div",{className:"distribution-item",children:[e.jsxs("div",{className:"dist-label",children:[e.jsx("span",{className:`dist-dot ${a}`}),e.jsx("span",{children:a==="pending"?"Yanasubiri":a==="approved"?"Yamekubaliwa":a==="rejected"?"Yamekataliwa":"Yanashughulikiwa"})]}),e.jsx("div",{className:"dist-bar-wrapper",children:e.jsx("div",{className:`dist-bar ${a}`,style:{width:`${o.total>0?t/o.total*100:0}%`}})}),e.jsx("div",{className:"dist-value",children:t})]},a))})})]}),e.jsxs("div",{className:"chart-card",children:[e.jsx("h3",{children:"📈 Mgawanyo wa Aina"}),e.jsx("div",{className:"chart-content",children:e.jsxs("div",{className:"type-grid",children:[Object.entries(T).map(([a,t])=>e.jsxs("div",{className:"type-item",children:[e.jsx("div",{className:"type-icon",children:a==="Till Wakala"?"📱":a==="Lipa Namba"?"💳":"📞"}),e.jsxs("div",{className:"type-info",children:[e.jsx("div",{className:"type-name",children:a}),e.jsxs("div",{className:"type-count",children:[t," maombi"]})]}),e.jsxs("div",{className:"type-percent",children:[o.total>0?Math.round(t/o.total*100):0,"%"]})]},a)),Object.keys(T).length===0&&e.jsx("div",{className:"no-data",children:"Hakuna data"})]})})]})]}),e.jsxs("div",{className:"trend-card",children:[e.jsx("h3",{children:"📅 Mwelekeo wa Maombi kwa Wiki"}),e.jsx("p",{className:"trend-subtitle",children:"Onesha idadi ya maombi kwa kila wiki"}),e.jsx("div",{className:"trend-content",children:Object.keys(u).length>0?e.jsx("div",{className:"trend-grid",children:Object.entries(u).map(([a,t])=>e.jsxs("div",{className:"trend-item",children:[e.jsx("div",{className:"trend-label",children:a}),e.jsx("div",{className:"trend-bar-wrapper",children:e.jsx("div",{className:"trend-bar",style:{height:`${Math.max(20,t/Math.max(...Object.values(u))*120)}px`},children:e.jsx("span",{className:"trend-count",children:t})})})]},a))}):e.jsx("div",{className:"no-data",children:"Hakuna data ya mwelekeo"})}),e.jsxs("div",{className:"trend-summary",children:[e.jsxs("span",{children:["📊 Jumla ya maombi katika kipindi hiki: ",e.jsx("strong",{children:s.length})]}),e.jsxs("span",{children:["📈 Wastani wa maombi kwa wiki: ",e.jsx("strong",{children:(s.length/Math.max(1,Object.keys(u).length)).toFixed(1)})]})]})]}),e.jsxs("div",{className:"table-card",children:[e.jsxs("div",{className:"table-header",children:[e.jsx("h3",{children:"📋 Maombi ya Hivi Karibuni"}),e.jsxs("span",{className:"table-count",children:[s.length," maombi"]})]}),e.jsx("div",{className:"table-scroll",children:e.jsxs("table",{className:"data-table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"#Namba"}),e.jsx("th",{children:"Mteja"}),e.jsx("th",{children:"Aina"}),e.jsx("th",{children:"Tarehe"}),e.jsx("th",{children:"Hali"}),e.jsx("th",{children:"Kamisheni"})]})}),e.jsxs("tbody",{children:[s.slice(0,10).map(a=>e.jsxs("tr",{children:[e.jsx("td",{className:"ref-cell",children:a.ref_no||a.id.slice(0,8)}),e.jsx("td",{children:a.customer_name}),e.jsx("td",{children:L(a.type)}),e.jsx("td",{children:new Date(a.created_at).toLocaleDateString("sw-TZ")}),e.jsx("td",{children:e.jsx("span",{className:`badge ${a.status}`,children:a.status==="pending"?"Inasubiri":a.status==="approved"?"Imekubaliwa":a.status==="rejected"?"Imekataliwa":"Inashughulikiwa"})}),e.jsx("td",{className:"commission-cell",children:H(a.type==="wakala"?15e3:a.type==="lipa"?1e4:8e3)})]},a.id)),s.length===0&&e.jsx("tr",{children:e.jsx("td",{colSpan:6,className:"no-data-cell",children:"Hakuna maombi yaliyopatikana"})})]})]})})]})]})]}),e.jsx("style",{children:`
        .reports-page {
          min-height: 100vh;
          background: #f8f9fa;
          padding: 20px;
        }

        .reports-container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .reports-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 25px;
          flex-wrap: wrap;
          gap: 15px;
        }

        .header-left {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .header-actions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
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
          transition: 0.2s;
          width: fit-content;
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
          margin: 0;
        }

        .btn-download {
          padding: 12px 24px;
          background: #10b981;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          transition: 0.2s;
          white-space: nowrap;
        }

        .btn-download:hover:not(:disabled) {
          background: #059669;
          transform: translateY(-2px);
        }

        .btn-download:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn-print {
          padding: 12px 24px;
          background: #1a1a2e;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          transition: 0.2s;
          white-space: nowrap;
        }

        .btn-print:hover {
          background: #2d2d4a;
          transform: translateY(-2px);
        }

        .filters-section {
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
          flex: 1;
          min-width: 140px;
        }

        .filter-group label {
          font-size: 12px;
          font-weight: 600;
          color: #666;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .filter-group input,
        .filter-group select {
          padding: 8px 12px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          font-size: 13px;
          background: white;
          color: #1a1a2e;
          width: 100%;
        }

        .filter-group input:focus,
        .filter-group select:focus {
          outline: none;
          border-color: #eb5325;
          box-shadow: 0 0 0 3px rgba(235, 83, 37, 0.1);
        }

        .btn-refresh {
          padding: 8px 16px;
          background: #eb5325;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 13px;
          cursor: pointer;
          transition: 0.2s;
          align-self: flex-end;
          white-space: nowrap;
        }

        .btn-refresh:hover {
          background: #d44a1f;
          transform: translateY(-2px);
        }

        .loading-state {
          text-align: center;
          padding: 60px;
          font-size: 16px;
          color: #666;
          background: white;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 15px;
          margin-bottom: 25px;
        }

        .stat-card {
          background: white;
          padding: 18px 20px;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          display: flex;
          align-items: center;
          gap: 15px;
          transition: 0.2s;
          box-shadow: 0 2px 10px rgba(0,0,0,0.04);
        }

        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(0,0,0,0.08);
        }

        .stat-card.success {
          border-left: 4px solid #10b981;
        }

        .stat-card.warning {
          border-left: 4px solid #f59e0b;
        }

        .stat-card.danger {
          border-left: 4px solid #ef4444;
        }

        .stat-card.info {
          border-left: 4px solid #3b82f6;
        }

        .stat-card.primary {
          border-left: 4px solid #eb5325;
        }

        .stat-card.purple {
          border-left: 4px solid #8b5cf6;
        }

        .stat-icon {
          font-size: 28px;
        }

        .stat-content {
          display: flex;
          flex-direction: column;
        }

        .stat-value {
          font-size: 24px;
          font-weight: 800;
          color: #1a1a2e;
        }

        .stat-label {
          font-size: 12px;
          color: #666;
          font-weight: 500;
        }

        .charts-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 25px;
        }

        .chart-card {
          background: white;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          padding: 20px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.04);
        }

        .chart-card h3 {
          font-size: 16px;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0 0 20px 0;
        }

        .chart-content {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .distribution-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .distribution-item {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .dist-label {
          display: flex;
          align-items: center;
          gap: 8px;
          min-width: 140px;
          font-size: 14px;
          color: #1a1a2e;
        }

        .dist-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          display: inline-block;
        }

        .dist-dot.pending {
          background: #f59e0b;
        }

        .dist-dot.approved {
          background: #10b981;
        }

        .dist-dot.rejected {
          background: #ef4444;
        }

        .dist-dot.processing {
          background: #3b82f6;
        }

        .dist-bar-wrapper {
          flex: 1;
          height: 8px;
          background: #f0f0f0;
          border-radius: 4px;
          overflow: hidden;
        }

        .dist-bar {
          height: 100%;
          border-radius: 4px;
          transition: width 0.6s ease;
        }

        .dist-bar.pending {
          background: #f59e0b;
        }

        .dist-bar.approved {
          background: #10b981;
        }

        .dist-bar.rejected {
          background: #ef4444;
        }

        .dist-bar.processing {
          background: #3b82f6;
        }

        .dist-value {
          font-weight: 700;
          color: #1a1a2e;
          min-width: 30px;
          text-align: right;
        }

        .type-grid {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .type-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px;
          background: #f8f9fa;
          border-radius: 8px;
        }

        .type-icon {
          font-size: 24px;
        }

        .type-info {
          flex: 1;
        }

        .type-name {
          font-weight: 600;
          color: #1a1a2e;
          font-size: 14px;
        }

        .type-count {
          font-size: 12px;
          color: #666;
        }

        .type-percent {
          font-weight: 700;
          color: #eb5325;
          font-size: 16px;
        }

        .trend-card {
          background: white;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          padding: 20px;
          margin-bottom: 25px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.04);
        }

        .trend-card h3 {
          font-size: 16px;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0;
        }

        .trend-subtitle {
          font-size: 13px;
          color: #666;
          margin: 4px 0 20px 0;
        }

        .trend-grid {
          display: flex;
          align-items: flex-end;
          gap: 12px;
          padding: 10px 0;
          min-height: 180px;
          overflow-x: auto;
        }

        .trend-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          flex: 1;
          min-width: 50px;
        }

        .trend-label {
          font-size: 11px;
          color: #666;
          text-align: center;
          font-weight: 600;
        }

        .trend-bar-wrapper {
          display: flex;
          align-items: flex-end;
          height: 140px;
          width: 100%;
          min-width: 30px;
        }

        .trend-bar {
          width: 100%;
          min-height: 20px;
          background: linear-gradient(180deg, #eb5325, #f7971e);
          border-radius: 6px 6px 0 0;
          transition: height 0.8s ease;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding-top: 4px;
          position: relative;
          box-shadow: 0 2px 8px rgba(235, 83, 37, 0.2);
        }

        .trend-bar:hover {
          transform: scaleY(1.02);
          box-shadow: 0 4px 15px rgba(235, 83, 37, 0.3);
        }

        .trend-count {
          color: white;
          font-size: 11px;
          font-weight: 700;
          text-shadow: 0 1px 3px rgba(0,0,0,0.3);
        }

        .trend-summary {
          display: flex;
          justify-content: space-between;
          padding: 15px 10px 0 10px;
          border-top: 1px solid #e5e7eb;
          margin-top: 15px;
          font-size: 14px;
          color: #666;
          flex-wrap: wrap;
          gap: 10px;
        }

        .trend-summary strong {
          color: #1a1a2e;
        }

        .table-card {
          background: white;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0,0,0,0.04);
        }

        .table-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 18px 20px;
          border-bottom: 1px solid #e5e7eb;
        }

        .table-header h3 {
          font-size: 16px;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0;
        }

        .table-count {
          font-size: 13px;
          color: #666;
          background: #f0f0f0;
          padding: 4px 12px;
          border-radius: 20px;
        }

        .table-scroll {
          overflow-x: auto;
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
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
        }

        .badge {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
          display: inline-block;
        }

        .badge.pending {
          background: #fef3c7;
          color: #d97706;
        }

        .badge.approved {
          background: #d1fae5;
          color: #059669;
        }

        .badge.rejected {
          background: #fee2e2;
          color: #dc2626;
        }

        .badge.processing {
          background: #dbeafe;
          color: #2563eb;
        }

        .commission-cell {
          font-weight: 600;
          color: #eb5325;
        }

        .no-data {
          text-align: center;
          color: #999;
          padding: 20px;
          font-size: 14px;
        }

        .no-data-cell {
          text-align: center;
          color: #999;
          padding: 30px;
        }

        @media print {
          .back-button,
          .btn-download,
          .btn-print,
          .btn-refresh,
          .filters-section,
          .header-actions {
            display: none !important;
          }

          .reports-page {
            background: white !important;
            padding: 0 !important;
          }

          .stat-card,
          .chart-card,
          .trend-card,
          .table-card {
            break-inside: avoid;
            box-shadow: none !important;
            border: 1px solid #e5e7eb !important;
          }
        }

        @media (max-width: 1024px) {
          .charts-grid {
            grid-template-columns: 1fr;
          }

          .stats-grid {
            grid-template-columns: repeat(3, 1fr);
          }

          .trend-grid {
            gap: 8px;
          }
        }

        @media (max-width: 768px) {
          .reports-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .header-actions {
            width: 100%;
          }

          .btn-download,
          .btn-print {
            flex: 1;
            text-align: center;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .filters-section {
            flex-direction: column;
          }

          .filter-group {
            min-width: auto;
            width: 100%;
          }

          .btn-refresh {
            width: 100%;
            text-align: center;
          }

          .trend-grid {
            gap: 6px;
          }

          .trend-label {
            font-size: 9px;
          }

          .dist-label {
            min-width: 100px;
            font-size: 12px;
          }

          .trend-summary {
            flex-direction: column;
            align-items: flex-start;
            gap: 5px;
            font-size: 13px;
          }
        }

        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr 1fr;
            gap: 10px;
          }

          .stat-card {
            padding: 12px 15px;
          }

          .stat-value {
            font-size: 18px;
          }

          .stat-icon {
            font-size: 22px;
          }

          .page-title {
            font-size: 22px;
          }
        }
      `})]}):null}export{X as component};
