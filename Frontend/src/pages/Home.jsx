import React, { useState } from "react";
import { FaLink } from "react-icons/fa";
import Search from "../components/Search";
import Description from "../components/Description";
import Card from "../components/Card";
import { useContext } from "react";
import { urlcontext } from "../context/Context";
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

import Imagetourl from "./Imagetourl";

const Home = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { token } = useContext(urlcontext);
  return (
    <div  className="h-full">
      {/* User Icon & Dropdown */}
      <div className="absolute top-4 right-4 z-50">
        <div
          className="cursor-pointer"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <FaRegUserCircle size={30} />
        </div>

        {dropdownOpen && (
          <div className="mt-2 absolute right-5 bg-gray-800 rounded-xl shadow-lg py-2 w-32 transition-all duration-300 ease-in-out">
            {token ? (
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.reload();
                }}
                className="block text-center py-2 px-9 hover:text-white hover:bg-gray-700 rounded-xl cursor-pointer text-gray-200"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="block text-center py-2 hover:text-white hover:bg-gray-700 rounded-xl cursor-pointer text-gray-200"
                onClick={() => setDropdownOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center flex-col gap-10">
        <Search />
        <Imagetourl></Imagetourl>
        <Description />
        <hr className="border-t-2 border-dashed border-white my-4 w-full" />
        <Card />
      </div>
    </div>
  );
};

export default Home;
