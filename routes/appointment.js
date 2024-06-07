var express = require("express");
var router = express.Router();
const { isLoggedIn } = require("../utility/auth");
const AppointmentSchema = require("../models/appointmentSchema");
const app = require("../app");

function verifyrole(req, res, next) {
    if (req.user.role == "buyer") {
        next();
    } else {
        res.send("Only buyer have the permission to get appointment property");
    }
}
router.get("/",isLoggedIn,function(req,res,next){
    res.render("appointment")
})
router.post(
    "/",
    isLoggedIn,
    verifyrole,
    async function (req, res, next) {
        try {
            const newappointment = new AppointmentSchema({
                ...req.body,
                user: req.user._id,
                property: req.params.propertyid,
            });
            await newappointment.save();
            res.redirect("/appointment/appointmentdata");
        } catch (error) {
            res.send(error.message);
        }
    }
);

router.get("/appointmentdata",isLoggedIn,async function(req,res,next){
const appointdata = await AppointmentSchema.find({user:req.user._id});
res.render("appointmentdata",{appointdata:appointdata})
})

module.exports = router;
