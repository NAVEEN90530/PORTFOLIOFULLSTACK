import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import API from "../api/api";

export default function PrivateRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    API.get("/auth/me")
      .then(() => {
        setAuthorized(true);
        setLoading(false);
      })
      .catch(() => {
        setAuthorized(false);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Checking authentication...</p>;

  return authorized ? children : <Navigate to="/admin/login" />;
}
