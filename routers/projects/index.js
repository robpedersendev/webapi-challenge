//This line allows us to use the express framework for node.js
const express = require("express");
//This line will allow us to use the router method later on
const router = express.Router();
//This imports the actions db
const actionsdb = require("../data/helpers/actionModel");
//This imports the projects db
const projectsdb = require("../data/helpers/projectModel");


//Crud functionality

//GET api calls
router.get("/", (req,res)=> {
    //Tells us where we are in the console
    console.log("inside the get at root PROJECTS")
    //Performs the get function for all items
    projectsdb.get()
    .then(projects => {
        //Since this is a promise, we can use .then to chain several actions together
        //This line returns the HTTP status of 200 and the projects as a JSON object
        res.status(200).json(projects);
    })
    .catch(err => {
        //This line throws an error message if applicable
        res.status(500).json({err, message: "Unable to retrieve projects"});
    });
});

router.get("/:id", validateProjectId, (req,res)=> {
    //Tells us where we are in the console
    console.log("inside the get by ID PROJECTS")
    //Assigns the variable id to the id on the params list
    const id = req.params.id;
    //Prints out the id value
    console.log(id);
    //Takes the id value and passes it into the promise below
    projectsdb.get(id)
    .then(project => {
        //The if function below passes a placeholder "project" in
        if (project) {
            //If the PH project holds a value then return a HTTP 200 and the PH project as a JSON object
            res.status(200).json({
                project
            });
            //If the PH project has no value then the message below occurs
        } else {
            res.status(201).json({message: "sorry no project"});
        }
    })
    .catch(err => {
        //This line throws an error message if applicable
        res.status(500).json({err, message: "Unable to retrieve project"});
    });
});


//Post Call

//This promise allows data to be added to the Db
router.post("/", (req, res) => {
    //this inserts the body object on the req object into the DB
    projectsdb.insert(req.body)
      .then(project => {
          //Returns a 201 and the newly added object if successful
        res.status(201).json(project);
      })
      .catch(error => {
          //This throws an error message if unsuccessful
        res.status(500).json({ error, message: "Error adding the project!" });
      });
  });

//PUT Call

///This promise allows data to be updated on the Db
  router.put("/:id", validateProjectId, (req, res)=> {
          //Assigns the variable id to the id on the params list
    const id = req.params.id;
    //Prints out the id value to the console
    console.log(id);
    //These next few lines will take in two values, the id of the object to update and then the values your changing which is included in the body object on the req object
      projectsdb
      .update(id, req.body)
      .then(response => {
          res.status(200).json(
              response
          )
      })
      .catch(error => {
          //This throws an error message if applicable
          res.status(500).json({
              message: "another error"
          });
      });
  });