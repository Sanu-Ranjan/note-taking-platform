const { Users } = require("../models");

async function upsertUser(profile) {
  let user = await Users.findOne({ where: { email: profile.email } });

  if (!user) {
    user = await Users.create({
      name: profile.name,
      email: profile.email,
    });
  } else {
    user = await user.update({
      name: profile.name,
    });
  }

  return user;
}

module.exports = {
  upsertUser,
};
