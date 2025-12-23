import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/authSliceTunk/authTunk.js";
import { useNavigate,Link } from "react-router";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  // Redirect to home after logout
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/"); // redirect to Home.jsx
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="flex flex-col items-center p-5 min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 bg-white rounded-xl shadow-md text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome, {user?.name}</h1>
        <p className="mb-6">You are now logged in.</p>
        <Link
          to="/projects/insertProjects"
          className="px-6 py-2 m-1 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          InsertProjects
        </Link>
        <button
          onClick={handleLogout}
          className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
