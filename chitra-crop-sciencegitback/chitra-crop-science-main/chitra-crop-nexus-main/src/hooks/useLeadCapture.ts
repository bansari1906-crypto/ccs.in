import djangoApi from "@/lib/djangoApi";

export type InquirySource =
  | "get_latest_price"
  | "send_inquiry"
  | "whatsapp_inquiry"
  | "call_now"
  | "contact_form";

export interface LeadPayload {
  name?: string;
  phone?: string;
  email?: string;
  product_name?: string;
  inquiry_type?: string;
  message?: string;
  inquiry_source: InquirySource;
}

export async function captureLead(payload: LeadPayload): Promise<void> {
  try {
    await djangoApi.post("/leads/", {
      name: payload.name || "Anonymous",
      phone: payload.phone || "",
      email: payload.email || "",
      product: payload.product_name || "",
      message: payload.message || "",
    });
  } catch {
    // Never block user actions because of backend lead failures.
  }
}
