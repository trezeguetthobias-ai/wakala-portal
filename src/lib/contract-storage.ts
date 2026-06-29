import { supabase } from "@/integrations/supabase/client";
import { generateContractPDF, type ContractData } from "./contract-generator";

export const CONTRACT_BUCKET = "contracts";

export type ApplicationContract = ContractData & {
  id?: string;
  user_id?: string;
  contract_path?: string | null;
};

export function contractObjectPath(userId: string, refNo: string) {
  return `${userId}/Mkataba-${refNo}.pdf`;
}

async function fetchStoredContract(path: string): Promise<Uint8Array | null> {
  try {
    const { data, error } = await supabase.storage.from(CONTRACT_BUCKET).download(path);
    if (error || !data) return null;
    const buffer = await data.arrayBuffer();
    return new Uint8Array(buffer);
  } catch (e) {
    console.error('Error fetching stored contract:', e);
    return null;
  }
}

export async function resolveContractBytes(record: ApplicationContract): Promise<Uint8Array> {
  if (record.contract_path) {
    const stored = await fetchStoredContract(record.contract_path);
    if (stored) return stored;
  }
  const doc = generateContractPDF(record);
  const pdfOutput = doc.output('arraybuffer');
  return new Uint8Array(pdfOutput);
}

function triggerBlobDownload(bytes: Uint8Array, filename: string) {
  const buffer = new ArrayBuffer(bytes.length);
  const view = new Uint8Array(buffer);
  view.set(bytes);
  const blob = new Blob([buffer], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

export async function downloadContract(record: ApplicationContract) {
  const bytes = await resolveContractBytes(record);
  triggerBlobDownload(bytes, `Mkataba-${record.ref_no}.pdf`);
}

export async function openContract(record: ApplicationContract) {
  const bytes = await resolveContractBytes(record);
  const buffer = new ArrayBuffer(bytes.length);
  const view = new Uint8Array(buffer);
  view.set(bytes);
  const blob = new Blob([buffer], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  window.open(url, "_blank");
  setTimeout(() => URL.revokeObjectURL(url), 60000);
}

export async function persistContractPdf(
  applicationId: string,
  userId: string,
  record: ContractData,
): Promise<string> {
  const doc = generateContractPDF(record);
  const pdfOutput = doc.output('arraybuffer');
  const bytes = new Uint8Array(pdfOutput);
  const path = contractObjectPath(userId, record.ref_no);

  try {
    const buffer = new ArrayBuffer(bytes.length);
    const view = new Uint8Array(buffer);
    view.set(bytes);
    
    const { error: uploadError } = await supabase.storage
      .from(CONTRACT_BUCKET)
      .upload(path, buffer, { 
        contentType: "application/pdf", 
        upsert: true 
      });

    if (uploadError) throw uploadError;

    const { error: updateError } = await supabase
      .from("applications")
      .update({ contract_path: path })
      .eq("id", applicationId)
      .eq("user_id", userId);

    if (updateError) throw updateError;

    return path;
  } catch (error) {
    console.error('Error in persistContractPdf:', error);
    throw error;
  }
}

export async function generatePersistAndDownload(
  applicationId: string,
  userId: string,
  record: ContractData,
): Promise<string> {
  try {
    const path = await persistContractPdf(applicationId, userId, record);
    const fullRecord: ApplicationContract = {
      ...record,
      id: applicationId,
      user_id: userId,
      contract_path: path,
    };
    await downloadContract(fullRecord);
    return path;
  } catch (error) {
    console.error('Error in generatePersistAndDownload:', error);
    throw error;
  }
}

export async function generateAndPersistOnly(
  applicationId: string,
  userId: string,
  record: ContractData,
): Promise<string> {
  return persistContractPdf(applicationId, userId, record);
}

export async function getContractSignedUrl(contractPath: string, expiresIn = 3600) {
  try {
    const { data, error } = await supabase.storage
      .from(CONTRACT_BUCKET)
      .createSignedUrl(contractPath, expiresIn);
    if (error) throw error;
    return data.signedUrl;
  } catch (error) {
    console.error('Error getting signed URL:', error);
    throw error;
  }
}

export async function contractExists(userId: string, refNo: string): Promise<boolean> {
  try {
    const path = contractObjectPath(userId, refNo);
    const { data, error } = await supabase.storage
      .from(CONTRACT_BUCKET)
      .list(userId, { limit: 1 });
    
    if (error || !data) return false;
    return data.some(file => file.name === `Mkataba-${refNo}.pdf`);
  } catch (error) {
    console.error('Error checking contract existence:', error);
    return false;
  }
}

export async function deleteContract(userId: string, refNo: string): Promise<void> {
  try {
    const path = contractObjectPath(userId, refNo);
    const { error } = await supabase.storage
      .from(CONTRACT_BUCKET)
      .remove([path]);
    
    if (error) throw error;
  } catch (error) {
    console.error('Error deleting contract:', error);
    throw error;
  }
}

export async function getContractPublicUrl(contractPath: string): Promise<string> {
  try {
    const { data } = supabase.storage
      .from(CONTRACT_BUCKET)
      .getPublicUrl(contractPath);
    return data.publicUrl;
  } catch (error) {
    console.error('Error getting public URL:', error);
    throw error;
  }
}

export async function hasContract(applicationId: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from("applications")
      .select("contract_path")
      .eq("id", applicationId)
      .single();
    
    if (error || !data) return false;
    return !!data.contract_path;
  } catch (error) {
    console.error('Error checking if contract exists:', error);
    return false;
  }
}