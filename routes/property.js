var express = require("express");
var router = express.Router();
const { isLoggedIn } = require("../utility/auth");
const PropertySchema = require("../models/propertySchema");
const upload = require("../utility/multer");

function verifyrole(req, res, next) {
    if (req.user.role == "seller") {
        next();
    } else {
        res.send("Only seller the permission to create property");
    }
}

router.get("/",isLoggedIn,verifyrole,function(req,res,next){
    res.render("create-property")
})

router.post(
    "/",
    isLoggedIn,
    verifyrole,
    upload.single("image"),
    async function (req, res, next) {
        try {
            const newproperty = new PropertySchema({
                ...req.body,
                image: req.file.filename,
                owner: req.user._id,
            });
            await newproperty.save();
            res.redirect("/property/propertidata");
        } catch (error) {
            res.send(error.message);
        }
    }
);
router.get("/propertidata",isLoggedIn,async function(req,res,next){
    const propertydata=await PropertySchema.find({owner:req.user._id});
    res.render("property",{property:propertydata})

})

module.exports = router;
