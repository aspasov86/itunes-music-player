import {
  render, fireEvent, screen, waitFor
} from '../../utlis/test-utils';
import Sort from './Sort';
import { DESCENDING } from '../../constants/constants';
import useScreenWidth from '../../hooks/screenWidth/useScreenWidth';

jest.mock('../../hooks/screenWidth/useScreenWidth');

const initialState = {
  searchTerm: '',
  loading: false,
  noResults: false,
  sortBy: 'trackPrice',
  sortType: DESCENDING,
  tracks: []
};

test('sort button opens a popup with sort control on small screens', async () => {
  useScreenWidth.mockReturnValue({ isMobileDevice: true, isTabletDevice: false });
  render(<Sort />, { initialState });

  await waitFor(() => fireEvent.click(screen.getByTestId('sort')));
  const sortByOptions = screen.getAllByRole('option');
  expect(sortByOptions[0]).toBeInTheDocument();
});

test('on big screens sort control is aleady on the page', () => {
  useScreenWidth.mockReturnValue({ isMobileDevice: false, isTabletDevice: false, isDesktopDevice: true });
  render(<Sort />, { initialState });
  const sortByOptions = screen.getAllByRole('option');
  expect(sortByOptions[0]).toBeInTheDocument();
});
