import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter } from "react-router-dom";
import SignIn from "../pages/SignIn";

describe("Sign In Page", () => {
  const mockStore = configureStore();
  const initialState = {
    login: {
      isAuth: false,
    },
    profile: {
      firstName: "",
    },
  };
  const store = mockStore(initialState);

  it("displays the Sign In form fields", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SignIn />
        </BrowserRouter>
      </Provider>
    );

    // Find the email and password input fields
    const emailInput = screen.getByLabelText("Username");
    const passwordInput = screen.getByLabelText("Password");

    // Verify that the input fields are present
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it("allows user to input email and password", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SignIn />
        </BrowserRouter>
      </Provider>
    );

    // Find the email and password input fields
    const emailInput = screen.getByLabelText("Username");
    const passwordInput = screen.getByLabelText("Password");

    // Simulate user input
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    // Verify that the input values are set correctly
    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("password123");
  });
});
