const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")

router.post("/add-users",userController.createUser)
router.post("/login",userController.loginUser)
router.get("/get-users/:id",userController.getUserById)
router.get("/user-list",userController.listAllUsers)
router.put("/update-users/:id",userController.updateUser)
router.delete("/delete-users/:id",userController.deleteUser)

module.exports = router
