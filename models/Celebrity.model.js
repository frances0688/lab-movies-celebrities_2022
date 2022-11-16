const { Schema, model } = require("mongoose");

const celebSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true
    },
    occupation: {
      type: String,
      default: "unknown"
    },
    catchPhrase: {
      type: String,
      required: true,
    }
  }
);

const Celebrity = model("Celebrity", celebSchema);

module.exports = Celebrity;