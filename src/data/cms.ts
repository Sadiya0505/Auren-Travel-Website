import { Destination, TravelPackage, Testimonial, BlogArticle } from "../types";

export const DESTINATIONS: Destination[] = [
  {
    id: "amalfi-cliffs",
    name: "Alba di Amalfi",
    tagline: "The Sun-Drenched Citadel of the Tyrrhenian",
    region: "Amalfi Coast, Italy",
    coordinates: "40°37'58.2\"N 14°36'11.1\"E",
    elevation: "240 meters above sea level",
    climate: "Mediterranean Maritime (24°C - 31°C)",
    airportCode: "NAP (Capodichino International)",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-top-view-of-a-beautiful-sandy-beach-and-ocean-wave-40156-large.mp4",
    imageUrl: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1200",
    additionalImages: [
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=600",
      "https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?q=80&w=600"
    ],
    basePrice: 14200,
    bestTime: "June to September",
    highlights: [
      "Private clifftop salt infinity pool looking across Capri island",
      "Sunset excursion via Riva Super Aquarama wooden yacht",
      "Exclusive access to the underground Roman ruins of Positano",
      "Private dining under centuries-old lemon groves"
    ]
  },
  {
    id: "kyoto-sanctuary",
    name: "Hanami Sanctuary",
    tagline: "Silent Bamboo & Ancient Whispering Zen",
    region: "Arashiyama, Kyoto, Japan",
    coordinates: "35°01'01.9\"N 135°40'20.5\"E",
    elevation: "65 meters above sea level",
    climate: "Temperate Highland (18°C - 26°C)",
    airportCode: "KIX (Kansai International)",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-bamboo-forest-background-view-41618-large.mp4",
    imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200",
    additionalImages: [
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=600",
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=600"
    ],
    basePrice: 19800,
    bestTime: "April (Cherry Blossom) & November (Momiji Maple)",
    highlights: [
      "Traditional handcrafted timber villas built without a single nail",
      "Private hot spring onsen overlooking the mountain gorge",
      "Tea ceremony hosted by a certified 15th-generation Master",
      "Dawn bamboo forest meditation led by resident Buddhist monk"
    ]
  },
  {
    id: "patagonia-wilderness",
    name: "Glacier Summit Manor",
    tagline: "Prehistoric Ice & Majestic Andean Spires",
    region: "Torres del Paine, Patagonia, Chile",
    coordinates: "51°02'21.1\"S 72°55'18.8\"W",
    elevation: "110 meters above sea level",
    climate: "Alpine Oceanic (4°C - 14°C)",
    airportCode: "PNT (Teniente Julio Gallardo)",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-thick-forest-fog-41584-large.mp4",
    imageUrl: "https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?q=80&w=1200",
    additionalImages: [
      "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?q=80&w=600",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600"
    ],
    basePrice: 16500,
    bestTime: "December to March",
    highlights: [
      "Helicopter flyovers above the Southern Patagonian Ice Field",
      "Private geothermal domes framed by monolithic granite spires",
      "Glacier hiking guided by seasoned Antarctic climbers",
      "Gourmet Magellanic lamb roasted over open flame pit"
    ]
  },
  {
    id: "sahara-oasis",
    name: "Ghibli Desert Pavilion",
    tagline: "Rolling Crimson Sands & Midnight Constellations",
    region: "Erg Chebbi, Sahara Dunes, Morocco",
    coordinates: "31°12'11.5\"N 4°00'44.2\"W",
    elevation: "780 meters above sea level",
    climate: "Arid Sahara (16°C - 42°C)",
    airportCode: "ERH (Errachidia Moulay Ali Cherif)",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-dunes-in-a-desert-43048-large.mp4",
    imageUrl: "https://images.unsplash.com/photo-1547234935-80c7145ec969?q=80&w=1200",
    additionalImages: [
      "https://images.unsplash.com/photo-1509316975850-ff9c5edd0cd9?q=80&w=600",
      "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?q=80&w=600"
    ],
    basePrice: 22000,
    bestTime: "October to April",
    highlights: [
      "Luxury canvas lodges decorated with hand-spun gold Berber silks",
      "Camel convoy escort at sunset over the grandest dunes",
      "Celestial observatory dome with professional astronomers",
      "Traditional hammam with pure argan oil and high-desert minerals"
    ]
  }
];

export const PACKAGES: TravelPackage[] = [
  {
    id: "amalfi-elite",
    destinationId: "amalfi-cliffs",
    title: "Mediterannean Grandeur Chronicles",
    duration: "8 Days / 7 Nights",
    description: "Our signature Amalfi voyage, celebrating the finest coastal architecture, bespoke private navigation, and three-Michelin-star culinary masterpieces.",
    pricingTier: "Elite",
    basePricePerPerson: 14200,
    includedLuxuryServices: [
      "VIP private tarmac airport meet & luxury Bentley chauffeur",
      "Daily gourmet menu by local resident three-star Michelin chef",
      "24/7 dedicated personal concierge & luxury yacht itinerary",
      "Priority VIP booking for Capri cliffside private club"
    ],
    exclusiveUpgrades: [
      { id: "amalfi-heli", name: "Helicopter Transfer to Capri Ruins", price: 3500, description: "A high-altitude aerial transfer directly to the legendary Villa Jovis cliffs with champagne." },
      { id: "amalfi-superyacht", name: "Riva Super Aquarama Charter (2 Days)", price: 6200, description: "Command a pristine wooden Riva yacht with an experienced captain and custom seafood catering." },
      { id: "amalfi-vintage-classic", name: "Vintage Alfa Romeo Spider Tour", price: 1800, description: "Drive the magnificent Amalfi coastal cliffs in a perfectly restored 1968 classic sports car." }
    ]
  },
  {
    id: "kyoto-royal",
    destinationId: "kyoto-sanctuary",
    title: "Zen Imperial Reverie",
    duration: "10 Days / 9 Nights",
    description: "An authentic, deeply historical journey through ancient Kyoto, experiencing imperial villas, rare spiritual ceremonies, and unmatched serenity.",
    pricingTier: "Royal Oasis",
    basePricePerPerson: 19800,
    includedLuxuryServices: [
      "Traditional Shinto blessing ceremony at private family shrine",
      "Direct Kyoto station bullet train platform greeting & hostess",
      "Bespoke silk kimono fittings and legacy sake cellar tasting",
      "24-hour private villa host and personal geisha entertainment"
    ],
    exclusiveUpgrades: [
      { id: "kyoto-masterclass", name: "15th-Gen Master Swordsman Tutorial", price: 4200, description: "A private workshop with a direct descendant of a legendary samurai forging katana blades." },
      { id: "kyoto-helicopter", name: "Mount Fuji Summit Aerial Picnic", price: 7500, description: "Fly over Kyoto mountains straight to a scenic private ridge near Mount Fuji for high tea." },
      { id: "kyoto-art-access", name: "Imperial Palace Private Vault Access", price: 2900, description: "Exclusively view national treasure paintings closed off to the general public." }
    ]
  },
  {
    id: "patagonia-royal",
    destinationId: "patagonia-wilderness",
    title: "Andean Monumental Expedition",
    duration: "9 Days / 8 Nights",
    description: "An incredible deep dive into wild, dramatic landscapes with ultra-luxury dome living, mountain helicopter scaling, and stellar polar hospitality.",
    pricingTier: "Elite",
    basePricePerPerson: 16500,
    includedLuxuryServices: [
      "Charter private jet transfer from Santiago to Patagonia",
      "Custom tailored mountaineering equipment and climate-control wearables",
      "Private culinary theater preparing high-intensity thermal menus",
      "Starcharge solar telescope and local polar exploration briefing"
    ],
    exclusiveUpgrades: [
      { id: "patagonia-fjords", name: "Exclusive Glacier Kayaking & Ice Bar", price: 2400, description: "Paddle around majestic icebergs and toast with 200-year-old glacier ice cocktails." },
      { id: "patagonia-heli-climb", name: "Monolithic Peak Heli-Drop & Picnic", price: 5800, description: "Scale pristine glacier ledges via helicopter and dine with a 360-degree panorama of the Andes." }
    ]
  },
  {
    id: "sahara-imperial",
    destinationId: "sahara-oasis",
    title: "Celestial Desert Odyssey",
    duration: "7 Days / 6 Nights",
    description: "An incredibly elegant expedition across Morocco's grandest crimson dunes, combining pristine nomadic tent comforts with galactic sky expeditions.",
    pricingTier: "Imperial Reserve",
    basePricePerPerson: 22000,
    includedLuxuryServices: [
      "Ultra-private private jet tarmac transfer & customized Range Rovers",
      "Handcrafted master suites with real silk upholstery and gold embroidery",
      "Michelin-level traditional Moroccan tagine and local spiced dessert menu",
      "Bespoke stellar maps prepared by a Royal Academy of Science astronomer"
    ],
    exclusiveUpgrades: [
      { id: "sahara-balloon", name: "Dawn Amber Hot Air Balloon over Dune Merzouga", price: 2200, description: "Watch the desert wake up from 1000 feet up, sipping absolute reserve champagne." },
      { id: "sahara-nomadic", name: "Exclusive Berber Tribal Gala", price: 5000, description: "Traditional acoustic fire lit ceremony featuring historical poets and ancient string musicians." },
      { id: "sahara-desert-falcon", name: "Royal Falconry Masterclass", price: 1500, description: "Train with authentic royal falcons under the guidance of traditional imperial falconers." }
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    clientName: "Sir Alistair Sterling",
    clientTitle: "Philanthropist & Venture Capital Partner",
    resortVisited: "Hanami Sanctuary, Kyoto",
    quote: "Auren doesn't just plan travels; they craft living visual documentaries. Watching the red autumn maples from Hanami's private hot springs felt like stepping inside an artistic masterwork. An unforgettable, deeply spiritual hospitality that stays forever.",
    ratingScore: 5.0,
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300",
    year: "2025"
  },
  {
    id: "t2",
    clientName: "Elena Rostova",
    clientTitle: "Symphonic Violinist & Fine Collector",
    resortVisited: "Alba di Amalfi, Italy",
    quote: "A perfectly tuned orchestra of absolute luxury. Our wooden Riva sunset cruise was planned to perfection—crossing the coastline precisely as the Italian sun sank behind the cliffside cathedrals. Absolute elegance in motion.",
    ratingScore: 5.0,
    imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300",
    year: "2026"
  },
  {
    id: "t3",
    clientName: "Dr. Marcus Vance",
    clientTitle: "Co-Founder, NeuroSystems AG",
    resortVisited: "Ghibli Desert Pavilion, Sahara",
    quote: "Under the deep Saharan starlight, using Auren's professional observatory, the universe felt infinitely close. Combined with range rover security, custom bedding, and incredible dining, it defied typical luxury standard.",
    ratingScore: 5.0,
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300",
    year: "2024"
  }
];

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: "art-bamboo",
    title: "Philosophy of Quiet Luxury: The Bamboo Spines of Arashiyama",
    category: "Philosophy",
    excerpt: "Exploring the meditative quietude of Kyoto's untouched pathways, and what slow architecture can teach us about timeless luxury living.",
    content: "Timeless luxury is not decorative volume; it is the art of space. In Arashiyama, Hanami Sanctuary is built following traditional Sukiya-zukuri principles, utilizing structural space to construct silence. By removing unnecessary interference, every rustle of wind through bamboo branches is elevated into a sensory ritual. When a traveler enters these spaces, they immediately shed the weight of busy modern existence, exchanging it for structural peace and artistic contemplation...",
    author: {
      name: "Kenji Sato",
      role: "Design Critic & Architect",
      avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150"
    },
    readTime: "6 min read",
    publishedAt: "May 14, 2026",
    imageUrl: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=800"
  },
  {
    id: "art-riva",
    title: "Wooden Curves: Restoring the Mid-century Riva Legends of Capri",
    category: "Expedition",
    excerpt: "A deep dive with our resident maritime master on reclaiming the mahogany curves of the vintage Riva Aquarama fleets.",
    content: "Beneath the cliffs of Positano, there is a distinct purr that echoes off the saltwater walls. It is the solid 320-horsepower V8 engines of a pristine Riva Super Aquarama wooden yacht. Crafted from dried premium mahogany, stained with twenty-four layers of hand-rubbed marine varnish, and polished with gold brass dials, these vessels represent the height of coastal luxury exploration. Auren maintains its private fleet, ensuring you sail across Capri not on modern composite hulls, but surrounded by high-fidelity history...",
    author: {
      name: "Captain Matteo Ferraro",
      role: "Auren Maritime Curator",
      avatarUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=150"
    },
    readTime: "8 min read",
    publishedAt: "June 02, 2026",
    imageUrl: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=800"
  },
  {
    id: "art-gastronomy",
    title: "High-Desert Metallurgy: Searing Magellan Crusts on Volcanic Plates",
    category: "Gastronomy",
    excerpt: "Analyzing the culinary synergy of high-altitude Alpine wilderness cooking, glacial water components, and open flame pits.",
    content: "When dining in Patagonia with Glacier Summit Manor, the cold Antarctic winds outside demand hot, hyper-intense culinary theater. Chef Clara Duval operates a custom-built, three-layered volcanic rock pit system. Using local beechwood timber, she heats basalt stones to 420 degrees, then seared dry-aged organic meats instantly with mountain-collected wild herbs and glacier rock sea salts. This extracts intense mineral aromas, combining high-altitude earthiness with ultimate delicacy...",
    author: {
      name: "Chef Clara Duval",
      role: "High-Altitude Gastronomy Lead",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150"
    },
    readTime: "5 min read",
    publishedAt: "April 28, 2026",
    imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800"
  }
];
