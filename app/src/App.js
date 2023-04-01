import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Authenticate/Login/Login";
import Register from "./pages/Authenticate/Register/Register";
import NoPage from "./pages/NoPage/NoPage";
import CreateRecipe from "./pages/CreateRecipe/CreateRecipe";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="create-recipe" element={<CreateRecipe />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
