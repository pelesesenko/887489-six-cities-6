import React from 'react';
import {render, screen} from '@testing-library/react';
import {Cities} from '../../constants';
import userEvent from '@testing-library/user-event';

import CitiesList from './cities-list';

it(`CitiesList should render correctly`, () => {

  const handleCityClick = jest.fn();

  const {container} = render(
      <CitiesList currentCityName={Cities.COLOGNE} onSetCity={handleCityClick}/>
  );
  const activeElements = container.querySelectorAll(`.tabs__item--active`);

  userEvent.click(activeElements[0]);

  expect(screen.getByText(/Paris/i)).toBeInTheDocument();
  expect(activeElements.length).toBe(1);
  expect(activeElements[0].firstChild.innerHTML).toBe(Cities.COLOGNE);
  expect(handleCityClick).toHaveBeenCalledWith(Cities.COLOGNE);
});

