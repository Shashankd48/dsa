const mongoose = require("mongoose");

const WordSchema = new mongoose.Schema({
   text: { type: String, required: true, unique: true },
   frequency: { type: Number, default: 1 },
   category: { type: String, default: "general" },
});

module.exports = mongoose.model("Word", WordSchema);
