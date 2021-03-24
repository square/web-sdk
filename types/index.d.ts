interface Payments {
  verifyBuyer: () => void;
}

interface Square {
  payments: (applicationId: string, locationId?: string) => Promise<Payments>;
}

interface Window {
  Square?: Square;
}
