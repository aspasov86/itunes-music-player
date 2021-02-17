import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Search page by default', () => {
  render(<App />);
  const searchInput = screen.getByPlaceholderText(/Search.../i);
  const sortSelectInput = screen.getByText(/Sort by/i);
  expect(searchInput).toBeInTheDocument();
  expect(sortSelectInput).toBeInTheDocument();
});
