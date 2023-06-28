import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/pages/NotFound';

test('renders TOPへ戻る link', () => {
  render(<NotFound/>);
  const linkElement = screen.getByText(/TOPへ戻る/i);
  expect(linkElement).toBeInTheDocument();
});
