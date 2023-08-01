import React from 'react';
import { HashRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import "./App.css";
import Pokedex from "./components/Pokedex";
import PokedexInfo from "./components/PokedexInfo";
import ProtectedRoutes from "./components/ProtectedRoutes";
import logo from './images/pokemon-logo.png'


function App() {
  return (
    
    <HashRouter>
      <div className="App">
      <img src={logo} alt="logo pokemon"/>
      
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/pokedex" element={<Pokedex />} />
            <Route path="/pokedex/:id" element={<PokedexInfo />} />
          </Route>

        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;