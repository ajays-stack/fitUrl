import { nanoid } from "nanoid";
import Url from "../model/url.js";
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

export  {short,getredirect}