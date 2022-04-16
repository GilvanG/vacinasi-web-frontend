import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<App />} index />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
