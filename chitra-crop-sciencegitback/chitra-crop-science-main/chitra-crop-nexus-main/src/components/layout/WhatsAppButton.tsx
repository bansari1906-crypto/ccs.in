import { MessageCircle } from "lucide-react";
import { COMPANY_CONTACT } from "@/lib/constants";

const WhatsAppButton = () => (
  <a
    href={`${COMPANY_CONTACT.whatsappLink}?text=${encodeURIComponent("Hi Chitra Crop Science, I'd like to know more about your products.")}`}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat on WhatsApp"
    className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-warm transition-smooth hover:scale-110"
  >
    <MessageCircle className="h-7 w-7" />
  </a>
);

export default WhatsAppButton;
