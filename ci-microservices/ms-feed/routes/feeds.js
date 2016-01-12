var express = require('express');
var router = express.Router();
var feedAction = require('../actions/feed.js');


/**
 * @api {get} /feeds/getAll/:login Get all feeds by login
 * @apiName ms-binder
 * @apiGroup Binder
 *
 * @apiParam {String} email user logged.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "firstname": "John",
 *       "lastname": "Doe"
 *     }
 *     
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
 */
router.get('/', feedAction.get);

module.exports = router;
