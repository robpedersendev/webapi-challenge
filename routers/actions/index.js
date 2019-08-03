//This line allows us to use the express framework for node.js
const express = require("express");
//This line will allow us to use the router method later on
const router = express.Router();
//This imports the actions db
const actionsdb = require("../data/helpers/actionModel");
//This imports the projects db
const projectsdb = require("../data/helpers/projectModel");
//This imports validateProjectId function from the middleware file
// const {validateProjectId} = require('../../middleware/index')

//Begin CRUD functionality


router.get("/", (req,res)=> {
    //Tells us where we are in the console
    console.log("inside the get at root actions")
    //Performs the get function for all items
    actionsdb.get()
    .then(actions => {
        //Since this is a promise, we can use .then to chain several actions together
        //This line returns the HTTP status of 200 and the actions as a JSON object
        res.status(200).json(actions);
    })
    .catch(err => {
        //This line throws an error message if applicable
        res.status(500).json({ error: "Unable to retrieve actions" });
    });
});


router.get("/:id", (req,res)=> {
    //Tells us where we are in the console
    console.log("inside the get by ID actions")
    //Assigns the variable id to the id on the params list
    const id = req.params.id;
    //Prints out the id value
    console.log(id);
    //Takes the id value and passes it into the promise below
    actionssdb.get(id)
    .then(actions => {
        //The if function below passes a placeholder "actions" in
        if (actions) {
            //If the PH actions holds a value then return a HTTP 200 and the PH actions as a JSON object
            res.status(200).json({
                actions
            });
            //If the PH actions has no value then the message below occurs
        } else {
            res.status(201).json({message: "sorry no actions"});
        }
    })
    .catch(err => {
        //This line throws an error message if applicable
        res.status(500).json({err, message: "Unable to retrieve actions"});
    });
});


//POST api calls

//This call allows us to add data to the Db
router.post("/", validateProjectId, (req, res) => {
    //This object takes the values sent to the sever and assigns them in a key/value pair 
    const newAction = {
      project_id: req.body.project_id,
      description: req.body.description,
      notes: req.body.notes
    };
    //This promise takes the object object and passes it into through itself
    actionsdb
      .insert(newAction /* This inserts the object into the Db */)
      .then(response => {
        //This passes the response from the insert method and returns a HTTP 200 message a JSON response message
        res.status(201).json(response);
      })
      .catch(error => {
          //If needed, throw an error message
        res
          .status(500)
          .json({ message: "error occured when trying to add an action" });
      });
  });


module.exports = router;