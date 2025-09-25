const {
  createRequest,
  manageRequest,
  requestList,
} = require("../controllers/request");
const { authenticate } = require("../middlewares/auth");

const router = require("express").Router();

router.post("/", authenticate, createRequest);
router.post("/:id", authenticate, manageRequest);
router.get("/", authenticate, requestList);
module.exports = {
  router,
};
