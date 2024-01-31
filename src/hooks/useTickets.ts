import { useContext } from 'react';

import { TicketsContext } from '@/contexts/tickets';

export const useTickets = () => useContext(TicketsContext);
