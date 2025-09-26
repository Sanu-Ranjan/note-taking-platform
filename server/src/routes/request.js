const {
  createRequest,
  manageRequest,
  requestList,
  cancelRequest,
} = require("../controllers/request");
const { authenticate } = require("../middlewares/auth");

const router = require("express").Router();

router.post("/", authenticate, createRequest);
router.post("/:id", authenticate, manageRequest);
router.get("/", authenticate, requestList);
router.delete("/", authenticate, cancelRequest);
module.exports = {
  router,
};
