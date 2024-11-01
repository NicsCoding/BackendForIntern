const express = require("express");
const multer = require("multer");
const {
  getEventById,
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controller/allMethods");
const path = require("path");
const router = express.Router();
const dir = path.resolve(__dirname, "../uploads");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });
console.log("I am here");
router.get("/events", getEvents);
router.get("/events/:id", getEventById);
router.post("/events", upload.single("image"), createEvent);
router.put("/events/:id", updateEvent);
router.delete("/events/:id", deleteEvent);

module.exports = router;
