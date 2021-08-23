// const {
//   // createUser,
//   // deleteUser,
//   // updateUser,
//   // getUserByUserId,
//   // getUsers,
//   login,
//   // SignUp,
// } = require("../controller/userController");

// const router = require("express").Router();

// // const { checkToken } = require("../middleware/auth");

// // router.post("/", checkToken, createUser);
// // router.get("/", checkToken, getUsers);
// // router.get("/:id", checkToken, getUserByUserId);
// // router.patch("/", checkToken, updateUser);
// // router.delete("/", checkToken, deleteUser);
// router.post("/login", login);
// // router.post("/sign-up", SignUp);

// module.exports = router;


// --------------------------------Rudransh-Changes----------------------------//

const {createUser,deleteUser,updateUser,getUserByUserId,getUsers, login,SignUp} = require("../controller/userController");
const router = require("express").Router();
const { auth } = require("../middleware/auth")
router.post("/",auth,createUser);
router.get("/",auth,getUsers);
router.get("/:id",auth,getUserByUserId);
router.patch("/",auth,updateUser);
router.delete("/",auth,deleteUser);
router.post("/login",login);
router.post("/sign-up",SignUp);

module.exports = router;
