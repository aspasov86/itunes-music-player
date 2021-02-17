import { render, screen } from '@testing-library/react';
import Layout from './Layout';
import useScreenWidth from '../../hooks/screenWidth/useScreenWidth';

jest.mock('../../hooks/screenWidth/useScreenWidth');

test('renders content wrapper based on screenWidth', () => {
  useScreenWidth.mockReturnValue({ isLaptopDevice: false, isDesktopDevice: false });
  render(<Layout><div>Test</div></Layout>);

  const children = screen.getByText('Test');
  expect(children).toBeInTheDocument();
});
