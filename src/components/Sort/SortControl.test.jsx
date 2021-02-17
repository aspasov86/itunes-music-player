import { render, screen, fireEvent } from '@testing-library/react';
import SortControl from './SortControl';
import { ASCENDING } from '../../constants/constants';

const props = {
  sortBy: 'trackTimeMillis',
  onSortByChange: jest.fn(),
  sortType: ASCENDING,
  onSortTypeChange: jest.fn()
};

test('renders a sort control with it\'s event handlers', () => {
  render(<SortControl {...props} />);

  fireEvent.click(screen.getByTestId('sortType'));

  expect(props.onSortTypeChange).toHaveBeenCalled();
});
