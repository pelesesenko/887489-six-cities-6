import React from 'react';
import {render} from '@testing-library/react';
import {TestWrapper} from '../../services/test-wrapper/test-wrapper';
import {CardTypes} from '../../constants';

import OfferCard from './offer-card';

describe(`Snap test OfferCard`, () => {

  const onChangeActiveOffer = jest.fn();
  it(`OfferCard should render correctly`, () => {

    const id = 1;

    const {container} = render(
        <TestWrapper>
          <OfferCard id={id} cardType={CardTypes.MAIN_OFFERS} key = {id} onChangeActiveOffer={onChangeActiveOffer}/>
        </TestWrapper>
    );

    expect(container).toMatchSnapshot();
  });

  it(`OfferCard should render correctly`, () => {

    const id = 2;

    const {container} = render(
        <TestWrapper>
          <OfferCard id={id} cardType={CardTypes.MAIN_OFFERS} key = {id} onChangeActiveOffer={onChangeActiveOffer}/>
        </TestWrapper>
    );

    expect(container).toMatchSnapshot();
  });
});


