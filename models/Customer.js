
const mongoose = require("mongoose");
const {Schema} = mongoose;

const customerSchema = new Schema(
    {
        
        customer: String,
        location: String,
        
    },
    {timestamps: true}
);


module.exports = mongoose.model("Customer", customerSchema );
