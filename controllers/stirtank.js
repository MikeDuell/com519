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

    exports.edit = async (req, res) => {
        const id = req.params.id;
        try {
            const stirtank = await Stirtank.findById(id);
            res.render('update-stirtank', { stirtank: stirtank, id: id , errors : {}});
          } catch (err) {
            res.status(404).send({
              message: `could find reactor ${id}.`,
            });
          }
    };

    exports.update = async (req, res) => {
        const id = req.params.id;
        console.log (id, req.body)
        try {
          const stirtank = await Stirtank.updateOne({ _id: id }, req.body);
          res.redirect('/stirtanks?message= done');
        } 
        catch (err) {
            if (err.errors){
                console.log(e.errors);
                return res.render('/update-stirtank', {errors : err.errors});
            }
          res.status(404).send({
            message: `could find id number ${id}.`,
          });
        }
      }

    exports.create = async (req, res) => {

     try{
        let stirtank = new Stirtank ({size: req.body.size, serialnumber : req.body.serialnumber, cabinetserial: req.body.cabinetserial, customer: req.body.customer, location: req.body.location, custom1: req.body.custom1, customtype: req.body.customtype, hwrev: req.body.hwrev, swrev: req.body.swrev     } );
            await stirtank.save();
            res.redirect(`/stirtanks?message=${req.body.serialnumber} has been created`);
        } catch (e) {
            console.log(e.errors);
            if (e.errors){
                return res.render('create-stirtank', {errors: e.errors});
            }
            return res.status(400).send({message: JSON.parse(e)})
        }
    }