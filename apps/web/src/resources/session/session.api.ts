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

export const useGetSession = <T>(data: T) => {
  const result = useQuery({
    queryKey: ['fetchClientSession'],
    queryFn: async () => {
      const session = await stripe.checkout.sessions.retrieve(data);
      if (session.status === 'open') {
        // console.log(session.status);
      } else if (session.status === 'complete') {
        // console.log(session.status);
      }

      return session;
    },
  });

  return result.data;
};

export const useListPayments = () => {
  const result = useQuery({
    queryKey: ['fetchClientPayments'],
    queryFn: async () => {
      const paymentIntents = await stripe.paymentIntents.list();
      return paymentIntents;
    },
  });

  return result.data;
};
