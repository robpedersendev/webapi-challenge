    //Assigns router to the value of the expressJS router method 
    const router = require('express').Router()
        //This takes all routes from the actions/index file and assigns them to actionsRouter
    const actionsRouter = require('../actions')
        //This assigns all database functions to the db variable
    const db = require('../../data/helpers/projectModel')

    /*
    This block needs to be updated
        //This line is importing the validateUser and validateUserId from the middleware file 
    const { validateUserId, validateUser } = require('../../middleware')

    */

    router.get('/', async (req, res) => {
        //Initializes the try in the try/catch setup
        try {
            //Sets users variable to the db.get function in the userDb file
            //await is used to stop the progress of the app until the db.get value is assigned to the projects variable 
            const projects = await db.get(1)
                //This line sends the response of a HTTP header of 200. It then sends back the users data in a json format
            res.status(200).json({
                    projects
                })
        //This starts the catch and allows the passed in error (if there is one) to be used
        } catch (error) {
            //This line sends the response of a HTTP header of 500. It then sends back the passed in error in a json format
            res.status(500).json({
                error: `An error occurred while attempting to get users`
            })
        }
    })