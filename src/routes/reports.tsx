import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, useMemo, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";
import { formatTzs, typeLabel } from "@/lib/application-utils";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "Ripoti za Biashara - GJ General Traders" },
      {
        name: "description",
        content: "Angalia ripoti na takwimu za biashara yako",
      },
    ],
  }),
  component: ReportsPage,
});

function ReportsPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const reportRef = useRef<HTMLDivElement>(null);
  const [applications, setApplications] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [dateRange, setDateRange] = useState({
    from: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0],
    to: new Date().toISOString().split('T')[0]
  });
  const [selectedType, setSelectedType] = useState("all");
  const [downloading, setDownloading] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      navigate({ to: "/login" });
    }
  }, [loading, user, navigate]);

  // Load data
  useEffect(() => {
    if (!user) return;
    fetchData();
  }, [user, dateRange]);

  const fetchData = async () => {
    if (!user) return;
    setLoadingData(true);
    try {
      let query = supabase
        .from("applications")
        .select("*")
        .eq("user_id", user.id);

      if (dateRange.from) {
        query = query.gte("created_at", dateRange.from);
      }
      if (dateRange.to) {
        query = query.lte("created_at", dateRange.to + "T23:59:59");
      }

      const { data, error } = await query.order("created_at", { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (error: any) {
      toast.error("Imeshindwa kupakia ripoti", {
        description: error?.message || "Jaribu tena baadaye"
      });
    } finally {
      setLoadingData(false);
    }
  };

  // Filter data by type
  const filteredData = useMemo(() => {
    if (selectedType === "all") return applications;
    return applications.filter(app => app.type === selectedType);
  }, [applications, selectedType]);

  // Calculate statistics
  const stats = useMemo(() => {
    const total = filteredData.length;
    const pending = filteredData.filter(a => a.status === "pending").length;
    const approved = filteredData.filter(a => a.status === "approved").length;
    const rejected = filteredData.filter(a => a.status === "rejected").length;
    const processing = filteredData.filter(a => a.status === "processing").length;

    const commissionMap: Record<string, number> = {
      wakala: 15000,
      lipa: 10000,
      voda: 8000,
    };
    const totalCommission = filteredData.reduce((sum, app) => {
      return sum + (commissionMap[app.type] || 0);
    }, 0);

    return {
      total,
      pending,
      approved,
      rejected,
      processing,
      totalCommission,
      successRate: total > 0 ? Math.round((approved / total) * 100) : 0,
    };
  }, [filteredData]);

  // Group data by status
  const statusDistribution = useMemo(() => {
    return {
      pending: filteredData.filter(a => a.status === "pending").length,
      approved: filteredData.filter(a => a.status === "approved").length,
      rejected: filteredData.filter(a => a.status === "rejected").length,
      processing: filteredData.filter(a => a.status === "processing").length,
    };
  }, [filteredData]);

  // Group data by type
  const typeDistribution = useMemo(() => {
    const types: Record<string, number> = {};
    filteredData.forEach(app => {
      const label = typeLabel(app.type);
      types[label] = (types[label] || 0) + 1;
    });
    return types;
  }, [filteredData]);

  // Weekly trend data
  const trendData = useMemo(() => {
    const periods: Record<string, number> = {};
    filteredData.forEach(app => {
      const date = new Date(app.created_at);
      const weekNumber = getWeekNumber(date);
      const label = `Wiki ${weekNumber}`;
      periods[label] = (periods[label] || 0) + 1;
    });
    const sorted: Record<string, number> = {};
    Object.keys(periods)
      .sort((a, b) => {
        const numA = parseInt(a.split(' ')[1]);
        const numB = parseInt(b.split(' ')[1]);
        return numA - numB;
      })
      .forEach(key => {
        sorted[key] = periods[key];
      });
    return sorted;
  }, [filteredData]);

  function getWeekNumber(date: Date): number {
    const startDate = new Date(date.getFullYear(), 0, 1);
    const days = Math.floor((date.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000));
    return Math.ceil((days + startDate.getDay() + 1) / 7);
  }

  // Download report as PDF - FIXED to force download without opening new tab
  const downloadReport = async () => {
    if (!reportRef.current) {
      toast.error("Ripoti haipatikani");
      return;
    }
    
    setDownloading(true);
    const downloadToast = toast.loading("Inaandaa ripoti yako...");
    
    try {
      const element = reportRef.current;
      
      // Clone the content for clean capture
      const content = element.cloneNode(true) as HTMLElement;
      
      // Remove buttons and filters from the clone
      const elementsToRemove = content.querySelectorAll('.btn-download, .btn-print, .btn-refresh, .filters-section, .back-button, .header-actions');
      elementsToRemove.forEach(btn => btn.remove());
      
      // Append to body temporarily for rendering
      const wrapper = document.createElement('div');
      wrapper.style.position = 'fixed';
      wrapper.style.left = '-9999px';
      wrapper.style.top = '0';
      wrapper.style.width = '1200px';
      wrapper.style.background = 'white';
      wrapper.style.padding = '20px';
      wrapper.style.zIndex = '9999';
      wrapper.appendChild(content);
      document.body.appendChild(wrapper);

      // Wait for rendering
      await new Promise(resolve => setTimeout(resolve, 500));

      // Capture with html2canvas
      const canvas = await html2canvas(wrapper, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        width: 1200,
        height: wrapper.scrollHeight,
        scrollY: 0,
        scrollX: 0,
      });

      // Clean up
      document.body.removeChild(wrapper);

      // Create PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      // Add image to PDF
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

      // Handle multiple pages if needed
      let heightLeft = pdfHeight - pdf.internal.pageSize.getHeight();
      let position = -pdf.internal.pageSize.getHeight();

      while (heightLeft > 0) {
        position -= pdf.internal.pageSize.getHeight();
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
        heightLeft -= pdf.internal.pageSize.getHeight();
      }

      // Generate filename with date
      const filename = `Ripoti_${new Date().toISOString().split('T')[0]}.pdf`;
      
      // Get PDF as blob
      const pdfBlob = pdf.output('blob');
      
      // FORCE DOWNLOAD - Use a hidden iframe or anchor with download attribute
      // Method: Use a hidden anchor with download attribute and trigger click
      const link = document.createElement('a');
      link.href = URL.createObjectURL(pdfBlob);
      link.download = filename;
      link.target = '_blank';
      link.style.display = 'none';
      document.body.appendChild(link);
      
      // Trigger the download
      link.click();
      
      // Clean up after download starts
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
      }, 100);
      
      toast.dismiss(downloadToast);
      toast.success("✅ Ripoti imepakuliwa kwa mafanikio!", {
        description: `Faili: ${filename}`
      });
      
    } catch (error) {
      console.error("Download error:", error);
      toast.dismiss(downloadToast);
      toast.error("Imeshindwa kupakua ripoti", {
        description: "Jaribu tena baadaye"
      });
    } finally {
      setDownloading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="reports-page">
      <div className="reports-container" ref={reportRef}>
        {/* Header */}
        <div className="reports-header">
          <div className="header-left">
            <Link to="/dashboard" className="back-button">
              ← Rudi Dashboard
            </Link>
            <h1 className="page-title">📊 Ripoti za Biashara</h1>
            <p className="page-subtitle">Angalia takwimu na ripoti za maombi yako</p>
          </div>
          <div className="header-actions">
            <button 
              className="btn-download"
              onClick={downloadReport}
              disabled={downloading || loadingData}
            >
              {downloading ? "⏳ Inapakua..." : "📥 Pakua Ripoti"}
            </button>
            <button 
              className="btn-print"
              onClick={() => window.print()}
            >
              🖨️ Chapisha
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="filters-section">
          <div className="filter-group">
            <label>Kuanzia Tarehe</label>
            <input
              type="date"
              value={dateRange.from}
              onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
            />
          </div>
          <div className="filter-group">
            <label>Hadi Tarehe</label>
            <input
              type="date"
              value={dateRange.to}
              onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
            />
          </div>
          <div className="filter-group">
            <label>Aina ya Ombi</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="all">Zote</option>
              <option value="wakala">Till Wakala</option>
              <option value="lipa">Lipa Namba</option>
              <option value="voda">Lipa ya Voda</option>
            </select>
          </div>
          <button className="btn-refresh" onClick={fetchData}>
            🔄 Refresh
          </button>
        </div>

        {loadingData ? (
          <div className="loading-state">Inapakia ripoti...</div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">📋</div>
                <div className="stat-content">
                  <div className="stat-value">{stats.total}</div>
                  <div className="stat-label">Jumla ya Maombi</div>
                </div>
              </div>
              <div className="stat-card success">
                <div className="stat-icon">✅</div>
                <div className="stat-content">
                  <div className="stat-value">{stats.approved}</div>
                  <div className="stat-label">Yamekubaliwa</div>
                </div>
              </div>
              <div className="stat-card warning">
                <div className="stat-icon">⏳</div>
                <div className="stat-content">
                  <div className="stat-value">{stats.pending}</div>
                  <div className="stat-label">Yanasubiri</div>
                </div>
              </div>
              <div className="stat-card danger">
                <div className="stat-icon">❌</div>
                <div className="stat-content">
                  <div className="stat-value">{stats.rejected}</div>
                  <div className="stat-label">Yamekataliwa</div>
                </div>
              </div>
              <div className="stat-card info">
                <div className="stat-icon">🔄</div>
                <div className="stat-content">
                  <div className="stat-value">{stats.processing}</div>
                  <div className="stat-label">Yanashughulikiwa</div>
                </div>
              </div>
              <div className="stat-card primary">
                <div className="stat-icon">💰</div>
                <div className="stat-content">
                  <div className="stat-value">{formatTzs(stats.totalCommission)}</div>
                  <div className="stat-label">Jumla ya Kamisheni</div>
                </div>
              </div>
              <div className="stat-card purple">
                <div className="stat-icon">📈</div>
                <div className="stat-content">
                  <div className="stat-value">{stats.successRate}%</div>
                  <div className="stat-label">Kiwango cha Mafanikio</div>
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="charts-grid">
              {/* Status Distribution */}
              <div className="chart-card">
                <h3>📊 Mgawanyo wa Hali</h3>
                <div className="chart-content">
                  <div className="distribution-list">
                    {Object.entries(statusDistribution).map(([key, value]) => (
                      <div key={key} className="distribution-item">
                        <div className="dist-label">
                          <span className={`dist-dot ${key}`}></span>
                          <span>{key === "pending" ? "Yanasubiri" :
                                 key === "approved" ? "Yamekubaliwa" :
                                 key === "rejected" ? "Yamekataliwa" :
                                 "Yanashughulikiwa"}</span>
                        </div>
                        <div className="dist-bar-wrapper">
                          <div 
                            className={`dist-bar ${key}`}
                            style={{ 
                              width: `${stats.total > 0 ? (value / stats.total) * 100 : 0}%` 
                            }}
                          />
                        </div>
                        <div className="dist-value">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Type Distribution */}
              <div className="chart-card">
                <h3>📈 Mgawanyo wa Aina</h3>
                <div className="chart-content">
                  <div className="type-grid">
                    {Object.entries(typeDistribution).map(([key, value]) => (
                      <div key={key} className="type-item">
                        <div className="type-icon">
                          {key === "Till Wakala" ? "📱" :
                           key === "Lipa Namba" ? "💳" :
                           "📞"}
                        </div>
                        <div className="type-info">
                          <div className="type-name">{key}</div>
                          <div className="type-count">{value} maombi</div>
                        </div>
                        <div className="type-percent">
                          {stats.total > 0 ? Math.round((value / stats.total) * 100) : 0}%
                        </div>
                      </div>
                    ))}
                    {Object.keys(typeDistribution).length === 0 && (
                      <div className="no-data">Hakuna data</div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Trend Chart */}
            <div className="trend-card">
              <h3>📅 Mwelekeo wa Maombi kwa Wiki</h3>
              <p className="trend-subtitle">Onesha idadi ya maombi kwa kila wiki</p>
              <div className="trend-content">
                {Object.keys(trendData).length > 0 ? (
                  <div className="trend-grid">
                    {Object.entries(trendData).map(([period, count]) => (
                      <div key={period} className="trend-item">
                        <div className="trend-label">{period}</div>
                        <div className="trend-bar-wrapper">
                          <div 
                            className="trend-bar"
                            style={{ 
                              height: `${Math.max(20, (count / Math.max(...Object.values(trendData))) * 120)}px` 
                            }}
                          >
                            <span className="trend-count">{count}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="no-data">Hakuna data ya mwelekeo</div>
                )}
              </div>
              <div className="trend-summary">
                <span>📊 Jumla ya maombi katika kipindi hiki: <strong>{filteredData.length}</strong></span>
                <span>📈 Wastani wa maombi kwa wiki: <strong>{(filteredData.length / Math.max(1, Object.keys(trendData).length)).toFixed(1)}</strong></span>
              </div>
            </div>

            {/* Recent Applications Table */}
            <div className="table-card">
              <div className="table-header">
                <h3>📋 Maombi ya Hivi Karibuni</h3>
                <span className="table-count">{filteredData.length} maombi</span>
              </div>
              <div className="table-scroll">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>#Namba</th>
                      <th>Mteja</th>
                      <th>Aina</th>
                      <th>Tarehe</th>
                      <th>Hali</th>
                      <th>Kamisheni</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.slice(0, 10).map((app) => (
                      <tr key={app.id}>
                        <td className="ref-cell">{app.ref_no || app.id.slice(0, 8)}</td>
                        <td>{app.customer_name}</td>
                        <td>{typeLabel(app.type)}</td>
                        <td>{new Date(app.created_at).toLocaleDateString('sw-TZ')}</td>
                        <td>
                          <span className={`badge ${app.status}`}>
                            {app.status === "pending" ? "Inasubiri" :
                             app.status === "approved" ? "Imekubaliwa" :
                             app.status === "rejected" ? "Imekataliwa" :
                             "Inashughulikiwa"}
                          </span>
                        </td>
                        <td className="commission-cell">
                          {formatTzs(app.type === "wakala" ? 15000 : 
                                    app.type === "lipa" ? 10000 : 8000)}
                        </td>
                      </tr>
                    ))}
                    {filteredData.length === 0 && (
                      <tr>
                        <td colSpan={6} className="no-data-cell">
                          Hakuna maombi yaliyopatikana
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>

      {/* CSS */}
      <style>{`
        .reports-page {
          min-height: 100vh;
          background: #f8f9fa;
          padding: 20px;
        }

        .reports-container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .reports-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 25px;
          flex-wrap: wrap;
          gap: 15px;
        }

        .header-left {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .header-actions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .back-button {
          display: inline-block;
          padding: 8px 16px;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          color: #1a1a2e;
          text-decoration: none;
          font-weight: 600;
          font-size: 14px;
          transition: 0.2s;
          width: fit-content;
        }

        .back-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(0,0,0,0.08);
        }

        .page-title {
          font-size: 28px;
          font-weight: 800;
          color: #1a1a2e;
          margin: 0;
        }

        .page-subtitle {
          font-size: 16px;
          color: #666;
          margin: 0;
        }

        .btn-download {
          padding: 12px 24px;
          background: #10b981;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          transition: 0.2s;
          white-space: nowrap;
        }

        .btn-download:hover:not(:disabled) {
          background: #059669;
          transform: translateY(-2px);
        }

        .btn-download:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn-print {
          padding: 12px 24px;
          background: #1a1a2e;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          transition: 0.2s;
          white-space: nowrap;
        }

        .btn-print:hover {
          background: #2d2d4a;
          transform: translateY(-2px);
        }

        .filters-section {
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
          flex: 1;
          min-width: 140px;
        }

        .filter-group label {
          font-size: 12px;
          font-weight: 600;
          color: #666;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .filter-group input,
        .filter-group select {
          padding: 8px 12px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          font-size: 13px;
          background: white;
          color: #1a1a2e;
          width: 100%;
        }

        .filter-group input:focus,
        .filter-group select:focus {
          outline: none;
          border-color: #eb5325;
          box-shadow: 0 0 0 3px rgba(235, 83, 37, 0.1);
        }

        .btn-refresh {
          padding: 8px 16px;
          background: #eb5325;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 13px;
          cursor: pointer;
          transition: 0.2s;
          align-self: flex-end;
          white-space: nowrap;
        }

        .btn-refresh:hover {
          background: #d44a1f;
          transform: translateY(-2px);
        }

        .loading-state {
          text-align: center;
          padding: 60px;
          font-size: 16px;
          color: #666;
          background: white;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 15px;
          margin-bottom: 25px;
        }

        .stat-card {
          background: white;
          padding: 18px 20px;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          display: flex;
          align-items: center;
          gap: 15px;
          transition: 0.2s;
          box-shadow: 0 2px 10px rgba(0,0,0,0.04);
        }

        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(0,0,0,0.08);
        }

        .stat-card.success {
          border-left: 4px solid #10b981;
        }

        .stat-card.warning {
          border-left: 4px solid #f59e0b;
        }

        .stat-card.danger {
          border-left: 4px solid #ef4444;
        }

        .stat-card.info {
          border-left: 4px solid #3b82f6;
        }

        .stat-card.primary {
          border-left: 4px solid #eb5325;
        }

        .stat-card.purple {
          border-left: 4px solid #8b5cf6;
        }

        .stat-icon {
          font-size: 28px;
        }

        .stat-content {
          display: flex;
          flex-direction: column;
        }

        .stat-value {
          font-size: 24px;
          font-weight: 800;
          color: #1a1a2e;
        }

        .stat-label {
          font-size: 12px;
          color: #666;
          font-weight: 500;
        }

        .charts-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 25px;
        }

        .chart-card {
          background: white;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          padding: 20px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.04);
        }

        .chart-card h3 {
          font-size: 16px;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0 0 20px 0;
        }

        .chart-content {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .distribution-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .distribution-item {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .dist-label {
          display: flex;
          align-items: center;
          gap: 8px;
          min-width: 140px;
          font-size: 14px;
          color: #1a1a2e;
        }

        .dist-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          display: inline-block;
        }

        .dist-dot.pending {
          background: #f59e0b;
        }

        .dist-dot.approved {
          background: #10b981;
        }

        .dist-dot.rejected {
          background: #ef4444;
        }

        .dist-dot.processing {
          background: #3b82f6;
        }

        .dist-bar-wrapper {
          flex: 1;
          height: 8px;
          background: #f0f0f0;
          border-radius: 4px;
          overflow: hidden;
        }

        .dist-bar {
          height: 100%;
          border-radius: 4px;
          transition: width 0.6s ease;
        }

        .dist-bar.pending {
          background: #f59e0b;
        }

        .dist-bar.approved {
          background: #10b981;
        }

        .dist-bar.rejected {
          background: #ef4444;
        }

        .dist-bar.processing {
          background: #3b82f6;
        }

        .dist-value {
          font-weight: 700;
          color: #1a1a2e;
          min-width: 30px;
          text-align: right;
        }

        .type-grid {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .type-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px;
          background: #f8f9fa;
          border-radius: 8px;
        }

        .type-icon {
          font-size: 24px;
        }

        .type-info {
          flex: 1;
        }

        .type-name {
          font-weight: 600;
          color: #1a1a2e;
          font-size: 14px;
        }

        .type-count {
          font-size: 12px;
          color: #666;
        }

        .type-percent {
          font-weight: 700;
          color: #eb5325;
          font-size: 16px;
        }

        .trend-card {
          background: white;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          padding: 20px;
          margin-bottom: 25px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.04);
        }

        .trend-card h3 {
          font-size: 16px;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0;
        }

        .trend-subtitle {
          font-size: 13px;
          color: #666;
          margin: 4px 0 20px 0;
        }

        .trend-grid {
          display: flex;
          align-items: flex-end;
          gap: 12px;
          padding: 10px 0;
          min-height: 180px;
          overflow-x: auto;
        }

        .trend-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          flex: 1;
          min-width: 50px;
        }

        .trend-label {
          font-size: 11px;
          color: #666;
          text-align: center;
          font-weight: 600;
        }

        .trend-bar-wrapper {
          display: flex;
          align-items: flex-end;
          height: 140px;
          width: 100%;
          min-width: 30px;
        }

        .trend-bar {
          width: 100%;
          min-height: 20px;
          background: linear-gradient(180deg, #eb5325, #f7971e);
          border-radius: 6px 6px 0 0;
          transition: height 0.8s ease;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding-top: 4px;
          position: relative;
          box-shadow: 0 2px 8px rgba(235, 83, 37, 0.2);
        }

        .trend-bar:hover {
          transform: scaleY(1.02);
          box-shadow: 0 4px 15px rgba(235, 83, 37, 0.3);
        }

        .trend-count {
          color: white;
          font-size: 11px;
          font-weight: 700;
          text-shadow: 0 1px 3px rgba(0,0,0,0.3);
        }

        .trend-summary {
          display: flex;
          justify-content: space-between;
          padding: 15px 10px 0 10px;
          border-top: 1px solid #e5e7eb;
          margin-top: 15px;
          font-size: 14px;
          color: #666;
          flex-wrap: wrap;
          gap: 10px;
        }

        .trend-summary strong {
          color: #1a1a2e;
        }

        .table-card {
          background: white;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0,0,0,0.04);
        }

        .table-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 18px 20px;
          border-bottom: 1px solid #e5e7eb;
        }

        .table-header h3 {
          font-size: 16px;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0;
        }

        .table-count {
          font-size: 13px;
          color: #666;
          background: #f0f0f0;
          padding: 4px 12px;
          border-radius: 20px;
        }

        .table-scroll {
          overflow-x: auto;
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
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
        }

        .badge {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
          display: inline-block;
        }

        .badge.pending {
          background: #fef3c7;
          color: #d97706;
        }

        .badge.approved {
          background: #d1fae5;
          color: #059669;
        }

        .badge.rejected {
          background: #fee2e2;
          color: #dc2626;
        }

        .badge.processing {
          background: #dbeafe;
          color: #2563eb;
        }

        .commission-cell {
          font-weight: 600;
          color: #eb5325;
        }

        .no-data {
          text-align: center;
          color: #999;
          padding: 20px;
          font-size: 14px;
        }

        .no-data-cell {
          text-align: center;
          color: #999;
          padding: 30px;
        }

        @media print {
          .back-button,
          .btn-download,
          .btn-print,
          .btn-refresh,
          .filters-section,
          .header-actions {
            display: none !important;
          }

          .reports-page {
            background: white !important;
            padding: 0 !important;
          }

          .stat-card,
          .chart-card,
          .trend-card,
          .table-card {
            break-inside: avoid;
            box-shadow: none !important;
            border: 1px solid #e5e7eb !important;
          }
        }

        @media (max-width: 1024px) {
          .charts-grid {
            grid-template-columns: 1fr;
          }

          .stats-grid {
            grid-template-columns: repeat(3, 1fr);
          }

          .trend-grid {
            gap: 8px;
          }
        }

        @media (max-width: 768px) {
          .reports-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .header-actions {
            width: 100%;
          }

          .btn-download,
          .btn-print {
            flex: 1;
            text-align: center;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .filters-section {
            flex-direction: column;
          }

          .filter-group {
            min-width: auto;
            width: 100%;
          }

          .btn-refresh {
            width: 100%;
            text-align: center;
          }

          .trend-grid {
            gap: 6px;
          }

          .trend-label {
            font-size: 9px;
          }

          .dist-label {
            min-width: 100px;
            font-size: 12px;
          }

          .trend-summary {
            flex-direction: column;
            align-items: flex-start;
            gap: 5px;
            font-size: 13px;
          }
        }

        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr 1fr;
            gap: 10px;
          }

          .stat-card {
            padding: 12px 15px;
          }

          .stat-value {
            font-size: 18px;
          }

          .stat-icon {
            font-size: 22px;
          }

          .page-title {
            font-size: 22px;
          }
        }
      `}</style>
    </div>
  );
}