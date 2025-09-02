const Joi = require("joi");
const config = require("config");

const schema = Joi.object({
  mysqlDB: Joi.object({
    host: Joi.string().required(),
    port: Joi.number().required(),
    database: Joi.string().required(),
    user: Joi.string().required(),
    password: Joi.string().required(),
    ssl: Joi.any().optional(),
  }).required(),
  server: Joi.object({
    port: Joi.number().required(),
  }).required(),
});

const { error } = schema.validate(config, { allowUnknown: true });

if (error) {
  throw new Error(
    `Refer .env.example, Config validation error: ${error.message}`
  );
}
console.log("Config validated successfully\n", config);
