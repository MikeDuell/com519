const Adherence = require("../models/Adherence");

exports.list = async(req, res) => {
    try{
        const adherences = await Adherence.find({});
        res.render("adherences", {adherences: adherences});
    } catch (e) {
        res.status(404).send({message: "could not list ADHERENCE reactor's"});
    }
    };
    
    
       
    exports.delete= async (req, res) => {
        const id = req.params.id;
        try {
            await Adherence.findByIdAndRemove(id);
            res.redirect("/adherences");
        }catch (e) {
            res.status(404).send ({
                message: 'could not delete record ${id}.',
            });
        }
    };