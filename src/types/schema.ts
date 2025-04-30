export interface SiteSettings {
  _type: 'siteSettings';
  templeName: string;
  templeInfo: any[];
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