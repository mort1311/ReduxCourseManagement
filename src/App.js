
import './App.css';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
import { Routes, Route } from 'react-router-dom'
import Header from './components/common/Header'
import CoursePage from './components/courses/CoursePage';
import React from 'react'
import ManageCoursePage from './components/courses/ManageCoursePage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className='container-fluid'>
      <Header></Header>
        <Routes>
          <Route exact path='/' element={<HomePage/>}/>
          <Route path='/about' element={<AboutPage/>}/>
          <Route path='/courses' element={<CoursePage/>}/>
          <Route path='/course/:slug' element={<ManageCoursePage/>}/>          
          <Route path='/course' element={<ManageCoursePage/>}/>
        </Routes>
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;
