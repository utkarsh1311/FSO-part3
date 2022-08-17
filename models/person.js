const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

console.log("connecting to", url);

mongoose
    .connect(url)
    .then(result => {
        console.log("Connected to MongoDB");
    })
    .catch(error => {
        console.err("Error connecting to the MongoDB: ", error.message);
    });

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true,
    },
    number: String,
});

personSchema.set("toJSON", {
    transform: (document, returnedPerson) => {
        returnedPerson.id = returnedPerson._id.toString()
        delete returnedPerson._id
        delete returnedPerson.__v
    },
})

module.exports = mongoose.model("Person", personSchema);
