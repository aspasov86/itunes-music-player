import { render, screen } from '@testing-library/react';
import ShareButton from './ShareButton';
import useScreenWidth from '../../hooks/screenWidth/useScreenWidth';

jest.mock('../../hooks/screenWidth/useScreenWidth');

test('renders share buttons differently based on screen width', () => {
  useScreenWidth
    .mockReturnValueOnce({ isLaptopDevice: false, isDesktopDevice: false })
    .mockReturnValueOnce({ isLaptopDevice: true, isDesktopDevice: false });

  // small screens
  const { unmount } = render(<ShareButton trackViewUrl="test" />);
  const shareButton = screen.getByText('Share');
  expect(shareButton).toBeInTheDocument();
  unmount();

  // big screens
  render(<ShareButton trackViewUrl="test" />);
  expect(shareButton).not.toBeInTheDocument();
});
