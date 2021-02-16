import { useState, useEffect } from 'react';
import {
  MOBILE_S_WIDTH,
  MOBILE_M_WIDTH,
  MOBILE_L_WIDTH,
  TABLET_WIDTH,
  LAPTOP_WIDTH,
  LAPTOP_L_WIDTH
} from '../../constants/constants';

const getState = innerWidth => ({
  isMobileSScreen: innerWidth <= MOBILE_S_WIDTH,
  isMobileMScreen: innerWidth > MOBILE_S_WIDTH && innerWidth <= MOBILE_M_WIDTH,
  isMobileLScreen: innerWidth > MOBILE_M_WIDTH && innerWidth <= MOBILE_L_WIDTH,
  isTabletScreen: innerWidth > MOBILE_L_WIDTH && innerWidth <= TABLET_WIDTH,
  isLaptopScreen: innerWidth > TABLET_WIDTH && innerWidth <= LAPTOP_WIDTH,
  isLaptopLScreen: innerWidth > LAPTOP_WIDTH && innerWidth <= LAPTOP_L_WIDTH,
  isWideScreen: innerWidth > LAPTOP_L_WIDTH
});

function useScreenWidth() {
  const [screenWidth, setScreenWidth] = useState(getState(window.innerWidth));

  useEffect(() => {
    const handleResize = () => setScreenWidth(getState(window.innerWidth));
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  return {
    ...screenWidth,
    isMobileDevice: screenWidth.isMobileSScreen || screenWidth.isMobileMScreen || screenWidth.isMobileLScreen,
    isTabletDevice: screenWidth.isTabletScreen,
    isLaptopDevice: screenWidth.isLaptopScreen || screenWidth.isLaptopLScreen,
    isDesktopDevice: screenWidth.isLaptopLScreen || screenWidth.isWideScreen
  };
}

export default useScreenWidth;
