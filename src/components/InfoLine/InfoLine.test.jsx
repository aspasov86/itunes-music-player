import { render, screen } from '@testing-library/react';
import InfoLine from './InfoLine';

test('renders a string info or a no info placeholder', () => {
  const { unmount } = render(<InfoLine info="test" />);
  expect(screen.getByText(/test/i)).toBeInTheDocument();
  unmount();
  render(<InfoLine />);
  expect(screen.getByText(/[No Info]/i)).toBeInTheDocument();
});

test('renders a date or a no info placeholder', () => {
  const { unmount } = render(<InfoLine info="2012-11-01T12:00:00" type="date" />);
  expect(screen.getByText(/November 01, 2012/i)).toBeInTheDocument();
  unmount();
  render(<InfoLine type="date" />);
  expect(screen.getByText(/[No Info]/i)).toBeInTheDocument();
});

test('renders a price or a no info placeholder', () => {
  const { unmount } = render(<InfoLine info={9.99} type="price" />);
  expect(screen.getByText('$9.99')).toBeInTheDocument();
  unmount();
  render(<InfoLine type="price" />);
  expect(screen.getByText(/[No Info]/i)).toBeInTheDocument();
});

test('renders a track duration time or a no info placeholder', () => {
  const { unmount } = render(<InfoLine info={271458} type="duration" />);
  expect(screen.getByText('04:31')).toBeInTheDocument();
  unmount();
  render(<InfoLine type="duration" />);
  expect(screen.getByText(/[No Info]/i)).toBeInTheDocument();
});

test('renders a an info with a specific html element', () => {
  render(<InfoLine info="test" htmlTag="span" data-testid="h1test" />);
  expect(screen.getByTestId('h1test')).toBeInTheDocument();
});
