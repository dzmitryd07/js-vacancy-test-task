import React, { FC } from 'react';
import { useSearchParams } from 'next/navigation';

import { sessionApi } from 'resources/session';

import PaymentFail from '../components/Fail';
import PaymentSuccess from '../components/Success';

const CheckoutResult: FC = () => {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const session = sessionApi.useGetSession(sessionId);
  return session?.status === 'complete' ? <PaymentSuccess /> : <PaymentFail />;
};

export default CheckoutResult;
