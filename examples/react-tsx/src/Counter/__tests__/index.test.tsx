import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Counter } from '../index';

const setup = () => {
  const utils = render(<Counter />);
  return {
    ...utils,
  }
}

test('初始计数应为0', () => {
  const utils = setup();

  expect(utils.getByTestId('count-announcement')).toHaveTextContent('0');
});

test('点击一次按钮，计数应为1', () => {
  const utils = setup();

  const increaseButton = utils.getByTestId('increase-button');
  fireEvent.click(increaseButton);

  expect(utils.getByTestId('count-announcement')).toHaveTextContent('1');
});
