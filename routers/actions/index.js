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

//GET Calls

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


//PUT api Calls


//This API call allows us to update information on the DB
router.put("/:id", validateActionId, (req, res) => {
    //Assigns id to the value of req.params.id
    const id = req.params.id;
    //Assigns the sent/updated information from req.body to changes
    const changes = req.body;
  //Console.logs out the values of the above assignments
    console.log(changes);
    console.log(id);
  //This promise takes the two variables values above and pushes them through the update method found in the actionsDb file. The first value is the id of the action you are updating, the second value is what you want to update/change
    actionsdb
      .update(id, changes)
      .then(UpdateAction => {
        if (UpdateAction) {
            //If updateAction has a value then return the HTTP status of 200 and return a JSON object of updateAction
          res.status(200).json(UpdateAction);
        } else {
            //If updateAction ahs no value, throw an error message
          res.status(404).json({ message: " project does not exist" });
        }
      })
      .catch(error => {
          //If needed throw an error message
        res.status(500).json({
          message: "another error"
        });
      });
  });



  //DELETE api calls


//This api call allows you to delete an action
  router.delete("/:id", validateActionId, (req, res) => {
    //Assigns id to the value of req.params.id
    const id = req.params.id;
    //Console.logs out the values of the above assignment
    console.log(id);
    //This takes in the id and passes it through the promise
    actionsdb
      .remove(id)
      .then(response => {
          //Return the HTTP status of 200 and then return a message 
        res.status(200).json({
          message: "action deleted"
        });
      })
      .catch(error => {
          //If there is an issue, throw an error message
        res.status(500).json({
          message: "another error"
        });
      });
  });














module.exports = router;