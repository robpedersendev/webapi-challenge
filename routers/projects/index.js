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

    