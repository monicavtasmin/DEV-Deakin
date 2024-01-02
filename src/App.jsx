import React from "react";
import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "./components/layout/layout";
import Help from "./pages/help";
import Home from "./pages/home";
import Login from "./pages/login";
import Plan from "./pages/plan";
import Post from "./pages/post";
import Register from "./pages/register";
import Success from "./pages/success";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoutes>
            <Home />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/post"
        element={
          <ProtectedRoutes>
            <Post />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/plan"
        element={
          <ProtectedRoutes>
            <Plan />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/help"
        element={
          <ProtectedRoutes>
            <Help />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/success"
        element={
          <ProtectedRoutes>
            <Success />
          </ProtectedRoutes>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

function ProtectedRoutes({ children }) {
  const token = localStorage.getItem("deakintoken");
  if (!token) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
}

export default App;
