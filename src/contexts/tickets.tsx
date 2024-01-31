import { isAxiosError } from 'axios';
import React, { createContext, ReactNode, useCallback, useEffect, useState } from 'react';

import api from '@/services/api';
import { Ticket, TicketError, TicketMetadata } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface TicketsProviderProps {
  children: ReactNode;
}

interface TicketsContextData {
  loading: boolean;
  ticketsList: Ticket[];
  ticket: TicketMetadata;
  ticketError: TicketError | null;
  getAndSave: (token: string, { signal }: { signal: AbortSignal }) => Promise<void>;
  remove: (token: string) => void;
  removeAll: () => void;
}

interface TicketApiData {
  ticket_category: {
    event: {
      name: string;
      slug: string;
    };
    name: string;
  };
  token: string;
}

const createTicketData = (data: TicketApiData): Ticket => {
  const event = data.ticket_category.event;
  return {
    categoryName: data.ticket_category.name,
    token: data.token,
    eventName: event.name,
    eventSlug: event.slug,
    scannedAt: new Date(),
  };
};

const stringToDate = (value: unknown) => {
  const date = Date.parse(value as string);
  if (!isNaN(date)) return new Date(value as string);
  return value;
};

const getErrorType = (code: number): TicketError => {
  if (code === 404) return 'qr';
  if (code >= 400 && code < 500) return 'client';
  return 'server';
};

const TICKETS_STORAGE_KEY = '@Tickets';

export const TicketsContext = createContext({} as TicketsContextData);

export const TicketsProvider = ({ children }: TicketsProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [ticketsList, setTicketsList] = useState<Ticket[]>([]);
  const [ticket, setTicket] = useState<TicketMetadata>({ data: null, existed: false });
  const [ticketError, setTicketError] = useState<TicketError | null>(null);

  useEffect(() => {
    void (async () => loadTicketsFromStorage())();
  }, []);

  const loadTicketsFromStorage = async () => {
    setLoading(true);
    try {
      const tickets = await AsyncStorage.getItem(TICKETS_STORAGE_KEY);
      if (!tickets) return;
      const serialized = JSON.parse(tickets, (_, value) => stringToDate(value)) as Ticket[];
      setTicketsList(serialized);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const setTicketsInStorage = async (tickets: Ticket[]) => {
    await AsyncStorage.setItem(TICKETS_STORAGE_KEY, JSON.stringify(tickets));
  };

  const getTicketFromStorage = useCallback(
    (token: string): Ticket | undefined => {
      const ticketByToken = ticketsList.find((ticket) => ticket.token === token);
      return ticketByToken;
    },
    [ticketsList],
  );

  const getTicketFromApi = useCallback(
    async (token: string, { signal }: { signal?: AbortSignal }): Promise<Ticket | undefined> => {
      try {
        const response = await api.get<TicketApiData>(`/tickets/token/${token}`, { signal });
        if (!response.data) return;
        const ticket = createTicketData(response.data);
        return ticket;
      } catch (err) {
        const code = isAxiosError(err) && err.response ? err.response?.status : 400;
        const errorType = getErrorType(code);
        setTicketError(errorType);
      }
    },
    [setTicketError],
  );

  const loadAndSaveTicket = useCallback(
    async (token: string, { signal }: { signal?: AbortSignal }): Promise<void> => {
      const ticketFromStorage = getTicketFromStorage(token);
      if (ticketFromStorage) {
        setTicket({ data: ticketFromStorage, existed: true });
        return;
      }

      const ticketFromApi = await getTicketFromApi(token, { signal });
      if (!ticketFromApi) return;

      setTicketsList((prev) => {
        const newTickets = [ticketFromApi, ...prev];
        void (async () => setTicketsInStorage(newTickets))();
        return newTickets;
      });
      setTicket({ data: ticketFromApi, existed: false });
    },
    [getTicketFromStorage, getTicketFromApi, setTicket, setTicketsList],
  );

  const getAndSave = useCallback(
    async (token: string, { signal }: { signal?: AbortSignal }): Promise<void> => {
      setTicket({ data: null, existed: false });
      setTicketError(null);
      setLoading(true);
      await loadAndSaveTicket(token, { signal });
      setLoading(false);
    },
    [loadAndSaveTicket],
  );

  const remove = (token: string) => {
    setTicketsList((prev) => {
      const newTickets = prev.filter((ticket) => ticket.token !== token);
      void (async () => setTicketsInStorage(newTickets))();
      return newTickets;
    });
  };

  const removeAll = () => {
    setTicketsList([]);
    void (async () => setTicketsInStorage([]))();
  };

  return (
    <TicketsContext.Provider
      value={{
        loading,
        ticketsList,
        ticket,
        ticketError,
        getAndSave,
        remove,
        removeAll,
      }}
    >
      {children}
    </TicketsContext.Provider>
  );
};
