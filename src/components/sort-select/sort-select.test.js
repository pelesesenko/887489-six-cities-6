import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {SortOrders} from '../../constants';

import SortSelect from './sort-select';

describe(`Test SortSelect`, () => {

  const mockOnSetOrder = jest.fn();
  const appOrders = Object.values(SortOrders);

  it(`SortSelect should render correctly`, () => {
    render(
        <SortSelect onSetOrder={mockOnSetOrder} order={SortOrders.RATING}/>
    );
    const control = screen.getByTestId(`control`);
    const options = screen.getAllByTestId(`option`);
    const select = screen.getByTestId(`select`);

    expect(control).toBeInTheDocument();
    expect(options.length).toBe(appOrders.length);
    expect(select.className.includes(`places__options--opened`)).toBe(false);
  });

  it(`SortSelect should handle user actions correctly`, () => {

    const mockSetIsOpen = jest.fn();
    jest.spyOn(React, `useState`).mockImplementation((init) => [init, mockSetIsOpen]);

    render(
        <SortSelect onSetOrder={mockOnSetOrder} order={SortOrders.RATING}/>
    );
    const control = screen.getByTestId(`control`);
    const options = screen.getAllByTestId(`option`);

    control.focus();
    fireEvent.keyDown(document.body, {code: `Escape`});
    control.focus();
    control.blur();
    options[0].focus();
    fireEvent.keyDown(document.activeElement, {code: `Enter`});
    control.focus();
    userEvent.click(options[1]);

    expect(mockSetIsOpen).toHaveBeenCalledTimes(9);
    expect(mockSetIsOpen).toHaveBeenNthCalledWith(1, true);
    expect(mockSetIsOpen).toHaveBeenNthCalledWith(2, false);
    expect(mockSetIsOpen).toHaveBeenNthCalledWith(3, true);
    expect(mockSetIsOpen).toHaveBeenNthCalledWith(4, false);
    expect(mockSetIsOpen).toHaveBeenNthCalledWith(5, true);
    expect(mockSetIsOpen).toHaveBeenNthCalledWith(6, false);
    expect(mockSetIsOpen).toHaveBeenNthCalledWith(7, true);
    expect(mockSetIsOpen).toHaveBeenNthCalledWith(8, true);
    expect(mockSetIsOpen).toHaveBeenNthCalledWith(9, false);

    expect(mockOnSetOrder).toHaveBeenCalledTimes(2);
    expect(mockOnSetOrder).toHaveBeenNthCalledWith(1, appOrders[0]);
    expect(mockOnSetOrder).toHaveBeenNthCalledWith(2, appOrders[1]);
  });
});

