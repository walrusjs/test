import React from 'react';
import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import '@testing-library/jest-dom/extend-expect';
import { App, LocationDisplay } from '../index';

test('full app rendering/navigating', () => {
  const history = createMemoryHistory();

  render(
    <Router history={history}>
      <App />
    </Router>
  );

  expect(screen.getByText(/you are home/i)).toBeInTheDocument()

  const leftClick = { button: 0 }
  userEvent.click(screen.getByText(/about/i), leftClick)

  expect(screen.getByText(/you are on the about page/i)).toBeInTheDocument()
});

test('landing on a bad page', () => {
  const history = createMemoryHistory();
  history.push('/some/bad/route');

  render(
    <Router history={history}>
      <App />
    </Router>
  )

  expect(screen.getByText(/no match/i)).toBeInTheDocument()
});

test('rendering a component that uses useLocation', () => {
  const history = createMemoryHistory();
  const route = '/some-route';
  history.push(route);

  render(
    <Router history={history}>
      <LocationDisplay />
    </Router>
  )

  expect(screen.getByTestId('location-display')).toHaveTextContent(route)
})
