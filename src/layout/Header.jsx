import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectIsAuthenticated,
  selectUser,
  logoutAsync,
  selectLoading,
} from "../pages/login/Slice/authSlice";
import { useCallback } from "react";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const loading = useSelector(selectLoading);

  const handleLogout = useCallback(async () => {
    const result = await dispatch(logoutAsync());
    if (result.type === logoutAsync.fulfilled.type) {
      navigate("/login", { replace: true });
    }
  }, [dispatch, navigate]);
  return (
    <header className="bg-white shadow-md border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="text-xl sm:text-2xl md:text-3xl font-extrabold text-blue-600 hover:text-blue-700"
          >
            AddressBook
          </Link>

          <nav className="flex items-center space-x-2 sm:space-x-4 md:space-x-6">
            {isAuthenticated && (
              <Link
                to="/contacts"
                className="text-sm sm:text-base md:text-lg text-gray-700 hover:text-blue-600 transition-colors duration-300"
              >
                Contacts
              </Link>
            )}
            {isAuthenticated ? (
              <div className="flex items-center space-x-2 sm:space-x-4">
                <button
                  onClick={handleLogout}
                  disabled={loading}
                  className="px-3 py-1.5 sm:px-4 sm:py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-red-400 transition-colors duration-300 font-medium text-sm sm:text-base"
                >
                  {loading ? "Logging out..." : "Logout"}
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-sm sm:text-base md:text-lg text-gray-700 hover:text-blue-600 transition-colors duration-300"
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
