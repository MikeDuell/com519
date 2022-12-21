
const mongoose = require("mongoose");
const {Schema} = mongoose;

const adherenceSchema = new Schema(
    {
        serialnumber: String,
        customer: String,
        location: String,
    },
    {timestamps: true}
);


module.exports = mongoose.model("Adherence", adherenceSchema );
