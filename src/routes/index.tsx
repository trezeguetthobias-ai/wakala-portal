import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";

const slides = [
  { image: "/slides/halotel-1.jpg", alt: "Halotel ad 1" },
  { image: "/slides/halotel-2.jpg", alt: "Halotel ad 2" },
  { image: "/slides/halotel-3.jpg", alt: "Halotel ad 3" },
  { image: "/slides/halotel-4.jpg", alt: "Halotel ad 4" },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GJ General Traders — Portal" },
      {
        name: "description",
        content:
          "Wasilisha maombi ya Till Wakala na Lipa Namba kwa urahisi na usalama.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  const navigate = useNavigate();
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSlideIndex((c) => (c + 1) % slides.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, []);

  const goToPage = (path: string) => {
  navigate({ to: path });
};

  const ServiceCard = ({
  title,
  desc,
  path,
}: {
  title: string;
  desc: string;
  path: string;
}) => {
  return (
    <button
      type="button"
      className="service-card"
      onClick={() => navigate({ to: path })}
    >
      <div className="service-title">{title}</div>
      <div className="service-desc">{desc}</div>
      <div className="service-action">Fungua huduma →</div>
    </button>
  );
};

  return (
    <div className="homepage">

      {/* SLIDER */}
      <section className="landing-slider">
        <div
          className="landing-slider-track"
          style={{ transform: `translateX(-${slideIndex * 100}%)` }}
        >
          {slides.map((s, i) => (
            <div className="slide" key={i}>
              <img src={s.image} alt={s.alt} />
            </div>
          ))}
        </div>
      </section>

      {/* HUDUMA SECTION (BUTTONS) */}
      <section className="services-wrapper">
        <div className="services-header">
          <h2>Huduma zetu </h2>
          <p>Chagua huduma unayohitaji. pata maelezo zaidi.</p>
        </div>

        <div className="services-grid">

          <ServiceCard
            title="LAINI ZA UWAKALA"
            desc="Usajili wa laini za uwakala Wakala"
            path="/maelezo-till-za-wakala"
          />

          <ServiceCard
            title="LIPA NAMBA"
            desc="Omba Lipa Namba kwa biashara"
            path="/maelezo-lipa"
          />

        
          <ServiceCard
            title="ROUTER AND UNLIMITED INTERNET"
            desc="Unlimited Internet Packages"
            path="/maelezo-router-unlimited"
          />

          <ServiceCard
            title="SME BUNDLES"
            desc="Vifurushi vya biashara"
            path="/maelezo-sme-bundles"
          />

          <div className="online-card-center">
            <ServiceCard
              title="ONLINE APPLICATION"
              desc="Maombi ya mtandaoni kwa urahisi na usalama zaidi"
              path="/maelezo-online-applications"
            />
          </div>

        </div>
      </section>

      {/* COMPANY INFO CARD - AFTER BUTTONS */}
      <section className="company-info">
        <div className="company-card">
          <h1 className="company-name">GJ GENERAL TRADERS COMPANY LIMITED</h1>
          <div className="company-divider"></div>
          <p className="company-description">
            Karibu GJ GENERAL TRADERS. Huduma zetu ni salama na uhakika zaidi. 
            Wasilisha maombi ya Till Wakala, Lipa Namba kwa usalama na muda muafaka 
            kupitia mfumo wetu wa kisasa.
          </p>
        </div>
      </section>

      {/* CSS INSIDE FILE (NO OTHER FILE EDIT) */}
      <style>{`
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
      `}</style>

    </div>
  );
}