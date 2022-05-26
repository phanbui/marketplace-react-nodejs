import React, { useState, useCallback, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import MainNavigation from "./shared/components/MainNavigation";
import AllListings from "./listings/pages/AllListings";
import Listing from "./listings/pages/Listing";
import NewListing from "./listings/pages/NewListing";
import EditListing from "./listings/pages/EditListing";
import MyListings from "./listings/pages/MyListings";
import Login from "./users/pages/Login";
import Register from "./users/pages/Register";
import { AuthContext } from "./shared/context/auth-context";

function App() {
  const [userId, setUserId] = useState();
  const [token, setToken] = useState();

  useEffect(() => {
    const stored_user_data = JSON.parse(localStorage.getItem("userData"));
    if (stored_user_data) {
      login(stored_user_data.userId, stored_user_data.token);
    }
  }, []);

  const login = useCallback((id, token) => {
    setToken(token);
    setUserId(id);
    localStorage.setItem(
      "userData",
      JSON.stringify({ userId: id, token: token })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem("userData");
  }, []);

  let routes;
  if (token) {
    routes = (
      <React.Fragment>
        <Route path="/" element={<AllListings />} />
        <Route path="/listings" element={<AllListings />} />
        <Route path="/listings/mylistings" element={<MyListings />} />
        <Route path="/listings/new" element={<NewListing />} />
        <Route path="/listings/:listingId" element={<Listing />} />
        <Route path="/listings/:listingId/edit" element={<EditListing />} />
      </React.Fragment>
    );
  } else {
    routes = (
      <React.Fragment>
        <Route path="/" element={<AllListings />} />
        <Route path="/listings" element={<AllListings />} />
        <Route path="/listings/:listingId" element={<Listing />} />
        <Route path="/users/login" element={<Login />} />
        <Route path="/users/register" element={<Register />} />
      </React.Fragment>
    );
  }
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <BrowserRouter>
        <MainNavigation />
        <Routes>{routes}</Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
