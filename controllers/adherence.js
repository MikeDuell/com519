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

    exports.edit = async (req, res) => {
        const id = req.params.id;
        try {
            const adherence = await Adherence.findById(id);
            res.render('update-adherence', { adherence: adherence, id: id , errors : {}});
          } catch (err) {
            res.status(404).send({
              message: `could find reactor ${id}.`,
            });
          }
    };

    exports.update = async (req, res) => {
        const id = req.params.id;
        console.log (id)
        try {
          const adherence = await Adherence.updateOne({ _id: id }, req.body);
          res.redirect('/adherences?message= done');
        } 
        catch (err) {
            if (err.errors){
                console.log(e.errors);
                return res.render('update-adherence', {errors : err.errors});
            }
          res.status(404).send({
            message: `could find id number ${id}.`,
          });
        }
      }

    exports.create = async (req, res) => {
        
        try {
        let adherence = new Adherence ({serialnumber : req.body.serialnumber, cabinetserial: req.body.cabinetserial, customer: req.body.customer, location: req.body.location, custom1: req.body.custom1, customtype:req.body.customtype, hwrev: req.body.hwrev, swrev: req.body.swrev });

        
            await adherence.save();
            res.redirect(`/adherences?message=${req.body.serialnumber} has been created`);
        } catch (err) {
            console.log(err.errors)
            if (err.errors){
                return res.render('create-adherence', {errors: err.errors});
            }
            return res.status(400).send({message: JSON.parse(e)})
        }
        }
    