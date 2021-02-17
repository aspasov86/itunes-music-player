import { render, screen } from '@testing-library/react';
import MenuBar from './Menu';

test('renders track details', () => {
  render(<MenuBar />);

  const appName = screen.getByText(/iTunes music player/i);

  expect(appName).toBeInTheDocument();
});
