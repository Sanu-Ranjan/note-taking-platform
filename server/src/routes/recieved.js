const { getNotes, delteNotes } = require("../controllers/recieved");

const router = require("express").Router();

router.get("/", getNotes);
router.delete("/", delteNotes);

module.exports = {
  router,
};
