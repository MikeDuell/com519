
const mongoose = require("mongoose");
const {Schema} = mongoose;

const adherenceSchema = new Schema(
    {
        serialnumber: { type: String, required: [true, 'Serial number is required'], minlength: [2, 'name too short'] },
        cabinetserial: String,
        customer: {type: String, required:[true, 'Customer name is required'] } ,
        location: String,
        custom1: String,
        customtype: String,
        hwrev: String,
        swrev: String,
        
    },
    {timestamps: true}
);


module.exports = mongoose.model("Adherence", adherenceSchema );
