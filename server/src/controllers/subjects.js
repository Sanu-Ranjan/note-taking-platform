const { database } = require("../db/databse");
const { Users, Subjects, Notes } = require("../models");
const { sendResponse } = require("../utils");

const getSubjectList = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const user = await Users.findByPk(userId, {
      include: {
        model: Subjects,
        attributes: ["id", "subName"],
      },
    });

    if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      return next(error);
    }

    res
      .status(200)
      .json(sendResponse.success("user and subject information", user));
  } catch (error) {
    error.info = "error at getSubjectList controller";
    error.status = 500;
    next(error);
  }
};

const addSubject = async (req, res, next) => {
  try {
    const user = req.user.id;
    const { subName } = req.body;

    if (!subName)
      return res
        .status(400)
        .json(sendResponse.fail("Missing required Subject name"));

    const subject = await Subjects.create({
      subName: subName,
      userId: user,
    });

    res.status(201).json(sendResponse.success("Subject added", subject));
  } catch (error) {
    error.info = "error at addSubject controller";
    error.status = 500;
    next(error);
  }
};

const searchSubject = async (req, res, next) => {
  try {
    const user = req.user.id;
    const { subName } = req.params;

    if (!subName)
      return res
        .status(400)
        .json(sendResponse.fail("Missing required subject name params"));

    const subject = await Subjects.findOne({
      where: {
        userId: user,
      },
      include: {
        model: Notes,
        attributes: ["id", "topic", "content"],
      },
    });
    res.status(200).json(sendResponse.success("Subject found", subject));
  } catch (error) {
    error.info = "error at searchSubject controller";
    error.status = 500;
    next(error);
  }
};

const deleteSubject = async (req, res, next) => {
  try {
    const user = req.user.id;

    const subId = req.params.id;

    if (!subId)
      return res
        .status(400)
        .json(sendResponse.fail("Missing required subject Id"));

    await database.transaction(async (t) => {
      await Notes.destroy({
        where: {
          subjectId: subId,
        },
        transaction: t,
      });
      await Subjects.destroy({
        where: {
          id: subId,
          userId: user,
        },
        transaction: t,
      });
    });

    return res
      .status(200)
      .json(sendResponse.success("Subject deleted along with its notes"));
  } catch (error) {
    error.info = "error at searchSubject controller";
    error.status = 500;
    next(error);
  }
};
module.exports = {
  getSubjectList,
  addSubject,
  searchSubject,
  deleteSubject,
};
