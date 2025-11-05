// src/App.jsx
import { useContext } from "react";
import { ThemeProvider, ThemeContext } from "./components/Context";
import Callback from "./components/Callback";
import Ref from "./components/Ref";
import Reducer from "./components/Reducer";
import Theme from "./components/Theme";
import Memo from "./components/Memo";
import "./app.css";

function InnerApp() {
  const { state } = useContext(ThemeContext);
  return (
    <div className={`theme-${state.theme}`}>
      <Callback />
      <Ref />
      <Reducer />
      <Memo />
      <Theme />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <InnerApp />
    </ThemeProvider>
  );
}
