import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/maelezo-lipa")({
  head: () => ({
    meta: [
      { title: "Lipa Namba - GJ General Traders" },
      {
        name: "description",
        content: "Maelezo ya usajili wa Lipa Namba",
      },
    ],
  }),
  component: LipaNambaInfo,
});

function LipaNambaInfo() {
  return (
    <div className="info-page">
      <div className="info-container">
        <Link to="/" className="back-button">
          ← Rudi Nyumbani
        </Link>

        <div className="info-card">
          <h1 className="info-title">LIPA NAMBA</h1>
          <div className="info-divider"></div>
          
          <div className="info-content">
            <div className="info-section">
              <h2>Usajili wa Lipa Namba</h2>
              <p>
                GJ General Traders inatoa huduma za usajili wa Lipa Namba kwa makundi mbalimbali 
                ikiwemo MACHINGA, BINAFSI, na COMPANY LIMITED. Pata namba yako ya Lipa kwa urahisi 
                na usalama.
              </p>
            </div>

            <div className="info-section">
              <h3>Makundi Yanayohudumiwa</h3>
              <div className="category-grid">
                <div className="category-card">
                  <h4>MACHINGA</h4>
                  <p>Kwa wafanyabiashara wadogo na wa kati</p>
                </div>
                <div className="category-card">
                  <h4>BINAFSI</h4>
                  <p>Kwa watu binafsi wanaotaka kuanzisha biashara</p>
                </div>
                <div className="category-card">
                  <h4>COMPANY LIMITED</h4>
                  <p>Kwa makampuni yaliyosajiliwa</p>
                </div>
              </div>
            </div>

            <div className="info-section">
              <h3>Mahitaji ya Kujisajili</h3>
              <ul className="info-list">
                <li>✓ Nakala ya Kitambulisho (NIDA)</li>
                <li>✓ Nakala ya TIN (Namba ya Kodi)</li>
                <li>✓ Anwani ya Biashara</li>
                <li>✓ Fomu ya Maombi iliyojazwa</li>
                <li>✓ Kwa COMPANY LIMITED - Hati za usajili wa kampuni</li>
              </ul>
            </div>

            <div className="info-section">
              <h3>Hatua za Kujisajili</h3>
              <ol className="info-steps">
                <li>
                  <strong>Hatua ya 1:</strong> Chagua aina ya Lipa Namba unayotaka (MACHINGA, BINAFSI, au COMPANY LIMITED).
                </li>
                <li>
                  <strong>Hatua ya 2:</strong> Jaza fomu ya maombi kwa kutoa taarifa zako kamili.
                </li>
                <li>
                  <strong>Hatua ya 3:</strong> Pakia nakala za hati zako (Kitambulisho, TIN, na picha).
                </li>
                <li>
                  <strong>Hatua ya 4:</strong> Subiri uthibitisho na uanzishaji wa namba yako.
                </li>
                <li>
                  <strong>Hatua ya 5:</strong> Pata namba yako ya Lipa na uanze kuitumia mara moja.
                </li>
              </ol>
            </div>

            <div className="info-section">
              <h3>Manufaa ya Lipa Namba</h3>
              <ul className="info-list">
                <li>✓ Pokea malipo kwa urahisi kupitia simu</li>
                <li>✓ Hakuna gharama za uanzishaji</li>
                <li>✓ Usalama wa juu wa miamala</li>
                <li>✓ Taarifa za kila siku za miamala</li>
                <li>✓ Muunganisho wa moja kwa moja na HaloPesa</li>
              </ul>
            </div>

            <div className="info-action">
              <Link to="/lipa-namba" className="apply-button">
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
          max-width: 900px;
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

        .category-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
          margin: 10px 0;
        }

        .category-card {
          background: #f8f9fa;
          padding: 15px;
          border-radius: 10px;
          border: 1px solid #e5e7eb;
          text-align: center;
        }

        .category-card h4 {
          color: #1a1a2e;
          font-weight: 700;
          margin-bottom: 5px;
        }

        .category-card p {
          font-size: 14px;
          color: #666;
          margin: 0;
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

        .info-steps {
          padding-left: 25px;
        }

        .info-steps li {
          padding: 10px 0;
          font-size: 16px;
          line-height: 1.6;
          color: #4a4a4a;
        }

        .info-steps li strong {
          color: #1a1a2e;
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

          .category-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>
    </div>
  );
}