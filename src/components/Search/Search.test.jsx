import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useDispatch } from 'react-redux';
import Search from './Search';
import { CLEAR } from '../../redux/actionTypes';

jest.mock('react-redux');

const props = {
  searchTerm: '',
  loading: false,
  searchHandler: jest.fn()
};

test('renders a search input with it\'s all functionalities', () => {
  const dispatch = jest.fn();
  useDispatch.mockReturnValue(dispatch);
  render(<Search {...props} />);

  // simulate input typing
  const searchInput = screen.getByPlaceholderText('Search...');
  const inputText = 'Arctic Monkeys';
  userEvent.type(searchInput, inputText);

  // simulate search initiation
  const searchButton = screen.getByTestId('search');
  userEvent.click(searchButton);
  expect(props.searchHandler).toHaveBeenCalledWith(inputText);

  // clearing the existing input
  userEvent.clear(searchInput);
  expect(dispatch).toHaveBeenCalledWith({ type: CLEAR });
});
