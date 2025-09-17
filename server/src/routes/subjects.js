const { auth } = require("google-auth-library");
const {
  getSubjectList,
  addSubject,
  searchSubject,
} = require("../controllers/subjects");

const router = require("express").Router();
router.get("/:name", searchSubject);
router.get("/", auth, getSubjectList);
router.post("/", auth, addSubject);
module.exports = {
  router,
};
