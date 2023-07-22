const fs = require("fs")

module.exports = () => {
    const models = fs.readdirSync("./models").filter((file) => file != "allModels.js")
    const result = {}

    models.forEach(model => {
        const required = require(`./${model}`)
        result[model.replace(".js", "")] = required
    })

    return result
}