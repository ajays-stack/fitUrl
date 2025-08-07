import { nanoid } from "nanoid";
import Url from "../model/url.js";
import Images from "../model/image.js";
import cloudinary from "../config/cloudinary.js";
const short = async (req, res) => {
  const { url } = req.body;
  const user=req.user;

  try {
    //we are checking if the url is already present then give response to user
    const check = await Url.find({ redirectUrl: url, user });

    if (check.length > 0) {
      return res.send({ success: "alreadypresent" });
    }

    const shortId = nanoid(8);

    await Url.create({
      shortId,
      redirectUrl: url,
      user,
      views: 0
    });

    res.send({ success: true });

  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};



const getredirect = async (req, res) => {
  const id = req.params.id;

  try {
    const info = await Url.findOneAndUpdate(
      { shortId: id },
      { $inc: { views: 1 } }, // increment views
      { new: true }           // return the updated document
    );

    if (!info) {
      return res.status(404).send("URL not found");
    }

 const url = info.redirectUrl.trim();


    // Add protocol if missing
   
    if (url.startsWith("https://") || url.startsWith("http://")) {
      return res.redirect(url);
    } else {
      return res.redirect("http://" + url);
    }

  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
};



export const imageupload = async (req, res) => {
 
  const file = req.file;

  if (!file) {
    return res.status(400).json({ success: false, message: "File is not uploaded" });
  }

  const  email  = req.user;

  try {
    // Upload image to Cloudinary
    const response = await cloudinary.uploader.upload(
      `data:${file.mimetype};base64,${file.buffer.toString('base64')}`,
      { folder: "uploads" } // Optional
    );

    const url = response.secure_url;

    // Save to MongoDB
    const image = new Images({ email,url });
    const result = await image.save();

    

    return res.status(200).json({ success: true, data: result });

  } catch (error) {
    console.error("Error uploading image:", error);
    return res.status(500).json({ success: false, message: "Upload failed", error });
  }
};

export const getimagedata = async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ success: false, message: "User is not valid" });
  }

  try {
    const data = await Images.find({ email: user }); // Assuming user has 'email' field

    if (!data || data.length === 0) {
      return res.status(404).json({ success: false, message: "No images found" });
    }
   

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const deleteimage = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ success: false, message: "Image ID is required" });
  }

  try {
    //returns an object having information about deleting one of wich is delete count
    const result = await Images.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ success: false, message: "Image not found" });
    }

    return res.status(200).json({ success: true, message: "Deleted successfully" });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export  {short,getredirect}