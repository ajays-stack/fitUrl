import Url from "../model/url.js";

const getdata = async (req, res) => {
  const { user } = req.query;


  try {
    const data = await Url.find({ user });

    if (!data || data.length === 0) {
      return res.status(404).json({ success: false, message: "No data found." });
    }

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error(" Server error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export default getdata;
