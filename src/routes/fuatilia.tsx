import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/fuatilia")({
  head: () => ({ meta: [{ title: "Fuatilia Maombi — GJ General Traders" }] }),
  component: FuatiliaPage,
});

// Define exact Application type matching database schema
type Application = {
  id: string;
  created_at: string;
  updated_at?: string;
  submitted_at?: string;
  user_id: string;
  customer_name: string;
  phone: string;
  alt_phone?: string | null;
  email?: string | null;
  service_type?: string;
  type: string;
  category?: "MACHINGA" | "BINAFSI" | "COMPANY_LIMITED" | null;
  status: string;
  processing_status?: string;
  tin?: string | null;
  id_type?: string;
  id_number?: string | null;
  business_name?: string | null;
  business_type?: string | null;
  ward?: string | null;
  district?: string | null;
  region?: string | null;
  has_agent_line?: boolean;
  notes?: string | null;
  documents?: Record<string, any>;
  ref_no?: string | null;
  contract_path?: string | null;
  signature_data?: string | null;
  admin_notes?: string | null;
  full_name?: string | null;
};

// Type for update payload - only fields that can be updated
type ApplicationUpdate = {
  customer_name?: string;
  phone?: string;
  alt_phone?: string | null;
  email?: string | null;
  tin?: string | null;
  id_number?: string | null;
  business_name?: string | null;
  business_type?: string | null;
  ward?: string | null;
  district?: string | null;
  region?: string | null;
  notes?: string | null;
  updated_at?: string;
};

function StatusBadge({ status }: { status: string }) {
  const statusMap: Record<string, { class: string; label: string }> = {
    approved: { class: "badge-approved", label: "Imekubaliwa" },
    rejected: { class: "badge-rejected", label: "Imekataliwa" },
    processing: { class: "badge-processing", label: "Inafanyiwa Kazi" },
    pending: { class: "badge-pending", label: "Inasubiri" },
  };

  const { class: cls, label } = statusMap[status] || statusMap.pending;
  return <span className={`badge ${cls}`}>{label}</span>;
}

// Fetch function
const fetchApplications = async (userId: string): Promise<Application[]> => {
  const { data, error } = await supabase
    .from("applications")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data || []) as Application[];
};

function FuatiliaPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState({ 
    status: "", 
    type: "", 
    from: "", 
    to: "" 
  });
  const [deleting, setDeleting] = useState<string | null>(null);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [editingApp, setEditingApp] = useState<Application | null>(null);
  const [editForm, setEditForm] = useState<Partial<ApplicationUpdate>>({});
  const [editSubmitting, setEditSubmitting] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      navigate({ to: "/login" });
    }
  }, [loading, user, navigate]);

  // QUERY: Fetch applications with caching
  const { 
    data: applications = [], 
    isFetching,
    refetch 
  } = useQuery({
    queryKey: ['applications', user?.id],
    queryFn: () => fetchApplications(user!.id),
    enabled: !!user,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    placeholderData: (previousData) => previousData,
  });

  // MUTATION: Delete
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("applications")
        .delete()
        .eq("id", id)
        .eq("user_id", user!.id);
      if (error) throw error;
      return id;
    },
    onSuccess: (id) => {
      queryClient.setQueryData(['applications', user?.id], (old: Application[] = []) => {
        return old.filter(app => app.id !== id);
      });
      toast.success("✅ Ombi limefutwa kwa mafanikio!");
    },
    onError: (error: any) => {
      toast.error("Imeshindwa kufuta ombi", {
        description: error?.message || "Jaribu tena baadaye"
      });
    },
  });

  // MUTATION: Update
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: ApplicationUpdate }) => {
      const updatePayload = {
        ...data,
        updated_at: new Date().toISOString(),
      };
      
      const { error } = await supabase
        .from("applications")
        .update(updatePayload)
        .eq("id", id)
        .eq("user_id", user!.id);
      if (error) throw error;
      return { id, data };
    },
    onSuccess: ({ id, data }) => {
      queryClient.setQueryData(['applications', user?.id], (old: Application[] = []) => {
        return old.map(app => 
          app.id === id ? { ...app, ...data, updated_at: new Date().toISOString() } : app
        );
      });
      toast.success("✅ Ombi limebadilishwa kwa mafanikio!");
      setEditingApp(null);
      setEditForm({});
    },
    onError: (error: any) => {
      toast.error("Imeshindwa kubadilisha ombi", {
        description: error?.message || "Jaribu tena baadaye"
      });
    },
  });

  // Helper functions
  const getTypeLabel = (type: string) => {
    const typeMap: Record<string, string> = {
      wakala: "Sajili Wakala",
      lipa: "Lipa Namba",
      voda: "Lipa Voda",
    };
    return typeMap[type] || type;
  };

  // Action handlers
  const handleNewApplication = () => {
    navigate({ to: "/till-wakala" });
  };

  const handleRetry = (app: Application) => {
    const path = app.type === 'wakala' ? '/till-wakala' : 
                 app.type === 'lipa' ? '/lipa-namba' : '/voda';
    sessionStorage.setItem('retry_application', JSON.stringify(app));
    toast.info("Unaelekezwa kwenye fomu...");
    setTimeout(() => navigate({ to: path }), 500);
  };

  const handleEdit = (app: Application) => {
    setEditingApp(app);
    setEditForm({
      customer_name: app.customer_name || '',
      phone: app.phone || '',
      alt_phone: app.alt_phone || '',
      email: app.email || '',
      tin: app.tin || '',
      id_number: app.id_number || '',
      business_name: app.business_name || '',
      business_type: app.business_type || '',
      ward: app.ward || '',
      district: app.district || '',
      region: app.region || '',
      notes: app.notes || '',
    });
  };

  const closeEditModal = () => {
    setEditingApp(null);
    setEditForm({});
    setEditSubmitting(false);
  };

  const handleEditChange = (field: keyof ApplicationUpdate, value: any) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !editingApp) return;
    setEditSubmitting(true);
    await updateMutation.mutateAsync({
      id: editingApp.id,
      data: editForm,
    });
    setEditSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Je, una hakika unataka kufuta ombi hili?")) return;
    setDeleting(id);
    await deleteMutation.mutateAsync(id);
    setDeleting(null);
  };

  const handleView = (app: Application) => {
    setSelectedApp(app);
  };

  const closeViewModal = () => {
    setSelectedApp(null);
  };

  // Filter applications
  const filtered = useMemo(
    () =>
      applications.filter((app) => {
        if (filters.status && app.status !== filters.status) return false;
        if (filters.type && app.type !== filters.type) return false;
        if (filters.from && new Date(app.created_at) < new Date(filters.from)) return false;
        if (filters.to && new Date(app.created_at) > new Date(filters.to + "T23:59:59")) return false;
        return true;
      }),
    [applications, filters],
  );

  // Stats
  const stats = useMemo(
    () => ({
      total: applications.length,
      pending: applications.filter((a) => a.status === "pending").length,
      approved: applications.filter((a) => a.status === "approved").length,
      rejected: applications.filter((a) => a.status === "rejected").length,
      processing: applications.filter((a) => a.status === "processing").length,
    }),
    [applications],
  );

  if (!user) return null;

  const isEmpty = applications.length === 0;

  return (
    <div className="page-wrap">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/dashboard">Dashboard</Link>
        <span className="crumb-separator">›</span>
        <span className="crumb-active">Fuatilia Maombi</span>
      </div>
      
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-left">
          <h2>📋 Fuatilia Maombi Yako</h2>
          <p>Angalia hali na usimamie maombi yako</p>
        </div>
        <div className="header-actions">
          <button 
            className="btn-refresh" 
            onClick={() => refetch()}
            disabled={isFetching}
          >
            {isFetching ? '⏳ Inasasisha...' : '🔄 Sasisha'}
          </button>
          <button className="btn-new-application" onClick={handleNewApplication}>
            ➕ Ombi Mpya
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="metric-grid">
        <div className="metric-card">
          <div className="mc-label">Jumla</div>
          <div className="mc-val">{stats.total}</div>
          <div className="mc-sub">Maombi yote</div>
        </div>
        <div className="metric-card pending">
          <div className="mc-label">Yanasubiri</div>
          <div className="mc-val">{stats.pending}</div>
          <div className="mc-sub">Inahitaji maamuzi</div>
        </div>
        <div className="metric-card approved">
          <div className="mc-label">Yamekubaliwa</div>
          <div className="mc-val">{stats.approved}</div>
          <div className="mc-sub">Mafanikio</div>
        </div>
        <div className="metric-card rejected">
          <div className="mc-label">Yamekataliwa</div>
          <div className="mc-val">{stats.rejected}</div>
          <div className="mc-sub">Rudia ombi</div>
        </div>
        <div className="metric-card processing">
          <div className="mc-label">Yanafanyiwa Kazi</div>
          <div className="mc-val">{stats.processing}</div>
          <div className="mc-sub">Yanakaguliwa</div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-bar">
        <div className="filter-group">
          <label>Hali ya Ombi</label>
          <select
            value={filters.status}
            onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value }))}
          >
            <option value="">Zote</option>
            <option value="pending">Inasubiri</option>
            <option value="approved">Imekubaliwa</option>
            <option value="rejected">Imekataliwa</option>
            <option value="processing">Inafanyiwa Kazi</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Aina ya Ombi</label>
          <select
            value={filters.type}
            onChange={(e) => setFilters((f) => ({ ...f, type: e.target.value }))}
          >
            <option value="">Zote</option>
            <option value="wakala">Sajili Wakala</option>
            <option value="lipa">Lipa Namba</option>
            <option value="voda">Lipa Voda</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Tarehe Kuanzia</label>
          <input
            type="date"
            value={filters.from}
            onChange={(e) => setFilters((f) => ({ ...f, from: e.target.value }))}
          />
        </div>
        <div className="filter-group">
          <label>Tarehe Hadi</label>
          <input
            type="date"
            value={filters.to}
            onChange={(e) => setFilters((f) => ({ ...f, to: e.target.value }))}
          />
        </div>
        <button 
          className="clear-filters-btn"
          onClick={() => setFilters({ status: "", type: "", from: "", to: "" })}
        >
          🔄 Ondoa Vichujio
        </button>
      </div>

      {/* Applications Table - Kamisheni column REMOVED */}
      <div className="table-card">
        <div className="table-toolbar">
          <h4>Orodha ya Maombi</h4>
          <span className="app-count">
            Maombi {filtered.length}
          </span>
        </div>
        
        <div className="table-scroll-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>#Namba</th>
                <th>Mteja</th>
                <th>Simu</th>
                <th>Aina</th>
                <th>Tarehe</th>
                <th>Hali</th>
                <th>Vitendo</th>
              </tr>
            </thead>
            <tbody>
              {isEmpty ? (
                <tr>
                  <td colSpan={7} className="empty-state">
                    <div className="empty-icon">📭</div>
                    <p>Hakuna maombi bado.</p>
                    <button className="empty-link" onClick={handleNewApplication}>
                      Wasilisha Ombi Mpya →
                    </button>
                  </td>
                </tr>
              ) : (
                filtered.map((app) => (
                  <tr key={app.id}>
                    <td className="ref-cell">{app.ref_no || app.id.slice(0, 8)}</td>
                    <td className="customer-cell">
                      <div className="customer-info">
                        <div className="customer-name">{app.customer_name || app.full_name}</div>
                      </div>
                    </td>
                    <td>{app.phone}</td>
                    <td>{getTypeLabel(app.type)}</td>
                    <td>
                      <div className="date-info">
                        <div>{new Date(app.created_at).toLocaleDateString('sw-TZ')}</div>
                        <div className="time-info">{new Date(app.created_at).toLocaleTimeString('sw-TZ', { hour: '2-digit', minute: '2-digit' })}</div>
                      </div>
                    </td>
                    <td><StatusBadge status={app.status} /></td>
                    <td className="actions-cell">
                      <div className="action-buttons">
                        <button
                          className="btn-view-action"
                          onClick={() => handleView(app)}
                          title="Angalia maelezo"
                        >
                          👁️ Tazama
                        </button>
                        
                        {(app.status === "pending" || app.status === "rejected") && (
                          <button
                            className="btn-edit"
                            onClick={() => handleEdit(app)}
                            title="Badilisha ombi"
                          >
                            ✏️ Badilisha
                          </button>
                        )}
                        
                        {app.status === "rejected" && (
                          <button
                            className="btn-retry"
                            onClick={() => handleRetry(app)}
                            title="Jaribu tena"
                          >
                            🔄 Jaribu Tena
                          </button>
                        )}
                        
                        {(app.status === "pending" || app.status === "rejected") && (
                          <button
                            className="btn-delete"
                            onClick={() => handleDelete(app.id)}
                            disabled={deleting === app.id}
                            title="Futa ombi"
                          >
                            {deleting === app.id ? "⏳" : "🗑️ Futa"}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Details Modal */}
      {selectedApp && (
        <div className="modal-overlay" onClick={closeViewModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>📄 Maelezo ya Ombi</h3>
              <button className="modal-close" onClick={closeViewModal}>✕</button>
            </div>
            <div className="modal-body">
              <div className="detail-grid">
                <div className="detail-item">
                  <label>Namba ya Ombi</label>
                  <span>{selectedApp.ref_no || selectedApp.id.slice(0, 8)}</span>
                </div>
                <div className="detail-item">
                  <label>Jina Kamili</label>
                  <span>{selectedApp.customer_name || selectedApp.full_name}</span>
                </div>
                <div className="detail-item">
                  <label>Simu</label>
                  <span>{selectedApp.phone}</span>
                </div>
                {selectedApp.alt_phone && (
                  <div className="detail-item">
                    <label>Simu Mbadala</label>
                    <span>{selectedApp.alt_phone}</span>
                  </div>
                )}
                <div className="detail-item">
                  <label>Aina ya Ombi</label>
                  <span>{getTypeLabel(selectedApp.type)}</span>
                </div>
                <div className="detail-item">
                  <label>Hali</label>
                  <span><StatusBadge status={selectedApp.status} /></span>
                </div>
                {selectedApp.tin && (
                  <div className="detail-item">
                    <label>TIN</label>
                    <span>{selectedApp.tin}</span>
                  </div>
                )}
                {selectedApp.id_number && (
                  <div className="detail-item">
                    <label>Namba ya Kitambulisho</label>
                    <span>{selectedApp.id_number}</span>
                  </div>
                )}
                {selectedApp.business_name && (
                  <div className="detail-item">
                    <label>Jina la Biashara</label>
                    <span>{selectedApp.business_name}</span>
                  </div>
                )}
                {selectedApp.business_type && (
                  <div className="detail-item">
                    <label>Aina ya Biashara</label>
                    <span>{selectedApp.business_type}</span>
                  </div>
                )}
                {selectedApp.email && (
                  <div className="detail-item">
                    <label>Barua Pepe</label>
                    <span>{selectedApp.email}</span>
                  </div>
                )}
                {(selectedApp.ward || selectedApp.district || selectedApp.region) && (
                  <div className="detail-item full-width">
                    <label>Mahali</label>
                    <span>
                      {[selectedApp.ward, selectedApp.district, selectedApp.region]
                        .filter(Boolean)
                        .join(', ')}
                    </span>
                  </div>
                )}
                {selectedApp.notes && (
                  <div className="detail-item full-width">
                    <label>Maelezo ya Ziada</label>
                    <span>{selectedApp.notes}</span>
                  </div>
                )}
                {selectedApp.documents && Object.keys(selectedApp.documents).length > 0 && (
                  <div className="detail-item full-width">
                    <label>Nyaraka</label>
                    <div className="documents-list">
                      {Object.entries(selectedApp.documents).map(([key, value]) => {
                        if (typeof value === 'string' && value.startsWith('http')) {
                          return (
                            <a
                              key={key}
                              href={value}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="doc-link"
                              title={key.replace('_', ' ')}
                            >
                              📄 {key.replace('_', ' ')}
                            </a>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </div>
                )}
                <div className="detail-item">
                  <label>Tarehe ya Kuwasilisha</label>
                  <span>{new Date(selectedApp.created_at).toLocaleString('sw-TZ')}</span>
                </div>
                {selectedApp.updated_at && selectedApp.updated_at !== selectedApp.created_at && (
                  <div className="detail-item">
                    <label>Ilibadilishwa</label>
                    <span>{new Date(selectedApp.updated_at).toLocaleString('sw-TZ')}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-cancel" onClick={closeViewModal}>
                Funga
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingApp && (
        <div className="modal-overlay" onClick={closeEditModal}>
          <div className="modal-content modal-edit" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>✏️ Badilisha Ombi — {editingApp.ref_no || editingApp.id.slice(0, 8)}</h3>
              <button className="modal-close" onClick={closeEditModal}>✕</button>
            </div>
            <form onSubmit={handleEditSubmit}>
              <div className="modal-body">
                <div className="edit-grid">
                  <div className="edit-group">
                    <label>Jina Kamili *</label>
                    <input
                      type="text"
                      value={editForm.customer_name || ''}
                      onChange={(e) => handleEditChange('customer_name', e.target.value)}
                      required
                      placeholder="Ingiza jina kamili"
                    />
                  </div>
                  <div className="edit-group">
                    <label>Simu *</label>
                    <input
                      type="tel"
                      value={editForm.phone || ''}
                      onChange={(e) => handleEditChange('phone', e.target.value.replace(/\D/g, '').slice(0, 10))}
                      required
                      placeholder="07XXXXXXXX"
                    />
                  </div>
                  <div className="edit-group">
                    <label>Simu Mbadala</label>
                    <input
                      type="tel"
                      value={editForm.alt_phone || ''}
                      onChange={(e) => handleEditChange('alt_phone', e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="07XXXXXXXX"
                    />
                  </div>
                  <div className="edit-group">
                    <label>Barua Pepe</label>
                    <input
                      type="email"
                      value={editForm.email || ''}
                      onChange={(e) => handleEditChange('email', e.target.value)}
                      placeholder="mteja@email.com"
                    />
                  </div>
                  <div className="edit-group">
                    <label>TIN</label>
                    <input
                      type="text"
                      value={editForm.tin || ''}
                      onChange={(e) => handleEditChange('tin', e.target.value)}
                      placeholder="TIN number"
                    />
                  </div>
                  <div className="edit-group">
                    <label>Namba ya Kitambulisho</label>
                    <input
                      type="text"
                      value={editForm.id_number || ''}
                      onChange={(e) => handleEditChange('id_number', e.target.value)}
                      placeholder="Namba ya kitambulisho"
                    />
                  </div>
                  {editingApp.type === 'lipa' && (
                    <>
                      <div className="edit-group">
                        <label>Jina la Biashara</label>
                        <input
                          type="text"
                          value={editForm.business_name || ''}
                          onChange={(e) => handleEditChange('business_name', e.target.value)}
                          placeholder="Jina la biashara"
                        />
                      </div>
                      <div className="edit-group">
                        <label>Aina ya Biashara</label>
                        <input
                          type="text"
                          value={editForm.business_type || ''}
                          onChange={(e) => handleEditChange('business_type', e.target.value)}
                          placeholder="Aina ya biashara"
                        />
                      </div>
                      <div className="edit-group">
                        <label>Wadi</label>
                        <input
                          type="text"
                          value={editForm.ward || ''}
                          onChange={(e) => handleEditChange('ward', e.target.value)}
                          placeholder="Wadi"
                        />
                      </div>
                      <div className="edit-group">
                        <label>Wilaya</label>
                        <input
                          type="text"
                          value={editForm.district || ''}
                          onChange={(e) => handleEditChange('district', e.target.value)}
                          placeholder="Wilaya"
                        />
                      </div>
                      <div className="edit-group">
                        <label>Mkoa</label>
                        <input
                          type="text"
                          value={editForm.region || ''}
                          onChange={(e) => handleEditChange('region', e.target.value)}
                          placeholder="Mkoa"
                        />
                      </div>
                    </>
                  )}
                  <div className="edit-group full-width">
                    <label>Maelezo ya Ziada</label>
                    <textarea
                      rows={3}
                      value={editForm.notes || ''}
                      onChange={(e) => handleEditChange('notes', e.target.value)}
                      placeholder="Maelezo yoyote ya ziada..."
                    />
                  </div>
                </div>
                <div className="edit-info">
                  <p className="edit-note">
                    ⚠️ Badilisha taarifa zinazohitaji kusahihishwa. Ombi litawekwa kama "Inasubiri" tena.
                  </p>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-cancel" onClick={closeEditModal}>
                  Ghairi
                </button>
                <button 
                  type="submit" 
                  className="btn-primary"
                  disabled={editSubmitting || updateMutation.isPending}
                >
                  {editSubmitting || updateMutation.isPending ? "Inahifadhi..." : "Hifadhi Mabadiliko"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .page-wrap {
          max-width: 1400px;
          margin: 0 auto;
          padding: 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
        }

        .breadcrumb {
          font-size: 14px;
          color: #666;
          margin-bottom: 20px;
        }

        .breadcrumb a {
          color: #eb5325;
          text-decoration: none;
        }

        .breadcrumb a:hover {
          text-decoration: underline;
        }

        .crumb-separator {
          margin: 0 8px;
          color: #999;
        }

        .crumb-active {
          color: #1a1a2e;
          font-weight: 600;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 25px;
          flex-wrap: wrap;
          gap: 15px;
        }

        .page-header-left h2 {
          font-size: 24px;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0;
        }

        .page-header-left p {
          font-size: 14px;
          color: #666;
          margin: 5px 0 0 0;
        }

        .header-actions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .btn-refresh {
          padding: 12px 20px;
          background: #e5e7eb;
          color: #1a1a2e;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: 0.2s;
          white-space: nowrap;
        }

        .btn-refresh:hover:not(:disabled) {
          background: #d1d5db;
        }

        .btn-refresh:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn-new-application {
          padding: 12px 24px;
          background: #eb5325;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          transition: 0.2s;
          white-space: nowrap;
        }

        .btn-new-application:hover {
          background: #d44a1f;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(235, 83, 37, 0.3);
        }

        .metric-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 15px;
          margin-bottom: 25px;
        }

        .metric-card {
          background: white;
          padding: 18px 20px;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          text-align: center;
          box-shadow: 0 2px 10px rgba(0,0,0,0.04);
          transition: 0.2s;
        }

        .metric-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(0,0,0,0.08);
        }

        .metric-card.pending {
          border-left: 4px solid #f59e0b;
        }

        .metric-card.approved {
          border-left: 4px solid #10b981;
        }

        .metric-card.rejected {
          border-left: 4px solid #ef4444;
        }

        .metric-card.processing {
          border-left: 4px solid #3b82f6;
        }

        .mc-label {
          font-size: 12px;
          color: #666;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .mc-val {
          font-size: 28px;
          font-weight: 800;
          color: #1a1a2e;
          margin: 4px 0;
        }

        .metric-card.pending .mc-val {
          color: #f59e0b;
        }

        .metric-card.approved .mc-val {
          color: #10b981;
        }

        .metric-card.rejected .mc-val {
          color: #ef4444;
        }

        .metric-card.processing .mc-val {
          color: #3b82f6;
        }

        .mc-sub {
          font-size: 12px;
          color: #999;
        }

        .filters-bar {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
          background: white;
          padding: 20px;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          margin-bottom: 25px;
          align-items: flex-end;
        }

        .filter-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
          min-width: 140px;
          flex: 1;
        }

        .filter-group label {
          font-size: 12px;
          font-weight: 600;
          color: #666;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .filter-group select,
        .filter-group input {
          padding: 8px 12px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          font-size: 13px;
          background: white;
          color: #1a1a2e;
          width: 100%;
        }

        .filter-group select:focus,
        .filter-group input:focus {
          outline: none;
          border-color: #eb5325;
          box-shadow: 0 0 0 3px rgba(235, 83, 37, 0.1);
        }

        .clear-filters-btn {
          padding: 8px 16px;
          background: #e5e7eb;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 13px;
          cursor: pointer;
          transition: 0.2s;
          color: #1a1a2e;
          align-self: flex-end;
          white-space: nowrap;
        }

        .clear-filters-btn:hover {
          background: #d1d5db;
        }

        .table-card {
          background: white;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0,0,0,0.04);
        }

        .table-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 18px 20px;
          border-bottom: 1px solid #e5e7eb;
          flex-wrap: wrap;
          gap: 10px;
        }

        .table-toolbar h4 {
          font-size: 16px;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0;
        }

        .app-count {
          font-size: 13px;
          color: #666;
          background: #f0f0f0;
          padding: 4px 12px;
          border-radius: 20px;
        }

        .table-scroll-wrap {
          overflow-x: auto;
          padding: 0 4px;
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
          min-width: 800px;
        }

        .data-table thead {
          background: #f8f9fa;
        }

        .data-table th {
          padding: 12px 16px;
          text-align: left;
          font-weight: 600;
          color: #666;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          white-space: nowrap;
        }

        .data-table td {
          padding: 12px 16px;
          border-bottom: 1px solid #f0f0f0;
          vertical-align: middle;
        }

        .data-table tbody tr:hover {
          background: #f8f9fa;
        }

        .ref-cell {
          font-weight: 700;
          color: #1a1a2e;
          font-size: 13px;
        }

        .customer-cell {
          font-weight: 500;
          color: #1a1a2e;
        }

        .customer-info {
          display: flex;
          flex-direction: column;
        }

        .customer-name {
          font-weight: 600;
        }

        .date-info {
          display: flex;
          flex-direction: column;
        }

        .time-info {
          font-size: 12px;
          color: #666;
        }

        .badge {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
          display: inline-block;
        }

        .badge-pending {
          background: #fef3c7;
          color: #d97706;
        }

        .badge-approved {
          background: #d1fae5;
          color: #059669;
        }

        .badge-rejected {
          background: #fee2e2;
          color: #dc2626;
        }

        .badge-processing {
          background: #dbeafe;
          color: #2563eb;
        }

        .actions-cell {
          text-align: center;
        }

        .action-buttons {
          display: flex;
          gap: 8px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .action-buttons button {
          padding: 8px 16px;
          border: none;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: 0.2s;
          white-space: nowrap;
          min-width: 80px;
        }

        .action-buttons button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .btn-view-action {
          background: #e5e7eb;
          color: #1a1a2e;
        }

        .btn-view-action:hover:not(:disabled) {
          background: #d1d5db;
          transform: scale(1.05);
        }

        .btn-edit {
          background: #dbeafe;
          color: #1e40af;
        }

        .btn-edit:hover:not(:disabled) {
          background: #bfdbfe;
          transform: scale(1.05);
        }

        .btn-retry {
          background: #dbeafe;
          color: #1e40af;
        }

        .btn-retry:hover:not(:disabled) {
          background: #bfdbfe;
          transform: scale(1.05);
        }

        .btn-delete {
          background: #fee2e2;
          color: #dc2626;
        }

        .btn-delete:hover:not(:disabled) {
          background: #fecaca;
          transform: scale(1.05);
        }

        .empty-state {
          text-align: center;
          padding: 40px 20px !important;
        }

        .empty-icon {
          font-size: 48px;
          margin-bottom: 10px;
        }

        .empty-state p {
          font-size: 14px;
          color: #666;
          margin: 0 0 10px 0;
        }

        .empty-link {
          display: inline-block;
          padding: 8px 20px;
          background: #eb5325;
          color: white;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: 0.2s;
          text-decoration: none;
        }

        .empty-link:hover {
          background: #d44a1f;
          transform: translateY(-2px);
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.2s ease;
          padding: 20px;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-content {
          background: white;
          border-radius: 16px;
          max-width: 700px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          animation: slideUp 0.3s ease;
        }

        .modal-edit {
          max-width: 750px;
        }

        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          border-bottom: 1px solid #e5e7eb;
          position: sticky;
          top: 0;
          background: white;
          border-radius: 16px 16px 0 0;
          z-index: 1;
        }

        .modal-header h3 {
          font-size: 18px;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0;
        }

        .modal-close {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #999;
          transition: 0.2s;
          padding: 0 4px;
        }

        .modal-close:hover {
          color: #1a1a2e;
        }

        .modal-body {
          padding: 24px;
        }

        .detail-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .detail-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .detail-item.full-width {
          grid-column: 1 / -1;
        }

        .detail-item label {
          font-size: 12px;
          font-weight: 600;
          color: #666;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .detail-item span {
          font-size: 14px;
          color: #1a1a2e;
          font-weight: 500;
          word-break: break-word;
        }

        .documents-list {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-top: 4px;
        }

        .doc-link {
          padding: 4px 12px;
          background: #f0f0f0;
          border-radius: 4px;
          font-size: 13px;
          color: #1a1a2e;
          text-decoration: none;
          transition: 0.2s;
        }

        .doc-link:hover {
          background: #e5e7eb;
        }

        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          padding: 16px 24px;
          border-top: 1px solid #e5e7eb;
          position: sticky;
          bottom: 0;
          background: white;
          border-radius: 0 0 16px 16px;
          flex-wrap: wrap;
        }

        .btn-cancel {
          padding: 10px 24px;
          background: #e5e7eb;
          color: #1a1a2e;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: 0.2s;
        }

        .btn-cancel:hover {
          background: #d1d5db;
        }

        .btn-primary {
          padding: 10px 24px;
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
        }

        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .edit-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .edit-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .edit-group.full-width {
          grid-column: 1 / -1;
        }

        .edit-group label {
          font-size: 13px;
          font-weight: 600;
          color: #475569;
        }

        .edit-group input,
        .edit-group textarea {
          padding: 10px 12px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          font-size: 14px;
          font-family: inherit;
          transition: 0.2s;
          width: 100%;
          box-sizing: border-box;
        }

        .edit-group input:focus,
        .edit-group textarea:focus {
          outline: none;
          border-color: #eb5325;
          box-shadow: 0 0 0 3px rgba(235, 83, 37, 0.1);
        }

        .edit-info {
          margin-top: 16px;
          padding: 12px 16px;
          background: #fef3c7;
          border-radius: 8px;
          border-left: 4px solid #f59e0b;
          grid-column: 1 / -1;
        }

        .edit-note {
          font-size: 13px;
          color: #1a1a2e;
          margin: 0;
        }

        @media (max-width: 1024px) {
          .metric-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 768px) {
          .page-header {
            flex-direction: column;
            align-items: stretch;
          }

          .btn-new-application {
            width: 100%;
            text-align: center;
          }

          .metric-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }

          .filters-bar {
            flex-direction: column;
            gap: 10px;
          }

          .filter-group {
            min-width: auto;
            width: 100%;
          }

          .clear-filters-btn {
            width: 100%;
            text-align: center;
          }

          .data-table {
            font-size: 12px;
            min-width: 600px;
          }

          .data-table th,
          .data-table td {
            padding: 8px 10px;
          }

          .action-buttons {
            flex-wrap: wrap;
            gap: 4px;
          }

          .action-buttons button {
            padding: 6px 12px;
            font-size: 11px;
            min-width: 60px;
          }

          .detail-grid {
            grid-template-columns: 1fr;
          }

          .edit-grid {
            grid-template-columns: 1fr;
          }

          .edit-group.full-width {
            grid-column: 1;
          }

          .modal-content {
            max-width: 100%;
            margin: 10px;
            max-height: 95vh;
          }

          .header-actions {
            width: 100%;
          }

          .btn-refresh {
            flex: 1;
            text-align: center;
          }
        }

        @media (max-width: 480px) {
          .metric-grid {
            grid-template-columns: 1fr 1fr;
            gap: 8px;
          }

          .metric-card {
            padding: 12px 10px;
          }

          .mc-val {
            font-size: 20px;
          }

          .page-wrap {
            padding: 10px;
          }

          .table-toolbar {
            flex-direction: column;
            align-items: stretch;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}