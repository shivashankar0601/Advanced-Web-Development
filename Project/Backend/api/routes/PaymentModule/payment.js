const { getCheckoutServer, paymentIntent,getPublicKey,paymentStatus,getPaymentStatus } = require("../../controllers/paymentController");
const router = require("express").Router();

router.get("/", getCheckoutServer);
router.get("/publicKey", getPublicKey);
router.post("/initiate", paymentIntent);
router.post("/status",paymentStatus);
router.get("/status/:id",getPaymentStatus);

module.exports = router;