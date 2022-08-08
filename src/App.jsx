import { useState } from 'react'
import './App.css'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { Home, Login, ProductDetails, Purchases } from './pages'
import { NavBar, LoadingScreen } from './components'
import { useSelector } from 'react-redux'

function App() {

  const isLoading = useSelector(state => state.isLoading);

  return (
    <HashRouter>
      <NavBar/>
      {isLoading && <LoadingScreen/>}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/products/:id' element={<ProductDetails/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/purchases' element={<Purchases/>}/>
      </Routes>
    </HashRouter>
  )
}

export default App
