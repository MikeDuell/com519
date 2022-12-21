const Stirtank = require("../models/Stirtank");

exports.list = async(req, res) => {
    try{
        const stirtanks = await Stirtank.find({});
        res.render("stirtanks", {stirtanks: stirtanks});
    } catch (e) {
        res.status(404).send({message: "could not list stirs"});
    }
    };
    
    
       
    exports.delete= async (req, res) => {
        const id = req.params.id;
        try {
            await Stirtank.findByIdAndRemove(id);
            res.redirect("/stirtanks");
        }catch (e) {
            res.status(404).send ({
                message: 'could not delete record ${id}.',
            });
        }
    };