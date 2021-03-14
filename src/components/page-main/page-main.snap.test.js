import React from 'react';
import {render} from '@testing-library/react';
import {TestWrapper} from '../../services/test-wrapper/test-wrapper';

import PageMain from './page-main';

describe(`Snap test PageMain`, () => {
  it(`PageMain should render correctly`, () => {

    const {container} = render(
        <TestWrapper >
          <PageMain />
        </TestWrapper>
    );

    expect(container).toMatchSnapshot();
  });
  it(`PageMain empty should render correctly`, () => {

    const stateModifier = {favorites: {isLoaded: true, ids: []}};

    const {container} = render(
        <TestWrapper stateModifier={stateModifier}>
          <PageMain />
        </TestWrapper>
    );

    expect(container).toMatchSnapshot();
  });
});

