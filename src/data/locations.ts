export interface StoreLocation {
  id: string;
  name: string;
  shortName: string;
  address: string;
  hours: string;
  pickupEta: string;
  mapsQuery: string;
}

export const LOCATIONS: StoreLocation[] = [
  {
    id: "dorobanti",
    name: "Dorobanți",
    shortName: "Dorobanți",
    address: "Calea Dorobanți 61, București",
    hours: "Lun–Dum · 12:00 – 22:00",
    pickupEta: "~15 min",
    mapsQuery: "Calea+Dorobanți+61,+București",
  },
  {
    id: "piata-rosetti",
    name: "Piața Rosetti",
    shortName: "Piața Rosetti",
    address: "Strada Speranței 1, București",
    hours: "Lun–Dum · 11:00 – 22:00",
    pickupEta: "~15 min",
    mapsQuery: "Strada+Speranței+1,+București",
  },
];

export function getLocation(id: string): StoreLocation | undefined {
  return LOCATIONS.find((l) => l.id === id);
}

export function mapsEmbedUrl(query: string): string {
  return `https://www.google.com/maps?q=${query}&output=embed`;
}
