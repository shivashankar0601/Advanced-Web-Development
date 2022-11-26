const { addMessage, getMessages,deleteMessage } = require("../../controllers/chatController");
const router = require("express").Router();

router.post("/add/", addMessage);
router.post("/get/", getMessages);
router.delete("/delete/:id",deleteMessage);

module.exports = router;
