const { Users, Subjects } = require("../models");
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

module.exports = {
  getSubjectList,
};
