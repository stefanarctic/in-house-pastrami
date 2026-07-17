export interface StoreLocation {
  id: string;
  name: string;
  shortName: string;
  address: string;
  hours: string;
  pickupEta: string;
  mapsQuery: string;
  phone: string;
  phoneDisplay: string;
}

export const LOCATIONS: StoreLocation[] = [
  {
    id: "dorobanti",
    name: "Dorobanți",
    shortName: "Dorobanți",
    address: "Calea Dorobanți 61, București",
    hours: "Lun–Sam · 11:00 – 22:00\nDum · 11:00 – 21:00",
    pickupEta: "~15 min",
    mapsQuery: "cid:2441754747651311789",
    phone: "+40774452654",
    phoneDisplay: "0774 452 654",
  },
  {
    id: "piata-rosetti",
    name: "Piața Rosetti",
    shortName: "Piața Rosetti",
    address: "Strada Speranței 1, București",
    hours: "Lun · 11:00 – 21:00\nMar–Dum · 11:00 – 22:00",
    pickupEta: "~15 min",
    mapsQuery: "In+House+Pastrami+%26+More+-+Rosetti,+Strada+Speran%C8%9Bei+1,+Bucure%C8%99ti",
    phone: "+40771770128",
    phoneDisplay: "0771 770 128",
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
