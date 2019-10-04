const express = require('express');
const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth');
const controller = require('../../controllers/task.controller');
const router = express.Router();

router
  .route('/')
  /**
   * @api {get} v1/projects list of projects
   * @apiDescription Get a list of projects
   * @apiVersion 1.0.0
   * @apiName ListProjects
   * @apiGroup Project
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiSuccess {Object[]} users List of users.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only users can access the data
   */
  .get(authorize())
  /**
   * @api {post} v1/users Create project
   * @apiDescription Create a new project
   * @apiVersion 1.0.0
   * @apiName CreateProject
   * @apiGroup User
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiSuccess (Created 201) 
   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
   * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
   */
  .post(authorize(ADMIN), controller.create);

module.exports = router;