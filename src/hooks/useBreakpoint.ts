import { useState, useEffect } from 'react';

const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState({
    isBase: false,
    isSm: false,
    isMd: false,
    isLg: false,
    isXl: false,
    is2Xl: false,
  });

  const updateBreakpoint = () => {
    const width = window.innerWidth;
    setBreakpoint({
      isBase: width < 640,
      isSm: width >= 640,
      isMd: width >= 768,
      isLg: width >= 1024,
      isXl: width >= 1280,
      is2Xl: width >= 1536,
    });
  };

  // useEffect(() => {
  //   console.log(breakpoint);
  // }, [
  //   breakpoint.isBase,
  //   breakpoint.isSm,
  //   breakpoint.isMd,
  //   breakpoint.isLg,
  //   breakpoint.isXl,
  //   breakpoint.is2Xl,
  //   breakpoint,
  // ]);

  useEffect(() => {
    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  return breakpoint;
};

export default useBreakpoint;
