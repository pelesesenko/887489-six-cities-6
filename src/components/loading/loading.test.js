import React from 'react';
import {render, screen} from '@testing-library/react';

import Loading from './loading';

it(`Loading should render correctly`, () => {

  render(
      <Loading/>
  );

  expect(screen.getByText(`Loading...`)).toBeInTheDocument();
});
