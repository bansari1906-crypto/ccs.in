/**
 * Location and Contact Constants
 * Single source of truth for company location details
 */

export const COMPANY_LOCATION = {
  // Full address components
  block: "BLOCK-D",
  building: "404",
  street: "Signature 2 Internal Rd",
  area: "Makarba",
  landmark: "Sarkhej-Okaf",
  city: "Ahmedabad",
  state: "Gujarat",
  postalCode: "382210",
  country: "India",
  
  // Formatted addresses
  fullAddress: "BLOCK-D, 404, Signature 2 Internal Rd, Makarba, Sarkhej-Okaf, Ahmedabad, Gujarat 382210",
  compactAddress: "Block-D, 404, Signature 2 Internal Rd, Makarba, Ahmedabad, Gujarat 382210",
  shortAddress: "Makarba, Ahmedabad, Gujarat 382210",
  
  // Coordinates (Latitude, Longitude)
  // Makarba area, Sarkhej-Okaf, Ahmedabad
  latitude: 23.0200,
  longitude: 72.4520,
  
  // Alternative format for Google Maps
  mapsCoordinates: "23.0200,72.4520",
} as const;

export const COMPANY_CONTACT = {
  phone: "08000450380",
  phoneFormatted: "+91 80004 50380",
  phoneHref: "tel:+918000450380",
  email: "chitracropscience22@gmail.com",
  emailHref: "mailto:chitracropscience22@gmail.com",
  whatsappLink: "https://wa.me/918000450380",
  companyName: "Chitra Crop Science",
} as const;

export const COMPANY_SOCIAL = {
  instagram: "https://instagram.com/chitracropscience",
  facebook: "https://facebook.com/chitracropscience",
  linkedin: "https://linkedin.com/company/chitra-crop-science",
  indiamart: "https://www.indiamart.com/chitra-crop-science",
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
