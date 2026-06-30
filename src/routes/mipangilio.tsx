import { useState, useEffect } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/mipangilio")({
  head: () => ({
    meta: [
      { title: "Mipangilio - GJ General Traders" },
      {
        name: "description",
        content: "Mipangilio yako ya akaunti",
      },
    ],
  }),
  component: MipangilioPage,
});

function MipangilioPage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"profile" | "security" | "notifications" | "preferences">("profile");
  const [isSaving, setIsSaving] = useState(false);
  
  // Profile form state
  const [fullName, setFullName] = useState(user?.user_metadata?.full_name || "");
  const [phone, setPhone] = useState(user?.user_metadata?.phone || "");
  const [email] = useState(user?.email || "");

  // Security form state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Notification preferences - stored in localStorage with proper defaults
  const [emailNotifications, setEmailNotifications] = useState(() => {
    const saved = localStorage.getItem("emailNotifications");
    return saved !== null ? saved === "true" : true;
  });
  const [smsNotifications, setSmsNotifications] = useState(() => {
    const saved = localStorage.getItem("smsNotifications");
    return saved !== null ? saved === "true" : true;
  });
  const [paymentAlerts, setPaymentAlerts] = useState(() => {
    const saved = localStorage.getItem("paymentAlerts");
    return saved !== null ? saved === "true" : true;
  });
  const [promotionalEmails, setPromotionalEmails] = useState(() => {
    const saved = localStorage.getItem("promotionalEmails");
    return saved !== null ? saved === "true" : false;
  });

  // Preferences - stored in localStorage
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("language") || "sw";
  });
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  // Apply theme changes immediately
  useEffect(() => {
    const applyTheme = (selectedTheme: string) => {
      const root = document.documentElement;
      if (selectedTheme === "dark") {
        root.style.setProperty('--bg-primary', '#1a1a2e');
        root.style.setProperty('--bg-secondary', '#16213e');
        root.style.setProperty('--text-primary', '#ffffff');
        root.style.setProperty('--text-secondary', '#87ceeb');
        root.style.setProperty('--card-bg', '#1f1f3a');
        root.style.setProperty('--border-color', '#2d2d4a');
        document.body.style.backgroundColor = '#0f0f1a';
        document.body.style.color = '#ffffff';
      } else if (selectedTheme === "light") {
        root.style.setProperty('--bg-primary', '#f8f9fa');
        root.style.setProperty('--bg-secondary', '#ffffff');
        root.style.setProperty('--text-primary', '#1a1a2e');
        root.style.setProperty('--text-secondary', '#666666');
        root.style.setProperty('--card-bg', '#ffffff');
        root.style.setProperty('--border-color', '#e5e7eb');
        document.body.style.backgroundColor = '#f8f9fa';
        document.body.style.color = '#1a1a2e';
      } else if (selectedTheme === "auto") {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
          root.style.setProperty('--bg-primary', '#1a1a2e');
          root.style.setProperty('--bg-secondary', '#16213e');
          root.style.setProperty('--text-primary', '#ffffff');
          root.style.setProperty('--text-secondary', '#87ceeb');
          root.style.setProperty('--card-bg', '#1f1f3a');
          root.style.setProperty('--border-color', '#2d2d4a');
          document.body.style.backgroundColor = '#0f0f1a';
          document.body.style.color = '#ffffff';
        } else {
          root.style.setProperty('--bg-primary', '#f8f9fa');
          root.style.setProperty('--bg-secondary', '#ffffff');
          root.style.setProperty('--text-primary', '#1a1a2e');
          root.style.setProperty('--text-secondary', '#666666');
          root.style.setProperty('--card-bg', '#ffffff');
          root.style.setProperty('--border-color', '#e5e7eb');
          document.body.style.backgroundColor = '#f8f9fa';
          document.body.style.color = '#1a1a2e';
        }
      }
    };

    applyTheme(theme);
  }, [theme]);

  // Apply language changes immediately
  useEffect(() => {
    // Store language preference
    localStorage.setItem("language", language);
    // You can add language translation logic here
    // For now, we just store it
  }, [language]);

  // Listen for system theme changes when in auto mode
  useEffect(() => {
    if (theme === "auto") {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => {
        // Re-apply auto theme
        const root = document.documentElement;
        if (mediaQuery.matches) {
          root.style.setProperty('--bg-primary', '#1a1a2e');
          root.style.setProperty('--bg-secondary', '#16213e');
          root.style.setProperty('--text-primary', '#ffffff');
          root.style.setProperty('--text-secondary', '#87ceeb');
          root.style.setProperty('--card-bg', '#1f1f3a');
          root.style.setProperty('--border-color', '#2d2d4a');
          document.body.style.backgroundColor = '#0f0f1a';
          document.body.style.color = '#ffffff';
        } else {
          root.style.setProperty('--bg-primary', '#f8f9fa');
          root.style.setProperty('--bg-secondary', '#ffffff');
          root.style.setProperty('--text-primary', '#1a1a2e');
          root.style.setProperty('--text-secondary', '#666666');
          root.style.setProperty('--card-bg', '#ffffff');
          root.style.setProperty('--border-color', '#e5e7eb');
          document.body.style.backgroundColor = '#f8f9fa';
          document.body.style.color = '#1a1a2e';
        }
      };
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  if (!user) {
    navigate({ to: "/login" });
    return null;
  }

  // Handle Profile Update - CRUD Update
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    setTimeout(() => {
      // Update user profile in localStorage
      const userData = {
        fullName,
        phone,
        email
      };
      localStorage.setItem(`profile_${user.email}`, JSON.stringify(userData));
      
      toast.success("✅ Mipangilio ya profaili imesasishwa kwa mafanikio!");
      setIsSaving(false);
    }, 600);
  };

  // Handle Password Update - CRUD Update
  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword.length < 6) {
      toast.error("⚠️ Nywila mpya lazima iwe na herufi 6 au zaidi");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("⚠️ Nywila mpya na uthibitisho hazifanani");
      return;
    }

    if (newPassword === currentPassword) {
      toast.error("⚠️ Nywila mpya haiwezi kuwa sawa na nywila ya sasa");
      return;
    }

    setIsSaving(true);
    
    setTimeout(() => {
      // Store password change (in real app, this would call backend)
      localStorage.setItem(`password_${user.email}`, newPassword);
      
      toast.success("✅ Nywila imebadilishwa kwa mafanikio!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setIsSaving(false);
    }, 600);
  };

  // Handle Notification Update - CRUD Update
  const handleNotificationUpdate = () => {
    setIsSaving(true);
    
    setTimeout(() => {
      // Save to localStorage with proper boolean conversion
      localStorage.setItem("emailNotifications", String(emailNotifications));
      localStorage.setItem("smsNotifications", String(smsNotifications));
      localStorage.setItem("paymentAlerts", String(paymentAlerts));
      localStorage.setItem("promotionalEmails", String(promotionalEmails));
      
      toast.success("✅ Mipangilio ya arifa imesasishwa!");
      setIsSaving(false);
    }, 500);
  };

  // Handle Preferences Update - CRUD Update
  const handlePreferencesUpdate = () => {
    setIsSaving(true);
    
    setTimeout(() => {
      // Save to localStorage
      localStorage.setItem("language", language);
      localStorage.setItem("theme", theme);
      
      toast.success("✅ Mapendeleo yamehifadhiwa!");
      setIsSaving(false);
    }, 500);
  };

  // Handle individual preference changes with auto-save
  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
    toast.success(`🌐 Lugha imebadilishwa hadi ${newLanguage === "sw" ? "Kiswahili" : "English"}`);
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    const themeNames = {
      light: "Nuru",
      dark: "Giza",
      auto: "Otomatiki"
    };
    toast.success(`🎨 Mandhari imebadilishwa hadi ${themeNames[newTheme as keyof typeof themeNames]}`);
  };

  const handleLogout = async () => {
    await signOut();
    navigate({ to: "/" });
    toast.success("Umetoka kwenye akaunti yako");
  };

  return (
    <div className="mipangilio-page">
      <div className="mipangilio-container">
        {/* Header */}
        <div className="mipangilio-header">
          <Link to="/dashboard" className="back-button">
            ← Rudi Dashboard
          </Link>
          <h1 className="page-title">⚙️ Mipangilio</h1>
          <p className="page-subtitle">Dhibiti na usimamie akaunti yako</p>
        </div>

        {/* User Info */}
        <div className="user-info-card">
          <div className="user-avatar-large">
            {user?.email?.slice(0, 2).toUpperCase() || "GJ"}
          </div>
          <div className="user-details">
            <h3>{fullName || "Mtumiaji"}</h3>
            <p>{email}</p>
            <span className="user-role">Wakala</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="mipangilio-tabs">
          <button 
            className={`tab-btn ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            👤 Profaili
          </button>
          <button 
            className={`tab-btn ${activeTab === "security" ? "active" : ""}`}
            onClick={() => setActiveTab("security")}
          >
            🔒 Usalama
          </button>
          <button 
            className={`tab-btn ${activeTab === "notifications" ? "active" : ""}`}
            onClick={() => setActiveTab("notifications")}
          >
            🔔 Arifa
          </button>
          <button 
            className={`tab-btn ${activeTab === "preferences" ? "active" : ""}`}
            onClick={() => setActiveTab("preferences")}
          >
            🎨 Mapendeleo
          </button>
        </div>

        {/* Tab Content */}
        <div className="mipangilio-content">
          {/* Profile Tab - CRUD */}
          {activeTab === "profile" && (
            <div className="profile-section">
              <h3>Maelezo ya Akaunti</h3>
              <form onSubmit={handleProfileUpdate} className="settings-form">
                <div className="form-group">
                  <label className="form-label">Jina Kamili</label>
                  <input 
                    type="text" 
                    className="form-input"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ingiza jina lako kamili"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Barua Pepe</label>
                  <input 
                    type="email" 
                    className="form-input"
                    value={email}
                    disabled
                    style={{ background: "#f0f0f0", cursor: "not-allowed" }}
                  />
                  <span className="form-hint">📌 Barua pepe haiwezi kubadilishwa</span>
                </div>

                <div className="form-group">
                  <label className="form-label">Namba ya Simu</label>
                  <input 
                    type="tel" 
                    className="form-input"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="07XXXXXXXX"
                  />
                </div>

                <button type="submit" className="save-btn" disabled={isSaving}>
                  {isSaving ? "⏳ Inahifadhi..." : "💾 Hifadhi Mabadiliko"}
                </button>
              </form>

              <div className="danger-zone">
                <h4>⚠️ Eneo la Hatari</h4>
                <p>Vitendo hivi haviwezi kugeuzwa. Tafadhali kuwa mwangalifu.</p>
                <button onClick={handleLogout} className="logout-btn">
                  🚪 Toka Akaunti
                </button>
              </div>
            </div>
          )}

          {/* Security Tab - CRUD */}
          {activeTab === "security" && (
            <div className="security-section">
              <h3>Badilisha Nywila</h3>
              <form onSubmit={handlePasswordUpdate} className="settings-form">
                <div className="form-group">
                  <label className="form-label">Nywila ya Sasa</label>
                  <input 
                    type="password" 
                    className="form-input"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Ingiza nywila yako ya sasa"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Nywila Mpya</label>
                  <input 
                    type="password" 
                    className="form-input"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Ingiza nywila mpya"
                    required
                    minLength={6}
                  />
                  <span className="form-hint">🔑 Nywila lazima iwe na herufi 6 au zaidi</span>
                </div>

                <div className="form-group">
                  <label className="form-label">Thibitisha Nywila Mpya</label>
                  <input 
                    type="password" 
                    className="form-input"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Andika tena nywila mpya"
                    required
                  />
                </div>

                <button type="submit" className="save-btn" disabled={isSaving}>
                  {isSaving ? "⏳ Inabadilisha..." : "🔒 Badilisha Nywila"}
                </button>
              </form>

              <div className="security-tips">
                <h4>🔐 Vidokezo vya Usalama</h4>
                <ul>
                  <li>✓ Tumia nywila yenye herufi 8 au zaidi</li>
                  <li>✓ Changanya herufi kubwa, ndogo, namba na alama</li>
                  <li>✓ Usitumie nywila sawa kwenye akaunti mbalimbali</li>
                  <li>✓ Badilisha nywila yako mara kwa mara</li>
                  <li>✓ Usishiriki nywila yako na mtu yeyote</li>
                </ul>
              </div>
            </div>
          )}

          {/* Notifications Tab - CRUD with fixes */}
          {activeTab === "notifications" && (
            <div className="notifications-section">
              <h3>Mipangilio ya Arifa</h3>
              
              <div className="notifications-list">
                <div className="notification-item">
                  <div className="notification-info">
                    <div className="notification-icon">📧</div>
                    <div>
                      <h4>Arifa za Barua Pepe</h4>
                      <p>Pokea arifa kupitia barua pepe</p>
                    </div>
                  </div>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={emailNotifications}
                      onChange={() => setEmailNotifications(!emailNotifications)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="notification-item">
                  <div className="notification-info">
                    <div className="notification-icon">📱</div>
                    <div>
                      <h4>Arifa za SMS</h4>
                      <p>Pokea arifa kupitia ujumbe wa SMS</p>
                    </div>
                  </div>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={smsNotifications}
                      onChange={() => setSmsNotifications(!smsNotifications)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="notification-item">
                  <div className="notification-info">
                    <div className="notification-icon">💰</div>
                    <div>
                      <h4>Arifa za Malipo</h4>
                      <p>Pokea arifa wakati malipo yanakamilika</p>
                    </div>
                  </div>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={paymentAlerts}
                      onChange={() => setPaymentAlerts(!paymentAlerts)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="notification-item">
                  <div className="notification-info">
                    <div className="notification-icon">📨</div>
                    <div>
                      <h4>Barua Pepe za Matangazo</h4>
                      <p>Pokea habari na matangazo mapya</p>
                    </div>
                  </div>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={promotionalEmails}
                      onChange={() => setPromotionalEmails(!promotionalEmails)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>

              <button onClick={handleNotificationUpdate} className="save-btn" disabled={isSaving}>
                {isSaving ? "⏳ Inahifadhi..." : "💾 Hifadhi Mipangilio ya Arifa"}
              </button>
            </div>
          )}

          {/* Preferences Tab - CRUD with working language and theme */}
          {activeTab === "preferences" && (
            <div className="preferences-section">
              <h3>Mapendeleo Yako</h3>

              <div className="preference-group">
                <label className="preference-label">🌐 Lugha</label>
                <div className="preference-options">
                  <button 
                    className={`pref-option ${language === "sw" ? "active" : ""}`}
                    onClick={() => handleLanguageChange("sw")}
                  >
                    🇹🇿 Kiswahili
                  </button>
                  <button 
                    className={`pref-option ${language === "en" ? "active" : ""}`}
                    onClick={() => handleLanguageChange("en")}
                  >
                    🇬🇧 English
                  </button>
                </div>
                <span className="preference-hint">
                  {language === "sw" ? "Lugha ya sasa: Kiswahili" : "Current language: English"}
                </span>
              </div>

              <div className="preference-group">
                <label className="preference-label">🎨 Mandhari (Theme)</label>
                <div className="preference-options">
                  <button 
                    className={`pref-option ${theme === "light" ? "active" : ""}`}
                    onClick={() => handleThemeChange("light")}
                  >
                    ☀️ Nuru (Light)
                  </button>
                  <button 
                    className={`pref-option ${theme === "dark" ? "active" : ""}`}
                    onClick={() => handleThemeChange("dark")}
                  >
                    🌙 Giza (Dark)
                  </button>
                  <button 
                    className={`pref-option ${theme === "auto" ? "active" : ""}`}
                    onClick={() => handleThemeChange("auto")}
                  >
                    🔄 Otomatiki (Auto)
                  </button>
                </div>
                <span className="preference-hint">
                  {theme === "light" ? "Mandhari ya sasa: Nuru" : 
                   theme === "dark" ? "Mandhari ya sasa: Giza" : 
                   "Mandhari ya sasa: Otomatiki (kulingana na mfumo)"}
                </span>
              </div>

              <button onClick={handlePreferencesUpdate} className="save-btn" disabled={isSaving}>
                {isSaving ? "⏳ Inahifadhi..." : "💾 Hifadhi Mapendeleo"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* CSS with theme variables */}
      <style>{`
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
      `}</style>
    </div>
  );
}