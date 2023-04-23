import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext"
import Home from "./pages/Home/Home";
import Login from "./pages/Authenticate/Login/Login";
import Register from "./pages/Authenticate/Register/Register";
import Search from "./pages/Search/Search";
import CreateRecipe from "./pages/CreateRecipe/CreateRecipe";
import ResetPassword from './pages/Authenticate/ResetPassword/ResetPassword';
import ForgotPassword from './pages/Authenticate/ForgotPassword/ForgotPassword';
import Profile from './pages/Profile/Profile';
import Cookbook from './pages/Cookbook/Cookbook'


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="password-reset" element={<ResetPassword />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="create-recipe" element={<CreateRecipe />} />
          <Route path="profile" element={<Profile />} />
          <Route path="cookbook" element={<Cookbook/>} />
          <Route path="search" element={<Search />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
