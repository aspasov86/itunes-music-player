import { render, screen } from '../utlis/test-utils';
import Track from './Track';
import { DESCENDING } from '../constants/constants';

const initialState = {
  searchTerm: '',
  loading: false,
  noResults: false,
  sortBy: 'trackPrice',
  sortType: DESCENDING,
  tracks: [{
    trackId: 154628,
    artworkUrl100: 'test/100x100bb.jpg',
    trackName: 'R U Mine? ',
    collectionName: 'AM',
    artistName: 'Arctic Monkeys',
    primaryGenreName: 'Indie rock',
    releaseDate: '2012-11-01T12:00:00',
    previewUrl: 'test/rumine.m4a',
    trackTimeMillis: 271458,
    trackPrice: 9.99
  }, {
    trackId: 274628,
    artworkUrl100: 'test/100x100bb.jpg',
    trackName: 'Arabella',
    collectionName: 'AM',
    artistName: 'Arctic Monkeys',
    primaryGenreName: 'Indie rock',
    releaseDate: '2012-11-01T12:00:00',
    previewUrl: 'test/arabella.m4a',
    trackTimeMillis: 311458,
    trackPrice: 7.99
  }]
};

const match = { params: { trackId: '274628' } };

Object.defineProperty(global.window.HTMLMediaElement.prototype, 'load', {
  configurable: true,
  get() {
    setTimeout(() => (this.onloadeddata && this.onloadeddata()));
    return () => {};
  }
});

test('renders an audio player with an image, back button etc', () => {
  render(<Track match={match} />, { initialState });

  const audioPlayer = screen.getByLabelText('Audio Player');
  expect(audioPlayer).toBeInTheDocument();

  const img = screen.getByAltText('cover');
  expect(img).toBeInTheDocument();

  const backButton = screen.getByText('Back to Search');
  expect(backButton).toBeInTheDocument();
});
