import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import ListSchedule from './pages/Schedule/List';
import CreateSchedule from './pages/Schedule/Create';
import { FormCreateProvider } from './contexts/CreateScheduleFormik';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            element={(
              <FormCreateProvider>
                <CreateSchedule />
              </FormCreateProvider>
            )}
            index
          />
          <Route element={<ListSchedule />} path="schedules" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
