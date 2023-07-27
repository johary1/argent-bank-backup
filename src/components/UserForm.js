import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  profilePending,
  profileFirstName,
  profileLastName,
  profileError,
} from "../features/ProfileSlice";
import { userUpdate } from "../services/userAuthApi";
import DOMPurify from "dompurify";

const UserForm = () => {
  const dispatch = useDispatch();
  const { firstName, lastName } = useSelector((state) => state.profile);

  const [editButton, setEditButton] = useState(false);
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");

  useEffect(() => {
    if (firstName && lastName) {
      setUserFirstName(firstName);
      setUserLastName(lastName);
    }
  }, [firstName, lastName]);

  const handleFirstNameChange = (e) => {
    setUserFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setUserLastName(e.target.value);
  };

  const editNameButton = (e) => {
    e.preventDefault();
    setEditButton((current) => !current);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // Sanitize the input values before making the API request to prevent from XSS attack
    const sanitizedFirstName = DOMPurify.sanitize(userFirstName);
    const sanitizedLastName = DOMPurify.sanitize(userLastName);
    console.log(sanitizedFirstName.length);

    if (!sanitizedFirstName || !sanitizedLastName) {
      // Prevent submitting empty values to the API
      return;
    }
    dispatch(profilePending());
    try {
      const newUser = await userUpdate({
        firstName: sanitizedFirstName,
        lastName: sanitizedLastName,
      });
      dispatch(profileFirstName(newUser.body.firstName));
      dispatch(profileLastName(newUser.body.lastName));
      setEditButton((current) => !current);
    } catch (error) {
      dispatch(profileError("Failed to update profile."));
    }
  };

  return (
    <div className="header">
      {!editButton ? (
        <>
          <h1>
            Welcome back
            <br />
            {firstName} {lastName} !
          </h1>
          <button onClick={editNameButton} className="edit-button">
            Edit Name
          </button>
        </>
      ) : (
        <form className="editNameContent" onSubmit={submitHandler}>
          <div className="headerUserContentSave">
            <input
              className="InputfirstName"
              type="text"
              placeholder={firstName}
              value={userFirstName}
              name="firstName"
              onChange={handleFirstNameChange}
              autoComplete="off"
              required
            />
            <button className="edit-button" type="submit">
              Save
            </button>
          </div>
          <div className="headerUserContentCancel">
            <input
              className="inputLastName"
              type="text"
              placeholder={lastName}
              value={userLastName}
              name="lastName"
              onChange={handleLastNameChange}
              autoComplete="off"
              required
            />
            <button className="edit-button" onClick={editNameButton}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UserForm;
