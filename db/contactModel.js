const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "user",
    },
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: [true, "Set email for contact"],
    },
    phone: {
      type: String,
      required: [true, "Set phone for contact"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);

const Contact = mongoose.model("Contact", contactSchema);

module.exports = {
  Contact,
};
