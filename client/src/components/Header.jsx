import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();

  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex items-center">
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Mern Auth
            </span>
          </Link>
          <div className="flex items-center lg:order-2">
            {currentUser ? (
              <Link to="/profile">
                <img
                  src={currentUser.profilePhoto}
                  alt="profile"
                  className="h-11 w-11 rounded-full object-cover"
                />
              </Link>
            ) : (
              <Link
                to="/signin"
                className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
              >
                Log in
              </Link>
            )}

            {/* Mobile menu toggle button */}
            {/* ... (existing code) ... */}
          </div>
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0 items-center">
              <li>
                <Link
                  to="/"
                  className={`block py-2 pr-4 pl-3 rounded lg:p-0 ${
                    location.pathname === "/"
                      ? "text-white bg-primary-700 lg:bg-transparent lg:text-primary-700 dark:text-white"
                      : "text-gray-700 hover:bg-gray-50 lg:hover:bg-transparent lg:hover:text-primary-700 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white"
                  }`}
                  aria-current={location.pathname === "/" ? "page" : undefined}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className={`block py-2 pr-4 pl-3 border-b border-gray-100 lg:border-0 ${
                    location.pathname === "/about"
                      ? "text-white bg-primary-700 lg:bg-transparent lg:text-primary-700 dark:text-white"
                      : "text-gray-700 hover:bg-gray-50 lg:hover:bg-transparent lg:hover:text-primary-700 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white"
                  }`}
                  aria-current={
                    location.pathname === "/about" ? "page" : undefined
                  }
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
