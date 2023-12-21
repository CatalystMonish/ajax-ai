import { useEffect } from "react";
import { Navigate, Route, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Protected = ({ children }) => {
  const { user } = UserAuth();
  const navigate = useNavigate();

  // Check if there is a saved path in local storage
  const savedPath = sessionStorage.getItem("savedPath");

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default Protected;
