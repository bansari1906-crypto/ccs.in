import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";

const SiteLayout = () => (
  <div className="flex min-h-screen flex-col">
    <Navbar />
    <main className="flex-1">
      <Outlet />
    </main>
    <Footer />
    <WhatsAppButton />
  </div>
);

export default SiteLayout;
