import { BrowserRouter } from "react-router-dom";

import "./App.css";

import { MainRouter } from "./router/MainRouter";

export const App = () => {
  return (
    <BrowserRouter>
      <MainRouter />
    </BrowserRouter>
  );
};

export default App;
