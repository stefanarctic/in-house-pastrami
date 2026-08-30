export interface OpeningHoursRange {
  dayOfWeek: string[];
  opens: string;
  closes: string;
}

export interface StoreLocation {
  id: string;
  name: string;
  shortName: string;
  address: string;
  streetAddress: string;
  addressLocality: string;
  addressCountry: string;
  postalCode: string;
  hours: string;
  openingHours: OpeningHoursRange[];
  pickupEta: string;
  mapsQuery: string;
  phone: string;
  phoneDisplay: string;
  lat: number;
  lng: number;
}

export const LOCATIONS: StoreLocation[] = [
  {
    id: "dorobanti",
    name: "Dorobanți",
    shortName: "Dorobanți",
    address: "Calea Dorobanți 61, București",
    streetAddress: "Calea Dorobanți 61",
    addressLocality: "București",
    addressCountry: "RO",
    postalCode: "010556",
    hours: "Lun–Sam · 11:00 – 22:00\nDum · 11:00 – 21:00",
    openingHours: [
      {
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "11:00",
        closes: "22:00",
      },
      { dayOfWeek: ["Sunday"], opens: "11:00", closes: "21:00" },
    ],
    pickupEta: "~15 min",
    mapsQuery: "cid:2441754747651311789",
    phone: "+40774452654",
    phoneDisplay: "0774 452 654",
    lat: 44.4502472,
    lng: 26.0986917,
  },
  {
    id: "piata-rosetti",
    name: "Piața Rosetti",
    shortName: "Piața Rosetti",
    address: "Strada Speranței 1, București",
    streetAddress: "Strada Speranței 1",
    addressLocality: "București",
    addressCountry: "RO",
    postalCode: "020501",
    hours: "Lun · 11:00 – 21:00\nMar–Dum · 11:00 – 22:00",
    openingHours: [
      { dayOfWeek: ["Monday"], opens: "11:00", closes: "21:00" },
      {
        dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "11:00",
        closes: "22:00",
      },
    ],
    pickupEta: "~15 min",
    mapsQuery: "In+House+Pastrami+%26+More+-+Rosetti,+Strada+Speran%C8%9Bei+1,+Bucure%C8%99ti",
    phone: "+40771770128",
    phoneDisplay: "0771 770 128",
    lat: 44.4366731,
    lng: 26.1072831,
  },
];

export function getLocation(id: string): StoreLocation | undefined {
  return LOCATIONS.find((l) => l.id === id);
}

export function mapsEmbedUrl(query: string): string {
  if (query.startsWith("cid:")) {
    return `https://maps.google.com/maps?cid=${query.slice(4)}&hl=ro&z=17&output=embed`;
  }
  return `https://maps.google.com/maps?q=${query}&hl=ro&z=17&output=embed`;
}
