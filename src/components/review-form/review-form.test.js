import React from 'react';
import {act, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {TestWrapper} from '../../services/test-wrapper/test-wrapper';
import {ReviewLength, APIRoutes} from '../../constants';
import userEvent from '@testing-library/user-event';
import MockAdapter from 'axios-mock-adapter';
import {createApi} from '../../services/api';

import ReviewForm from './review-form';

describe(`Test Review Form`, () => {

  const api = createApi(() => {});
  const apiMock = new MockAdapter(api);
  apiMock.post = jest.fn((_url, data) => Promise.resolve({data}));

  const mockOnSentReview = jest.fn();

  it(`ReviewForm should render correctly`, () => {
    render(
        <TestWrapper >
          <ReviewForm roomId={3} onSentReview={mockOnSentReview} api={apiMock}/>
        </TestWrapper>
    );
    const textBox = screen.getByRole(`textbox`);
    const ratingInputs = screen.getAllByRole(`radio`);
    const submitBtn = screen.getByRole(`button`);

    expect(textBox).toBeInTheDocument();
    expect(ratingInputs.length).toBe(5);
    expect(submitBtn).toBeInTheDocument();
  });

  it(`ReviewForm should allows enter data and submit correct data`, () => {
    render(
        <TestWrapper >
          <ReviewForm roomId={3} onSentReview={mockOnSentReview} api={apiMock}/>
        </TestWrapper>
    );
    const textBox = screen.getByRole(`textbox`);
    const ratingInputs = screen.getAllByRole(`radio`);
    const submitBtn = screen.getByRole(`button`);

    userEvent.type(textBox, `test Review Form`);
    expect(screen.getByDisplayValue(`test Review Form`)).toBeInTheDocument();

    userEvent.clear(textBox);
    expect(screen.queryByDisplayValue(`test Review Form`)).toBe(null);

    userEvent.type(textBox, `t`.repeat(ReviewLength.MIN));
    expect(submitBtn.disabled).toBe(true);

    userEvent.click(ratingInputs[2]);
    expect(submitBtn.disabled).toBe(false);

    userEvent.clear(textBox);
    userEvent.type(textBox, `t`.repeat(ReviewLength.MIN - 1));
    expect(submitBtn.disabled).toBe(true);

    userEvent.clear(textBox);
    userEvent.type(textBox, `t`.repeat(ReviewLength.MAX + 1));
    expect(submitBtn.disabled).toBe(true);
  });
  it(`ReviewForm should allows enter data and submit correct data`, async () => {

    render(
        <TestWrapper >
          <ReviewForm roomId={3} onSentReview={mockOnSentReview} api={apiMock}/>
        </TestWrapper>
    );
    const textBox = screen.getByRole(`textbox`);
    const ratingInputs = screen.getAllByRole(`radio`);
    const submitBtn = screen.getByRole(`button`);
    userEvent.type(textBox, `t`.repeat(ReviewLength.MIN));
    userEvent.click(ratingInputs[2]);
    expect(submitBtn.disabled).toBe(false);

    await act(async () => {
      userEvent.click(submitBtn);
    });

    expect(apiMock.post).toHaveBeenCalledWith(
        APIRoutes.COMMENTS + 3,
        {comment: `t`.repeat(ReviewLength.MIN), rating: `3`});

    expect(mockOnSentReview).toHaveBeenCalledWith(
        {comment: `t`.repeat(ReviewLength.MIN), rating: `3`}
    );
  });
});

