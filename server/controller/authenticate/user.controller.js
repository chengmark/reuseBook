const db = require('../models');
const User = db.users;

exports.create = (req, res) => {
    if(!req.body.title){
        res.status(400).send({message: "Title cannot be empty"})
        return
    }

    const user = new User({
        name: req.body.name,
        password: req.body.password,
        id: req.body.id,
        email: req.body.email,
        contact: req.body.contact
    });

    user
        .save(user)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while saving your record"
            })
        })

};

exports.findOne = (req, res) => {
    const id = req.params.id

    User.findById(id)
        .then(data =>{
            if(!data)
                res.status(404).send({message: "Not found user with id " + id})
            else 
                res.send(data)
        })
        .catch(err =>{
            res
                .status(500)
                .send({message: "Error retrieving user information"})
        })
};

exports.delete = (req, res) =>{
    const id = req.params.id;

    User.findByIdAndRemove(id)
        .then(data =>{
            if(!data)
                res.status(500).send({message: "No such User !"})
            else
                res.send(data)
        })
        .catch(err =>{
            res.status(404).send({message: "Error deleting the record"})
        })
};


