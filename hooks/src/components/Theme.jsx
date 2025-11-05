import { useContext } from "react";
import { ThemeContext } from "./Context";

const Theme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) return null;

  const { state, toggleTheme } = ctx;

  return (
    <div>
      <h1>Current Theme: {state.theme}</h1>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

export default Theme;
