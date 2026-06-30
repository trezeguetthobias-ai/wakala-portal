import{a as l,r as t,j as e}from"./index-FkIpNxUv.js";const n=[{image:"/slides/halotel-1.jpg",alt:"Halotel ad 1"},{image:"/slides/halotel-2.jpg",alt:"Halotel ad 2"},{image:"/slides/halotel-3.jpg",alt:"Halotel ad 3"},{image:"/slides/halotel-4.jpg",alt:"Halotel ad 4"}];function m(){const r=l(),[o,c]=t.useState(0);t.useEffect(()=>{const a=window.setInterval(()=>{c(s=>(s+1)%n.length)},4200);return()=>window.clearInterval(a)},[]);const i=({title:a,desc:s,path:d})=>e.jsxs("button",{type:"button",className:"service-card",onClick:()=>r({to:d}),children:[e.jsx("div",{className:"service-title",children:a}),e.jsx("div",{className:"service-desc",children:s}),e.jsx("div",{className:"service-action",children:"Fungua huduma →"})]});return e.jsxs("div",{className:"homepage",children:[e.jsx("section",{className:"landing-slider",children:e.jsx("div",{className:"landing-slider-track",style:{transform:`translateX(-${o*100}%)`},children:n.map((a,s)=>e.jsx("div",{className:"slide",children:e.jsx("img",{src:a.image,alt:a.alt})},s))})}),e.jsxs("section",{className:"services-wrapper",children:[e.jsxs("div",{className:"services-header",children:[e.jsx("h2",{children:"Huduma zetu "}),e.jsx("p",{children:"Chagua huduma unayohitaji. pata maelezo zaidi."})]}),e.jsxs("div",{className:"services-grid",children:[e.jsx(i,{title:"LAINI ZA UWAKALA",desc:"Usajili wa laini za uwakala Wakala",path:"/maelezo-till-za-wakala"}),e.jsx(i,{title:"LIPA NAMBA",desc:"Omba Lipa Namba kwa biashara",path:"/maelezo-lipa"}),e.jsx(i,{title:"ROUTER AND UNLIMITED INTERNET",desc:"Unlimited Internet Packages",path:"/maelezo-router-unlimited"}),e.jsx(i,{title:"SME BUNDLES",desc:"Vifurushi vya biashara",path:"/maelezo-sme-bundles"}),e.jsx("div",{className:"online-card-center",children:e.jsx(i,{title:"ONLINE APPLICATION",desc:"Maombi ya mtandaoni kwa urahisi na usalama zaidi",path:"/maelezo-online-applications"})})]})]}),e.jsx("section",{className:"company-info",children:e.jsxs("div",{className:"company-card",children:[e.jsx("h1",{className:"company-name",children:"GJ GENERAL TRADERS COMPANY LIMITED"}),e.jsx("div",{className:"company-divider"}),e.jsx("p",{className:"company-description",children:"Karibu GJ GENERAL TRADERS. Huduma zetu ni salama na uhakika zaidi. Wasilisha maombi ya Till Wakala, Lipa Namba kwa usalama na muda muafaka kupitia mfumo wetu wa kisasa."})]})}),e.jsx("style",{children:`
        .landing-slider {
          width: 100%;
          height: 260px;
          overflow: hidden;
        }

        .landing-slider-track {
          display: flex;
          transition: transform 0.6s ease;
        }

        .slide {
          min-width: 100%;
        }

        .slide img {
          width: 100%;
          height: 260px;
          object-fit: cover;
        }

        .services-wrapper {
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .services-header {
          text-align: center;
          margin-bottom: 20px;
        }

        .services-header h2 {
          font-size: 24px;
          font-weight: 700;
          color: #1a1a2e;
        }

        .services-header p {
          font-size: 14px;
          color: #666;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        .service-card {
          padding: 16px;
          border-radius: 14px;
          border: 1px solid #e5e7eb;
          background: white;
          text-align: left;
          cursor: pointer;
          transition: 0.2s;
          box-shadow: 0 2px 10px rgba(0,0,0,0.04);
          min-height: 110px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 100%;
        }

        .service-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.08);
        }

        .service-title {
          font-weight: 700;
          font-size: 15px;
          margin-bottom: 6px;
          color: #1a1a2e;
        }

        .service-desc {
          font-size: 13px;
          color: #666;
          margin-bottom: 10px;
        }

        .service-action {
          font-size: 12px;
          color: #eb5325;
          font-weight: 600;
        }

        .service-card.locked {
          opacity: 0.7;
          border: 1px dashed #999;
        }

        .online-card-center {
          grid-column: 1 / -1;
          display: flex;
          justify-content: center;
          width: 100%;
        }

        .online-card-center .service-card {
          width: 100%;
          max-width: 380px;
          min-height: 110px;
        }

        .company-info {
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .company-card {
          background: white;
          border-radius: 14px;
          padding: 30px 25px;
          text-align: center;
          box-shadow: 0 2px 10px rgba(0,0,0,0.04);
          border: 1px solid #dd3705;
          transition: 0.2s;
        }

        .company-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.08);
        }

        .company-name {
          color: #1a1a2e;
          font-size: 24px;
          font-weight: 800;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          margin-bottom: 10px;
        }

        .company-divider {
          width: 60px;
          height: 3px;
          background: #f04c23;
          margin: 12px auto;
          border-radius: 2px;
        }

        .company-welcome {
          color: #1a1a2e;
          font-size: 28px;
          font-weight: 700;
          margin: 10px 0;
        }

        .company-message {
          color: #2563eb;
          font-size: 18px;
          font-weight: 500;
          margin: 10px 0;
        }

        .company-description {
          color: #4a4a4a;
          font-size: 16px;
          line-height: 1.8;
          max-width: 700px;
          margin: 10px auto 0;
          font-weight: 400;
        }

        @media (min-width: 768px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }

          .company-name {
            font-size: 30px;
          }

          .company-welcome {
            font-size: 34px;
          }

          .company-message {
            font-size: 20px;
          }

          .company-description {
            font-size: 18px;
          }

          .company-card {
            padding: 40px 35px;
          }

          .online-card-center .service-card {
            max-width: 450px;
            min-height: 120px;
          }
        }

        @media (min-width: 1024px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }

          .company-card {
            padding: 45px 40px;
          }

          .company-name {
            font-size: 34px;
          }

          .company-welcome {
            font-size: 38px;
          }

          .online-card-center .service-card {
            max-width: 500px;
            min-height: 130px;
            padding: 20px;
          }

          .online-card-center .service-title {
            font-size: 18px;
          }

          .online-card-center .service-desc {
            font-size: 15px;
          }

          .online-card-center .service-action {
            font-size: 14px;
          }
        }
      `})]})}export{m as component};
