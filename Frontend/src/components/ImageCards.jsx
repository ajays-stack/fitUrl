import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { urlcontext } from "../context/Context";
import { toast } from "react-toastify";
import { TbCopy } from "react-icons/tb";
import { MdDeleteForever } from "react-icons/md";
import { IoShareSocial } from "react-icons/io5";
const ImageCards = ({ image }) => {
  const [data, setData] = useState([]);
  const { token } = useContext(urlcontext);

  const handleShare = async (url) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check this out!",
          text: "Here’s a short link from FitURL:",
          url,
        });
        console.log("Shared successfully");
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      alert("Sharing not supported on this browser. Copy the link instead.");
    }
  };

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied");
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const fetchData = async () => {
    if (token) {
      console.log(token);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/url/image/fetch`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data.data || []);
      } catch (err) {
        console.error("Fetch failed:", err.message);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [token, image]);

  const deleteHandler = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/url/image/delete`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            id,
          },
        }
      );

      if (response.data.success) {
        toast.success("Image deleted successfully");

        setData((prev) => prev.filter((item) => item._id !== id));
      } else {
        toast.error("Error: Image was not deleted");
      }
    } catch (error) {
      console.log(error);
      toast.error("Server error while deleting");
    }
  };

  return (
    <div className="w-full">
      <div className="mx-20 flex flex-col items-center gap-5 border border-gray-400 rounded-md pb-10 mb-20">
        <div className="w-full px-5 py-5">
          <h1>Recent URLs</h1>
          <p>Your Images URLs</p>
        </div>

        {data.length === 0 ? (
          <p>Empty! Try converting image.</p>
        ) : (
          data.map((item) => (
            <div
              key={item._id}
              className="border border-gray-400 rounded-md px-5 py-5 w-[90%] bg-gray-300 text-black overflow-hidden"
            >
              <div className="mt-5 flex flex-col justify-center md:items-center md:flex-row md:justify-between">
                <div className="pb-4" ><img src={item.url} className="w-[100px] h-[100px] rounded-xl "></img></div>
                <div>
                  <div className="flex justify-between">
                    <h1>Image URL:</h1>
                    <div className="flex gap-2 items-center justify-center">
                      <button onClick={() => handleShare(item.url)}>
                        <IoShareSocial />
                      </button>

                      <span onClick={() => deleteHandler(item._id)}>
                        <MdDeleteForever />
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row mt-2 md:mt-0 justify-between gap-2">
                    <p className="truncate max-w-[60%] text-blue-700 underline">
                      {item.url}
                    </p>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">
                        {new Date(item.createdAt).toDateString()}
                      </span>
                      <button
                        className="text-gray-600 p-1 rounded hover:bg-blue-600 hover:text-white transition"
                        onClick={() => handleCopy(item.url)}
                      >
                        <TbCopy size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ImageCards;
