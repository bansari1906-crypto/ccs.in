
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import { COMPANY_LOCATION, COMPANY_CONTACT, COMPANY_SOCIAL } from "@/lib/constants";

const Footer = () => {
  return (
    <footer className="bg-emerald-950 text-white pt-20 pb-10">
      <div className="container">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <img src="/logo.png" alt="Chitra Crop Science" className="h-12 w-auto bg-white rounded-xl p-2" />
              <div>
                <h3 className="font-bold text-xl text-white">CHITRA</h3>
                <p className="text-emerald-400 text-sm font-medium">CROP SCIENCE</p>
              </div>
            </Link>
            <p className="text-emerald-100 text-sm leading-relaxed">
              Chitra Crop Science is a trusted Indian agribusiness manufacturer of high-quality fertilizers, pesticides, crop nutrition, protection, and plant growth regulators. Committed to agricultural growth under the leadership of Jethu Dan.
            </p>
          </div>

          {/* Crop Solutions */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="w-1 h-4 bg-emerald-500 rounded-full"></span>
              Crop Solutions
            </h4>
            <ul className="space-y-3 text-sm text-emerald-100">
              <li>
                <Link to="/products" className="flex items-center gap-2 hover:text-emerald-400 transition-colors">
                  <span className="text-emerald-500">→</span>
                  Crop Enhancing Products
                </Link>
              </li>
              <li>
                <Link to="/products" className="flex items-center gap-2 hover:text-emerald-400 transition-colors">
                  <span className="text-emerald-500">→</span>
                  Farming Resources & Blog
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="flex items-center gap-2 hover:text-emerald-400 transition-colors">
                  <span className="text-emerald-500">→</span>
                  Field Demonstration Gallery
                </Link>
              </li>
              <li>
                <Link to="/about" className="flex items-center gap-2 hover:text-emerald-400 transition-colors">
                  <span className="text-emerald-500">→</span>
                  About Company Journey
                </Link>
              </li>
            </ul>
          </div>

          {/* Trust & Compliance */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="w-1 h-4 bg-emerald-500 rounded-full"></span>
              Trust & Compliance
            </h4>
            <ul className="space-y-3 text-sm text-emerald-100">
              <li>
                <Link to="#" className="hover:text-emerald-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-emerald-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-emerald-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <a href="https://chitracropsciencepartners.com" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
                  Become a Dealer
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Map */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="w-1 h-4 bg-emerald-500 rounded-full"></span>
              Contact Headquarters
            </h4>
            <ul className="space-y-3 text-sm text-emerald-100 mb-6">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  B/904, Titanium Square, Thaltej Cross Road, Near BMW Showroom, S G Highway, Thaltej, Ahmedabad, Gujarat 380054, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-emerald-500 shrink-0" />
                <a href={COMPANY_CONTACT.phoneHref} className="hover:text-emerald-400 transition-colors">
                  +91 80004 50380
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-emerald-500 shrink-0" />
                <a href={`mailto:chitracropscience22@gmail.com`} className="hover:text-emerald-400 transition-colors">
                  chitracropscience22@gmail.com
                </a>
              </li>
            </ul>
            {/* Map */}
            <div className="rounded-xl overflow-hidden bg-emerald-900/50 border border-emerald-800">
              <iframe
                title="Google Map"
                src="https://maps.google.com/maps?q=Titanium+Square,+Thaltej+Cross+Road,+Near+BMW+Showroom,+S+G+Highway,+Thaltej,+Ahmedabad,+Gujarat+380054&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="160"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex flex-wrap justify-start gap-3 mb-12">
          <a href="#" className="w-10 h-10 rounded-full bg-emerald-900 flex items-center justify-center text-emerald-200 hover:bg-emerald-800 transition-colors border border-emerald-700">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
            </svg>
          </a>
          <a href={COMPANY_SOCIAL.facebook} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-emerald-900 flex items-center justify-center text-emerald-200 hover:bg-emerald-800 transition-colors border border-emerald-700">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
            </svg>
          </a>
          <a href={COMPANY_SOCIAL.instagram} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-emerald-900 flex items-center justify-center text-emerald-200 hover:bg-emerald-800 transition-colors border border-emerald-700">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          <a href={COMPANY_SOCIAL.linkedin} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-emerald-900 flex items-center justify-center text-emerald-200 hover:bg-emerald-800 transition-colors border border-emerald-700">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
          <a href={COMPANY_SOCIAL.indiamart} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-emerald-900 flex items-center justify-center text-emerald-200 hover:bg-emerald-800 transition-colors border border-emerald-700">
            <span className="font-bold text-xs">IM</span>
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-emerald-900 flex items-center justify-center text-emerald-200 hover:bg-emerald-800 transition-colors border border-emerald-700">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
          </a>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-emerald-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-emerald-400 text-xs">
            © {new Date().getFullYear()} Chitra Crop Science. All rights reserved. | Owner: Jethu Dan
          </p>
          <div className="bg-emerald-900/50 px-4 py-2 rounded-full border border-emerald-800">
            <span className="text-xs text-emerald-300 font-semibold flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              Verified Agribusiness Company
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
