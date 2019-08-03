//This line allows us to use the express framework for node.js
const express = require("express");
//This line will allow us to use the router method later on
const router = express.Router();
//This imports the actions db
const actionsdb = require("../data/helpers/actionModel");
//This imports the projects db
const projectsdb = require("../data/helpers/projectModel");
