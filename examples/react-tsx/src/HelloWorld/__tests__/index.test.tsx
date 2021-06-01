import React from 'react';
import { render, screen } from '@testing-library/react'
import HelloWorld from '../index';

test('should render name correctly', () => {
  // render
  const { container } = render(<HelloWorld />);

  expect(container.innerHTML).toEqual(`<div>hello world</div>`);
});
