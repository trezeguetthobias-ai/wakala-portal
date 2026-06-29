export type AppType = "wakala" | "lipa" | "voda";

/** Commission (TZS) per application type */
export const COMMISSION_BY_TYPE: Record<AppType, number> = {
  wakala: 5000,
  lipa: 2000,
  voda: 2000,
};

export function getCommission(type: string | null | undefined): number {
  if (type === "wakala") return COMMISSION_BY_TYPE.wakala;
  if (type === "lipa" || type === "voda") return COMMISSION_BY_TYPE.lipa;
  return 0;
}

export function formatTzs(amount: number): string {
  return `TZS ${amount.toLocaleString("en-US")}`;
}

export function typeLabel(type: string): string {
  if (type === "wakala") return "Till Wakala";
  if (type === "lipa") return "Lipa HaloPesa";
  if (type === "voda") return "Lipa Voda";
  return type;
}

export function statusLabel(status: string): string {
  const map: Record<string, string> = {
    pending: "Inasubiri",
    processing: "Inashughulikiwa",
    approved: "Imekubaliwa",
    rejected: "Imekataliwa",
  };
  return map[status] ?? status;
}

/** Customer-facing fields the admin should see (mirror of form submission) */
export const APPLICATION_DETAIL_FIELDS: {
  key: string;
  label: string;
  format?: (v: unknown, row: Record<string, unknown>) => string;
}[] = [
  { key: "ref_no", label: "Namba ya Ombi" },
  { key: "type", label: "Aina", format: (v) => typeLabel(String(v)) },
  { key: "status", label: "Hali", format: (v) => statusLabel(String(v)) },
  { key: "category", label: "Category (Lipa)" },
  { key: "customer_name", label: "Jina la Mteja" },
  { key: "phone", label: "Simu / Till" },
  { key: "alt_phone", label: "Simu Mbadala" },
  { key: "tin", label: "TIN" },
  { key: "id_type", label: "Aina ya Kitambulisho" },
  { key: "id_number", label: "Namba ya Kitambulisho" },
  { key: "business_name", label: "Jina la Biashara" },
  { key: "business_type", label: "Aina ya Biashara" },
  { key: "email", label: "Barua pepe" },
  { key: "ward", label: "Ward" },
  { key: "district", label: "Wilaya" },
  { key: "region", label: "Mkoa" },
  { key: "has_agent_line", label: "Ana Wakala Line", format: (v) => (v ? "Ndiyo" : "Hapana") },
  { key: "notes", label: "Maelezo ya Mteja" },
  {
    key: "commission",
    label: "Kamisheni",
    format: (_v, row) => formatTzs(getCommission(String(row.type))),
  },
  { key: "till_code", label: "Till Code (Admin)" },
  { key: "contract_path", label: "Mkataba (Storage)" },
  { key: "admin_notes", label: "Ujumbe kwa Mteja (Admin)" },
  { key: "created_at", label: "Tarehe ya Kuwasilisha", format: (v) => new Date(String(v)).toLocaleString() },
];

export function detailValue(row: Record<string, unknown>, field: (typeof APPLICATION_DETAIL_FIELDS)[0]): string {
  const raw = field.key === "commission" ? row.type : row[field.key];
  if (raw == null || raw === "") return "—";
  if (field.format) return field.format(raw, row);
  return String(raw);
}
