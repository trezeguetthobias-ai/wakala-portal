import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/maelezo-sme-bundles")({
  head: () => ({
    meta: [
      { title: "SME Bundles - GJ General Traders" },
      {
        name: "description",
        content: "Maelezo ya vifurushi vya SME",
      },
    ],
  }),
  component: SMEBundlesInfo,
});

function SMEBundlesInfo() {
  return (
    <div className="info-page">
      <div className="info-container">
        <Link to="/" className="back-button">
          ← Rudi Nyumbani
        </Link>

        <div className="info-card">
          <h1 className="info-title">SME BUNDLES</h1>
          <div className="info-divider"></div>
          
          <div className="info-content">
            <div className="info-section">
              <h2>Vifurushi vya Biashara Ndogo na za Kati</h2>
              <p>
                GJ General Traders inatoa vifurushi maalum kwa biashara ndogo na za kati (SMEs) 
                ili kusaidia ukuaji na maendeleo ya biashara yako. Pata suluhisho bora kwa mahitaji 
                yako ya biashara.
              </p>
            </div>

            <div className="info-section">
              <h3>Vifurushi Vinavyopatikana</h3>
              <div className="bundle-grid">
                <div className="bundle-card">
                  <h4>Startup Bundle</h4>
                  <div className="price">TSh 50,000</div>
                  <ul>
                    <li>Usajili wa Biashara</li>
                    <li>Namba ya TIN</li>
                    <li>Lipa Namba</li>
                    <li>Mafunzo ya Uendeshaji</li>
                  </ul>
                </div>
                <div className="bundle-card popular">
                  <div className="popular-badge">Inaotumika Sana</div>
                  <h4>Growth Bundle</h4>
                  <div className="price">TSh 150,000</div>
                  <ul>
                    <li>Usajili wa Biashara</li>
                    <li>Namba ya TIN</li>
                    <li>Lipa Namba</li>
                    <li>Unlimited Internet</li>
                    <li>Mafunzo ya Biashara</li>
                  </ul>
                </div>
                <div className="bundle-card">
                  <h4>Enterprise Bundle</h4>
                  <div className="price">TSh 300,000</div>
                  <ul>
                    <li>Usajili wa Kampuni</li>
                    <li>Namba ya TIN</li>
                    <li>Lipa Namba</li>
                    <li>Unlimited Internet</li>
                    <li>Mafunzo ya Ukuaji</li>
                    <li>Usaidizi wa Kibiashara</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="info-section">
              <h3>Vipengele Vinavyojumuishwa</h3>
              <ul className="info-list">
                <li>✓ Usajili wa biashara/kampuni</li>
                <li>✓ Namba ya TIN (Kodi)</li>
                <li>✓ Lipa Namba kwa biashara</li>
                <li>✓ Unlimited Internet (kulingana na bundle)</li>
                <li>✓ Mafunzo ya uendeshaji biashara</li>
                <li>✓ Usaidizi wa kiufundi</li>
              </ul>
            </div>

            <div className="info-section">
              <h3>Manufaa ya SME Bundles</h3>
              <ul className="info-list">
                <li>✓ Pata kila kitu unachohitaji katika kifurushi kimoja</li>
                <li>✓ Akiba ya gharama ikilinganishwa na kununua kibinafsi</li>
                <li>✓ Usaidizi wa wataalamu wa biashara</li>
                <li>✓ Muunganisho wa biashara yako na HaloPesa</li>
                <li>✓ Kuongeza ufanisi wa biashara yako</li>
              </ul>
            </div>

            <div className="info-action">
              <Link to="/sme-bundle" className="apply-button">
                Omba Sasa
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .info-page {
          min-height: 100vh;
          background: #f8f9fa;
          padding: 20px;
        }

        .info-container {
          max-width: 1000px;
          margin: 0 auto;
        }

        .back-button {
          display: inline-block;
          padding: 10px 20px;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          color: #1a1a2e;
          text-decoration: none;
          font-weight: 600;
          margin-bottom: 20px;
          transition: 0.2s;
          box-shadow: 0 2px 10px rgba(0,0,0,0.04);
        }

        .back-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(0,0,0,0.08);
        }

        .info-card {
          background: white;
          border-radius: 14px;
          padding: 35px 30px;
          border: 1px solid #e5e7eb;
          box-shadow: 0 2px 10px rgba(0,0,0,0.04);
        }

        .info-title {
          font-size: 28px;
          font-weight: 800;
          color: #1a1a2e;
          text-align: center;
          margin-bottom: 5px;
        }

        .info-divider {
          width: 60px;
          height: 3px;
          background: #eb5325;
          margin: 12px auto 25px;
          border-radius: 2px;
        }

        .info-content {
          color: #4a4a4a;
        }

        .info-section {
          margin-bottom: 30px;
        }

        .info-section h2 {
          font-size: 22px;
          font-weight: 700;
          color: #1a1a2e;
          margin-bottom: 12px;
        }

        .info-section h3 {
          font-size: 18px;
          font-weight: 600;
          color: #1a1a2e;
          margin-bottom: 10px;
        }

        .info-section p {
          font-size: 16px;
          line-height: 1.8;
          color: #4a4a4a;
        }

        .bundle-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 20px;
          margin: 10px 0;
        }

        .bundle-card {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          text-align: center;
          position: relative;
        }

        .bundle-card.popular {
          border-color: #eb5325;
          background: #fff5f0;
        }

        .popular-badge {
          background: #eb5325;
          color: white;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          display: inline-block;
          margin-bottom: 10px;
        }

        .bundle-card h4 {
          color: #1a1a2e;
          font-weight: 700;
          font-size: 18px;
          margin: 5px 0;
        }

        .bundle-card .price {
          font-size: 22px;
          font-weight: 700;
          color: #eb5325;
          margin: 10px 0;
        }

        .bundle-card ul {
          list-style: none;
          padding: 0;
          text-align: left;
        }

        .bundle-card ul li {
          padding: 5px 0;
          font-size: 14px;
          color: #4a4a4a;
        }

        .info-list {
          list-style: none;
          padding: 0;
        }

        .info-list li {
          padding: 8px 0;
          font-size: 16px;
          line-height: 1.6;
          color: #4a4a4a;
          border-bottom: 1px solid #f0f0f0;
        }

        .info-list li:last-child {
          border-bottom: none;
        }

        .info-action {
          text-align: center;
          margin-top: 30px;
          padding-top: 25px;
          border-top: 1px solid #e5e7eb;
        }

        .apply-button {
          display: inline-block;
          padding: 14px 40px;
          background: #eb5325;
          color: white;
          text-decoration: none;
          border-radius: 10px;
          font-weight: 700;
          font-size: 16px;
          transition: 0.2s;
          border: none;
          cursor: pointer;
        }

        .apply-button:hover {
          background: #d44a1f;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(235, 83, 37, 0.3);
        }

        @media (min-width: 768px) {
          .info-card {
            padding: 45px 40px;
          }

          .info-title {
            font-size: 34px;
          }

          .info-section h2 {
            font-size: 26px;
          }

          .bundle-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>
    </div>
  );
}
         