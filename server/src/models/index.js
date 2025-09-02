const { Notes } = require("./notes");
const { Recievednotes } = require("./recievedNotes");
const { Requests } = require("./requests");
const { Subjects } = require("./subjects");
const { Users } = require("./users");

Users.hasMany(Subjects);
Subjects.belongsTo(Users);

Subjects.hasMany(Notes);
Notes.belongsTo(Subjects);

Users.hasMany(Notes, { through: Recievednotes });
Notes.hasMany(Users, { through: Recievednotes });

Users.hasMany(Notes, { through: Requests });
Notes.hasMany(Users, { through: Requests });

module.exports = {
  Users,
  Notes,
  Subjects,
  Recievednotes,
  Requests,
};
