import { renderHook } from '@testing-library/react-hooks';
import matchMediaPolyfill from 'mq-polyfill';
import useScreenWidth from './useScreenWidth';
import { MOBILE_M_WIDTH, TABLET_WIDTH, LAPTOP_L_WIDTH } from '../../constants/constants';

beforeAll(() => {
  matchMediaPolyfill(window);
  window.resizeTo = function resizeTo(width) {
    Object
      .assign(this, { innerWidth: width, outerWidth: width })
      .dispatchEvent(new this.Event('resize'));
  };
});

test('device info based on screen width', () => {
  // mobile
  window.resizeTo(MOBILE_M_WIDTH);
  let { result: { current: screenWidth }, unmount } = renderHook(() => useScreenWidth());
  expect(screenWidth.isMobileMScreen).toBe(true);
  expect(screenWidth.isMobileDevice).toBe(true);
  unmount();

  // tablet
  window.resizeTo(TABLET_WIDTH);
  ({ result: { current: screenWidth }, unmount } = renderHook(() => useScreenWidth()));
  expect(screenWidth.isTabletScreen).toBe(true);
  expect(screenWidth.isTabletDevice).toBe(true);
  unmount();

  // laptop/desktop
  window.resizeTo(LAPTOP_L_WIDTH);
  ({ result: { current: screenWidth } } = renderHook(() => useScreenWidth()));
  expect(screenWidth.isLaptopLScreen).toBe(true);
  expect(screenWidth.isDesktopDevice).toBe(true);
});
