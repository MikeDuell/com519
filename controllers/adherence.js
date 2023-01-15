const Adherence = require("../models/Adherence");

exports.list = async(req, res) => {
    try{
        const adherences = await Adherence.find({});
        res.render("adherences", {adherences: adherences, message: req.query?.message});
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

    exports.create = async (req, res) => {
        //console.log(req);
        //res.send("post req sent!!")

        let adherence = new Adherence ({serialnumber : req.body.serialnumber, customer: req.body.custname, location: req.body.custAdd});

        try {
            await adherence.save();
            res.redirect(`/adherences?message=${req.body.serialnumber} has been created`);
        } catch (err) {
            return res.status(400).send({message: JSON.parse(err)})
           
        }
    }