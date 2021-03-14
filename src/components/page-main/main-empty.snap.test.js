import React from 'react';
import {render} from '@testing-library/react';
import {TestWrapper} from '../../services/test-wrapper/test-wrapper';

import MainEmpty from './main-empty';

it(`MainEmpty should render correctly`, () => {

  const {container} = render(
      <TestWrapper >
        <MainEmpty />
      </TestWrapper>
  );

  expect(container).toMatchSnapshot();
});
