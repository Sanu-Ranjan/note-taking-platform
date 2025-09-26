const { json } = require("sequelize");
const { Recievednotes, Notes } = require("../models");
const { sendResponse } = require("../utils");

const getNotes = async (req, res, next) => {
  try {
    const userId = req.user?.id;

    const notes = await Recievednotes.findAll({
      where: {
        userId: userId,
      },
      include: {
        model: Notes,
        attributes: ["topic", "content"],
      },
    });

    res.status(200).json(sendResponse.success("Recieved notes", notes));
  } catch (error) {
    error.info = "error at list request controller";
    error.status = 500;
    next(error);
  }
};

const delteNotes = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const { id } = req.body;

    const notes = await Recievednotes.findByPk(id);

    if (notes.userId !== userId)
      return res.status(401).json(sendResponse.success("Not allowed"));

    await notes.destroy();

    res.status(200).json(sendResponse.success("Notes deleted"));
  } catch (error) {
    error.info = "error at list request controller";
    error.status = 500;
    next(error);
  }
};

module.exports = {
  getNotes,
  delteNotes,
};
