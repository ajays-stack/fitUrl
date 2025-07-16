import Url from "../model/url.js";


const handleDelete = async (req, res) => {
  try {
    const id = req.body.id;

    if (!id) {
      return res.status(400).send({ success: false, message: "ID missing" });
    }

    const deleted = await Url.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).send({ success: false, message: "URL not found" });
    }

    return res.send({ success: true, message: "URL deleted" });

  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Server error" });
  }
};

export default handleDelete;

