const { auth } = require("google-auth-library");
const { getSubjectList, addSubject } = require("../controllers/subjects");

const router = require("express").Router();

router.get("/", auth, getSubjectList);
router.post("/", auth, addSubject);
module.exports = {
  router,
};
