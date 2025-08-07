import React, { useContext } from 'react';
import upload from '../assets/upload.png';
import axios from 'axios';
import { urlcontext } from '../context/Context';
import { toast } from 'react-toastify';


const Upload = ({ image, setImage }) => {
  const { token } = useContext(urlcontext);

  const handleUpload = async () => {
    if (!image) return alert("Please select an image first.");
//form data can store binary file as multipart/form data
    const formData = new FormData();
    formData.append("image", image); // backend should expect 'image'

    try {
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/url/image/upload", // add endpoint if needed
        formData,
     
        {headers:{Authorization: `Bearer ${token}`}}
      );

if(res.data.success){

  toast.success("Image Uploaded")
  setImage('');
}
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  return (
    <div className="flex flex-col items-center gap-10 justify-center">
      <div className="bg-white w-[400px] h-[200px] flex flex-col rounded-full justify-center items-center">
        <label htmlFor="image">
   <img
   //url.createObjectURL is used to displayimage or video before upload
            src={image ? URL.createObjectURL(image) : upload}
            className="w-[100px] h-[100px] object-contain"
            alt="upload preview"
          />
        </label>
        <input
          id="image"
          className="w-[200px] hidden text-black"
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </div>
      <button
        onClick={handleUpload}
        className="bg-gray-800 text-white px-4 py-2 rounded-xl"
      >
        Click here
      </button>
      <h1>Convert your image to URL</h1>
    </div>
  );
};

export default Upload;
