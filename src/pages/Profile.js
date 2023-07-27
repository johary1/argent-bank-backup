import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userDatas, getTokenFromStorage } from "../services/userAuthApi";
import {
  profileFirstName,
  profileLastName,
  profileError,
} from "../features/ProfileSlice";

import UserForm from "../components/UserForm";
import ProfileAccounts from "../components/ProfileAccounts";

const Profile = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.login);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isAuth) {
          const data = await userDatas();
          console.log(data);
          dispatch(profileFirstName(data.body.firstName));
          dispatch(profileLastName(data.body.lastName));
        }
      } catch (error) {
        // Handle error case here
        if (error.response) {
          dispatch(profileError(error.response.data.message));
        } else {
          dispatch(profileError("Failed to fetch profile data."));
        }
      }
    };

    fetchData();
  }, [dispatch, isAuth]);

  //Handle the case when the user is not authenticated
  if (!isAuth) {
    navigate("/login"); // Redirect to login page or show a message
    return null;
  }

  return (
    <main className="main bg-dark">
      <UserForm />
      <ProfileAccounts />
    </main>
  );
};

export default Profile;
