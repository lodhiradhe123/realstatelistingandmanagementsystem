const mongoose = require("mongoose");

mongoose
    .connect("mongodb+srv://radheshyamlodhi48:9RLjaQ2rnsybIylq@cluster0.gcmuhif.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        console.log("database connected!");
    })
    .catch((err) => {
        console.log(err.message);
    });
