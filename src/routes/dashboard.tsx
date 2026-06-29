import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard - GJ General Traders" },
      {
        name: "description",
        content: "Dashboard ya GJ General Traders",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [slideIndex, setSlideIndex] = useState(0);

  const slides = [
    { image: "/slides/halotel-1.jpg", alt: "Halotel ad 1" },
    { image: "/slides/halotel-2.jpg", alt: "Halotel ad 2" },
    { image: "/slides/halotel-3.jpg", alt: "Halotel ad 3" },
    { image: "/slides/halotel-4.jpg", alt: "Halotel ad 4" },
  ];

  useEffect(() => {
    // If no user, redirect to login
    if (!user) {
      navigate({ to: "/login" });
      return;
    }

    const timer = window.setInterval(() => {
      setSlideIndex((c) => (c + 1) % slides.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, [user, navigate]);

  const ServiceCard = ({
    title,
    desc,
    path,
    icon,
  }: {
    title: string;
    desc: string;
    path: string;
    icon?: string;
  }) => {
    return (
      <button
        type="button"
        className="service-card"
        onClick={() => navigate({ to: path })}
      >
        {icon && <div className="service-icon">{icon}</div>}
        <div className="service-title">{title}</div>
        <div className="service-desc">{desc}</div>
        <div className="service-action">Fungua →</div>
      </button>
    );
  };

  const userName = user?.email?.split('@')[0] || 'Wakala';

  return (
    <div className="dashboard-page">

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

      {/* WELCOME SECTION */}
      <section className="welcome-section">
        <div className="welcome-card">
          <h2>👋 Karibu, {userName}!</h2>
          <p>Karibu kwenye mfumo wa GJ General Traders</p>
        </div>
      </section>

      {/* QUICK STATS - 3 cards in one row */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">8</div>
            <div className="stat-label">Huduma Zinazopatikana</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Muda wa Huduma</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">✓</div>
            <div className="stat-label">Salama na Uhakika</div>
          </div>
        </div>
      </section>

      {/* HUDUMA SECTION - 2 Cards per row */}
      <section className="services-wrapper">
        <div className="services-header">
          <h2>Huduma Zetu</h2>
          <p>Chagua huduma unayohitaji kutoka hapa chini</p>
        </div>

        <div className="services-grid">
          {/* Card 1 */}
          <ServiceCard
            title="SAJILI HALOTEL WAKALA"
            desc="Usajili wa laini za uwakala wa HaloPesa"
            path="/till-wakala"
            icon="📱"
          />

          {/* Card 2 */}
          <ServiceCard
            title="SAJILI LIPA YA HALOTEL"
            desc="Omba Lipa Namba kwa biashara yako"
            path="/lipa-namba"
            icon="💳"
          />

          {/* Card 3 */}
          <ServiceCard
            title="LIPA YA VODA"
            desc="Huduma za Voda M-Pesa"
            path="/voda"
            icon="📞"
          />

          

          {/* Card 5 */}
          <ServiceCard
            title="RIPOTI ZA BIASHARA"
            desc="Vifurushi vya biashara kwa SMEs"
            path="/reports"
            icon="🏢"
          />

          {/* Card 6 */}
          <ServiceCard
            title="FUATILIA"
            desc="Angalia hali ya maombi yako"
            path="/fuatilia"
            icon="📊"
          />

          {/* Card 7 */}
          <ServiceCard
            title="MALIPO"
            desc="Angalia na fanya malipo yako"
            path="/malipo"
            icon="💰"
          />

          {/* Card 8 */}
          <ServiceCard
            title="MIPANGILIO"
            desc="Badilisha mipangilio yako"
            path="/mipangilio"
            icon="⚙️"
          />
        </div>
      </section>

      {/* COMPANY INFO CARD */}
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

      {/* CSS */}
      <style>{`
        .dashboard-page {
          min-height: 100vh;
          background: #f8f9fa;
          padding-bottom: 20px;
        }

        /* Slider */
        .landing-slider {
          width: 100%;
          height: 200px;
          overflow: hidden;
          position: relative;
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
          height: 200px;
          object-fit: cover;
        }

        /* Welcome Section */
        .welcome-section {
          padding: 20px 20px 0 20px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .welcome-card {
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
          border-radius: 14px;
          padding: 25px 30px;
          color: white;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }

        .welcome-card h2 {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 5px;
        }

        .welcome-card p {
          font-size: 16px;
          color: #87ceeb;
          margin: 0;
        }

        /* Stats Section - 3 cards in one row */
        .stats-section {
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 15px;
        }

        .stat-card {
          background: white;
          padding: 18px 15px;
          border-radius: 12px;
          text-align: center;
          border: 1px solid #e5e7eb;
          box-shadow: 0 2px 10px rgba(0,0,0,0.04);
          transition: 0.2s;
        }

        .stat-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.08);
        }

        .stat-number {
          font-size: 26px;
          font-weight: 800;
          color: #eb5325;
        }

        .stat-label {
          font-size: 13px;
          color: #666;
          margin-top: 4px;
          font-weight: 500;
        }

        /* Services Section */
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

        /* Services Grid - 2 cards per row */
        .services-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
        }

        .service-card {
          padding: 18px 16px;
          border-radius: 14px;
          border: 1px solid #e5e7eb;
          background: white;
          text-align: left;
          cursor: pointer;
          transition: 0.2s;
          box-shadow: 0 2px 10px rgba(0,0,0,0.04);
          min-height: 120px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 100%;
        }

        .service-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.1);
          border-color: #eb5325;
        }

        .service-icon {
          font-size: 30px;
          margin-bottom: 6px;
        }

        .service-title {
          font-weight: 700;
          font-size: 15px;
          margin-bottom: 3px;
          color: #1a1a2e;
          line-height: 1.3;
        }

        .service-desc {
          font-size: 12px;
          color: #666;
          margin-bottom: 8px;
          flex: 1;
        }

        .service-action {
          font-size: 12px;
          color: #eb5325;
          font-weight: 600;
          margin-top: auto;
        }

        /* Company Info */
        .company-info {
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .company-card {
          background: white;
          border-radius: 14px;
          padding: 25px 20px;
          text-align: center;
          box-shadow: 0 2px 10px rgba(0,0,0,0.04);
          border: 1px solid #e5e7eb;
          transition: 0.2s;
        }

        .company-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.08);
        }

        .company-name {
          color: #1a1a2e;
          font-size: 20px;
          font-weight: 800;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .company-divider {
          width: 50px;
          height: 3px;
          background: #eb5325;
          margin: 10px auto;
          border-radius: 2px;
        }

        .company-description {
          color: #4a4a4a;
          font-size: 14px;
          line-height: 1.8;
          max-width: 700px;
          margin: 8px auto 0;
          font-weight: 400;
        }

        /* ============================================ */
        /* MOBILE FIRST - Excellent Mobile View */
        /* ============================================ */

        /* Small phones (up to 480px) */
        @media (max-width: 480px) {
          .landing-slider {
            height: 150px;
          }

          .slide img {
            height: 150px;
          }

          .welcome-card {
            padding: 18px 20px;
          }

          .welcome-card h2 {
            font-size: 18px;
          }

          .welcome-card p {
            font-size: 14px;
          }

          /* Stats - 3 cards in one row on mobile too */
          .stats-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
          }

          .stat-card {
            padding: 12px 8px;
            border-radius: 10px;
          }

          .stat-number {
            font-size: 18px;
          }

          .stat-label {
            font-size: 10px;
          }

          /* Services - 2 cards per row on mobile */
          .services-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }

          .service-card {
            padding: 14px 12px;
            min-height: 100px;
            border-radius: 12px;
          }

          .service-icon {
            font-size: 24px;
            margin-bottom: 4px;
          }

          .service-title {
            font-size: 12px;
            font-weight: 700;
          }

          .service-desc {
            font-size: 10px;
            margin-bottom: 4px;
          }

          .service-action {
            font-size: 10px;
          }

          .services-header h2 {
            font-size: 20px;
          }

          .services-header p {
            font-size: 12px;
          }

          .company-name {
            font-size: 15px;
          }

          .company-description {
            font-size: 12px;
            line-height: 1.6;
          }

          .company-card {
            padding: 18px 15px;
          }

          .company-divider {
            width: 40px;
            margin: 8px auto;
          }
        }

        /* Medium phones (481px - 600px) */
        @media (min-width: 481px) and (max-width: 600px) {
          .landing-slider {
            height: 170px;
          }

          .slide img {
            height: 170px;
          }

          .stats-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
          }

          .stat-card {
            padding: 14px 10px;
          }

          .stat-number {
            font-size: 20px;
          }

          .stat-label {
            font-size: 11px;
          }

          .services-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }

          .service-card {
            padding: 16px 14px;
            min-height: 110px;
          }

          .service-title {
            font-size: 13px;
          }

          .service-desc {
            font-size: 11px;
          }

          .service-icon {
            font-size: 26px;
          }

          .company-name {
            font-size: 17px;
          }
        }

        /* Tablets (601px - 768px) */
        @media (min-width: 601px) and (max-width: 768px) {
          .landing-slider {
            height: 200px;
          }

          .slide img {
            height: 200px;
          }

          .stats-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
          }

          .stat-card {
            padding: 16px 12px;
          }

          .stat-number {
            font-size: 24px;
          }

          .stat-label {
            font-size: 12px;
          }

          .services-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 14px;
          }

          .service-card {
            padding: 18px 16px;
            min-height: 120px;
          }

          .service-title {
            font-size: 14px;
          }

          .service-desc {
            font-size: 12px;
          }

          .service-icon {
            font-size: 28px;
          }

          .company-name {
            font-size: 20px;
          }

          .company-description {
            font-size: 14px;
          }
        }

        /* Laptops & Desktops (769px - 1024px) */
        @media (min-width: 769px) and (max-width: 1024px) {
          .landing-slider {
            height: 250px;
          }

          .slide img {
            height: 250px;
          }

          .stats-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
          }

          .stat-card {
            padding: 22px 20px;
          }

          .stat-number {
            font-size: 30px;
          }

          .stat-label {
            font-size: 14px;
          }

          .services-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }

          .service-card {
            padding: 22px 20px;
            min-height: 140px;
          }

          .service-title {
            font-size: 16px;
          }

          .service-desc {
            font-size: 13px;
          }

          .service-icon {
            font-size: 32px;
          }

          .company-name {
            font-size: 26px;
          }

          .company-description {
            font-size: 16px;
          }
        }

        /* Large Desktops (1025px+) */
        @media (min-width: 1025px) {
          .landing-slider {
            height: 280px;
          }

          .slide img {
            height: 280px;
          }

          .welcome-card {
            padding: 35px 40px;
          }

          .welcome-card h2 {
            font-size: 32px;
          }

          .welcome-card p {
            font-size: 18px;
          }

          .stats-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 25px;
          }

          .stat-card {
            padding: 25px 20px;
            border-radius: 16px;
          }

          .stat-number {
            font-size: 34px;
          }

          .stat-label {
            font-size: 16px;
          }

          .services-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 25px;
          }

          .service-card {
            padding: 28px 24px;
            min-height: 160px;
            border-radius: 16px;
          }

          .service-title {
            font-size: 18px;
          }

          .service-desc {
            font-size: 14px;
          }

          .service-icon {
            font-size: 38px;
          }

          .service-action {
            font-size: 14px;
          }

          .services-header h2 {
            font-size: 28px;
          }

          .services-header p {
            font-size: 16px;
          }

          .company-name {
            font-size: 34px;
          }

          .company-description {
            font-size: 18px;
          }

          .company-card {
            padding: 45px 40px;
            border-radius: 16px;
          }

          .company-divider {
            width: 70px;
            height: 4px;
          }
        }

        /* Very Small Phones (under 360px) */
        @media (max-width: 360px) {
          .stats-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 5px;
          }

          .stat-card {
            padding: 10px 6px;
            border-radius: 8px;
          }

          .stat-number {
            font-size: 16px;
          }

          .stat-label {
            font-size: 9px;
          }

          .services-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 8px;
          }

          .service-card {
            padding: 12px 10px;
            min-height: 90px;
            border-radius: 10px;
          }

          .service-icon {
            font-size: 20px;
          }

          .service-title {
            font-size: 11px;
          }

          .service-desc {
            font-size: 9px;
          }

          .service-action {
            font-size: 9px;
          }

          .company-name {
            font-size: 13px;
          }

          .company-description {
            font-size: 11px;
          }
        }
      `}</style>

    </div>
  );
}