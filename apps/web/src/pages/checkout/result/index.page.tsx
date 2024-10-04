import React, { NextPage } from 'next';
import { useSearchParams } from 'next/navigation';

import { sessionApi } from 'resources/session';

import PaymentFail from '../components/Fail';
import PaymentSuccess from '../components/Success';

const CheckoutResult: NextPage = () => {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const session = sessionApi.useGetSession(sessionId);
  return session && session?.status === 'complete' ? <PaymentSuccess /> : <PaymentFail />;
};

export default CheckoutResult;
