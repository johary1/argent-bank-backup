import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import ConnectedUser from "./pages/ConnectedUser";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/user" element={<ConnectedUser />} />

        {/* Add more routes for additional pages */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
