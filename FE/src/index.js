import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router";
import App, { Main } from './App';
import ProblemSet from './ProblemSet';
import ProblemPage from './ProblemPage';
import Login from './Login';
import Signup from './Signup';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Main />} />
        <Route path="problemset" element={<ProblemSet />} />
        <Route path="problem/:id" element={<ProblemPage />} />
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
