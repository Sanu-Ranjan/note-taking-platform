const { Notes } = require("./notes");
const { Recievednotes } = require("./recievedNotes");
const { Requests } = require("./requests");
const { Subjects } = require("./subjects");
const { Users } = require("./users");

Users.hasMany(Subjects);
Subjects.belongsTo(Users);

Subjects.hasMany(Notes);
Notes.belongsTo(Subjects);

Users.belongsToMany(Notes, { through: Recievednotes });
Notes.belongsToMany(Users, { through: Recievednotes });

Users.belongsToMany(Notes, { through: Requests });
Notes.belongsToMany(Users, { through: Requests });

module.exports = {
  Users,
  Notes,
  Subjects,
  Recievednotes,
  Requests,
};
