
const express = require('express');
const router = express.Router();
const User = require('./model');
const userService = require('./service')
const {validate} = require('../validator/validator')
const validation = require('../validator/user.validator')

//router for the creating user 
router.post("/register", validate(validation.userValidation), (req, res) => {
     userService.createUser(req,res)
});
// router for getting all user 
router.get("/", (req, res) => {
  userService.getUser(req,res)
});
// router for update
router.put('/:id', validate(validation.userValidation), (req, res, next) => {
  userService.updateUser(req, res, next)
})
// router for hard delete
router.delete('/:id', (req, res, next) => {
  userService.deleteUser(req,res)
})
// router for get singel user 
router.get("/:id", (req, res, next) => {
 userService.getUserById(req,res)
});
// router for search 
router.post('/search',(req,res)=>{
  userService.searchUser(req,res)
});



module.exports = router;