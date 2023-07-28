import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userDatas } from "../services/userAuthApi";
import {
  profileFirstName,
  profileLastName,
  profileError,
} from "../features/ProfileSlice";

import UserForm from "../components/UserForm";
import ProfileAccounts from "../components/ProfileAccounts";
import { logingSuccess } from "../features/LoginSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.login);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isAuth) {
          const data = await userDatas();
          //make data persistent on refresh
          dispatch(profileFirstName(data.body.firstName));
          dispatch(profileLastName(data.body.lastName));
          dispatch(logingSuccess());
          navigate("/profile");
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
  }, [dispatch, isAuth, navigate]);

  return (
    <main className="main bg-dark">
      <UserForm />
      <ProfileAccounts />
    </main>
  );
};

export default Profile;
