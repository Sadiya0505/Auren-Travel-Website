export interface Destination {
  id: string;
  name: string;
  tagline: string;
  description?: string;
  region: string;
  coordinates: string;
  elevation: string;
  climate: string;
  airportCode: string;
  videoUrl?: string;
  imageUrl: string;
  additionalImages: string[];
  basePrice: number;
  bestTime: string;
  highlights: string[];
}

export interface TravelPackage {
  id: string;
  destinationId: string;
  title: string;
  duration: string;
  description: string;
  pricingTier: "Elite" | "Royal Oasis" | "Imperial Reserve";
  basePricePerPerson: number;
  includedLuxuryServices: string[];
  exclusiveUpgrades: {
    id: string;
    name: string;
    price: number;
    description: string;
  }[];
}

export interface Testimonial {
  id: string;
  clientName: string;
  clientTitle: string;
  resortVisited: string;
  quote: string;
  ratingScore: number;
  imageUrl: string;
  year: string;
}

export interface BlogArticle {
  id: string;
  title: string;
  category: "Expedition" | "Sanctuary" | "Gastronomy" | "Philosophy";
  excerpt: string;
  content: string;
  author: {
    name: string;
    role: string;
    avatarUrl: string;
  };
  readTime: string;
  publishedAt: string;
  imageUrl: string;
}

export interface Booking {
  destinationId: string;
  packageId: string;
  guestCount: number;
  startDate: string;
  tier: "Elite" | "Royal Oasis" | "Imperial Reserve";
  upgradesSelected: string[]; // Upgrade IDs
  billingName: string;
  billingEmail: string;
  specialRequests: string;
  totalComputedPrice: number;
}
