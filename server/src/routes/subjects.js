const {
  getSubjectList,
  addSubject,
  searchSubject,
  deleteSubject,
} = require("../controllers/subjects");
const { authenticate } = require("../middlewares/auth");

const router = require("express").Router();
router.get("/:subName", authenticate, searchSubject);
router.get("/", authenticate, getSubjectList);
router.post("/", authenticate, addSubject);
router.delete("/", authenticate, deleteSubject);
module.exports = {
  router,
};
