import { useState, ReactNode, useRef } from "react";
import { useNavigate, Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

// ================= UTILITY FUNCTIONS =================

const digitsOnly = (value: string) => value.replace(/\D/g, "");
const upperCase = (value: string) => value.toUpperCase();

const formatTin = (value: string) => {
  const digits = digitsOnly(value).slice(0, 9);
  if (digits.length <= 3) return digits;
  if (digits.length <= 5) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5)}`;
};

const formatNida = (value: string) => {
  const digits = digitsOnly(value).slice(0, 20);
  if (digits.length <= 8) return digits;
  if (digits.length <= 13) return `${digits.slice(0, 8)}-${digits.slice(8)}`;
  if (digits.length <= 18) return `${digits.slice(0, 8)}-${digits.slice(8, 13)}-${digits.slice(13)}`;
  return `${digits.slice(0, 8)}-${digits.slice(8, 13)}-${digits.slice(13, 18)}-${digits.slice(18)}`;
};

// ================= FILE UPLOAD FUNCTION WITH PROPER AUTH =================

const uploadFileWithProgress = async (
  file: File,
  path: string,
  onProgress: (progress: number) => void,
  accessToken: string // Pass the access token from the user session
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    
    // Get the upload URL
    const uploadUrl = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/application-docs/${path}`;
    
    xhr.open("POST", uploadUrl);
    
    // IMPORTANT: Use the user's access token, not the ANON_KEY
    xhr.setRequestHeader("Authorization", `Bearer ${accessToken}`);
    
    // Track upload progress
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100);
        onProgress(percent);
        console.log(`📊 Upload progress: ${percent}%`);
      }
    };
    
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        // Get the public URL
        const publicUrl = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/application-docs/${path}`;
        console.log(`✅ Upload successful: ${publicUrl}`);
        resolve(publicUrl);
      } else {
        console.error(`❌ Upload failed with status ${xhr.status}:`, xhr.responseText);
        try {
          const errorData = JSON.parse(xhr.responseText);
          reject(new Error(errorData.message || `Upload failed: ${xhr.status}`));
        } catch {
          reject(new Error(`Upload failed: ${xhr.status} - ${xhr.responseText}`));
        }
      }
    };
    
    xhr.onerror = () => {
      console.error("❌ Network error during upload");
      reject(new Error("Network error during upload"));
    };
    
    xhr.ontimeout = () => {
      console.error("❌ Upload timeout");
      reject(new Error("Upload timeout"));
    };
    
    // Set timeout to 2 minutes
    xhr.timeout = 120000;
    
    // Create form data
    const formData = new FormData();
    formData.append("file", file);
    
    // Send the request
    xhr.send(formData);
  });
};

// ================= TYPES =================

export type ApplicationFormProps = {
  type: "wakala" | "lipa" | "voda";
  title: string;
  subtitle: string;
  extra?: ReactNode;
  category?: "MACHINGA" | "BINAFSI" | "COMPANY_LIMITED";
  onCategoryChange?: (c: "MACHINGA" | "BINAFSI" | "COMPANY_LIMITED") => void;
};

interface FormData {
  customer_name: string;
  phone: string;
  alt_phone: string;
  tin: string;
  id_type: string;
  id_number: string;
  business_name: string;
  business_type: string;
  email: string;
  ward: string;
  district: string;
  region: string;
  has_agent_line: boolean;
  notes: string;
}

// ================= MAIN COMPONENT =================

export function ApplicationForm({
  type,
  title,
  subtitle,
  extra,
  category,
  onCategoryChange,
}: ApplicationFormProps) {
  const { user } = useAuth();
  const navigate = useNavigate();

  // ================= REFS FOR FILE INPUTS =================

  const fileInputs = {
    id_photo: useRef<HTMLInputElement | null>(null),
    tin_photo: useRef<HTMLInputElement | null>(null),
    business_store_photo: useRef<HTMLInputElement | null>(null),
  };

  // ================= STATE =================

  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<FormData>({
    customer_name: "",
    phone: "",
    alt_phone: "",
    tin: "",
    id_type: "NIDA",
    id_number: "",
    business_name: "",
    business_type: "",
    email: "",
    ward: "",
    district: "",
    region: "",
    has_agent_line: false,
    notes: "",
  });
  const [fileNames, setFileNames] = useState<Record<string, string>>({});
  const [contractGenerated, setContractGenerated] = useState(false);
  const [lastApplicationData, setLastApplicationData] = useState<any>(null);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});

  // ================= HELPERS =================

  const update = (k: keyof FormData, v: any) =>
    setForm((f) => ({ ...f, [k]: v }));

  // ================= AUTH GUARD =================

  if (!user) {
    return (
      <div className="form-page">
        <div className="info-box">
          Tafadhali <Link to="/login">ingia</Link> kwanza.
        </div>
      </div>
    );
  }

  // ================= FILE HANDLER =================

  const handleFileChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      toast.error(`Faili ${file.name} inazidi 10MB.`);
      return;
    }

    setFileNames(prev => ({ ...prev, [key]: file.name }));
    toast.success(`${file.name} imechaguliwa!`);
  };

  // ================= GET ACCESS TOKEN =================

  const getAccessToken = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      throw new Error("No active session. Please login again.");
    }
    return session.access_token;
  };

  // ================= SUBMIT HANDLER =================

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    // ================= VALIDATION =================
    if (!form.customer_name || !form.phone) {
      toast.error("Jaza taarifa za msingi");
      return;
    }

    if (!/^(06|07)\d{8}$/.test(form.phone)) {
      toast.error("Namba ya simu si sahihi");
      return;
    }

    const idPhotoFile = fileInputs.id_photo.current?.files?.[0];
    if (!idPhotoFile) {
      toast.error("Picha ya Kitambulisho inahitajika");
      return;
    }

    setSubmitting(true);
    const toastId = toast.loading("Inatuma maombi...");

    try {
      // ================= GET ACCESS TOKEN =================
      const accessToken = await getAccessToken();
      console.log("🔑 Got access token");

      // ================= FILE UPLOAD WITH PROGRESS =================
      const uploads: Record<string, string> = {};

      const uploadTasks = [
        { key: "id_photo", ref: fileInputs.id_photo, required: true, label: "Picha ya Kitambulisho" },
        { key: "tin_photo", ref: fileInputs.tin_photo, required: false, label: "Picha ya TIN" },
        { key: "business_store_photo", ref: fileInputs.business_store_photo, required: false, label: "Picha ya Biashara" },
      ];

      // Upload files one by one with progress
      for (const task of uploadTasks) {
        const file = task.ref.current?.files?.[0];
        if (!file) {
          if (task.required) {
            throw new Error(`${task.label} inahitajika`);
          }
          continue;
        }

        try {
          const path = `${user.id}/${Date.now()}-${file.name}`;
          toast.loading(`Inapakia ${task.label}... 0%`, { id: toastId });
          
          // Reset progress for this file
          setUploadProgress(prev => ({ ...prev, [task.key]: 0 }));
          
          // Upload with progress tracking using the access token
          const url = await uploadFileWithProgress(
            file,
            path,
            (progress) => {
              setUploadProgress(prev => ({ ...prev, [task.key]: progress }));
              toast.loading(`Inapakia ${task.label}... ${progress}%`, { id: toastId });
            },
            accessToken // Pass the access token
          );
          
          uploads[task.key] = url;
          
          setUploadProgress(prev => ({ ...prev, [task.key]: 100 }));
          toast.loading(`✅ ${task.label} imepakiwa (100%)`, { id: toastId });
        } catch (err: any) {
          console.error(`Failed to upload ${task.key}:`, err);
          throw new Error(`Imeshindwa kupakia ${task.label}. ${err.message || "Jaribu tena."}`);
        }
      }

      // ================= PAYLOAD =================
      const payload: any = {
        user_id: user.id,
        type: type,
        customer_name: form.customer_name,
        phone: form.phone,
        documents: uploads,
        status: "pending",
        processing_status: "queued",
        submitted_at: new Date().toISOString(),
      };

      // Only add optional fields if they have values
      if (form.alt_phone) payload.alt_phone = form.alt_phone;
      if (form.tin) payload.tin = form.tin;
      if (form.id_number) payload.id_number = form.id_number;
      if (form.business_name) payload.business_name = form.business_name;
      if (form.business_type) payload.business_type = form.business_type;
      if (form.email) payload.email = form.email;
      if (form.ward) payload.ward = form.ward;
      if (form.district) payload.district = form.district;
      if (form.region) payload.region = form.region;
      if (form.has_agent_line) payload.has_agent_line = form.has_agent_line;
      if (form.notes) payload.notes = form.notes;
      
      // Add category only for lipa type
      if (type === "lipa" && category) {
        payload.category = category;
      }

      console.log("📝 Submitting payload:", payload);

      // ================= INSERT INTO DATABASE =================
      toast.loading("Inahifadhi taarifa...", { id: toastId });

      const { data, error } = await supabase
        .from("applications")
        .insert(payload)
        .select()
        .single();

      if (error) {
        console.error("❌ Database error:", error);
        throw new Error(`Database error: ${error.message}`);
      }

      console.log("✅ Data saved successfully:", data);

      toast.dismiss(toastId);
      toast.success("✅ Maombi yamewasilishwa!");

      setContractGenerated(true);
      setLastApplicationData(data);

      // ================= RESET FORM =================
      setForm({
        customer_name: "",
        phone: "",
        alt_phone: "",
        tin: "",
        id_type: "NIDA",
        id_number: "",
        business_name: "",
        business_type: "",
        email: "",
        ward: "",
        district: "",
        region: "",
        has_agent_line: false,
        notes: "",
      });

      setFileNames({});
      setUploadProgress({});
      
      // Reset file inputs
      Object.values(fileInputs).forEach(ref => {
        if (ref.current) {
          ref.current.value = '';
        }
      });

      setTimeout(() => {
        navigate({ to: "/fuatilia" });
      }, 1500);

    } catch (err: any) {
      console.error("❌ Submit error:", err);
      toast.dismiss(toastId);
      
      // Check if it's an auth error
      if (err.message?.includes("Invalid Compact JWS") || err.message?.includes("JWT")) {
        toast.error("Sesi imeisha muda", {
          description: "Tafadhali ingia tena ili kuendelea.",
        });
        // Redirect to login after a moment
        setTimeout(() => {
          navigate({ to: "/login" });
        }, 2000);
      } else {
        toast.error("Imeshindwa kutuma", {
          description: err.message || "Jaribu tena baadaye",
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  // ================= UI RENDER =================

  return (
    <div className="form-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/">Nyumbani</Link>
        <span className="crumb-separator">›</span>
        <span className="crumb-active">{title}</span>
      </div>

      {/* Success Banner */}
      {contractGenerated && (
        <div className="success-banner">
          <div className="success-icon">✅</div>
          <div className="success-content">
            <h4>Hongera! Ombi Limesajiliwa!</h4>
            <p>Taarifa zako zimehifadhiwa.</p>
            <div className="success-actions">
              <Link to="/fuatilia" className="btn-view">👁️ Fuatilia</Link>
            </div>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={submit} className="form-card">
        {/* Header */}
        <div className="form-card-header">
          <svg viewBox="0 0 24 24">
            <path d="M9 11l3 3L22 4"/>
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
          </svg>
          <div>
            <h3>{title}</h3>
            <p>{subtitle}</p>
          </div>
        </div>

        <div className="form-body">
          {/* Info Box */}
          <div className="info-box">
            <strong>📌</strong> Jaza taarifa zote. Nyaraka zitahifadhiwa kwa usalama.
          </div>

          {/* Category Selection */}
          {type === "lipa" && onCategoryChange && (
            <>
              <div className="section-label">Aina ya Biashara</div>
              <div className="category-tabs">
                {(["MACHINGA", "BINAFSI", "COMPANY_LIMITED"] as const).map(c => (
                  <button
                    type="button"
                    key={c}
                    className={`cat-tab ${category === c ? "active" : ""}`}
                    onClick={() => onCategoryChange(c)}
                  >
                    {c.replace("_", " ")}
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Basic Information */}
          <div className="section-label">Taarifa za Msingi</div>
          <div className="form-row">
            <div className="form-group form-group-full">
              <label className="form-label">Jina Kamili *</label>
              <input
                className="form-input"
                style={{ textTransform: "uppercase" }}
                value={form.customer_name}
                onChange={e => update("customer_name", upperCase(e.target.value))}
                required
                disabled={submitting}
                placeholder="INGIZA JINA KAMILI"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                {type === "voda" ? "Namba ya Voda *" : "Namba ya Simu *"}
              </label>
              <input
                className="form-input"
                inputMode="numeric"
                maxLength={10}
                value={form.phone}
                onChange={e => update("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
                placeholder="07XXXXXXXX"
                required
                disabled={submitting}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Namba Mbadala</label>
              <input
                className="form-input"
                inputMode="numeric"
                maxLength={10}
                value={form.alt_phone}
                onChange={e => update("alt_phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
                placeholder="07XXXXXXXX"
                disabled={submitting}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Namba ya TIN {type === "voda" && "*"}</label>
              <input
                className="form-input"
                inputMode="numeric"
                maxLength={14}
                value={formatTin(form.tin)}
                onChange={e => update("tin", digitsOnly(e.target.value).slice(0, 9))}
                placeholder="XXX-XX-XXX"
                required={type === "voda"}
                disabled={submitting}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Aina ya Kitambulisho</label>
              <select
                className="form-select"
                value={form.id_type}
                onChange={e => update("id_type", e.target.value)}
                disabled={submitting}
              >
                <option value="NIDA">NIDA</option>
                <option value="Passport">Passport</option>
                <option value="Voter ID">Voter ID</option>
              </select>
            </div>

            <div className="form-group form-group-full">
              <label className="form-label">Namba ya Kitambulisho *</label>
              <input
                className="form-input"
                inputMode="numeric"
                maxLength={23}
                value={formatNida(form.id_number)}
                onChange={e => update("id_number", digitsOnly(e.target.value).slice(0, 20))}
                placeholder="XXXXXXXX-XXXXX-XXXXX-XX"
                required
                disabled={submitting}
              />
            </div>
          </div>

          {/* Business Information (Lipa only) */}
          {type === "lipa" && (
            <>
              <hr className="section-divider" />
              <div className="section-label">Taarifa za Biashara</div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Jina la Biashara</label>
                  <input
                    className="form-input"
                    style={{ textTransform: "uppercase" }}
                    value={form.business_name}
                    onChange={e => update("business_name", upperCase(e.target.value))}
                    disabled={submitting}
                    placeholder="JINA LA BIASHARA"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Aina ya Biashara</label>
                  <input
                    className="form-input"
                    style={{ textTransform: "uppercase" }}
                    value={form.business_type}
                    onChange={e => update("business_type", upperCase(e.target.value))}
                    placeholder="Restaurant, Salon..."
                    disabled={submitting}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Barua Pepe</label>
                  <input
                    type="email"
                    className="form-input"
                    value={form.email}
                    onChange={e => update("email", e.target.value)}
                    disabled={submitting}
                    placeholder="mteja@email.com"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Wadi</label>
                  <input
                    className="form-input"
                    style={{ textTransform: "uppercase" }}
                    value={form.ward}
                    onChange={e => update("ward", upperCase(e.target.value))}
                    disabled={submitting}
                    placeholder="WADI"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Wilaya</label>
                  <input
                    className="form-input"
                    style={{ textTransform: "uppercase" }}
                    value={form.district}
                    onChange={e => update("district", upperCase(e.target.value))}
                    disabled={submitting}
                    placeholder="WILAYA"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Mkoa</label>
                  <input
                    className="form-input"
                    style={{ textTransform: "uppercase" }}
                    value={form.region}
                    onChange={e => update("region", upperCase(e.target.value))}
                    disabled={submitting}
                    placeholder="MKOA"
                  />
                </div>
              </div>
            </>
          )}

          {/* Documents */}
          <hr className="section-divider" />
          <div className="section-label">Nyaraka</div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Picha ya Kitambulisho *</label>
              <label className={`file-upload ${submitting ? "disabled" : ""}`}>
                <div className="fu-label">{fileNames.id_photo || "Bonyeza kupakia"}</div>
                <div className="fu-sub">PNG, JPG, PDF · Max 10MB</div>
                {uploadProgress.id_photo !== undefined && (
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ 
                        width: `${uploadProgress.id_photo}%`,
                        background: uploadProgress.id_photo === 100 ? '#10b981' : '#eb5325'
                      }}
                    ></div>
                    <span className="progress-text">
                      {uploadProgress.id_photo === 100 ? '✅' : `${uploadProgress.id_photo}%`}
                    </span>
                  </div>
                )}
                <input
                  ref={fileInputs.id_photo}
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileChange("id_photo")}
                  required
                  disabled={submitting}
                />
              </label>
            </div>

            <div className="form-group">
              <label className="form-label">Picha ya TIN</label>
              <label className={`file-upload ${submitting ? "disabled" : ""}`}>
                <div className="fu-label">{fileNames.tin_photo || "Bonyeza kupakia"}</div>
                <div className="fu-sub">PNG, JPG, PDF · Max 10MB</div>
                {uploadProgress.tin_photo !== undefined && (
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ 
                        width: `${uploadProgress.tin_photo}%`,
                        background: uploadProgress.tin_photo === 100 ? '#10b981' : '#eb5325'
                      }}
                    ></div>
                    <span className="progress-text">
                      {uploadProgress.tin_photo === 100 ? '✅' : `${uploadProgress.tin_photo}%`}
                    </span>
                  </div>
                )}
                <input
                  ref={fileInputs.tin_photo}
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileChange("tin_photo")}
                  disabled={submitting}
                />
              </label>
            </div>

            <div className="form-group form-group-full">
              <label className="form-label">Picha ya Duka/Biashara</label>
              <label className={`file-upload ${submitting ? "disabled" : ""}`}>
                <div className="fu-label">{fileNames.business_store_photo || "Bonyeza kupakia"}</div>
                <div className="fu-sub">PNG, JPG, PDF · Max 10MB</div>
                {uploadProgress.business_store_photo !== undefined && (
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ 
                        width: `${uploadProgress.business_store_photo}%`,
                        background: uploadProgress.business_store_photo === 100 ? '#10b981' : '#eb5325'
                      }}
                    ></div>
                    <span className="progress-text">
                      {uploadProgress.business_store_photo === 100 ? '✅' : `${uploadProgress.business_store_photo}%`}
                    </span>
                  </div>
                )}
                <input
                  ref={fileInputs.business_store_photo}
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileChange("business_store_photo")}
                  disabled={submitting}
                />
              </label>
            </div>

            {extra}
          </div>

          {/* Additional Information (Lipa only) */}
          {type === "lipa" && (
            <>
              <hr className="section-divider" />
              <div className="section-label">Maelezo ya Ziada</div>
              
              <div className="toggle-row">
                <div>
                  <div className="tr-label">Ana Wakala Line</div>
                  <div className="tr-sub">Washa kama mteja ana agent line</div>
                </div>
                <button
                  type="button"
                  className={`toggle ${form.has_agent_line ? "on" : ""}`}
                  onClick={() => update("has_agent_line", !form.has_agent_line)}
                  disabled={submitting}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Maelezo ya Ziada</label>
                <textarea
                  className="form-input"
                  rows={3}
                  value={form.notes}
                  onChange={e => update("notes", e.target.value)}
                  disabled={submitting}
                  placeholder="Maelezo yoyote ya ziada..."
                />
              </div>
            </>
          )}
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <Link to="/" className="btn-secondary" style={{ pointerEvents: submitting ? 'none' : 'auto', opacity: submitting ? 0.5 : 1 }}>
            Rudi Nyuma
          </Link>
          <button
            type="submit"
            className="btn-primary"
            disabled={submitting}
          >
            {submitting ? "Inatuma..." : "Wasilisha Maombi"}
          </button>
        </div>
      </form>

      {/* ================= STYLES ================= */}
      <style>{`
        .form-page {
          max-width: 900px;
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

        .crumb-separator {
          margin: 0 8px;
          color: #999;
        }

        .crumb-active {
          color: #1a1a2e;
          font-weight: 600;
        }

        .success-banner {
          background: #d1fae5;
          border: 2px solid #10b981;
          border-radius: 14px;
          padding: 20px 25px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 20px;
          animation: slideDown 0.4s ease;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .success-icon {
          font-size: 40px;
          flex-shrink: 0;
        }

        .success-content h4 {
          font-size: 17px;
          font-weight: 700;
          color: #065f46;
          margin: 0 0 4px 0;
        }

        .success-content p {
          font-size: 14px;
          color: #065f46;
          margin: 0 0 12px 0;
        }

        .success-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .btn-view {
          padding: 10px 18px;
          background: #eb5325;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 13px;
          text-decoration: none;
          text-align: center;
          transition: 0.2s;
        }

        .btn-view:hover {
          background: #d44a1f;
        }

        .form-card {
          background: white;
          border-radius: 16px;
          border: 1px solid #e5e7eb;
          box-shadow: 0 2px 10px rgba(0,0,0,0.04);
          overflow: hidden;
        }

        .form-card-header {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 20px 25px;
          background: #f8f9fa;
          border-bottom: 1px solid #e5e7eb;
        }

        .form-card-header svg {
          width: 30px;
          height: 30px;
          stroke: #eb5325;
          stroke-width: 2;
          fill: none;
          flex-shrink: 0;
        }

        .form-card-header h3 {
          font-size: 20px;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0;
        }

        .form-card-header p {
          font-size: 14px;
          color: #666;
          margin: 2px 0 0 0;
        }

        .form-body {
          padding: 25px;
        }

        .info-box {
          background: #eff6ff;
          padding: 15px;
          border-radius: 10px;
          border: 1px solid #bfdbfe;
          font-size: 14px;
          color: #1a1a2e;
          margin-bottom: 20px;
          line-height: 1.5;
        }

        .section-label {
          font-size: 15px;
          font-weight: 700;
          color: #1a1a2e;
          margin: 20px 0 12px 0;
          border-left: 3px solid #eb5325;
          padding-left: 8px;
        }

        .section-divider {
          border: none;
          border-top: 1px solid #e5e7eb;
          margin: 20px 0;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .form-group-full {
          grid-column: 1 / -1;
        }

        .form-label {
          font-weight: 600;
          font-size: 13px;
          color: #1a1a2e;
        }

        .form-input,
        .form-select {
          padding: 10px 12px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          font-size: 14px;
          font-family: inherit;
          transition: 0.2s;
          width: 100%;
          box-sizing: border-box;
          background: white;
        }

        .form-input:focus,
        .form-select:focus {
          outline: none;
          border-color: #eb5325;
          box-shadow: 0 0 0 3px rgba(235, 83, 37, 0.1);
        }

        .form-input:disabled,
        .form-select:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          background: #f5f5f5;
        }

        .form-input::placeholder {
          color: #aaa;
        }

        .category-tabs {
          display: flex;
          gap: 8px;
          margin-bottom: 15px;
          flex-wrap: wrap;
        }

        .cat-tab {
          padding: 8px 16px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          background: white;
          cursor: pointer;
          font-weight: 600;
          font-size: 13px;
          color: #666;
          transition: 0.2s;
        }

        .cat-tab.active {
          border-color: #eb5325;
          background: #fff5f0;
          color: #eb5325;
        }

        .cat-tab:hover {
          border-color: #eb5325;
        }

        .file-upload {
          display: block;
          padding: 15px;
          border: 2px dashed #e5e7eb;
          border-radius: 8px;
          text-align: center;
          cursor: pointer;
          position: relative;
          transition: 0.2s;
          background: #fafafa;
        }

        .file-upload:hover:not(.disabled) {
          border-color: #eb5325;
          background: #fff7f3;
        }

        .file-upload.disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .fu-label {
          font-weight: 600;
          font-size: 13px;
          color: #1a1a2e;
        }

        .fu-sub {
          font-size: 12px;
          color: #999;
          margin-top: 2px;
        }

        .file-upload input {
          position: absolute;
          inset: 0;
          opacity: 0;
          cursor: pointer;
        }

        .progress-bar {
          margin-top: 8px;
          height: 24px;
          background: #e5e7eb;
          border-radius: 12px;
          overflow: hidden;
          position: relative;
        }

        .progress-fill {
          height: 100%;
          border-radius: 12px;
          transition: width 0.3s ease;
        }

        .progress-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 12px;
          font-weight: 700;
          color: #1a1a2e;
        }

        .toggle-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 16px;
          background: #f8f9fa;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
          margin-bottom: 15px;
        }

        .tr-label {
          font-weight: 600;
          font-size: 13px;
        }

        .tr-sub {
          font-size: 11px;
          color: #666;
        }

        .toggle {
          width: 46px;
          height: 24px;
          border-radius: 12px;
          background: #ccc;
          border: none;
          cursor: pointer;
          position: relative;
          transition: 0.2s;
          flex-shrink: 0;
        }

        .toggle:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .toggle::after {
          content: "";
          position: absolute;
          width: 18px;
          height: 18px;
          background: white;
          border-radius: 50%;
          top: 3px;
          left: 3px;
          transition: 0.2s;
        }

        .toggle.on {
          background: #eb5325;
        }

        .toggle.on::after {
          transform: translateX(22px);
        }

        .form-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 25px;
          background: #f8f9fa;
          border-top: 1px solid #e5e7eb;
        }

        .btn-primary {
          padding: 12px 28px;
          background: #eb5325;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
          transition: 0.2s;
        }

        .btn-primary:hover:not(:disabled) {
          background: #d44a1f;
          transform: translateY(-2px);
        }

        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .btn-secondary {
          padding: 12px 20px;
          background: transparent;
          color: #1a1a2e;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          transition: 0.2s;
        }

        .btn-secondary:hover {
          background: #f0f0f0;
        }

        @media (max-width: 600px) {
          .form-page {
            padding: 10px;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .success-banner {
            flex-direction: column;
            text-align: center;
          }

          .success-actions {
            flex-direction: column;
          }

          .form-actions {
            flex-direction: column-reverse;
            gap: 10px;
          }

          .form-actions a,
          .form-actions button {
            width: 100%;
            text-align: center;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}