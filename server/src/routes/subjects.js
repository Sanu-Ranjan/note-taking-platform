const { auth } = require("google-auth-library");
const { getSubjectList } = require("../controllers/subjects");

const router = require("express").Router();

router.get("/", auth, getSubjectList);

module.exports = {
  router,
};
