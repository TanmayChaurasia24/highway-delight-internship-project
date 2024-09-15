import React from 'react';
import  { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Dashboard';
import Signup from './components/Signup';
import Login from './components/Login';
const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<Signup></Signup>}></Route>
          <Route path='/signup' element={<Signup></Signup>}></Route>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/home' element={<Home></Home>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
