export interface SiteSettings {
  _type: 'siteSettings';
  templeName: string;
  templeInfo: {
    _type: string;
    _key: string;
    markDefs?: Array<{
      _type: string;
      _key: string;
    }>;
    children: Array<{
      _type: string;
      _key: string;
      text: string;
      marks?: string[];
    }>;
  }[];
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  contact: {
    phone: string;
    email: string;
    whatsapp: string;
  };
  templeHours: {
    weekday: string;
    weekend: string;
    specialNote: string;
  };
} 