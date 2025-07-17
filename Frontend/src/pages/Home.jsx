import React, { useState } from "react";
import { FaLink } from "react-icons/fa";
import Search from "../components/Search";
import Description from "../components/Description";
import Card from "../components/Card";
import { useContext } from "react";
import { urlcontext } from "../context/context";
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Home = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { token } = useContext(urlcontext);
  return (
    <div>
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
        <div className="my-10 flex justify-center flex-col items-center w-full gap-4">
          <h1 className="flex items-center justify-center gap-4">
            <FaLink className="inline h-[20px] w-[20px] md:h-[40px] md:w-[40px]" />
            <span className="text-3xl md:text-5xl pb-4">ShortLink</span>
          </h1>
          <p className="text-gray-200 text-xs sm:text-sm md:text-2xl">
            Transform your long URLs into short, shareable links in seconds
          </p>
          <hr className="border-t-2 border-dashed border-white my-4 w-full" />
        </div>

        <Search />
        <Description />
        <hr className="border-t-2 border-dashed border-white my-4 w-full" />
        <Card />
      </div>
    </div>
  );
};

export default Home;
