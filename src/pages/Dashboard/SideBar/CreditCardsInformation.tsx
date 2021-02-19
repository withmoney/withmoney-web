import React, { useState } from 'react';
import CreditCard from './CreditCard';
import Text from 'components/Text';
import { InformationContainer, UpArrow, DownArrow } from './style/Information.style';
import { ContainerText, ButtonCards } from './style/Information.style';
import { useCreditCardsLimit } from 'hooks/useCreditCard';

const Information = () => {
  const { data } = useCreditCardsLimit();
  const [show, setShow] = useState(!data?.allCreditCardsLimit);

  return (
    <InformationContainer>
      <ContainerText>
        <Text>Credit Cards</Text>
        <ButtonCards type="button" onClick={() => setShow(!show)}>
          {show ? <UpArrow /> : <DownArrow />}
        </ButtonCards>
      </ContainerText>
      {data?.allCreditCardsLimit.length === 0 && show && (
        <Text variation="light">No credit card data</Text>
      )}
      {data?.allCreditCardsLimit &&
        show &&
        data.allCreditCardsLimit.map((creditCard) => (
          <CreditCard
            key={creditCard.creditCard.id}
            name={creditCard.creditCard.name}
            limit={creditCard.limit}
            limitFree={creditCard.limitFree}
          />
        ))}
    </InformationContainer>
  );
};

export default Information;
