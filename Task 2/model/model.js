const mongoose = require("mongoose");

const nudgeSchema = new mongoose.Schema(
  {
    eventTag: { type: String, required: true },
    title: { type: String, required: true, maxlength: 60 },
    image: { type: String },
    scheduledDate: { type: Date },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    description: { type: String },
    icon: { type: String },
    invitationText: { type: String },
  },
  {
    timestamps: true,
  }
);

exports.Nudge = mongoose.model("Nudge", nudgeSchema);
