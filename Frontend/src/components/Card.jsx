import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { urlcontext } from "../context/context";
import { toast } from "react-toastify";
import { TbCopy } from "react-icons/tb";
import { MdDeleteForever } from "react-icons/md";

const Card = () => {
  const [data, setData] = useState([]);
  const { search, setSearch ,token} = useContext(urlcontext);

  async function deleteHandler(id) {
    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/url/delete",
        { id }
      );
      if (response.data.success) {
         toast.success("url deleted successfully")
        setSearch(!search);
       
      } else {
        toast.error("error the url is not delted");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/url/getdata`,
          {
            params: { user: "singhajay9968@gmail.com" },
            withCredentials: true,
          }
        );
        setData(response.data.data); // ✅ use nested data
      } catch (err) {
        console.error("Fetch failed:", err.message);
      }
    };

    fetchData();
  }, [search]);

  //using clipboard api
  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("copied");
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="w-full">
      <div className="mx-20 flex flex-col items-center gap-5 border border-gray-400 rounded-md  pb-10 mb-20">
        <div className="w-full px-5 py-5">
          <h1>Recent URLs</h1>
          <p>Your recently shortened URLs</p>
        </div>

       {data.length==0?(<p>Empty! try shortening</p>):(data.map((item, index) => (
          <div
            key={index}
            className="border border-gray-400 rounded-md px-5 py-5 w-[90%] bg-gray-300 text-black"
          >
            <div className="mb-5">
              <h1>Original URL</h1>
              <div className="flex justify-between mt-2 flex-col md:flex-row md:mt-0">
                <p>{item.redirectUrl}</p>
                <span className="text-sm">{`${item.views} clicks`}</span>
              </div>
            </div>
            <hr />
            <div className="mt-5">
              <div className="flex justify-between">
                <h1>Short URL:</h1>
                <span onClick={() => deleteHandler(item._id)}>
                  <MdDeleteForever />
                </span>
              </div>
              <div className="flex flex-col md:flex-row mt-2 md:mt-0 justify-between  gap-2">
                <p className="truncate max-w-[60%] text-blue-700 underline">
                  {`http://localhost:4000/url/${item.shortId}`}
                </p>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">
                    {new Date(item.createdAt).toDateString()}
                  </span>
                  <button
                    className="text-gray-600 p-1 rounded hover:bg-blue-600 hover:text-white transition"
                    onClick={() =>
                      handleCopy(`http://localhost:4000/url/${item.shortId}`)
                    }
                  >
                    <TbCopy size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )))} 
      </div>
    </div>
  );
};

export default Card;
