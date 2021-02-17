import { render, screen } from '@testing-library/react';
import Details from './Details';

const track = {
  trackName: 'R U Mine? ',
  collectionName: 'AM',
  artistName: 'Arctic Monkeys',
  primaryGenreName: 'Indie rock',
  releaseDate: '2012-11-01T12:00:00'
};

test('renders track details', () => {
  render(<Details track={track} />);

  const trackName = screen.getByText(/R U Mine?/i);
  const collectionName = screen.getByText(/Arctic Monkeys/i);

  expect(trackName).toBeInTheDocument();
  expect(collectionName).toBeInTheDocument();
});
