/**
 * Location and Contact Constants
 * Single source of truth for company location details
 */

export const COMPANY_LOCATION = {
  // Full address components
  block: "B/904",
  building: "Titanium Square",
  street: "Thaltej Cross Road, Near BMW Showroom, S G Highway",
  area: "Thaltej",
  landmark: "Near BMW Showroom",
  city: "Ahmedabad",
  state: "Gujarat",
  postalCode: "380054",
  country: "India",
  
  // Formatted addresses
  fullAddress: "B/904, Titanium Square, Thaltej Cross Road, Near BMW Showroom, S G Highway, Thaltej, Ahmedabad, Gujarat 380054, India",
  compactAddress: "B/904, Titanium Square, Thaltej Cross Road, Near BMW Showroom, S G Highway, Thaltej, Ahmedabad, Gujarat 380054",
  shortAddress: "Titanium Square, Thaltej, Ahmedabad 380054",
  
  // Coordinates (Latitude, Longitude)
  // Titanium Square, Thaltej Cross Road, Near BMW Showroom, S G Highway, Thaltej, Ahmedabad
  latitude: 23.050842,
  longitude: 72.518753,
  
  // Alternative format for Google Maps
  mapsCoordinates: "23.050842,72.518753",
} as const;

export const COMPANY_CONTACT = {
  phone: "08000450380",
  phoneFormatted: "+91 80004 50380",
  phoneHref: "tel:+918000450380",
  email: "chitracropscience@gmail.com",
  emailHref: "mailto:chitracropscience@gmail.com",
  whatsappLink: "https://wa.me/918000450380",
  googleReviewLink: "https://g.page/r/CX-IL9c5KG3KEBM/review",
  companyName: "Chitra Crop Science",
} as const;

export const COMPANY_SOCIAL = {
  instagram: "https://www.instagram.com/chitracropscience",
  facebook: "https://www.facebook.com/people/Chitra-crop-science",
  linkedin: "https://in.linkedin.com/company/chitra-crop-science",
  indiamart: "https://www.indiamart.com/chitracropscience/profile.html",
} as const;

/**
 * Generate Google Maps open link
 * Opens the exact location in Google Maps
 */
export const generateMapsOpenUrl = (): string => {
  const encodedAddress = encodeURIComponent(COMPANY_LOCATION.fullAddress);
  return `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
};

/**
 * Generate Google Maps directions link
 */
export const generateMapsDirectionsUrl = (): string => {
  const encodedAddress = encodeURIComponent(COMPANY_LOCATION.fullAddress);
  return `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
};
