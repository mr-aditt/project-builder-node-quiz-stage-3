require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express()
app.use(bodyParser.urlencoded({extended: true}));

try {
    mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.fl6wx.mongodb.net/quiz?retryWrites=true&w=majority`);
} catch (error) {
    handleError(error);
}

const questionsSchema = {
    question: {type: String, required:"Error: Question is required"}
}
const optionsSchema = {
    optionA: {type: String, required:"Error: Option-A is required"},
    optionB: {type: String, required:"Error: Option-B is required"},
    optionC: {type: String, required:"Error: Option-C is required"},
    optionD: {type: String, required:"Error: Option-D is required"}
}
const answersSchema = {
    answer: {type: String, required:"Error: Answer is required"}
}

const QUESTION = mongoose.model("question", questionsSchema);
const OPTION = mongoose.model("option", optionsSchema);
const ANSWER = mongoose.model("answer", answersSchema);


////////////////////////////QUESTIONS////////////////////////////////
app.route("/api/questions")
.get(async function(req, res){
    USER.find((err, foundArray)=>{
        if(!err){
            res.send(foundArray);
        }else{
            res.status(500).send({ errorMessage: "The users information could not be retrieved." })
        }
    })
})
// Creates a user using the information sent inside the request body.
.post(async function(req, res){
    const newUser = new USER({
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        prograd_id: req.body.prograd_id,
        squad: req.body.squad
    });

    newUser.save(err=>{
        if(!err){
            res.status(201).send(newUser);
        }else{
            res.status(400).send({errorMessage: "Please provide name and email for the user." });
        }
    });
});


app.route("/api/questions/:id")
// Returns the user object with the specified id.
.get(async function(req, res){
    if(!mongoose.isValidObjectId(req.params.id)){
        return res.status(404).send({ message: "The user with the specified ID does not exist." })
    }
    USER.findOne({_id: req.params.id}, (err, foundUser)=>{
        if(foundUser){
            res.send(foundUser);
        }else{
            res.status(500).send({ errorMessage: "The user information could not be retrieved." })
        }
    })
})
// Updates the user with the specified id using data from the request body. Returns the modified user
.put(async function(req, res){
    if(!mongoose.isValidObjectId(req.params.id)){
        return res.status(404).send({ message: "The user with the specified ID does not exist." })
    }

    USER.findByIdAndUpdate({_id:req.params.id}, {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
            prograd_id: req.body.prograd_id,
            squad: req.body.squad
        }, {overwrite:true, new:true}, (err, user)=>{
        if(!err){
            res.status(200).send(user);
        }else{
            res.status(500).send({ errorMessage: "The user information could not be modified." })
        }
    })
})
// Removes the user with the specified id and returns the deleted user.
.delete(async function(req, res){
    if(!mongoose.isValidObjectId(req.params.id)){
        return res.status(404).send({ message: "The user with the specified ID does not exist." })
    }
    USER.deleteOne({_id: req.params.id}, err=>{
        if(!err){
            res.send("Successfully DELETED "+req.params.id);
        }else{
            res.status(500).send({ errorMessage: " The user could not be removed" })
        }
    })
});


////////////////////////////OPTIONS////////////////////////////////
app.route("/api/options")
.get(async function(req, res){
    USER.find((err, foundArray)=>{
        if(!err){
            res.send(foundArray);
        }else{
            res.status(500).send({ errorMessage: "The users information could not be retrieved." })
        }
    })
})
// Creates a user using the information sent inside the request body.
.post(async function(req, res){
    const newUser = new USER({
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        prograd_id: req.body.prograd_id,
        squad: req.body.squad
    });

    newUser.save(err=>{
        if(!err){
            res.status(201).send(newUser);
        }else{
            res.status(400).send({errorMessage: "Please provide name and email for the user." });
        }
    });
});


app.route("/api/options/:id")
// Returns the user object with the specified id.
.get(async function(req, res){
    if(!mongoose.isValidObjectId(req.params.id)){
        return res.status(404).send({ message: "The user with the specified ID does not exist." })
    }
    USER.findOne({_id: req.params.id}, (err, foundUser)=>{
        if(foundUser){
            res.send(foundUser);
        }else{
            res.status(500).send({ errorMessage: "The user information could not be retrieved." })
        }
    })
})
// Updates the user with the specified id using data from the request body. Returns the modified user
.put(async function(req, res){
    if(!mongoose.isValidObjectId(req.params.id)){
        return res.status(404).send({ message: "The user with the specified ID does not exist." })
    }

    USER.findByIdAndUpdate({_id:req.params.id}, {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
            prograd_id: req.body.prograd_id,
            squad: req.body.squad
        }, {overwrite:true, new:true}, (err, user)=>{
        if(!err){
            res.status(200).send(user);
        }else{
            res.status(500).send({ errorMessage: "The user information could not be modified." })
        }
    })
})
// Removes the user with the specified id and returns the deleted user.
.delete(async function(req, res){
    if(!mongoose.isValidObjectId(req.params.id)){
        return res.status(404).send({ message: "The user with the specified ID does not exist." })
    }
    USER.deleteOne({_id: req.params.id}, err=>{
        if(!err){
            res.send("Successfully DELETED "+req.params.id);
        }else{
            res.status(500).send({ errorMessage: " The user could not be removed" })
        }
    })
});


////////////////////////////ANSWERS////////////////////////////////
app.route("/api/answers")
.get(async function(req, res){
    USER.find((err, foundArray)=>{
        if(!err){
            res.send(foundArray);
        }else{
            res.status(500).send({ errorMessage: "The users information could not be retrieved." })
        }
    })
})
// Creates a user using the information sent inside the request body.
.post(async function(req, res){
    const newUser = new USER({
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        prograd_id: req.body.prograd_id,
        squad: req.body.squad
    });

    newUser.save(err=>{
        if(!err){
            res.status(201).send(newUser);
        }else{
            res.status(400).send({errorMessage: "Please provide name and email for the user." });
        }
    });
});


app.route("/api/answers/:id")
// Returns the user object with the specified id.
.get(async function(req, res){
    if(!mongoose.isValidObjectId(req.params.id)){
        return res.status(404).send({ message: "The user with the specified ID does not exist." })
    }
    USER.findOne({_id: req.params.id}, (err, foundUser)=>{
        if(foundUser){
            res.send(foundUser);
        }else{
            res.status(500).send({ errorMessage: "The user information could not be retrieved." })
        }
    })
})
// Updates the user with the specified id using data from the request body. Returns the modified user
.put(async function(req, res){
    if(!mongoose.isValidObjectId(req.params.id)){
        return res.status(404).send({ message: "The user with the specified ID does not exist." })
    }

    USER.findByIdAndUpdate({_id:req.params.id}, {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
            prograd_id: req.body.prograd_id,
            squad: req.body.squad
        }, {overwrite:true, new:true}, (err, user)=>{
        if(!err){
            res.status(200).send(user);
        }else{
            res.status(500).send({ errorMessage: "The user information could not be modified." })
        }
    })
})
// Removes the user with the specified id and returns the deleted user.
.delete(async function(req, res){
    if(!mongoose.isValidObjectId(req.params.id)){
        return res.status(404).send({ message: "The user with the specified ID does not exist." })
    }
    USER.deleteOne({_id: req.params.id}, err=>{
        if(!err){
            res.send("Successfully DELETED "+req.params.id);
        }else{
            res.status(500).send({ errorMessage: " The user could not be removed" })
        }
    })
});





app.listen(3000, ()=>console.log("Server online at port:3000"));