import { render, screen, fireEvent } from '@testing-library/react';
import CardItem from './CardItem';

const track = {
  trackId: 154628,
  artworkUrl100: 'test/100x100bb.jpg',
  trackName: 'R U Mine? ',
  collectionName: 'AM',
  artistName: 'Arctic Monkeys',
  primaryGenreName: 'Indie rock',
  releaseDate: '2012-11-01T12:00:00',
  trackTimeMillis: 271458,
  trackPrice: 9.99
};

const onClick = jest.fn();

test('renders track details', () => {
  render(<CardItem track={track} itemClickHandler={jest.fn()} />);
  const trackName = screen.getByText('R U Mine?');
  const collectionName = screen.getByText('Arctic Monkeys');
  const img = screen.getByAltText('cover');

  expect(trackName).toBeInTheDocument();
  expect(collectionName).toBeInTheDocument();
  expect(img).toBeInTheDocument();
});

test('handles the event on click', () => {
  render(<CardItem track={track} itemClickHandler={() => onClick} />);
  expect(onClick).not.toHaveBeenCalled();

  fireEvent.click(screen.getByTestId('card'));

  expect(onClick).toHaveBeenCalled();
});
