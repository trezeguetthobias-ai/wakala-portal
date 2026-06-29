import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Ingia — GJ General Traders" }] }),
  component: LoginPage,
});

const validEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

function LoginPage() {
  const navigate = useNavigate();
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [tab, setTab] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect based on role when user is authenticated
  useEffect(() => {
    if (!authLoading && user) {
      console.log("User logged in:", user.email);
      console.log("Is Admin:", isAdmin);
      
      if (isAdmin) {
        console.log("Redirecting to admin page...");
        navigate({ to: "/admin" });
      } else {
        console.log("Redirecting to dashboard...");
        navigate({ to: "/dashboard" });
      }
    }
  }, [user, isAdmin, authLoading, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validEmail(email)) {
      toast.error("Barua pepe si sahihi");
      return;
    }

    if (password.length < 6) {
      toast.error("Nywila lazima iwe na herufi 6 au zaidi");
      return;
    }

    setLoading(true);
    const tId = toast.loading(tab === "login" ? "Inakuingiza..." : "Inafungua akaunti...");

    try {
      if (tab === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: {
              full_name: name,
              phone: phone || null,
            },
          },
        });

        if (error) throw error;

        toast.success("Akaunti imefunguliwa! Angalia email kuthibitisha.", { id: tId });
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        // Wait for session sync
        await new Promise((r) => setTimeout(r, 500));

        // Get fresh user data
        const { data: userData } = await supabase.auth.getUser();
        console.log("Fresh user data:", userData);

        // Check role from user_roles table
        const { data: roleData } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", data.user?.id)
          .maybeSingle();

        console.log("Role from table:", roleData);

        toast.dismiss(tId);
        toast.success("Karibu tena!", { id: tId });

        // Redirect based on role
        if (roleData?.role === "admin") {
          console.log("Redirecting to admin page after login...");
          navigate({ to: "/admin" });
        } else {
          console.log("Redirecting to dashboard after login...");
          navigate({ to: "/dashboard" });
        }
      }
    } catch (err: any) {
      toast.error(err.message || "Hitilafu imetokea", { id: tId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-brand">
          <img src="/gj-logo.jpeg" alt="GJ General Traders" className="login-logo-img" />
          <div className="login-brand-title">GJ Traders Portal</div>
        </div>

        <div className="auth-tabs">
          <button type="button" className={`auth-tab ${tab==="login"?"active":""}`} onClick={()=>setTab("login")}>Ingia</button>
          <button type="button" className={`auth-tab ${tab==="signup"?"active":""}`} onClick={()=>setTab("signup")}>Jiandikishe</button>
        </div>

        <h1 className="auth-heading">{tab === "login" ? "Ingia Akaunti" : "Fungua Akaunti"}</h1>
        <p className="auth-sub">
          {tab === "login" ? "Tumia barua pepe na nywila kuingia kwenye mfumo" : "Jaza taarifa zifuatazo kufungua akaunti yako"}
        </p>

        <div className="info-banner">
          <span className="ib-icon">ⓘ</span>
          Tumia barua pepe yako kama jina la mtumiaji
        </div>

        <form onSubmit={submit} className="auth-form">
          {tab === "signup" && (
            <div className="form-group">
              <label className="form-label">JINA KAMILI *</label>
              <input className="form-input" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Mfano: Juma Athumani" required />
            </div>
          )}

          <div className="form-group">
            <label className="form-label">BARUA PEPE *</label>
            <div className="input-with-icon">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <input type="email" className="form-input" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="jina@mfano.com" required />
            </div>
          </div>

          {tab === "signup" && (
            <div className="form-group">
              <label className="form-label">NAMBA YA SIMU (HIARI)</label>
              <input className="form-input" value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="07XXXXXXXX" />
            </div>
          )}

          <div className="form-group">
            <label className="form-label">NYWILA *</label>
            <div className="input-with-icon">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              <input type={showPwd?"text":"password"} className="form-input" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Ingiza nywila yako" required minLength={6} />
              <button type="button" className="pwd-toggle" onClick={()=>setShowPwd(s=>!s)} aria-label="Onyesha nywila">
                {showPwd ? "🙈" : "👁"}
              </button>
            </div>
          </div>

          <button type="submit" className="btn-red" disabled={loading}>
            {loading ? "Inasubiri..." : tab === "login" ? "Ingia Sasa" : "Fungua Akaunti"}
          </button>
        </form>

        <div className="login-note">
          {tab === "login" ? "Huna akaunti? " : "Una akaunti tayari? "}
          <a onClick={() => setTab(tab === "login" ? "signup" : "login")}>
            {tab === "login" ? "Jiandikishe hapa" : "Ingia hapa"}
          </a>
        </div>
        <div className="login-note"><Link to="/">← Rudi nyumbani</Link></div>
      </div>
    </div>
  );
}