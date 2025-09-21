const {
  addNotes,
  getNotes,
  deleteNotes,
  searchNotes,
  updateNotes,
} = require("../controllers/notes");
const { authenticate } = require("../middlewares/auth");

const router = require("express").Router();

router.post("/", authenticate, addNotes);
router.get("/:subjectId", authenticate, getNotes);
router.delete("/:id", authenticate, deleteNotes);
router.post("/:topic", authenticate, searchNotes);
router.put("/:id", authenticate, updateNotes);

module.exports = {
  router,
};
