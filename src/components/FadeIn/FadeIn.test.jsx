import { render } from '@testing-library/react';
import FadeIn from './FadeIn';

test('renders a content wrapper with animation', () => {
  const { getByText } = render(<FadeIn><span>Test</span></FadeIn>);
  expect(getByText(/Test/i)).toBeInTheDocument();
});
