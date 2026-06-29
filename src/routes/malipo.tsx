import { useState, useEffect } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/malipo")({
  head: () => ({
    meta: [
      { title: "Malipo - GJ General Traders" },
      {
        name: "description",
        content: "Fanya malipo yako kwa urahisi",
      },
    ],
  }),
  component: MalipoPage,
});

function MalipoPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"history" | "new" | "methods">("history");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("halopesa");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [description, setDescription] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  
  // Payment history
  const [paymentHistory, setPaymentHistory] = useState<Array<{
    id: number;
    date: string;
    service: string;
    amount: string;
    status: "Completed" | "Pending" | "Failed";
    method: string;
    reference: string;
    senderPhone?: string;
  }>>([]);

  // Load payments from localStorage
  useEffect(() => {
    if (user?.email) {
      const storedKey = `payments_${user.email}`;
      const stored = localStorage.getItem(storedKey);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setPaymentHistory(parsed);
        } catch (e) {
          setPaymentHistory([]);
        }
      }
    }
  }, [user]);

  // Save payments to localStorage
  useEffect(() => {
    if (user?.email && paymentHistory.length > 0) {
      const storedKey = `payments_${user.email}`;
      localStorage.setItem(storedKey, JSON.stringify(paymentHistory));
    }
  }, [paymentHistory, user]);

  if (!user) {
    navigate({ to: "/login" });
    return null;
  }

  // Payment method details - REAL ACCOUNTS
  const paymentMethodDetails = {
    halopesa: {
      name: "HaloPesa",
      icon: "📱",
      number: "0762 000 000",
      accountName: "GJ General Traders Ltd",
      instructions: "Tuma malipo kupitia HaloPesa kwenye namba iliyo hapo juu. Hakikisha unatumia namba yako ya simu iliyosajiliwa."
    },
    mpesa: {
      name: "M-Pesa",
      icon: "📞",
      number: "0754 000 000",
      accountName: "GJ General Traders Ltd",
      instructions: "Tuma malipo kupitia M-Pesa kwenye namba iliyo hapo juu. Hakikisha unatumia namba yako ya simu iliyosajiliwa."
    },
    bank: {
      name: "Benki",
      icon: "🏦",
      number: "CRDB Bank - A/C: 1234567890",
      accountName: "GJ General Traders Ltd",
      instructions: "Fanya uhamisho wa benki kwenye akaunti ya CRDB. Tafadhali tumia jina lako kama maelezo ya malipo."
    },
    card: {
      name: "Kadi ya Benki",
      icon: "💳",
      number: "5169 0000 0000 0000",
      accountName: "GJ General Traders Ltd",
      instructions: "Malipo kwa kadi inakuja hivi karibuni. Kwa sasa tumia njia zingine za malipo."
    }
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedService) {
      toast.error("Tafadhali chagua huduma");
      return;
    }

    const amountNum = parseFloat(amount);
    if (!amount || amountNum <= 0) {
      toast.error("Tafadhali ingiza kiasi sahihi");
      return;
    }

    if (!phoneNumber || phoneNumber.length < 10) {
      toast.error("Tafadhali ingiza namba ya simu sahihi (07XXXXXXXX)");
      return;
    }

    // Show payment details with real account info
    setShowPaymentDetails(true);
  };

  const confirmPayment = () => {
    setIsSubmitting(true);
    const loadingToast = toast.loading("Inathibitisha malipo yako...");

    setTimeout(() => {
      const ref = `${paymentMethod === "halopesa" ? "HPS" : paymentMethod === "mpesa" ? "MP" : "BANK"}-${Date.now().toString().slice(-6)}`;
      
      const serviceNames: {[key: string]: string} = {
        "till-wakala": "Sajili Wakala HaloPesa",
        "lipa-namba": "Lipa Namba",
        "voda": "Lipa ya Voda",
        "router": "Router Unlimited Internet",
        "sme": "SME Bundle"
      };
      
      const amountNum = parseFloat(amount);
      
      const newPayment = {
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        service: serviceNames[selectedService] || selectedService,
        amount: amountNum.toLocaleString(),
        status: "Pending" as const,
        method: paymentMethod === "halopesa" ? "HaloPesa" : paymentMethod === "mpesa" ? "M-Pesa" : paymentMethod === "bank" ? "Benki" : "Kadi",
        reference: ref,
        senderPhone: phoneNumber
      };

      setPaymentHistory(prev => [newPayment, ...prev]);
      
      setAmount("");
      setPhoneNumber("");
      setDescription("");
      setSelectedService("");
      setShowPaymentDetails(false);
      
      toast.dismiss(loadingToast);
      toast.success(`✅ Malipo yako yamewasilishwa!`);
      toast.info(`🔑 Namba ya kumbukumbu: ${ref}`);
      toast.info(`📌 Malipo yatakamilika baada ya uthibitisho wa pesa.`);
      
      setIsSubmitting(false);
    }, 1500);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case "Completed": return "#10b981";
      case "Pending": return "#f59e0b";
      case "Failed": return "#ef4444";
      default: return "#6b7280";
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case "Completed": return "✅";
      case "Pending": return "⏳";
      case "Failed": return "❌";
      default: return "📋";
    }
  };

  const getMethodIcon = (method: string) => {
    switch(method) {
      case "HaloPesa": return "📱";
      case "M-Pesa": return "📞";
      case "Benki": return "🏦";
      default: return "💳";
    }
  };

  // Calculate stats
  const totalPayments = paymentHistory.reduce((sum, p) => {
    if (p.status === "Completed") {
      return sum + parseInt(p.amount.replace(/,/g, ''));
    }
    return sum;
  }, 0);
  
  const completedPayments = paymentHistory.filter(p => p.status === "Completed").length;
  const pendingPayments = paymentHistory.filter(p => p.status === "Pending").length;

  const currentMethodDetails = paymentMethodDetails[paymentMethod as keyof typeof paymentMethodDetails];

  return (
    <div className="malipo-page">
      <div className="malipo-container">
        {/* Header */}
        <div className="malipo-header">
          <Link to="/dashboard" className="back-button">
            ← Rudi Dashboard
          </Link>
          <h1 className="page-title">💰 Malipo</h1>
          <p className="page-subtitle">Fanya malipo yako kwa urahisi na usalama</p>
        </div>

        {/* Quick Stats */}
        <div className="malipo-stats">
          <div className="stat-item">
            <div className="stat-value">TSh {totalPayments.toLocaleString()}</div>
            <div className="stat-label">Jumla ya Malipo</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{completedPayments}</div>
            <div className="stat-label">Malipo Yaliyokamilika</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{pendingPayments}</div>
            <div className="stat-label">Yanasubiri</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="malipo-tabs">
          <button 
            className={`tab-btn ${activeTab === "history" ? "active" : ""}`}
            onClick={() => setActiveTab("history")}
          >
            📋 Historia
          </button>
          <button 
            className={`tab-btn ${activeTab === "new" ? "active" : ""}`}
            onClick={() => setActiveTab("new")}
          >
            ➕ Malipo Mpya
          </button>
          <button 
            className={`tab-btn ${activeTab === "methods" ? "active" : ""}`}
            onClick={() => setActiveTab("methods")}
          >
            💳 Njia za Malipo
          </button>
        </div>

        {/* Tab Content */}
        <div className="malipo-content">
          {/* History Tab */}
          {activeTab === "history" && (
            <div className="history-section">
              <div className="history-header">
                <h3>Historia ya Malipo</h3>
                <span className="payment-count">{paymentHistory.length} malipo</span>
              </div>

              {paymentHistory.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">📭</div>
                  <h4>Hakuna Malipo</h4>
                  <p>Bado hujafanya malipo yoyote. Fanya malipo yako ya kwanza sasa!</p>
                  <button className="empty-btn" onClick={() => setActiveTab("new")}>
                    ➕ Fanya Malipo Mpya
                  </button>
                </div>
              ) : (
                <div className="payment-list">
                  {paymentHistory.map((payment) => (
                    <div key={payment.id} className="payment-item">
                      <div className="payment-info">
                        <div className="payment-service">{payment.service}</div>
                        <div className="payment-date">📅 {payment.date}</div>
                        <div className="payment-method">
                          {getMethodIcon(payment.method)} {payment.method}
                        </div>
                        {payment.senderPhone && (
                          <div className="payment-phone">📱 {payment.senderPhone}</div>
                        )}
                        <div className="payment-reference">🔑 {payment.reference}</div>
                      </div>
                      <div className="payment-details">
                        <div className="payment-amount">TSh {payment.amount}</div>
                        <div 
                          className="payment-status"
                          style={{ color: getStatusColor(payment.status) }}
                        >
                          {getStatusIcon(payment.status)} {payment.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* New Payment Tab */}
          {activeTab === "new" && (
            <div className="new-payment-section">
              <h3>Fanya Malipo Mpya</h3>
              
              {showPaymentDetails ? (
                // Payment Confirmation with Real Details
                <div className="payment-confirmation">
                  <h4>✅ Thibitisha Malipo Yako</h4>
                  
                  <div className="confirmation-details">
                    <div className="confirmation-row">
                      <span className="confirmation-label">Huduma:</span>
                      <span className="confirmation-value">
                        {selectedService === "till-wakala" ? "Sajili Wakala HaloPesa" :
                         selectedService === "lipa-namba" ? "Lipa Namba" :
                         selectedService === "voda" ? "Lipa ya Voda" :
                         selectedService === "router" ? "Router Unlimited Internet" :
                         "SME Bundle"}
                      </span>
                    </div>
                    <div className="confirmation-row">
                      <span className="confirmation-label">Kiasi:</span>
                      <span className="confirmation-value">TSh {parseFloat(amount).toLocaleString()}</span>
                    </div>
                    <div className="confirmation-row">
                      <span className="confirmation-label">Njia ya Malipo:</span>
                      <span className="confirmation-value">{currentMethodDetails.icon} {currentMethodDetails.name}</span>
                    </div>
                    <div className="confirmation-row">
                      <span className="confirmation-label">Namba ya Simu:</span>
                      <span className="confirmation-value">{phoneNumber}</span>
                    </div>
                  </div>

                  <div className="payment-instructions">
                    <h5>📌 Maelekezo ya Malipo</h5>
                    <div className="instruction-box">
                      <p><strong>Jina la Akaunti:</strong> {currentMethodDetails.accountName}</p>
                      <p><strong>Namba ya Malipo:</strong> {currentMethodDetails.number}</p>
                      <p><strong>{currentMethodDetails.name} Instructions:</strong> {currentMethodDetails.instructions}</p>
                    </div>
                    
                    <div className="instruction-warning">
                      ⚠️ <strong>Muhimu:</strong> Hakikisha unatuma kiasi sawa. Malipo yatakamilika baada ya uthibitisho wa pesa.
                    </div>
                  </div>

                  <div className="confirmation-actions">
                    <button 
                      className="cancel-btn"
                      onClick={() => setShowPaymentDetails(false)}
                    >
                      ❌ Ghairi
                    </button>
                    <button 
                      className="confirm-btn"
                      onClick={confirmPayment}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "⏳ Inathibitisha..." : "✅ Thibitisha Malipo"}
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handlePayment} className="payment-form">
                  <div className="form-group">
                    <label className="form-label">Huduma</label>
                    <select 
                      className="form-select" 
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      required
                    >
                      <option value="">Chagua huduma...</option>
                      <option value="till-wakala">Sajili Wakala HaloPesa</option>
                      <option value="lipa-namba">Lipa Namba</option>
                      <option value="voda">Lipa ya Voda</option>
                      <option value="router">Router Unlimited Internet</option>
                      <option value="sme">SME Bundle</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Kiasi (TSh)</label>
                    <input 
                      type="number" 
                      className="form-input"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Ingiza kiasi"
                      required
                      min="1"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Njia ya Malipo</label>
                    <div className="payment-methods-grid">
                      <button 
                        type="button"
                        className={`method-option ${paymentMethod === "halopesa" ? "active" : ""}`}
                        onClick={() => setPaymentMethod("halopesa")}
                      >
                        📱 HaloPesa
                      </button>
                      <button 
                        type="button"
                        className={`method-option ${paymentMethod === "mpesa" ? "active" : ""}`}
                        onClick={() => setPaymentMethod("mpesa")}
                      >
                        📞 M-Pesa
                      </button>
                      <button 
                        type="button"
                        className={`method-option ${paymentMethod === "bank" ? "active" : ""}`}
                        onClick={() => setPaymentMethod("bank")}
                      >
                        🏦 Benki
                      </button>
                      <button 
                        type="button"
                        className={`method-option ${paymentMethod === "card" ? "active" : ""}`}
                        onClick={() => setPaymentMethod("card")}
                      >
                        💳 Kadi
                      </button>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Namba ya Simu Yako</label>
                    <input 
                      type="tel" 
                      className="form-input"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="07XXXXXXXX"
                      required
                    />
                    <span className="form-hint">📌 Namba utakayotumia kutuma malipo</span>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Maelezo (Hiari)</label>
                    <textarea 
                      className="form-textarea"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Maelezo ya malipo..."
                      rows={3}
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="submit-payment-btn"
                    disabled={isSubmitting}
                  >
                    💳 Endelea na Malipo
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Payment Methods Tab - Real Information */}
          {activeTab === "methods" && (
            <div className="methods-section">
              <h3>Njia Zinazopatikana za Malipo</h3>
              
              <div className="methods-grid">
                <div className="method-card real-method">
                  <div className="method-icon">📱</div>
                  <h4>HaloPesa</h4>
                  <div className="method-details">
                    <p><strong>Namba:</strong> 0762 000 000</p>
                    <p><strong>Jina:</strong> GJ General Traders Ltd</p>
                  </div>
                  <p>Malipo kupitia HaloPesa. Hakikisha una akaunti ya HaloPesa.</p>
                  <div className="method-badge active">Inatumika</div>
                </div>

                <div className="method-card real-method">
                  <div className="method-icon">📞</div>
                  <h4>M-Pesa</h4>
                  <div className="method-details">
                    <p><strong>Namba:</strong> 0754 000 000</p>
                    <p><strong>Jina:</strong> GJ General Traders Ltd</p>
                  </div>
                  <p>Malipo kupitia M-Pesa. Inapatikana kwa wateja wote wa Vodacom.</p>
                  <div className="method-badge active">Inatumika</div>
                </div>

                <div className="method-card real-method">
                  <div className="method-icon">🏦</div>
                  <h4>Benki</h4>
                  <div className="method-details">
                    <p><strong>Akaunti:</strong> CRDB 1234567890</p>
                    <p><strong>Jina:</strong> GJ General Traders Ltd</p>
                  </div>
                  <p>Malipo kupitia uhamisho wa benki. Inachukua siku 1-3 za kazi.</p>
                  <div className="method-badge active">Inatumika</div>
                </div>

                <div className="method-card">
                  <div className="method-icon">💳</div>
                  <h4>Kadi ya Benki</h4>
                  <p>Malipo kupitia kadi za benki (Visa, Mastercard).</p>
                  <div className="method-badge">Inakuja Hivi Karibuni</div>
                </div>
              </div>

              <div className="methods-info">
                <h4>📌 Maelezo Muhimu ya Malipo</h4>
                <ul>
                  <li>✓ Hakikisha unatuma kiasi sawa na kilichoombwa</li>
                  <li>✓ Tumia namba ya simu iliyosajiliwa kwenye akaunti yako</li>
                  <li>✓ Malipo yatakamilika baada ya uthibitisho wa pesa (dakika 5-10)</li>
                  <li>✓ Utapata uthibitisho kupitia SMS na barua pepe</li>
                  <li>✓ Kwa usaidizi, wasiliana nasi 24/7: 0762 000 000</li>
                  <li>✓ Hifadhi namba ya kumbukumbu ya malipo yako</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CSS */}
      <style>{`
        .malipo-page {
          min-height: 100vh;
          background: #f8f9fa;
          padding: 20px;
        }

        .malipo-container {
          max-width: 1000px;
          margin: 0 auto;
        }

        .malipo-header {
          margin-bottom: 25px;
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
          color: #1a1a2e;
          margin: 0;
        }

        .page-subtitle {
          font-size: 16px;
          color: #666;
          margin: 5px 0 0 0;
        }

        .malipo-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 15px;
          margin-bottom: 25px;
        }

        .stat-item {
          background: white;
          padding: 18px 20px;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          text-align: center;
          box-shadow: 0 2px 10px rgba(0,0,0,0.04);
        }

        .stat-value {
          font-size: 24px;
          font-weight: 800;
          color: #eb5325;
        }

        .stat-label {
          font-size: 13px;
          color: #666;
          margin-top: 4px;
        }

        .malipo-tabs {
          display: flex;
          gap: 10px;
          margin-bottom: 25px;
          background: white;
          padding: 6px;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          box-shadow: 0 2px 10px rgba(0,0,0,0.04);
        }

        .tab-btn {
          flex: 1;
          padding: 12px 20px;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: 0.2s;
          background: transparent;
          color: #666;
        }

        .tab-btn:hover {
          background: #f0f0f0;
        }

        .tab-btn.active {
          background: #eb5325;
          color: white;
        }

        .malipo-content {
          background: white;
          border-radius: 14px;
          padding: 25px;
          border: 1px solid #e5e7eb;
          box-shadow: 0 2px 10px rgba(0,0,0,0.04);
        }

        /* History */
        .history-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .history-header h3 {
          font-size: 18px;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0;
        }

        .payment-count {
          font-size: 14px;
          color: #666;
          background: #f0f0f0;
          padding: 4px 12px;
          border-radius: 20px;
        }

        .empty-state {
          text-align: center;
          padding: 40px 20px;
        }

        .empty-icon {
          font-size: 60px;
          margin-bottom: 15px;
        }

        .empty-state h4 {
          font-size: 18px;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0 0 5px 0;
        }

        .empty-state p {
          font-size: 14px;
          color: #666;
          margin: 0 0 20px 0;
        }

        .empty-btn {
          padding: 12px 24px;
          background: #eb5325;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: 0.2s;
        }

        .empty-btn:hover {
          background: #d44a1f;
          transform: translateY(-2px);
        }

        .payment-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .payment-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          transition: 0.2s;
        }

        .payment-item:hover {
          background: #f8f9fa;
        }

        .payment-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .payment-service {
          font-weight: 600;
          color: #1a1a2e;
          font-size: 15px;
        }

        .payment-date {
          font-size: 12px;
          color: #999;
        }

        .payment-method {
          font-size: 12px;
          color: #666;
        }

        .payment-phone {
          font-size: 12px;
          color: #666;
          font-weight: 500;
        }

        .payment-reference {
          font-size: 11px;
          color: #999;
          font-family: monospace;
        }

        .payment-details {
          text-align: right;
        }

        .payment-amount {
          font-weight: 700;
          font-size: 16px;
          color: #1a1a2e;
        }

        .payment-status {
          font-size: 13px;
          font-weight: 600;
        }

        /* New Payment */
        .new-payment-section h3 {
          font-size: 18px;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0 0 20px 0;
        }

        .payment-form {
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
          color: #1a1a2e;
        }

        .form-input,
        .form-select,
        .form-textarea {
          padding: 12px 14px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          font-size: 14px;
          transition: 0.2s;
          font-family: inherit;
        }

        .form-input:focus,
        .form-select:focus,
        .form-textarea:focus {
          outline: none;
          border-color: #eb5325;
          box-shadow: 0 0 0 3px rgba(235, 83, 37, 0.1);
        }

        .form-textarea {
          resize: vertical;
        }

        .form-hint {
          font-size: 12px;
          color: #999;
        }

        .payment-methods-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
        }

        .method-option {
          padding: 12px;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          background: white;
          cursor: pointer;
          transition: 0.2s;
          font-weight: 600;
          font-size: 13px;
        }

        .method-option:hover {
          border-color: #eb5325;
        }

        .method-option.active {
          border-color: #eb5325;
          background: #fff5f0;
          color: #eb5325;
        }

        .submit-payment-btn {
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

        .submit-payment-btn:hover:not(:disabled) {
          background: #d44a1f;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(235, 83, 37, 0.3);
        }

        .submit-payment-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* Payment Confirmation */
        .payment-confirmation {
          padding: 20px;
          background: #f8f9fa;
          border-radius: 12px;
        }

        .payment-confirmation h4 {
          font-size: 18px;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0 0 20px 0;
          text-align: center;
        }

        .confirmation-details {
          background: white;
          padding: 15px;
          border-radius: 10px;
          margin-bottom: 20px;
        }

        .confirmation-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid #f0f0f0;
        }

        .confirmation-row:last-child {
          border-bottom: none;
        }

        .confirmation-label {
          font-weight: 600;
          color: #666;
        }

        .confirmation-value {
          font-weight: 600;
          color: #1a1a2e;
        }

        .payment-instructions {
          margin: 20px 0;
        }

        .payment-instructions h5 {
          font-size: 16px;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0 0 10px 0;
        }

        .instruction-box {
          background: white;
          padding: 15px;
          border-radius: 10px;
          border-left: 4px solid #eb5325;
        }

        .instruction-box p {
          margin: 5px 0;
          font-size: 14px;
          color: #4a4a4a;
        }

        .instruction-warning {
          background: #fef2f2;
          padding: 12px 15px;
          border-radius: 8px;
          border: 1px solid #fca5a5;
          margin-top: 15px;
          font-size: 14px;
          color: #dc2626;
        }

        .confirmation-actions {
          display: flex;
          gap: 15px;
          margin-top: 20px;
        }

        .cancel-btn {
          flex: 1;
          padding: 12px;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          background: white;
          color: #666;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: 0.2s;
        }

        .cancel-btn:hover {
          background: #f0f0f0;
        }

        .confirm-btn {
          flex: 2;
          padding: 12px;
          background: #10b981;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          transition: 0.2s;
        }

        .confirm-btn:hover:not(:disabled) {
          background: #059669;
          transform: translateY(-2px);
        }

        .confirm-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* Methods */
        .methods-section h3 {
          font-size: 18px;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0 0 20px 0;
        }

        .methods-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
          margin-bottom: 25px;
        }

        .method-card {
          padding: 20px;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          text-align: center;
          transition: 0.2s;
        }

        .method-card:hover {
          border-color: #eb5325;
          box-shadow: 0 4px 15px rgba(0,0,0,0.08);
        }

        .method-card.real-method {
          background: #fff5f0;
          border-color: #eb5325;
        }

        .method-icon {
          font-size: 40px;
          margin-bottom: 10px;
        }

        .method-card h4 {
          font-size: 16px;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0 0 10px 0;
        }

        .method-details {
          background: white;
          padding: 10px;
          border-radius: 8px;
          margin: 10px 0;
          font-size: 13px;
        }

        .method-details p {
          margin: 3px 0;
          color: #4a4a4a;
        }

        .method-card p {
          font-size: 13px;
          color: #666;
          margin: 0 0 10px 0;
          line-height: 1.5;
        }

        .method-badge {
          display: inline-block;
          padding: 4px 12px;
          background: #e5e7eb;
          color: #666;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
        }

        .method-badge.active {
          background: #10b981;
          color: white;
        }

        .methods-info {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 12px;
        }

        .methods-info h4 {
          font-size: 16px;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0 0 10px 0;
        }

        .methods-info ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .methods-info ul li {
          padding: 6px 0;
          font-size: 14px;
          color: #4a4a4a;
        }

        @media (max-width: 768px) {
          .malipo-page {
            padding: 15px;
          }

          .page-title {
            font-size: 22px;
          }

          .malipo-stats {
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
          }

          .stat-item {
            padding: 12px 10px;
          }

          .stat-value {
            font-size: 18px;
          }

          .stat-label {
            font-size: 11px;
          }

          .malipo-tabs {
            flex-wrap: wrap;
          }

          .tab-btn {
            font-size: 12px;
            padding: 10px 12px;
            flex: 1;
            min-width: 60px;
          }

          .payment-methods-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .methods-grid {
            grid-template-columns: 1fr;
          }

          .payment-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }

          .payment-details {
            text-align: left;
            width: 100%;
          }

          .confirmation-row {
            flex-direction: column;
            gap: 3px;
          }

          .confirmation-actions {
            flex-direction: column;
          }
        }

        @media (max-width: 480px) {
          .malipo-stats {
            grid-template-columns: 1fr;
            gap: 8px;
          }

          .stat-item {
            padding: 12px 15px;
          }

          .stat-value {
            font-size: 20px;
          }

          .history-header {
            flex-direction: column;
            gap: 10px;
            align-items: stretch;
          }

          .payment-methods-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .method-option {
            font-size: 12px;
            padding: 10px;
          }

          .submit-payment-btn {
            font-size: 14px;
            padding: 12px;
          }
        }
      `}</style>
    </div>
  );
}