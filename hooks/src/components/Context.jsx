/**
 * Purpose: Share data across component tree without prop drilling, providing global state management.
 *
 * Key Concepts:
 * 
 * Create context with createContext()
 * Wrap components with Provider to share values
 * Consume context with useContext hook in functional components
 * Avoids passing props through intermediate components
 *
 *
 * When TO use:
 *
 * User authentication state
 * Theme preferences
 * Language/localization settings
 * Global configuration shared by many components
 * Avoiding prop drilling through multiple component levels
 */

import { createContext, useCallback, useMemo, useReducer } from "react";

const initialState = {
  theme: "light",
};

const ACTIONS = {
  TOGGLE_THEME: "toggle-theme",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.TOGGLE_THEME:
      return {
        ...state,
        theme: state.theme === "light" ? "dark" : "light",
      };
    default:
      return state;
  }
};

const ThemeContext = createContext(initialState);

const ThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const toggleTheme = useCallback(() => {
    dispatch({ type: ACTIONS.TOGGLE_THEME });
  }, []);

  const value = useMemo(() => ({ state, toggleTheme }), [state, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
