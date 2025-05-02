export interface SiteSettings {
  templeName: string;
  templeInfo?: Array<{
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
  }>;
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  contact: {
    primaryPhone: string;
    secondaryPhone?: string;
    email: string;
    whatsapp: string;
    additionalContacts?: Array<{
      name: string;
      role: string;
      phone: string;
      whatsapp?: string;
    }>;
  };
  templeHours: {
    weekday: string;
    weekend: string;
    specialNote: string;
  };
} 