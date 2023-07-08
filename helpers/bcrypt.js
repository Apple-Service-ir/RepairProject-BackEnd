const bcrypt = require("bcrypt")

const validation = (correct, entered) => {
    return bcrypt.compareSync(entered, correct);
};

const encrypt = async (content) => {
    const saltRound = 10
    const salt = await bcrypt.genSaltSync(saltRound);
    const hash = await bcrypt.hashSync(content + "", salt);
    return hash;
};

module.exports = {
    validation,
    encrypt
}