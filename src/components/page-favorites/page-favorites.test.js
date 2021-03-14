import React from 'react';
import {render, screen, cleanup} from '@testing-library/react';
import {TestWrapper} from '../../services/test-wrapper/test-wrapper';

import PageFavorites from './page-favorites';

describe(`Test PageFavorites`, () => {
  it(`PageFavorites should render correctly`, () => {

    const mockDispatch = jest.fn();

    render(
        <TestWrapper mockDispatch={mockDispatch}>
          <PageFavorites/>
        </TestWrapper>
    );

    expect(screen.queryByText(/Nothing yet saved./i)).toBe(null);
    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
    expect(mockDispatch).toHaveBeenCalledTimes(1);

    cleanup();

    expect(mockDispatch).toHaveBeenCalledTimes(2);
  });

  it(`PageFavorites empty should render correctly`, () => {

    const stateModifier = {favorites: {isLoaded: true, ids: []}};

    render(
        <TestWrapper stateModifier={stateModifier}>
          <PageFavorites/>
        </TestWrapper>
    );

    expect(screen.queryByText(/Saved listing/i)).toBe(null);
    expect(screen.getByText(/Nothing yet saved./i)).toBeInTheDocument();
  });
});
