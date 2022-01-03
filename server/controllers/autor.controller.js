const { Autor } = require("../models/Autor");

const create = async (req, res) => {
    try {
        const { name } = req.body;
        const autor = await Autor({ name: name });
        await autor.save();
        res.status(201).json({ response: "OK", message: "Autor created: " + autor });
    } catch (err) {
        console.error(err);
        res.status(500).json({ response: "Error", message: err })
    }
};

const edit = async (req, res) => {
    try {
        const { id, name } = req.body;
        const autor = await Autor.findById(id);
        if(!autor) return res.status(404).json({ response: "Error", message: "Not found" })
        autor.name = name;
        await autor.save();
        res.status(200).json({ response: "OK", message: "Autor edited: " + autor });
    } catch (err) {
        console.error(err);
        res.status(500).json({ response: "Error", message: err })
    }
};

const remove = async (req, res) => {
    try {
        const { id } = req.body;
        console.log(id)
        const autor = await Autor.findById(id);
        if(!autor) return res.status(404).json({ response: "Error", message: "Not found" })
        autor.deleted_at = new Date();
        await autor.save();
        res.status(200).json({ response: "OK", message: "Autor edited: " + autor });
    } catch (err) {
        console.error(err);
        res.status(500).json({ response: "Error", message: err })
    }
}

const get = async (req, res) => {
    try {
        const { id } = req.body;
        const autor = await Autor.findById(id);
        if(!autor) return res.status(404).json({ response: "Error", message: "Not found" })
        res.status(200).json({ response: "OK", autor: autor });
    } catch (err) {
        console.error(err);
        res.status(500).json({ response: "Error", message: err })
    }
};

const getAll = async (req, res) => {
    try {
        const autors = await Autor.find({deleted_at: null})
        res.status(200).json({ response: "OK", autors: autors });
    } catch (err) {
        console.error(err);
        res.status(500).json({ response: "Error", message: err })
    }   
}

module.exports = { create, edit, get, getAll, remove };