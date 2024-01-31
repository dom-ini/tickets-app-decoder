export type Ticket = {
  scannedAt: Date;
  categoryName: string;
  token: string;
  eventName: string;
  eventSlug: string;
};

export type TicketMetadata = {
  data: Ticket | null;
  existed: boolean;
};

export type TicketError = 'qr' | 'client' | 'server';
