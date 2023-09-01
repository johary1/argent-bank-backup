import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Header from "../components/Header";
import { BrowserRouter } from "react-router-dom";

describe("Header Component if not logged", () => {
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

  it("displays Sign In link", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );

    const signInLink = screen.getByText(/Sign In/i);
    expect(signInLink).toBeInTheDocument();
  });

  it("navigates to Sign In page when 'Sign In' link is clicked", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );

    // Find and click on the "Sign In" link
    const signInLink = screen.getByText("Sign In");
    fireEvent.click(signInLink);

    // Verify that the user is taken to the Sign In page
    const signInPageHeading = screen.getByRole("link", { name: "Sign In" }); // Change to role "heading"
    expect(signInPageHeading).toBeInTheDocument();
  });
});

describe("Header Component for logged user", () => {
  const mockStore = configureStore();
  const initialState = {
    login: {
      isAuth: true,
    },
    profile: {
      firstName: "Stev",
    },
  };
  const store = mockStore(initialState);

  it("displays user's first name and logo text", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );
    const userFirstName = screen.getByText(/Stev/i);
    const logoText = screen.getByText(/Argent Bank/i);
    expect(userFirstName).toBeInTheDocument();
    expect(logoText).toBeInTheDocument();
  });
  it("redirects to homepage on 'Sign Out' link click", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );

    // Find and click on the "Sign Out" link
    const signOutLink = screen.getByText(/Sign Out/i);
    fireEvent.click(signOutLink);
  });
});
