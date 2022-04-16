import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<App />} index />
        <Route element={<App />} path="schedules" />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
