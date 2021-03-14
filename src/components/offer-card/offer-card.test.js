import React from 'react';
import {render, screen} from '@testing-library/react';
import {TestWrapper} from '../../services/test-wrapper/test-wrapper';
import {AuthorizationStatus, CardTypes, AppPaths} from '../../constants';
import userEvent from '@testing-library/user-event';
import {createMemoryHistory} from 'history';

import OfferCard from './offer-card';

describe(`Event test OfferCard`, () => {
  let id;
  let mockDispatch;
  let onChangeActiveOffer;

  beforeEach(() => {
    id = 1;
    mockDispatch = jest.fn();
    onChangeActiveOffer = jest.fn();
  });
  it(`OfferCard should handle event correctly`, () => {
    render(
        <TestWrapper mockDispatch={mockDispatch}>
          <OfferCard id={id} cardType={CardTypes.MAIN_OFFERS} key = {id} onChangeActiveOffer={onChangeActiveOffer}/>
        </TestWrapper>
    );

    const FavButton = screen.getByRole(`button`);
    const card = screen.getByRole(`article`);

    userEvent.click(FavButton);
    userEvent.hover(card);
    userEvent.unhover(card);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(onChangeActiveOffer).toHaveBeenCalledTimes(3);
    expect(onChangeActiveOffer).toHaveBeenNthCalledWith(1, 1);
    expect(onChangeActiveOffer).toHaveBeenNthCalledWith(2, 1);
    expect(onChangeActiveOffer).toHaveBeenNthCalledWith(3, null);

  });
  it(`OfferCard should handle event correctly without authorization`, () => {
    const mockHistory = createMemoryHistory();
    const stateModifier = {authorizationStatus: AuthorizationStatus.NO_AUTH};

    render(
        <TestWrapper mockDispatch={mockDispatch} stateModifier={stateModifier} mockHistory={mockHistory}>
          <OfferCard id={id} cardType={CardTypes.MAIN_OFFERS} key = {id} onChangeActiveOffer={onChangeActiveOffer}/>
        </TestWrapper>
    );
    const FavButton = screen.getByRole(`button`);

    userEvent.click(FavButton);

    expect(mockDispatch).toHaveBeenCalledTimes(0);
    expect(mockHistory.location.pathname).toBe(AppPaths.LOGIN);
  });
});
