//@ts-check
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import store from "./store";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import SignIn from "./pages/loginPage/SignIn";
import Footer from "./components/Footer";
import Profile from "./pages/profilePage/Profile";
import Error from "./pages/Error";
import PrivateRoute from "./components/PrivateRoute";
import { Provider } from "react-redux";

/**
 *
 * @returns {React.ReactElement} JSX.Element - the user main page with API data
 */
const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <section className="elementsToDisplay">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/loginPage/signIn" element={<SignIn />} />
            <Route path="/profilePage/Profile" element={<PrivateRoute />}>
              <Route path="/profilePage/Profile" element={<Profile />} />
            </Route>
            <Route path="*" element={<Error />} />
          </Routes>
        </section>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
