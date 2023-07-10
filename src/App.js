import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import ProfilePage from "./pages/ProfilePage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<SignInPage />} />
        <Route path="/profile" element={<ProfilePage />} />

        {/* Add more routes for additional pages */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
