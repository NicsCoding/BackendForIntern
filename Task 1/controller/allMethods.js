const { ObjectId } = require("mongodb");

const handleError = (res, err) => {
  console.error(err);
  res.status(500).json({ message: "Server error", error: err.message });
};

const isValidObjectId = (id) => ObjectId.isValid(id);

exports.getEventById = async (req, res) => {
  const { id } = req.params;
  const db = req.app.locals.db;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid event ID" });
  }

  try {
    const event = await db
      .collection("events")
      .findOne({ _id: new ObjectId(id) });
    if (event) {
      res.status(200).json(event);
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (err) {
    handleError(res, err);
  }
};

exports.getEvents = async (req, res) => {
  const { type, limit = 5, page = 1 } = req.query;
  const db = req.app.locals.db;

  try {
    const events = await db
      .collection("events")
      .find(type ? { type } : {})
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .toArray();
    res.status(200).json(events);
  } catch (err) {
    handleError(res, err);
  }
};

exports.createEvent = async (req, res) => {
  const eventData = {
    type: "event",
    uid: req.body.uid,
    name: req.body.name,
    tagline: req.body.tagline,
    schedule: new Date(),
    description: req.body.description,
    files: { image: req.file ? req.file.path : null },
    moderator: req.body.moderator,
    category: req.body.category,
    sub_category: req.body.sub_category,
    rigor_rank: parseInt(req.body.rigor_rank),
    attendees: [],
  };
  const db = req.app.locals.db;
  try {
    const result = await db.collection("events").insertOne(eventData);
    res.status(201).json({ id: result.insertedId });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.updateEvent = async (req, res) => {
  const { id } = req.params;
  const db = req.app.locals.db;
  const updatedData = req.body;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid event ID" });
  }

  try {
    const result = await db
      .collection("events")
      .updateOne({ _id: ObjectId(id) }, { $set: updatedData });
    if (result.matchedCount > 0) {
      res.status(200).json({ message: "Event updated" });
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (err) {
    handleError(res, err);
  }
};

exports.deleteEvent = async (req, res) => {
  const { id } = req.params;
  const db = req.app.locals.db;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid event ID" });
  }

  try {
    const result = await db
      .collection("events")
      .deleteOne({ _id: ObjectId(id) });
    if (result.deletedCount > 0) {
      res.status(200).json({ message: "Event deleted" });
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (err) {
    handleError(res, err);
  }
};
