import React from 'react';
import App from './App';
import Add from './Add';
import Edit from './Edit';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function AppRouter() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<App />} />
        <Route path='/create' element={<Add />} />
        <Route path='/edit/:id' element={<Edit />} />
    </Routes>
    </BrowserRouter>
  )
}

export default AppRouter