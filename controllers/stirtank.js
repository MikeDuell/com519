const Stirtank = require("../models/Stirtank");

exports.list = async(req, res) => {
    console.log(req.query)
    try{
        const stirtanks = await Stirtank.find({});
        res.render("stirtanks", {stirtanks: stirtanks, message: req.query?.message});
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

    exports.create = async (req, res) => {
        //console.log(req);
        //res.send("post req sent!!")

        let stirtank = new Stirtank ({serialnumber : req.body.serialnumber, customer: req.body.custname, location: req.body.custAdd});

        try {
            await stirtank.save();
            res.redirect(`/stirtanks?message=${req.body.serialnumber} has been created`);
        } catch (err) {
            return res.status(400).send({message: JSON.parse(err)})
            
        }
    }