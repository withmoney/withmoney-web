import React from 'react';
import CreditCard from './CreditCard';
import { InformationContainer } from './style/Information.style';
import { useCreditCardsLimit } from '../../../hooks/useCreditCard';

const Information = () => {
  const { data } = useCreditCardsLimit();
  return (
    <InformationContainer>
      {data?.allCreditCardsLimit &&
        data.allCreditCardsLimit.map((creditCard) => (
          <CreditCard
            key={creditCard.creditCard.id}
            variation="CreditCard"
            name={creditCard.creditCard.name}
            current={creditCard.currentLimit}
            desired={creditCard.limit}
          />
        ))}
    </InformationContainer>
  );
};

export default Information;
