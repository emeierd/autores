const { model, Schema} = require("mongoose");

const AutorSchema = new Schema({
    name: {
        type: String,
        minlength: [3,"The name has to have at least 3 characters"],
        required: true,
    },
    deleted_at: Date
},{timestamps: true});


const Autor = model("Autor", AutorSchema);

module.exports = { Autor, AutorSchema};