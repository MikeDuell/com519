const Customer = require("../models/Customer");

exports.list = async(req, res) => {
    try{
        const customers = await Customer.find({});
        res.render("customers", {customers: customers});
    } catch (e) {
        res.status(404).send({message: "could not list Customers"});
    }
    };
    
    
       
    exports.delete= async (req, res) => {
        const id = req.params.id;
        try {
            await Customer.findByIdAndRemove(id);
            res.redirect("/customers");
        }catch (e) {
            res.status(404).send ({
                message: 'could not delete record ${id}.',
            });
        }
    };