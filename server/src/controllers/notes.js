const { Op } = require("sequelize");
const { Subjects, Notes, Users } = require("../models");
const { sendResponse } = require("../utils");

const addNotes = async (req, res, next) => {
  try {
    const userId = req.user?.id;

    const { topic, content, subjectId } = req.body;
    //data verification with joi pending
    const subject = await Subjects.findOne({
      where: {
        id: subjectId,
        userId: userId,
      },
    });
    //verify userId of subject with current user id

    if (!subject) return res.status(404).json(sendResponse.fail("Not found"));

    const notes = await Notes.create({
      topic: topic,
      content: content,
      subjectId: subjectId,
    });

    res.status(201).json(sendResponse.success("Notes added", notes));
  } catch (error) {
    error.info = "error at addNotes controller";
    error.status = 500;
    next(error);
  }
};
const getNotes = async (req, res, next) => {
  try {
    const userId = req.user?.id;

    const { subjectId } = req.params;

    const subject = await Subjects.findOne({
      where: {
        id: subjectId,
        userId: userId,
      },
      include: {
        model: Notes,
        attributes: ["id", "topic", "content"],
      },
    });

    if (!subject) return res.status(404).json(sendResponse.fail("Not found"));

    res.status(200).json(sendResponse.success("Notes fectched", subject.notes));
  } catch (error) {
    error.info = "error at getNotes controller";
    error.status = 500;
    next(error);
  }
};

const deleteNotes = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    //find subject corresponding to notesid
    //find user corresponding to subject found
    //check user if current user or not

    const note = await Notes.findByPk(id);
    if (!note) return res.status(404).json(sendResponse.fail("Not found"));

    const subjectId = note.subjectId;

    const subject = await Subjects.findByPk(subjectId);
    if (!subject) return res.status(404).json(sendResponse.fail("Not found"));

    if (userId !== subject.userId)
      return res.status(401).json(sendResponse.fail("Not alowed"));

    const affected = await Notes.destroy({
      where: {
        id: id,
      },
    });

    if (affected === 1)
      res.status(200).json(sendResponse.success("Note Deleted"));
  } catch (error) {
    error.info = "error at deleteNotes controller";
    error.status = 500;
    next(error);
  }
};

const searchNotes = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const { topic } = req.params;
    const { subjectId } = req.body;

    const subject = await Subjects.findByPk(subjectId);
    if (!subject) return res.status(404).json(sendResponse.fail("Not found"));

    if (userId !== subject.userId)
      return res.status(401).json(sendResponse.fail("Not allowed"));

    const result = await Notes.findAll({
      where: {
        subjectId: subjectId,
        topic: {
          [Op.like]: `%${topic}%`,
        },
      },
    });

    res.status(200).json(sendResponse.success("notes fetched", result));
  } catch (error) {
    error.info = "error at searchNotes controller";
    error.status = 500;
    next(error);
  }
};

const updateNotes = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const noteId = req.params.id;
    const { subjectId, topic, content } = req.body;
    if (!subjectId)
      return res.status(400).json(sendResponse.fail("Missing subjectId"));

    const subject = await Subjects.findByPk(subjectId);

    if (!subjectId)
      return res.status(404).json(sendResponse.fail("Subject Not found"));

    if (subject.userId !== userId)
      return res.status(401).json(sendResponse.fail("Not allowed"));

    await Notes.update({ topic, content }, { where: { id: noteId } });

    res.status(200).json(sendResponse.success("Notes updated"));
  } catch (error) {
    error.info = "error at updateNotes controller";
    error.status = 500;
    next(error);
  }
};

module.exports = {
  addNotes,
  getNotes,
  deleteNotes,
  searchNotes,
  updateNotes,
};
