import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/maelezo-till-za-wakala")({
  head: () => ({
    meta: [
      { title: "Laini za Uwakala - GJ General Traders" },
      {
        name: "description",
        content: "Maelezo ya usajili wa laini za uwakala",
      },
    ],
  }),
  component: TillWakalaInfo,
});

function TillWakalaInfo() {
  return (
    <div className="info-page">
      <div className="info-container">
        <Link to="/" className="back-button">
          ← Rudi Nyumbani
        </Link>

        <div className="info-card">
          <h1 className="info-title">LAINI ZA UWAKALA</h1>
          <div className="info-divider"></div>
          
          <div className="info-content">
            <div className="info-section">
              <h2>Usajili wa Laini za Uwakala</h2>
              <p>
                GJ General Traders inatoa huduma za usajili wa laini za uwakala kwa wateja wanaotaka 
                kuanzisha biashara ya uwakala wa HaloPesa. Mchakato ni rahisi na wa haraka.
              </p>
            </div>

            <div className="info-section">
              <h3>Mahitaji ya Kujisajili</h3>
              <ul className="info-list">
                <li>✓ Nakala ya Kitambulisho (NIDA)</li>
                <li>✓ Nakala ya TIN (Namba ya Kodi)</li>
                <li>✓ Picha za Biashara (2 picha)</li>
                <li>✓ Fomu ya Maombi iliyojazwa</li>
                <li>✓ Mkataba wa uwakala</li>
              </ul>
            </div>

            <div className="info-section">
              <h3>Hatua za Kujisajili</h3>
              <ol className="info-steps">
                <li>
                  <strong>Hatua ya 1:</strong> Jaza fomu ya maombi kwa kutoa taarifa zako binafsi na za biashara.
                </li>
                <li>
                  <strong>Hatua ya 2:</strong> Pakia nakala za hati zako (Kitambulisho, TIN, na picha).
                </li>
                <li>
                  <strong>Hatua ya 3:</strong> Saini mkataba wa uwakala na ukubaliane na sheria na masharti.
                </li>
                <li>
                  <strong>Hatua ya 4:</strong> Subiri uthibitisho kutoka kwa mamlaka husika.
                </li>
                <li>
                  <strong>Hatua ya 5:</strong> Baada ya kuidhinishwa, utapata arifa na uanze biashara yako.
                </li>
              </ol>
            </div>

            <div className="info-section">
              <h3>Manufaa ya Kuwa Wakala</h3>
              <ul className="info-list">
                <li>✓ Pata mapato ya ziada kwa kila shughuli</li>
                <li>✓ Kuwa sehemu ya mtandao wa HaloPesa</li>
                <li>✓ Huduma za kibenki kwa jamii yako</li>
                <li>✓ Mafunzo na usaidizi kutoka kwa GJ General Traders</li>
              </ul>
            </div>

            <div className="info-action">
              <Link to="/till-wakala" className="apply-button">
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
        }
      `}</style>
    </div>
  );
}