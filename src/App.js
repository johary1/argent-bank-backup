import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthStatus } from "./features/LoginSlice";
import { isAuthenticated, userDatas } from "./services/userAuthApi";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import SignIn from "./pages/SignIn";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";
import Error from "./pages/Error";
import PrivateRoute from "./components/PrivateRoute";
import { profileFirstName } from "./features/ProfileSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // keeped logged in though page refresh or opening new tab on browser leaning on authToken and isAuthenticated value
    const handlePersistentAuth = async () => {
      const storedAuthStatus = localStorage.getItem("authToken");
      if (storedAuthStatus && isAuthenticated()) {
        try {
          const userData = await userDatas();
          // update auth status in the Redux store
          dispatch(setAuthStatus(true));
          dispatch(profileFirstName(userData.body.firstName));
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        dispatch(setAuthStatus(false));
      }
    };

    handlePersistentAuth();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Header />
      <section className="elementsToDisplay">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<SignIn />} />
          {/* profile page is only accessible if user is connected */}
          <Route exact path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </section>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
