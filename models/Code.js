const { DataTypes, Op } = require("sequelize");
const db = require("../configs/db");

const Code = db.define("codes", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  code: {
    type: DataTypes.STRING,
  },

  phone: {
    type: DataTypes.STRING,
  },
});

Code.findVlidCodes = async (phone) => {
  const date = new Date();

  return new Promise(async (resolve, reject) => {
    try {

      const findCodes = await Code.findAll({ where: { phone, expired_at: { [Op.gt]: date }, }, });
      return resolve(findCodes);

    } catch (error) { return reject(error); }
  });
};

Code.sync()

module.exports = Code;
