export interface PageMeta {
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
}

export const pageMetadata: Record<string, PageMeta> = {
  '/': {
    title: "Sri Veerabrahmendra Swami Temple, Atmakur",
    description: "Discover Sri Veerabrahmendra Swami Temple in Atmakur, Nellore. Annadanam, events, timings, and visitor info.",
    keywords: "veerabrahmendra, temple, atmakur, annadanam, nellore, events, spiritual, bramhamgari temple",
    ogImage: "/images/swamigaru.jpg",
  },
  '/about': {
    title: "About Veerabrahmendra Swami | Atmakur, Nellore",
    description: "Learn about Sri Veerabrahmendra Swami, his life, teachings, and legacy at Atmakur Temple, Nellore.",
    keywords: "veerabrahmendra, swami, about, biography, teachings, atmakur, nellore, bramhamgari temple",
    ogImage: "/images/og-about.jpg",
  },
  '/services': {
    title: "Temple Services & Annadanam | Veerabrahmendra Swami Temple, Atmakur",
    description: "Explore Annadanam, daily rituals, and special services at Veerabrahmendra Swami Temple, Atmakur.",
    keywords: "services, annadanam, rituals, temple, veerabrahmendra, atmakur, nellore, bramhamgari temple",
    ogImage: "/images/og-services.jpg",
  },
  '/events': {
    title: "Temple Events & Festivals | Veerabrahmendra Swami Temple, Atmakur",
    description: "Discover annual events, festivals, and Annadanam at Sri Veerabrahmendra Swami Temple, Atmakur, SPSR Nellore. Join us for spiritual celebrations and explore places to visit in Nellore district.",
    keywords: "events, festivals, annadanam, temple, veerabrahmendra, atmakur, nellore, bramhamgari temple",
    ogImage: "/images/og-events.jpg",
  },
  '/gallery': {
    title: "Gallery | Veerabrahmendra Swami Temple, Atmakur",
    description: "Photos and videos from events at Sri Veerabrahmendra Swami Temple, Atmakur, Nellore.",
    keywords: "gallery, photos, videos, temple, events, atmakur, nellore, bramhamgari temple",
    ogImage: "/images/og-gallery.jpg",
  },
  '/donate': {
    title: "Donate | Veerabrahmendra Swami Temple, Atmakur",
    description: "Support our temple through donation programs and sacred initiatives.",
    keywords: "donate, donation, annadanam, support, veerabrahmendra, temple, atmakur, nellore, bramhamgari temple",
    ogImage: "/images/og-donate.jpg",
  },
  '/projects': {
    title: "Temple Projects | Veerabrahmendra Swami Temple, Atmakur",
    description: "See ongoing and completed projects at Veerabrahmendra Swami Temple, Atmakur, Nellore.",
    keywords: "projects, development, temple, veerabrahmendra, atmakur, nellore, completed, ongoing, bramhamgari temple",
    ogImage: "/images/og-projects.jpg",
  },
  '/donors': {
    title: "Donors | Veerabrahmendra Swami Temple, Atmakur",
    description: "Honoring our generous donors who contribute to the growth and maintenance of SPVBS Temple",
    keywords: "donors, contributions, temple, veerabrahmendra, atmakur, nellore, bramhamgari temple",
    ogImage: "/images/og-donors.jpg",
  },
  '/contact': {
    title: "Contact | Veerabrahmendra Swami Temple, Atmakur",
    description: "Get in touch with Sri Pothuluri Veera Brahmendra Swami Temple. Find our location, contact numbers, and ways to connect.",
    keywords: "contact, address, phone, email, temple, veerabrahmendra, atmakur, nellore, bramhamgari temple",
    ogImage: "/images/og-contact.jpg",
  },
}; 