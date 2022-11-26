const { getAllUsers,addChatUser } = require("../../controllers/userHistoryController");
const router = require("express").Router();

router.post("/getHistory/:id", getAllUsers);
router.post("/addUsersHistory/", addChatUser);

module.exports = router;
