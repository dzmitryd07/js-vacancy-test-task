import { useQuery } from '@tanstack/react-query';

import config from 'config';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const stripe = require('stripe')(config.STRIPE_SECRET_KEY);

type CartSessionItem = {
  price_data: {
    currency: string;
    product_data: {
      name: string;
    };
    unit_amount: number;
  };
  quantity: number;
};

export const useCreateSession = (data: { lineItems: CartSessionItem[]; customer: { email: string | null } }) => {
  const res = useQuery({
    queryKey: ['fetchClientSecret', data],
    queryFn: async () => {
      const session = await stripe.checkout.sessions.create({
        ui_mode: 'embedded',
        line_items: data.lineItems,
        mode: 'payment',
        return_url: `${config.WEB_URL}/checkout/result?session_id={CHECKOUT_SESSION_ID}`,
        customer_email: data.customer.email,
      });

      return { clientSecret: session.client_secret };
    },
  });

  return res.data;
};

export const useListCheckoutSessions = <T>(data: T) => {
  const res = useQuery({
    queryKey: ['fetchListCheckoutSessions'],
    queryFn: async () => {
      const { data: sessions } = await stripe.checkout.sessions.list({ ...data, status: 'complete' });
      const sessionIds = sessions.map((session: { id: string }) => session.id);

      const promises = sessionIds.map((sessionId: string) => stripe.checkout.sessions.listLineItems(sessionId));
      const lineItems = await Promise.all(promises);
      const result = lineItems.map((item) => item.data[0]);
      return result;
    },
  });

  return res.data;
};

export const useGetSession = <T>(data: T) => {
  const result = useQuery({
    queryKey: ['fetchClientSession'],
    queryFn: async () => {
      const session = await stripe.checkout.sessions.retrieve(data);
      return session;
    },
  });

  return result.data;
};
