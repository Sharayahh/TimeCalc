import React from 'react'; // Add this if React 16 or older JSX transform is being used
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders without crashing', () => {
  render(<App />);
  expect(screen.getByText(/Work Calculator/i)).toBeInTheDocument();
});
