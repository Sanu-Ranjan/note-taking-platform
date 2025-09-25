const { Requests, Users, Recievednotes } = require("../models");
const { sendResponse } = require("../utils");

const createRequest = async (req, res, next) => {
  try {
    const fromUser = req.user?.id;
    const { email, noteId } = req.body;
    //do data validation check here(pending)

    const user = await Users.findOne({ where: { email } });
    if (!user) return res.send(404).json(sendResponse.fail("User not found"));

    const userId = user.id;

    const senderEmail = await Users.findByPk(fromUser, {
      attributes: ["email"],
    });

    await Requests.create({ fromUser: senderEmail, userId, noteId });

    res.status(201).json(sendResponse.success("Request sent"));
  } catch (error) {
    error.info = "error at create request controller";
    error.status = 500;
    next(error);
  }
};

const manageRequest = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const id = req.params.id;
    const { requestStatus } = req.body;
    const request = await Requests.findByPk(id);
    if (!request) return res.status(404).json(sendResponse.fail("Not found"));

    if (request.userId !== userId)
      return res.status(401).json(sendResponse.fail("unauthorised"));

    if (requestStatus) {
      const noteId = request.noteId;
      //below can me encapsulated in a wrapper
      await Recievednotes.create({
        //accept request and add notes to recieved
        userId: userId,
        noteId: noteId,
      });
      res.status(201).json(sendResponse.success("Notes recieved"));
    }
    await request.destroy();
  } catch (error) {
    error.info = "error at manage request controller";
    error.status = 500;
    next(error);
  }
};

const requestList = async (req, res, next) => {
  try {
    const userId = req.user?.id;

    const requests = await Requests.findAll({
      attributes: ["id", "fromUser"],
      where: {
        userId: userId,
      },
    });

    res.status(200).json("request list", requests);
  } catch (error) {
    error.info = "error at list request controller";
    error.status = 500;
    next(error);
  }
};

module.exports = {
  createRequest,
  manageRequest,
  requestList,
};
