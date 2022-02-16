require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

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
    QUESTION.find((err, foundArray)=>{
        if(!err){
            res.send(foundArray);
        }else{
            res.status(500).send({ errorMessage: "The data could not be retrieved." })
        }
    })
})
// Creates a question using the information sent inside the request body.
.post(async function(req, res){
    const newQuestion = new QUESTION({
        question: req.body.question
    });

    newQuestion.save(err=>{
        if(!err){
            res.status(201).send(newQuestion);
        }else{
            res.status(400).send({errorMessage: "Please provide data for the question." });
        }
    });
});


app.route("/api/questions/:id")
// Returns the question object with the specified id.
.get(async function(req, res){
    if(!mongoose.isValidObjectId(req.params.id)){
        return res.status(404).send({ message: "The question with the specified ID does not exist." })
    }
    QUESTION.findOne({_id: req.params.id}, (err, foundQuestion)=>{
        if(foundQuestion){
            res.send(foundQuestion);
        }else{
            res.status(500).send({ errorMessage: "The question information could not be retrieved." })
        }
    })
})
// Updates the question with the specified id using data from the request body. Returns the modified question
.put(async function(req, res){
    if(!mongoose.isValidObjectId(req.params.id)){
        return res.status(404).send({ message: "The question with the specified ID does not exist." })
    }

    QUESTION.findByIdAndUpdate({_id:req.params.id}, {
            question: req.body.question
        }, {overwrite:true, new:true}, (err, data)=>{
        if(!err){
            res.status(200).send(data);
        }else{
            res.status(500).send({ errorMessage: "The question information could not be modified." })
        }
    })
})
// Removes the question with the specified id and returns the deleted question.
.delete(async function(req, res){
    if(!mongoose.isValidObjectId(req.params.id)){
        return res.status(404).send({ message: "The question with the specified ID does not exist." })
    }
    QUESTION.deleteOne({_id: req.params.id}, err=>{
        if(!err){
            res.send("Successfully DELETED "+req.params.id);
        }else{
            res.status(500).send({ errorMessage: " The question could not be removed" })
        }
    })
});


////////////////////////////OPTIONS////////////////////////////////
app.route("/api/options")
.get(async function(req, res){
    OPTION.find((err, foundArray)=>{
        if(!err){
            res.send(foundArray);
        }else{
            res.status(500).send({ errorMessage: "The data could not be retrieved." })
        }
    })
})
// Creates a option using the information sent inside the request body.
.post(async function(req, res){
    const newOption = new OPTION({
        optionA: req.body.optionA,
        optionB: req.body.optionB,
        optionC: req.body.optionC,
        optionD: req.body.optionD
    });

    newOption.save(err=>{
        if(!err){
            res.status(201).send(newOption);
        }else{
            res.status(400).send({errorMessage: "Please provide data for the option." });
        }
    });
});


app.route("/api/options/:id")
// Returns the option object with the specified id.
.get(async function(req, res){
    if(!mongoose.isValidObjectId(req.params.id)){
        return res.status(404).send({ message: "The option with the specified ID does not exist." })
    }
    OPTION.findOne({_id: req.params.id}, (err, foundOption)=>{
        if(foundOption){
            res.send(foundOption);
        }else{
            res.status(500).send({ errorMessage: "The option information could not be retrieved." })
        }
    })
})
// Updates the option with the specified id using data from the request body. Returns the modified option
.put(async function(req, res){
    if(!mongoose.isValidObjectId(req.params.id)){
        return res.status(404).send({ message: "The option with the specified ID does not exist." })
    }

    OPTION.findByIdAndUpdate({_id:req.params.id}, {
        optionA: req.body.optionA,
        optionB: req.body.optionB,
        optionC: req.body.optionC,
        optionD: req.body.optionD
    }, {overwrite:true, new:true}, (err, option)=>{
        if(!err){
            res.status(200).send(option);
        }else{
            res.status(500).send({ errorMessage: "The option information could not be modified." })
        }
    })
})
// Removes the option with the specified id and returns the deleted option.
.delete(async function(req, res){
    if(!mongoose.isValidObjectId(req.params.id)){
        return res.status(404).send({ message: "The option with the specified ID does not exist." })
    }
    OPTION.deleteOne({_id: req.params.id}, err=>{
        if(!err){
            res.send("Successfully DELETED "+req.params.id);
        }else{
            res.status(500).send({ errorMessage: " The option could not be removed" })
        }
    })
});


////////////////////////////ANSWERS////////////////////////////////
app.route("/api/answers")
.get(async function(req, res){
    ANSWER.find((err, foundArray)=>{
        if(!err){
            res.send(foundArray);
        }else{
            res.status(500).send({ errorMessage: "The data could not be retrieved." })
        }
    })
})
// Creates a answer using the information sent inside the request body.
.post(async function(req, res){
    const newAnswer = new ANSWER({
        answer: req.body.answer
    });

    newAnswer.save(err=>{
        if(!err){
            res.status(201).send(newAnswer);
        }else{
            res.status(400).send({errorMessage: "Please provide data for the answer." });
        }
    });
});


app.route("/api/answers/:id")
// Returns the answer object with the specified id.
.get(async function(req, res){
    if(!mongoose.isValidObjectId(req.params.id)){
        return res.status(404).send({ message: "The answer with the specified ID does not exist." })
    }
    ANSWER.findOne({_id: req.params.id}, (err, newAnswer)=>{
        if(newAnswer){
            res.send(newAnswer);
        }else{
            res.status(500).send({ errorMessage: "The answer information could not be retrieved." })
        }
    })
})
// Updates the answer with the specified id using data from the request body. Returns the modified answer
.put(async function(req, res){
    if(!mongoose.isValidObjectId(req.params.id)){
        return res.status(404).send({ message: "The answer with the specified ID does not exist." })
    }

    ANSWER.findByIdAndUpdate({_id:req.params.id}, {
        answer: req.body.answer
    }, {overwrite:true, new:true}, (err, answer)=>{
        if(!err){
            res.status(200).send(answer);
        }else{
            res.status(500).send({ errorMessage: "The answer information could not be modified." })
        }
    })
})
// Removes the answer with the specified id and returns the deleted answer.
.delete(async function(req, res){
    if(!mongoose.isValidObjectId(req.params.id)){
        return res.status(404).send({ message: "The answer with the specified ID does not exist." })
    }
    ANSWER.deleteOne({_id: req.params.id}, err=>{
        if(!err){
            res.send("Successfully DELETED "+req.params.id);
        }else{
            res.status(500).send({ errorMessage: " The answer could not be removed" })
        }
    })
});





app.listen(3000, ()=>console.log("Server online at port:3000"));