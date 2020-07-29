import { useMediaQuery, useTheme } from '@material-ui/core';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';

type DefaultParam = Breakpoint | number;

export default function useBreakpoints() {
  const theme = useTheme();

  function useUp(key: DefaultParam): boolean {
    return useMediaQuery(theme.breakpoints.up(key));
  }

  function useDown(key: DefaultParam): boolean {
    return useMediaQuery(theme.breakpoints.down(key));
  }

  function useBetween(start: DefaultParam, end: DefaultParam): boolean {
   return useMediaQuery(theme.breakpoints.between(start, end));
  }

  function useOnly(key: Breakpoint): boolean {
    return useMediaQuery(theme.breakpoints.only(key));
  }

  return {
    up: useUp,
    down: useDown,
    between: useBetween,
    only: useOnly,
  };
}
