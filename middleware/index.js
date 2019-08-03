//This file will serve as the middleware folder for all middleware functions

//This imports the actions db
const actionsdb = require("../data/helpers/actionModel");
//This imports the projects db
const projectsdb = require("../data/helpers/projectModel");

function validateProjectId(req, res, next) {
    //Assigns the ID variable to the id value of the req.params.id value
    const id = req.params.id;
    //This promise validates the id of a project ot make sure a project with the specified ID actually exists
    projectsdb
      .get(id)
      .then(project => {
        if (project) {
            //If the ph project has a value then assign it to req.project
          req.project = project;
          //This line allows the middleware function to exit and allow the rest of the code to run
          next();
        } else {
            //If the PH project has no value then return a 400 code and a message of "Invalid Project ID"
          res.status(400).json({ message: "Invalid Project ID" });
        }
      })
      .catch(error => {
          //This line throws an error message if applicable
        res.status(500).json( {message: "error in the validation by id function"});
      });
  }