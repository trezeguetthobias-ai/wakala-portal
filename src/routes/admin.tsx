import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { downloadContract, openContract, type ApplicationContract } from "@/lib/contract-storage";
import {
  APPLICATION_DETAIL_FIELDS,
  detailValue,
  formatTzs,
  getCommission,
  statusLabel,
  typeLabel,
} from "@/lib/application-utils";
import { toast } from "sonner";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin Panel — GJ General Traders" }] }),
  component: AdminPage,
});

type ApplicationRow = {
  id: string;
  ref_no: string;
  type: string;
  status: string;
  category: string | null;
  customer_name: string;
  phone: string;
  alt_phone: string | null;
  tin: string | null;
  id_type: string | null;
  id_number: string | null;
  business_name: string | null;
  business_type: string | null;
  email: string | null;
  ward: string | null;
  district: string | null;
  region: string | null;
  has_agent_line: boolean | null;
  notes: string | null;
  till_code: string | null;
  admin_notes: string | null;
  contract_path: string | null;
  signature_data: string | null;
  created_at: string;
  user_id: string;
};

function AdminPage() {
  const { user, isAdmin, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const [apps, setApps] = useState<ApplicationRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"pending" | "all">("pending");
  const [detail, setDetail] = useState<ApplicationRow | null>(null);
  const [approveTarget, setApproveTarget] = useState<ApplicationRow | null>(null);
  const [tillCodeInput, setTillCodeInput] = useState("");
  const [adminNotesInput, setAdminNotesInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        navigate({ to: "/login" });
        return;
      }
      if (!isAdmin) {
        toast.error("Hauna ruhusa ya kufikia ukurasa huu");
        navigate({ to: "/dashboard" });
        return;
      }
    }
  }, [authLoading, user, isAdmin, navigate]);

  const loadApplications = async () => {
    if (!user || !isAdmin) return;
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from("applications")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        setError(error.message);
        toast.error("Imeshindwa kupakia maombi");
        setApps([]);
        return;
      }
      setApps(data || []);
    } catch (err: any) {
      setError(err.message);
      toast.error("Hitilafu imetokea");
      setApps([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && isAdmin) loadApplications();
  }, [user, isAdmin]);

  const refreshData = () => {
    loadApplications();
    toast.info("Inasasisha data...");
  };

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success("Umetoka kwenye mfumo");
      navigate({ to: "/login" });
    } catch (err) {
      toast.error("Imeshindwa kutoka");
    }
  };

  const stats = useMemo(
    () => ({
      total: apps.length,
      pending: apps.filter((a) => a.status === "pending").length,
      approved: apps.filter((a) => a.status === "approved").length,
      rejected: apps.filter((a) => a.status === "rejected").length,
      processing: apps.filter((a) => a.status === "processing").length,
      users: new Set(apps.map((a) => a.user_id)).size,
    }),
    [apps],
  );

  const decide = async (
    id: string,
    status: "approved" | "rejected" | "processing",
    extras?: { till_code?: string | null; admin_notes?: string | null },
  ) => {
    const payload: any = { status };
    if (extras?.till_code !== undefined) payload.till_code = extras.till_code || null;
    if (extras?.admin_notes !== undefined) payload.admin_notes = extras.admin_notes || null;

    setSaving(true);
    try {
      const { error } = await supabase.from("applications").update(payload).eq("id", id);
      if (error) throw error;
      
      const messages = {
        approved: "Ombi limekubaliwa kwa mafanikio!",
        rejected: "Ombi limekataliwa",
        processing: "Ombi linaendelea kushughulikiwa"
      };
      
      toast.success(messages[status]);
      await loadApplications();
      setApproveTarget(null);
      setDetail(null);
    } catch (err: any) {
      toast.error("Imeshindwa: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const openApprove = (row: ApplicationRow) => {
    setApproveTarget(row);
    setTillCodeInput(row.till_code || "");
    setAdminNotesInput(row.admin_notes || "");
  };

  const submitApprove = async () => {
    if (!approveTarget) return;
    const till = tillCodeInput.trim();
    if (!till) {
      toast.error("Tafadhali ingiza Till Code");
      return;
    }
    await decide(approveTarget.id, "approved", {
      till_code: till,
      admin_notes: adminNotesInput.trim() || null,
    });
  };

  const handleOpenContract = (app: ApplicationRow) => {
    if (!app.contract_path) {
      toast.info("Mkataba haujazalishwa bado");
      return;
    }
    const contractData: ApplicationContract = {
      ref_no: app.ref_no || app.id.slice(0, 8),
      date: new Date(app.created_at).toISOString().split('T')[0],
      customer_name: app.customer_name || '',
      phone: app.phone || '',
      alt_phone: app.alt_phone || undefined,
      tin: app.tin || undefined,
      id_type: app.id_type || 'NIDA',
      id_number: app.id_number || '',
      business_name: app.business_name || undefined,
      business_type: app.business_type || undefined,
      email: app.email || undefined,
      ward: app.ward || undefined,
      district: app.district || undefined,
      region: app.region || undefined,
      type: app.type as "wakala" | "lipa" | "voda",
      category: app.category || undefined,
      signature_data: app.signature_data || undefined,
      contract_path: app.contract_path,
    };
    openContract(contractData);
  };

  const handleDownloadContract = (app: ApplicationRow) => {
    if (!app.contract_path) {
      toast.info("Mkataba haujazalishwa bado");
      return;
    }
    const contractData: ApplicationContract = {
      ref_no: app.ref_no || app.id.slice(0, 8),
      date: new Date(app.created_at).toISOString().split('T')[0],
      customer_name: app.customer_name || '',
      phone: app.phone || '',
      alt_phone: app.alt_phone || undefined,
      tin: app.tin || undefined,
      id_type: app.id_type || 'NIDA',
      id_number: app.id_number || '',
      business_name: app.business_name || undefined,
      business_type: app.business_type || undefined,
      email: app.email || undefined,
      ward: app.ward || undefined,
      district: app.district || undefined,
      region: app.region || undefined,
      type: app.type as "wakala" | "lipa" | "voda",
      category: app.category || undefined,
      signature_data: app.signature_data || undefined,
      contract_path: app.contract_path,
    };
    downloadContract(contractData);
  };

  if (authLoading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>Inapakia...</p>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="admin-container">
        <div className="info-box error">
          <strong>⚠️ Hauna ruhusa ya kufikia ukurasa huu.</strong>
          <Link to="/dashboard" className="btn-primary" style={{display:"inline-block",marginTop:"15px",padding:"10px 20px"}}>Rudi Dashboard</Link>
        </div>
      </div>
    );
  }

  const matchesSearch = (a: ApplicationRow) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return [a.ref_no, a.customer_name, a.phone, a.tin, a.id_number, a.business_name]
      .filter(Boolean)
      .some((v) => String(v).toLowerCase().includes(q));
  };

  const visible = (tab === "pending" ? apps.filter((a) => a.status === "pending") : apps).filter(matchesSearch);

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-brand">
          <span className="brand-icon">⚡</span>
          <span className="brand-text">Admin</span>
        </div>
        <nav className="sidebar-nav">
          <button 
            className={`sidebar-link ${tab === "all" ? "active" : ""}`} 
            onClick={() => setTab("all")}
          >
            <span className="link-icon">📊</span> Muhtasari
          </button>
          <button 
            className={`sidebar-link ${tab === "pending" ? "active" : ""}`} 
            onClick={() => setTab("pending")}
          >
            <span className="link-icon">⏳</span> Yanasubiri ({stats.pending})
          </button>
          <button className="sidebar-link" onClick={refreshData}>
            <span className="link-icon">🔄</span> Onyesha Upya
          </button>
          <Link to="/reports" className="sidebar-link">
            <span className="link-icon">📈</span> Ripoti
          </Link>
          <Link to="/mipangilio" className="sidebar-link">
            <span className="link-icon">⚙️</span> Mipangilio
          </Link>
        </nav>
        <div className="sidebar-footer">
          <button onClick={handleLogout} className="btn-sidebar-logout">
            🚪 Ondoka
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <div className="admin-header">
          <div>
            <h1>Dashibodi ya Msimamizi</h1>
            <p className="admin-subtitle">Simamia maombi ya watumiaji wote</p>
          </div>
          <div className="admin-actions-top">
            <button className="btn-refresh" onClick={refreshData}>
              🔄 Onyesha Upya
            </button>
            <button onClick={handleLogout} className="btn-mobile-logout-top">
              🚪 Ondoka
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📋</div>
            <div>
              <div className="stat-number">{stats.total}</div>
              <div className="stat-label">Jumla ya Maombi</div>
            </div>
          </div>
          <div className="stat-card pending">
            <div className="stat-icon">⏳</div>
            <div>
              <div className="stat-number">{stats.pending}</div>
              <div className="stat-label">Yanasubiri</div>
            </div>
          </div>
          <div className="stat-card approved">
            <div className="stat-icon">✅</div>
            <div>
              <div className="stat-number">{stats.approved}</div>
              <div className="stat-label">Yamekubaliwa</div>
            </div>
          </div>
          <div className="stat-card rejected">
            <div className="stat-icon">❌</div>
            <div>
              <div className="stat-number">{stats.rejected}</div>
              <div className="stat-label">Yamekataliwa</div>
            </div>
          </div>
          <div className="stat-card processing">
            <div className="stat-icon">🔄</div>
            <div>
              <div className="stat-number">{stats.processing}</div>
              <div className="stat-label">Yanashughulikiwa</div>
            </div>
          </div>
          <div className="stat-card users">
            <div className="stat-icon">👥</div>
            <div>
              <div className="stat-number">{stats.users}</div>
              <div className="stat-label">Watumiaji</div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="search-bar">
          <input 
            type="search" 
            className="search-input" 
            placeholder="🔍 Tafuta kwa jina, simu, TIN, au namba ya ombi..." 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
          />
          <span className="search-count">Maombi {visible.length}</span>
        </div>

        {/* Table */}
        <div className="table-wrapper">
          {loading ? (
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <p>Inapakia maombi...</p>
            </div>
          ) : error ? (
            <div className="error-state">
              <p>⚠️ {error}</p>
              <button className="btn-primary" onClick={refreshData}>Jaribu Tena</button>
            </div>
          ) : (
            <div className="table-scroll">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Namba</th>
                    <th>Mteja</th>
                    <th>Aina</th>
                    <th>Simu</th>
                    <th>Kamisheni</th>
                    <th>Till Code</th>
                    <th>Hali</th>
                    <th>Mkataba</th>
                    <th>Vitendo</th>
                  </tr>
                </thead>
                <tbody>
                  {visible.length === 0 && (
                    <tr>
                      <td colSpan={9} className="empty-state">
                        <div className="empty-icon">📭</div>
                        <p>Hakuna maombi yanayolingana na vichujio vyako.</p>
                      </td>
                    </tr>
                  )}
                  {visible.map((app) => (
                    <tr key={app.id}>
                      <td className="ref-cell">{app.ref_no || app.id.slice(0, 8)}</td>
                      <td className="customer-cell">{app.customer_name}</td>
                      <td>{typeLabel(app.type)}</td>
                      <td>{app.phone}</td>
                      <td className="commission-cell">{formatTzs(getCommission(app.type))}</td>
                      <td>{app.till_code || "—"}</td>
                      <td>
                        <span className={`status-badge ${app.status}`}>
                          {statusLabel(app.status)}
                        </span>
                      </td>
                      <td>
                        {app.contract_path ? (
                          <div className="contract-actions">
                            <button 
                              className="icon-btn" 
                              onClick={() => handleOpenContract(app)} 
                              title="Fungua Mkataba"
                            >
                              📄 Fungua
                            </button>
                            <button 
                              className="icon-btn" 
                              onClick={() => handleDownloadContract(app)} 
                              title="Pakua Mkataba"
                            >
                              ⬇️ Pakua
                            </button>
                          </div>
                        ) : (
                          <span className="text-muted">—</span>
                        )}
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            className="btn-view" 
                            onClick={() => setDetail(app)}
                          >
                            Tazama
                          </button>
                          {app.status === "pending" && (
                            <>
                              <button 
                                className="btn-approve" 
                                onClick={() => openApprove(app)}
                                disabled={saving}
                              >
                                Kubali
                              </button>
                              <button 
                                className="btn-process" 
                                onClick={() => decide(app.id, "processing")} 
                                disabled={saving}
                              >
                                Shughulikia
                              </button>
                              <button 
                                className="btn-reject" 
                                onClick={() => decide(app.id, "rejected")} 
                                disabled={saving}
                              >
                                Kataa
                              </button>
                            </>
                          )}
                          {app.status === "processing" && (
                            <>
                              <button 
                                className="btn-approve" 
                                onClick={() => openApprove(app)}
                                disabled={saving}
                              >
                                Kubali
                              </button>
                              <button 
                                className="btn-reject" 
                                onClick={() => decide(app.id, "rejected")} 
                                disabled={saving}
                              >
                                Kataa
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Detail Modal */}
      {detail && (
        <div className="modal-overlay" onClick={() => setDetail(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>📋 Taarifa za Ombi — {detail.ref_no}</h3>
              <button className="modal-close" onClick={() => setDetail(null)}>✕</button>
            </div>
            <div className="modal-body">
              {APPLICATION_DETAIL_FIELDS.map((f) => (
                <div key={f.key} className="detail-row">
                  <span className="detail-label">{f.label}</span>
                  <span className="detail-value">
                    {detailValue(detail as Record<string, unknown>, f) || "—"}
                  </span>
                </div>
              ))}
            </div>
            <div className="modal-footer">
              {detail.contract_path && (
                <>
                  <button className="btn-secondary" onClick={() => handleOpenContract(detail)}>
                    📄 Fungua Mkataba
                  </button>
                  <button className="btn-secondary" onClick={() => handleDownloadContract(detail)}>
                    ⬇️ Pakua Mkataba
                  </button>
                </>
              )}
              <button className="btn-secondary" onClick={() => setDetail(null)}>
                Funga
              </button>
              {detail.status === "pending" && (
                <button className="btn-primary" onClick={() => openApprove(detail)}>
                  Kubali Ombi
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Approve Modal */}
      {approveTarget && (
        <div className="modal-overlay" onClick={() => setApproveTarget(null)}>
          <div className="modal-content modal-sm" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>✅ Kubali Ombi — {approveTarget.ref_no}</h3>
              <button className="modal-close" onClick={() => setApproveTarget(null)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Till Code *</label>
                <input 
                  className="form-input" 
                  value={tillCodeInput} 
                  onChange={(e) => setTillCodeInput(e.target.value)} 
                  placeholder="Ingiza Till Code..." 
                  autoFocus 
                />
                <span className="form-hint">Till Code inahitajika ili kukamilisha ombi</span>
              </div>
              <div className="form-group">
                <label className="form-label">Maelezo ya Ziada (hiari)</label>
                <textarea 
                  className="form-textarea" 
                  rows={3} 
                  value={adminNotesInput} 
                  onChange={(e) => setAdminNotesInput(e.target.value)} 
                  placeholder="Ingiza maelezo yoyote ya ziada kwa mteja..." 
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setApproveTarget(null)}>
                Ghairi
              </button>
              <button 
                className="btn-primary" 
                disabled={saving} 
                onClick={submitApprove}
              >
                {saving ? "Inahifadhi..." : "Kubali Ombi"}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .admin-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          gap: 16px;
          background: #f8f9fa;
        }
        .admin-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px;
        }
        .admin-layout {
          display: flex;
          min-height: 100vh;
          background: #f4f6f9;
        }
        .admin-sidebar {
          width: 220px;
          background: #1a1a2e;
          color: white;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          flex-shrink: 0;
          padding: 20px 0;
        }
        .sidebar-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0 20px 20px 20px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .brand-icon { font-size: 24px; }
        .brand-text { font-size: 18px; font-weight: 800; }
        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 2px;
          padding: 15px 0;
        }
        .sidebar-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 20px;
          color: #cbd5e1;
          text-decoration: none;
          font-weight: 600;
          font-size: 14px;
          border: none;
          background: transparent;
          width: 100%;
          text-align: left;
          cursor: pointer;
          transition: 0.2s;
        }
        .sidebar-link:hover {
          background: rgba(255,255,255,0.08);
          color: white;
        }
        .sidebar-link.active {
          background: #eb5325;
          color: white;
          border-left: 4px solid white;
        }
        .link-icon { font-size: 18px; }
        .sidebar-footer {
          padding: 15px 20px;
          border-top: 1px solid rgba(255,255,255,0.1);
        }
        .btn-sidebar-logout {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          padding: 10px;
          background: #dc2626;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          transition: 0.2s;
        }
        .btn-sidebar-logout:hover {
          background: #b91c1c;
        }
        .admin-main {
          flex: 1;
          padding: 24px;
          overflow-x: auto;
        }
        .admin-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          flex-wrap: wrap;
          gap: 12px;
        }
        .admin-header h1 {
          font-size: 24px;
          font-weight: 800;
          margin: 0;
          color: #1a1a2e;
        }
        .admin-subtitle {
          font-size: 14px;
          color: #64748b;
          margin-top: 4px;
        }
        .admin-actions-top {
          display: flex;
          gap: 10px;
        }
        .btn-refresh {
          padding: 8px 16px;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: 0.2s;
        }
        .btn-refresh:hover {
          background: #f8fafc;
        }
        .btn-mobile-logout-top {
          display: none;
          padding: 8px 16px;
          background: #dc2626;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 700;
          font-size: 13px;
          cursor: pointer;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 12px;
          margin-bottom: 24px;
        }
        .stat-card {
          background: white;
          padding: 16px 14px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          gap: 12px;
          transition: 0.2s;
        }
        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        .stat-card.pending { border-left: 4px solid #f59e0b; }
        .stat-card.approved { border-left: 4px solid #10b981; }
        .stat-card.rejected { border-left: 4px solid #ef4444; }
        .stat-card.processing { border-left: 4px solid #3b82f6; }
        .stat-card.users { border-left: 4px solid #8b5cf6; }
        .stat-icon { font-size: 28px; }
        .stat-number { font-size: 22px; font-weight: 800; color: #1a1a2e; line-height: 1; }
        .stat-label { font-size: 11px; color: #64748b; font-weight: 600; margin-top: 2px; }
        .search-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: white;
          padding: 12px 16px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          margin-bottom: 24px;
          gap: 12px;
        }
        .search-input {
          flex: 1;
          padding: 8px 12px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          font-size: 14px;
        }
        .search-input:focus {
          outline: none;
          border-color: #eb5325;
          box-shadow: 0 0 0 3px rgba(235,83,37,0.1);
        }
        .search-count {
          font-size: 13px;
          font-weight: 600;
          color: #475569;
          background: #f1f5f9;
          padding: 4px 12px;
          border-radius: 20px;
        }
        .table-wrapper {
          background: white;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          overflow: hidden;
        }
        .table-scroll { overflow-x: auto; }
        .admin-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
          min-width: 800px;
        }
        .admin-table th {
          background: #f8fafc;
          padding: 10px 14px;
          font-weight: 700;
          color: #475569;
          font-size: 11px;
          text-transform: uppercase;
          border-bottom: 1px solid #e2e8f0;
        }
        .admin-table td {
          padding: 10px 14px;
          border-bottom: 1px solid #f1f5f9;
          vertical-align: middle;
        }
        .admin-table tbody tr:hover { background: #f8fafc; }
        .ref-cell { font-weight: 700; color: #eb5325; }
        .customer-cell { font-weight: 600; color: #1a1a2e; }
        .commission-cell { font-weight: 700; color: #10b981; }
        .status-badge {
          padding: 3px 10px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 700;
          display: inline-block;
        }
        .status-badge.pending { background: #fef3c7; color: #d97706; }
        .status-badge.approved { background: #d1fae5; color: #059669; }
        .status-badge.rejected { background: #fee2e2; color: #dc2626; }
        .status-badge.processing { background: #dbeafe; color: #2563eb; }
        .text-muted { color: #999; font-size: 12px; }
        .contract-actions { display: flex; gap: 6px; flex-wrap: wrap; }
        .icon-btn {
          padding: 4px 12px;
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          border-radius: 4px;
          cursor: pointer;
          font-size: 12px;
          font-weight: 600;
          transition: 0.2s;
        }
        .icon-btn:hover { background: #e2e8f0; }
        .action-buttons {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }
        .action-buttons button {
          padding: 5px 12px;
          border: none;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: 0.2s;
        }
        .action-buttons button:disabled { opacity: 0.5; cursor: not-allowed; }
        .btn-view {
          background: #e2e8f0;
          color: #1a1a2e;
        }
        .btn-view:hover:not(:disabled) { background: #cbd5e1; }
        .btn-approve {
          background: #10b981;
          color: white;
        }
        .btn-approve:hover:not(:disabled) { background: #059669; }
        .btn-process {
          background: #3b82f6;
          color: white;
        }
        .btn-process:hover:not(:disabled) { background: #2563eb; }
        .btn-reject {
          background: #ef4444;
          color: white;
        }
        .btn-reject:hover:not(:disabled) { background: #dc2626; }
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(15,23,42,0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          z-index: 999;
        }
        .modal-content {
          background: white;
          border-radius: 14px;
          width: 100%;
          max-width: 560px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1);
          animation: scaleUp 0.2s ease;
        }
        .modal-sm { max-width: 420px; }
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          border-bottom: 1px solid #e2e8f0;
          position: sticky;
          top: 0;
          background: white;
          border-radius: 14px 14px 0 0;
          z-index: 1;
        }
        .modal-header h3 {
          margin: 0;
          font-size: 17px;
          font-weight: 800;
        }
        .modal-close {
          border: none;
          background: transparent;
          font-size: 24px;
          cursor: pointer;
          color: #64748b;
        }
        .modal-close:hover { color: #1a1a2e; }
        .modal-body { padding: 20px; }
        .detail-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid #f1f5f9;
          font-size: 13px;
        }
        .detail-label { color: #64748b; font-weight: 600; }
        .detail-value { font-weight: 700; color: #1a1a2e; text-align: right; }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-bottom: 12px;
        }
        .form-label { font-weight: 700; font-size: 13px; color: #475569; }
        .form-hint { font-size: 12px; color: #94a3b8; }
        .form-input, .form-textarea {
          padding: 8px 12px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          font-size: 14px;
          width: 100%;
          box-sizing: border-box;
          font-family: inherit;
        }
        .form-input:focus, .form-textarea:focus {
          outline: none;
          border-color: #eb5325;
          box-shadow: 0 0 0 3px rgba(235,83,37,0.1);
        }
        .form-textarea { resize: vertical; }
        .modal-footer {
          padding: 14px 20px;
          border-top: 1px solid #e2e8f0;
          display: flex;
          justify-content: flex-end;
          gap: 8px;
          background: #f8fafc;
          border-radius: 0 0 14px 14px;
          flex-wrap: wrap;
          position: sticky;
          bottom: 0;
        }
        .btn-primary {
          padding: 8px 18px;
          background: #eb5325;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          transition: 0.2s;
        }
        .btn-primary:hover:not(:disabled) {
          background: #d44a1f;
          transform: translateY(-1px);
        }
        .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }
        .btn-secondary {
          padding: 8px 18px;
          background: transparent;
          color: #1a1a2e;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: 0.2s;
        }
        .btn-secondary:hover { background: #f1f5f9; }
        .loading-state, .empty-state, .error-state {
          text-align: center;
          padding: 40px 20px;
          color: #64748b;
        }
        .error-state p { color: #dc2626; font-weight: 600; margin-bottom: 12px; }
        .loading-spinner {
          width: 36px;
          height: 36px;
          border: 3px solid #f1f5f9;
          border-top-color: #eb5325;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin: 0 auto 15px auto;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .empty-icon { font-size: 48px; margin-bottom: 10px; }
        .info-box {
          padding: 20px;
          border-radius: 10px;
          border: 1px solid #bfdbfe;
          background: #eff6ff;
          text-align: center;
        }
        .info-box.error {
          border-color: #fca5a5;
          background: #fef2f2;
        }

        @media (max-width: 991px) {
          .admin-layout { flex-direction: column; }
          .admin-sidebar {
            width: 100%;
            flex-direction: row;
            flex-wrap: wrap;
            padding: 10px 15px;
            align-items: center;
          }
          .sidebar-brand { padding: 0; border-bottom: none; }
          .sidebar-nav {
            flex-direction: row;
            gap: 4px;
            padding: 0;
            flex-wrap: wrap;
          }
          .sidebar-link {
            padding: 6px 12px;
            width: auto;
            font-size: 13px;
          }
          .sidebar-link.active { border-left: none; border-bottom: 3px solid white; }
          .sidebar-footer { display: none; }
          .btn-mobile-logout-top { display: block; }
          .admin-main { padding: 16px; }
          .stats-grid { grid-template-columns: repeat(3, 1fr); }
        }

        @media (max-width: 575px) {
          .stats-grid { grid-template-columns: 1fr 1fr; gap: 8px; }
          .search-bar { flex-direction: column; align-items: stretch; }
          .admin-header { flex-direction: column; align-items: flex-start; }
          .admin-actions-top { width: 100%; justify-content: space-between; }
          .action-buttons { flex-wrap: wrap; }
          .admin-table { font-size: 12px; min-width: 600px; }
          .admin-table th, .admin-table td { padding: 6px 8px; }
          .modal-content { max-width: 100%; }
          .modal-footer { flex-direction: column; }
          .modal-footer button { width: 100%; text-align: center; }
          .contract-actions { flex-direction: column; }
          .contract-actions button { width: 100%; }
        }
      `}</style>
    </div>
  );
}