import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import { Layout } from './components/Layout';
import CreateSchedule from './pages/Schedule/Create';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<CreateSchedule />} index />
          <Route element={<App />} path="schedules" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
