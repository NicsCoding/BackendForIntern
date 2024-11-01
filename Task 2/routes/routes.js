const express = require("express");
const methodHandler = require("../controller/allMethod");
const router = express.Router();
router.get("/events", methodHandler.getAll);
router.get("/events/:id", methodHandler.getByid);
router.post("/events", methodHandler.createEvent);
router.put("/events/:id", methodHandler.putMethod);
router.delete("/events/:id", methodHandler.deleteMethod);

module.exports = router;
