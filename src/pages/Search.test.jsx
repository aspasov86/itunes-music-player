import { render, fireEvent, screen } from '../utlis/test-utils';
import SearchPage from './Search';
import { DESCENDING } from '../constants/constants';
import useScreenWidth from '../hooks/screenWidth/useScreenWidth';

jest.mock('../hooks/screenWidth/useScreenWidth');

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
    trackTimeMillis: 311458,
    trackPrice: 7.99
  }]
};

const history = { push: jest.fn() };

test('message should when there are no results', () => {
  useScreenWidth.mockReturnValue({ isMobileDevice: false, isTabletDevice: false, isDesktopDevice: true });
  render(<SearchPage history={history} />, { initialState: { ...initialState, noResults: true, tracks: [] } });

  expect(screen.getByText('No results found')).toBeInTheDocument();
});

test('lists the track results on mobile devices', async () => {
  useScreenWidth.mockReturnValue({ isMobileDevice: true, isTabletDevice: false });
  render(<SearchPage history={history} />, { initialState });

  expect(screen.getAllByTestId('item')).toHaveLength(initialState.tracks.length);
});

test('lists the track results on laptop/desktop devices', async () => {
  useScreenWidth.mockReturnValue({ isMobileDevice: false, isTabletDevice: false, isDesktopDevice: true });
  render(<SearchPage history={history} />, { initialState });

  expect(screen.getAllByTestId('card')).toHaveLength(initialState.tracks.length);
});

test('clicking on a track result directs to another page', () => {
  useScreenWidth.mockReturnValue({ isMobileDevice: false, isTabletDevice: false, isDesktopDevice: true });
  render(<SearchPage history={history} />, { initialState });

  fireEvent.click(screen.getAllByTestId('card')[0]);

  expect(history.push).toHaveBeenCalledWith(`/track/${initialState.tracks[0].trackId}`);
});
