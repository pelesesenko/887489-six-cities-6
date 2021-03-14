import React from 'react';
import {render} from '@testing-library/react';
import {TestWrapper} from '../../services/test-wrapper/test-wrapper';

import PageNotFound from './page-not-found';

it(`PageNotFound should render correctly`, () => {

  const {container} = render(
      <TestWrapper >
        <PageNotFound />
      </TestWrapper>
  );

  expect(container).toMatchSnapshot();
});
