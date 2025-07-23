import { useEffect, useState } from 'react';

/**
 * REM based Tailwind CSS breakpoint detection hook
 * Tailwind v4.0 accurate rem unit usage (1rem = 16px based)
 *
 * @param {boolean} debug - debug mode
 * @returns {string} current breakpoint ('base' | 'sm' | 'md' | 'lg' | 'xl' | '2xl')
 */
export function useBreakpoint(debug = false) {
  const [breakpoint, setBreakpoint] = useState('base');

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;

      // calculate the current rem size of the browser (default 16px but can be changed by the user)
      const remSize = parseFloat(getComputedStyle(document.documentElement).fontSize);

      // calculate the current width in rem
      const widthInRem = width / remSize;

      let newBreakpoint = 'base';

      // Tailwind CSS v4.0 default breakpoint (rem based)
      if (widthInRem >= 96)
        // 2xl: 96rem (1536px)
        newBreakpoint = '2xl';
      else if (widthInRem >= 80)
        // xl: 80rem (1280px)
        newBreakpoint = 'xl';
      else if (widthInRem >= 64)
        // lg: 64rem (1024px)
        newBreakpoint = 'lg';
      else if (widthInRem >= 48)
        // md: 48rem (768px)
        newBreakpoint = 'md';
      else if (widthInRem >= 40)
        // sm: 40rem (640px)
        newBreakpoint = 'sm';
      else newBreakpoint = 'base'; // base: ~39.999rem

      // print debug information
      if (debug) {
        console.log(`🔍 useBreakpoint Debug (REM):`, {
          windowWidth: width,
          widthInRem: widthInRem.toFixed(2),
          remSize: remSize,
          currentBreakpoint: newBreakpoint,
          previousBreakpoint: breakpoint,
          changed: newBreakpoint !== breakpoint,
          breakpointRanges: {
            base: '< 40rem',
            sm: '40rem+',
            md: '48rem+',
            lg: '64rem+',
            xl: '80rem+',
            '2xl': '96rem+',
          },
        });
      }

      setBreakpoint(newBreakpoint);
    }

    // initial execution
    handleResize();

    // register resize event listener
    window.addEventListener('resize', handleResize);

    // cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [debug, breakpoint]);

  return breakpoint;
}

/**
 * REM based breakpoint information hook for debugging
 * It allows you to visually check the breakpoint behavior in the development environment
 *
 * @returns {Object} breakpoint detailed information (includes rem information)
 */
export function useBreakpointInfo() {
  const [info, setInfo] = useState({
    breakpoint: 'base',
    width: 0,
    height: 0,
    widthInRem: 0,
    heightInRem: 0,
    remSize: 16,
  });

  useEffect(() => {
    function updateInfo() {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // current rem size
      const remSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
      const widthInRem = width / remSize;
      const heightInRem = height / remSize;

      let breakpoint = 'base';

      // breakpoint detection(rem based)
      if (widthInRem >= 96) breakpoint = '2xl';
      else if (widthInRem >= 80) breakpoint = 'xl';
      else if (widthInRem >= 64) breakpoint = 'lg';
      else if (widthInRem >= 48) breakpoint = 'md';
      else if (widthInRem >= 40) breakpoint = 'sm';
      else breakpoint = 'base';

      setInfo({
        breakpoint,
        width,
        height,
        widthInRem: parseFloat(widthInRem.toFixed(2)),
        heightInRem: parseFloat(heightInRem.toFixed(2)),
        remSize,
      });
    }

    updateInfo();
    window.addEventListener('resize', updateInfo);

    return () => window.removeEventListener('resize', updateInfo);
  }, []);

  return info;
}

export function useBreakpointValue(values) {
  const breakpoint = useBreakpoint();

  // return the value of the current breakpoint or the fallback value
  return (
    values[breakpoint] ??
    values.base ??
    values.sm ??
    values.md ??
    values.lg ??
    values.xl ??
    values['2xl']
  );
}

/**
 * Media Query based breakpoint hook (more accurate way)
 *
 * @param {boolean} debug - debug mode
 * @returns {string} current breakpoint
 */
export function useMediaQueryBreakpoint(debug = false) {
  const [breakpoint, setBreakpoint] = useState('base');

  useEffect(() => {
    // Tailwind의 정확한 미디어 쿼리 정의 (REM 기준)
    const mediaQueries = {
      '2xl': window.matchMedia('(min-width: 96rem)'), // 96rem = 1536px
      xl: window.matchMedia('(min-width: 80rem)'), // 80rem = 1280px
      lg: window.matchMedia('(min-width: 64rem)'), // 64rem = 1024px
      md: window.matchMedia('(min-width: 48rem)'), // 48rem = 768px
      sm: window.matchMedia('(min-width: 40rem)'), // 40rem = 640px
    };

    function updateBreakpoint() {
      let newBreakpoint = 'base';

      // check from largest to smallest (mobile-first approach)
      if (mediaQueries['2xl'].matches) newBreakpoint = '2xl';
      else if (mediaQueries.xl.matches) newBreakpoint = 'xl';
      else if (mediaQueries.lg.matches) newBreakpoint = 'lg';
      else if (mediaQueries.md.matches) newBreakpoint = 'md';
      else if (mediaQueries.sm.matches) newBreakpoint = 'sm';

      if (debug && newBreakpoint !== breakpoint) {
        console.log(`🎯 MediaQuery Breakpoint:`, {
          newBreakpoint,
          previousBreakpoint: breakpoint,
          matches: Object.entries(mediaQueries).reduce((acc, [key, mq]) => {
            acc[key] = mq.matches;
            return acc;
          }, {}),
        });
      }

      setBreakpoint(newBreakpoint);
    }

    // initial execution
    updateBreakpoint();

    // register listener for each media query
    Object.values(mediaQueries).forEach((mq) => {
      mq.addEventListener('change', updateBreakpoint);
    });

    // cleanup
    return () => {
      Object.values(mediaQueries).forEach((mq) => {
        mq.removeEventListener('change', updateBreakpoint);
      });
    };
  }, [debug, breakpoint]);

  return breakpoint;
}
