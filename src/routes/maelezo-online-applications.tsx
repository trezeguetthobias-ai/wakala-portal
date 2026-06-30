import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/maelezo-online-applications")({
  head: () => ({
    meta: [
      { title: "Online Applications - GJ General Traders" },
      {
        name: "description",
        content: "Maelezo ya online applications",
      },
    ],
  }),
  component: OnlineApplicationsInfo,
});

function OnlineApplicationsInfo() {
  return (
    <div className="info-page">
      <div className="info-container">
        <Link to="/" className="back-button">
          ← Rudi Nyumbani
        </Link>

        <div className="info-card">
          <h1 className="info-title">ONLINE APPLICATIONS</h1>
          <div className="info-divider"></div>
          
          <div className="info-content">
            <div className="info-section">
              <h2>Maombi ya Mtandaoni</h2>
              <p>
                GJ General Traders inatoa huduma za maombi ya mtandaoni kwa urahisi na usalama. 
                Wasilisha maombi yako ya biashara, huduma, au usajili kutoka popote ulipo.
              </p>
            </div>

            <div className="info-section">
              <h3>Aina za Maombi Yanayopatikana</h3>
              <div className="app-grid">
                <div className="app-card">
                  <h4>Usajili wa Biashara</h4>
                  <p>Sajili biashara yako kwa urahisi mtandaoni</p>
                </div>
                <div className="app-card">
                  <h4>Lipa Namba</h4>
                  <p>Omba namba ya Lipa kwa biashara yako</p>
                </div>
                <div className="app-card">
                  <h4>Unlimited Internet</h4>
                  <p>Wasilisha maombi ya unlimited internet</p>
                </div>
                <div className="app-card">
                  <h4>Huduma za Kibenki</h4>
                  <p>Omba huduma mbalimbali za kibenki</p>
                </div>
              </div>
            </div>

            <div className="info-section">
              <h3>Hatua za Kuwasilisha Maombi</h3>
              <ol className="info-steps">
                <li>
                  <strong>Hatua ya 1:</strong> Ingia kwenye akaunti yako au jisajili ikiwa huna akaunti.
                </li>
                <li>
                  <strong>Hatua ya 2:</strong> Chagua aina ya huduma unayotaka kuomba.
                </li>
                <li>
                  <strong>Hatua ya 3:</strong> Jaza fomu ya maombi kwa kutoa taarifa zako kamili.
                </li>
                <li>
                  <strong>Hatua ya 4:</strong> Pakia nakala za hati zako (Kitambulisho, TIN, picha, n.k.).
                </li>
                <li>
                  <strong>Hatua ya 5:</strong> Wasilisha maombi yako na usubiri uthibitisho.
                </li>
                <li>
                  <strong>Hatua ya 6:</strong> Fuatilia hali ya maombi yako kupitia mfumo wetu.
                </li>
              </ol>
            </div>

            <div className="info-section">
              <h3>Manufaa ya Maombi ya Mtandaoni</h3>
              <ul className="info-list">
                <li>✓ Hakuna msongamano wa foleni</li>
                <li>✓ Wasilisha maombi 24/7 kutoka popote</li>
                <li>✓ Pata majibu ya haraka</li>
                <li>✓ Fuatilia maombi yako kwa wakati halisi</li>
                <li>✓ Hifadhi ya taarifa zako kwa usalama</li>
                <li>✓ Pata arifa za maombi yako</li>
              </ul>
            </div>

            <div className="info-section">
              <h3>Mahitaji ya Kuwasilisha Maombi</h3>
              <ul className="info-list">
                <li>✓ Kitambulisho halali (NIDA)</li>
                <li>✓ Namba ya TIN</li>
                <li>✓ Anwani ya biashara</li>
                <li>✓ Picha za biashara (ikiwa inahitajika)</li>
                <li>✓ Namba ya simu inayotumika</li>
                <li>✓ Barua pepe inayotumika</li>
              </ul>
            </div>

            <div className="info-action">
              <Link to="/fuatilia" className="apply-button">
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

        .app-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
          margin: 10px 0;
        }

        .app-card {
          background: #f8f9fa;
          padding: 15px;
          border-radius: 10px;
          border: 1px solid #e5e7eb;
          text-align: center;
        }

        .app-card h4 {
          color: #1a1a2e;
          font-weight: 700;
          margin-bottom: 5px;
        }

        .app-card p {
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

          .app-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
      `}</style>
    </div>
  );
}