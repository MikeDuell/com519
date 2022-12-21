
const mongoose = require("mongoose");
const {Schema} = mongoose;

const stirtankSchema = new Schema(
    {
        serialnumber: String,
        customer: String,
        location: String,
    },
    {timestamps: true}
);


module.exports = mongoose.model("Stirtank", stirtankSchema );
