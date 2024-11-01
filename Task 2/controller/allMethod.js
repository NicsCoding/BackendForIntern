const Getter = require("../model/model");
const Nudge = Getter.Nudge;
// Create a new nudge
exports.createEvent = async (req, res) => {
  try {
    const nudge = new Nudge(req.body);
    await nudge.save();
    res.status(201).json({ status: "success", data: nudge });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};
exports.getAll = async (req, res) => {
  try {
    console.log("was here");
    const nudge = await Nudge.find();
    if (!nudge)
      return res
        .status(404)
        .json({ status: "error", message: "Nudge not found" });
    res.json({ status: "success", data: nudge });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};
// Get a specific nudge by ID
exports.getByid = async (req, res) => {
  try {
    const nudge = await Nudge.findById(req.params.id);
    if (!nudge)
      return res
        .status(404)
        .json({ status: "error", message: "Nudge not found" });
    res.json({ status: "success", data: nudge });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

// Update a specific nudge by ID
exports.putMethod = async (req, res) => {
  try {
    const nudge = await Nudge.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // return the updated document
      runValidators: true, // ensure that the data follows model validation
    });

    if (!nudge)
      return res
        .status(404)
        .json({ status: "error", message: "Nudge not found" });

    res.json({ status: "success", data: nudge });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

// Delete a specific nudge by ID
exports.deleteMethod = async (req, res) => {
  try {
    const nudge = await Nudge.findByIdAndDelete(req.params.id);
    if (!nudge)
      return res
        .status(404)
        .json({ status: "error", message: "Nudge not found" });
    res.json({ status: "success", message: "Nudge deleted successfully." });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};
