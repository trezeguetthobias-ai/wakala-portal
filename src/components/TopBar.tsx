import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";
import { useEffect, useState, useRef } from "react";
import { toast } from "sonner";

export function TopBar() {
  const { user, isAdmin, signOut } = useAuth();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const signOutTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const initials = (user?.email ?? "?").slice(0, 2).toUpperCase();
  const is = (p: string) => (p === "/" ? path === "/" : path.startsWith(p));

  useEffect(() => {
    setMenuOpen(false);
  }, [path]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (signOutTimeoutRef.current) {
        clearTimeout(signOutTimeoutRef.current);
      }
    };
  }, []);

  const handleSignOut = async () => {
    if (isSigningOut) return;
    setIsSigningOut(true);
    
    const toastId = toast.loading("Inatoka...");
    
    try {
      // Set a timeout to force navigation if signOut takes too long
      const timeoutPromise = new Promise((_, reject) => {
        signOutTimeoutRef.current = setTimeout(() => {
          reject(new Error("Sign out timeout"));
        }, 3000);
      });

      // Race between signOut and timeout
      await Promise.race([
        signOut(),
        timeoutPromise
      ]);

      // Clear timeout if signOut completed
      if (signOutTimeoutRef.current) {
        clearTimeout(signOutTimeoutRef.current);
        signOutTimeoutRef.current = null;
      }
      
      // Close mobile menu if open
      setMenuOpen(false);
      
      // Clear any local storage
      localStorage.clear();
      sessionStorage.clear();
      
      toast.dismiss(toastId);
      toast.success("Umetoka kwenye akaunti yako");
      
      // Navigate to home
      navigate({ to: "/" });
      
      // Force reload for clean state
      setTimeout(() => {
        window.location.href = "/";
      }, 300);
      
    } catch (error) {
      console.error("Sign out error:", error);
      
      // If timeout or error, force logout
      toast.dismiss(toastId);
      toast.warning("Inalazimisha kutoka...");
      
      // Force clear all state
      localStorage.clear();
      sessionStorage.clear();
      setMenuOpen(false);
      
      // Force navigation
      navigate({ to: "/" });
      setTimeout(() => {
        window.location.href = "/";
      }, 200);
    } finally {
      setIsSigningOut(false);
      if (signOutTimeoutRef.current) {
        clearTimeout(signOutTimeoutRef.current);
        signOutTimeoutRef.current = null;
      }
    }
  };

  const navLinks = (
    <>
      <Link
        to="/"
        className={`topbar-mobile-link ${is("/") ? "active" : ""}`}
        onClick={() => setMenuOpen(false)}
      >
        Nyumbani
      </Link>
      {user && (
        <>
          <Link
            to="/till-wakala"
            className={`topbar-mobile-link ${is("/till-wakala") ? "active" : ""}`}
            onClick={() => setMenuOpen(false)}
          >
            Sajili Wakala
          </Link>
          <Link
            to="/lipa-namba"
            className={`topbar-mobile-link ${is("/lipa-namba") ? "active" : ""}`}
            onClick={() => setMenuOpen(false)}
          >
            Lipa ya Halotel
          </Link>
          <Link
            to="/voda"
            className={`topbar-mobile-link ${is("/voda") ? "active" : ""}`}
            onClick={() => setMenuOpen(false)}
          >
            Lipa ya Voda
          </Link>
          <Link
            to="/malipo"
            className={`topbar-mobile-link ${is("/malipo") ? "active" : ""}`}
            onClick={() => setMenuOpen(false)}
          >
            Malipo
          </Link>
          <Link
            to="/reports"
            className={`topbar-mobile-link ${is("/reports") ? "active" : ""}`}
            onClick={() => setMenuOpen(false)}
          >
            Ripoti za Biashara
          </Link>
          {isAdmin && (
            <Link
              to="/admin"
              className={`topbar-mobile-link ${is("/admin") ? "active" : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              Admin
            </Link>
          )}
          <Link
            to="/mipangilio"
            className={`topbar-mobile-link ${is("/mipangilio") ? "active" : ""}`}
            onClick={() => setMenuOpen(false)}
          >
            Mipangilio
          </Link>
          <Link
            to="/fuatilia"
            className={`topbar-mobile-link ${is("/fuatilia") ? "active" : ""}`}
            onClick={() => setMenuOpen(false)}
          >
            Fuatilia
          </Link>
        </>
      )}
    </>
  );

  return (
    <>
      <nav className="topbar" aria-label="Mkuu">
        <Link to="/" className="topbar-brand" onClick={() => setMenuOpen(false)}>
          <img src="/gj-logo.jpeg" alt="GJ General Traders" className="brand-logo-img" />
          <span className="brand-name">GJ General Traders</span>
        </Link>

        <div className="topbar-desktop">
          <div className="topbar-nav">
            <Link to="/" className={`tnav-btn ${is("/") ? "active" : ""}`}>
              Nyumbani
            </Link>
            {user && (
              <>
                <Link to="/till-wakala" className={`tnav-btn ${is("/till-wakala") ? "active" : ""}`}>
                  Sajili Wakala
                </Link>
                <Link to="/lipa-namba" className={`tnav-btn ${is("/lipa-namba") ? "active" : ""}`}>
                  Lipa ya Halotel
                </Link>
                <Link to="/voda" className={`tnav-btn ${is("/voda") ? "active" : ""}`}>
                  Lipa ya Voda
                </Link>
                <Link to="/malipo" className={`tnav-btn ${is("/malipo") ? "active" : ""}`}>
                  Malipo
                </Link>
                <Link to="/reports" className={`tnav-btn ${is("/reports") ? "active" : ""}`}>
                  Ripoti za Biashara
                </Link>
                {isAdmin && (
                  <Link to="/admin" className={`tnav-btn ${is("/admin") ? "active" : ""}`}>
                    Admin
                  </Link>
                )}
                <Link to="/mipangilio" className={`tnav-btn ${is("/mipangilio") ? "active" : ""}`}>
                  Mipangilio
                </Link>
                <Link to="/fuatilia" className={`tnav-btn ${is("/fuatilia") ? "active" : ""}`}>
                  Fuatilia
                </Link>
              </>
            )}
          </div>
          <div className="topbar-user">
            {user ? (
              <>
                <div className="user-avatar" aria-hidden>
                  {initials}
                </div>
                <span className="user-name">Wakala</span>
                {isAdmin && (
                  <span className="admin-badge">Admin</span>
                )}
                <button
                  type="button"
                  className="tnav-btn signout-btn"
                  onClick={handleSignOut}
                  disabled={isSigningOut}
                >
                  {isSigningOut ? "⏳" : "Toka"}
                </button>
              </>
            ) : (
              <Link to="/login" className="tnav-btn">
                Ingia
              </Link>
            )}
          </div>
        </div>

        <button
          type="button"
          className="topbar-burger"
          aria-expanded={menuOpen}
          aria-controls="topbar-mobile-menu"
          aria-label={menuOpen ? "Funga menyu" : "Fungua menyu"}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className="topbar-burger-line" />
          <span className="topbar-burger-line" />
          <span className="topbar-burger-line" />
        </button>
      </nav>

      {menuOpen && (
        <div className="topbar-mobile-root" id="topbar-mobile-menu">
          <button
            type="button"
            className="topbar-backdrop"
            aria-label="Funga menyu"
            onClick={() => setMenuOpen(false)}
          />
          <div className="topbar-mobile-panel" role="dialog" aria-modal="true" aria-label="Menyu">
            <div className="topbar-mobile-panel-inner">
              <div className="topbar-mobile-links">{navLinks}</div>
              <div className="topbar-mobile-footer">
                {user ? (
                  <>
                    <div className="topbar-mobile-user">
                      <div className="user-avatar">{initials}</div>
                      <span className="user-name">Wakala</span>
                      {isAdmin && (
                        <span className="admin-badge">Admin</span>
                      )}
                    </div>
                    <button
                      type="button"
                      className="topbar-mobile-signout"
                      onClick={handleSignOut}
                      disabled={isSigningOut}
                    >
                      {isSigningOut ? "⏳ Inatoka..." : "🚪 Toka"}
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="topbar-mobile-signin"
                    onClick={() => setMenuOpen(false)}
                  >
                    Ingia
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CSS */}
      <style>{`
        .topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 1.5rem;
          height: 64px;
          background: white;
          border-bottom: 1px solid #e5e7eb;
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }

        .topbar-brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
          color: #1a1a2e;
          font-weight: 700;
          font-size: 1.1rem;
        }

        .brand-logo-img {
          height: 38px;
          width: auto;
          object-fit: contain;
        }

        .brand-name {
          font-size: 1rem;
          font-weight: 700;
          color: #1a1a2e;
        }

        .topbar-desktop {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          flex: 1;
          justify-content: flex-end;
        }

        .topbar-nav {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .tnav-btn {
          padding: 0.5rem 0.75rem;
          border: none;
          background: transparent;
          color: #666;
          font-weight: 500;
          font-size: 0.85rem;
          border-radius: 6px;
          cursor: pointer;
          transition: 0.2s;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
        }

        .tnav-btn:hover {
          background: #f0f0f0;
          color: #1a1a2e;
        }

        .tnav-btn.active {
          background: #eb5325;
          color: white;
        }

        .tnav-btn.active:hover {
          background: #d44a1f;
        }

        .signout-btn {
          color: #dc2626;
        }

        .signout-btn:hover:not(:disabled) {
          background: #fee2e2;
        }

        .signout-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .topbar-user {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .user-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: linear-gradient(135deg, #eb5325, #d44a1f);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 12px;
          flex-shrink: 0;
        }

        .user-name {
          font-weight: 500;
          font-size: 0.85rem;
          color: #1a1a2e;
        }

        .admin-badge {
          background: #eb5325;
          color: white;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 0.6rem;
          font-weight: 700;
          text-transform: uppercase;
        }

        .topbar-burger {
          display: none;
          flex-direction: column;
          gap: 4px;
          padding: 8px;
          border: none;
          background: transparent;
          cursor: pointer;
        }

        .topbar-burger-line {
          width: 24px;
          height: 2px;
          background: #1a1a2e;
          border-radius: 2px;
          transition: 0.3s;
        }

        .topbar-mobile-root {
          position: fixed;
          inset: 0;
          z-index: 200;
          display: flex;
        }

        .topbar-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.4);
          border: none;
          cursor: pointer;
        }

        .topbar-mobile-panel {
          position: relative;
          margin-left: auto;
          width: 300px;
          max-width: 80%;
          height: 100%;
          background: white;
          box-shadow: -4px 0 20px rgba(0,0,0,0.1);
          animation: slideIn 0.3s ease;
        }

        @keyframes slideIn {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }

        .topbar-mobile-panel-inner {
          display: flex;
          flex-direction: column;
          height: 100%;
          padding: 20px;
        }

        .topbar-mobile-links {
          display: flex;
          flex-direction: column;
          gap: 4px;
          flex: 1;
          overflow-y: auto;
        }

        .topbar-mobile-link {
          padding: 12px 16px;
          border-radius: 8px;
          color: #1a1a2e;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.95rem;
          transition: 0.2s;
          border: none;
          background: transparent;
          text-align: left;
        }

        .topbar-mobile-link:hover {
          background: #f0f0f0;
        }

        .topbar-mobile-link.active {
          background: #eb5325;
          color: white;
        }

        .topbar-mobile-link.active:hover {
          background: #d44a1f;
        }

        .topbar-mobile-footer {
          border-top: 1px solid #e5e7eb;
          padding-top: 16px;
          margin-top: 8px;
        }

        .topbar-mobile-user {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 4px;
          margin-bottom: 12px;
        }

        .topbar-mobile-signout {
          width: 100%;
          padding: 12px;
          background: #fee2e2;
          color: #dc2626;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          transition: 0.2s;
        }

        .topbar-mobile-signout:hover:not(:disabled) {
          background: #fecaca;
        }

        .topbar-mobile-signout:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .topbar-mobile-signin {
          display: block;
          width: 100%;
          padding: 12px;
          background: #eb5325;
          color: white;
          border-radius: 8px;
          text-align: center;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.95rem;
        }

        .topbar-mobile-signin:hover {
          background: #d44a1f;
        }

        @media (max-width: 1024px) {
          .topbar-desktop {
            display: none;
          }

          .topbar-burger {
            display: flex;
          }

          .brand-name {
            font-size: 0.85rem;
          }
        }

        @media (max-width: 480px) {
          .topbar {
            padding: 0 1rem;
            height: 56px;
          }

          .brand-logo-img {
            height: 30px;
          }

          .brand-name {
            font-size: 0.75rem;
          }

          .topbar-mobile-panel {
            width: 280px;
          }

          .topbar-mobile-link {
            font-size: 0.85rem;
            padding: 10px 14px;
          }
        }
      `}</style>
    </>
  );
}